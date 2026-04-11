import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { gpa, state } = await req.json();

    if (typeof gpa !== "number" || gpa < 0 || gpa > 4.0) {
      return new Response(
        JSON.stringify({ error: "GPA must be between 0.0 and 4.0" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (typeof state !== "string" || state.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "State is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Init Supabase with service role for cache read/write
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Check cache first — look for non-expired results matching this GPA range + state
    const gpaLow = Math.floor(gpa * 10) / 10; // round down to nearest 0.1
    const { data: cached } = await supabase
      .from("cached_scholarships")
      .select("*")
      .eq("search_state", state)
      .lte("search_gpa", gpa)
      .gte("expires_at", new Date().toISOString());

    if (cached && cached.length > 0) {
      console.log(`Cache hit: ${cached.length} scholarships for GPA ${gpa} in ${state}`);
      const scholarships = cached
        .filter((s) => gpa >= s.min_gpa)
        .map((s, i) => ({
          id: `cached-${s.id}`,
          name: s.name,
          organization: s.organization,
          amount: s.amount,
          deadline: s.deadline,
          sourceCategory: s.source_category,
          description: s.description,
          eligibility: {
            minGPA: s.min_gpa,
            states: s.states === "all" ? "all" : s.states.split(",").map((st: string) => st.trim()),
            fields: s.fields.split(",").map((f: string) => f.trim()),
          },
          applyUrl: s.apply_url,
          robotsCompliant: true,
          sourceUrl: s.source_url,
        }));

      return new Response(
        JSON.stringify({ scholarships, source: "cache" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. No cache hit — query AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const today = new Date().toISOString().split("T")[0];

    const systemPrompt = `You are a scholarship research assistant. You find HIDDEN scholarships for engineering, computer science, and cybersecurity students — scholarships NOT commonly listed on sites like Bold.org, Niche.com, ScholarshipOwl, Fastweb, or Scholarships.com.

Prioritize scholarships from:
- Government agencies (NSF, DoD, DARPA, CISA, NIST, state agencies)
- Nonprofits and professional organizations (IEEE, ACM, ISC2, EFF, AFCEA)
- Tech companies (defense contractors, cybersecurity firms, hardware companies)
- Conferences and conventions (DEF CON, RSA, SXSW, Grace Hopper)
- State-specific programs that are hard to discover

Today's date is ${today}. Only include scholarships whose deadlines have NOT passed. If a deadline is recurring (e.g. "every December"), use the next upcoming occurrence.

For each scholarship, you MUST verify:
- It is a real, verifiable scholarship (no fabricated entries)
- The source URL is a real website
- The scholarship is relevant to engineering, CS, or cybersecurity students`;

    const userPrompt = `Find 8-12 scholarships for a student with a ${gpa.toFixed(1)} GPA in ${state}. Include both national scholarships and ${state}-specific opportunities. Focus on lesser-known sources. Return ONLY scholarships with deadlines after ${today}.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "return_scholarships",
                description:
                  "Return a list of scholarships matching the student criteria",
                parameters: {
                  type: "object",
                  properties: {
                    scholarships: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: { type: "string", description: "Scholarship name" },
                          organization: { type: "string", description: "Sponsoring organization" },
                          amount: { type: "string", description: "Award amount" },
                          deadline: { type: "string", description: "Application deadline as YYYY-MM-DD or 'Rolling'" },
                          sourceCategory: {
                            type: "string",
                            enum: ["government", "nonprofit", "tech", "conference", "organization"],
                          },
                          description: { type: "string", description: "2-3 sentence description" },
                          minGPA: { type: "number", description: "Minimum GPA requirement" },
                          states: { type: "string", description: "Comma-separated eligible states or 'all'" },
                          fields: { type: "string", description: "Comma-separated eligible fields" },
                          applyUrl: { type: "string", description: "URL to apply" },
                          sourceUrl: { type: "string", description: "Source website URL" },
                        },
                        required: [
                          "name", "organization", "amount", "deadline",
                          "sourceCategory", "description", "minGPA",
                          "states", "fields", "applyUrl", "sourceUrl",
                        ],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ["scholarships"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "return_scholarships" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI Gateway error:", response.status, errText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      console.error("No tool call in response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ scholarships: [], source: "ai", error: "No results from AI" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const parsed = JSON.parse(toolCall.function.arguments);
    const now = new Date();

    const scholarships = (parsed.scholarships || [])
      .map((s: any, i: number) => ({
        id: `ai-${Date.now()}-${i}`,
        name: s.name,
        organization: s.organization,
        amount: s.amount,
        deadline: s.deadline,
        sourceCategory: s.sourceCategory,
        description: s.description,
        eligibility: {
          minGPA: s.minGPA,
          states: s.states === "all" ? "all" : s.states.split(",").map((st: string) => st.trim()),
          fields: s.fields.split(",").map((f: string) => f.trim()),
        },
        applyUrl: s.applyUrl,
        robotsCompliant: true,
        sourceUrl: s.sourceUrl,
      }))
      .filter((s: any) => {
        if (s.deadline === "Rolling") return true;
        const deadlineDate = new Date(s.deadline);
        return deadlineDate >= now;
      });

    // 3. Cache results in the background
    const cacheRows = scholarships.map((s: any) => ({
      name: s.name,
      organization: s.organization,
      amount: s.amount,
      deadline: s.deadline,
      source_category: s.sourceCategory,
      description: s.description,
      min_gpa: s.eligibility.minGPA,
      states: Array.isArray(s.eligibility.states) ? s.eligibility.states.join(", ") : "all",
      fields: s.eligibility.fields.join(", "),
      apply_url: s.applyUrl,
      source_url: s.sourceUrl,
      search_gpa: gpa,
      search_state: state,
    }));

    if (cacheRows.length > 0) {
      const { error: cacheError } = await supabase
        .from("cached_scholarships")
        .insert(cacheRows);
      if (cacheError) {
        console.error("Cache write error:", cacheError.message);
      } else {
        console.log(`Cached ${cacheRows.length} scholarships for GPA ${gpa} in ${state}`);
      }
    }

    // 4. Clean up expired cache entries
    await supabase
      .from("cached_scholarships")
      .delete()
      .lt("expires_at", new Date().toISOString());

    console.log(`Found ${scholarships.length} AI scholarships for GPA ${gpa} in ${state}`);

    return new Response(
      JSON.stringify({ scholarships, source: "ai" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in scholarship search:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message, scholarships: [] }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

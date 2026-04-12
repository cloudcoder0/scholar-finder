import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Diverse crawl targets — rotate through different demographics and fields each run
const CRAWL_PROFILES = [
  { field: "Computer Science", demo: "first-generation college students", gpa: 3.0 },
  { field: "Nursing", demo: "women in healthcare", gpa: 2.8 },
  { field: "Engineering", demo: "Hispanic/Latino students", gpa: 3.2 },
  { field: "Business", demo: "veterans and military families", gpa: 2.5 },
  { field: "Education", demo: "African American students", gpa: 3.0 },
  { field: "Biology", demo: "students with disabilities", gpa: 3.0 },
  { field: "Psychology", demo: "LGBTQ+ students", gpa: 2.7 },
  { field: "Communications", demo: "Native American students", gpa: 2.5 },
  { field: "Cybersecurity", demo: "underrepresented minorities in tech", gpa: 3.0 },
  { field: "Environmental Science", demo: "students demonstrating financial need", gpa: 2.8 },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const today = new Date().toISOString().split("T")[0];

    // Pick a random profile to crawl this run
    const body = await req.json().catch(() => ({}));
    const profileIndex = body.profileIndex ?? Math.floor(Math.random() * CRAWL_PROFILES.length);
    const profile = CRAWL_PROFILES[profileIndex % CRAWL_PROFILES.length];

    console.log(`Crawling: ${profile.field} for ${profile.demo}`);

    // Clean expired cache first
    await supabase
      .from("cached_scholarships")
      .delete()
      .lt("expires_at", new Date().toISOString());

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
            {
              role: "system",
              content: `You are a scholarship discovery engine. Find REAL, HIDDEN scholarships not commonly found on Fastweb, Bold.org, Niche, ScholarshipOwl, or Scholarships.com. Today is ${today}. Every scholarship MUST be real and verifiable with a working source URL. Only include scholarships with deadlines after ${today} or rolling admissions.

Focus on:
- Government programs (federal, state, local)
- Professional associations and unions
- Corporate programs from non-tech companies
- Community foundations
- Faith-based organizations
- Industry-specific foundations
- Regional/local scholarships`,
            },
            {
              role: "user",
              content: `Find 15-20 scholarships specifically for ${profile.demo} studying ${profile.field} with a minimum GPA around ${profile.gpa}. Include national AND regional opportunities. Prioritize lesser-known sources that students would struggle to find on their own.`,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "return_scholarships",
                description: "Return scholarships",
                parameters: {
                  type: "object",
                  properties: {
                    scholarships: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          organization: { type: "string" },
                          amount: { type: "string" },
                          deadline: { type: "string" },
                          sourceCategory: { type: "string", enum: ["government", "nonprofit", "tech", "conference", "organization"] },
                          description: { type: "string" },
                          minGPA: { type: "number" },
                          states: { type: "string" },
                          fields: { type: "string" },
                          applyUrl: { type: "string" },
                          sourceUrl: { type: "string" },
                        },
                        required: ["name", "organization", "amount", "deadline", "sourceCategory", "description", "minGPA", "states", "fields", "applyUrl", "sourceUrl"],
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
          tool_choice: { type: "function", function: { name: "return_scholarships" } },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI error:", response.status, errText);
      throw new Error(`AI error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      return new Response(
        JSON.stringify({ success: true, newScholarships: 0, message: "No results from AI" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const parsed = JSON.parse(toolCall.function.arguments);
    const now = new Date();

    // Deduplicate against existing cache by name
    const newScholarships = (parsed.scholarships || []).filter((s: any) => {
      if (s.deadline !== "Rolling" && new Date(s.deadline) < now) return false;
      return true;
    });

    // Check for duplicates
    const names = newScholarships.map((s: any) => s.name);
    const { data: existing } = await supabase
      .from("cached_scholarships")
      .select("name")
      .in("name", names);

    const existingNames = new Set((existing || []).map((e: any) => e.name.toLowerCase()));

    const rows = newScholarships
      .filter((s: any) => !existingNames.has(s.name.toLowerCase()))
      .map((s: any) => ({
        name: s.name,
        organization: s.organization,
        amount: s.amount,
        deadline: s.deadline,
        source_category: s.sourceCategory,
        description: s.description,
        min_gpa: s.minGPA,
        states: s.states,
        fields: s.fields,
        apply_url: s.applyUrl,
        source_url: s.sourceUrl,
        search_gpa: profile.gpa,
        search_state: "all",
      }));

    if (rows.length > 0) {
      const { error } = await supabase.from("cached_scholarships").insert(rows);
      if (error) console.error("Cache error:", error.message);
    }

    console.log(`Crawl complete: ${rows.length} new scholarships cached for ${profile.field}/${profile.demo}`);

    return new Response(
      JSON.stringify({
        success: true,
        profile: `${profile.field} / ${profile.demo}`,
        discovered: newScholarships.length,
        newScholarships: rows.length,
        duplicatesSkipped: newScholarships.length - rows.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Crawl error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

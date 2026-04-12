import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const POPULAR_STATES = [
  "California", "Texas", "New York", "Florida", "Illinois",
  "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan",
  "New Jersey", "Virginia", "Washington", "Arizona", "Massachusetts",
  "Tennessee", "Indiana", "Missouri", "Maryland", "Colorado",
];

const GPA_TIERS = [2.5, 3.0, 3.5];

const FIELDS = [
  "Computer Science", "Engineering", "Business", "Nursing",
  "Education", "Biology", "Psychology", "Communications",
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

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Accept optional params to control scope
    const body = await req.json().catch(() => ({}));
    const maxBatches = body.maxBatches || 5; // limit to avoid timeout
    const today = new Date().toISOString().split("T")[0];

    // Build search combos, skipping ones already cached
    const combos: { state: string; gpa: number; field: string }[] = [];
    for (const state of POPULAR_STATES) {
      for (const gpa of GPA_TIERS) {
        // Check if we already have fresh cache for this combo
        const { count } = await supabase
          .from("cached_scholarships")
          .select("id", { count: "exact", head: true })
          .eq("search_state", state)
          .eq("search_gpa", gpa)
          .gte("expires_at", new Date().toISOString());

        if ((count ?? 0) < 3) {
          const field = FIELDS[Math.floor(Math.random() * FIELDS.length)];
          combos.push({ state, gpa, field });
        }
      }
    }

    console.log(`Found ${combos.length} uncached combos, processing up to ${maxBatches}`);

    let totalCached = 0;
    const processed: string[] = [];

    for (let i = 0; i < Math.min(combos.length, maxBatches); i++) {
      const { state, gpa, field } = combos[i];

      try {
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
                  content: `You are a scholarship research assistant finding HIDDEN scholarships not on mainstream sites. Today is ${today}. Only include scholarships with future deadlines. Every scholarship must be real and verifiable.`,
                },
                {
                  role: "user",
                  content: `Find 10-15 scholarships for a student with a ${gpa.toFixed(1)} GPA in ${state} studying ${field}. Include both national and ${state}-specific opportunities. Only deadlines after ${today}.`,
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
          console.error(`AI error for ${state}/${gpa}: ${response.status}`);
          continue;
        }

        const data = await response.json();
        const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
        if (!toolCall) continue;

        const parsed = JSON.parse(toolCall.function.arguments);
        const now = new Date();

        const rows = (parsed.scholarships || [])
          .filter((s: any) => {
            if (s.deadline === "Rolling") return true;
            return new Date(s.deadline) >= now;
          })
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
            search_gpa: gpa,
            search_state: state,
          }));

        if (rows.length > 0) {
          const { error } = await supabase.from("cached_scholarships").insert(rows);
          if (error) {
            console.error(`Cache error for ${state}/${gpa}:`, error.message);
          } else {
            totalCached += rows.length;
            processed.push(`${state} (GPA ${gpa}): ${rows.length}`);
          }
        }
      } catch (err) {
        console.error(`Error processing ${state}/${gpa}:`, err);
      }
    }

    console.log(`Bulk seed complete: ${totalCached} scholarships cached`);

    return new Response(
      JSON.stringify({
        success: true,
        totalCached,
        batchesProcessed: processed.length,
        remaining: Math.max(0, combos.length - maxBatches),
        details: processed,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Bulk seed error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

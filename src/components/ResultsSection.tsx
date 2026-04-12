import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import type { Scholarship } from "@/data/scholarships";
import ScholarshipCard from "./ScholarshipCard";

interface ResultsSectionProps {
  results: Scholarship[] | null;
  gpa: number;
  state: string;
}

export default function ResultsSection({ results, gpa, state }: ResultsSectionProps) {
  if (results === null) return null;

  return (
    <section className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg text-primary text-glow">
              &gt; {results.length} result{results.length !== 1 ? "s" : ""} found_
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            // query: GPA={gpa.toFixed(1)} STATE="{state}" | filter --no-expired | sort --match-score desc
          </p>
        </div>

        {results.length === 0 ? (
          <div className="rounded border border-border bg-card p-12 text-center terminal-border">
            <p className="font-display text-sm text-muted-foreground">
              &gt; ERROR: No matches found. Adjust parameters and retry.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {results.map((s, i) => (
              <ScholarshipCard key={s.id} scholarship={s} index={i} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

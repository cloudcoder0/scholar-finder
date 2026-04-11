import { motion } from "framer-motion";
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
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              {results.length} Scholarship{results.length !== 1 ? "s" : ""} Found
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              For GPA {gpa.toFixed(1)} in {state}
            </p>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="font-display text-lg text-muted-foreground">
              No matches found. Try adjusting your GPA or state.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {results.map((s, i) => (
              <ScholarshipCard key={s.id} scholarship={s} index={i} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

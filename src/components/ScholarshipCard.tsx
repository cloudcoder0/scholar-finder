import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck, DollarSign, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Scholarship, SourceCategory } from "@/data/scholarships";
import { SOURCE_LABELS } from "@/data/scholarships";

const categoryClass: Record<SourceCategory, string> = {
  government: "badge-gov",
  nonprofit: "badge-nonprofit",
  tech: "badge-tech",
  conference: "badge-conference",
  organization: "badge-org",
};

export default function ScholarshipCard({
  scholarship,
  index,
}: {
  scholarship: Scholarship;
  index: number;
}) {
  const s = scholarship;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-card-foreground leading-snug">
            {s.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{s.organization}</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${categoryClass[s.sourceCategory]}`}>
          {SOURCE_LABELS[s.sourceCategory]}
        </span>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {s.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-3 text-sm">
        <span className="flex items-center gap-1.5 text-card-foreground">
          <DollarSign className="h-3.5 w-3.5 text-accent" />
          {s.amount}
        </span>
        <span className="flex items-center gap-1.5 text-card-foreground">
          <Calendar className="h-3.5 w-3.5 text-accent" />
          {s.deadline}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-muted-foreground">robots.txt compliant</span>
        </div>

        <a
          href={s.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Apply
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.article>
  );
}

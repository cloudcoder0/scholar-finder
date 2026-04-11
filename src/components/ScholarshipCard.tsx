import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck, DollarSign, Calendar, Sparkles } from "lucide-react";
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
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group rounded border border-border bg-card p-5 transition-all hover:border-primary/40 terminal-border"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-sm font-semibold text-foreground leading-snug text-glow">
            {s.name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground truncate">// {s.organization}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span className={`rounded px-2 py-0.5 text-[10px] font-display ${categoryClass[s.sourceCategory]}`}>
            {SOURCE_LABELS[s.sourceCategory]}
          </span>
          {s.source === "ai" && (
            <span className="flex items-center gap-1 rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-display text-primary">
              <Sparkles className="h-2.5 w-2.5" /> LIVE
            </span>
          )}
        </div>
      </div>

      <p className="mb-4 text-xs leading-relaxed text-muted-foreground line-clamp-2">
        {s.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-3 text-xs">
        <span className="flex items-center gap-1 text-foreground">
          <DollarSign className="h-3 w-3 text-primary" />
          {s.amount}
        </span>
        <span className="flex items-center gap-1 text-foreground">
          <Calendar className="h-3 w-3 text-primary" />
          {s.deadline}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px]">
          <ShieldCheck className="h-3 w-3 text-accent" />
          <span className="text-muted-foreground">robots.txt ✓</span>
        </div>

        <a
          href={s.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-display text-primary transition-all hover:bg-primary/20 hover:border-primary/50"
        >
          APPLY
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.article>
  );
}

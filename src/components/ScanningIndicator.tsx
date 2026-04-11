import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Heart, Cpu, CalendarCheck, Terminal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const scanSteps = [
  { icon: Building2, label: "scanning government_agencies...", delay: 0 },
  { icon: Heart, label: "scanning nonprofits_&_foundations...", delay: 2000 },
  { icon: Cpu, label: "scanning tech_companies...", delay: 4000 },
  { icon: CalendarCheck, label: "scanning conferences_&_conventions...", delay: 6000 },
  { icon: Terminal, label: "filtering expired_entries...", delay: 8000 },
];

export default function ScanningIndicator() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timers = scanSteps.map((_, i) =>
      setTimeout(() => setActiveStep(i), scanSteps[i].delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Terminal-style progress */}
        <div className="mb-8 rounded border border-border bg-card p-5 terminal-border">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: "hsl(45 100% 50%)" }} />
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="ml-2 text-xs text-muted-foreground font-display">scholarship_scanner.sh</span>
          </div>

          <div className="space-y-2">
            {scanSteps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i === activeStep;
              const isDone = i < activeStep;

              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: i <= activeStep ? 1 : 0.2, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className="flex items-center gap-3 font-mono text-xs"
                >
                  <span className="text-muted-foreground w-3">$</span>
                  <Icon
                    className={`h-3.5 w-3.5 shrink-0 ${
                      isActive ? "text-primary animate-pulse" : isDone ? "text-primary/50" : "text-muted-foreground/30"
                    }`}
                  />
                  <span
                    className={
                      isActive ? "text-primary text-glow" : isDone ? "text-muted-foreground" : "text-muted-foreground/30"
                    }
                  >
                    {step.label}
                  </span>
                  {isDone && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-accent text-[10px]"
                    >
                      [OK]
                    </motion.span>
                  )}
                  {isActive && (
                    <span className="cursor-blink text-primary text-[10px]" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Skeleton cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="rounded border border-border bg-card p-5"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4 bg-muted" />
                  <Skeleton className="h-3 w-1/2 bg-muted" />
                </div>
                <Skeleton className="h-5 w-16 rounded bg-muted" />
              </div>
              <div className="mb-4 space-y-2">
                <Skeleton className="h-2.5 w-full bg-muted" />
                <Skeleton className="h-2.5 w-5/6 bg-muted" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-3 w-20 bg-muted" />
                <Skeleton className="h-7 w-16 rounded bg-muted" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

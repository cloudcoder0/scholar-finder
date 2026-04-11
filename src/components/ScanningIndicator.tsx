import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, Building2, Heart, Cpu, CalendarCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const scanSteps = [
  { icon: Building2, label: "Scanning government agencies…", delay: 0 },
  { icon: Heart, label: "Scanning nonprofits & foundations…", delay: 2000 },
  { icon: Cpu, label: "Scanning tech companies…", delay: 4000 },
  { icon: CalendarCheck, label: "Scanning conferences & conventions…", delay: 6000 },
  { icon: Radar, label: "Filtering expired scholarships…", delay: 8000 },
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
        {/* Progress steps */}
        <div className="mb-8 space-y-3">
          {scanSteps.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === activeStep;
            const isDone = i < activeStep;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: i <= activeStep ? 1 : 0.3, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.3 }}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                  isActive
                    ? "bg-accent/10 border border-accent/30"
                    : isDone
                    ? "bg-muted/50"
                    : "bg-transparent"
                }`}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 ${
                    isActive ? "text-accent animate-pulse" : isDone ? "text-muted-foreground" : "text-muted-foreground/40"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    isActive ? "text-foreground" : isDone ? "text-muted-foreground" : "text-muted-foreground/40"
                  }`}
                >
                  {step.label}
                </span>
                {isDone && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto text-xs text-muted-foreground"
                  >
                    ✓
                  </motion.span>
                )}
                {isActive && (
                  <motion.div
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-accent"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Skeleton cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="mb-4 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-20 rounded-lg" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

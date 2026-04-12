import { motion } from "framer-motion";
import { Shield, Terminal, Lock, Cpu } from "lucide-react";

const features = [
  { icon: Terminal, text: "AI-powered real-time discovery" },
  { icon: Cpu, text: "Sources beyond mainstream databases" },
  { icon: Lock, text: "Expired entries auto-purged" },
  { icon: Shield, text: "Matched to your full profile" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 border-b border-border" style={{ background: "hsl(120 20% 6%)" }}>
      <div className="container relative mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded border border-primary/30 bg-primary/5 px-4 py-1.5 font-display text-sm text-primary text-glow">
            &gt; initiating_scan...
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-glow flicker">
            HIDDEN SCHOLARSHIPS
            <br />
            <span className="text-primary">UNCOVERED_</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground font-body">
            // Scanning government agencies, nonprofits, tech companies,
            <br />
            // and conferences for scholarships the mainstream sites miss.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {features.map((f) => (
            <div
              key={f.text}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <f.icon className="h-3.5 w-3.5 text-primary" />
              <span>[{f.text}]</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Shield, Search, CheckCircle } from "lucide-react";

const features = [
  { icon: Search, text: "Sources beyond the usual scholarship sites" },
  { icon: Shield, text: "robots.txt compliance on every source" },
  { icon: CheckCircle, text: "Matched to your GPA & state" },
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-accent blur-[120px]" />
        <div className="absolute bottom-10 right-20 h-48 w-48 rounded-full bg-accent blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-display text-sm font-medium text-accent">
            Stop searching. Start finding.
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-primary-foreground md:text-6xl">
            Hidden Scholarships
            <br />
            <span className="text-accent">You Won't Find Anywhere Else</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/70">
            We scan government agencies, nonprofits, tech companies, and
            conferences to surface scholarships the big sites miss — for
            engineering, CS, and cybersecurity students.
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
              className="flex items-center gap-2 text-sm text-primary-foreground/60"
            >
              <f.icon className="h-4 w-4 text-accent" />
              <span>{f.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

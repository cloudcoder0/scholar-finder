import { motion } from "framer-motion";
import { Lock, Zap, Crown, ArrowRight } from "lucide-react";

const premiumFeatures = [
  { icon: Zap, text: "50+ additional AI-discovered matches" },
  { icon: Crown, text: "Priority alerts for new scholarships" },
  { icon: Lock, text: "Saved searches & application tracker" },
];

export default function PremiumUpsell() {
  return (
    <section className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded border border-primary/20 bg-card p-8 md:p-12 terminal-border"
      >
        {/* Decorative glow */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded border border-primary/30 bg-primary/10 px-3 py-1 font-display text-xs text-primary text-glow">
            <Crown className="h-3 w-3" />
            PREMIUM_ACCESS
          </span>

          <h3 className="font-display text-xl font-bold text-foreground md:text-2xl text-glow">
            UNLOCK FULL SCAN RESULTS_
          </h3>

          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            // You're seeing the top matches. Upgrade to access the complete database
            and get real-time alerts when new scholarships match your profile.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {premiumFeatures.map((f) => (
              <div
                key={f.text}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <f.icon className="h-3.5 w-3.5 text-primary" />
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          <button
            className="mt-8 inline-flex items-center gap-2 rounded border border-primary/40 bg-primary/10 px-6 py-3 font-display text-sm text-primary transition-all hover:bg-primary/20 hover:border-primary/60 text-glow"
            onClick={() => {}}
          >
            &gt; UPGRADE_NOW
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-4 text-[10px] text-muted-foreground font-display">
            // early_access: $4.99/mo | cancel_anytime
          </p>
        </div>
      </motion.div>
    </section>
  );
}

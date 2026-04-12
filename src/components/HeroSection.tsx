import { motion } from "framer-motion";
import { Shield, Terminal, Lock, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

const features = [
  { icon: Terminal, text: "AI-powered real-time discovery" },
  { icon: Cpu, text: "Sources beyond mainstream databases" },
  { icon: Lock, text: "Expired entries auto-purged" },
  { icon: Shield, text: "Matched to your full profile" },
];

const CYBER_KEYWORDS = [
  "SCANNING...", "0x4F2A", "PORT 443", "SSH://", "ENCRYPT", "DECRYPT",
  "FIREWALL", "PROXY", "TCP/IP", "DNS", "HTTPS", "SSL/TLS",
  "PACKET", "TRACE", "BUFFER", "HASH", "AUTH", "TOKEN",
  "PING", "CHMOD", "SUDO", "ROOT", "KERNEL", "SHELL",
  "EXPLOIT", "PATCH", "CIPHER", "RSA-256", "AES-128", "MD5",
  "SOCKS5", "VPN", "NODE", "GATEWAY", "PAYLOAD", "INJECT",
  "GRANT", "REVOKE", "SCHEMA", "QUERY", "INDEX", "PARSE",
  "0xFF", "0xDEAD", "ACK", "SYN", "FIN", "NOP",
];

function MatrixColumn({ delay, left }: { delay: number; left: string }) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let idx = 0;
      const interval = setInterval(() => {
        setLines((prev) => [
          ...prev,
          CYBER_KEYWORDS[Math.floor(Math.random() * CYBER_KEYWORDS.length)],
        ]);
        idx++;
        if (idx > 14) clearInterval(interval);
      }, 120);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      className="absolute top-0 text-[10px] leading-relaxed opacity-15 whitespace-pre font-mono"
      style={{ left, color: "hsl(var(--primary))" }}
    >
      {lines.join("\n")}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32 border-b border-border">
      {/* Matrix rain background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <MatrixColumn key={i} delay={i * 300} left={`${i * 8.5}%`} />
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 h-48 w-48 rounded-full opacity-10" style={{ background: "hsl(120 100% 50%)", filter: "blur(100px)" }} />
        <div className="absolute bottom-10 right-1/4 h-32 w-32 rounded-full opacity-10" style={{ background: "hsl(160 100% 45%)", filter: "blur(80px)" }} />
      </div>

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

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { US_STATES } from "@/data/scholarships";

interface SearchFormProps {
  onSearch: (gpa: number, state: string) => void;
  isSearching: boolean;
}

export default function SearchForm({ onSearch, isSearching }: SearchFormProps) {
  const [gpa, setGpa] = useState("");
  const [state, setState] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gpaNum = parseFloat(gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) return;
    if (!state) return;
    onSearch(gpaNum, state);
  };

  return (
    <section id="search" className="relative -mt-8 z-10 px-6">
      <motion.div
        className="container mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <form
          onSubmit={handleSubmit}
          className="rounded border border-border bg-card p-6 md:p-8 terminal-border"
        >
          <h2 className="mb-1 font-display text-sm text-primary text-glow">
            &gt; run scholarship_scan.sh
          </h2>
          <p className="mb-6 text-xs text-muted-foreground">
            // Enter parameters to begin scan
          </p>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-display text-muted-foreground">
                --gpa
              </label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="4.0"
                placeholder="3.5"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                className="h-11 bg-background border-border font-mono text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary/30"
                required
              />
            </div>

            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-display text-muted-foreground">
                --state
              </label>
              <Select value={state} onValueChange={setState} required>
                <SelectTrigger className="h-11 bg-background border-border font-mono text-foreground">
                  <SelectValue placeholder="SELECT_STATE" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {US_STATES.map((s) => (
                    <SelectItem key={s} value={s} className="font-mono text-xs">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                type="submit"
                disabled={isSearching || !gpa || !state}
                className="h-11 w-full gap-2 bg-primary px-8 font-display text-primary-foreground hover:bg-primary/80 md:w-auto border-0"
              >
                <Search className="h-4 w-4" />
                {isSearching ? "SCANNING..." : "EXECUTE"}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </section>
  );
}

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
          className="rounded-2xl border border-border bg-card p-6 md:p-8"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          <h2 className="mb-6 text-center font-display text-xl font-semibold text-card-foreground">
            Find Your Scholarships
          </h2>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
                GPA (0.0 – 4.0)
              </label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="4.0"
                placeholder="e.g. 3.5"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>

            <div className="flex-1">
              <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
                State
              </label>
              <Select value={state} onValueChange={setState} required>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((s) => (
                    <SelectItem key={s} value={s}>
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
                className="h-12 w-full gap-2 bg-accent px-8 font-display font-semibold text-accent-foreground hover:bg-accent/90 md:w-auto"
              >
                <Search className="h-4 w-4" />
                {isSearching ? "Scanning…" : "Search"}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </section>
  );
}

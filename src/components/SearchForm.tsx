import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  US_STATES,
  FIELDS_OF_STUDY,
  EDUCATION_LEVELS,
  ETHNICITIES,
  FINANCIAL_NEED_LEVELS,
  GENDERS,
  MILITARY_STATUSES,
  DISABILITY_STATUSES,
  type SearchProfile,
} from "@/data/scholarships";

interface SearchFormProps {
  onSearch: (profile: SearchProfile) => void;
  isSearching: boolean;
}

function TerminalSelect({
  label,
  value,
  onValueChange,
  options,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="flex-1 min-w-[200px]">
      <label className="mb-1.5 block text-xs font-display text-muted-foreground">
        {label}
      </label>
      <Select value={value} onValueChange={onValueChange} required={required}>
        <SelectTrigger className="h-11 bg-background border-border font-mono text-foreground">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-card border-border max-h-60">
          {options.map((o) => (
            <SelectItem key={o} value={o} className="font-mono text-xs">
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default function SearchForm({ onSearch, isSearching }: SearchFormProps) {
  const [gpa, setGpa] = useState("");
  const [state, setState] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [financialNeed, setFinancialNeed] = useState("");
  const [gender, setGender] = useState("");
  const [firstGeneration, setFirstGeneration] = useState(false);
  const [militaryStatus, setMilitaryStatus] = useState("");
  const [disabilityStatus, setDisabilityStatus] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gpaNum = parseFloat(gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) return;
    if (!state) return;
    onSearch({
      gpa: gpaNum,
      state,
      fieldOfStudy,
      educationLevel,
      ethnicity,
      financialNeed,
      gender,
      firstGeneration,
      militaryStatus,
      disabilityStatus,
    });
  };

  return (
    <section id="search" className="relative -mt-8 z-10 px-6">
      <motion.div
        className="container mx-auto max-w-3xl"
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

          {/* Primary fields */}
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

            <TerminalSelect
              label="--state"
              value={state}
              onValueChange={setState}
              options={US_STATES}
              placeholder="SELECT_STATE"
              required
            />

            <TerminalSelect
              label="--field"
              value={fieldOfStudy}
              onValueChange={setFieldOfStudy}
              options={FIELDS_OF_STUDY}
              placeholder="SELECT_FIELD"
            />

            <TerminalSelect
              label="--level"
              value={educationLevel}
              onValueChange={setEducationLevel}
              options={EDUCATION_LEVELS}
              placeholder="SELECT_LEVEL"
            />
          </div>

          {/* Advanced toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="mt-4 flex items-center gap-1.5 text-xs font-display text-primary/70 hover:text-primary transition-colors"
          >
            {showAdvanced ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {showAdvanced ? "// collapse advanced_params" : "// expand advanced_params (+6 filters)"}
          </button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
                  <div className="flex flex-col gap-4 md:flex-row flex-wrap">
                    <TerminalSelect
                      label="--ethnicity"
                      value={ethnicity}
                      onValueChange={setEthnicity}
                      options={ETHNICITIES}
                      placeholder="SELECT_ETHNICITY"
                    />
                    <TerminalSelect
                      label="--income"
                      value={financialNeed}
                      onValueChange={setFinancialNeed}
                      options={FINANCIAL_NEED_LEVELS}
                      placeholder="SELECT_INCOME"
                    />
                    <TerminalSelect
                      label="--gender"
                      value={gender}
                      onValueChange={setGender}
                      options={GENDERS}
                      placeholder="SELECT_GENDER"
                    />
                  </div>
                  <div className="flex flex-col gap-4 md:flex-row flex-wrap">
                    <TerminalSelect
                      label="--military"
                      value={militaryStatus}
                      onValueChange={setMilitaryStatus}
                      options={MILITARY_STATUSES}
                      placeholder="SELECT_STATUS"
                    />
                    <TerminalSelect
                      label="--disability"
                      value={disabilityStatus}
                      onValueChange={setDisabilityStatus}
                      options={DISABILITY_STATUSES}
                      placeholder="SELECT_STATUS"
                    />
                    <div className="flex-1 min-w-[200px]">
                      <label className="mb-1.5 block text-xs font-display text-muted-foreground">
                        --first_gen
                      </label>
                      <div className="flex items-center gap-3 h-11 px-3 rounded border border-border bg-background">
                        <Switch
                          checked={firstGeneration}
                          onCheckedChange={setFirstGeneration}
                        />
                        <span className="font-mono text-xs text-foreground">
                          {firstGeneration ? "TRUE" : "FALSE"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <div className="mt-6">
            <Button
              type="submit"
              disabled={isSearching || !gpa || !state}
              className="h-11 w-full gap-2 bg-primary px-8 font-display text-primary-foreground hover:bg-primary/80 md:w-auto border-0"
            >
              <Search className="h-4 w-4" />
              {isSearching ? "SCANNING..." : "EXECUTE"}
            </Button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface ChatOnboardingProps {
  onComplete: (profile: SearchProfile) => void;
  isSearching: boolean;
}

interface ChatMessage {
  id: string;
  role: "system" | "user";
  content: string;
  options?: string[];
  freeInput?: boolean;
  inputType?: "number";
  inputPlaceholder?: string;
}

interface OnboardingStep {
  key: keyof SearchProfile | "confirm";
  prompt: string;
  options?: string[];
  freeInput?: boolean;
  inputType?: "number";
  inputPlaceholder?: string;
  skipLabel?: string;
}

const STEPS: OnboardingStep[] = [
  {
    key: "state",
    prompt: "$ locate --region\n\nWhat state are you in? This helps find state-specific hidden scholarships.",
    options: US_STATES,
  },
  {
    key: "gpa",
    prompt: "$ set --gpa\n\nWhat's your current GPA? (0.0 - 4.0)",
    freeInput: true,
    inputType: "number",
    inputPlaceholder: "3.5",
  },
  {
    key: "fieldOfStudy",
    prompt: "$ set --field\n\nWhat's your field of study?",
    options: FIELDS_OF_STUDY,
  },
  {
    key: "educationLevel",
    prompt: "$ set --level\n\nWhat's your current education level?",
    options: EDUCATION_LEVELS,
  },
  {
    key: "ethnicity",
    prompt: "$ set --ethnicity [optional]\n\nMany scholarships target specific backgrounds. Select yours to unlock more matches, or skip.",
    options: ETHNICITIES,
    skipLabel: "SKIP",
  },
  {
    key: "gender",
    prompt: "$ set --gender [optional]\n\nSome scholarships are gender-specific (e.g., Women in STEM). Select to see those matches.",
    options: GENDERS,
    skipLabel: "SKIP",
  },
  {
    key: "financialNeed",
    prompt: "$ set --income [optional]\n\nFamily income bracket? Unlocks need-based scholarships from government & nonprofits.",
    options: FINANCIAL_NEED_LEVELS,
    skipLabel: "SKIP",
  },
  {
    key: "firstGeneration",
    prompt: "$ set --first_gen [optional]\n\nAre you a first-generation college student? Many programs specifically support first-gen students.",
    options: ["Yes", "No"],
    skipLabel: "SKIP",
  },
  {
    key: "militaryStatus",
    prompt: "$ set --military [optional]\n\nAny military affiliation? Veterans and dependents have access to special scholarships.",
    options: MILITARY_STATUSES,
    skipLabel: "SKIP",
  },
  {
    key: "disabilityStatus",
    prompt: "$ set --disability [optional]\n\nDo you have a disability? There are dedicated scholarship programs available.",
    options: DISABILITY_STATUSES,
    skipLabel: "SKIP",
  },
];

const TYPING_SPEED = 8; // ms per character

function TypewriterText({
  text,
  onComplete,
  isLatest,
}: {
  text: string;
  onComplete?: () => void;
  isLatest: boolean;
}) {
  const [displayed, setDisplayed] = useState(isLatest ? "" : text);
  const [done, setDone] = useState(!isLatest);
  const indexRef = useRef(isLatest ? 0 : text.length);

  useEffect(() => {
    if (!isLatest) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    indexRef.current = 0;
    setDisplayed("");
    setDone(false);

    const interval = setInterval(() => {
      indexRef.current++;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, TYPING_SPEED);

    return () => clearInterval(interval);
  }, [text, isLatest, onComplete]);

  return (
    <span>
      {displayed}
      {!done && (
        <span className="inline-block w-1.5 h-3.5 bg-primary ml-0.5 animate-pulse align-text-bottom" />
      )}
    </span>
  );
}

export default function ChatOnboarding({ onComplete, isSearching }: ChatOnboardingProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [profile, setProfile] = useState<Partial<SearchProfile>>({});
  const profileRef = useRef<Partial<SearchProfile>>({});
  const [freeInputValue, setFreeInputValue] = useState("");
  const [started, setStarted] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typingDone]);

  // Auto-scroll during typing too
  useEffect(() => {
    if (!typingDone) {
      const interval = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [typingDone]);

  useEffect(() => {
    if (typingDone && currentStep >= 0 && STEPS[currentStep]?.freeInput) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [typingDone, currentStep]);

  const addSystemMessage = (content: string, options?: string[], freeInput?: boolean, inputType?: "number", inputPlaceholder?: string) => {
    setTypingDone(false);
    const msg: ChatMessage = {
      id: `sys-${Date.now()}-${Math.random()}`,
      role: "system",
      content,
      options,
      freeInput,
      inputType,
      inputPlaceholder,
    };
    setMessages((prev) => [...prev, msg]);
  };

  const addUserMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `usr-${Date.now()}`, role: "user", content },
    ]);
  };

  const handleTypingComplete = useCallback(() => {
    setTypingDone(true);
  }, []);

  const startOnboarding = () => {
    setStarted(true);
    addSystemMessage(
      "$ ./scholarship_scan.sh --interactive\n\n[INIT] Welcome, operator. I need a few parameters to scan for hidden scholarships.\n\nLet's build your profile — required fields first, then optional filters to maximize matches."
    );
    // Wait for intro typing to finish + small delay before first question
  };

  const advanceStep = useCallback((stepIdx: number) => {
    if (stepIdx >= STEPS.length) {
      // Read from ref to avoid stale closure
      const p = profileRef.current;
      const filled: SearchProfile = {
        gpa: p.gpa || 0,
        state: p.state || "",
        fieldOfStudy: p.fieldOfStudy || "",
        educationLevel: p.educationLevel || "",
        ethnicity: p.ethnicity || "",
        financialNeed: p.financialNeed || "",
        gender: p.gender || "",
        firstGeneration: p.firstGeneration || false,
        militaryStatus: p.militaryStatus || "",
        disabilityStatus: p.disabilityStatus || "",
      };
      const paramCount = Object.values(filled).filter((v) => v && v !== "" && v !== false).length;
      addSystemMessage(
        `$ scan --execute\n\n[READY] Profile loaded with ${paramCount} parameters.\nInitiating deep scan across government agencies, nonprofits, tech companies, and conferences...\n\n> EXECUTING...`
      );
      setCurrentStep(STEPS.length);
      setTimeout(() => onComplete(filled), 600);
      return;
    }
    setCurrentStep(stepIdx);
    const step = STEPS[stepIdx];
    addSystemMessage(step.prompt, step.options, step.freeInput, step.inputType, step.inputPlaceholder);
  }, [onComplete]);

  // When typing completes on the intro message, advance to first step
  useEffect(() => {
    if (typingDone && started && currentStep === -1) {
      setTimeout(() => advanceStep(0), 200);
    }
  }, [typingDone, started, currentStep, advanceStep]);

  const handleSelection = (value: string, stepIdx: number) => {
    const step = STEPS[stepIdx];
    addUserMessage(value);

    const updated = { ...profile };
    if (step.key === "gpa") {
      const gpaVal = parseFloat(value);
      if (isNaN(gpaVal) || gpaVal < 0 || gpaVal > 4.0) {
        addSystemMessage("[ERROR] GPA must be between 0.0 and 4.0. Try again.", undefined, true, "number", "3.5");
        return;
      }
      updated.gpa = gpaVal;
    } else if (step.key === "firstGeneration") {
      updated.firstGeneration = value === "Yes";
    } else if (step.key !== "confirm") {
      (updated as any)[step.key] = value;
    }

    setProfile(updated);
    profileRef.current = updated;
    setFreeInputValue("");

    setTimeout(() => advanceStep(stepIdx + 1), 200);
  };

  const handleSkip = (stepIdx: number) => {
    addUserMessage("--skip");
    setTimeout(() => advanceStep(stepIdx + 1), 150);
  };

  const handleFreeInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!freeInputValue.trim()) return;
    handleSelection(freeInputValue.trim(), currentStep);
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentStep(-1);
    setProfile({});
    profileRef.current = {};
    setStarted(false);
    setFreeInputValue("");
    setTypingDone(false);
  };

  const lastMessage = messages[messages.length - 1];
  const showOptions = typingDone && lastMessage?.role === "system" && lastMessage.options && currentStep < STEPS.length;
  const showFreeInput = typingDone && lastMessage?.role === "system" && lastMessage.freeInput && currentStep < STEPS.length;
  const currentStepData = currentStep >= 0 && currentStep < STEPS.length ? STEPS[currentStep] : null;

  return (
    <section id="search" className="relative -mt-8 z-10 px-6">
      <motion.div
        className="container mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="rounded border border-border bg-card terminal-border overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-2.5">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-primary/70" />
            </div>
            <span className="flex-1 text-center font-display text-xs text-muted-foreground">
              scholarship_scan — interactive mode
            </span>
            {started && (
              <button onClick={handleReset} className="text-muted-foreground hover:text-primary transition-colors" title="Reset">
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Chat area */}
          <div
            ref={scrollRef}
            className="h-[420px] overflow-y-auto p-4 space-y-3 scrollbar-thin"
          >
            {!started ? (
              <motion.div
                className="flex flex-col items-center justify-center h-full gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Terminal className="h-10 w-10 text-primary/50" />
                <p className="text-center text-sm text-muted-foreground font-display">
                  // Ready to scan for hidden scholarships
                </p>
                <Button
                  onClick={startOnboarding}
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/80 font-display border-0"
                >
                  <Terminal className="h-4 w-4" />
                  INITIALIZE SCAN
                </Button>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {messages.map((msg, idx) => {
                  const isLatestSystem = msg.role === "system" && idx === messages.length - 1;
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded px-3 py-2 text-xs font-mono whitespace-pre-wrap ${
                          msg.role === "user"
                            ? "bg-primary/15 text-primary border border-primary/20"
                            : "bg-secondary/50 text-card-foreground border border-border/50"
                        }`}
                      >
                        {msg.role === "system" ? (
                          <TypewriterText
                            text={msg.content}
                            isLatest={isLatestSystem}
                            onComplete={handleTypingComplete}
                          />
                        ) : (
                          msg.content
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}

            {isSearching && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-xs text-primary font-mono"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
                Scanning databases...
              </motion.div>
            )}
          </div>

          {/* Input area — only visible after typing finishes */}
          <AnimatePresence>
            {started && currentStep < STEPS.length && typingDone && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t border-border p-3 space-y-2 bg-secondary/20"
              >
                {/* Option chips */}
                {showOptions && lastMessage?.options && (
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                    {lastMessage.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelection(opt, currentStep)}
                        className="rounded border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-mono text-primary hover:bg-primary/15 hover:border-primary/50 transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Free text input */}
                {showFreeInput && (
                  <form onSubmit={handleFreeInputSubmit} className="flex gap-2">
                    <div className="flex items-center gap-1.5 flex-1 rounded border border-border bg-background px-3">
                      <span className="text-primary text-xs font-mono">$</span>
                      <Input
                        ref={inputRef}
                        type={lastMessage?.inputType === "number" ? "number" : "text"}
                        step={lastMessage?.inputType === "number" ? "0.1" : undefined}
                        min={lastMessage?.inputType === "number" ? "0" : undefined}
                        max={lastMessage?.inputType === "number" ? "4.0" : undefined}
                        placeholder={lastMessage?.inputPlaceholder || "type here..."}
                        value={freeInputValue}
                        onChange={(e) => setFreeInputValue(e.target.value)}
                        className="border-0 bg-transparent h-9 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="sm"
                      className="h-9 bg-primary text-primary-foreground hover:bg-primary/80 border-0"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </form>
                )}

                {/* Skip button for optional steps */}
                {currentStepData?.skipLabel && (
                  <button
                    onClick={() => handleSkip(currentStep)}
                    className="text-xs font-display text-muted-foreground hover:text-primary/70 transition-colors"
                  >
                    &gt; {currentStepData.skipLabel}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

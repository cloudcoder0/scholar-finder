import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/HeroSection";
import ChatOnboarding from "@/components/ChatOnboarding";
import ResultsSection from "@/components/ResultsSection";
import ScanningIndicator from "@/components/ScanningIndicator";
import { findScholarships, calculateMatchScore, type Scholarship, type SearchProfile } from "@/data/scholarships";
import { supabase } from "@/integrations/supabase/client";

export default function Index() {
  const [results, setResults] = useState<Scholarship[] | null>(null);
  const [searchGpa, setSearchGpa] = useState(0);
  const [searchState, setSearchState] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = useCallback(async (profile: SearchProfile) => {
    setIsSearching(true);
    setSearchGpa(profile.gpa);
    setSearchState(profile.state);
    setResults(null);

    const seedResults = findScholarships(profile.gpa, profile.state, profile);

    try {
      const { data, error } = await supabase.functions.invoke("search-scholarships", {
        body: profile,
      });

      setResults(seedResults);

      if (error) {
        console.error("Edge function error:", error);
        toast({
          title: "> ERROR: live_search unavailable",
          description: "Showing curated results. Retry on next scan.",
          variant: "destructive",
        });
      } else if (data?.scholarships?.length > 0) {
        const aiScholarships: Scholarship[] = data.scholarships.map((s: Scholarship) => ({
          ...s,
          source: "ai" as const,
          matchScore: calculateMatchScore(s, profile),
        }));

        setResults((prev) => {
          const existing = prev || [];
          const existingNames = new Set(existing.map((s) => s.name.toLowerCase()));
          const newOnes = aiScholarships.filter(
            (s) => !existingNames.has(s.name.toLowerCase())
          );
          return [...existing, ...newOnes].sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));
        });

        if (data.scholarships.length > 0) {
          toast({
            title: `> ${data.scholarships.length} new targets discovered`,
            description: `Source: ${data.source === "cache" ? "cached_db" : "live_ai_scan"}`,
          });
        }
      }
    } catch (err) {
      console.error("Search error:", err);
      setResults(seedResults);
    } finally {
      setIsSearching(false);
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <header className="absolute top-0 z-20 w-full">
        <div className="container mx-auto flex items-center justify-end px-6 py-5">
          <a
            href="#search"
            className="rounded border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-display text-primary transition-colors hover:bg-primary/10 text-glow"
          >
            &gt; FIND_SCHOLARSHIPS
          </a>
        </div>
      </header>

      <HeroSection />
      <ChatOnboarding onComplete={handleSearch} isSearching={isSearching} />

      <div id="results">
        {isSearching && results === null ? (
          <ScanningIndicator />
        ) : (
          <ResultsSection results={results} gpa={searchGpa} state={searchState} />
        )}
      </div>

      <footer className="border-t border-border py-8 text-center">
        <p className="text-xs text-muted-foreground font-display">
          // surfacing hidden scholarships with legal compliance
        </p>
      </footer>
    </div>
  );
}

import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/components/HeroSection";
import SearchForm from "@/components/SearchForm";
import ResultsSection from "@/components/ResultsSection";
import ScanningIndicator from "@/components/ScanningIndicator";
import { findScholarships, type Scholarship } from "@/data/scholarships";
import { supabase } from "@/integrations/supabase/client";

export default function Index() {
  const [results, setResults] = useState<Scholarship[] | null>(null);
  const [searchGpa, setSearchGpa] = useState(0);
  const [searchState, setSearchState] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = useCallback(async (gpa: number, state: string) => {
    setIsSearching(true);
    setSearchGpa(gpa);
    setSearchState(state);
    setResults(null); // Clear previous results to show scanning animation

    // 1. Get seed results immediately
    const seedResults = findScholarships(gpa, state);

    // 2. Fire AI search in parallel
    try {
      const { data, error } = await supabase.functions.invoke("search-scholarships", {
        body: { gpa, state },
      });

      // Show seed results first
      setResults(seedResults);

      if (error) {
        console.error("Edge function error:", error);
        toast({
          title: "Live search unavailable",
          description: "Showing curated results. AI search will retry next time.",
          variant: "destructive",
        });
      } else if (data?.scholarships?.length > 0) {
        const aiScholarships: Scholarship[] = data.scholarships.map((s: Scholarship) => ({
          ...s,
          source: "ai" as const,
        }));

        setResults((prev) => {
          const existing = prev || [];
          const existingNames = new Set(existing.map((s) => s.name.toLowerCase()));
          const newOnes = aiScholarships.filter(
            (s) => !existingNames.has(s.name.toLowerCase())
          );
          return [...existing, ...newOnes];
        });

        if (data.scholarships.length > 0) {
          toast({
            title: `🔍 Found ${data.scholarships.length} additional scholarships`,
            description: "AI-powered search discovered new opportunities.",
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
        <div className="container mx-auto flex items-center justify-between px-6 py-5">
          <span className="font-display text-lg font-bold text-primary-foreground">
            Hidden Scholarship Finder
          </span>
          <a
            href="#search"
            className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            Find Scholarships
          </a>
        </div>
      </header>

      <HeroSection />
      <SearchForm onSearch={handleSearch} isSearching={isSearching} />

      <div id="results">
        {isSearching && results === null ? (
          <ScanningIndicator />
        ) : (
          <ResultsSection results={results} gpa={searchGpa} state={searchState} />
        )}
      </div>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>Surfacing hidden scholarships with legal compliance.</p>
      </footer>
    </div>
  );
}

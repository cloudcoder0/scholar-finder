import { useState, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import SearchForm from "@/components/SearchForm";
import ResultsSection from "@/components/ResultsSection";
import { findScholarships, type Scholarship } from "@/data/scholarships";

export default function Index() {
  const [results, setResults] = useState<Scholarship[] | null>(null);
  const [searchGpa, setSearchGpa] = useState(0);
  const [searchState, setSearchState] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback((gpa: number, state: string) => {
    setIsSearching(true);
    setSearchGpa(gpa);
    setSearchState(state);

    // Simulate scraper delay for demo
    setTimeout(() => {
      const matches = findScholarships(gpa, state);
      setResults(matches);
      setIsSearching(false);

      // Scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 1200);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="absolute top-0 z-20 w-full">
        <div className="container mx-auto flex items-center justify-between px-6 py-5">
          <span className="font-display text-lg font-bold text-primary-foreground">
            ScholarScan
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
        <ResultsSection results={results} gpa={searchGpa} state={searchState} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>
          ScholarScan — Surfacing hidden scholarships with legal compliance.
        </p>
      </footer>
    </div>
  );
}

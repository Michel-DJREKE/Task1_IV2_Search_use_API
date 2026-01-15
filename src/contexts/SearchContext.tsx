import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface Show {
  id: number;
  name: string;
  image: { medium: string; original: string } | null;
  summary: string | null;
  rating: { average: number | null };
  genres: string[];
  premiered: string | null;
  status: string;
  language: string;
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Show[];
  setSearchResults: (results: Show[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  lastSearches: string[];
  addToLastSearches: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearches, setLastSearches] = useState<string[]>([]);

  const addToLastSearches = useCallback((query: string) => {
    if (!query.trim()) return;
    setLastSearches((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 5);
    });
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        isLoading,
        setIsLoading,
        error,
        setError,
        lastSearches,
        addToLastSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

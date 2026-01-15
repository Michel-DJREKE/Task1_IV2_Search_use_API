import { useEffect, useRef } from 'react';
import axios from 'axios';
import { SearchBar } from '@/components/SearchBar';
import { ShowCard } from '@/components/ShowCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorMessage } from '@/components/ErrorMessage';
import { EmptyState } from '@/components/EmptyState';
import { useSearch, type Show } from '@/contexts/SearchContext';
import { useDebounce } from '@/hooks/useDebounce';
import { Clock } from 'lucide-react';

interface TVMazeSearchResult {
  score: number;
  show: Show;
}

export default function SearchPage() {
  const {
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
  } = useSearch();

  const debouncedQuery = useDebounce(searchQuery, 600);
  const lastFetchedQuery = useRef<string>('');

  useEffect(() => {
   
    if (debouncedQuery === lastFetchedQuery.current) {
      return;
    }

    const fetchShows = async () => {
      if (!debouncedQuery.trim()) {
        setSearchResults([]);
        setError(null);
        lastFetchedQuery.current = '';
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get<TVMazeSearchResult[]>(
          `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(debouncedQuery)}`
        );
        
        const shows = response.data.map((result) => result.show);
        setSearchResults(shows);
        addToLastSearches(debouncedQuery);
        lastFetchedQuery.current = debouncedQuery;
      } catch (err) {
        console.error('Error fetching shows:', err);
        setError(
          axios.isAxiosError(err) && err.response?.status === 429
            ? 'Trop de requêtes. Veuillez patienter quelques secondes.'
            : 'Impossible de récupérer les données. Vérifiez votre connexion internet.'
        );
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShows();
  }, [debouncedQuery, setSearchResults, setIsLoading, setError, addToLastSearches]);

  const handleRetry = () => {
    lastFetchedQuery.current = ''; // Reset to force refetch
    setSearchQuery(searchQuery + ' '); // Trigger a change
    setTimeout(() => setSearchQuery(searchQuery), 0); // Reset to original
  };

  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
       
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Rechercher une série
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explorez des milliers de séries TV et découvrez leurs détails en temps réel.
          </p>
        </header>

        
        <div className="mb-8">
          <SearchBar />
        </div>

        
        {lastSearches.length > 0 && !searchQuery && (
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Clock className="h-4 w-4" />
              <span>Recherches récentes</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {lastSearches.map((query) => (
                <button
                  key={query}
                  onClick={() => handleRecentSearch(query)}
                  className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}

        
        <section>
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorMessage message={error} onRetry={handleRetry} />
          ) : searchResults.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
                </p>
              </div>
              <div className="space-y-4">
                {searchResults.map((show, index) => (
                  <ShowCard key={show.id} show={show} index={index} />
                ))}
              </div>
            </>
          ) : debouncedQuery ? (
            <EmptyState type="no-results" query={debouncedQuery} />
          ) : (
            <EmptyState type="initial" />
          )}
        </section>
      </div>
    </div>
  );
}

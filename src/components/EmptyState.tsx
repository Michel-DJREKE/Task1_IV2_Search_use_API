import { Search, Tv } from 'lucide-react';

interface EmptyStateProps {
  type: 'initial' | 'no-results';
  query?: string;
}

export function EmptyState({ type, query }: EmptyStateProps) {
  if (type === 'initial') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
          <Search className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Recherchez vos séries préférées
        </h3>
        <p className="text-muted-foreground max-w-md">
          Tapez le nom d'une série TV dans la barre de recherche pour découvrir des informations détaillées.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <Tv className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Aucun résultat trouvé
      </h3>
      <p className="text-muted-foreground max-w-md">
        Nous n'avons trouvé aucune série correspondant à "{query}". Essayez avec d'autres termes de recherche.
      </p>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { Star, Calendar, Globe } from 'lucide-react';
import type { Show } from '@/contexts/SearchContext';

interface ShowCardProps {
  show: Show;
  index: number;
}

function stripHtml(html: string | null): string {
  if (!html) return 'Aucune description disponible.';
  return html.replace(/<[^>]*>/g, '');
}

export function ShowCard({ show, index }: ShowCardProps) {
  const navigate = useNavigate();
  const description = stripHtml(show.summary);

  const handleClick = () => {
    navigate(`/serie/${show.id}`);
  };
  
  return (
    <article 
      onClick={handleClick}
      className="group bg-card rounded-xl border border-border shadow-card overflow-hidden transition-shadow-transform hover:shadow-card-hover hover:-translate-y-1 animate-fade-in cursor-pointer"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-40 h-48 sm:h-auto flex-shrink-0 overflow-hidden bg-muted">
          {show.image?.medium ? (
            <img
              src={show.image.medium}
              alt={show.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span className="text-4xl">📺</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {show.name}
            </h3>
            {show.rating.average && (
              <div className="flex items-center gap-1 flex-shrink-0 rounded-full bg-primary/10 px-2 py-1">
                <Star className="h-4 w-4 text-primary fill-primary" />
                <span className="text-sm font-medium text-primary">{show.rating.average}</span>
              </div>
            )}
          </div>

          {/* Genres */}
          {show.genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {show.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {show.premiered && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(show.premiered).getFullYear()}</span>
              </div>
            )}
            {show.language && (
              <div className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                <span>{show.language}</span>
              </div>
            )}
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              show.status === 'Running' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {show.status === 'Running' ? 'En cours' : show.status === 'Ended' ? 'Terminée' : show.status}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

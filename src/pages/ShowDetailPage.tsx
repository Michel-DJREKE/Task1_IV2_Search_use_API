import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Star, Calendar, Globe, Clock, Users, Tv, ExternalLink } from 'lucide-react';

interface ShowDetail {
  id: number;
  name: string;
  image: { medium: string; original: string } | null;
  summary: string | null;
  rating: { average: number | null };
  genres: string[];
  premiered: string | null;
  ended: string | null;
  status: string;
  language: string;
  runtime: number | null;
  network: { name: string; country: { name: string } } | null;
  officialSite: string | null;
  schedule: { time: string; days: string[] };
}

interface CastMember {
  person: {
    id: number;
    name: string;
    image: { medium: string } | null;
  };
  character: {
    name: string;
  };
}

interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  runtime: number | null;
  summary: string | null;
  image: { medium: string } | null;
}

function stripHtml(html: string | null): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
}

export default function ShowDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [show, setShow] = useState<ShowDetail | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'synopsis' | 'cast' | 'episodes'>('synopsis');

  useEffect(() => {
    const fetchShowDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);

      try {
        const [showRes, castRes, episodesRes] = await Promise.all([
          axios.get<ShowDetail>(`https://api.tvmaze.com/shows/${id}`),
          axios.get<CastMember[]>(`https://api.tvmaze.com/shows/${id}/cast`),
          axios.get<Episode[]>(`https://api.tvmaze.com/shows/${id}/episodes`),
        ]);

        setShow(showRes.data);
        setCast(castRes.data);
        setEpisodes(episodesRes.data);
      } catch (err) {
        console.error('Error fetching show details:', err);
        setError('Impossible de charger les détails de la série.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  
  const episodesBySeason = episodes.reduce((acc, ep) => {
    if (!acc[ep.season]) acc[ep.season] = [];
    acc[ep.season].push(ep);
    return acc;
  }, {} as Record<number, Episode[]>);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-32 rounded-lg skeleton-shimmer" />
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-80 h-[450px] rounded-xl skeleton-shimmer" />
              <div className="flex-1 space-y-4">
                <div className="h-10 w-3/4 rounded-lg skeleton-shimmer" />
                <div className="flex gap-2">
                  <div className="h-6 w-20 rounded-full skeleton-shimmer" />
                  <div className="h-6 w-24 rounded-full skeleton-shimmer" />
                </div>
                <div className="h-4 w-full rounded skeleton-shimmer" />
                <div className="h-4 w-full rounded skeleton-shimmer" />
                <div className="h-4 w-2/3 rounded skeleton-shimmer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error || 'Série non trouvée'}</p>
          <button
            onClick={() => navigate('/recherche')}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary-hover transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la recherche
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
     
      <div className="relative bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 py-8">
         
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </button>

          <div className="flex flex-col md:flex-row gap-8">
           
            <div className="flex-shrink-0">
              {show.image?.original ? (
                <img
                  src={show.image.original}
                  alt={show.name}
                  className="w-full md:w-80 rounded-xl shadow-card-hover object-cover"
                />
              ) : (
                <div className="w-full md:w-80 h-[450px] rounded-xl bg-muted flex items-center justify-center">
                  <Tv className="h-20 w-20 text-muted-foreground" />
                </div>
              )}
            </div>

           
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {show.name}
              </h1>

             
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {show.rating.average && (
                  <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span className="font-semibold text-primary">{show.rating.average}</span>
                  </div>
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  show.status === 'Running' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {show.status === 'Running' ? 'En cours' : show.status === 'Ended' ? 'Terminée' : show.status}
                </span>
              </div>

             
              {show.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {show.genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

             
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {show.premiered && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(show.premiered).getFullYear()}{show.ended ? ` - ${new Date(show.ended).getFullYear()}` : ''}</span>
                  </div>
                )}
                {show.language && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span>{show.language}</span>
                  </div>
                )}
                {show.runtime && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{show.runtime} min</span>
                  </div>
                )}
                {show.network && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tv className="h-4 w-4" />
                    <span>{show.network.name}</span>
                  </div>
                )}
              </div>

              
              {show.schedule.days.length > 0 && (
                <p className="text-sm text-muted-foreground mb-4">
                  Diffusion : {show.schedule.days.join(', ')} {show.schedule.time && `à ${show.schedule.time}`}
                </p>
              )}

              
              {show.officialSite && (
                <a
                  href={show.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
                >
                  <ExternalLink className="h-4 w-4" />
                  Site officiel
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

     
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-2 border-b border-border mb-8">
          {(['synopsis', 'cast', 'episodes'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'synopsis' ? 'Synopsis' : tab === 'cast' ? `Casting (${cast.length})` : `Épisodes (${episodes.length})`}
            </button>
          ))}
        </div>

       
        {activeTab === 'synopsis' && (
          <div className="animate-fade-in max-w-3xl">
            <h2 className="text-xl font-semibold text-foreground mb-4">Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed">
              {stripHtml(show.summary) || 'Aucun synopsis disponible.'}
            </p>
          </div>
        )}

        {activeTab === 'cast' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              <Users className="inline h-5 w-5 mr-2" />
              Casting
            </h2>
            {cast.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {cast.slice(0, 18).map((member) => (
                  <div
                    key={`${member.person.id}-${member.character.name}`}
                    className="bg-card rounded-xl border border-border p-3 text-center shadow-card hover:shadow-card-hover transition-shadow"
                  >
                    {member.person.image?.medium ? (
                      <img
                        src={member.person.image.medium}
                        alt={member.person.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                        <Users className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <p className="font-medium text-foreground text-sm line-clamp-1">
                      {member.person.name}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {member.character.name}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Aucune information sur le casting.</p>
            )}
          </div>
        )}

        {activeTab === 'episodes' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-6">Épisodes</h2>
            {Object.keys(episodesBySeason).length > 0 ? (
              <div className="space-y-8">
                {Object.entries(episodesBySeason).map(([season, eps]) => (
                  <div key={season}>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                        Saison {season}
                      </span>
                      <span className="text-muted-foreground text-sm font-normal">
                        {eps.length} épisode{eps.length > 1 ? 's' : ''}
                      </span>
                    </h3>
                    <div className="grid gap-3">
                      {eps.map((episode) => (
                        <div
                          key={episode.id}
                          className="bg-card rounded-lg border border-border p-4 flex gap-4 shadow-card hover:shadow-card-hover transition-shadow"
                        >
                          {episode.image?.medium && (
                            <img
                              src={episode.image.medium}
                              alt={episode.name}
                              className="w-24 h-14 rounded object-cover flex-shrink-0"
                              loading="lazy"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-medium text-foreground">
                                <span className="text-primary">E{episode.number}</span> - {episode.name}
                              </p>
                              {episode.runtime && (
                                <span className="text-xs text-muted-foreground flex-shrink-0">
                                  {episode.runtime} min
                                </span>
                              )}
                            </div>
                            {episode.airdate && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(episode.airdate).toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </p>
                            )}
                            {episode.summary && (
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {stripHtml(episode.summary)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Aucun épisode disponible.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

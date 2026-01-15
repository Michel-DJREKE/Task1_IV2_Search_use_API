import { Link } from 'react-router-dom';
import { Search, Tv, Zap, ArrowRight } from 'lucide-react';

const highlights = [
  {
    icon: Search,
    title: 'Recherche rapide et efficace',
    description: 'Trouvez facilement vos séries grâce à une recherche fluide et intuitive.',
  },
  {
    icon: Tv,
    title: 'Contenus toujours à jour',
    description: 'Accédez à des informations fiables et actualisées sur vos séries préférées.',
  },
  {
    icon: Zap,
    title: 'Expérience fluide',
    description: 'Naviguez sans interruption grâce à une interface moderne et agréable.',
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
     
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground mb-6">
              <Tv className="h-4 w-4" />
              <span>Votre plateforme dédiée aux séries TV</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Découvrez et explorez vos{' '}
              <span className="text-primary">séries préférées</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Recherchez, explorez et suivez facilement des milliers de séries TV
              grâce à une plateforme simple, rapide et agréable à utiliser.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/recherche"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary-hover hover:scale-105 hover:shadow-xl"
              >
                <Search className="h-5 w-5" />
                Lancer une recherche
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/a-propos"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-4 text-lg font-semibold text-foreground transition-all duration-200 hover:bg-secondary hover:border-primary/20"
              >
                Découvrir la plateforme
              </Link>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Pourquoi choisir SeriesHub ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-card rounded-xl border border-border p-6 text-center shadow-card transition-shadow-transform hover:shadow-card-hover hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-primary to-primary-hover rounded-2xl p-10 text-primary-foreground animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Prêt à commencer ?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Lancez votre recherche et plongez dans l’univers des séries TV dès maintenant.
            </p>
            <Link
              to="/recherche"
              className="inline-flex items-center gap-2 rounded-xl bg-background px-8 py-4 text-lg font-semibold text-foreground transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Search className="h-5 w-5" />
              Commencer maintenant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Code, Zap, Search, Database } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Recherche simple et efficace',
    description: 'Trouvez rapidement vos séries grâce à une recherche fluide et agréable à utiliser.',
  },
  {
    icon: Zap,
    title: 'Informations toujours à jour',
    description: 'Accédez à des données actualisées pour suivre vos séries sans manquer aucune nouveauté.',
  },
  {
    icon: Database,
    title: 'Données synchronisées',
    description: 'Retrouvez des informations cohérentes et bien organisées sur l’ensemble de la plateforme.',
  },
  {
    icon: Code,
    title: 'Plateforme moderne',
    description: 'Une application conçue pour offrir une navigation rapide, stable et intuitive.',
  },
];

const techStack = [
  { name: 'React 18', category: 'Technologie principale' },
  { name: 'TypeScript', category: 'Fiabilité du code' },
  { name: 'React Router', category: 'Navigation' },
  { name: 'Axios', category: 'Communication des données' },
  { name: 'Tailwind CSS', category: 'Design & interface' },
  { name: 'TVMaze', category: 'Source de contenus' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
   
        <header className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            À propos de SeriesHub
          </h1>
          <p className="text-lg text-muted-foreground">
            SeriesHub est une plateforme dédiée à la découverte et à l’exploration de séries TV,
            pensée pour offrir une expérience simple, rapide et agréable à tous les passionnés.
          </p>
        </header>

    
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground text-center mb-10">
            Ce que vous offre SeriesHub
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-card rounded-xl border border-border p-6 shadow-card transition-shadow-transform hover:shadow-card-hover hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

      
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground text-center mb-10">
            Technologies utilisées
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="bg-secondary rounded-lg px-4 py-3 text-center animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <p className="font-medium text-foreground">{tech.name}</p>
                <p className="text-xs text-muted-foreground">{tech.category}</p>
              </div>
            ))}
          </div>
        </section>

        
        <section className="bg-card rounded-xl border border-border p-8 max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Une navigation fluide et rapide
          </h2>
          <p className="text-muted-foreground mb-4">
            SeriesHub est conçu pour répondre rapidement à vos recherches et éviter
            les chargements inutiles. Chaque action est optimisée afin de vous offrir
            une expérience confortable et sans attente.
          </p>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm font-medium text-foreground mb-2">Les bénéfices pour vous :</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Recherche plus rapide et plus précise</li>
              <li>✓ Navigation fluide et sans ralentissement</li>
              <li>✓ Confort d’utilisation sur tous les écrans</li>
              <li>✓ Accès immédiat aux informations utiles</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

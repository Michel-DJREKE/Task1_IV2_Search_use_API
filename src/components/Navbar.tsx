import { Link, useLocation } from 'react-router-dom';
import { Search, Home, Info, Tv } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Accueil', icon: Home },
  { to: '/recherche', label: 'Recherche', icon: Search },
  { to: '/a-propos', label: 'À Propos', icon: Info },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-semibold text-foreground transition-colors hover:text-primary"
          >
            <Tv className="h-6 w-6 text-primary" />
            <span>SeriesHub</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

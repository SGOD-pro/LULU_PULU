
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X, Home, ChefHat, FileText, Bot, Heart, Plus } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Close menu when route changes or when switching from mobile to desktop
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location, isMobile]);

  const tools = [
    { name: 'Recipe Predictor', path: '/recipe-predictor', icon: ChefHat },
    { name: 'Essay Scorer', path: '/essay-scorer', icon: FileText },
    { name: 'AI vs Human', path: '/text-detector', icon: Bot },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Plus className="h-5 w-5 text-primary" />
                </div>
              </div>
              <span className="font-medium text-lg">AI Tools</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-primary/10 text-primary' 
                  : 'hover:bg-accent/10 text-foreground/70 hover:text-foreground'
              }`}
            >
              <span className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </span>
            </Link>
            
            {tools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(tool.path) 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-accent/10 text-foreground/70 hover:text-foreground'
                }`}
              >
                <span className="flex items-center gap-2">
                  <tool.icon className="h-4 w-4" />
                  {tool.name}
                </span>
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-1">
              <Link 
                to="/" 
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-accent/10 text-foreground/70 hover:text-foreground'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </span>
              </Link>
              
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    isActive(tool.path) 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-accent/10 text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <tool.icon className="h-4 w-4" />
                    {tool.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
import { Button } from "@/components/Button";
import { Menu, X } from "lucide-react";
import { useEffect, useState, memo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/achievements", label: "Achievements" },
  { href: "/contact", label: "Contact" },
];

export const Navbar = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
      });
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 transition-all duration-500 z-50 ${
        isScrolled ? "glass-strong py-3" : "bg-transparent py-5"
      }`}
      role="banner"
    >
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      
      <nav className="container mx-auto px-6 flex items-center justify-between" role="navigation">
        <Link 
          to="/home" 
          className="text-xl font-bold tracking-tight hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          aria-label="Home"
        >
          MK<span className="text-primary" aria-hidden="true">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  location.pathname === link.href 
                    ? "text-primary bg-surface" 
                    : "text-muted-foreground hover:text-foreground hover:bg-surface"
                }`}
                aria-current={location.pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <Link to="/contact">
            <Button size="sm">Contact Me</Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-foreground cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={toggleMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div 
          className="md:hidden glass-strong animate-fade-in"
          role="menu"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-lg py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded ${
                  location.pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={closeMenu}
                role="menuitem"
                aria-current={location.pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" onClick={closeMenu} role="menuitem">
              <Button className="w-full">Contact Me</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
});

Navbar.displayName = 'Navbar';
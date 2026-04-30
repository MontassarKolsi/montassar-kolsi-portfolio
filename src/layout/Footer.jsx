import { Github, Linkedin, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { memo } from "react";

const socialLinks = [
  { icon: Github, href: "https://github.com/MontassarKolsi", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/montassar-kolsi-3b684b323/", label: "LinkedIn" },
  { icon: Code, href: "https://codeforces.com/profile/KolsiMontassar", label: "Codeforces" },
];

const footerLinks = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/achievements", label: "Achievements" },
  { href: "/contact", label: "Contact" },
];

export const Footer = memo(() => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-border" role="contentinfo">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <Link 
              to="/home" 
              className="text-xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              aria-label="Home"
            >
              MK<span className="text-primary" aria-hidden="true">.</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} Montassar Kolsi. All rights reserved.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4" aria-label="Social media links">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <social.icon className="w-5 h-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
import { FileSearch, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-primary/5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-primary">
              <FileSearch className="h-6 w-6 text-accent" />
              <span className="font-heading text-lg font-bold">PlagiarismAI</span>
            </Link>
            <p className="font-body text-sm text-muted-foreground">
              An advanced AI-powered plagiarism detection system using NLP techniques 
              to analyze document similarity and identify potential plagiarism.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link 
                to="/" 
                className="font-body text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                Home
              </Link>
              <Link 
                to="/checker" 
                className="font-body text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                Plagiarism Checker
              </Link>
              <Link 
                to="/about" 
                className="font-body text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold text-foreground">Contact</h4>
            <div className="flex flex-col gap-2">
              <a 
                href="mailto:contact@plagiarismai.com"
                className="flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4" />
                contact@plagiarismai.com
              </a>
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} PlagiarismAI. Built with advanced NLP and machine learning techniques.
          </p>
        </div>
      </div>
    </footer>
  );
};

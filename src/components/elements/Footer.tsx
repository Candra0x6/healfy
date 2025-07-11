import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo/Brand Section */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">Healfy</div>
            <span className="text-muted-foreground">Your Health Companion</span>
          </div>

          {/* Links Section */}
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="text-foreground hover:text-primary transition-colors duration-200"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="#" 
              className="text-foreground hover:text-primary transition-colors duration-200"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Credits Section */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Healfy. All rights reserved.
            </p>
            
            <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4 text-sm text-muted-foreground">
              <span>Built with ❤️ using Next.js & Tailwind CSS</span>
              <span className="hidden md:inline">•</span>
              <span>Powered by Prisma & Google AI</span>
            </div>
          </div>
          
          {/* Additional Credits */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Special thanks to the open-source community and all contributors who made this project possible.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
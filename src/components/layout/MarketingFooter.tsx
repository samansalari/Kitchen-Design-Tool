import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import '../../styles/marketing-layout.css';

const MarketingFooter: React.FC = () => {
  return (
    <footer className="marketing-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <ChefHat size={32} />
              <span>ModKitchen</span>
            </Link>
            <p className="brand-desc">
              The professional kitchen design tool for homeowners and professionals alike.
              Create stunning, functional kitchens with our easy-to-use platform.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="footer-links-group">
            <div className="footer-links">
              <h4>Product</h4>
              <Link to="/features">Features</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/templates">Templates</Link>
              <Link to="/gallery">Gallery</Link>
            </div>
            
            <div className="footer-links">
              <h4>Resources</h4>
              <Link to="/blog">Blog</Link>
              <Link to="/guides">Guides</Link>
              <Link to="/docs">Documentation</Link>
              <Link to="/help">Help Center</Link>
            </div>
            
            <div className="footer-links">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/partners">Partners</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} ModKitchen. All rights reserved.
          </p>
          <div className="legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;

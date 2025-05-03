import React from 'react';
import { Link } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import '../styles/welcome.css';

const Welcome: React.FC = () => {
  return (
    <div className="welcome-page">
      <header className="welcome-header">
        <div className="header-content">
          <Link to="/" className="logo">
            <Lucide.ChefHat size={32} />
            <span>ModKitchen</span>
          </Link>
          <nav className="auth-nav">
            <Link to="/login" className="login-link">Sign In</Link>
            <Link to="/register" className="register-link">Create Account</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h1>Design Your Dream Kitchen</h1>
            <p className="hero-subtitle">
              Powerful yet simple kitchen design tool for homeowners and professionals
            </p>
            <div className="hero-actions">
              <Link to="/configurator" className="start-designing-btn">
                Start Designing Now
              </Link>
              <Link to="/templates" className="view-templates-btn">
                View Templates
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg" 
              alt="Modern kitchen design example"
            />
          </div>
        </section>

        <section className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <Lucide.Layout size={32} />
              <h3>Drag & Drop Design</h3>
              <p>Easily create your layout with our intuitive drag-and-drop interface</p>
            </div>
            <div className="feature-card">
              <Lucide.PaintBucket size={32} />
              <h3>Real-time Customization</h3>
              <p>Instantly preview different materials, colors, and finishes</p>
            </div>
            <div className="feature-card">
              <Lucide.Ruler size={32} />
              <h3>Precise Measurements</h3>
              <p>Get accurate dimensions and pricing for your kitchen design</p>
            </div>
            <div className="feature-card">
              <Lucide.FileText size={32} />
              <h3>Detailed Plans</h3>
              <p>Generate professional documentation and assembly instructions</p>
            </div>
          </div>
        </section>

        <section className="preview-section">
          <div className="preview-content">
            <h2>Professional-Grade Kitchen Design</h2>
            <p>Whether you're a homeowner planning a renovation or a professional designer, our tool provides everything you need to create stunning kitchen designs.</p>
            <ul className="preview-features">
              <li>2D and 3D visualization</li>
              <li>Automatic pricing calculations</li>
              <li>Material and finish library</li>
              <li>Export to PDF and CAD formats</li>
            </ul>
            <Link to="/register" className="preview-cta">
              Get Started Free
            </Link>
          </div>
          <div className="preview-gallery">
            <img 
              src="https://images.pexels.com/photos/3214064/pexels-photo-3214064.jpeg" 
              alt="Kitchen design example" 
              className="gallery-main"
            />
            <div className="gallery-grid">
              <img 
                src="https://images.pexels.com/photos/6489101/pexels-photo-6489101.jpeg" 
                alt="Modern cabinet design"
              />
              <img 
                src="https://images.pexels.com/photos/7195783/pexels-photo-7195783.jpeg" 
                alt="Kitchen storage solutions"
              />
              <img 
                src="https://images.pexels.com/photos/6958514/pexels-photo-6958514.jpeg" 
                alt="Cabinet detail"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="welcome-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Product</h4>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/templates">Templates</Link>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <Link to="/help">Help Center</Link>
            <Link to="/docs">Documentation</Link>
            <Link to="/blog">Blog</Link>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/careers">Careers</Link>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 ModKitchen. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/marketing-layout.css';

const MarketingHeader: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="marketing-header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <ChefHat size={28} />
            <span>ModKitchen</span>
          </Link>
          
          <nav className="main-nav">
            <Link to="/features" className={isActive('/features')}>
              Features
            </Link>
            <Link to="/pricing" className={isActive('/pricing')}>
              Pricing
            </Link>
            <Link to="/templates" className={isActive('/templates')}>
              Templates
            </Link>
            <Link to="/gallery" className={isActive('/gallery')}>
              Gallery
            </Link>
          </nav>
          
          <div className="auth-buttons">
            {user ? (
              <Link to="/dashboard" className="dashboard-button">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="login-button">Log In</Link>
                <Link to="/register" className="register-button">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MarketingHeader;

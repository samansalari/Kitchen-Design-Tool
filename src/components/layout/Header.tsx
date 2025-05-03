import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    setDropdownOpen(false);
  };

  const isConfiguratorPage = location.pathname.includes('/configurator');

  return (
    <header className={`app-header ${isConfiguratorPage ? 'configurator-header' : ''}`}>
      <div className="header-left">
        <Link to="/" className="logo">
          <Lucide.Kitchen size={28} />
          <span>ModKitchen</span>
        </Link>
        
        <nav className="main-nav">
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
            Dashboard
          </Link>
          <Link to="/configurator" className={isConfiguratorPage ? 'active' : ''}>
            Design
          </Link>
          <Link to="/templates" className={location.pathname === '/templates' ? 'active' : ''}>
            Templates
          </Link>
          <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>
            Gallery
          </Link>
        </nav>
      </div>
      
      <div className="header-right">
        {user ? (
          <>
            <button className="help-button">
              <Lucide.HelpCircle size={20} />
            </button>
            
            <div className="user-menu">
              <button className="avatar-button" onClick={toggleDropdown}>
                <div className="avatar">
                  {user.user_metadata.full_name?.charAt(0) || user.email?.charAt(0)}
                </div>
              </button>
              
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <p className="user-name">{user.user_metadata.full_name || 'User'}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                  
                  <div className="dropdown-links">
                    <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                      <Lucide.User size={16} />
                      <span>Profile</span>
                    </Link>
                    <Link to="/settings" onClick={() => setDropdownOpen(false)}>
                      <Lucide.Settings size={16} />
                      <span>Settings</span>
                    </Link>
                    <Link to="/docs" onClick={() => setDropdownOpen(false)}>
                      <Lucide.FileText size={16} />
                      <span>Documentation</span>
                    </Link>
                  </div>
                  
                  <div className="dropdown-footer">
                    <button className="logout-button" onClick={handleLogout}>
                      <Lucide.LogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-button">Log In</Link>
            <Link to="/register" className="register-button">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BackButton from '../components/common/BackButton';
import { supabase } from '../lib/supabase';
import '../styles/auth.css';
import '../styles/common.css';

// For debugging purposes
const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'password123';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/dashboard';



  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        console.log('User is already logged in:', data.session.user.email);
      } else {
        console.log('No active session found');
      }
    };
    
    checkAuthStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For debugging: log what we're trying to do
    console.log(`Attempting to log in with email: ${email}`);
    
    try {
      setError('');
      setLoading(true);
      
      // For debugging purposes - log that we're attempting to sign in
      console.log('Attempting to sign in with provided credentials')
      
      // Try to sign in
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        console.error('Login error details:', signInError);
        
        // Check if it's a confirmation error
        if (signInError.message.includes('Email not confirmed')) {
          setError('Your email is not confirmed. Please check your inbox for a confirmation link.');
        } else {
          throw signInError;
        }
      } else {
        // Success!
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to use test credentials
  const useTestCredentials = () => {
    setEmail(TEST_EMAIL);
    setPassword(TEST_PASSWORD);
  };

  return (
    <div className="auth-container">
      <BackButton to="/" className="auth-back-button" />
      <div className="auth-form-container">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to your Kitchen Design workspace</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        
        {/* Debug info section - only visible during development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="debug-info" style={{ marginBottom: '15px', padding: '10px', background: '#f0f0f0', borderRadius: '4px', fontSize: '12px' }}>
            <p><strong>Debug Info:</strong></p>
            <p>Check browser console for detailed error messages</p>
            <button 
              type="button"
              onClick={useTestCredentials}
              style={{ fontSize: '12px', padding: '3px 6px' }}
            >
              Use Test Credentials
            </button>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-alternate">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>


      </div>

      <div className="auth-image">
        <img 
          src="https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg" 
          alt="Modern kitchen design" 
        />
      </div>
    </div>
  );
};

export default Login;
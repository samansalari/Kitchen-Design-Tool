import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import BackButton from '../components/common/BackButton';
import '../styles/auth.css';
import '../styles/common.css';

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  
  const navigate = useNavigate();
  
  // Extract token from URL query parameters or hash fragment
  useEffect(() => {
    const extractToken = () => {
      // First try query parameters
      const queryParams = new URLSearchParams(window.location.search);
      let accessToken = queryParams.get('access_token');
      let tokenType = queryParams.get('type');
      
      // If not in query params, try hash fragment (Supabase sometimes uses this format)
      if (!accessToken) {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#')) {
          try {
            const hashParams = new URLSearchParams(hash.substring(1));
            accessToken = hashParams.get('access_token');
            tokenType = hashParams.get('type');
          } catch (e) {
            console.error('Error parsing hash fragment:', e);
          }
        }
      }
      
      // Also check for token in the URL pathname (another format Supabase might use)
      if (!accessToken) {
        const pathParts = window.location.pathname.split('/');
        const lastPart = pathParts[pathParts.length - 1];
        if (lastPart && lastPart.length > 20) { // rough check for a token-like string
          accessToken = lastPart;
          tokenType = 'recovery'; // assume recovery
        }
      }
      
      console.log('Token detection result:', { found: !!accessToken, tokenType });
      
      return { accessToken, tokenType };
    };
    
    const { accessToken } = extractToken();
    
    if (accessToken) {
      setToken(accessToken);
      console.log('Found potential recovery token in URL');
    } else {
      setError('Could not find reset token in URL. Please request a new password reset link.');
      console.error('Token missing from URL');
    }
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (newPassword.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    
    try {
      setMessage('');
      setError('');
      setLoading(true);
      
      if (!token) {
        throw new Error('No recovery token available');
      }
      
      console.log('Attempting to update password with token');
      
      // Log the token for debugging (partial, for security)
      console.log('Using token:', token.substring(0, 5) + '...');

      try {
        // Try the direct approach first - standard Supabase approach
        const { error: directUpdateError } = await supabase.auth.updateUser({
          password: newPassword
        });
        
        if (directUpdateError) {
          console.log('Direct update failed, trying session approach');
          // Fall back to session + update approach
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: token,
            refresh_token: '',
          });
          
          if (sessionError) {
            throw sessionError;
          }
          
          // Now update the password
          const { error: updateError } = await supabase.auth.updateUser({
            password: newPassword,
          });
          
          if (updateError) {
            throw updateError;
          }
        }
      } catch (err) {
        console.error('Password update error:', err);
        throw err;
      }
      
      // No additional check needed since errors are thrown in the try/catch block
      
      setMessage('Password updated successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      console.error('Reset password error:', err);
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <BackButton to="/login" className="auth-back-button" />
      <div className="auth-form-container">
        <div className="auth-header">
          <h1>Set New Password</h1>
          <p>Create a new password for your account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-success">{message}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      <div className="auth-image">
        <div className="auth-image-overlay"></div>
      </div>
    </div>
  );
};

export default ResetPassword;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AuthCallback: React.FC = () => {
  const [message, setMessage] = useState('Processing your authentication...');
  const navigate = useNavigate();

  useEffect(() => {
    // Get the hash fragment from the URL
    const hash = window.location.hash;
    
    const handleAuthCallback = async () => {
      try {
        // Process the hash fragment (this is where the access token is)
        if (hash) {
          const { error } = await supabase.auth.setSession({
            access_token: hash.substring(1),
            refresh_token: "",
          });

          if (error) {
            throw error;
          }

          // Get the current session
          const { data } = await supabase.auth.getSession();
          
          if (data?.session) {
            setMessage('Authentication successful! Redirecting...');
            // Redirect to dashboard after successful authentication
            setTimeout(() => navigate('/dashboard'), 1500);
          } else {
            setMessage('Authentication failed. Please try logging in again.');
            setTimeout(() => navigate('/login'), 2000);
          }
        } else {
          // No hash found, invalid callback
          setMessage('Invalid authentication callback. Please try logging in again.');
          setTimeout(() => navigate('/login'), 2000);
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setMessage('Authentication error. Please try logging in again.');
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="auth-callback-container">
      <div className="auth-callback-box">
        <h2>Authentication</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AuthCallback;

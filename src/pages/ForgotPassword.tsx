import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BackButton from '../components/common/BackButton';
import '../styles/auth.css';
import '../styles/common.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { resetPassword } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setMessage('');
      setError('');
      setLoading(true);
      
      const { error: resetError } = await resetPassword(email);
      
      if (resetError) {
        throw resetError;
      }
      
      setMessage('Password reset link sent! Check your email inbox.');
    } catch (err: any) {
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
          <h1>Reset Password</h1>
          <p>Enter your email and we'll send you a link to reset your password</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-success">{message}</div>}

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

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="auth-alternate">
          <p>Remember your password? <Link to="/login">Sign in</Link></p>
        </div>
      </div>

      <div className="auth-image">
        <div className="auth-image-overlay"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;

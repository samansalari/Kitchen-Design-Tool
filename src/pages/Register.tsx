import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BackButton from '../components/common/BackButton';
import kitchenImage from '../daniel-diemer-_UDVIZzt4mg-unsplash.jpg';
import '../styles/auth.css';
import '../styles/common.css';



type UserRole = 'homeowner' | 'designer' | 'retailer';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('homeowner');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      
      const { error: signUpError } = await signUp(email, password, name, role);
      
      if (signUpError) {
        throw signUpError;
      }
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <BackButton to="/" className="auth-back-button" />
      <div className="auth-form-container">
        <div className="auth-header">
          <h1>Create an Account</h1>
          <p>Sign up to start designing your dream kitchen</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              disabled={loading}
            />
          </div>

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
              placeholder="Create a password"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>I am a:</label>
            <div className="role-selector">
              <div 
                className={`role-option ${role === 'homeowner' ? 'active' : ''}`}
                onClick={() => !loading && setRole('homeowner')}
              >
                <span className="role-icon">🏠</span>
                <span className="role-name">Homeowner</span>
              </div>
              <div 
                className={`role-option ${role === 'designer' ? 'active' : ''}`}
                onClick={() => !loading && setRole('designer')}
              >
                <span className="role-icon">🎨</span>
                <span className="role-name">Designer</span>
              </div>
              <div 
                className={`role-option ${role === 'retailer' ? 'active' : ''}`}
                onClick={() => !loading && setRole('retailer')}
              >
                <span className="role-icon">🏪</span>
                <span className="role-name">Retailer</span>
              </div>
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-alternate">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>


      </div>

      <div className="auth-image">
        <img 
          src={kitchenImage} 
          alt="Modern kitchen design" 
        />
      </div>
    </div>
  );
};

export default Register;
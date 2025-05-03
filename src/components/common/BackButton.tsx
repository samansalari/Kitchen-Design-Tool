import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../../styles/common.css';

interface BackButtonProps {
  to?: string;       // Optional specific route to navigate to
  label?: string;    // Optional custom label text
  className?: string; // Optional additional CSS class
}

const BackButton: React.FC<BackButtonProps> = ({ 
  to, 
  label = 'Back', 
  className = '' 
}) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1); // Go back one step in history
    }
  };

  return (
    <button 
      className={`back-button ${className}`} 
      onClick={handleBack}
      aria-label="Go back"
    >
      <ArrowLeft size={20} />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;

import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Share2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import '../../styles/projects.css';

interface ProjectCardProps {
  id: string;
  name: string;
  thumbnailUrl: string;
  date: string;
  onProjectDeleted?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, name, thumbnailUrl, date, onProjectDeleted }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to delete project: ${name}?`)) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        console.log(`Project ${id} deleted successfully`);
        // Call the callback to refresh the parent component
        if (onProjectDeleted) {
          onProjectDeleted();
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // In a real app, we would share the project here
    console.log(`Share project ${id}`);
  };

  return (
    <div className="project-card">
      <Link to={`/configurator/${id}`} className="project-card-link">
        <div className="project-thumbnail">
          <img src={thumbnailUrl} alt={name} />
          <div className="project-actions">
            <button className="action-button edit">
              <Edit2 size={16} />
            </button>
            <button className="action-button delete" onClick={handleDelete}>
              <Trash2 size={16} />
            </button>
            <button className="action-button share" onClick={handleShare}>
              <Share2 size={16} />
            </button>
          </div>
        </div>
        <div className="project-info">
          <h3 className="project-name">{name}</h3>
          <p className="project-date">Last edited: {formattedDate}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
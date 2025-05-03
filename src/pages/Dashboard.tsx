import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { PlusCircle } from 'lucide-react';
import ProjectCard from '../components/projects/ProjectCard';
import '../styles/dashboard.css';

interface ProjectCardProps {
  id: string;
  name: string;
  thumbnailUrl: string;
  date: string;
}



const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      // Only fetch projects for authenticated users
      if (!user) return;

      try {
        setLoading(true);
        
        // Authenticated user - fetch projects from Supabase
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });
        
        if (error) throw error;
        
        const formattedProjects = data.map(project => ({
          id: project.id,
          name: project.name,
          thumbnailUrl: project.thumbnail_url || 'https://via.placeholder.com/150',
          date: project.updated_at
        }));
      
        setProjects(formattedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [user]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Kitchen Projects</h1>
        <Link to="/configurator" className="new-project-button">
          <PlusCircle size={20} />
          <span>New Project</span>
        </Link>
      </div>

      <div className="dashboard-filters">
        <div className="search-bar">
          <input type="text" placeholder="Search projects..." />
        </div>
        <div className="filter-options">
          <select defaultValue="recent">
            <option value="recent">Most Recent</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      <div className="projects-grid">
        {loading ? (
          <div className="loading-indicator">Loading projects...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : projects.length === 0 ? (
          <div className="no-projects-message">
            <p>You don't have any projects yet. Create your first kitchen project!</p>
          </div>
        ) : (
          <>
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                thumbnailUrl={project.thumbnailUrl}
                date={project.date}
                onProjectDeleted={() => {
                  // Refresh projects when one is deleted
                  setProjects(projects.filter(p => p.id !== project.id));
                }}
              />
            ))}
          </>
        )}
        <div className="new-project-card">
          <Link to="/configurator" className="new-project-link">
            <div className="new-project-icon">
              <PlusCircle size={48} />
            </div>
            <span>Create New Project</span>
          </Link>
        </div>
      </div>

      <div className="recent-templates">
        <h2>Popular Templates</h2>
        <div className="templates-slider">
          <div className="template-card">
            <img src="https://images.pexels.com/photos/3214064/pexels-photo-3214064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="L-Shaped Kitchen" />
            <h3>L-Shaped Kitchen</h3>
          </div>
          <div className="template-card">
            <img src="https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="U-Shaped Kitchen" />
            <h3>U-Shaped Kitchen</h3>
          </div>
          <div className="template-card">
            <img src="https://images.pexels.com/photos/6636288/pexels-photo-6636288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Island Kitchen" />
            <h3>Island Kitchen</h3>
          </div>
          <div className="template-card">
            <img src="https://images.pexels.com/photos/6969809/pexels-photo-6969809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Galley Kitchen" />
            <h3>Galley Kitchen</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
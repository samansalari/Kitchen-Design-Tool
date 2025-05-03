import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Monitor, Grid, FileText, Layers, PaintBucket, Ruler, Wrench, Clock, Cloud, Lock, Palette } from 'lucide-react';
import MarketingLayout from '../components/layout/MarketingLayout';
import BackButton from '../components/common/BackButton';
import '../styles/features.css';
import '../styles/common.css';

const FeatureSection: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  reverse?: boolean;
}> = ({ title, description, icon, imageUrl, reverse }) => (
  <div className={`feature-section ${reverse ? 'feature-reverse' : ''}`}>
    <div className="feature-content">
      <div className="feature-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    <div className="feature-image">
      <img src={imageUrl} alt={title} />
    </div>
  </div>
);

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => (
  <div className="feature-card">
    <div className="feature-card-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <MarketingLayout>
      <div className="features-page">
        <header className="features-header">
          <div className="container">
            <h1>Powerful Kitchen Design Features</h1>
            <p className="header-subtitle">
              Everything you need to create stunning, functional kitchen designs
            </p>
          </div>
        </header>
      
      <div className="container">
        <BackButton to="/" className="marketing-back-button" />
      </div>

      <main className="features-main container">
        {/* Hero Feature */}
        <section className="hero-feature">
          <div className="hero-feature-content">
            <h2>Professional Kitchen Design Made Simple</h2>
            <p>
              Our kitchen design tool empowers homeowners and professionals alike to create
              beautiful, functional kitchens with ease. From initial concept to final plans,
              we provide all the tools you need to bring your vision to life.
            </p>
            <div className="hero-feature-actions">
              <Link to="/register" className="primary-button">
                Try It Free
              </Link>
              <Link to="/configurator" className="secondary-button">
                View Demo
              </Link>
            </div>
          </div>
          <div className="hero-feature-image">
            <img src="https://images.pexels.com/photos/6444260/pexels-photo-6444260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Kitchen Design Tool" />
          </div>
        </section>

        {/* Feature Sections */}
        <FeatureSection
          title="Intuitive Design Canvas"
          description="Drag and drop cabinets, appliances, and fixtures onto your canvas. Resize, rotate, and position elements with precision. Our intuitive interface makes complex kitchen design accessible to everyone."
          icon={<Grid size={48} strokeWidth={1.5} />}
          imageUrl="https://images.pexels.com/photos/280471/pexels-photo-280471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />

        <FeatureSection
          title="2D & 3D Visualization"
          description="Switch between 2D floor plans and immersive 3D renderings with a single click. See your design from any angle to ensure perfect proportions and spatial relationships."
          icon={<Layers size={48} strokeWidth={1.5} />}
          imageUrl="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          reverse={true}
        />

        <FeatureSection
          title="Material & Finish Library"
          description="Choose from thousands of countertops, cabinet finishes, hardware options, and appliances. Apply real-world materials to see exactly how your kitchen will look."
          icon={<PaintBucket size={48} strokeWidth={1.5} />}
          imageUrl="https://images.pexels.com/photos/6758773/pexels-photo-6758773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />

        <FeatureSection
          title="Precise Measurements & Cost Estimation"
          description="Get accurate dimensions and real-time cost estimates as you design. Our pricing algorithm takes into account materials, labor, and regional cost factors to give you reliable budget information."
          icon={<Ruler size={48} strokeWidth={1.5} />}
          imageUrl="https://images.pexels.com/photos/8157617/pexels-photo-8157617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          reverse={true}
        />

        <FeatureSection
          title="Professional Documentation"
          description="Generate detailed plans, elevations, and specifications with a single click. Export your design to PDF, CAD, or other formats to share with contractors, suppliers, or clients."
          icon={<FileText size={48} strokeWidth={1.5} />}
          imageUrl="https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />

        {/* More Features Grid */}
        <section className="more-features">
          <h2>More Powerful Features</h2>
          <div className="features-grid">
            <FeatureCard
              title="Template Library"
              description="Start with professionally designed templates to speed up your design process."
              icon={<Monitor size={36} />}
            />
            <FeatureCard
              title="Real-time Collaboration"
              description="Work together with family members or clients on the same design."
              icon={<Clock size={36} />}
            />
            <FeatureCard
              title="Cloud Storage"
              description="Save your designs securely in the cloud and access them from anywhere."
              icon={<Cloud size={36} />}
            />
            <FeatureCard
              title="Expert Consultation"
              description="Get advice from kitchen design experts when you need guidance."
              icon={<Wrench size={36} />}
            />
            <FeatureCard
              title="Advanced Color Schemes"
              description="Generate complementary color schemes based on your selections."
              icon={<Palette size={36} />}
            />
            <FeatureCard
              title="Privacy & Security"
              description="Your designs and personal information are always secure with us."
              icon={<Lock size={36} />}
            />
          </div>
        </section>

        {/* Feature List */}
        <section className="feature-list">
          <h2>Everything You Need for Kitchen Design</h2>
          <div className="list-columns">
            <ul>
              <li><CheckCircle size={20} /> Cabinet layout and design</li>
              <li><CheckCircle size={20} /> Appliance placement</li>
              <li><CheckCircle size={20} /> Countertop selection</li>
              <li><CheckCircle size={20} /> Hardware options</li>
              <li><CheckCircle size={20} /> Lighting planning</li>
            </ul>
            <ul>
              <li><CheckCircle size={20} /> Precise measurements</li>
              <li><CheckCircle size={20} /> Material cost calculator</li>
              <li><CheckCircle size={20} /> Project management tools</li>
              <li><CheckCircle size={20} /> Export to multiple formats</li>
              <li><CheckCircle size={20} /> Contractor collaboration</li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <section className="feature-cta">
          <h2>Ready to Design Your Dream Kitchen?</h2>
          <p>Join thousands of homeowners who have successfully designed their perfect kitchen.</p>
          <div className="cta-buttons">
            <Link to="/register" className="primary-button">
              Get Started Free
            </Link>
            <Link to="/login" className="text-button">
              Already have an account? Sign in
            </Link>
          </div>
        </section>
      </main>
      </div>
    </MarketingLayout>
  );
};

export default Features;

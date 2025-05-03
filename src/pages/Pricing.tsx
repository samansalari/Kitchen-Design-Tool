import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, X, Zap, Archive, Cpu, Users } from 'lucide-react';
import MarketingLayout from '../components/layout/MarketingLayout';
import BackButton from '../components/common/BackButton';
import '../styles/common.css';
import '../styles/pricing.css';

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  unavailableFeatures?: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaLink: string;
  icon: React.ReactNode;
  billingPeriod: 'monthly' | 'annual';
}

const PricingTier: React.FC<PricingTierProps> = ({
  name,
  price,
  description,
  features,
  unavailableFeatures = [],
  isPopular = false,
  ctaText,
  ctaLink,
  icon,
  billingPeriod
}) => {
  return (
    <div className={`pricing-tier ${isPopular ? 'popular-tier' : ''}`}>
      {isPopular && <div className="popular-badge">Most Popular</div>}
      <div className="tier-header">
        <div className="tier-icon">{icon}</div>
        <h3>{name}</h3>
        <div className="tier-price">
          <span className="price">{price}</span>
          {price !== 'Custom' && price !== 'Free' && (
            <span className="period">
              {billingPeriod === 'monthly' ? '/month' : '/year'}
            </span>
          )}
        </div>
        <p className="tier-description">{description}</p>
      </div>
      <div className="tier-features">
        <ul className="feature-list">
          {features.map((feature, index) => (
            <li key={index}>
              <CheckCircle size={18} />
              <span>{feature}</span>
            </li>
          ))}
          {unavailableFeatures.map((feature, index) => (
            <li key={`unavailable-${index}`} className="unavailable">
              <X size={18} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="tier-cta">
        <Link to={ctaLink} className={`cta-button ${isPopular ? 'primary-cta' : 'secondary-cta'}`}>
          {ctaText}
        </Link>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'annual'>('monthly');
  
  // Calculate annual price with 20% discount
  const getPrice = (monthlyPrice: string | number, period: 'monthly' | 'annual'): string => {
    if (monthlyPrice === 'Free' || monthlyPrice === 'Custom') return monthlyPrice;
    
    const numericPrice = typeof monthlyPrice === 'string' 
      ? parseFloat(monthlyPrice.replace('£', '')) 
      : monthlyPrice;
      
    if (period === 'annual') {
      // Apply 20% discount and multiply by 12 months
      const annualPrice = Math.round(numericPrice * 0.8 * 12);
      return `£${annualPrice}`;
    }
    
    // Return monthly price with £ prefix if it's a number
    return typeof monthlyPrice === 'number' ? `£${monthlyPrice}` : monthlyPrice;
  };
  
  const toggleBillingPeriod = (period: 'monthly' | 'annual') => {
    setBillingPeriod(period);
  };
  
  return (
    <MarketingLayout>
      <div className="pricing-page">
        <header className="pricing-header">
          <div className="container">
            <h1>Simple, Transparent Pricing</h1>
            <p className="header-subtitle">
              Choose the plan that works best for your kitchen design needs
            </p>
          </div>
        </header>

        <div className="container">
          <BackButton to="/" className="marketing-back-button" />
        </div>

        <section className="pricing-toggle container">
          <div className="billing-toggle">
            <span 
              className={`toggle-option ${billingPeriod === 'monthly' ? 'active' : ''}`}
              onClick={() => toggleBillingPeriod('monthly')}
            >
              Monthly
            </span>
            <span 
              className={`toggle-option ${billingPeriod === 'annual' ? 'active' : ''}`}
              onClick={() => toggleBillingPeriod('annual')}
            >
              Annual (Save 20%)
            </span>
          </div>
        </section>

        <section className="pricing-tiers container">
          <PricingTier
            name="Starter"
            price={billingPeriod === 'monthly' ? 'Free' : 'Free'}
            description="Perfect for individuals exploring kitchen design options"
            icon={<Archive size={28} />}
            billingPeriod={billingPeriod}
            features={[
              "Basic kitchen layout editor",
              "5 kitchen designs",
              "Standard material library",
              "2D visualization",
              "Export to PDF"
            ]}
            unavailableFeatures={[
              "3D visualization",
              "Cost estimation",
              "Custom materials",
              "Project sharing"
            ]}
            ctaText="Get Started Free"
            ctaLink="/register"
          />
          
          <PricingTier
            name="Professional"
            price={getPrice(29, billingPeriod)}
            description="For homeowners and DIY enthusiasts with serious projects"
            icon={<Zap size={28} />}
            billingPeriod={billingPeriod}
            features={[
              "Advanced kitchen layout editor",
              "Unlimited kitchen designs",
              "Complete material library",
              "2D & 3D visualization",
              "Cost estimation",
              "Export to PDF & CAD",
              "Project sharing",
              "Basic support"
            ]}
            isPopular={true}
            ctaText="Start 14-day Free Trial"
            ctaLink="/register?plan=pro"
          />
          
          <PricingTier
            name="Enterprise"
            price="Custom"
            description="For design professionals, studios and contractors"
            icon={<Cpu size={28} />}
            billingPeriod={billingPeriod}
            features={[
              "Everything in Professional",
              "Team collaboration",
              "API access",
              "White-label options",
              "Client management",
              "Advanced analytics",
              "Integration with supplier catalogs",
              "Custom branding",
              "Priority support"
            ]}
            ctaText="Contact Sales"
            ctaLink="/contact-sales"
          />
        </section>

        <section className="faq-section container">
          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Can I change plans anytime?</h3>
              <p>Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new rate will be charged immediately. If you downgrade, the new rate will apply at your next billing cycle.</p>
            </div>
            
            <div className="faq-item">
              <h3>Is there a free trial period?</h3>
              <p>Yes, all paid plans include a 14-day free trial so you can test all features before making a commitment.</p>
            </div>
            
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept major credit cards including Visa, Mastercard, American Express, and Discover. For Enterprise plans, we also offer invoicing options.</p>
            </div>
            
            <div className="faq-item">
              <h3>Can I cancel my subscription?</h3>
              <p>You can cancel your subscription at any time. You'll continue to have access to your plan's features until the end of your current billing period.</p>
            </div>
            
            <div className="faq-item">
              <h3>Are there any refunds if I'm not satisfied?</h3>
              <p>We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with our service, contact our support team for a full refund within 30 days of your purchase.</p>
            </div>
            
            <div className="faq-item">
              <h3>Do you offer educational discounts?</h3>
              <p>Yes, we offer special pricing for educational institutions and students. Please contact our sales team for details.</p>
            </div>
          </div>
        </section>

        <section className="enterprise-cta container">
          <div className="cta-content">
            <div className="cta-icon">
              <Users size={42} />
            </div>
            <div className="cta-text">
              <h2>Need a custom solution for your team?</h2>
              <p>Let us create a tailored plan for your organization's specific requirements.</p>
            </div>
            <Link to="/contact-enterprise" className="enterprise-button">
              Contact Enterprise Sales
            </Link>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
};

export default Pricing;

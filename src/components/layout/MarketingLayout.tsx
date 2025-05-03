import React, { ReactNode } from 'react';
import MarketingHeader from './MarketingHeader';
import MarketingFooter from './MarketingFooter';

interface MarketingLayoutProps {
  children: ReactNode;
}

const MarketingLayout: React.FC<MarketingLayoutProps> = ({ children }) => {
  return (
    <div className="marketing-layout">
      <MarketingHeader />
      <main className="marketing-content">
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
};

export default MarketingLayout;

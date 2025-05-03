import React from 'react';
import { Cabinet } from '../../types';
import '../../styles/pricing-panel.css';

interface PricingPanelProps {
  totalPrice: number;
  selectedCabinets: Cabinet[];
}

const PricingPanel: React.FC<PricingPanelProps> = ({ totalPrice, selectedCabinets }) => {
  const cabinetCount = selectedCabinets.length;
  const taxRate = 0.0875; // 8.75% tax rate
  const taxAmount = totalPrice * taxRate;
  const grandTotal = totalPrice + taxAmount;
  
  // Estimated shipping based on total price
  const estimateShipping = () => {
    if (totalPrice === 0) return 0;
    if (totalPrice < 1000) return 99;
    if (totalPrice < 2500) return 179;
    if (totalPrice < 5000) return 249;
    return 299;
  };
  
  const shippingEstimate = estimateShipping();
  const finalTotal = grandTotal + shippingEstimate;

  return (
    <div className="pricing-panel">
      <h3>Price Estimate</h3>
      
      <div className="price-summary">
        <div className="price-line">
          <span>Cabinets ({cabinetCount})</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="price-line">
          <span>Tax ({(taxRate * 100).toFixed(2)}%)</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        
        <div className="price-line subtotal">
          <span>Subtotal</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
        
        <div className="price-line shipping">
          <span>Estimated Shipping</span>
          <span>${shippingEstimate.toFixed(2)}</span>
        </div>
        
        <div className="price-line total">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="pricing-note">
        <p>Prices are estimates and may vary based on final design and material availability.</p>
      </div>
      
      <div className="pricing-actions">
        <button className="save-design-button">Save Design</button>
        <button className="get-quote-button">Get Detailed Quote</button>
      </div>
    </div>
  );
};

export default PricingPanel;
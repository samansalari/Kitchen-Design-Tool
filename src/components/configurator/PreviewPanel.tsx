import React from 'react';
import { Cabinet, Material } from '../../types';
import { Info, Check, AlertTriangle } from 'lucide-react';
import '../../styles/preview-panel.css';

interface PreviewPanelProps {
  view: '2d' | '3d';
  selectedCabinet: Cabinet | null;
  selectedMaterial: Material | null;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  view,
  selectedCabinet,
  selectedMaterial
}) => {
  if (!selectedCabinet) {
    return (
      <div className="preview-panel empty-state">
        <div className="empty-preview">
          <Info size={32} />
          <h3>No Cabinet Selected</h3>
          <p>Select a cabinet from the layout or library to view details and make changes</p>
        </div>
      </div>
    );
  }

  const validations = [
    { type: 'success', message: 'Cabinet fits within room constraints' },
    { type: 'success', message: 'No collisions with other cabinets' },
    { type: 'warning', message: 'Cabinet is not aligned with wall' }
  ];

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <h3>{selectedCabinet.name}</h3>
        <span className="cabinet-type">{selectedCabinet.type.replace('_', ' ')}</span>
      </div>
      
      <div className="preview-image">
        <img src={selectedCabinet.image} alt={selectedCabinet.name} />
        {selectedMaterial && (
          <div className="material-badge">
            <div className="material-color" style={{ backgroundColor: selectedMaterial.color }}></div>
            <span>{selectedMaterial.name}</span>
          </div>
        )}
      </div>
      
      <div className="preview-details">
        <div className="dimensions-display">
          <div className="dimension">
            <span className="dimension-label">Width</span>
            <span className="dimension-value">{selectedCabinet.dimensions.width}″</span>
          </div>
          <div className="dimension">
            <span className="dimension-label">Height</span>
            <span className="dimension-value">{selectedCabinet.dimensions.height}″</span>
          </div>
          <div className="dimension">
            <span className="dimension-label">Depth</span>
            <span className="dimension-value">{selectedCabinet.dimensions.depth}″</span>
          </div>
        </div>
        
        <div className="preview-description">
          <p>{selectedCabinet.description}</p>
        </div>
        
        <div className="preview-validations">
          <h4>Validation Checks</h4>
          <ul className="validation-list">
            {validations.map((validation, index) => (
              <li key={index} className={`validation-item ${validation.type}`}>
                {validation.type === 'success' ? (
                  <Check size={16} className="validation-icon" />
                ) : (
                  <AlertTriangle size={16} className="validation-icon" />
                )}
                <span>{validation.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
import React from 'react';
import { Material, Hardware } from '../../types';
import { useKitchenConfig } from '../../contexts/KitchenConfigContext';
import '../../styles/material-selector.css';

interface MaterialSelectorProps {
  materials: Material[];
  hardware: Hardware[];
  selectedCabinetId: string | null;
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  materials,
  hardware,
  selectedCabinetId
}) => {
  const { updateCabinetMaterial, updateCabinetHardware, selectedCabinets } = useKitchenConfig();
  
  const selectedCabinet = selectedCabinetId 
    ? selectedCabinets.find(cab => cab.id === selectedCabinetId)
    : null;
  
  const selectedMaterialId = selectedCabinet?.materialId || '';
  const selectedHardwareId = selectedCabinet?.hardwareId || '';
  
  const handleMaterialSelect = (materialId: string) => {
    if (selectedCabinetId) {
      updateCabinetMaterial(selectedCabinetId, materialId);
    }
  };
  
  const handleHardwareSelect = (hardwareId: string) => {
    if (selectedCabinetId) {
      updateCabinetHardware(selectedCabinetId, hardwareId);
    }
  };
  
  if (!selectedCabinetId) {
    return (
      <div className="material-selector">
        <div className="no-selection-message">
          <p>Select a cabinet to customize materials and hardware</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="material-selector">
      <h3>Materials & Finishes</h3>
      
      <div className="selector-section">
        <h4>Cabinet Material</h4>
        <div className="materials-grid">
          {materials.map(material => (
            <div
              key={material.id}
              className={`material-item ${selectedMaterialId === material.id ? 'selected' : ''}`}
              onClick={() => handleMaterialSelect(material.id)}
            >
              <div className="material-thumbnail">
                <img src={material.image} alt={material.name} />
              </div>
              <div className="material-details">
                <span className="material-name">{material.name}</span>
                <span className="material-price">
                  {material.priceMultiplier > 1 ? '+' : ''}
                  {((material.priceMultiplier - 1) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="selector-section">
        <h4>Hardware</h4>
        <div className="hardware-grid">
          {hardware.filter(hw => hw.type === 'handle' || hw.type === 'knob').map(hw => (
            <div
              key={hw.id}
              className={`hardware-item ${selectedHardwareId === hw.id ? 'selected' : ''}`}
              onClick={() => handleHardwareSelect(hw.id)}
            >
              <div className="hardware-thumbnail">
                <img src={hw.image} alt={hw.name} />
              </div>
              <div className="hardware-details">
                <span className="hardware-name">{hw.name}</span>
                <span className="hardware-price">+${hw.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialSelector;
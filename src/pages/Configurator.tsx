import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useKitchenConfig } from '../contexts/KitchenConfigContext';
import DesignCanvas from '../components/configurator/DesignCanvas';
import CabinetLibrary from '../components/configurator/CabinetLibrary';
import MaterialSelector from '../components/configurator/MaterialSelector';
import PricingPanel from '../components/configurator/PricingPanel';
import ConfiguratorToolbar from '../components/configurator/ConfiguratorToolbar';
import PreviewPanel from '../components/configurator/PreviewPanel';
import '../styles/configurator.css';

const Configurator: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    cabinets, 
    materials, 
    hardware, 
    selectedCabinets, 
    totalPrice,
    addCabinetToLayout,
    removeCabinetFromLayout,
    updateCabinetDimensions
  } = useKitchenConfig();

  const [view, setView] = useState<'2d' | '3d'>('2d');
  const [activeTool, setActiveTool] = useState<string>('select');
  const [selectedCabinetId, setSelectedCabinetId] = useState<string | null>(null);
  const [showMaterialSelector, setShowMaterialSelector] = useState<boolean>(false);

  const handleToolChange = (tool: string) => {
    setActiveTool(tool);
  };

  const handleViewToggle = () => {
    setView(view === '2d' ? '3d' : '2d');
  };

  const handleCabinetSelect = (cabinetId: string) => {
    setSelectedCabinetId(cabinetId);
  };

  const handleAddCabinet = (cabinetId: string, position: { x: number, y: number }) => {
    const cabinetToAdd = cabinets.find(cab => cab.id === cabinetId);
    if (cabinetToAdd) {
      addCabinetToLayout(cabinetToAdd, position);
    }
  };

  const handleToggleMaterialSelector = () => {
    setShowMaterialSelector(!showMaterialSelector);
  };

  // Find the selected cabinet
  const selectedCabinet = selectedCabinetId 
    ? selectedCabinets.find(cab => cab.id === selectedCabinetId) 
    : null;

  // Find selected cabinet's material
  const selectedMaterial = selectedCabinet?.materialId
    ? materials.find(mat => mat.id === selectedCabinet.materialId)
    : null;

  return (
    <div className="configurator-container">
      <ConfiguratorToolbar 
        activeTool={activeTool} 
        view={view}
        onToolChange={handleToolChange} 
        onViewToggle={handleViewToggle}
        onToggleMaterialSelector={handleToggleMaterialSelector}
      />
      
      <div className="configurator-main">
        <div className="configurator-sidebar">
          <CabinetLibrary 
            cabinets={cabinets} 
            onCabinetSelect={handleCabinetSelect}
            onAddCabinet={handleAddCabinet}
          />
        </div>
        
        <div className="configurator-workspace">
          <DesignCanvas 
            view={view}
            selectedCabinets={selectedCabinets}
            activeTool={activeTool}
            onCabinetSelect={handleCabinetSelect}
            onAddCabinet={handleAddCabinet}
            onRemoveCabinet={removeCabinetFromLayout}
            onUpdateDimensions={updateCabinetDimensions}
            selectedCabinetId={selectedCabinetId}
          />
        </div>
        
        <div className="configurator-properties">
          <PreviewPanel 
            view={view}
            selectedCabinet={selectedCabinet}
            selectedMaterial={selectedMaterial}
          />
          
          {showMaterialSelector && (
            <MaterialSelector 
              materials={materials}
              hardware={hardware}
              selectedCabinetId={selectedCabinetId}
            />
          )}
          
          <PricingPanel totalPrice={totalPrice} selectedCabinets={selectedCabinets} />
        </div>
      </div>
    </div>
  );
};

export default Configurator;
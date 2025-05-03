import React, { useState } from 'react';
import { Cabinet } from '../../types';
import { Filter, Search } from 'lucide-react';
import '../../styles/cabinet-library.css';

interface CabinetLibraryProps {
  cabinets: Cabinet[];
  onCabinetSelect: (cabinetId: string) => void;
  onAddCabinet: (cabinetId: string, position: { x: number, y: number }) => void;
}

const CabinetLibrary: React.FC<CabinetLibraryProps> = ({ cabinets, onCabinetSelect, onAddCabinet }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const cabinetTypes = Array.from(new Set(cabinets.map(cab => cab.type)));
  
  const filteredCabinets = cabinets.filter(cabinet => {
    const matchesSearch = cabinet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cabinet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter ? cabinet.type === activeFilter : true;
    
    return matchesSearch && matchesFilter;
  });
  
  const handleFilterClick = (type: string) => {
    setActiveFilter(activeFilter === type ? null : type);
  };
  
  const handleDragStart = (e: React.DragEvent, cabinetId: string) => {
    e.dataTransfer.setData('cabinetId', cabinetId);
  };

  return (
    <div className="cabinet-library">
      <div className="library-header">
        <h2>Cabinet Library</h2>
        <div className="library-search">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search cabinets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="library-filters">
        <div className="filter-label">
          <Filter size={16} />
          <span>Filter by:</span>
        </div>
        <div className="filter-buttons">
          {cabinetTypes.map(type => (
            <button
              key={type}
              className={`filter-button ${activeFilter === type ? 'active' : ''}`}
              onClick={() => handleFilterClick(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="cabinets-list">
        {filteredCabinets.map(cabinet => (
          <div
            key={cabinet.id}
            className="cabinet-item"
            onClick={() => onCabinetSelect(cabinet.id)}
            draggable
            onDragStart={(e) => handleDragStart(e, cabinet.id)}
          >
            <div className="cabinet-item-image">
              <img src={cabinet.thumbnailImage} alt={cabinet.name} />
            </div>
            <div className="cabinet-item-details">
              <h3>{cabinet.name}</h3>
              <p className="cabinet-dimensions">
                {cabinet.dimensions.width}″W × {cabinet.dimensions.height}″H × {cabinet.dimensions.depth}″D
              </p>
              <p className="cabinet-price">${cabinet.basePrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CabinetLibrary;
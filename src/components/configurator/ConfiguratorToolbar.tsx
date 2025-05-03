import React from 'react';
import { 
  Mouse, 
  HandMetal, 
  Ruler, 
  Trash2, 
  Save, 
  ZoomIn,
  RotateCcw,
  RotateCw,
  Palette,
  Eye,
  FileText,
  Download,
  Share2
} from 'lucide-react';
import '../../styles/configurator-toolbar.css';

interface ConfiguratorToolbarProps {
  activeTool: string;
  view: '2d' | '3d';
  onToolChange: (tool: string) => void;
  onViewToggle: () => void;
  onToggleMaterialSelector: () => void;
}

const ConfiguratorToolbar: React.FC<ConfiguratorToolbarProps> = ({
  activeTool,
  view,
  onToolChange,
  onViewToggle,
  onToggleMaterialSelector
}) => {
  return (
    <div className="configurator-toolbar">
      <div className="toolbar-section tools">
        <button 
          className={`toolbar-button ${activeTool === 'select' ? 'active' : ''}`}
          onClick={() => onToolChange('select')}
          title="Select Tool"
        >
          <Mouse size={20} />
        </button>
        <button 
          className={`toolbar-button ${activeTool === 'move' ? 'active' : ''}`}
          onClick={() => onToolChange('move')}
          title="Move Tool"
        >
          <HandMetal size={20} />
        </button>
        <button 
          className={`toolbar-button ${activeTool === 'measure' ? 'active' : ''}`}
          onClick={() => onToolChange('measure')}
          title="Measure Tool"
        >
          <Ruler size={20} />
        </button>
        <button 
          className={`toolbar-button ${activeTool === 'delete' ? 'active' : ''}`}
          onClick={() => onToolChange('delete')}
          title="Delete Tool"
        >
          <Trash2 size={20} />
        </button>
        <div className="toolbar-divider"></div>
        <button 
          className="toolbar-button"
          onClick={onToggleMaterialSelector}
          title="Materials Panel"
        >
          <Palette size={20} />
        </button>
      </div>
      
      <div className="toolbar-section view-controls">
        <button 
          className={`view-toggle-button ${view === '2d' ? 'active' : ''}`}
          onClick={onViewToggle}
          title="Toggle 2D/3D View"
        >
          <Eye size={20} />
          <span>{view === '2d' ? '2D View' : '3D View'}</span>
        </button>
        <button className="toolbar-button" title="Zoom In">
          <ZoomIn size={20} />
        </button>
        <button className="toolbar-button" title="Rotate Left">
          <RotateCcw size={20} />
        </button>
        <button className="toolbar-button" title="Rotate Right">
          <RotateCw size={20} />
        </button>
      </div>
      
      <div className="toolbar-section actions">
        <button className="toolbar-button" title="Save Design">
          <Save size={20} />
        </button>
        <button className="toolbar-button" title="Export Documentation">
          <FileText size={20} />
        </button>
        <button className="toolbar-button" title="Download">
          <Download size={20} />
        </button>
        <button className="toolbar-button" title="Share">
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default ConfiguratorToolbar;
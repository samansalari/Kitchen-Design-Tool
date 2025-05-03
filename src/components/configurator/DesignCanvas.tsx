import React, { useRef, useEffect, useState } from 'react';
import { Cabinet } from '../../types';
import '../../styles/design-canvas.css';

interface DesignCanvasProps {
  view: '2d' | '3d';
  selectedCabinets: Cabinet[];
  activeTool: string;
  selectedCabinetId: string | null;
  onCabinetSelect: (cabinetId: string) => void;
  onAddCabinet: (cabinetId: string, position: { x: number, y: number }) => void;
  onRemoveCabinet: (cabinetId: string) => void;
  onUpdateDimensions: (id: string, dimensions: { width?: number, height?: number, depth?: number }) => void;
}

const GRID_SIZE = 12; // 1 foot = 12 inches
const CANVAS_PADDING = 50;

const DesignCanvas: React.FC<DesignCanvasProps> = ({
  view,
  selectedCabinets,
  activeTool,
  selectedCabinetId,
  onCabinetSelect,
  onAddCabinet,
  onRemoveCabinet,
  onUpdateDimensions
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState<{ direction: string; cabinetId: string } | null>(null);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setCanvasSize({
          width: clientWidth - 2, // Account for border
          height: clientHeight - 2
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Draw the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height);

    // Draw selected cabinets
    drawCabinets(ctx);

  }, [selectedCabinets, canvasSize, selectedCabinetId, view]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;

    // Draw vertical lines
    for (let x = CANVAS_PADDING; x < width - CANVAS_PADDING; x += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, CANVAS_PADDING);
      ctx.lineTo(x, height - CANVAS_PADDING);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = CANVAS_PADDING; y < height - CANVAS_PADDING; y += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(CANVAS_PADDING, y);
      ctx.lineTo(width - CANVAS_PADDING, y);
      ctx.stroke();
    }

    // Draw walls (thicker lines around the perimeter)
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 3;
    ctx.strokeRect(
      CANVAS_PADDING, 
      CANVAS_PADDING, 
      width - CANVAS_PADDING * 2, 
      height - CANVAS_PADDING * 2
    );

    ctx.restore();
  };

  const drawCabinets = (ctx: CanvasRenderingContext2D) => {
    selectedCabinets.forEach(cabinet => {
      const { position, dimensions } = cabinet;
      if (!position) return;

      const x = position.x;
      const y = position.y;
      const width = dimensions.width;
      const depth = dimensions.depth;

      // Check if this cabinet is selected
      const isSelected = cabinet.id === selectedCabinetId;

      // Set fill style
      if (isSelected) {
        ctx.fillStyle = 'rgba(0, 120, 255, 0.3)';
        ctx.strokeStyle = '#0078FF';
        ctx.lineWidth = 2;
      } else {
        ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
      }

      // Draw the cabinet
      ctx.beginPath();
      ctx.rect(x, y, width, depth);
      ctx.fill();
      ctx.stroke();

      // Add label
      ctx.fillStyle = '#333';
      ctx.font = '10px Arial';
      ctx.fillText(cabinet.name, x + 5, y + 15);
      ctx.fillText(`${width}"W x ${depth}"D`, x + 5, y + 30);

      // Draw resize handles if selected
      if (isSelected) {
        drawResizeHandles(ctx, x, y, width, depth);
      }
    });
  };

  const drawResizeHandles = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    width: number, 
    depth: number
  ) => {
    const handleSize = 8;
    ctx.fillStyle = '#0078FF';
    
    // Top-left handle
    ctx.fillRect(x - handleSize / 2, y - handleSize / 2, handleSize, handleSize);
    
    // Top-right handle
    ctx.fillRect(x + width - handleSize / 2, y - handleSize / 2, handleSize, handleSize);
    
    // Bottom-left handle
    ctx.fillRect(x - handleSize / 2, y + depth - handleSize / 2, handleSize, handleSize);
    
    // Bottom-right handle
    ctx.fillRect(x + width - handleSize / 2, y + depth - handleSize / 2, handleSize, handleSize);
    
    // Middle-right handle (width)
    ctx.fillRect(x + width - handleSize / 2, y + depth / 2 - handleSize / 2, handleSize, handleSize);
    
    // Middle-bottom handle (height)
    ctx.fillRect(x + width / 2 - handleSize / 2, y + depth - handleSize / 2, handleSize, handleSize);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if we clicked on a cabinet
    let clickedCabinet = null;
    for (let i = selectedCabinets.length - 1; i >= 0; i--) {
      const cabinet = selectedCabinets[i];
      if (!cabinet.position) continue;
      
      const cabX = cabinet.position.x;
      const cabY = cabinet.position.y;
      const cabWidth = cabinet.dimensions.width;
      const cabDepth = cabinet.dimensions.depth;
      
      if (
        x >= cabX && 
        x <= cabX + cabWidth && 
        y >= cabY && 
        y <= cabY + cabDepth
      ) {
        clickedCabinet = cabinet;
        break;
      }
    }
    
    if (clickedCabinet) {
      onCabinetSelect(clickedCabinet.id);
    } else if (activeTool === 'delete' && selectedCabinetId) {
      onRemoveCabinet(selectedCabinetId);
    } else {
      // Deselect if clicked on empty space
      onCabinetSelect('');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const cabinetId = e.dataTransfer.getData('cabinetId');
    if (!cabinetId) return;
    
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Snap to grid
    const snappedX = Math.round((x - CANVAS_PADDING) / GRID_SIZE) * GRID_SIZE + CANVAS_PADDING;
    const snappedY = Math.round((y - CANVAS_PADDING) / GRID_SIZE) * GRID_SIZE + CANVAS_PADDING;
    
    onAddCabinet(cabinetId, { x: snappedX, y: snappedY });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canvasRef.current || !selectedCabinetId) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Find the selected cabinet
    const cabinet = selectedCabinets.find(cab => cab.id === selectedCabinetId);
    if (!cabinet || !cabinet.position) return;
    
    const cabX = cabinet.position.x;
    const cabY = cabinet.position.y;
    const cabWidth = cabinet.dimensions.width;
    const cabDepth = cabinet.dimensions.depth;
    
    // Check if we're on a resize handle
    const handleSize = 8;
    
    // Check each resize handle
    if (Math.abs(x - (cabX + cabWidth)) < handleSize && Math.abs(y - (cabY + cabDepth / 2)) < handleSize) {
      // Right middle handle (width)
      setResizing({ direction: 'width', cabinetId: selectedCabinetId });
    } else if (Math.abs(x - (cabX + cabWidth / 2)) < handleSize && Math.abs(y - (cabY + cabDepth)) < handleSize) {
      // Bottom middle handle (depth)
      setResizing({ direction: 'depth', cabinetId: selectedCabinetId });
    } else if (
      x >= cabX && 
      x <= cabX + cabWidth && 
      y >= cabY && 
      y <= cabY + cabDepth
    ) {
      // Start dragging the cabinet
      setIsDragging(true);
      setDragStart({ x, y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (isDragging && selectedCabinetId) {
      // Handle cabinet dragging
      const cabinet = selectedCabinets.find(cab => cab.id === selectedCabinetId);
      if (!cabinet || !cabinet.position) return;
      
      const dx = x - dragStart.x;
      const dy = y - dragStart.y;
      
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        // Update cabinet position
        const newX = cabinet.position.x + dx;
        const newY = cabinet.position.y + dy;
        
        // Snap to grid
        const snappedX = Math.round((newX - CANVAS_PADDING) / GRID_SIZE) * GRID_SIZE + CANVAS_PADDING;
        const snappedY = Math.round((newY - CANVAS_PADDING) / GRID_SIZE) * GRID_SIZE + CANVAS_PADDING;
        
        // Create a new cabinet with updated position
        const updatedCabinet = {
          ...cabinet,
          position: { x: snappedX, y: snappedY }
        };
        
        // Update the cabinet in the context
        // onUpdateCabinet(updatedCabinet);
        
        // Reset drag start
        setDragStart({ x, y });
      }
    } else if (resizing && resizing.cabinetId) {
      // Handle cabinet resizing
      const cabinet = selectedCabinets.find(cab => cab.id === resizing.cabinetId);
      if (!cabinet || !cabinet.position) return;
      
      if (resizing.direction === 'width') {
        // Calculate new width
        let newWidth = x - cabinet.position.x;
        
        // Snap to grid and ensure minimum size
        newWidth = Math.max(Math.round(newWidth / GRID_SIZE) * GRID_SIZE, GRID_SIZE);
        
        // Update cabinet dimensions
        onUpdateDimensions(cabinet.id, { width: newWidth });
      } else if (resizing.direction === 'depth') {
        // Calculate new depth
        let newDepth = y - cabinet.position.y;
        
        // Snap to grid and ensure minimum size
        newDepth = Math.max(Math.round(newDepth / GRID_SIZE) * GRID_SIZE, GRID_SIZE);
        
        // Update cabinet dimensions
        onUpdateDimensions(cabinet.id, { depth: newDepth });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizing(null);
  };

  return (
    <div 
      ref={containerRef} 
      className="design-canvas-container"
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="design-canvas"
        onClick={handleCanvasClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      {view === '2d' ? (
        <div className="canvas-overlay">
          <div className="canvas-tools">
            <span className="view-label">2D Floor Plan</span>
          </div>
          <div className="canvas-instructions">
            <p>Drag and drop cabinets from the library. Click to select.</p>
          </div>
        </div>
      ) : (
        <div className="canvas-overlay three-d">
          <div className="canvas-tools">
            <span className="view-label">3D Preview</span>
          </div>
          <div className="canvas-instructions">
            <p>3D Preview not available in this demo</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignCanvas;
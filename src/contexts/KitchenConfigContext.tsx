import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cabinet, Material, Hardware, Project } from '../types';
import { initialCabinets } from '../data/cabinets';
import { initialMaterials } from '../data/materials';
import { initialHardware } from '../data/hardware';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface KitchenConfigContextType {
  cabinets: Cabinet[];
  materials: Material[];
  hardware: Hardware[];
  selectedCabinets: Cabinet[];
  currentProject: Project | null;
  totalPrice: number;
  addCabinetToLayout: (cabinet: Cabinet, position: { x: number, y: number }) => void;
  removeCabinetFromLayout: (id: string) => void;
  updateCabinetDimensions: (id: string, dimensions: { width?: number, height?: number, depth?: number }) => void;
  updateCabinetMaterial: (cabinetId: string, materialId: string) => void;
  updateCabinetHardware: (cabinetId: string, hardwareId: string) => void;
  saveProject: (name: string) => void;
  loadProject: (id: string) => void;
  calculatePrice: () => number;
}

const KitchenConfigContext = createContext<KitchenConfigContextType | undefined>(undefined);

export const useKitchenConfig = () => {
  const context = useContext(KitchenConfigContext);
  if (!context) {
    throw new Error('useKitchenConfig must be used within a KitchenConfigProvider');
  }
  return context;
};

export const KitchenConfigProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cabinets] = useState<Cabinet[]>(initialCabinets);
  const [materials] = useState<Material[]>(initialMaterials);
  const [hardware] = useState<Hardware[]>(initialHardware);
  const [selectedCabinets, setSelectedCabinets] = useState<Cabinet[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const addCabinetToLayout = (cabinet: Cabinet, position: { x: number, y: number }) => {
    const newCabinet = {
      ...cabinet,
      id: `${cabinet.id}-${Date.now()}`,
      position,
    };
    setSelectedCabinets([...selectedCabinets, newCabinet]);
    updateTotalPrice([...selectedCabinets, newCabinet]);
  };

  const removeCabinetFromLayout = (id: string) => {
    const updated = selectedCabinets.filter(cab => cab.id !== id);
    setSelectedCabinets(updated);
    updateTotalPrice(updated);
  };

  const updateCabinetDimensions = (id: string, dimensions: { width?: number, height?: number, depth?: number }) => {
    const updated = selectedCabinets.map(cab => {
      if (cab.id === id) {
        return {
          ...cab,
          dimensions: {
            ...cab.dimensions,
            ...dimensions
          }
        };
      }
      return cab;
    });
    setSelectedCabinets(updated);
    updateTotalPrice(updated);
  };

  const updateCabinetMaterial = (cabinetId: string, materialId: string) => {
    const updated = selectedCabinets.map(cab => {
      if (cab.id === cabinetId) {
        return {
          ...cab,
          materialId
        };
      }
      return cab;
    });
    setSelectedCabinets(updated);
    updateTotalPrice(updated);
  };

  const updateCabinetHardware = (cabinetId: string, hardwareId: string) => {
    const updated = selectedCabinets.map(cab => {
      if (cab.id === cabinetId) {
        return {
          ...cab,
          hardwareId
        };
      }
      return cab;
    });
    setSelectedCabinets(updated);
    updateTotalPrice(updated);
  };

  const calculatePrice = () => {
    let price = 0;
    selectedCabinets.forEach(cabinet => {
      // Base price calculation
      const basePrice = cabinet.basePrice;
      
      // Calculate size multiplier based on dimensions
      const { width, height, depth } = cabinet.dimensions;
      const volumeMultiplier = (width * height * depth) / 1000000; // Normalized for calculation
      
      // Material price
      const materialPrice = cabinet.materialId ? 
        materials.find(m => m.id === cabinet.materialId)?.priceMultiplier || 1 : 1;
      
      // Hardware price
      const hardwarePrice = cabinet.hardwareId ? 
        hardware.find(h => h.id === cabinet.hardwareId)?.price || 0 : 0;
      
      // Calculate cabinet total
      const cabinetTotal = basePrice * volumeMultiplier * materialPrice + hardwarePrice;
      price += cabinetTotal;
    });
    
    return Math.round(price * 100) / 100; // Round to 2 decimal places
  };

  const updateTotalPrice = (cabinets: Cabinet[]) => {
    setTotalPrice(calculatePrice());
  };

  const saveProject = async (name: string) => {
    try {
      if (!user) throw new Error('User not authenticated');

      const newProject: Project = {
        id: currentProject?.id || `project-${Date.now()}`,
        name,
        cabinets: selectedCabinets,
        createdAt: currentProject?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to Supabase
      const { data, error } = await supabase
        .from('projects')
        .upsert({
          id: newProject.id,
          user_id: user.id,
          name: newProject.name,
          cabinets: JSON.stringify(newProject.cabinets),
          created_at: newProject.createdAt,
          updated_at: newProject.updatedAt
        }, { onConflict: 'id' });
      
      if (error) throw error;
      
      setCurrentProject(newProject);
      console.log('Project saved successfully:', newProject.id);
      return newProject.id;
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const loadProject = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      if (!data) throw new Error('Project not found');
      
      const project: Project = {
        id: data.id,
        name: data.name,
        cabinets: JSON.parse(data.cabinets),
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
      
      setCurrentProject(project);
      setSelectedCabinets(project.cabinets);
      updateTotalPrice(project.cabinets);
      console.log('Project loaded successfully');
      return project;
    } catch (error) {
      console.error('Error loading project:', error);
    }
  };

  return (
    <KitchenConfigContext.Provider
      value={{
        cabinets,
        materials,
        hardware,
        selectedCabinets,
        currentProject,
        totalPrice,
        addCabinetToLayout,
        removeCabinetFromLayout,
        updateCabinetDimensions,
        updateCabinetMaterial,
        updateCabinetHardware,
        saveProject,
        loadProject,
        calculatePrice,
      }}
    >
      {children}
    </KitchenConfigContext.Provider>
  );
};
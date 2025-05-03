// Cabinet types
export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Position {
  x: number;
  y: number;
}

export type CabinetType = 'base' | 'wall' | 'tall' | 'corner' | 'island' | 'appliance';

export interface Cabinet {
  id: string;
  name: string;
  type: CabinetType;
  description: string;
  dimensions: Dimensions;
  basePrice: number;
  position?: Position;
  materialId?: string;
  hardwareId?: string;
  image: string;
  thumbnailImage: string;
}

// Material types
export type MaterialType = 'plywood' | 'mdf' | 'particleboard' | 'solid_wood';
export type FinishType = 'paint' | 'stain' | 'laminate' | 'veneer';

export interface Material {
  id: string;
  name: string;
  type: MaterialType;
  finish: FinishType;
  color: string;
  priceMultiplier: number;
  image: string;
}

// Hardware types
export type HardwareType = 'handle' | 'knob' | 'hinge' | 'drawer_slide';

export interface Hardware {
  id: string;
  name: string;
  type: HardwareType;
  finish: string;
  price: number;
  image: string;
}

// Project types
export interface Project {
  id: string;
  name: string;
  cabinets: Cabinet[];
  createdAt: string;
  updatedAt: string;
}

// User types
export type UserRole = 'guest' | 'homeowner' | 'designer' | 'retailer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Validation types
export interface ValidationRule {
  id: string;
  name: string;
  description: string;
  validate: (cabinets: Cabinet[]) => ValidationResult[];
}

export interface ValidationResult {
  valid: boolean;
  cabinetId?: string;
  message?: string;
  severity: 'warning' | 'error';
}
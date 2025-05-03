import { Material } from '../types';

export const initialMaterials: Material[] = [
  {
    id: 'plywood-white',
    name: 'White Plywood',
    type: 'plywood',
    finish: 'paint',
    color: '#FFFFFF',
    priceMultiplier: 1.0,
    image: 'https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'plywood-maple',
    name: 'Maple Plywood',
    type: 'plywood',
    finish: 'veneer',
    color: '#EAD2AC',
    priceMultiplier: 1.2,
    image: 'https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'mdf-white',
    name: 'White MDF',
    type: 'mdf',
    finish: 'paint',
    color: '#F8F8F8',
    priceMultiplier: 0.9,
    image: 'https://images.pexels.com/photos/5824856/pexels-photo-5824856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'mdf-black',
    name: 'Black MDF',
    type: 'mdf',
    finish: 'paint',
    color: '#222222',
    priceMultiplier: 0.95,
    image: 'https://images.pexels.com/photos/5824911/pexels-photo-5824911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'particleboard-white',
    name: 'White Melamine Particleboard',
    type: 'particleboard',
    finish: 'laminate',
    color: '#FAFAFA',
    priceMultiplier: 0.7,
    image: 'https://images.pexels.com/photos/5490340/pexels-photo-5490340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'solid-oak',
    name: 'Solid Oak',
    type: 'solid_wood',
    finish: 'stain',
    color: '#B68E65',
    priceMultiplier: 2.5,
    image: 'https://images.pexels.com/photos/172292/pexels-photo-172292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'solid-walnut',
    name: 'Solid Walnut',
    type: 'solid_wood',
    finish: 'stain',
    color: '#5C4033',
    priceMultiplier: 3.0,
    image: 'https://images.pexels.com/photos/942560/pexels-photo-942560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'solid-maple',
    name: 'Solid Maple',
    type: 'solid_wood',
    finish: 'stain',
    color: '#E8CCA0',
    priceMultiplier: 2.2,
    image: 'https://images.pexels.com/photos/301378/pexels-photo-301378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];
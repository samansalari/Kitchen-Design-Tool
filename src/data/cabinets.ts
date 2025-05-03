import { Cabinet } from '../types';

export const initialCabinets: Cabinet[] = [
  {
    id: 'base-1',
    name: 'Standard Base Cabinet',
    type: 'base',
    description: 'Standard base cabinet with one drawer and one door',
    dimensions: {
      width: 24,
      height: 34.5,
      depth: 24
    },
    basePrice: 150,
    image: 'https://images.pexels.com/photos/5824883/pexels-photo-5824883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailImage: 'https://images.pexels.com/photos/5824883/pexels-photo-5824883.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 'base-2',
    name: 'Wide Base Cabinet',
    type: 'base',
    description: 'Wide base cabinet with three drawers',
    dimensions: {
      width: 36,
      height: 34.5,
      depth: 24
    },
    basePrice: 225,
    image: 'https://images.pexels.com/photos/7195783/pexels-photo-7195783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailImage: 'https://images.pexels.com/photos/7195783/pexels-photo-7195783.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 'wall-1',
    name: 'Standard Wall Cabinet',
    type: 'wall',
    description: 'Standard wall cabinet with two doors',
    dimensions: {
      width: 30,
      height: 30,
      depth: 12
    },
    basePrice: 120,
    image: 'https://images.pexels.com/photos/6958514/pexels-photo-6958514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailImage: 'https://images.pexels.com/photos/6958514/pexels-photo-6958514.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 'wall-2',
    name: 'Tall Wall Cabinet',
    type: 'wall',
    description: 'Tall wall cabinet with glass doors',
    dimensions: {
      width: 24,
      height: 42,
      depth: 12
    },
    basePrice: 180,
    image: 'https://images.pexels.com/photos/6489101/pexels-photo-6489101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailImage: 'https://images.pexels.com/photos/6489101/pexels-photo-6489101.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 'tall-1',
    name: 'Pantry Cabinet',
    type: 'tall',
    description: 'Tall pantry cabinet with multiple shelves',
    dimensions: {
      width: 24,
      height: 84,
      depth: 24
    },
    basePrice: 350,
    image: 'https://images.pexels.com/photos/3316918/pexels-photo-3316918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailImage: 'https://images.pexels.com/photos/3316918/pexels-photo-3316918.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 'corner-1',
    name: 'Corner Base Cabinet',
    type: 'corner',
    description: 'L-shaped corner base cabinet with lazy susan',
    dimensions: {
      width: 36,
      height: 34.5,
      depth: 36
    },
    basePrice: 280,
    image: 'https://images.pexels.com/photos/6312364/pexels-photo-6312364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailImage: 'https://images.pexels.com/photos/6312364/pexels-photo-6312364.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 'island-1',
    name: 'Island Base',
    type: 'island',
    description: 'Kitchen island base with cabinets on all sides',
    dimensions: {
      width: 48,
      height: 34.5,
      depth: 36
    },
    basePrice: 450,
    image: 'https://images.pexels.com/photos/7061071/pexels-photo-7061071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailImage: 'https://images.pexels.com/photos/7061071/pexels-photo-7061071.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 'appliance-1',
    name: 'Refrigerator Cabinet',
    type: 'appliance',
    description: 'Cabinet surround for refrigerator',
    dimensions: {
      width: 36,
      height: 84,
      depth: 24
    },
    basePrice: 220,
    image: 'https://images.pexels.com/photos/6207734/pexels-photo-6207734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailImage: 'https://images.pexels.com/photos/6207734/pexels-photo-6207734.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];
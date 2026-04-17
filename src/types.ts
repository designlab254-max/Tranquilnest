export type Screen = 'home' | 'rooms' | 'restaurant' | 'account' | 'room-detail' | 'conferencing' | 'catering' | 'menu-detail';

export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  size: string;
  bed: string;
  isBestSeller?: boolean;
  longDescription?: string;
  amenities?: string[];
}

export interface Amenity {
  id: string;
  title: string;
  description?: string;
  image: string;
  colSpan?: string;
  rowSpan?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Appetizers' | 'Main Course' | 'Desserts' | 'Drinks';
  image: string;
  calories?: number;
  allergens?: string[];
}

export interface WellnessService {
  id: string;
  name: string;
  description: string;
  priceKES: number;
  image: string;
  duration: string;
}

export interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId: string;
  name: string;
  email: string;
}

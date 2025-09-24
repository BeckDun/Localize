export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  avatar?: string;
  joinedDate: Date;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  reviewCount: number;
  image: string;
  products: Product[];
  events: Event[];
  isVerified: boolean;
}

export interface Product {
  id: string;
  businessId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export interface Event {
  id: string;
  businessId?: string;
  title: string;
  description: string;
  date: Date;
  endDate?: Date;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  attendeeCount: number;
  maxAttendees?: number;
  category: string;
  pointsReward: number;
}

export interface Discount {
  id: string;
  businessId: string;
  title: string;
  description: string;
  discountPercentage: number;
  pointsCost: number;
  validUntil: Date;
  maxRedemptions?: number;
  currentRedemptions: number;
  image: string;
  terms: string;
}

export interface UserInteraction {
  id: string;
  userId: string;
  type: 'visit' | 'check-in' | 'review' | 'event-attendance' | 'discount-redemption';
  businessId?: string;
  eventId?: string;
  discountId?: string;
  pointsEarned: number;
  pointsSpent: number;
  timestamp: Date;
}

export interface MapLocation {
  id: string;
  name: string;
  type: 'business' | 'event';
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
}
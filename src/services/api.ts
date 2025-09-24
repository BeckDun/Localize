import { Business, Product, Event, Discount, User, UserInteraction } from '../types';
import { mockBusinesses, mockProducts, mockEvents, mockDiscounts, mockUser } from './mockData';

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class LocalizeAPI {
  static async getUser(): Promise<User> {
    await delay(300);
    return mockUser;
  }

  static async getBusinesses(): Promise<Business[]> {
    await delay(500);
    return mockBusinesses.map(business => ({
      ...business,
      products: mockProducts.filter(product => product.businessId === business.id),
    }));
  }

  static async getBusiness(id: string): Promise<Business | null> {
    await delay(300);
    const business = mockBusinesses.find(b => b.id === id);
    if (!business) return null;

    return {
      ...business,
      products: mockProducts.filter(product => product.businessId === business.id),
    };
  }

  static async getEvents(): Promise<Event[]> {
    await delay(400);
    return mockEvents;
  }

  static async getEvent(id: string): Promise<Event | null> {
    await delay(300);
    return mockEvents.find(e => e.id === id) || null;
  }

  static async getDiscounts(): Promise<Discount[]> {
    await delay(400);
    return mockDiscounts;
  }

  static async getUserInteractions(): Promise<UserInteraction[]> {
    await delay(400);
    // Mock user interactions for demo
    return [
      {
        id: '1',
        userId: mockUser.id,
        type: 'check-in',
        businessId: '1',
        pointsEarned: 25,
        pointsSpent: 0,
        timestamp: new Date('2024-03-10T10:30:00'),
      },
      {
        id: '2',
        userId: mockUser.id,
        type: 'event-attendance',
        eventId: '1',
        pointsEarned: 50,
        pointsSpent: 0,
        timestamp: new Date('2024-03-08T14:00:00'),
      },
    ];
  }

  static async checkInToBusiness(businessId: string): Promise<{ points: number }> {
    await delay(500);
    // Simulate check-in and point reward
    return { points: 25 };
  }

  static async attendEvent(eventId: string): Promise<{ points: number }> {
    await delay(500);
    const event = mockEvents.find(e => e.id === eventId);
    return { points: event?.pointsReward || 25 };
  }

  static async redeemDiscount(discountId: string): Promise<{ success: boolean }> {
    await delay(500);
    // Simulate discount redemption
    return { success: true };
  }

  static async searchBusinesses(query: string): Promise<Business[]> {
    await delay(300);
    const businesses = await this.getBusinesses();
    return businesses.filter(business =>
      business.name.toLowerCase().includes(query.toLowerCase()) ||
      business.description.toLowerCase().includes(query.toLowerCase()) ||
      business.category.toLowerCase().includes(query.toLowerCase())
    );
  }

  static async getBusinessesByCategory(category: string): Promise<Business[]> {
    await delay(300);
    const businesses = await this.getBusinesses();
    return businesses.filter(business => business.category === category);
  }
}
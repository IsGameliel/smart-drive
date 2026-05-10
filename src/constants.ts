import { Vehicle, MaintenanceTask, Alert, User } from './types';

// Mock data initializer
export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    name: 'Apollo 11',
    brand: 'Tesla',
    model: 'Model S',
    year: 2024,
    plateNumber: 'ABC 123',
    vin: '5YJSA1E28LFP00001',
    fuelType: 'Electric',
    mileage: 12500,
    healthScore: 98,
    fuelLevel: 85, // Battery level for electric
    batteryLevel: 95,
    engineStatus: 'off',
    lockStatus: 'locked',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      lastUpdated: new Date().toISOString(),
    },
  },
  {
    id: 'v2',
    name: 'Silver Bullet',
    brand: 'BMW',
    model: 'X5',
    year: 2023,
    plateNumber: 'XYZ 789',
    vin: 'WBA53BG0XP0000002',
    fuelType: 'Gasoline',
    mileage: 25700,
    healthScore: 82,
    fuelLevel: 45,
    batteryLevel: 88,
    engineStatus: 'off',
    lockStatus: 'locked',
    location: {
      lat: 34.0522,
      lng: -118.2437,
      lastUpdated: new Date().toISOString(),
    },
  },
];

export const MOCK_MAINTENANCE: MaintenanceTask[] = [
  {
    id: 'm1',
    vehicleId: 'v1',
    type: 'Tire Rotation',
    description: 'Rotate tires and check alignment',
    dueDate: '2024-06-15',
    status: 'upcoming',
  },
  {
    id: 'm2',
    vehicleId: 'v2',
    type: 'Oil Change',
    description: 'Replace engine oil and filter',
    dueDate: '2024-05-01',
    status: 'overdue',
  },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    vehicleId: 'v2',
    type: 'low_fuel',
    message: 'Fuel level is below 15%',
    timestamp: new Date().toISOString(),
    isRead: false,
    severity: 'medium',
  },
];

export const MOCK_USER: User = {
  id: 'u1',
  email: 'owner@example.com',
  displayName: 'Alex Driver',
  role: 'user',
};

export const MOCK_ADMIN: User = {
  id: 'u2',
  email: 'admin@smartmaintenance.com',
  displayName: 'Admin User',
  role: 'admin',
};

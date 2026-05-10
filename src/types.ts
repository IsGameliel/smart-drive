export type FuelType = 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  vin: string;
  fuelType: FuelType;
  mileage: number;
  healthScore: number;
  fuelLevel: number;
  batteryLevel: number;
  engineStatus: 'running' | 'off';
  lockStatus: 'locked' | 'unlocked';
  location: {
    lat: number;
    lng: number;
    lastUpdated: string;
  };
}

export interface MaintenanceTask {
  id: string;
  vehicleId: string;
  type: 'Oil Change' | 'Tire Rotation' | 'Brake Service' | 'Battery Check' | 'Insurance' | 'Roadworthiness' | 'General' | 'Other';
  description: string;
  dueDate?: string;
  dueMileage?: number;
  status: 'upcoming' | 'overdue' | 'completed';
  completedDate?: string;
  cost?: number;
}

export interface DiagnosticCode {
  code: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  explanation: string;
}

export interface Alert {
  id: string;
  vehicleId: string;
  type: 'maintenance' | 'low_fuel' | 'battery' | 'engine' | 'security' | 'geofence';
  message: string;
  timestamp: string;
  isRead: boolean;
  severity: 'low' | 'medium' | 'high';
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user';
  avatarUrl?: string;
}

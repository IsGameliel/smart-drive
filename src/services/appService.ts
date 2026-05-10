import { Vehicle, MaintenanceTask, Alert, User } from '../types';
import { MOCK_VEHICLES, MOCK_MAINTENANCE, MOCK_ALERTS, MOCK_USER } from '../constants';

class VehicleService {
  private vehicles: Vehicle[] = [...MOCK_VEHICLES];
  private maintenance: MaintenanceTask[] = [...MOCK_MAINTENANCE];
  private alerts: Alert[] = [...MOCK_ALERTS];

  async getVehicles(): Promise<Vehicle[]> {
    return this.vehicles;
  }

  async getVehicle(id: string): Promise<Vehicle | undefined> {
    return this.vehicles.find(v => v.id === id);
  }

  async updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle> {
    const index = this.vehicles.findIndex(v => v.id === id);
    if (index === -1) throw new Error('Vehicle not found');
    this.vehicles[index] = { ...this.vehicles[index], ...updates };
    return this.vehicles[index];
  }

  async getMaintenance(vehicleId: string): Promise<MaintenanceTask[]> {
    return this.maintenance.filter(m => m.vehicleId === vehicleId);
  }

  async getAlerts(vehicleId: string): Promise<Alert[]> {
    return this.alerts.filter(a => a.vehicleId === vehicleId);
  }

  async toggleEngine(vehicleId: string): Promise<Vehicle> {
    const v = await this.getVehicle(vehicleId);
    if (!v) throw new Error('Vehicle not found');
    const newStatus = v.engineStatus === 'running' ? 'off' : 'running';
    return this.updateVehicle(vehicleId, { engineStatus: newStatus });
  }

  async toggleLocks(vehicleId: string): Promise<Vehicle> {
    const v = await this.getVehicle(vehicleId);
    if (!v) throw new Error('Vehicle not found');
    const newStatus = v.lockStatus === 'locked' ? 'unlocked' : 'locked';
    return this.updateVehicle(vehicleId, { lockStatus: newStatus });
  }
}

export const vehicleService = new VehicleService();

class AuthService {
  private user: User | null = MOCK_USER;

  async getCurrentUser(): Promise<User | null> {
    return this.user;
  }

  async login(email: string, pass: string): Promise<User> {
    this.user = MOCK_USER;
    return this.user;
  }

  async logout(): Promise<void> {
    this.user = null;
  }
}

export const authService = new AuthService();

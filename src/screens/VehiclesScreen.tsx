import { useState, useEffect } from 'react';
import { vehicleService } from '../services/appService';
import { Vehicle } from '../types';
import { Plus, Car, ChevronRight, Hash, ShieldCheck, Gauge } from 'lucide-react';
import { formatMileage, getHealthColor, cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function VehiclesScreen() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    vehicleService.getVehicles().then(setVehicles);
  }, []);

  return (
    <div className="space-y-6 pb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Garage</h1>
        <button className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}

        {/* Add Skeleton/Placeholder */}
        <div className="p-8 border-2 border-dashed border-white/5 rounded-[32px] flex flex-col items-center justify-center text-center gap-3 opacity-30">
           <Car className="w-10 h-10" />
           <p className="text-sm font-medium">Space for more vehicles</p>
        </div>
      </div>
    </div>
  );
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link to={`/vehicles/${vehicle.id}`} className="block">
      <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 hover:bg-white/[0.08] transition-all cursor-pointer space-y-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/10">
              <Car className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{vehicle.name}</h3>
              <p className="text-white/40 text-xs font-medium uppercase tracking-widest">{vehicle.brand} {vehicle.model}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/20" />
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
          <div className="space-y-1">
             <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Plate</p>
             <p className="text-sm font-mono font-bold">{vehicle.plateNumber}</p>
          </div>
          <div className="space-y-1">
             <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Mileage</p>
             <p className="text-sm font-bold">{formatMileage(vehicle.mileage)}</p>
          </div>
          <div className="space-y-1">
             <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Health</p>
             <p className={cn("text-sm font-bold", getHealthColor(vehicle.healthScore))}>{vehicle.healthScore}%</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

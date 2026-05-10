import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { vehicleService } from '../services/appService';
import { Vehicle } from '../types';
import { 
  ChevronLeft, 
  MapPin, 
  MoreVertical, 
  ShieldCheck, 
  Zap, 
  Gauge, 
  Thermometer,
  Wrench,
  AlertTriangle
} from 'lucide-react';
import { formatMileage, getHealthColor, cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function VehicleDetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    if (id) vehicleService.getVehicle(id).then(v => setVehicle(v || null));
  }, [id]);

  if (!vehicle) return null;

  return (
    <div className="space-y-8 pb-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-white/50" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-bold">{vehicle.name}</h1>
          <p className="text-[10px] uppercase font-bold tracking-widest text-white/40">Vehicle ID: {vehicle.vin.slice(-6)}</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
          <MoreVertical className="w-5 h-5 text-white/50" />
        </button>
      </div>

      {/* Massive Visual Stat */}
      <div className="flex flex-col items-center gap-4 py-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 blur-3xl rounded-full"></div>
        <div className="relative z-10 flex flex-col items-center gap-2">
           <div className={cn("text-7xl font-black tracking-tighter", getHealthColor(vehicle.healthScore))}>
             {vehicle.healthScore}
           </div>
           <p className="text-xs uppercase font-black tracking-[0.3em] text-white/30">System Integrity</p>
        </div>
      </div>

      {/* Grid of Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatRow icon={Gauge} label="Mileage" value={formatMileage(vehicle.mileage)} />
        <StatRow icon={ShieldCheck} label="Warranty" value="Active" color="text-emerald-500" />
        <StatRow icon={Zap} label="Efficiency" value="18.2 Wh/km" />
        <StatRow icon={Thermometer} label="Engine Temp" value="82°C" />
      </div>

      {/* Quick Details List */}
      <div className="bg-white/5 rounded-[32px] border border-white/10 p-6 space-y-6">
        <h3 className="text-xs uppercase tracking-widest font-bold text-white/30">Product Specifications</h3>
        <div className="space-y-4">
          <DetailRow label="Manufacturer" value={vehicle.brand} />
          <DetailRow label="Model Year" value={vehicle.year.toString()} />
          <DetailRow label="License Plate" value={vehicle.plateNumber} />
          <DetailRow label="VIN Number" value={vehicle.vin} />
          <DetailRow label="Drive Train" value="AWD / Performance" />
          <DetailRow label="Battery Config" value="100 kWh" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button className="flex-1 h-14 rounded-2xl bg-white/5 border border-white/10 font-bold text-sm tracking-tight active:scale-95 transition-all">
          Transfer Title
        </button>
        <button className="flex-1 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 font-bold text-sm tracking-tight text-red-500 active:scale-95 transition-all">
          Remove Vehicle
        </button>
      </div>
    </div>
  );
}

function StatRow({ icon: Icon, label, value, color = "text-white" }: any) {
  return (
    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
         <Icon className="w-5 h-5 text-white/30" />
       </div>
       <div>
         <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{label}</p>
         <p className={cn("text-base font-bold", color)}>{value}</p>
       </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center group cursor-default">
      <span className="text-sm text-white/50">{label}</span>
      <span className="text-sm font-bold tracking-tight text-white/80 group-hover:text-white transition-colors">{value}</span>
    </div>
  );
}

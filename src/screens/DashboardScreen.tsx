import { useState, useEffect } from 'react';
import { vehicleService } from '../services/appService';
import { Vehicle, Alert } from '../types';
import { formatMileage, getHealthColor, cn } from '../lib/utils';
import { 
  Battery, 
  Fuel, 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  Square, 
  Lock, 
  Unlock, 
  MapPin, 
  ClipboardList 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function DashboardScreen() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    vehicleService.getVehicles().then(v => {
      setVehicles(v);
      setActiveVehicle(v[0] || null);
    });
  }, []);

  if (!activeVehicle) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-light tracking-tight text-white/60">Good morning,</h1>
        <p className="text-3xl font-bold">Alex Driver</p>
      </div>

      {/* Active Vehicle Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/40 to-black border border-white/10 p-6 aspect-[4/5] flex flex-col justify-between"
      >
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-blue-600/10 blur-[100px] rounded-full"></div>
        
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{activeVehicle.name}</h2>
            <p className="text-white/50 text-sm">{activeVehicle.brand} {activeVehicle.model}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className={cn("text-xl font-bold", getHealthColor(activeVehicle.healthScore))}>
              {activeVehicle.healthScore}%
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/40">Health Score</span>
          </div>
        </div>

        {/* Central Vehicle Image Placeholder/Visual */}
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="relative w-full h-full flex items-center justify-center">
             {/* Simple Abstract SVG Car Representation */}
             <svg viewBox="0 0 200 100" className="w-full max-w-[280px] drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                <path d="M20,60 L20,50 Q20,30 50,25 L150,25 Q180,30 180,50 L180,60 L190,65 L190,75 L10,75 L10,65 Z" fill="#1e293b" />
                <path d="M40,35 Q45,30 80,30 L80,50 L35,50 Z" fill="#3b82f6" fillOpacity="0.6" />
                <path d="M120,30 Q155,30 160,35 L165,50 L120,50 Z" fill="#3b82f6" fillOpacity="0.6" />
                <circle cx="50" cy="75" r="12" fill="#000" />
                <circle cx="50" cy="75" r="6" fill="#334155" />
                <circle cx="150" cy="75" r="12" fill="#000" />
                <circle cx="150" cy="75" r="6" fill="#334155" />
             </svg>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-2xl p-3 flex flex-col gap-1">
            <Battery className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold">{activeVehicle.batteryLevel}%</span>
            <span className="text-[8px] uppercase tracking-wider text-white/40">Battery</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 flex flex-col gap-1">
            <Fuel className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-bold">{activeVehicle.fuelLevel}%</span>
            <span className="text-[8px] uppercase tracking-wider text-white/40">{activeVehicle.fuelType === 'Electric' ? 'Range' : 'Fuel'}</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 flex flex-col gap-1">
            <ShieldCheck className="w-5 h-5 text-white/70" />
            <span className="text-sm font-bold">{formatMileage(activeVehicle.mileage)}</span>
            <span className="text-[8px] uppercase tracking-wider text-white/40">Mileage</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <section className="space-y-3">
        <h3 className="text-xs uppercase tracking-widest font-bold text-white/30">Remote Control</h3>
        <div className="grid grid-cols-4 gap-4">
          <ActionButton icon={activeVehicle.engineStatus === 'running' ? Square : Play} label="Engine" color={activeVehicle.engineStatus === 'running' ? "text-red-500" : "text-emerald-500"} />
          <ActionButton icon={activeVehicle.lockStatus === 'locked' ? Unlock : Lock} label="Lock" />
          <ActionButton icon={MapPin} label="Locate" path="/map" />
          <ActionButton icon={ClipboardList} label="Service" path="/maintenance" />
        </div>
      </section>

      {/* Status Cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatusCard 
          title="Last Trip" 
          value="12.4 km" 
          sub="32 mins ago" 
          icon={MapPin} 
          className="bg-blue-600/10 border-blue-500/20"
        />
        <StatusCard 
          title="Maintenance" 
          value="Overdue" 
          sub="Oil Change" 
          icon={WrenchIcon} 
          className="bg-red-600/10 border-red-500/20"
        />
      </div>

      {/* Upcoming Reminders */}
      <section className="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Next Maintenance Due</h3>
          <Link to="/maintenance" className="text-blue-500 text-sm font-bold flex items-center gap-1">
            Logs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-4">
           <ReminderItem 
             title="Tire Rotation" 
             date="June 15, 2024" 
             daysLeft={35}
           />
        </div>
      </section>
    </div>
  );
}

function ActionButton({ icon: Icon, label, color = "text-white", path }: { icon: any, label: string, color?: string, path?: string }) {
  const content = (
    <div className="flex flex-col items-center gap-2 group">
      <div className={cn("w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-active:scale-95 group-active:bg-white/10", color)}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">{label}</span>
    </div>
  );

  if (path) return <Link to={path}>{content}</Link>;
  return <button>{content}</button>;
}

function StatusCard({ title, value, sub, icon: Icon, className }: { title: string, value: string, sub: string, icon: any, className?: string }) {
  return (
    <div className={cn("rounded-3xl p-4 border flex flex-col gap-2", className)}>
      <Icon className="w-5 h-5 opacity-50" />
      <div>
        <p className="text-xs text-white/40 uppercase tracking-widest font-bold">{title}</p>
        <p className="text-xl font-bold">{value}</p>
        <p className="text-[10px] text-white/30">{sub}</p>
      </div>
    </div>
  );
}

function ReminderItem({ title, date, daysLeft }: { title: string, date: string, daysLeft: number }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 transition-colors hover:bg-white/10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
          <ClipboardList className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <p className="font-bold text-sm">{title}</p>
          <p className="text-xs text-white/40">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold text-blue-500">{daysLeft} days</p>
        <p className="text-[10px] text-white/30 tracking-widest lowercase">remaining</p>
      </div>
    </div>
  );
}

function WrenchIcon(props: any) {
  return <Wrench className={props.className} />;
}
import { Wrench } from 'lucide-react';

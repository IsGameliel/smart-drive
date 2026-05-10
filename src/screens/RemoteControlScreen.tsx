import { useState, useEffect } from 'react';
import { vehicleService } from '../services/appService';
import { Vehicle } from '../types';
import { 
  Play, 
  Square, 
  Lock, 
  Unlock, 
  Lightbulb, 
  Volume2, 
  Fan, 
  Thermometer,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function RemoteControlScreen() {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ type: string; label: string } | null>(null);

  useEffect(() => {
    vehicleService.getVehicles().then(v => setVehicle(v[0]));
  }, []);

  const handleAction = async (type: string) => {
    if (!vehicle) return;
    setLoading(type);
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));
    
    let updated;
    if (type === 'engine') updated = await vehicleService.toggleEngine(vehicle.id);
    if (type === 'lock') updated = await vehicleService.toggleLocks(vehicle.id);
    
    if (updated) setVehicle(updated);
    setLoading(null);
    setConfirmAction(null);
  };

  if (!vehicle) return null;

  return (
    <div className="space-y-8 pb-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Remote Commands</h1>
        <p className="text-white/40 text-sm">Secure control via encrypted bridge</p>
      </div>

      {/* Main Control Interface */}
      <div className="flex flex-col items-center gap-12 py-8">
        <div className="relative">
           {/* Visual Pulse for active engine */}
           <AnimatePresence>
             {vehicle.engineStatus === 'running' && (
               <motion.div 
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1.5, opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl"
               />
             )}
           </AnimatePresence>
           
           <div className="w-48 h-48 rounded-full border-4 border-white/5 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent relative z-10">
              <div className="text-center space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">System Status</p>
                <p className={cn("text-2xl font-black uppercase tracking-tighter", vehicle.engineStatus === 'running' ? "text-blue-500" : "text-white/20")}>
                  {vehicle.engineStatus === 'running' ? 'Active' : 'Standby'}
                </p>
              </div>
           </div>
        </div>

        {/* Primary Controls */}
        <div className="grid grid-cols-2 gap-6 w-full">
          <ControlButton 
            icon={vehicle.engineStatus === 'running' ? Square : Play} 
            label={vehicle.engineStatus === 'running' ? "Stop Engine" : "Start Engine"}
            active={vehicle.engineStatus === 'running'}
            loading={loading === 'engine'}
            onClick={() => setConfirmAction({ type: 'engine', label: vehicle.engineStatus === 'running' ? 'Stop Engine' : 'Start Engine' })}
            color="emerald"
          />
          <ControlButton 
            icon={vehicle.lockStatus === 'locked' ? Unlock : Lock} 
            label={vehicle.lockStatus === 'locked' ? "Unlock Doors" : "Lock Doors"}
            active={vehicle.lockStatus === 'unlocked'}
            loading={loading === 'lock'}
            onClick={() => handleAction('lock')}
            color="blue"
          />
        </div>
      </div>

      {/* Secondary Controls */}
      <section className="space-y-4">
        <h3 className="text-xs uppercase tracking-widest font-bold text-white/30">Auxiliary Controls</h3>
        <div className="grid grid-cols-3 gap-4">
           <SmallControl icon={Lightbulb} label="Lights" />
           <SmallControl icon={Volume2} label="Horn" />
           <SmallControl icon={Fan} label="Climate" />
        </div>
      </section>

      {/* Confirmation Modal Overlay */}
      <AnimatePresence>
        {confirmAction && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setConfirmAction(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 w-full max-w-sm relative z-10 space-y-8"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Confirm Action</h2>
                  <p className="text-white/40 text-sm">Are you sure you want to {confirmAction.label.toLowerCase()} for "Tesla Model S"?</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleAction(confirmAction.type)}
                  className="w-full h-14 rounded-2xl bg-blue-600 font-bold active:scale-95 transition-all"
                >
                  Yes, Execute
                </button>
                <button 
                  onClick={() => setConfirmAction(null)}
                  className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 font-bold text-white/60"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ControlButton({ icon: Icon, label, active, loading, onClick, color }: any) {
  const colorMap = {
    emerald: active ? "bg-red-500 shadow-red-500/20" : "bg-emerald-600 shadow-emerald-600/20",
    blue: active ? "bg-red-500/20 border-red-500/40" : "bg-blue-600 shadow-blue-600/20"
  } as any;

  return (
    <button 
      onClick={onClick}
      disabled={!!loading}
      className={cn(
        "flex flex-col items-center gap-4 p-6 rounded-[32px] border transition-all active:scale-95",
        active ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10",
        loading && "opacity-50 pointer-events-none"
      )}
    >
      <div className={cn(
        "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
        colorMap[color] || "bg-blue-600 shadow-blue-600/20"
      )}>
        {loading ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Icon className="w-8 h-8 text-white" />
        )}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{label}</span>
    </button>
  );
}

function SmallControl({ icon: Icon, label }: any) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
      <div className="w-full aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-active:bg-white/10 transition-all">
        <Icon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
      </div>
      <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">{label}</span>
    </div>
  );
}

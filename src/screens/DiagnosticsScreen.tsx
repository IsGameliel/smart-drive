import { useState, useEffect } from 'react';
import { vehicleService } from '../services/appService';
import { Vehicle } from '../types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { Activity, ShieldCheck, AlertTriangle, Info, Thermometer, Zap, Gauge } from 'lucide-react';
import { cn, getHealthColor } from '../lib/utils';
import { motion } from 'motion/react';

const MOCK_HISTORICAL_DATA = [
  { time: '10:00', health: 98, fuel: 85 },
  { time: '11:00', health: 97, fuel: 82 },
  { time: '12:00', health: 98, fuel: 80 },
  { time: '13:00', health: 95, fuel: 75 },
  { time: '14:00', health: 98, fuel: 70 },
  { time: '15:00', health: 98, fuel: 65 },
];

export default function DiagnosticsScreen() {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    vehicleService.getVehicles().then(v => setVehicle(v[0]));
  }, []);

  if (!vehicle) return null;

  return (
    <div className="space-y-6 pb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vehicle Health</h1>
        <div className="px-3 py-1 bg-emerald-500/20 text-emerald-500 rounded-full text-xs font-bold uppercase tracking-wider">
          All Systems Nominal
        </div>
      </div>

      {/* Main Health Grid */}
      <div className="grid grid-cols-2 gap-4">
        <HealthMetric 
          label="Health Score" 
          value={`${vehicle.healthScore}%`} 
          sub="Excellent"
          icon={ShieldCheck}
          color="text-emerald-500"
          trend="+0.2% vs last week"
        />
        <HealthMetric 
          label="Temp" 
          value="88°C" 
          sub="Normal"
          icon={Thermometer}
          color="text-blue-500"
          trend="Stable"
        />
      </div>

      {/* Chart Section */}
      <section className="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Health History</h3>
          <select className="bg-transparent text-xs text-white/40 uppercase font-bold tracking-widest focus:outline-none">
            <option>Last 24h</option>
            <option>Last 7 days</option>
          </select>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_HISTORICAL_DATA}>
              <defs>
                <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff20', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey="health" 
                stroke="#3782f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorHealth)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Detailed Diagnostics */}
      <section className="space-y-4">
        <h3 className="text-xs uppercase tracking-widest font-bold text-white/30">Subsystems</h3>
        <div className="grid grid-cols-1 gap-3">
          <DiagnosticRow label="Engine Performance" status="98%" icon={Zap} color="text-yellow-400" />
          <DiagnosticRow label="Brake System" status="Optimal" icon={ShieldCheck} color="text-emerald-400" />
          <DiagnosticRow label="Tire Pressure" status="32 PSI" icon={Gauge} color="text-emerald-400" />
          <DiagnosticRow label="Battery Voltage" status="12.8V" icon={Activity} color="text-emerald-400" />
        </div>
      </section>

      {/* Trouble Codes */}
      <section className="bg-red-500/5 rounded-3xl p-6 border border-red-500/20 space-y-4">
        <div className="flex items-center gap-2 text-red-500">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-bold">Active Faults</h3>
        </div>
        <p className="text-sm text-white/60">No critical diagnostic trouble codes (DTC) detected. Your vehicle is safe to drive.</p>
        <button className="text-xs font-bold uppercase tracking-widest text-red-500 flex items-center gap-1">
          Full Scan <Info className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
}

function HealthMetric({ label, value, sub, icon: Icon, color, trend }: any) {
  return (
    <div className="bg-white/5 rounded-3xl p-5 border border-white/10 space-y-3">
      <div className="flex justify-between items-start">
        <div className={cn("p-2 rounded-xl bg-white/5", color)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <p className="text-xs text-white/40 uppercase tracking-widest font-bold">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className={cn("text-[10px] font-bold", color)}>{sub}</p>
      </div>
      <div className="pt-2 border-t border-white/5">
        <p className="text-[9px] text-white/20 uppercase tracking-wider">{trend}</p>
      </div>
    </div>
  );
}

function DiagnosticRow({ label, status, icon: Icon, color }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
      <div className="flex items-center gap-3">
        <Icon className={cn("w-5 h-5", color)} />
        <span className="font-bold text-sm">{label}</span>
      </div>
      <span className={cn("text-xs font-bold uppercase tracking-widest", color)}>{status}</span>
    </div>
  );
}

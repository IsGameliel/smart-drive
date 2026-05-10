import { useState, useEffect } from 'react';
import { vehicleService } from '../services/appService';
import { Alert } from '../types';
import { 
  Bell, 
  ShieldAlert, 
  Fuel, 
  Battery, 
  MapPin, 
  Wrench,
  Check,
  Trash2
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    vehicleService.getAlerts('v1').then(setAlerts);
  }, []);

  return (
    <div className="space-y-6 pb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button className="text-xs font-bold text-blue-500 uppercase tracking-widest">Mark all as read</button>
      </div>

      <div className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 opacity-30">
            <Bell className="w-16 h-16" />
            <p className="font-medium">No new notifications</p>
          </div>
        )}
      </div>

      {/* Categories */}
      <section className="space-y-4">
        <h3 className="text-xs uppercase tracking-widest font-bold text-white/30">History</h3>
        <div className="space-y-3 opacity-50">
           <AlertCard alert={{
             id: 'old1',
             vehicleId: 'v1',
             type: 'maintenance',
             message: 'Monthly health check completed',
             timestamp: '2 days ago',
             isRead: true,
             severity: 'low'
           }} />
           <AlertCard alert={{
             id: 'old2',
             vehicleId: 'v1',
             type: 'security',
             message: 'Vehicle locked remotely',
             timestamp: '4 days ago',
             isRead: true,
             severity: 'low'
           }} />
        </div>
      </section>
    </div>
  );
}

function AlertCard({ alert }: { alert: Alert }) {
  const getIcon = () => {
    switch (alert.type) {
      case 'low_fuel': return Fuel;
      case 'battery': return Battery;
      case 'security': return ShieldAlert;
      case 'maintenance': return Wrench;
      case 'geofence': return MapPin;
      default: return Bell;
    }
  };

  const getSeverityColor = () => {
    if (alert.isRead) return 'bg-white/5 border-white/5 text-white/20';
    switch (alert.severity) {
      case 'high': return 'bg-red-500/10 border-red-500/20 text-red-500';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/10 text-yellow-500';
      default: return 'bg-blue-500/10 border-blue-500/10 text-blue-500';
    }
  };

  const Icon = getIcon();

  return (
    <div className={cn("p-4 rounded-3xl border flex gap-4 items-start transition-all", getSeverityColor())}>
       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", !alert.isRead ? "bg-current/10" : "bg-white/5 text-white/40")}>
          <Icon className="w-6 h-6" />
       </div>
       <div className="flex-1 space-y-1">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{alert.type.replace('_', ' ')}</span>
            <span className="text-[10px] opacity-40">{alert.timestamp}</span>
          </div>
          <p className={cn("text-sm font-bold", alert.isRead ? "text-white/40" : "text-white")}>{alert.message}</p>
       </div>
       <button className="p-2 opacity-20 hover:opacity-100 transition-opacity">
         <Trash2 className="w-4 h-4" />
       </button>
    </div>
  );
}

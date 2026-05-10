import { useState, useEffect } from 'react';
import { vehicleService, authService } from '../services/appService';
import { User } from '../types';
import { 
  User as UserIcon, 
  Settings, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  LogOut, 
  ChevronRight,
  Database
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    authService.getCurrentUser().then(setUser);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    window.location.reload(); // Simple reload to trigger redirect
  };

  if (!user) return null;

  return (
    <div className="space-y-8 pb-6">
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="w-24 h-24 rounded-full bg-blue-600 p-1 relative">
           <img 
             src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
             alt="Profile" 
             className="w-full h-full rounded-full bg-[#0a0a0a] object-cover"
           />
           <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full border-4 border-[#0a0a0a] flex items-center justify-center">
             <Settings className="w-4 h-4 text-white" />
           </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{user.displayName}</h2>
          <p className="text-white/40 text-sm">{user.email}</p>
        </div>
      </div>

      <div className="space-y-6">
        <SettingSection title="Preferences">
          <SettingItem icon={Bell} label="Notifications" value="On" />
          <SettingItem icon={Moon} label="Display Theme" value="Dark" />
          <SettingItem icon={Globe} label="Language" value="English" />
        </SettingSection>

        <SettingSection title="Securiy & Privacy">
          <SettingItem icon={Shield} label="Biometric Login" toggle />
          <SettingItem icon={Settings} label="Manage Devices" count={2} />
        </SettingSection>

        {user.role === 'admin' && (
          <SettingSection title="Administration">
            <button onClick={() => navigate('/admin')} className="w-full text-left">
              <SettingItem icon={Database} label="System Logs" />
            </button>
            <button onClick={() => navigate('/admin')} className="w-full text-left">
              <SettingItem icon={UserIcon} label="User Management" />
            </button>
          </SettingSection>
        )}

        <button 
          onClick={handleLogout}
          className="w-full h-16 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>

      <div className="text-center">
        <p className="text-[10px] uppercase font-bold tracking-widest text-white/20">Version 2.4.0 (Build 582)</p>
      </div>
    </div>
  );
}

function SettingSection({ title, children }: any) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs uppercase tracking-widest font-bold text-white/30 ml-4">{title}</h3>
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/5">
        {children}
      </div>
    </div>
  );
}

function SettingItem({ icon: Icon, label, value, toggle, count }: any) {
  return (
    <div className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors cursor-pointer flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/50">
          <Icon className="w-5 h-5" />
        </div>
        <span className="font-bold text-sm tracking-tight">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        {value && <span className="text-xs text-white/40 font-bold uppercase tracking-wider">{value}</span>}
        {count && <span className="px-2 py-0.5 bg-blue-500 text-white rounded-lg text-[10px] font-bold">{count}</span>}
        {toggle ? (
           <div className="w-10 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
             <div className="w-4 h-4 bg-white rounded-full"></div>
           </div>
        ) : (
          <ChevronRight className="w-4 h-4 text-white/10" />
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Car, ShieldAlert, BarChart3, Bell, Search, Filter, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function AdminDashboardScreen() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'vehicles'>('overview');

  return (
    <div className="space-y-6 pb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Console</h1>
          <p className="text-white/40 text-xs uppercase tracking-widest font-bold">System Management</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
           <ShieldAlert className="w-5 h-5" />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <AdminStatCard label="Total Users" value="1,284" trend="+12%" />
        <AdminStatCard label="Active Vehicles" value="3,942" trend="+5%" />
        <AdminStatCard label="Remote Commands" value="85.2k" trend="+24%" />
        <AdminStatCard label="Alerts Resolved" value="94%" trend="Stable" />
      </div>

      {/* Navigation */}
      <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
        <AdminNavTab active={activeTab === 'overview'} label="System" onClick={() => setActiveTab('overview')} />
        <AdminNavTab active={activeTab === 'users'} label="Users" onClick={() => setActiveTab('users')} />
        <AdminNavTab active={activeTab === 'vehicles'} label="Fleet" onClick={() => setActiveTab('vehicles')} />
      </div>

      {/* Content */}
      <div className="space-y-4">
         <div className="flex justify-between items-center px-2">
            <h3 className="text-xs uppercase tracking-widest font-bold text-white/30">Recent Activity</h3>
            <div className="flex gap-2">
              <Search className="w-4 h-4 text-white/40" />
              <Filter className="w-4 h-4 text-white/40" />
            </div>
         </div>

         <div className="space-y-2">
            <ActivityItem user="John Doe" action="Remote Engine Start" time="2m ago" status="Success" />
            <ActivityItem user="Sarah Smith" action="New Vehicle Added" time="15m ago" status="Success" />
            <ActivityItem user="Mike Ross" action="Firmware Update" time="1h ago" status="Pending" />
            <ActivityItem user="Harvey Specter" action="Lock Override" time="3h ago" status="Failed" />
         </div>
      </div>
    </div>
  );
}

function AdminStatCard({ label, value, trend }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-4 rounded-3xl space-y-1">
      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{label}</p>
      <div className="flex justify-between items-end">
        <p className="text-xl font-bold">{value}</p>
        <span className="text-[9px] font-bold text-emerald-500">{trend}</span>
      </div>
    </div>
  );
}

function AdminNavTab({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
        active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-white/40 hover:text-white/60"
      )}
    >
      {label}
    </button>
  );
}

function ActivityItem({ user, action, time, status }: any) {
  const statusColor = {
    'Success': 'bg-emerald-500',
    'Pending': 'bg-yellow-500',
    'Failed': 'bg-red-500'
  }[status as string] || 'bg-white/20';

  return (
    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/40">
           {user.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div>
          <p className="text-xs font-bold">{user} · <span className="text-white/40 font-medium">{action}</span></p>
          <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest">{time}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
         <div className={cn("px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-tighter text-black", statusColor)}>
           {status}
         </div>
         <MoreHorizontal className="w-4 h-4 text-white/10" />
      </div>
    </div>
  );
}

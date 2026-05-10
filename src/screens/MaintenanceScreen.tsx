import { useState, useEffect } from 'react';
import { vehicleService } from '../services/appService';
import { MaintenanceTask } from '../types';
import { Calendar, Wrench, CheckCircle2, AlertCircle, Clock, Plus, ChevronRight, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function MaintenanceScreen() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'overdue' | 'completed'>('all');

  useEffect(() => {
    vehicleService.getMaintenance('v1').then(t => setTasks(t));
  }, []);

  const filteredTasks = tasks.filter(t => filter === 'all' || t.status === filter);

  return (
    <div className="space-y-6 pb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Maintenance</h1>
        <button className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar">
        <FilterTab active={filter === 'all'} label="All" onClick={() => setFilter('all')} />
        <FilterTab active={filter === 'overdue'} label="Overdue" onClick={() => setFilter('overdue')} />
        <FilterTab active={filter === 'upcoming'} label="Upcoming" onClick={() => setFilter('upcoming')} />
        <FilterTab active={filter === 'completed'} label="Completed" onClick={() => setFilter('completed')} />
      </div>

      {/* Schedule Summary */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 text-white shadow-xl shadow-blue-600/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-12 -translate-y-12"></div>
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-white/80">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Next Major Service</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold">12,500 km</h2>
            <p className="text-white/70 text-sm">or by October 12, 2024</p>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              className="h-full bg-white shadow-[0_0_10px_white]"
            ></motion.div>
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-white/60">6,500 km until next check</p>
        </div>
      </section>

      {/* Task List */}
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-widest font-bold text-white/30">Service History & Tasks</h3>
        {filteredTasks.length > 0 ? (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-white/20" />
             </div>
             <p className="text-white/40 text-sm font-medium">No tasks found in this category.</p>
          </div>
        )}
      </div>

      {/* Helpful Quick Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-2">
           <AlertCircle className="w-5 h-5 text-yellow-500" />
           <p className="text-xs font-bold">Warranty</p>
           <p className="text-[10px] text-white/40">Active until 2028</p>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-2">
           <Clock className="w-5 h-5 text-blue-500" />
           <p className="text-xs font-bold">Roadside</p>
           <p className="text-[10px] text-white/40">24/7 Assistance Active</p>
        </div>
      </div>
    </div>
  );
}

function FilterTab({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border",
        active ? "bg-white text-black border-white" : "text-white/40 border-white/10 hover:border-white/20"
      )}
    >
      {label}
    </button>
  );
}

function TaskCard({ task }: { task: MaintenanceTask }) {
  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'overdue': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case 'completed': return 'bg-emerald-500/10 border-emerald-500/20';
      case 'overdue': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <div className={cn("p-4 rounded-2xl border flex items-center justify-between group cursor-pointer transition-all hover:bg-white/[0.08]", getStatusColor())}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center">
          <Wrench className="w-6 h-6 text-white/80" />
        </div>
        <div>
          <p className="font-bold">{task.type}</p>
          <p className="text-xs text-white/40">{task.dueDate ? `Due ${task.dueDate}` : `Due at ${task.dueMileage} km`}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {getStatusIcon()}
        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
      </div>
    </div>
  );
}

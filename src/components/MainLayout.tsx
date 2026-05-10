import { ReactNode } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Car, Wrench, Activity, Map, Radio, Bell, User as UserIcon, LogOut } from 'lucide-react';
import { User } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface MainLayoutProps {
  user: User;
  onLogout: () => void;
}

export default function MainLayout({ user, onLogout }: MainLayoutProps) {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/' },
    { icon: Car, label: 'Garage', path: '/vehicles' },
    { icon: Map, label: 'Live Map', path: '/map' },
    { icon: Activity, label: 'Health', path: '/diagnostics' },
    { icon: Wrench, label: 'Service', path: '/maintenance' },
    { icon: Radio, label: 'Remote', path: '/remote' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
    { icon: UserIcon, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Radio className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold tracking-tight text-lg">SMART DRIVE</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 relative rounded-full hover:bg-white/5 transition-colors">
            <Bell className="w-5 h-5 opacity-70" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0a]"></span>
          </button>
          <NavLink to="/profile" className="w-8 h-8 rounded-full bg-charcoal border border-white/20 overflow-hidden">
            <img src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="User" />
          </NavLink>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-24 md:pb-0 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-6 max-w-lg mx-auto"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-2 z-50 md:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 transition-all duration-300",
                isActive ? "text-blue-500 scale-110" : "text-white/40 hover:text-white/60"
              )
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] uppercase font-bold tracking-widest">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Sidebar (Desktop - Optional for this brief but good practice) */}
    </div>
  );
}

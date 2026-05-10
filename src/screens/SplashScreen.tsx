import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-24 h-24 rounded-[32px] bg-blue-600 flex items-center justify-center relative overflow-hidden">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"
          />
          <Shield className="w-12 h-12 text-white relative z-10" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tighter">SMART DRIVE</h1>
          <p className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em]">Syncing Systems</p>
        </div>
      </motion.div>
    </div>
  );
}

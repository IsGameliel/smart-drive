import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Fingerprint, Mail, Lock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { User } from '../types';
import { authService } from '../services/appService';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBiometric, setIsBiometric] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await authService.login(email, password);
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] right-[-10%] w-[100%] h-[100%] bg-blue-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-blue-900/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="w-full max-w-sm space-y-12 relative z-10">
        {/* Logo/Icon */}
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)]"
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">SMART DRIVE</h1>
            <p className="text-white/40 text-sm">Secure Vehicle Platform</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-all placeholder:text-white/20"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition-all placeholder:text-white/20"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-white/30 w-full px-4">
            <div className="h-px bg-current flex-1"></div>
            <span className="text-xs uppercase tracking-widest font-bold">or biometric</span>
            <div className="h-px bg-current flex-1"></div>
          </div>

          <button 
            type="button" 
            className="w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center active:scale-90 transition-all hover:bg-white/10"
          >
            <Fingerprint className="w-10 h-10 text-blue-500" />
          </button>
        </div>

        <div className="text-center space-y-4 pt-4">
          <p className="text-white/40 text-sm">
            Don't have an account? <span className="text-blue-500 font-bold cursor-pointer">Register</span>
          </p>
          <p className="text-white/20 text-xs uppercase tracking-widest font-bold cursor-pointer">Forgot Password?</p>
        </div>
      </div>
    </div>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { User } from './types';
import { authService } from './services/appService';
import MainLayout from './components/MainLayout';
import DashboardScreen from './screens/DashboardScreen';
import VehiclesScreen from './screens/VehiclesScreen';
import VehicleDetailsScreen from './screens/VehicleDetailsScreen';
import MaintenanceScreen from './screens/MaintenanceScreen';
import DiagnosticsScreen from './screens/DiagnosticsScreen';
import MapScreen from './screens/MapScreen';
import RemoteControlScreen from './screens/RemoteControlScreen';
import AlertsScreen from './screens/AlertsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';

import AdminDashboardScreen from './screens/AdminDashboardScreen';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const u = await authService.getCurrentUser();
      setUser(u);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginScreen onLogin={(u) => setUser(u)} />} />
        
        <Route element={user ? <MainLayout user={user} onLogout={() => setUser(null)} /> : <Navigate to="/login" />}>
          <Route path="/" element={<DashboardScreen />} />
          <Route path="/vehicles" element={<VehiclesScreen />} />
          <Route path="/vehicles/:id" element={<VehicleDetailsScreen />} />
          <Route path="/maintenance" element={<MaintenanceScreen />} />
          <Route path="/diagnostics" element={<DiagnosticsScreen />} />
          <Route path="/map" element={<MapScreen />} />
          <Route path="/remote" element={<RemoteControlScreen />} />
          <Route path="/alerts" element={<AlertsScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/admin" element={<AdminDashboardScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

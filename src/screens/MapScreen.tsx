import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { MapPin, Navigation, Info, Layers, Crosshair } from 'lucide-react';
import { motion } from 'motion/react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export default function MapScreen() {
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });

  if (!hasValidKey) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-blue-600/10 flex items-center justify-center">
          <MapPin className="w-10 h-10 text-blue-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Maps API Key Required</h2>
          <p className="text-white/40 text-sm max-w-xs mx-auto">
            To view live vehicle location, please add your <strong>GOOGLE_MAPS_PLATFORM_KEY</strong> in the AI Studio Secrets panel.
          </p>
        </div>
        <div className="text-left bg-white/5 border border-white/10 rounded-2xl p-4 text-[10px] space-y-2 uppercase tracking-widest font-bold text-white/60">
           <p>1. Open Settings (⚙️ gear icon)</p>
           <p>2. Select Secrets</p>
           <p>3. Add GOOGLE_MAPS_PLATFORM_KEY</p>
           <p>4. App will rebuild automatically</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-144px)] rounded-3xl overflow-hidden relative border border-white/10">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={center}
          defaultZoom={13}
          mapId="VEHICLE_MAP_ID"
          className="w-full h-full"
          disableDefaultUI
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        >
          <AdvancedMarker position={center}>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-md rounded-full animate-pulse opacity-50"></div>
              <div className="w-10 h-10 bg-blue-600 border-2 border-white rounded-full flex items-center justify-center shadow-lg relative z-10">
                <Navigation className="w-6 h-6 text-white rotate-45" />
              </div>
            </div>
          </AdvancedMarker>
        </Map>
      </APIProvider>

      {/* Floating Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <MapControlIcon icon={Layers} />
        <MapControlIcon icon={Info} />
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <MapControlIcon icon={Crosshair} className="bg-blue-600 text-white" />
      </div>

      {/* Vehicle Info Card Overlay */}
      <div className="absolute bottom-4 left-4 right-16">
         <motion.div 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center justify-between"
         >
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
               <Navigation className="w-5 h-5 text-blue-500" />
             </div>
             <div>
               <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Selected Vehicle</p>
               <p className="font-bold">Tesla Model S</p>
             </div>
           </div>
           <div className="text-right">
             <p className="text-sm font-bold">San Francisco, CA</p>
             <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Parked</p>
           </div>
         </motion.div>
      </div>
    </div>
  );
}

function MapControlIcon({ icon: Icon, className }: any) {
  return (
    <button className={cn("w-12 h-12 rounded-xl bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors active:scale-95 shadow-lg", className)}>
      <Icon className="w-6 h-6" />
    </button>
  );
}

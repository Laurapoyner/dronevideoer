/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Search, 
  Bell, 
  User, 
  MoreVertical, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Shield,
  Eye,
  Lock,
  Download,
  AlertTriangle,
  X,
  Loader2,
  ChevronRight
} from 'lucide-react';

// --- Types ---

type PrankType = 'loading' | 'none';

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 h-16 glass flex items-center justify-between px-6 z-50">
    <div className="flex items-center gap-3">
      <div className="bg-red-600 w-9 h-9 rounded-lg flex items-center justify-center font-black text-white shadow-lg shadow-red-600/40">
        D
      </div>
      <span className="text-xl font-black tracking-tighter uppercase">DroneView <span className="text-red-600">PRO</span></span>
    </div>
    
    <div className="flex-1 max-w-xl mx-8 hidden sm:flex items-center">
      <div className="relative w-full">
        <input 
          type="text" 
          placeholder="Søg i drone arkiver..." 
          className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-5 text-sm focus:outline-none focus:border-red-600/50 transition-all"
        />
        <div className="absolute right-4 top-2.5 opacity-40">
          <Search size={16} />
        </div>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest bg-white/5 py-1.5 px-3 rounded-full border border-white/5">
        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
        Live Feed: ACTIVE
      </div>
      <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/20 flex items-center justify-center overflow-hidden cursor-pointer">
        <User size={18} className="text-white/60" />
      </div>
    </div>
  </nav>
);

const InfiniteLoadingPrank = ({ onClose }: { onClose: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('VERIFICERER_ADGANG');
  
  useEffect(() => {
    const statuses = [
      'FORBINDER_TIL_VAGTPOST_3',
      'DEKRYPTERER_DRONE_LOGS',
      'HENTER_SATELLIT_DATA',
      'RESERVERER_BÅNDBREDDE',
      'BYPASSER_SIMONS_FIREWALL',
      'IDENTIFICERER_HUNDEHVALP_SIGNAL',
      'BUFFERING_KEVIN_LOCATION',
      'FINAL_DECRYPT_FAILED_RETRYING'
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 40) {
          setStatus(statuses[0]);
          return prev + Math.random() * 5;
        }
        if (prev < 70) {
          setStatus(statuses[Math.floor(Math.random() * 3) + 1]);
          return prev + Math.random() * 2;
        }
        if (prev < 90) {
          setStatus(statuses[5]);
          return prev + Math.random() * 0.5;
        }
        if (prev < 99) {
          setStatus(statuses[6]);
          return prev + Math.random() * 0.1;
        }
        setStatus(statuses[7]);
        return 99.9;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-xl glass p-10 rounded-3xl glow-red"
      >
        <div className="relative mb-8 flex items-center justify-center">
          <Loader2 className="text-red-600 animate-spin" size={64} />
          <Shield className="absolute text-white/20" size={24} />
        </div>
        
        <h2 className="text-white text-2xl font-black uppercase tracking-tight mb-4">Initialiserer Sikker Forbindelse</h2>
        <p className="text-zinc-400 text-sm mb-10 max-w-sm mx-auto">
          Vent venligst, Kevin. Vi dekrypterer de rå drone-optagelser fra d. 26. Dette kan tage et øjeblik pga. filstørrelsen.
        </p>
        
        <div className="space-y-4">
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
            <motion.div 
              className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
              animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <span>Status: {status}</span>
            <span className="text-red-500 font-bold">{progress.toFixed(1)}%</span>
          </div>
        </div>

        {progress > 99 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 pt-6 border-t border-white/5"
          >
            <p className="text-red-400 font-mono text-xs mb-4">CRITICAL ERROR: Båndbredde begrænset af Simons 'Hundehvalp' node.</p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors uppercase tracking-widest">
              Gennemtving Adgang
            </button>
          </motion.div>
        )}
      </motion.div>
      
      <button 
        onClick={onClose}
        className="mt-12 text-zinc-600 hover:text-zinc-300 transition-colors uppercase tracking-widest text-[10px] font-bold"
      >
        Afbryd overvågning
      </button>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isPrankActive, setIsPrankActive] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <Navbar />

      <main className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Main Video Section */}
        <div className="flex-1 space-y-6">
          {/* Video Player Placeholder */}
          <div 
            className="video-placeholder aspect-video rounded-3xl overflow-hidden glow-red border border-white/10 relative group cursor-pointer"
            onClick={() => setIsPrankActive(true)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center group-hover:scale-110 transition-transform duration-500">
                <div className="spinner mb-6 mx-auto"></div>
                <h2 className="text-xl font-black uppercase tracking-widest text-white/80">Klargør dronevideo... loading</h2>
                <p className="text-zinc-500 text-sm mt-3 font-medium">Klik for at dekryptere og afspille optagelsen</p>
              </div>
            </div>
            
            {/* Play Button Overlay */}
            <div className="absolute bottom-8 left-8 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-600/50">
                <Play className="text-white fill-white ml-1" size={24} />
              </div>
              <div className="text-white/40 text-xs font-mono">ENCRYPTED_FEED_026</div>
            </div>
          </div>

          {/* Video Details */}
          <div className="bg-white/5 border border-white/5 p-6 rounded-3xl space-y-6">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-red-600 text-[10px] font-black px-2 py-0.5 rounded text-white uppercase tracking-tighter shadow-lg shadow-red-600/20">Eksklusivt</span>
                  <span className="text-zinc-500 text-xs font-mono">Dato: 26. April 2026</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none text-white">
                  Hvorfor Kevin kom for sent til kamp d. 26 - Var det virkelig Simons 'hundehvalps' skyld?
                </h1>
                <div className="flex items-center gap-4 text-zinc-400 text-sm">
                  <span className="flex items-center gap-1.5"><Eye size={16} /> 1.2M visninger</span>
                  <span className="flex items-center gap-1.5 font-bold text-red-500"><div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div> Live Optagelse</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="p-3 glass rounded-2xl hover:bg-white/10 transition-colors">
                  <ThumbsUp size={20} />
                </button>
                <button className="p-3 glass rounded-2xl hover:bg-white/10 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 border border-white/10 flex items-center justify-center overflow-hidden">
                  <Shield size={24} className="text-white/80" />
                </div>
                <div>
                  <p className="font-black text-sm uppercase tracking-tight">DroneIntel Denmark</p>
                  <p className="text-xs text-zinc-500">4.2M agenter</p>
                </div>
              </div>
              <button className="bg-white text-black font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors">
                Tilmeld arkiv
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar / Recommended (Simplified) */}
        <aside className="w-full lg:w-80 shrink-0 space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-1">Anbefalet til dig</h3>
          <div className="space-y-6">
              {[
                { title: "Sandheden om Simons 'Hundehvalp'", views: "2M views", time: "10:04" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 group cursor-pointer">
                  <div className="w-32 h-20 glass rounded-xl overflow-hidden shrink-0 relative">
                     <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 to-zinc-900 opacity-80"></div>
                     <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1 rounded font-mono text-zinc-400">
                        {item.time}
                     </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-xs font-bold line-clamp-2 leading-tight group-hover:text-red-500 transition-colors uppercase tracking-tight">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-1 font-mono">{item.views}</p>
                  </div>
                </div>
              ))}
          </div>
        </aside>
      </main>

      {/* Prank Modal */}
      <AnimatePresence>
        {isPrankActive && <InfiniteLoadingPrank onClose={() => setIsPrankActive(false)} />}
      </AnimatePresence>

      {/* Security Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 right-6 left-6 sm:left-auto z-[200] max-w-sm glass border-red-600/20 rounded-3xl p-5 shadow-2xl flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-white font-black text-sm uppercase tracking-tight">Sikkerhedsadvarsel</h4>
              <p className="text-zinc-500 text-xs leading-relaxed">
                Der er logget på DroneView fra en uautoriseret enhed i nærheden af Kevin. Bekræft identitet straks.
              </p>
              <button 
                onClick={() => setShowNotification(false)}
                className="mt-3 text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline self-start flex items-center gap-1"
              >
                Gennemse Aktivitet <ChevronRight size={12} />
              </button>
            </div>
            <button onClick={() => setShowNotification(false)} className="text-zinc-600 hover:text-white">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

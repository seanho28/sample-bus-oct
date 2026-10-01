import { Navigation, RefreshCw, MapPin } from "lucide-react";
import { useState } from "react";

export function Hero() {
  const [locationText, setLocationText] = useState("Marina Bay Financial Centre / Raffles Place");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRecalibrate = () => {
    setIsRefreshing(true);
    setLocationText("Recalibrating with Singapore GPS coordinates...");
    setTimeout(() => {
      setLocationText("Marina Bay Financial Centre / Raffles Place");
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <section className="relative w-full bg-gradient-to-r from-primary via-primary-container to-tertiary text-on-primary py-space-xl overflow-hidden shadow-md">
      <div className="absolute -right-16 -bottom-24 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
      <div className="absolute left-1/4 -top-20 w-80 h-80 rounded-full bg-primary-fixed/10 blur-2xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-margin relative z-10">
        <div className="flex flex-wrap items-center gap-space-xs text-body-sm font-label-badge text-primary-fixed uppercase tracking-wider mb-space-sm">
          <a href="#" className="hover:underline opacity-80">HOME</a>
          <span>›</span>
          <a href="#" className="hover:underline opacity-80">BUS</a>
          <span>›</span>
          <span className="text-secondary-fixed font-bold">NEXTBUS ARRIVAL TIMINGS</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-card-bg/15 backdrop-blur-md text-on-primary text-body-sm font-label-md mb-space-sm">
              <span className="w-2 h-2 rounded-full bg-crowd-green animate-ping"></span>
              <span>LTA DataMall • Live Telemetry Feed Active</span>
            </div>
            <h1 className="text-display-hero font-display-hero text-on-primary tracking-tight">NextBus Arrival Timings</h1>
            <p className="mt-space-xs text-body-lg font-body-lg text-primary-fixed-dim max-w-2xl">
              Find real-time arrival countdowns, vehicle occupancy levels, and wheelchair accessibility at your nearest stop or anywhere across Singapore.
            </p>
          </div>
          
          <div className="bg-card-bg/10 backdrop-blur-md rounded-xl p-space-md flex flex-col gap-space-xs shadow-sm min-w-[300px]">
            <div className="flex items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-xs">
                <Navigation className="w-5 h-5 text-secondary-fixed" />
                <span className="text-label-md font-label-md text-on-primary">GPS Geolocation</span>
              </div>
              <button 
                onClick={handleRecalibrate}
                className="text-body-sm font-label-md text-secondary-fixed hover:text-on-primary flex items-center gap-1 transition-colors disabled:opacity-50"
                disabled={isRefreshing}
                type="button"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} /> Recalibrate
              </button>
            </div>
            <div className="text-body-md font-label-md text-surface-container font-semibold flex items-center gap-space-xs">
              <MapPin className="w-[18px] h-[18px] text-crowd-green" />
              <span className="truncate">{locationText}</span>
            </div>
            <span className="text-body-sm font-body-sm text-tertiary-fixed-dim">Nearest Stop: <strong className="text-on-primary">One Raffles Quay (03059)</strong> • 180m away</span>
          </div>
        </div>
      </div>
    </section>
  );
}

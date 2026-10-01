import { useState, useEffect } from "react";
import { Clock, Globe, Search, Bell, User } from "lucide-react";
import { format } from "date-fns";

export function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card-bg/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-margin h-8 flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
          <div className="flex items-center gap-space-md">
            <span className="flex items-center gap-space-xs font-label-md text-label-md text-primary">
              <span className="w-2 h-2 rounded-full bg-crowd-green animate-pulse"></span>
              Live Transit Operations
            </span>
            <span className="text-outline-variant">•</span>
            <span className="flex items-center gap-space-xs">
              <Clock className="w-4 h-4 text-on-surface-variant" />
              <span className="font-label-md text-label-md text-on-surface">SGT (UTC+8)</span>
              <span className="text-on-surface font-label-md text-label-md">
                {format(time, "HH:mm:ss")}
              </span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-space-lg">
            <div className="flex items-center gap-space-xs">
              <span className="text-body-sm font-body-sm text-text-muted">Text Size:</span>
              <div className="flex items-center gap-space-xs">
                <button className="px-space-xs py-0.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" type="button">A-</button>
                <button className="px-space-xs py-0.5 rounded bg-primary-container text-on-primary font-label-md text-label-md transition-colors" type="button">A</button>
                <button className="px-space-xs py-0.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors" type="button">A+</button>
              </div>
            </div>
            <div className="flex items-center gap-space-xs">
              <Globe className="w-4 h-4 text-on-surface-variant" />
              <span className="font-label-md text-label-md text-on-surface">English (SG)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-20 bg-card-bg">
        <div className="max-w-7xl mx-auto px-margin h-20 flex items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-xl">
            <a href="#" className="flex items-center gap-space-xs group">
              <div className="flex items-baseline tracking-tighter">
                <span className="text-headline-lg font-headline-lg text-primary font-extrabold">SBS</span>
                <span className="text-headline-lg font-headline-lg text-sbs-orange-bright font-black mx-0.5 transform -skew-x-12">/</span>
                <span className="text-headline-lg font-headline-lg text-primary-container font-extrabold">Transit</span>
              </div>
              <div className="hidden sm:flex flex-col ml-space-xs pl-space-xs border-l border-border-subtle">
                <span className="font-label-badge text-label-badge text-secondary uppercase leading-none tracking-widest">NextBus</span>
                <span className="font-body-sm text-body-sm text-text-muted leading-tight">Official Arrival Portal</span>
              </div>
            </a>
            
            <nav className="hidden xl:flex items-center gap-space-xs">
              <a href="#" className="px-space-md py-space-sm text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md">Home</a>
              <a href="#" aria-current="page" className="px-space-md py-space-sm transition-colors bg-primary-container text-on-primary font-bold rounded-lg">Bus</a>
              <a href="#" className="px-space-md py-space-sm text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md">Rail</a>
              <a href="#" className="px-space-md py-space-sm text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md">Helpful Information</a>
              <a href="#" className="px-space-md py-space-sm text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md">Talk To Us</a>
              <a href="#" className="px-space-md py-space-sm text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md">Reaching Out</a>
              <a href="#" className="px-space-md py-space-sm text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md">What's New</a>
            </nav>
          </div>
          
          <div className="flex items-center gap-space-md">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-on-surface-variant" />
              <input type="search" placeholder="Search bus service, stop code..." className="w-64 pl-9 pr-space-md py-1.5 rounded-lg bg-surface-container-low text-on-surface placeholder-text-muted font-body-sm text-body-sm focus:outline-none focus:bg-card-bg" />
            </div>
            <button className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" type="button">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer">
              <User className="w-4 h-4 text-on-primary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

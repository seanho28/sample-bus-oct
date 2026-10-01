import { BadgeCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-tertiary text-on-tertiary mt-space-xl">
      <div className="bg-tertiary-container/40">
        <div className="max-w-7xl mx-auto px-margin py-space-md flex flex-wrap items-center justify-between gap-space-md text-body-sm font-body-sm">
          <div className="flex items-center gap-space-sm">
            <BadgeCheck className="w-5 h-5 text-secondary-container" />
            <span className="text-tertiary-fixed">Data provided by official Singapore Land Transport Authority (LTA) DataMall API & SBS Transit Real-Time Fleet Feed</span>
          </div>
          <div className="flex items-center gap-space-lg text-tertiary-fixed-dim">
            <span className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-crowd-green"></span>
              System Status: Operational
            </span>
            <span>Feed Latency: &lt; 8s</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter mb-space-xl">
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-baseline tracking-tighter">
              <span className="text-headline-md font-headline-md text-on-tertiary font-extrabold">SBS</span>
              <span className="text-headline-md font-headline-md text-sbs-orange-bright font-black mx-0.5">/</span>
              <span className="text-headline-md font-headline-md text-primary-fixed font-extrabold">Transit</span>
            </div>
            <p className="font-body-md text-body-md text-on-tertiary-container max-w-sm">
              SBS Transit is a leading public transport operator in Singapore, operating world-class scheduled bus routes and high-capacity rail lines committed to safe, reliable, and delightful journeys.
            </p>
            <div className="flex items-center gap-space-md text-tertiary-fixed-dim">
              <span className="font-label-badge text-label-badge tracking-widest uppercase">Civic Transit Partner</span>
              <span className="text-outline">|</span>
              <span className="font-label-badge text-label-badge tracking-widest uppercase">ComfortDelGro Group</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-on-tertiary">Bus Operations</span>
            <a href="#" className="font-body-sm text-body-sm text-tertiary-fixed-dim hover:text-on-tertiary transition-colors">NextBus Arrivals</a>
            <a href="#" className="font-body-sm text-body-sm text-tertiary-fixed-dim hover:text-on-tertiary transition-colors">Service Information & Routes</a>
            <a href="#" className="font-body-sm text-body-sm text-tertiary-fixed-dim hover:text-on-tertiary transition-colors">Linear Route Diagram</a>
            <a href="#" className="font-body-sm text-body-sm text-tertiary-fixed-dim hover:text-on-tertiary transition-colors">Bus Interchanges & Terminals</a>
            <a href="#" className="font-body-sm text-body-sm text-tertiary-fixed-dim hover:text-on-tertiary transition-colors">Fares & Concessions</a>
          </div>
          
          <div className="flex flex-col gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-on-tertiary">Rail Network</span>
            <a href="#" className="font-body-sm text-body-sm text-tertiary-fixed-dim hover:text-on-tertiary transition-colors">North East Line (NEL)</a>
            <a href="#" className="font-body-sm text-body-sm text-tertiary-fixed-dim hover:text-on-tertiary transition-colors">Downtown Line (DTL)</a>
            <a href="#" className="font-body-sm text-body-sm text-tertiary-fixed-dim hover:text-on-tertiary transition-colors">Sengkang & Punggol LRT</a>
            <a href="#" className="font-body-sm text-body-sm text-tertiary-fixed-dim hover:text-on-tertiary transition-colors">First & Last Train Timings</a>
            <a href="#" className="font-body-sm text-body-sm text-tertiary-fixed-dim hover:text-on-tertiary transition-colors">Station Facilities & Lifts</a>
          </div>
          
          <div className="flex flex-col gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-on-tertiary">Help & Feedback</span>
            <a href="#" className="font-body-sm text-body-sm text-tertiary-fixed-dim hover:text-on-tertiary transition-colors">Customer Feedback Hotline</a>
            <a href="#" className="font-body-sm text-body-sm text-tertiary-fixed-dim hover:text-on-tertiary transition-colors">Lost & Found Services</a>
            <a href="#" className="font-body-sm text-body-sm text-tertiary-fixed-dim hover:text-on-tertiary transition-colors">Accessibility Guide (WAB)</a>
            <a href="#" className="font-body-sm text-body-sm text-tertiary-fixed-dim hover:text-on-tertiary transition-colors">Frequently Asked Questions</a>
            <a href="#" className="font-body-sm text-body-sm text-tertiary-fixed-dim hover:text-on-tertiary transition-colors">Community Transit Programmes</a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-space-md pt-space-lg text-body-sm font-body-sm text-tertiary-fixed-dim border-t border-tertiary-fixed-dim/20">
          <p>© 2025 SBS Transit Ltd. (Co. Reg. No.: 199206653M). All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-space-md justify-center">
            <a href="#" className="hover:text-on-tertiary transition-colors">Privacy Statement</a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-on-tertiary transition-colors">Terms of Use</a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-on-tertiary transition-colors">LTA DataMall Terms</a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-on-tertiary transition-colors">Site Map</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

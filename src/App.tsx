import { useState, useEffect, useCallback } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import {
  STOP_DIRECTORY,
  LtaBusArrivalResponse,
  LtaServiceItem,
  BusServiceData,
  transformLtaServiceToUi,
} from "./data/mockData";
import { 
  Bus, MapPin, Signpost, X, Timer, 
  ShieldCheck, Megaphone, Info, Accessibility, ArrowRightLeft,
  Footprints, RefreshCw, CreditCard, ArrowRight, Bookmark,
  Check, UserRound, Search
} from "lucide-react";
import { cn } from "./lib/utils";

function App() {
  const [activeTab, setActiveTab] = useState<"service" | "stop">("service");
  const [searchInput, setSearchInput] = useState("147");
  const [stopDirectInput, setStopDirectInput] = useState("83139");
  const [stopServiceFilter, setStopServiceFilter] = useState("");
  const [activeServiceNum, setActiveServiceNum] = useState("147");
  const [currentStopCode, setCurrentStopCode] = useState("03059");
  const [countdown, setCountdown] = useState(20);
  const [isRefreshingLive, setIsRefreshingLive] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const [servicesAtStop, setServicesAtStop] = useState<LtaServiceItem[]>([]);
  const [isLiveApi, setIsLiveApi] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const fetchLtaBusArrival = useCallback(async (busStopCode: string, serviceNo?: string) => {
    setIsRefreshingLive(true);
    setApiError(null);
    try {
      const params = new URLSearchParams({ BusStopCode: busStopCode });
      if (serviceNo && serviceNo.trim()) {
        params.set("ServiceNo", serviceNo.trim());
      }
      const res = await fetch(`/api/bus-arrival?${params.toString()}`);
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `HTTP ${res.status}`);
      }
      const data: LtaBusArrivalResponse = await res.json();
      setIsLiveApi(Boolean(data._live));

      if (Array.isArray(data.Services) && data.Services.length > 0) {
        setServicesAtStop((prev) => {
          // If we queried a single service, merge it into the stop's service list
          if (serviceNo && serviceNo.trim() && prev.length > 1) {
            const incoming = data.Services[0];
            const filtered = prev.filter((s) => s.ServiceNo !== incoming.ServiceNo);
            return [incoming, ...filtered];
          }
          return data.Services;
        });
      } else {
        setServicesAtStop([]);
      }
    } catch (err: any) {
      setApiError(err?.message || "Unable to fetch LTA BusArrival feed");
    } finally {
      setTimeout(() => setIsRefreshingLive(false), 350);
    }
  }, []);

  // Initial fetch & whenever currentStopCode changes
  useEffect(() => {
    fetchLtaBusArrival(currentStopCode);
  }, [currentStopCode, fetchLtaBusArrival]);

  // 20-second LTA v3 refresh cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchLtaBusArrival(currentStopCode);
          return 20;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentStopCode, fetchLtaBusArrival]);

  const handleEstimate = () => {
    const val = searchInput.trim() || "147";
    setActiveServiceNum(val);
    setCountdown(20);
    fetchLtaBusArrival(currentStopCode, val);
  };

  const handleStopLookup = () => {
    const rawStop = stopDirectInput.trim() || "83139";
    const svcFilter = stopServiceFilter.trim();
    setCurrentStopCode(rawStop);
    setCountdown(20);
    fetchLtaBusArrival(rawStop, svcFilter || undefined);
    if (svcFilter) {
      setActiveServiceNum(svcFilter);
      setSearchInput(svcFilter);
    }
  };

  const handleManualRefresh = () => {
    setCountdown(20);
    fetchLtaBusArrival(currentStopCode);
  };

  const toggleStopDirection = () => {
    const meta = STOP_DIRECTORY[currentStopCode];
    const nextStop = meta?.oppCode || (currentStopCode === "03059" ? "03071" : "03059");
    setCurrentStopCode(nextStop);
    setCountdown(20);
  };

  const handleSaveRoute = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  // Pick the active service from the fetched LTA services list, or fall back to first service
  const matchedLtaService: LtaServiceItem | undefined =
    servicesAtStop.find((s) => s.ServiceNo.toLowerCase() === activeServiceNum.toLowerCase()) ||
    servicesAtStop[0];

  const activeData: BusServiceData = matchedLtaService
    ? transformLtaServiceToUi(matchedLtaService, currentStopCode)
    : transformLtaServiceToUi(
        {
          ServiceNo: activeServiceNum,
          Operator: "SBST",
          NextBus: {
            OriginCode: "28009",
            DestinationCode: "64009",
            EstimatedArrival: "",
            Monitored: 0,
            Latitude: "",
            Longitude: "",
            VisitNumber: "1",
            Load: "SEA",
            Feature: "WAB",
            Type: "DD",
          },
          NextBus2: {
            OriginCode: "",
            DestinationCode: "",
            EstimatedArrival: "",
            Monitored: 0,
            Latitude: "",
            Longitude: "",
            VisitNumber: "",
            Load: "",
            Feature: "",
            Type: "",
          },
          NextBus3: {
            OriginCode: "",
            DestinationCode: "",
            EstimatedArrival: "",
            Monitored: 0,
            Latitude: "",
            Longitude: "",
            VisitNumber: "",
            Load: "",
            Feature: "",
            Type: "",
          },
        },
        currentStopCode
      );

  const currentStopMeta = STOP_DIRECTORY[currentStopCode] || {
    name: `Bus Stop ${currentStopCode}`,
    road: "Singapore Bus Stop",
    desc: `LTA DataMall BusStopCode ${currentStopCode}`,
    oppCode: "03059",
    nodes: [
      `Prev Stop`,
      `Stop ${currentStopCode} (${currentStopCode})`,
      `Next Stop`,
      `Terminus`,
    ],
  };

  const popularServices = ["14", "15", "30", "65", "78", "147", "176", "190"];

  return (
    <div className="font-body-md text-body-md text-on-surface bg-surface min-h-screen">
      <Header />
      
      <main className="w-full pt-28 bg-surface">
        <div className="flex flex-col w-full">
          <Hero />
          
          <section className="max-w-7xl mx-auto px-margin py-space-xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              
              {/* LEFT COLUMN */}
              <aside className="lg:col-span-4 flex flex-col gap-space-lg">
                
                {/* Search Console */}
                <div className="bg-card-bg rounded-xl shadow-md overflow-hidden">
                  <div className="bg-tertiary text-on-tertiary px-space-md py-space-sm flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <Bus className="w-5 h-5 text-secondary-container" />
                      <span className="text-label-md font-label-md uppercase tracking-wider">NextBus Query Console</span>
                    </div>
                    <span className="text-body-sm font-label-badge bg-primary-container px-2 py-0.5 rounded text-on-primary">
                      {isLiveApi ? "LTA v3 Live" : "SGT Live"}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 bg-surface-container-low text-center font-label-md text-label-md">
                    <button 
                      type="button"
                      onClick={() => setActiveTab("service")}
                      className={cn("py-space-md px-space-sm shadow-sm transition-all flex items-center justify-center gap-space-xs", 
                        activeTab === "service" ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container")}
                    >
                      <MapPin className="w-[18px] h-[18px]" />
                      <span>By Service No.</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setActiveTab("stop")}
                      className={cn("py-space-md px-space-sm shadow-sm transition-all flex items-center justify-center gap-space-xs", 
                        activeTab === "stop" ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container")}
                    >
                      <Signpost className="w-[18px] h-[18px]" />
                      <span>By Bus Stop No.</span>
                    </button>
                  </div>
                  
                  <div className="p-space-lg flex flex-col gap-space-md">
                    {activeTab === "service" ? (
                      <div className="flex flex-col gap-space-md">
                        <div>
                          <label className="block font-label-md text-label-md text-text-primary mb-1">
                            Service No. <span className="text-secondary font-bold">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                              <Search className="w-5 h-5" />
                            </div>
                            <input 
                              type="text" 
                              value={searchInput}
                              onChange={(e) => setSearchInput(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleEstimate()}
                              placeholder="e.g. 15, 30, 78, 147, 176..." 
                              className="w-full pl-10 pr-10 py-2.5 bg-surface-container-low rounded-lg text-headline-sm font-headline-sm text-on-surface placeholder:text-text-muted focus:bg-card-bg focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            {searchInput && (
                              <div className="absolute inset-y-0 right-1 flex items-center gap-1 pr-1">
                                <button 
                                  type="button"
                                  onClick={() => setSearchInput("")}
                                  className="p-1 rounded text-text-muted hover:text-on-surface transition-colors"
                                >
                                  <X className="w-[18px] h-[18px]" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block font-label-md text-label-md text-text-primary">
                              Bus Stop No. <span className="text-body-sm font-body-sm text-text-muted">(*optional)</span>
                            </label>
                            <span className="text-body-sm font-body-sm text-secondary font-semibold">Auto-ranked</span>
                          </div>
                          <select 
                            value={currentStopCode}
                            onChange={(e) => {
                              setCurrentStopCode(e.target.value);
                              setCountdown(20);
                            }}
                            className="w-full py-2.5 px-space-sm bg-surface-container-low rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:bg-card-bg focus:ring-2 focus:ring-primary/20"
                          >
                            <option value="03059">03059 - One Raffles Quay (Nearest: 180m)</option>
                            <option value="83139">83139 - Opp Haig Rd Mkt (LTA v3 Stop)</option>
                            <option value="20251">20251 - West Coast Stn Exit B (Svc 176, 30, 78)</option>
                            <option value="03071">03071 - 80 Robinson Rd (Opposite: 240m)</option>
                            <option value="03031">03031 - Raffles Pl Stn Exit F (310m)</option>
                            <option value="03381">03381 - The Sail, Marina Blvd (420m)</option>
                            <option value="03501">03501 - Marina Bay Sands Theatre (750m)</option>
                          </select>
                        </div>
                        
                        <label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-secondary-container focus:ring-0 cursor-pointer accent-secondary" />
                          <div className="flex flex-col">
                            <span className="text-label-md font-label-md text-on-surface">Auto-lock Nearest Stop to Me</span>
                            <span className="text-body-sm font-body-sm text-text-muted">Detects lowest pedestrian travel time via GPS</span>
                          </div>
                        </label>
                        
                        <button 
                          type="button"
                          onClick={handleEstimate}
                          className="w-full py-3.5 px-space-md rounded-lg bg-secondary text-on-secondary font-headline-sm text-headline-sm uppercase tracking-wider hover:bg-secondary-container active:scale-[0.99] transition-all flex items-center justify-center gap-space-sm shadow-md"
                        >
                          <Timer className="w-[22px] h-[22px]" />
                          <span>Estimate Arrival Time</span>
                        </button>
                        
                        <div className="pt-space-xs">
                          <span className="block text-body-sm font-label-badge uppercase text-text-muted tracking-wider mb-2">Fast Select Popular Services:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {popularServices.map(svc => (
                              <button 
                                key={svc}
                                type="button"
                                onClick={() => {
                                  setSearchInput(svc);
                                  setActiveServiceNum(svc);
                                  if (["176", "30", "78"].includes(svc)) {
                                    setCurrentStopCode("20251");
                                  } else if (svc === "15") {
                                    setCurrentStopCode("83139");
                                  } else {
                                    fetchLtaBusArrival(currentStopCode, svc);
                                  }
                                }}
                                className={cn(
                                  "px-2.5 py-1 rounded text-body-sm font-label-md transition-all",
                                  activeData.serviceNo === svc 
                                    ? "bg-primary text-on-primary font-bold shadow-sm"
                                    : "bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface"
                                )}
                              >
                                {svc}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-space-md">
                        <div>
                          <label className="block font-label-md text-label-md text-text-primary mb-1">
                            Bus Stop No. (5 Digits) <span className="text-secondary font-bold">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <input 
                              type="text" 
                              value={stopDirectInput}
                              onChange={(e) => setStopDirectInput(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && handleStopLookup()}
                              placeholder="e.g. 83139, 20251, 03059..." 
                              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:bg-card-bg"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block font-label-md text-label-md text-text-primary mb-1">
                            Service No. <span className="text-body-sm font-body-sm text-text-muted">(*optional)</span>
                          </label>
                          <input 
                            type="text" 
                            value={stopServiceFilter}
                            onChange={(e) => setStopServiceFilter(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleStopLookup()}
                            placeholder="e.g. 15 (or leave empty for all services)" 
                            className="w-full px-space-sm py-2.5 bg-surface-container-low rounded-lg text-body-md font-body-md text-on-surface focus:outline-none focus:bg-card-bg"
                          />
                        </div>
                        <button 
                          type="button"
                          onClick={handleStopLookup}
                          className="w-full py-3.5 px-space-md rounded-lg bg-secondary text-on-secondary font-headline-sm text-headline-sm uppercase tracking-wider hover:bg-secondary-container transition-all flex items-center justify-center gap-space-sm shadow-md"
                        >
                          <Bus className="w-[22px] h-[22px]" />
                          <span>Lookup Bus Stop Services</span>
                        </button>
                      </div>
                    )}

                    {apiError && (
                      <div className="p-space-sm rounded-lg bg-error-container text-on-error-container text-body-sm">
                        {apiError}
                      </div>
                    )}
                    
                    <div className="p-space-sm rounded-lg bg-surface-container-high/60 flex items-start gap-space-xs text-body-sm font-body-sm text-on-surface-variant">
                      <ShieldCheck className="w-[18px] h-[18px] text-primary-container shrink-0 mt-0.5" />
                      <span>
                        Timings powered by LTA DataMall v3 BusArrival endpoint (<code>/api/bus-arrival</code>) with 20-second telemetry refresh.
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* News Card */}
                <div className="bg-card-bg rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-primary-container px-space-md py-space-sm flex items-center justify-between text-on-primary">
                    <div className="flex items-center gap-space-xs">
                      <Megaphone className="w-5 h-5" />
                      <span className="text-label-md font-label-md">Transit News & Commuter Advisory</span>
                    </div>
                    <a href="#" className="text-body-sm font-label-badge uppercase text-primary-fixed hover:underline">View All</a>
                  </div>
                  <div className="p-space-md flex flex-col divide-y divide-border-subtle/0 gap-2">
                    <div className="py-space-sm flex flex-col gap-1 hover:bg-surface-container-low px-2 -mx-2 rounded transition-colors">
                      <span className="text-body-sm font-label-badge text-secondary uppercase font-bold">01 Oct 2026</span>
                      <a href="#" className="text-body-md font-label-md text-text-primary hover:text-primary transition-colors line-clamp-2">
                        Service 16/16M Affected by Road Closure for the Joo Chiat Car-Free Day
                      </a>
                      <span className="text-body-sm font-body-sm text-text-muted">Temporary bus diversion in Katong & Joo Chiat district.</span>
                    </div>
                    <div className="py-space-sm flex flex-col gap-1 hover:bg-surface-container-low px-2 -mx-2 rounded transition-colors">
                      <span className="text-body-sm font-label-badge text-primary-container uppercase font-bold">30 Sep 2026</span>
                      <a href="#" className="text-body-md font-label-md text-text-primary hover:text-primary transition-colors line-clamp-2">
                        Updated Bus Stop Distances & Fare Stage Adjustments
                      </a>
                      <span className="text-body-sm font-body-sm text-text-muted">Recalibration across Jurong West, Hougang, and Tampines.</span>
                    </div>
                    <div className="py-space-sm flex flex-col gap-1 hover:bg-surface-container-low px-2 -mx-2 rounded transition-colors">
                      <span className="text-body-sm font-label-badge text-crowd-green uppercase font-bold">24 Sep 2026</span>
                      <a href="#" className="text-body-md font-label-md text-text-primary hover:text-primary transition-colors line-clamp-2">
                        SBS Transit Trials AI for More Reliable Bus Arrivals
                      </a>
                      <span className="text-body-sm font-body-sm text-text-muted">Predictive telemetry reducing headway variance on high-capacity routes.</span>
                    </div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm">
                  <span className="block text-label-md font-label-md text-text-primary mb-space-sm flex items-center gap-space-xs">
                    <Info className="w-5 h-5 text-primary" />
                    Understanding NextBus Live Badges
                  </span>
                  <div className="space-y-space-xs text-body-sm font-body-sm">
                    <div className="flex items-center justify-between p-1.5 rounded bg-card-bg">
                      <span className="inline-flex items-center gap-1.5 font-label-md text-crowd-green font-semibold">
                        <span className="w-2.5 h-2.5 rounded-full bg-crowd-green"></span> Seats Avail (SEA)
                      </span>
                      <span className="text-text-muted">Plenty of seating (&gt;30% free)</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded bg-card-bg">
                      <span className="inline-flex items-center gap-1.5 font-label-md text-crowd-amber font-semibold">
                        <span className="w-2.5 h-2.5 rounded-full bg-crowd-amber"></span> Standing Avail (SDA)
                      </span>
                      <span className="text-text-muted">Seats taken, comfortable standing</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded bg-card-bg">
                      <span className="inline-flex items-center gap-1.5 font-label-md text-crowd-red font-semibold">
                        <span className="w-2.5 h-2.5 rounded-full bg-crowd-red"></span> Limited Standing (LSD)
                      </span>
                      <span className="text-text-muted">High crowd density; board rear</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded bg-card-bg">
                      <span className="inline-flex items-center gap-1.5 font-label-md text-primary font-semibold">
                        <span className="px-1.5 py-0.5 rounded bg-surface-container text-primary font-bold text-[10px]">DD</span> Double Deck
                      </span>
                      <span className="text-text-muted">Upper deck open; higher capacity</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded bg-card-bg">
                      <span className="inline-flex items-center gap-1.5 font-label-md text-[#0369A1] font-semibold">
                        <Accessibility className="w-4 h-4" /> WAB
                      </span>
                      <span className="text-text-muted">Wheelchair accessible ramp equipped</span>
                    </div>
                  </div>
                </div>
              </aside>

              {/* RIGHT COLUMN */}
              <section className="lg:col-span-8 flex flex-col gap-space-lg">
                
                {/* Nearest Stop Banner */}
                <div className="bg-card-bg rounded-xl shadow-md p-space-lg relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                    <div>
                      <div className="flex items-center gap-space-xs mb-1">
                        <span className="px-2 py-0.5 rounded bg-crowd-green/15 text-crowd-green font-label-badge uppercase tracking-wider">
                          Nearest Bus Stop to You
                        </span>
                        <span className="text-body-sm font-label-md text-text-muted">• 180m (2 mins walk)</span>
                      </div>
                      <h2 className="text-headline-lg font-headline-lg text-primary tracking-tight">
                        {currentStopMeta.name}{" "}
                        <span className="text-headline-md font-headline-md text-text-muted font-normal">({currentStopCode})</span>
                      </h2>
                      <p className="text-body-md font-body-md text-on-surface-variant">
                        {currentStopMeta.desc}
                      </p>
                    </div>
                    <button 
                      type="button"
                      onClick={toggleStopDirection}
                      className="px-space-md py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md transition-all flex items-center justify-center gap-space-xs shrink-0 shadow-sm"
                    >
                      <ArrowRightLeft className="w-[18px] h-[18px]" />
                      <span>Switch to Stop {currentStopMeta.oppCode}</span>
                    </button>
                  </div>
                  <div className="mt-space-md pt-space-md flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-low/70 rounded-lg p-space-sm">
                    <div className="flex items-center gap-space-xs text-body-sm font-body-sm text-text-muted">
                      <MapPin className="w-[18px] h-[18px] text-primary" />
                      <span>Detected Pedestrian Corridor: <strong className="text-on-surface">Marina Blvd & Raffles Quay Junc</strong></span>
                    </div>
                    <div className="flex items-center gap-space-xs text-body-sm font-label-md text-secondary font-semibold">
                      <Footprints className="w-4 h-4" />
                      <span>Fastest Access via Exit F / Underground Linkway</span>
                    </div>
                  </div>
                </div>
                
                {/* Dashboard */}
                <div className="bg-card-bg rounded-xl shadow-md overflow-hidden">
                  <div className="bg-surface-container-low px-space-lg py-space-md flex flex-wrap items-center justify-between gap-space-md">
                    <div className="flex items-center gap-space-md">
                      <div className="w-20 h-16 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md">
                        <span className="text-timing-huge font-timing-huge font-black tracking-tight">{activeData.serviceNo}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-space-xs">
                          <span className="text-body-sm font-label-badge uppercase tracking-wider text-secondary font-bold">
                            {activeData.operator} Trunk Route
                          </span>
                          <span className="text-outline-variant">•</span>
                          <span className="text-body-sm font-body-sm text-text-muted">{activeData.freq}</span>
                        </div>
                        <h3 className="text-headline-sm font-headline-sm text-text-primary">
                          {activeData.dest}
                        </h3>
                        <span className="text-body-sm font-body-sm text-text-muted">
                          Calling at: <strong>{activeData.nearestStopName} ({activeData.nearestStopCode})</strong>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-space-sm">
                      <div className="flex flex-col items-end">
                        <span className="flex items-center gap-1.5 text-body-sm font-label-md text-crowd-green">
                          <span className="w-2.5 h-2.5 rounded-full bg-crowd-green animate-pulse"></span>
                          <span>LIVE TRANSMISSION</span>
                        </span>
                        <span className="text-body-sm font-body-sm text-text-muted">Next ping in <strong>{countdown}</strong>s</span>
                      </div>
                      <button 
                        type="button"
                        onClick={handleManualRefresh}
                        className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary transition-all shadow-sm"
                        title="Refresh Live Arrivals Now"
                      >
                        <RefreshCw className={cn("w-5 h-5", isRefreshingLive && "animate-spin")} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-space-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                      {activeData.buses.map((bus, idx) => (
                        <div key={idx} className="rounded-xl p-space-md bg-surface-container-low hover:bg-surface-container transition-all flex flex-col justify-between shadow-sm relative overflow-hidden">
                          <div className="flex items-center justify-between mb-space-sm">
                            <span className="text-label-md font-label-md uppercase tracking-wider text-text-muted">
                              {idx === 0 ? "Next Bus" : idx === 1 ? "2nd Bus" : "3rd Bus"}
                            </span>
                            {idx === 0 && bus.timing === "Arr" ? (
                              <span className="px-2 py-0.5 rounded-full bg-crowd-green text-on-primary font-label-badge text-label-badge uppercase tracking-wider flex items-center gap-1 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-on-primary animate-ping"></span> Arriving
                              </span>
                            ) : (
                              <span className="text-body-sm font-label-md text-text-muted">
                                {bus.monitored === 1 ? "Monitored" : "Subsequent"}
                              </span>
                            )}
                          </div>
                          
                          <div className="my-space-sm flex items-baseline gap-space-xs">
                            <span className={cn("text-timing-huge font-timing-huge font-black", bus.timing === "Arr" ? "text-crowd-green" : "text-text-primary")}>
                              {bus.timing}
                            </span>
                            <span className="text-headline-sm font-headline-sm text-text-muted font-normal">
                              {bus.sub}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-1.5 pt-space-xs">
                            <span className={cn("px-2 py-1 rounded font-label-md text-label-md flex items-center gap-1", bus.loadClass)}>
                              <span className={cn("w-2 h-2 rounded-full", bus.dotClass)}></span> {bus.load}
                            </span>
                            {bus.deck && (
                              <span className={cn("px-2 py-1 rounded font-label-badge font-bold text-label-badge uppercase", bus.deck === "SD" ? "bg-surface-variant text-on-surface-variant" : "bg-surface-container text-primary")}>
                                {bus.deck}
                              </span>
                            )}
                            {bus.wab && (
                              <span className="px-2 py-1 rounded bg-[#E0F2FE] text-[#0369A1] font-label-badge font-bold text-label-badge flex items-center gap-0.5">
                                <Accessibility className="w-3.5 h-3.5" /> WAB
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-space-md p-space-sm rounded-lg bg-surface-container-low flex flex-wrap items-center justify-between gap-space-md text-body-sm font-body-sm">
                      <div className="flex items-center gap-space-xs text-text-primary">
                        <CreditCard className="w-5 h-5 text-secondary" />
                        <span>Estimated Adult Card Fare from here: <strong className="font-semibold text-primary">$1.09 – $1.65</strong> (Distance-based)</span>
                      </div>
                      <div className="flex items-center gap-space-md">
                        <a href="#" className="text-secondary font-label-md text-label-md hover:underline flex items-center gap-0.5">
                          Concession Fares <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                        <button 
                          type="button"
                          onClick={handleSaveRoute}
                          className="flex items-center gap-1 text-primary-container font-label-md text-label-md hover:opacity-80"
                        >
                          <Bookmark className="w-4 h-4" />
                          <span>{savedNotice ? "Route Saved!" : "Save Route"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schematic */}
                <div className="bg-card-bg rounded-xl shadow-md p-space-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
                    <div>
                      <span className="text-body-sm font-label-badge uppercase tracking-wider text-secondary font-bold">Stop Progression schematic</span>
                      <h4 className="text-headline-md font-headline-md text-text-primary">Upcoming Stops for Service <span>{activeData.serviceNo}</span></h4>
                    </div>
                    <div className="flex items-center gap-space-xs text-body-sm font-label-md text-text-muted">
                      <span className="w-3 h-3 rounded-full bg-primary ring-2 ring-primary-fixed"></span>
                      <span>Your Nearest Stop Node</span>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto pb-space-sm">
                    <div className="min-w-[620px] py-space-md relative flex items-center justify-between">
                      <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 bg-surface-container-high rounded-full"></div>
                      
                      {/* Node 1 */}
                      <div className="relative z-10 flex flex-col items-center text-center max-w-[130px]">
                        <div className="w-8 h-8 rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed flex items-center justify-center font-bold text-body-sm shadow-sm mb-2">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="text-label-md font-label-md text-on-surface line-clamp-1">{activeData.nodes[0].split(' (')[0]}</span>
                        <span className="text-body-sm font-body-sm text-text-muted">{activeData.nodes[0].match(/\((.*?)\)/)?.[1] || "03031"}</span>
                        <span className="text-[11px] text-text-muted mt-0.5">Passed 2m ago</span>
                      </div>
                      
                      {/* Moving Bus */}
                      <div className="relative z-20 flex flex-col items-center">
                        <div className="px-2 py-1 rounded bg-secondary text-on-secondary font-label-badge text-label-badge uppercase shadow-md flex items-center gap-1 -mt-7 animate-bounce">
                          <Bus className="w-3.5 h-3.5" />
                          <span>{activeData.serviceNo} • Live</span>
                        </div>
                      </div>
                      
                      {/* Node 2 (Current) */}
                      <div className="relative z-10 flex flex-col items-center text-center max-w-[150px]">
                        <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-lg ring-4 ring-primary-fixed mb-2 animate-pulse">
                          <UserRound className="w-5 h-5" />
                        </div>
                        <span className="text-label-md font-label-md text-primary font-bold line-clamp-2">{activeData.nodes[1].split(' (')[0]}</span>
                        <span className="text-body-sm font-label-badge text-secondary font-bold">{currentStopCode} • YOU ARE HERE</span>
                        <span className="text-body-sm font-label-md text-crowd-green font-semibold mt-0.5">
                          Next bus: {activeData.buses[0].timing === "Arr" ? "Arr" : `${activeData.buses[0].timing} ${activeData.buses[0].sub}`}
                        </span>
                      </div>
                      
                      {/* Node 3 */}
                      <div className="relative z-10 flex flex-col items-center text-center max-w-[130px]">
                        <div className="w-8 h-8 rounded-full bg-card-bg text-primary-container border-2 border-primary-container flex items-center justify-center font-bold text-body-sm shadow-sm mb-2">
                          3
                        </div>
                        <span className="text-label-md font-label-md text-on-surface line-clamp-1">{activeData.nodes[2].split(' (')[0]}</span>
                        <span className="text-body-sm font-body-sm text-text-muted">{activeData.nodes[2].match(/\((.*?)\)/)?.[1] || "03381"}</span>
                        <span className="text-[11px] text-text-muted mt-0.5">~3 mins away</span>
                      </div>
                      
                      {/* Node 4 */}
                      <div className="relative z-10 flex flex-col items-center text-center max-w-[140px]">
                        <div className="w-8 h-8 rounded-full bg-card-bg text-text-muted border-2 border-outline-variant flex items-center justify-center font-bold text-body-sm shadow-sm mb-2">
                          4
                        </div>
                        <span className="text-label-md font-label-md text-on-surface line-clamp-1">{activeData.nodes[3].split(' (')[0]}</span>
                        <span className="text-body-sm font-body-sm text-text-muted">{activeData.nodes[3].match(/\((.*?)\)/)?.[1] || "03501"}</span>
                        <span className="text-[11px] text-text-muted mt-0.5">~7 mins away</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stop Roster */}
                <div className="bg-card-bg rounded-xl shadow-md p-space-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
                    <div>
                      <span className="text-body-sm font-label-badge uppercase tracking-wider text-secondary font-bold">Comprehensive Stop Roster</span>
                      <h4 className="text-headline-md font-headline-md text-text-primary">
                        All Bus Services at Stop {currentStopCode} ({currentStopMeta.name})
                      </h4>
                    </div>
                    <span className="text-body-sm font-body-sm text-text-muted">Click any row to switch primary tracker</span>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-surface-container-low text-body-sm font-label-md text-on-surface-variant uppercase tracking-wider">
                          <th className="py-2.5 px-space-md rounded-l-lg">Service</th>
                          <th className="py-2.5 px-space-md">Destination</th>
                          <th className="py-2.5 px-space-md text-center">Next Bus</th>
                          <th className="py-2.5 px-space-md text-center">2nd Bus</th>
                          <th className="py-2.5 px-space-md text-center">3rd Bus</th>
                          <th className="py-2.5 px-space-md rounded-r-lg text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle text-body-md font-body-md">
                        {servicesAtStop.map((item) => {
                          const sData = transformLtaServiceToUi(item, currentStopCode);
                          const isActive = activeData.serviceNo === item.ServiceNo;
                          return (
                            <tr 
                              key={item.ServiceNo}
                              onClick={() => {
                                setSearchInput(item.ServiceNo);
                                setActiveServiceNum(item.ServiceNo);
                              }}
                              className={cn("transition-colors cursor-pointer", isActive ? "bg-surface-container/40" : "hover:bg-surface-container-low/60")}
                            >
                              <td className="py-space-md px-space-md">
                                <span className="w-12 h-8 rounded bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center font-bold">
                                  {item.ServiceNo}
                                </span>
                              </td>
                              <td className="py-space-md px-space-md font-label-md text-text-primary">
                                {sData.destShort}
                                <span className="block text-body-sm font-body-sm text-text-muted font-normal">
                                  {isActive ? "Currently focused in dashboard above" : `${sData.operator} • ${item.NextBus?.Feature === "WAB" ? "Wheelchair accessible" : "Trunk Route"}`}
                                </span>
                              </td>
                              <td className="py-space-md px-space-md text-center">
                                <span className={cn("font-headline-sm text-headline-sm font-bold", sData.buses[0].timing === "Arr" ? "text-crowd-green animate-pulse" : "text-text-primary")}>
                                  {sData.buses[0].timing === "Arr" || sData.buses[0].timing === "—" ? sData.buses[0].timing : `${sData.buses[0].timing} min`}
                                </span>
                                <span className={cn("block text-[11px] font-semibold", sData.buses[0].dotClass.replace('bg-', 'text-'))}>{sData.buses[0].load}</span>
                              </td>
                              <td className="py-space-md px-space-md text-center">
                                <span className="font-headline-sm text-headline-sm text-text-primary font-bold">
                                  {sData.buses[1].timing === "Arr" || sData.buses[1].timing === "—" ? sData.buses[1].timing : `${sData.buses[1].timing} min`}
                                </span>
                                <span className={cn("block text-[11px] font-semibold", sData.buses[1].dotClass.replace('bg-', 'text-'))}>{sData.buses[1].load}</span>
                              </td>
                              <td className="py-space-md px-space-md text-center">
                                <span className="font-headline-sm text-headline-sm text-text-primary font-bold">
                                  {sData.buses[2].timing === "Arr" || sData.buses[2].timing === "—" ? sData.buses[2].timing : `${sData.buses[2].timing} min`}
                                </span>
                                <span className={cn("block text-[11px] font-semibold", sData.buses[2].dotClass.replace('bg-', 'text-'))}>{sData.buses[2].load}</span>
                              </td>
                              <td className="py-space-md px-space-md text-right">
                                {isActive ? (
                                  <span className="px-space-sm py-1 rounded bg-crowd-green/15 text-crowd-green font-label-badge text-label-badge uppercase font-bold">Active</span>
                                ) : (
                                  <button type="button" className="px-space-sm py-1 rounded bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md transition-colors">Select</button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </section>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;

export type BusArrival = {
  timing: string;
  sub: string;
  load: string;
  loadClass: string;
  dotClass: string;
  deck: string;
  wab: boolean;
  monitored?: number;
  lat?: string;
  lng?: string;
  rawEstimatedArrival?: string;
};

export type BusServiceData = {
  serviceNo: string;
  operator: string;
  dest: string;
  destShort: string;
  freq: string;
  nearestStopCode: string;
  nearestStopName: string;
  road: string;
  buses: BusArrival[];
  nodes: string[];
};

export interface LtaBusSlot {
  OriginCode: string;
  DestinationCode: string;
  EstimatedArrival: string;
  Monitored: number;
  Latitude: string;
  Longitude: string;
  VisitNumber: string;
  Load: "SEA" | "SDA" | "LSD" | "";
  Feature: "WAB" | "";
  Type: "SD" | "DD" | "BD" | "";
}

export interface LtaServiceItem {
  ServiceNo: string;
  Operator: string;
  NextBus: LtaBusSlot;
  NextBus2: LtaBusSlot;
  NextBus3: LtaBusSlot;
}

export interface LtaBusArrivalResponse {
  "odata.metadata"?: string;
  BusStopCode: string;
  Services: LtaServiceItem[];
  _live?: boolean;
}

export const STOP_DIRECTORY: Record<string, { name: string; road: string; desc: string; oppCode: string; nodes: string[] }> = {
  "03059": {
    name: "One Raffles Quay",
    road: "Raffles Quay",
    desc: "Raffles Quay • Towards Fullerton / Hougang Central Int / Jurong East",
    oppCode: "03071",
    nodes: ["Opp So/Sofitel (03031)", "One Raffles Quay (03059)", "The Sail (03381)", "Marina Bay Sands (03501)"],
  },
  "03071": {
    name: "80 Robinson Rd",
    road: "Robinson Rd",
    desc: "Robinson Rd • Opposite One Raffles Quay & CPF Bldg",
    oppCode: "03059",
    nodes: ["Fullerton Sq (03011)", "80 Robinson Rd (03071)", "UIC Bldg (03129)", "Hub Synergy Pt (03222)"],
  },
  "83139": {
    name: "Opp Haig Rd Mkt",
    road: "Haig Rd",
    desc: "Haig Rd • Towards Dunman Rd / Marine Parade / Eunos",
    oppCode: "83131",
    nodes: ["Blk 12 Haig Rd (83129)", "Opp Haig Rd Mkt (83139)", "Dunman High Sch (83149)", "Katong Shopping Ctr (83159)"],
  },
  "20251": {
    name: "West Coast Stn Exit B",
    road: "West Coast Rd",
    desc: "West Coast Rd • Towards Clementi / Bukit Panjang / Boon Lay",
    oppCode: "20259",
    nodes: ["Blk 726 Clementi West (20241)", "West Coast Stn Exit B (20251)", "Tanglin Sec Sch (20261)", "Blk 513 West Coast (20271)"],
  },
  "03031": {
    name: "Raffles Pl Stn Exit F",
    road: "Robinson Rd",
    desc: "Robinson Rd • Financial District Corridor",
    oppCode: "03059",
    nodes: ["Fullerton Sq (03011)", "Raffles Pl Stn Exit F (03031)", "One Raffles Quay (03059)", "The Sail (03381)"],
  },
  "03381": {
    name: "The Sail",
    road: "Marina Blvd",
    desc: "Marina Blvd • Towards Marina Bay Sands & Bayfront",
    oppCode: "03389",
    nodes: ["One Raffles Quay (03059)", "The Sail (03381)", "Marina Bay Stn (03539)", "Marina Bay Sands (03501)"],
  },
  "03501": {
    name: "Marina Bay Sands Theatre",
    road: "Bayfront Ave",
    desc: "Bayfront Ave • Outside MBS Theatre & Shops",
    oppCode: "03509",
    nodes: ["The Sail (03381)", "Marina Bay Sands (03501)", "Bayfront Stn Exit B (03511)", "Gardens by the Bay (03369)"],
  },
};

export const INTERCHANGE_CODES: Record<string, string> = {
  "10009": "Bukit Merah Int",
  "45009": "Bukit Panjang Int",
  "84009": "Bedok Int",
  "22009": "Boon Lay Int",
  "29009": "Clementi Int",
  "28009": "Jurong East Int",
  "64009": "Hougang Central Int",
  "75009": "Tampines Int",
  "14009": "HarbourFront Int",
  "44009": "Choa Chu Kang Int",
  "11379": "Kent Ridge Ter",
  "10499": "Kampong Bahru Ter",
  "77009": "Pasir Ris Int",
};

export const OPERATOR_NAMES: Record<string, string> = {
  SBST: "SBS Transit",
  SMRT: "SMRT Buses",
  TTS: "Tower Transit",
  GAS: "Go-Ahead SG",
};

export function mapLtaLoad(load: string): { label: string; loadClass: string; dotClass: string } {
  switch (load) {
    case "SEA":
      return {
        label: "Seats Avail",
        loadClass: "bg-[#ECFDF5] text-crowd-green",
        dotClass: "bg-crowd-green",
      };
    case "SDA":
      return {
        label: "Standing Avail",
        loadClass: "bg-[#FFFBEB] text-crowd-amber",
        dotClass: "bg-crowd-amber",
      };
    case "LSD":
      return {
        label: "Limited Stdg",
        loadClass: "bg-[#FEF2F2] text-crowd-red",
        dotClass: "bg-crowd-red",
      };
    default:
      return {
        label: "No Telemetry",
        loadClass: "bg-surface-container text-text-muted",
        dotClass: "bg-text-muted",
      };
  }
}

export function formatEstimatedArrival(isoString: string): { timing: string; sub: string } {
  if (!isoString || !isoString.trim()) {
    return { timing: "—", sub: "No Est" };
  }
  const target = new Date(isoString).getTime();
  if (Number.isNaN(target)) {
    return { timing: "—", sub: "No Est" };
  }
  const diffMs = target - Date.now();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins <= 0) {
    return { timing: "Arr", sub: "< 1 min" };
  }
  return {
    timing: String(diffMins),
    sub: diffMins === 1 ? "min" : "mins",
  };
}

export function transformLtaSlot(slot?: LtaBusSlot): BusArrival {
  if (!slot || !slot.EstimatedArrival) {
    return {
      timing: "—",
      sub: "No Est",
      load: "Not Operating",
      loadClass: "bg-surface-container text-text-muted",
      dotClass: "bg-text-muted",
      deck: slot?.Type || "SD",
      wab: false,
      monitored: 0,
    };
  }
  const { timing, sub } = formatEstimatedArrival(slot.EstimatedArrival);
  const { label, loadClass, dotClass } = mapLtaLoad(slot.Load);

  return {
    timing,
    sub,
    load: label,
    loadClass,
    dotClass,
    deck: slot.Type || "SD",
    wab: slot.Feature === "WAB",
    monitored: slot.Monitored,
    lat: slot.Latitude,
    lng: slot.Longitude,
    rawEstimatedArrival: slot.EstimatedArrival,
  };
}

export function transformLtaServiceToUi(
  item: LtaServiceItem,
  busStopCode: string
): BusServiceData {
  const stopMeta = STOP_DIRECTORY[busStopCode] || {
    name: `Bus Stop ${busStopCode}`,
    road: "Singapore Transit Corridor",
    desc: `LTA Bus Stop Code ${busStopCode}`,
    oppCode: "03059",
    nodes: [
      `Prior Stop`,
      `Stop ${busStopCode} (${busStopCode})`,
      `Next Stop`,
      `Terminus`,
    ],
  };

  const originCode = item.NextBus?.OriginCode || "";
  const destCode = item.NextBus?.DestinationCode || "";
  const originName = INTERCHANGE_CODES[originCode] || (originCode ? `Stop ${originCode}` : "Origin Int");
  const destName = INTERCHANGE_CODES[destCode] || (destCode ? `Stop ${destCode}` : "Destination Int");

  const operatorLabel = OPERATOR_NAMES[item.Operator] || item.Operator || "SBS Transit";

  return {
    serviceNo: item.ServiceNo,
    operator: operatorLabel,
    dest: `${originName} ⇄ ${destName}`,
    destShort: `${destName} (from ${originName})`,
    freq: `${operatorLabel} • Origin ${originCode || "—"} → Dest ${destCode || "—"}`,
    nearestStopCode: busStopCode,
    nearestStopName: stopMeta.name,
    road: stopMeta.road,
    buses: [
      transformLtaSlot(item.NextBus),
      transformLtaSlot(item.NextBus2),
      transformLtaSlot(item.NextBus3),
    ],
    nodes: stopMeta.nodes,
  };
}

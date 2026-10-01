export type BusArrival = {
  timing: string;
  sub: string;
  load: string;
  loadClass: string;
  dotClass: string;
  deck: string;
  wab: boolean;
};

export type BusServiceData = {
  dest: string;
  destShort: string;
  freq: string;
  nearestStopCode: string;
  nearestStopName: string;
  road: string;
  buses: BusArrival[];
  nodes: string[];
};

export const busData: Record<string, BusServiceData> = {
  "147": {
    dest: "Jurong East Int ⇄ Hougang Central Int",
    destShort: "Hougang Central Int via Chinatown / Dhoby Ghaut",
    freq: "Headway: 6 - 9 mins",
    nearestStopCode: "03059",
    nearestStopName: "One Raffles Quay",
    road: "Raffles Quay",
    buses: [
      { timing: "Arr", sub: "< 1 min", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "DD", wab: true },
      { timing: "7", sub: "mins", load: "Standing Avail", loadClass: "bg-[#FFFBEB] text-crowd-amber", dotClass: "bg-crowd-amber", deck: "DD", wab: true },
      { timing: "16", sub: "mins", load: "Limited Stdg", loadClass: "bg-[#FEF2F2] text-crowd-red", dotClass: "bg-crowd-red", deck: "SD", wab: true }
    ],
    nodes: ["Opp So/Sofitel (03031)", "One Raffles Quay (03059)", "The Sail (03381)", "Marina Bay Sands (03501)"]
  },
  "10": {
    dest: "Kent Ridge Ter ⇄ Tampines Int",
    destShort: "Tampines Int via Guillemard Rd",
    freq: "Headway: 5 - 8 mins",
    nearestStopCode: "03059",
    nearestStopName: "One Raffles Quay",
    road: "Raffles Quay",
    buses: [
      { timing: "2", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "DD", wab: true },
      { timing: "9", sub: "mins", load: "Standing Avail", loadClass: "bg-[#FFFBEB] text-crowd-amber", dotClass: "bg-crowd-amber", deck: "DD", wab: true },
      { timing: "18", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "SD", wab: true }
    ],
    nodes: ["Raffles Pl Stn Exit F (03031)", "One Raffles Quay (03059)", "The Sail (03381)", "Marina Bay Stn (03539)"]
  },
  "65": {
    dest: "HarbourFront Int ⇄ Tampines Int",
    destShort: "Tampines Int via Orchard Rd / Little India",
    freq: "Headway: 7 - 10 mins",
    nearestStopCode: "03059",
    nearestStopName: "One Raffles Quay",
    road: "Raffles Quay",
    buses: [
      { timing: "5", sub: "mins", load: "Standing Avail", loadClass: "bg-[#FFFBEB] text-crowd-amber", dotClass: "bg-crowd-amber", deck: "DD", wab: true },
      { timing: "13", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "DD", wab: true },
      { timing: "21", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "SD", wab: false }
    ],
    nodes: ["UIC Bldg (03129)", "One Raffles Quay (03059)", "Fullerton Sq (03011)", "Clarke Quay Stn (04222)"]
  },
  "190": {
    dest: "Kampong Bahru Ter ⇄ Choa Chu Kang Int",
    destShort: "Choa Chu Kang Int via Stevens / Bukit Panjang",
    freq: "Headway: 4 - 7 mins",
    nearestStopCode: "03059",
    nearestStopName: "One Raffles Quay",
    road: "Raffles Quay",
    buses: [
      { timing: "4", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "DD", wab: true },
      { timing: "11", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "DD", wab: true },
      { timing: "19", sub: "mins", load: "Standing Avail", loadClass: "bg-[#FFFBEB] text-crowd-amber", dotClass: "bg-crowd-amber", deck: "DD", wab: true }
    ],
    nodes: ["Hub Synergy Pt (03222)", "One Raffles Quay (03059)", "Old Hill St Police (04223)", "Dhoby Ghaut Stn (08057)"]
  },
  "14": {
    dest: "Bedok Int ⇄ Clementi Int",
    destShort: "Clementi Int via Dover Rd",
    freq: "Headway: 6 - 9 mins",
    nearestStopCode: "03059",
    nearestStopName: "One Raffles Quay",
    road: "Raffles Quay",
    buses: [
      { timing: "3", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "SD", wab: true },
      { timing: "12", sub: "mins", load: "Standing Avail", loadClass: "bg-[#FFFBEB] text-crowd-amber", dotClass: "bg-crowd-amber", deck: "DD", wab: true },
      { timing: "20", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "SD", wab: true }
    ],
    nodes: ["Suntec City (80159)", "One Raffles Quay (03059)", "Capitol Bldg (04111)", "Orchard Plaza (08137)"]
  },
  "100": {
    dest: "Serangoon Int ⇄ Ghim Moh Ter",
    destShort: "Ghim Moh Ter via Queensway",
    freq: "Headway: 8 - 12 mins",
    nearestStopCode: "03059",
    nearestStopName: "One Raffles Quay",
    road: "Raffles Quay",
    buses: [
      { timing: "Arr", sub: "< 1 min", load: "Standing Avail", loadClass: "bg-[#FFFBEB] text-crowd-amber", dotClass: "bg-crowd-amber", deck: "SD", wab: true },
      { timing: "8", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "DD", wab: true },
      { timing: "17", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "SD", wab: true }
    ],
    nodes: ["Crawford Bridge (01339)", "One Raffles Quay (03059)", "Maxwell Stn (05269)", "Alexandra Hosp (11511)"]
  },
  "166": {
    dest: "Ang Mo Kio Int ⇄ Clementi Int",
    destShort: "Clementi Int via Alexandra Rd",
    freq: "Headway: 7 - 11 mins",
    nearestStopCode: "03059",
    nearestStopName: "One Raffles Quay",
    road: "Raffles Quay",
    buses: [
      { timing: "6", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "DD", wab: true },
      { timing: "14", sub: "mins", load: "Limited Stdg", loadClass: "bg-[#FEF2F2] text-crowd-red", dotClass: "bg-crowd-red", deck: "SD", wab: true },
      { timing: "23", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "DD", wab: true }
    ],
    nodes: ["Fu Lu Shou Cplx (07551)", "One Raffles Quay (03059)", "Outram Pk Stn (05069)", "Harbourfront (14141)"]
  },
  "174": {
    dest: "Boon Lay Int ⇄ New Bridge Rd Ter",
    destShort: "New Bridge Rd Ter via Orchard",
    freq: "Headway: 8 - 12 mins",
    nearestStopCode: "03059",
    nearestStopName: "One Raffles Quay",
    road: "Raffles Quay",
    buses: [
      { timing: "Arr", sub: "< 1 min", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "DD", wab: true },
      { timing: "10", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "SD", wab: true },
      { timing: "22", sub: "mins", load: "Standing Avail", loadClass: "bg-[#FFFBEB] text-crowd-amber", dotClass: "bg-crowd-amber", deck: "DD", wab: true }
    ],
    nodes: ["Beauty World Stn (42091)", "One Raffles Quay (03059)", "Clarke Quay (04211)", "Chinatown (05049)"]
  },
  "502": {
    dest: "Soon Lee Depot ⇄ Bayfront Ave (Loop)",
    destShort: "Marina Bay / Suntec Loop",
    freq: "Headway: 10 - 15 mins",
    nearestStopCode: "03059",
    nearestStopName: "One Raffles Quay",
    road: "Raffles Quay",
    buses: [
      { timing: "8", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "SD", wab: true },
      { timing: "19", sub: "mins", load: "Standing Avail", loadClass: "bg-[#FFFBEB] text-crowd-amber", dotClass: "bg-crowd-amber", deck: "DD", wab: true },
      { timing: "29", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "SD", wab: true }
    ],
    nodes: ["Jurong East Int (28009)", "One Raffles Quay (03059)", "Suntec City (02151)", "Marina Bay Sands (03501)"]
  }
};

export function getBusData(serviceNum: string, currentStopState: string = "03059"): BusServiceData {
  const cleanNum = serviceNum.trim();
  if (busData[cleanNum]) {
    const data = {...busData[cleanNum]};
    if (currentStopState !== "03059") {
       data.nearestStopCode = currentStopState;
       data.nearestStopName = "80 Robinson Rd";
       data.road = "Robinson Rd";
       data.nodes = ["Prev Transit Hub (03011)", "80 Robinson Rd (03071)", "Upcoming Stn (03129)", "Terminus (03222)"];
    }
    return data;
  }
  return {
    dest: "Trunk Service " + cleanNum + " (Singapore Network)",
    destShort: "Islandwide Trunk Route",
    freq: "Headway: 8 - 12 mins",
    nearestStopCode: currentStopState,
    nearestStopName: currentStopState === "03059" ? "One Raffles Quay" : "80 Robinson Rd",
    road: currentStopState === "03059" ? "Raffles Quay" : "Robinson Rd",
    buses: [
      { timing: "3", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "DD", wab: true },
      { timing: "12", sub: "mins", load: "Standing Avail", loadClass: "bg-[#FFFBEB] text-crowd-amber", dotClass: "bg-crowd-amber", deck: "DD", wab: true },
      { timing: "22", sub: "mins", load: "Seats Avail", loadClass: "bg-[#ECFDF5] text-crowd-green", dotClass: "bg-crowd-green", deck: "SD", wab: true }
    ],
    nodes: ["Prev Transit Hub (03031)", currentStopState === "03059" ? "One Raffles Quay (03059)" : "80 Robinson Rd (03071)", "Upcoming Stn (03381)", "Terminus (03501)"]
  };
}

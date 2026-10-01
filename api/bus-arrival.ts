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

function addMinutesIso(mins: number): string {
  const d = new Date(Date.now() + mins * 60 * 1000);
  // Format with +08:00 offset
  const sgt = new Date(d.getTime() + 8 * 60 * 60 * 1000);
  return sgt.toISOString().replace("Z", "+08:00");
}

function buildFallbackResponse(busStopCode: string, serviceNo?: string): LtaBusArrivalResponse {
  const defaultServicesByStop: Record<string, LtaServiceItem[]> = {
    "20251": [
      {
        ServiceNo: "176",
        Operator: "SMRT",
        NextBus: {
          OriginCode: "10009",
          DestinationCode: "45009",
          EstimatedArrival: addMinutesIso(1),
          Monitored: 1,
          Latitude: "1.3100396666666667",
          Longitude: "103.75647683333334",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "DD",
        },
        NextBus2: {
          OriginCode: "10009",
          DestinationCode: "45009",
          EstimatedArrival: addMinutesIso(16),
          Monitored: 1,
          Latitude: "1.27424",
          Longitude: "103.79662333333333",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "DD",
        },
        NextBus3: {
          OriginCode: "10009",
          DestinationCode: "45009",
          EstimatedArrival: addMinutesIso(23),
          Monitored: 1,
          Latitude: "1.278829",
          Longitude: "103.81719033333333",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "SD",
        },
      },
      {
        ServiceNo: "30",
        Operator: "SBST",
        NextBus: {
          OriginCode: "84009",
          DestinationCode: "22009",
          EstimatedArrival: addMinutesIso(0.5),
          Monitored: 1,
          Latitude: "1.3144378333333333",
          Longitude: "1.0375299533333333",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "DD",
        },
        NextBus2: {
          OriginCode: "84009",
          DestinationCode: "22009",
          EstimatedArrival: addMinutesIso(4),
          Monitored: 1,
          Latitude: "1.3090805",
          Longitude: "103.76039283333333",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "SD",
        },
        NextBus3: {
          OriginCode: "84009",
          DestinationCode: "22009",
          EstimatedArrival: addMinutesIso(23),
          Monitored: 1,
          Latitude: "1.2757191666666667",
          Longitude: "103.793202",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "DD",
        },
      },
      {
        ServiceNo: "78",
        Operator: "TTS",
        NextBus: {
          OriginCode: "29009",
          DestinationCode: "29009",
          EstimatedArrival: addMinutesIso(3),
          Monitored: 1,
          Latitude: "1.3087378333333333",
          Longitude: "103.73379016666667",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "DD",
        },
        NextBus2: {
          OriginCode: "29009",
          DestinationCode: "29009",
          EstimatedArrival: addMinutesIso(26),
          Monitored: 1,
          Latitude: "1.312363",
          Longitude: "103.76434116666667",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "DD",
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
    ],
    "83139": [
      {
        ServiceNo: "15",
        Operator: "GAS",
        NextBus: {
          OriginCode: "77009",
          DestinationCode: "77009",
          EstimatedArrival: addMinutesIso(2),
          Monitored: 1,
          Latitude: "1.3149",
          Longitude: "103.8992",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "SD",
        },
        NextBus2: {
          OriginCode: "77009",
          DestinationCode: "77009",
          EstimatedArrival: addMinutesIso(11),
          Monitored: 1,
          Latitude: "1.3210",
          Longitude: "103.9031",
          VisitNumber: "1",
          Load: "SDA",
          Feature: "WAB",
          Type: "DD",
        },
        NextBus3: {
          OriginCode: "77009",
          DestinationCode: "77009",
          EstimatedArrival: addMinutesIso(21),
          Monitored: 1,
          Latitude: "1.3340",
          Longitude: "103.9120",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "SD",
        },
      },
      {
        ServiceNo: "16",
        Operator: "SBST",
        NextBus: {
          OriginCode: "84009",
          DestinationCode: "10009",
          EstimatedArrival: addMinutesIso(0.5),
          Monitored: 1,
          Latitude: "1.3095",
          Longitude: "103.9021",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "DD",
        },
        NextBus2: {
          OriginCode: "84009",
          DestinationCode: "10009",
          EstimatedArrival: addMinutesIso(9),
          Monitored: 1,
          Latitude: "1.3125",
          Longitude: "103.9150",
          VisitNumber: "1",
          Load: "SDA",
          Feature: "WAB",
          Type: "DD",
        },
        NextBus3: {
          OriginCode: "84009",
          DestinationCode: "10009",
          EstimatedArrival: addMinutesIso(18),
          Monitored: 1,
          Latitude: "1.3201",
          Longitude: "103.9280",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "SD",
        },
      },
      {
        ServiceNo: "33",
        Operator: "SBST",
        NextBus: {
          OriginCode: "84009",
          DestinationCode: "11379",
          EstimatedArrival: addMinutesIso(5),
          Monitored: 1,
          Latitude: "1.3120",
          Longitude: "103.9050",
          VisitNumber: "1",
          Load: "SDA",
          Feature: "WAB",
          Type: "DD",
        },
        NextBus2: {
          OriginCode: "84009",
          DestinationCode: "11379",
          EstimatedArrival: addMinutesIso(14),
          Monitored: 1,
          Latitude: "1.3180",
          Longitude: "103.9190",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "SD",
        },
        NextBus3: {
          OriginCode: "84009",
          DestinationCode: "11379",
          EstimatedArrival: addMinutesIso(25),
          Monitored: 1,
          Latitude: "1.3240",
          Longitude: "103.9300",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "DD",
        },
      },
    ],
  };

  const defaultRafflesQuay: LtaServiceItem[] = [
    {
      ServiceNo: "147",
      Operator: "SBST",
      NextBus: {
        OriginCode: "28009",
        DestinationCode: "64009",
        EstimatedArrival: addMinutesIso(0.5),
        Monitored: 1,
        Latitude: "1.2812",
        Longitude: "103.8518",
        VisitNumber: "1",
        Load: "SEA",
        Feature: "WAB",
        Type: "DD",
      },
      NextBus2: {
        OriginCode: "28009",
        DestinationCode: "64009",
        EstimatedArrival: addMinutesIso(7),
        Monitored: 1,
        Latitude: "1.2845",
        Longitude: "103.8432",
        VisitNumber: "1",
        Load: "SDA",
        Feature: "WAB",
        Type: "DD",
      },
      NextBus3: {
        OriginCode: "28009",
        DestinationCode: "64009",
        EstimatedArrival: addMinutesIso(16),
        Monitored: 1,
        Latitude: "1.2891",
        Longitude: "103.8365",
        VisitNumber: "1",
        Load: "LSD",
        Feature: "WAB",
        Type: "SD",
      },
    },
    {
      ServiceNo: "10",
      Operator: "SBST",
      NextBus: {
        OriginCode: "11379",
        DestinationCode: "75009",
        EstimatedArrival: addMinutesIso(2),
        Monitored: 1,
        Latitude: "1.2795",
        Longitude: "103.8490",
        VisitNumber: "1",
        Load: "SEA",
        Feature: "WAB",
        Type: "DD",
      },
      NextBus2: {
        OriginCode: "11379",
        DestinationCode: "75009",
        EstimatedArrival: addMinutesIso(9),
        Monitored: 1,
        Latitude: "1.2740",
        Longitude: "103.8410",
        VisitNumber: "1",
        Load: "SDA",
        Feature: "WAB",
        Type: "DD",
      },
      NextBus3: {
        OriginCode: "11379",
        DestinationCode: "75009",
        EstimatedArrival: addMinutesIso(18),
        Monitored: 1,
        Latitude: "1.2690",
        Longitude: "103.8310",
        VisitNumber: "1",
        Load: "SEA",
        Feature: "WAB",
        Type: "SD",
      },
    },
    {
      ServiceNo: "65",
      Operator: "SBST",
      NextBus: {
        OriginCode: "14009",
        DestinationCode: "75009",
        EstimatedArrival: addMinutesIso(5),
        Monitored: 1,
        Latitude: "1.2770",
        Longitude: "103.8460",
        VisitNumber: "1",
        Load: "SDA",
        Feature: "WAB",
        Type: "DD",
      },
      NextBus2: {
        OriginCode: "14009",
        DestinationCode: "75009",
        EstimatedArrival: addMinutesIso(13),
        Monitored: 1,
        Latitude: "1.2710",
        Longitude: "103.8380",
        VisitNumber: "1",
        Load: "SEA",
        Feature: "WAB",
        Type: "DD",
      },
      NextBus3: {
        OriginCode: "14009",
        DestinationCode: "75009",
        EstimatedArrival: addMinutesIso(21),
        Monitored: 1,
        Latitude: "1.2660",
        Longitude: "103.8290",
        VisitNumber: "1",
        Load: "SEA",
        Feature: "",
        Type: "SD",
      },
    },
    {
      ServiceNo: "190",
      Operator: "SMRT",
      NextBus: {
        OriginCode: "10499",
        DestinationCode: "44009",
        EstimatedArrival: addMinutesIso(4),
        Monitored: 1,
        Latitude: "1.2801",
        Longitude: "103.8502",
        VisitNumber: "1",
        Load: "SEA",
        Feature: "WAB",
        Type: "DD",
      },
      NextBus2: {
        OriginCode: "10499",
        DestinationCode: "44009",
        EstimatedArrival: addMinutesIso(11),
        Monitored: 1,
        Latitude: "1.2760",
        Longitude: "103.8440",
        VisitNumber: "1",
        Load: "SEA",
        Feature: "WAB",
        Type: "DD",
      },
      NextBus3: {
        OriginCode: "10499",
        DestinationCode: "44009",
        EstimatedArrival: addMinutesIso(19),
        Monitored: 1,
        Latitude: "1.2720",
        Longitude: "103.8390",
        VisitNumber: "1",
        Load: "SDA",
        Feature: "WAB",
        Type: "DD",
      },
    },
  ];

  let services = [...(defaultServicesByStop[busStopCode] || defaultRafflesQuay)];

  if (serviceNo && serviceNo.trim()) {
    const cleanSvc = serviceNo.trim();
    const existing = services.find((s) => s.ServiceNo.toLowerCase() === cleanSvc.toLowerCase());
    if (existing) {
      services = [existing, ...services.filter((s) => s.ServiceNo !== existing.ServiceNo)];
    } else {
      services.unshift({
        ServiceNo: cleanSvc,
        Operator: "SBST",
        NextBus: {
          OriginCode: "28009",
          DestinationCode: "64009",
          EstimatedArrival: addMinutesIso(3),
          Monitored: 1,
          Latitude: "1.2815",
          Longitude: "103.8512",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "DD",
        },
        NextBus2: {
          OriginCode: "28009",
          DestinationCode: "64009",
          EstimatedArrival: addMinutesIso(11),
          Monitored: 1,
          Latitude: "1.2850",
          Longitude: "103.8440",
          VisitNumber: "1",
          Load: "SDA",
          Feature: "WAB",
          Type: "DD",
        },
        NextBus3: {
          OriginCode: "28009",
          DestinationCode: "64009",
          EstimatedArrival: addMinutesIso(20),
          Monitored: 1,
          Latitude: "1.2901",
          Longitude: "103.8370",
          VisitNumber: "1",
          Load: "SEA",
          Feature: "WAB",
          Type: "SD",
        },
      });
    }
  }

  return {
    "odata.metadata": "https://datamall2.mytransport.sg/ltaodataservice/v3/$metadata#BusArrival",
    BusStopCode: busStopCode,
    Services: services,
    _live: false,
  };
}

export default async function handler(req: any, res: any) {
  if (req.method && req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const busStopCode = String(req.query?.BusStopCode || req.query?.busStopCode || "83139").trim();
  const serviceNo = req.query?.ServiceNo || req.query?.serviceNo
    ? String(req.query?.ServiceNo || req.query?.serviceNo).trim()
    : undefined;

  if (!busStopCode) {
    return res.status(400).json({ error: "Missing required query parameter: BusStopCode" });
  }

  const accountKey = process.env.LTA_ACCOUNT_KEY;

  if (!accountKey || accountKey === "MY_LTA_ACCOUNT_KEY") {
    return res.status(200).json(buildFallbackResponse(busStopCode, serviceNo));
  }

  try {
    const url = new URL("https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival");
    url.searchParams.set("BusStopCode", busStopCode);
    if (serviceNo) {
      url.searchParams.set("ServiceNo", serviceNo);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        AccountKey: accountKey,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: `LTA DataMall API responded with status ${response.status}`,
        details: errorText,
      });
    }

    const data = await response.json();
    return res.status(200).json({
      ...data,
      _live: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to fetch BusArrival from LTA DataMall API",
      message: error?.message || "Unknown error",
    });
  }
}

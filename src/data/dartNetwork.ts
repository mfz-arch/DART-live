import { StationData, DARTLine, SystemAlert } from "@/types/dart";

export const DART_STATIONS: StationData[] = [
  {
    station_id: "ST-KIMARA",
    name: "Kimara Terminal",
    zone: "Phase 1 Main Terminal",
    coordinates: { lat: -6.7865, lng: 39.1762 },
    is_interchange: true,
    facilities: ["Ticketing Hub", "Feeder Bus Bay", "ATM", "Restrooms", "Security Center"],
    incoming_buses: [
      { bus_id: "DART-842", line: "EXP-101", destination: "Kivukoni Ferry", eta_minutes: 2, occupancy: "MEDIUM" },
      { bus_id: "DART-910", line: "LOC-102", destination: "Gerezani Terminal", eta_minutes: 6, occupancy: "LOW" },
      { bus_id: "DART-303", line: "EXP-101", destination: "Kivukoni Ferry", eta_minutes: 12, occupancy: "HIGH" },
    ],
  },
  {
    station_id: "ST-SHEKILANGO",
    name: "Shekilango Station",
    zone: "Morogoro Road Corridor",
    coordinates: { lat: -6.7910, lng: 39.2230 },
    facilities: ["Turnstiles", "Pass Reload Kiosk", "Covered Platform"],
    incoming_buses: [
      { bus_id: "DART-842", line: "EXP-101", destination: "Kivukoni Ferry", eta_minutes: 5, occupancy: "MEDIUM" },
      { bus_id: "DART-910", line: "LOC-102", destination: "Gerezani Terminal", eta_minutes: 9, occupancy: "LOW" },
    ],
  },
  {
    station_id: "ST-UBUNGO",
    name: "Ubungo Interchange Terminal",
    zone: "Phase 1 Major Transit Hub",
    coordinates: { lat: -6.7924, lng: 39.2083 },
    is_interchange: true,
    facilities: ["Overpass Bridge", "Express Platform", "Smart Card Kiosks", "Customer Care"],
    incoming_buses: [
      { bus_id: "DART-104", line: "EXP-101", destination: "Kivukoni Ferry", eta_minutes: 3, occupancy: "HIGH" },
      { bus_id: "DART-505", line: "LOC-102", destination: "Kimara Terminal", eta_minutes: 4, occupancy: "MEDIUM" },
      { bus_id: "DART-712", line: "LOC-102", destination: "Gerezani Terminal", eta_minutes: 8, occupancy: "HIGH" },
    ],
  },
  {
    station_id: "ST-MAGOMENI",
    name: "Magomeni Kanisani",
    zone: "Morogoro Road Corridor",
    coordinates: { lat: -6.8081, lng: 39.2550 },
    is_interchange: true,
    facilities: ["Dual Side Platforms", "Tactile Paving", "Ticket Counters"],
    incoming_buses: [
      { bus_id: "DART-104", line: "EXP-101", destination: "Kivukoni Ferry", eta_minutes: 7, occupancy: "HIGH" },
      { bus_id: "DART-221", line: "EXP-103", destination: "Morocco Terminal", eta_minutes: 11, occupancy: "LOW" },
    ],
  },
  {
    station_id: "ST-USALAMA",
    name: "Usalama Hub",
    zone: "Central Business District Approach",
    coordinates: { lat: -6.8105, lng: 39.2635 },
    facilities: ["Digital Signage", "Security Guard", "Shaded Waiting Area"],
    incoming_buses: [
      { bus_id: "DART-842", line: "EXP-101", destination: "Kivukoni Ferry", eta_minutes: 14, occupancy: "MEDIUM" },
    ],
  },
  {
    station_id: "ST-FIRE",
    name: "Fire Station Junction",
    zone: "CBD Central Split",
    coordinates: { lat: -6.8145, lng: 39.2740 },
    is_interchange: true,
    facilities: ["Dual Split Platforms", "Smart Validation Turnstiles"],
    incoming_buses: [
      { bus_id: "DART-842", line: "EXP-101", destination: "Kivukoni Ferry", eta_minutes: 16, occupancy: "MEDIUM" },
      { bus_id: "DART-910", line: "LOC-102", destination: "Gerezani Terminal", eta_minutes: 18, occupancy: "LOW" },
    ],
  },
  {
    station_id: "ST-MOROCCO",
    name: "Morocco Bus Terminal",
    zone: "Phase 1 North Terminal",
    coordinates: { lat: -6.7760, lng: 39.2570 },
    is_interchange: true,
    facilities: ["Feeder Bus Depot", "Ticket Offices", "Taxi Rank", "Shops"],
    incoming_buses: [
      { bus_id: "DART-221", line: "EXP-103", destination: "Kivukoni Ferry", eta_minutes: 2, occupancy: "LOW" },
      { bus_id: "DART-330", line: "EXP-103", destination: "Morocco Terminal", eta_minutes: 15, occupancy: "MEDIUM" },
    ],
  },
  {
    station_id: "ST-POSTA",
    name: "Posta Ya Zamani (City Center)",
    zone: "Financial District",
    coordinates: { lat: -6.8175, lng: 39.2882 },
    facilities: ["High-Capacity Platform", "CCTV Surveillance", "Accessibility Ramps"],
    incoming_buses: [
      { bus_id: "DART-104", line: "EXP-101", destination: "Kivukoni Ferry", eta_minutes: 1, occupancy: "HIGH" },
      { bus_id: "DART-221", line: "EXP-103", destination: "Kivukoni Ferry", eta_minutes: 5, occupancy: "LOW" },
    ],
  },
  {
    station_id: "ST-KIVUKONI",
    name: "Kivukoni Ferry Terminal",
    zone: "Ocean Waterfront Terminal",
    coordinates: { lat: -6.8190, lng: 39.2965 },
    is_interchange: true,
    facilities: ["Zanzibar Ferry Transfer", "Main Turnstile Gate", "Passenger Concourse"],
    incoming_buses: [
      { bus_id: "DART-104", line: "EXP-101", destination: "Kivukoni Ferry", eta_minutes: 0, occupancy: "HIGH" },
      { bus_id: "DART-842", line: "EXP-101", destination: "Kivukoni Ferry", eta_minutes: 22, occupancy: "MEDIUM" },
    ],
  },
  {
    station_id: "ST-GEREZANI",
    name: "Gerezani Terminal",
    zone: "Kariakoo Market Gateway",
    coordinates: { lat: -6.8220, lng: 39.2820 },
    is_interchange: true,
    facilities: ["Kariakoo Market Direct Entrance", "Turnstile Complex", "Bus Staging"],
    incoming_buses: [
      { bus_id: "DART-910", line: "LOC-102", destination: "Gerezani Terminal", eta_minutes: 2, occupancy: "LOW" },
      { bus_id: "DART-712", line: "LOC-102", destination: "Gerezani Terminal", eta_minutes: 10, occupancy: "HIGH" },
    ],
  },
];

export const DART_LINES: DARTLine[] = [
  {
    code: "EXP-101",
    name: "Kimara - Kivukoni Express",
    type: "EXPRESS",
    color: "#006B38",
    origin: "Kimara Terminal",
    destination: "Kivukoni Ferry",
    operating_hours: "05:00 - 23:00",
    fare_tsh: 750,
    stations: ["ST-KIMARA", "ST-UBUNGO", "ST-MAGOMENI", "ST-FIRE", "ST-POSTA", "ST-KIVUKONI"],
    waypoints: [
      { lat: -6.7865, lng: 39.1762 }, // Kimara Terminal
      { lat: -6.7872, lng: 39.1820 }, // Kimara Stop
      { lat: -6.7885, lng: 39.1905 }, // Korogwe
      { lat: -6.7895, lng: 39.1970 }, // Mavurunza
      { lat: -6.7905, lng: 39.2025 }, // Buchosa
      { lat: -6.7924, lng: 39.2083 }, // Ubungo Interchange
      { lat: -6.7918, lng: 39.2155 }, // Ubungo Maji
      { lat: -6.7915, lng: 39.2230 }, // Shekilango
      { lat: -6.7930, lng: 39.2310 }, // Urafiki
      { lat: -6.7950, lng: 39.2355 }, // Manzese Argentina
      { lat: -6.7975, lng: 39.2405 }, // Manzese
      { lat: -6.8010, lng: 39.2460 }, // Manzese Tip Top
      { lat: -6.8048, lng: 39.2515 }, // Magomeni Mapipa
      { lat: -6.8081, lng: 39.2550 }, // Magomeni Kanisani
      { lat: -6.8115, lng: 39.2640 }, // Jangwani
      { lat: -6.8145, lng: 39.2740 }, // Fire Station
      { lat: -6.8155, lng: 39.2800 }, // DIT Junction
      { lat: -6.8162, lng: 39.2840 }, // Kisutu
      { lat: -6.8175, lng: 39.2882 }, // Posta Ya Zamani
      { lat: -6.8185, lng: 39.2925 }, // Sokoine Drive
      { lat: -6.8190, lng: 39.2965 }, // Kivukoni Ferry Terminal
    ],
  },
  {
    code: "LOC-102",
    name: "Kimara - Gerezani Local",
    type: "LOCAL",
    color: "#2563EB",
    origin: "Kimara Terminal",
    destination: "Gerezani Terminal",
    operating_hours: "05:00 - 23:30",
    fare_tsh: 750,
    stations: ["ST-KIMARA", "ST-SHEKILANGO", "ST-UBUNGO", "ST-MAGOMENI", "ST-USALAMA", "ST-FIRE", "ST-GEREZANI"],
    waypoints: [
      { lat: -6.7865, lng: 39.1762 }, // Kimara Terminal
      { lat: -6.7872, lng: 39.1820 },
      { lat: -6.7885, lng: 39.1905 },
      { lat: -6.7895, lng: 39.1970 },
      { lat: -6.7905, lng: 39.2025 },
      { lat: -6.7924, lng: 39.2083 }, // Ubungo Interchange
      { lat: -6.7918, lng: 39.2155 },
      { lat: -6.7915, lng: 39.2230 }, // Shekilango
      { lat: -6.7930, lng: 39.2310 }, // Urafiki
      { lat: -6.7950, lng: 39.2355 },
      { lat: -6.7975, lng: 39.2405 },
      { lat: -6.8010, lng: 39.2460 },
      { lat: -6.8048, lng: 39.2515 },
      { lat: -6.8081, lng: 39.2550 }, // Magomeni Kanisani
      { lat: -6.8105, lng: 39.2635 }, // Usalama Hub
      { lat: -6.8145, lng: 39.2740 }, // Fire Station
      { lat: -6.8180, lng: 39.2780 }, // Msimbazi Junction
      { lat: -6.8220, lng: 39.2820 }, // Gerezani Terminal
    ],
  },
  {
    code: "EXP-103",
    name: "Morocco - Kivukoni Express",
    type: "EXPRESS",
    color: "#D97706",
    origin: "Morocco Terminal",
    destination: "Kivukoni Ferry",
    operating_hours: "05:30 - 22:30",
    fare_tsh: 750,
    stations: ["ST-MOROCCO", "ST-MAGOMENI", "ST-POSTA", "ST-KIVUKONI"],
    waypoints: [
      { lat: -6.7760, lng: 39.2570 }, // Morocco Terminal
      { lat: -6.7845, lng: 39.2578 }, // Victoria
      { lat: -6.7900, lng: 39.2575 }, // Mwanamboka
      { lat: -6.7950, lng: 39.2570 }, // Kinondoni Studio
      { lat: -6.8020, lng: 39.2560 }, // Magomeni Mikoroshoni
      { lat: -6.8081, lng: 39.2550 }, // Magomeni Kanisani
      { lat: -6.8115, lng: 39.2640 }, // Jangwani
      { lat: -6.8145, lng: 39.2740 }, // Fire Station
      { lat: -6.8155, lng: 39.2800 }, // DIT Junction
      { lat: -6.8162, lng: 39.2840 }, // Kisutu
      { lat: -6.8175, lng: 39.2882 }, // Posta Ya Zamani
      { lat: -6.8185, lng: 39.2925 }, // Sokoine Drive
      { lat: -6.8190, lng: 39.2965 }, // Kivukoni Ferry Terminal
    ],
  },
];

export const INITIAL_SYSTEM_ALERTS: SystemAlert[] = [
  {
    id: "ALT-001",
    title: "Peak Hour Frequency Increased",
    description: "Line EXP-101 (Kimara -> Kivukoni Express) dispatch interval reduced from 6 mins to 3 mins to clear peak morning crowd.",
    severity: "INFO",
    line_affected: "EXP-101",
    timestamp: "10 mins ago",
    is_active: true,
  },
  {
    id: "ALT-002",
    title: "Minor Congestion at Ubungo Flyover",
    description: "Dedicated BRT lane experience slight delay near Ubungo Flyover signal intersection. Expect +3 minutes travel time.",
    severity: "WARNING",
    line_affected: "All Morogoro Lines",
    timestamp: "25 mins ago",
    is_active: true,
  },
  {
    id: "ALT-003",
    title: "Gerezani Platform Expansion Maintenance",
    description: "Platform B at Gerezani Terminal under routine gate maintenance. Boarding shifted to Platform A.",
    severity: "INFO",
    line_affected: "LOC-102",
    timestamp: "1 hour ago",
    is_active: true,
  },
];

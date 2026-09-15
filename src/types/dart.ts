export type OccupancyLevel = "LOW" | "MEDIUM" | "HIGH";

export interface BusCoordinates {
  lat: number;
  lng: number;
}

export interface BusStreamMessage {
  bus_id: string;
  line_code: string;
  route: string;
  coordinates: BusCoordinates;
  speed_kmh: number;
  heading: number; // 0 - 360 degrees
  next_station_id: string;
  eta_seconds: number;
  occupancy: OccupancyLevel;
  last_updated?: string;
}

export interface IncomingBus {
  bus_id: string;
  line: string;
  destination: string;
  eta_minutes: number;
  occupancy: OccupancyLevel;
}

export interface StationData {
  station_id: string;
  name: string;
  zone: string;
  coordinates: BusCoordinates;
  facilities: string[];
  is_interchange?: boolean;
  incoming_buses: IncomingBus[];
}

export interface DARTLine {
  code: string;
  name: string;
  type: "EXPRESS" | "LOCAL";
  color: string;
  origin: string;
  destination: string;
  operating_hours: string;
  fare_tsh: number;
  waypoints: BusCoordinates[];
  stations: string[]; // station_ids
}

export interface TripPlanRequest {
  origin_station_id: string;
  destination_station_id: string;
  departure_time?: string;
}

export interface TripPlanResult {
  origin: StationData;
  destination: StationData;
  total_time_minutes: number;
  fare_tsh: number;
  line_code: string;
  line_name: string;
  transfers: number;
  intermediate_stations: StationData[];
}

export interface SystemAlert {
  id: string;
  title: string;
  description: string;
  severity: "CRITICAL" | "WARNING" | "INFO";
  line_affected: string;
  timestamp: string;
  is_active: boolean;
}

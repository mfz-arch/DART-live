"use client";

import { useEffect, useState, useRef } from "react";
import { BusStreamMessage } from "@/types/dart";
import { DART_LINES } from "@/data/dartNetwork";

// Initial mock bus positions along DART corridor waypoints
const MOCK_BUS_INITIAL_STATES: BusStreamMessage[] = [
  {
    bus_id: "DART-842",
    line_code: "EXP-101",
    route: "Kimara - Kivukoni Express",
    coordinates: { lat: -6.7865, lng: 39.1762 },
    speed_kmh: 42,
    heading: 110,
    next_station_id: "ST-SHEKILANGO",
    eta_seconds: 180,
    occupancy: "MEDIUM",
  },
  {
    bus_id: "DART-104",
    line_code: "EXP-101",
    route: "Kimara - Kivukoni Express",
    coordinates: { lat: -6.8081, lng: 39.2550 },
    speed_kmh: 48,
    heading: 125,
    next_station_id: "ST-POSTA",
    eta_seconds: 120,
    occupancy: "HIGH",
  },
  {
    bus_id: "DART-910",
    line_code: "LOC-102",
    route: "Kimara - Gerezani Local",
    coordinates: { lat: -6.7924, lng: 39.2083 },
    speed_kmh: 36,
    heading: 120,
    next_station_id: "ST-MAGOMENI",
    eta_seconds: 240,
    occupancy: "LOW",
  },
  {
    bus_id: "DART-505",
    line_code: "LOC-102",
    route: "Kimara - Gerezani Local",
    coordinates: { lat: -6.8145, lng: 39.2740 },
    speed_kmh: 40,
    heading: 290,
    next_station_id: "ST-UBUNGO",
    eta_seconds: 300,
    occupancy: "MEDIUM",
  },
  {
    bus_id: "DART-221",
    line_code: "EXP-103",
    route: "Morocco - Kivukoni Express",
    coordinates: { lat: -6.7760, lng: 39.2570 },
    speed_kmh: 45,
    heading: 180,
    next_station_id: "ST-MAGOMENI",
    eta_seconds: 210,
    occupancy: "LOW",
  },
  {
    bus_id: "DART-712",
    line_code: "LOC-102",
    route: "Kimara - Gerezani Local",
    coordinates: { lat: -6.8105, lng: 39.2635 },
    speed_kmh: 39,
    heading: 135,
    next_station_id: "ST-GEREZANI",
    eta_seconds: 150,
    occupancy: "HIGH",
  },
];

export function useRealtimeBuses() {
  const [buses, setBuses] = useState<BusStreamMessage[]>(MOCK_BUS_INITIAL_STATES);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isSimulatorRunning, setIsSimulatorRunning] = useState<boolean>(true);
  const [selectedLineFilter, setSelectedLineFilter] = useState<string>("ALL");
  const wsRef = useRef<WebSocket | null>(null);

  // Connection handler for real WebSocket if NEXT_PUBLIC_WS_URL is set
  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    if (!wsUrl) {
      setIsConnected(false);
      return;
    }

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setIsSimulatorRunning(false);
      };

      ws.onmessage = (event) => {
        try {
          const message: BusStreamMessage = JSON.parse(event.data);
          setBuses((prevBuses) => {
            const index = prevBuses.findIndex((b) => b.bus_id === message.bus_id);
            if (index !== -1) {
              const updated = [...prevBuses];
              updated[index] = message;
              return updated;
            }
            return [...prevBuses, message];
          });
        } catch (e) {
          console.error("Error parsing WS message:", e);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsSimulatorRunning(true);
      };

      return () => {
        ws.close();
      };
    } catch (err) {
      console.warn("WebSocket connection failed, falling back to real-time simulator:", err);
      setIsConnected(false);
      setIsSimulatorRunning(true);
    }
  }, []);

  // Simulator Effect when offline / mock mode
  useEffect(() => {
    if (!isSimulatorRunning) return;

    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => {
          const line = DART_LINES.find((l) => l.code === bus.line_code);
          if (!line || line.waypoints.length < 2) return bus;

          // Slightly shift coordinates along line to simulate movement
          const latDelta = (Math.random() - 0.48) * 0.0007;
          const lngDelta = (Math.random() - 0.48) * 0.0007;
          const newSpeed = Math.min(60, Math.max(25, bus.speed_kmh + Math.floor((Math.random() - 0.5) * 6)));
          const newEta = Math.max(0, bus.eta_seconds - 2);

          return {
            ...bus,
            coordinates: {
              lat: bus.coordinates.lat + latDelta,
              lng: bus.coordinates.lng + lngDelta,
            },
            speed_kmh: newSpeed,
            eta_seconds: newEta === 0 ? 180 : newEta,
            last_updated: new Date().toLocaleTimeString(),
          };
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [isSimulatorRunning]);

  const filteredBuses = selectedLineFilter === "ALL"
    ? buses
    : buses.filter((b) => b.line_code === selectedLineFilter);

  return {
    buses: filteredBuses,
    allBuses: buses,
    isConnected,
    isSimulatorRunning,
    selectedLineFilter,
    setSelectedLineFilter,
  };
}

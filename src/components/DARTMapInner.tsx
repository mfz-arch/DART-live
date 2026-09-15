"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from "react-leaflet";
import L from "leaflet";
import { BusStreamMessage, StationData } from "@/types/dart";
import { DART_STATIONS, DART_LINES } from "@/data/dartNetwork";
import { Bus, Clock, MapPin, Gauge, Users } from "lucide-react";

interface DARTMapProps {
  buses: BusStreamMessage[];
  selectedLineFilter: string;
  onSelectStation?: (station: StationData) => void;
  onSelectBus?: (bus: BusStreamMessage) => void;
}

// Function to generate dynamic SVG icon for buses with directional heading
function createBusIcon(lineCode: string, heading: number, speed: number, occupancy: string) {
  let occupancyColor = "#10B981"; // Low (Green)
  if (occupancy === "MEDIUM") occupancyColor = "#F59E0B"; // Yellow
  if (occupancy === "HIGH") occupancyColor = "#EF4444"; // Red

  const svgHtml = `
    <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
      <!-- Pulsing aura -->
      <div style="position: absolute; inset: 0; border-radius: 50%; background: rgba(16, 185, 129, 0.25); animation: markerPulse 2s infinite;"></div>
      
      <!-- Bus capsule container -->
      <div style="
        position: relative;
        width: 36px;
        height: 36px;
        background: #090D16;
        border: 2px solid #10B981;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 14px rgba(0, 107, 56, 0.6);
        color: white;
      ">
        <!-- Heading Indicator Arrow -->
        <div style="
          position: absolute;
          top: -4px;
          transform: rotate(${heading}deg);
          transform-origin: center bottom;
        ">
          <div style="width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-bottom: 6px solid #10B981;"></div>
        </div>

        <!-- Line badge -->
        <span style="font-size: 9px; font-weight: 800; color: #10B981; line-height: 1;">${lineCode.replace("EXP-", "E").replace("LOC-", "L")}</span>
        
        <!-- Occupancy dot -->
        <div style="width: 6px; height: 6px; border-radius: 50%; background-color: ${occupancyColor}; margin-top: 2px;"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: "custom-bus-marker",
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

// Function to generate station icons
function createStationIcon(isInterchange?: boolean) {
  const color = isInterchange ? "#F59E0B" : "#10B981";
  const size = isInterchange ? 18 : 14;

  const svgHtml = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: #090D16;
      border: 3px solid ${color};
      border-radius: 50%;
      box-shadow: 0 0 10px ${color};
      cursor: pointer;
    "></div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: "custom-station-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function DARTMapInner({
  buses,
  selectedLineFilter,
  onSelectStation,
  onSelectBus,
}: DARTMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-[#090d16] animate-pulse" />;

  // Filter lines to render on map
  const linesToRender = selectedLineFilter === "ALL"
    ? DART_LINES
    : DART_LINES.filter((l) => l.code === selectedLineFilter);

  return (
    <MapContainer
      center={[-6.805, 39.245]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full dark-tiles z-0"
    >
      {/* Dark CartoDB Base Map */}
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        maxZoom={19}
      />

      {/* DART BRT Dedicated Corridors (Polylines) */}
      {linesToRender.map((line) => (
        <Polyline
          key={line.code}
          positions={line.waypoints.map((w) => [w.lat, w.lng])}
          pathOptions={{
            color: line.color,
            weight: 5,
            opacity: 0.85,
            dashArray: line.type === "EXPRESS" ? undefined : "6, 8",
          }}
        >
          <Tooltip sticky className="custom-leaflet-tooltip">
            <span className="font-bold text-xs">{line.name} ({line.code})</span>
          </Tooltip>
        </Polyline>
      ))}

      {/* Stations Markers */}
      {DART_STATIONS.map((station) => (
        <Marker
          key={station.station_id}
          position={[station.coordinates.lat, station.coordinates.lng]}
          icon={createStationIcon(station.is_interchange)}
          eventHandlers={{
            click: () => onSelectStation?.(station),
          }}
        >
          <Popup className="custom-popup">
            <div className="p-3 max-w-xs bg-[#090d16] text-white rounded-xl border border-white/10 shadow-2xl">
              <div className="flex items-center space-x-2 border-b border-white/10 pb-2 mb-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <h4 className="font-bold text-sm text-white">{station.name}</h4>
              </div>
              <p className="text-xs text-slate-400 mb-2">{station.zone}</p>
              
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Incoming Arrivals
                </span>
                {station.incoming_buses.slice(0, 2).map((b, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-slate-900/80 px-2 py-1 rounded">
                    <span className="font-mono text-emerald-300 font-bold">{b.line}</span>
                    <span className="text-slate-300">{b.destination}</span>
                    <span className="text-amber-400 font-bold">{b.eta_minutes} min</span>
                  </div>
                ))}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Dynamic Moving Bus Markers */}
      {buses.map((bus) => (
        <Marker
          key={bus.bus_id}
          position={[bus.coordinates.lat, bus.coordinates.lng]}
          icon={createBusIcon(bus.line_code, bus.heading, bus.speed_kmh, bus.occupancy)}
          eventHandlers={{
            click: () => onSelectBus?.(bus),
          }}
        >
          <Popup>
            <div className="p-3 max-w-xs bg-[#090d16] text-white rounded-xl border border-emerald-500/30 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                <div className="flex items-center space-x-2">
                  <Bus className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-sm text-white">{bus.bus_id}</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">
                  {bus.line_code}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Route:</span>
                  <span className="font-medium text-slate-200">{bus.route}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-blue-400" /> Speed
                  </span>
                  <span className="font-bold text-blue-300">{bus.speed_kmh} km/h</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-400" /> Capacity
                  </span>
                  <span className={`font-bold ${
                    bus.occupancy === "LOW" ? "text-emerald-400" :
                    bus.occupancy === "MEDIUM" ? "text-amber-400" : "text-rose-400"
                  }`}>
                    {bus.occupancy}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Next Stop ETA
                  </span>
                  <span className="font-bold text-amber-400">{Math.ceil(bus.eta_seconds / 60)} mins</span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

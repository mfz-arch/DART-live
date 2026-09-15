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

// Function to generate dynamic SVG icon for buses with directional heading (Light Mode)
function createBusIcon(lineCode: string, heading: number, speed: number, occupancy: string) {
  let occupancyColor = "#10B981"; // Low (Green)
  if (occupancy === "MEDIUM") occupancyColor = "#F59E0B"; // Yellow
  if (occupancy === "HIGH") occupancyColor = "#EF4444"; // Red

  const svgHtml = `
    <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
      <!-- Pulsing aura -->
      <div style="position: absolute; inset: 0; border-radius: 50%; background: rgba(0, 107, 56, 0.2); animation: markerPulse 2s infinite;"></div>
      
      <!-- Bus capsule container -->
      <div style="
        position: relative;
        width: 36px;
        height: 36px;
        background: #FFFFFF;
        border: 2px solid #006B38;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        color: #0F172A;
      ">
        <!-- Heading Indicator Arrow -->
        <div style="
          position: absolute;
          top: -5px;
          transform: rotate(${heading}deg);
          transform-origin: center bottom;
        ">
          <div style="width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-bottom: 6px solid #006B38;"></div>
        </div>

        <!-- Line badge -->
        <span style="font-size: 9px; font-weight: 800; color: #006B38; line-height: 1;">${lineCode.replace("EXP-", "E").replace("LOC-", "L")}</span>
        
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

// Function to generate station icons (Light Mode)
function createStationIcon(isInterchange?: boolean) {
  const color = isInterchange ? "#D97706" : "#006B38";
  const size = isInterchange ? 18 : 14;

  const svgHtml = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: #FFFFFF;
      border: 3px solid ${color};
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0,0,0,0.15);
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

  if (!mounted) return <div className="w-full h-full bg-slate-100 animate-pulse" />;

  // Filter lines to render on map
  const linesToRender = selectedLineFilter === "ALL"
    ? DART_LINES
    : DART_LINES.filter((l) => l.code === selectedLineFilter);

  return (
    <MapContainer
      center={[-6.805, 39.245]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full z-0"
    >
      {/* Free Dark Mode Tile Layer (Esri World Dark Gray - No API Key Required) */}
      <TileLayer
        attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        maxZoom={16}
      />

      {/* DART BRT Dedicated Corridors (Polylines) */}
      {linesToRender.map((line) => (
        <Polyline
          key={line.code}
          positions={line.waypoints.map((w) => [w.lat, w.lng])}
          pathOptions={{
            color: line.code === "EXP-101" ? "#006B38" : line.code === "LOC-102" ? "#2563EB" : "#D97706",
            weight: 6,
            opacity: 0.9,
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
            <div className="p-3 max-w-xs bg-white text-slate-900 rounded-xl border border-slate-200 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-2 mb-2">
                <MapPin className="w-4 h-4 text-[#006B38]" />
                <h4 className="font-bold text-sm text-slate-900">{station.name}</h4>
              </div>
              <p className="text-xs text-slate-500 mb-2">{station.zone}</p>
              
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#006B38] uppercase tracking-wider block">
                  Incoming Arrivals
                </span>
                {station.incoming_buses.slice(0, 2).map((b, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-slate-50 px-2 py-1.5 rounded border border-slate-100">
                    <span className="font-mono text-[#006B38] font-bold">{b.line}</span>
                    <span className="text-slate-700">{b.destination}</span>
                    <span className="text-amber-600 font-bold">{b.eta_minutes} min</span>
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
            <div className="p-3 max-w-xs bg-white text-slate-900 rounded-xl border border-emerald-300 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                <div className="flex items-center space-x-2">
                  <Bus className="w-4 h-4 text-[#006B38]" />
                  <span className="font-bold text-sm text-slate-900">{bus.bus_id}</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-[#006B38] border border-emerald-300 rounded">
                  {bus.line_code}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Route:</span>
                  <span className="font-semibold text-slate-800">{bus.route}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-blue-600" /> Speed
                  </span>
                  <span className="font-bold text-blue-700">{bus.speed_kmh} km/h</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#006B38]" /> Capacity
                  </span>
                  <span className={`font-bold ${
                    bus.occupancy === "LOW" ? "text-emerald-700" :
                    bus.occupancy === "MEDIUM" ? "text-amber-700" : "text-rose-700"
                  }`}>
                    {bus.occupancy}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> Next Stop ETA
                  </span>
                  <span className="font-bold text-amber-700">{Math.ceil(bus.eta_seconds / 60)} mins</span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

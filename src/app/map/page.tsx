"use client";

import { useState } from "react";
import { DARTMap } from "@/components/DARTMap";
import { useRealtimeBuses } from "@/hooks/useRealtimeBuses";
import { DART_STATIONS, DART_LINES } from "@/data/dartNetwork";
import { BusStreamMessage, StationData } from "@/types/dart";
import {
  Bus,
  MapPin,
  Clock,
  Gauge,
  Users,
  Activity,
  Filter,
  RefreshCw,
  Info,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function FullscreenMapPage() {
  const { buses, selectedLineFilter, setSelectedLineFilter, isConnected, isSimulatorRunning } =
    useRealtimeBuses();

  const [selectedStation, setSelectedStation] = useState<StationData | null>(DART_STATIONS[0]);
  const [selectedBus, setSelectedBus] = useState<BusStreamMessage | null>(null);

  return (
    <div className="relative w-full h-[calc(100vh-80px)] bg-slate-50 flex flex-col overflow-hidden">
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Line Filter Buttons */}
        <div className="flex items-center space-x-2 bg-white/95 p-2 rounded-2xl pointer-events-auto border border-slate-200 shadow-lg backdrop-blur-xl">
          <span className="text-xs font-bold text-slate-500 px-3 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#006B38]" />
            Corridor:
          </span>
          <button
            onClick={() => setSelectedLineFilter("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedLineFilter === "ALL"
                ? "bg-[#006B38] text-white shadow-md"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            All Corridors ({buses.length})
          </button>
          {DART_LINES.map((line) => (
            <button
              key={line.code}
              onClick={() => setSelectedLineFilter(line.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLineFilter === line.code
                  ? "bg-[#006B38] text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {line.code}
            </button>
          ))}
        </div>

        {/* Real-time Stream Status Badge */}
        <div className="flex items-center space-x-3 bg-white/95 px-4 py-2 rounded-2xl pointer-events-auto border border-slate-200 shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-[#006B38] uppercase tracking-wider">
              {isConnected ? "Live WebSocket Stream" : "Real-Time Simulator Active"}
            </span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-600 font-mono font-bold">
            {buses.length} Active GPS Nodes
          </span>
        </div>
      </div>

      {/* Main Map Canvas */}
      <div className="w-full h-full relative">
        <DARTMap
          buses={buses}
          selectedLineFilter={selectedLineFilter}
          onSelectStation={(st) => {
            setSelectedStation(st);
            setSelectedBus(null);
          }}
          onSelectBus={(b) => {
            setSelectedBus(b);
            setSelectedStation(null);
          }}
        />

        {/* Bottom Floating Inspector Panel */}
        <div className="absolute bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-20">
          {selectedBus ? (
            <div className="bg-white p-5 rounded-3xl border border-emerald-300 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-emerald-100 text-[#006B38]">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">{selectedBus.bus_id}</h4>
                    <p className="text-xs text-[#006B38] font-bold">{selectedBus.route}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBus(null)}
                  className="text-xs text-slate-500 hover:text-slate-900 px-2 py-1 bg-slate-100 rounded"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block font-medium">Speed</span>
                  <span className="text-sm font-bold text-blue-700">{selectedBus.speed_kmh} km/h</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block font-medium">Capacity</span>
                  <span
                    className={`text-sm font-bold ${
                      selectedBus.occupancy === "LOW"
                        ? "text-emerald-700"
                        : selectedBus.occupancy === "MEDIUM"
                        ? "text-amber-700"
                        : "text-rose-700"
                    }`}
                  >
                    {selectedBus.occupancy}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span className="text-xs text-slate-700 font-medium">Next Station ETA:</span>
                <span className="text-sm font-extrabold text-amber-700">
                  {Math.ceil(selectedBus.eta_seconds / 60)} minutes
                </span>
              </div>
            </div>
          ) : selectedStation ? (
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-[#006B38] uppercase tracking-widest block">
                    Station Details
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900">{selectedStation.name}</h4>
                </div>
                <button
                  onClick={() => setSelectedStation(null)}
                  className="text-xs text-slate-500 hover:text-slate-900 px-2 py-1 bg-slate-100 rounded"
                >
                  Close
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Upcoming Arrivals
                </span>
                {selectedStation.incoming_buses.map((bus, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <div>
                      <span className="font-mono text-[#006B38] font-bold block">{bus.line}</span>
                      <span className="text-slate-700">To {bus.destination}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-amber-700 text-sm block">
                        {bus.eta_minutes} min
                      </span>
                      <span className="text-[10px] font-medium text-slate-500">
                        {bus.occupancy} Seats
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

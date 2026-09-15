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
    <div className="relative w-full h-[calc(100vh-80px)] bg-[#090d16] flex flex-col overflow-hidden">
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Line Filter Buttons */}
        <div className="flex items-center space-x-2 glass-panel p-2 rounded-2xl pointer-events-auto border border-white/10 shadow-2xl backdrop-blur-xl">
          <span className="text-xs font-bold text-slate-400 px-3 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            Corridor:
          </span>
          <button
            onClick={() => setSelectedLineFilter("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedLineFilter === "ALL"
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-950/50"
                : "text-slate-300 hover:bg-slate-800/60"
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
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-950/50"
                  : "text-slate-300 hover:bg-slate-800/60"
              }`}
            >
              {line.code}
            </button>
          ))}
        </div>

        {/* Real-time Stream Status Badge */}
        <div className="flex items-center space-x-3 glass-panel px-4 py-2 rounded-2xl pointer-events-auto border border-white/10 shadow-2xl">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              {isConnected ? "Live WebSocket Stream" : "Real-Time Simulator Active"}
            </span>
          </div>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-300 font-mono">
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
            <div className="glass-panel p-5 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white">{selectedBus.bus_id}</h4>
                    <p className="text-xs text-emerald-400 font-semibold">{selectedBus.route}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBus(null)}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
                  <span className="text-slate-400 block font-medium">Speed</span>
                  <span className="text-sm font-bold text-blue-400">{selectedBus.speed_kmh} km/h</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
                  <span className="text-slate-400 block font-medium">Capacity</span>
                  <span
                    className={`text-sm font-bold ${
                      selectedBus.occupancy === "LOW"
                        ? "text-emerald-400"
                        : selectedBus.occupancy === "MEDIUM"
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}
                  >
                    {selectedBus.occupancy}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                <span className="text-xs text-slate-300">Next Station ETA:</span>
                <span className="text-sm font-extrabold text-amber-400">
                  {Math.ceil(selectedBus.eta_seconds / 60)} minutes
                </span>
              </div>
            </div>
          ) : selectedStation ? (
            <div className="glass-panel p-5 rounded-3xl border border-white/10 shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                    Station Details
                  </span>
                  <h4 className="text-base font-extrabold text-white">{selectedStation.name}</h4>
                </div>
                <button
                  onClick={() => setSelectedStation(null)}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded"
                >
                  Close
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  Upcoming Arrivals
                </span>
                {selectedStation.incoming_buses.map((bus, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-white/5 text-xs"
                  >
                    <div>
                      <span className="font-mono text-emerald-400 font-bold block">{bus.line}</span>
                      <span className="text-slate-300">To {bus.destination}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-amber-400 text-sm block">
                        {bus.eta_minutes} min
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
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

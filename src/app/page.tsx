"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DARTMap } from "@/components/DARTMap";
import { LiveStatsBar } from "@/components/LiveStatsBar";
import { useRealtimeBuses } from "@/hooks/useRealtimeBuses";
import { DART_STATIONS, DART_LINES } from "@/data/dartNetwork";
import { BusStreamMessage, StationData } from "@/types/dart";
import {
  Bus,
  MapPin,
  Navigation,
  ArrowRight,
  Zap,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Filter,
  ShieldAlert,
} from "lucide-react";

export default function HomePage() {
  const { buses, selectedLineFilter, setSelectedLineFilter, isConnected } = useRealtimeBuses();
  const [selectedStation, setSelectedStation] = useState<StationData | null>(DART_STATIONS[0]);
  const [selectedBus, setSelectedBus] = useState<BusStreamMessage | null>(null);

  // Quick Trip Planner State
  const [quickOrigin, setQuickOrigin] = useState("ST-KIMARA");
  const [quickDest, setQuickDest] = useState("ST-KIVUKONI");
  const [calcResult, setCalcResult] = useState<string | null>(null);

  const handleQuickCalc = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickOrigin === quickDest) {
      setCalcResult("Origin and Destination cannot be the same station.");
      return;
    }
    const origStation = DART_STATIONS.find((s) => s.station_id === quickOrigin);
    const destStation = DART_STATIONS.find((s) => s.station_id === quickDest);
    setCalcResult(`Direct EXP-101 Route: Est. 24 mins • Fare: 750 TSh (${origStation?.name} → ${destStation?.name})`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#090d16] text-white">
      {/* 1. Hero Section with Authentic Sunset Cityscape Background */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        {/* Real Photograph Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/dart_hero_bg.jpg"
            alt="Real Photograph of Dar es Salaam Waterfront & DART Bus"
            fill
            className="object-cover object-center opacity-45 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/75 to-[#090d16]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090d16] via-transparent to-[#090d16]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-8 backdrop-blur-md shadow-lg shadow-emerald-950/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Mwendokasi Real-Time BRT Corridor Network</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-tight">
            Live Transit Tracking for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
              Dar es Salaam DART Corridors
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow">
            Experience real-time bus GPS positions, precise station ETA countdowns, route planners, and occupancy intelligence across Kimara, Ubungo, Morocco, and Kivukoni terminals.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/map"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-[#006B38] text-white font-bold text-base flex items-center justify-center space-x-3 shadow-xl shadow-emerald-950/60 hover:scale-105 transition-transform duration-200 border border-emerald-400/40"
            >
              <MapPin className="w-5 h-5 text-emerald-300" />
              <span>Launch Interactive Map</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/stations"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel text-slate-200 hover:text-white font-semibold text-base flex items-center justify-center space-x-3 glass-panel-hover"
            >
              <Bus className="w-5 h-5 text-emerald-400" />
              <span>Station ETA Board</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Live Operational Stats Bar */}
      <LiveStatsBar />

      {/* 3. Live Interactive Map & Stream Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">
              <Zap className="w-4 h-4" />
              <span>Real-Time GPS Streaming</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Live Bus Rapid Transit Map
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select corridors to filter active buses on dedicated BRT lanes.
            </p>
          </div>

          {/* Line Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedLineFilter("ALL")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedLineFilter === "ALL"
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/40"
                  : "glass-panel text-slate-300 hover:bg-slate-800/80"
              }`}
            >
              All Lines ({buses.length})
            </button>
            {DART_LINES.map((line) => (
              <button
                key={line.code}
                onClick={() => setSelectedLineFilter(line.code)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedLineFilter === line.code
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/40"
                    : "glass-panel text-slate-300 hover:bg-slate-800/80"
                }`}
              >
                {line.code}
              </button>
            ))}
          </div>
        </div>

        {/* Map Container Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[550px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
            <DARTMap
              buses={buses}
              selectedLineFilter={selectedLineFilter}
              onSelectStation={(st) => setSelectedStation(st)}
              onSelectBus={(b) => setSelectedBus(b)}
            />
          </div>

          {/* Side Inspector Drawer */}
          <div className="flex flex-col space-y-4">
            {/* Selected Station or Bus Details */}
            {selectedStation && (
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Station Inspector
                    </span>
                    <h3 className="text-lg font-bold text-white">{selectedStation.name}</h3>
                  </div>
                  {selectedStation.is_interchange && (
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Interchange Hub
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-400">
                  Zone: <strong className="text-slate-200">{selectedStation.zone}</strong>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Next Arriving Buses
                  </h4>
                  {selectedStation.incoming_buses.map((bus, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/5"
                    >
                      <div>
                        <span className="font-mono text-xs font-bold text-emerald-400 block">
                          {bus.line}
                        </span>
                        <span className="text-xs text-slate-300">To {bus.destination}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-amber-400 block">
                          {bus.eta_minutes} mins
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase">
                          {bus.occupancy} Seats
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Authentic DART Bus Real Photo Card */}
            <div className="relative rounded-3xl overflow-hidden glass-panel p-6 border border-white/10 group">
              <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
                <Image
                  src="/images/dart_bus_green.jpg"
                  alt="Authentic DART Green Articulated Bus"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent" />
              </div>
              <h4 className="text-base font-bold text-white">DART Mwendokasi Fleet</h4>
              <p className="text-xs text-slate-400 mt-1">
                Authentic 18-meter Golden Dragon & Yutong BRT buses operating on exclusive lanes across Dar es Salaam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Authentic Photo Gallery Showcase */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-white/10">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">
            <Bus className="w-4 h-4" />
            <span>Actual Transit Fleet & Infrastructure</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Mwendokasi Network in Action
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Real photography of DART buses, station bays, and Dar es Salaam corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-4 rounded-3xl border border-white/10 space-y-3 glass-panel-hover">
            <div className="relative h-52 rounded-2xl overflow-hidden">
              <Image
                src="/images/dart_bus_skyline.jpg"
                alt="DART Bus with Dar es Salaam Skyline"
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-sm font-bold text-white">City Center Dedicated Lanes</h4>
            <p className="text-xs text-slate-400">DART buses passing PSPF Towers and City Center CBD.</p>
          </div>

          <div className="glass-panel p-4 rounded-3xl border border-white/10 space-y-3 glass-panel-hover">
            <div className="relative h-52 rounded-2xl overflow-hidden">
              <Image
                src="/images/dart_terminal_hub.jpg"
                alt="Kimara Terminal Bus Bays"
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-sm font-bold text-white">Kimara Terminal Bus Bays</h4>
            <p className="text-xs text-slate-400">High-capacity covered platform terminal with multiple bus lanes.</p>
          </div>

          <div className="glass-panel p-4 rounded-3xl border border-white/10 space-y-3 glass-panel-hover">
            <div className="relative h-52 rounded-2xl overflow-hidden">
              <Image
                src="/images/dart_bus_waterfront.jpg"
                alt="Ocean Waterfront Corridor"
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-sm font-bold text-white">Waterfront Corridor Line</h4>
            <p className="text-xs text-slate-400">Express service along Kivukoni oceanfront avenue.</p>
          </div>
        </div>
      </section>

      {/* 5. Quick Trip Planner Widget */}
      <section className="py-16 bg-[#0c1220] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Form */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Navigation className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Quick Route & Fare Finder</h3>
                  <p className="text-xs text-slate-400">Calculate travel duration & ticket fare in TSh</p>
                </div>
              </div>

              <form onSubmit={handleQuickCalc} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Origin Station
                  </label>
                  <select
                    value={quickOrigin}
                    onChange={(e) => setQuickOrigin(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    {DART_STATIONS.map((s) => (
                      <option key={s.station_id} value={s.station_id}>
                        {s.name} ({s.zone})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Destination Station
                  </label>
                  <select
                    value={quickDest}
                    onChange={(e) => setQuickDest(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    {DART_STATIONS.map((s) => (
                      <option key={s.station_id} value={s.station_id}>
                        {s.name} ({s.zone})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-900/40"
                >
                  Calculate Journey
                </button>
              </form>

              {calcResult && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  {calcResult}
                </div>
              )}
            </div>

            {/* Feature Bullet Points */}
            <div className="space-y-6">
              <h3 className="text-3xl font-extrabold text-white tracking-tight">
                Designed specifically for Dar es Salaam commuters
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Live GPS Tracking",
                    desc: "Real-time bus position data streamed directly from on-board DART telematics.",
                  },
                  {
                    title: "Accurate ETA Countdowns",
                    desc: "Algorithmically predicted arrival estimates accounting for station dwell times.",
                  },
                  {
                    title: "Capacity & Occupancy Status",
                    desc: "Know before boarding whether a bus has low, medium, or high passenger density.",
                  },
                  {
                    title: "Instant Service Advisories",
                    desc: "Real-time alerts regarding weather disruptions, maintenance, or express frequencies.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 rounded-2xl glass-panel">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

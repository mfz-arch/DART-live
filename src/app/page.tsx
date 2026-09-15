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
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      {/* 1. Hero Section with Pure White & Real Photography Overlay */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-slate-200 bg-slate-50">
        {/* Real Photograph Background Overlay - Clearer & Vibrant */}
        <div className="absolute inset-0 z-0 opacity-45 transition-opacity duration-500">
          <Image
            src="/images/dart_hero_bg.jpg"
            alt="Real Photograph of Dar es Salaam Waterfront & DART Bus"
            fill
            className="object-cover object-center scale-105 filter brightness-95 contrast-105"
            priority
          />
        </div>
        {/* Soft Radial & Linear Gradient Overlay for Perfect Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/90 z-0 backdrop-blur-[1px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-[#006B38] text-xs font-bold uppercase tracking-wider mb-8 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span>Mwendokasi Real-Time BRT Corridor Network</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-tight text-slate-900">
            Live Transit Tracking for <br className="hidden sm:inline" />
            <span className="text-[#006B38]">
              Dar es Salaam DART Corridors
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Experience real-time bus GPS positions, precise station ETA countdowns, route planners, and occupancy intelligence across Kimara, Ubungo, Morocco, and Kivukoni terminals.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/map"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#006B38] hover:bg-emerald-700 text-white font-bold text-base flex items-center justify-center space-x-3 shadow-lg shadow-emerald-900/20 transition-all duration-200"
            >
              <MapPin className="w-5 h-5 text-emerald-200" />
              <span>Launch Interactive Map</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/stations"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 hover:text-slate-900 font-semibold text-base flex items-center justify-center space-x-3 shadow-sm hover:shadow-md transition-all"
            >
              <Bus className="w-5 h-5 text-[#006B38]" />
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
            <div className="flex items-center space-x-2 text-[#006B38] font-bold text-xs uppercase tracking-widest mb-1">
              <Zap className="w-4 h-4" />
              <span>Real-Time GPS Streaming</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Live Bus Rapid Transit Map
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select corridors to filter active buses on dedicated BRT lanes.
            </p>
          </div>

          {/* Line Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedLineFilter("ALL")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedLineFilter === "ALL"
                  ? "bg-[#006B38] text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
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
                    ? "bg-[#006B38] text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {line.code}
              </button>
            ))}
          </div>
        </div>

        {/* Map Container Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[550px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative bg-slate-50">
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
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#006B38] uppercase tracking-wider block">
                      Station Inspector
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{selectedStation.name}</h3>
                  </div>
                  {selectedStation.is_interchange && (
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                      Interchange Hub
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-500">
                  Zone: <strong className="text-slate-800">{selectedStation.zone}</strong>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Next Arriving Buses
                  </h4>
                  {selectedStation.incoming_buses.map((bus, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <div>
                        <span className="font-mono text-xs font-bold text-[#006B38] block">
                          {bus.line}
                        </span>
                        <span className="text-xs text-slate-600">To {bus.destination}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-amber-700 block">
                          {bus.eta_minutes} mins
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">
                          {bus.occupancy} Seats
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Authentic DART Bus Real Photo Card */}
            <div className="relative rounded-3xl overflow-hidden bg-white p-6 border border-slate-200 shadow-lg group">
              <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
                <Image
                  src="/images/dart_bus_green.jpg"
                  alt="Authentic DART Green Articulated Bus"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="text-base font-bold text-slate-900">DART Mwendokasi Fleet</h4>
              <p className="text-xs text-slate-500 mt-1">
                Authentic 18-meter Golden Dragon & Yutong BRT buses operating on exclusive lanes across Dar es Salaam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Authentic Photo Gallery Showcase */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-slate-200 bg-slate-50">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-[#006B38] font-bold text-xs uppercase tracking-widest mb-1">
            <Bus className="w-4 h-4" />
            <span>Actual Transit Fleet & Infrastructure</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Mwendokasi Network in Action
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real photography of DART buses, station bays, and Dar es Salaam corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-md space-y-3 glass-panel-hover">
            <div className="relative h-52 rounded-2xl overflow-hidden">
              <Image
                src="/images/dart_bus_skyline.jpg"
                alt="DART Bus with Dar es Salaam Skyline"
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-sm font-bold text-slate-900">City Center Dedicated Lanes</h4>
            <p className="text-xs text-slate-500">DART buses passing PSPF Towers and City Center CBD.</p>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-md space-y-3 glass-panel-hover">
            <div className="relative h-52 rounded-2xl overflow-hidden">
              <Image
                src="/images/dart_terminal_hub.jpg"
                alt="Kimara Terminal Bus Bays"
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Kimara Terminal Bus Bays</h4>
            <p className="text-xs text-slate-500">High-capacity covered platform terminal with multiple bus lanes.</p>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-md space-y-3 glass-panel-hover">
            <div className="relative h-52 rounded-2xl overflow-hidden">
              <Image
                src="/images/dart_posta_skyline.jpg"
                alt="Dar es Salaam Posta Financial District & Skyline"
                fill
                className="object-cover"
              />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Posta Financial District & Skyline</h4>
            <p className="text-xs text-slate-500">PSPF Towers, Posta MPPA & Kivukoni oceanfront avenue.</p>
          </div>
        </div>
      </section>

      {/* 5. Quick Trip Planner Widget */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Form */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-emerald-100 text-[#006B38] border border-emerald-200">
                  <Navigation className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Quick Route & Fare Finder</h3>
                  <p className="text-xs text-slate-500">Calculate travel duration & ticket fare in TSh</p>
                </div>
              </div>

              <form onSubmit={handleQuickCalc} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Origin Station
                  </label>
                  <select
                    value={quickOrigin}
                    onChange={(e) => setQuickOrigin(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-[#006B38]"
                  >
                    {DART_STATIONS.map((s) => (
                      <option key={s.station_id} value={s.station_id}>
                        {s.name} ({s.zone})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Destination Station
                  </label>
                  <select
                    value={quickDest}
                    onChange={(e) => setQuickDest(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 font-semibold focus:outline-none focus:border-[#006B38]"
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
                  className="w-full py-4 rounded-xl bg-[#006B38] hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md"
                >
                  Calculate Journey
                </button>
              </form>

              {calcResult && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[#006B38] text-xs font-bold">
                  {calcResult}
                </div>
              )}
            </div>

            {/* Feature Bullet Points */}
            <div className="space-y-6">
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
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
                  <div key={i} className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-6 h-6 text-[#006B38] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
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

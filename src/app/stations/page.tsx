"use client";

import Image from "next/image";
import { useState } from "react";
import { DART_STATIONS } from "@/data/dartNetwork";
import { Bus, MapPin, Search, Clock, Users, Shield, CheckCircle2, ChevronRight, Zap } from "lucide-react";

export default function StationsInspectorPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZone, setSelectedZone] = useState("ALL");

  const filteredStations = DART_STATIONS.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.zone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = selectedZone === "ALL" || station.zone.includes(selectedZone);
    return matchesSearch && matchesZone;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center space-x-2 text-[#006B38] font-bold text-xs uppercase tracking-widest mb-1">
              <Bus className="w-4 h-4" />
              <span>Real-Time ETA Intelligence</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Station Arrival Inspector & Countdown Board
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Inspect real-time incoming bus arrival schedules, occupancy levels, and terminal facilities across all DART stations.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
            <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-[#006B38] border border-emerald-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Auto-updating Live
            </span>
          </div>
        </div>

        {/* Real Station Hub Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-50 p-6 border border-slate-200 mb-10 flex flex-col md:flex-row items-center gap-6 shadow-md">
          <div className="relative w-full md:w-1/3 h-48 rounded-2xl overflow-hidden shrink-0">
            <Image
              src="/images/dart_terminal_hub.jpg"
              alt="Real DART Terminal Hub Photography"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#006B38] border border-emerald-200 inline-block mb-2">
              Phase 1 Main Terminal Hubs
            </span>
            <h3 className="text-2xl font-bold text-slate-900">Kimara, Ubungo, Morocco & Kivukoni Terminals</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Equipped with automated smart turnstile gates, feeder bus transfer platforms, overpass pedestrian bridges, and real-time electronic passenger information displays.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 mb-10 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search station by name (e.g. Kimara, Ubungo, Morocco, Posta, Kivukoni)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-[#006B38]"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {["ALL", "Terminal", "Corridor", "CBD"].map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedZone === zone
                    ? "bg-[#006B38] text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {zone === "ALL" ? "All Zones" : zone}
              </button>
            ))}
          </div>
        </div>

        {/* Station Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station) => (
            <div
              key={station.station_id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Station Card Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-[#006B38]" />
                      <h3 className="text-xl font-bold text-slate-900">{station.name}</h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{station.zone}</p>
                  </div>
                  {station.is_interchange && (
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                      Interchange
                    </span>
                  )}
                </div>

                {/* Incoming Bus ETA List */}
                <div className="space-y-3 mb-6">
                  <span className="text-[11px] font-extrabold text-[#006B38] uppercase tracking-wider block">
                    Live Upcoming Countdowns
                  </span>
                  {station.incoming_buses.map((bus, idx) => {
                    let occBg = "bg-emerald-50 text-emerald-800 border-emerald-300";
                    let occIcon = "🟢";
                    if (bus.occupancy === "MEDIUM") {
                      occBg = "bg-amber-50 text-amber-800 border-amber-300";
                      occIcon = "🟡";
                    } else if (bus.occupancy === "HIGH") {
                      occBg = "bg-rose-50 text-rose-800 border-rose-300";
                      occIcon = "🔴";
                    }

                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs font-extrabold text-[#006B38] bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                              {bus.line}
                            </span>
                            <span className="text-xs font-semibold text-slate-800">
                              To {bus.destination}
                            </span>
                          </div>
                          <span className="text-sm font-extrabold text-amber-700 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {bus.eta_minutes === 0 ? "Arriving Now" : `In ${bus.eta_minutes} mins`}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11px]">
                          <span className="text-slate-500 font-mono">ID: {bus.bus_id}</span>
                          <span className={`px-2 py-0.5 rounded-md font-bold border ${occBg}`}>
                            {occIcon} {bus.occupancy} Occupancy
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Station Facilities */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">
                  Facilities & Amenities
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {station.facilities.map((fac, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

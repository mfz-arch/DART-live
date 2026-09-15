"use client";

import { useState } from "react";
import { DART_STATIONS, DART_LINES } from "@/data/dartNetwork";
import { StationData, TripPlanResult } from "@/types/dart";
import {
  Navigation,
  ArrowRight,
  Clock,
  Coins,
  MapPin,
  Bus,
  CheckCircle2,
  AlertCircle,
  Repeat,
  Shield,
} from "lucide-react";

export default function TripPlannerPage() {
  const [originId, setOriginId] = useState("ST-KIMARA");
  const [destId, setDestId] = useState("ST-KIVUKONI");
  const [tripPlan, setTripPlan] = useState<TripPlanResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePlanTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (originId === destId) {
      setErrorMsg("Origin and Destination cannot be the same station. Please select two different terminals.");
      setTripPlan(null);
      return;
    }
    setErrorMsg(null);

    const orig = DART_STATIONS.find((s) => s.station_id === originId)!;
    const dest = DART_STATIONS.find((s) => s.station_id === destId)!;

    // Calculate journey step timeline
    const origIdx = DART_STATIONS.findIndex((s) => s.station_id === originId);
    const destIdx = DART_STATIONS.findIndex((s) => s.station_id === destId);
    
    let intermediate: StationData[] = [];
    if (origIdx < destIdx) {
      intermediate = DART_STATIONS.slice(origIdx + 1, destIdx);
    } else {
      intermediate = DART_STATIONS.slice(destIdx + 1, origIdx).reverse();
    }

    const stationCount = Math.abs(origIdx - destIdx);
    const estimatedMinutes = stationCount * 4 + 4;
    const isExpress = orig.name.includes("Terminal") && dest.name.includes("Terminal");

    setTripPlan({
      origin: orig,
      destination: dest,
      total_time_minutes: estimatedMinutes,
      fare_tsh: 750,
      line_code: isExpress ? "EXP-101" : "LOC-102",
      line_name: isExpress ? "Kimara - Kivukoni Express" : "Kimara - Gerezani Local",
      transfers: 0,
      intermediate_stations: intermediate,
    });
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Navigation className="w-4 h-4" />
            <span>Mwendokasi Smart Route & Fare Calculator</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Trip Planner & Route Finder
          </h1>
          <p className="text-base text-slate-400 mt-3">
            Select your starting station and destination to view total travel time, ticket fare in TSh, and step-by-step corridor transfers.
          </p>
        </div>

        {/* Planner Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Bus className="w-5 h-5 text-emerald-400" />
              <span>Select Journey Stations</span>
            </h3>

            <form onSubmit={handlePlanTrip} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Origin (Boarding Station)
                </label>
                <select
                  value={originId}
                  onChange={(e) => setOriginId(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-900 border border-white/10 text-white font-semibold focus:outline-none focus:border-emerald-500 text-sm"
                >
                  {DART_STATIONS.map((st) => (
                    <option key={st.station_id} value={st.station_id}>
                      {st.name} ({st.zone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    const temp = originId;
                    setOriginId(destId);
                    setDestId(temp);
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 border border-white/10 text-slate-300 hover:text-white hover:bg-emerald-500/20 transition-colors"
                  title="Swap Origin and Destination"
                >
                  <Repeat className="w-4 h-4 text-emerald-400" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Destination (Alighting Station)
                </label>
                <select
                  value={destId}
                  onChange={(e) => setDestId(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-900 border border-white/10 text-white font-semibold focus:outline-none focus:border-emerald-500 text-sm"
                >
                  {DART_STATIONS.map((st) => (
                    <option key={st.station_id} value={st.station_id}>
                      {st.name} ({st.zone})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-[#006B38] hover:from-emerald-500 hover:to-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 transition-all flex items-center justify-center space-x-2 border border-emerald-400/40"
              >
                <span>Find Route & Fare</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Results Side */}
          <div className="lg:col-span-7">
            {tripPlan ? (
              <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 space-y-6">
                
                {/* Result Header Summary */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {tripPlan.line_code} Direct
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2">
                      {tripPlan.origin.name} → {tripPlan.destination.name}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-white/10 text-center">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Time</span>
                      <span className="text-base font-extrabold text-amber-400 flex items-center justify-center gap-1">
                        <Clock className="w-4 h-4" /> {tripPlan.total_time_minutes} min
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-900 border border-white/10 text-center">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Standard Fare</span>
                      <span className="text-base font-extrabold text-emerald-400 flex items-center justify-center gap-1">
                        <Coins className="w-4 h-4" /> {tripPlan.fare_tsh} TSh
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timeline Step-by-Step */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Journey Corridor Itinerary
                  </h4>

                  <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-500/40">
                    {/* Origin Station */}
                    <div className="relative flex items-start space-x-3">
                      <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-950" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h5 className="text-sm font-bold text-white">{tripPlan.origin.name}</h5>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-semibold">
                            Boarding Point
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{tripPlan.origin.zone}</p>
                      </div>
                    </div>

                    {/* Intermediate stops count */}
                    {tripPlan.intermediate_stations.length > 0 && (
                      <div className="relative flex items-center space-x-3">
                        <span className="absolute -left-[19px] w-2 h-2 rounded-full bg-slate-500" />
                        <div className="text-xs text-slate-400 italic">
                          Passes through {tripPlan.intermediate_stations.length} corridor stations (
                          {tripPlan.intermediate_stations.map((s) => s.name).join(", ")})
                        </div>
                      </div>
                    )}

                    {/* Destination Station */}
                    <div className="relative flex items-start space-x-3">
                      <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-amber-950" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h5 className="text-sm font-bold text-white">{tripPlan.destination.name}</h5>
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-semibold">
                            Alighting Point
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{tripPlan.destination.zone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 text-xs text-slate-300 flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    Smart cards (Afri-Card) and QR paper tickets are accepted at turnstiles at both stations.
                  </span>
                </div>

              </div>
            ) : (
              <div className="h-full glass-panel p-12 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-500">
                  <Navigation className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white">Select Journey Stations</h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  Choose your starting location and destination on the left to view complete route guidance, travel time, and fare in TSh.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

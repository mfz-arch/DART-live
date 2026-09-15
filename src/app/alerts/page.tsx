"use client";

import { useState } from "react";
import { INITIAL_SYSTEM_ALERTS } from "@/data/dartNetwork";
import { Bell, AlertTriangle, Info, ShieldAlert, CheckCircle2, Clock, Zap } from "lucide-react";

export default function SystemAlertsPage() {
  const [filterSeverity, setFilterSeverity] = useState<string>("ALL");

  const alerts = filterSeverity === "ALL"
    ? INITIAL_SYSTEM_ALERTS
    : INITIAL_SYSTEM_ALERTS.filter((a) => a.severity === filterSeverity);

  return (
    <div className="min-h-screen bg-[#090d16] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-widest mb-1">
              <Bell className="w-4 h-4" />
              <span>Real-Time Network Operations</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              System Alerts & Service Advisories
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Live updates regarding DART corridor maintenance, frequency adjustments, and passenger notices.
            </p>
          </div>

          <div className="flex items-center space-x-3 px-4 py-2 rounded-2xl glass-panel border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-300">Phase 1 Corridors Normal</span>
          </div>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center space-x-2 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
          {["ALL", "CRITICAL", "WARNING", "INFO"].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterSeverity === sev
                  ? "bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-950/50"
                  : "glass-panel text-slate-300 hover:bg-slate-800/80"
              }`}
            >
              {sev === "ALL" ? "All Updates" : sev}
            </button>
          ))}
        </div>

        {/* Alerts Grid */}
        <div className="space-y-4">
          {alerts.map((alert) => {
            let badgeBg = "bg-blue-500/20 text-blue-300 border-blue-500/30";
            let Icon = Info;
            if (alert.severity === "WARNING") {
              badgeBg = "bg-amber-500/20 text-amber-300 border-amber-500/30";
              Icon = AlertTriangle;
            } else if (alert.severity === "CRITICAL") {
              badgeBg = "bg-rose-500/20 text-rose-300 border-rose-500/30";
              Icon = ShieldAlert;
            }

            return (
              <div
                key={alert.id}
                className="glass-panel p-6 rounded-3xl border border-white/10 glass-panel-hover flex flex-col md:flex-row items-start justify-between gap-4"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-2xl border ${badgeBg} shrink-0 mt-0.5`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase border ${badgeBg}`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        {alert.line_affected}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white pt-1">{alert.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                      {alert.description}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 text-xs text-slate-400 flex items-center space-x-1.5 md:self-center">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{alert.timestamp}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

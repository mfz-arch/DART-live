"use client";

import { Activity, Clock, Zap, Users, Gauge } from "lucide-react";

export function LiveStatsBar() {
  const stats = [
    {
      label: "Active Buses Live",
      value: "48 Fleet Units",
      icon: Activity,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Avg Corridor Speed",
      value: "38 km/h Dedicated",
      icon: Gauge,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Peak Departure Interval",
      value: "Every 3 Minutes",
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      label: "Daily Passengers Served",
      value: "185,000+ Commuters",
      icon: Users,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      label: "Corridor Efficiency",
      value: "99.4% On-Time",
      icon: Zap,
      color: "text-teal-400",
      bg: "bg-teal-500/10 border-teal-500/20",
    },
  ];

  return (
    <div className="w-full bg-[#0d1322] border-y border-white/5 py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl border backdrop-blur-md ${stat.bg}`}
              >
                <div className={`p-2 rounded-lg bg-slate-900/60 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-sm font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

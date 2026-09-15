"use client";

import { Activity, Clock, Zap, Users, Gauge } from "lucide-react";

export function LiveStatsBar() {
  const stats = [
    {
      label: "Active Buses Live",
      value: "48 Fleet Units",
      icon: Activity,
      color: "text-emerald-700",
      bg: "bg-emerald-50 border-emerald-200",
    },
    {
      label: "Avg Corridor Speed",
      value: "38 km/h Dedicated",
      icon: Gauge,
      color: "text-blue-700",
      bg: "bg-blue-50 border-blue-200",
    },
    {
      label: "Peak Departure Interval",
      value: "Every 3 Minutes",
      icon: Clock,
      color: "text-amber-700",
      bg: "bg-amber-50 border-amber-200",
    },
    {
      label: "Daily Passengers Served",
      value: "185,000+ Commuters",
      icon: Users,
      color: "text-purple-700",
      bg: "bg-purple-50 border-purple-200",
    },
    {
      label: "Corridor Efficiency",
      value: "99.4% On-Time",
      icon: Zap,
      color: "text-teal-700",
      bg: "bg-teal-50 border-teal-200",
    },
  ];

  return (
    <div className="w-full bg-slate-100 border-y border-slate-200 py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex items-center space-x-3 px-3.5 py-3 rounded-2xl border shadow-sm ${stat.bg}`}
              >
                <div className={`p-2.5 rounded-xl bg-white shadow-xs ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 tracking-tight">
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

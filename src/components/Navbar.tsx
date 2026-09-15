"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bus, MapPin, Navigation, Bell, Activity, Menu, X, ShieldCheck } from "lucide-react";

export function Navbar({ activeBusesCount = 48 }: { activeBusesCount?: number }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Live Map", href: "/map", icon: MapPin },
    { name: "Stations & ETAs", href: "/stations", icon: Bus },
    { name: "Trip Planner", href: "/planner", icon: Navigation },
    { name: "Service Alerts", href: "/alerts", icon: Bell },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 shadow-2xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-[#006B38] flex items-center justify-center shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform duration-300 ring-2 ring-emerald-400/30">
              <Bus className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">
                  DART<span className="text-emerald-400">-Live</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Mwendokasi
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                Dar Rapid Transit Real-Time
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-inner shadow-emerald-500/10"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Live Status Badge & Stream Indicator */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-slate-900/80 border border-emerald-500/25 shadow-inner">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  Live Network
                </span>
              </div>
              <div className="h-4 w-px bg-slate-700" />
              <div className="flex items-center space-x-1.5 text-xs text-slate-200 font-medium">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span><strong className="text-white font-bold">{activeBusesCount}</strong> Buses Streamed</span>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-xs text-slate-400 px-3 py-1.5 rounded-lg bg-slate-800/40 border border-white/5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>DART Phase 1</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                <Icon className="w-5 h-5 text-emerald-400" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

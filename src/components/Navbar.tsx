"use client";

import Image from "next/image";
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
    <header className="sticky top-0 z-50 w-full bg-white/90 border-b border-slate-200/80 shadow-sm backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md shadow-emerald-900/20 border border-emerald-300 group-hover:scale-105 transition-transform duration-300 bg-emerald-950">
              <Image
                src="/images/dart_logo.jpg"
                alt="DART-Live Official Mwendokasi Logo"
                fill
                className="object-cover object-bottom"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                  DART<span className="text-[#006B38]">-Live</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-[#006B38] border border-emerald-200 rounded-full">
                  Mwendokasi
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
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
                      ? "bg-emerald-50 text-[#006B38] border border-emerald-200 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#006B38]" : "text-slate-400"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Live Status Badge & Stream Indicator */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-[#006B38] uppercase tracking-wide">
                  Live Network
                </span>
              </div>
              <div className="h-4 w-px bg-slate-300" />
              <div className="flex items-center space-x-1.5 text-xs text-slate-700 font-medium">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span><strong className="text-slate-900 font-bold">{activeBusesCount}</strong> Buses Live</span>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-xs text-slate-600 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#006B38]" />
              <span>DART Phase 1</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3">
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
                    ? "bg-emerald-50 text-[#006B38] border border-emerald-200"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-5 h-5 text-[#006B38]" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

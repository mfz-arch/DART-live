"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bus, MapPin, Navigation, Bell, Activity, Menu, X, ShieldCheck, User, UserPlus, LogIn, LogOut, CreditCard } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";

export function Navbar({ activeBusesCount = 48 }: { activeBusesCount?: number }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; phone: string; cardBalance: number } | null>(null);

  const navLinks = [
    { name: "Live Map", href: "/map", icon: MapPin },
    { name: "Stations & ETAs", href: "/stations", icon: Bus },
    { name: "Trip Planner", href: "/planner", icon: Navigation },
    { name: "Service Alerts", href: "/alerts", icon: Bell },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 border-b border-slate-200/80 shadow-sm backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Brand Identity */}
            <Link href="/" className="flex items-center space-x-3 group shrink-0">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-slate-200 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/dart_icon.png"
                  alt="DART-Live Official Mwendokasi App Icon"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center space-x-2 whitespace-nowrap">
                  <span className="text-2xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
                    DART<span className="text-[#006B38]">-Live</span>
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-[#006B38] border border-emerald-200 rounded-full whitespace-nowrap">
                    Mwendokasi
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block shrink-0" />
                  Dar Rapid Transit Real-Time
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-emerald-50 text-[#006B38] border border-emerald-200 shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#006B38]" : "text-slate-400"}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Live Network & Auth Section */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Live Status Badge */}
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-bold text-[#006B38] uppercase text-[10px] tracking-wider">
                  Live
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-700 font-semibold">{activeBusesCount} Buses</span>
              </div>

              {/* User Authentication Actions */}
              {user ? (
                <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 p-1.5 pl-3 rounded-2xl shadow-xs">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 leading-tight">{user.name}</span>
                    <span className="text-[10px] text-[#006B38] font-semibold flex items-center gap-1">
                      <CreditCard className="w-3 h-3 text-[#006B38]" /> Card: {user.cardBalance.toLocaleString()} TSh
                    </span>
                  </div>
                  <button
                    onClick={() => setUser(null)}
                    title="Sign Out"
                    className="p-1.5 rounded-xl bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center space-x-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5 text-[#006B38]" />
                    <span>Log in</span>
                  </button>

                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#006B38] hover:bg-emerald-700 text-white transition-all shadow-sm shadow-emerald-900/20 flex items-center space-x-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Account</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
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
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
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

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {user ? (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm block text-slate-900">{user.name}</span>
                    <span className="text-xs text-[#006B38] font-bold">Balance: {user.cardBalance} TSh</span>
                  </div>
                  <button
                    onClick={() => setUser(null)}
                    className="px-3 py-1.5 rounded-lg bg-white text-xs font-bold text-rose-600 border border-rose-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthModalOpen(true);
                    }}
                    className="w-full py-3 rounded-xl bg-slate-100 font-bold text-sm text-slate-800"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthModalOpen(true);
                    }}
                    className="w-full py-3 rounded-xl bg-[#006B38] font-bold text-sm text-white shadow-md"
                  >
                    Create Account
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal Popup */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(loggedInUser) => setUser(loggedInUser)}
      />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { X, Lock, Mail, Phone, User, Bus, CreditCard, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; phone: string; cardBalance: number }) => void;
  initialMode?: "LOGIN" | "SIGNUP";
}

export function AuthModal({ isOpen, onClose, onLoginSuccess, initialMode = "LOGIN" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"LOGIN" | "SIGNUP">(initialMode);
  const [loading, setLoading] = useState(false);

  // Synchronize tab with initialMode when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialMode);
    }
  }, [isOpen, initialMode]);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+255 7");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [favoriteLine, setFavoriteLine] = useState("EXP-101");
  const [cardNumber, setCardNumber] = useState("8420-1920-5510");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        name: name || (activeTab === "LOGIN" ? "Amani Juma" : name),
        phone: phone || "+255 712 345 678",
        cardBalance: 4500,
      });
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header Branding */}
        <div className="bg-[#006B38] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-md">
              <Image
                src="/images/dart_icon.png"
                alt="DART Icon"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold tracking-tight">DART-Live Commuter</h3>
              <p className="text-xs text-emerald-100 font-medium">Mwendokasi Smart Pass Account</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setActiveTab("LOGIN")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "LOGIN"
                ? "border-[#006B38] text-[#006B38] bg-white"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("SIGNUP")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "SIGNUP"
                ? "border-[#006B38] text-[#006B38] bg-white"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {activeTab === "SIGNUP" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Amani Juma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#006B38] focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tanzania Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                required
                placeholder="+255 712 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#006B38] focus:bg-white transition-all"
              />
            </div>
          </div>

          {activeTab === "SIGNUP" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Preferred DART Line
              </label>
              <div className="relative">
                <Bus className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <select
                  value={favoriteLine}
                  onChange={(e) => setFavoriteLine(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#006B38] focus:bg-white transition-all"
                >
                  <option value="EXP-101">EXP-101 (Kimara - Kivukoni Express)</option>
                  <option value="LOC-102">LOC-102 (Kimara - Gerezani Local)</option>
                  <option value="EXP-103">EXP-103 (Morocco - Kivukoni Express)</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#006B38] focus:bg-white transition-all"
              />
            </div>
          </div>

          {activeTab === "SIGNUP" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                DART Smart Card ID (Optional)
              </label>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="8420-1920-5510"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#006B38] focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#006B38] hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md shadow-emerald-900/20 disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
            ) : (
              <>
                <span>{activeTab === "LOGIN" ? "Sign In to Account" : "Register Commuter Pass"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center space-x-1 text-[11px] text-slate-500 font-medium pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#006B38]" />
            <span>Encrypted DART Smart Transit Validation</span>
          </div>
        </form>
      </div>
    </div>
  );
}

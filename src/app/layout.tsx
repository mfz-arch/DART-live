import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DART-Live | Mwendokasi Real-Time Transit Platform Dar es Salaam",
  description: "Live real-time bus tracking, station arrival countdowns (ETA), corridor mapping, and trip planning for Dar Rapid Transit (DART Mwendokasi) in Dar es Salaam, Tanzania.",
  keywords: ["DART", "Mwendokasi", "Dar es Salaam", "Tanzania", "BRT", "Bus Rapid Transit", "Real-Time Tracking", "Kivukoni", "Kimara", "Ubungo"],
  openGraph: {
    title: "DART-Live | Real-Time Mwendokasi Bus Tracking",
    description: "Track DART BRT buses live in Dar es Salaam with real-time GPS locations and arrival ETAs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-white text-slate-900 min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        
        {/* Footer */}
        <footer className="w-full bg-slate-50 border-t border-slate-200 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold tracking-tight text-slate-900">
                    DART<span className="text-[#006B38]">-Live</span>
                  </span>
                  <span className="text-xs bg-emerald-100 text-[#006B38] font-bold px-2 py-0.5 rounded border border-emerald-300">
                    Phase 1 Network
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Empowering commuters in Dar es Salaam with real-time transit intelligence.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
                <span>Built for Mwendokasi Corridors</span>
                <span>•</span>
                <span>WebSocket / SSE API Enabled</span>
                <span>•</span>
                <span>Dar es Salaam, Tanzania</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

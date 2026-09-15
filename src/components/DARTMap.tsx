"use client";

import dynamic from "next/dynamic";
import { BusStreamMessage, StationData } from "@/types/dart";

interface DARTMapProps {
  buses: BusStreamMessage[];
  selectedLineFilter: string;
  onSelectStation?: (station: StationData) => void;
  onSelectBus?: (bus: BusStreamMessage) => void;
}

const DynamicMap = dynamic(() => import("./DARTMapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-[#090d16] flex flex-col items-center justify-center space-y-3">
      <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin" />
      <p className="text-sm text-slate-400 font-medium animate-pulse">
        Initializing Dar es Salaam BRT Transit Map...
      </p>
    </div>
  ),
});

export function DARTMap(props: DARTMapProps) {
  return <DynamicMap {...props} />;
}

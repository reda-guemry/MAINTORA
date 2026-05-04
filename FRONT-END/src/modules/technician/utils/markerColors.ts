import type { TechnicianMapMachine } from "@/features/technician-map";



export const markerColors: Record<
  TechnicianMapMachine["status"],
  {
    accent: string;
    glow: string;
    bg: string;
  }
> = {
  active: {
    accent: "#3b8f88",
    glow: "rgba(59, 143, 136, 0.30)",
    bg: "#eef7f6",
  },
  anomalous: {
    accent: "#d9534f",
    glow: "rgba(234, 123, 38, 0.28)",
    bg: "#fff3ea",
  },
  maintenance: {
    accent: "#d58a1d",
    glow: "rgba(59, 143, 136, 0.30)",
    bg: "#eef7f6",
  },
};
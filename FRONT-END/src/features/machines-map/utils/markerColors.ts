import type { MachinesMapStatus } from "../types/machinesMap";

export const machineMarkerColors: Record<
  MachinesMapStatus,
  {
    accent: string;
    glow: string;
    bg: string;
  }
> = {
  active: {
    accent: "#3b8f88",
    glow: "rgba(59, 143, 136, 0.35)",
    bg: "#f0f7f6",
  },
  anomalous: {
    accent: "#d9534f",
    glow: "rgba(217, 83, 79, 0.35)",
    bg: "#fdf3f2",
  },
  maintenance: {
    accent: "#d58a1d",
    glow: "rgba(213, 138, 29, 0.35)",
    bg: "#fcf6ec",
  },
};

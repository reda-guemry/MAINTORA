
import type { ApiResponse } from "@/shared/types/api.types";

export type TechnicianMapMachineStatus = "active" | "anomalous" | "maintenance";

export type TechnicianMapMachine = {
  id: number;
  code: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: TechnicianMapMachineStatus;
};

export type TechnicianMachinesResponse = ApiResponse<TechnicianMapMachine[]>;

export type CoordinatePoint = {
  latitude: number;
  longitude: number;
};

export type TechnicianAssetMapProps = {
  machines: TechnicianMapMachine[];
  selectedMachineId?: number | null;
  onMarkerSelect?: (machine: TechnicianMapMachine) => void;
  onMapBackgroundClick?: () => void;
  routeOrigin?: CoordinatePoint | null;
};



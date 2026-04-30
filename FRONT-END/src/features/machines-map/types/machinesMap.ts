import type { ApiResponse } from "@/shared/types/api.types";

export type MachinesMapStatus = "active" | "anomalous" | "maintenance";

export type MachinesMapOwner = {
  id: number;
  first_name: string;
  last_name: string;
};

export type MachinesMapMachine = {
  id: number;
  code: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: MachinesMapStatus;
  created_by?: MachinesMapOwner | null;
  active_anomalies_count?: number;
};

export type MachinesMapResponse = ApiResponse<MachinesMapMachine[]>;

export type MachinesAssetMapProps<TMachine extends MachinesMapMachine> = {
  machines: TMachine[];
  selectedMachineId?: number | null;
  onMarkerSelect?: (machine: TMachine) => void;
  onMapBackgroundClick?: () => void;
};

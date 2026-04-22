import type { TechnicianMapMachine } from "@/features/technician-map";



export function getStatusClasses(status: TechnicianMapMachine["status"]) {
    if (status === "anomalous") {
        return "border-[#f7c79f] bg-[#fff2e8] text-[#d8711f]";
    }

    if (status === "maintenance") {
        return "border-[#b9dfdc] bg-[#edf8f7] text-[#398e8e]";
    }

    return "border-[#b9dfdc] bg-[#edf8f7] text-[#398e8e]";
}

export function getStatusLabel(status: TechnicianMapMachine["status"]) {
  if (status === "anomalous") {
    return "Critical alarm";
  }

  if (status === "maintenance") {
    return "Maintenance zone";
  }

  return "Operational";
}


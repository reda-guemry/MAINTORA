import type { ReactNode } from "react";
import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/utils";

type MapSidebarProps = {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClose?: () => void;
  onToggle?: () => void;
  showToggle?: boolean;
  closeLabel?: string;
  className?: string;
  contentClassName?: string;
};

type MachineInfoCardProps = {
  machineData: {
    code: string;
    name: string;
    status: string;
    location?: string | null;
  };
  statusClassName?: string;
  children?: ReactNode;
};

type DetailRowProps = {
  icon: string;
  label: string;
  value: ReactNode;
};

export type MapSidebarAction = {
  label: string;
  icon?: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
};

type ActionButtonsProps = {
  actions: MapSidebarAction[];
  columns?: 1 | 2;
};

export function MapSidebar({
  isOpen,
  title,
  subtitle,
  children,
  onClose,
  onToggle,
  showToggle = false,
  closeLabel = "Clear",
  className,
  contentClassName,
}: MapSidebarProps) {
  return (
    <>
      {showToggle && onToggle && (
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            "pointer-events-auto absolute top-4 z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-md transition-all duration-300 hover:bg-gray-50 hover:text-[#388E8E]",
            isOpen ? "left-89 max-md:left-5" : "left-4",
          )}
          aria-label="Toggle sidebar"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isOpen ? "menu_open" : "menu"}
          </span>
        </button>
      )}

      <aside
        className={cn(
          "pointer-events-auto absolute left-0 top-0 z-20 flex h-full w-full max-w-85 flex-col overflow-hidden border-r border-gray-200 bg-[#FAFAFA] shadow-xl transition-all duration-300 ease-out",
          "max-md:inset-x-3 max-md:bottom-3 max-md:top-auto max-md:h-auto max-md:max-h-[82%] max-md:max-w-none max-md:rounded-3xl max-md:border max-md:border-gray-200",
          isOpen
            ? "translate-x-0 opacity-100 max-md:translate-y-0"
            : "-translate-x-full opacity-0 max-md:translate-x-0 max-md:translate-y-[110%]",
          className,
        )}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-gray-200 bg-white px-5 py-5">
          <div className="min-w-0">
            <h2 className="truncate text-[16px] font-bold text-[#1A1A1A]">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-0.5 truncate text-[12px] text-gray-500">
                {subtitle}
              </p>
            )}
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-500 transition-colors hover:border-[#388E8E]/30 hover:bg-[#eef7f6] hover:text-[#388E8E]"
            >
              {closeLabel}
            </button>
          )}
        </div>

        <div
          className={cn(
            "custom-scrollbar flex-1 overflow-y-auto p-4",
            contentClassName,
          )}
        >
          {children}
        </div>
      </aside>
    </>
  );
}

export function MachineInfoCard({
  machineData,
  statusClassName,
  children,
}: MachineInfoCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="truncate text-[11px] font-bold uppercase tracking-wider text-gray-400">
          {machineData.code}
        </span>
        <span
          className={cn(
            "shrink-0 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            statusClassName,
          )}
        >
          {machineData.status}
        </span>
      </div>

      <h3 className="text-[15px] font-bold text-[#1A1A1A]">
        {machineData.name}
      </h3>

      {machineData.location && (
        <p className="mt-1 text-[12px] font-medium text-gray-500">
          {machineData.location}
        </p>
      )}

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

export function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef7f6] text-[#388E8E]">
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
          {label}
        </p>
        <div className="truncate text-[13px] font-bold text-[#1A1A1A]">
          {value}
        </div>
      </div>
    </div>
  );
}

export function ActionButtons({ actions, columns = 1 }: ActionButtonsProps) {
  if (actions.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 2 && actions.length > 1 ? "grid-cols-2" : "grid-cols-1",
      )}
    >
      {actions.map((action) => (
        <Button
          key={action.label}
          type="button"
          variant={action.variant === "primary" ? undefined : action.variant}
          disabled={action.disabled}
          onClick={action.onClick}
          className={cn(
            "flex items-center justify-center gap-2 rounded-lg py-3 text-[11px] font-bold uppercase tracking-wider",
            action.variant === "primary" || !action.variant
              ? "bg-[#388E8E] text-white hover:bg-[#2c7a7a]"
              : "",
          )}
        >
          <div className="flex items-center gap-2">
          {action.icon && (
            <span className="material-symbols-outlined text-[16px]">
              {action.icon}
            </span>
          )}

          <span>{action.label}</span>

          </div>
        </Button>
      ))}
    </div>
  );
}

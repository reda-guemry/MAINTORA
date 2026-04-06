import { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";
import type { InputProps } from "./Input.type";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError = false, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full rounded-lg border bg-white px-4 py-3 text-sm text-text-main outline-none transition-colors",
          "placeholder:text-text-muted/60",
          "focus:ring-2 focus:ring-primary/20",
          hasError
            ? "border-red-500 focus:border-red-500"
            : "border-neutral-gray focus:border-primary",
          "disabled:cursor-not-allowed disabled:bg-background-light disabled:opacity-70",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

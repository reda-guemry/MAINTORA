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
          "w-full rounded-md border bg-white px-3 py-2 text-sm outline-none transition",
          "placeholder:text-gray-400",
          "focus:ring-2 focus:ring-black/10",
          hasError
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-gray-900",
          "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70",
          className,
        )}

        {...props} 

      />
    );
  },
);

Input.displayName = "Input";

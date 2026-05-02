import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FormField, Input } from "@/shared/components/ui";
import type {
  AddUserModalProps,
  AddUserPayload,
} from "../types/usersComponents";
import { useUserRoles } from "../hooks/useRoles";
import { cn } from "@/shared/utils/cn";

const defaultValues: AddUserPayload = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  role: "",
  password: "",
  password_confirmation: "",
};

export function AddUserModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: AddUserModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddUserPayload>({
    defaultValues,
  });

  const { roles } = useUserRoles();

  useEffect(() => {
    if (!isOpen) {
      reset(defaultValues);
    }
  }, [isOpen, reset]);

  if (!isOpen) {
    return null;
  }

  const submitHandler = (data: AddUserPayload) => {
    onSubmit(data);
  };

  function handleClose() {
    reset(defaultValues);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[32px] bg-white shadow-2xl ring-1 ring-slate-100">
        <div className="border-b border-slate-100 px-8 py-6">
          <h3 className="text-xl font-black text-slate-900">Add New Account</h3>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Register a new system user and assign access privileges.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="space-y-5 px-8 py-6"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField label="First name" htmlFor="first_name" required>
              <Input
                id="first_name"
                {...register("first_name", {
                  required: "First name is required",
                })}
                hasError={!!errors.first_name}
                placeholder="John"
                className="rounded-xl border-slate-200 bg-slate-50 focus:border-[#43968C] focus:bg-white focus:ring-[#43968C]/10"
              />
              {errors.first_name && (
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
                  {errors.first_name.message}
                </p>
              )}
            </FormField>

            <FormField label="Last name" htmlFor="last_name" required>
              <Input
                id="last_name"
                {...register("last_name", {
                  required: "Last name is required",
                })}
                hasError={!!errors.last_name}
                placeholder="Doe"
                className="rounded-xl border-slate-200 bg-slate-50 focus:border-[#43968C] focus:bg-white focus:ring-[#43968C]/10"
              />
              {errors.last_name && (
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
                  {errors.last_name.message}
                </p>
              )}
            </FormField>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField label="Email Address" htmlFor="email" required>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                hasError={!!errors.email}
                placeholder="john.doe@example.com"
                className="rounded-xl border-slate-200 bg-slate-50 focus:border-[#43968C] focus:bg-white focus:ring-[#43968C]/10"
              />
              {errors.email && (
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
                  {errors.email.message}
                </p>
              )}
            </FormField>

            <FormField label="Phone Number" htmlFor="phone" required>
              <Input
                id="phone"
                {...register("phone", {
                  required: "Phone is required",
                })}
                hasError={!!errors.phone}
                placeholder="+212 600 000 000"
                className="rounded-xl border-slate-200 bg-slate-50 focus:border-[#43968C] focus:bg-white focus:ring-[#43968C]/10"
              />
              {errors.phone && (
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </FormField>
          </div>

          <FormField label="System Role" htmlFor="role" required>
            <select
              id="role"
              {...register("role", {
                required: "Role is required",
              })}
              className={cn(
                "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition-all",
                "focus:border-[#43968C] focus:bg-white focus:ring-4 focus:ring-[#43968C]/10",
                "disabled:cursor-not-allowed disabled:opacity-50",
                !!errors.role && "border-red-400 focus:border-red-400 focus:ring-red-400/10"
              )}
            >
              <option value="">Select an access level</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
                {errors.role.message}
              </p>
            )}
          </FormField>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField label="Password" htmlFor="password" required>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                })}
                hasError={!!errors.password}
                placeholder="••••••••"
                className="rounded-xl border-slate-200 bg-slate-50 focus:border-[#43968C] focus:bg-white focus:ring-[#43968C]/10"
              />
              {errors.password && (
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
                  {errors.password.message}
                </p>
              )}
            </FormField>

            <FormField
              label="Confirm Password"
              htmlFor="password_confirmation"
              required
            >
              <Input
                id="password_confirmation"
                type="password"
                {...register("password_confirmation", {
                  required: "Please confirm your password",
                })}
                hasError={!!errors.password_confirmation}
                placeholder="••••••••"
                className="rounded-xl border-slate-200 bg-slate-50 focus:border-[#43968C] focus:bg-white focus:ring-[#43968C]/10"
              />
              {errors.password_confirmation && (
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
                  {errors.password_confirmation.message}
                </p>
              )}
            </FormField>
          </div>

          <div className="mt-8 flex justify-end gap-3 border-t border-slate-50 pt-6">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={handleClose}
              className="rounded-xl px-6 py-2.5 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              Cancel
            </Button>

            <Button 
              type="submit" 
              isLoading={isLoading}
              className="rounded-xl bg-[#43968C] px-8 py-2.5 text-xs font-black uppercase tracking-widest text-white hover:bg-[#367a72] active:scale-95 transition-all shadow-lg shadow-teal-900/10"
            >
              {isLoading ? "Creating..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FormField, Input } from "@/shared/components/ui";
import type { EditUserModalProps, EditUserPayload } from "../types/usersComponents";
import { useUserRoles } from "../hooks/useRoles";
import { cn } from "@/shared/utils/cn";

export function EditUserModal({
  user,
  onClose,
  onSubmit,
  isLoading = false,
  editError = null,
}: EditUserModalProps) {
  const { roles } = useUserRoles();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserPayload>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      role: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      role: user.roles?.[0]?.id ?? "",
    });
  }, [user, reset]);

  if (!user) {
    return null;
  }

  const submitHandler = (data: EditUserPayload) => {
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-4xl bg-white shadow-2xl ring-1 ring-slate-100">
        <div className="border-b border-slate-100 px-8 py-6">
          <h3 className="text-xl font-black text-slate-900">Edit Account Details</h3>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Update user information and modify access privileges.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="space-y-5 px-8 py-6"
        >
          {editError && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-xs font-bold text-red-600">
              <span className="material-symbols-outlined text-[16px]">error</span>
              {editError}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField label="First name" htmlFor="first_name" required>
              <Input
                id="first_name"
                {...register("first_name", {
                  required: "First name is required",
                })}
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

          <div className="mt-8 flex justify-end gap-3 border-t border-slate-50 pt-6">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={onClose}
              className="rounded-xl px-6 py-2.5 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              Cancel
            </Button>

            <Button 
              type="submit" 
              isLoading={isLoading}
              className="rounded-xl bg-[#43968C] px-8 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-teal-900/10 transition-all hover:bg-[#367a72] active:scale-95"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
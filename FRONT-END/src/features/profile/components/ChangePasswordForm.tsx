import { useForm } from "react-hook-form";
import { Button, FormField, Input } from "@/shared/components/ui";
import type { PasswordPayload } from "../types/profile";

type ChangePasswordFormProps = {
  isLoading: boolean;
  onSubmit: (payload: PasswordPayload) => Promise<boolean>;
};

export function ChangePasswordForm({
  isLoading,
  onSubmit,
}: ChangePasswordFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordPayload>({
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  async function submitHandler(payload: PasswordPayload) {
    const ok = await onSubmit(payload);

    if (ok) {
      reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm"
    >
      <div className="mb-8 border-b border-slate-100 pb-6">
        <h2 className="text-xl font-black tracking-tight text-slate-900">
          Change Password
        </h2>
        <p className="mt-1.5 text-xs font-medium text-slate-500">
          Ensure your account stays secure by using a strong password.
        </p>
      </div>

      <div className="space-y-6">
        <FormField
          label="Current password"
          htmlFor="current_password"
          required
        >
          <Input
            id="current_password"
            type="password"
            {...register("current_password", {
              required: "Current password is required",
            })}
            className="rounded-xl border-slate-200 bg-slate-50 focus:border-[#43968C] focus:bg-white focus:ring-[#43968C]/10"
          />
          {errors.current_password && (
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
              {errors.current_password.message}
            </p>
          )}
        </FormField>

        <FormField label="New password" htmlFor="new_password" required>
          <Input
            id="new_password"
            type="password"
            {...register("new_password", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "New password must be at least 8 characters",
              },
            })}
            className="rounded-xl border-slate-200 bg-slate-50 focus:border-[#43968C] focus:bg-white focus:ring-[#43968C]/10"
          />
          {errors.new_password && (
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
              {errors.new_password.message}
            </p>
          )}
        </FormField>

        <FormField
          label="Confirm new password"
          htmlFor="new_password_confirmation"
          required
        >
          <Input
            id="new_password_confirmation"
            type="password"
            {...register("new_password_confirmation", {
              required: "Please confirm your new password",
              validate: (value, formValues) =>
                value === formValues.new_password || "Passwords do not match",
            })}
            className="rounded-xl border-slate-200 bg-slate-50 focus:border-[#43968C] focus:bg-white focus:ring-[#43968C]/10"
          />
          {errors.new_password_confirmation && (
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
              {errors.new_password_confirmation.message}
            </p>
          )}
        </FormField>
      </div>

      <div className="mt-8 flex justify-end border-t border-slate-50 pt-6">
        <Button 
          type="submit" 
          isLoading={isLoading}
          className="rounded-xl bg-[#43968C] px-8 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-teal-900/10 transition-all hover:bg-[#367a72] active:scale-95"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
}
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
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-lg font-black text-gray-900">Change Password</h2>
        <p className="mt-1 text-sm text-gray-500">
          Confirm your current password before setting a new one.
        </p>
      </div>

      <div className="space-y-4">
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
          />
          {errors.current_password && (
            <p className="mt-1 text-sm text-red-500">
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
          />
          {errors.new_password && (
            <p className="mt-1 text-sm text-red-500">
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
          />
          {errors.new_password_confirmation && (
            <p className="mt-1 text-sm text-red-500">
              {errors.new_password_confirmation.message}
            </p>
          )}
        </FormField>
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          Update Password
        </Button>
      </div>
    </form>
  );
}

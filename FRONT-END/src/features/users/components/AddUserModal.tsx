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

  const { roles, error } = useUserRoles();

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900">Add New User</h3>
          <p className="mt-1 text-sm text-gray-500">
            Create a new user account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="space-y-4 px-6 py-5"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="First name" htmlFor="first_name" required>
              <Input
                id="first_name"
                {...register("first_name", {
                  required: "First name is required",
                })}
                hasError={!!errors.first_name}
                placeholder="John"
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-500">
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
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.last_name.message}
                </p>
              )}
            </FormField>
          </div>

          <FormField label="Email" htmlFor="email" required>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              hasError={!!errors.email}
              placeholder="john.doe@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </FormField>

          <FormField label="phone" htmlFor="phone" required>
            <Input
              id="phone"
              {...register("phone", {
                required: "Phone is required",
              })}
              hasError={!!errors.phone}
              placeholder="123-456-7890"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </FormField>

          <FormField label="Role" htmlFor="role" required>
            <select
              id="role"
              {...register("role", {
                required: "Role is required",
              })}
              className={cn(
                "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-text-main outline-none transition-colors",
                "placeholder:text-text-muted/60",
                "focus:ring-2 focus:ring-primary/20",
                "disabled:cursor-not-allowed disabled:bg-background-light disabled:opacity-70",
                !!errors.role && "border-red-500 focus:border-red-500"
              )}

            >
                <option value="">Select Role</option>
                {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                        {role.name}
                    </option>
                ))}
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
            )}
          </FormField>

          <FormField label="Password" htmlFor="password" required>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              hasError={!!errors.password}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
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
            />
            {errors.password_confirmation && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password_confirmation.message}
              </p>
            )}
          </FormField>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>

            <Button type="submit" isLoading={isLoading}>
              {isLoading ? "Creating..." : "Create User"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

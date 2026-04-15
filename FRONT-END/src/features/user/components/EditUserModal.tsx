import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FormField, Input } from "@/shared/components/ui";
import type { EditUserModalProps, EditUserPayload } from "../types/usersComponents";
import { useUserRoles } from "../hooks/useRoles";



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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900">Edit User</h3>
          <p className="mt-1 text-sm text-gray-500">
            Update user details.
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
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </FormField>

          <FormField label="Phone" htmlFor="phone" required>
            <Input
              id="phone"
              {...register("phone", {
                required: "Phone is required",
              })}
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
              className=" border  p-1.5 rounded-md w-full focus:ring-primary focus:border-primary"
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
              
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">
                {errors.role.message}
              </p>
            )}
          </FormField>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" isLoading={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          {editError && (
            <p className="mt-4 text-center text-sm text-red-500">
              {editError}
            </p>
          )}

        </form>
      </div>
    </div>
  );
}

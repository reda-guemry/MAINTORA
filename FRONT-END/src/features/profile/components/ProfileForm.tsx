import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, FormField, Input } from "@/shared/components/ui";
import type { User } from "@/features/auth";
import type { ProfilePayload } from "../types/profile";

type ProfileFormProps = {
  profile: User;
  isLoading: boolean;
  onSubmit: (payload: ProfilePayload) => Promise<boolean>;
};

export function ProfileForm({
  profile,
  isLoading,
  onSubmit,
}: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfilePayload>({
    defaultValues: {
      first_name: profile.first_name ?? "",
      last_name: profile.last_name ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? "",
    },
  });

  useEffect(() => {
    reset({
      first_name: profile.first_name ?? "",
      last_name: profile.last_name ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? "",
    });
  }, [profile, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-lg font-black text-gray-900">Profile Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your personal account details.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="First name" htmlFor="profile_first_name" required>
          <Input
            id="profile_first_name"
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

        <FormField label="Last name" htmlFor="profile_last_name" required>
          <Input
            id="profile_last_name"
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

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Email" htmlFor="profile_email" required>
          <Input
            id="profile_email"
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </FormField>

        <FormField label="Phone" htmlFor="profile_phone">
          <Input id="profile_phone" {...register("phone")} />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </FormField>
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          Save Profile
        </Button>
      </div>
    </form>
  );
}

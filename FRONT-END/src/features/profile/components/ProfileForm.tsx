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
      className="rounded-4xl border border-slate-200/60 bg-white p-8 shadow-sm"
    >
      <div className="mb-8 border-b border-slate-100 pb-6">
        <h2 className="text-xl font-black tracking-tight text-slate-900">
          Profile Information
        </h2>
        <p className="mt-1.5 text-xs font-medium text-slate-500">
          Update your personal account details and contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField label="First name" htmlFor="profile_first_name" required>
          <Input
            id="profile_first_name"
            {...register("first_name", {
              required: "First name is required",
            })}
            className="rounded-xl border-slate-200 bg-slate-50 focus:border-[#43968C] focus:bg-white "
          />
          {errors.first_name && (
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
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
            className="rounded-xl border-slate-200 bg-slate-50 focus:border-[#43968C] focus:bg-white "
          />
          {errors.last_name && (
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
              {errors.last_name.message}
            </p>
          )}
        </FormField>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField label="Email Address" htmlFor="profile_email" required>
          <Input
            id="profile_email"
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            className="rounded-xl border-slate-200 bg-slate-50 focus:border-[#43968C] focus:bg-white "
          />
          {errors.email && (
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
              {errors.email.message}
            </p>
          )}
        </FormField>

        <FormField label="Phone Number" htmlFor="profile_phone">
          <Input 
            id="profile_phone" 
            {...register("phone")} 
            className="rounded-xl border-slate-200 bg-slate-50 focus:border-[#43968C] focus:bg-white "
          />
          {errors.phone && (
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-red-500">
              {errors.phone.message}
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
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </form>
  );
}
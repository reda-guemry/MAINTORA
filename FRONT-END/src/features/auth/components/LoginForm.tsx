import { Button, Checkbox, FormField, Input } from "@/shared/components/ui";
import { useForm } from "react-hook-form";
import type { LoginRequest, onSuccess } from "../types/auth.type";
import useLogin from "../hooks/useLogin";

export function LoginForm({ onSuccess }: onSuccess) {
  const { loginUser, isLoading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginRequest) => {
    const result = await loginUser(data);
    onSuccess(result.data.user.roles ?? []);
  };

  return (
    <div className="rounded-xl border border-neutral-gray bg-white p-8 shadow-xl shadow-primary/5">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-main">Sign In</h2>
        <p className="mt-1 text-sm text-text-muted">
          Access your industrial assets dashboard
        </p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Email" htmlFor="email" required>
          <Input
            id="email"
            type="email"
            placeholder="m.smith@facility.com"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </FormField>

        <FormField label="Password" htmlFor="password" required>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </FormField>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <Checkbox id="remember" label="Remember me" />

          <button
            type="button"
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-8 flex flex-col items-center gap-3 border-t border-neutral-gray/50 pt-6">
        <p className="text-xs text-text-muted">
          Engineering Team Portal © 2024
        </p>
      </div>
    </div>
  );
}

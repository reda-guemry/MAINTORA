import { Alert } from "@/shared/components/feedback";
import { Spinner } from "@/shared/components/ui";
import { ChangePasswordForm } from "../components/ChangePasswordForm";
import { ProfileForm } from "../components/ProfileForm";
import { useProfile } from "../hooks/useProfile";

export function ProfilePage() {
  const {
    profile,
    isLoading,
    isUpdatingProfile,
    isUpdatingPassword,
    error,
    profileSuccess,
    passwordSuccess,
    updateProfile,
    updatePassword,
  } = useProfile();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
        <Spinner size="lg" />
        <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Loading profile
        </span>
      </div>
    );
  }

  if (!profile) {
    return (
      <Alert variant="error" title="Profile unavailable">
        Unable to load your profile right now.
      </Alert>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Edit Profile
        </h1>
        <p className="mt-1.5 text-sm text-gray-500">
          Manage your own account information and password.
        </p>
      </div>

      {error && (
        <Alert variant="error" title="Profile action failed">
          {error}
        </Alert>
      )}

      {profileSuccess && (
        <Alert variant="success" title="Profile saved">
          {profileSuccess}
        </Alert>
      )}

      {passwordSuccess && (
        <Alert variant="success" title="Password saved">
          {passwordSuccess}
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <ProfileForm
          profile={profile}
          isLoading={isUpdatingProfile}
          onSubmit={updateProfile}
        />
        <ChangePasswordForm
          isLoading={isUpdatingPassword}
          onSubmit={updatePassword}
        />
      </div>
    </div>
  );
}

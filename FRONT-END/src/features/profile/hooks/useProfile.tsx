import { useEffect, useState } from "react";
import { useAuth } from "@/context/useAuth";
import { useApi } from "@/shared/hooks/useApi";
import type {
  PasswordPayload,
  PasswordResponse,
  ProfilePayload,
  ProfileResponse,
} from "../types/profile";

export function useProfile() {
  const { callApi } = useApi();
  const { access_token, setAuth } = useAuth();
  const [profile, setProfile] = useState<ProfileResponse["data"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  async function fetchProfile(showLoading = true) {
    try {
      if (showLoading) {
        setIsLoading(true);
      }

      setError(null);

      const response = await callApi<ProfileResponse>("profile", {
        method: "GET",
      });

      setProfile(response.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load profile";
      setError(message);
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  }

  async function updateProfile(payload: ProfilePayload) {
    try {
      setIsUpdatingProfile(true);
      setError(null);
      setProfileSuccess(null);

      const response = await callApi<ProfileResponse>("profile", {
        method: "PUT",
        body: payload,
      });

      setProfile(response.data);

      if (access_token) {
        setAuth(response.data, access_token);
      }

      setProfileSuccess("Profile updated successfully.");
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update profile";
      setError(message);
      return false;
    } finally {
      setIsUpdatingProfile(false);
    }
  }

  async function updatePassword(payload: PasswordPayload) {
    try {
      setIsUpdatingPassword(true);
      setError(null);
      setPasswordSuccess(null);

      await callApi<PasswordResponse>("profile/password", {
        method: "PUT",
        body: payload,
      });

      setPasswordSuccess("Password updated successfully.");
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update password";
      setError(message);
      return false;
    } finally {
      setIsUpdatingPassword(false);
    }
  }

  useEffect(() => {
    fetchProfile(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    profile,
    isLoading,
    isUpdatingProfile,
    isUpdatingPassword,
    error,
    profileSuccess,
    passwordSuccess,
    fetchProfile,
    updateProfile,
    updatePassword,
  };
}

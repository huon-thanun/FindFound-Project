import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/api/api";

export const useProfileStore = defineStore("profile", () => {
  const profile = ref(null);
  const isLoadingProfile = ref(false);
  const error = ref(null);

  const fetchProfile = async () => {
    isLoadingProfile.value = true;
    error.value = null;
    try {
      const res = await api.get("/auth/profile");
      profile.value = res.data.data;
    } catch (err) {
      console.error("Fetch profile error:", err);
      error.value = err.response?.data?.message || "Failed to fetch profile";
    } finally {
      isLoadingProfile.value = false;
    }
  };

  const updateProfile = async (payload) => {
    isLoadingProfile.value = true;
    error.value = null;
    try {
      const res = await api.put("/auth/profile", payload);
      if (res.data.result) {
        profile.value = res.data.data;
      }
      return res.data;
    } catch (err) {
      console.error("Update profile error:", err);
      error.value = err.response?.data?.message || "Failed to update profile";
      return null;
    } finally {
      isLoadingProfile.value = false;
    }
  };

  return {
    profile,
    isLoadingProfile,
    error,
    fetchProfile,
    updateProfile,
  };
});

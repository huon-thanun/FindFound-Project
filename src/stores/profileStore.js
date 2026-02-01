import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/api/api";

export const useProfileStore = defineStore("profile", () => {
  const profile = ref(null);
  const isLoadingProfile = ref(false);

  const fetchProfile = async () => {
    isLoadingProfile.value = true;
    try {
      const res = await api.get("/auth/profile");

      profile.value = res.data.data;
    } catch (err) {
      console.error("Fetch profile error:", err);
    } finally {
      isLoadingProfile.value = false;
    }
  };

  return {
    profile,
    isLoadingProfile,
    fetchProfile,
  };
});

import { defineStore } from "pinia";
import api from "@/api/api";

export const useAuthStore = defineStore("auth", {
  // ✅ STATE (required by Pinia)
  state: () => ({
    user: (() => {
      try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
      } catch {
        return null;
      }
    })(),
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null, // "admin" | "user"
    loading: false,
    error: null,
  }),

  // ✅ GETTERS (use normalized role)
  getters: {
    isAuthenticated: (state) => !!state.token,

    isAdmin: (state) => state.role === "admin",

    isUser: (state) => state.role === "user",
  },

  // ✅ ACTIONS
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const res = await api.post("/auth/login", credentials);

        // 🔴 IMPORTANT: match your backend response shape
        const user = res.data.data.user;
        const token = res.data.data.token;
        const role = user.role?.name?.toLowerCase(); // "admin" | "user"

        // ✅ update state
        this.user = user;
        this.token = token;
        this.role = role;

        // ✅ persist
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        return res.data;
      } catch (err) {
        this.error = err.response?.data?.message || "Login failed";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.role = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

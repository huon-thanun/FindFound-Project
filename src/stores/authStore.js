import { defineStore } from "pinia";
import api from "@/api/api";

export const useAuthStore = defineStore("auth", {
  /* ================= STATE ================= */
  state: () => ({
    user: (() => {
      try {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    })(),

    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null, // "admin" | "user"

    loading: false,
    error: null,
  }),

  /* ================= GETTERS ================= */
  getters: {
    isAuthenticated: (state) => Boolean(state.token),

    isAdmin: (state) => state.role === "admin",

    isUser: (state) => state.role === "user",
  },

  /* ================= ACTIONS ================= */
  actions: {
    /* ---------- LOGIN ---------- */
    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const res = await api.post("/auth/login", credentials);

        // 🔐 adjust only if backend changes
        const user = res.data.data.user;
        const token = res.data.data.token;

        // normalize role
        const role =
          user?.role?.name?.toLowerCase() || user?.role?.toLowerCase() || null;

        if (!token || !role) {
          throw new Error("Invalid login response");
        }

        // update store
        this.user = user;
        this.token = token;
        this.role = role;

        // persist
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        return res.data;
      } catch (err) {
        this.error =
          err.response?.data?.message || err.message || "Login failed";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    /* ---------- LOGOUT ---------- */
    logout() {
      this.user = null;
      this.token = null;
      this.role = null;
      this.error = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },

    /* ---------- RESTORE SESSION (OPTIONAL BUT GOOD) ---------- */
    restore() {
      try {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (token && role) {
          this.user = user ? JSON.parse(user) : null;
          this.token = token;
          this.role = role;
        }
      } catch {
        this.logout();
      }
    },
  },
});

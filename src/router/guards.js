import { useAuthStore } from "@/stores/authStore";

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  /* ================= PUBLIC ROUTES ================= */
  const PUBLIC_ROUTES = [
  "/login",
  "/admin/login", 
  "/register",
  "/forgot-password",
  "/reset-password",
  "/otp",
  "/user-verify-otp",
];


  /* ================= NOT LOGGED IN ================= */
  if (!auth.token) {
    // allow public pages
    if (PUBLIC_ROUTES.includes(to.path)) {
      return next();
    }

    // block everything else
    return next("/login");
  }

  /* ================= LOGGED IN ================= */

  //  user trying to access admin area
  if (to.path.startsWith("/admin") && auth.role !== "admin") {
    return next("/");
  }

  // admin trying to access user auth pages
  if (
    auth.role === "admin" &&
    PUBLIC_ROUTES.includes(to.path)
  ) {
    return next("/admin/dashboard");
  }

  //  user trying to access login again
  if (auth.role === "user" && to.path === "/login") {
    return next("/");
  }

  next();
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  const PUBLIC_ROUTES = [
    "/login",
    "/register",
    "/otp",
    "/user-verify-otp",
    "/forgot-password",
    "/admin/login",
  ];

  /* ========== NOT LOGGED IN ========== */
  if (!auth.token) {
    if (PUBLIC_ROUTES.includes(to.path)) {
      return next();
    }

    if (to.path.startsWith("/admin")) {
      return next("/admin/login");
    }

    return next("/login");
  }

  /* ========== LOGGED IN ========== */

  // user trying to access admin
  if (to.path.startsWith("/admin") && auth.role !== "admin") {
    return next("/");
  }

  // admin trying to access user login
  if (auth.role === "admin" && to.path === "/login") {
    return next("/admin/dashboard");
  }

  next();
});

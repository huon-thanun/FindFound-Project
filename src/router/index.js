import AdminLayout from "@/layouts/admin/AdminLayout.vue";
import UserLayout from "@/layouts/user/UserLayout.vue";
// import ForgotpasswordView from "@/views/admin/auth/ForgotpasswordView.vue";
import AdminLoginView from "@/views/admin/auth/AdminLoginView.vue";
import VerifyOTPView from "@/views/admin/auth/VerifyOTPView.vue";
import CategoryView from "@/views/admin/categories/CategoryView.vue";
import DashboardView from "@/views/admin/dashboard/dashboardView.vue";
import EditProfileView from "@/views/admin/profile/EditProfileView.vue";
import ProfileView from "@/views/admin/profile/ProfileView.vue";
import ReportView from "@/views/admin/reports/ReportView.vue";
import UserView from "@/views/admin/users/UserView.vue";
import AboutView from "@/views/user/about/AboutView.vue";
import ForgotPasswordView from "@/views/user/auth/ForgotPasswordView.vue";
import LoginView from "@/views/user/auth/LoginView.vue";
import OTPView from "@/views/user/auth/OTPView.vue";
import RegisterView from "@/views/user/auth/RegisterView.vue";
import ResetPasswordView from "@/views/user/auth/ResetPasswordView.vue";
import UserVerifyOTPView from "@/views/user/auth/UserVerifyOTPView.vue";
import HomeView from "@/views/user/home/HomeView.vue";

// user auth views

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: UserLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
          meta: { requiresAuth: true }, // ✅ user must login
        },
        {
          path: "about",
          component: AboutView,
        },

        // ✅ PUBLIC USER AUTH
        { path: "login", component: LoginView, meta: { public: true } },
        { path: "register", component: RegisterView, meta: { public: true } },
        { path: "otp", component: OTPView, meta: { public: true } },
        {
          path: "/user-verify-otp",
          name: "verify-otp",
          component: UserVerifyOTPView,
        },
        {
          path: "forgot-password",
          component: ForgotPasswordView,
          meta: { public: true },
        },
        {
          path: "reset-password",
          component: ResetPasswordView,
          meta: { public: true },
        },
      ],
    },

    {
      path: "/admin/login",
      name: "admin.login",
      component: AdminLoginView,
      meta: { public: true },
    },

    {
      path: "/admin",
      component: AdminLayout,
      meta: { requiresAuth: true },
      redirect: { name: "admin.dashoard" },
      children: [
        {
          path: "dashboard",
          name: "admin.dashoard",
          component: DashboardView,
        },
        {
          path: "profile",
          name: "admin.profile",
          component: ProfileView,
        },
        {
          path: "profile-edit",
          name: "admin.profile.edit",
          component: EditProfileView,
        },
        {
          path: "categories",
          name: "admin.categories",
          component: CategoryView,
        },
        {
          path: "reports",
          name: "admin.reports",
          component: ReportView,
        },
        {
          path: "users",
          name: "admin.users",
          component: UserView,
        },
        {
          path: "OTP",
          name: "admin.OTP",
          component: VerifyOTPView,
        },
      ],
    },

    {
      path: "/:pathMatch(.*)*",
      redirect: "/admin/login",
    },
  ],
});

export default router;

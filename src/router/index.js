import AdminLayout from "@/layouts/admin/AdminLayout.vue";
import UserLayout from "@/layouts/user/UserLayout.vue";
import ForgotpasswordView from "@/views/admin/auth/ForgotpasswordView.vue";
import LoignView from "@/views/admin/auth/LoignView.vue";
import VerifyOTPView from "@/views/admin/auth/VerifyOTPView.vue";
import CategoryView from "@/views/admin/categories/CategoryView.vue";
import DashboardView from "@/views/admin/dashboard/dashboardView.vue";
import EditProfileView from "@/views/admin/profile/EditProfileView.vue";
import ProfileView from "@/views/admin/profile/ProfileView.vue";
import ReportView from "@/views/admin/reports/ReportView.vue";
import UserView from "@/views/admin/users/UserView.vue";
import AboutView from "@/views/user/about/AboutView.vue";
import HomeView from "@/views/user/home/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: UserLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
          meta: { title: "Home" },
        },
        {
          path: "about",
          name: "about",
          component: AboutView,
          meta: { title: "About" },
        },
      ],
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
          meta: { title: "Dashboard" },
        },
        {
          path: "profile",
          name: "admin.profile",
          component: ProfileView,
          meta: { title: "Profile" },
        },
        {
          path: "profile-edit",
          name: "admin.profile.edit",
          component: EditProfileView,
          meta: { title: "Profile-Edit" },
        },
        {
          path: "categories",
          name: "admin.categories",
          component: CategoryView,
          meta: { title: "Categories" },
        },
        {
          path: "reports",
          name: "admin.reports",
          component: ReportView,
          meta: { title: "Reports" },
        },
        {
          path: "reports",
          name: "admin.reports",
          component: ReportView,
          meta: { title: "Reports" },
        },
        {
          path: "users",
          name: "admin.users",
          component: UserView,
          meta: { title: "Users" },
        },
        {
          path: "login",
          name: "admin.login",
          component: LoignView,
          meta: { title: "Login" },
        },
        {
          path: "OTP",
          name: "admin.OTP",
          component: VerifyOTPView,
          meta: { title: "OTP" },
        },
        {
          path: "forgotPassword",
          name: "admin.forgotPassword",
          component: ForgotpasswordView,
          meta: { title: "Forgot-Password" },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/admin/login", // redirect unknown routes to login or a 404 page
    },
  ],
});

export default router;

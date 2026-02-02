import { createRouter, createWebHistory } from "vue-router";

/* ===== LAYOUTS ===== */
import AdminLayout from "@/layouts/admin/AdminLayout.vue";
import UserLayout from "@/layouts/user/UserLayout.vue";

/* ===== USER VIEWS ===== */
import HomeView from "@/views/user/home/HomeView.vue";
import AboutView from "@/views/user/about/AboutView.vue";
import LoginView from "@/views/user/auth/LoginView.vue";
import RegisterView from "@/views/user/auth/RegisterView.vue";
import ForgotPasswordView from "@/views/user/auth/ForgotPasswordView.vue";
import ResetPasswordView from "@/views/user/auth/ResetPasswordView.vue";
import OTPView from "@/views/user/auth/OTPView.vue";
import UserVerifyOTPView from "@/views/user/auth/UserVerifyOTPView.vue";
import ReportViewUser from "@/views/user/reports/ReportView.vue";
import ReportDetailView from "@/views/user/reports/ReportDetailView.vue";
import OwnReportView from "@/views/user/reports/OwnReportView.vue";
import ProfileUserView from "@/views/user/profile/ProfileUserView.vue";

/* ===== ADMIN VIEWS ===== */
import DashboardView from "@/views/admin/dashboard/dashboardView.vue";
import ProfileView from "@/views/admin/profile/ProfileView.vue";
import EditProfileView from "@/views/admin/profile/EditProfileView.vue";
import CategoryView from "@/views/admin/categories/CategoryView.vue";
import ReportView from "@/views/admin/reports/ReportView.vue";
import UserView from "@/views/admin/users/UserView.vue";
// import VerifyOTPView from "@/views/admin/auth/VerifyOTPView.vue";

/* ===== STORE ===== */
import { useAuthStore } from "@/stores/authStore";
import MatchReport from "@/views/user/reports/matchReport.vue";

// ================= CONTACT US & GALLERY VIEWS =================
import ContactUsView from "@/views/user/contact_us/ContactUsView.vue";
import GalleryView from "@/views/user/gallery/GalleryView.vue";
import ItemDetailsView from "@/views/user/gallery/ItemDetailsView.vue";
import SuccessStoriesView from "@/views/user/success_stories/SuccessStoriesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /* ================= PUBLIC AUTH ================= */
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        public: true,
        isAdminLogin: false,
      },
    },
    {
      path: "/admin/login",
      name: "admin.login",
      component: LoginView,
      meta: {
        public: true,
        isAdminLogin: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { public: true },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPasswordView,
      meta: { public: true },
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPasswordView,
      meta: { public: true },
    },
    {
      path: "/otp",
      name: "otp",
      component: OTPView,
      meta: { public: true, role: "user" },
    },

    {
      path: "/user-verify-otp",
      name: "user.verify-otp",
      component: UserVerifyOTPView,
      meta: { public: true },
    },

    /* ================= USER AREA ================= */
    {
      path: "/",
      component: UserLayout,
      redirect: { name: "home" },
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "about",
          name: "about",
          component: AboutView,
        },
        {
          path: "contact_us",
          name: "contact_us",
          component: ContactUsView,
        },
        {
          path: "gallery",
          name: "gallery",
          component: GalleryView,
        },
        {
          path: "gallery/item/:id",
          name: "item_detail",
          component: ItemDetailsView,
        },
        {
          path: "profile",
          name: "user.profile",
          component: ProfileUserView,
          meta: { requiresAuth: true, role: "user" }, // <-- Protected
        },
        {
          path: "successstory",
          name: "successstory",
          component: SuccessStoriesView,
        },
        /* ===== USER REPORTS ===== */
        {
          path: "reports",
          name: "report.user",
          component: ReportViewUser,
        },
        {
          path: "reports/:id",
          name: "report-detail-user",
          component: ReportDetailView,
          props: true,
        },
        {
          path: "/reports/own",
          name: "own-reports",
          component: OwnReportView,
        },
        {
          path: "/reports/match",
          name: "match-reports",
          component: MatchReport,
        },
      ],
    },

    /* ================= ADMIN AREA ================= */
    {
      path: "/admin",
      component: AdminLayout,
      meta: { requiresAuth: true },
      redirect: { name: "admin.dashboard" },
      children: [
        {
          path: "dashboard",
          name: "admin.dashboard",
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
          name: "report.user",
          component: ReportViewUser,
        },
        {
          path: "reports/:id",
          name: "report-detail-user",
          component: ReportDetailView,
          props: true,
        },
      ],
    },

    /* ================= ADMIN AREA ================= */
    {
      path: "/admin",
      component: AdminLayout,
      meta: {
        requiresAuth: true,
        role: "admin",
      },
      redirect: { name: "admin.dashboard" },
      children: [
        {
          path: "dashboard",
          name: "admin.dashboard",
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
      ],
    },

    /* ================= FALLBACK ================= */
    {
      path: "/:pathMatch(.*)*",
      redirect: "/login",
    },
  ],
});

/* ================= ROUTE GUARD ================= */
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Protect admin routes
  if (to.meta.requiresAuth && to.meta.role === "admin") {
    if (!token || role !== "admin") {
      return next({ name: "admin.login" });
    }
  }

  // Prevent admin from opening login again
  if (to.name === "admin.login" && token && role === "admin") {
    return next({ name: "admin.dashboard" });
  }

  next();
});

export default router;

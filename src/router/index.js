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
import OwnReportView from "@/views/user/reports/OwnReportView.vue";
import ProfileUserView from "@/views/user/profile/ProfileUserView.vue";
import CreateReportView from "@/views/user/reports/CreateReportView.vue";
import EditReportView from "@/views/user/reports/EditReportView.vue";
import ReportDetailViewUser from "@/views/user/reports/ReportDetailView.vue";
import ProfileLayout from "@/layouts/user/ProfileLayout.vue";

/* ===== ADMIN VIEWS ===== */
import AdminLoginView from "@/views/admin/auth/AdminLoginView.vue";
import DashboardView from "@/views/admin/dashboard/dashboardView.vue";
import ProfileView from "@/views/admin/profile/ProfileView.vue";
import EditProfileView from "@/views/admin/profile/EditProfileView.vue";
import CategoryView from "@/views/admin/categories/CategoryView.vue";
import ReportView from "@/views/admin/reports/ReportView.vue";
import UserView from "@/views/admin/users/UserView.vue";
// import VerifyOTPView from "@/views/admin/auth/VerifyOTPView.vue";

/* ===== STORE ===== */
import { useAuthStore } from "@/stores/authStore";
import Policy from "@/views/user/other/policy.vue";
import Faq from "@/views/user/other/faq.vue";
import Support from "@/views/user/other/support.vue";

// ================= CONTACT US & GALLERY VIEWS =================
import ContactUsView from "@/views/user/contact_us/ContactUsView.vue";
import GalleryView from "@/views/user/gallery/GalleryView.vue";
import ItemDetailsView from "@/views/user/gallery/ItemDetailsView.vue";
import SuccessStoriesView from "@/views/user/success_stories/SuccessStoriesView.vue";
import ProfileSecurity from "@/views/admin/profile/ProfileSecurity.vue";
import CategoryUser from "@/views/user/categories/CategoryView.vue";
import Card from "@/views/user/reports/Card.vue";
import ProfileUserSecurity from "@/views/user/profile/ProfileUserSecurity.vue";
import EditProfileUserView from "@/views/user/profile/EditProfileUserView.vue";
import VerifyEmail from "@/views/user/auth/VerifyEmail.vue";
import NotFound from "@/views/NotFound.vue";

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
      component: AdminLoginView,
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
    {
      path: "/verify-change-email",
      name: "verify-email",
      component: VerifyEmail,
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
        // ========================== PROFILE ========================
        {
          path: "profile",
          component: ProfileLayout, // ← persistent hero layout
          redirect: { name: "user.profile" },
          children: [
            {
              path: "",
              name: "user.profile",
              component: ProfileUserView,
              meta: { requiresAuth: true, role: "user" },
            },
            {
              path: "edit",
              name: "user.profile.edit",
              component: EditProfileUserView,
              meta: { requiresAuth: true, role: "user" },
            },
            {
              path: "security",
              name: "user.profile.security",
              component: ProfileUserSecurity,
              meta: { requiresAuth: true, role: "user" },
            },
          ],
        },
        // =========================== PROFILE [END]===================
        {
          path: "successstory",
          name: "successstory",
          component: SuccessStoriesView,
        },
        /* ===== USER REPORTS ===== */
        {
          path: "reports/user",
          name: "report.user",
          component: ReportViewUser,
        },
        {
          path: "reports/user/:id",
          name: "report-detail-user",
          component: ReportDetailViewUser,
          props: true,
        },
        {
          path: "reports/user/own",
          name: "own-reports",
          component: OwnReportView,
        },
        {
          path: "reports/own/create",
          name: "create-report",
          component: CreateReportView,
        },
        {
          path: "reports/card",
          name: "card-test",
          component: Card,
        },
        {
          path: "reports/own/edit/:id",
          name: "edit-report",
          component: EditReportView,

          props: true,
        },
        {
          path: "/policy",
          name: "policy",
          component: Policy,
        },
        {
          path: "/faq",
          name: "faq",
          component: Faq,
        },
        {
          path: "/support",
          name: "support",
          component: Support,
        },
        {
          path: "/categories",
          name: "category",
          component: CategoryUser,
        },
        {
          path: "/notfound",
          name: "notfound",
          component: NotFound,
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
          component: ProfileLayout, // reuse the user one
          redirect: { name: "admin.profile" },
          children: [
            { path: "", name: "admin.profile", component: ProfileView },
            {
              path: "edit",
              name: "admin.profile.edit",
              component: EditProfileView,
            },
            {
              path: "security",
              name: "admin.profile.security",
              component: ProfileSecurity,
            },
          ],
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
      redirect: "notfound",
      // component: NotFound,
      // meta: { public: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when route changes
    return { top: 0 };
  },
});

/* ================= ROUTE GUARD ================= */
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "user" | "admin"

  /* ===== USER PROTECTED ROUTES ===== */
  if (to.meta.requiresAuth && to.meta.role === "user") {
    if (!token || role !== "user") {
      return next({ name: "login" });
    }
  }

  /* ===== ADMIN PROTECTED ROUTES ===== */
  if (to.meta.requiresAuth && to.meta.role === "admin") {
    if (!token || role !== "admin") {
      return next({ name: "admin.login" });
    }
  }

  /* ===== PREVENT LOGGED-IN USER FROM LOGIN ===== */
  if (to.name === "login" && token && role === "user") {
    return next({ name: "home" });
  }

  /* ===== PREVENT LOGGED-IN ADMIN FROM ADMIN LOGIN ===== */
  if (to.name === "admin.login" && token && role === "admin") {
    return next({ name: "admin.dashboard" });
  }

  next();
});

export default router;

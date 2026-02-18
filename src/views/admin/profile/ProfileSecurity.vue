<template>
  <div class="row g-4">
    <div class="col-lg-12" data-aos="fade-up">
      <!-- Admin tabs -->
      <ProfileTabsAdmin class="mb-4" />

      <div class="main-details-card mb-4 shadow-sm">
        <div class="card-header-clean mb-4">
          <div class="accent-dot accent-red"></div>
          <h5 class="fw-bold mb-0 text-dark-indigo khmer-font-title">
            សុវត្ថិភាពគណនីអ្នកគ្រប់គ្រង
          </h5>
          <small class="text-muted d-block mt-1">
            គណនីអ្នកគ្រប់គ្រង (Admin Security Settings)
          </small>
        </div>

        <!-- Admin warning -->
        <div class="alert alert-danger border-danger-subtle mb-4 small">
          <strong>សំខាន់!</strong> ការប្តូរលេខសម្ងាត់
          ឬអ៊ីមែលអាចប៉ះពាល់ដល់សិទ្ធិគ្រប់គ្រងទាំងអស់។
          សូមប្រើប្រាស់ដោយប្រុងប្រយ័ត្នខ្លាំង។
        </div>

        <div class="row g-4">
          <!-- PASSWORD -->
          <div class="col-lg-6">
            <ChangePasswordCard
              v-model:currentPassword="currentPassword"
              v-model:newPassword="newPassword"
              v-model:showCurrent="showCurrentPassword"
              v-model:showNew="showNewPassword"
              :loading="loadingPassword"
              @update="updatePassword"
            />
          </div>

          <!-- EMAIL -->
          <div class="col-lg-6">
            <ChangeEmailCard
              v-model:newEmail="newEmail"
              v-model:password="emailPassword"
              v-model:showPassword="showEmailPassword"
              v-model:token="emailVerifyToken"
              v-model:requested="emailRequested"
              :loadingRequest="loadingEmail"
              :loadingVerify="loadingVerify"
              @request="requestEmailChange"
              @verify="verifyEmailChange"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar (optional for admin - you can hide or customize) -->
    <div class="col-lg-4" data-aos="fade-left">
      <div class="sidebar-sticky">
        <ProfileSide :user="sharedUser" :skills="skills" />
      </div>
    </div>

    <!-- Toast -->
    <BaseToast
      v-model="showToast"
      :message="toastMessage"
      :theme="toastTheme"
      :icon="toastIcon"
      :duration="3000"
    />
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import ProfileTabsAdmin from "@/components/profile/ProfileTabsAdmin.vue";
import BaseToast from "@/components/base/BaseToast.vue";
import ChangePasswordCard from "@/components/profile/ChangPasswordCard.vue";
import ChangeEmailCard from "@/components/profile/ChangeEmailCard.vue";

const sharedUser = inject("profileUser");

const skills = [
  "System Admin",
  "Security",
  "Database",
  "Vue.js",
  "API Management",
];

// Password states
const currentPassword = ref("");
const newPassword = ref("");
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const loadingPassword = ref(false);

// Email states
const newEmail = ref("");
const emailPassword = ref("");
const showEmailPassword = ref(false);
const emailRequested = ref(false);
const emailVerifyToken = ref("");
const loadingEmail = ref(false);
const loadingVerify = ref(false);

// Toast
const showToast = ref(false);
const toastMessage = ref("");
const toastTheme = ref("success");
const toastIcon = ref("check-circle");

const showBaseToast = (msg, theme = "success") => {
  toastMessage.value = msg;
  toastTheme.value = theme;
  toastIcon.value = theme === "success" ? "check-circle" : "x-circle";
  showToast.value = true;
};

// Update password
const updatePassword = async () => {
  loadingPassword.value = true;
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
        }),
      },
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "បរាជ័យក្នុងការប្តូរលេខសម្ងាត់");
    }

    showBaseToast("លេខសម្ងាត់អ្នកគ្រប់គ្រងបានប្តូរដោយជោគជ័យ! 🎉", "success");
    currentPassword.value = "";
    newPassword.value = "";
    // For admin: optionally force re-login for security
    localStorage.removeItem("token");
    setTimeout(() => (window.location.href = "/admin/login"), 1500);
  } catch (err) {
    showBaseToast(err.message || "មានបញ្ហា", "error");
  } finally {
    loadingPassword.value = false;
  }
};

// Request email change
const requestEmailChange = async () => {
  loadingEmail.value = true;
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/request-change-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newEmail: newEmail.value.trim(),
          password: emailPassword.value,
        }),
      },
    );

    if (!res.ok) throw new Error();

    emailRequested.value = true;
    showBaseToast("បានផ្ញើតំណផ្ទៀងផ្ទាត់ទៅអ៊ីមែលថ្មីរួចរាល់!", "success");
  } catch (err) {
    showBaseToast("មិនអាចស្នើសុំប្តូរអ៊ីមែលបានទេ", "error");
  } finally {
    loadingEmail.value = false;
  }
};

// Verify email change
const verifyEmailChange = async () => {
  loadingVerify.value = true;
  try {
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/verify-change-email",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: emailVerifyToken.value.trim() }),
      },
    );

    if (!res.ok) throw new Error();

    // Update shared user email
    if (sharedUser.value) {
      sharedUser.value.email = newEmail.value;
    }

    emailRequested.value = false;
    showBaseToast(
      "អ៊ីមែលអ្នកគ្រប់គ្រងត្រូវបានផ្លាស់ប្តូរជោគជ័យ! 🎉",
      "success",
    );
  } catch (err) {
    showBaseToast("Token មិនត្រឹមត្រូវ ឬអស់សុពលភាព", "error");
  } finally {
    loadingVerify.value = false;
  }
};
</script>

<style scoped>
.main-details-card {
  background: white;
  border-radius: 32px;
  padding: 40px;
  border: 1px solid rgba(124, 58, 237, 0.05);
}

.card-header-clean {
  display: flex;
  align-items: center;
  gap: 12px;
}

.accent-red {
  background: #dc3545;
}

.alert-danger {
  background: rgba(220, 53, 69, 0.08);
  border-color: rgba(220, 53, 69, 0.3);
  color: #5c0000;
}

.loading-inside {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
}

.custom-loader {
  width: 60px;
  height: 60px;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #7c3aed;
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.sidebar-sticky {
  position: sticky;
  top: 100px;
}

@media (max-width: 991px) {
  .main-details-card {
    padding: 30px 20px;
  }
  .sidebar-sticky {
    position: static;
    margin-top: 2rem;
  }
}
</style>

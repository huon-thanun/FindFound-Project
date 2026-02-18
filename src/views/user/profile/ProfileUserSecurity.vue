<template>
  <div class="row g-4">
    <div class="col-lg-12" data-aos="fade-up">
      <ProfileTabs class="mb-4" />

      <div class="main-details-card mb-4 shadow-sm">
        <!-- No loading here anymore – layout already fetched user -->
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

    <div class="col-lg-4" data-aos="fade-left">
      <div class="sidebar-sticky">
        <ProfileSide :user="sharedUser" :skills="skills" />
      </div>
    </div>

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
import ProfileTabs from "@/components/profile/ProfileTabs.vue";
import BaseToast from "@/components/base/BaseToast.vue";
import ChangePasswordCard from "@/components/profile/ChangPasswordCard.vue";
import ChangeEmailCard from "@/components/profile/ChangeEmailCard.vue";

const sharedUser = inject("profileUser"); // ← from ProfileLayout

const skills = ["HTML", "CSS", "Vue", "MySQL", "JavaScript"];

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

// Update password (keep your logic, but use sharedUser.email after success if needed)
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
      const err = await res.json();
      throw new Error(err.message || "បរាជ័យក្នុងការប្តូរលេខសម្ងាត់");
    }

    showBaseToast("លេខសម្ងាត់បានប្តូរដោយជោគជ័យ! 🎉", "success");
    currentPassword.value = "";
    newPassword.value = "";
    localStorage.removeItem("token");
    setTimeout(() => (window.location.href = "/login"), 500);
  } catch (err) {
    showBaseToast(err.message || "មានបញ្ហា", "error");
  } finally {
    loadingPassword.value = false;
  }
};

// Request & Verify email change – keep almost the same
// After successful verify:
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
    showBaseToast("អ៊ីមែលបានផ្ទៀងផ្ទាត់រួចរាល់! 🎉", "success");
  } catch (err) {
    showBaseToast("Token មិនត្រឹមត្រូវ", "error");
  } finally {
    loadingVerify.value = false;
  }
};
</script>

<style scoped>
/* Keep only security-specific styles here */
/* Remove hero, layout, content-overlap, etc. – moved to ProfileLayout */

.main-details-card {
  background: white;
  border-radius: 32px;
  padding: 40px;
  border: 1px solid rgba(124, 58, 237, 0.05);
}

.loading-inside {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
}

.profile-page {
  font-family: "Kantumruy Pro", sans-serif;
  background-color: #f9f8ff;
  min-height: 100vh;
  padding-bottom: 80px;
}

.khmer-font-title {
  font-family: "Koh Santepheap", sans-serif;
}

/* --- HERO --- */
.hero-lavender {
  background-color: #f1edff;
  background-image:
    radial-gradient(at 0% 0%, rgba(124, 58, 237, 0.08) 0, transparent 50%),
    radial-gradient(at 50% 0%, rgba(59, 30, 84, 0.08) 0, transparent 50%);
  padding-bottom: 120px;
}

.profile-img-premium {
  width: 160px;
  height: 160px;
  border-radius: 42px;
  object-fit: cover;
  border: 6px solid #fff;
}

.status-indicator-online {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 22px;
  height: 22px;
  background: #00d084;
  border: 4px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0, 208, 132, 0.4);
}

/* --- CONTENT BOXES --- */
.content-overlap {
  margin-top: -80px;
}

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

.accent-dot {
  width: 8px;
  height: 8px;
  background: #7c3aed;
  border-radius: 50%;
}

/* --- INPUTS --- */
.info-box-item-input {
  background: #fcfaff;
  padding: 12px 20px;
  border-radius: 18px;
  border: 1px solid #f1efff;
  transition: all 0.3s ease;
  position: relative;
}

.info-box-item-input:focus-within {
  background: white;
  border-color: #7c3aed;
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.06);
}

.info-label {
  font-size: 0.7rem;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2px;
  display: block;
}

.input-with-icon {
  display: flex;
  align-items: center;
  gap: 10px;
}

.clean-input {
  border: none;
  background: transparent;
  width: 100%;
  font-weight: 600;
  color: #1e1b4b;
  outline: none;
  padding: 5px 0;
}

.btn-eye {
  background: none;
  border: none;
  color: #adb5bd;
  padding: 0;
}

.btn-eye:hover {
  color: #7c3aed;
}

/* --- LOADER --- */
.loading-full {
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

/* --- BUTTONS --- */
.btn-save-premium {
  background: #3b1e54;
  color: white;
  padding: 14px;
  border-radius: 15px;
  font-weight: 700;
  border: none;
  transition: 0.3s;
}

.btn-save-premium:hover:not(:disabled) {
  background: #7c3aed;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(124, 58, 237, 0.2);
}

.btn-outline-premium {
  background: white;
  color: #3b1e54;
  border: 2px solid #3b1e54;
  padding: 12px;
  border-radius: 15px;
  font-weight: 700;
  transition: 0.3s;
}

.btn-outline-premium:hover:not(:disabled) {
  background: #f3eff7;
}

.pwd-meter {
  height: 4px;
  flex: 1;
  background: #eee;
  border-radius: 10px;
}

.pwd-meter.active {
  background: #7c3aed;
}

.text-purple-accent {
  color: #7c3aed;
}

.text-dark-indigo {
  color: #1e1b4b;
}

/* --- POPUP MODAL --- */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-card {
  background: white;
  padding: 30px 40px;
  border-radius: 20px;
  min-width: 300px;
  text-align: center;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  animation: popup-zoom 0.3s ease-out;
}

.popup-card.success {
  border-top: 6px solid #00d084;
}

.popup-card.error {
  border-top: 6px solid #f44336;
}

.popup-card button {
  margin-top: 15px;
  padding: 8px 20px;
  border: none;
  background: #7c3aed;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
}

.popup-card button:hover {
  background: #3b1e54;
}

@keyframes popup-zoom {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 991px) {
  .content-overlap {
    margin-top: 0;
    padding-top: 30px;
  }
}
</style>

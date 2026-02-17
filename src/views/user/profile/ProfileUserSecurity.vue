<template>
  <ProfileLayout>
    <template #header>
      <ProfileHeader :user="user" />
    </template>

    <!-- Hero always visible – placeholder + fallback immediately -->
    <section class="hero-lavender">
      <div class="container-fluid px-lg-5">
        <div class="row align-items-center pt-5 pb-5">
          <div class="col-md-auto text-center text-md-start">
            <div class="avatar-glow-wrapper" data-aos="zoom-in">
              <img
                :src="
                  user?.avatar ||
                  'https://ui-avatars.com/api/?name=Orn+Sambath&background=7c3aed&color=fff&size=128&rounded=true'
                "
                class="profile-img-premium shadow-lg"
                alt="Avatar"
              />
              <div class="status-indicator-online"></div>
            </div>
          </div>

          <div
            class="col-md ps-md-4 mt-4 mt-md-0 text-center text-md-start"
            data-aos="fade-right"
          >
            <div
              class="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2"
            >
              <h1
                class="display-6 fw-bold text-dark-indigo mb-0 khmer-font-title"
              >
                {{ user?.fullname || "Orn Sambath" }}
              </h1>
              <span class="badge-verified-glow">
                <i class="bi bi-patch-check-fill"></i>
              </span>
            </div>
            <p class="text-muted fs-5 mb-3">
              {{ user?.email || "sambathon483@gmail.com" }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="container-fluid px-lg-5 content-overlap">
      <div class="row g-4">
        <div class="col-lg-12" data-aos="fade-up">
          <ProfileTabs class="mb-4" />

          <div class="main-details-card mb-4 shadow-sm">
            <!-- Loading only inside card – same as profile.vue -->
            <div v-if="loading" class="loading-inside">
              <div class="custom-loader"></div>
              <p class="mt-4 khmer-font text-purple-accent">
                កំពុងផ្ទុកទិន្នន័យ...
              </p>
            </div>

            <div v-else-if="errorMessage" class="p-5 text-center text-danger">
              <h5 class="mb-3">មានបញ្ហា!</h5>
              <p>{{ errorMessage }}</p>
            </div>

            <div v-else class="row g-4">
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
            <ProfileSide :user="user" :skills="skills" />
          </div>
        </div>
      </div>
    </div>

    <BaseToast
      v-model="showToast"
      :message="toastMessage"
      :theme="toastTheme"
      :icon="toastIcon"
      :duration="3000"
    />
  </ProfileLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import ProfileTabs from "@/components/profile/ProfileTabs.vue";
import BaseToast from "@/components/base/BaseToast.vue";
import ChangePasswordCard from "@/components/profile/ChangPasswordCard.vue";
import ChangeEmailCard from "@/components/profile/ChangeEmailCard.vue";

const user = ref(null);
const loading = ref(true);
const errorMessage = ref(null);

const skills = ["HTML", "CSS", "Vue", "MySQL", "JavaScript"];

// Password
const currentPassword = ref("");
const newPassword = ref("");
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const loadingPassword = ref(false);

// Email
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

onMounted(async () => {
  loading.value = true;
  errorMessage.value = null;

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    if (json.result) {
      user.value = json.data;
    } else {
      throw new Error("No result");
    }
  } catch (err) {
    console.error("Profile fetch failed:", err);
    errorMessage.value = "មិនអាចទាញយកព័ត៌មានបាន";
    showBaseToast("មានបញ្ហាក្នុងការភ្ជាប់ម៉ាស៊ីនមេ", "error");
  } finally {
    loading.value = false;
  }
});

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

    if (!res.ok) throw new Error("បរាជ័យក្នុងការប្តូរលេខសម្ងាត់");

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

// Request email change
const requestEmailChange = async () => {
  loadingEmail.value = true;
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/change-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newEmail: newEmail.value,
          password: emailPassword.value,
        }),
      },
    );

    if (!res.ok) throw new Error();

    emailRequested.value = true;
    showBaseToast("Token ផ្ទៀងផ្ទាត់ត្រូវបានផ្ញើទៅអ៊ីមែលថ្មី! 📩", "success");
  } catch (err) {
    showBaseToast("មានបញ្ហាក្នុងការស្នើសុំ", "error");
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

    user.value.email = newEmail.value;
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
/* Your original styles + loading-inside */
.loading-inside {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
}

/* Your original styles + loading-inside to match profile.vue */
.loading-inside {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
}

/* ... keep all your other styles (hero, inputs, buttons, etc.) ... */

/* --- Fonts & Page --- */

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

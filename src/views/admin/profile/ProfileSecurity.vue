<template>
  <ProfileLayout>
    <!-- Header Slot -->
    <template #header>
      <ProfileHeader :user="user" />
    </template>

    <!-- Left Sidebar Slot -->
    <template #left>
      <ProfileSide :user="user" :skills="skills" />
    </template>

    <div v-if="user" class="position-relative mt-4">
      <!-- BACK BUTTON -->
      <RouterLink
        :to="{ name: 'admin.profile.edit' }"
        class="btn btn-outline-purple fw-bold back-button"
      >
        <i class="bi bi-arrow-left me-2"></i> Back to Edit Profile
      </RouterLink>

      <!-- NAV TABS -->
      <div class="card border-0 shadow-sm rounded-4 mb-4">
        <div class="card-header bg-white border-bottom px-4 pt-3">
          <div class="d-flex gap-4">
            <RouterLink
              :to="{ name: 'admin.profile' }"
              class="nav-tab"
              :class="{ active: isActive('admin.profile') }"
            >
              Overview
            </RouterLink>

            <RouterLink
              :to="{ name: 'admin.profile.edit' }"
              class="nav-tab"
              :class="{ active: isActive('admin.profile.edit') }"
            >
              Edit Profile
            </RouterLink>

            <RouterLink
              :to="{ name: 'admin.profile.security' }"
              class="nav-tab"
              :class="{ active: isActive('admin.profile.security') }"
            >
              Security
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- USER INFO CARD -->
      <div class="card border shadow-sm rounded-4 mb-4 p-4">
        <div class="row align-items-center">
          <div class="col-md-auto text-center text-md-start mb-4 mb-md-0">
            <div
              class="avatar-upload-container position-relative d-inline-block"
            >
              <img
                :src="user.avatar || 'https://ui-avatars.com/api/?name=Admin'"
                class="main-profile-img shadow"
                alt="User Avatar"
              />
            </div>
          </div>

          <div class="col-md ps-md-4">
            <h2 class="fw-bold mb-1">{{ user.fullname }}</h2>
            <p class="text-muted mb-0">{{ user.email }}</p>
            <div class="mt-2">
              <span
                class="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill"
              >
                {{ user.status === "ACTIVATED" ? "Active Admin" : "Inactive" }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ACCOUNT DETAILS -->
      <div class="card border shadow-sm rounded-4 mb-4 p-4">
        <h5 class="fw-bold mb-4">Account Details</h5>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3">
            <div class="info-card p-3 rounded-3 border bg-light">
              <label class="small text-muted d-block mb-1">Full Name</label>
              <span class="fw-semibold fs-5">{{ user.fullname }}</span>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="info-card p-3 rounded-3 border bg-light">
              <label class="small text-muted d-block mb-1">Email Address</label>
              <span class="fw-semibold fs-5">{{ user.email }}</span>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="info-card p-3 rounded-3 border bg-light">
              <label class="small text-muted d-block mb-1">Phone Number</label>
              <span class="fw-semibold fs-5">{{ user.phoneNumber }}</span>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="info-card p-3 rounded-3 border bg-light">
              <label class="small text-muted d-block mb-1">Telegram</label>
              <a
                :href="user.telegramLink || '#'"
                target="_blank"
                class="fw-semibold fs-5 text-decoration-none"
              >
                {{ user.telegramLink || "N/A" }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- CHANGE PASSWORD -->
      <div class="card border shadow-sm rounded-4 mb-4 p-4">
        <h5 class="fw-bold mb-4 text-center">Change Password</h5>

        <div class="row g-3">
          <div class="col-12">
            <label class="form-label fw-semibold text-muted small"
              >Current Password</label
            >
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0">
                <i class="bi bi-lock text-purple"></i>
              </span>
              <input
                :type="showCurrentPassword ? 'text' : 'password'"
                v-model="currentPassword"
                class="form-control border-start-0 ps-0"
                placeholder="Enter current password"
              />
              <span
                class="input-group-text bg-white"
                @click="showCurrentPassword = !showCurrentPassword"
                style="cursor: pointer"
              >
                <i
                  :class="showCurrentPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                ></i>
              </span>
            </div>
          </div>

          <div class="col-12">
            <label class="form-label fw-semibold text-muted small"
              >New Password</label
            >
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0">
                <i class="bi bi-shield-plus text-purple"></i>
              </span>
              <input
                :type="showNewPassword ? 'text' : 'password'"
                v-model="newPassword"
                class="form-control border-start-0 ps-0"
                placeholder="Enter new password"
              />
              <span
                class="input-group-text bg-white"
                @click="showNewPassword = !showNewPassword"
                style="cursor: pointer"
              >
                <i
                  :class="showNewPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                ></i>
              </span>
            </div>
            <div class="mt-2 d-flex gap-1">
              <div
                v-for="i in 4"
                :key="'pass-meter-' + i"
                class="password-meter"
                :class="{ active: newPassword.length > i * 2 }"
              ></div>
            </div>
            <small class="text-muted mt-1 d-block"
              >Use at least 8 characters with numbers and letters.</small
            >
          </div>

          <div class="col-12 mt-3">
            <button
              @click="updatePassword"
              class="btn btn-purple w-100 py-3 rounded-3 fw-bold"
              :disabled="loadingPassword || !currentPassword || !newPassword"
            >
              <span
                v-if="loadingPassword"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              Update Password
            </button>
          </div>
        </div>
      </div>

      <!-- CHANGE EMAIL -->
      <div class="card border shadow-sm rounded-4 mb-4 p-4">
        <h5 class="fw-bold mb-4 text-center">Change Email</h5>

        <div class="row g-3">
          <div class="col-12">
            <label class="form-label fw-semibold text-muted small"
              >New Email</label
            >
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0">
                <i class="bi bi-envelope text-purple"></i>
              </span>
              <input
                v-model="newEmail"
                type="email"
                class="form-control border-start-0 ps-0"
                placeholder="Enter new email"
              />
            </div>
          </div>

          <div class="col-12">
            <label class="form-label fw-semibold text-muted small"
              >Current Password</label
            >
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0">
                <i class="bi bi-lock text-purple"></i>
              </span>
              <input
                :type="showEmailPassword ? 'text' : 'password'"
                v-model="emailPassword"
                class="form-control border-start-0 ps-0"
                placeholder="Enter current password"
              />
              <span
                class="input-group-text bg-white"
                @click="showEmailPassword = !showEmailPassword"
                style="cursor: pointer"
              >
                <i
                  :class="showEmailPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                ></i>
              </span>
            </div>
          </div>

          <div class="col-12 mt-3">
            <button
              @click="requestEmailChange"
              class="btn btn-purple w-100 py-3 rounded-3 fw-bold"
              :disabled="loadingEmail || !newEmail || !emailPassword"
            >
              <span
                v-if="loadingEmail"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              Request Email Change
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">Loading profile...</div>
  </ProfileLayout>
</template>

<script setup>
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import ProfileSide from "@/components/profile/ProfileSide.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// User & skills
const user = ref(null);
const skills = ["HTML", "CSS", "Vue", "MySQL", "JavaScript"];
const route = useRoute();
const isActive = (routeName) => route.name === routeName;

// Password & email fields
const currentPassword = ref("");
const newPassword = ref("");
const emailPassword = ref("");
const newEmail = ref("");
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showEmailPassword = ref(false);
const loadingPassword = ref(false);
const loadingEmail = ref(false);

// Fetch profile
onMounted(async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const json = await res.json();
    if (json.result) user.value = json.data;
  } catch (err) {
    console.error("Failed to fetch profile:", err);
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
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed");
    alert("Password updated successfully!");
    currentPassword.value = "";
    newPassword.value = "";
  } catch (err) {
    alert(err.message || "Network error");
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
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed");
    alert("Email change requested! Please check your inbox for the token.");
    newEmail.value = "";
    emailPassword.value = "";
  } catch (err) {
    alert(err.message || "Network error");
  } finally {
    loadingEmail.value = false;
  }
};
</script>

<style scoped>
.main-profile-img {
  width: 130px;
  height: 130px;
  border-radius: 35px;
  object-fit: cover;
  border: 5px solid #fff;
}

.avatar-upload-container {
  transition: transform 0.3s ease;
}
.avatar-upload-container:hover {
  transform: scale(1.03);
}

.nav-tab {
  padding: 12px 4px;
  font-weight: 600;
  text-decoration: none;
  color: #6c757d;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
}
.nav-tab.active {
  color: #0d6efd;
  border-bottom-color: #0d6efd;
}

.info-card {
  transition: background 0.3s ease;
}
.info-card:hover {
  background: #e9ecef !important;
}

.back-button {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 10;
  color: #3b1e54;
  border: 2px solid #3b1e54;
  transition: 0.3s;
}
.back-button:hover {
  background: #3b1e54;
  color: white;
  transform: translateY(-2px);
}

.btn-purple {
  background: #3b1e54;
  color: #fff;
  border: none;
  transition: 0.3s;
}
.btn-purple:hover:not(:disabled) {
  background: #2a153d;
  transform: translateY(-2px);
}

.input-group-text {
  border-right: none;
}

.password-meter {
  height: 4px;
  flex: 1;
  background: #eee;
  border-radius: 2px;
  transition: 0.3s;
}
.password-meter.active {
  background: #3b1e54;
}
</style>

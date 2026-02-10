<template>
  <ProfileLayout>
    <!-- Header -->
    <template #header>
      <ProfileHeader :user="user" />
    </template>

    <!-- Sidebar -->
    <template #left>
      <ProfileSide :user="user" :skills="skills" />
    </template>

    <!-- Main Content -->
    <div v-if="user" class="profile-security-wrapper khmer-font py-4 px-3 px-md-5">
      <!-- Title + Back Button -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <h4 class="fw-bold text-purple mb-0">ការកំណត់សុវត្ថិភាព</h4>
      </div>

      <ProfileTabsAdmin />

      <!-- Profile Card -->
      <div class="card border border-gray-300 shadow-sm rounded-4 mb-5 overflow-hidden">
        <div class="card-body p-4 d-flex align-items-center gap-4">
          <img :src="user.avatar || 'https://ui-avatars.com/api/?name=Admin'"
            class="rounded-4 shadow-sm border border-2 border-white"
            style="width: 80px; height: 80px; object-fit: cover" />
          <div>
            <h5 class="fw-bold mb-1">{{ user.fullname }}</h5>
            <p class="text-muted mb-0 small">{{ user.email }}</p>
            <span class="badge bg-purple-subtle text-purple mt-2">
              {{
                user.status === "ACTIVATED" ? "អ្នកគ្រប់គ្រងសកម្ម" : "មិនសកម្ម"
              }}
            </span>
          </div>
        </div>
      </div>

      <!-- Security Forms -->
      <div class="row g-4 mb-5">
        <!-- Change Password -->
        <div class="col-lg-6">
          <div class="card border border-gray-200 shadow-sm rounded-4 p-4 p-md-5 h-100">
            <h5 class="fw-bold mb-4 d-flex align-items-center">
              <i class="bi bi-shield-lock me-2 text-purple"></i> ប្តូរលេខសម្ងាត់
            </h5>

            <!-- Current Password -->
            <div class="mb-4">
              <label class="form-label small fw-bold text-muted mb-2">លេខសម្ងាត់បច្ចុប្បន្ន</label>
              <div class="input-group custom-group shadow-sm">
                <span class="input-group-text bg-light border-0"><i class="bi bi-lock"></i></span>
                <input :type="showCurrentPassword ? 'text' : 'password'" v-model="currentPassword"
                  class="form-control border-0 bg-light py-2" placeholder="បញ្ចូលលេខសម្ងាត់ចាស់" />
                <button class="btn btn-light border-0" @click="showCurrentPassword = !showCurrentPassword">
                  <i :class="showCurrentPassword ? 'bi bi-eye-slash' : 'bi bi-eye'
                    "></i>
                </button>
              </div>
            </div>

            <!-- New Password -->
            <div class="mb-4">
              <label class="form-label small fw-bold text-muted mb-2">លេខសម្ងាត់ថ្មី</label>
              <div class="input-group custom-group shadow-sm">
                <span class="input-group-text bg-light border-0"><i class="bi bi-shield-plus"></i></span>
                <input :type="showNewPassword ? 'text' : 'password'" v-model="newPassword"
                  class="form-control border-0 bg-light py-2" placeholder="បញ្ចូលលេខសម្ងាត់ថ្មី" />
                <button class="btn btn-light border-0" @click="showNewPassword = !showNewPassword">
                  <i :class="showNewPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>

              <!-- Password Strength Meter -->
              <div class="mt-3 d-flex gap-1">
                <div v-for="i in 4" :key="i" class="password-meter" :class="{ active: newPassword.length > i * 2 }">
                </div>
              </div>
            </div>

            <button @click="updatePassword" class="btn btn-purple w-100 py-3 mt-2 fw-bold"
              :disabled="loadingPassword || !currentPassword || !newPassword">
              <span v-if="loadingPassword" class="spinner-border spinner-border-sm me-2"></span>
              ធ្វើបច្ចុប្បន្នភាពលេខសម្ងាត់
            </button>
          </div>
        </div>

        <!-- Change Email -->
        <div class="col-lg-6">
          <div class="card border border-gray-200 shadow-sm rounded-4 p-4 p-md-5 h-100">
            <h5 class="fw-bold mb-4 d-flex align-items-center">
              <i class="bi bi-envelope-at me-2 text-purple"></i>
              ប្តូរអាសយដ្ឋានអ៊ីមែល
            </h5>

            <!-- New Email -->
            <div class="mb-4">
              <label class="form-label small fw-bold text-muted mb-2">អ៊ីមែលថ្មី</label>
              <div class="input-group custom-group shadow-sm">
                <span class="input-group-text bg-light border-0"><i class="bi bi-envelope"></i></span>
                <input v-model="newEmail" type="email" class="form-control border-0 bg-light py-2"
                  placeholder="ឧទាហរណ៍: name@mail.com" />
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="mb-4">
              <label class="form-label small fw-bold text-muted mb-2">បញ្ជាក់លេខសម្ងាត់</label>
              <div class="input-group custom-group shadow-sm">
                <span class="input-group-text bg-light border-0"><i class="bi bi-shield-check"></i></span>
                <input :type="showEmailPassword ? 'text' : 'password'" v-model="emailPassword"
                  class="form-control border-0 bg-light py-2" placeholder="បញ្ចូលលេខសម្ងាត់ដើម្បីបញ្ជាក់" />
                <button class="btn btn-light border-0" @click="showEmailPassword = !showEmailPassword">
                  <i :class="showEmailPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
            </div>

            <div class="alert alert-warning border-0 small mb-4 py-3 shadow-sm">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              យើងនឹងផ្ញើតំណភ្ជាប់ទៅកាន់អ៊ីមែលថ្មីរបស់អ្នកដើម្បីបញ្ជាក់។
            </div>

            <button @click="requestEmailChange" class="btn btn-purple-outline w-100 py-3 mt-auto fw-bold"
              :disabled="loadingEmail || !newEmail || !emailPassword">
              <span v-if="loadingEmail" class="spinner-border spinner-border-sm me-2"></span>
              ស្នើសុំប្តូរអ៊ីមែល
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-else class="text-center py-5">
      <div class="spinner-border text-purple mb-3"></div>
      <p class="khmer-font text-muted">កំពុងផ្ទុកព័ត៌មាន...</p>
    </div>
  </ProfileLayout>
</template>

<script setup>
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import ProfileSide from "@/components/profile/ProfileSide.vue";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import ProfileTabsAdmin from "@/components/profile/ProfileTabsAdmin.vue";

const user = ref(null);
const skills = ["HTML", "CSS", "Vue", "MySQL", "JavaScript"];
const route = useRoute();
const isActive = (name) => route.name === name;

// Form fields
const fullname = ref("");
const email = ref("");
const phoneNumber = ref("");
const telegramLink = ref("");

// Password & Email
const currentPassword = ref("");
const newPassword = ref("");
const emailPassword = ref("");
const newEmail = ref("");
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showEmailPassword = ref(false);
const loadingProfile = ref(false);
const loadingPassword = ref(false);
const loadingEmail = ref(false);

// Fetch profile
onMounted(async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile",
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const json = await res.json();
    if (json.result) {
      user.value = json.data;
      fullname.value = json.data.fullname;
      email.value = json.data.email;
      phoneNumber.value = json.data.phoneNumber;
      telegramLink.value = json.data.telegramLink;
    }
  } catch (err) {
    console.error(err);
  }
});

// Update profile
const updateProfile = async () => {
  loadingProfile.value = true;
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/update-profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullname: fullname.value,
          email: email.value,
          phoneNumber: phoneNumber.value,
          telegramLink: telegramLink.value,
        }),
      },
    );
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to update profile");
    alert("Profile updated successfully!");
    user.value = {
      ...user.value,
      fullname: fullname.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      telegramLink: telegramLink.value,
    };
  } catch (err) {
    alert(err.message || "Network error");
  } finally {
    loadingProfile.value = false;
  }
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
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to update password");
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
          password: emailPassword.value,
          newEmail: newEmail.value,
        }),
      },
    );
    const json = await res.json();
    if (!res.ok)
      throw new Error(json.message || "Failed to request email change");
    alert("Email change requested! Check your inbox for the token.");
    emailPassword.value = "";
    newEmail.value = "";
  } catch (err) {
    alert(err.message || "Network error");
  } finally {
    loadingEmail.value = false;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;600;700&display=swap");

.khmer-font {
  font-family: "Kantumruy Pro", sans-serif;
}

.text-purple {
  color: #3b1e54 !important;
}

.bg-purple-subtle {
  background-color: #f3eff7 !important;
}

.border-purple {
  border-color: #3b1e54 !important;
}

.btn-purple {
  background: #3b1e54;
  color: #fff;
  border: none;
  transition: all 0.3s ease;
}

.btn-purple:hover:not(:disabled) {
  background: #2a153d;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 30, 84, 0.25);
}

.btn-purple-outline {
  background: transparent;
  color: #3b1e54;
  border: 2px solid #3b1e54;
  transition: all 0.3s ease;
}

.btn-purple-outline:hover:not(:disabled) {
  background: #3b1e54;
  color: white;
}

.nav-tab {
  padding: 10px 16px;
  font-weight: 600;
  text-decoration: none;
  color: #6c757d;
  border: 1px solid transparent;
  border-radius: 12px 12px 0 0;
  transition: all 0.3s ease;
}

.nav-tab.active {
  color: #3b1e54;
  border-color: #3b1e54;
  border-bottom-color: #fff;
}

.custom-group {
  border-radius: 12px;
  border: 1px solid #ddd;
  background: #fff;
}

.password-meter {
  height: 6px;
  flex: 1;
  background: #e9ecef;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.password-meter.active {
  background: #3b1e54;
  border-color: #2a153d;
}

/* Prevent horizontal scrollbar for tabs */
.overflow-auto::-webkit-scrollbar {
  display: none;
}
</style>

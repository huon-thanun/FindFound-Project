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
    <div
      v-if="user"
      class="profile-security-wrapper khmer-font py-4 px-3 px-md-5"
    >
      <!-- Title -->
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"
      >
        <h4 class="fw-bold text-purple mb-0">ការកំណត់សុវត្ថិភាព</h4>
      </div>

      <ProfileTabsAdmin />

      <!-- Profile Card -->
      <div
        class="card border border-gray-300 shadow-sm rounded-4 mb-5 overflow-hidden"
      >
        <div class="card-body p-4 d-flex align-items-center gap-4">
          <img
            :src="user.avatar || 'https://ui-avatars.com/api/?name=Admin'"
            class="rounded-4 shadow-sm border border-2 border-white"
            style="width: 80px; height: 80px; object-fit: cover"
          />
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
        <!-- Password Form -->
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

        <!-- Email Form -->
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

    <!-- Loading -->
    <div v-else class="text-center py-5">
      <div class="spinner-border text-purple mb-3"></div>
      <p class="khmer-font text-muted">កំពុងផ្ទុកព័ត៌មាន...</p>
    </div>

    <!-- Popup Modal -->
    <PopupModal
      v-if="showPopup"
      :message="popupMessage"
      :type="popupType"
      @close="showPopup = false"
    />
  </ProfileLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import ProfileSide from "@/components/profile/ProfileSide.vue";
import ProfileTabsAdmin from "@/components/profile/ProfileTabsAdmin.vue";
import ChangePasswordCard from "@/components/profile/ChangPasswordCard.vue";
import ChangeEmailCard from "@/components/profile/ChangeEmailCard.vue";
// import PopupModal from "@/components/profile/PopupModal.vue";

const user = ref(null);
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

// Popup
const popupMessage = ref("");
const popupType = ref("success");
const showPopup = ref(false);
const showPopupModal = (message, type = "success") => {
  popupMessage.value = message;
  popupType.value = type;
  showPopup.value = true;
};

// Fetch user profile
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
    console.error(err);
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
    showPopupModal("លេខសម្ងាត់បានប្តូរដោយជោគជ័យ! 🎉", "success");
    currentPassword.value = "";
    newPassword.value = "";
  } catch (err) {
    showPopupModal(err.message, "error");
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
    if (!res.ok) throw new Error();
    emailRequested.value = true;
    showPopupModal("Token ផ្ទៀងផ្ទាត់ត្រូវបានផ្ញើទៅអ៊ីមែលថ្មី! 📩", "success");
  } catch (err) {
    showPopupModal("មានបញ្ហាក្នុងការស្នើសុំ", "error");
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
    showPopupModal("អ៊ីមែលបានផ្ទៀងផ្ទាត់រួចរាល់! 🎉", "success");
  } catch (err) {
    showPopupModal("Token មិនត្រឹមត្រូវ", "error");
  } finally {
    loadingVerify.value = false;
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
.btn-purple {
  background: #3b1e54;
  color: #fff;
  border: none;
}
.btn-purple:hover {
  background: #2a153d;
}
.btn-purple-outline {
  border: 2px solid #3b1e54;
  color: #3b1e54;
  background: transparent;
}
.btn-purple-outline:hover {
  background: #3b1e54;
  color: #fff;
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
</style>

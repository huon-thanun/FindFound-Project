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

    <div v-if="user" class="mt-4">
      <!-- BACK BUTTON -->
      <RouterLink
        :to="{ name: 'admin.profile' }"
        class="btn btn-outline-purple fw-bold back-button"
      >
        <i class="bi bi-arrow-left me-2"></i> Back to Profile
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

      <!-- EDIT PROFILE CARD -->
      <div class="card border shadow-sm rounded-4 p-4 mb-4">
        <h5 class="fw-bold">Edit Profile</h5>

        <div class="row g-4">
          <!-- Avatar Upload -->
          <div class="col-md-4 text-center">
            <div
              class="avatar-upload-container position-relative d-inline-block mb-3"
            >
              <img
                :src="user.avatar || 'https://ui-avatars.com/api/?name=Admin'"
                class="main-profile-img shadow"
                alt="Avatar"
              />
              <label for="avatarInput" class="avatar-edit-badge">
                <i class="bi bi-camera-fill"></i>
              </label>
              <input
                type="file"
                id="avatarInput"
                class="d-none"
                @change="onAvatarChange"
              />
            </div>
            <p class="text-muted small">Click the camera to change avatar</p>
          </div>

          <!-- Profile Form -->
          <div class="col-md-8">
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label fw-semibold text-muted"
                  >Full Name</label
                >
                <input
                  type="text"
                  class="form-control border rounded-3"
                  v-model="form.fullname"
                  placeholder="Enter full name"
                />
              </div>

              <div class="col-12">
                <label class="form-label fw-semibold text-muted"
                  >Email Address</label
                >
                <input
                  type="email"
                  class="form-control border rounded-3"
                  v-model="form.email"
                  placeholder="Enter email"
                />
              </div>

              <div class="col-12">
                <label class="form-label fw-semibold text-muted"
                  >Phone Number</label
                >
                <input
                  type="text"
                  class="form-control border rounded-3"
                  v-model="form.phoneNumber"
                  placeholder="Enter phone number"
                />
              </div>

              <div class="col-12">
                <label class="form-label fw-semibold text-muted"
                  >Telegram Link</label
                >
                <input
                  type="text"
                  class="form-control border rounded-3"
                  v-model="form.telegramLink"
                  placeholder="Enter Telegram URL"
                />
              </div>

              <div class="col-12 mt-3">
                <button
                  @click="updateProfile"
                  class="btn btn-purple w-100 py-3 rounded-3 fw-bold"
                  :disabled="loading"
                >
                  <span
                    v-if="loading"
                    class="spinner-border spinner-border-sm me-2"
                  ></span>
                  Save Changes
                </button>
              </div>
            </div>
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

const user = ref(null);
const skills = ["HTML", "CSS", "Vue", "MySQL", "JavaScript"];
const route = useRoute();
const isActive = (routeName) => route.name === routeName;

const form = ref({
  fullname: "",
  email: "",
  phoneNumber: "",
  telegramLink: "",
  avatar: null,
});

const loading = ref(false);

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
    if (json.result) {
      user.value = json.data;
      form.value.fullname = user.value.fullname;
      form.value.email = user.value.email;
      form.value.phoneNumber = user.value.phoneNumber;
      form.value.telegramLink = user.value.telegramLink;
      form.value.avatar = user.value.avatar;
    }
  } catch (err) {
    console.error("Failed to fetch profile:", err);
  }
});

// Avatar change
const onAvatarChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.avatar = URL.createObjectURL(file);
  }
};

// Update profile
const updateProfile = async () => {
  loading.value = true;
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
          fullname: form.value.fullname,
          email: form.value.email,
          phoneNumber: form.value.phoneNumber,
          telegramLink: form.value.telegramLink,
        }),
      },
    );
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Failed to update profile");
    alert("Profile updated successfully!");
  } catch (err) {
    alert(err.message || "Network error");
  } finally {
    loading.value = false;
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
.avatar-edit-badge {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: #0d6efd;
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 3px solid #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
  color: white;
  border: none;
  transition: 0.3s;
}
.btn-purple:hover:not(:disabled) {
  background: #2a153d;
  transform: translateY(-2px);
}
.section-title {
  background-color: #3b1e54;
  color: white;
  padding: 10px 0;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 1.5rem;
}
</style>

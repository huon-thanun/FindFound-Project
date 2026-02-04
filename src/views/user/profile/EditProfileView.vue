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

    <div v-if="user" class="container mt-4 position-relative">
      <!-- Back -->
      <RouterLink
        :to="{ name: 'user.profile' }"
        class="btn btn-outline-primary fw-bold back-button"
      >
        <i class="bi bi-arrow-left me-2"></i> Back to Profile
      </RouterLink>

      <!-- Tabs -->
      <div class="card border-0 shadow-sm rounded-4 mb-4">
        <div class="card-header bg-white border-bottom px-4 pt-3">
          <div class="d-flex gap-4">
            <RouterLink
              :to="{ name: 'user.profile' }"
              class="nav-tab"
              :class="{ active: isActive('user.profile') }"
            >
              My Profile
            </RouterLink>

            <RouterLink
              :to="{ name: 'user.profile.edit' }"
              class="nav-tab"
              :class="{ active: isActive('user.profile.edit') }"
            >
              Edit Profile
            </RouterLink>

            <RouterLink
              :to="{ name: 'user.profile.security' }"
              class="nav-tab"
              :class="{ active: isActive('user.profile.security') }"
            >
              Security
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Edit Card -->
      <div class="card border shadow-sm rounded-4 p-4 mb-4">
        <h5 class="fw-bold mb-4">Edit Your Profile</h5>

        <div class="row g-4">
          <!-- Avatar -->
          <div class="col-md-4 text-center">
            <div class="avatar-upload-container position-relative mb-3">
              <img
                :src="
                  form.avatar ||
                  `https://ui-avatars.com/api/?name=${form.fullname}`
                "
                class="main-profile-img shadow"
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
            <p class="text-muted small">
              Click the camera to change your photo
            </p>
          </div>

          <!-- Form -->
          <div class="col-md-8">
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label fw-semibold">Full Name</label>
                <input
                  v-model="form.fullname"
                  type="text"
                  class="form-control rounded-3"
                />
              </div>

              <div class="col-12">
                <label class="form-label fw-semibold">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-control rounded-3"
                />
              </div>

              <div class="col-12">
                <label class="form-label fw-semibold">Phone</label>
                <input
                  v-model="form.phoneNumber"
                  type="text"
                  class="form-control rounded-3"
                />
              </div>

              <div class="col-12">
                <label class="form-label fw-semibold">Telegram</label>
                <input
                  v-model="form.telegramLink"
                  type="text"
                  class="form-control rounded-3"
                />
              </div>

              <div class="col-12 mt-3">
                <button
                  @click="updateProfile"
                  class="btn btn-primary w-100 py-3 fw-bold rounded-3"
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

const isActive = (name) => route.name === name;

const form = ref({
  fullname: "",
  email: "",
  phoneNumber: "",
  telegramLink: "",
  avatar: "",
});

const loading = ref(false);

// Load profile
onMounted(async () => {
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
    Object.assign(form.value, json.data);
  }
});

// Avatar
const onAvatarChange = (e) => {
  const file = e.target.files[0];
  if (file) form.value.avatar = URL.createObjectURL(file);
};

// Update
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
        body: JSON.stringify(form.value),
      },
    );
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    alert("Profile updated successfully!");
  } catch (err) {
    alert(err.message || "Update failed");
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

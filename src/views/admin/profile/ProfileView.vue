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
    <ProfileTabsAdmin />

    <!-- Main Profile Card -->
    <div
      v-if="user"
      class="card border-2 shadow-sm rounded-4 mt-4 overflow-hidden align-content-center"
    >
      <!-- Profile Body -->
      <div class="card-body p-5 m-5">
        <!-- Avatar & Info -->
        <div class="row align-items-center mb-5">
          <div class="col-md-auto text-center text-md-start mb-4 mb-md-0">
            <div
              class="avatar-upload-container position-relative d-inline-block"
            >
              <img
                :src="user.avatar || 'https://ui-avatars.com/api/?name=Admin'"
                class="main-profile-img shadow"
                alt="User Avatar"
              />
              <div class="avatar-edit-badge">
                <i class="bi bi-camera-fill"></i>
              </div>
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

        <!-- Account Details -->
        <h6
          class="text-uppercase fw-bold text-muted small mb-4"
          style="letter-spacing: 1px"
        >
          Account Details
        </h6>

        <div class="row g-4">
          <!-- Full Name -->
          <div class="col-md-6 col-lg-3">
            <div class="info-card p-3 rounded-3 bg-light border-0">
              <label class="small text-muted d-block mb-1">Full Name</label>
              <span class="fw-semibold fs-5">{{ user.fullname }}</span>
            </div>
          </div>

          <!-- Email -->
          <div class="col-md-6 col-lg-3">
            <div class="info-card p-3 rounded-3 bg-light border-0">
              <label class="small text-muted d-block mb-1">Email Address</label>
              <span class="fw-semibold fs-5">{{ user.email }}</span>
            </div>
          </div>

          <!-- Phone Number -->
          <div class="col-md-6 col-lg-3">
            <div class="info-card p-3 rounded-3 bg-light border-0">
              <label class="small text-muted d-block mb-1">Phone Number</label>
              <span class="fw-semibold fs-5">{{ user.phoneNumber }}</span>
            </div>
          </div>

          <!-- Telegram Link -->
          <div class="col-md-6 col-lg-3">
            <div class="info-card p-3 rounded-3 bg-light border-0">
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
    </div>

    <!-- Loading Placeholder -->
    <div v-else class="text-center py-5">Loading profile...</div>
  </ProfileLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ProfileTabsAdmin from "@/components/profile/ProfileTabsAdmin.vue";

const user = ref(null);
const skills = ["HTML", "CSS", "Vue", "MySQL", "JavaScript"];
const route = useRoute();

const isActive = (routeName) => route.name === routeName;

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
    console.log("Fetched profile:", json.data); // debug
    if (json.result) {
      user.value = json.data;
    }
  } catch (error) {
    console.error("Failed to fetch profile:", error);
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;700&display=swap");

* {
  font-family: "Kantumruy Pro", sans-serif;
}

/* Avatar Upload Styling */

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
  background: #3b1e54;
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #fff;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Nav Tab Styling */
.nav-tab {
  padding: 12px 4px;
  font-weight: 600;
  text-decoration: none;
  color: #6c757d;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
}

.nav-tab.active {
  color: #3b1e54;
  border-bottom-color: #2b0151;
}
.card {
  margin: 80px;
}
/* Info Card Hover */
.info-card {
  transition: background 0.3s ease;
}

.info-card:hover {
  background: #e9ecef !important;
}
</style>

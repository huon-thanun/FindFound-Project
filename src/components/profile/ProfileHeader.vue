<template>
  <div class="card shadow-sm rounded-4 overflow-hidden border-0 mb-4">
    <div class="p-4 bg-white">
      <div class="d-flex align-items-center gap-4">
        <div class="position-relative">
          <img
            :src="user.avatar || defaultAvatar"
            alt="Avatar"
            class="avatar-img shadow-sm"
          />
          <div class="status-badge"></div>
        </div>

        <div class="flex-grow-1">
          <h4 class="fw-bold text-dark mb-1 text-capitalize">
            {{ user.fullname || "Admin Name" }}
          </h4>
          <div class="d-flex gap-2 align-items-center">
            <span class="badge bg-soft-purple text-purple px-3 rounded-pill">
              {{ user.role?.name || "USER" }}
            </span>
            <span class="text-muted small">
              <i class="bi bi-envelope me-1"></i> {{ user.email }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-light-subtle border-top px-4">
      <div class="d-flex gap-4">
        <RouterLink
          :to="{ name: 'admin.profile' }"
          class="nav-tab"
          :class="{ active: $route.name === 'admin.profile' }"
        >
          <i class="bi bi-grid-fill me-2"></i>ព័ត៌មានទូទៅ
        </RouterLink>

        <RouterLink
          :to="{ name: 'admin.profile.edit' }"
          class="nav-tab"
          :class="{ active: $route.name === 'admin.profile.edit' }"
        >
          <i class="bi bi-pencil-square me-2"></i>កែប្រែព័ត៌មាន
        </RouterLink>

        <RouterLink
          :to="{ name: 'admin.profile.security' }"
          class="nav-tab"
          :class="{ active: $route.name === 'admin.profile.security' }"
        >
          <i class="bi bi-shield-lock-fill me-2"></i>សុវត្ថិភាព
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Imports happen first
import { defineProps } from "vue";

// Define Props after imports
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const defaultAvatar =
  "https://ui-avatars.com/api/?background=3b1e54&color=fff&name=Admin";
</script>

<style scoped>
/* Brands & Colors */
.text-purple {
  color: #3b1e54;
}
.bg-soft-purple {
  background: rgba(59, 30, 84, 0.1);
}

/* Avatar Styling */
.avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  object-fit: cover;
  border: 3px solid #f8f9fa;
}

.status-badge {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 14px;
  height: 14px;
  background: #22c55e;
  border: 3px solid white;
  border-radius: 50%;
}

/* Tab Styling - The "Active" purple line */
.nav-tab {
  padding: 15px 5px;
  font-weight: 600;
  text-decoration: none;
  color: #64748b;
  border-bottom: 3px solid transparent;
  transition: 0.3s;
  display: flex;
  align-items: center;
}

.nav-tab:hover {
  color: #3b1e54;
}

.nav-tab.active {
  color: #3b1e54 !important;
  border-bottom: 3px solid #3b1e54;
}
</style>

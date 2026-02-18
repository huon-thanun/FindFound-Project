<template>
  <div
    class="card shadow-sm rounded-4 overflow-hidden border-0 mb-4 profile-header-card"
  >
    <div class="p-4 bg-white">
      <div class="d-flex align-items-center gap-4">
        <div class="position-relative">
          <img
            :src="user.avatar || defaultAvatar"
            alt="Avatar"
            class="avatar-img shadow"
          />
          <div class="status-badge pulse"></div>
        </div>

        <div class="flex-grow-1">
          <h4 class="fw-bold text-dark mb-1 text-capitalize">
            {{ user.fullname || "Admin Name" }}
          </h4>
          <div class="d-flex flex-wrap gap-3 align-items-center mt-1">
            <span
              class="badge bg-soft-purple text-purple px-3 py-1 rounded-pill fw-medium"
            >
              {{ user.role?.name || "USER" }}
            </span>
            <span class="text-muted small d-flex align-items-center">
              <i class="bi bi-envelope me-2"></i> {{ user.email }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-light-subtle border-top px-4 py-2">
      <div class="d-flex gap-4 flex-wrap">
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
// import { defineProps } from "vue";

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
/* ── Updated Styles ── */
.profile-header-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(59, 30, 84, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.profile-header-card:hover {
  box-shadow: 0 12px 40px rgba(59, 30, 84, 0.12);
}

/* Avatar */
.avatar-img {
  width: 90px;
  height: 90px;
  border-radius: 1.25rem;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 4px 16px rgba(59, 30, 84, 0.15);
  transition: all 0.35s ease;
}

.avatar-img:hover {
  transform: scale(1.05);
}

/* Status badge with pulse */
.status-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
  background: #22c55e;
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

/* Badge */
.bg-soft-purple {
  background: rgba(59, 30, 84, 0.12);
}
.text-purple {
  color: #3b1e54;
}

/* Tabs */
.nav-tab {
  padding: 14px 18px;
  font-weight: 600;
  color: #64748b;
  text-decoration: none;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
}

.nav-tab:hover {
  color: #3b1e54;
  background: rgba(59, 30, 84, 0.06);
}

.nav-tab.active {
  color: #3b1e54 !important;
  background: rgba(59, 30, 84, 0.1);
  border-bottom: 3px solid #3b1e54;
  font-weight: 700;
}

/* Responsive tweaks */
@media (max-width: 576px) {
  .avatar-img {
    width: 70px;
    height: 70px;
  }
  .nav-tab {
    padding: 12px 14px;
    font-size: 0.95rem;
  }
}
</style>

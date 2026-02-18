<template>
  <div class="sidebar d-none d-xl-flex">
    <!-- Logo -->
    <div class="brand-header">
      <div class="large-logo-box">
        <img
          src="../../assets/images/logo/logo.png"
          class="brand-logo"
          alt="Brand Logo"
        />
      </div>
      <div class="brand-accent-line"></div>
    </div>

    <!-- Navigation -->
    <nav class="nav-container">
      <router-link
        :to="{ name: 'admin.dashboard' }"
        class="nav-link-custom"
        exact
      >
        <div class="icon-box"><i class="bi bi-grid-1x2-fill"></i></div>
        <span>ផ្ទាំងគ្រប់គ្រង</span>
      </router-link>

      <router-link :to="{ name: 'admin.users' }" class="nav-link-custom" exact>
        <div class="icon-box"><i class="bi bi-people-fill"></i></div>
        <span>អ្នកប្រើប្រាស់</span>
      </router-link>

      <router-link
        :to="{ name: 'admin.categories' }"
        class="nav-link-custom"
        exact
      >
        <div class="icon-box"><i class="bi bi-bookmark-star-fill"></i></div>
        <span>ប្រភេទការបង្ហោះ</span>
      </router-link>

      <router-link
        :to="{ name: 'admin.reports' }"
        class="nav-link-custom"
        exact
      >
        <div class="icon-box"><i class="bi bi-file-earmark-text-fill"></i></div>
        <span>ការបង្ហោះ</span>
      </router-link>
    </nav>

    <!-- Footer -->
    <div class="sidebar-footer pt-4 border-top">
      <button class="action-btn security" @click="goToSecurity">
        <i class="bi bi-gear"></i> ការកំណត់
      </button>
    </div>
    <div class="sidebar-footer border-0">
     <button class="btn action-btn logout" @click="openLogoutModal">
        <i class="bi bi-box-arrow-right"></i> ចាកចេញ
      </button>
    </div>

    <!-- Logout Modal -->
<!-- Logout Modal -->
  <BaseModal
    v-if="showLogoutModal"
    title="ចាកចេញពីគណនី"
    icon="exclamation-triangle"
    theme="danger"
    :isClose="showLogoutModal"
    @closeModal="closeLogoutModal"
  >
    <template #body>
      <p class="khmer-font text-center mb-0">តើអ្នកពិតជាចង់ចាកចេញមែនទេ?</p>
    </template>
    <template #btnClose>
      <BaseButton variant="cancel" class="col-6" @click="closeLogoutModal">
        បោះបង់
      </BaseButton>
    </template>
    <template #btnActive>
      <BaseButton variant="danger" class="col-6" @click="logout">
        បញ្ជាក់
      </BaseButton>
    </template>
  </BaseModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const auth = useAuthStore();
const router = useRouter();
const showLogoutModal = ref(false);

const closeLogoutModal = () => {
  showLogoutModal.value = false;
};

const logout = () => {
  localStorage.clear();
  auth.logout();
  router.push("/admin/login");
};
/* Go to Profile Security page */
function goToSecurity() {
  router.push({ name: "admin.profile.security" });
}
function openLogoutModal() {
  showLogoutModal.value = true;
}

function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  showLogoutModal.value = false;
  router.replace({ name: "login" });
}
</script>

<style scoped>
.sidebar {
  width: 300px; /* Slightly wider for big logo comfort */
  height: 100vh;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.brand-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.large-logo-box {
  width: 100%;
  height: 100px; /* Very large logo area – adjust to 180–260px if needed */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 32px; /* Side padding to prevent edge touching */
}

.brand-logo {
  max-width: 100%;
  height: 200px;
  object-fit: contain;
  transition: transform 0.28s ease;
}

.brand-logo:hover {
  transform: scale(1.04);
}

.brand-accent-line {
  width: 64px;
  height: 4px;
  background: linear-gradient(90deg, #a78bfa, #7c3aed);
  border-radius: 2px;
  margin: 20px 0 28px;
  box-shadow: 0 2px 8px rgba(167, 139, 250, 0.15);
}

.nav-container {
  flex: 1;
  padding: 12px 20px;
  overflow-y: auto;
}

.nav-link-custom {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 18px;
  margin: 4px 0;
  border-radius: 12px;
  color: #475569;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.22s ease;
}

.icon-box {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #f8fafc;
  color: #64748b;
  font-size: 1.25rem;
  transition: all 0.22s ease;
}

.nav-link-custom:hover {
  background: rgba(124, 58, 237, 0.07);
  color: #7c3aed;
}

.router-link-exact-active {
  background: linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%) !important;
  color: white !important;
  font-weight: 600;
  box-shadow: 0 6px 16px rgba(124, 58, 237, 0.25);
}

.router-link-exact-active .icon-box {
  background: rgba(255, 255, 255, 0.25);
  color: white;
}

.sidebar-footer {
  padding: 5px 20px 10px;
}

.action-btn {
  width: 100%;
  padding: 13px 18px;
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 12px;
  transition: all 0.22s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.07);
}

.action-btn.security {
  background: rgba(16, 185, 129, 0.09);
  color: #10b981;
}

.action-btn.logout {
  background: rgba(239, 68, 68, 0.09);
  color: #ef4444;
}

/* Mobile behavior (slide out) */

</style>

<template>
  <div class="sidebar d-none d-lg-flex">
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

    <nav class="nav-container primary-color">
      <div class="menu-label">មេនុយមេ</div>

      <router-link :to="{ name: 'admin.dashboard' }" class="nav-link-custom">
        <div class="icon-box"><i class="bi bi-grid-1x2-fill"></i></div>
        <span>ផ្ទាំងគ្រប់គ្រង</span>
      </router-link>

      <router-link :to="{ name: 'admin.users' }" class="nav-link-custom">
        <div class="icon-box"><i class="bi bi-people-fill"></i></div>
        <span>អ្នកប្រើប្រាស់</span>
      </router-link>

      <router-link :to="{ name: 'admin.categories' }" class="nav-link-custom">
        <div class="icon-box"><i class="bi bi-bookmark-star-fill"></i></div>
        <span>ប្រភេទរបាយការណ៍</span>
      </router-link>

      <router-link :to="{ name: 'admin.reports' }" class="nav-link-custom">
        <div class="icon-box"><i class="bi bi-file-earmark-text-fill"></i></div>
        <span>របាយការណ៍</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <button class="action-btn security" title="Security Settings">
        <i class="bi bi-shield-lock"></i> ការកំណត់សុវត្ថិភាព
      </button>
    </div>

    <BaseModal
      :title="'ចាកចេញពីគណនី'"
      :icon="'exclamation-triangle'"
      :theme="'danger'"
      :isClose="showModal"
      @closeModal="showModal = true"
    >
      <template #body>
        <p class="text-center py-3">តើអ្នកពិតជាចង់ចាកចេញពីកម្មវិធីមែនទេ?</p>
      </template>
      <template #btnClose>
        <BaseButton variant="cancel" class="col-6" @click="isOpen"
          >បោះបង់</BaseButton
        >
      </template>
      <template #btnActive>
        <BaseButton variant="danger" class="col-6">បញ្ជាក់</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
const showModal = ref(false);
function isOpen() {
  showModal.value = !showModal.value;
}
</script>

<style scoped>
.sidebar {
  width: 280px;
  height: 100vh;
  background-color: #2e1065;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  border-right: 1px solid rgba(167, 139, 250, 0.1);
}
/* Brand Section - Optimized for Visibility */
.brand-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.large-logo-box {
  width: 100%;
  height: 120px; /* Increased from 80px to 120px */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible; /* Allows any glow/shadow to show */
}

.brand-logo {
  /* This allows the logo to take up as much space as it needs 
     up to the full width of the sidebar minus padding */
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;

  object-fit: contain;

  /* If your logo is already colorful, remove this filter line */
  filter: brightness(0) invert(1);

  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.brand-logo:hover {
  transform: scale(1.05);
}

/* A sleek purple divider under the logo */
.brand-accent-line {
  width: 50px;
  height: 4px;
  background: linear-gradient(90deg, #a78bfa, #7c3aed);
  margin-top: 25px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(139, 92, 246, 0.3);
}

/* Navigation Menu */
.nav-container {
  flex: 1;
  padding: 10px 16px;
  overflow-y: auto;
}

.menu-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #a78bfa;
  font-weight: 700;
  margin: 20px 0 10px 12px;
}

.nav-link-custom {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  margin-bottom: 6px;
  border-radius: 12px;
  color: #ddd6fe;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.25s ease;
}

.icon-box {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  font-size: 18px;
}

.nav-link-custom:hover {
  color: #ffffff;
  background: rgba(139, 92, 246, 0.15);
}

.router-link-active {
  background: linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
}

.router-link-active .icon-box {
  background: rgba(255, 255, 255, 0.2);
}

/* Footer Section */
.sidebar-footer {
  padding: 20px 16px;
  border-top: 1px solid rgba(167, 139, 250, 0.1);
}

.action-btn {
  border: none;
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
  width: 100%;
  margin-bottom: 8px;
}

.action-btn.security {
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
}

.action-btn.logout {
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
}

.action-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}
</style>

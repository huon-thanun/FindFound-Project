<template>
  <div class="sidebar col-lg-3 d-none d-lg-block">
    <!-- Logo Section -->
    <div class="logo-section">
      <div class="d-flex align-items-center">
        <img src="../../assets/images/logo/logo.png" class="object-fit-cover" height="79px" width="170px" alt="">
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="nav-menu">
      <router-link
        :to="{ name: 'admin.dashoard' }"
        class="nav-item"
      >
        Dashboard
      </router-link>

      <router-link
        :to="{ name: 'admin.users' }"
        class="nav-item"
      >
        Users
      </router-link>

      <router-link
        :to="{ name: 'admin.categories' }"
        class="nav-item"
      >
        Categories
      </router-link>

      <router-link
        :to="{ name: 'admin.reports' }"
        class="nav-item"
      >
        Reports
      </router-link>
    </nav>

    <!-- User Section -->
    <div class="user-section">
      <base-button icon="person-fill-gear" variant="success" class="security-btn">
        <!-- Logout SVG -->
        <span>Security</span>
      </base-button><br>
      <base-button @click="isOpen" icon="box-arrow-right" variant="danger" class="logout-btn">
        <!-- Logout SVG -->
        <span>Logout</span>
      </base-button>
    </div>
    <BaseModal
      :title="'Logout'"
      :icon="'exclamation-triangle'"
      :theme="'danger'"
      :isClose="showModal"
      @closeModal="showModal = true"
    >
      <template #body>
        <p>Are you sure ?</p>
      </template>
      <template #btnClose>
        <BaseButton variant="cancel" icon="x-circle" class="col-6" @click="isOpen">Close</BaseButton>
      </template>
      <template #btnActive>
        <BaseButton variant="danger" icon="check-circle" class="col-6 ">Confirm</BaseButton>
      </template>
    </BaseModal>
    </div>
</template>

<script setup>
import { ref } from "vue";
const showModal = ref(false);
function isOpen(){
  showModal.value = !showModal.value
}

</script>

<style scoped>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  background-color: #f5f5f5;
}

.sidebar {
  height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  transition: .3s;
    width: 21%;
    flex:0 0 auto;
  position: fixed;
  z-index: 99;
}

.logo-section {
  border-bottom: 1px solid #e5e7eb;
}

.logo-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.logo-text h1 {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
}

.logo-text p {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 0;
}

.nav-menu {
  flex: 1;
  padding: 16px 20px;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 4px;
  border-radius: 8px;
  color: #4b5563;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
}

.nav-item:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.router-link-active {
  background-color: #dbeafe;
  color: #2563eb;
}

.nav-item svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.user-section {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  padding: 20px;
  border-top: 1px solid #e5e7eb;
  background-color: #ffffff;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fde68a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.user-details h3 {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
}

.user-details p {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 0;
}

.logout-btn,.security-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background-color: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.logout-btn svg {
  width: 18px;
  height: 18px;
}
@media (max-width: 992px) {
  .logo-section{
    opacity: 0;
  }
}
</style>
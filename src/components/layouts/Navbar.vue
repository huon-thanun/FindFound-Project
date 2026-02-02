<template>
  <SidebarAdmin class="sidebar" :class="{ closed: isOpen }" />

  <nav class="navbar-top shadow-sm">
    <div
      class="container-fluid d-flex justify-content-between align-items-center h-100"
    >
      <div class="d-flex align-items-center gap-3">
        <button
          @click="toggleSidebar"
          class="btn btn-light d-lg-none rounded-circle"
        >
          <i :class="isOpen ? 'bi bi-list' : 'bi bi-x-lg'"></i>
        </button>

        <div class="navbar-brand-container">
          <img
            src="../../assets/images/logo/logo.png"
            height="150px"
            alt="Logo"
            class="navbar-logo"
          />
        </div>

        <div class="search-box d-none d-lg-block ms-2">
          <i class="bi bi-search search-icon"></i>
          <input type="text" placeholder="ស្វែងរក..." class="khmer-font" />
        </div>
      </div>

      <div class="navbar-user">
        <div class="dropdown hover-dropdown">
          <div class="user-profile shadow-sm">
            <div class="user-profile-avatar">
              <img
                :src="
                  admin.avatar ||
                  `https://ui-avatars.com/api/?name=${admin.fullname}&background=3b1e54&color=fff`
                "
                class="avatar-img"
                alt="avatar"
              />
            </div>
            <div class="user-info d-none d-md-block">
              <span class="user-profile-name">{{ admin.fullname }}</span>
            </div>
            <i class="bi bi-chevron-down chevron-icon ms-1"></i>
          </div>

          <ul
            class="dropdown-menu dropdown-menu-end shadow-lg animated-dropdown"
          >
            <li>
              <router-link class="dropdown-item khmer-font" to="/admin/profile">
                <i class="bi bi-person-circle"></i> គណនីផ្ទាល់ខ្លួន
              </router-link>
            </li>
            <li>
              <a class="dropdown-item khmer-font" href="#">
                <i class="bi bi-gear"></i> ការកំណត់
              </a>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a
                class="dropdown-item khmer-font text-danger"
                href="javascript:void(0)"
                @click.prevent="openLogoutModal"
              >
                <i class="bi bi-box-arrow-right"></i> ចាកចេញ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <BaseModal
    v-if="showLogoutModal"
    :title="'ចាកចេញ'"
    icon="exclamation-triangle"
    theme="danger"
    :isClose="showLogoutModal"
    @closeModal="closeLogoutModal"
  >
    <template #body>
      <p class="khmer-font text-center mb-0">តើអ្នកពិតជាចង់ចាកចេញមែនទេ?</p>
    </template>
    <template #btnClose>
      <BaseButton variant="cancel" class="col-6" @click="closeLogoutModal"
        >បិទ</BaseButton
      >
    </template>
    <template #btnActive>
      <BaseButton variant="danger" class="col-6" @click="logout"
        >បញ្ជាក់</BaseButton
      >
    </template>
  </BaseModal>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const auth = useAuthStore();
const router = useRouter();
const showLogoutModal = ref(false);

const admin = computed(() => ({
  fullname: auth.user?.fullname || "Admin User",
  avatar: auth.user?.avatar || "",
}));

const openLogoutModal = () => (showLogoutModal.value = true);
const closeLogoutModal = () => (showLogoutModal.value = false);

const logout = () => {
  localStorage.clear();
  auth.logout();
  router.push("/admin/login");
};
</script>

<style scoped>
.navbar-brand-container {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.navbar-brand-container:hover {
  transform: scale(1.05); /* Slight pop when hovering logo */
}

.navbar-logo {
  object-fit: contain;
  max-width: 150px; /* Adjust based on your logo width */
}

/* Ensure the navbar items don't feel cramped */
.gap-4 {
  gap: 1.5rem !important;
}

/* 1. Navbar Container */
.navbar-top {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid #eef2f6;
  height: 75px;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0 1rem;
}

/* 2. Hover Bridge Strategy */
.hover-dropdown {
  position: relative;
  padding: 10px 0; /* Creates invisible hover area */
}

/* 3. User Profile Trigger */
.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 15px 5px 6px;
  border-radius: 50px;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-profile-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #fff;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-profile-name {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
}

.admin-label {
  font-size: 10px;
  color: #94a3b8;
  text-transform: uppercase;
}

.chevron-icon {
  font-size: 12px;
  color: #cbd5e1;
  transition: transform 0.3s ease;
}

/* 4. Dropdown Menu (The 'Show' Logic) */
.animated-dropdown {
  display: block;
  visibility: hidden;
  opacity: 0;
  top: 100%;
  right: 0;
  min-width: 220px;
  border: none;
  border-radius: 15px !important;
  padding: 10px !important;
  transform: translateY(15px);
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  pointer-events: none;
}

/* Hover Action */
@media (min-width: 992px) {
  .hover-dropdown:hover .animated-dropdown {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .hover-dropdown:hover .user-profile {
    background-color: #f8fafc;
    border-color: #cbd5e1;
  }

  .hover-dropdown:hover .chevron-icon {
    transform: rotate(180deg);
  }
}

/* 5. Menu Items */
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 15px;
  font-size: 14px;
  color: #475569;
  border-radius: 10px !important;
  transition: 0.2s;
}

.dropdown-item i {
  font-size: 18px;
  color: #94a3b8;
}

.dropdown-item:hover {
  background-color: #f1f0ff;
  color: #3b1e54;
  padding-left: 18px; /* Slight slide effect */
}

.dropdown-item:hover i {
  color: #3b1e54;
}

/* 6. Utility Styles */
.search-box {
  position: relative;
}

.search-box input {
  height: 40px;
  width: 280px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background-color: #f8fafc;
  padding-left: 40px;
  transition: 0.3s;
}

.search-box input:focus {
  width: 320px;
  background: #fff;
  outline: none;
  border-color: #3b1e54;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.khmer-font {
  font-family: "Noto Sans Khmer", sans-serif;
}
</style>

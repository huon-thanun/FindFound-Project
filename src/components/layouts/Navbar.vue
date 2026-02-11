<template>
  <SidebarAdmin
    class="mobile-sidebar d-lg-none"
    :class="{ 'sidebar-open': !isOpen }"
  />

  <nav class="navbar-top">
    <div
      class="nav-glass-container d-flex justify-content-between align-items-center"
    >
      <div class="d-flex align-items-center gap-3">
        <button @click="toggleSidebar" class="modern-toggle d-lg-none">
          <div class="hamburger" :class="{ active: !isOpen }">
            <span></span><span></span><span></span>
          </div>
        </button>

        <div class="welcome-box d-none d-lg-flex">
          <div class="sparkle-icon"><i class="bi bi-stars"></i></div>
          <div class="welcome-text-group">
            <span class="top-label">ផ្ទាំងគ្រប់គ្រង</span>
            <h1 class="main-welcome">
              សួស្តី,
              <span class="purple-gradient-text">{{ admin.fullname }}</span>
            </h1>
          </div>
        </div>
      </div>

      <div class="search-container d-none d-xl-flex">
        <i class="bi bi-search search-icon"></i>
        <input
          type="text"
          placeholder="ស្វែងរកទិន្នន័យ..."
          class="search-input"
        />
      </div>

      <div class="d-flex align-items-center gap-3">
        <button class="icon-action-btn d-none d-md-flex">
          <i class="bi bi-bell"></i>
          <span class="notification-badge"></span>
        </button>

        <div class="navbar-user">
          <div class="custom-dropdown-container">
            <div
              class="profile-pill"
              :class="{ 'pill-active': isDropdownOpen }"
              @click="toggleDropdown($event)"
            >
              <div class="avatar-wrapper">
                <img
                  :src="
                    admin.avatar ||
                    'https://ui-avatars.com/api/?name=Admin&background=8b5cf6&color=fff'
                  "
                  alt="avatar"
                />
                <div class="online-status"></div>
              </div>
              <div class="user-meta d-none d-lg-block">
                <span class="name">{{ admin.fullname }}</span>
                <span class="role">អ្នកគ្រប់គ្រង</span>
              </div>
              <i
                class="bi bi-chevron-down arrow-ui"
                :class="{ rotated: isDropdownOpen }"
              ></i>
            </div>

            <ul
              class="dropdown-menu dropdown-menu-end shadow-lg animated-dropdown"
            >
              <li>
                <router-link
                  class="dropdown-item khmer-font"
                  to="/admin/profile"
                >
                  <i class="bi bi-person-circle"></i> គណនីផ្ទាល់ខ្លួន
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item khmer-font"
                  to="/admin/profile-security"
                >
                  <i class="bi bi-gear"></i> ការកំណត់
                </router-link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
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
    </div>
  </nav>

  <BaseModal
    v-if="showLogoutModal"
    :title="'ចាកចេញពីគណនី'"
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
        >បោះបង់</BaseButton
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import SidebarAdmin from "./Sidebar.vue";

const auth = useAuthStore();
const router = useRouter();

// --- REFS ---
const showLogoutModal = ref(false);
const isOpen = ref(true); // Sidebar state
const isDropdownOpen = ref(false); // Dropdown state (MUST HAVE THIS)

// --- COMPUTED ---
const admin = computed(() => ({
  fullname: auth.user?.fullname || "Admin User",
  avatar: auth.user?.avatar || "",
}));

// --- FUNCTIONS ---
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const toggleDropdown = (event) => {
  // Prevent the click from bubbling up to the window listener immediately
  event.stopPropagation();
  isDropdownOpen.value = !isDropdownOpen.value;
};

const openLogoutModal = () => {
  showLogoutModal.value = true;
  isDropdownOpen.value = false; // Close menu when opening modal
};

const closeLogoutModal = () => (showLogoutModal.value = false);

// Function to close dropdown when clicking outside
const closeOutside = (e) => {
  if (isDropdownOpen.value) {
    isDropdownOpen.value = false;
  }
};

const handleResize = () => {
  if (window.innerWidth <= 992) {
    isOpen.value = true;
  } else {
    isOpen.value = false;
  }
};

// --- LIFECYCLE ---
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
  // Add listener to close dropdown when clicking anywhere else
  window.addEventListener("click", closeOutside);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("click", closeOutside);
});

const logout = () => {
  localStorage.clear();
  auth.logout();
  router.push("/admin/login");
};
</script>

<style scoped>
/* New Search Bar Styles */
.search-container {
  position: relative;
  width: 300px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.sidebar.closed {
  transform: translateX(-300px);
}

.search-input {
  width: 100%;
  padding: 10px 15px 10px 45px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  font-size: 14px;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #8b5cf6;
  background: white;
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
}

/* Icon Buttons (Bell, etc) */
.icon-action-btn {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #64748b;
  transition: 0.3s;
}

.navbar-brand-container:hover {
  transform: scale(1.05);
  /* Slight pop when hovering logo */
}

.navbar-logo {
  object-fit: contain;
  max-width: 150px;
  /* Adjust based on your logo width */
}
.icon-action-btn:hover {
  background: #f5f3ff;
  color: #7c3aed;
  border-color: #ddd6fe;
}

.notification-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  border: 2px solid white;
}

/* Ensure the divider is thin and clean */
.dropdown-divider-thin {
  height: 1px;
  background: #f1f5f9;
  margin: 10px 0;
}
/* 1. Navbar Container - Floating Glass Effect */
.navbar-top {
  height: 90px;
  position: sticky;
  top: 0;
  z-index: 999;
  padding: 10px 25px;
  background: #f8fafc; /* Matches dashboard bg */
}

/* 2. Hover Bridge Strategy */
.hover-dropdown {
  position: relative;
  padding: 10px 0;
  /* Creates invisible hover area */
}
@media (min-width: 992px) {
  .navbar-top {
    width: calc(100% - 280px);
    margin-left: 280px;
  }
}

.nav-glass-container {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  height: 100%;
  border-radius: 20px;
  padding: 0 20px;
  border: 1px solid rgba(139, 92, 246, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

/* 2. Welcome Section */
.welcome-box {
  gap: 15px;
}
.sparkle-icon {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
}
.top-label {
  font-size: 11px;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 700;
  letter-spacing: 1px;
}
.main-welcome {
  font-size: 1.2rem;
  font-weight: 800;
  margin: 0;
  color: #1e1b4b;
}
.purple-gradient-text {
  background: linear-gradient(90deg, #7c3aed, #db2777);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 3. Profile Pill Design */
.profile-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 6px 15px 6px 8px;
  border-radius: 50px;
  border: 1px solid #f1f5f9;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-pill:hover,
.pill-active {
  border-color: #8b5cf6;
  box-shadow: 0 10px 15px -3px rgba(139, 92, 246, 0.1);
  transform: translateY(-2px);
}

.avatar-wrapper {
  position: relative;
  width: 40px;
  height: 40px;
}
.avatar-wrapper img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #8b5cf6;
}
.online-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: #10b981;
  border: 2px solid white;
  border-radius: 50%;
}

.user-meta {
  line-height: 1.1;
}
.user-meta .name {
  display: block;
  font-weight: 700;
  color: #1e293b;
  font-size: 14px;
}
.user-meta .role {
  font-size: 10px;
  color: #94a3b8;
  font-weight: 600;
}

/* 4. Premium Dropdown Menu */
.premium-dropdown {
  position: absolute;
  top: 110%;
  right: 0;
  min-width: 220px;
  border: none;
  border-radius: 15px !important;
  padding: 10px !important;
  transform: translateY(15px);
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  pointer-events: none;
}

@media (max-width: 992px) {
  .navbar-top {
    width: 100% !important;
  }
}

@media (min-width: 992px) {
  .sidebar {
    display: none !important;
  }
}

/* Hover Action */
.hover-dropdown:hover .animated-dropdown {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  width: 260px;
  background: white;
  border-radius: 20px;
  padding: 15px;
  border: 1px solid rgba(139, 92, 246, 0.1);
  box-shadow: 0 20px 40px rgba(46, 16, 101, 0.12);
}

.dropdown-user-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 15px;
}
.header-avatar {
  width: 45px;
  height: 45px;
  border-radius: 12px;
}
.header-info strong {
  display: block;
  font-size: 14px;
  color: #1e1b4b;
}
.header-info p {
  font-size: 12px;
  color: #94a3b8;
  margin: 0;
}

.p-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 12px;
  color: #475569;
  text-decoration: none;
  font-weight: 600;
  transition: 0.2s;
  font-size: 14px;
}

.dropdown-item i {
  font-size: 18px;
  color: #94a3b8;
}

.dropdown-item:hover {
  background-color: #f1f0ff;
  color: #3b1e54;
  padding-left: 18px;
  /* Slight slide effect */
}
.p-item:hover {
  background: #f5f3ff;
  color: #7c3aed;
  padding-left: 15px;
}
.p-icon {
  width: 32px;
  height: 32px;
  background: #f8fafc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.p-item:hover .p-icon {
  background: white;
  color: #7c3aed;
}

/* 5. Mobile Toggle Styling */
.modern-toggle {
  background: white;
  border: 1px solid #e2e8f0;
  width: 45px;
  height: 45px;
  border-radius: 12px;
}
.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: #7c3aed;
  margin: 4px auto;
  transition: 0.3s;
}

/* Animations */
.premium-slide-enter-active {
  animation: p-slide-in 0.3s ease-out;
}
.premium-slide-leave-active {
  animation: p-slide-in 0.2s ease-in reverse;
}
@keyframes p-slide-in {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>

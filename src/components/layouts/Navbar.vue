<template>
  <SidebarAdmin class="sidebar" :class="!isSidebarOpen ? '' : 'closed'"></SidebarAdmin>
  <nav class="navbar-top">
    <div
      class="nav-glass-container ps-xl-4 ps-0 d-flex justify-content-between align-items-center"
    >
      <!-- Left: Toggle + Welcome -->
      <div class="d-flex align-items-center d-none d-xl-block gap-3">
        <div class="welcome-box d-none d-lg-flex align-items-center gap-3">
          <div class="sparkle-icon">
            <i class="bi bi-stars"></i>
          </div>
          <div class="welcome-text-group">
            <h2 class="main-welcome mb-0">
              សួស្តី,
              <span class="purple-gradient-text">{{ admin.fullname }}</span>
            </h2>
          </div>
        </div>
      </div>

      <div class="d-xl-none">
        <img src="../../assets/images/logo/logo.png" height="200px" alt="">
      </div>

      <!-- Right: Notification + Profile Dropdown -->
      <div class="d-flex align-items-center gap-3">
        <div class="navbar-user">
          <div
            ref="dropdownContainer"
            class="custom-dropdown-container position-relative"
          >
            <div
              class="profile-pill"
              :class="{ 'pill-active': isDropdownOpen }"
              @click.stop="toggleDropdown"
              role="button"
              tabindex="0"
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

              <div class="user-meta d-none d-xl-block">
                <span class="name">{{ admin.fullname }}</span>
              </div>

              <i
                class="bi bi-chevron-down arrow-ui ms-2"
                :class="{ rotated: isDropdownOpen }"
              ></i>
            </div>

            <!-- Dropdown Menu -->
            <ul
              v-if="isDropdownOpen"
              class="dropdown-menu dropdown-menu-end shadow-lg animated-dropdown show"
            >
              <li>
                <router-link
                  class="dropdown-item khmer-font"
                  to="/admin/profile"
                >
                  <i class="bi bi-person-circle"></i>
                  គណនីផ្ទាល់ខ្លួន
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item khmer-font"
                  to="/admin/profile-security"
                >
                  <i class="bi bi-gear"></i>
                  ការកំណត់
                </router-link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a
                  class="dropdown-item khmer-font text-danger"
                  href="#"
                  @click.prevent="openLogoutModal"
                >
                  <i class="bi bi-box-arrow-right"></i>
                  ចាកចេញ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <base-button @click="toggleSidebar" class="d-block d-xl-none" variant="primary"
          ><i :class="isSidebarOpen ? 'bi bi-list' : 'bi bi-x-lg'"></i>
        </base-button>
      </div>
    </div>
  </nav>

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
      <BaseButton variant="cancel" icon="x-circle" class="col-6" @click="closeLogoutModal">
        បោះបង់
      </BaseButton>
    </template>
    <template #btnActive>
      <BaseButton variant="danger" :isLoading="auth.loading" icon="box-arrow-left" class="col-6" @click="logout">
        បញ្ជាក់
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import SidebarAdmin from "./Sidebar.vue";

const isSidebarOpen = ref(true); 
const toggleSidebar = () => {
  if (window.innerWidth < 1200) {
    isSidebarOpen.value = !isSidebarOpen.value;
  }
};
/* Auto control by screen size */
const handleResize = () => {
  if (window.innerWidth >= 1100) {
    isSidebarOpen.value = true; // FORCE OPEN
  }
};
onMounted(() => {
  // run once on load
  handleResize();

  // listen resize
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
const auth = useAuthStore();
const router = useRouter();

const showLogoutModal = ref(false);
const isOpen = ref(true); // sidebar state
const isDropdownOpen = ref(false);
const dropdownContainer = ref(null);

const admin = computed(() => ({
  fullname: auth.user?.fullname || "Admin User",
  avatar: auth.user?.avatar || "",
}));

// ── Functions ────────────────────────────────────────────────


const toggleDropdown = (e) => {
  e.stopPropagation();
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = (event) => {
  if (
    dropdownContainer.value &&
    !dropdownContainer.value.contains(event.target) &&
    isDropdownOpen.value
  ) {
    isDropdownOpen.value = false;
  }
};

const openLogoutModal = () => {
  showLogoutModal.value = true;
  isDropdownOpen.value = false;
};

const closeLogoutModal = () => {
  showLogoutModal.value = false;
};

const logout = () => {
  localStorage.clear();
  auth.logout();
  router.push("/admin/login");
};

// ── Lifecycle ────────────────────────────────────────────────
onMounted(() => {
  const updateSidebar = () => {
    isOpen.value = window.innerWidth <= 992;
  };
  updateSidebar();
  window.addEventListener("resize", updateSidebar);
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  window.removeEventListener("resize", () => {});
  document.removeEventListener("click", closeDropdown);
});
</script>

<style scoped>
/* ── Navbar Base ───────────────────────────────────────────── */
.navbar-top {
  height: 100px;
  position: sticky;
  max-width: 100%;
   padding: 10px 15px;
  top: 0;
  z-index: 999;
  background: #f8fafc;
  border-bottom: 1px solid rgba(139, 92, 246, 0.08);
}

.nav-glass-container {
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(139, 92, 246, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  padding: 0 20px;
}

/* Full width on all screens – no forced offset */

/* ── Profile Pill & Dropdown ───────────────────────────────── */
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

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1050;
  min-width: 220px;
  margin-top: 8px;
  padding: 8px 0;
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(139, 92, 246, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.dropdown-menu.show {
  display: block !important;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  color: #475569;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background: #f5f3ff;
  color: #7c3aed;
  padding-left: 24px;
}

/* ── Welcome Box ───────────────────────────────────────────── */
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

.purple-gradient-text {
  background: linear-gradient(90deg, #7c3aed, #db2777);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ── Mobile Toggle ─────────────────────────────────────────── */
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

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger.active span:nth-child(2) {
  opacity: 0;
}
.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.sidebar{
  display: flex !important;
  position: absolute !important;
  right: 0 !important;
  top: 0 !important;
}
/* ── Responsive ────────────────────────────────────────────── */
.sidebar.closed {
  transform: translateX(-300px);
}
</style>

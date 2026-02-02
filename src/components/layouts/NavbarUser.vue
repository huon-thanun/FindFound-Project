<template>
  <div class="sidebar col-lg-3" :class="!isOpen ? '' : 'closed'">
    <!-- Logo Section -->
    <div class="logo-section opacity-0">
      <div class="d-flex align-items-center">
        <img
          src="../../assets/images/logo/logo.png"
          class="object-fit-cover"
          height="79px"
          width="170px"
          alt=""
        />
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="nav-menu">
      <router-link to="/" class="nav-item"> Dashboard </router-link>

      <router-link to="about" class="nav-item"> Users </router-link>

      <router-link to="/about" class="nav-item"> Categories </router-link>

      <router-link to="reports" class="nav-item"> Reports </router-link>
    </nav>

    <!-- User Section -->
    <div class="user-section">
      <div v-if="showAuthButtons">
        <base-button
          class="handle-btn mb-3"
          icon="person-circle"
          variant="secondary"
        >
          Login
        </base-button>
        <base-button class="handle-btn" icon="person-plus-fill">
          Register
        </base-button>
      </div>
      <div v-else>
        <base-button
          class="handle-btn mb-3"
          icon="plus-circle"
          variant="secondary"
        >
          បាត់
        </base-button>
        <base-button class="handle-btn" icon="plus-circle"> រកឃើញ </base-button>
      </div>
    </div>

    <!-- SHOW Lost / Found when HAS token -->
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
        <BaseButton
          variant="cancel"
          icon="x-circle"
          class="col-6"
          @click="isOpen"
          >Close</BaseButton
        >
      </template>
      <template #btnActive>
        <BaseButton variant="danger" icon="check-circle" class="col-6"
          >Confirm</BaseButton
        >
      </template>
    </BaseModal>
  </div>
  <!-- Navigation Bar -->
  <nav class="navbar p-0 navbar-expand-lg navbar-custom">
    <div class="container-fluid px-5">
      <div class="toggle-btn d-none">
        <base-button @click="toggleSidebar" variant="primary"
          ><i :class="isOpen ? 'bi bi-list' : 'bi bi-x-lg'"></i>
        </base-button>
      </div>
      <!-- Logo and Brand -->
      <div>
        <router-link to="/" class="navbar-brand-custom me-auto">
          <img
            src="../../assets/images/logo/logo.png"
            class="object-fit-cover"
            height="79px"
            width="170px"
            alt=""
          />
        </router-link>
      </div>

      <!-- Navbar Content -->
      <div id="navbarContent">
        <div class="d-lg-flex w-100 align-items-center justify-content-center">
          <!-- Navigation Links -->
          <ul class="navbar-nav navbar-nav-custom">
            <li class="nav-item">
              <router-link
                to="/"
                class="nav-link-custom"
                :class="{ active: activeLink === 'home' }"
                @click.prevent="setActive('home')"
              >
                ទំព័រ​ដើម
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                to="reports"
                class="nav-link-custom"
                :class="{ active: activeLink === 'reports' }"
                @click.prevent="setActive('reports')"
              >
                របាយការណ៍
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                to=""
                class="nav-link-custom"
                :class="{ active: activeLink === 'categories' }"
                @click.prevent="setActive('categories')"
              >
                Categories
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                to="about"
                class="nav-link-custom"
                :class="{ active: activeLink === 'about' }"
                @click.prevent="setActive('about')"
              >
                អំពី​យើង
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                to=""
                class="nav-link-custom"
                :class="{ active: activeLink === 'contact' }"
                @click.prevent="setActive('contact')"
              >
                ទំនាក់ទំនង
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- Right Side Items -->
      <!-- SHOW Login / Register when NO token -->
      <div
        v-if="showAuthButtons"
        class="btn-active d-flex align-items-center gap-3"
      >
        <base-button icon="person-circle" variant="secondary" class="btn-login">
          ចូល
        </base-button>
        <base-button icon="person-plus-fill" class="btn-register">
          ចុះឈ្មោះ
        </base-button>
      </div>

      <!-- SHOW Lost / Found when HAS token -->
      <div v-else class="d-flex align-items-center gap-3">
        <base-button icon="plus-circle" variant="secondary" class="btn-lost">
          បាត់
        </base-button>
        <base-button icon="plus-circle" class="btn-found"> រកឃើញ </base-button>
        <div>
          <!-- User Profile Dropdown -->
          <div class="user-profile">
            <img
              src="https://ui-avatars.com/api/?name=John+Doe&background=17a2b8&color=fff&size=128"
              alt="User Avatar"
              class="user-avatar"
            />

            <!-- Dropdown Menu -->
            <div class="dropdown-menu-custom">
              <!-- User Info Header -->
              <div class="dropdown-header-custom">
                <img
                  src="https://ui-avatars.com/api/?name=John+Doe&background=17a2b8&color=fff&size=128"
                  alt="User Avatar"
                />
                <div class="user-info">
                  <h6>sal</h6>
                  <p>john.doe@email.com</p>
                </div>
              </div>

              <!-- Menu Items -->
              <router-link to="" class="dropdown-item-custom">
                <i class="bi bi-person"></i>
                <span>ប្រវត្តិរូបរបស់ខ្ញុំ</span>
              </router-link>

              <router-link to="" class="dropdown-item-custom">
                <i class="bi bi-file-earmark-text"></i>
                <span>របាយការណ៍របស់ខ្ញុំ</span>
              </router-link>

              <router-link to="" class="dropdown-item-custom">
                <i class="bi bi-gear"></i>
                <span>ការកំណត់</span>
              </router-link>

              <div class="dropdown-divider-custom"></div>

              <router-link to="/support" class="dropdown-item-custom">
                <i class="bi bi-question-circle"></i>
                <span>ជំនួយ និងការគាំទ្រ</span>
              </router-link>

              <a
                @click="isClose"
                href="#"
                class="dropdown-item-custom dropdown-item-logout"
              >
                <i class="bi bi-box-arrow-right"></i>
                <span>ចាកចាញ</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BaseModal
      :title="'ចាកចាញ'"
      :icon="'exclamation-triangle'"
      :theme="'danger'"
      :isClose="showModal"
      @closeModal="showModal = true"
    >
      <template #body>
        <p>Are you sure ?</p>
      </template>
      <template #btnClose>
        <BaseButton
          variant="cancel"
          icon="x-circle"
          class="col-6"
          @click="isClose"
          >បិទ</BaseButton
        >
      </template>
      <template #btnActive>
        <BaseButton icon="check-circle" variant="danger" class="col-6"
          >បញ្ជាក់</BaseButton
        >
      </template>
    </BaseModal>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
const activeLink = ref("home");


// simulate token (later replace with Pinia / real auth)
const token = ref(null);
const showModal = ref(false);
function isClose() {
  showModal.value = !showModal.value;
}
const isOpen = ref("true");
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};
// example: get token from localStorage
onMounted(() => {
  token.value = localStorage.getItem("token");
});

// true = user NOT logged in
// false = user logged in
const showAuthButtons = computed(() => !token.value);

const setActive = (link) => {
  activeLink.value = link;
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
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
  transition: 0.3s;
  width: 300px;
  flex: 0 0 auto;
  position: fixed;
  z-index: 99;
}
.sidebar.closed {
  transform: translateX(-300px);
}
/* .router-link-active {
  background-color: var(--tertiary-color);
  color: var(--surface-color);
} */
.handle-btn {
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

.sidebar .logo-section {
  border-bottom: 1px solid #e5e7eb;
}

.sidebar .nav-menu {
  flex: 1;
  padding: 16px 20px;
  overflow-y: auto;
}

.sidebar .nav-item {
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

.sidebar .nav-item:hover {
  background-color: var(--tertiary-color);
  color: var(--surface-color);
}

.sidebar .router-link-active {
  background-color: var(--tertiary-color);
  color: var(--surface-color);
}

.sidebar .user-section {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  padding: 20px;
  border-top: 1px solid #e5e7eb;
  background-color: #ffffff;
}

.sidebar .user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fde68a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.sidebar .user-details h3 {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
}

.sidebar .user-details p {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 0;
}

.sidebar .logout-btn,
.sidebar .security-btn {
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

.navbar-custom {
  height: 80px;
  background-color: var(--tertiary-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-brand-custom {
  display: flex;
  align-items: center;
  gap: 12px;
}

.navbar-nav-custom {
  gap: 3rem;
  justify-content: center;
}

/* Underline From Center */
.nav-link-custom {
  color: var(--surface-color);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
}

.nav-link-custom.active,
.nav-link-custom:hover {
  color: var(--surface-color);
}

.nav-link-custom:before {
  content: "";
  position: absolute;
  z-index: -1;
  left: 51%;
  right: 51%;
  bottom: 3px;
  border-radius: 10px;
  background: var(--surface-color);
  height: 3px;
  -webkit-transition-property: left, right;
  transition-property: left, right;
  -webkit-transition-duration: 0.2s;
  transition-duration: 0.2s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}

.nav-link-custom:hover:before,
.nav-link-custom:focus:before,
.nav-link-custom:active:before {
  left: 0;
  right: 0;
}

/* Active underline (STAYS visible) */
.nav-link-custom.active::before {
  left: 0;
  right: 0;
}

.nav-right {
  display: flex;
  align-items: center;
}

.btn-register,
.btn-login {
  transition: all 0.3s ease;
}

.btn-register:hover,
.btn-login:hover {
  transform: translateY(-1px);
}

/* User Profile Dropdown */
.user-profile {
  position: relative;
}

.user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid var(--surface-color);
  transition: all 0.3s ease;
  object-fit: cover;
}

.user-avatar:hover {
  border: var(--tertiary-color);
  transform: scale(1.05);
}

.dropdown-menu-custom {
  position: absolute;
  top: 120%;
  right: 0;
  background-color: var(--surface-color);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 285px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.user-profile:hover .dropdown-menu-custom {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-header-custom {
  padding: 1.2rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.dropdown-header-custom img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #17a2b8;
  object-fit: cover;
}

.user-info h6 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-color);
}

.user-info p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--secondary-color);
}

.dropdown-item-custom {
  padding: 0.8rem 1.2rem;
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.dropdown-item-custom:hover {
  background-color: #f8f9fa;
  border-left-color: var(--primary-color);
  color: var(--primary-color);
}

.dropdown-item-custom i {
  font-size: 1.1rem;
  width: 20px;
}

.dropdown-divider-custom {
  height: 1px;
  background-color: #e0e0e0;
  margin: 0.5rem 0;
}

.dropdown-item-logout {
  color: var(--danger);
}

.dropdown-item-logout:hover {
  background-color: #fff5f5;
  border-left-color: var(--danger);
  color: var(--danger);
}
@media (max-width: 992px) {
  .sidebar .logo-section {
    opacity: 0;
  }
}
@media (min-width: 1100px) {
  .sidebar {
    display: none;
  }
}
/* Mobile responsive */
@media (max-width: 1100px) {
  #navbarContent {
    display: none !important;
  }

  .toggle-btn {
    display: block !important;
  }

  .btn-lost,
  .btn-found,
  .btn-active {
    display: none !important;
  }
}
</style>

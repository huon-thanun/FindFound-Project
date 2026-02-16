<template>
  <div class="admin-layout">
    <div
      v-if="showSidebar"
      class="sidebar-overlay d-lg-none"
      @click="showSidebar = false"
    ></div>

    <Sidebar :isOpen="showSidebar" @close="showSidebar = false" />

    <div class="main-container" :class="{ 'sidebar-collapsed': !showSidebar }">
      <Navbar @toggleSidebar="handleToggleSidebar" />

      <main class="content-area">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "../../components/layouts/Navbar.vue";
import Sidebar from "../../components/layouts/Sidebar.vue";

// On desktop, you might want this 'true' by default
const showSidebar = ref(true);

const handleToggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background-color: #f8fafc; /* Professional light gray background */
}

.main-container {
  /* Match the 280px width of your sidebar */
  margin-left: 280px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* When sidebar is toggled off on desktop */
.main-container.sidebar-collapsed {
  margin-left: 0;
}

.content-area {
  padding: 1.5rem;
  flex: 1;
}

/* Mobile Sidebar Overlay */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.5); /* Semi-transparent Slate 900 */
  backdrop-filter: blur(4px);
  z-index: 999;
}

/* Responsive: Reset margins for mobile */
@media (max-width: 992px) {
  .main-container {
    margin-left: 0 !important;
  }
}
</style>

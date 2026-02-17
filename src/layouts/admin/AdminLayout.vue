<template>
  <div class="admin-layout">
    <!-- Hamburger – only on mobile when sidebar closed -->
    <button
      v-if="!isDesktop && !showSidebar"
      class="hamburger-btn d-lg-none"
      @click="showSidebar = true"
      aria-label="Open menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Overlay backdrop (mobile only) -->
    <div
      v-if="showSidebar && !isDesktop"
      class="sidebar-overlay d-lg-none"
      @click="showSidebar = false"
    ></div>

    <!-- Sidebar -->
    <Sidebar :isOpen="showSidebar" @close="showSidebar = false" />

    <!-- Main content -->
    <div class="main-content">
      <Navbar />

      <main class="content-area">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Navbar from "@/components/layouts/Navbar.vue"; // adjust path
import Sidebar from "@/components/layouts/Sidebar.vue"; // adjust path

const showSidebar = ref(true); // default: open on desktop

// Detect desktop (lg = 992px)
const isDesktop = computed(() => window.innerWidth >= 992);

// Auto-update sidebar state on resize
const updateLayout = () => {
  if (isDesktop.value) {
    showSidebar.value = true; // always visible on desktop
  } else {
    showSidebar.value = false; // closed by default on mobile
  }
};

onMounted(() => {
  updateLayout();
  window.addEventListener("resize", updateLayout);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateLayout);
});
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background-color: #f8fafc;
  position: relative;
}

/* Main content – full width on mobile, shifted only on desktop */
.main-content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Desktop: push content when sidebar is visible */
@media (min-width: 992px) {
  .main-content {
    margin-left: 300px; /* ← CHANGE THIS to match your Sidebar.vue width */
  }
}

/* Mobile: always full width */
@media (max-width: 991px) {
  .main-content {
    margin-left: 0 !important;
  }
}

/* Content area */
.content-area {
  padding: 1.5rem 1rem;
  flex: 1;
}

/* ── Hamburger Button (mobile only) ──────────────────────────── */
.hamburger-btn {
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 1100;
  width: 48px;
  height: 48px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.hamburger-btn span {
  width: 24px;
  height: 2.5px;
  background: #64748b;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger-btn.active span:nth-child(2) {
  opacity: 0;
}
.hamburger-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Overlay when sidebar open on mobile */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
  z-index: 999;
  transition: opacity 0.35s ease;
}
</style>

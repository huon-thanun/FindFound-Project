<template>
  <div class="admin-layout">
    <Navbar @toggleSidebar="handleToggleSidebar" />
    <Sidebar :isOpen="showSidebar" />

    <!-- Main Content -->
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "../../components/layouts/Navbar.vue";
import Sidebar from "../../components/layouts/Sidebar.vue";

const showSidebar = ref(false);

const handleToggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
}

.content {
  margin-left: 21% !important;
  padding: 1.5rem;
  transition: margin-left 0.3s ease;
}

@media (max-width: 992px) {
  .content {
    margin-left: 0 !important;
  }
}
</style>

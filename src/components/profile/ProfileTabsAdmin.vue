<template>
  <div class="card border-0 shadow-sm rounded-4 mb-4">
    <div class="card-header bg-white border-bottom px-4 pt-3">
      <div class="d-flex gap-4 overflow-auto">
        <RouterLink
          :to="{ name: 'admin.profile' }"
          class="nav-tab text-nowrap"
          :class="{ active: isActive('admin.profile') }"
        >
          ទិដ្ឋភាពទូទៅ
        </RouterLink>

        <RouterLink
          :to="{ name: 'admin.profile.edit' }"
          class="nav-tab text-nowrap"
          :class="{ active: isActive('admin.profile.edit') }"
        >
          កែប្រែព័ត៌មាន
        </RouterLink>

        <RouterLink
          :to="{ name: 'admin.profile.security' }"
          class="nav-tab text-nowrap"
          :class="{ active: isActive('admin.profile.security') }"
        >
          សុវត្ថិភាព
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const isActive = (name) => route.name === name;
</script>
<style scoped>
/* Nav Tab Styling */
.nav-tab {
  padding: 12px 4px;
  font-weight: 600;
  text-decoration: none;
  color: #6c757d;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
}

.nav-tab.active {
  color: #3b1e54;
  border-bottom-color: #2b0151;
}
</style>

<template>
  <div class="profile-header-card">
    <div class="avatar-section">
      <img :src="user.avatar || defaultAvatar" alt="Avatar" />
      <div class="status-badge"></div>
    </div>
    <div class="info-section">
      <h4>{{ user.fullname || "Admin" }}</h4>
      <p>{{ user.email || "admin@example.com" }}</p>
      <!-- Tabs -->
      <div class="tabs">
        <RouterLink :to="{ name: 'admin.profile' }">Profile</RouterLink>
        <RouterLink :to="{ name: 'admin.profile.edit' }">Edit</RouterLink>
        <RouterLink :to="{ name: 'admin.profile.security' }"
          >Security</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
// import { defineProps } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const defaultAvatar =
  "https://ui-avatars.com/api/?name=Admin&background=3b1e54&color=fff";
</script>

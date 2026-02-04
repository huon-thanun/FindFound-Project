<template>
  <div class="card border-0 shadow-sm rounded-4 p-4 profile-side text-center">
    <!-- Avatar -->
    <div class="mb-3">
      <img
        :src="user.avatar || defaultAvatar"
        alt="Avatar"
        class="rounded-circle mb-2"
        width="100"
        height="100"
      />
      <h6 class="fw-bold mb-0">{{ user.fullname }}</h6>
      <small class="text-muted">{{ user.email }}</small>
    </div>

    <hr />

    <!-- About Section -->
    <h6 class="fw-bold mb-2">About</h6>
    <p class="text-muted small">{{ about }}</p>

    <hr />

    <!-- Info List -->
    <ul class="list-unstyled small text-muted mt-3 text-start">
      <li class="mb-2"><i class="bi bi-briefcase me-2"></i> {{ jobTitle }}</li>
      <li class="mb-2"><i class="bi bi-building me-2"></i> {{ company }}</li>
      <li class="mb-2" v-if="user.location">
        <i class="bi bi-geo-alt me-2"></i> {{ user.location }}
      </li>
      <li class="mb-2">
        <i class="bi bi-calendar me-2"></i> Joined {{ joined }}
      </li>
    </ul>

    <hr />

    <!-- Skills Section -->
    <h6 class="fw-bold mb-2">Skills</h6>
    <div class="d-flex flex-wrap gap-2 justify-content-center">
      <span
        v-for="(skill, index) in skills"
        :key="index"
        class="badge bg-light text-primary"
      >
        {{ skill }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileSide",
  props: {
    user: {
      type: Object,
      required: true,
    },
    skills: {
      type: Array,
      default: () => ["HTML", "CSS", "Vue", "MySQL", "JavaScript"],
    },
    about: {
      type: String,
      default:
        "Passionate web designer with over 8 years of experience creating beautiful, responsive, and user-friendly interfaces.",
    },
    jobTitle: { type: String, default: "Web Designer" },
    company: { type: String, default: "Lueilwitz, Wisoky and Leuschke" },
    joined: { type: String, default: "January 2024" },
  },
  data() {
    return {
      defaultAvatar: "https://via.placeholder.com/100", // fallback avatar
    };
  },
};
</script>

<style scoped>
.profile-side img {
  object-fit: cover;
  border: 2px solid #0d6efd;
}
</style>

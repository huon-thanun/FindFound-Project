<template>
  <div class="app-container">
    <main>
      <HeroSection />
      <RecentPostsSection />
      <AboutSection />
    </main>
  </div>
</template>

<script setup>
import HeroSection from "@/components/user/Home/HeroSection.vue";
import AboutSection from "@/components/user/Home/AboutSection.vue";
import RecentPostsSection from "@/components/user/Home/RecentPostsSection.vue";
</script>

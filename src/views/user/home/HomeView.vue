<template>
  <div class="app-container">
    <main>
      <HeroSection />

      <HowitWorkSection />

      <RecentPostsSection />

      <FeatureSection />

      <AboutSection />
      <CTASection />
    </main>
  </div>
</template>

<script setup>
import HeroSection from "@/components/user/Home/HeroSection.vue";
import AboutSection from "@/components/user/Home/AboutSection.vue";
import RecentPostsSection from "@/components/user/Home/RecentPostsSection.vue";
import FeatureSection from "@/components/user/Home/FeatureSection.vue";
import HowitWorkSection from "@/components/user/Home/HowitWorkSection.vue";
import CTASection from "@/components/user/Home/CTASection.vue";
</script>
<style>
/* បន្ថែម Space រវាង Section នីមួយៗឱ្យមើលទៅស្រឡះភ្នែក */
main > section {
  margin-bottom: 2rem;
}
</style>

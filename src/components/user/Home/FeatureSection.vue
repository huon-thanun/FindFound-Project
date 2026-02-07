<template>
  <section class="stats-scroll-section py-3">
    <div class="container">
      <div class="row g-4">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="col-md-4 text-center"
          ref="statsContainer"
        >
          <div class="stat-item-wrap">
            <h2 class="display-3 fw-bold running-number">
              {{ animatedNumbers[index] }}{{ stat.suffix }}
            </h2>
            <p class="khmer-font-body text-muted mt-2">{{ stat.label }}</p>
            <div class="accent-bar mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";

const stats = [
  { target: 5000, suffix: "+", label: "របស់ដែលបានរកឃើញ" },
  { target: 12000, suffix: "+", label: "សមាជិកជួយគ្នា" },
  { target: 25, suffix: "+", label: "ខេត្ត-ក្រុងទូទាំងប្រទេស" },
];

// This holds the numbers that will "run"
const animatedNumbers = reactive([0, 0, 0]);
const statsContainer = ref(null);
let hasRun = false;

const startCounting = () => {
  if (hasRun) return;
  hasRun = true;

  stats.forEach((stat, index) => {
    let start = 0;
    const end = stat.target;
    const duration = 2000; // 2 seconds to finish running
    const increment = end / (duration / 16); // 16ms is roughly 1 frame

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        animatedNumbers[index] = end.toLocaleString(); // Format with commas
        clearInterval(timer);
      } else {
        animatedNumbers[index] = Math.floor(start).toLocaleString();
      }
    }, 16);
  });
};

onMounted(() => {
  // This detects when the section enters the screen
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        startCounting();
      }
    },
    { threshold: 0.5 },
  ); // Trigger when 50% of the section is visible

  if (statsContainer.value) {
    // We observe the first element in the array of refs
    observer.observe(statsContainer.value[0]);
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Koh+Santepheap:wght@700&family=Noto+Sans+Khmer:wght@400;600&display=swap");

.stats-scroll-section {
  background-color: #ffffff;
}

.running-number {
  font-family: "Koh Santepheap", sans-serif;
  color: #3b1e54; /* Your purple brand color */
  letter-spacing: -1px;
}

.khmer-font-body {
  font-family: "Noto Sans Khmer", sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
}

.accent-bar {
  width: 30px;
  height: 4px;
  background: #7c3aed; /* Light purple accent */
  border-radius: 10px;
  margin-top: 15px;
  transition: width 0.3s ease;
}

.stat-item-wrap:hover .accent-bar {
  width: 60px;
}

/* Subtle entrance for the whole container */
.stat-item-wrap {
  padding: 20px;
  transition: transform 0.3s ease;
}

.stat-item-wrap:hover {
  transform: translateY(-5px);
}
</style>

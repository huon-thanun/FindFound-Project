<!-- src/components/about/TestimonialsSection.vue -->
<template>
  <div class="testimonial-wrapper">
    <h2 class="section-title text-center mb-5" data-aos="fade-up">
      មតិពីអ្នកប្រើប្រាស់
    </h2>

    <div v-if="testimonials.length === 0" class="text-center py-5">
      <p class="text-muted">មិនទាន់មានមតិអតិថិជននៅឡើយ</p>
    </div>

    <div v-else class="testimonial-slider" data-aos="fade-up">
      <!-- Previous button -->
      <button
        class="slider-btn prev"
        @click="prev"
        :disabled="currentIndex === 0"
        aria-label="មតិមុន"
      >
        ‹
      </button>

      <!-- Slider track (contains all cards) -->
      <div
        class="slider-track"
        :style="{
          transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
        }"
      >
        <div
          v-for="(item, index) in testimonials"
          :key="index"
          class="testimonial-card glass-card"
        >
          <div class="testimonial-avatar">
            <img :src="item.avatar" :alt="`${item.name} - ${item.role}`" />
          </div>

          <div class="stars">
            <span v-for="n in 5" :key="n">⭐</span>
          </div>

          <p class="testimonial-text">"{{ item.text }}"</p>

          <h5 class="testimonial-name">
            {{ item.name }}
          </h5>

          <p class="testimonial-role">
            {{ item.role }}
          </p>
        </div>
      </div>

      <!-- Next button -->
      <button class="slider-btn next" @click="next" aria-label="មតិបន្ទាប់">
        ›
      </button>
    </div>

    <!-- Dots (one dot per "page" of 3 cards) -->
    <div
      v-if="testimonials.length > visibleCount"
      class="testimonial-dots mt-5"
    >
      <span
        v-for="n in totalPages"
        :key="n"
        class="dot"
        :class="{ active: n - 1 === currentIndex }"
        @click="goTo(n - 1)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  testimonials: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const currentIndex = ref(0);
const visibleCount = ref(3); // default 3 cards

// Update visible count based on screen size
const updateVisibleCount = () => {
  const width = window.innerWidth;
  if (width < 768) visibleCount.value = 1;
  else if (width < 992) visibleCount.value = 2;
  else visibleCount.value = 3;
};

onMounted(() => {
  updateVisibleCount();
  window.addEventListener("resize", updateVisibleCount);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateVisibleCount);
});

// Computed values
const totalPages = computed(() => {
  return Math.ceil(props.testimonials.length / visibleCount.value);
});

const maxIndex = computed(() => {
  return Math.max(0, props.testimonials.length - visibleCount.value);
});

// Navigation
const next = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value += 1;
  }
};

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  }
};

const goTo = (index) => {
  currentIndex.value = Math.min(Math.max(0, index), maxIndex.value);
};
</script>

<style scoped>
.testimonial-wrapper {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
}

.testimonial-slider {
  position: relative;
  overflow: hidden;
}

.slider-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  gap: 24px;
  width: 100%;
}

.testimonial-card {
  flex: 0 0 auto;
  width: calc(100% / 3); /* fallback - controlled by visibleCount */
  min-width: 320px;
  padding: 32px 28px;
  text-align: center;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(124, 58, 237, 0.15);
}

.testimonial-avatar {
  width: 90px;
  height: 90px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #7c3aed;
  box-shadow: 0 6px 16px rgba(124, 58, 237, 0.15);
}

.testimonial-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stars {
  font-size: 1.4rem;
  margin-bottom: 16px;
  color: #fbbf24;
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 20px;
  font-style: italic;
}

.testimonial-name {
  font-weight: 700;
  color: #1e1b4b;
  margin-bottom: 6px;
  font-size: 1.2rem;
}

.testimonial-role {
  color: #64748b;
  font-size: 0.95rem;
}

/* Navigation buttons */
.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #7c3aed;
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-btn.prev {
  left: 0;
}

.slider-btn.next {
  right: 0;
}

.slider-btn:hover:not(:disabled) {
  background: #6d28d9;
  transform: translateY(-50%) scale(1.1);
}

.slider-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Dots */
.testimonial-dots {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #d1d5db;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #7c3aed;
  transform: scale(1.4);
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .testimonial-card {
    width: calc(100% / 2);
  }
}

@media (max-width: 768px) {
  .testimonial-slider {
    padding: 0 40px;
  }

  .testimonial-card {
    width: 100%;
  }

  .slider-btn {
    width: 44px;
    height: 44px;
    font-size: 1.8rem;
  }
}

@media (max-width: 576px) {
  .testimonial-card {
    padding: 28px 20px;
  }
}
</style>

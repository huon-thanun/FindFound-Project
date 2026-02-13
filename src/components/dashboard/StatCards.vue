<!-- src/components/dashboard/StatCards.vue -->
<template>
  <div class="row g-4 mb-5">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="col-12 col-md-6 col-lg-3"
    >
      <div class="stat-card-modern shadow-sm" :class="getVariantClass(index)">
        <div
          class="stat-content d-flex justify-content-between align-items-start"
        >
          <div class="stat-info">
            <p class="stat-label-modern mb-1">{{ card.title }}</p>
            <h3 class="stat-value-modern mb-0">
              {{ card.value.toLocaleString("km-KH") }}
            </h3>
          </div>

          <div class="stat-icon-box rounded">
            <i :class="['bi', card.icon, 'fs-4']"></i>
          </div>
        </div>

        <!-- Optional subtle progress bar (decorative) -->
        <div class="stat-progress-bg mt-3">
          <div
            class="stat-progress-fill"
            :style="{ width: getProgressWidth(index) }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cards: {
    type: Array,
    required: true,
    default: () => [],
  },
});

// Variant classes for different colors (matching your original)
const variants = [
  { bg: "#f5f3ff", color: "#8b5cf6" }, // variant-1
  { bg: "#ede9fe", color: "#7c3aed" }, // variant-2
  { bg: "#ddd6fe", color: "#6d28d9" }, // variant-3
  { bg: "#c4b5fd", color: "#5b21b6" }, // variant-4
];

const getVariantClass = (index) => {
  const v = variants[index % variants.length];
  return {
    "stat-card-modern": true,
    "--variant-bg": v.bg,
    "--variant-color": v.color,
  };
};

// Optional: subtle random-ish progress for visual interest (0-100%)
const getProgressWidth = (index) => {
  // You can replace with real metrics later (e.g. growth %)
  const base = [75, 60, 85, 45]; // example values
  return `${base[index % base.length]}%`;
};
</script>

<style scoped>
.stat-card-modern {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.stat-card-modern:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(79, 70, 229, 0.15);
}

.stat-content {
  position: relative;
  z-index: 2;
}

.stat-label-modern {
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 6px;
}

.stat-value-modern {
  font-size: 2.1rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
}

.stat-icon-box {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  background: var(--variant-bg);
  color: var(--variant-color);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.stat-card-modern:hover .stat-icon-box {
  transform: scale(1.1);
}

/* Decorative progress bar at bottom */
.stat-progress-bg {
  height: 4px;
  background: #f1f5f9;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 12px;
}

.stat-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--variant-color), transparent);
  transition: width 1.2s ease;
}

/* Responsive */
@media (max-width: 992px) {
  .stat-value-modern {
    font-size: 1.8rem;
  }
  .stat-icon-box {
    width: 48px;
    height: 48px;
    font-size: 1.4rem;
  }
}
</style>

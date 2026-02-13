<!-- src/components/dashboard/CategoryDonut.vue -->
<template>
  <div class="content-card h-100">
    <div class="content-card-header">
      <h5 class="m-0">
        <i class="bi bi-pie-chart me-2"></i>
        តាមប្រភេទ
      </h5>
    </div>

    <div class="chart-section pt-3 pb-4">
      <!-- Donut Chart -->
      <div class="donut-chart-wrapper mx-auto">
        <div class="donut-visual" :style="donutStyle">
          <div class="donut-inner">
            <div class="total-num">
              {{ totalItems.toLocaleString("km-KH") }}
            </div>
            <div class="total-text">សរុប</div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div v-if="categoryStats.length" class="legend-list mt-5 px-2">
        <div
          v-for="(cat, index) in categoryStats"
          :key="cat.category.name"
          class="legend-row mb-3"
        >
          <div
            class="legend-info d-flex justify-content-between align-items-center"
          >
            <span class="legend-name">{{ cat.category.name }}</span>
            <span class="legend-percent fw-bold">{{ cat.percent }}%</span>
          </div>
          <div class="progress-thin mt-1">
            <div
              class="progress-bar-thin"
              :style="{ width: cat.percent + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- No data state -->
      <div v-else class="text-center py-5 text-muted">
        មិនទាន់មានទិន្នន័យប្រភេទនៅឡើយ
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"; // ← This line was missing!

defineProps({
  totalItems: {
    type: Number,
    default: 0,
  },
  categoryStats: {
    type: Array,
    default: () => [],
  },
  donutStyle: {
    type: Object,
    default: () => ({}),
  },
});

// Optional: show something only if we have real data
const hasData = computed(
  () => categoryStats.value.length > 0 && totalItems.value > 0,
);
</script>

<style scoped>
/* Your existing styles remain unchanged */
.donut-chart-wrapper {
  max-width: 240px;
  margin: 0 auto;
}

.donut-visual {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.donut-inner {
  width: 140px;
  height: 140px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.06);
  text-align: center;
}

.total-num {
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1;
  color: #1e293b;
}

.total-text {
  font-size: 0.95rem;
  color: #64748b;
  margin-top: 4px;
}

/* Legend */
.legend-row {
  transition: all 0.2s ease;
}

.legend-name {
  font-size: 0.95rem;
  color: #334155;
  font-weight: 500;
}

.legend-percent {
  font-size: 0.95rem;
  color: #4f46e5;
}

.progress-thin {
  height: 8px;
  background: #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar-thin {
  height: 100%;
  transition: width 0.6s ease;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  border-radius: 10px;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .donut-visual {
    width: 180px;
    height: 180px;
  }
  .donut-inner {
    width: 120px;
    height: 120px;
  }
  .total-num {
    font-size: 2rem;
  }
}
</style>

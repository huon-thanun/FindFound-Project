<template>
  <div class="content-card h-100">
    <div class="content-card-header">
      <h5 class="m-0">
        <i class="bi bi-pie-chart me-2"></i>
        តាមប្រភេទ
      </h5>
    </div>

    <div class="chart-section pt-3 pb-4">
      <!-- Loading -->
      <div v-if="categoryStore.loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-3 text-muted">កំពុងផ្ទុកទិន្នន័យ...</p>
      </div>

      <!-- No data -->
      <div
        v-else-if="categoryStats.length === 0"
        class="text-center py-5 text-muted"
      >
        មិនទាន់មានទិន្នន័យប្រភេទនៅឡើយ
      </div>

      <!-- Donut chart -->
      <div v-else class="donut-chart-wrapper mx-auto" :style="donutStyle">
        <div class="donut-inner">
          <div class="total-num">{{ totalItems.toLocaleString("km-KH") }}</div>
          <div class="total-text">សរុប</div>
        </div>
      </div>

      <!-- Legend -->
      <div v-if="categoryStats.length" class="legend-list mt-5 px-2">
        <div v-for="cat in categoryStats" :key="cat.id" class="legend-row mb-3">
          <div
            class="legend-info d-flex justify-content-between align-items-center"
          >
            <span class="legend-name">{{ cat.name }}</span>
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
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useCategoryStore } from "@/stores/categoryStore";

const categoryStore = useCategoryStore();

// Fetch categories when component mounts
onMounted(() => {
  if (!categoryStore.categories.length) {
    categoryStore.fetchCategories();
  }
});

// Total items (sum of counts)
const totalItems = computed(
  () =>
    categoryStore.categories?.reduce((sum, cat) => sum + (cat.count ?? 0), 0) ||
    0,
);

// Percentage stats for legend
const categoryStats = computed(() => {
  const total = totalItems.value || 1; // avoid division by zero
  return (
    categoryStore.categories?.map((cat) => ({
      id: cat.id,
      name: cat.name,
      count: cat.count ?? 0,
      percent: (((cat.count ?? 0) / total) * 100).toFixed(1),
    })) || []
  );
});

// Optional: you can customize donut style
const donutStyle = {
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  background: "#f3f4f6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  position: "relative",
};
</script>

<style scoped>
.content-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
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
</style>

<template>
  <div class="content-card">
    <div class="content-card-header">
      <h5 class="m-0"><i class="bi bi-pie-chart me-2"></i>តាមប្រភេទ</h5>
    </div>

    <div class="chart-section p-4 text-center">
      <!-- Loading -->
      <div v-if="loading" class="py-5">
        <div
          class="spinner-border text-purple"
          role="status"
          style="width: 3rem; height: 3rem"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">កំពុងទាញប្រភេទ...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="py-5 text-danger">
        <i class="bi bi-exclamation-triangle me-2 fs-1"></i>
        <p class="mt-2">{{ error }}</p>
        <button
          class="btn btn-sm btn-outline-danger mt-3"
          @click="fetchCategories"
        >
          ព្យាយាមម្ដងទៀត
        </button>
      </div>

      <!-- No categories -->
      <div v-else-if="categoryStats.length === 0" class="py-5 text-muted">
        <i class="bi bi-folder-x fs-1 me-2"></i>
        <p class="mt-2">មិនមានប្រភេទនៅឡើយ</p>
      </div>

      <!-- Donut + Legend (silent equal distribution mode) -->
      <div v-else>
        <div class="donut-chart-wrapper mb-5">
          <div class="donut-visual mx-auto" :style="donutStyle">
            <div class="donut-inner">
              <div class="total-num">{{ totalItems }}</div>
              <div class="total-text">សរុប</div>
            </div>
          </div>
        </div>

        <div class="legend-list">
          <div
            v-for="cat in categoryStats"
            :key="cat.category.name"
            class="legend-row d-flex align-items-center mb-3"
          >
            <div
              class="legend-color me-3"
              :style="{ backgroundColor: cat.color }"
            ></div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between mb-1 small">
                <span class="legend-name">{{ cat.category.name }}</span>
                <span class="legend-percent fw-bold">{{ cat.percent }}%</span>
              </div>
              <div
                class="progress"
                style="height: 6px; background: #e9d5ff; border-radius: 3px"
              >
                <div
                  class="progress-bar"
                  :style="{
                    width: cat.percent + '%',
                    backgroundColor: cat.color,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const categoryStats = ref([]);
const loading = ref(true);
const error = ref(null);

const purpleShades = [
  "#c084fc",
  "#a855f7",
  "#9333ea",
  "#7e22ce",
  "#6b21a8",
  "#5b21b6",
  "#4c1d95",
  "#3b1a7a",
  "#2e1065",
  "#1e0a4d",
];

const fetchCategories = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await axios.get(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/categories",
      {
        params: {
          sortDir: "DESC",
          sortBy: "id",
        },
      },
    );

    const apiData = response.data;

    if (
      !apiData.result ||
      !apiData.data?.items ||
      !Array.isArray(apiData.data.items)
    ) {
      throw new Error("ទម្រង់ទិន្នន័យមិនត្រឹមត្រូវ");
    }

    const items = apiData.data.items;

    if (items.length === 0) {
      categoryStats.value = [];
      return;
    }

    // Equal distribution (silent mode – no message)
    const equalPercent = Math.round(100 / items.length);

    categoryStats.value = items.map((cat, index) => ({
      category: { name: cat.name || "ផ្សេងៗ" },
      percent: equalPercent,
      color: purpleShades[index % purpleShades.length],
    }));

    // Fix rounding so total = exactly 100
    const currentSum = categoryStats.value.reduce(
      (sum, c) => sum + c.percent,
      0,
    );
    if (currentSum !== 100 && categoryStats.value.length > 0) {
      categoryStats.value[categoryStats.value.length - 1].percent +=
        100 - currentSum;
    }
  } catch (err) {
    console.error(err);
    error.value = "មានបញ្ហាក្នុងការទាញទិន្នន័យ — សូមព្យាយាមម្ដងទៀត";
  } finally {
    loading.value = false;
  }
};

const totalItems = computed(() => {
  return categoryStats.value.reduce((sum, cat) => sum + cat.percent, 0);
});

const donutStyle = computed(() => {
  if (!categoryStats.value.length) return {};

  let current = 0;
  const segments = categoryStats.value.map((cat) => {
    const start = current;
    current += cat.percent;
    return `${cat.color} ${start}% ${current}%`;
  });

  return {
    background: `conic-gradient(${segments.join(", ")})`,
  };
});

onMounted(fetchCategories);
</script>

<style scoped>
.content-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.content-card-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f3e8ff;
  background: linear-gradient(to right, #f3e8ff, #faf5ff);
}

.donut-visual {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(168, 85, 247, 0.15);
}

.donut-inner {
  width: 150px;
  height: 150px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 3px 12px rgba(139, 92, 246, 0.1);
  border: 1px solid #e9d5ff;
}

.total-num {
  font-size: 2.6rem;
  font-weight: 800;
  color: #7e22ce;
  line-height: 1;
}

.total-text {
  font-size: 1.05rem;
  color: #9333ea;
  margin-top: 6px;
  font-weight: 500;
}

.legend-color {
  width: 18px;
  height: 18px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.legend-name {
  color: #4c1d95;
  font-weight: 500;
}

.legend-percent {
  color: #7e22ce;
  font-weight: 600;
}
</style>

<!-- src/components/dashboard/WeeklyReportChart.vue -->
<template>
  <div class="content-card">
    <div
      class="content-card-header d-flex justify-content-between align-items-center flex-wrap gap-3"
    >
      <h5 class="m-0">
        <i class="bi bi-graph-up-arrow me-2"></i>
        និន្នាការរបាយការណ៍ (៧ថ្ងៃចុងក្រោយ)
      </h5>
      <button class="btn btn-sm btn-outline-secondary">ទាញយក PDF</button>
    </div>

    <div class="chart-container mt-4" style="height: 340px; position: relative">
      <div
        class="d-flex align-items-end justify-content-between h-100 px-3 pt-5 pb-5"
      >
        <div
          v-for="day in last7Days"
          :key="day.key"
          class="bar-wrapper text-center position-relative flex-fill"
          style="max-width: 70px"
          @mouseenter="hoveredDay = day"
          @mouseleave="hoveredDay = null"
        >
          <!-- Bar -->
          <div
            class="bar bg-primary rounded-top mx-auto transition-all"
            :style="{
              height: day.height + 'px',
              width: '70%',
              minHeight: '6px',
            }"
          ></div>

          <!-- Label -->
          <div class="mt-3 small text-muted">
            {{ day.label }}
          </div>

          <!-- Hover tooltip -->
          <div
            v-if="hoveredDay === day"
            class="tooltip-box position-absolute bg-dark text-white p-2 rounded shadow-sm"
            :style="{
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              zIndex: 10,
            }"
          >
            <strong>{{ day.count.toLocaleString("km-KH") }}</strong> របាយការណ៍
            <br />
            <small>{{ day.date }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  reports: {
    type: Array,
    default: () => [],
    required: true,
  },
});

const hoveredDay = ref(null);

const last7Days = computed(() => {
  const today = dayjs();
  return Array.from({ length: 7 }, (_, i) => {
    const date = today.subtract(6 - i, "day");
    const count = props.reports.filter((r) =>
      dayjs(r.createdAt).isSame(date, "day"),
    ).length;

    return {
      key: date.format("YYYY-MM-DD"),
      label: [
        "ច័ន្ទ",
        "អង្គារ",
        "ពុធ",
        "ព្រហស្បតិ៍",
        "សុក្រ",
        "សៅរ៍",
        "អាទិត្យ",
      ][date.day() === 0 ? 6 : date.day() - 1],
      date: date.format("DD MMM"),
      count,
      height: Math.max(6, Math.min(260, count * 12 + 20)), // scale height
    };
  });
});
</script>

<style scoped>
.content-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.content-card-header {
  margin-bottom: 20px;
}

.chart-container {
  position: relative;
}

.bar-wrapper {
  transition: all 0.2s ease;
}

.bar-wrapper:hover {
  transform: translateY(-4px);
}

.bar {
  transition:
    height 0.8s ease,
    background-color 0.3s;
  background: linear-gradient(to top, #4f46e5, #818cf8);
}

.bar-wrapper:hover .bar {
  background: linear-gradient(to top, #4338ca, #6366f1);
}

.tooltip-box {
  min-width: 120px;
  font-size: 0.9rem;
  pointer-events: none;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* Responsive */
@media (max-width: 992px) {
  .bar-wrapper {
    max-width: 50px !important;
  }
}
</style>

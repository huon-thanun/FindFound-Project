<!-- src/components/dashboard/TrendLineChart.vue -->
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

    <div class="chart-wrapper mt-3">
      <svg
        class="trend-line-svg"
        :viewBox="`0 0 ${width} ${height}`"
        preserveAspectRatio="xMidYMid meet"
      >
        <!-- Grid lines -->
        <g class="grid" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4">
          <line
            v-for="y in [0.2, 0.4, 0.6, 0.8]"
            :key="y"
            :y1="y * height"
            :y2="y * height"
            x1="0"
            :x2="width"
          />
        </g>

        <!-- Line path -->
        <path
          v-if="points.length > 1"
          :d="linePath"
          fill="none"
          stroke="#4f46e5"
          stroke-width="4"
          stroke-linecap="round"
          class="trend-path"
        />

        <!-- Data points with glow & tooltip trigger -->
        <g v-for="(point, i) in points" :key="i">
          <circle
            :cx="point.x"
            :cy="point.y"
            r="6"
            fill="#4f46e5"
            class="point-glow"
          />
          <circle
            :cx="point.x"
            :cy="point.y"
            r="12"
            fill="transparent"
            class="point-hover"
            @mouseenter="hoveredIndex = i"
            @mouseleave="hoveredIndex = null"
          />
        </g>

        <!-- Tooltip on hover -->
        <g v-if="hoveredIndex !== null">
          <rect
            :x="tooltipX - 60"
            :y="tooltipY - 50"
            width="120"
            height="40"
            rx="8"
            fill="#1e293b"
            opacity="0.95"
          />
          <text
            :x="tooltipX"
            :y="tooltipY - 25"
            text-anchor="middle"
            fill="white"
            font-size="12"
            font-weight="600"
          >
            {{ points[hoveredIndex].count }} របាយការណ៍
          </text>
          <text
            :x="tooltipX"
            :y="tooltipY - 8"
            text-anchor="middle"
            fill="#94a3b8"
            font-size="11"
          >
            {{ points[hoveredIndex].label }}
          </text>
        </g>

        <!-- X-axis labels -->
        <text
          v-for="(day, i) in last7Days"
          :key="`label-${i}`"
          :x="day.x"
          y="100%"
          text-anchor="middle"
          font-size="12"
          fill="#64748b"
          dy="20"
        >
          {{ day.label }}
        </text>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  reports: {
    type: Array,
    default: () => [],
    required: true,
  },
});

const width = 800;
const height = 280;
const padding = { top: 40, right: 20, bottom: 50, left: 40 };

const hoveredIndex = ref(null);

// Last 7 days with counts
const last7Days = computed(() => {
  const today = dayjs();
  return Array.from({ length: 7 }, (_, i) => {
    const date = today.subtract(6 - i, "day");
    const count = props.reports.filter((r) =>
      dayjs(r.createdAt).isSame(date, "day"),
    ).length;

    return {
      label: [
        "ច័ន្ទ",
        "អង្គារ",
        "ពុធ",
        "ព្រហស្បតិ៍",
        "សុក្រ",
        "សៅរ៍",
        "អាទិត្យ",
      ][date.day() === 0 ? 6 : date.day() - 1],
      count,
      date: date.format("YYYY-MM-DD"),
    };
  });
});

// Scale data to SVG coordinates
const maxCount = computed(() =>
  Math.max(...last7Days.value.map((d) => d.count), 1),
);
const yScale = (value) =>
  height -
  padding.bottom -
  (value / maxCount.value) * (height - padding.top - padding.bottom);
const xScale = (index) =>
  padding.left + index * ((width - padding.left - padding.right) / 6);

const points = computed(() => {
  return last7Days.value.map((day, i) => ({
    x: xScale(i),
    y: yScale(day.count),
    count: day.count,
    label: day.label,
  }));
});

const linePath = computed(() => {
  if (points.value.length < 2) return "";
  const [first, ...rest] = points.value;
  let path = `M ${first.x} ${first.y}`;
  rest.forEach((p) => {
    path += ` L ${p.x} ${p.y}`;
  });
  return path;
});

const tooltipX = computed(() =>
  hoveredIndex.value !== null ? points.value[hoveredIndex.value].x : 0,
);
const tooltipY = computed(() =>
  hoveredIndex.value !== null ? points.value[hoveredIndex.value].y : 0,
);

// Animation trigger
onMounted(() => {
  // Optional: force re-render for animation
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

.chart-wrapper {
  width: 100%;
  overflow: hidden;
}

.trend-line-svg {
  width: 100%;
  height: 340px;
  overflow: visible;
}

.trend-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 2.5s ease-out forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

.point-glow {
  filter: drop-shadow(0 0 8px rgba(79, 70, 229, 0.4));
}

.point-hover {
  cursor: pointer;
}
</style>

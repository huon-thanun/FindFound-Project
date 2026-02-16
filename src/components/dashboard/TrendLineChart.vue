<template>
  <div class="content-card">
    <div
      class="content-card-header d-flex justify-content-between align-items-center flex-wrap gap-3"
    >
      <div>
        <h5 class="m-0 fw-bold text-dark">
          <i class="bi bi-graph-up-arrow me-2 text-primary"></i>
          និន្នាការរបាយការណ៍
        </h5>
        <small class="text-muted">បង្ហាញទិន្នន័យផ្អែកលើពេលវេលា</small>
      </div>

      <div class="range-picker shadow-sm">
        <button
          v-for="range in [7, 30]"
          :key="range"
          class="range-btn"
          :class="{ active: timeRange === range }"
          @click="timeRange = range"
        >
          {{ range === 7 ? "៧ ថ្ងៃ" : "៣០ ថ្ងៃ" }}
        </button>
      </div>
    </div>

    <div class="chart-wrapper mt-4">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-grow text-primary" role="status"></div>
        <p class="mt-3 text-muted">កំពុងគណនាទិន្នន័យ...</p>
      </div>

      <svg
        v-else
        class="trend-line-svg"
        :viewBox="`0 0 ${width} ${height}`"
        preserveAspectRatio="xMidYMin meet"
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#4f46e5" stop-opacity="0" />
          </linearGradient>
        </defs>

        <g class="grid">
          <line
            v-for="i in 4"
            :key="i"
            :x1="padding.left"
            :x2="width - padding.right"
            :y1="
              padding.top +
              (i - 1) * ((height - padding.top - padding.bottom) / 3)
            "
            :y2="
              padding.top +
              (i - 1) * ((height - padding.top - padding.bottom) / 3)
            "
            stroke="#f1f5f9"
            stroke-width="1"
          />
        </g>

        <path :d="areaPath" fill="url(#areaGradient)" class="fade-in" />

        <path
          :d="linePath"
          fill="none"
          stroke="#4f46e5"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="trend-path"
        />

        <g v-for="(point, i) in points" :key="`pt-${i}`">
          <circle
            v-if="timeRange === 7 || hoveredIndex === i"
            :cx="point.x"
            :cy="point.y"
            r="4"
            fill="white"
            stroke="#4f46e5"
            stroke-width="2"
            class="point-node"
          />
          <rect
            :x="point.x - width / timeRange / 2"
            :y="0"
            :width="width / timeRange"
            :height="height"
            fill="transparent"
            class="hover-zone"
            @mouseenter="hoveredIndex = i"
            @mouseleave="hoveredIndex = null"
          />
        </g>

        <text
          v-for="(day, i) in chartData"
          :key="`lbl-${i}`"
          v-show="shouldShowLabel(i)"
          :x="day.x"
          :y="height - 5"
          text-anchor="middle"
          font-size="10"
          font-weight="600"
          fill="#94a3b8"
        >
          {{ day.label }}
        </text>

        <g v-if="hoveredIndex !== null" class="tooltip-group">
          <rect
            :x="points[hoveredIndex].x - 60"
            :y="points[hoveredIndex].y - 60"
            width="120"
            height="50"
            rx="8"
            fill="#1e293b"
            class="shadow"
          />
          <text
            :x="points[hoveredIndex].x"
            :y="points[hoveredIndex].y - 42"
            text-anchor="middle"
            fill="white"
            font-size="13"
            font-weight="bold"
          >
            {{ points[hoveredIndex].count }} របាយការណ៍
          </text>
          <text
            :x="points[hoveredIndex].x"
            :y="points[hoveredIndex].y - 25"
            text-anchor="middle"
            fill="#94a3b8"
            font-size="10"
          >
            {{ points[hoveredIndex].fullDate }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import dayjs from "dayjs";

const API_URL = "https://ant-g2-landf.ti.linkpc.net/api/v1/reports";
const reports = ref([]);
const loading = ref(false);
const error = ref(null);
const hoveredIndex = ref(null);
const timeRange = ref(30); // Default to 30 to see your January data

const width = 800;
const height = 320;
const padding = { top: 60, right: 30, bottom: 40, left: 30 };

const fetchReports = async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem("token") || "";
    const response = await fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    const res = await response.json();
    reports.value = res.data?.items || [];
  } catch (err) {
    error.value = "កំហុសក្នុងការទាញយកទិន្នន័យ";
  } finally {
    loading.value = false;
  }
};

const chartData = computed(() => {
  const today = dayjs();
  const days = [];
  for (let i = 0; i < timeRange.value; i++) {
    const date = today.subtract(timeRange.value - 1 - i, "day");
    const count = reports.value.filter(
      (r) => r.createdAt && dayjs(r.createdAt).isSame(date, "day"),
    ).length;

    days.push({
      // Show day names for 7-day, dates for 30-day
      label:
        timeRange.value === 7
          ? ["អាទិត្យ", "ច័ន្ទ", "អង្គារ", "ពុធ", "ព្រហ", "សុក្រ", "សៅរ៍"][
              date.day()
            ]
          : date.format("DD/MM"),
      fullDate: date.format("DD MMMM YYYY"),
      count,
      x:
        padding.left +
        i * ((width - padding.left - padding.right) / (timeRange.value - 1)),
    });
  }
  return days;
});

const maxVal = computed(() =>
  Math.max(...chartData.value.map((d) => d.count), 5),
);

const points = computed(() =>
  chartData.value.map((d) => ({
    x: d.x,
    y:
      height -
      padding.bottom -
      (d.count / maxVal.value) * (height - padding.top - padding.bottom),
    count: d.count,
    fullDate: d.fullDate,
  })),
);

// Curve Logic
const linePath = computed(() => {
  const p = points.value;
  if (p.length < 2) return "";
  let d = `M ${p[0].x} ${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const cx = (p[i].x + p[i + 1].x) / 2;
    d += ` C ${cx} ${p[i].y}, ${cx} ${p[i + 1].y}, ${p[i + 1].x} ${p[i + 1].y}`;
  }
  return d;
});

const areaPath = computed(() => {
  if (points.value.length < 2) return "";
  return `${linePath.value} L ${points.value[points.value.length - 1].x} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;
});

const shouldShowLabel = (index) => {
  if (timeRange.value === 7) return true;
  return index % 4 === 0; // Show every 4th label for 30-day view
};

onMounted(fetchReports);
</script>

<style scoped>
.content-card {
  background: #fff;
  border-radius: 20px;
  border: 1px solid #f1f5f9;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.range-picker {
  background: #f1f5f9;
  padding: 4px;
  border-radius: 12px;
  display: flex;
}

.range-btn {
  border: none;
  background: transparent;
  padding: 6px 16px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #64748b;
  transition: 0.2s;
}

.range-btn.active {
  background: #fff;
  color: #4f46e5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.trend-line-svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

.hover-zone {
  cursor: pointer;
}

.trend-path {
  stroke-dasharray: 1200;
  stroke-dashoffset: 1200;
  animation: draw 2s ease-out forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

.fade-in {
  animation: fadeIn 2s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.shadow {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
}
</style>

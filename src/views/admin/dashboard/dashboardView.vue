<template>
  <div class="dashboard-wrapper p-4">
    <header class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="header-title">ផ្ទាំងគ្រប់គ្រង</h2>
        <p class="text-secondary mb-0">
          ទិដ្ឋភាពទូទៅនៃទិន្នន័យក្នុងប្រព័ន្ធរបស់អ្នក
        </p>
      </div>
      <button
        class="btn btn-primary-custom d-none d-md-flex align-items-center"
        @click="showCreateModal = true"
      >
        <i class="bi bi-plus-lg me-2"></i> បង្កើតអ្នកប្រើប្រាស់
      </button>
    </header>

    <main class="main-content p-0">
      <div class="row g-4 mb-5">
        <div
          v-for="(card, index) in Cards"
          :key="index"
          class="col-12 col-md-6 col-lg-3"
        >
          <div
            class="stat-card-modern"
            :class="['variant-1', 'variant-2', 'variant-3', 'variant-4'][index]"
          >
            <div class="stat-content">
              <div class="stat-info">
                <p class="stat-label-modern">{{ card.title }}</p>
                <h3 class="stat-value-modern">
                  {{ card.value.toLocaleString() }}
                </h3>
              </div>
              <div class="stat-icon-box">
                <i :class="['bi', card.icon]"></i>
              </div>
            </div>
            <div class="stat-progress-bg">
              <div class="stat-progress-fill"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="line-chart-wrapper purple-theme">
        <div class="chart-header-mini">
          <span class="trend-indicator"
            ><i class="bi bi-arrow-up-short"></i> 12%</span
          >
          <div class="v-number-purple">{{ totalItems }} របាយការណ៍</div>
        </div>

        <svg viewBox="0 0 1000 200" class="line-chart-svg">
          <g
            class="grid-lines"
            stroke="rgba(139, 92, 246, 0.1)"
            stroke-width="1"
          >
            <line x1="0" y1="50" x2="1000" y2="50" />
            <line x1="0" y1="150" x2="1000" y2="150" />
          </g>

          <path
            d="M0,160 C 150,160 250,40 400,40 C 550,40 650,150 800,150 C 950,150 1000,80 1050,80"
            fill="none"
            stroke="#8b5cf6"
            stroke-width="5"
            stroke-linecap="round"
            class="purple-line-path"
          />

          <circle cx="800" cy="150" r="6" fill="#8b5cf6" class="glow-point" />
        </svg>

        <div class="chart-labels-purple">
          <span>ច័ន្ទ</span><span>អង្គារ</span><span>ពុធ</span
          ><span>ព្រហស្បតិ៍</span><span>សុក្រ</span><span>សៅរ៍</span
          ><span>អាទិត្យ</span>
        </div>
      </div>

      <div class="row g-4 mb-4">
        <div class="col-lg-8">
          <div class="content-card">
            <div class="content-card-header">
              <h5 class="m-0">
                <i class="bi bi-graph-up-arrow me-2"></i>និន្នាការរបាយការណ៍
                (៧ថ្ងៃចុងក្រោយ)
              </h5>
              <div class="dropdown">
                <button
                  class="btn btn-sm btn-outline-light text-dark border shadow-sm"
                >
                  ទាញយក PDF
                </button>
              </div>
            </div>
            <div
              class="chart-container"
              style="height: 300px; position: relative"
            >
              <div class="mock-graph">
                <div class="graph-bar-wrapper">
                  <div
                    v-for="n in 7"
                    :key="n"
                    class="graph-bar"
                    :style="{ height: Math.random() * 100 + '%' }"
                  >
                    <span class="bar-tooltip"
                      >{{ Math.floor(Math.random() * 20) }} របាយការណ៍</span
                    >
                  </div>
                </div>
              </div>
              <div class="graph-labels">
                <span>ច័ន្ទ</span><span>អង្គារ</span><span>ពុធ</span
                ><span>ព្រហស្បតិ៍</span><span>សុក្រ</span><span>សៅរ៍</span
                ><span>អាទិត្យ</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="content-card bg-primary-gradient text-white">
            <h5>សង្ខេបប្រចាំខែ</h5>
            <div class="mt-4">
              <div class="d-flex justify-content-between mb-2">
                <span>រកឃើញសរុប</span>
                <span class="fw-bold">+12%</span>
              </div>
              <div
                class="progress mb-4"
                style="height: 8px; background: rgba(255, 255, 255, 0.2)"
              >
                <div class="progress-bar bg-white" style="width: 70%"></div>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>បាត់បង់សរុប</span>
                <span class="fw-bold">+5%</span>
              </div>
              <div
                class="tab"
                :class="{ active: activeTab === 'Found' }"
                @click="activeTab = 'Found'"
              >
                ប្រទះឃើញ
                <div
                  class="progress"
                  style="height: 8px; background: rgba(255, 255, 255, 0.2)"
                >
                  <div class="progress-bar bg-warning" style="width: 40%"></div>
                </div>
              </div>
              <hr class="my-4" />
              <div class="text-center">
                <small
                  >អ្នកបានដោះស្រាយបញ្ហាចំនួន
                  <strong>{{ foundReports }}</strong> ក្នុងខែនេះ!</small
                >
              </div>
            </div>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-xl-8">
            <div class="content-card">
              <div class="content-card-header">
                <h5 class="m-0">
                  <i class="bi bi-clock-history me-2"></i>សកម្មភាពថ្មីៗ
                </h5>
                <div class="custom-tabs">
                  <button
                    v-for="tab in ['All', 'Lost', 'Found']"
                    :key="tab"
                    :class="['tab-btn', { active: activeTab === tab }]"
                    @click="activeTab = tab"
                  >
                    {{
                      tab === "All"
                        ? "ទាំងអស់"
                        : tab === "Lost"
                          ? "បាត់"
                          : "រកឃើញ"
                    }}
                  </button>
                </div>
              </div>

              <div class="transaction-container mt-3">
                <div
                  v-for="item in filteredItems"
                  :key="item.id"
                  class="activity-item"
                >
                  <div class="activity-left">
                    <div class="img-wrapper">
                      <img
                        :src="
                          item.reportImages?.[0]?.name || '/placeholder.png'
                        "
                        alt="item"
                      />
                    </div>
                    <div class="activity-info">
                      <h6 class="item-title">
                        {{ item.title }}
                        <span v-if="isRecent(item.createdAt)" class="badge-new"
                          >ថ្មី</span
                        >
                      </h6>
                      <p class="item-meta">
                        <span class="cat-tag">{{ item.category?.name }}</span>
                        <span class="dot"></span>
                        <span class="time-tag">{{
                          dayjs(item.createdAt).format("DD MMM, HH:mm")
                        }}</span>
                      </p>
                    </div>
                  </div>

                  <div
                    class="transaction-status"
                    :class="
                      item.reportType?.name === 'FOUND' ? 'found' : 'lost'
                    "
                  >
                    {{
                      item.reportType?.name === "FOUND"
                        ? "✓ ប្រទះឃើញ"
                        : "⚠ បានបាត់"
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4">
            <div class="content-card">
              <div class="content-card-header">
                <h5 class="m-0">
                  <i class="bi bi-pie-chart me-2"></i>តាមប្រភេទ
                </h5>
              </div>

              <div class="chart-section">
                <div class="donut-chart-wrapper">
                  <div class="donut-visual" :style="donutStyle">
                    <div class="donut-inner">
                      <span class="total-num">{{ totalItems }}</span>
                      <span class="total-text">សរុប</span>
                    </div>
                  </div>
                </div>

                <div class="legend-list mt-4">
                  <div
                    v-for="cat in categoryStats"
                    :key="cat.category.name"
                    class="legend-row"
                  >
                    <div class="legend-info">
                      <span class="legend-name">{{ cat.category.name }}</span>
                      <span class="legend-percent">{{ cat.percent }}%</span>
                    </div>
                    <div class="progress-thin">
                      <div
                        class="progress-bar-thin"
                        :style="{ width: cat.percent + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/api/api.js";
import dayjs from "dayjs";

// -----------------------
// Reactive State
// -----------------------
const totalItems = ref(0);
const totalUsers = ref(0);
const lostReports = ref(0);
const foundReports = ref(0);

const isRecent = (date) => {
  return dayjs().diff(dayjs(date), "hours") < 24;
};

// Items for transaction list (10 only)
const items = ref([]);

// All items for cards & donut
const allItems = ref([]);

// Category stats for donut chart
const categoryStats = ref([]);

// Active tab in transactions
const activeTab = ref("All");

// -----------------------
// Computed Properties
// -----------------------

// Filtered items for transaction list
const filteredItems = computed(() => {
  if (activeTab.value === "All") return items.value;
  return items.value.filter(
    (i) => i.reportType?.name === activeTab.value.toUpperCase(),
  );
});

// Donut chart background style
const donutStyle = computed(() => {
  if (!categoryStats.value.length) return {};

  let current = 0;
  const colors = [
    "#fbf8cc",
    "#fde4cf",
    "#ffcfd2",
    "#f1c0e8",
    "#cfbaf0",
    "#a3c4f3",
    "#90dbf4",
    "#8eecf5",
    "#98f5e1",
    "#b9fbc0",
  ];

  const gradient = categoryStats.value
    .map((cat, index) => {
      const start = current;
      const end = current + Number(cat.percent);
      current = end;
      return `${colors[index % colors.length]} ${start}% ${end}%`;
    })
    .join(", ");

  return {
    background: `conic-gradient(${gradient})`,
  };
});

// -----------------------
// API Calls
// -----------------------

// Fetch stats for cards & donut chart (ALL items)
const fetchStats = async () => {
  try {
    const res = await api.get("/reports", {
      params: {
        sortDir: "DESC",
        _per_page: 100, // ALL items for stats
      },
    });

    allItems.value = res.data.data.items;
    totalItems.value = res.data.data.meta.totalItems;

    lostReports.value = allItems.value.filter(
      (i) => i.reportType?.name === "LOST",
    ).length;
    foundReports.value = allItems.value.filter(
      (i) => i.reportType?.name === "FOUND",
    ).length;

    // Build category stats
    const categoryMap = {};
    allItems.value.forEach((item) => {
      const name = item.category?.name;
      if (!name) return;

      categoryMap[name] ??= { category: { name }, count: 0 };
      categoryMap[name].count++;
    });

    categoryStats.value = Object.values(categoryMap).map((cat) => ({
      category: cat.category,
      percent: ((cat.count / allItems.value.length) * 100).toFixed(1),
    }));
  } catch (error) {
    console.error("Error fetching stats:", error);
  }
};

// Fetch recent 10 reports for transaction list
const fetchRecentItems = async () => {
  try {
    const res = await api.get("/reports", {
      params: {
        sortDir: "DESC",
        _per_page: 10, // only 10 items
      },
    });

    items.value = res.data.data.items;
  } catch (error) {
    console.error("Error fetching recent items:", error);
  }
};

// Fetch total users
const getAllUsers = async () => {
  try {
    const res = await api.get("/users");
    totalUsers.value = res.data.data.meta.totalItems;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// -----------------------
// Dashboard Cards
// -----------------------
const Cards = computed(() => [
  {
    title: "របាយការណ៍សរុប",
    value: totalItems.value,
    icon: "bi-collection",
  },
  {
    title: "របស់បាត់",
    value: lostReports.value,
    icon: "bi-geo-alt",
  },
  {
    title: "របស់រកឃើញ",
    value: foundReports.value,
    icon: "bi-shield-check",
  },
  {
    title: "អ្នកប្រើប្រាស់សរុប",
    value: totalUsers.value,
    icon: "bi-people",
  },
]);

// -----------------------
// Lifecycle
// -----------------------
onMounted(() => {
  fetchStats(); // ALL items for cards + donut
  fetchRecentItems(); // Only 10 items for transaction list
  getAllUsers(); // total users
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanuman:wght@400;700&family=Inter:wght@400;500;600;700&display=swap");

.purple-theme {
  background: #ffffff;
  padding: 30px 20px;
  border-radius: 24px; /* More rounded for a modern feel */
  border: 1px solid rgba(139, 92, 246, 0.1);
  position: relative;
  box-shadow: 0 10px 30px -15px rgba(139, 92, 246, 0.2);
}

.chart-header-mini {
  margin-bottom: 10px;
}

.trend-indicator {
  font-size: 0.75rem;
  font-weight: 700;
  color: #10b981; /* Keep success green for trends */
  background: rgba(16, 185, 129, 0.1);
  padding: 2px 8px;
  border-radius: 20px;
}

.v-number-purple {
  font-size: 1.5rem;
  font-weight: 800;
  color: #4c1d95; /* Deep Purple */
  margin-top: 5px;
}

.purple-line-path {
  /* High-end neon purple glow */
  filter: drop-shadow(0px 10px 15px rgba(139, 92, 246, 0.4));
  stroke-dasharray: 1200;
  stroke-dashoffset: 1200;
  animation: drawPurplePath 2.5s ease-out forwards;
}

@keyframes drawPurplePath {
  to {
    stroke-dashoffset: 0;
  }
}

.glow-point {
  filter: drop-shadow(0 0 10px #8b5cf6);
}

.chart-labels-purple {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}

.chart-labels-purple span {
  font-size: 0.8rem;
  font-weight: 500;
  color: #a78bfa; /* Soft Purple-gray */
}

/* Update your stat-card variants to match the purple brand */
.variant-1 .stat-icon-box {
  background: #f5f3ff;
  color: #8b5cf6;
}
.variant-2 .stat-icon-box {
  background: #ede9fe;
  color: #7c3aed;
}
.variant-3 .stat-icon-box {
  background: #ddd6fe;
  color: #6d28d9;
}
.variant-4 .stat-icon-box {
  background: #c4b5fd;
  color: #5b21b6;
}

/* Enhanced Line Animation */
.draw-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

/* Make the SVG responsive and clean */
.line-chart-svg {
  width: 100%;
  height: 220px;
  overflow: visible;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.05));
}

/* Pulse effect for data points */
.chart-point {
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 8px rgba(79, 70, 229, 0.3));
}

.chart-point:hover {
  r: 9;
  filter: drop-shadow(0 0 12px rgba(79, 70, 229, 0.6));
  cursor: crosshair;
}

/* Ensure Khmer text looks clean in labels */
.chart-labels span {
  font-family: "Hanuman", serif;
  font-size: 0.75rem;
  color: #64748b;
  opacity: 0.8;
}
:offset-root {
  --primary: #4f46e5;
  --bg-subtle: #f8fafc;
  --border-color: #e2e8f0;
}

.dashboard-wrapper {
  font-family: "Inter", "Hanuman", sans-serif;
  background-color: #f8fafc;
  min-height: 100vh;
}

.header-title {
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
}

/* Button Styling */
.btn-primary-custom {
  background: var(--primary);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary-custom:hover {
  background: #4338ca;
  transform: translateY(-1px);
}

/* Modern Stat Cards */
.stat-card-modern {
  background: white;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.stat-card-modern:hover {
  transform: translateY(-5px);
}

.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stat-label-modern {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.stat-value-modern {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
}

.stat-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

/* Variants */
.variant-1 .stat-icon-box {
  background: #e0e7ff;
  color: #4f46e5;
}
.variant-2 .stat-icon-box {
  background: #fef3c7;
  color: #d97706;
}
.variant-3 .stat-icon-box {
  background: #dcfce7;
  color: #16a34a;
}
.variant-4 .stat-icon-box {
  background: #fce7f3;
  color: #db2777;
}

/* Content Cards */
.content-card {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  height: 100%;
  padding: 24px;
}

.content-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

/* Tabs */
.custom-tabs {
  background: #f1f5f9;
  padding: 4px;
  border-radius: 8px;
  display: flex;
}

.tab-btn {
  border: none;
  background: transparent;
  padding: 6px 16px;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 6px;
  color: #64748b;
  transition: all 0.2s;
}

.tab-btn.active {
  background: white;
  color: var(--primary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Activity Items */
.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 8px;
  transition: background 0.2s;
}

.activity-item:hover {
  background: #f8fafc;
}

.activity-left {
  display: flex;
  gap: 16px;
  align-items: center;
}

.img-wrapper img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  object-fit: cover;
  background: #f1f5f9;
}

.item-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.badge-new {
  font-size: 10px;
  background: #22c55e;
  color: white;
  padding: 1px 6px;
  border-radius: 4px;
  margin-left: 8px;
}

.item-meta {
  font-size: 0.8rem;
  color: #94a3b8;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 4px;
  height: 4px;
  background: #cbd5e1;
  border-radius: 50%;
}

/* Status Pills */
.status-pill {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
}

.status-pill.found {
  background: #dcfce7;
  color: #166534;
}
.status-pill.lost {
  background: #fee2e2;
  color: #991b1b;
}

/* Donut Chart */
.donut-visual {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.total-num {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
}
.total-text {
  font-size: 0.85rem;
  color: #64748b;
}

/* Progress Bars */
.legend-row {
  margin-bottom: 16px;
}
.legend-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 0.85rem;
}
.progress-thin {
  height: 6px;
  background: #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
}
.progress-bar-thin {
  height: 100%;
  background: var(--primary);
  border-radius: 10px;
}
/* Custom Bar Graph Styling */
.mock-graph {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 220px;
  padding: 20px 10px;
  background: linear-gradient(to bottom, #fcfcfc, #ffffff);
  border-bottom: 2px solid #edf2f7;
}

.graph-bar-wrapper {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}

.graph-bar {
  width: 35px;
  background: linear-gradient(to top, #4f46e5, #818cf8);
  border-radius: 6px 6px 0 0;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
}

.graph-bar:hover {
  background: #4338ca;
  filter: brightness(1.1);
}

.bar-tooltip {
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
}

.graph-bar:hover .bar-tooltip {
  opacity: 1;
}

.graph-labels {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  color: #94a3b8;
  font-size: 0.8rem;
}

.bg-primary-gradient {
  background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
  border: none !important;
}

/* Chart Container */
.line-chart-wrapper {
  padding: 20px 0;
  position: relative;
}

.line-chart-svg {
  width: 100%;
  height: 180px;
  overflow: visible;
}

/* Line Animation */
.draw-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 3s ease-in-out forwards;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

.chart-point {
  filter: drop-shadow(0 2px 4px rgba(79, 70, 229, 0.4));
  cursor: pointer;
  transition: r 0.2s ease;
}

.chart-point:hover {
  r: 8;
}

/* Labels below chart */
.chart-labels {
  display: flex;
  justify-content: space-between;
  padding: 10px 5px 0 5px;
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 500;
  border-top: 1px solid #f1f5f9;
}

/* Legend Badges */
.badge-legend {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
}
.badge-legend.lost {
  color: #ef4444;
  background: #fee2e2;
}
.badge-legend.found {
  color: #4f46e5;
  background: #e0e7ff;
}

/* Content Card enhancements */
.content-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}
</style>

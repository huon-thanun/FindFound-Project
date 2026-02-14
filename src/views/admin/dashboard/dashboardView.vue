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

      <!-- STAT CARDS -->
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
      <!-- ✅ CLOSED row properly -->

      <!-- LINE CHART -->
      <div class="line-chart-wrapper purple-theme mb-4">
        <div class="chart-header-mini">
          <span class="trend-indicator">
            <i class="bi bi-arrow-up-short"></i> 12%
          </span>
          <div class="v-number-purple">{{ totalItems }} របាយការណ៍</div>
        </div>

        <svg viewBox="0 0 1000 200" class="line-chart-svg">
          <g stroke="rgba(139, 92, 246, 0.1)" stroke-width="1">
            <line x1="0" y1="50" x2="1000" y2="50" />
            <line x1="0" y1="150" x2="1000" y2="150" />
          </g>

          <path
            d="M0,160 C 150,160 250,40 400,40 C 550,40 650,150 800,150 C 950,150 1000,80 1050,80"
            fill="none"
            stroke="#8b5cf6"
            stroke-width="5"
            stroke-linecap="round"
          />

          <circle cx="800" cy="150" r="6" fill="#8b5cf6" />
        </svg>

        <div class="chart-labels-purple">
          <span>ច័ន្ទ</span><span>អង្គារ</span><span>ពុធ</span>
          <span>ព្រហស្បតិ៍</span><span>សុក្រ</span>
          <span>សៅរ៍</span><span>អាទិត្យ</span>
        </div>

      <!-- REPORT TREND + MONTH SUMMARY -->
      <div class="row g-4 mb-4">
        <div class="col-lg-8">
          <div class="content-card">
            <div class="content-card-header">
              <h5 class="m-0">
                <i class="bi bi-graph-up-arrow me-2"></i>
                និន្នាការរបាយការណ៍ (៧ថ្ងៃចុងក្រោយ)
              </h5>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="content-card bg-primary-gradient text-white">
            <h5>សង្ខេបប្រចាំខែ</h5>
            <div class="mt-4 text-center">
              <small>
                អ្នកបានដោះស្រាយបញ្ហាចំនួន
                <strong>{{ foundReports }}</strong>
                ក្នុងខែនេះ!
              </small>
            </div>
          </div>
        </div>
      </div>

      <!-- RECENT ACTIVITY + DONUT -->
      <div class="row g-4">
        <!-- LEFT COLUMN -->
        <div class="col-xl-8">
          <div class="content-card">
            <div class="content-card-header">
              <h5 class="m-0">
                <i class="bi bi-clock-history me-2"></i>
                សកម្មភាពថ្មីៗ
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
                      :src="item.reportImages?.[0]?.name || '/placeholder.png'"
                      alt="item"
                    />
                  </div>

                  <div class="activity-info">
                    <h6 class="item-title">
                      {{ item.title }}
                      <span
                        v-if="isRecent(item.createdAt)"
                        class="badge-new"
                      >
                        ថ្មី
                      </span>
                    </h6>

                    <p class="item-meta">
                      <span class="cat-tag">
                        {{ item.category?.name }}
                      </span>
                      <span class="dot"></span>
                      <span class="time-tag">
                        {{ dayjs(item.createdAt).format("DD MMM, HH:mm") }}
                      </span>
                    </p>
                  </div>

                  <div
                    class="transaction-status"
                    :class="
                      item.reportType?.name === 'FOUND'
                        ? 'found'
                        : 'lost'
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
        </div>

        <!-- RIGHT COLUMN -->
        <div class="col-xl-4">
          <div class="content-card">
            <div class="content-card-header">
              <h5 class="m-0">
                <i class="bi bi-pie-chart me-2"></i>
                តាមប្រភេទ
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
                    <span class="legend-name">
                      {{ cat.category.name }}
                    </span>
                    <span class="legend-percent">
                      {{ cat.percent }}%
                    </span>
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
      <!-- END ROW -->

    </main>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/api/api.js";
import dayjs from "dayjs";

import CategoryDonut from "@/components/dashboard/CategoryDonut.vue";
import MonthlySummary from "@/components/dashboard/MonthlySummary.vue";
import RecentActivities from "@/components/dashboard/RecentActivities.vue";
import StatCards from "@/components/dashboard/StatCards.vue";
import TrendLineChart from "@/components/dashboard/TrendLineChart.vue";
import WeeklyReportChart from "@/components/dashboard/WeeklyReportChart.vue";

const loading = ref(true);
const totalItems = ref(0);
const totalUsers = ref(0);
const lostReports = ref(0);
const foundReports = ref(0);
const items = ref([]);
const allItems = ref([]);
const categoryStats = ref([]);
const activeTab = ref("All");

const foundGrowth = ref(12);
const lostGrowth = ref(5);
const foundProgress = ref(68);
const lostProgress = ref(32);

const isRecent = (date) => dayjs().diff(dayjs(date), "hour") < 24;

const cards = computed(() => [
  { title: "របាយការណ៍សរុប", value: totalItems.value, icon: "bi-collection" },
  { title: "របស់បាត់", value: lostReports.value, icon: "bi-geo-alt" },
  { title: "របស់រកឃើញ", value: foundReports.value, icon: "bi-shield-check" },
  { title: "អ្នកប្រើប្រាស់សរុប", value: totalUsers.value, icon: "bi-people" },
]);

const donutStyle = computed(() => {
  if (!categoryStats.value.length) return {};
  let current = 0;
  const colors = [
    "#8b5cf6",
    "#a78bfa",
    "#c4b5fd",
    "#ddd6fe",
    "#f3e8ff",
    "#fecaca",
    "#fed7aa",
  ];
  const segments = categoryStats.value.map((cat, i) => {
    const start = current;
    current += Number(cat.percent);
    return `${colors[i % colors.length]} ${start}% ${current}%`;
  });
  return { background: `conic-gradient(${segments.join(", ")})` };
});

const last7Days = computed(() => {
  const today = dayjs();
  return Array.from({ length: 7 }, (_, i) => {
    const d = today.subtract(6 - i, "day");
    const count = allItems.value.filter((r) =>
      dayjs(r.createdAt).isSame(d, "day"),
    ).length;
    return {
      key: d.format("YYYY-MM-DD"),
      label: [
        "ច័ន្ទ",
        "អង្គារ",
        "ពុធ",
        "ព្រហស្បតិ៍",
        "សុក្រ",
        "សៅរ៍",
        "អាទិត្យ",
      ][d.day() === 0 ? 6 : d.day() - 1],
      count,
      height: Math.min(220, count * 11 + 20),
    };
  });
});

// ────────────────────────────────────────────────
// Safe API calls (fixed for 400 errors)
// ────────────────────────────────────────────────
onMounted(async () => {
  loading.value = true;
  try {
    // Recent items - minimal params to avoid 400
    const recentRes = await api.get("/reports", {
      params: { sortDir: "DESC" },
    });
    items.value = recentRes?.data?.data?.items || [];

    // Stats - minimal params
    const statsRes = await api.get("/reports", { params: { sortDir: "DESC" } });
    allItems.value = statsRes?.data?.data?.items || [];
    totalItems.value =
      statsRes?.data?.data?.meta?.totalItems || allItems.value.length;

    lostReports.value = allItems.value.filter(
      (i) => i.reportType?.name === "LOST",
    ).length;
    foundReports.value = allItems.value.filter(
      (i) => i.reportType?.name === "FOUND",
    ).length;

    // Categories (simple logic)
    const catCount = {};
    allItems.value.forEach((r) => {
      const name = r.category?.name;
      if (name) catCount[name] = (catCount[name] || 0) + 1;
    });
    const total = allItems.value.length || 1;
    categoryStats.value = Object.entries(catCount).map(([name, cnt]) => ({
      category: { name },
      percent: ((cnt / total) * 100).toFixed(1),
    }));

    // Users
    const usersRes = await api.get("/users");
    totalUsers.value = usersRes?.data?.data?.meta?.totalItems || 0;
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    if (err.response?.status === 400) {
      console.error("400 Bad Request - check API params:", err.response?.data);
    }
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Your existing styles remain the same */
.dashboard-wrapper {
  font-family: "Hanuman", "Inter", sans-serif;
  background: #f8fafc;
  min-height: 100vh;
}
.header-title {
  font-weight: 700;
  color: #1e293b;
}
.btn-primary-custom {
  background: #4f46e5;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: 500;
  transition: all 0.2s;
}
.btn-primary-custom:hover {
  background: #4338ca;
  transform: translateY(-1px);
}
.stat-card-modern {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  transition: all 0.25s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}
.stat-card-modern:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(79, 70, 229, 0.12);
}
.stat-value-modern {
  font-size: 2rem;
  font-weight: 800;
}
.content-card {
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}
.content-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}
</style>

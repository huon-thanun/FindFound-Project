<template>
  <div class="dashboard-wrapper p-4">
    <header class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="header-title">ផ្ទាំងគ្រប់គ្រង</h2>
        <p class="text-secondary mb-0">
          ទិដ្ឋភាពទូទៅនៃទិន្នន័យក្នុងប្រព័ន្ធរបស់អ្នក
        </p>
      </div>
    </header>

    <main class="main-content">
      <div v-if="loading" class="text-center py-5 my-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-3 text-muted">កំពុងផ្ទុកទិន្នន័យ...</p>
      </div>

      <div v-else>
        <div class="row g-4 mb-5">
          <StatCards :cards="cards" />
        </div>
        <div class="row g-4 mb-5">
          <TrendLineChart :reports="allItems" />
        </div>

        <div class="row g-4">
          <div class="col-xl-8">
            <RecentActivities
              :items="items"
              v-model:active-tab="activeTab"
              :is-recent="isRecent"
            />
          </div>

          <div class="col-xl-4">
            <div class="content-card mt-4">
              <CategoryDonut
                :total-items="totalItems"
                :category-stats="categoryStats"
                :donut-style="donutStyle"
              />
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

import CategoryDonut from "@/components/dashboard/CategoryDonut.vue";
import RecentActivities from "@/components/dashboard/RecentActivities.vue";
import StatCards from "@/components/dashboard/StatCards.vue";
import TrendLineChart from "@/components/dashboard/TrendLineChart.vue";

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

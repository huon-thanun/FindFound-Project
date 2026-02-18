<template>
  <div class="dashboard-wrapper p-3">
    <div class="admin-banner mb-4 rounded-4">
        <div class="banner-container">
          <!-- icon: report / clip -->
          <div class="banner-icon">
            <i class="bi-speedometer"></i>
          </div>

          <!-- main text group -->
          <div class="banner-text">
            <!-- exact h2 from prompt, plus small context badge -->
            <h2 class="fw-bold">
              ផ្ទាំងគ្រប់គ្រង
              <span class="badge-admin"><i class="bi bi-shield"
                  style="font-size: 0.75rem; margin-right: 5px"></i>អ្នកគ្រប់គ្រង</span>
            </h2>
            <!-- exact paragraph, but we enhance it with a subtle khmer-friendly meta info -->
            <p class="text-muted">
              <i class="fas fa-eye" style="opacity: 0.7; font-size: 1rem"></i>
              ទិដ្ឋភាពទូទៅនៃទិន្នន័យក្នុងប្រព័ន្ធរបស់អ្នក
            </p>
          </div>
        </div>

        <!-- very subtle divider line just for style (makes banner airy) -->
        <div style="
            margin-top: 0.8rem;
            margin-left: calc(70px + 1.25rem);
            border-bottom: 2px dashed rgba(86, 115, 150, 0.15);
            width: 40%;
          "></div>
      </div>
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
            <CategoryDonut
              :total-items="totalItems"
              :category-stats="categoryStats"
              :donut-style="donutStyle"
            />
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
/* main card – admin header banner */
.admin-banner {
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  background-image: url('../../../assets/images/background/dashboard.png');
  background-position: center;
  background-size: cover;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  padding: 2rem 2.5rem;
  border-top: 5px solid var(--secondary-color);
  box-shadow: 0 0px 20px -12px rgba(0, 20, 40, 0.25),
    inset 0 1px 2px rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
}

/* inner flex layout: icon group + text */
.banner-container {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

/* left side icon – subtle report / clipboard */
.banner-icon {
  background: var(--secondary-color);
  color: white;
  width: 70px;
  height: 70px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  box-shadow: 0 10px 18px -6px rgba(20, 35, 70, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.25);
}

/* text block */
.banner-text {
  flex: 1;
}

/* main heading – exactly as given */
.banner-text h2.fw-bold {
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #0b1a33;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem 0.8rem;
}

/* optional subtle badge for admin context */
.badge-admin {
  background: rgba(20, 53, 90, 0.1);
  padding: 0.3rem 1rem;
  border-radius: 60px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #1e3b5c;
  border: 1px solid rgba(20, 53, 90, 0.2);
  letter-spacing: 0.02rem;
  margin-left: 0.25rem;
  backdrop-filter: blur(4px);
}

/* secondary text exactly as provided */
.banner-text p.text-muted {
  font-size: 1.18rem;
  color: #48607c !important;
  /* override muted with accessible soft navy */
  font-weight: 400;
  line-height: 1.5;
  max-width: 700px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* little khmer style accent – a separating dash with decorative element */
.text-muted .separator {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #8aa0bc;
  border-radius: 50%;
  margin: 0 0.5rem;
  opacity: 0.6;
}

/* additional stats chips for admin overview – keeps banner airy but functional */
.banner-meta {
  display: flex;
  gap: 1.2rem;
  margin-top: 1.2rem;
  flex-wrap: wrap;
}

.meta-chip {
  background: rgba(230, 240, 255, 0.7);
  border-radius: 40px;
  padding: 0.4rem 1.4rem 0.4rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #1f3b58;
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 10px -6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-chip i {
  color: #2f4d73;
  font-size: 0.9rem;
  opacity: 0.8;
}

.meta-chip span {
  font-weight: 600;
  color: #0b2642;
  margin-right: 2px;
}

/* responsive touch */
@media (max-width: 550px) {
  .admin-banner {
    padding: 1.5rem 1.5rem;
    border-radius: 2rem;
  }

  .banner-icon {
    width: 55px;
    height: 55px;
    font-size: 1.8rem;
    border-radius: 22px;
  }

  .banner-text h2.fw-bold {
    font-size: 2rem;
  }

  .banner-text p.text-muted {
    font-size: 1rem;
  }
}

@media (max-width: 420px) {
  .banner-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .banner-icon {
    align-self: flex-start;
  }
}

/* small flourish: micro reflection line */
.admin-banner {
  position: relative;
  isolation: isolate;
}

.admin-banner::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 0% 10%,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 50%);
  pointer-events: none;
  border-radius: inherit;
  z-index: -1;
}
</style>

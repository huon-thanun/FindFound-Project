<template>
  <h1 class="mb-5"><i class="bi bi-speedometer2"></i> ផ្ទាំងគ្រប់គ្រង</h1>
  <div class="container p-0 mt-4">
    <!-- Main Content -->
    <main class="main-content">
      <!-- Stats Cards -->
      <div class="row">
        <div v-for="(card, index) in Cards" :key="index" class="col-12 col-md-6 col-lg-3 mb-4">
          <div class="stat-card text-center" :class="['cyan', 'blue', 'pink', 'purple'][index]">
            <div :class="`stat-icon mx-auto text-white ${card.icon}`"></div>
            <div class="stat-label">{{ card.title }}</div>
            <div class="stat-value">{{ card.value }}</div>
          </div>
        </div>
      </div>
      <!-- Dashboard Grid -->
      <div class="dashboard-grid">
        <!-- Recent Activity -->
        <div class="card">
          <div class="card-header">
            <div class="card-title text-white"><i class="bi-stars"></i> សកម្មភាពថ្មីៗ</div>
          </div>

          <div class="transaction-tabs">
            <div class="tab" :class="{ active: activeTab === 'All' }" @click="activeTab = 'All'">
              របស់សរុប
            </div>
            <div class="tab" :class="{ active: activeTab === 'Lost' }" @click="activeTab = 'Lost'">
              បាត់
            </div>
            <div class="tab" :class="{ active: activeTab === 'Found' }" @click="activeTab = 'Found'">
              រកឃើញ
            </div>
          </div>


          <div v-for="item in filteredItems" :key="item.id" class="transactions-list">
            <div class="transaction-item">
              <div class="transaction-left">
                <div class="transaction-icon">
                  <img :src="item.reportImages?.[0]?.name || '/placeholder.png'" alt="Report Image" />
                </div>
                <div class="transaction-details">
                  <h4>
                    {{ item.title }}
                    <span class="new-badge"> ថ្មីៗ </span>
                  </h4>

                  <div class="transaction-meta">
                    <span>{{ item.category?.name }}</span>
                    <span>
                      {{ item.reportType?.name }} •
                      <span>{{ dayjs(item.createdAt).format("DD MMM YYYY, HH:mm") }}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div class="transaction-status" :class="item.reportType?.name === 'FOUND' ? 'found' : 'lost'">
                {{ item.reportType?.name === "FOUND" ? "✓ Found" : "⚠ Lost" }}
              </div>
            </div>
          </div>

        </div>
        <!-- Category Breakdown -->
        <div class="card">
          <div class="card-header">
            <div class="card-title text-white"><i class="bi-tag"></i> របស់តាមប្រភេទ</div>
          </div>

          <div class="activity-chart">
            <div class="donut-chart" :style="donutStyle">
              <div class="donut-center">
                <div class="donut-value">{{ totalItems }}</div>
                <div class="donut-label">របស់សរុប</div>
              </div>
            </div>
          </div>

          <div class="activity-legend">
            <div class="legend-item" v-for="cat in categoryStats" :key="cat.category.name">
              <!-- Top row -->
              <div class="legend-top">
                <div class="legend-label">
                  {{ cat.category.name }}
                </div>

                <div class="legend-value">{{ cat.percent }}%</div>
              </div>

              <!-- Progress bar -->
              <div class="legend-progress">
                <div class="legend-progress-bar" :style="{ width: cat.percent + '%' }"></div>
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

const totalItems = ref(0);
const totalUsers = ref(0);
const lostReports = ref(0);
const foundReports = ref(0);
const items = ref([]);
const categoryStats = ref([]);
const activeTab = ref("All"); // default tab is "All"
const filteredItems = computed(() => {
  if (activeTab.value === "All") return items.value;
  return items.value.filter(item => item.reportType?.name === activeTab.value.toUpperCase());
});


const todayItems = computed(() => items.value);


const donutStyle = computed(() => {
  if (!categoryStats.value.length) return {};

  let current = 0;
  const colors = [
    "#fbf8cc", // indigo
    "#fde4cf", // green
    "#ffcfd2", // amber
    "#f1c0e8", // red
    "#cfbaf0", // cyan
    "#a3c4f3", // violet
    "#90dbf4",
    "#8eecf5", // orange
    "#98f5e1", // emerald
    "#b9fbc0", // emerald
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

const getTotalItems = async () => {
  try {
    const res = await api.get("/reports", {
      params: {
        sortDir: "DESC",
      },
    });

    totalItems.value = res.data.data.meta.totalItems;
    items.value = res.data.data.items;

    lostReports.value = items.value.filter(
      (item) => item.reportType?.name === "LOST"
    ).length;

    foundReports.value = items.value.filter(
      (item) => item.reportType?.name === "FOUND"
    ).length;

    // 👉 Build category stats
    const categoryMap = {};

    items.value.forEach((item) => {
      const catName = item.category?.name;
      if (!catName) return;

      if (!categoryMap[catName]) {
        categoryMap[catName] = {
          category: { name: catName },
          count: 0,
        };
      }

      categoryMap[catName].count++;
    });

    categoryStats.value = Object.values(categoryMap).map((cat) => ({
      category: cat.category,
      percent: ((cat.count / items.value.length) * 100).toFixed(1),
    }));

    console.log("CATEGORY STATS:", categoryStats.value);
    console.log("TOTAL ITEMS:", totalItems.value);
    console.log("LOST REPORTS:", lostReports.value);
    console.log("FOUND REPORTS:", foundReports.value);
  } catch (error) {
    console.error(error);
  }
};
const getAllUsers = async () => {
  try {
    const res = await api.get("/users");

    totalUsers.value = res.data.data.meta.totalItems;
    console.log("TOTAL USERS:", totalUsers.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getTotalItems();
  getAllUsers();
});

const Cards = computed(() => [
  {
    title: "របស់សរុប",
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
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(135deg, #eef2f8 0%, #e8edfa 50%, #f2e8fa 100%);
  color: var(--text-primary);
  min-height: 100vh;
  overflow-x: hidden;
}

.new-badge {
  margin-left: 6px;
  font-size: 10px;
  padding: 2px 6px;
  background: #22c55e;
  color: #fff;
  border-radius: 999px;
}

.lost {
  color: var(--danger);
  font-weight: 600;
}

.found {
  color: var(--success);
  font-weight: 600;
}

/* Main Content */
.main-content {
  flex: 1;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-card {
  padding: 1.75rem;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.4s ease;
  animation: fadeInUp 0.6s ease-out backwards;
}

.stat-card:nth-child(1) {
  animation-delay: 0.1s;
}

.stat-card:nth-child(2) {
  animation-delay: 0.2s;
}

.stat-card:nth-child(3) {
  animation-delay: 0.3s;
}

.stat-card:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-card.cyan {
  background: linear-gradient(135deg, #84cbfe, #bbdefb);
}

.stat-card.blue {
  background: linear-gradient(135deg, #ef85ff, #e1bee7);
}

.stat-card.pink {
  background: linear-gradient(135deg, #3be84a, #c8e6c9);
}

.stat-card.purple {
  background: linear-gradient(135deg, #febb4e, #ffe0b2);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.stat-label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.stat-value {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  font-family: "Sora", sans-serif;
  margin-bottom: 0.75rem;
}

/* Main Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  animation: fadeInUp 0.6s ease-out backwards;
  animation-delay: 0.5s;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  margin-bottom: 1.5rem;
  background: var(--primary-color);
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
}

@keyframes barGrow {
  from {
    height: 0 !important;
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* Activity Donut */
.activity-chart {
  position: relative;
  width: 100%;
  max-width: 240px;
  margin: 2rem auto;
}

.donut-chart {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  position: relative;
}

.donut-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.donut-value {
  font-size: 1.75rem;
  font-weight: 700;
  font-family: "Sora", sans-serif;
  color: var(--text-primary);
}

.donut-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.activity-legend {
  margin-top: 1.5rem;
}

/* Transaction History */
.transaction-tabs {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.tab {
  padding: 0.75rem 0;
  color: var(--secondary-color);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.transaction-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.transaction-item:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateX(4px);
}

.transaction-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.transaction-icon img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.03);
}

.transaction-details h4 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.transaction-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.transaction-amount {
  font-weight: 600;
  font-family: "Sora", sans-serif;
  color: var(--text-primary);
}

.legend-item {
  margin-bottom: 14px;
}

.legend-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.legend-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.legend-value {
  font-size: 13px;
  font-weight: 600;
}

.legend-progress {
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.legend-progress-bar {
  height: 100%;
  background: var(--primary-color);
  border-radius: 999px;
  transition: width 0.6s ease;
}

@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 1.5rem;
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    transform: translateX(20px);
  }
}
</style>
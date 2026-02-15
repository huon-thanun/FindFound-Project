<template>
  <div class="row g-3 mb-5">
    <div
      v-for="(card, index) in statCards"
      :key="index"
      class="col-12 col-sm-6 col-lg-3"
    >
      <div
        class="modern-stat-card"
        :class="{ 'featured-card': index === 0 }"
        :style="getCardStyle(index)"
      >
        <div
          class="card-header d-flex justify-content-between align-items-center mb-4"
        >
          <div class="icon-wrapper">
            <i :class="['bi', card.icon || 'bi-people']"></i>
          </div>
          <div
            v-if="card.trend !== undefined"
            class="trend-pill shadow-sm"
            :class="card.trend >= 0 ? 'trend-up' : 'trend-down'"
          >
            <i
              :class="
                card.trend >= 0
                  ? 'bi bi-arrow-up-short'
                  : 'bi bi-arrow-down-short'
              "
            ></i>
            {{ Math.abs(card.trend).toFixed(1) }}%
          </div>
        </div>

        <div class="card-body">
          <h5 class="card-title">{{ card.title }}</h5>
          <div class="card-value">{{ card.value.toLocaleString("km-KH") }}</div>
          <small class="secondary-label">{{ card.secondary }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const statCards = ref([]);

onMounted(async () => {
  try {
    // Fetch users (you can increase perPage if needed later)
    await userStore.fetchUsers({ page: 1, perPage: 100 });

    const totalUsers = userStore.total || 0;

    // Count based on real API status values
    const activeUsers = userStore.users.filter(
      (u) => (u.status || "").toUpperCase() === "ACTIVATED",
    ).length;

    const inactiveUsers = userStore.users.filter(
      (u) => (u.status || "").toUpperCase() === "DEACTIVATED",
    ).length;

    // New users this month (based on registeredAt)
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const newThisMonth = userStore.users.filter((u) => {
      if (!u.registeredAt) return false;
      const regDate = new Date(u.registeredAt);
      return regDate >= startOfMonth;
    }).length;

    // Simple example trend calculation (you can improve this later)
    // For demo: random small change or based on previous data if you have it
    const getTrend = (value) => {
      // Placeholder: between -4 and +6 for visual testing
      return Math.round((Math.random() * 10 - 4) * 10) / 10;
    };

    statCards.value = [
      {
        title: "អ្នកប្រើប្រាស់សរុប",
        value: totalUsers,
        icon: "bi-people",
        trend: getTrend(totalUsers),
        secondary: "សរុបអ្នកប្រើប្រាស់",
      },
      {
        title: "អ្នកប្រើប្រាស់សកម្ម",
        value: activeUsers,
        icon: "bi-person-check",
        trend: getTrend(activeUsers),
        secondary: "អ្នកប្រើប្រាស់សកម្ម",
      },
      {
        title: "អ្នកប្រើប្រាស់អសកម្ម",
        value: inactiveUsers,
        icon: "bi-person-x",
        trend: getTrend(inactiveUsers),
        secondary: "អ្នកប្រើប្រាស់អសកម្ម",
      },
      {
        title: "អ្នកប្រើថ្មីក្នុងខែនេះ",
        value: newThisMonth,
        icon: "bi-person-plus",
        trend: getTrend(newThisMonth),
        secondary: "អ្នកប្រើថ្មីខែនេះ",
      },
    ];
  } catch (err) {
    console.error("Failed to load user stats:", err);
    // Optional: set fallback cards
    statCards.value = [
      {
        title: "អ្នកប្រើប្រាស់សរុប",
        value: 0,
        icon: "bi-people",
        secondary: "មានបញ្ហាក្នុងការទាញទិន្នន័យ",
      },
      { title: "អ្នកប្រើប្រាស់សកម្ម", value: 0, icon: "bi-person-check" },
      { title: "អ្នកប្រើប្រាស់អសកម្ម", value: 0, icon: "bi-person-x" },
      { title: "អ្នកប្រើថ្មីក្នុងខែនេះ", value: 0, icon: "bi-person-plus" },
    ];
  }
});

// Accent colors (unchanged)
const accents = [
  { primary: "#7c3aed", light: "#c4b5fd", bg: "rgba(124,58,237,0.18)" },
  { primary: "#6366f1", light: "#a5b4fc", bg: "rgba(99,102,241,0.07)" },
  { primary: "#10b981", light: "#6ee7b7", bg: "rgba(16,185,129,0.07)" },
  { primary: "#f59e0b", light: "#fcd34d", bg: "rgba(245,158,11,0.07)" },
];

const getCardStyle = (index) => {
  const a = accents[index % accents.length];
  return {
    "--accent-primary": a.primary,
    "--accent-light": a.light,
    "--accent-bg": a.bg,
  };
};
</script>

<style scoped>
/* ── Your original beautiful styles (unchanged) ── */
.modern-stat-card {
  font-family: "Hanuman", "Inter", sans-serif;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(14px) saturate(170%);
  border: 1px solid rgba(255, 255, 255, 0.38);
  border-radius: 1.5rem;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.4s ease;
  position: relative;
}
.featured-card {
  background: linear-gradient(135deg, #7c3aed 0%, #9f7aea 50%, #a78bfa 100%);
  border: none;
  color: white;
}
.icon-wrapper {
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--accent-primary), 0.16);
  color: var(--accent-primary);
  border-radius: 1.25rem;
  font-size: 1.65rem;
  border: 1px solid rgba(var(--accent-primary), 0.24);
}
.card-title {
  font-size: 0.98rem;
  font-weight: 600;
  color: #64748b;
}
.card-value {
  font-size: 2.4rem;
  font-weight: 800;
  color: #0f172a;
}
.featured-card .card-title,
.featured-card .card-value {
  color: white !important;
}
.trend-pill {
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.trend-up {
  background: rgba(16, 185, 129, 0.16);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.35);
}
.trend-down {
  background: rgba(239, 68, 68, 0.16);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.35);
}
</style>

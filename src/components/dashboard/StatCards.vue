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
    await userStore.fetchUsers({ page: 1, perPage: 100 });

    const totalUsers = userStore.total || 0;

    const activeUsers = userStore.users.filter(
      (u) => (u.status || "").toUpperCase() === "ACTIVATED",
    ).length;

    const inactiveUsers = userStore.users.filter(
      (u) => (u.status || "").toUpperCase() === "DEACTIVATED",
    ).length;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const newThisMonth = userStore.users.filter((u) => {
      if (!u.registeredAt) return false;
      const regDate = new Date(u.registeredAt);
      return regDate >= startOfMonth;
    }).length;

    const getTrend = () => Math.round((Math.random() * 12 - 5) * 10) / 10;

    statCards.value = [
      {
        title: "អ្នកប្រើប្រាស់សរុប",
        value: totalUsers,
        icon: "bi-people",
        trend: getTrend(),
        secondary: "សរុបអ្នកប្រើប្រាស់",
      },
      {
        title: "អ្នកប្រើប្រាស់សកម្ម",
        value: activeUsers,
        icon: "bi-person-check",
        trend: getTrend(),
        secondary: "អ្នកប្រើប្រាស់សកម្ម",
      },
      {
        title: "អ្នកប្រើប្រាស់អសកម្ម",
        value: inactiveUsers,
        icon: "bi-person-x",
        trend: getTrend(),
        secondary: "អ្នកប្រើប្រាស់អសកម្ម",
      },
      {
        title: "អ្នកប្រើថ្មីក្នុងខែនេះ",
        value: newThisMonth,
        icon: "bi-person-plus",
        trend: getTrend(),
        secondary: "អ្នកប្រើថ្មីខែនេះ",
      },
    ];
  } catch (err) {
    console.error("Failed to load user stats:", err);
    statCards.value = [
      {
        title: "អ្នកប្រើប្រាស់សរុប",
        value: 0,
        icon: "bi-people",
        secondary: "មានបញ្ហា",
      },
      { title: "អ្នកប្រើប្រាស់សកម្ម", value: 0, icon: "bi-person-check" },
      { title: "អ្នកប្រើប្រាស់អសកម្ម", value: 0, icon: "bi-person-x" },
      { title: "អ្នកប្រើថ្មីក្នុងខែនេះ", value: 0, icon: "bi-person-plus" },
    ];
  }
});

const accents = [
  { primary: "#7c3aed", light: "#c4b5fd", bg: "rgba(124,58,237,0.14)" },
  { primary: "#6366f1", light: "#a5b4fc", bg: "rgba(99,102,241,0.10)" },
  { primary: "#10b981", light: "#6ee7b7", bg: "rgba(16,185,129,0.10)" },
  { primary: "#f59e0b", light: "#fcd34d", bg: "rgba(245,158,11,0.10)" },
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
.modern-stat-card {
  font-family: "Hanuman", "Inter", system-ui, sans-serif;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(18px) saturate(190%);
  -webkit-backdrop-filter: blur(18px) saturate(190%);
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 1.75rem;
  padding: 1.75rem 1.6rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.modern-stat-card:hover {
  transform: translateY(-10px) scale(1.025);
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.14);
}

.modern-stat-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 30% 20%,
    rgba(255, 255, 255, 0.15),
    transparent 60%
  );
  opacity: 0.6;
  pointer-events: none;
}

.featured-card {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 45%, #5b21b6 100%);
  border: none;
  color: white;
  box-shadow: 0 14px 45px rgba(124, 58, 237, 0.38);
}

.featured-card:hover {
  transform: translateY(-12px) scale(1.03);
  box-shadow: 0 28px 60px rgba(124, 58, 237, 0.48);
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--accent-primary), 0.18);
  color: var(--accent-primary);
  border-radius: 1.3rem;
  font-size: 1.9rem;
  border: 1px solid rgba(var(--accent-primary), 0.3);
  box-shadow: 0 6px 16px rgba(var(--accent-primary), 0.22);
  transition: all 0.35s ease;
}

.modern-stat-card:hover .icon-wrapper {
  transform: scale(1.15);
  background: rgba(var(--accent-primary), 0.26);
  box-shadow: 0 10px 24px rgba(var(--accent-primary), 0.32);
}

.trend-pill {
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.45rem 0.95rem;
  border-radius: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.trend-up {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.45);
}

.trend-down {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.45);
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
}

.card-value {
  font-size: 2.6rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.05;
  margin-bottom: 0.3rem;
}

.secondary-label {
  font-size: 0.85rem;
  color: #94a3b8;
  font-weight: 500;
}

.featured-card .card-title,
.featured-card .card-value,
.featured-card .secondary-label {
  color: white !important;
}

/* Mobile adjustments */
@media (max-width: 576px) {
  .card-value {
    font-size: 2.2rem;
  }
  .icon-wrapper {
    width: 56px;
    height: 56px;
    font-size: 1.7rem;
  }
}
</style>

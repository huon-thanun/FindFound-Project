<template>
  <div class="row g-3 mb-5">
    <!-- Loading -->
    <div v-if="loading" class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">កំពុងផ្ទុក...</span>
      </div>
      <p class="mt-3 text-muted">កំពុងទាញទិន្នន័យស្ថិតិ</p>
    </div>

    <!-- Error / Unauthorized -->
    <div v-else-if="error" class="col-12">
      <div class="alert alert-danger text-center">
        {{ error }}
        <div v-if="isAuthError" class="mt-2 small">
          សូមពិនិត្យម្តងទៀតថាអ្នកបានចូលប្រព័ន្ធ ឬសាកល្បងឡើងវិញនៅពេលក្រោយ។
        </div>
      </div>
    </div>

    <!-- Cards -->
    <div v-else class="row g-3">
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
              <i :class="['bi', card.icon]"></i>
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ card.title }}</h5>
            <div class="card-value">
              {{ card.value.toLocaleString("km-KH") }}
            </div>
            <small class="secondary-label">{{ card.secondary }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useReportStore } from "@/stores/reportStore";

const userStore = useUserStore();
const reportStore = useReportStore();

const loading = ref(true);
const error = ref(null);
const isAuthError = ref(false);
const statCards = ref([]);

onMounted(async () => {
  loading.value = true;
  error.value = null;
  isAuthError.value = false;

  try {
    await Promise.all([
      userStore.fetchUsers({ page: 1, perPage: 100 }),
      reportStore.getAllReports({ page: 1, perPage: 1 }), // ✅ correct
    ]);

    const totalUsers = userStore.total || userStore.users?.length || 0;

    const activeUsers =
      userStore.users?.filter(
        (u) => (u.status || "").toUpperCase() === "ACTIVATED",
      ).length || 0;

    const inactiveUsers =
      userStore.users?.filter(
        (u) => (u.status || "").toUpperCase() === "DEACTIVATED",
      ).length || 0;

    const meta = reportStore.meta || {};
    const totalReports =
      meta.totalItems ||
      meta.total ||
      meta.count ||
      meta.pagination?.total ||
      meta.pagination?.totalItems ||
      reportStore.total ||
      0;

    statCards.value = [
      {
        title: "របាយការណ៍សរុប",
        value: totalReports,
        icon: "bi-file-earmark-bar-graph-fill",
        secondary: "របាយការណ៍ទាំងអស់",
      },
      {
        title: "អ្នកប្រើប្រាស់សរុប",
        value: totalUsers,
        icon: "bi-people-fill",
        secondary: "សរុបអ្នកប្រើប្រាស់",
      },
      {
        title: "អ្នកប្រើប្រាស់សកម្ម",
        value: activeUsers,
        icon: "bi-person-check-fill",
        secondary: "អ្នកប្រើប្រាស់សកម្ម",
      },
      {
        title: "អ្នកប្រើប្រាស់អសកម្ម",
        value: inactiveUsers,
        icon: "bi-person-x-fill",
        secondary: "អ្នកប្រើប្រាស់អសកម្ម",
      },
    ];
  } catch (err) {
    console.error("Dashboard error:", err);

    if (err.response?.status === 400 || err.response?.status === 401) {
      error.value = "មិនអាចចូលប្រព័ន្ធបាន – សូមចូលឡើងវិញ";
      isAuthError.value = true;
    } else {
      error.value = "មានបញ្ហាក្នុងការទាញទិន្នន័យ";
    }

    statCards.value = [
      {
        title: "របាយការណ៍សរុប",
        value: 0,
        icon: "bi-file-earmark-bar-graph-fill",
        secondary: "",
      },
      {
        title: "អ្នកប្រើប្រាស់សរុប",
        value: 0,
        icon: "bi-people-fill",
        secondary: "",
      },
      {
        title: "អ្នកប្រើប្រាស់សកម្ម",
        value: 0,
        icon: "bi-person-check-fill",
        secondary: "",
      },
      {
        title: "អ្នកប្រើប្រាស់អសកម្ម",
        value: 0,
        icon: "bi-person-x-fill",
        secondary: "",
      },
    ];
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* ────────────────────────────────────────────────
   Your original beautiful styles – unchanged
───────────────────────────────────────────────── */
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

.desc .card-text {
  color: rgba(128, 128, 128, 0.679);
}

.border-color {
  border-color: var(--tertiary-color);
}

.image {
  width: 100%;
  height: 200px;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-list {
  list-style-type: none;
  padding: 0;
}

.item-list li {
  display: flex;
  align-items: center;
  column-gap: 10px;
  font-size: 18px;
  color: rgba(128, 128, 128, 0.679);
}

.item-list li .icon {
  font-size: 18px;
}

.item-list li .detail {
  font-size: 16px;
}

.button-group {
  padding: 15px 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid rgb(78, 78, 78);
  border-bottom: 1px solid rgb(78, 78, 78);
  column-gap: 8px;
}

.text-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.center2 {
  display: flex !important;
  justify-content: center;
  align-items: center;
}

.status {
  background: rgba(211, 211, 211, 0.4);
  color: rgba(0, 0, 0, 0.4);
  padding: 6px 15px;
  border-radius: 50px;
  font-size: 14px;
}

.lost {
  background: rgb(255, 0, 0);
  color: rgb(255, 255, 255);
}

.found {
  background: rgb(0, 211, 0);
  color: rgb(255, 255, 255);
}

.active {
  background: rgba(0, 0, 255, 0.2);
  color: rgba(0, 0, 255, 0.8);
}

.resolved {
  background: rgba(92, 92, 92, 0.5);
  color: rgba(255, 255, 255, 0.8);
}

.tag-box-shadow-in {
  box-shadow:
    rgb(204, 219, 232) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
}

.category-tag {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #3b1e54;
}

.spinner-color {
  color: var(--primary-color);
}
</style>

<!-- src/components/dashboard/RecentActivities.vue -->
<template>
  <div class="content-card">
    <div
      class="content-card-header d-flex justify-content-between align-items-center flex-wrap gap-3"
    >
      <h5 class="m-0">
        <i class="bi bi-clock-history me-2"></i>
        សកម្មភាពថ្មីៗ
      </h5>

      <div class="custom-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="tab-btn"
          :class="{ active: activeTab === tab.value }"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="transaction-container mt-3">
      <!-- Empty / No data state -->
      <div v-if="!paginatedItems.length" class="text-center py-5 text-muted">
        <i class="bi bi-inbox fs-1 d-block mb-3 opacity-50"></i>
        <p class="mb-1 fw-medium">មិនមានទិន្នន័យសម្រាប់ប្រភេទនេះទេ</p>
        <small>សូមពិនិត្យម្តងទៀត ឬប្តូរប្រភេទ</small>
      </div>

      <!-- Activity list -->
      <div
        v-for="item in paginatedItems"
        :key="item.id"
        class="activity-item px-3 py-3 rounded-3 transition-all"
      >
        <div class="activity-left d-flex align-items-center flex-grow-1 gap-3">
          <div class="img-wrapper rounded overflow-hidden">
            <img
              :src="getImageUrl(item)"
              alt="រូបភាពរបាយការណ៍"
              class="w-100 h-100 object-cover"
              loading="lazy"
              @error="handleImageError"
            />
          </div>

          <div class="activity-info flex-grow-1">
            <h6 class="item-title mb-1 text-truncate">
              {{ item.title || "គ្មានចំណងជើង" }}
              <span
                v-if="isRecent(item.createdAt)"
                class="badge-new ms-2 align-middle"
              >
                ថ្មី
              </span>
            </h6>

            <p class="item-meta mb-0 d-flex align-items-center gap-2 flex-wrap">
              <span class="cat-tag px-2 py-1 rounded small">
                {{ item.category?.name || "ផ្សេងៗ" }}
              </span>
              <span class="dot">•</span>
              <span class="time-tag small">
                {{ formatDate(item.createdAt) }}
              </span>
            </p>
          </div>
        </div>

        <div
          class="transaction-status px-3 py-1 rounded-pill fw-semibold text-center"
          :class="getStatusClass(item)"
        >
          {{ getStatusText(item) }}
        </div>
      </div>
    </div>

    <!-- Pagination (only show if more than 1 page) -->
    <div
      v-if="totalPages > 1"
      class="pagination-controls d-flex justify-content-between align-items-center mt-4 pt-3 border-top"
    >
      <button
        class="btn btn-sm btn-outline-secondary px-3"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        <i class="bi bi-chevron-left me-1"></i> មុន
      </button>

      <span class="small text-muted">
        ទំព័រ {{ currentPage }} នៃ {{ totalPages }}
      </span>

      <button
        class="btn btn-sm btn-outline-secondary px-3"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        បន្ទាប់ <i class="bi bi-chevron-right ms-1"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
    required: true,
  },
  isRecent: {
    type: Function,
    required: true,
  },
});

const activeTab = defineModel({ default: "All" });
const currentPage = ref(1);
const itemsPerPage = 8; // adjust this number as you like (6–12 recommended)

const tabs = [
  { value: "All", label: "ទាំងអស់" },
  { value: "Lost", label: "បាត់" },
  { value: "Found", label: "រកឃើញ" },
];

// Filtered by tab first
const filteredItems = computed(() => {
  if (activeTab.value === "All") return props.items;

  const targetType = activeTab.value.toUpperCase();
  return props.items.filter((item) => item?.reportType?.name === targetType);
});

// Then apply pagination
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredItems.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredItems.value.length / itemsPerPage)),
);

// Reset page when tab changes
watch(activeTab, () => {
  currentPage.value = 1;
});

const getImageUrl = (item) => {
  if (!item?.reportImages?.length) return "/placeholder.png";
  const img = item.reportImages[0];
  return img.url || img.thumbnail || img.path || img.name || "/placeholder.png";
};

const handleImageError = (e) => {
  if (e.target.src !== "/placeholder.png") {
    e.target.src = "/placeholder.png";
  }
};

const formatDate = (date) => {
  return date ? dayjs(date).format("DD MMM YYYY, HH:mm") : "—";
};

const getStatusClass = (item) =>
  item?.reportType?.name === "FOUND" ? "found" : "lost";

const getStatusText = (item) =>
  item?.reportType?.name === "FOUND" ? "✓ ប្រទះឃើញ" : "⚠ បានបាត់";
</script>

<style scoped>
.content-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
}

.content-card-header {
  margin-bottom: 20px;
}

.custom-tabs {
  background: #f1f5f9;
  padding: 4px;
  border-radius: 10px;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.tab-btn {
  border: none;
  background: transparent;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 500;
  color: #64748b;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab-btn:hover:not(.active) {
  background: rgba(79, 70, 229, 0.08);
}

.tab-btn.active {
  background: white;
  color: #4f46e5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.transaction-container {
  /* flex: 1; */
  overflow-y: auto;
  padding-right: 6px;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.transaction-container::-webkit-scrollbar {
  width: 6px;
}

.transaction-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-radius: 12px;
  transition: all 0.18s ease;
  margin-bottom: 8px;
  background: #fafafa;
}

.activity-item:hover {
  background: #f0f4ff;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.activity-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
}

.img-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  background: #f1f5f9;
  flex-shrink: 0;
  border: 1px solid #e2e8f0;
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.item-meta {
  font-size: 0.85rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.cat-tag {
  background: #e2e8f0;
  color: #475569;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
}

.dot {
  color: #94a3b8;
  font-size: 0.9rem;
}

.time-tag {
  font-size: 0.85rem;
}

.badge-new {
  font-size: 0.75rem;
  background: #22c55e;
  color: white;
  padding: 3px 8px;
  border-radius: 6px;
  vertical-align: middle;
}

.transaction-status {
  font-size: 0.88rem;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 999px;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 110px;
  text-align: center;
}

.transaction-status.found {
  background: #dcfce7;
  color: #166534;
}

.transaction-status.lost {
  background: #fee2e2;
  color: #991b1b;
}

.pagination-controls {
  border-top: 1px solid #e2e8f0;
  padding-top: 16px;
}

.btn-outline-secondary {
  transition: all 0.2s;
}
</style>

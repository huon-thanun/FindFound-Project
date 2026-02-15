<template>
  <div class="content-card">
    <div
      class="content-card-header d-flex justify-content-between align-items-center flex-wrap gap-3"
    >
      <h5 class="m-0 fw-bold text-dark">
        <i class="bi bi-clock-history me-2 text-primary"></i>
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
      <div v-if="loading">
        <div v-for="n in 5" :key="n" class="skeleton-item mb-2 rounded-3"></div>
      </div>

      <div
        v-else-if="!paginatedItems.length"
        class="text-center py-5 text-muted"
      >
        <i class="bi bi-inbox fs-1 d-block mb-3 opacity-25"></i>
        <p class="mb-1 fw-medium">មិនមានទិន្នន័យសម្រាប់ប្រភេទនេះទេ</p>
        <small>សូមពិនិត្យម្តងទៀត ឬប្តូរប្រភេទ</small>
      </div>

      <div
        v-else
        v-for="item in paginatedItems"
        :key="item.id"
        class="activity-item p-2 rounded-3 mb-2 d-flex align-items-center justify-content-between transition-all"
      >
        <div
          class="d-flex align-items-center gap-3 flex-grow-1 overflow-hidden"
        >
          <div
            class="img-wrapper rounded-3 flex-shrink-0 bg-light d-flex align-items-center justify-content-center"
          >
            <img
              v-if="item.reportImages?.length > 0"
              :src="getImageUrl(item)"
              class="activity-img"
              alt="Report Image"
              loading="lazy"
              @error="handleImageError"
            />
            <i v-else class="bi bi-image text-muted fs-4"></i>
          </div>

          <div class="info-block text-truncate">
            <h6 class="item-title mb-1 text-truncate fw-bold">
              {{ item.title || "គ្មានចំណងជើង" }}
              <span v-if="isRecent(item.createdAt)" class="badge-new ms-1"
                >ថ្មី</span
              >
            </h6>
            <div class="item-meta d-flex align-items-center gap-2">
              <span class="cat-tag">{{ item.category?.name || "ផ្សេងៗ" }}</span>
              <span class="dot">•</span>
              <span class="time-tag">{{ formatDate(item.createdAt) }}</span>
            </div>
          </div>
        </div>

        <div class="status-badge ms-3" :class="getStatusClass(item)">
          {{ getStatusText(item) }}
        </div>
      </div>
    </div>

    <div
      v-if="totalPages > 1 && !loading"
      class="pagination-controls d-flex justify-content-between align-items-center mt-4 pt-3 border-top"
    >
      <button
        class="btn btn-sm btn-light border px-3"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        <i class="bi bi-chevron-left"></i> មុន
      </button>

      <span class="page-info">
        ទំព័រ <strong>{{ currentPage }}</strong> នៃ {{ totalPages }}
      </span>

      <button
        class="btn btn-sm btn-light border px-3"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        បន្ទាប់ <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  items: { type: Array, default: () => [], required: true },
  isRecent: { type: Function, required: true },
  loading: { type: Boolean, default: false },
});

const activeTab = defineModel({ default: "All" });
const currentPage = ref(1);
const itemsPerPage = 8;

const tabs = [
  { value: "All", label: "ទាំងអស់" },
  { value: "Lost", label: "បាត់" },
  { value: "Found", label: "រកឃើញ" },
];

// 1. Filter items based on active tab
const filteredItems = computed(() => {
  if (activeTab.value === "All") return props.items;
  const target = activeTab.value.toUpperCase();
  return props.items.filter((item) => item?.reportType?.name === target);
});

// 2. Paginate the filtered items
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredItems.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredItems.value.length / itemsPerPage)),
);

watch(activeTab, () => {
  currentPage.value = 1;
});

// 3. Image Handling Logic (Mapping to your JSON "name" field)
const getImageUrl = (item) => {
  if (!item?.reportImages?.length) return "/placeholder.png";
  // Your API stores the URL in the .name property
  const imgData = item.reportImages[0];
  return imgData.name || imgData.url || "/placeholder.png";
};

const handleImageError = (e) => {
  if (!e.target.src.includes("/placeholder.png")) {
    e.target.src = "/placeholder.png";
  }
};

const formatDate = (date) => (date ? dayjs(date).format("DD MMM YYYY") : "—");
const getStatusClass = (item) =>
  item?.reportType?.name === "FOUND" ? "status-found" : "status-lost";
const getStatusText = (item) =>
  item?.reportType?.name === "FOUND" ? "✓ រកឃើញ" : "⚠ បានបាត់";
</script>

<style scoped>
.content-card {
  background: #ffffff;
  border-radius: 1.25rem;
  border: 1px solid #eef2f6;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
}

/* Tabs Styling */
.custom-tabs {
  background: #f1f5f9;
  padding: 4px;
  border-radius: 12px;
  display: flex;
}

.tab-btn {
  border: none;
  background: transparent;
  padding: 6px 16px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  transition: all 0.2s;
}

.tab-btn.active {
  background: #ffffff;
  color: #4f46e5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* Activity Items */
.activity-item {
  border: 1px solid transparent;
  background: #ffffff;
}

.activity-item:hover {
  background: #f8faff;
  border-color: #e0e7ff;
  transform: translateX(4px);
}

.img-wrapper {
  width: 58px;
  height: 58px;
  overflow: hidden;
  border: 1px solid #f1f5f9;
}

.activity-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-title {
  font-size: 1rem;
  color: #1e293b;
}

.cat-tag {
  background: #f1f5f9;
  color: #475569;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-new {
  background: #10b981;
  color: white;
  font-size: 0.65rem;
  padding: 2px 6px;
  border-radius: 4px;
}

/* Status Pills */
.status-badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  min-width: 95px;
  text-align: center;
}

.status-found {
  background: #ecfdf5;
  color: #065f46;
}
.status-lost {
  background: #fff1f2;
  color: #9f1239;
}

/* Skeleton Shimmer */
.skeleton-item {
  height: 74px;
  background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.page-info {
  font-size: 0.85rem;
  color: #64748b;
}
</style>

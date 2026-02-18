<template>
  <teleport to="body">
    <transition name="modal-scale">
      <div v-if="modelValue" class="modal-backdrop" @click.self="close">
        <div class="modal-container">
          <div class="modal-card">
            <!-- Body with modern layout -->
            <div class="modal-body">
              <!-- Status Pills -->
              <div class="status-pills">
                <h5 class="modal-title">{{ data.title }}</h5>
                <div>
                  <div
                    class="pill"
                    :class="`pill-${data.reportType.name.toLowerCase()}`"
                  >
                    <i
                      class="bi"
                      :class="
                        data.reportType.name === 'LOST'
                          ? 'bi-exclamation-triangle'
                          : 'bi-check-circle'
                      "
                    ></i>
                    <span>{{ reportType }}</span>
                  </div>
                  <div
                    class="pill ms-2"
                    :class="`pill-${data.status.toLowerCase()}`"
                  >
                    <i
                      class="bi"
                      :class="{
                        'bi-lightning': data.status === 'ACTIVE',
                        'bi-check2-all': data.status === 'RESOLVED',
                        'bi-eye-slash': data.status === 'HIDDEN',
                      }"
                    ></i>
                    <span>{{ status }}</span>
                  </div>
                </div>
              </div>

              <div class="content-grid">
                <!-- Left Column - Main Content -->
                <div class="main-content">
                  <!-- Description Card -->
                  <div class="content-card description-card">
                    <div class="card-header">
                      <i class="bi bi-chat-dots"></i>
                      <h6>ការពិពណ៌នា</h6>
                    </div>
                    <p class="description-text">{{ data.description }}</p>
                  </div>

                  <!-- Details Grid -->
                  <div class="details-grid">
                    <div
                      v-for="(item, index) in detail"
                      :key="index"
                      class="detail-card"
                    >
                      <div
                        class="detail-icon-wrapper"
                        :class="`icon-bg-${index % 4}`"
                      >
                        <i :class="item.icon"></i>
                      </div>
                      <!-- In your details list, replace the detail-value section with: -->
                      <div class="detail-info">
                        <span class="detail-label">{{ item.title }}</span>

                        <!-- Telegram Link Condition -->
                        <div v-if="item.title === 'តំណភ្ជាប់ Telegram'">
                          <span class="detail-value">
                            <a
                              v-if="item.value && item.value !== '-'"
                              :href="item.value"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="telegram-link"
                            >
                              {{ item.value }}
                            </a>
                            <span v-else class="no-link">
                              <i class="bi bi-telegram"></i>
                              គ្មានតំណភ្ជាប់
                            </span>
                          </span>
                        </div>

                        <!-- All other items -->
                        <div v-else>
                          <span class="detail-value">{{ item.value }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Right Column - Image Gallery -->
                <div class="gallery-section">
                  <div class="gallery-container">
                    <div class="gallery-main">
                      <img
                        v-if="hasImages"
                        :src="currentImage"
                        :alt="'Report image ' + (currentImageIndex + 1)"
                        class="gallery-image"
                      />
                      <div v-else class="no-image">
                        <i class="bi bi-image"></i>
                        <span>គ្មានរូបភាព</span>
                      </div>

                      <!-- Navigation Overlay -->
                      <template v-if="imageCount > 1">
                        <button
                          class="gallery-nav nav-prev"
                          @click="prevImage"
                          :disabled="!canPrev"
                        >
                          <i class="bi bi-chevron-left"></i>
                        </button>
                        <button
                          class="gallery-nav nav-next"
                          @click="nextImage"
                          :disabled="!canNext"
                        >
                          <i class="bi bi-chevron-right"></i>
                        </button>
                        <div class="gallery-counter">
                          <i class="bi bi-images"></i>
                          {{ currentImageIndex + 1 }}/{{ imageCount }}
                        </div>
                      </template>
                    </div>

                    <!-- Thumbnails -->
                    <div v-if="imageCount > 1" class="thumbnail-strip">
                      <button
                        v-for="(img, idx) in data.reportImages"
                        :key="idx"
                        class="thumbnail-btn"
                        :class="{ active: currentImageIndex === idx }"
                        @click="currentImageIndex = idx"
                      >
                        <img :src="img.name" :alt="'Thumbnail ' + (idx + 1)" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modern Footer with Reporter Info -->
            <div class="modal-footer">
              <div class="reporter-profile">
                <div class="reporter-avatar-wrapper">
                  <img
                    class="reporter-avatar"
                    :src="data.reporter.avatar"
                    :alt="data.reporter.fullname"
                  />
                  <div class="avatar-status"></div>
                </div>
                <div class="reporter-details">
                  <div class="reporter-name">{{ data.reporter.fullname }}</div>
                  <div class="report-meta">
                    <span class="meta-item">
                      <i class="bi bi-calendar3"></i>
                      {{ formatDate(data.createdAt) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="footer-actions">
                <button class="btn-action" @click="close">
                  <i class="bi bi-x"></i>
                  បិទ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { watch, onUnmounted, ref, computed } from "vue";
import { formatDate } from "@/utils/formatDate";
import { useReportStore } from "@/stores/reportStore";

const reportStore = useReportStore();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const REPORT_TYPE_KH = {
  LOST: "បានបាត់",
  FOUND: "បានប្រទះឃើញ",
};

const STATUS_KH = {
  ACTIVE: "សកម្ម",
  RESOLVED: "បានដោះស្រាយ",
  HIDDEN: "លាក់",
};

const reportType = computed(
  () =>
    REPORT_TYPE_KH[props.data?.reportType?.name] || props.data?.reportType?.name
);

const status = computed(
  () => STATUS_KH[props.data?.status] || props.data?.status
);

const detail = ref([]);

watch(
  () => props.data,
  (data) => {
    if (!data) return;
    detail.value = [
      {
        icon: "bi bi-tag",
        title: "ប្រភេទ",
        value: data.category?.name || "-",
      },
      {
        icon: "bi bi-person",
        title: "អ្នករាយការណ៍",
        value: data.reporter?.fullname || "-",
      },
      {
        icon: "bi bi-geo-alt-fill",
        title: "ទីតាំង",
        value: data.locationText || "-",
      },
      {
        icon: "bi bi-envelope",
        title: "អុីមែល",
        value: data.reporter?.email || "-",
      },
      {
        icon: "bi bi-calendar",
        title: "កាលបរិច្ឆេទព្រឹត្តិការណ៍",
        value: formatDate(data.eventDate),
      },
      {
        icon: "bi bi-telephone-fill",
        title: "លេខទូរស័ព្ទ",
        value: reportStore.report.contactInformation?.phoneNumber || "-",
      },
      {
        icon: "bi bi-telegram",
        title: "តំណភ្ជាប់ Telegram",
        value: reportStore.report.contactInformation?.telegramLink || "-",
      },
    ];
  },
  { immediate: true }
);

const close = () => emit("update:modelValue", false);

// Lock body scroll when modal is open
watch(
  () => props.modelValue,
  (open) => {
    document.body.style.overflow = open ? "hidden" : "";
  },
  { immediate: true }
);

onUnmounted(() => {
  document.body.style.overflow = "";
});

// Image carousel
const currentImageIndex = ref(0);

watch(
  () => props.data,
  () => {
    currentImageIndex.value = 0;
  }
);

const hasImages = computed(() => props.data?.reportImages?.length > 0);
const imageCount = computed(() => props.data?.reportImages?.length || 0);
const currentImage = computed(() =>
  hasImages.value ? props.data.reportImages[currentImageIndex.value].name : null
);
const canPrev = computed(
  () => imageCount.value > 1 && currentImageIndex.value > 0
);
const canNext = computed(
  () => imageCount.value > 1 && currentImageIndex.value < imageCount.value - 1
);

const prevImage = () => {
  if (canPrev.value) currentImageIndex.value--;
};

const nextImage = () => {
  if (canNext.value) currentImageIndex.value++;
};
</script>

<style scoped>
/* Modern Modal Styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(17, 25, 40, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 1rem;
  overflow-y: auto;
}

.modal-container {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}

.modal-card {
  background: linear-gradient(145deg, #ffffff, #f8faff);
  border-radius: 32px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  position: relative;
}

/* Modern Header */
.modal-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 2rem 0 2rem;
  position: relative;
  color: white;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  line-height: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-close {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(4px);
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.header-wave {
  position: relative;
  width: 100%;
  height: 60px;
  margin-top: 1rem;
}

.header-wave svg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  fill: #ffffff;
}

/* Status Pills */
.status-pills {
  display: flex;
  align-content: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.pill i {
  font-size: 1rem;
}

.pill-lost {
  background: linear-gradient(135deg, #fee, #ffe5e5);
  color: #e53e3e;
  border: 1px solid #feb5b5;
}

.pill-found {
  background: linear-gradient(135deg, #e6f7e6, #d4f0d4);
  color: #2f855a;
  border: 1px solid #9ae6b4;
}

.pill-active {
  background: linear-gradient(135deg, #e6f0ff, #d4e4ff);
  color: #3182ce;
  border: 1px solid #90cdf4;
}

.pill-resolved {
  background: linear-gradient(135deg, #e8e8e8, #d4d4d4);
  color: #4a5568;
  border: 1px solid #cbd5e0;
}

.pill-hidden {
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  color: #6b7280;
  border: 1px solid #d1d5db;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.modal-body {
  padding: 2rem;
  background: white;
}

/* Content Cards */
.content-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(102, 126, 234, 0.1);
  margin-bottom: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.card-header i {
  color: #667eea;
  font-size: 1.2rem;
}

.card-header h6 {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.description-text {
  color: #4a5568;
  line-height: 1.7;
  margin: 0;
  font-size: 0.95rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

/* Details Grid */
.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.detail-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafd;
  border-radius: 16px;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.detail-card:hover {
  background: white;
  border-color: #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.detail-icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
  flex-shrink: 0;
}

.icon-bg-0 {
  background: linear-gradient(135deg, #667eea, #764ba2);
}
.icon-bg-1 {
  background: linear-gradient(135deg, #f6ad55, #ed8936);
}
.icon-bg-2 {
  background: linear-gradient(135deg, #48bb78, #38a169);
}
.icon-bg-3 {
  background: linear-gradient(135deg, #fc8181, #f56565);
}

.detail-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.detail-label {
  font-size: 0.7rem;
  color: #718096;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.telegram-link {
  color: #2d3748;
}
/* Gallery Section */
.gallery-section {
  background: #f8fafd;
  border-radius: 24px;
  padding: 1rem;
}

.gallery-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gallery-main {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  background: #edf2f7;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.gallery-image:hover {
  transform: scale(1.05);
}

.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #a0aec0;
  gap: 0.5rem;
}

.no-image i {
  font-size: 3rem;
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: #2d3748;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.gallery-nav:hover:not(:disabled) {
  background: white;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.gallery-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-prev {
  left: 1rem;
}

.nav-next {
  right: 1rem;
}

.gallery-counter {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  color: white;
  padding: 0.35rem 1rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  z-index: 10;
}

/* Thumbnails */
.thumbnail-strip {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.thumbnail-btn {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  padding: 0;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.thumbnail-btn.active {
  border-color: #667eea;
  transform: scale(1.05);
}

.thumbnail-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Modern Footer */
.modal-footer {
  background: #f8fafd;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e2e8f0;
}

.reporter-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.reporter-avatar-wrapper {
  position: relative;
}

.reporter-avatar {
  width: 56px;
  height: 56px;
  border-radius: 56px;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.avatar-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #48bb78;
  border: 2px solid white;
  border-radius: 12px;
}

.reporter-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.reporter-name {
  font-weight: 700;
  color: #2d3748;
  font-size: 1.1rem;
}

.report-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
  font-size: 0.85rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.meta-divider {
  color: #cbd5e0;
}

.footer-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-action {
  padding: 0.6rem 1.2rem;
  border-radius: 40px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-action:hover {
  background: #f7fafc;
  border-color: #cbd5e0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

/* Modal Transitions */
.modal-scale-enter-active,
.modal-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-scale-enter-from,
.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* =====================
   RESPONSIVE
   ===================== */

/* Tablet landscape — shrink max-width */
@media (max-width: 1100px) {
  .modal-container {
    max-width: 95vw;
  }
}

/* Tablet portrait — stack the two-column grid */
@media (max-width: 992px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
.modal-backdrop {
    padding: 0.5rem;
    align-items: flex-start;
  }
  /* Show image gallery first on mobile */
}

/* Mobile — tighten spacing and simplify layout */
@media (max-width: 768px) {
  .modal-backdrop {
    padding: 0.5rem;
    align-items: flex-start;
  }

  .modal-card {
    border-radius: 20px;
  }

  .modal-body {
    padding: 1.25rem;
  }

  .modal-title {
    font-size: 1.15rem;
    line-height: 1.4;
  }

  /* Stack title and pills vertically */
  .status-pills {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .status-pills > div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .content-grid {
    gap: 1rem;
  }

  .gallery-main {
    height: 220px;
  }

  /* Single column details on mobile */
  .details-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .content-card {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .modal-footer {
    padding: 1rem 1.25rem;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .footer-actions {
    width: 100%;
  }

  .btn-action {
    width: 100%;
    justify-content: center;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .modal-body {
    padding: 1rem;
  }

  .modal-footer {
    padding: 1rem;
  }

  .reporter-avatar {
    width: 44px;
    height: 44px;
  }

  .reporter-name {
    font-size: 0.95rem;
  }

  .report-meta {
    font-size: 0.78rem;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .gallery-main {
    height: 180px;
  }

  .detail-icon-wrapper {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    font-size: 1rem;
  }

  .pill {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}

/* Scrollbar */
.modal-body::-webkit-scrollbar {
  width: 6px;
}

.modal-body::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 10px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

.simple-telegram-link {
  color: #26a5e4;
  text-decoration: none;
  word-break: break-all;
}

.simple-telegram-link:hover {
  text-decoration: underline;
  color: #1e8fc9;
}

.text-muted {
  color: #a0aec0;
  font-style: italic;
}
</style>
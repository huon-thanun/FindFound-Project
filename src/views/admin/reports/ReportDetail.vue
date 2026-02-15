<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="modelValue" class="modal-overlay" @click.self="close">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <!-- Header -->
            <div class="modal-header">
              <h5 class="modal-title">{{ data.title }}</h5>
              <button type="button" class="btn-close" @click="close" aria-label="Close"></button>
            </div>

            <!-- Body -->
            <div class="modal-body">
              <div class="row g-4">
                <!-- Left Column - Details -->
                <div class="col-12 col-xl-6">
                  <!-- Status Badges -->
                  <div class="d-flex gap-2 mb-3">
                    <span class="badge status-badge" :class="`status-${data.reportType.name.toLowerCase()}`">
                      {{ reportType }}
                    </span>
                    <span class="badge status-badge" :class="`status-${data.status.toLowerCase()}`">
                      {{ status }}
                    </span>
                  </div>

                  <!-- Description -->
                  <div class="mb-3">
                    <h6 class="fw-bold">ការពិពណ៌នា</h6>
                    <p class="text-muted description">{{ data.description }}</p>
                  </div>

                  <!-- Details List -->
                  <div class="details-list">
                    <div 
                      v-for="(item, index) in detail" 
                      :key="index" 
                      class="detail-item"
                    >
                      <div class="detail-icon">
                        <i :class="item.icon"></i>
                      </div>
                      <div class="detail-content">
                        <div class="detail-title">{{ item.title }}</div>
                        <div class="detail-value">{{ item.value }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Right Column - Images -->
                <div class="col-12 col-xl-6">
                  <div class="image-container">
                    <img 
                      v-if="hasImages" 
                      :src="currentImage" 
                      alt="Report image" 
                      class="report-image"
                    />
                    <img 
                      v-else
                      src="https://tse2.mm.bing.net/th/id/OIP.b8bpZyFwupiioDofQPXo_gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
                      alt="Default image" 
                      class="report-image"
                    />
                    
                    <!-- Image Navigation -->
                    <button 
                      v-if="imageCount > 1"
                      class="btn btn-nav btn-prev" 
                      @click="prevImage" 
                      :disabled="!canPrev"
                    >
                      <i class="bi bi-chevron-left"></i>
                    </button>
                    <button 
                      v-if="imageCount > 1"
                      class="btn btn-nav btn-next" 
                      @click="nextImage" 
                      :disabled="!canNext"
                    >
                      <i class="bi bi-chevron-right"></i>
                    </button>

                    <!-- Image Counter -->
                    <div v-if="imageCount > 1" class="image-counter">
                      {{ currentImageIndex + 1 }} / {{ imageCount }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer">
              <div class="d-flex align-items-center gap-2">
                <img class="reporter-avatar" :src="data.reporter.avatar" alt="Reporter avatar" />
                <div class="reporter-info">
                  <div class="reporter-name">{{ data.reporter.fullname }}</div>
                  <div class="reporter-meta">
                    <span>លេខសម្គាល់របាយការណ៍: <strong>#{{ data.id }}</strong></span>
                    <span class="mx-1">•</span>
                    <span>ថ្ងៃបង្កើត <strong>{{ formatDate(data.createdAt) }}</strong></span>
                  </div>
                </div>
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

const reportType = computed(() =>
  REPORT_TYPE_KH[props.data?.reportType?.name] || props.data?.reportType?.name
);

const status = computed(() =>
  STATUS_KH[props.data?.status] || props.data?.status
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
const canPrev = computed(() => imageCount.value > 1 && currentImageIndex.value > 0);
const canNext = computed(() => imageCount.value > 1 && currentImageIndex.value < imageCount.value - 1);

const prevImage = () => {
  if (canPrev.value) currentImageIndex.value--;
};

const nextImage = () => {
  if (canNext.value) currentImageIndex.value++;
};
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 1rem;
  overflow-y: auto;
}

/* Modal Dialog */
.modal-dialog {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}

.modal-content {
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* Modal Header */
.modal-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
}

.btn-close {
  padding: 0.5rem;
  background: transparent;
  border: none;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s;
  font-size: 1.5rem;
}

.btn-close:hover {
  opacity: 1;
}

.btn-close::before {
  content: "×";
  font-size: 1.5rem;
  line-height: 1;
}

/* Modal Body */
.modal-body {
  padding: 1.5rem;
  max-height: calc(100vh - 250px);
  overflow-y: auto;
}

/* Status Badges */
.status-badge {
  padding: 0.375rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 50px;
}

.status-lost {
  background-color: #dc3545;
  color: #fff;
}

.status-found {
  background-color: #198754;
  color: #fff;
}

.status-active {
  background-color: rgba(13, 110, 253, 0.1);
  color: #0d6efd;
}

.status-resolved {
  background-color: #6c757d;
  color: #fff;
}

.status-hidden {
  background-color: #adb5bd;
  color: #fff;
}

/* Description */
h6 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.description {
  margin-top: 0.5rem;
  line-height: 1.6;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

/* Details List */
.details-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.detail-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.detail-icon {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 1.25rem;
}

.detail-content {
  flex: 1;
  min-width: 0;
}

.detail-title {
  font-size: 0.75rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 0.875rem;
  color: #212529;
  font-weight: 500;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Image Container */
.image-container {
  position: relative;
  width: 100%;
  height: 400px;
  background-color: #f8f9fa;
  border-radius: 0.375rem;
  overflow: hidden;
}

.report-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

/* Image Navigation Buttons */
.btn-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
  color: #212529;
}

.btn-nav:hover:not(:disabled) {
  background-color: #fff;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.btn-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.btn-prev {
  left: 0.75rem;
}

.btn-next {
  right: 0.75rem;
}

/* Image Counter */
.image-counter {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Modal Footer */
.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #dee2e6;
  background-color: #f8f9fa;
}

.reporter-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
}

.reporter-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.reporter-name {
  font-weight: 500;
  color: #212529;
  font-size: 0.9375rem;
}

.reporter-meta {
  font-size: 0.8125rem;
  color: #6c757d;
}

/* Modal Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: transform 0.2s ease;
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  transform: scale(0.95);
}

/* Responsive */
@media (max-width: 1199.98px) {
  .details-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767.98px) {
  .modal-dialog {
    margin: 0.5rem;
  }

  .modal-header {
    padding: 0.75rem 1rem;
  }

  .modal-title {
    font-size: 1.125rem;
  }

  .modal-body {
    padding: 1rem;
    max-height: calc(100vh - 200px);
  }

  .details-list {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .image-container {
    height: 250px;
  }

  .modal-footer {
    padding: 0.75rem 1rem;
  }

  .btn-nav {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }

  .btn-prev {
    left: 0.5rem;
  }

  .btn-next {
    right: 0.5rem;
  }
}

/* Scrollbar styling for modal body */
.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
<template>
  <div class="container py-5 min-vh-100">
    <header class="mb-5">
      <h2 class="fw-bold">ការរាយការណ៍របស់ខ្ញុំ</h2>
      <p class="text-muted">
        សូមស្វាគមន៍, ទាំងនេះជាការរាយការណ៍ទាំងអស់របស់អ្នក។
      </p>
    </header>
    <div class="card mb-3 shadow border-color">
      <div class="card-body row">
        <div class="col-xxl-12">
          <BaseInput class="w-100" v-model="search" type="text" placeholder="ស្វែងរក ការរាយការណ៍..." />
        </div>
        <!-- CATEGORY -->
        <div class="col-xxl-8 mt-2">
          <!-- <select class="form-select" v-model="cateValue">
            <option value="">All Category</option>
            <option
              v-for="category in categoryStore.categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select> -->
          <div class="row">
            <div class="col-xxl-5">
              <BaseSelect v-model="cateValue" :items="categoryStore.categories" textField="ប្រភេទនៃការរាយការណ៍ទំាងអស់"
                labelField="name" valueField="id" />
            </div>
          </div>
        </div>
        <div class="col-xxl-4 mt-1 text-end" style="flex: 1">
          <BaseButton variant="outline_primary" icon="stars" @click="clearFilter">
            សម្អាតការតម្រៀប
          </BaseButton>
        </div>
      </div>
    </div>
    <div class="mt-3 mb-1 align-items-center d-flex justify-content-between flex-wrap">
      <div class="btn-group bg-btn-group my-1">
        <button class="btn-filter" :class="{ Active: activeFilter === '' }" @click="btnFilterAllReport">
          ទាំងអស់
        </button>

        <button class="btn-filter" :class="{ Active: activeFilter === 'LOST' }" @click="btnFilterReportType('LOST')">
          បាត់
        </button>

        <button class="btn-filter" :class="{ Active: activeFilter === 'FOUND' }" @click="btnFilterReportType('FOUND')">
          រកឃើញ
        </button>
      </div>
      <div class="d-flex gap-2 align-items-center my-1">
        <div class="mt-2" style="width: 150px">
          <BaseSelect class="w-100" v-model="sortDir" :items="sortDirData" labelField="name" valueField="id" />
        </div>
      </div>
    </div>
    <div class="card border-0 box-shadow p-4 mb-3">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="fw-bold mb-0">ការរាយការណ៍</h5>
        <!-- <button
          class="btn btn-dark px-4 py-2 rounded-3 fw-bold shadow-sm"
          @click="btnHandleCreateReport"
        >
          បង្កើតការរាយការណ៍
        </button> -->
        <BaseButton variant="primary" icon="file-earmark-plus" @click="btnHandleCreateReport">បង្កើតការរាយការណ៍
        </BaseButton>
      </div>
      <div class="report-list-wrapper">

    <!-- ── Loading Skeletons ── -->
    <div v-if="reportStore.isLoadingGetOwnReports" class="skeleton-list">
      <div v-for="n in 3" :key="`skeleton-${n}`" class="skeleton-card">
        <div class="sk-bar"></div>
        <div class="sk-thumb pulse"></div>
        <div class="sk-body">
          <div class="sk-line sk-title pulse"></div>
          <div class="sk-line sk-meta pulse"></div>
          <div class="sk-badge-row">
            <div class="sk-badge pulse"></div>
            <div class="sk-badge sk-badge--sm pulse"></div>
          </div>
        </div>
        <div class="sk-actions">
          <div class="sk-btn pulse"></div>
          <div class="sk-btn pulse"></div>
          <div class="sk-btn pulse"></div>
        </div>
      </div>
    </div>

    <!-- ── Empty State ── -->
    <div v-else-if="reportStore.ownReports.length <= 0" class="empty-state my-3 col-12 center2">
      <div class="empty-inner">
        <div class="empty-rings">
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
          <div class="ring ring-3"></div>
          <i class="bi bi-exclamation-circle empty-icon"></i>
        </div>
        <h3 class="empty-title">រកមិនឃើញរបាយការណ៍</h3>
      </div>
    </div>

    <!-- ── Report Cards ── -->
    <transition-group name="card-list" tag="div" v-else>
      <div
        class="report-card"
        v-for="report in reportStore.ownReports"
        :key="report.id"
      >
        <!-- Status stripe -->
        <div class="status-stripe" :class="report.status?.toLowerCase()"></div>

        <!-- Image -->
        <div class="card-thumb">
          <img
            :src="report.reportImages && report.reportImages.length > 0
              ? report.reportImages[0].name
              : defaultImage"
            alt="thumbnail"
          />
          <div class="thumb-overlay"></div>
        </div>

        <!-- Info -->
        <div class="card-body">
          <h6 class="card-title">{{ report.title }}</h6>
          <div class="card-meta">
            <span class="meta-chip">
              <i class="bi bi-geo-alt-fill"></i>
              {{ report.locationText }}
            </span>
            <span class="meta-chip">
              <i class="bi bi-calendar-event"></i>
              {{ formatDate(report.eventDate) }}
            </span>
          </div>
          <div class="badge-row">
            <span class="type-badge" :class="report.reportType?.name.toLowerCase()">
              {{ report.reportType?.name }}
            </span>
            <span class="status-badge" :class="report.status?.toLowerCase()">
              {{ report.status }}
            </span>
          </div>
        </div>

        <!-- Desktop Actions -->
        <div class="btn-action-group d-flex justify-content-end">
          <div class="btn-group action-btn ">
            <button class="btn btn-action btn-outline-secondary" @click="gotoDetailPage(report.id)">
              <span class="icon text-warning"><i class="bi bi-eye"></i></span>
              <span class="btn-title">មើល</span>
            </button>
            <button class="btn btn-action btn-outline-secondary" @click="btnHandleEditReport(report.id)">
              <span class="icon text-primary"><i class="bi bi-pencil-square"></i></span>
              <span class="btn-title">កែសម្រួល</span>
            </button>
            <button class="btn btn-action btn-outline-secondary" @click="btnHandleDeleteOwnReport(report.id)">
              <span class="icon text-danger"><i class="bi bi-trash"></i></span>
              <span class="btn-title">លុប</span>
            </button>
          </div>

          <!-- Mobile More -->
          <div class="more me-5">
            <div class="more-action" v-if="actionBtn !== report.id" @click="actionBtn = report.id">
              <i class="bi bi-three-dots"></i>
            </div>
            <div class="btn-group " v-if="actionBtn === report.id">
              <button class="btn btn-action btn-outline-secondary" @click="gotoDetailPage(report.id)">
                <span class="icon text-warning"><i class="bi bi-eye"></i></span>
                <span class="btn-title d-none">មើល</span>
              </button>
              <button class="btn btn-action btn-outline-secondary" @click="btnHandleEditReport(report.id)">
                <span class="icon text-primary"><i class="bi bi-pencil-square"></i></span>
                <span class="btn-title d-none">កែសម្រួល</span>
              </button>
              <button class="btn btn-action btn-outline-secondary" @click="btnHandleDeleteOwnReport(report.id)">
                <span class="icon text-danger"><i class="bi bi-trash"></i></span>
                <span class="btn-title d-none">លុប</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </transition-group>

  </div>
    </div>
  </div>

  <!-- pagination -->

  <div v-if="
    reportStore.ownReportMeta?.totalPages > 1 &&
    !reportStore.isLoadingGetOwnReports
  " class="d-flex gap-2 justify-content-center mb-3">
    <BaseButton variant="danger" @click="PreviousPage" :disabled="!reportStore.ownReportMeta?.hasPreviousPage">
      ថយក្រោយ
    </BaseButton>

    <!-- <BaseButton
        v-for="p in visiblePages"
        :key="p"
        :variant="p === page ? 'primary' : 'cancel'"
        @click="goToPage(p)"
      >
        {{ p }}
      </BaseButton> -->

    <BaseButton variant="primary" @click="nextPage" :disabled="!reportStore.ownReportMeta?.hasNextPage">
      បន្ទាប់
    </BaseButton>
  </div>

  <!--Confirm Message Modal -->
  <BaseModal :icon="'trash'" :theme="'primary'" :isClose="showModal">
    <template #body>
      <p>តើអ្នកពិតជាចង់លុបការរាយការណ៍នេះឬ?</p>
    </template>
    <template #btnClose>
      <BaseButton variant="cancel" icon="x-circle" class="col-6" @click="showModal = false">
        បោះបង់
      </BaseButton>
    </template>
    <template #btnActive>
      <BaseButton icon="trash" class="col-6" variant="danger" :isLoading="reportStore.isLoadingDeleteOwnReport"
        @click="btnHandleConfirmDelete">
        លុប
      </BaseButton>
    </template>
  </BaseModal>
  <!-- Message Model  -->
  <BaseModal :icon="msgIcon" :theme="'primary'" :isClose="showMessageModal">
    <template #body>
      <p>{{ reportStore.deleteMessage.message }}</p>
    </template>

    <template #btnActive>
      <BaseButton icon="box" class="col-6" variant="primary" @click="showMessageModal = false">
        យល់ព្រម
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { useReportStore } from "@/stores/reportStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { onMounted, ref, reactive, computed, watch } from "vue";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "vue-router";

import BaseReportCard from "@/components/base/BaseReportCard.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseSkeleton from "@/components/base/BaseSkeleton.vue";

const reportStore = useReportStore();
const categoryStore = useCategoryStore();
const router = useRouter();

const defaultImage =
  "https://tse2.mm.bing.net/th/id/OIP.b8bpZyFwupiioDofQPXo_gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3";

const search = ref("");
const cateValue = ref("");
const typeValue = ref("");
const activeFilter = ref("");
const sortDirData = reactive([
  { id: "DESC", name: "ថ្មីបំផុត" },
  { id: "ASC", name: "ចាស់បំផុត" },
]);
const sortDir = ref(sortDirData[0]);
// const statusValue = ref("");

const page = ref(1);
let timeout = ref(null);
const actionBtn = ref(false);

const fetchOwnReports = async () => {
  const params = {
    _page: page.value,
    _per_page: 10,
    sortBy: "id",
    sortDir: sortDir.value?.id,
    categoryId: cateValue.value || "",
    reportType: typeValue.value || "",
    search: search.value || "",
  };

  // if (search.value) params.search = search.value;
  // if (statusValue.value) params.status = statusValue.value;
  // if (typeValue.value) params.reportType = typeValue.value;
  // if (cateValue.value) params.categoryId = cateValue.value;

  await reportStore.getOwnReports(params);

  console.log("PAGE:", page.value);
  console.log("META:", reportStore.ownReportMeta);
};
watch(
  () => [search.value, cateValue.value, typeValue.value, sortDir.value],
  () => {
    page.value = 1;
    fetchOwnReports();
  },
);

onMounted(async () => {
  try {
    await Promise.all([
      fetchOwnReports(),
      countReports(),
      categoryStore.fetchCategories(),
    ]);
    console.log(reportStore.ownReports);
    console.log(reportStore.ownReportMeta.totalItems);
    // just for stats on current page
    activeCount.value = reportStore.ownReports.filter(
      (r) => r.status === "ACTIVE",
    ).length;
    resolvedCount.value = reportStore.ownReports.filter(
      (r) => r.status === "RESOLVED",
    ).length;
  } catch (error) {
    console.error(error);
  }
});

const btnFilterAllReport = async () => {
  cateValue.value = null;
  typeValue.value = "";
  activeFilter.value = "";
  await fetchOwnReports();
};

const btnFilterReportType = async (reportTypeValue) => {
  activeFilter.value = reportTypeValue;
  typeValue.value = reportTypeValue;
  await fetchOwnReports();
};

const clearFilter = async () => {
  search.value = "";
  typeValue.value = "";
  cateValue.value = null;
  activeFilter.value = "";
  page.value = 1;

  await fetchOwnReports();
};

const gotoDetailPage = async (id) => {
  router.push({ name: "report-detail-user", params: { id: id } });
};
const showModal = ref(false);
const showMessageModal = ref(false);
const msgIcon = ref("");
const itemId = ref(null);
const btnHandleDeleteOwnReport = async (id) => {
  itemId.value = id;
  showModal.value = true;
};
const btnHandleConfirmDelete = async () => {
  try {
    await reportStore.deleteOwnReport(itemId.value);
    console.log(reportStore.deleteMessage);
    msgIcon.value = "check-lg";
  } catch (error) {
    console.error(error);
    msgIcon.value = "x-lg";
  } finally {
    showModal.value = false;
    showMessageModal.value = true;
    fetchOwnReports();
  }
};
const activeCount = ref(0);
const resolvedCount = ref(0);

const countReports = () => {
  if (!reportStore.ownReportMeta) return;

  const total = reportStore.ownReportMeta.totalItems || 0;
  activeCount.value = 0;
  resolvedCount.value = 0;

  for (let i = 0; i < total; i++) {
    const report = reportStore.ownReports[i];
    if (report?.status === "ACTIVE") activeCount.value++;
    if (report?.status === "RESOLVED") resolvedCount.value++;
  }
};

// reactive stats
const stats = computed(() => [
  {
    label: "Total Reports",
    value: activeCount.value + resolvedCount.value,
    icon: "bi-file-earmark-text",
    iconColor: "text-primary",
    trend: true,
  },
  {
    label: "Active Reports",
    value: activeCount.value,
    icon: "bi-clock",
    iconColor: "text-warning",
  },
  {
    label: "Resolved",
    value: resolvedCount.value,
    icon: "bi-check2-circle",
    iconColor: "text-success",
  },
  // {
  //   label: "Potential Matches",
  //   value: 0,
  //   icon: "bi-file-earmark-medical",
  //   iconColor: "text-purple",
  // },
]);

// watch(
//   () => reportStore.ownReports,
//   () => {
//     countReports();
//   },
//   { immediate: true },
// );

const btnHandleCreateReport = () => {
  router.push({ name: "create-report" });
};
const btnHandleEditReport = (id) => {
  router.push({ name: "edit-report", params: { id } });
};

//pagination

const pagesPerGroup = 4;
const currentGroup = ref(1);

const totalPages = computed(() => reportStore.ownReportMeta?.totalPages || 1);

const visiblePages = computed(() => {
  const start = (currentGroup.value - 1) * pagesPerGroup + 1;

  const end = Math.min(start + pagesPerGroup - 1, totalPages.value);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
const goToPage = async (p) => {
  if (p === page.value) return;

  page.value = p;
  await fetchOwnReports();

  // If clicked the last page in group → move to next group
  const groupEnd = currentGroup.value * pagesPerGroup;
  if (p === groupEnd && p < totalPages.value) {
    currentGroup.value++;
  }

  // If clicked the first page in group → move to previous group
  const groupStart = (currentGroup.value - 1) * pagesPerGroup + 1;
  if (p === groupStart && p > 1) {
    currentGroup.value--;
  }
};
const nextPage = async () => {
  if (!reportStore.ownReportMeta?.hasNextPage) return;

  page.value++;
  await fetchOwnReports();

  const groupEnd = currentGroup.value * pagesPerGroup;
  if (page.value > groupEnd) {
    currentGroup.value++;
  }
};

const PreviousPage = async () => {
  if (!reportStore.ownReportMeta?.hasPreviousPage) return;

  page.value--;
  await fetchOwnReports();

  const groupStart = (currentGroup.value - 1) * pagesPerGroup + 1;
  if (page.value < groupStart) {
    currentGroup.value--;
  }
};
</script>

<style scoped>
/* Custom purple for the last stat icon */
.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
}

.text-purple {
  color: #a855f7;
}

.report-item {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  background-color: #fafafa !important;
  /* Matches the slight grey contrast in the screenshot */
}

.report-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.btn-group .btn {
  border-color: #dee2e6;
  font-weight: 500;
}

.btn-group .btn:hover {
  background-color: #f8f9fa;
  color: #212529;
}

.btn-action {
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  transition: 0.2s linear;
  padding: 5px 20px;
}

.btn-action:hover {
  background-color: #dee2e6 !important;
}

.box-shadow {
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.link-detail {
  text-decoration: none;
}

.center2 {
  display: flex !important;
  justify-content: center;
  align-items: center;
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

/* ----------- */
.bg-btn-group {
  padding: 5px;
  background-color: var(--background-color);
  border-radius: 10px;
}

.bg-btn-group .btn-filter {
  background-color: transparent;
  border: none;
  padding: 6px 15px 4px;
  font-size: 16px;
  border-radius: 6px;
  color: black;
  cursor: pointer;
}

.bg-btn-group .btn-filter.Active {
  background-color: white;
  color: var(--secondary-color);
}

/* .btn-action-group {
  /* border: 1px solid red; 
} */
.more-action {
  color: #808080;
  cursor: pointer;
}

.more {
  display: none;
}

@media (max-width: 912px) {
  .action-btn {
    display: none;
  }

  .more {
    display: block;
  }
}

@media (max-width: 912px) {

  /* CSS rules for screens 650px or smaller */
  .btn-action .btn-title {
    display: none;
  }
}

.border-color {
  border-color: var(--tertiary-color);
}
.report-list-wrapper {
  font-family: 'Outfit', sans-serif;
}

/* ════════════════════════════════════
   SKELETON
════════════════════════════════════ */
.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border-radius: 16px;
  padding: 16px 20px;
  border: 1px solid #f0f0f5;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  overflow: hidden;
  position: relative;
  animation: card-fade-in 0.4s ease both;
}
.skeleton-card:nth-child(1) { animation-delay: 0s; }
.skeleton-card:nth-child(2) { animation-delay: 0.08s; }
.skeleton-card:nth-child(3) { animation-delay: 0.16s; }

@keyframes card-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.sk-bar {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 5px;
  background: linear-gradient(180deg, #e5e7eb, #d1d5db);
  border-radius: 16px 0 0 16px;
}

.sk-thumb {
  width: 78px;
  height: 78px;
  border-radius: 12px;
  background: #eef0f4;
  flex-shrink: 0;
}

.sk-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.sk-line {
  height: 12px;
  border-radius: 6px;
  background: #eef0f4;
}
.sk-title { width: 52%; height: 16px; }
.sk-meta  { width: 72%; }

.sk-badge-row {
  display: flex;
  gap: 8px;
}
.sk-badge {
  height: 22px;
  width: 76px;
  border-radius: 999px;
  background: #eef0f4;
}
.sk-badge--sm { width: 58px; }

.sk-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
.sk-btn {
  width: 70px;
  height: 34px;
  border-radius: 10px;
  background: #eef0f4;
}

/* Shimmer */
.pulse {
  position: relative;
  overflow: hidden;
}
.pulse::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,0.75) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.7s infinite ease-in-out;
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

/* ════════════════════════════════════
   EMPTY STATE
════════════════════════════════════ */
.empty-state { display: flex; justify-content: center; }
.empty-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 52px 40px;
  background: #fafafa;
  border: 1.5px dashed #dde1e9;
  border-radius: 20px;
  text-align: center;
  width: 100%;
  max-width: 380px;
}
.empty-rings {
  position: relative;
  width: 80px; height: 80px;
  display: flex; align-items: center; justify-content: center;
}
.ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid #e5e7eb;
}
.ring-1 { width: 80px; height: 80px; opacity: 0.3; }
.ring-2 { width: 60px; height: 60px; opacity: 0.55; }
.ring-3 { width: 44px; height: 44px; background: #fff; border-color: #d1d5db; }
.empty-icon {
  position: relative;
  font-size: 20px;
  color: #9ca3af;
  z-index: 1;
}
.empty-title {
  font-family: 'Suwannaphum', serif;
  font-size: 1rem;
  font-weight: 700;
  color: #374151;
  margin: 0;
}
.empty-sub {
  font-size: 0.78rem;
  color: #adb5bd;
  margin: 0;
  letter-spacing: 0.01em;
}

/* ════════════════════════════════════
   REPORT CARD
════════════════════════════════════ */
.report-card {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #f0f0f5;
  padding: 14px 18px 14px 22px;
  margin-bottom: 12px;
  overflow: hidden;
  transition: box-shadow 0.22s ease, transform 0.2s ease, border-color 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.report-card:hover {
  box-shadow: 0 8px 28px rgba(0,0,0,0.09);
  transform: translateY(-2px);
  border-color: #e5e7eb;
}

/* Status stripe */
.status-stripe {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 5px;
  border-radius: 16px 0 0 16px;
  background: var(--secondary-color);
}
.status-stripe.pending   { background: linear-gradient(180deg, #f59e0b, #fcd34d); }
.status-stripe.approved  { background: linear-gradient(180deg, #10b981, #6ee7b7); }
.status-stripe.rejected  { background: linear-gradient(180deg, #ef4444, #fca5a5); }
.status-stripe.reviewing { background: linear-gradient(180deg, #6366f1, #a5b4fc); }

/* Thumb */
.card-thumb {
  flex-shrink: 0;
  position: relative;
  width: 78px; height: 78px;
}
.card-thumb img {
  width: 78px; height: 78px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #f0f0f5;
  display: block;
}
.thumb-overlay {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
  pointer-events: none;
}

/* Body */
.card-body {
  flex: 1;
  min-width: 0;
}
.card-title {
  font-family: 'Suwannaphum', serif;
  font-size: 0.94rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 340px;
}
.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}
.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.74rem;
  color: #6b7280;
  background: #f7f8fa;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid #eff0f3;
}
.meta-chip .bi-geo-alt-fill  { color: #ef4444; }
.meta-chip .bi-calendar-event { color: #6366f1; }

/* Badges */
.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.type-badge {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #64748b;
  border: 1px solid #e2e8f0;
}
.type-badge.accident  { background: #fef9ec; color: #92400e; border-color: #fde68a; }
.type-badge.crime     { background: #fef2f2; color: #991b1b; border-color: #fecaca; }
.type-badge.fire      { background: #fff7ed; color: #9a3412; border-color: #fed7aa; }
.type-badge.flood     { background: #eff6ff; color: #1e40af; border-color: #bfdbfe; }

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
}
.status-badge .dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.status-badge.pending   { background: #fffbeb; color: #b45309; border-color: #fcd34d; }
.status-badge.pending .dot   { background: #f59e0b; }
.status-badge.approved  { background: #ecfdf5; color: #065f46; border-color: #6ee7b7; }
.status-badge.approved .dot  { background: #10b981; }
.status-badge.rejected  { background: #fef2f2; color: #991b1b; border-color: #fca5a5; }
.status-badge.rejected .dot  { background: #ef4444; }
.status-badge.reviewing { background: #eef2ff; color: #3730a3; border-color: #a5b4fc; }
.status-badge.reviewing .dot { background: #6366f1; }

/* Action buttons */
.btn-action-group {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.action-btn .btn-action {
  font-family: 'Suwannaphum', serif;
  font-size: 0.78rem;
  padding: 7px 13px;
  display: flex;
  align-items: center;
  gap: 5px;
  border-color: #e9ecef;
  color: #374151;
  background: #fafbfc;
  transition: background 0.14s, border-color 0.14s;
}
.action-btn .btn-action:hover { background: #f3f4f6; border-color: #d1d5db; }
.action-btn .btn-action:first-child { border-radius: 10px 0 0 10px; }
.action-btn .btn-action:last-child  { border-radius: 0 10px 10px 0; }
.action-btn .btn-action .icon { font-size: 0.88rem; line-height: 1; }

.more-action {
  width: 36px; height: 36px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  border: 1px solid #e9ecef;
  color: #9ca3af;
  background: #fafbfc;
  transition: background 0.14s, color 0.14s;
}
.more-action:hover { background: #f3f4f6; color: #374151; }

/* Card transition */
.card-list-enter-active,
.card-list-leave-active { transition: all 0.28s ease; }
.card-list-enter-from   { opacity: 0; transform: translateY(10px); }
.card-list-leave-to     { opacity: 0; transform: translateX(-10px); }

/* Responsive */
@media (max-width: 768px) {
  .report-card { flex-wrap: wrap; }
  .card-title  { max-width: 100%; }
  .btn-action-group { width: 100%; }
  .sk-actions { display: none; }
}

</style>

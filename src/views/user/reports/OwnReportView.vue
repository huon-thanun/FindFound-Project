<template>
  <div class="container py-5 min-vh-100">
    <header class="mb-5">
      <h2 class="fw-bold">ការរាយការណ៍ របស់ខ្ញុំ</h2>
      <p class="text-muted">
        សូមស្វាគមន៍, ទាំងនេះជាការរាយការណ៍ទាំងអស់របស់អ្នក។
      </p>
    </header>
    <div class="card mb-3 shadow border-color">
      <div class="card-body row">
        <div class="col-xxl-12">
          <BaseInput
            class="w-100"
            v-model="search"
            type="text"
            placeholder="ស្វែងរក ការរាយការណ៍..."
          />
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
              <BaseSelect
                v-model="cateValue"
                :items="categoryStore.categories"
                textField="ប្រភេទនៃការរាយការណ៍ទំាងអស់"
                labelField="name"
                valueField="id"
              />
            </div>
          </div>
        </div>
        <div class="col-xxl-4 mt-1 text-end" style="flex: 1">
          <BaseButton
            variant="outline_primary"
            icon="stars"
            @click="clearFilter"
          >
            សម្អាតការតម្រៀប
          </BaseButton>
        </div>
      </div>
    </div>
    <div
      class="mt-3 mb-1 align-items-center d-flex justify-content-between flex-wrap"
    >
      <div class="btn-group bg-btn-group my-1">
        <button
          class="btn-filter"
          :class="{ Active: activeFilter === '' }"
          @click="btnFilterAllReport"
        >
          ទាំងអស់
        </button>

        <button
          class="btn-filter"
          :class="{ Active: activeFilter === 'LOST' }"
          @click="btnFilterReportType('LOST')"
        >
          បាត់
        </button>

        <button
          class="btn-filter"
          :class="{ Active: activeFilter === 'FOUND' }"
          @click="btnFilterReportType('FOUND')"
        >
          រកឃើញ
        </button>
      </div>
      <div class="d-flex gap-2 align-items-center my-1">
        <div class="mt-2" style="width: 150px">
          <BaseSelect
            class="w-100"
            v-model="sortDir"
            :items="sortDirData"
            labelField="name"
            valueField="id"
          />
        </div>
      </div>
    </div>
    <div class="card border-0 box-shadow p-4 mb-3">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="fw-bold mb-0">របាយការណ៍</h5>
        <!-- <button
          class="btn btn-dark px-4 py-2 rounded-3 fw-bold shadow-sm"
          @click="btnHandleCreateReport"
        >
          បង្កើតការរាយការណ៍
        </button> -->
        <BaseButton
          variant="primary"
          icon="file-earmark-plus"
          @click="btnHandleCreateReport"
          >បង្កើតការរាយការណ៍
        </BaseButton>
      </div>
      <div class="row g-3" v-if="reportStore.isLoadingGetOwnReports">
        <div v-for="n in 3" :key="`skeleton-${n}`" class="col-lg-4 col-md-6">
          <BaseSkeleton />
        </div>
      </div>
      <div
        v-else-if="reportStore.ownReports.length <= 0"
        class="my-3 col-12 center2"
      >
        <div class="w-100 d-flex flex-column align-items-center p-3 text-muted">
          <i class="bi bi-exclamation-circle" style="font-size: 35px"></i>
          <h3 class="m-0">No Reports Found</h3>
        </div>
      </div>
      <div v-else class="report-item p-3 border rounded-3 bg-white mb-3 box-shadow"
        v-for="report in reportStore.ownReports" :key="report.id">
        <div class="row align-items-center g-3">
          <div class="col-2 -md-2 col-xl-2">
            <img :src="report.reportImages && report.reportImages.length > 0
              ? report.reportImages[0].name
              : defaultImage
              " style="width: 80px; height: 80px; border: 1px solid black" />
          </div>

            <div>
              <div class="row align-items-center mb-1">
                <div class="col-12 col-xl-6">
                  <h6 class="fw-bold mb-0 title">{{ report.title }}</h6>
                </div>
                <div class="col-12 col-xl-6 d-flex">
                  <span
                    class="badge rounded-pill px-2 me-2"
                    style="font-size: 0.7rem"
                    :class="report.reportType?.name.toLowerCase()"
                  >
                    {{ report.reportType?.name }}
                  </span>
                  <span
                    class="badge border rounded-pill px-2"
                    style="font-size: 0.7rem"
                    :class="report.status?.toLowerCase()"
                  >
                    {{ report.status }}
                  </span>
                </div>
              </div>
              <div class="d-flex flex-wrap text-muted small mt-2">
                <span>
                  <i class="bi bi-geo-alt me-1 text-danger"></i>
                  {{ report.locationText }}
                </span>
                <span
                  ><i class="bi bi-calendar3 me-1"></i>
                  {{ formatDate(report.eventDate) }}
                </span>
              </div>
            </div>
          </div>

          <div class="btn-action-group">
            <div class="btn-group ms-5 shadow-sm">
              <button
                class="btn btn-action btn-outline-secondary"
                @click="gotoDetailPage(report.id)"
              >
                <span class="icon text-warning">
                  <i class="bi bi-eye"></i>
                </span>
                <span class="btn-title">មើល</span>
              </button>
              <button
                class="btn btn-action btn-outline-secondary"
                @click="btnHandleEditReport(report.id)"
              >
                <span class="icon text-primary">
                  <i class="bi bi-pencil-square"></i>
                </span>

                <span class="btn-title"> កែសម្រួល </span>
              </button>
              <button
                class="btn btn-action btn-outline-secondary"
                @click="btnHandleDeleteOwnReport(report.id)"
              >
                <span class="icon text text-danger">
                  <i class="bi bi-trash"></i>
                </span>
                <span class="btn-title"> លុប </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- pagination -->

    <div
      v-if="
        reportStore.ownReportMeta?.totalPages > 1 &&
        !reportStore.isLoadingGetOwnReports
      "
      class="d-flex gap-2 justify-content-center"
    >
      <BaseButton
        variant="danger"
        @click="PreviousPage"
        :disabled="!reportStore.ownReportMeta?.hasPreviousPage"
      >
        Prev
      </BaseButton>

      <!-- <BaseButton
        v-for="p in visiblePages"
        :key="p"
        :variant="p === page ? 'primary' : 'cancel'"
        @click="goToPage(p)"
      >
        {{ p }}
      </BaseButton> -->

      <BaseButton
        variant="primary"
        @click="nextPage"
        :disabled="!reportStore.ownReportMeta?.hasNextPage"
      >
        Next
      </BaseButton>
    </div>

    <!--Confirm Message Modal -->
    <BaseModal :icon="'trash'" :theme="'primary'" :isClose="showModal">
      <template #body>
        <p>Do you want to delete?</p>
      </template>
      <template #btnClose>
        <BaseButton
          variant="cancel"
          icon="x-circle"
          class="col-6"
          @click="showModal = false"
        >
          Close
        </BaseButton>
      </template>
      <template #btnActive>
        <BaseButton
          icon="box"
          class="col-6"
          variant="danger"
          :isLoading="reportStore.isLoadingDeleteOwnReport"
          @click="btnHandleConfirmDelete"
        >
          Delete
        </BaseButton>
      </template>
    </BaseModal>
    <!-- Message Model  -->
    <BaseModal :icon="msgIcon" :theme="'primary'" :isClose="showMessageModal">
      <template #body>
        <p>{{ reportStore.deleteMessage.message }}</p>
      </template>

      <template #btnActive>
        <BaseButton
          icon="box"
          class="col-6"
          variant="primary"
          @click="showMessageModal = false"
        >
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
  background-color: rgba(226, 226, 226, 0.877);
  border-radius: 20px;
}

.bg-btn-group .btn-filter {
  background-color: transparent;
  border: none;
  font-size: 16px;
  border-radius: 15px;
  cursor: pointer;
}

.bg-btn-group .btn-filter.Active {
  background-color: #ffffff;
}
/* .btn-action-group {
  /* border: 1px solid red; 
} */

@media (max-width: 912px) {
  /* CSS rules for screens 650px or smaller */
  .btn-action .btn-title {
    display: none;
  }
}

.border-color {
  border-color: var(--tertiary-color);
}
</style>

<template>
  <div class="p-3">
    <h2>Reports</h2>
    <p>View and manage all lost and found reports</p>

    <div class="row">
      <!-- FILTER CARD -->
      <div class="col-12 mb-3">
        <BaseReportCard>
          <div class="row justify-content-center">
            <!-- SEARCH -->
            <div class="col-12 col-md-6 col-xl-3 center2 mb-2">
              <input
                type="text"
                class="form-control"
                placeholder="Search Report..."
                v-model="search"
              />
              <!-- <BaseInput
                type="text"
                placeholder="Search Report..."
                v-model="search"
              /> -->
            </div>

            <!-- TYPE -->
            <div class="col-12 col-md-6 col-xl-3 center2 mb-2">
              <select class="form-select" v-model="typeValue">
                <option value="">All Type</option>
                <option
                  v-for="type in reportStore.allReportType"
                  :key="type.id"
                  :value="type.id"
                >
                  {{ type.name }}
                </option>
              </select>
            </div>

            <!-- STATUS -->
            <div class="col-12 col-md-6 col-xl-3 center2 mb-2">
              <select class="form-select" v-model="statusValue">
                <option value="">All Status</option>
                <option
                  v-for="status in allStatus"
                  :key="status.value"
                  :value="status.value"
                >
                  {{ status.title }}
                </option>
              </select>
            </div>

            <!-- CATEGORY -->
            <div class="col-12 col-md-6 col-xl-3 center2 mb-2">
              <select class="form-select" v-model="cateValue">
                <option value="">All Category</option>
                <option
                  v-for="category in categoryStore.categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
        </BaseReportCard>
      </div>

      <div class="col-12 center2" v-if="reportStore.isLoadingGetAllReport">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <!-- REPORT LIST -->

      <div v-else class="col-12 row">
        <div
          v-if="reportStore.allReports.length <= 0"
          class="my-3 col-12 center2"
        >
          <h3>No Report Found</h3>
        </div>
        <div
          v-else
          class="col-12 col-md-6 col-lg-4 c mb-3"
          v-for="report in reportStore.allReports"
          :key="report.id"
        >
          <BaseReportCard>
            <template #image>
              <div class="image">
                <img
                  :src="
                    report.reportImages && report.reportImages.length > 0
                      ? report.reportImages[0].name
                      : defaultImage
                  "
                  :alt="report.title || 'Report Image'"
                />
              </div>
            </template>

            <div>
              <div class="d-flex gap-2 my-2">
                <span
                  class="status"
                  :class="report.reportType.name.toLowerCase()"
                >
                  {{ report.reportType.name }}
                </span>
                <span class="status" :class="report.status.toLowerCase()">
                  {{ report.status }}
                </span>
              </div>

              <h2 class="card-title">{{ report.title }}</h2>

              <span class="text-muted desc fs-4 text-clamp-2">
                {{ report.description }}
              </span>

              <ul class="item-list mt-2">
                <li class="fs-5">
                  <i class="bi bi-file-earmark-text"></i>
                  {{ report.category.name }}
                </li>
                <li class="fs-5">
                  <i class="bi bi-geo-alt-fill"></i>
                  {{ report.locationText }}
                </li>
                <li class="fs-5">
                  <i class="bi bi-calendar2"></i>
                  {{ formatDate(report.createdAt) }}
                </li>
              </ul>

              <div class="button-group">
                <BaseButton
                  icon="bi-eye"
                  variant="primary w-100"
                  @click="fetchReportDetail(report.id)"
                  :isLoading="isLoading === report.id"
                >
                  View Details
                </BaseButton>
              </div>

              <span
                class="d-block mt-2 py-1"
                style="height: 65px; font-size: 20px"
              >
                Reported by <strong>{{ report.reporter.fullname }}</strong>
              </span>
            </div>
          </BaseReportCard>
        </div>
      </div>
    </div>
    <div class="d-flex my-2 gap-2 justify-content-center">
      <!-- <button
        class="btn btn-outline-dark"
        @click="PreviousPage"
        v-if="reportStore.meta?.hasPreviousPage"
      >
        Previous
      </button> -->
      <!-- <BaseButton
        variant="danger"
        @click="PreviousPage"
        :isLoading="isLoadingPrevious"
        v-if="reportStore.meta?.hasPreviousPage"
      >
        Previous
      </BaseButton>
      <BaseButton
        variant="primary"
        @click="nextPage"
        :isLoading="isLoadingNext"
        v-if="reportStore.meta?.hasNextPage"
      >
        Next
      </BaseButton> -->

      <!-- <button
        class="btn btn-outline-dark"
        @click="nextPage"
        v-if="reportStore.meta?.hasNextPage"
      >
        Next
      </button> -->
    </div>

    <!-- pagination -->

    <div class="d-flex gap-2 justify-content-center my-3">
      <BaseButton
        variant="danger"
        @click="PreviousPage"
        :disabled="!reportStore.meta?.hasPreviousPage"
      >
        Prev
      </BaseButton>

      <BaseButton
        v-for="p in visiblePages"
        :key="p"
        :variant="p === page ? 'primary' : 'cancel'"
        @click="goToPage(p)"
      >
        {{ p }}
      </BaseButton>

      <BaseButton
        variant="primary"
        @click="nextPage"
        :disabled="!reportStore.meta?.hasNextPage"
      >
        Next
      </BaseButton>
    </div>

    <ReportDetail v-model="showModal" :data="data" />
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import BaseReportCard from "@/components/base/BaseReportCard.vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { useReportStore } from "@/stores/reportStore";
import { formatDate } from "@/utils/formatDate";
import ReportDetail from "./ReportDetail.vue";

const categoryStore = useCategoryStore();
const reportStore = useReportStore();

const defaultImage =
  "https://tse2.mm.bing.net/th/id/OIP.b8bpZyFwupiioDofQPXo_gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3";

const search = ref("");
const cateValue = ref("");
const typeValue = ref("");
const statusValue = ref("");

const allStatus = [
  { value: "ACTIVE", title: "Active" },
  { value: "RESOLVED", title: "Resolved" },
  { value: "HIDDEN", title: "Hidden" },
];

let timeout = null;
const page = ref(1);
const fetchReports = async () => {
  await reportStore.getAllReports({
    _page: page.value,
    _per_page: 6,
    search: search.value,
    status: statusValue.value,
    sortBy: "createdAt",
    sortDir: "desc",
    reportType: typeValue.value,
    categoryId: cateValue.value,
  });
  console.log("PAGE:", page.value);
  console.log("META:", reportStore.meta);
};
onMounted(async () => {
  try {
    await Promise.all([
      categoryStore.fetchCategories(),
      reportStore.getAllReportType(),
      fetchReports(),
    ]);
  } catch (err) {
    console.error(err);
  }
});
// const isLoadingNext = ref(false);
// const nextPage = async () => {
//   isLoadingNext.value = true;
//   try {
//     if (!reportStore.meta.hasNextPage) return;
//     page.value++;
//     await fetchReports();
//   } catch (error) {
//     console.error(error);
//   } finally {
//     isLoadingNext.value = false;
//   }
// };
// const isLoadingPrevious = ref(false);
// const PreviousPage = async () => {
//   isLoadingPrevious.value = true;
//   try {
//     if (!reportStore.meta.hasPreviousPage) return;
//     page.value--;
//     await fetchReports();
//   } catch (error) {
//     console.error(error);
//   } finally {
//     isLoadingPrevious.value = false;
//   }
// };

watch([search, cateValue, typeValue, statusValue], () => {
  clearTimeout(timeout);
  timeout = setTimeout(fetchReports, 500);
});
const showModal = ref(false);
const data = ref({});
const isLoading = ref(null);
const fetchReportDetail = async (id) => {
  try {
    isLoading.value = id;
    await reportStore.getReportById(id);
    data.value = reportStore.report;
    showModal.value = true;
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

//pagination

const pagesPerGroup = 4;
const currentGroup = ref(1);

import { computed } from "vue";

const totalPages = computed(() => reportStore.meta?.totalPages || 1);

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
  await fetchReports();

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
  if (!reportStore.meta?.hasNextPage) return;

  page.value++;
  await fetchReports();

  const groupEnd = currentGroup.value * pagesPerGroup;
  if (page.value > groupEnd) {
    currentGroup.value++;
  }
};

const PreviousPage = async () => {
  if (!reportStore.meta?.hasPreviousPage) return;

  page.value--;
  await fetchReports();

  const groupStart = (currentGroup.value - 1) * pagesPerGroup + 1;
  if (page.value < groupStart) {
    currentGroup.value--;
  }
};
</script>
<style scoped>
.desc .card-text {
  font-size: 20px;
  color: rgba(128, 128, 128, 0.679);
}
.image {
  width: 100%;
  height: 300px;
}
.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.desc {
  height: 67px;
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
  display: flex;
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
</style>

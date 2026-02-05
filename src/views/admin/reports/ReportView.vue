<template>
  <div class="p-3">
    <h2 class="fw-bold">របាយការណ៍</h2>
    <p class="text-muted">
      មើល និងគ្រប់គ្រងការរាយការណ៍បាត់បង់ និងរើសបានទាំងអស់
    </p>

    <!-- <div class="row"> -->
    <!-- FILTER CARD -->

    <div class="card mb-3 shadow">
      <div class="card-body row">
        <div class="col-xl-4">
          <BaseInput class="w-100" v-model="search" type="text" placeholder="ស្វែងរករបាយការណ៍..." />
        </div>
        <div class="col-xl-5 mt-2">
          <div class="row">
            <div class="col-xl-6" style="flex: 1; flex-wrap: nowrap;">
              <BaseSelect class="w-100 text-nowrap" v-model="typeValue" :items="reportStore.allReportType"
                textField="ប្រភេទទាំងអស់" labelField="name" valueField="id" />
            </div>
            <div class="col-xl-6" style="flex: 1; flex-wrap: nowrap;">
              <BaseSelect class="w-100 text-nowrap" v-model="statusValue" :items="allStatus" textField="ស្ថានភាពទាំងអស់"
                labelField="title" valueField="value" />
            </div>
            <div class="col-xl-6" style="flex: 1; flex-wrap: nowrap;">
              <BaseSelect class="w-100 text-nowrap" v-model="cateValue" :items="categoryStore.categories"
                textField="ប្រភេទទាំងអស់" labelField="name" valueField="id" />
            </div>
          </div>
        </div>
        <!-- CLEAR FILTER -->
        <div class="col-xl-3 mt-1 text-end">
          <BaseButton variant="outline_primary" icon="stars" @click="clearFilter">
            សម្អាតការតម្រៀប
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="col-12 center2" v-if="reportStore.isLoadingGetAllReport">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">កំពុងផ្ទុក...</span>
      </div>
    </div>

    <div v-else-if="reportStore.allReports.length <= 0" class="my-3 col-12 center2">
      <div class="w-100 d-flex flex-column align-items-center p-3 text-muted">
        <i class="bi bi-exclamation-circle" style="font-size: 35px"></i>
        <h3 class="m-0">មិនមានរបាយការណ៍ទេ</h3>
      </div>
    </div>
    <!-- REPORT LIST -->

    <div v-else class="col-12">
      <div class="row">
        <div class="col-12 col-lg-6 col-xl-4 col-xxl-3 mb-3" v-for="report in reportStore.allReports" :key="report.id">
          <BaseReportCard height="500px">
            <template #image>
              <div class="image border border-danger">
                <img :src="report.reportImages && report.reportImages.length > 0
                  ? report.reportImages[0].name
                  : defaultImage
                  " :alt="report.title || 'រូបភាពរបាយការណ៍'" />
              </div>
            </template>

            <div>
              <div class="d-flex gap-2 my-2">
                <span class="status" :class="report.reportType.name.toLowerCase()">
                  {{ report.reportType.name }}
                </span>
                <span class="status" :class="report.status.toLowerCase()">
                  {{ report.status }}
                </span>
              </div>

              <h5 class="card-title mt-3">{{ report.title }}</h5>

              <ul class="item-list d-flex justify-content-between mt-2">
                <li class="fs-6 ">
                  <small><i class="bi bi-file-earmark-text"></i>
                    {{ report.category.name }}</small>
                </li>
                <div>
                  <li class="fs-6">
                    <small>
                      <i class="bi bi-geo-alt-fill"></i>
                      {{ report.locationText }}
                    </small>
                  </li>
                  <li class="fs-6">
                    <small>
                      <i class="bi bi-calendar2"></i>
                      {{ formatDate(report.createdAt) }}
                    </small>
                  </li>
                </div>
              </ul>

              <div class="button-group">
                <BaseButton icon="bi-eye" variant="primary w-100" @click="fetchReportDetail(report.id)"
                  :isLoading="isLoading === report.id">
                  មើលលម្អិត
                </BaseButton>
              </div>

              <div class="row">
                <div class="col-lg-12 col-xl-6">
                  <span class="d-block mt-2 py-1" style="font-size: 16px">
                    រាយការណ៍ដោយ 
                  </span>
                </div>
                <div class="col-lg-12 col-xl-6">
                  <span class="d-block mt-2 py-1" style="font-size: 16px">
                    <strong>{{ report.reporter.fullname }}</strong>
                  </span>
                </div>
              </div>
            </div>
          </BaseReportCard>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <div class="d-flex my-2 gap-2 justify-content-center"></div>

    <!-- pagination -->

    <div
      v-if="reportStore.meta?.totalPages > 1"
      class="d-flex gap-2 justify-content-center my-3"
    >
      <BaseButton
        variant="danger"
        @click="PreviousPage"
        :disabled="!reportStore.meta?.hasPreviousPage"
      >
        មុន
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
        :disabled="!reportStore.meta?.hasNextPage"
      >
        បន្ទាប់
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
  { value: "ACTIVE", title: "សកម្ម" },
  { value: "RESOLVED", title: "បានដោះស្រាយ" },
  { value: "HIDDEN", title: "លាក់" },
];

let timeout = null;
const page = ref(1);
const fetchReports = async () => {
  await reportStore.getAllReports({
    _page: page.value,
    _per_page: 8,
    search: search.value,
    status: statusValue.value?.value,
    sortBy: "createdAt",
    sortDir: "desc",
    reportType: typeValue.value?.id,
    categoryId: cateValue.value?.id,

  });
  console.log("PAGE:", page.value);
  console.log("META:", reportStore.meta);

  console.log({
    search: search.value,
    status: statusValue.value,
    reportType: typeValue.value,
    categoryId: cateValue.value,
  });
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

// Clear Filter
const clearFilter = () => {
  search.value = "";
  typeValue.value = "";
  statusValue.value = "";
  cateValue.value = "";
};
</script>
<style scoped>
/* .desc {
  height: 63px;
} */
.desc .card-text {
  color: rgba(128, 128, 128, 0.679);
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
</style>

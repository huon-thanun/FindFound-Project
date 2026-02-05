<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between mb-3 align-items-center">
      <div>
        <h2>ការរាយការណ៍</h2>
        <p>រុករក និងមើលវត្ថុបាត់បង់ និងវត្ថុដែលបានរកឃើញទាំងអស់នៅក្នុងសហគមន៍</p>
      </div>

      <BaseButton
        variant="primary"
        icon="plus-lg"
        @click="btnHandleToCreatePage"
      >
        បង្កើតការរាយការណ៍
      </BaseButton>
    </div>
    <BaseReportCard>
      <div class="row align-items-center">
        <div class="m-0 py-0 px-3" style="flex: 4">
          <BaseInput
            v-model="search"
            type="text"
            placeholder="ស្វែងរក ការរាយការណ៍..."
          />
        </div>
        <!-- CATEGORY -->
        <div class="mt-2" style="flex: 2">
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
          <BaseSelect
            v-model="cateValue"
            :items="categoryStore.categories"
            textField="ប្រភេទនៃការរាយការណ៍ទំាងអស់"
            labelField="name"
            valueField="id"
          />
        </div>
        <div
          class="d-flex justify-content-end align-items-center"
          style="flex: 1"
        >
          <BaseButton variant="dark" @click="clearFilter">
            សម្អាតការចម្រោះ
          </BaseButton>
        </div>
      </div>
    </BaseReportCard>

    <div class="mt-3 mb-5 btn-group bg-btn-group">
      <button
        class="btn-filter"
        :class="{ active: activeFilter === '' }"
        @click="btnFilterAllReport"
      >
        ទាំងអស់
      </button>

      <button
        class="btn-filter"
        :class="{ active: activeFilter === '1' }"
        @click="btnFilterReportType('1')"
      >
        បាត់
      </button>

      <button
        class="btn-filter"
        :class="{ active: activeFilter === '2' }"
        @click="btnFilterReportType('2')"
      >
        រកឃើញ
      </button>
    </div>
    <div class="row">
      <!-- Loading -->
      <div class="col-12 center2 p-3" v-if="reportStore.isLoadingPublicReports">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <!-- Not found  -->
      <div
        v-else-if="reportStore.publicReports.length <= 0"
        class="my-3 col-12 center2"
      >
        <div class="w-100 d-flex flex-column align-items-center p-3 text-muted">
          <i class="bi bi-exclamation-circle" style="font-size: 35px"></i>
          <h3 class="m-0">មិនមាន​ ការរាយការណ៍</h3>
        </div>
      </div>
      <div
        v-else
        class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 card-hover"
        v-for="report in reportStore.publicReports"
        :key="report.id"
      >
        <router-link
          :to="{ name: 'report-detail-user', params: { id: report.id } }"
          class="link-detail"
        >
          <BaseReportCard
            height="400px"
            padding="p-0"
            addClass="overflow-hidden"
          >
            <template #image>
              <img
                class="w-100"
                style="height: 200px; object-fit: cover"
                :src="
                  report.reportImages && report.reportImages.length > 0
                    ? report.reportImages[0].name
                    : defaultImage
                "
                :alt="report.title || 'Report Image'"
              />
              <!-- <p>{{ report.reportImages[0]?.name }}</p> -->
              <!--<img :src="defaultImage" alt="" /> -->
              <span
                class="tag type-tag"
                :class="report.reportType.name.toLowerCase()"
                >{{ report.reportType.name }}</span
              >
            </template>
            <div class="px-3">
              <div class="py-2 mb-2">
                <div class="d-flex gap-2">
                  <span class="tag">{{ report.category.name }}</span>
                  <span class="tag">{{ report.status }}</span>
                </div>
              </div>
              <h5 class="card-title">{{ report.title }}</h5>
              <!-- <p class="card-text text-muted desc text-clamp-2">
            {{ report.description }}
          </p> -->
              <ul class="detail">
                <li>
                  <span class="icon">
                    <i class="bi bi-geo-alt-fill"></i>
                  </span>
                  <span class="text">{{ report.locationText }}</span>
                </li>
                <li>
                  <span class="icon">
                    <i class="bi bi-calendar2"></i>
                  </span>
                  <span class="text">{{ formatDate(report.eventDate) }}</span>
                </li>
              </ul>
            </div>
          </BaseReportCard>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { useReportStore } from "@/stores/reportStore";
import { formatDate } from "@/utils/formatDate";

import BaseReportCard from "@/components/base/BaseReportCard.vue";
import { useRouter } from "vue-router";

const categoryStore = useCategoryStore();
const reportStore = useReportStore();
const defaultImage =
  "https://tse2.mm.bing.net/th/id/OIP.b8bpZyFwupiioDofQPXo_gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3";

const search = ref("");
const typeValue = ref("");
const cateValue = ref("");

const fetchReports = async () => {
  try {
    await reportStore.getAllPublicReports({
      _page: 1,
      _per_page: 100,
      search: search.value,
      reportType: typeValue.value,
      categoryId: cateValue.value?.id || "",
    });
  } catch (error) {
    console.error(error);
  }
  // console.log("PAGE:", page.value);
  // console.log("META:", reportStore.meta);
};

// active filter
const activeFilter = ref("");

onMounted(async () => {
  try {
    await Promise.all([
      categoryStore.fetchCategories(),
      fetchReports(),
      // reportStore.getAllPublicReports(),
    ]);
    // console.log(reportStore.allReports);
    console.log("public", reportStore.publicReports);
    console.log(cateValue.value);
    // default active
    activeFilter.value = "";
  } catch (error) {
    console.error(error);
  }
});
let timeout = null;
watch([search, typeValue, cateValue], () => {
  clearTimeout(timeout);
  timeout = setTimeout(fetchReports, 500);
  console.log(reportStore.allReports);
  // console.log(cateValue.value);
});
const btnFilterAllReport = async () => {
  try {
    cateValue.value = null;
    typeValue.value = "";
    activeFilter.value = "";
    await fetchReports();
  } catch (error) {
    console.error(error);
  }
};
const btnFilterReportType = async (reportTypeValue) => {
  try {
    activeFilter.value = reportTypeValue;
    typeValue.value = reportTypeValue;
    await fetchReports();
  } catch (error) {
    console.error(error);
  }
};
const clearFilter = () => {
  search.value = "";
  typeValue.value = "";
  cateValue.value = null;
  activeFilter.value = "";
};
const router = useRouter();
const btnHandleToCreatePage = () => {
  const token = localStorage.getItem("token");

  if (token) {
    router.push({ name: "create-report" });
  } else {
    router.push({ name: "login" }); // 👈 redirect here
  }
};
</script>

<style scoped>
.center2 {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
/* .desc {
  height: 50px;
} */
.bg-btn-group {
  padding: 5px;
  background-color: rgba(226, 226, 226, 0.877);
  border-radius: 20px;
}

.bg-btn-group .btn-filter {
  background-color: transparent;
  border: none;
  padding: 4px 15px;
  font-size: 16px;
  border-radius: 15px;
  cursor: pointer;
}

.bg-btn-group .btn-filter.active {
  background-color: #fff;
}
.tag {
  border: 1px solid black;
  padding: 3px 7px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
}
.tag.type-tag {
  position: absolute;
  background-color: #eee;
  padding-inline: 15px;
  font-weight: 600;
  right: 15px;
  top: 10px;
  right: 10px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.text-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.lost {
  background: var(--danger) !important;
  color: var(--light) !important;
  border-color: var(--danger) !important;
}
.found {
  background: var(--success) !important;
  color: var(--light) !important;
  border-color: var(--success) !important;
}
.detail {
  list-style-type: none;
  padding: 0;
}
.detail li {
  color: rgba(128, 128, 128, 0.679);
  display: flex;
  column-gap: 8px;
  align-items: center;
}
.detail li .icon {
  font-size: 18px;
}
.link-detail {
  text-decoration: none;
}
.card-hover {
  transition: 0.3s linear;
}
.card-hover:hover {
  transform: translate(-5px, -8px);
}
</style>

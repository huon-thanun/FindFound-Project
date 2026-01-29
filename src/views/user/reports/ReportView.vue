<template>
  <div class="p-3">
    <div class="d-flex justify-content-between mb-3 align-items-center">
      <div>
        <h2>All Reports</h2>
        <p>Browse all lost and found items in the community</p>
      </div>

      <BaseButton variant="primary" @click="" icon="plus-lg">
        Create Report
      </BaseButton>
    </div>
    <BaseReportCard>
      <div class="row">
        <div class="col-9">
          <input
            type="text"
            placeholder="Search by title or description"
            class="form-control"
          />
        </div>
        <!-- CATEGORY -->
        <div class="col-3">
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
          <BaseSelect
            v-model="selectedRole"
            :items="roles"
            textField="All Categories"
            :labelField="categoryStore.name"
            :valueField="categoryStore.id"
          />
        </div>
      </div>
    </BaseReportCard>

    <div class="my-3 btn-group bg-btn-group">
      <button
        class="btn-filter"
        :class="{ active: activeFilter === '' }"
        @click="activeFilter = ''"
      >
        All Reports
      </button>

      <button
        class="btn-filter"
        :class="{ active: activeFilter === 'lost' }"
        @click="activeFilter = 'lost'"
      >
        Lost
      </button>

      <button
        class="btn-filter"
        :class="{ active: activeFilter === 'found' }"
        @click="activeFilter = 'found'"
      >
        Found
      </button>

      <button
        class="btn-filter"
        :class="{ active: activeFilter === 'resolved' }"
        @click="activeFilter = 'resolved'"
      >
        Resolved
      </button>
    </div>
    <div class="row">
      <div
        class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3"
        v-for="report in reportStore.allReports"
        :key="report.id"
      >
        <BaseReportCard>
          <template #image>
            <img
              class="w-100"
              style="max-height: 300px; object-fit: cover"
              :src="
                report.reportImages && report.reportImages.length > 0
                  ? report.reportImages[0].name
                  : defaultImage
              "
              :alt="report.title || 'Report Image'"
            />
            <span
              class="tag type-tag"
              :class="report.reportType.name.toLowerCase()"
              >{{ report.reportType.name }}</span
            >
          </template>
          <div class="py-2 mb-2">
            <div class="d-flex gap-2">
              <span class="tag">{{ report.category.name }}</span>
              <span class="tag">{{ report.status }}</span>
            </div>
          </div>
          <h4 class="card-title">{{ report.title }}</h4>
          <p class="card-text text-muted desc text-clamp-2">
            {{ report.description }}
          </p>
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
        </BaseReportCard>
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

const categoryStore = useCategoryStore();
const reportStore = useReportStore();
const defaultImage =
  "https://tse2.mm.bing.net/th/id/OIP.b8bpZyFwupiioDofQPXo_gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3";

const search = ref("");
const statusValue = ref("");
const typeValue = ref("");
const cateValue = ref("");

const fetchReports = async () => {
  await reportStore.getAllReports({
    _page: 1,
    _per_page: 4,
    search: search.value,
    status: statusValue.value,
    sortBy: "createdAt",
    sortDir: "desc",
    reportType: typeValue.value,
    categoryId: cateValue.value,
  });
  // console.log("PAGE:", page.value);
  // console.log("META:", reportStore.meta);
};

// active filter
const activeFilter = ref("");

onMounted(async () => {
  try {
    await Promise.all([categoryStore.fetchCategories(), fetchReports()]);
    console.log(reportStore.allReports);

    // default active
    activeFilter.value = "";
  } catch (error) {
    console.error(error);
  }
});
let timeout = null;
watch([search, cateValue, typeValue, statusValue], () => {
  clearTimeout(timeout);
  timeout = setTimeout(fetchReports, 500);
  console.log(reportStore.allReports);
  console.log(cateValue.value);
});

// import useUserStore from ".././../../stores/userStore.js";

// const userStore = useUserStore();

const roles = ref([]);
const selectedRole = ref(null);

/* Load roles (LIST) */
onMounted(async () => {
  roles.value = await categoryStore.fetchCategories();
});
</script>

<style scoped>
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
  font-size: 16px;
  font-weight: 500;
}
.tag.type-tag {
  position: absolute;
  background-color: #eee;
  padding-inline: 15px;
  font-weight: 600;
  right: 15px;
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
</style>

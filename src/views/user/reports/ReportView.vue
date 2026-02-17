<template>
  <div class="container py-4">
    <div
      class="d-flex justify-content-between flex-wrap mb-3 align-items-center"
    >
      <div>
        <h2>ការរាយការណ៍</h2>
        <p>រុករក និងមើលវត្ថុបាត់បង់ និងវត្ថុដែលបានរកឃើញទាំងអស់នៅក្នុងសហគមន៍</p>
      </div>

      <BaseButton
        variant="primary"
        icon="file-earmark-plus"
        @click="btnHandleToCreatePage"
      >
        បង្កើតការរាយការណ៍
      </BaseButton>
    </div>
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
            <div class="col-xxl-5" style="flex-wrap: nowrap">
              <BaseSelect
                class="w-100"
                v-model="cateValue"
                :items="categoryStore.categories"
                textField="ប្រភេទនៃការរាយការណ៍ទំាងអស់"
                labelField="name"
                valueField="id"
              />
            </div>
          </div>
        </div>
        <div class="col-xxl-4 mt-1 text-end">
          <BaseButton
            icon="stars"
            variant="outline_primary"
            @click="clearFilter"
          >
            សម្អាតការតម្រៀប
          </BaseButton>
        </div>
      </div>
    </div>
    <div
      class="mt-3 mb-5 align-items-center d-flex justify-content-between flex-wrap"
    >
      <div class="btn-group bg-btn-group my-1">
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
    <SectionPublicReports
      :page="1"
      :perPage="20"
      :search="search"
      :isSearching="isSearching"
      :reportTypeId="typeValue"
      :categoryId="cateValue?.id"
      :sortDir="sortDir"
    ></SectionPublicReports>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { useReportStore } from "@/stores/reportStore";
import { useRouter } from "vue-router";

import BaseReportCard from "@/components/base/BaseReportCard.vue";
import SectionPublicReports from "@/components/report/SectionPublicReports.vue";

const categoryStore = useCategoryStore();
const reportStore = useReportStore();

const search = ref("");
const typeValue = ref("");
const cateValue = ref("");
const activeFilter = ref("");
const sortDirData = reactive([
  { id: "DESC", name: "ថ្មីបំផុត" },
  { id: "ASC", name: "ចាស់បំផុត" },
]);
const sortDir = ref(sortDirData[0]);

const isSearching = ref(false);
onMounted(async () => {
  try {
    await Promise.all([categoryStore.fetchCategories()]);

    console.log("public", reportStore.publicReports);
    console.log(cateValue.value);
    // default active
    activeFilter.value = "";
    isSearching.value = true;
  } catch (error) {
    console.error(error);
  } finally {
    isSearching.value = false;
  }
});
const btnFilterAllReport = async () => {
  try {
    cateValue.value = null;
    typeValue.value = "";
    activeFilter.value = "";
  } catch (error) {
    console.error(error);
  }
};
const btnFilterReportType = async (reportTypeValue) => {
  try {
    activeFilter.value = reportTypeValue;
    typeValue.value = reportTypeValue;
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
    router.push({ name: "login" });
  }
};
</script>

<style scoped>
.image {
  width: 100%;
  height: 230px;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

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

.border-color {
  border-color: var(--tertiary-color);
}
</style>

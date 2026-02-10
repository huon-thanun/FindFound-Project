<template>
  <div class="row">
    <!-- <div class="col-3">
      <BaseCardSkeleton />
    </div> -->

    <!-- <div class="col-12 center2 p-3" v-if="reportStore.isLoadingPublicReports">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div> -->
    <div
      class="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-3"
      v-for="n in 4"
      :key="'sk-' + n"
      v-if="reportStore.isLoadingPublicReports"
    >
      <BaseCardSkeleton />
    </div>
    <!-- Not found  -->
    <div
      v-else-if="reportStore.publicReports.length <= 0"
      class="my-3 col-12 center2"
    >
      <div class="w-100 d-flex flex-column align-items-center p-3 text-muted">
        <i class="bi bi-exclamation-circle" style="font-size: 35px"></i>
        <h3 class="m-0">មិនមាន​ របាយការណ៍</h3>
      </div>
    </div>
    <div
      v-else
      class="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-3 card-hover"
      v-for="report in reportStore.publicReports"
      :key="report.id"
    >
      <BaseCard
        :category="report.category"
        :reportType="report.reportType"
        :eventDate="report.eventDate"
        :title="report.title"
        :location="report.locationText"
        btnTitle="ព័ត៌មានលម្អិត"
        @onClick="btnHandleReportDetail(report.id)"
      >
        <template #image>
          <div class="image">
            <img
              :src="
                report.reportImages && report.reportImages.length > 0
                  ? report.reportImages[0].name
                  : defaultImage
              "
            />
          </div>
        </template>
      </BaseCard>
    </div>
    <div
      v-if="hasMore && !reportStore.isLoadingPublicReports"
      class="col-12 text-center"
      :class="{ 'd-none': !hasLoadMoreBtn }"
    >
      <BaseButton
        variant="primary"
        :isLoading="reportStore.isLoadingPublicReports"
        @click="loadMore"
      >
        មើលបន្ថែម
      </BaseButton>
    </div>
  </div>
</template>

<!-- Usage  -->
<!-- 
<SectionPublicReports
      :page="1"
      :perPage="6"
      :search="search"
      :reportTypeId="typeValue" (datatype:object)
      :categoryId="cateValue?.id"> (dataType:Number)
</SectionPublicReports> 
-->

<script setup>
import { useReportStore } from "@/stores/reportStore";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

import BaseCard from "./BaseCard.vue";
import BaseCardSkeleton from "./BaseCardSkeleton.vue";

const reportStore = useReportStore();
const router = useRouter();

const defaultImage =
  "https://tse2.mm.bing.net/th/id/OIP.b8bpZyFwupiioDofQPXo_gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3";

const props = defineProps({
  hasLoadMoreBtn: {
    type: Boolean,
    default: true,
  },
  page: {
    type: Number,
    default: 1,
  },
  perPage: {
    type: Number,
    default: 10,
  },
  search: {
    type: String,
    default: "",
  },
  reportTypeId: {
    type: String,
    default: "",
  },
  categoryId: {
    type: String,
    default: "",
  },
  sortDir: {
    type: Object,
    default: { id: "DESC", name: "Unknown" },
  },
});
const _per_page = ref(props.perPage);
const fetchReports = async () => {
  try {
    await reportStore.getAllPublicReports({
      _page: props.page,
      _per_page: _per_page.value,
      search: props.search,
      reportType: props.reportTypeId,
      categoryId: props?.categoryId || "",
      sortDir: props.sortDir?.id,
    });
  } catch (error) {
    console.error(error);
  }
  // console.log("PAGE:", page.value);
  // console.log("META:", reportStore.meta);
};
onMounted(async () => {
  try {
    await Promise.all([
      fetchReports(),
      // reportStore.getAllPublicReports(),
    ]);
    // console.log(reportStore.allReports);
    console.log("public", reportStore.publicReports);
    console.log(reportStore.metaPublicReports);
  } catch (error) {
    console.error(error);
  }
});

const emit = defineEmits(["load-more"]);
const hasMore = ref(true);
const loadMore = () => {
  //   emit("load-more");
  if (reportStore.metaPublicReports.hasNextPage) {
    hasMore.value = true;
    _per_page.value += _per_page.value;
  } else {
    hasMore.value = false;
    return;
  }
  console.log(_per_page.value);
};

// const loadMore = async () => {
//   const scrollY = window.scrollY; // save scroll

//   if (!reportStore.metaPublicReports.hasNextPage) {
//     hasMore.value = false;
//     return;
//   }

//   _per_page.value += props.perPage;

//   await fetchReports();

//   window.scrollTo(0, scrollY); // restore scroll
// };

let timeout = null;

// watch(
//   () => [
//     props.page,
//     // props.perPage,
//     _per_page.value,
//     props.search,
//     props.reportTypeId,
//     props.categoryId,
//     props.sortDir,
//   ],
//   () => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       fetchReports();
//     }, 500);
//     console.log(props.sortDir);
//   },
// );

watch(
  () => [
    props.page,
    _per_page.value,
    props.search,
    props.reportTypeId,
    props.categoryId,
    props.sortDir,
  ],
  async () => {
    clearTimeout(timeout);

    timeout = setTimeout(async () => {
      await fetchReports();
    }, 500);

    console.log(props.sortDir);
  },
);

const btnHandleReportDetail = (reportId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push({ name: "login" });
  } else {
    router.push({ name: "report-detail-user", params: { id: reportId } });
  }
};
</script>
<style scoped>
.center2 {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
.image {
  width: 100%;
  height: 230px;
}
.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

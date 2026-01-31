<template>
  <div class="container py-5 min-vh-100">
    <header class="mb-5">
      <h2 class="fw-bold">ការរាយការណ៍ របស់ខ្ញុំ</h2>
      <p class="text-muted">
        សូមស្វាគមន៍, ទាំងនេះជាការរាយការណ៍ទាំងអស់របស់អ្នក។
      </p>
    </header>

    <div class="row g-4 mb-5">
      <div v-for="stat in stats" :key="stat.label" class="col-md-3">
        <div class="card border-0 box-shadow p-4 h-100 position-relative">
          <div :class="['fs-3 mb-2', stat.iconColor]">
            <i :class="['bi', stat.icon]"></i>
          </div>
          <i
            v-if="stat.trend"
            class="bi bi-graph-up-arrow position-absolute top-0 end-0 m-3 text-success small"
          ></i>

          <h3 class="fw-bold mb-0">{{ stat.value }}</h3>
          <small class="text-muted fw-semibold">{{ stat.label }}</small>
        </div>
      </div>
    </div>

    <div class="card border-0 box-shadow p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="fw-bold mb-0">My Reports</h5>
        <button class="btn btn-dark px-4 py-2 rounded-3 fw-bold shadow-sm">
          Create New Report
        </button>
      </div>
      <div class="w-100 center2" v-if="reportStore.isLoadingGetOwnReports">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
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
      <div
        v-else
        class="report-item p-3 border rounded-3 bg-white mb-3 box-shadow"
        v-for="report in reportStore.ownReports"
        :key="report.id"
      >
        <div class="row align-items-center g-3">
          <div class="col-auto">
            <!-- <img
              src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=100"
              class="rounded-3 object-fit-cover"
              style="width: 80px; height: 80px"
              alt="Lost wallet"
            /> -->
            <img
              :src="
                report.reportImages && report.reportImages.length > 0
                  ? report.reportImages[0].name
                  : defaultImage
              "
              :alt="report.title || 'Report Image'"
              style="width: 80px; height: 80px"
            />
          </div>

          <div class="col">
            <div class="d-flex align-items-center gap-2 mb-1">
              <h6 class="fw-bold mb-0">{{ report.title }}</h6>
              <span
                class="badge bg-danger rounded-pill px-2"
                style="font-size: 0.7rem"
              >
                {{ report.reportType?.name }}
              </span>
              <span
                class="badge bg-light text-dark border rounded-pill px-2"
                style="font-size: 0.7rem"
              >
                {{ report.status }}
              </span>
            </div>
            <div class="d-flex flex-wrap gap-3 text-muted small">
              <span>
                <i class="bi bi-geo-alt me-1"></i>
                {{ report.locationText }}
              </span>
              <span
                ><i class="bi bi-calendar3 me-1"></i>
                {{ formatDate(report.eventDate) }}
              </span>
            </div>
          </div>

          <div class="col-auto">
            <div class="btn-group shadow-sm">
              <button
                class="btn btn-outline-secondary btn-sm px-3"
                @click="gotoDetailPage(report.id)"
              >
                <i class="bi bi-eye me-1"></i> View
              </button>
              <button class="btn btn-outline-secondary btn-sm px-3">
                <i class="bi bi-pencil-square me-1"></i> Edit
              </button>
              <button
                class="btn btn-outline-secondary btn-sm px-3"
                @click="btnHandleDeleteOwnReport(report.id)"
              >
                <i class="bi bi-trash me-1"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
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
          :isLoading="reportStore.isLoadingDeleteOwnArticle"
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
          OK
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { useReportStore } from "@/stores/reportStore";
import { onMounted, ref, computed } from "vue";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "vue-router";

const reportStore = useReportStore();
const router = useRouter();

const defaultImage =
  "https://tse2.mm.bing.net/th/id/OIP.b8bpZyFwupiioDofQPXo_gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3";
const fetchOwnReports = async () => {
  await reportStore.getOwnReports();
};
onMounted(async () => {
  await fetchOwnReports();
  countReports();
  console.log(reportStore.ownReports);
});
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
  activeCount.value = 0;
  resolvedCount.value = 0;

  for (let i = 0; i < reportStore.ownReports.length; i++) {
    const report = reportStore.ownReports[i];
    if (report.status === "ACTIVE") activeCount.value++;
    if (report.resolvedAt != null) resolvedCount.value++;
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
  {
    label: "Potential Matches",
    value: 0,
    icon: "bi-file-earmark-medical",
    iconColor: "text-purple",
  },
]);
import { watch } from "vue";

watch(
  () => reportStore.ownReports,
  () => {
    countReports();
  },
  { immediate: true },
);
</script>

<style scoped>
/* Custom purple for the last stat icon */
.text-purple {
  color: #a855f7;
}

.report-item {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  background-color: #fafafa !important; /* Matches the slight grey contrast in the screenshot */
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
</style>

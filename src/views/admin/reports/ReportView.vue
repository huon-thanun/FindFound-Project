<template>
  <div class="p-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="admin-banner rounded-4">
        <div class="banner-container">
          <!-- icon: report / clip -->
          <div class="banner-icon">
            <i class="bi bi-clipboard"></i>
          </div>

          <!-- main text group -->
          <div class="banner-text">
            <!-- exact h2 from prompt, plus small context badge -->
            <h2 class="fw-bold">
              ការបង្ហោះ
              <span class="badge-admin"><i class="bi bi-sticky"
                  style="font-size: 0.75rem; margin-right: 5px"></i>អ្នកគ្រប់គ្រង</span>
            </h2>
            <!-- exact paragraph, but we enhance it with a subtle khmer-friendly meta info -->
            <p class="text-muted">
              <i class="fas fa-eye" style="opacity: 0.7; font-size: 1rem"></i>
              មើល និងគ្រប់គ្រងការបង្ហោះបាត់បង់ និងរើសបានទាំងអស់
            </p>
          </div>
        </div>

        <!-- very subtle divider line just for style (makes banner airy) -->
        <div style="
            margin-top: 0.8rem;
            margin-left: calc(70px + 1.25rem);
            border-bottom: 2px dashed rgba(86, 115, 150, 0.15);
            width: 40%;
          "></div>
      </div>
      <p class="mt-3 text-muted">កំពុងទាញទិន្នន័យស្ថិតិ</p>
    </div>

    <!-- <div class="row"> -->
    <!-- FILTER CARD -->

    <div class="card mb-3 shadow border-color">
      <div class="card-body row">
        <div class="col-xxl-12">
          <BaseInput class="w-100" v-model="search" type="text" placeholder="ស្វែងរករបាយការណ៍..." />
        </div>
        <div class="col-xxl-8 mt-2">
          <div class="row">
            <div class="col-lg-6 col-xxl-3" style="flex-wrap: nowrap">
              <BaseSelect class="w-100 text-nowrap" v-model="typeValue" :items="reportTypeOptions"
                textField="ប្រភេទទាំងអស់" labelField="khName" valueField="id" />
            </div>
            <div class="col-lg-6 col-xxl-4" style="flex-wrap: nowrap">
              <BaseSelect class="w-100 text-nowrap" v-model="statusValue" :items="allStatus" textField="ស្ថានភាពទាំងអស់"
                labelField="title" valueField="value" />
            </div>
            <div class="col-xxl-5" style="flex-wrap: nowrap">
              <BaseSelect class="w-100 text-nowrap" v-model="cateValue" :items="categoryStore.categories"
                textField="ប្រភេទទាំងអស់" labelField="name" valueField="id" />
            </div>
          </div>
        </div>
        <!-- CLEAR FILTER -->
        <div class="col-xxl-4 mt-1 text-end">
          <BaseButton variant="outline_primary" icon="stars" @click="clearFilter">
            សម្អាតការតម្រៀប
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="col-12 mt-4" v-if="reportStore.isLoadingGetAllReport">
      <div class="row g-3">
        <div v-for="n in 4" :key="`skeleton-${n}`" class="col-12 col-md-6 col-xl-4 col-xxl-3">
          <BaseSkeleton />
        </div>
      </div>
    </div>

    <div v-else-if="reportStore.allReports.length <= 0" class="my-3 col-12 center2">
      <div class="w-100 d-flex flex-column align-items-center p-3 text-muted">
        <i class="bi bi-exclamation-circle" style="font-size: 35px"></i>
        <h3 class="m-0">មិនមានរបាយការណ៍ទេ</h3>
      </div>
    </div>
    <!-- REPORT LIST -->

    <div v-else class="col-12 mt-4">
      <div class="row g-4">
        <div class="col-12 col-md-6 col-xl-4 col-xxl-3" v-for="report in reportStore.allReports" :key="report.id">
          <BaseReportCard class="border-color rounded-4 pb-0">
            <template #image>
              <div class="image rounded-top-4">
                <img class="rounded-top-4" :src="report.reportImages && report.reportImages.length > 0
                    ? report.reportImages[0].name
                    : defaultImage
                  " :alt="report.title || 'រូបភាពរបាយការណ៍'" />
              </div>
              <span class="category-tag tag-box-shadow-in">{{
                report.category.name
                }}</span>
            </template>

            <div class="px-4 py-2 text-center">
              <small>
                <i class="bi text-danger bi-geo-alt-fill"></i>
                {{ report.locationText }}
              </small>
              <h5 class="card-title py-1 pt-2">{{ report.title }}</h5>

              <!-- Status Badges -->
              <div class="status-group">
                <span class="status-badge" :class="report.reportType.name.toLowerCase()">
                  <i :class="report.reportType.name === 'LOST'
                      ? 'bi-exclamation-triangle'
                      : 'bi-check-circle'
                    "></i>
                  {{ getReportTypeKh(report.reportType.name) }}
                </span>
                <span class="status-badge" :class="report.status.toLowerCase()">
                  <i :class="{
                    'bi-lightning': report.status === 'ACTIVE',
                    'bi-check2-all': report.status === 'RESOLVED',
                    'bi-eye-slash': report.status === 'HIDDEN',
                  }"></i>
                  {{ getStatusKh(report.status) }}
                </span>
              </div>

              <ul class="item-list mt-2">
                <small>
                  <i class="bi text-primary bi-calendar2"></i>
                  {{ formatDate(report.createdAt) }}
                </small>
              </ul>

              <div class="button-group pt-0 border-0">
                <BaseButton class="base" :icon="isLoading === report.id ? '' : 'eye'" variant="primary w-100"
                  @click="fetchReportDetail(report.id)">
                  <span v-if="isLoading" class="spinner-border me-2 spinner-border-sm"></span>
<i v-else-if="icon" :class="`fas fa-${icon}`"></i>
                  <span>មើលលម្អិត</span>
                </BaseButton>
              </div>

              <div class="reporter">
                <div class="reporter-avatar">
                  <img :src="report.reporter.avatar || defaultAvatar" :alt="report.reporter.fullname" />
                </div>
                <div class="reporter-info">
                  <span class="reporter-label text-start">បង្ហោះដោយ</span>
                  <span class="reporter-name">{{
                    report.reporter.fullname
                    }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ card.title }}</h5>
            <div class="card-value">
              {{ card.value.toLocaleString("km-KH") }}
            </div>
            <small class="secondary-label">{{ card.secondary }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useReportStore } from "@/stores/reportStore";

const userStore = useUserStore();
const reportStore = useReportStore();

  const loading = ref(true);
const error = ref(null);
const isAuthError = ref(false);
const statCards = ref([]);
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

const REPORT_TYPE_KH = {
  LOST: "បានបាត់",
  FOUND: "បានប្រទះឃើញ",
};

const STATUS_KH = {
  ACTIVE: "សកម្ម",
  RESOLVED: "បានដោះស្រាយ",
  HIDDEN: "លាក់",
};

const getReportTypeKh = (type) => {
  return REPORT_TYPE_KH[type] || type;
};

const getStatusKh = (status) => {
  return STATUS_KH[status] || status;
};

const reportTypeOptions = computed(() => {
  return reportStore.allReportType.map((type) => ({
    ...type,
    khName: REPORT_TYPE_KH[type.name] || type.name,
  }));
});

let timeout = null;
const page = ref(1);
const fetchReports = async () => {
  await reportStore.getAllReports({
    _page: page.value,
    _per_page: 20,
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
  loading.value = true;
  error.value = null;
  isAuthError.value = false;

  try {
    await Promise.all([
      userStore.fetchUsers({ page: 1, perPage: 100 }),
      reportStore.getAllReports({ page: 1, perPage: 1 }), // ✅ correct
    ]);

    const totalUsers = userStore.total || userStore.users?.length || 0;

    const activeUsers =
      userStore.users?.filter(
        (u) => (u.status || "").toUpperCase() === "ACTIVATED",
      ).length || 0;

    const inactiveUsers =
      userStore.users?.filter(
        (u) => (u.status || "").toUpperCase() === "DEACTIVATED",
      ).length || 0;

    const meta = reportStore.meta || {};
    const totalReports =
      meta.totalItems ||
      meta.total ||
      meta.count ||
      meta.pagination?.total ||
      meta.pagination?.totalItems ||
      reportStore.total ||
      0;

    statCards.value = [
      {
        title: "របាយការណ៍សរុប",
        value: totalReports,
        icon: "bi-file-earmark-bar-graph-fill",
        secondary: "របាយការណ៍ទាំងអស់",
      },
      {
        title: "អ្នកប្រើប្រាស់សរុប",
        value: totalUsers,
        icon: "bi-people-fill",
        secondary: "សរុបអ្នកប្រើប្រាស់",
      },
      {
        title: "អ្នកប្រើប្រាស់សកម្ម",
        value: activeUsers,
        icon: "bi-person-check-fill",
        secondary: "អ្នកប្រើប្រាស់សកម្ម",
      },
      {
        title: "អ្នកប្រើប្រាស់អសកម្ម",
        value: inactiveUsers,
        icon: "bi-person-x-fill",
        secondary: "អ្នកប្រើប្រាស់អសកម្ម",
      },
    ];
  } catch (err) {
    console.error("Dashboard error:", err);

    if (err.response?.status === 400 || err.response?.status === 401) {
      error.value = "មិនអាចចូលប្រព័ន្ធបាន – សូមចូលឡើងវិញ";
      isAuthError.value = true;
    } else {
      error.value = "មានបញ្ហាក្នុងការទាញទិន្នន័យ";
    }

    statCards.value = [
      {
        title: "របាយការណ៍សរុប",
        value: 0,
        icon: "bi-file-earmark-bar-graph-fill",
        secondary: "",
      },
      {
        title: "អ្នកប្រើប្រាស់សរុប",
        value: 0,
        icon: "bi-people-fill",
        secondary: "",
      },
      {
        title: "អ្នកប្រើប្រាស់សកម្ម",
        value: 0,
        icon: "bi-person-check-fill",
        secondary: "",
      },
      {
        title: "អ្នកប្រើប្រាស់អសកម្ម",
        value: 0,
        icon: "bi-person-x-fill",
        secondary: "",
      },
    ];
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* .desc {
  height: 63px;
} */
.base {
  transition: 0.1s !important;
  transform: translate(0) !important;
}

.base:hover {
  border: 1px solid white;
  transition: 0.3s;
  transform: scale(0.9);
}

.card {
  height: auto !important;
}

.desc .card-text {
  color: rgba(128, 128, 128, 0.679);
}

.border-color {
  border: none;
  padding: 0 !important;
  transform: 0.3s !important;
}

.image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  transition: 0.3s;
}

.border-color:hover .image img {
  transform: scale(1.1);
  transition: 0.3s;
  filter: brightness(0.9);
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s;
}

.item-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
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
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -60%);
  visibility: hidden;
}

.border-color:hover .button-group {
  visibility: visible;
  transition: 0.3s !important;
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

.tag-box-shadow-in {
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
}

.category-tag {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255, 255, 255, 0.95);
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #3b1e54;
}

.spinner-color {
  color: var(--primary-color);
}

/* Reporter */
.reporter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e2e8f0;
}

.reporter-avatar {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.reporter-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reporter-info {
  display: flex;
  flex-direction: column;
}

.reporter-label {
  font-size: 0.7rem;
  color: #94a3b8;
}

.reporter-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
}

.status-group {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  border-radius: 30px;
  font-size: 0.7rem;
  font-weight: 600;
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.status-badge.lost {
  background: #fee2e2;
  color: #dc2626;
  border-color: #fecaca;
}

.status-badge.found {
  background: #dcfce7;
  color: #16a34a;
  border-color: #bbf7d0;
}

.status-badge.active {
  background: #dbeafe;
  color: #2563eb;
  border-color: #bfdbfe;
}

.status-badge.resolved {
  background: #f3e8ff;
  color: #9333ea;
  border-color: #e9d5ff;
}

.status-badge.hidden {
  background: #f1f5f9;
  color: #64748b;
  border-color: #cbd5e1;
}

/* main card – admin header banner */
.admin-banner {
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  background-image: url('../../../assets/images/background/report.png');
  background-position: center -480px ;
  background-size: cover;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  padding: 2rem 2.5rem;
  border-top: 5px solid var(--secondary-color);
  box-shadow: 0 0px 20px -12px rgba(0, 20, 40, 0.25),
    inset 0 1px 2px rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
}

/* inner flex layout: icon group + text */
.banner-container {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

/* left side icon – subtle report / clipboard */
.banner-icon {
  background: var(--secondary-color);
  color: white;
  width: 70px;
  height: 70px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  box-shadow: 0 10px 18px -6px rgba(20, 35, 70, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.25);
}

/* text block */
.banner-text {
  flex: 1;
}

/* main heading – exactly as given */
.banner-text h2.fw-bold {
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #0b1a33;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem 0.8rem;
}

/* optional subtle badge for admin context */
.badge-admin {
  background: rgba(20, 53, 90, 0.1);
  padding: 0.3rem 1rem;
  border-radius: 60px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #1e3b5c;
  border: 1px solid rgba(20, 53, 90, 0.2);
  letter-spacing: 0.02rem;
  margin-left: 0.25rem;
  backdrop-filter: blur(4px);
}

/* secondary text exactly as provided */
.banner-text p.text-muted {
  font-size: 1.18rem;
  color: #48607c !important;
  /* override muted with accessible soft navy */
  font-weight: 400;
  line-height: 1.5;
  max-width: 700px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* little khmer style accent – a separating dash with decorative element */
.text-muted .separator {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #8aa0bc;
  border-radius: 50%;
  margin: 0 0.5rem;
  opacity: 0.6;
}

/* additional stats chips for admin overview – keeps banner airy but functional */
.banner-meta {
  display: flex;
  gap: 1.2rem;
  margin-top: 1.2rem;
  flex-wrap: wrap;
}

.meta-chip {
  background: rgba(230, 240, 255, 0.7);
  border-radius: 40px;
  padding: 0.4rem 1.4rem 0.4rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #1f3b58;
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 10px -6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-chip i {
  color: #2f4d73;
  font-size: 0.9rem;
  opacity: 0.8;
}

.meta-chip span {
  font-weight: 600;
  color: #0b2642;
  margin-right: 2px;
}

/* responsive touch */
@media (max-width: 550px) {
  .admin-banner {
    padding: 1.5rem 1.5rem;
    border-radius: 2rem;
  }

  .banner-icon {
    width: 55px;
    height: 55px;
    font-size: 1.8rem;
    border-radius: 22px;
  }

  .banner-text h2.fw-bold {
    font-size: 2rem;
  }

  .banner-text p.text-muted {
    font-size: 1rem;
  }
}

@media (max-width: 420px) {
  .banner-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .banner-icon {
    align-self: flex-start;
  }
}

/* small flourish: micro reflection line */
.admin-banner {
  position: relative;
  isolation: isolate;
}

.admin-banner::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 0% 10%,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 50%);
  pointer-events: none;
  border-radius: inherit;
  z-index: -1;
}
</style>

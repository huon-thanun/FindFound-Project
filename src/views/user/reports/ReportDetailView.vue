<template>
  <!-- <div style="padding-inline: 70px"> -->
  <div class="container py-5">
    <h2>របាយការណ៍លម្អិត</h2>
    <!-- <router-link :to="{ name: 'report.user' }" class="btn btn-secondary">
      ត្រឡប់ក្រោយ
    </router-link> -->
    <BaseButton variant="dark" @click="goBack"> ត្រឡប់ក្រោយ </BaseButton>
    <div class="py-3">
      <div class="w-100 center2" v-if="reportStore.isLoadingGetAReport">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else class="row g-4">
        <div class="col-lg-8">
          <div class="card border-0 mb-4 overflow-hidden position-relative">
            <span
              v-if="reportStore.report?.reportType?.name"
              :class="reportTypeClass"
              class="badge position-absolute top-0 end-0 m-3 px-3"
            >
              {{ reportStore.report.reportType?.name }}
            </span>

            <!-- <img
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800"
              class="card-img-top main-image"
              alt="Found blue backpack"
            /> -->
            <img
              :src="
                reportStore.report.reportImages &&
                reportStore.report.reportImages.length > 0
                  ? reportStore.report.reportImages[0].name
                  : defaultImage
              "
              :alt="reportStore.report.title || 'Report Image'"
              style="max-height: 480px"
            />
          </div>

          <div class="card border-0 box-shadow p-4">
            <h2 class="fw-bold mb-1">
              {{ reportStore.report.title }}
            </h2>
            <div class="mb-4">
              <span class="badge bg-secondary-subtle text-dark me-2">
                {{ reportStore.report.category?.name }}
              </span>
              <span
                class="badge"
                :class="reportStore.report.status?.toLowerCase()"
              >
                {{ reportStore.report.status }}
              </span>
            </div>

            <h5 class="fw-bold">ព័ត៌មានលម្អិត</h5>
            <p class="text-muted mb-4">
              {{ reportStore.report.description }}
            </p>

            <hr class="text-muted" />

            <div class="row pt-2">
              <div class="col-md-6 d-flex align-items-center mb-3">
                <i class="bi bi-calendar-event me-3 fs-4 text-muted"></i>
                <div>
                  <small class="text-muted d-block"
                    >កាលបរិច្ឆេទ​ នៃព្រឹត្តិការណ៍</small
                  >
                  <strong>{{
                    formatDate(reportStore.report.eventDate)
                  }}</strong>
                </div>
              </div>
              <div class="col-md-6 d-flex align-items-center mb-3">
                <i class="bi bi-geo-alt me-3 fs-4 text-muted"></i>
                <div>
                  <small class="text-muted d-block">ទីតាំងកើតហេតុ</small>
                  <strong>
                    {{ reportStore.report.locationText }}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card border-0 p-4 box-shadow">
            <h6 class="mb-4 fw-semibold text-secondary">ព័ត៌មាន ទំនាក់ទំនង</h6>

            <div class="contact-item d-flex mb-4">
              <i class="bi bi-person me-3 text-muted"></i>
              <div>
                <small class="text-muted d-block">ឈ្មោះអ្នករាយការណ៍</small>
                <span class="fw-bold">
                  {{ reportStore.report.reporter?.fullname }}
                </span>
              </div>
            </div>

            <div class="contact-item d-flex mb-4">
              <i class="bi bi-envelope me-3 text-muted"></i>
              <div>
                <small class="text-muted d-block">Email</small>
                <!-- <a
                  :href="reportStore.report.reporter?.email || '#'"
                  class="text-decoration-none fw-bold"
                >
                  {{ reportStore.report.reporter?.email }}
                </a> -->
                {{ reportStore.report.reporter?.email }}
              </div>
            </div>

            <div
              class="contact-item d-flex mb-4"
              v-if="reportStore.report.contactInformation?.phoneNumber"
            >
              <i class="bi bi-telephone me-3 text-muted"></i>
              <div>
                <small class="text-muted d-block">លេខទូរសព្ទ</small>
                <span class="fw-bold">
                  {{ reportStore.report.contactInformation?.phoneNumber }}
                </span>
              </div>
            </div>
            <div
              class="contact-item d-flex mb-4"
              v-if="reportStore.report.contactInformation?.telegramLink"
            >
              <i class="bi bi-telegram me-3 fs-4 text-muted"></i>
              <div>
                <small class="text-muted d-block">Telegram</small>
                <span class="fw-bold">
                  {{ reportStore.report.contactInformation?.telegramLink }}
                </span>
              </div>
            </div>

            <!-- <button class="btn btn-dark w-100 py-2 fw-bold mt-2 rounded-3">
              Contact Reporter
            </button> -->
          </div>
        </div>
        <div class="col-12 py-3">
          <h2 class="fw-bold pb-2">របាយការណ៍ស្រដៀងគ្នា</h2>
          <div class="row">
            <div
              class="col-12 col-md-6 col-lg-3 mb-4"
              v-for="item in reportStore.matchReports.matchedReports"
              :key="item.id"
            >
              <BaseReportCard class="match-card h-100">
                <!-- Image -->
                <template #image>
                  <div class="match-image position-relative">
                    <img
                      :src="
                        item.matchedReport.reportImages?.[0]?.name ||
                        defaultImage
                      "
                      :alt="item.matchedReport.title || 'Report Image'"
                    />

                    <!-- Confidence badge -->
                    <span class="confidence-badge">
                      {{ Math.round(item.confidenceScore * 100) }}% match
                    </span>
                  </div>
                </template>

                <!-- Content -->
                <div class="p-3">
                  <!-- Status row -->
                  <div class="d-flex gap-2 mb-2 flex-wrap">
                    <span
                      class="badge-pill"
                      :class="item.matchedReport.reportType.name.toLowerCase()"
                    >
                      {{ item.matchedReport.reportType.name }}
                    </span>

                    <span
                      class="badge-pill"
                      :class="item.matchedReport.status.toLowerCase()"
                    >
                      {{ item.matchedReport.status }}
                    </span>
                  </div>

                  <!-- Title -->
                  <h5 class="fw-bold mb-2 text-truncate">
                    {{ item.matchedReport.title }}
                  </h5>

                  <!-- Info -->
                  <ul class="item-list small text-muted m-0 p-0">
                    <li>
                      <i class="bi bi-tag"></i>
                      {{ item.matchedReport.category.name }}
                    </li>

                    <li>
                      <i class="bi bi-geo-alt"></i>
                      {{ item.matchedReport.locationText }}
                    </li>

                    <li>
                      <i class="bi bi-calendar3"></i>
                      {{ formatDate(item.matchedReport.createdAt) }}
                    </li>
                  </ul>
                </div>
              </BaseReportCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useReportStore } from "@/stores/reportStore";
import { onMounted, ref } from "vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

import { formatDate } from "@/utils/formatDate";
import BaseReportCard from "@/components/base/BaseReportCard.vue";

const route = useRoute();
const id = ref(route.params.id);
const defaultImage =
  "https://tse2.mm.bing.net/th/id/OIP.b8bpZyFwupiioDofQPXo_gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3";
const reportStore = useReportStore();
onMounted(async () => {
  try {
    await Promise.all([
      reportStore.getReportById(id.value),
      reportStore.getMatchReportByid(id.value),
    ]);
    console.log(reportStore.report);
    console.log(reportStore.matchReports);
  } catch (error) {
    console.error();
  }
});

const reportTypeClass = computed(() => {
  const type = reportStore.report?.reportType?.name;

  if (!type || typeof type !== "string") {
    return "";
  }

  return type.toLowerCase();
});
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>
<style scoped>
/* Custom tweaks to match your screenshot exactly */
.main-image {
  height: 450px;
  object-fit: cover;
}

.card {
  border-radius: 12px;
}

.badge {
  font-weight: 500;
  border-radius: 6px;
}

.bi {
  font-size: 1.2rem;
}

.text-secondary {
  font-size: 0.9rem;
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

/* Ensure icons align well with text */
.contact-item i {
  width: 20px;
}
.box-shadow {
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.center2 {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
.match-card {
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  transition: 0.25s ease;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.05);
}

.match-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

/* Image */
.match-image {
  height: 200px;
  overflow: hidden;
}

.match-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Confidence badge */
.confidence-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #111;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 20px;
}

/* Pills */
.badge-pill {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

/* List style */
.item-list li {
  list-style: none;
  display: flex;
  gap: 6px;
  margin-bottom: 4px;
}
</style>

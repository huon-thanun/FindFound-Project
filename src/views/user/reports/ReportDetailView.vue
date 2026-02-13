<template>
  <!-- <div style="padding-inline: 70px"> -->
  <div class="container py-5">
    <h2>របាយការណ៍លម្អិត</h2>
    <!-- <router-link :to="{ name: 'report.user' }" class="btn btn-secondary">
      ត្រឡប់ក្រោយ
    </router-link> -->
    <BaseButton variant="outline_primary" icon="arrow-left" @click="goBack()">
      ត្រឡប់ក្រោយ
    </BaseButton>
    <div class="py-3">
      <div
        class="w-100 d-flex justify-content-center"
        v-if="reportStore.isLoadingGetAReport"
      >
        <div class="loading-full" style="height: 50vh; width: 100%">
          <div class="custom-loader"></div>
          <p class="mt-4 khmer-font text-purple-accent">
            កំពុងផ្ទុកទិន្នន័យ...
          </p>
        </div>
      </div>
      <div v-else class="row g-4">
        <div class="col-lg-8">
          <div class="card border-1 mb-4 overflow-hidden position-relative">
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

            <div
              class="slider-wrapper"
              v-if="reportStore.report?.reportImages?.length"
            >
              <!-- Main slider -->

              <Swiper
                :spaceBetween="10"
                :navigation="true"
                :thumbs="{ swiper: thumbsSwiper }"
                :modules="modules"
                class="mySwiper2"
              >
                <SwiperSlide
                  v-for="image in reportStore.report?.reportImages || []"
                  :key="image.id"
                >
                  <img :src="image.name" />
                </SwiperSlide>
              </Swiper>

              <!-- Thumbnail slider -->
              <Swiper
                @swiper="setThumbsSwiper"
                :spaceBetween="10"
                :slidesPerView="4"
                :freeMode="true"
                :watchSlidesProgress="true"
                :modules="modules"
                class="mySwiper d-flex"
              >
                <SwiperSlide
                  v-for="image in reportStore.report?.reportImages || []"
                  :key="image.id"
                >
                  <img :src="image.name" />
                </SwiperSlide>
              </Swiper>
            </div>
            <div v-else class="image">
              <img
                :src="defaultImage"
                :alt="reportStore.report.title || 'Report Image'"
              />
            </div>
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
              class="col-12"
              v-if="reportStore.matchReports?.matchedReports?.length <= 0"
            >
              <div
                class="w-100 d-flex flex-column align-items-center p-3 text-muted"
              >
                <i class="bi bi-exclamation-circle" style="font-size: 35px"></i>
                <h3 class="m-0">មិនមាន​ របាយការណ៍ស្រដៀងគ្នា</h3>
              </div>
            </div>
            <div
              class="col-12 col-md-6 col-lg-3 mb-4"
              v-for="item in reportStore.matchReports?.matchedReports || []"
              :key="item?.matchedReport?.id"
            >
              <BaseCard
                :category="item.matchedReport?.category"
                :reportType="item.matchedReport?.reportType"
                :eventDate="item.matchedReport?.eventDate"
                :title="item.matchedReport?.title"
                :location="item.matchedReport?.locationText"
                btnTitle="ព័ត៌មានលម្អិត"
                @onClick="btnHandleReportDetail(item?.matchedReport?.id)"
              >
                <template #image>
                  <div class="recommendation-image">
                    <img
                      :src="
                        item.reportImages && item.reportImages.length > 0
                          ? item.reportImages[0].name
                          : defaultImage
                      "
                    />
                  </div>
                </template>
              </BaseCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useReportStore } from "@/stores/reportStore";
import { onMounted, watch, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { formatDate } from "@/utils/formatDate";
import BaseCard from "@/components/report/BaseCard.vue";

import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const route = useRoute();
const router = useRouter();

const defaultImage =
  "https://tse2.mm.bing.net/th/id/OIP.b8bpZyFwupiioDofQPXo_gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3";

const reportStore = useReportStore();

const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const modules = [FreeMode, Navigation, Thumbs];
const loadReport = async (id) => {
  try {
    await Promise.all([
      reportStore.getReportById(id),
      reportStore.getMatchReportByid(id),
    ]);
    console.log(reportStore.report);
    console.log(reportStore.matchReports);
  } catch (error) {
    console.error(error);
  }
};

// first load
onMounted(async () => {
  try {
    await loadReport(route.params.id);
  } catch (error) {
    console.error(error);
  }
});

watch(
  () => route.params.id,
  (newId) => {
    if (newId) loadReport(newId);
  },
);

const reportTypeClass = computed(() => {
  const type = reportStore.report?.reportType?.name;
  return typeof type === "string" ? type.toLowerCase() : "";
});

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push({ name: "own-reports" });
  }
};

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
/*swiper*/
.slider-wrapper {
  width: 100%;
  max-width: 100%;
}

.mySwiper2 {
  width: 100%;
}

.mySwiper {
  width: 100%;
  padding: 5px;
}

.mySwiper img {
  width: 100%;
  height: 80px;
  object-fit: contain;
  /* border-radius: 10px; */
  /* border: 1px solid black; */
}

.mySwiper img:hover {
  /* border: 1px solid red; */
  cursor: pointer;
}

.mySwiper2 img {
  width: 100%;
  height: 350px;
  object-fit: contain;
  border-radius: 12px;
}

/* Custom tweaks to match your screenshot exactly */

.image {
  width: 100%;
  height: 550px;
}

.image img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

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
  z-index: 2;
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
  object-fit: contain;
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

.recommendation-image {
  width: 100%;
  height: 230px;
}

.recommendation-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

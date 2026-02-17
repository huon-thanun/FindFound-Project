<template>
  <div>
    <section class="hero-section">
      <div class="hero-bg"></div>

      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>

      <div class="container position-relative">
        <div class="row align-items-center pt-5 g-5 py-lg-6">
          <!-- Text Column -->
          <div class="col-lg-7 py-5 px-5 m-0 hero-text-col" data-aos="fade-right">
            <div class="badge-modern mb-4">
              <i class="bi bi-flag-fill me-2"></i>
              រាយការណ៍ពីបញ្ហា
            </div>
            <h1 class="hero-title">
              រាយការណ៍ <span class="gradient-text">វត្ថុបាត់</span>
              <br class="d-none d-md-block" />
              ឬរកឃើញនៅលើគេហទំព័រ
            </h1>
            <p class="hero-subtitle">
              ជួយរក្សាសហគមន៍យើងអោយមានសុវត្ថិភាព។ ប្រសិនបើអ្នកបាត់បង់វត្ថុ ឬរកឃើញវត្ថុអ្វីមួយ
              សូមរាយការណ៍មកយើងខ្ញុំឥឡូវនេះ។
            </p>
          </div>

          <!-- Illustration Column -->
          <div class="col-lg-5 hero-illustration d-flex justify-content-center m-0 p-0" data-aos="fade-left"
            data-aos-delay="200">
            <img
              src="../../../assets/images/report/Flat vector illustration of two people meeting and (2)-Photoroom (1).png"
              alt="Contact Us Illustration" class="hero-img m-0 img-fluid" />
          </div>
        </div>
      </div>
    </section>
    <div class="container py-4">
      <!-- Hero Banner -->
      <div class="d-flex justify-content-between flex-wrap mb-3 align-items-center">
        <div>
          <h2>ការរាយការណ៍</h2>
          <p>រុករក និងមើលវត្ថុបាត់បង់ និងវត្ថុដែលបានរកឃើញទាំងអស់នៅក្នុងសហគមន៍</p>
        </div>

        <BaseButton variant="primary" icon="file-earmark-plus" @click="btnHandleToCreatePage">
          បង្កើតការរាយការណ៍
        </BaseButton>
      </div>
      <div class="card mb-3 shadow border-color">
        <div class="card-body row">
          <div class="col-xxl-12">
            <BaseInput class="w-100" v-model="search" type="text" placeholder="ស្វែងរក ការរាយការណ៍..." />
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
  background-color: var(--primary-color);
  border-radius: 10px;
}

.bg-btn-group .btn-filter {
  background-color: transparent;
  border: none;
  padding: 6px 15px 4px;
  font-size: 16px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.bg-btn-group .btn-filter.active {
  background-color: white;
  color: var(--secondary-color)
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

@import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700;800&display=swap");

.main-contact {
  font-family: "Kantumruy Pro", system-ui, sans-serif;
  background: #fdfaff;
  color: #0f0f0f;
}

/* ── Hero ── */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #f8f2ff 0%, #f0e8ff 50%, #e8deff 100%);
  overflow: hidden;
  border-radius: 0 0 60px 60px;
  /* padding: 100px 0 180px; */
  margin: 0 0 20px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 70%,
      rgba(168, 85, 247, 0.08) 0%,
      transparent 60%);
  pointer-events: none;
}

.floating-shapes .shape {
  position: absolute;
  background: rgba(139, 92, 246, 0.04);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(139, 92, 246, 0.08);
  border-radius: 50%;
  animation: float-slow 80s infinite ease-in-out;
}

.shape-1 {
  width: 420px;
  height: 420px;
  top: -15%;
  left: -20%;
  animation-delay: 0s;
}

.shape-2 {
  width: 560px;
  height: 560px;
  bottom: -25%;
  right: -25%;
  animation-delay: 25s;
  border-radius: 48% 52% 55% 45%;
}

.shape-3 {
  width: 360px;
  height: 360px;
  top: 55%;
  left: -12%;
  animation-delay: 45s;
}

@keyframes float-slow {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  25% {
    transform: translate(60px, -80px) rotate(5deg);
  }

  50% {
    transform: translate(-70px, 90px) rotate(-6deg);
  }

  75% {
    transform: translate(80px, 60px) rotate(4deg);
  }
}

.hero-title {
  font-size: clamp(2.6rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 1.5rem;
}

.gradient-text {
  background: linear-gradient(90deg, #7c3aed, #a78bfa, #c4b5fd);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: clamp(1.15rem, 2.5vw, 1.35rem);
  color: #222;
  max-width: 580px;
  line-height: 1.7;
  opacity: 0.95;
}

.badge-modern {
  display: inline-flex;
  align-items: center;
  background: rgba(139, 92, 246, 0.14);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(139, 92, 246, 0.24);
  padding: 0.75rem 1.8rem;
  border-radius: 50rem;
  font-weight: 600;
  color: #111;
  font-size: 1.1rem;
}

.hero-img {
  max-width: 100%;
  margin-left: -10%;
  filter: drop-shadow(0 30px 70px rgba(0, 0, 0, 0.16)) brightness(1.03);
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hero-illustration:hover .hero-img {
  transform: scale(1.06) translateY(-15px);
}
</style>

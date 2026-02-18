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
              <i class="bi bi-grid-fill me-2"></i>
              ប្រភេទវត្ថុ
            </div>
            <h1 class="hero-title">
              ជ្រើសរើស <span class="gradient-text">ប្រភេទវត្ថុ</span>
              <br class="d-none d-md-block" />
              ដែលអ្នកចង់រាយការណ៍
            </h1>
            <p class="hero-subtitle">
              យើងមានប្រភេទវត្ថុជាច្រើនសម្រាប់អ្នកជ្រើសរើស។ សូមជ្រើសរើសប្រភេទវត្ថុដែលសមស្រប 
              ដើម្បីជួយសម្រួលដល់ការស្វែងរក។
            </p>
          </div>

          <!-- Illustration Column -->
          <div class="col-lg-5 hero-illustration d-flex justify-content-center m-0 p-0" data-aos="fade-left"
            data-aos-delay="200">
            <img
              src="../../../assets/images/category/category.png"
              alt="Category Selection Illustration" class="hero-img m-0 img-fluid" />
          </div>
        </div>
      </div>
    </section>
    <section class="category-page py-4 bg-light">
        <div class="container py-4">
            <!-- Header Section -->
            <div class="row align-items-center mb-5">
                <div class="col-lg-6 text-center text-lg-start">
                    <h2 class="khmer-font-title fw-bold mb-3">
                        <i class="bi bi-grid-fill me-2"></i> ប្រភេទវត្ថុ
                    </h2>
                    <p class="khmer-font text-muted">
                        រកស្វែងសម្ភារៈបាត់បង់ និងរើសបាននូវទាង់ប្រភេទផ្សេងៗ
                    </p>
                </div>
                <div class="col-lg-6">
                    <!-- <BaseInput v-model="searchQuery" type="text" placeholder="ស្វែងរកប្រភេទ..." /> -->
                    <div class="search-bar-wrapper shadow-sm rounded-pill bg-white d-flex align-items-center position-relative"
                        style="height: 50px;">
                        <i class="bi bi-search text-muted me-2 ms-3"></i>
                        <input type="text" v-model="searchQuery"
                            class="form-control border-0 rounded-pill position-absolute ps-5 bg-transparent h-100 w-100 khmer-font"
                            placeholder="ស្វែងរកប្រភេទវត្ថុ..." />
                    </div>
                </div>
            </div>

            <!-- Categories Grid -->
            <div class="row g-4">
                <!-- Loading State - Skeleton Cards -->
                <template v-if="categoryStore.isLoading">
                    <div v-for="n in 4" :key="`skeleton-${n}`"
                        class="col-lg-3 col-md-4 col-sm-6">
                        <BaseSkeleton imageHeight="150px" />
                    </div>
                </template>

                <!-- Empty State -->
                <div v-else-if="filteredCategories.length === 0" class="col-12">
                    <div class="alert alert-info text-center khmer-font">
                        <i class="bi bi-info-circle me-2"></i>
                        មិនមានប្រភេទដែលត្រូវគ្នាទេ
                    </div>
                </div>

                <!-- Category Cards -->
                <div v-for="category in filteredCategories" v-else :key="category.id"
                    class="col-lg-3 col-md-4 col-sm-6">
                    <BaseReportCard class="category-card h-100">
                        <div class="category-icon-wrapper">
                            <div class="category-icon">
                                <i :class="`bi ${getCategoryIcon(category.name)}`"></i>
                            </div>
                        </div>
                        <div class="category-content">
                            <h5 class="khmer-font-title fw-bold mb-2">
                                {{ category.name }}
                            </h5>
                            <p class="khmer-font text-muted small mb-3">
                                {{ category.description || "គ្មានលម្អិត" }}
                            </p>
                            <div class="d-flex gap-2">
                                <BaseButton variant="primary" class="flex-grow-1" :icon="loadingId === category.id ? '' : 'arrow-right'"
                                    :isLoading="loadingId === category.id"
                                    @click="openModal(category)">
                                    មើលលម្អិត
                                </BaseButton>
                            </div>
                        </div>
                    </BaseReportCard>
                </div>
            </div>
        </div>

        <!-- Category Detail Modal -->
        <BaseModal :title="selectedCategory?.name || 'ព័ត៌មាន'"
            :icon="selectedCategory ? getCategoryIcon(selectedCategory.name).replace('bi-', '') : 'info-circle'"
            :theme="'primary'" :isClose="showModal" @closeModal="closeModal">
            <template #body>
                <div v-if="selectedCategory" class="category-modal-body">
                    <div class="category-description">
                        <h6 class="khmer-font fw-bold mb-3">ព័ត៌មាន</h6>
                        <p class="khmer-font text-muted">
                            {{ selectedCategory.description || "គ្មានលម្អិត" }}
                        </p>
                    </div>
                </div>
            </template>
            <template #btnClose>
                <BaseButton variant="cancel" icon="x-circle" @click="closeModal">
                    បិទ
                </BaseButton>
            </template>
            <!-- <template #btnActive>
                <BaseButton variant="primary" icon="search" class="col-6" @click="navigateToGallery">
                    មើលគ្រប់យ៉ាង
                </BaseButton>
            </template> -->
        </BaseModal>
    </section>
   </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCategoryStore } from "@/stores/categoryStore";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseReportCard from "@/components/base/BaseReportCard.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseSkeleton from "@/components/base/BaseSkeleton.vue";

const router = useRouter();
const categoryStore = useCategoryStore();
const searchQuery = ref("");
const showModal = ref(false);
const selectedCategory = ref(null);
const loadingId = ref(null);

// Fetch categories on mount
onMounted(async () => {
    await categoryStore.fetchCategories();
});

// Filtered categories based on search
const filteredCategories = computed(() => {
    if (!searchQuery.value) {
        return categoryStore.categories;
    }
    return categoryStore.categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const getCategoryIcon = (categoryName) => {
    const iconMap = {
        "ឯកសារ": "bi-file-earmark-text",
        "សម្ភារៈអេឡិចត្រូនិច": "bi-laptop",
        "គ្រឿងអលង្ការ": "bi-gem",
        "កាបូប និងកាបូបលុយ": "bi-handbag",
        "សម្ភារៈកីឡា": "bi-trophy",
        "គ្រឿង និងសម្ភារៈផ្ទះ": "bi-house-door",
        "សុខភាពនិងសម្រស់": "bi-heart-pulse",
        "សម្លៀកបំពាក់": "bi-person-badge",
        "សៀវភៅ និងឯកសារសិក្សា": "bi-book",
        "សត្វចិញ្ចឹម": "bi-heart",
        "សោ និងសម្ភារៈតូចៗ": "bi-key",
        "ឧបករណ៍កីឡា": "bi-bicycle",
        "ផ្សេងៗ": "bi-grid"
    };

    return iconMap[categoryName] || "bi-box";
};

// Open modal with selected category
const openModal = async (category) => {
    loadingId.value = category.id;

    try {
        // simulate delay (optional)
        await new Promise(resolve => setTimeout(resolve, 300));

        selectedCategory.value = category;
        showModal.value = true;
    } finally {
        loadingId.value = null;
    }
};

// Close modal
const closeModal = () => {
    showModal.value = false;
    selectedCategory.value = null;
};

// Navigate to gallery with selected category filter
const navigateToGallery = () => {
    if (selectedCategory.value) {
        closeModal();
        router.push(`/gallery?category=${selectedCategory.value.id}`);
    }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700;800&display=swap");

.ca .form-control {
    outline: none;
    box-shadow: none;
    border: 1px solid #d1d5db;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-control:focus {
    border-color: var(--primary-color);
    /* primary */
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
    outline: none;
}

/* .category-page {
    min-height: 100vh; */
    /* background: linear-gradient(135deg, #eaddf3 0%, #f5e6fb 100%); */
/* } */

.category-card {
    background: var(--surface-color);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1px solid var(--border);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
}

.category-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(59, 30, 84, 0.15);
    border-color: var(--primary-color);
}

.category-icon-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.category-icon {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    background: linear-gradient(135deg, #3b1e54 0%, #9b7ebd 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 36px;
    box-shadow: 0 4px 16px rgba(59, 30, 84, 0.2);
}

.category-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
}

.category-card h5 {
    color: var(--text-Primary);
    margin-bottom: 12px;
    font-size: 16px;
}

.search-bar-wrapper {
    border: 1px solid var(--tertiary-color);
}

.category-card p {
    color: var(--text-Secondary);
    font-size: 13px;
    min-height: 40px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .category-card {
        padding: 16px;
    }

    .category-icon {
        width: 60px;
        height: 60px;
        font-size: 28px;
    }

    .category-card h5 {
        font-size: 14px;
    }

    .category-card p {
        font-size: 12px;
    }
}

@media (max-width: 576px) {
    .khmer-font-title {
        font-size: 24px;
    }

    .search-bar-wrapper {
        margin-top: 16px;
    }
}

/* Modal Styles */
.category-modal-body {
    text-align: left;
    padding: 16px 0;
}

.category-description {
    background-color: rgba(59, 30, 84, 0.05);
    border-left: 4px solid var(--primary-color);
    padding: 16px;
    border-radius: 8px;
}

.category-description h6 {
    color: var(--primary-color);
    font-size: 14px;
}

.category-description p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
}


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
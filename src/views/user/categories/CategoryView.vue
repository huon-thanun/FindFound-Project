<template>
    <section class="category-page py-5 bg-light">
        <div class="container py-4">
            <!-- Header Section -->
            <div class="row align-items-center mb-5">
                <div class="col-lg-6 text-center text-lg-start">
                    <h2 class="khmer-font-title fw-bold mb-2">
                        ប្រភេទសម្ភារៈ
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
                            placeholder="ស្វែងរកប្រភេទ..." />
                    </div>
                </div>
            </div>

            <!-- Categories Grid -->
            <div class="row g-4">
                <!-- Loading State - Skeleton Cards -->
                <div v-if="categoryStore.isLoading" v-for="n in 4" :key="`skeleton-${n}`"
                    class="col-lg-3 col-md-4 col-sm-6">
                    <BaseSkeleton imageHeight="150px" />
                </div>

                <!-- Empty State -->
                <div v-else-if="filteredCategories.length === 0" class="col-12">
                    <div class="alert alert-info text-center khmer-font">
                        <i class="bi bi-info-circle me-2"></i>
                        មិនមានប្រភេទដែលត្រូវគ្នាទេ
                    </div>
                </div>

                <!-- Category Cards -->
                <div v-else v-for="category in filteredCategories" :key="category.id"
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

// Map category names to appropriate icons
const getCategoryIcon = (categoryName) => {
    const iconMap = {
        ឯកសារ: "bi-file-earmark",
        សម្ភារៈអេឡិចត្រូនិច: "bi-phone",
        អលង្ការ: "bi-gem",
        ម៉ាកផ្សេងទៀត: "bi-bag",
        សក្ខី: "bi-wallet2",
        កីឡា: "bi-bicycle",
        សៀវភៅ: "bi-book",
        សូត្របាច់: "bi-shopper",
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
</style>
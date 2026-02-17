<script setup>
import { ref, onMounted, watch, computed, reactive } from "vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { formatDate } from '@/utils/formatDate';
import BaseToast from "@/components/base/BaseToast.vue";

const categoryStore = useCategoryStore();

const search = ref("");
let timeout = null;
const isLoading = ref(false);
const categories = computed(() => categoryStore.categories);
const total = computed(() => categoryStore.total);
const meta = computed(() => categoryStore.meta);

// Toast configuration
const showToast = ref(false);
const toastMessage = ref('');
const toastTheme = ref('success');
const toastIcon = ref('check-circle');

const filters = {
    page: ref(1),
    perPage: ref(10),
    sortBy: ref(null),
    sortDir: ref(null),
};

const shownCount = computed(() => {
    return Math.min(filters.page.value * filters.perPage.value, total.value);
});

const showSuccess = (message) => {
    toastMessage.value = message;
    toastTheme.value = 'success';
    toastIcon.value = 'check-circle';
    showToast.value = true;
};

const showFieldError = (message) => {
    toastMessage.value = message;
    toastTheme.value = 'danger';
    toastIcon.value = 'x-circle';
    showToast.value = true;
};

const columns = [
    { key: "id", label: "ល.រ" },
    { key: "name", label: "ប្រភេទ" },
    { key: 'description', label: 'ការពិពណ៌នា' },
    { key: 'createdAt', label: 'ថ្ងៃបង្កើត' },
];

const SORT_BY_OPTIONS = [
    { id: "id", name: "ល.រ" },
    { id: "name", name: "ប្រភេទ" },
    { id: "createdAt", name: "ថ្ងៃបង្កើត" },
];

const SORT_DIR_OPTIONS = [
    { id: "ASC", name: "ចាស់បំផុត" },
    { id: "DESC", name: "ថ្មីបំផុត" },
];

// ===== Validation =====
const errors = reactive({
    create: {
        name: "",
        description: "",
    },
    edit: {
        name: "",
        description: "",
    },
});

const validateCreate = () => {
    errors.create.name = "";
    errors.create.description = "";

    if (!newCategoryName.value.trim()) {
        errors.create.name = "សូមបញ្ចូលឈ្មោះប្រភេទ";
    }

    if (!newCategoryDescription.value.trim()) {
        errors.create.description = "សូមបញ្ចូលការពិពណ៌នា";
    }

    return !errors.create.name && !errors.create.description;
};

const validateEdit = () => {
    errors.edit.name = "";
    errors.edit.description = "";

    if (!editName.value.trim()) {
        errors.edit.name = "សូមបញ្ចូលឈ្មោះប្រភេទ";
    }

    if (!editDescription.value.trim()) {
        errors.edit.description = "សូមបញ្ចូលការពិពណ៌នា";
    }

    return !errors.edit.name && !errors.edit.description;
};


const fetchCategories = async () => {
    try {
        isLoading.value = true;

        await categoryStore.fetchCategories({
            page: filters.page.value,
            perPage: filters.perPage.value,
            search: search.value,
            sortBy: filters.sortBy.value?.id,
            sortDir: filters.sortDir.value?.id,
        });
    } catch (err) {
        throw err;
    } finally {
        isLoading.value = false;
    }
};

onMounted(async () => await fetchCategories());

watch(search, () => {
    filters.page.value = 1;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
        await fetchCategories();
    }, 500);
});

watch([() => filters.sortBy.value, () => filters.sortDir.value], async () => {
    filters.page.value = 1;
    await fetchCategories();
});

// ================= DELETE =================
const showDeleteModal = ref(false);
const selectedCategoryId = ref(null);

const openDeleteModal = (id) => {
    selectedCategoryId.value = id;
    showDeleteModal.value = true;
};

const confirmDelete = async () => {
    if (!selectedCategoryId.value) return

    try {
        isLoading.value = true
        await categoryStore.deleteCategory(selectedCategoryId.value)

        showDeleteModal.value = false
        selectedCategoryId.value = null
        showSuccess(`បានលុបប្រភេទវត្ថុដោយជោគជ័យ`);
        await fetchCategories();
    } catch (err) {
        let errorMsg = '';
        if (err.response?.data?.message) {
            errorMsg = err.response.data.message;
        } else if (err.response?.data?.errors) {
            const errors = err.response.data.errors;
            if (typeof errors === 'object') {
                errorMsg = Object.entries(errors)
                    .map(([field, msgs]) => {
                        const messages = Array.isArray(msgs) ? msgs.join(', ') : msgs;
                        return `${field}: ${messages}`;
                    })
                    .join(' | ');
            } else {
                errorMsg = String(errors);
            }
        } else if (err.message) {
            errorMsg = err.message;
        };
        showFieldError(`បរាជ័យក្នុងការលុបប្រភេទវត្ថុ, ${errorMsg ? `${errorMsg}` : ''}, សូមព្យាយាមម្តងទៀត`);
        throw err
    } finally {
        isLoading.value = false
    }
};

// ================= EDIT =================
const showEditModal = ref(false);
const selectedCategory = ref(null);
const editName = ref("");
const editDescription = ref("");

const openEditModal = (id) => {
    const category = categories.value.find((c) => c.id === id);
    if (category) {
        selectedCategory.value = category;
        editName.value = category.name;
        editDescription.value = category.description;
        showEditModal.value = true;
    }
};

const confirmEdit = async () => {
    // if (!selectedCategory.value || !editName.value || !editDescription.value) return;
    if (!validateEdit()) return

    try {
        isLoading.value = true;
        // send payload to backend
        await categoryStore.updateCategory(selectedCategory.value.id, { name: editName.value, description: editDescription.value })

        showEditModal.value = false;
        editName.value = "";
        editDescription.value = "";
        showSuccess(`បានធ្វើបច្ចុប្បន្នភាពប្រភេទវត្ថុដោយជោគជ័យ`);
        await fetchCategories();
    } catch (err) {
        let errorMsg = '';
        if (err.response?.data?.message) {
            errorMsg = err.response.data.message;
        } else if (err.response?.data?.errors) {
            const errors = err.response.data.errors;
            if (typeof errors === 'object') {
                errorMsg = Object.entries(errors)
                    .map(([field, msgs]) => {
                        const messages = Array.isArray(msgs) ? msgs.join(', ') : msgs;
                        return `${field}: ${messages}`;
                    })
                    .join(' | ');
            } else {
                errorMsg = String(errors);
            }
        } else if (err.message) {
            errorMsg = err.message;
        };
        showFieldError(`បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពប្រភេទវត្ថុ, ${errorMsg ? `${errorMsg}` : ''}, សូមព្យាយាមម្តងទៀត`);
        throw err
    } finally {
        isLoading.value = false;
    }
};

// ================= CREATE =================
const showCreateModal = ref(false);
const newCategoryName = ref("");
const newCategoryDescription = ref("");

const openCreateModal = () => {
    newCategoryName.value = "";
    newCategoryDescription.value = "";
    showCreateModal.value = true;
};

const confirmCreate = async () => {
    // if (!newCategoryName.value.trim() || !newCategoryDescription.value.trim()) return;
    if (!validateCreate()) return
    try {
        isLoading.value = true;
        // send payload to backend
        const res = await categoryStore.createCategory({
            name: newCategoryName.value,
            description: newCategoryDescription.value,
        });

        if (res.result) {
            showCreateModal.value = false;
            newCategoryName.value = "";
            newCategoryDescription.value = "";
            showSuccess(`បង្កើតប្រភេទវត្ថុដោយជោគជ័យ`);
            await fetchCategories();
        }

    } catch (err) {
        let errorMsg = '';
        if (err.response?.data?.message) {
            errorMsg = err.response.data.message;
        } else if (err.response?.data?.errors) {
            const errors = err.response.data.errors;
            if (typeof errors === 'object') {
                errorMsg = Object.entries(errors)
                    .map(([field, msgs]) => {
                        const messages = Array.isArray(msgs) ? msgs.join(', ') : msgs;
                        return `${field}: ${messages}`;
                    })
                    .join(' | ');
            } else {
                errorMsg = String(errors);
            }
        } else if (err.message) {
            errorMsg = err.message;
        }
        showFieldError(`បរាជ័យក្នុងការបង្កើតប្រភេទវត្ថុ, ${errorMsg ? ` ${errorMsg}` : ''}, សូមព្យាយាមម្តងទៀត`);
        throw err
    } finally {
        isLoading.value = false
    }
};


//detail
const showDetailModal = ref(false);
const selectedCategoryDetail = ref(null);

const openDetailModal = (category) => {
    selectedCategoryDetail.value = category;
    showDetailModal.value = true;
};

// Clear Filter
const clearFilter = () => {
    search.value = "";
    filters.sortBy.value = null;
    filters.sortDir.value = null;
    filters.page.value = 1;
    fetchCategories();
};

// Pagination
const nextPage = async () => {
    if (!meta.value?.hasNextPage) return;

    filters.page.value++;
    await fetchCategories();
};

const previousPage = async () => {
    if (filters.page.value === 1) return;

    filters.page.value--;
    await fetchCategories();
};

</script>

<template>
    <div class="p-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
                <h2 class="fw-bold">ប្រភេទវត្ថុ</h2>
                <p class="text-muted">បង្កើត និងគ្រប់គ្រងប្រភេទនៃរបាយការណ៍ផ្សេងៗ</p>
            </div>
            <BaseButton variant="primary" @click="openCreateModal" icon="plus-circle">
                បង្កើតប្រភេទថ្មី
            </BaseButton>
        </div>

        <div class="card mb-3 shadow border-color">
            <div class="card-body row">

                <!-- Search -->
                <div class="col-xxl-12">
                    <BaseInput class="" v-model="search" placeholder="ស្វែងរកតាមប្រភេទ​វត្ថុ និងការពិពណ៌នា..." />
                </div>

                <div class="col-xxl-8 mt-2">
                    <div class="row">

                        <!-- Sort By -->
                        <div class="col-lg-6 col-xxl-3" style="flex-wrap: nowrap;">
                            <BaseSelect v-model="filters.sortBy.value" :items="SORT_BY_OPTIONS" labelField="name"
                                valueField="id" textField="តម្រៀបតាម" class="text-nowrap" />
                        </div>

                        <!-- Sort Direction -->
                        <div class="col-lg-6 col-xxl-4" style="flex-wrap: nowrap;">
                            <BaseSelect v-model="filters.sortDir.value" :items="SORT_DIR_OPTIONS" labelField="name"
                                valueField="id" textField="ទិសដៅតម្រៀប" class="text-nowrap" />
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

        <div v-if="isLoading" class="loading-full" style="height: 50vh;">
            <div class="custom-loader"></div>
            <p class="mt-4 khmer-font text-purple-accent">កំពុងផ្ទុកទិន្នន័យ...</p>
        </div>
        <BaseTable v-else :columns="columns" :items="categories" :isLoading="false" @edit="openEditModal"
            @delete="openDeleteModal" @rowClick="openDetailModal" class="shadow mt-4">
            <template #column-id="{ item }">
                #{{ item.id }}
            </template>
            <template #column-description="{ item }">
                {{ item.description.length > 50 ? item.description.slice(0, 50) + '...' : item.description }}
            </template>
            <template #column-createdAt="{ item }">
                {{ formatDate(item.createdAt) }}
            </template>
            <template #column-updatedAt="{ item }">
                {{ formatDate(item.updatedAt) }}
            </template>
        </BaseTable>

        <div class="mt-3 text-muted">
            <p class="text-muted mb-0">
                ស្ថិតិ:
                បង្ហាញ
                <strong class="text-dark">{{ shownCount }}</strong>
                នៃ
                <strong class="text-dark">{{ total }}</strong>
                ប្រភេទ
            </p>
        </div>

        <div class="card-footer text-center">
            <div class="d-flex gap-2 justify-content-center my-3">
                <BaseButton class="pointer" variant="danger" @click="previousPage"
                    :isDisabled="filters.page.value === 1">
                    មុន
                </BaseButton>

                <BaseButton class="pointer" variant="primary" @click="nextPage" :isDisabled="!meta?.hasNextPage">
                    បន្ទាប់
                </BaseButton>
            </div>
        </div>

        <!-- DELETE MODAL -->
        <BaseModal :isClose="showDeleteModal" theme="danger" title="បញ្ជាក់ការលុប" @closeModal="showDeleteModal = false"
            icon="exclamation-triangle">
            <template #body>
                <p>តើអ្នកប្រាកដថាចង់លុបប្រភេទនេះទេ?</p>
            </template>
            <template #btnClose>
                <BaseButton variant="cancel" @click="showDeleteModal = false" icon="x-circle">
                    បោះបង់
                </BaseButton>
            </template>
            <template #btnActive>
                <BaseButton variant="danger" :isLoading="isLoading" @click="confirmDelete" icon="check-circle">
                    លុប
                </BaseButton>
            </template>
        </BaseModal>

        <!-- EDIT MODAL -->
        <BaseModal :isClose="showEditModal" theme="warning" title="កែសម្រួល​ប្រភេទនៃរបាយការណ៌"
            @closeModal="showEditModal = false" icon="pencil-square">
            <template #body>
                <BaseInput v-model="editName" label="ឈ្មោះប្រភេទ" unOptional placeholder="បញ្ចូលឈ្មោះប្រភេទ"
                    :error="errors.edit.name" />
                <BaseInput v-model="editDescription" label="ការពិពណ៌នា" unOptional placeholder="បញ្ចូលការពិពណ៌នា"
                    :error="errors.edit.description" />
            </template>
            <template #btnClose>
                <BaseButton variant="cancel" @click="showEditModal = false" icon="x-circle">
                    បោះបង់
                </BaseButton>
            </template>
            <template #btnActive>
                <BaseButton variant="primary" :isLoading="isLoading" @click="confirmEdit" :icon="isLoading ? '' : 'check-circle'">
                    រក្សាទុក
                </BaseButton>
            </template>
        </BaseModal>

        <!-- CREATE MODAL -->
        <BaseModal :isClose="showCreateModal" theme="primary" title="បង្កើតប្រភេទថ្មី"
            @closeModal="showCreateModal = false" icon="plus-circle">
            <template #body>
                <BaseInput v-model="newCategoryName" label="ឈ្មោះប្រភេទ" unOptional placeholder="បញ្ចូលឈ្មោះប្រភេទ"
                    :error="errors.create.name" />
                <BaseInput v-model="newCategoryDescription" label="ការពិពណ៌នា" unOptional placeholder="បញ្ចូលការពិពណ៌នា"
                    :error="errors.create.description" />
            </template>

            <template #btnClose>
                <BaseButton variant="cancel" @click="showCreateModal = false" icon="x-circle">
                    បោះបង់
                </BaseButton>
            </template>
            <template #btnActive>
                <BaseButton variant="primary" :isLoading="isLoading" @click="confirmCreate"
                    :icon="isLoading ? '' : 'check-circle'">
                    បង្កើត
                </BaseButton>
            </template>
        </BaseModal>

        <!-- DETAIL MODAL -->
        <BaseModal :isClose="showDetailModal" title="ព័ត៌មានលម្អិតអំពីប្រភេទ" icon="info-circle" theme="primary"
            @closeModal="showDetailModal = false">
            <template #body>
                <div v-if="selectedCategoryDetail" class="category-modal-body">
                    <div class="category-description">
                        <p><strong class="text-dark">ល.រ:</strong> #{{ selectedCategoryDetail.id }}</p>
                        <p><strong class="text-dark">ប្រភេទ:</strong><span class="badge bg-success ms-2 fw-normal"> {{
                            selectedCategoryDetail.name }}</span></p>
                        <p><strong class="text-dark">ការពិពណ៌នា:</strong> {{ selectedCategoryDetail.description }}</p>
                        <p><strong class="text-dark">បានបង្កើតនៅ:</strong> {{
                            formatDate(selectedCategoryDetail.createdAt)
                            }}</p>
                        <p><strong class="text-dark">បានធ្វើបច្ចុប្បន្នភាពនៅ:</strong> {{
                            formatDate(selectedCategoryDetail.updatedAt) }}</p>
                    </div>
                </div>
            </template>

            <template #btnActive>
                <BaseButton variant="primary" @click="showDetailModal = false" icon="x-circle">
                    បិទ
                </BaseButton>
            </template>
        </BaseModal>

        <!-- Toast Notification -->
        <BaseToast v-model="showToast" :message="toastMessage" :theme="toastTheme" :icon="toastIcon" :duration="3000" />
    </div>
</template>

<style scoped>
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

.border-color {
    border-color: var(--tertiary-color);
}

/* Default (LG and up) */
.filter-row>div {
    flex: 1;
}

.filter-col>div {
    flex: 1;
}


/* SM screens */
@media (max-width: 767.98px) {
    .filter-row {
        flex-direction: column;
    }

    .filter-column {
        flex-direction: row;
    }

    .filter-search,
    .filter-clear {
        width: 100%;
    }

    .filter-sort {
        width: 50%;
        flex: 1;
    }

}
</style>
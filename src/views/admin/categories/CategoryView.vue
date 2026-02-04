<script setup>
import { ref, onMounted, watch } from "vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { formatDate } from '@/utils/formatDate';

const categoryStore = useCategoryStore();

const search = ref("");
let timeout = null;
const isLoading = ref(false);
const categories = ref([])
const successMessage = ref('');
const errorMessage = ref('');

const gettoken = localStorage.getItem('token')

const columns = [
    { key: "id", label: "ល.រ" },
    { key: "name", label: "ប្រភេទ" },
    { key: 'description', label: 'ការពិពណ៌នា' },
    { key: 'createdAt', label: 'ថ្ងៃបង្កើត' },
    // { key: 'updatedAt', label: 'UpdatedAt' }
];

const showSuccess = (message) => {
    successMessage.value = message;
    setTimeout(() => {
        successMessage.value = '';
    }, 3000);
};
const showFieldError = (message) => {
    errorMessage.value = message;
    setTimeout(() => {
        errorMessage.value = '';
    }, 3000);
};

const sortBy = ref(null);
const sortDir = ref(null);

const SORT_BY_OPTIONS = [
    { id: "id", name: "ល.រ" },
    { id: "name", name: "ប្រភេទ" },
    { id: "createdAt", name: "ថ្ងៃបង្កើត" },
];

const SORT_DIR_OPTIONS = [
    { id: "ASC", name: "តូចទៅធំ" },
    { id: "DESC", name: "ធំទៅតូច" },
];

// ===== Validation =====
const errors = ref({
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
    errors.value.create.name = "";
    errors.value.create.description = "";

    if (!newCategoryName.value.trim()) {
        errors.value.create.name = "សូមបញ្ចូលឈ្មោះប្រភេទ";
    }

    if (!newCategoryDescription.value.trim()) {
        errors.value.create.description = "សូមបញ្ចូលការពិពណ៌នា";
    }

    return !errors.value.create.name && !errors.value.create.description;
};

const validateEdit = () => {
    errors.value.edit.name = "";
    errors.value.edit.description = "";

    if (!editName.value.trim()) {
        errors.value.edit.name = "សូមបញ្ចូលឈ្មោះប្រភេទ";
    }

    if (!editDescription.value.trim()) {
        errors.value.edit.description = "សូមបញ្ចូលការពិពណ៌នា";
    }

    return !errors.value.edit.name && !errors.value.edit.description;
};


const fetchCategories = async () => {
    try {
        isLoading.value = true;

        await categoryStore.fetchCategories({
            search: search.value,
            sortBy: sortBy.value?.id,
            sortDir: sortDir.value?.id,
        });

        categories.value = categoryStore.categories;
    } catch (err) {
        throw err;
    } finally {
        isLoading.value = false;
    }
};

onMounted(async () => await fetchCategories());

watch(search, () => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
        await fetchCategories();
    }, 500);
});

watch([sortBy, sortDir], async () => {
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
        categories.value = categories.value.filter(c => c.id !== selectedCategoryId.value);

        showDeleteModal.value = false
        selectedCategoryId.value = null
        showSuccess(`បានលុបប្រភេទរបាយការណ៍ដោយជោគជ័យ`);
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
        showFieldError(`បរាជ័យក្នុងការលុបប្រភេទរបាយការណ៍, ${errorMsg ? `${errorMsg}` : ''}, សូមព្យាយាមម្តងទៀត`);
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

        const index = categories.value.findIndex(c => c.id === selectedCategory.value.id);
        if (index !== -1) {
            categories.value[index] = { ...categories.value[index], name: editName.value, description: editDescription.value };
        }

        showEditModal.value = false;
        editName.value = "";
        editDescription.value = "";
        showSuccess(`បានធ្វើបច្ចុប្បន្នភាពប្រភេទរបាយការណ៍ដោយជោគជ័យ`);
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
        showFieldError(`បរាជ័យក្នុងការធ្វើបច្ចុប្បន្នភាពប្រភេទរបាយការណ៍, ${errorMsg ? `${errorMsg}` : ''}, សូមព្យាយាមម្តងទៀត`);
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
            categories.value = [...categories.value, res.data];
            showCreateModal.value = false;
            newCategoryName.value = "";
            newCategoryDescription.value = "";
            showSuccess(`បង្កើតប្រភេទរបាយការណ៍ដោយជោគជ័យ`);
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
        showFieldError(`បរាជ័យក្នុងការបង្កើតប្រភេទរបាយការណ៍, ${errorMsg ? ` ${errorMsg}` : ''}, សូមព្យាយាមម្តងទៀត`);
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
    sortBy.value = "";
    sortDir.value = "";
};

</script>

<template>
    <div class="p-3">

        <!-- Success Alert -->
        <div v-if="successMessage" class="alert alert-success alert-dismissible fade show mb-4" role="alert">
            {{ successMessage }}
            <button type="button" class="btn-close" @click="successMessage = ''"></button>
        </div>

        <!-- Error Alert -->
        <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show mb-4" role="alert">
            {{ errorMessage }}
            <button type="button" class="btn-close" @click="errorMessage = ''"></button>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
                <h2 class="fw-bold">ប្រភេទរបាយការណ៍</h2>
                <p class="text-muted">បង្កើត និងគ្រប់គ្រងប្រភេទនៃរបាយការណ៍ផ្សេងៗ</p>
            </div>
            <BaseButton class="d-none d-md-block" variant="primary" @click="openCreateModal" icon="plus-circle">
                បង្កើតប្រភេទថ្មី
            </BaseButton>
            <BaseButton class="d-block d-md-none d-flex" variant="primary" @click="openCreateModal" icon="plus-circle">
                បង្កើត
            </BaseButton>
        </div>

        <div class="card mb-3 shadow">
            <!-- <div class=""> -->
            <div class="card-body d-flex gap-3 align-items-start filter-row">

                <!-- Search -->
                <div class="filter-search w-100">
                    <!-- <BaseInput class="d-block d-lg-none" v-model="search" placeholder="ស្វែងរកតាមប្រភេទ​ និងការពិពណ៌នា..." /> -->
                    <BaseInput class="d-block d-md-none d-xl-block" v-model="search"
                        placeholder="ស្វែងរកតាមប្រភេទ​ និងការពិពណ៌នា..." />
                    <BaseInput class="d-none d-md-block d-xl-none" v-model="search" placeholder="ស្វែងរក..." />
                </div>

                <div class="d-flex gap-3 filter-column w-100">
                    <!-- Sort By -->
                    <div class="mt-sm-0 mt-md-2 p-0 filter-sort">
                        <BaseSelect v-model="sortBy" :items="SORT_BY_OPTIONS" labelField="name" valueField="id"
                            textField="តម្រៀបតាម" class="text-nowrap" />
                    </div>
                    <!-- Sort Direction -->
                    <div class="mt-sm-0 mt-md-2 p-0 filter-sort">
                        <BaseSelect v-model="sortDir" :items="SORT_DIR_OPTIONS" labelField="name" valueField="id"
                            textField="ទិសដៅតម្រៀប" class="text-nowrap" />
                    </div>
                </div>

                <!-- CLEAR FILTER -->
                <div class="mt-sm-0 mt-md-1 mt-lg-2 p-0 d-flex justify-content-end filter-clear">
                    <BaseButton variant="outline_primary" icon="stars" @click="clearFilter">
                        សម្អាតការតម្រៀប
                    </BaseButton>
                </div>
            </div>
            <!-- </div> -->

        </div>

        <BaseTable :columns="columns" :items="categories" :isLoading="isLoading" @edit="openEditModal"
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

        <!-- Category Count -->
        <div class="mt-3 text-muted">
            <p class="mb-0">ស្ថិតិ: សរុបប្រភេទ <strong class="text-dark">{{ categories.length }}</strong> ប្រភេទ</p>
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
                <BaseInput v-model="editName" label="ឈ្មោះប្រភេទ" placeholder="បញ្ចូលឈ្មោះប្រភេទ"
                    :error="errors.edit.name" />
                <BaseInput v-model="editDescription" label="ការពិពណ៌នា" placeholder="បញ្ចូលការពិពណ៌នា"
                    :error="errors.edit.description" />
            </template>
            <template #btnClose>
                <BaseButton variant="cancel" @click="showEditModal = false" icon="x-circle">
                    បោះបង់
                </BaseButton>
            </template>
            <template #btnActive>
                <BaseButton variant="primary" :isLoading="isLoading" @click="confirmEdit" icon="check-circle">
                    រក្សាទុក
                </BaseButton>
            </template>
        </BaseModal>

        <!-- CREATE MODAL -->
        <BaseModal :isClose="showCreateModal" theme="success" title="បង្កើតប្រភេទថ្មី"
            @closeModal="showCreateModal = false" icon="plus-circle">
            <template #body>
                <BaseInput v-model="newCategoryName" label="ឈ្មោះប្រភេទ" placeholder="បញ្ចូលឈ្មោះប្រភេទ"
                    :error="errors.create.name" />
                <BaseInput v-model="newCategoryDescription" label="ការពិពណ៌នា" placeholder="បញ្ចូលការពិពណ៌នា"
                    :error="errors.create.description" />
            </template>

            <template #btnClose>
                <BaseButton variant="cancel" @click="showCreateModal = false" icon="x-circle">
                    បោះបង់
                </BaseButton>
            </template>
            <template #btnActive>
                <BaseButton variant="primary" :isLoading="isLoading" @click="confirmCreate" icon="check-circle">
                    បង្កើត
                </BaseButton>
            </template>
        </BaseModal>

        <!-- DETAIL MODAL -->
        <BaseModal :isClose="showDetailModal" title="ព័ត៌មានលម្អិតអំពីប្រភេទ" icon="info-circle" theme="primary"
            @closeModal="showDetailModal = false">
            <template #body>
                <div v-if="selectedCategoryDetail" class="text-start">
                    <p><strong class="text-dark">ល.រ:</strong> #{{ selectedCategoryDetail.id }}</p>
                    <p><strong class="text-dark">ប្រភេទ:</strong><span class="badge bg-success ms-2 fw-normal"> {{
                        selectedCategoryDetail.name }}</span></p>
                    <p><strong class="text-dark">ការពិពណ៌នា:</strong> {{ selectedCategoryDetail.description }}</p>
                    <p><strong class="text-dark">បានបង្កើតនៅ:</strong> {{ formatDate(selectedCategoryDetail.createdAt)
                        }}</p>
                    <p><strong class="text-dark">បានធ្វើបច្ចុប្បន្នភាពនៅ:</strong> {{
                        formatDate(selectedCategoryDetail.updatedAt) }}</p>
                </div>
            </template>

            <template #btnActive>
                <BaseButton variant="primary" @click="showDetailModal = false" icon="x-circle">
                    បិទ
                </BaseButton>
            </template>
        </BaseModal>
    </div>
</template>

<style scoped>
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
<script setup>
import { ref, onMounted, watch } from "vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { formatDate } from '@/utils/formatDate';

const categoryStore = useCategoryStore();

const search = ref("");
let timeout = null;
const isLoading = ref(false);
const categories = ref([])

const gettoken = localStorage.getItem('token')

const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Category Name" },
    { key: 'description', label: 'Description' },
    { key: 'createdAt', label: 'CreatedAt' },
    // { key: 'updatedAt', label: 'UpdatedAt' }
];

const sortBy = ref(null);
const sortDir = ref(null);

const SORT_BY_OPTIONS = [
    { id: "id", name: "ID" },
    { id: "name", name: "Name" },
    { id: "createdAt", name: "Created At" },
];

const SORT_DIR_OPTIONS = [
    { id: "ASC", name: "Ascending" },
    { id: "DESC", name: "Descending" },
];

// const fetchCategories = async () => {
//     try {
//         isLoading.value = true;
//         await categoryStore.fetchCategories({ search: search.value });
//         categories.value = categoryStore.categories;
//     } catch (err) {
//         throw err;
//     } finally {
//         isLoading.value = false;
//     }
// };

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
    } catch (err) {
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
    if (!selectedCategory.value || !editName.value || !editDescription.value) return;

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
    } catch (err) {
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
    if (!newCategoryName.value.trim() || !newCategoryDescription.value.trim()) return;

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
        }

    } catch (err) {
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

</script>

<template>
    <div class="p-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
                <h2 class="fw-bold">Categories</h2>
                <p class="text-muted">Create and manage categories for different types of Categories</p>
            </div>
            <BaseButton variant="primary" @click="openCreateModal" icon="plus-circle">
                Create category
            </BaseButton>
        </div>

        <div class="card mb-3 shadow">
            <div class="card-body">
                <div class="row g-3 align-items-center">

                    <!-- Search -->
                    <div class="col-12 col-md-6 col-lg-4 mt-2">
                        <BaseInput v-model="search" placeholder="Search category..." />
                    </div>

                    <!-- Sort By -->
                    <div class="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
                        <BaseSelect v-model="sortBy" :items="SORT_BY_OPTIONS" labelField="name" valueField="id"
                            textField="Sort By" />
                    </div> <!-- Sort Direction -->
                    <div class="col-12 col-md-6 col-lg-3 d-flex justify-content-end">
                        <BaseSelect v-model="sortDir" :items="SORT_DIR_OPTIONS" labelField="name" valueField="id"
                            textField="Sort Direction" />
                    </div>


                </div>
            </div>

        </div>

        <BaseTable :columns="columns" :items="categories" :isLoading="isLoading" @edit="openEditModal"
            @delete="openDeleteModal" @rowClick="openDetailModal" class="shadow mt-4">
            <template #column-id="{ item }">
                #{{ item.id }}
            </template>
            <template #column-createdAt="{ item }">
                {{ formatDate(item.createdAt) }}
            </template>
            <template #column-updatedAt="{ item }">
                {{ formatDate(item.updatedAt) }}
            </template>
        </BaseTable>

        <!-- DELETE MODAL -->
        <BaseModal :isClose="showDeleteModal" title="Confirm Delete" @closeModal="showDeleteModal = false"
            icon="exclamation-triangle">
            <template #body>
                <p>Are you sure you want to delete this category?</p>
            </template>
            <template #btnClose>
                <BaseButton variant="cancel" @click="showDeleteModal = false" icon="x-circle">
                    Cancel
                </BaseButton>
            </template>
            <template #btnActive>
                <BaseButton variant="danger" :isLoading="isLoading" @click="confirmDelete" icon="check-circle">
                    Delete
                </BaseButton>
            </template>
        </BaseModal>

        <!-- EDIT MODAL -->
        <BaseModal :isClose="showEditModal" title="Edit Category" @closeModal="showEditModal = false"
            icon="pencil-square">
            <template #body>
                <input v-model="editName" class="form-control mb-3" />
                <input v-model="editDescription" class="form-control" />
            </template>
            <template #btnClose>
                <BaseButton variant="cancel" @click="showEditModal = false" icon="x-circle">
                    Cancel
                </BaseButton>
            </template>
            <template #btnActive>
                <BaseButton variant="primary" :isLoading="isLoading" @click="confirmEdit" icon="check-circle">
                    Save
                </BaseButton>
            </template>
        </BaseModal>

        <!-- CREATE MODAL -->
        <BaseModal :isClose="showCreateModal" title="Create Category" @closeModal="showCreateModal = false"
            icon="plus-circle">
            <template #body>
                <input v-model="newCategoryName" class="form-control mb-3" />
                <input v-model="newCategoryDescription" class="form-control" />
            </template>

            <template #btnClose>
                <BaseButton variant="cancel" @click="showCreateModal = false" icon="x-circle">
                    Cancel
                </BaseButton>
            </template>
            <template #btnActive>
                <BaseButton variant="primary" :isLoading="isLoading" @click="confirmCreate" icon="check-circle">
                    Create
                </BaseButton>
            </template>
        </BaseModal>

        <!-- DETAIL MODAL -->
        <BaseModal :isClose="showDetailModal" title="Category Detail" icon="info-circle" theme="primary"
            @closeModal="showDetailModal = false">
            <template #body>
                <div v-if="selectedCategoryDetail" class="text-start">
                    <p><strong>ID:</strong> {{ selectedCategoryDetail.id }}</p>
                    <p><strong>Name:</strong> {{ selectedCategoryDetail.name }}</p>
                    <p><strong>Description:</strong> {{ selectedCategoryDetail.description }}</p>
                    <p><strong>Created At:</strong> {{ formatDate(selectedCategoryDetail.createdAt) }}</p>
                    <p><strong>UpdatedAt At:</strong> {{ formatDate(selectedCategoryDetail.updatedAt) }}</p>
                </div>
            </template>

            <template #btnActive>
                <BaseButton variant="primary" @click="showDetailModal = false" icon="x-circle">
                    Close
                </BaseButton>
            </template>
        </BaseModal>
    </div>
</template>

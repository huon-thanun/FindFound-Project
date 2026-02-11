import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/api/api";

export const useCategoryStore = defineStore("category", () => {
    const categories = ref([]);
    const isLoading = ref(false);
    const total = ref(0);
    const meta = ref(null);

    const fetchCategories = async (params = {}) => {
        try {
            isLoading.value = true;
            const queryParams = {
                _page: params.page ?? 1,
                _per_page: params.perPage ?? 100,
                sortBy: params.sortBy ?? 'id',
                sortDir: params.sortDir ?? 'ASC',
            };

            // Only send search if it exists
            if (params.search && params.search.trim() !== '') {
                queryParams.search = params.search.trim();
            }

            const res = await api.get("/categories", {
                params: queryParams
            });

            const items = res.data.data?.items || [];
            total.value = res.data.data?.meta?.totalItems ?? 0;
            meta.value = res.data.data?.meta ?? null;

            categories.value = items;
        } catch (err) {
            console.error("Fetch categories error:", err);
        } finally {
            isLoading.value = false;
        }
    };

    const createCategory = async (payload) => {
        // send payload to backend
        const res = await api.post("/categories", {
            name: payload.name,
            description: payload.description,
        });

        return res.data; // contains { result, message, data }
    };

    const updateCategory = async (id, payload) => {
        const res = await api.put(`/categories/${id}`, payload);
        return res.data;
    };

    const deleteCategory = async (id) => {
        const res = await api.delete(`/categories/${id}`);
        return res.data;
    };

    return {
        categories, isLoading, total, meta, fetchCategories, createCategory, updateCategory, deleteCategory
    };
});

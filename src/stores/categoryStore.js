import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/api/api";

export const useCategoryStore = defineStore("category", () => {
    const categories = ref([]);
    const isLoading = ref(false);

    const fetchCategories = async (params = {}) => {
    try {
        isLoading.value = true;
        // Merge default params with any passed in params
        // We set per_page to a higher number like 50 or 100
        const res = await api.get("/categories", { 
            params: { 
                // _page: 1,
                _per_page: 50, // This is the key change
                ...params 
            } 
        });
        categories.value = res.data.data.items;
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
        categories, isLoading, fetchCategories, createCategory, updateCategory, deleteCategory
    };
});

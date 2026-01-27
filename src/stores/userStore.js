import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../api/api";

export const useUserStore = defineStore("user", () => {
  const users = ref([]);
  const total = ref(0);
  const loading = ref(false);

  const fetchUsers = async (params = {}, append = false) => {
    loading.value = true;
    try {
      const queryParams = {
        _page: params.page ?? 1,
        _per_page: params.perPage ?? 10, // always 10 per page
        sortBy: params.sortBy ?? "id",
        sortDir: params.sortDir ?? "ASC",
      };

      // Only send search if it exists
      if (params.search && params.search.trim() !== "") {
        queryParams.search = params.search.trim();
      }

      // Only send status if selected ("" means all)
      if (params.status) {
        queryParams.status = params.status;
      }

      const res = await api.get("/users", { params: queryParams });
      const items = res.data.data.items;
      total.value = res.data.data.total;

      users.value = append ? [...users.value, ...items] : items;
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      loading.value = false;
    }
  };

  const getUser = async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data.data;
  };

  const changeUserStatus = async (id, status) => {
    const res = await api.put(`/users/${id}/status`, { status });
    return res.data.data;
  };

  // ✅ NEW: create user
  const createUser = async (payload) => {
    try {
      const res = await api.post("/users", payload);
      // Refresh list after creating
      await fetchUsers({ page: 1, perPage: 10 });
      return res.data.data;
    } catch (err) {
      console.error("Create user error:", err);
      throw err;
    }
  };

  return {
    users,
    total,
    loading,
    fetchUsers,
    getUser,
    changeUserStatus,
    createUser, // export it
  };
});

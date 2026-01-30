import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../api/api';

export const useUserStore = defineStore('user', () => {
  const users = ref([]);
  const total = ref(0);
  const loading = ref(false);
  const meta = ref(null);

  const fetchUsers = async (params = {}) => {
    loading.value = true;
    try {
      const queryParams = {
        _page: params.page ?? 1,
        _per_page: params.perPage ?? 10,
        sortBy: params.sortBy ?? 'id',
        sortDir: params.sortDir ?? 'ASC',
      };

      // Only send search if it exists
      if (params.search && params.search.trim() !== '') {
        queryParams.search = params.search.trim();
      }

      // Only send status if selected ("" means all)
      if (params.status) {
        queryParams.status = params.status;
      }

      console.log('Fetching users with params:', queryParams);
      const res = await api.get('/users', { params: queryParams });
      console.log('Full API Response:', res.data);

      const items = res.data.data?.items || res.data.data || [];

      // Get total from multiple possible locations
      let totalCount =
        res.data.data?.total ||
        res.data.data?.meta?.totalCount ||
        res.data.data?.meta?.total ||
        res.data?.meta?.totalCount ||
        res.data?.total ||
        items.length;

      total.value = totalCount;
      meta.value = res.data.data?.meta || res.data?.meta || null;

      console.log('Users API Response:', {
        items: items.length,
        total: total.value,
        meta: meta.value,
      });

      users.value = items;
    } catch (err) {
      console.error('Fetch users error:', err);
      console.error('Error details:', err.response?.data);
    } finally {
      loading.value = false;
    }
  };

  const getUser = async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data.data;
  };

  const changeUserStatus = async (id, status) => {
    const res = await api.put(`/users/${id}`, {
      status,
    });
    return res.data.data;
  };

  // ✅ NEW: create user
  const createUser = async (payload) => {
    try {
      console.log('Creating user with payload:', payload);
      const res = await api.post('/users', payload);
      console.log('Create user response:', res.data);
      // Refresh list after creating - use page 1, perPage 10
      await fetchUsers({ page: 1, perPage: 5 });
      return res.data.data;
    } catch (err) {
      console.error('Create user error:', err);
      console.error('Error status:', err.response?.status);
      console.error('Error data:', err.response?.data);
      throw err;
    }
  };

  return {
    users,
    total,
    loading,
    meta,
    fetchUsers,
    getUser,
    changeUserStatus,
    createUser,
  };
});

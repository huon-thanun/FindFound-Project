<template>
  <div>
    <!-- Success Alert -->
    <div
      v-if="successMessage"
      class="alert alert-success alert-dismissible fade show mb-4"
      role="alert"
    >
      {{ successMessage }}
      <button
        type="button"
        class="btn-close"
        @click="successMessage = ''"
      ></button>
    </div>

    <!-- Error Alert -->
    <div
      v-if="errorMessage"
      class="alert alert-danger alert-dismissible fade show mb-4"
      role="alert"
    >
      {{ errorMessage }}
      <button
        type="button"
        class="btn-close"
        @click="errorMessage = ''"
      ></button>
    </div>

    <!-- Header -->
    <div class="d-flex justify-content-between mb-4 align-items-center">
      <div>
        <h3 class="fw-bold">Users</h3>
        <p class="text-muted">Manage system users</p>
      </div>
      <BaseButton
        icon="person-plus"
        variant="primary"
        @click="showCreateModal = true"
      >
        Create User
      </BaseButton>
    </div>

    <!-- Filters -->
    <div class="card mb-3">
      <div class="card-body d-flex gap-3 align-items-start">
        <div style="flex: 1">
          <input
            type="text"
            class="form-control"
            placeholder="Search name or email..."
            v-model="filters.search"
          />
        </div>

        <div class="m-0 p-0" style="flex: 1">
          <BaseSelect
            :modelValue="
              sortOptions.find((o) => o.value === filters.sortBy) || null
            "
            :items="sortOptions"
            labelField="label"
            valueField="value"
            @update:modelValue="
              (item) => (filters.sortBy = item?.value || 'id')
            "
          />
        </div>

        <div style="flex: 1">
          <BaseSelect
            :modelValue="
              statusOptions.find((o) => o.value === filters.status) || null
            "
            :items="statusOptions"
            labelField="label"
            valueField="value"
            @update:modelValue="(item) => (filters.status = item?.value || '')"
          />
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="card">
      <BaseTableUserPage
        :columns="tableColumns"
        :items="users"
        :isLoading="loading"
        @edit="viewUser"
        @delete="openStatus"
      >
        <template #column-id="{ item }"> #{{ item.id }} </template>

        <template #column-fullname="{ item }">
          <div class="d-flex align-items-center gap-2">
            <img
              :src="item.avatar || '/avatar.png'"
              width="40"
              height="40"
              class="rounded-circle"
              alt="avatar"
            />
            <span>{{ item.fullname }}</span>
          </div>
        </template>

        <template #column-role="{ item }">
          {{ item.role?.name || '-' }}
        </template>

        <template #column-status="{ item }">
          <span
            class="badge"
            :class="item.status === 'ACTIVATED' ? 'bg-success' : 'bg-secondary'"
          >
            {{ item.status }}
          </span>
        </template>
      </BaseTableUserPage>

      <div class="card-footer text-center">
        <div class="d-flex gap-2 justify-content-center my-3">
          <BaseButton
            variant="danger"
            @click="previousPage"
            :isDisabled="filters.page === 1"
          >
            Prev
          </BaseButton>

          <BaseButton
            variant="primary"
            @click="nextPage"
            :isDisabled="!meta?.hasNextPage"
          >
            Next
          </BaseButton>
        </div>
        <p class="text-muted">Total: {{ total }} users</p>
      </div>
    </div>

    <!-- VIEW USER MODAL -->
    <BaseModal
      title="User Detail"
      icon="person-circle"
      :theme="'primary'"
      :isClose="showViewModal"
      @closeModal="showViewModal = false"
    >
      <template #body>
        <p><b>ID:</b> {{ selectedUser?.id }}</p>
        <p><b>Name:</b> {{ selectedUser?.fullname }}</p>
        <p><b>Email:</b> {{ selectedUser?.email }}</p>
        <p><b>Phone:</b> {{ selectedUser?.phoneNumber || '-' }}</p>
        <p><b>Status:</b> {{ selectedUser?.status }}</p>
        <p><b>Role:</b> {{ selectedUser?.role?.name }}</p>
        <p><b>Registered:</b> {{ formatDate(selectedUser?.registeredAt) }}</p>
      </template>
      <template #btnClose>
        <BaseButton
          variant="cancel"
          icon="x-circle"
          @click="showViewModal = false"
        >
          Close
        </BaseButton>
      </template>
    </BaseModal>

    <!-- CHANGE STATUS MODAL -->
    <BaseModal
      title="Change Status"
      icon="pencil-square"
      :theme="'warning'"
      :isClose="showStatusModal"
      @closeModal="showStatusModal = false"
    >
      <template #body>
        <p>
          Change status for <b>{{ selectedUser?.fullname }}</b>
        </p>

        <p>
          Current status:
          <span
            class="badge ms-2"
            :class="
              selectedUser?.status === 'ACTIVATED'
                ? 'bg-success'
                : 'bg-secondary'
            "
          >
            {{ selectedUser?.status }}
          </span>
        </p>

        <p>
          New status:
          <span
            class="badge ms-2"
            :class="nextStatus === 'ACTIVATED' ? 'bg-success' : 'bg-secondary'"
          >
            {{ nextStatus }}
          </span>
        </p>
      </template>
      <template #btnClose>
        <BaseButton
          variant="cancel"
          icon="x-circle"
          @click="showStatusModal = false"
        >
          Cancel
        </BaseButton>
      </template>

      <template #btnActive>
        <BaseButton
          icon="check-circle"
          variant="primary"
          @click="confirmChangeStatus"
        >
          Confirm
        </BaseButton>
      </template>
    </BaseModal>

    <!-- CREATE USER MODAL -->
    <BaseModal
      title="Create User"
      icon="person-plus"
      :theme="'success'"
      :isClose="showCreateModal"
      @closeModal="showCreateModal = false"
    >
      <template #body>
        <BaseInput
          type="text"
          label="Full Name"
          placeholder="Enter full name"
          v-model="newUser.fullname"
          :error="errors.fullname"
        />
        <BaseInput
          type="email"
          label="Email"
          placeholder="Enter email address"
          v-model="newUser.email"
          :error="errors.email"
        />
        <BaseInput
          type="tel"
          label="Phone Number"
          placeholder="Enter phone number"
          v-model="newUser.phoneNumber"
        />
        <BaseInput
          type="text"
          label="Telegram Link"
          placeholder="Enter telegram link"
          v-model="newUser.telegramLink"
        />
        <BaseInput
          type="password"
          label="Password"
          placeholder="Enter password"
          v-model="newUser.password"
          :error="errors.password"
        />

        <BaseSelect
          :modelValue="
            roleOptions.find((o) => o.id === newUser.roleId?.id) ||
            newUser.roleId ||
            null
          "
          :items="roleOptions"
          label="Role"
          textField="Select a role"
          labelField="name"
          valueField="id"
          @update:modelValue="(item) => (newUser.roleId = item)"
          :error="errors.roleId"
        />
      </template>

      <template #btnClose>
        <BaseButton
          variant="cancel"
          icon="x-circle"
          @click="showCreateModal = false"
        >
          Cancel
        </BaseButton>
      </template>

      <template #btnActive>
        <BaseButton icon="check-circle" variant="primary" @click="createUser">
          Create
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, watch } from 'vue';
import { useUserStore } from '../../../stores/userStore';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseTableUserPage from '@/components/base/BaseTableUserPage.vue';

const store = useUserStore();

const tableColumns = [
  { key: 'id', label: 'ID' },
  { key: 'fullname', label: 'User' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
];

const filters = reactive({
  page: 1,
  perPage: 10,
  search: '',
  status: '',
  sortBy: 'id',
  sortDir: 'ASC',
});

const users = computed(() => store.users);
const total = computed(() => store.total);
const loading = computed(() => store.loading);
const meta = computed(() => store.meta);

const nextStatus = computed(() => {
  if (!selectedUser.value) return '';
  return selectedUser.value.status === 'ACTIVATED'
    ? 'DEACTIVATED'
    : 'ACTIVATED';
});

const selectedUser = ref(null);
const showViewModal = ref(false);
const showStatusModal = ref(false);
const showCreateModal = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const newUser = reactive({
  fullname: '',
  email: '',
  roleId: null,
  phoneNumber: '',
  telegramLink: '',
  password: '',
  status: 'ACTIVATED',
});

const errors = reactive({
  fullname: '',
  email: '',
  password: '',
  roleId: '',
});

const roleOptions = [
  { id: 1, name: 'ADMIN' },
  { id: 2, name: 'USER' },
];

const sortOptions = [
  { value: 'id', label: 'Sort by ID' },
  { value: 'email', label: 'Sort by Email' },
  { value: 'registeredAt', label: 'Sort by Registered Date' },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'ACTIVATED', label: 'Activated' },
  { value: 'DEACTIVATED', label: 'Deactivated' },
];

const formatDate = (d) => (d ? new Date(d).toLocaleString() : '-');

const showSuccess = (message) => {
  successMessage.value = message;
  setTimeout(() => {
    successMessage.value = '';
  }, 3000);
};

const loadUsers = async () => {
  await store.fetchUsers(filters);
};

const resetAndLoadUsers = () => {
  filters.page = 1;
  loadUsers();
};

const viewUser = async (id) => {
  selectedUser.value = await store.getUser(id);
  showViewModal.value = true;
};

const openStatus = async (id) => {
  selectedUser.value = await store.getUser(id);
  showStatusModal.value = true;
};

const confirmChangeStatus = async () => {
  const newStatus =
    selectedUser.value.status === 'ACTIVATED' ? 'DEACTIVATED' : 'ACTIVATED';

  await store.changeUserStatus(selectedUser.value.id, newStatus);
  selectedUser.value.status = newStatus;
  showStatusModal.value = false;
  showSuccess(`User status changed to ${newStatus} successfully`);
  resetAndLoadUsers();
};

const createUser = async () => {
  // Clear previous errors
  errors.fullname = '';
  errors.email = '';
  errors.password = '';
  errors.roleId = '';

  // Validation
  if (!newUser.fullname.trim()) {
    errors.fullname = 'Full name is required';
  }
  if (!newUser.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(newUser.email)) {
    errors.email = 'Email is invalid';
  }
  if (!newUser.password.trim()) {
    errors.password = 'Password is required';
  } else if (newUser.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!newUser.roleId) {
    errors.roleId = 'Role is required';
  }

  // If there are any errors, stop
  if (errors.fullname || errors.email || errors.password || errors.roleId) {
    return;
  }

  try {
    const payload = {
      fullname: newUser.fullname.trim(),
      email: newUser.email.trim(),
      password: newUser.password.trim(),
      roleId: newUser.roleId?.id || newUser.roleId,
    };

    // Only add optional fields if they have values
    if (newUser.phoneNumber && newUser.phoneNumber.trim()) {
      payload.phoneNumber = newUser.phoneNumber.trim();
    }
    if (newUser.telegramLink && newUser.telegramLink.trim()) {
      payload.telegramLink = newUser.telegramLink.trim();
    }

    console.log('Creating user with payload:', payload);

    await store.createUser(payload);

    showCreateModal.value = false;

    // Reset form
    Object.assign(newUser, {
      fullname: '',
      email: '',
      roleId: null,
      phoneNumber: '',
      telegramLink: '',
      password: '',
      status: 'ACTIVATED',
    });

    showSuccess('User created successfully');
    resetAndLoadUsers();
  } catch (err) {
    console.error('Create user error:', err);
    console.error('Error response:', err.response?.data);

    let errorMsg = 'Failed to create user. Please try again.';

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

    errorMessage.value = errorMsg;
  }
};

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Watch filters for search, status, sort
watch(
  [() => filters.search, () => filters.status, () => filters.sortBy],
  () => {
    filters.page = 1;
    loadUsers();
  },
);

// Pagination
const pagesPerGroup = 4;
const currentGroup = ref(1);

const totalPages = computed(() => {
  if (total.value === 0) return 1;
  return Math.ceil(total.value / filters.perPage);
});

const visiblePages = computed(() => {
  const start = (currentGroup.value - 1) * pagesPerGroup + 1;
  const end = Math.min(start + pagesPerGroup - 1, totalPages.value);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const goToPage = async (p) => {
  if (p === filters.page) return;

  filters.page = p;
  await loadUsers();

  const groupEnd = currentGroup.value * pagesPerGroup;
  if (p === groupEnd && p < totalPages.value) {
    currentGroup.value++;
  }

  const groupStart = (currentGroup.value - 1) * pagesPerGroup + 1;
  if (p === groupStart && p > 1) {
    currentGroup.value--;
  }
};

const nextPage = async () => {
  if (!meta.value?.hasNextPage) return;

  filters.page++;
  await loadUsers();

  const groupEnd = currentGroup.value * pagesPerGroup;
  if (filters.page > groupEnd) {
    currentGroup.value++;
  }
};

const previousPage = async () => {
  if (filters.page === 1) return;

  filters.page--;
  await loadUsers();

  const groupStart = (currentGroup.value - 1) * pagesPerGroup + 1;
  if (filters.page < groupStart) {
    currentGroup.value--;
  }
};

// Load first page on mount
onMounted(() => resetAndLoadUsers());
</script>

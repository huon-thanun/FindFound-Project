<template>
  <div>
    <!-- Header -->
    <div class="d-flex justify-content-between mb-4">
      <div>
        <h3 class="fw-bold">Users</h3>
        <p class="text-muted">Manage system users</p>
      </div>
      <BaseButton icon="person-plus" variant="primary" @click="showCreateModal = true">
        Create User
      </BaseButton>
    </div>

    <!-- Filters -->
    <div class="card mb-3">
      <div class="card-body d-flex gap-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search name or email..."
          v-model="filters.search"
        />

        <select class="form-select" v-model="filters.sortBy">
          <option value="id">Sort by ID</option>
          <option value="email">Sort by Email</option>
          <option value="registeredAt">Sort by Registered Date</option>
        </select>

        <select class="form-select" v-model="filters.status">
          <option value="">All Status</option>
          <option value="ACTIVATED">Activated</option>
          <option value="DEACTIVATED">Deactivated</option>
        </select>
      </div>
    </div>

    <!-- Users Table -->
    <div class="card">
      <table class="table align-middle">
        <thead class="table-light">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th class="text-end">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="loading">
            <td colspan="6" class="text-center">Loading...</td>
          </tr>

          <tr v-for="user in users" :key="user.id">
            <td>#{{ user.id }}</td>
            <td class="d-flex align-items-center gap-2">
              <img :src="user.avatar || '/avatar.png'" width="40" height="40" class="rounded-circle" />
              {{ user.fullname }}
            </td>
            <td>{{ user.email }}</td>
            <td>{{ user.role?.name || "-" }}</td>
            <td>
              <span
                class="badge"
                :class="user.status === 'ACTIVATED' ? 'bg-success' : 'bg-secondary'"
              >
                {{ user.status }}
              </span>
            </td>
            <td class="text-end">
              <BaseButton icon="eye" variant="secondary" size="sm" @click="viewUser(user.id)" />
              <BaseButton icon="pencil" variant="warning" size="sm" @click="openStatus(user)" />
            </td>
          </tr>

          <tr v-if="!loading && users.length === 0">
            <td colspan="6" class="text-center">No users found</td>
          </tr>
        </tbody>
      </table>

      <div class="card-footer text-center">
        <BaseButton
          variant="primary"
          :isDisabled="loading || users.length >= total"
          @click="loadMore"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          View More
        </BaseButton>
        <p class="text-muted mt-2">Showing {{ users.length }} of {{ total }}</p>
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
        <p><b>Phone:</b> {{ selectedUser?.phoneNumber || "-" }}</p>
        <p><b>Status:</b> {{ selectedUser?.status }}</p>
        <p><b>Role:</b> {{ selectedUser?.role?.name }}</p>
        <p><b>Registered:</b> {{ formatDate(selectedUser?.registeredAt) }}</p>
      </template>
      <template #btnClose>
        <BaseButton variant="cancel" icon="x-circle" @click="showViewModal = false">
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
        Change status for <b>{{ selectedUser?.fullname }}</b>?
      </template>
      <template #btnClose>
        <BaseButton variant="cancel" icon="x-circle" @click="showStatusModal = false">
          Cancel
        </BaseButton>
      </template>
      <template #btnActive>
        <BaseButton icon="check-circle" variant="primary" @click="confirmChangeStatus">
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
    <input class="form-control mb-2" placeholder="Full Name" v-model="newUser.fullname" />
    <input class="form-control mb-2" placeholder="Email" v-model="newUser.email" />
    <input class="form-control mb-2" placeholder="Phone Number" v-model="newUser.phoneNumber" />
    <input class="form-control mb-2" placeholder="Telegram Link" v-model="newUser.telegramLink" />
    <input class="form-control mb-2" placeholder="Password" type="password" v-model="newUser.password" />

    <select class="form-select mb-2" v-model="newUser.roleId">
      <option value="1">ADMIN</option>
      <option value="2">USER</option>
    </select>
  </template>

  <template #btnClose>
    <BaseButton variant="cancel" icon="x-circle" @click="showCreateModal = false">
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
import { reactive, ref, computed, onMounted, watch } from "vue";
import { useUserStore } from "../../../stores/userStore";
import BaseButton from "../../../components/base/BaseButton.vue";

const store = useUserStore();

const filters = reactive({
  page: 1,
  perPage: 10,
  search: "",
  status: "",
  sortBy: "id",
  sortDir: "ASC",
});

const users = computed(() => store.users);
const total = computed(() => store.total);
const loading = computed(() => store.loading);

const selectedUser = ref(null);
const showViewModal = ref(false);
const showStatusModal = ref(false);
const showCreateModal = ref(false);

const newUser = reactive({
  fullname: "",
  email: "",
  roleId: 2,           // default role, adjust as needed
  phoneNumber: "",
  telegramLink: "",
  password: "",
});


const formatDate = (d) => (d ? new Date(d).toLocaleString() : "-");

const loadUsers = async (append = false) => {
  await store.fetchUsers(filters, append);
};

const resetAndLoadUsers = () => {
  filters.page = 1;
  loadUsers(false);
};

const loadMore = () => {
  if (users.value.length < total.value) {
    filters.page++;
    loadUsers(true);
  }
};

const viewUser = async (id) => {
  selectedUser.value = await store.getUser(id);
  showViewModal.value = true;
};

const openStatus = (user) => {
  selectedUser.value = user;
  showStatusModal.value = true;
};

const confirmChangeStatus = async () => {
  const newStatus =
    selectedUser.value.status === "ACTIVATED"
      ? "DEACTIVATED"
      : "ACTIVATED";

  await store.changeUserStatus(selectedUser.value.id, newStatus);
  selectedUser.value.status = newStatus;
  showStatusModal.value = false;
  resetAndLoadUsers();
};

const createUser = async () => {
  if (!newUser.fullname || !newUser.email || !newUser.password || !newUser.roleId) {
    alert("Please fill all required fields"); // optional: use nicer modal feedback
    return;
  }

  try {
    await store.createUser({
      fullname: newUser.fullname,
      email: newUser.email,
      password: newUser.password,
      roleId: newUser.roleId,
      phoneNumber: newUser.phoneNumber || undefined,
      telegramLink: newUser.telegramLink || undefined,
      status: newUser.status,
    });

    showCreateModal.value = false;

    // Reset form
    Object.assign(newUser, {
      fullname: "",
      email: "",
      roleId: 2,
      phoneNumber: "",
      telegramLink: "",
      password: "",
    });

    resetAndLoadUsers(); // reload user list
  } catch (err) {
    console.error("Create user error:", err);
  }
};


// Watch filters for search, status, sort
watch([() => filters.search, () => filters.status, () => filters.sortBy], () => {
  filters.page = 1;
  loadUsers(false);
});

// Load first page on mount
onMounted(() => resetAndLoadUsers());
</script>

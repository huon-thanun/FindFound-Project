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

    <!-- Header -->
     <div class="admin-banner mb-4 rounded-4">
        <div class="banner-container">
          <!-- icon: report / clip -->
          <div class="banner-icon">
            <i class="bi-person"></i>
          </div>

          <!-- main text group -->
          <div class="banner-text">
            <!-- exact h2 from prompt, plus small context badge -->
            <h2 class="fw-bold">
              អ្នកប្រើប្រាស់
              <span class="badge-admin"><i class="bi bi-person-circle"
                  style="font-size: 0.75rem; margin-right: 5px"></i>អ្នកគ្រប់គ្រង</span>
            </h2>
            <!-- exact paragraph, but we enhance it with a subtle khmer-friendly meta info -->
            <p class="text-muted">
              <i class="fas fa-eye" style="opacity: 0.7; font-size: 1rem"></i>
              បង្កើត និងគ្រប់គ្រងអ្នកប្រើប្រាស់
            </p>
        </div>
        <div>
          <BaseButton icon="person-plus" variant="primary" @click="showCreateModal = true">
        បង្កើតអ្នកប្រើប្រាស់
      </BaseButton>
          </div>
        </div>

        <!-- very subtle divider line just for style (makes banner airy) -->
        <div style="
            margin-top: 0.8rem;
            margin-left: calc(70px + 1.25rem);
            border-bottom: 2px dashed rgba(86, 115, 150, 0.15);
            width: 40%;
          "></div>
      </div>

    <!-- Filters -->
    <div class="card mb-3 shadow border-color">
      <div class="card-body row">
        <div class="col-xxl-12">
          <BaseInput type="text" placeholder="ស្វែងរកតាមឈ្មោះ​ និងអុីមែល..." v-model="filters.search"
            @keyup.enter="resetAndLoadUsers" />
          <!-- <BaseInput class="d-none d-md-block d-xl-none" type="text" placeholder="ស្វែងរក..." v-model="filters.search"
            @keyup.enter="resetAndLoadUsers" /> -->
        </div>

        <div class="col-xxl-8 mt-2">
          <div class="row">
            <div class="col-lg-6 col-xxl-3" style="flex-wrap: nowrap;">
              <BaseSelect textField="តម្រៀបតាម" :modelValue="sortOptions.find((o) => o.value === filters.sortBy) || null
                " :items="sortOptions" labelField="label" valueField="value" @update:modelValue="(item) => (filters.sortBy = item?.value || '')
                " class="text-nowrap" />
            </div>

            <div class="col-lg-6 col-xxl-4" style="flex-wrap: nowrap;">
              <BaseSelect :modelValue="SORT_DIR_OPTIONS.find((o) => o.value === filters.sortDir) || null
                " labelField="label" valueField="value" :items="SORT_DIR_OPTIONS"
                @update:modelValue="(item) => (filters.sortDir = item?.value || '')" textField="ទិសដៅតម្រៀប"
                class="text-nowrap" />
            </div>

            <div class="col-xxl-5" style="flex-wrap: nowrap;">
              <BaseSelect textField="តម្រៀបស្ថានភាព" :modelValue="statusOptions.find((o) => o.value === filters.status) || null
                " :items="statusOptions" labelField="label" valueField="value"
                @update:modelValue="(item) => (filters.status = item?.value || '')" class="text-nowrap" />
            </div>
          </div>

        </div>

        <!-- CLEAR FILTER -->
        <div class="col-xxl-4 mt-1 text-end">
          <!-- <BaseButton class="d-none d-md-block d-xl-none" variant="outline_primary" icon="stars" @click="clearFilter">
            សម្អាត
          </BaseButton> -->
          <BaseButton variant="outline_primary" icon="stars" @click="clearFilter">
            សម្អាតការតម្រៀប
          </BaseButton>
        </div>

      </div>
    </div>

    <!-- Users Table -->
    <!-- <div class="card"> -->
    <div class="position-relative">
      <!-- LOADING STATE -->
      <div v-if="loading" class="loading-full" style="height: 50vh; width: 100%;">
        <div class="custom-loader"></div>
        <p class="mt-4 khmer-font text-purple-accent">កំពុងផ្ទុកទិន្នន័យ...</p>
      </div>

      <!-- USERS LIST (table or card) -->
      <div v-else>
        <BaseTableUserPage :columns="tableColumns" :items="users" :isLoading="false" @edit="viewUser"
          @delete="openStatus" class="mt-4">
          <template #column-id="{ item }"> #{{ item.id }} </template>
          <template #column-fullname="{ item }">
            <div class="d-flex align-items-center gap-2"> <img :src="item.avatar || '/avatar.png'" width="40"
                height="40" class="rounded-circle" alt="avatar" /> <span>{{ item.fullname }}</span> </div>
          </template>
          <template #column-role="{ item }"> {{ item.role?.name || '-' }} </template> <template
            #column-status="{ item }">
            <span class="badge" :class="item.status === 'ACTIVATED' ? 'bg-success' : 'bg-danger'"> {{ item.status }}
            </span>
          </template>
        </BaseTableUserPage>
      </div>
    </div>

    <div class="mt-3 text-muted">
      <p class="text-muted mb-0">
        ស្ថិតិ:
        បង្ហាញ
        <strong class="text-dark">{{ shownCount }}</strong>
        នាក់ នៃ
        <strong class="text-dark">{{ total }}</strong>
        នាក់
      </p>
    </div>

    <div class="card-footer text-center">
      <div class="d-flex gap-2 justify-content-center my-3">
        <BaseButton class="pointer" variant="danger" @click="previousPage" :isDisabled="filters.page === 1">
          មុន
        </BaseButton>

        <BaseButton class="pointer" variant="primary" @click="nextPage" :isDisabled="!meta?.hasNextPage">
          បន្ទាប់
        </BaseButton>
      </div>
      <!-- <p class="text-muted">Total: {{ total }} users</p> -->
    </div>
    <!-- </div> -->


    <!-- VIEW USER MODAL -->
    <BaseModal title="User Detail" icon="person-circle" :theme="'primary'" :isClose="showViewModal"
      @closeModal="showViewModal = false">
      <template #body>
        <div v-if="selectedUser" class="user-modal-body">
          <div class="user-description">
            <p><b class="text-dark">ល.រ:</b> #{{ selectedUser?.id }}</p>
          <p><b class="text-dark">ឈ្មោះ:</b> {{ selectedUser?.fullname }}</p>
          <p><b class="text-dark">អុីមែល:</b> {{ selectedUser?.email }}</p>
          <p><b class="text-dark">លេខទូរស័ព្ទ:</b> {{ selectedUser?.phoneNumber || '-' }}</p>
          <p><b class="text-dark">ស្ថានភាព:</b><span class="badge ms-2 fw-normal"
              :class="selectedUser.status === 'ACTIVATED' ? 'bg-success' : 'bg-danger'"> {{ selectedUser?.status
              }}</span></p>
          <p><b class="text-dark">តួនាទី:</b> {{ selectedUser?.role?.name }}</p>
          <p><b class="text-dark">បានចុះឈ្មោះ:</b> {{ formatDate(selectedUser?.registeredAt) }}</p>
          </div>
        </div>
      </template>
      <template #btnClose>
        <BaseButton variant="primary" icon="x-circle" @click="showViewModal = false">
          បិទ
        </BaseButton>
      </template>
    </BaseModal>

    <!-- CHANGE STATUS MODAL -->
    <BaseModal title="ផ្លាស់ប្តូរស្ថានភាព" icon="pencil-square" :theme="'warning'" :isClose="showStatusModal"
      @closeModal="showStatusModal = false">
      <template #body>
        <p>
          ផ្លាស់ប្តូរស្ថានភាពសម្រាប់ <b class="text-dark">{{ selectedUser?.fullname }}</b>
        </p>

        <p class="fw-bold text-dark">
          ស្ថានភាពបច្ចុប្បន្ន:
          <span class="badge ms-2" :class="selectedUser?.status === 'ACTIVATED'
            ? 'bg-success'
            : 'bg-danger'
            ">
            {{ selectedUser?.status }}
          </span>
        </p>

        <p class="fw-bold text-dark">
          ស្ថានភាពថ្មី:
          <span class="badge ms-2" :class="nextStatus === 'ACTIVATED' ? 'bg-success' : 'bg-danger'">
            {{ nextStatus }}
          </span>
        </p>
      </template>
      <template #btnClose>
        <BaseButton variant="cancel" icon="x-circle" @click="showStatusModal = false">
          បោះបង់
        </BaseButton>
      </template>

      <template #btnActive>
        <BaseButton icon="check-circle" variant="primary" @click="confirmChangeStatus">
          បញ្ជាក់
        </BaseButton>
      </template>
    </BaseModal>

    <!-- CREATE USER MODAL -->
    <BaseModal title="បង្កើតអ្នកប្រើប្រាស់" icon="person-plus" :theme="'primary'" :isClose="showCreateModal"
      @closeModal="showCreateModal = false">
      <template #body>
        <BaseInput type="text" label="ឈ្មោះពេញ" placeholder="បញ្ចូឈ្មោះពេញ" v-model="newUser.fullname"
          :error="errors.fullname" />
        <BaseInput type="email" label="អុីមែល" placeholder="បញ្ចូលអាសយដ្ឋានអុីមែល" v-model="newUser.email"
          :error="errors.email" />
        <BaseInput type="tel" label="លេខទូរស័ព្ទ" placeholder="បញ្ចូលលេខទូរស័ព្ទ" v-model="newUser.phoneNumber" />
        <BaseInput type="text" label="តំណភ្ជាប់តេឡេក្រាម" placeholder="បញ្ចូលតំណភ្ជាប់តេឡេក្រាម"
          v-model="newUser.telegramLink" />
        <BaseInput type="password" label="ពាក្យសម្ងាត់" placeholder="បញ្ចូលពាក្យសម្ងាត់" v-model="newUser.password"
          :error="errors.password" />

        <BaseSelect :modelValue="roleOptions.find((o) => o.id === newUser.roleId?.id) ||
          newUser.roleId ||
          null
          " :items="roleOptions" label="តួនាទី" textField="ជ្រើសរើសតួនាទី" labelField="name" valueField="id"
          @update:modelValue="(item) => (newUser.roleId = item)" :error="errors.roleId" />
      </template>

      <template #btnClose>
        <BaseButton variant="cancel" icon="x-circle" @click="showCreateModal = false">
          បោះបង់
        </BaseButton>
      </template>

      <template #btnActive>
        <BaseButton icon="check-circle" variant="primary" @click="createUser">
          បង្កើត
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
  { key: 'id', label: 'ល.រ' },
  { key: 'fullname', label: 'អ្នកប្រើប្រាស់' },
  { key: 'email', label: 'អុីមែល' },
  { key: 'role', label: 'តួនាទី' },
  { key: 'status', label: 'ស្ថានភាព' },
];

const filters = reactive({
  page: 1,
  perPage: 10,
  search: '',
  status: '',
  sortBy: null,
  sortDir: null,
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
  { id: 1, name: 'Admin' },
  { id: 2, name: 'User' },
];

const sortOptions = [
  { value: 'id', label: 'ល.រ' },
  { value: 'email', label: 'អុីមែល' },
  { value: 'registeredAt', label: 'កាលបរិច្ឆេទចុះឈ្មោះ' },
];

const statusOptions = [
  // { value: '', label: 'All Status' },
  { value: 'ACTIVATED', label: 'Activated' },
  { value: 'DEACTIVATED', label: 'Deactivated' },
];

const SORT_DIR_OPTIONS = [
  { value: "ASC", label: "ចាស់បំផុត" },
  { value: "DESC", label: "ថ្មីបំផុត" },
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
  loading.value = true;
  selectedUser.value = await store.getUser(id);
  loading.value = false;
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
  showSuccess(`ស្ថានភាពអ្នកប្រើប្រាស់បានប្តូរទៅ ${newStatus} ដោយជោគជ័យ`);
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
    errors.fullname = 'សូមបញ្ចូលឈ្មោះពេញ';
  }
  if (!newUser.email.trim()) {
    errors.email = 'សូមបញ្ចូលអាសយដ្ខានអុីមែល';
  } else if (!isValidEmail(newUser.email)) {
    errors.email = 'អុីមែលមិនត្រីមត្រូវ';
  }
  if (!newUser.password.trim()) {
    errors.password = 'សូមបញ្ចូលពាក្យសម្ងាត់';
  } else if (newUser.password.length < 6) {
    errors.password = 'ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ 6 តួអក្សរ';
  }
  if (!newUser.roleId) {
    errors.roleId = 'សូមជ្រើសរើសតួនាទី';
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

    showSuccess('អ្នកប្រើប្រាស់ត្រូវបានបង្កើតដោយជោគជ័យ');
    resetAndLoadUsers();
  } catch (err) {
    console.error('Create user error:', err);
    console.error('Error response:', err.response?.data);

    let errorMsg = 'បរាជ័យក្នុងការបង្កើតអ្នកប្រើប្រាស់, សូមព្យាយាមម្តងទៀត';

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
  [() => filters.search, () => filters.status, () => filters.sortBy, () => filters.sortDir],
  () => {
    filters.page = 1;
    loadUsers();
  },
);

const shownCount = computed(() => {
  return Math.min(filters.page * filters.perPage, total.value);
});
//

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

// Clear Filter
const clearFilter = () => {
  filters.search = '';
  filters.status = '';
  filters.sortBy = null;
  filters.sortDir = null;
};


// Load first page on mount
onMounted(() => resetAndLoadUsers());
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

.border-color {
  border-color: var(--tertiary-color);
}

.user-modal-body {
    text-align: left;
    padding: 16px 0;
}

.user-description {
    background-color: rgba(59, 30, 84, 0.05);
    border-left: 4px solid var(--primary-color);
    padding: 16px;
    border-radius: 8px;
}

/* Default (LG and up) */
.filter-row>div {
  flex: 1;
}

.filter-column>div {
  flex: 1;
}

.filter-row>.filter-sort-1 {
  flex: 0.5;
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

  .filter-sort-1 {
    width: 100%;
  }
}

.loading-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
/* main card – admin header banner */
.admin-banner {
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  background-image: url('../../../assets/images/background/user.png');
  background-position: center -200px;
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  padding: 2rem 2.5rem;
  border-top: 5px solid var(--secondary-color);
  box-shadow: 0 0px 20px -12px rgba(0, 20, 40, 0.25),
    inset 0 1px 2px rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
}

/* inner flex layout: icon group + text */
.banner-container {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

/* left side icon – subtle report / clipboard */
.banner-icon {
  background: var(--secondary-color);
  color: white;
  width: 70px;
  height: 70px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  box-shadow: 0 10px 18px -6px rgba(20, 35, 70, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.25);
}

/* text block */
.banner-text {
  flex: 1;
}

/* main heading – exactly as given */
.banner-text h2.fw-bold {
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #0b1a33;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem 0.8rem;
}

/* optional subtle badge for admin context */
.badge-admin {
  background: rgba(20, 53, 90, 0.1);
  padding: 0.3rem 1rem;
  border-radius: 60px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #1e3b5c;
  border: 1px solid rgba(20, 53, 90, 0.2);
  letter-spacing: 0.02rem;
  margin-left: 0.25rem;
  backdrop-filter: blur(4px);
}

/* secondary text exactly as provided */
.banner-text p.text-muted {
  font-size: 1.18rem;
  color: #48607c !important;
  /* override muted with accessible soft navy */
  font-weight: 400;
  line-height: 1.5;
  max-width: 700px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* little khmer style accent – a separating dash with decorative element */
.text-muted .separator {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #8aa0bc;
  border-radius: 50%;
  margin: 0 0.5rem;
  opacity: 0.6;
}

/* additional stats chips for admin overview – keeps banner airy but functional */
.banner-meta {
  display: flex;
  gap: 1.2rem;
  margin-top: 1.2rem;
  flex-wrap: wrap;
}

.meta-chip {
  background: rgba(230, 240, 255, 0.7);
  border-radius: 40px;
  padding: 0.4rem 1.4rem 0.4rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #1f3b58;
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 10px -6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-chip i {
  color: #2f4d73;
  font-size: 0.9rem;
  opacity: 0.8;
}

.meta-chip span {
  font-weight: 600;
  color: #0b2642;
  margin-right: 2px;
}

/* responsive touch */
@media (max-width: 550px) {
  .admin-banner {
    padding: 1.5rem 1.5rem;
    border-radius: 2rem;
  }

  .banner-icon {
    width: 55px;
    height: 55px;
    font-size: 1.8rem;
    border-radius: 22px;
  }

  .banner-text h2.fw-bold {
    font-size: 2rem;
  }

  .banner-text p.text-muted {
    font-size: 1rem;
  }
}

@media (max-width: 420px) {
  .banner-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .banner-icon {
    align-self: flex-start;
  }
}

/* small flourish: micro reflection line */
.admin-banner {
  position: relative;
  isolation: isolate;
}

.admin-banner::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 0% 10%,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 50%);
  pointer-events: none;
  border-radius: inherit;
  z-index: -1;
}
</style>

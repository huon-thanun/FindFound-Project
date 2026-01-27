<template>
  <table class="table align-middle border base-table">
    <thead class="table-light">
      <tr>
        <th
          v-for="col in columns"
          :key="col.key"
          class="truncate-header"
        >
          {{ col.label }}
        </th>
        <th class="text-center truncate-header">Actions</th>
      </tr>
    </thead>

    <tbody>
      <!-- Loading state -->
      <template v-if="isLoading">
        <tr v-for="n in 5" :key="n">
          <td :colspan="columns.length + 1">
            <div class="placeholder-glow">
              <span class="placeholder bg-secondary rounded-1 col-12"></span>
            </div>
          </td>
        </tr>
      </template>

      <!-- No data -->
      <tr v-else-if="!items.length">
        <td
          :colspan="columns.length + 1"
          class="text-center py-5"
        >
          <p class="fw-semibold mb-0">No data found</p>
        </td>
      </tr>

      <!-- Data rows -->
      <tr v-else v-for="item in items" :key="item.id">
        <td
          v-for="col in columns"
          :key="col.key"
          class="truncate-cell"
        >
          <slot :name="`column-${col.key}`" :item="item">
            <div
              class="truncate-text"
              :title="item[col.key]"
            >
              {{ item[col.key] }}
            </div>
          </slot>
        </td>

        <td class="text-center truncate-cell">
          <button
            class="btn border-0 me-2 text-warning"
            @click="$emit('edit', item.id)"
          >
            <i class="bi bi-pencil-square"></i>
          </button>

          <button
            class="btn btn-sm border-0 text-danger"
            @click="$emit('delete', item.id)"
          >
            <i class="bi bi-trash3"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["edit", "delete"]);
</script>

<!-- How to use Base Table -->
<!-- <template>
  <BaseTable
    :columns="columns"
    :items="myArticles"
    :isLoading="loading"
    @edit="handleEdit"
    @delete="handleDelete"
  >
    /* Thumbnail column slot */
    <template #column-thumbnail="{ item }">
      <img
        :src="item.thumbnail"
        alt="thumbnail"
        class="rounded"
        width="80"
        height="50"
      />
    </template>

    /* Created date format */
    <template #column-createdAt="{ item }">
      {{ formatDate(item.createdAt) }}
    </template>
  </BaseTable>
</template>

<script setup>
import { ref } from "vue";
import { formatDate } from "./utils/formatDate.js";
/* ---------------- STATE ---------------- */
const loading = ref(false); // ✅ REQUIRED

const columns = [
  { key: "thumbnail", label: "Thumbnail" },
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  { key: "createdAt", label: "Created At" },
];

const myArticles = ref([
  {
    id: 1,
    thumbnail: "https://picsum.photos/120/80?random=1",
    title: "Introduction to Vue 3 Composition API",
    category: "Frontend",
    createdAt: "2026-01-22T07:28:55.288Z",
  },
  {
    id: 2,
    thumbnail: "https://picsum.photos/120/80?random=2",
    title: "Laravel REST API Best Practices",
    category: "Backend ",
    createdAt: "2026-01-22T07:28:55.288Z",
  },
]);

/* ---------------- METHODS ---------------- */
const handleEdit = (id) => {
  console.log("Edit ID:", id);
};

const handleDelete = (id) => {
  myArticles.value = myArticles.value.filter(
    (item) => item.id !== id
  );
};

</script> -->

<style scoped>
/* ---- Table Layout ---- */
.base-table {
  width: 100%;
  table-layout: fixed; /* REQUIRED for truncation */
  border-collapse: collapse;
}

/* ---- Header ---- */
.truncate-header {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ---- Cell ---- */
.truncate-cell {
  overflow: hidden;
}

/* ---- Text Ellipsis ---- */
.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
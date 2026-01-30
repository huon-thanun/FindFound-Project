<template>
  <div class="table-wrapper table-scroll rounded-3">
    <table class="table align-middle table-striped table-hover base-table mb-0">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            class="truncate-header ps-3 py-3 table-top"
          >
            {{ col.label }}
          </th>
          <th class="text-center py-3 table-top truncate-header">Actions</th>
        </tr>
      </thead>

      <tbody>
        <!-- Loading state -->
        <template v-if="isLoading">
          <tr v-for="n in 5" :key="n">
            <td :colspan="columns.length + 1">
              <div class="placeholder-glow px-3">
                <span class="placeholder bg-secondary rounded-1 col-12"></span>
              </div>
            </td>
          </tr>
        </template>

        <!-- No data -->
        <tr v-else-if="!items.length">
          <td :colspan="columns.length + 1" class="text-center py-5">
            <p class="fw-semibold mb-0">No data found</p>
          </td>
        </tr>

        <!-- Data rows -->
        <tr
          v-else
          v-for="item in items"
          :key="item.id"
          class="table-row"
          @click="$emit('rowClick', item)"
        >
          <td v-for="col in columns" :key="col.key" class="truncate-cell ps-3">
            <slot :name="`column-${col.key}`" :item="item">
              <div class="truncate-text" :title="item[col.key]">
                {{ item[col.key] }}
              </div>
            </slot>
          </td>

          <td class="text-center actions-cell">
            <base-button
              variant=""
              class="me-2 blue"
              @click="$emit('edit', item.id)"
            >
              <i class="bi bi-eye"></i>
            </base-button>

            <base-button variant="warning" @click="$emit('delete', item.id)">
              <i class="bi bi-pencil-square"></i>
            </base-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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

defineEmits(['edit', 'delete', 'rowClick']);
</script>

<style scoped>
/* ---------- Wrapper (IMPORTANT) ---------- */
.table-wrapper {
  border-top: 1px solid var(--primary-color) !important;
  border-left: 1px solid var(--primary-color) !important;
  border-right: 1px solid var(--primary-color) !important;
}
/* ---------- Table ---------- */
.table-scroll {
  width: 100%;
  overflow-x: auto;   /* 👈 enables left-right scroll */
  overflow-y: hidden;
}
.base-table {    /* IMPORTANT */
  table-layout: auto; /* DEFAULT */
  min-width: 1100px;  /* or any width you want */
}

.table-row {
  border-bottom: 1px solid var(--primary-color);
}
/* ---------- Header ---------- */
.table-top {
  background-color: var(--primary-color);
  color: var(--surface-color);
}

.truncate-header {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ---------- Cells ---------- */
.truncate-cell {
  overflow: hidden;
  cursor: pointer;
}

.actions-cell {
  overflow: visible;
  cursor: auto;
  padding: 0.5rem !important;
}

.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ---------- Row UX ---------- */
.table-row:hover {
  background-color: #f8f9fa;
}
.blue{
  background-color: rgb(105, 98, 209) !important;
}
</style>

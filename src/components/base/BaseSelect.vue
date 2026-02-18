<template>
  <div class="mb-3">
    <label
      v-if="label"
      class="form-label"
      style="display: block; text-align: start"
      >{{ label }} <span class="text-danger">{{ unOptional ? '*' : '' }}</span></label
    >
    <div class="dropdown">
      <!-- Selected value -->
      <div
        class="dropdown-selected"
        :class="{ 'is-invalid': error }"
        @click="toggleDropdown"
      >
        {{ displayText }}
        <svg class="chevron" :class="{ rotate: open }" viewBox="0 0 24 24">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            stroke-width="3"
            fill="none"
          />
        </svg>
      </div>

      <!-- Dropdown list -->
      <ul v-if="open" class="dropdown-list">
        <li
          v-for="item in items"
          :key="item[valueField]"
          @click.stop="selectItem(item)"
          :class="{ active: item[valueField] === selected?.[valueField] }"
        >
          {{ item[labelField] }}
          <span
            v-if="item[valueField] === selected?.[valueField]"
            class="checkmark"
          >
            ✔
          </span>
        </li>
      </ul>
    </div>
    <div v-if="error" class="invalid-feedback d-block" style="text-align: start">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const open = ref(false);
const selected = ref(null);

/* ---------------- PROPS ---------------- */
const props = defineProps({
  modelValue: { type: Object, default: null },
  items: { type: Array, required: true },
  label: { type: String, default: '' },
  textField: { type: String, default: 'Select an option' },
  labelField: { type: String, default: 'name' },
  valueField: { type: String, default: 'id' },
  error: { type: String, default: '' },
  unOptional: {
    type: Boolean,
    default: false,
  },
});

/* ---------------- EMIT ---------------- */
const emit = defineEmits(['update:modelValue']);

/* ---------------- COMPUTED ---------------- */
const displayText = computed(() =>
  selected.value ? selected.value[props.labelField] : props.textField,
);

/* ---------------- WATCH ---------------- */
watch(
  () => props.modelValue,
  (val) => (selected.value = val),
  { immediate: true },
);

/* ---------------- METHODS ---------------- */
const toggleDropdown = () => (open.value = !open.value);

const selectItem = (item) => {
  selected.value = item;
  open.value = false;
  emit('update:modelValue', item);
};
</script>

<!-- <template>
    <BaseSelect
    v-model="selectedRole"
    :items="roles"
    textField="Select Role"
    labelField="name"
    valueField="id"
  />

  /*<div v-if="role">
    <h3>Role Detail</h3>
    <p>ID: {{ role.id }}</p>
    <p>Name: {{ role.name }}</p>
  </div>*/
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import  useUserStore  from ".././../../stores/userStore.js";

const userStore = useUserStore();

const roles = ref([]);
const selectedRole = ref(null);
const role = ref(null);

/* Load roles (LIST) */
onMounted(async () => {
  roles.value = await userStore.fetchUserRoles();
});

/* Load ONE role when selected */
watch(selectedRole, async (val) => {
  if (val?.id) {
    role.value = await userStore.fetchRoleById(val.id);
  } else {
    role.value = null;
  }
});
</script> -->

<style scoped>
/* same styles as before */
.dropdown {
  position: relative;
  width: 100%;
  font-family: sans-serif;
  cursor: pointer;
}
.dropdown-selected {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.375rem 0.75rem;
  /* border: 1px solid #dee2e6; */
  border: 1px solid var(--tertiary-color);
  border-radius: 0.375rem;
  background: #fff;
  color: #71717a;
}
.dropdown-selected.is-invalid {
  border-color: #dc3545;
  background-color: #fff5f5;
}
.chevron {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s ease;
}
.chevron.rotate {
  transform: rotate(180deg);
}
.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0.375rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  z-index: 1000;
}
.dropdown-list li {
  padding: 0.375rem 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dropdown-list li:hover {
  background: #f4f4f5;
  color: #18181b;
}
.dropdown-list li.active {
  font-weight: 700;
  color: #18181b;
}
.checkmark {
  color: #18181b;
}
.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>

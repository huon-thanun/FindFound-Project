<template>
  <button
    :class="`btn btn_${variant} `"
    :disabled="isDisabled || isLoading"
    :type="type"
    @click="$emit('click')"
  >
    <span v-if="isLoading" class="spinner-border spinner-border-sm me-3"></span>
    <span v-if="icon" :class="`bi bi-${icon} me-2`"></span>
    <slot></slot>
  </button>
</template>
<script setup>
defineProps({
  icon: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: "primary",
  },
  type: {
    type: String,
    default: "button",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["click"]);
</script>

<!-- How to use baseButton  -->
<!-- <BaseButton icon="pencil-square" variant="warning" isDisabled @click="isClose">Edit</BaseButton> -->

<style scoped>
.btn {
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: white !important;
  text-decoration: none !important;
  transition: 0.3s;
}
.btn:hover {
  opacity: 0.9;
  transform: scale(1.03) translate(0, -5%)
}
.btn_primary {
  background-color: var(--primary-color) !important;
  box-shadow:
    var(--primary-color-shadow) 0px 1px 2px 0px,
    var(--primary-color-shadow) 0px 1px 3px 1px;
}
.btn_outline_primary {
  border-color: var(--primary-color) !important;
  color: var(--primary-color) !important;
  box-shadow:
    var(--primary-color-shadow) 0px 1px 2px 0px,
    var(--primary-color-shadow) 0px 1px 3px 1px;
}
.btn_secondary {
  background: var(--secondary-color) !important;
  box-shadow:
    var(--secondary-color-shadow) 0px 1px 2px 0px,
    var(--secondary-color-shadow) 0px 1px 3px 1px;
}
.btn_tertiary {
  background: var(--tertiary-color) !important;
  box-shadow:
    var(--tertiary-color-shadow) 0px 1px 2px 0px,
    var(--tertiary-color-shadow) 0px 1px 3px 1px;
}
.btn_danger {
  background: var(--danger) !important;
  box-shadow:
    var(--danger-shadow) 0px 1px 2px 0px,
    var(--danger-shadow) 0px 1px 3px 1px;
}
.btn_warning {
  background: var(--warning) !important;
  box-shadow:
    var(--warning-shadow) 0px 1px 2px 0px,
    var(--warning-shadow) 0px 1px 3px 1px;
}
.btn_success {
  background: var(--success) !important;
  box-shadow:
    var(--success-shadow) 0px 1px 2px 0px,
    var(--success-shadow) 0px 1px 3px 1px;
}
.btn_cancel {
  background: var(--cancel) !important;
  box-shadow:
    var(--cancel-shadow) 0px 1px 2px 0px,
    var(--cancel-shadow) 0px 1px 3px 1px;
}
.btn_dark {
  background: var(--dark) !important;
  box-shadow:
    var(--dark-shadow) 0px 1px 2px 0px,
    var(--dark-shadow) 0px 1px 3px 1px;
}
.btn_light {
  background: var(--light) !important;
  box-shadow:
    var(--light-shadow) 0px 1px 2px 0px,
    var(--light-shadow) 0px 1px 3px 1px;
}
</style>

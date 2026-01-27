<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isClose"
        class="modal fade show"
        tabindex="-1"
        role="dialog"
        @click.self="$emit('closeModal')"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content m-auto border-0 rounded-4">
            <!-- Header -->
            <div
              class="modal-header border-0 flex-column justify-content-center pt-4 px-3"
              :class="theme"
            >
              <div
                class="icon d-flex justify-content-center align-items-center rounded-circle"
                :class="`bg-icon-${theme}`"
              >
                <i v-if="icon" class="modal-icon" :class="`bi bi-${icon}`" />
              </div>
              <h2 class="modal-title mt-1">{{ title }}</h2>
            </div>

            <!-- Body -->
            <div class="modal-body px-4 pb-4 text-center text-secondary">
              <slot name="body"></slot>
            </div>

            <!-- Footer -->
            <div
              class="card-footer d-flex justify-content-center gap-3 py-3 bg-light rounded-bottom-4 px-4 text-muted"
            >
              <slot name="btnClose"></slot>
              <slot name="btnActive"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Backdrop -->
    <Transition name="backdrop">
      <div v-if="isClose" class="modal-backdrop fade show"></div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: "" },
  icon: { type: String, default: "" },
  theme: { type: String, default: "primary" },
  isClose: { type: Boolean, default: false },
});
defineEmits(["closeModal"]);
</script>

<!-- How to use base model -->
<!-- <template>
  <h1>You did it!</h1>
  <BaseButton @click="isClose">Open Modal</BaseButton>

  <BaseModal
    :title="'My Modal'"
    :icon="'info-circle'"
    :theme="'primary'"
    :isClose="showModal"
    @closeModal="showModal = true"
  >
    <template #body>
      <p>This is the modal body content.</p>
    </template>
    <template #btnClose>
      <BaseButton variant="cancel" icon="x-circle" class="col-6" @click="isClose">Close</BaseButton>
    </template>
    <template #btnActive>
      <BaseButton icon="box" class="col-6 ">Confirm</BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref } from "vue";
const showModal = ref(false);
function isClose(){
  showModal.value = !showModal.value
}
</script> -->

<style scoped>
.primary {
  color: var(--primary-color) !important;
}
.secondary {
  color: var(--secondary-color) !important;
}
.danger {
  color: var(--danger) !important;
}
.warning {
  color: var(--warning) !important;
}
.success {
  color: var(--success) !important;
}
.cancel {
  color: var(--cancel) !important;
}
.dark {
  color: var(--dark) !important;
}
.light {
  color: var(--light) !important;
}
.bg-icon-primary {
  background: rgba(0, 81, 255, 0.1) !important;
}
.bg-icon-secondary {
  background-color: rgba(119, 162, 255, 0.1) !important;
}
.bg-icon-danger {
  background: rgba(238, 36, 36, 0.1) !important;
}
.bg-icon-warning {
  background: rgba(255, 184, 78, 0.1) !important;
}
.bg-icon-success {
  background: rgba(45, 219, 111, 0.1) !important;
}
.bg-icon-cancel {
  background: rgba(210, 210, 210, 0.1) !important;
}
.bg-icon-dark {
  background: rgba(17, 24, 39, 0.1) !important;
}
.bg-icon-light {
  background: rgba(243, 244, 246, 0.1) !important;
}
.icon {
  width: 50px;
  height: 50px;
}
.modal-title {
  font-size: 22px;
  font-weight: 600;
}

.modal-icon {
  font-size: 24px;
}

.modal {
  display: block;
}

.modal-content {
  width: 450px;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.15s ease;
}

.modal-enter-active .modal-dialog,
.modal-leave-active .modal-dialog {
  transition: transform 0.15s ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-dialog,
.modal-leave-to .modal-dialog {
  transform: scale(0.9) translateY(-20px);
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.15s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.bi::before {
  font-weight: 900 !important;
}
</style>

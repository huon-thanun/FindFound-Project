<template>
  <Teleport to="body">
    <Transition name="toast-fade">
      <div v-if="visible" :class="[`ff-toast`, `ff-toast--${theme}`]" role="status">
        <div class="ff-toast__inner">
          <div v-if="icon" class="ff-toast__icon">
            <i :class="`bi bi-${icon}`" />
          </div>
          <div class="ff-toast__content">
            <slot>{{ message }}</slot>
          </div>
          <button v-if="closable" class="ff-toast__close" @click="closeToast" aria-label="Close">
            <i class="bi bi-x-lg" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  message: { type: String, default: '' },
  theme: { type: String, default: 'primary' },
  duration: { type: Number, default: 3500 },
  closable: { type: Boolean, default: true },
  icon: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'close'])

const visible = ref(props.modelValue)
let timer = null

function startTimer() {
  if (!props.duration || props.duration <= 0) return
  clearTimer()
  timer = setTimeout(() => {
    closeToast()
  }, props.duration)
}

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

function closeToast() {
  visible.value = false
  emit('update:modelValue', false)
  emit('close')
}

watch(() => props.modelValue, (v) => {
  visible.value = v
  if (v) startTimer()
  else clearTimer()
})

onMounted(() => {
  if (visible.value) startTimer()
})

onBeforeUnmount(() => clearTimer())
</script>

<style scoped>
.ff-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1100;
  min-width: 280px;
  max-width: 420px;
}
.ff-toast__inner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(16,24,40,0.08);
  background: white;
  color: #111827;
  font-size: 14px;
  font-weight: 500;
}
.ff-toast__icon i {
  font-size: 18px;
}
.ff-toast__content {
  flex: 1 1 auto;
}
.ff-toast__close {
  background: transparent;
  border: none;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 8px;
}
.ff-toast--primary .ff-toast__inner { border-left: 4px solid var(--primary-color); }
.ff-toast--secondary .ff-toast__inner { border-left: 4px solid var(--secondary-color); }
.ff-toast--success .ff-toast__inner { border-left: 4px solid var(--success); }
.ff-toast--danger .ff-toast__inner { border-left: 4px solid var(--danger); }
.ff-toast--warning .ff-toast__inner { border-left: 4px solid var(--warning); }

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.18s ease;
}
.toast-fade-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
</style>

<!--
Usage example:

<template>
  <BaseToast v-model="show" :message="msg" theme="success" :duration="3000" icon="check-circle" />
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)
const msg = 'Saved successfully.'
// show.value = true to display
</script>

-->

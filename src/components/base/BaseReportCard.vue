<template>
  <div class="card p-3" :style="`height:${height}`">
    <slot name="image"></slot>
    <div class="card-body px-0">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
defineProps({
  height: {
    type: String,
    default: "auto",
  },
});
</script>
<style scoped>
.card {
  width: 100%;
  border-radius: 12px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
</style>

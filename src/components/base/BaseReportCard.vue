<template>
  <div :class="`card ${padding} ${addClass}`" :style="`min-height:${height}`">
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
  padding: {
    type: String,
    default: "p-3",
  },
  addClass: {
    type: String,
  },
});
</script>
<style scoped>
.card {
  width: 100%;
  border-radius: 12px;
  box-shadow:
    rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
</style>

<template>
  <div class="card p-3">
    <slot name="image"></slot>
    <div class="card-body px-0">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.card {
  border-radius: 12px;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
</style>

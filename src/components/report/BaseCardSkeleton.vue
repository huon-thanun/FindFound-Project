<template>
  <div class="card border shadow-sm animate-pulse" style="border-radius: 15px">
    <div class="bg-secondary-subtle rounded w-100" style="height: 230px"></div>

    <div class="card-body d-flex flex-column" style="padding: 20px">
      <!-- Title placeholder -->
      <div
        class="bg-secondary-subtle rounded mb-2"
        style="height: 20px; width: 75%"
      ></div>

      <!-- Content placeholder -->
      <div class="my-2 flex-grow-1">
        <div
          class="bg-secondary-subtle rounded mb-2"
          style="height: 20px"
        ></div>
        <div
          class="bg-secondary-subtle rounded"
          style="height: 20px; width: 83%"
        ></div>
      </div>
      <div
        class="bg-secondary-subtle rounded mt-4"
        style="height: 40px; width: 100%"
      ></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>

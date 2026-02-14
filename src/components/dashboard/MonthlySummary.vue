<!-- src/components/dashboard/MonthlySummary.vue -->
<template>
  <div class="content-card bg-primary-gradient text-white">
    <h5 class="mb-4">
      <i class="bi bi-calendar-check me-2"></i>
      សង្ខេបប្រចាំខែ
    </h5>

    <div class="summary-content mt-3">
      <!-- Found this month -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <span>រកឃើញសរុប</span>
        <span class="fw-bold fs-5">{{
          foundReports.toLocaleString("km-KH")
        }}</span>
      </div>

      <div
        class="progress mb-4"
        style="height: 10px; background: rgba(255, 255, 255, 0.25)"
      >
        <div
          class="progress-bar bg-white shadow-sm"
          role="progressbar"
          :style="{ width: foundProgress + '%' }"
          :aria-valuenow="foundProgress"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="small">ការកើនឡើង</span>
        <span class="fw-bold text-success">
          <i class="bi bi-arrow-up-short"></i> {{ foundGrowth }}%
        </span>
      </div>

      <!-- Lost this month (optional - can be hidden if not needed) -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <span>បាត់បង់សរុប</span>
        <span class="fw-bold fs-5">{{
          lostReports.toLocaleString("km-KH")
        }}</span>
      </div>

      <div
        class="progress mb-4"
        style="height: 10px; background: rgba(255, 255, 255, 0.25)"
      >
        <div
          class="progress-bar bg-white shadow-sm"
          role="progressbar"
          :style="{ width: lostProgress + '%' }"
          :aria-valuenow="lostProgress"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="small">ការកើនឡើង</span>
        <span class="fw-bold text-danger">
          <i class="bi bi-arrow-up-short"></i> {{ lostGrowth }}%
        </span>
      </div>

      <!-- Summary message -->
      <div class="text-center mt-5 pt-3">
        <small class="opacity-90">
          អ្នកបានដោះស្រាយបញ្ហាចំនួន
          <strong class="fs-6">{{
            foundReports.toLocaleString("km-KH")
          }}</strong>
          ក្នុងខែនេះ!
        </small>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  foundReports: {
    type: Number,
    default: 0,
  },
  lostReports: {
    type: Number,
    default: 0,
  },
  foundGrowth: {
    type: Number,
    default: 12,
  },
  lostGrowth: {
    type: Number,
    default: 5,
  },
  foundProgress: {
    type: Number,
    default: 68, // percentage 0-100
  },
  lostProgress: {
    type: Number,
    default: 32, // percentage 0-100
  },
});
</script>

<style scoped>
.bg-primary-gradient {
  background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 6px 24px rgba(79, 70, 229, 0.25);
}

.summary-content {
  color: white;
}

.progress {
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar {
  transition: width 0.8s ease;
}

.fs-5 {
  font-size: 1.5rem;
}

small {
  line-height: 1.5;
}
</style>

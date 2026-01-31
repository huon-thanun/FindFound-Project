<template>
  <div class="container py-5 min-vh-100">
    <!-- Report Detail -->
    <div v-if="currentReport" class="card p-4 mb-4 box-shadow">
      <h4 class="fw-bold">{{ currentReport.title }}</h4>
      <p class="text-muted mb-2">
        <i class="bi bi-geo-alt me-1"></i>
        {{ currentReport.location }}
      </p>
      <span class="badge bg-primary">
        {{ currentReport.reportType }}
      </span>
    </div>

    <!-- Matched Reports -->
    <h5 class="fw-bold mb-3">Potential Matches</h5>

    <div v-if="matchedReports.length === 0" class="text-muted">
      No matched reports found
    </div>

    <div class="row g-3">
      <div v-for="report in matchedReports" :key="report.id" class="col-md-4">
        <div class="card p-3 h-100 box-shadow">
          <img
            :src="report.image"
            class="img-fluid rounded mb-2"
            style="height: 150px; object-fit: cover"
          />
          <h6 class="fw-bold">{{ report.title }}</h6>
          <p class="small text-muted mb-1">
            <i class="bi bi-geo-alt me-1"></i>
            {{ report.location }}
          </p>
          <span class="badge bg-success">
            {{ report.reportType }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

/* -----------------------------
   Static Reports Data
-------------------------------- */
const reports = [
  {
    id: 1,
    title: "Lost iPhone 13",
    reportType: "LOST",
    location: "Phnom Penh",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "Found iPhone",
    reportType: "FOUND",
    location: "Phnom Penh",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    title: "Lost Wallet",
    reportType: "LOST",
    location: "Siem Reap",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    title: "Found Phone",
    reportType: "FOUND",
    location: "Phnom Penh",
    image: "https://via.placeholder.com/300x200",
  },
];

/* -----------------------------
   Current Report (simulate route id)
-------------------------------- */
const currentReportId = 1; // pretend from route params

const currentReport = ref(null);
const matchedReports = ref([]);

/* -----------------------------
   Logic: find report & matches
-------------------------------- */
const findReportAndMatches = () => {
  currentReport.value = reports.find((r) => r.id === currentReportId);

  if (!currentReport.value) return;

  matchedReports.value = reports.filter(
    (r) =>
      r.id !== currentReport.value.id &&
      r.location === currentReport.value.location &&
      r.reportType !== currentReport.value.reportType,
  );
};

onMounted(() => {
  findReportAndMatches();
});
</script>

<style scoped>
.box-shadow {
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
</style>

<template>
  <div class="row g-4">
    <div class="col-lg-12" data-aos="fade-up">
      <ProfileTabs class="mb-4" @tab-change="handleTabChange" />

      <div class="main-details-card mb-4 shadow-sm">
        <div v-if="loading" class="loading-inside">
          <div class="custom-loader"></div>
          <p class="mt-4 khmer-font text-purple-accent">
            កំពុងផ្ទុកទិន្នន័យ...
          </p>
        </div>

        <div v-else-if="errorMessage" class="p-5 text-center text-danger">
          <h5 class="mb-3">មានបញ្ហា!</h5>
          <p>{{ errorMessage }}</p>
        </div>

        <template v-else>
          <div class="card-header-clean mb-4">
            <div class="accent-dot"></div>
            <h5 class="fw-bold mb-0 text-dark-indigo khmer-font-title">
              ព័ត៌មានលម្អិតអំពីគណនី
            </h5>
          </div>

          <div class="row g-4">
            <div
              class="col-md-6"
              v-for="(item, index) in displayInfo"
              :key="index"
            >
              <div class="info-box-item">
                <label class="info-label">{{ item.label }}</label>
                <div class="info-value-wrap">
                  <i :class="item.icon" class="me-2 text-purple-accent"></i>
                  <span class="info-value">
                    {{ item.value || "មិនទាន់មាន" }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";
import ProfileTabs from "@/components/profile/ProfileTabs.vue";

// ── This must match the key used in ProfileLayout.vue ──
const user = inject("profileUser");

const skills = ["HTML", "CSS", "Vue", "MySQL", "JavaScript"];

const displayInfo = computed(() => [
  {
    label: "ឈ្មោះពេញ",
    value: user?.value?.fullname,
    icon: "bi bi-person",
  },
  {
    label: "អាសយដ្ឋានអ៊ីមែល",
    value: user?.value?.email,
    icon: "bi bi-envelope",
  },
  {
    label: "លេខទូរស័ព្ទ",
    value: user?.value?.phoneNumber,
    icon: "bi bi-phone",
  },
  {
    label: "តំណភ្ជាប់តេឡេក្រាម",
    value: user?.value?.telegramLink,
    icon: "bi bi-send",
  },
]);

const handleTabChange = (tab) => {
  console.log("Tab changed to:", tab);
  // Future: router.push({ name: `user.profile.${tab}` }) if tabs become routes
};
</script>

<style scoped>
.main-details-card {
  background: white;
  border-radius: 32px;
  padding: 48px;
  border: 1px solid rgba(124, 58, 237, 0.05);
  min-height: 340px;
}

.loading-inside {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
}

.info-box-item {
  background: #fcfaff;
  padding: 24px;
  border-radius: 22px;
  border: 1px solid #f1efff;
  transition: all 0.3s ease;
}

.info-box-item:hover {
  background: #ffffff;
  border-color: #7c3aed;
  box-shadow: 0 12px 24px rgba(124, 58, 237, 0.06);
}

.info-label {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  display: block;
}

.info-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e1b4b;
}

.text-purple-accent {
  color: #7c3aed;
}

.text-dark-indigo {
  color: #1e1b4b;
}

.custom-loader {
  width: 60px;
  height: 60px;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #7c3aed;
  border-radius: 50%;
  animation: spin 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 991px) {
  .main-details-card {
    padding: 30px;
  }
}
</style>

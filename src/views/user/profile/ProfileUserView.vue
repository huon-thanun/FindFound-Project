<template>
  <ProfileLayout>
    <template #header>
      <ProfileHeader :user="user" />
    </template>

    <div v-if="user" class="profile-page">
      <section class="hero-lavender">
        <div class="container-fluid px-lg-5">
          <div class="row align-items-center pt-5 pb-5">
            <div class="col-md-auto text-center text-md-start">
              <div class="avatar-glow-wrapper" data-aos="zoom-in">
                <img :src="user.avatar || 'https://ui-avatars.com/api/?name=Admin'"
                  class="profile-img-premium shadow-lg" alt="Avatar" />
                <div class="status-indicator-online"></div>
              </div>
            </div>

            <div class="col-md ps-md-4 mt-4 mt-md-0 text-center text-md-start" data-aos="fade-right">
              <div class="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
                <h1 class="display-6 fw-bold text-dark-indigo mb-0 khmer-font-title">
                  {{ user.fullname }}
                </h1>
                <span class="badge-verified-glow">
                  <i class="bi bi-patch-check-fill"></i>
                </span>
              </div>
              <p class="text-muted fs-5 mb-3">{{ user.email }}</p>

              <div class="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                <span class="badge-status-premium">
                  {{
                    user.status === "ACTIVATED"
                      ? "អ្នកគ្រប់គ្រងប្រព័ន្ធ"
                      : "មិនទាន់ដំណើរការ"
                  }}
                </span>
                <button class="btn-edit-profile">
                  <i class="bi bi-pencil-square me-2"></i> កែប្រែព័ត៌មាន
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container-fluid px-lg-5 content-overlap">
        <div class="row g-4">
          <div class="col-lg-8" data-aos="fade-up">
            <ProfileTabs class="mb-4" @tab-change="handleTabChange" />

            <div class="main-details-card mb-4 shadow-sm">
              <div class="card-header-clean mb-4">
                <div class="accent-dot"></div>
                <h5 class="fw-bold mb-0 text-dark-indigo khmer-font-title">
                  ព័ត៌មានលម្អិតអំពីគណនី
                </h5>
              </div>

              <div class="row g-4">
                <div class="col-md-6" v-for="(item, key) in displayInfo" :key="key">
                  <div class="info-box-item">
                    <label class="info-label">{{ item.label }}</label>
                    <div class="info-value-wrap">
                      <i :class="item.icon" class="me-2 text-purple-accent"></i>
                      <span class="info-value">{{
                        item.value || "មិនទាន់មាន"
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <MyPostSection :userId="user.id" />
          </div>

          <div class="col-lg-4" data-aos="fade-left">
            <div class="sidebar-sticky">
              <ProfileSide :user="user" :skills="skills" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading-full">
      <div class="custom-loader"></div>
      <p class="mt-4 khmer-font text-purple-accent">កំពុងផ្ទុកទិន្នន័យ...</p>
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import ProfileTabs from "@/components/profile/ProfileTabs.vue";
import ProfileSide from "@/components/profile/ProfileSide.vue";
import MyPostSection from "@/components/profile/MyPostSection.vue";

const user = ref(null);
const activeTab = ref("overview");
const skills = ["HTML", "CSS", "Vue", "MySQL", "JavaScript"];

const displayInfo = computed(() => [
  { label: "ឈ្មោះពេញ", value: user.value?.fullname, icon: "bi bi-person" },
  {
    label: "អាសយដ្ឋានអ៊ីមែល",
    value: user.value?.email,
    icon: "bi bi-envelope",
  },
  { label: "លេខទូរស័ព្ទ", value: user.value?.phoneNumber, icon: "bi bi-phone" },
  {
    label: "តំណភ្ជាប់តេឡេក្រាម",
    value: user.value?.telegramLink,
    icon: "bi bi-send",
  },
]);

const handleTabChange = (tab) => {
  activeTab.value = tab;
};

onMounted(async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const json = await res.json();
    if (json.result) user.value = json.data;
  } catch (error) {
    console.error("Fetch Error:", error);
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;600;700&family=Koh+Santepheap:wght@700&display=swap");

.profile-page {
  font-family: "Kantumruy Pro", sans-serif;
  background-color: #f9f8ff;
  min-height: 100vh;
  padding-bottom: 80px;
}

.khmer-font-title {
  font-family: "Koh Santepheap", sans-serif;
}

/* HERO SECTION - Premium Lavender */
.hero-lavender {
  background-color: #f1edff;
  background-image:
    radial-gradient(at 0% 0%, rgba(124, 58, 237, 0.08) 0, transparent 50%),
    radial-gradient(at 50% 0%, rgba(59, 30, 84, 0.08) 0, transparent 50%);
  padding-bottom: 120px;
}

.avatar-glow-wrapper {
  position: relative;
  display: inline-block;
}

.profile-img-premium {
  width: 160px;
  height: 160px;
  border-radius: 42px;
  /* Smoother squircle */
  object-fit: cover;
  border: 6px solid #ffffff;
  transition: transform 0.3s ease;
}

.profile-img-premium:hover {
  transform: scale(1.02);
}

.status-indicator-online {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 22px;
  height: 22px;
  background: #00d084;
  border: 4px solid #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0, 208, 132, 0.4);
}

/* BADGES & ACTION BUTTONS */
.badge-status-premium {
  background: #3b1e54;
  color: #fff;
  padding: 10px 20px;
  border-radius: 14px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.btn-edit-profile {
  background: #ffffff;
  color: #3b1e54;
  border: 1px solid #e2e8f0;
  padding: 10px 22px;
  border-radius: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-edit-profile:hover {
  background: #7c3aed;
  color: white;
  border-color: #7c3aed;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(124, 58, 237, 0.15);
}

/* CONTENT BOXES */
.content-overlap {
  margin-top: -80px;
}

.main-details-card {
  background: white;
  border-radius: 32px;
  padding: 45px;
  border: 1px solid rgba(124, 58, 237, 0.05);
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

/* LOADING COMPONENT */
.loading-full {
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  .content-overlap {
    margin-top: 0;
    padding-top: 30px;
  }

  .main-details-card {
    padding: 30px;
  }
}
</style>

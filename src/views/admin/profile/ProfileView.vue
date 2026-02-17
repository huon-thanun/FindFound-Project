<template>
  <ProfileLayout>
    <template #header>
      <ProfileHeader :user="user" />
    </template>

    <!-- Hero always visible with immediate name, email & placeholder avatar -->
    <section class="hero-lavender">
      <div class="container-fluid px-lg-5">
        <div class="row align-items-center pt-5 pb-5">
          <!-- Avatar always shown – placeholder until real one loads -->
          <div class="col-md-auto text-center text-md-start">
            <div class="avatar-glow-wrapper" data-aos="zoom-in">
              <img
                :src="
                  user?.avatar ||
                  'https://ui-avatars.com/api/?name=Orn+Sambath&background=7c3aed&color=fff&size=128&rounded=true'
                "
                class="profile-img-premium shadow-lg"
                alt="Profile avatar"
              />
              <div class="status-indicator-online"></div>
            </div>
          </div>

          <!-- Name & email always visible immediately -->
          <div
            class="col-md ps-md-4 mt-4 mt-md-0 text-center text-md-start"
            data-aos="fade-right"
          >
            <div
              class="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2"
            >
              <h1
                class="display-6 fw-bold text-dark-indigo mb-0 khmer-font-title"
              >
                {{ user?.fullname || "Orn Sambath" }}
              </h1>
              <span class="badge-verified-glow">
                <i class="bi bi-patch-check-fill"></i>
              </span>
            </div>
            <p class="text-muted fs-5 mb-3">
              {{ user?.email || "sambathon483@gmail.com" }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="container-fluid px-lg-5 content-overlap">
      <div class="row g-4">
        <div class="col-lg-12" data-aos="fade-up">
          <ProfileTabsAdmin class="mb-4" @tab-change="handleTabChange" />

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
                      <span class="info-value">{{
                        item.value || "មិនទាន់មាន"
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="col-lg-4" data-aos="fade-left">
          <div class="sidebar-sticky">
            <ProfileSide :user="user" :skills="skills" />
          </div>
        </div>
      </div>
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import ProfileTabsAdmin from "@/components/profile/ProfileTabsAdmin.vue";

const user = ref(null);
const loading = ref(true);
const errorMessage = ref(null);

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
  console.log("Tab changed:", tab);
};

onMounted(async () => {
  loading.value = true;
  errorMessage.value = null;

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    const json = await res.json();

    if (json?.result && json?.data) {
      user.value = json.data;
    } else if (json?.data) {
      user.value = json.data;
    } else if (json?.user) {
      user.value = json.user;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (err) {
    console.error("Profile fetch failed:", err);
    errorMessage.value = "មិនអាចទាញយកព័ត៌មានបាន";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Your original styles remain unchanged */

.profile-page {
  font-family: "Kantumruy Pro", sans-serif;
  background-color: #f9f8ff;
  min-height: 100vh;
  padding-bottom: 80px;
}

.khmer-font-title {
  font-family: "Koh Santepheap", sans-serif;
}

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

.content-overlap {
  margin-top: -80px;
}

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
  .content-overlap {
    margin-top: 0;
    padding-top: 30px;
  }
  .main-details-card {
    padding: 30px;
  }
}
</style>

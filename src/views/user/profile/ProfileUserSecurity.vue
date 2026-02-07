<template>
  <ProfileLayout>
    <template #header>
      <ProfileHeader :user="user" />
    </template>

    <div v-if="!user" class="loading-full">
      <div class="custom-loader"></div>
      <p class="mt-4 khmer-font text-purple-accent">កំពុងផ្ទុកទិន្នន័យ...</p>
    </div>

    <div v-else class="profile-page">
      <section class="hero-lavender">
        <div class="container-fluid px-lg-5">
          <div class="row align-items-center pt-5 pb-5">
            <div class="col-md-auto text-center text-md-start">
              <div class="avatar-glow-wrapper" data-aos="zoom-in">
                <img
                  :src="user.avatar || 'https://ui-avatars.com/api/?name=Admin'"
                  class="profile-img-premium shadow-lg"
                  alt="Avatar"
                />
                <div class="status-indicator-online"></div>
              </div>
            </div>

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
                  {{ user.fullname }}
                </h1>
                <span class="badge-verified-glow">
                  <i class="bi bi-patch-check-fill"></i>
                </span>
              </div>
              <p class="text-muted fs-5 mb-3">{{ user.email }}</p>

              <div
                class="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start"
              >
                <span class="badge-status-premium">
                  {{
                    user.status === "ACTIVATED"
                      ? "អ្នកគ្រប់គ្រងប្រព័ន្ធ"
                      : "មិនទាន់ដំណើរការ"
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container-fluid px-lg-5 content-overlap">
        <div class="row g-4">
          <div class="col-lg-8" data-aos="fade-up">
            <ProfileTabs class="mb-4" />

            <div class="row g-4">
              <div class="col-md-6">
                <div class="main-details-card h-100 shadow-sm">
                  <div class="card-header-clean mb-4">
                    <div class="accent-dot"></div>
                    <h5 class="fw-bold mb-0 text-dark-indigo khmer-font-title">
                      ប្តូរលេខសម្ងាត់
                    </h5>
                  </div>

                  <div class="info-box-item-input mb-3">
                    <label class="info-label">លេខសម្ងាត់បច្ចុប្បន្ន</label>
                    <div class="input-with-icon">
                      <i class="bi bi-shield-lock text-purple-accent"></i>
                      <input
                        :type="showCurrentPassword ? 'text' : 'password'"
                        v-model="currentPassword"
                        class="clean-input"
                        placeholder="••••••••"
                      />
                      <button
                        @click="showCurrentPassword = !showCurrentPassword"
                        class="btn-eye"
                      >
                        <i
                          :class="
                            showCurrentPassword
                              ? 'bi bi-eye-slash'
                              : 'bi bi-eye'
                          "
                        ></i>
                      </button>
                    </div>
                  </div>

                  <div class="info-box-item-input mb-2">
                    <label class="info-label">លេខសម្ងាត់ថ្មី</label>
                    <div class="input-with-icon">
                      <i class="bi bi-key text-purple-accent"></i>
                      <input
                        :type="showNewPassword ? 'text' : 'password'"
                        v-model="newPassword"
                        class="clean-input"
                        placeholder="••••••••"
                      />
                      <button
                        @click="showNewPassword = !showNewPassword"
                        class="btn-eye"
                      >
                        <i
                          :class="
                            showNewPassword ? 'bi bi-eye-slash' : 'bi bi-eye'
                          "
                        ></i>
                      </button>
                    </div>
                  </div>

                  <div class="d-flex gap-1 mb-4">
                    <div
                      v-for="i in 4"
                      :key="i"
                      class="pwd-meter"
                      :class="{ active: newPassword.length > i * 2 }"
                    ></div>
                  </div>

                  <button
                    @click="updatePassword"
                    class="btn-save-premium w-100"
                    :disabled="
                      loadingPassword || !currentPassword || !newPassword
                    "
                  >
                    <span
                      v-if="loadingPassword"
                      class="spinner-border spinner-border-sm me-2"
                    ></span>
                    ធ្វើបច្ចុប្បន្នភាព
                  </button>
                </div>
              </div>

              <div class="col-md-6">
                <div class="main-details-card h-100 shadow-sm">
                  <div class="card-header-clean mb-4">
                    <div class="accent-dot"></div>
                    <h5 class="fw-bold mb-0 text-dark-indigo khmer-font-title">
                      ប្តូរអ៊ីមែល
                    </h5>
                  </div>

                  <div class="info-box-item-input mb-3">
                    <label class="info-label">អ៊ីមែលថ្មី</label>
                    <div class="input-with-icon">
                      <i class="bi bi-envelope-at text-purple-accent"></i>
                      <input
                        v-model="newEmail"
                        type="email"
                        class="clean-input"
                        placeholder="example@mail.com"
                      />
                    </div>
                  </div>

                  <div class="info-box-item-input mb-3">
                    <label class="info-label">លេខសម្ងាត់បញ្ជាក់</label>
                    <div class="input-with-icon">
                      <i class="bi bi-lock text-purple-accent"></i>
                      <input
                        :type="showEmailPassword ? 'text' : 'password'"
                        v-model="emailPassword"
                        class="clean-input"
                        placeholder="បញ្ចូលលេខសម្ងាត់"
                      />
                      <button
                        @click="showEmailPassword = !showEmailPassword"
                        class="btn-eye"
                      >
                        <i
                          :class="
                            showEmailPassword ? 'bi bi-eye-slash' : 'bi bi-eye'
                          "
                        ></i>
                      </button>
                    </div>
                  </div>

                  <div
                    v-if="emailRequested"
                    class="info-box-item-input mb-3 border-success animate-zoom"
                  >
                    <label class="info-label text-success"
                      >Token ផ្ទៀងផ្ទាត់</label
                    >
                    <input
                      v-model="emailVerifyToken"
                      type="text"
                      class="clean-input"
                      placeholder="បញ្ចូល Token ពីអ៊ីមែល"
                    />
                  </div>

                  <button
                    v-if="!emailRequested"
                    @click="requestEmailChange"
                    class="btn-outline-premium w-100 mt-2"
                    :disabled="loadingEmail || !newEmail || !emailPassword"
                  >
                    <span
                      v-if="loadingEmail"
                      class="spinner-border spinner-border-sm me-2"
                    ></span>
                    ស្នើសុំប្តូរអ៊ីមែល
                  </button>

                  <button
                    v-else
                    @click="verifyEmailChange"
                    class="btn-save-premium w-100 mt-2"
                    :disabled="loadingVerify || !emailVerifyToken"
                  >
                    <span
                      v-if="loadingVerify"
                      class="spinner-border spinner-border-sm me-2"
                    ></span>
                    ផ្ទៀងផ្ទាត់អ៊ីមែលថ្មី
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4" data-aos="fade-left">
            <div class="sidebar-sticky">
              <ProfileSide :user="user" :skills="skills" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </ProfileLayout>
</template>

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

.profile-img-premium {
  width: 160px;
  height: 160px;
  border-radius: 42px;
  object-fit: cover;
  border: 6px solid #ffffff;
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

/* CONTENT BOXES */
.content-overlap {
  margin-top: -80px;
}

.main-details-card {
  background: white;
  border-radius: 32px;
  padding: 40px;
  border: 1px solid rgba(124, 58, 237, 0.05);
}

.card-header-clean {
  display: flex;
  align-items: center;
  gap: 12px;
}
.accent-dot {
  width: 8px;
  height: 8px;
  background: #7c3aed;
  border-radius: 50%;
}

/* INPUT INFO BOX STYLE */
.info-box-item-input {
  background: #fcfaff;
  padding: 12px 20px;
  border-radius: 18px;
  border: 1px solid #f1efff;
  transition: all 0.3s ease;
  position: relative;
}

.info-box-item-input:focus-within {
  background: white;
  border-color: #7c3aed;
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.06);
}

.info-label {
  font-size: 0.7rem;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2px;
  display: block;
}

.input-with-icon {
  display: flex;
  align-items: center;
  gap: 10px;
}

.clean-input {
  border: none;
  background: transparent;
  width: 100%;
  font-weight: 600;
  color: #1e1b4b;
  outline: none;
  padding: 5px 0;
}

.btn-eye {
  background: none;
  border: none;
  color: #adb5bd;
  padding: 0;
}
.btn-eye:hover {
  color: #7c3aed;
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

/* BUTTONS */
.btn-save-premium {
  background: #3b1e54;
  color: white;
  padding: 14px;
  border-radius: 15px;
  font-weight: 700;
  border: none;
  transition: 0.3s;
}
.btn-save-premium:hover:not(:disabled) {
  background: #7c3aed;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(124, 58, 237, 0.2);
}

.btn-outline-premium {
  background: white;
  color: #3b1e54;
  border: 2px solid #3b1e54;
  padding: 12px;
  border-radius: 15px;
  font-weight: 700;
  transition: 0.3s;
}
.btn-outline-premium:hover:not(:disabled) {
  background: #f3eff7;
}

.pwd-meter {
  height: 4px;
  flex: 1;
  background: #eee;
  border-radius: 10px;
}
.pwd-meter.active {
  background: #7c3aed;
}

.text-purple-accent {
  color: #7c3aed;
}
.text-dark-indigo {
  color: #1e1b4b;
}

@media (max-width: 991px) {
  .content-overlap {
    margin-top: 0;
    padding-top: 30px;
  }
}
</style>
<script setup>
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import ProfileSide from "@/components/profile/ProfileSide.vue";
import ProfileTabs from "@/components/profile/ProfileTabs.vue";
import { ref, onMounted } from "vue";

const user = ref(null);
const skills = ["HTML", "CSS", "Vue", "MySQL", "JavaScript"];

const currentPassword = ref("");
const newPassword = ref("");
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);

const newEmail = ref("");
const emailPassword = ref("");
const showEmailPassword = ref(false);
const emailRequested = ref(false);
const emailVerifyToken = ref("");

const loadingPassword = ref(false);
const loadingEmail = ref(false);
const loadingVerify = ref(false);

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
  } catch (err) {
    console.error(err);
  }
});

const updatePassword = async () => {
  loadingPassword.value = true;
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
        }),
      },
    );
    if (!res.ok) throw new Error();
    alert("លេខសម្ងាត់បានប្តូរដោយជោគជ័យ! 🎉");
    currentPassword.value = "";
    newPassword.value = "";
  } catch (err) {
    alert("បរាជ័យក្នុងការប្តូរលេខសម្ងាត់");
  } finally {
    loadingPassword.value = false;
  }
};

const requestEmailChange = async () => {
  loadingEmail.value = true;
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/change-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newEmail: newEmail.value,
          password: emailPassword.value,
        }),
      },
    );
    if (!res.ok) throw new Error();
    emailRequested.value = true;
    alert("Token ផ្ទៀងផ្ទាត់ត្រូវបានផ្ញើទៅកាន់អ៊ីមែលថ្មី! 📩");
  } catch (err) {
    alert("មានបញ្ហាក្នុងការស្នើសុំ");
  } finally {
    loadingEmail.value = false;
  }
};

const verifyEmailChange = async () => {
  loadingVerify.value = true;
  try {
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/verify-change-email",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: emailVerifyToken.value.trim() }),
      },
    );
    if (!res.ok) throw new Error();
    alert("អ៊ីមែលបានផ្ទៀងផ្ទាត់រួចរាល់! 🎉");
    user.value.email = newEmail.value;
    emailRequested.value = false;
  } catch (err) {
    alert("Token មិនត្រឹមត្រូវ");
  } finally {
    loadingVerify.value = false;
  }
};
</script>

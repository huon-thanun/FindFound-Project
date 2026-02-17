<template>
  <ProfileLayout>
    <template #header>
      <ProfileHeader :user="user" />
    </template>

    <!-- Hero always visible -->
    <section class="hero-lavender">
      <div class="container-fluid px-lg-5">
        <div class="row align-items-center pt-5 pb-5">
          <div class="col-md-auto text-center text-md-start">
            <div class="avatar-glow-wrapper" data-aos="zoom-in">
              <img
                :src="
                  previewAvatar ||
                  form.avatar ||
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${form.fullname || 'Orn Sambath'}&background=7c3aed&color=fff&size=128&rounded=true`
                "
                class="profile-img-premium shadow-lg"
                alt="Avatar"
              />
              <label for="avatarInput" class="avatar-edit-badge">
                <i class="bi bi-camera-fill"></i>
              </label>
              <input
                type="file"
                id="avatarInput"
                class="d-none"
                @change="onAvatarChange"
                accept="image/jpeg,image/png,image/gif"
              />
            </div>
          </div>

          <div
            class="col-md ps-md-4 mt-4 mt-md-0 text-center text-md-start"
            data-aos="fade-right"
          >
            <h1
              class="display-6 fw-bold text-dark-indigo mb-1 khmer-font-title"
            >
              {{ form.fullname || user?.fullname || "Orn Sambath" }}
            </h1>
            <p class="text-muted fs-5 mb-3">
              {{ form.email || user?.email || "sambathon483@gmail.com" }}
            </p>

            <div
              class="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start"
            >
              <button
                class="btn-delete-simple"
                @click="showConfirmPopup = true"
              >
                <i class="bi bi-trash3 me-2"></i> លុបរូបភាពប្រើប្រាស់
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container-fluid px-lg-5 content-overlap">
      <div class="row g-4">
        <div class="col-lg-12" data-aos="fade-up">
          <ProfileTabsAdmin class="mb-4" />

          <div class="main-details-card mb-4 shadow-sm">
            <div class="card-header-clean mb-4">
              <div class="accent-dot"></div>
              <h5 class="fw-bold mb-0 text-dark-indigo khmer-font-title">
                កែប្រែព័ត៌មានផ្ទាល់ខ្លួន
              </h5>
            </div>

            <div v-if="loading" class="loading-inside">
              <div class="custom-loader"></div>
              <p class="mt-4 khmer-font text-purple-accent">
                កំពុងផ្ទុកទិន្នន័យ...
              </p>
            </div>

            <div v-else class="row g-4">
              <div class="col-md-6">
                <div class="info-box-item-input">
                  <label class="info-label">ឈ្មោះពេញ *</label>
                  <div class="input-with-icon">
                    <i class="bi bi-person text-purple-accent"></i>
                    <input
                      v-model="form.fullname"
                      @input="validateFullname"
                      type="text"
                      class="clean-input"
                      :class="{ 'is-invalid': errors.fullname }"
                      placeholder="ឈ្មោះពេញ"
                    />
                  </div>
                  <small v-if="errors.fullname" class="text-danger">{{
                    errors.fullname
                  }}</small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="info-box-item-input disabled-box">
                  <label class="info-label"
                    >អាសយដ្ឋានអ៊ីមែល (មិនអាចប្តូរបាន)</label
                  >
                  <div class="input-with-icon">
                    <i class="bi bi-envelope text-muted"></i>
                    <input
                      v-model="form.email"
                      type="email"
                      class="clean-input"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="info-box-item-input">
                  <label class="info-label">លេខទូរស័ព្ទ</label>
                  <div class="input-with-icon">
                    <i class="bi bi-phone text-purple-accent"></i>
                    <input
                      v-model="form.phoneNumber"
                      @input="validatePhone"
                      type="text"
                      class="clean-input"
                      :class="{ 'is-invalid': errors.phoneNumber }"
                      placeholder="012345678"
                    />
                  </div>
                  <small v-if="errors.phoneNumber" class="text-danger">{{
                    errors.phoneNumber
                  }}</small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="info-box-item-input">
                  <label class="info-label">តំណភ្ជាប់ Telegram</label>
                  <div class="input-with-icon">
                    <i class="bi bi-send text-purple-accent"></i>
                    <input
                      v-model="form.telegramLink"
                      @input="validateTelegram"
                      type="text"
                      class="clean-input"
                      :class="{ 'is-invalid': errors.telegramLink }"
                      placeholder="https://t.me/username"
                    />
                  </div>
                  <small v-if="errors.telegramLink" class="text-danger">{{
                    errors.telegramLink
                  }}</small>
                </div>
              </div>

              <div class="col-12 mt-4">
                <button
                  @click="updateProfile"
                  class="btn-save-premium"
                  :disabled="saving || !isFormValid || !isDirty"
                >
                  <span
                    v-if="saving"
                    class="spinner-border spinner-border-sm me-2"
                  ></span>
                  <i v-else class="bi bi-cloud-arrow-up-fill me-2"></i>
                  រក្សាទុក
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

    <!-- Toast -->
    <BaseToast
      v-model="showToast"
      :message="toastMessage"
      :theme="toastTheme"
      :icon="toastIcon"
      :duration="3000"
    />

    <!-- Confirm Delete Avatar -->
    <div v-if="showConfirmPopup" class="popup-backdrop">
      <div class="popup-card animate-zoom">
        <div class="popup-icon text-warning">
          <i class="bi bi-question-circle-fill"></i>
        </div>
        <h5 class="fw-bold">បញ្ជាក់ការលុប</h5>
        <p class="text-muted">តើអ្នកពិតជាចង់លុបរូបភាពប្រើប្រាស់មែនទេ?</p>
        <div class="d-flex justify-content-center gap-2 mt-4">
          <button
            class="btn btn-light px-4 rounded-3"
            @click="showConfirmPopup = false"
          >
            បោះបង់
          </button>
          <button class="btn btn-danger px-4 rounded-3" @click="confirmYes">
            លុបចេញ
          </button>
        </div>
      </div>
    </div>
  </ProfileLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import ProfileTabsAdmin from "@/components/profile/ProfileTabsAdmin.vue";
import BaseToast from "@/components/base/BaseToast.vue";

const user = ref(null);
const form = ref({
  fullname: "Orn Sambath",
  email: "sambathon483@gmail.com",
  phoneNumber: "",
  telegramLink: "",
  avatar: "",
});

const previewAvatar = ref(null);
const loading = ref(true);
const saving = ref(false);

// Toast
const showToast = ref(false);
const toastMessage = ref("");
const toastTheme = ref("success");
const toastIcon = ref("check-circle");

const showBaseToast = (message, theme = "success") => {
  toastMessage.value = message;
  toastTheme.value = theme;
  toastIcon.value = theme === "success" ? "check-circle" : "x-circle";
  showToast.value = true;
};

// Validation
const errors = ref({
  fullname: "",
  phoneNumber: "",
  telegramLink: "",
});

const validateFullname = () => {
  errors.value.fullname = !form.value.fullname.trim()
    ? "សូមបញ្ចូលឈ្មោះពេញ"
    : "";
};

const validatePhone = () => {
  const phone = form.value.phoneNumber?.trim();
  errors.value.phoneNumber =
    phone && !/^[0-9]{8,12}$/.test(phone)
      ? "លេខទូរស័ព្ទមិនត្រឹមត្រូវ (៨-១២ ខ្ទង់)"
      : "";
};

const validateTelegram = () => {
  const link = form.value.telegramLink?.trim();
  errors.value.telegramLink =
    link && !link.startsWith("https://t.me/")
      ? "តំណ Telegram ត្រូវចាប់ផ្តើមដោយ https://t.me/"
      : "";
};

const isFormValid = computed(() => {
  return (
    !errors.value.fullname &&
    !errors.value.phoneNumber &&
    !errors.value.telegramLink &&
    form.value.fullname.trim() !== ""
  );
});

const isDirty = computed(() => {
  if (!user.value) return false;

  const normalize = (value) => (value == null ? "" : String(value).trim());

  return (
    normalize(form.value.fullname) !== normalize(user.value.fullname) ||
    normalize(form.value.phoneNumber) !== normalize(user.value.phoneNumber) ||
    normalize(form.value.telegramLink) !== normalize(user.value.telegramLink)
  );
});

// File upload validation constants
const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB (change to your API limit)
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

// Load profile
onMounted(async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      showBaseToast("សូមចូលគណនីជាមុន", "error");
      return;
    }

    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const json = await res.json();

    if (json.result && json.data) {
      user.value = json.data;
      Object.assign(form.value, json.data);
      previewAvatar.value = json.data.avatar;
    } else {
      showBaseToast("មិនអាចផ្ទុកព័ត៌មានប្រវត្តិរូបបានទេ", "error");
    }
  } catch (err) {
    console.error("Profile load error:", err);
    showBaseToast("មានបញ្ហាក្នុងការភ្ជាប់ម៉ាស៊ីនមេ", "error");
  } finally {
    loading.value = false;
  }
});

// Avatar Upload with validation
const onAvatarChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // 1. Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    showBaseToast("សូមជ្រើសរើសរូបភាព JPG, PNG ឬ GIF ប៉ុណ្ណោះ", "error");
    return;
  }

  // 2. Check file size (client-side)
  if (file.size > MAX_AVATAR_SIZE) {
    const mb = (MAX_AVATAR_SIZE / 1024 / 1024).toFixed(1);
    showBaseToast(`ទំហំរូបភាពមិនអាចលើសពី ${mb} MB`, "error");
    return;
  }

  // Show preview immediately
  previewAvatar.value = URL.createObjectURL(file);

  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile/avatar",
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      },
    );

    const json = await res.json();

    if (!res.ok) {
      if (res.status === 413) {
        throw new Error(`រូបភាពធំពេក (Payload Too Large)`);
      }
      throw new Error(json.message || "Upload failed");
    }

    user.value.avatar = json.data.avatar;
    form.value.avatar = json.data.avatar;
    previewAvatar.value = json.data.avatar;
    showBaseToast("រូបភាពត្រូវបានផ្លាស់ប្តូរជោគជ័យ 🎉", "success");
  } catch (err) {
    console.error(err);
    showBaseToast(err.message || "មិនអាចផ្ទុករូបភាពបានទេ", "error");
    previewAvatar.value = form.value.avatar || user.value?.avatar;
  }
};

// Delete Avatar
const showConfirmPopup = ref(false);
let confirmAction = null;

const deleteAvatar = () => {
  confirmAction = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile/avatar",
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!res.ok) throw new Error();

      user.value.avatar = "";
      form.value.avatar = "";
      previewAvatar.value = null;
      showBaseToast("រូបភាពត្រូវបានលុបចេញ 🗑️", "success");
    } catch (err) {
      showBaseToast("បរាជ័យក្នុងការលុបរូបភាព", "error");
    }
  };

  showConfirmPopup.value = true;
};

const confirmYes = async () => {
  showConfirmPopup.value = false;
  if (confirmAction) await confirmAction();
  confirmAction = null;
};

// Update Profile
const updateProfile = async () => {
  validateFullname();
  validatePhone();
  validateTelegram();

  if (!isFormValid.value) {
    showBaseToast("សូមបំពេញព័ត៌មានឲ្យត្រឹមត្រូវ", "error");
    return;
  }

  if (!isDirty.value) {
    showBaseToast("មិនមានការផ្លាស់ប្តូរអ្វីទេ", "info");
    return;
  }

  saving.value = true;

  try {
    const token = localStorage.getItem("token");
    const payload = {
      fullname: form.value.fullname.trim(),
    };

    if (form.value.phoneNumber?.trim())
      payload.phoneNumber = form.value.phoneNumber.trim();
    if (form.value.telegramLink?.trim())
      payload.telegramLink = form.value.telegramLink.trim();

    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Update failed");
    }

    user.value = { ...user.value, ...payload };
    showBaseToast("ព័ត៌មានត្រូវបានរក្សាទុកជោគជ័យ 🎉", "success");
  } catch (err) {
    console.error(err);
    showBaseToast(
      err.message || "មិនអាចរក្សាទុកបានទេ សូមព្យាយាមម្តងទៀត",
      "error",
    );
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
.loading-inside {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
}

/* ... rest of your styles remain unchanged ... */

/* Your original styles + loading-inside to match profile view */
.loading-inside {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
}

/* ... keep all your other styles (hero, inputs, buttons, popups, etc.) ... */

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
  object-fit: cover;
  border: 6px solid #ffffff;
}

.avatar-edit-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: #7c3aed;
  color: white;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 10px rgba(124, 58, 237, 0.3);
  transition: 0.3s;
}

.avatar-edit-badge:hover {
  transform: scale(1.1);
  background: #3b1e54;
}

.btn-delete-simple {
  background: transparent;
  color: #dc3545;
  border: 1px solid rgba(220, 53, 69, 0.2);
  padding: 8px 20px;
  border-radius: 12px;
  font-weight: 600;
  transition: 0.3s;
}

.btn-delete-simple:hover {
  background: #fff5f5;
  border-color: #dc3545;
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
  padding: 15px 24px;
  border-radius: 22px;
  border: 1px solid #f1efff;
  transition: all 0.3s ease;
}

.info-box-item-input:focus-within {
  background: white;
  border-color: #7c3aed;
  box-shadow: 0 12px 24px rgba(124, 58, 237, 0.06);
}

.info-label {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
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
}

.disabled-box {
  background: #f1f1f1;
  opacity: 0.8;
}

.btn-save-premium {
  background: #3b1e54;
  color: white;
  width: 100%;
  padding: 16px;
  border-radius: 18px;
  font-weight: 700;
  border: none;
  transition: 0.3s;
}

.btn-save-premium:hover:not(:disabled) {
  background: #7c3aed;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(124, 58, 237, 0.2);
}

/* LOADING COMPONENT (Original Style) */
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

/* POPUP UI */
.popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.popup-card {
  background: white;
  padding: 40px;
  border-radius: 32px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.popup-icon {
  font-size: 3.5rem;
  margin-bottom: 15px;
}

.animate-zoom {
  animation: zoomIn 0.3s ease;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
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

  .main-details-card {
    padding: 30px;
  }
}
</style>

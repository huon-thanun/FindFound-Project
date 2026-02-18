<template>
  <div class="profile-page">
    <!-- Persistent hero with upload validation -->
    <section class="hero-lavender">
      <div class="container-fluid px-lg-5">
        <div class="row align-items-center pt-5 pb-5">
          <div class="col-md-auto text-center text-md-start">
            <div class="avatar-glow-wrapper" data-aos="zoom-in">
              <img
                :src="
                  previewAvatar ||
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.fullname || 'Orn Sambath',
                  )}&background=7c3aed&color=fff&size=128&rounded=true`
                "
                class="profile-img-premium shadow-lg"
                alt="Profile avatar"
              />
              <label for="avatarInput" class="avatar-edit-badge">
                <i class="bi bi-camera-fill"></i>
              </label>
              <input
                type="file"
                id="avatarInput"
                class="d-none"
                @change="handleAvatarUpload"
                accept="image/*"
              />
            </div>

            <!-- Red validation error message - right below avatar -->
            <div v-if="avatarError" class="avatar-error text-danger mt-2 small">
              {{ avatarError }}
            </div>
          </div>

          <div
            class="col-md ps-md-4 mt-4 mt-md-0 text-center text-md-start"
            data-aos="fade-right"
          >
            <h1
              class="display-6 fw-bold text-dark-indigo mb-1 khmer-font-title"
            >
              {{ user?.fullname || "Orn Sambath" }}
            </h1>
            <p class="text-muted fs-5 mb-3">
              {{ user?.email || "sambathon483@gmail.com" }}
            </p>

            <div
              class="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start"
            >
              <button
                class="btn-delete-simple"
                @click="showDeleteConfirm = true"
              >
                <i class="bi bi-trash3 me-2"></i> លុបរូបភាពប្រើប្រាស់
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Child content -->
    <div class="container-fluid px-lg-5 content-overlap">
      <router-view />
    </div>

    <!-- Toast -->
    <BaseToast
      v-model="showToast"
      :message="toastMessage"
      :theme="toastTheme"
      :icon="toastIcon"
      :duration="3000"
    />

    <!-- Delete confirmation popup -->
    <div v-if="showDeleteConfirm" class="popup-backdrop">
      <div class="popup-card animate-zoom">
        <div class="popup-icon text-warning">
          <i class="bi bi-question-circle-fill"></i>
        </div>
        <h5 class="fw-bold">បញ្ជាក់ការលុប</h5>
        <p class="text-muted">តើអ្នកពិតជាចង់លុបរូបភាពប្រើប្រាស់មែនទេ?</p>
        <div class="d-flex justify-content-center gap-2 mt-4">
          <button
            class="btn btn-light px-4 rounded-3"
            @click="showDeleteConfirm = false"
          >
            បោះបង់
          </button>
          <button
            class="btn btn-danger px-4 rounded-3"
            @click="confirmDeleteAvatar"
          >
            លុបចេញ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
import BaseToast from "@/components/base/BaseToast.vue";

const user = ref(null);
const previewAvatar = ref(null);
const loading = ref(true);

// Toast states
const showToast = ref(false);
const toastMessage = ref("");
const toastTheme = ref("success");
const toastIcon = ref("check-circle");

const showBaseToast = (msg, theme = "success") => {
  toastMessage.value = msg;
  toastTheme.value = theme;
  toastIcon.value = theme === "success" ? "check-circle" : "x-circle";
  showToast.value = true;
};

// Avatar validation error (red text below image)
const avatarError = ref("");

// Delete popup
const showDeleteConfirm = ref(false);

provide("profileUser", user);

// Fetch user
onMounted(async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token");

    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    if (json.result && json.data) {
      user.value = json.data;
      previewAvatar.value = json.data.avatar;
    } else {
      showBaseToast("មិនអាចផ្ទុកព័ត៌មានបានទេ", "error");
    }
  } catch (err) {
    console.error(err);
    showBaseToast("មានបញ្ហាក្នុងការភ្ជាប់ម៉ាស៊ីនមេ", "error");
  } finally {
    loading.value = false;
  }
});

// Improved upload with validation
const handleAvatarUpload = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Reset previous error
  avatarError.value = "";

  // Validation 1: Must be image
  if (!file.type.startsWith("image/")) {
    avatarError.value = "សូមជ្រើសរើសរូបភាព (jpg, png, webp ជាដើម)";
    return;
  }

  // Validation 2: Max 1MB (from backend error)
  const MAX_SIZE_MB = 1;
  const maxBytes = MAX_SIZE_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    avatarError.value = `រូបភាពធំពេក! អនុញ្ញាតត្រឹម ${MAX_SIZE_MB}MB ប៉ុណ្ណោះ (របស់អ្នក: ${sizeMB}MB)`;
    return;
  }

  // Valid → show preview
  previewAvatar.value = URL.createObjectURL(file);

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("សូមចូលគណនីឡើងវិញ");

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

    let json;
    try {
      json = await res.json();
    } catch {
      json = { message: (await res.text()) || `កំហុស ${res.status}` };
    }

    if (!res.ok) {
      throw new Error(json.details || json.message || `កំហុស ${res.status}`);
    }

    const newAvatar = json.data?.avatar;
    if (!newAvatar) throw new Error("មិនមាន URL រូបភាពត្រឡប់មក");

    user.value.avatar = newAvatar;
    previewAvatar.value = newAvatar;
    showBaseToast("រូបភាពត្រូវបានផ្លាស់ប្តូរជោគជ័យ 🎉", "success");
  } catch (err) {
    console.error("Upload failed:", err);
    avatarError.value = err.message || "មិនអាចផ្ទុករូបភាពបានទេ";
    showBaseToast(err.message || "មានបញ្ហា", "error");
    previewAvatar.value = user.value?.avatar || null;
  }
};

// Delete avatar
const confirmDeleteAvatar = async () => {
  showDeleteConfirm.value = false;

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile/avatar",
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (!res.ok) throw new Error("Delete failed");

    user.value.avatar = "";
    previewAvatar.value = null;
    showBaseToast("រូបភាពត្រូវបានលុបចេញ 🗑️", "success");
  } catch (err) {
    console.error(err);
    showBaseToast("បរាជ័យក្នុងការលុបរូបភាព", "error");
  }
};
</script>

<style scoped>
/* Add this new style for red error below avatar */
.avatar-error {
  font-size: 0.85rem;
  margin-top: 6px;
  text-align: center;
  max-width: 160px;
  word-break: break-word;
}

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

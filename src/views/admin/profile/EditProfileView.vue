<template>
  <div class="row g-4">
    <div class="col-lg-12" data-aos="fade-up">
      <!-- Admin-specific tabs -->
      <!-- <ProfileTabsAdmin class="mb-4" /> -->
      <ProfileTabsAdmin class="mb-4" />

      <div class="main-details-card mb-4 shadow-sm">
        <div class="card-header-clean mb-4">
          <div class="accent-dot"></div>
          <h5 class="fw-bold mb-0 text-dark-indigo khmer-font-title">
            កែប្រែព័ត៌មានអ្នកគ្រប់គ្រង
          </h5>
          <small class="text-muted d-block mt-1">
            គណនីអ្នកគ្រប់គ្រង (Admin Profile Edit)
          </small>
        </div>

        <div v-if="loading" class="loading-inside">
          <div class="custom-loader"></div>
          <p class="mt-4 khmer-font text-purple-accent">
            កំពុងផ្ទុកទិន្នន័យ...
          </p>
        </div>

        <div v-else class="row g-4">
          <!-- Fullname -->
          <div class="col-md-6">
            <div class="info-box-item-input">
              <label class="info-label">ឈ្មោះពេញ *</label>
              <div
                class="input-with-icon"
                :class="{ 'is-invalid': errors.fullname }"
              >
                <i class="bi bi-person text-purple-accent"></i>
                <input
                  v-model.trim="form.fullname"
                  @input="validateFullname"
                  type="text"
                  class="clean-input"
                  placeholder="ឈ្មោះពេញ"
                />
              </div>
              <small v-if="errors.fullname" class="text-danger error-text">
                {{ errors.fullname }}
              </small>
            </div>
          </div>

          <!-- Email (disabled) -->
          <div class="col-md-6">
            <div class="info-box-item-input disabled-box">
              <label class="info-label">អាសយដ្ឋានអ៊ីមែល (មិនអាចប្តូរបាន)</label>
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

          <!-- Phone -->
          <div class="col-md-6">
            <div class="info-box-item-input">
              <label class="info-label">លេខទូរស័ព្ទ</label>
              <div
                class="input-with-icon"
                :class="{ 'is-invalid': errors.phoneNumber }"
              >
                <i class="bi bi-phone text-purple-accent"></i>
                <input
                  v-model.trim="form.phoneNumber"
                  @input="validatePhone"
                  type="tel"
                  class="clean-input"
                  placeholder="012 345 678"
                />
              </div>
              <small v-if="errors.phoneNumber" class="text-danger error-text">
                {{ errors.phoneNumber }}
              </small>
            </div>
          </div>

          <!-- Telegram -->
          <div class="col-md-6">
            <div class="info-box-item-input">
              <label class="info-label">តំណភ្ជាប់ Telegram</label>
              <div
                class="input-with-icon"
                :class="{ 'is-invalid': errors.telegramLink }"
              >
                <i class="bi bi-send text-purple-accent"></i>
                <input
                  v-model.trim="form.telegramLink"
                  @input="validateTelegram"
                  type="url"
                  class="clean-input"
                  placeholder="https://t.me/yourusername"
                />
              </div>
              <small v-if="errors.telegramLink" class="text-danger error-text">
                {{ errors.telegramLink }}
              </small>
            </div>
          </div>

          <!-- Admin-only section -->
          <div v-if="isAdmin" class="col-12 mt-4 pt-4 border-top">
            <h6 class="fw-bold text-danger mb-3">
              កែប្រែព័ត៌មានអ្នកគ្រប់គ្រង (Admin Only)
            </h6>
            <div class="row g-4">
              <!-- Role -->
              <div class="col-md-6">
                <div class="info-box-item-input">
                  <label class="info-label text-danger">ឋានៈ / Role *</label>
                  <div
                    class="input-with-icon"
                    :class="{ 'is-invalid': errors.role }"
                  >
                    <i class="bi bi-shield-lock text-danger"></i>
                    <select
                      v-model="form.role"
                      @change="validateRole"
                      class="clean-input"
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                  </div>
                  <small v-if="errors.role" class="text-danger error-text">
                    {{ errors.role }}
                  </small>
                </div>
              </div>

              <!-- Account Status -->
              <div class="col-md-6">
                <div class="info-box-item-input">
                  <label class="info-label text-danger">ស្ថានភាពគណនី</label>
                  <div class="input-with-icon">
                    <i class="bi bi-toggle-on text-danger"></i>
                    <select v-model="form.status" class="clean-input">
                      <option value="active">សកម្ម (Active)</option>
                      <option value="suspended">ផ្អាក (Suspended)</option>
                      <option value="banned">ហាមឃាត់ (Banned)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Small admin note -->
            <div class="mt-3">
              <small class="text-muted">
                ការផ្លាស់ប្តូរឋានៈ ឬស្ថានភាពអាចប៉ះពាល់ដល់សិទ្ធិប្រើប្រាស់។
                សូមប្រុងប្រយ័ត្ន។
              </small>
            </div>
          </div>

          <!-- Save button -->
          <div class="col-12 mt-5">
            <button
              @click="updateProfile"
              class="btn-save-premium"
              :disabled="saving || !isFormValid || !isFormDirty"
            >
              <span
                v-if="saving"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              <i v-else class="bi bi-cloud-arrow-up-fill me-2"></i>
              រក្សាទុកព័ត៌មានអ្នកគ្រប់គ្រង
            </button>
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
      :duration="3500"
    />
  </div>
</template>

<script setup>
import { ref, computed, inject, watch } from "vue";
import ProfileTabsAdmin from "@/components/profile/ProfileTabsAdmin.vue";
import BaseToast from "@/components/base/BaseToast.vue";

// ── Toast ──────────────────────────────────────────────────────
const showToast = ref(false);
const toastMessage = ref("");
const toastTheme = ref("success");
const toastIcon = ref("check-circle");

const showLocalToast = (msg, theme = "success") => {
  toastMessage.value = msg;
  toastTheme.value = theme;
  toastIcon.value = theme === "success" ? "check-circle" : "x-circle";
  showToast.value = true;
};

// ── Data & Role check ──────────────────────────────────────────
const user = inject("profileUser");

const isAdmin = computed(() => {
  const role = user?.value?.role?.toLowerCase?.() || "";
  return role === "admin" || role === "superadmin";
});

const form = ref({
  fullname: "",
  email: "",
  phoneNumber: "",
  telegramLink: "",
  role: "admin",
  status: "active",
});

const loading = ref(true);
const saving = ref(false);

const errors = ref({
  fullname: "",
  phoneNumber: "",
  telegramLink: "",
  role: "",
});

// ── Validation ─────────────────────────────────────────────────
const validateFullname = () => {
  errors.value.fullname = !form.value.fullname.trim()
    ? "សូមបញ្ចូលឈ្មោះពេញ"
    : "";
};

const validatePhone = () => {
  const phone = form.value.phoneNumber.trim();
  if (!phone) {
    errors.value.phoneNumber = "";
    return;
  }
  errors.value.phoneNumber = !/^[0-9]{8,12}$/.test(phone)
    ? "លេខទូរស័ព្ទត្រូវមាន ៨-១២ ខ្ទង់ (គ្មានអក្សរ ឬកន្លះ)"
    : "";
};

const validateTelegram = () => {
  const link = form.value.telegramLink.trim();
  if (!link) {
    errors.value.telegramLink = "";
    return;
  }
  errors.value.telegramLink = !link.startsWith("https://t.me/")
    ? "តំណ Telegram ត្រូវចាប់ផ្តើមដោយ https://t.me/"
    : "";
};

const validateRole = () => {
  errors.value.role = !form.value.role ? "សូមជ្រើសរើសឋានៈ" : "";
};

const isFormValid = computed(() => {
  const baseValid =
    !errors.value.fullname &&
    !errors.value.phoneNumber &&
    !errors.value.telegramLink &&
    !!form.value.fullname.trim();

  if (isAdmin.value) {
    return baseValid && !errors.value.role && !!form.value.role;
  }
  return baseValid;
});

const isFormDirty = computed(() => {
  if (!user?.value) return false;
  const n = (v) => (v == null ? "" : String(v).trim());

  let dirty =
    n(form.value.fullname) !== n(user.value.fullname) ||
    n(form.value.phoneNumber) !== n(user.value.phoneNumber) ||
    n(form.value.telegramLink) !== n(user.value.telegramLink);

  if (isAdmin.value) {
    dirty =
      dirty ||
      n(form.value.role) !== n(user.value.role) ||
      n(form.value.status) !== n(user.value.status);
  }

  return dirty;
});

// ── Load initial data ──────────────────────────────────────────
watch(
  () => user?.value,
  (userData) => {
    if (userData) {
      form.value = {
        fullname: userData.fullname || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        telegramLink: userData.telegramLink || "",
        role: userData.role || "admin",
        status: userData.status || "active",
      };
      loading.value = false;
    }
  },
  { immediate: true },
);

// ── Submit ─────────────────────────────────────────────────────
const updateProfile = async () => {
  validateFullname();
  validatePhone();
  validateTelegram();
  if (isAdmin.value) validateRole();

  if (!isFormValid.value) {
    showLocalToast("សូមបំពេញព័ត៌មានឲ្យត្រឹមត្រូវ", "error");
    return;
  }

  if (!isFormDirty.value) {
    showLocalToast("មិនមានការផ្លាស់ប្តូរអ្វីទេ", "info");
    return;
  }

  saving.value = true;

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("សូមចូលគណនីឡើងវិញ");

    const payload = {
      fullname: form.value.fullname.trim(),
    };

    if (form.value.phoneNumber?.trim())
      payload.phoneNumber = form.value.phoneNumber.trim();
    if (form.value.telegramLink?.trim())
      payload.telegramLink = form.value.telegramLink.trim();

    // Admin fields
    if (isAdmin.value) {
      payload.role = form.value.role;
      payload.status = form.value.status;
    }

    console.log("Sending admin profile update:", payload);

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
      let errorDetail = `កំហុស ${res.status}`;
      try {
        const errData = await res.json();
        console.error("Server error:", errData);
        errorDetail = errData.message || errData.error || errorDetail;
      } catch {}
      throw new Error(errorDetail);
    }

    // Update local reactive user
    if (user?.value) {
      Object.assign(user.value, {
        fullname: form.value.fullname,
        phoneNumber: form.value.phoneNumber,
        telegramLink: form.value.telegramLink,
        ...(isAdmin.value && {
          role: form.value.role,
          status: form.value.status,
        }),
      });
    }

    showLocalToast("ព័ត៌មានអ្នកគ្រប់គ្រងត្រូវបានរក្សាទុកជោគជ័យ 🎉", "success");
  } catch (err) {
    console.error("Admin profile update failed:", err);
    showLocalToast(
      err.message || "មិនអាចរក្សាទុកបានទេ សូមព្យាយាមម្តងទៀត",
      "error",
    );
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
.main-details-card {
  background: white;
  border-radius: 32px;
  padding: 45px;
  border: 1px solid rgba(124, 58, 237, 0.05);
}

.info-box-item-input {
  background: #fcfaff;
  padding: 15px 24px;
  border-radius: 22px;
  border: 1px solid #f1efff;
  transition: all 0.3s ease;
}

.input-with-icon {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 2px solid transparent;
  border-radius: 16px;
  background: white;
  transition: all 0.2s ease;
}

.input-with-icon:focus-within {
  border-color: #7c3aed;
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.12);
}

.input-with-icon.is-invalid {
  border-color: #dc3545;
  background: #fff5f5;
  box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.1);
}

.clean-input {
  border: none !important;
  background: transparent;
  width: 100%;
  font-weight: 600;
  color: #1e1b4b;
  outline: none;
  font-size: 1rem;
}

.clean-input option {
  background: white;
  color: #1e1b4b;
}

.error-text {
  font-size: 0.875rem;
  margin-top: 6px;
  display: block;
}

.disabled-box .input-with-icon {
  background: #f8f9fa;
  border-color: #e2e8f0;
}

.btn-save-premium {
  background: #3b1e54;
  color: white;
  width: 100%;
  padding: 16px;
  border-radius: 18px;
  font-weight: 700;
  border: none;
  transition: all 0.3s;
}

.btn-save-premium:hover:not(:disabled) {
  background: #7c3aed;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(124, 58, 237, 0.25);
}

.btn-save-premium:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.loading-inside {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
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

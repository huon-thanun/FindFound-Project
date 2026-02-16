<template>
  <div
    class="min-vh-100 d-flex align-items-center justify-content-center signup-bg animate-enter"
  >
    <div
      class="card border-0 shadow-lg rounded-4 overflow-hidden"
      style="max-width: 1000px; width: 100%"
    >
      <div class="row g-0">
        <!-- LEFT FORM SIDE (REWRITTEN) -->
        <div class="col-md-6 bg-white p-5">
          <!-- Header -->
          <div class="mb-4">
            <h2 class="fw-semibold mb-1">បង្កើតគណនីរបស់អ្នក</h2>
            <p class="text-muted small">សូមបំពេញព័ត៌មានដើម្បីបង្កើតគណនីថ្មី</p>
          </div>

          <form @submit.prevent="register">
            <!-- Name row -->
            <div class="row g-3 mb-3" placeholder="ឧ. សុខា">
              <div class="col">
                <label class="form-label">នាមខ្លួន</label>
                <input
                  v-model="form.first_name"
                  class="form-control"
                  placeholder="ឧ. សុខា"
                />
                <span v-if="errors.first_name" class="field-error">
                  {{ errors.first_name }}
                </span>
              </div>

              <div class="col">
                <label class="form-label">នាមត្រកូល</label>
                <input
                  v-model="form.last_name"
                  class="form-control"
                  placeholder="ឧ. វណ្ណា"
                />
                <span v-if="errors.last_name" class="field-error">
                  {{ errors.last_name }}
                </span>
              </div>
            </div>

            <!-- Email -->
            <div class="form-group">
              <label class="form-label">អ៊ីមែល</label>
              <input
                v-model="form.email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                placeholder="ឧ. អ៊ីមែលរបស់អ្នក@gmail.com"
              />

              <span v-if="errors.email" class="field-error">
                {{ errors.email }}
              </span>
            </div>

            <!-- PASSWORD -->
            <div class="form-group">
              <label>ពាក្យសម្ងាត់</label>
              <div class="password-input">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  :class="{ 'is-invalid': errors.password }"
                  placeholder="បញ្ចូលពាក្យសម្ងាត់របស់អ្នក"
                />
                <!-- <span v-if="errors.password" class="field-error">
                  {{ errors.password }}
                </span> -->
                <button
                  type="button"
                  class="eye-btn"
                  @click="showPassword = !showPassword"
                  tabindex="-1"
                >
                  <!-- OPEN -->
                  <svg
                    class="eye"
                    :class="{ active: !showPassword }"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>

                  <!-- CLOSED -->
                  <svg
                    class="eye"
                    :class="{ active: showPassword }"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path
                      d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7"
                    />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                </button>
              </div>
              <span v-if="errors.password" class="field-error">
                {{ errors.password }}
              </span>
            </div>

              <!-- CONFIRM PASSWORD -->
              <div class="form-group-confirm">
                <label>បញ្ជាក់ពាក្យសម្ងាត់</label>

                <div class="password-input">
                  <input
                    :type="showConfirm ? 'text' : 'password'"
                    v-model="form.password_confirmation"
                    :class="{ 'is-invalid': errors.password_confirmation }"
                    placeholder="បញ្ចូលពាក្យសម្ងាត់ម្តងទៀត"
                  />
                  <button
                    type="button"
                    class="eye-btn"
                    @click="showConfirm = !showConfirm"
                    tabindex="-1"
                  >
                    <!-- OPEN -->
                    <svg
                      class="eye"
                      :class="{ active: !showConfirm }"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>

                    <!-- CLOSED -->
                    <svg
                      class="eye"
                      :class="{ active: showConfirm }"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path
                        d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7"
                      />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7" />
                      <line x1="2" y1="2" x2="22" y2="22" />
                    </svg>
                  </button>
                </div>

                <span v-if="confirmPasswordError" class="field-error">
                  {{ confirmPasswordError }}
                </span>
            </div>

            <!-- Agreement -->
            <div class="form-check mb-4 mt-3">
              <input
                class="form-check-input"
                type="checkbox"
                id="agree"
                v-model="form.agree"
              />

              <label class="form-check-label small" for="agree">
                ខ្ញុំបានអាន និងយល់ព្រម លក្ខខណ្ឌប្រើប្រាស់ និង គោលការណ៍ឯកជនភាព
              </label>

              <span v-if="errors.agree" class="field-error">
                {{ errors.agree }}
              </span>
            </div>

            <!-- Submit -->
            <button type="submit" class="btn w-100" :disabled="loading">
              {{ loading ? "កំពុងបង្កើត..." : "ចុះឈ្មោះ →" }}
            </button>
          </form>

          <!-- Footer -->
          <div class="text-center mt-4 small">
            មានគណនីរួចហើយ?
            <router-link
              to="/login"
              class="fw-semibold-login text-decoration-none"
            >
              ចូលគណនី
            </router-link>
          </div>
        </div>

        <!-- ✅ RIGHT SIDE (UNCHANGED) -->
        <div class="col-md-6 d-none d-md-flex image-panel text-white">
          <div>
            <div class="logo">
              <img :src="logo" alt="Lost & Found logo" />
            </div>

            <h2 class="fw-semibold-left mb-2">
              ពីរបស់ដែលបាត់បង់ទៅជា<br /><span>ការរកឃើញវិញ</span>
            </h2>

            <p class="opacity-75">
              ចូលរួមជាមួយសហគមន៍របស់យើង ដើម្បីស្វែងរក
              និងប្រគល់របស់របរដែលបានបាត់បង់ទៅកាន់ម្ចាស់ដើមវិញ។
            </p>
          </div>

          <!-- DECORATIONS -->
          <div class="bg-circle circle-1"></div>
          <div class="bg-circle circle-2"></div>

          <div class="floating-card">
            <div class="card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <div class="card-lines">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { registerUser } from "@/api/auth";
import api from "@/api/api";
import logo from "@/assets/images/logo/logo.png";

const router = useRouter();

/* ================= STATE ================= */
const form = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
  agree: false,
});

const showPassword = ref(false);
const showConfirm = ref(false);
const loading = ref(false);
const errors = ref({});

/* ================= VALIDATION ================= */
const validate = () => {
  errors.value = {};

  // First name
  if (!form.first_name) {
    errors.value.first_name = "សូមបញ្ចូលនាមខ្លួនរបស់អ្នក";
  }

  // Last name
  if (!form.last_name) {
    errors.value.last_name = "សូមបញ្ចូលនាមត្រកូលរបស់អ្នក";
  }

  // Email
  if (!form.email) {
    errors.value.email = "សូមបញ្ចូលអ៊ីមែលរបស់អ្នក";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.value.email = "សូមបញ្ចូលអ៊ីមែលឲ្យបានត្រឹមត្រូវ";
  }

  // Password
  if (!form.password) {
    errors.value.password = "សូមបញ្ចូលពាក្យសម្ងាត់";
  } else if (form.password.length < 8) {
    errors.value.password = "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច 8 តួអក្សរ";
  }

  // Confirm password
  if (!form.password_confirmation) {
    errors.value.password_confirmation = "សូមបញ្ជាក់ពាក្យសម្ងាត់ម្តងទៀត";
  } else if (form.password !== form.password_confirmation) {
    errors.value.password_confirmation = "ពាក្យសម្ងាត់មិនដូចគ្នាទេ";
  }

  // Agreement
  if (!form.agree) {
    errors.value.agree = "សូមយល់ព្រមលក្ខខណ្ឌ និង គោលការណ៍ឯកជនភាព";
  }

  return Object.keys(errors.value).length === 0;
};

/* ================= REGISTER ================= */
const register = async () => {
  if (!validate()) return;

  loading.value = true;

  try {
    await registerUser({
      fullname: `${form.first_name} ${form.last_name}`,
      email: form.email,
      password: form.password,
      confirmPassword: form.password_confirmation,
    });

    localStorage.setItem("otp_email", form.email);

    await api.post("/otp/send", { email: form.email });

    router.replace({ name: "user.verify-otp" });
  } catch (err) {
    console.error(err);

    if (err.response?.status === 409) {
      errors.value.email = "អ៊ីមែលនេះមានគណនីរួចហើយ។ សូមព្យាយាមប្រើអ៊ីមែលផ្សេង។";
    } else {
      errors.value.email =
        err.response?.data?.message || "មានបញ្ហាមួយកើតឡើង។ សូមព្យាយាមម្តងទៀត។";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* =========================
   GLOBAL RESET + FONT
========================= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Hanuman", serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* =========================
   BACKGROUND
========================= */
.signup-bg {
  min-height: 100vh;
  width: 100%;
  background: #f6f3f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* =========================
   CARD
========================= */
.card {
  border-radius: 28px;
}

/* =========================
   LEFT PANEL
========================= */
.col-md-6.bg-white {
  padding: 48px 48px 40px;
}

/* =========================
   HEADER
========================= */
.col-md-6 h3 {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 6px;
}

.col-md-6 .text-muted {
  font-size: 13.5px;
  line-height: 1.75;
  margin-bottom: 20px;
}

/* =========================
   FORM GROUP
========================= */
.form-group {
  margin-bottom: 14px;
}
.form-label {
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.6;
  color: #100714;
  margin-bottom: 5px;
}
.form-group label {
  display: block;
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.6;
  color: #100714;
  margin-bottom: 5px;
}
.form-group-confirm {
  margin-top: 13px;
}
.form-group-confirm label {
  display: block;
  margin-bottom: 5px;
}


/* =========================
   INPUTS
========================= */
.form-control,
.password-input input {
  width: 100%;
  padding: 11px 14px;
  padding-right: 44px;
  font-size: 14.5px;
  line-height: 1.55;
  border-radius: 12px;
  border: 1.4px solid #e5e7eb;
  background-color: #f9fafb;
  transition: all 0.2s ease;
}

.form-control::placeholder,
.password-input input::placeholder {
  color: #9ca3af;
  font-size: 13px;
}

.form-control:focus,
.password-input input:focus {
  outline: none;
  background-color: #ffffff;
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
}

/* =========================
   PASSWORD INPUT
========================= */
.password-input {
  position: relative;
}

/* Eye Button */
.eye-btn {
  position: absolute;    
  top: 50%;        
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  right: 14px;
  width: 32px;
  height: 32px;
}

/* Eye Icons (KEEP STYLE) */
.eye {
  width: 20px;
  height: 20px;
  stroke: #6b7280; /* darker gray */
  stroke-width: 2.2; /* thicker */
  opacity: 0;
  transition: opacity 0.15s ease, stroke 0.2s ease;
}

.eye.active {
  opacity: 1;
}

.eye-btn:hover .eye.active {
  stroke: #7426c3;
}

/* =========================
   ROW SPACING (NAME INPUTS)
========================= */
.row.g-3 {
  --bs-gutter-y: 12px;
}

/* =========================
   CHECKBOX
========================= */
.form-check-label {
  font-size: 13px;
  line-height: 1.6;
}

/* =========================
   ERROR MESSAGE
========================= */
.field-error {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.5;
  color: #ef4444;
}
/* Red border when invalid */
.is-invalid {
  border-color: #ef4444 !important;
  background-color: #fff5f5;
}

.is-invalid:focus {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

/* PRIMARY BUTTON */
.btn {
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  color: #ffffff !important;
  cursor: pointer;
  border: none;

  background: linear-gradient(135deg, #8c31e8, #742adb);
  border-radius: 14px;
  padding: 15px 16px;

  box-shadow:
    0 10px 24px rgba(116, 38, 195, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);

  transition:
    background 0.25s ease,
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

/* HOVER */
.btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #9a4ef0, #8a3cf0);
  transform: translateY(-1px);
  color: #ffffff !important;

  box-shadow:
    0 16px 36px rgba(116, 38, 195, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.28);
}

/* ACTIVE (CLICK) */
.btn:active:not(:disabled) {
  background: linear-gradient(135deg, #7b25cf, #6721c1);
  transform: translateY(1px);
  color: #ffffff !important;

  box-shadow:
    0 8px 18px rgba(142, 76, 208, 0.3),
    inset 0 2px 6px rgba(0, 0, 0, 0.18);
}

/* FOCUS (keyboard / click) */
.btn:focus,
.btn:focus-visible {
  color: #ffffff !important;
  outline: none;
}

/* DISABLED */
.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  box-shadow: none;
}

/* =========================
   FOOTER LINK
========================= */
.text-center {
  font-size: 13px;
  margin-top: 14px;
}

.text-center a {
  font-weight: 600;
  text-decoration: none;
}

/* =========================
   RIGHT IMAGE PANEL
========================= */
.image-panel {
  position: relative;
  padding: 48px 48px 320px;
  border-radius: 24px;
  background: linear-gradient(135deg, #f3d4ff 0%, #c18af7 65%, #e9a8ff 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.image-panel:after {
  content: "©2026 FindFound គេហទំព័រ។ រក្សាសិទ្ធិគ្រប់យ៉ាង។";
  position: absolute;
  bottom: 20px;
  left: 40px;
  font-size: 12px;
  opacity: 0.75;
  color: rgba(255, 255, 255, 0.85);
  z-index: 2;
}

/* decoration */
.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  z-index: 1;
}

.circle-1 {
  width: 170px;
  height: 170px;
  bottom: 120px;
  right: -80px;
}

.circle-2 {
  width: 100px;
  height: 100px;
  bottom: 45px;
  left: 40px;
  opacity: 0.25;
}
.floating-card {
  position: absolute;
  bottom: 140px;
  left: 50%;
  transform: translateX(-50%);
  width: 240px;
  padding: 18px;

  display: flex;
  align-items: center;
  gap: 12px;

  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);

  z-index: 2;
}

.card-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b4eff; /* or white */
}

.card-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-lines span {
  height: 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.8);
}

/* =========================
   LOGO
========================= */
.logo img {
  width: 250px;
  height: auto;
  object-fit: contain;
  margin-left: -25px;
  margin-top: -85px;
}
/* illustration */
/* ===== AUTH ENTRY ANIMATION ===== */
.animate-enter {
  animation: cardEnter 0.8s ease-out forwards;
  transform-origin: center;
  will-change: transform, opacity;
}

@keyframes cardEnter {
  0% {
    opacity: 0;
    transform: perspective(900px) rotateY(8deg) translateY(16px);
  }
  100% {
    opacity: 1;
    transform: perspective(900px) rotateY(0deg) translateY(0);
  }
}
.fw-semibold-login {
  color: #7426c3;
}
.fw-semibold-left {
  margin-top: -55px;
  color: #100714;
}
.fw-semibold-left span {
  color: #7426c3;
}
.opacity-75 {
  color: #100e13;
}
@media (max-width: 1024px) {
  .image-panel {
    display: none !important;
  }

  .card {
    max-width: 420px !important;
  }

  .col-md-6.bg-white {
    width: 100%;
    padding: 40px 28px;
  }
}
</style>

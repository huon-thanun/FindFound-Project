<template>
  <div class="login-container">
    <div class="login-wrapper animate-enter">
      <!-- LEFT SIDE -->
      <div class="login-left">
        <div class="brand">
          <div class="logo">
            <img :src="logo" alt="Lost & Found logo" />
          </div>

          <p class="title">
            ពីការបាត់បង់ ទៅការជួបវិញ<br />
            <span>ភ្ជាប់ទំនាក់ទំនង</span> អ្នកឡើងវិញ<br />
            ជាមួយអ្វីដែលសំខាន់
          </p>

          <p class="title-1">
            វេទិកាដែលទទួលបានការជឿទុកចិត្តខ្ពស់បំផុតនៅលើពិភពលោក<br />
            សម្រាប់ជួយស្វែងរក និងនាំវត្ថុដែលបាត់បង់<br />
            ត្រឡប់មកកាន់ម្ចាស់ដើមវិញ
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

      <!-- RIGHT SIDE -->
      <div class="login-right">
        <form class="login-form" @submit.prevent="handleLogin">
          <div class="form-header">
            <h2 class="header">សូមស្វាគមន៍ការត្រឡប់មកវិញ</h2>
            <p>សូមបញ្ចូលព័ត៌មានគណនី Admin របស់អ្នក ដើម្បីចូលប្រើប្រាស់</p>
          </div>

          <!-- EMAIL -->
          <div class="form-group">
            <label>អ៊ីមែល</label>
            <input
              type="email"
              placeholder="បញ្ចូលអាសយដ្ឋានអ៊ីមែល"
              v-model="form.email"
              @blur="touched.email = true"
              :class="{ error: emailError }"
            />
            <span v-if="emailError" class="field-error">
              {{ emailError }}
            </span>
          </div>

          <!-- PASSWORD -->
          <div class="form-group">
            <label>ពាក្យសម្ងាត់</label>
            <div class="password-input">
              <input
                :type="showPassword ? 'text' : 'password'"
                placeholder="បញ្ចូលពាក្យសម្ងាត់"
                v-model="form.password"
                @blur="touched.password = true"
                :class="{ error: passwordError }"
              />
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
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
              </button>
            </div>
            <span v-if="passwordError" class="field-error">
              {{ passwordError }}
            </span>
          </div>

          <!-- LOGIN BUTTON -->
          <button
            type="submit"
            class="btn"
            :disabled="auth.loading || !isFormValid"
          >
            {{ auth.loading ? "កំពុងចូល..." : "ចូលប្រើប្រាស់" }}
          </button>

          <!-- ERROR MESSAGE -->
          <div v-if="auth.error" class="alert-error">
            {{ auth.error }}
          </div>

         
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import logo from "@/assets/images/logo/logo.png";

const router = useRouter();
const auth = useAuthStore();

const showPassword = ref(false);

const form = reactive({
  email: "",
  password: "",
});

const touched = reactive({
  email: false,
  password: false,
});

/* ================= VALIDATION ================= */
const emailError = computed(() => {
  if (!touched.email) return "";
  if (!form.email) return "Email is required";
  return "";
});

const passwordError = computed(() => {
  if (!touched.password) return "";
  if (!form.password) return "Password is required";
  return "";
});

const isFormValid = computed(() => {
  return !emailError.value && !passwordError.value;
});

/* ================= LOGIN ================= */
const handleLogin = async () => {
  touched.email = true;
  touched.password = true;

  if (!isFormValid.value) return;

  try {
    await auth.login(form);

    // ❗ HARD ADMIN CHECK
    if (auth.role !== "admin") {
      auth.logout(); // clear token
      throw new Error("You are not authorized as admin");
    }

    router.push("/admin/dashboard");
  } catch (err) {
    console.error(err);
  }
};

</script>
<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Hanuman", serif;
}

.logo img {
  width: 250px;
  height: auto;
  object-fit: contain;
  margin-left: -25px;
  margin-top: -35px;
}
.title {
  font-size: 30px;
  color: #171519;
  margin-top: -80px;
  font-weight: 600;
}
.title span {
  font-weight: 700;
  color: #8930e5;
}
.title-1 {
  color: #693cb2;
  font-size: 15px;
  line-height: 1.7;
  opacity: 0.85;

}
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f7fb;
}

/* MAIN CARD */
.login-wrapper {
  width: 100%;
  max-width: 1100px;
  min-height: 600px;

  display: flex;
  border-radius: 24px;
  overflow: hidden;

  background: transparent;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
}


.login-left {
  position: relative;
  flex: 1;
  padding: 20px 40px 290px 40px;

  border-radius: 24px;

  background: linear-gradient(135deg, #f3d4ff 0%, #c18af7 70%, #e9a8ff 100%);
  /* background: linear-gradient(to bottom right, #b794f6 0%, #d8b4fe 50%, #f3d4ff 100%); */

  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%);
  }
  100% {
    transform: translateX(100%) translateY(100%);
  }
}
.brand {
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
/* ensure text above glass */
.brand,
.illustration {
  position: relative;
  z-index: 2;
}

/* brand area */
.brand h1 {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 12px;
}

/* .brand p {
  font-size: 18px;
  line-height: 1.7;
  max-width: 360px;
  color: #3b1d6a;
} */

/* illustration */
.illustration {
  display: flex;
  justify-content: flex-end;
  opacity: 0.35;
  margin-top: auto;
  opacity: 0.35;
}
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
  bottom: 120px;
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

.card-lines span:last-child {
  width: 60%;
}
.login-left::after {
  content: "©2026 FindFound Website. All rights reserved";
  position: absolute;
  bottom: 20px;
  left: 40px;
  font-size: 12px;
  opacity: 0.75;
  color: rgba(255, 255, 255, 0.85);
  z-index: 2;
}

/* ================= RIGHT SIDE ================= */
.login-right {
  flex: 1;
  background: white;
  padding: 60px 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

/* RESPONSIVE */
@media (max-width: 968px) {
  .login-wrapper {
    flex-direction: column;
    max-width: 480px;
  }

  .login-left {
    min-height: 260px;
    padding: 48px 40px;
  }

  .login-right {
    padding: 48px 40px;
  }
}

.login-form {
  width: 100%;
  max-width: 400px;
}

.form-header {
  margin-bottom: 36px;
}

.form-header h2 {
  font-size: 32px;
  font-weight: 700;
  color: #190523;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
  margin-top: -80px;
}

.form-header p {
  font-size: 15px;
  color: #64748b;
}

/* FORM GROUPS */
.form-group {
  margin-bottom: 24px;
  
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #020914;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 14px 16px;
  font-size: 15px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: #f8fafc;
  transition: all 0.2s ease;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: #693cb2;
  background: white;
  box-shadow: 0 0 0 4px rgba(73, 136, 196, 0.1);
}

.form-group input.error {
  border-color: #ef4444;
}

.form-group input::placeholder {
  color: #94a3b8;
}

/* PASSWORD INPUT */
.password-input {
  position: relative;
}

.password-input input {
  padding-right: 48px;
}

.eye-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);

  width: 32px;
  height: 32px;

  background: none;
  border: none;
  padding: 0;

  cursor: pointer;
  color: #64748b;

  display: flex;
  align-items: center;
  justify-content: center;
}

.eye {
  position: absolute;
  width: 20px;
  height: 20px;

  opacity: 0;
  transform: scale(0.85);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;

  pointer-events: none; /* IMPORTANT */
}

.eye.active {
  opacity: 1;
  transform: scale(1);
}

.eye-btn:hover .eye.active {
  transform: scale(1.1);
}

/* ERROR MESSAGE */
.field-error {
  display: block;
  font-size: 13px;
  color: #ef4444;
  margin-top: 6px;
}

/* FORGOT PASSWORD */
.forgot-password {
  text-align: right;
  margin-bottom: 24px;
}

.forgot-password a {
  font-size: 14px;
  color: #a04eed;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.forgot-password a:hover {
  color: #0f2854;
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
    margin-top: 50px;
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



/* ALERT ERROR */
.alert-error {
  margin-top: 16px;
  padding: 14px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #dc2626;
  font-size: 14px;
  text-align: center;
}



/* RESPONSIVE */
@media (max-width: 968px) {
  .login-wrapper {
    flex-direction: column;
    max-width: 480px;
  }

  .login-left {
    padding: 48px 40px;
    min-height: 300px;
  }

  .login-left h1 {
    font-size: 32px;
  }

  .illustration {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: 24px;
  }

  .illustration svg {
    width: 120px;
    height: 120px;
  }

  .login-right {
    padding: 48px 40px;
  }

  .form-header h2 {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 16px;
  }

  .login-left,
  .login-right {
    padding: 32px 24px;
  }

  .social-buttons {
    grid-template-columns: 1fr;
  }
}

.auth-footer {
  margin-top: 32px;
  padding: 16px 20px;

  background: #f5f4f46b;
  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  font-size: 14px;
  color: var(--text-Secondary);
}

.auth-link {
  color: #8930e5;
  font-weight: 600;
  text-decoration: none;
}

.auth-link:hover {
  text-decoration: underline;
}

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
</style>

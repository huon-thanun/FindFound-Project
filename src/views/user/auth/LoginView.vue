<template>
  <div class="login-container">
    <div class="login-wrapper">
      <!-- LEFT SIDE -->
      <div class="login-left" :style="{ backgroundImage: `url(${bgImage})` }">
        <div class="brand">
          <div class="logo">
            <img :src="logo" alt="Lost & Found logo" />
          </div>

          <!-- <h1>Lost & Found</h1> -->
          <p class="title">
            ពីការបាត់បង់ ទៅការជួបវិញ—ជួយនាំអ្វីដែលមានន័យ ត្រឡប់មករកម្ចាស់ដេីមវិញ
          </p>
        </div>

        <!-- <div class="illustration">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div> -->
      </div>

      <!-- RIGHT SIDE -->
      <div class="login-right">
        <form class="login-form" @submit.prevent="handleLogin">
          <div class="form-header">
            <h2>សូមស្វាគមន៍ការត្រឡប់</h2>
            <p>សូមបញ្ចូលលិខិតសម្គាល់របស់អ្នកដើម្បីបន្ត</p>
          </div>

          <!-- EMAIL -->
          <div class="form-group">
            <label>អាសយដ្ឋានអ៊ីមែល</label>
            <input
              type="email"
              placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក"
              v-model="form.email"
              @blur="touched.email = true"
              :class="{ error: emailError }"
            />
            <span v-if="emailError" class="field-error">{{ emailError }}</span>
          </div>

          <!-- PASSWORD -->
          <div class="form-group">
            <label>ពាក្យសម្ងាត់</label>
            <div class="password-input">
              <input
                :type="showPassword ? 'text' : 'password'"
                placeholder="បញ្ចូលពាក្យសម្ងាត់របស់អ្នក"
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
                <svg
                  v-if="showPassword"
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
                    d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                  />
                  <path
                    d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                  />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </svg>
                <svg
                  v-else
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
              </button>
            </div>
            <span v-if="passwordError" class="field-error">{{
              passwordError
            }}</span>
          </div>

          <!-- FORGOT PASSWORD -->
          <div class="forgot-password">
            <router-link v-if="!isAdminLogin" to="/forgot-password">
              ភ្លេចពាក្យសម្ងាត់របស់អ្នក?
            </router-link>
          </div>

          <!-- LOGIN BUTTON -->
          <button
            type="submit"
            class="btn-primary"
            :disabled="auth.loading || !isFormValid"
          >
            {{ auth.loading ? "Signing in..." : "Sign In" }}
          </button>

          <!-- ERROR MESSAGE -->
          <div v-if="auth.error" class="alert-error">
            {{ auth.error }}
          </div>

          <!-- DIVIDER -->
          <div class="divider">
            <span>ឬបន្តជាមួយ</span>
          </div>

          <!-- SOCIAL LOGIN -->
          <div class="social-buttons">
            <button type="button" class="btn-social">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Google</span>
            </button>
            <button type="button" class="btn-social">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          <!-- SIGN UP LINK -->
          <!-- <div class="signup-link">
            Don't have an account? <a href="#">Sign up</a>
          </div> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import logo from "@/assets/images/logo/logo.png";
import bgImage from "@/assets/images/background.jpg";

const router = useRouter();
const auth = useAuthStore();
const route = useRoute();


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

const isAdminLogin = computed(() => {
  return route.meta.isAdminLogin === true;
});
/* ================= LOGIN ================= */
const handleLogin = async () => {
  touched.email = true;
  touched.password = true;

  if (!isFormValid.value) return;

  try {
    await auth.login(form);

    // 🔐 ROLE-BASED REDIRECT
    if (auth.isAdmin) {
     router.push("/admin/dashboard");
    } else {
      router.replace("/");
    }
  } catch (err) {
    console.error(err);
  }
};
</script>

<style scoped>
/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.logo img {
  width: 230px;
  height: auto; 
  object-fit: contain;
}
.title {
  line-height: 1.5;
  max-width: 360px;
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

/* ================= LEFT SIDE : REAL GLASS ================= */
.login-left {
 flex: 1;
  padding: 30px 25px;
  border-radius: 10px;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%);
  }
  100% {
    transform: translateX(100%) translateY(100%);
  }
}
.brand{
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
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

.brand p {
  font-size: 16px;
  line-height: 1.6;
  max-width: 320px;
  opacity: 0.9;
}

/* illustration */
.illustration {
  display: flex;
  justify-content: flex-end;
  opacity: 0.35;
  margin-top: auto;
  opacity: 0.35;
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
  color: #0f2854;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
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
  color: #0f2854;
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
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.eye-btn:hover {
  color: #0f2854;
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
  color: #4988c4;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.forgot-password a:hover {
  color: #0f2854;
}

/* PRIMARY BUTTON */
.btn-primary {
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  border: none;;
  transition: all 0.2s ease;
  font-family: inherit;
  background: linear-gradient(135deg, #6a5af9, #8f6bf6);
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 10px 25px rgba(106, 90, 249, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(135, 77, 162, 0.3);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

/* DIVIDER */
.divider {
  position: relative;
  text-align: center;
  margin: 32px 0;
}

.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e2e8f0;
}

.divider span {
  position: relative;
  display: inline-block;
  padding: 0 16px;
  background: white;
  color: #64748b;
  font-size: 14px;
}

/* SOCIAL BUTTONS */
.social-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.btn-social {
  padding: 14px 20px;
  font-size: 15px;
  font-weight: 500;
  color: #0f2854;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: inherit;
}

.btn-social:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.btn-social:active {
  transform: translateY(0);
}

.btn-social svg {
  flex-shrink: 0;
}

/* SIGNUP LINK */
.signup-link {
  text-align: center;
  font-size: 14px;
  color: #64748b;
}

.signup-link a {
  color: #4988c4;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.signup-link a:hover {
  color: #0f2854;
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
</style>

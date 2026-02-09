<template>
  <div class="auth-page">
    <div class="card">
      <!-- ICON -->
      <div class="icon-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <polyline points="3 7 12 13 21 7" />
        </svg>
      </div>

      <h2>ផ្ទៀងផ្ទាត់គណនីរបស់អ្នក</h2>

      <p class="subtitle">
        យើងបានផ្ញើលេខកូដ ៦ ខ្ទង់ទៅកាន់<br />
        <strong>{{ email }}</strong>
      </p>

      <!-- OTP INPUT -->
      <div class="otp-group">
        <input
          v-for="(digit, index) in otpDigits"
          :key="index"
          maxlength="1"
          class="otp-input"
          v-model="otpDigits[index]"
          @input="focusNext(index, $event)"
          @keydown.backspace.prevent="handleBackspace(index, $event)"
          @paste="handlePaste"
        />
      </div>

      <button
        class="btn"
        :disabled="loading || !isOtpFilled"
        @click="verifyOTP"
      >
        {{ loading ? "កំពុងផ្ទៀងផ្ទាត់..." : "ផ្ទៀងផ្ទាត់" }}
      </button>

      <!-- RESEND -->
      <p class="resend">
        <template v-if="remainingTime > 0">
          អ្នកអាចផ្ញើលេខកូដម្តងទៀតក្នុង
          <strong>{{ formattedTime }}</strong>
        </template>

        <template v-else>
          មិនទទួលបានលេខកូដ?
          <a href="#" @click.prevent="resendOTP">ផ្ញើម្តងទៀត</a>
        </template>
      </p>
    </div>

    <!-- SUCCESS MODAL -->
    <BaseModal
      :isClose="showSuccessModal"
      title="ការផ្ទៀងផ្ទាត់បានជោគជ័យ 🎉"
      icon="check-circle"
      theme="success"
      :closable="false"
    >
      <template #body>
        <p class="verify-desc">
          គណនីរបស់អ្នកត្រូវបានផ្ទៀងផ្ទាត់រួចរាល់<br />
          កំពុងនាំអ្នកទៅកាន់ទំព័រចូលគណនី…
        </p>
      </template>
    </BaseModal>

    <!-- ERROR MODAL -->
    <BaseModal :isClose="showErrorModal" :closable="false" theme="custom">
      <template #body>
        <div class="error-modal">
          <!-- ICON -->
          <div class="error-icon">✕</div>

          <!-- TITLE -->
          <h3 class="error-title">មានបញ្ហា!</h3>

          <!-- MESSAGE -->
          <p class="error-message">
            {{
              errorMessage ||
              "លេខកូដដែលអ្នកបានបញ្ចូលមិនត្រឹមត្រូវ។ សូមព្យាយាមម្តងទៀត។"
            }}
          </p>

          <!-- BUTTON -->
          <button class="error-btn" @click="showErrorModal = false">
            ព្យាយាមម្តងទៀត
          </button>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
import api from "@/api/api";

// ===== STATE =====
const router = useRouter();

const otpDigits = reactive(["", "", "", "", "", ""]);
const email = ref("");
const loading = ref(false);
const verified = ref(false);

const remainingTime = ref(300);
let timer = null;
const expiredShown = ref(false);

const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const errorMessage = ref("");

// ===== COMPUTED =====
const formattedTime = computed(() => {
  const min = Math.floor(remainingTime.value / 60);
  const sec = remainingTime.value % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
});

const isOtpFilled = computed(() =>
  otpDigits.every((d) => d.trim().length === 1),
);

// ===== LIFECYCLE =====
onMounted(() => {
  const savedEmail = localStorage.getItem("otp_email");

  if (!savedEmail && !verified.value) {
    router.replace("/register");
    return;
  }

  email.value = savedEmail;
  startCountdown();
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

// ===== METHODS =====
function startCountdown() {
  clearInterval(timer);
  expiredShown.value = false;

  timer = setInterval(() => {
    remainingTime.value--;

    if (remainingTime.value <= 0) {
      clearInterval(timer);
      remainingTime.value = 0;

      if (!expiredShown.value) {
        expiredShown.value = true;
        nextTick(() => {
          showToastMessage("លេខកូដបានផុតកំណត់ សូមផ្ញើម្តងទៀត", "error");
        });
      }
    }
  }, 1000);
}

function focusNext(index, event) {
  const value = event.target.value.replace(/\D/g, "");
  otpDigits[index] = value;

  if (value && index < 5) {
    const nextInput = document.querySelectorAll(".otp-input")[index + 1];
    nextInput.focus();
  }
}

function handleBackspace(index, event) {
  if (!otpDigits[index] && index > 0) {
    const prevInput = document.querySelectorAll(".otp-input")[index - 1];
    prevInput.focus();
  }
}

function handlePaste(event) {
  event.preventDefault();
  const pasted = event.clipboardData
    .getData("text")
    .replace(/\D/g, "")
    .slice(0, 6);

  pasted.split("").forEach((char, index) => {
    otpDigits[index] = char;
  });
}

async function verifyOTP() {
  const otp = otpDigits.join("");

  if (otp.length !== 6) {
    errorMessage.value = "សូមបញ្ចូលលេខកូដទាំង ៦ ខ្ទង់។";
    showErrorModal.value = true;
    showToastMessage(errorMessage.value, "error");
    return;
  }

  try {
    loading.value = true;

    await api.post("/otp/verify", {
      email: email.value.trim().toLowerCase(),
      code: otp,
    });

    loading.value = false;
    verified.value = true;
    showSuccessModal.value = true;

    setTimeout(() => {
      localStorage.removeItem("otp_email");
      router.push("/login");
    }, 2800);
  } catch (err) {
    loading.value = false;
    const serverMsg = err.response?.data?.message || "";

    if (
      serverMsg.includes("Invalid") ||
      serverMsg.includes("invalid") ||
      serverMsg.includes("OTP")
    ) {
      errorMessage.value =
        "លេខកូដដែលអ្នកបានបញ្ចូលមិនត្រឹមត្រូវ។ សូមព្យាយាមម្តងទៀត។";
    } else if (serverMsg.includes("expired")) {
      errorMessage.value = "លេខកូដបានផុតកំណត់។ សូមផ្ញើលេខកូដម្តងទៀត។";
    } else {
      errorMessage.value = "មានបញ្ហាមួយកើតឡើង។ សូមព្យាយាមម្តងទៀត។";
    }

    showErrorModal.value = true;

    showErrorModal.value = true;
  
  }
}

async function resendOTP() {
  try {
    loading.value = true;

    await api.post("/otp/send", {
      email: email.value.trim().toLowerCase(),
    });

    remainingTime.value = 300;
    startCountdown();
    
  } catch {
  
  } finally {
    loading.value = false;
  }
}

</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: "Hanuman", serif;
}

.auth-page {
  min-height: 100vh;
  background: #eaddf3;
  display: grid;
  place-items: center;
  padding: 1rem;
}

.card {
  max-width: 380px;
  background: #fff;
  padding: 30px;
  border-radius: 18px;
  text-align: center;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08);
}

.icon-wrapper {
  width: 58px;
  height: 58px;
  border-radius: 16px;
  background: #ede9fe;
  color: #6d28d9;
  display: grid;
  place-items: center;
  margin: 0 auto 1.2rem;
}

h2 {
  font-size: 1.45rem;
  margin-bottom: 0.4rem;
}

.subtitle {
  font-size: 0.88rem;
  color: #6b7280;
  margin-bottom: 1.6rem;
  line-height: 1.6;
}

.otp-group {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  margin-bottom: 1.6rem;
}

.otp-input {
  width: 42px;
  height: 46px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 1.1rem;
  text-align: center;
}

.btn {
  margin-top: 0.8rem;
  padding: 0.75rem;
  background: linear-gradient(135deg,#8c31e8, #742adb);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(76, 29, 149, 0.3);
  color: #ffffff; 
}

.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  color: #ffffff;       
  background: linear-gradient(135deg, #8c31e8, #742adb);
}
.resend {
  margin-top: 1.2rem;
  font-size: 0.85rem;
  color: #6b7280;
}

.error-modal {
   text-align: center;
  padding: 0 8px;
}

/* ICON */
.error-icon {
  width: 72px;
  height: 72px;
  margin-left: 150px;  
  margin-top: -50px;
  margin-bottom: 50px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  font-size: 34px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 14px rgba(239, 68, 68, 0.08);
}


/* TITLE */
.error-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 14px; 
}


/* MESSAGE */
.error-message {
  font-size: 0.96rem;
  color: #6b7280;
  line-height: 1.85; 
  margin-bottom: 28px; 
}


/* BUTTON */
.error-btn {
  width: 100%;
  padding: 15px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #8c31e8, #742adb);
  color: #fff;
  font-size: 0.96rem;
  font-weight: 600;
  cursor: pointer;
}

.error-btn:hover {
  opacity: 0.95;
}
</style>

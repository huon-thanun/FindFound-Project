<template>
  <div class="main-details-card h-100 shadow-sm">
    <!-- Header -->
    <div class="card-header-clean mb-4">
      <div class="accent-dot"></div>
      <h5 class="fw-bold mb-0 text-dark-indigo khmer-font-title">
        ប្តូរអ៊ីមែល
      </h5>
    </div>

    <!-- New Email -->
    <div class="info-box-item-input mb-3">
      <label class="info-label">អ៊ីមែលថ្មី</label>
      <div class="input-with-icon">
        <i class="bi bi-envelope-at text-purple-accent"></i>
        <input v-model="newEmail" type="email" class="clean-input" placeholder="example@mail.com" />
      </div>
    </div>

    <!-- Password Confirmation -->
    <div class="info-box-item-input mb-3">
      <label class="info-label">លេខសម្ងាត់បញ្ជាក់</label>
      <div class="input-with-icon">
        <i class="bi bi-lock text-purple-accent"></i>
        <input :type="showPassword ? 'text' : 'password'" v-model="password" class="clean-input"
          placeholder="បញ្ចូលលេខសម្ងាត់" />
        <button @click="showPassword = !showPassword" class="btn-eye">
          <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
        </button>
      </div>
    </div>

    <!-- Token Verification -->
    <div v-if="emailRequested" class="info-box-item-input mb-3 border-success animate-zoom">
      <label class="info-label text-success">Token ផ្ទៀងផ្ទាត់</label>
      <input v-model="emailVerifyToken" type="text" class="clean-input" placeholder="បញ្ចូល Token ពីអ៊ីមែល" />
    </div>

    <!-- Buttons -->
    <button v-if="!emailRequested" @click="requestEmailChange" class="btn-outline-premium w-100 mt-2"
      :disabled="loadingRequest || !newEmail || !password">
      <span v-if="loadingRequest" class="spinner-border spinner-border-sm me-2"></span>
      ស្នើសុំប្តូរអ៊ីមែល
    </button>

    <button v-else @click="verifyEmailChange" class="btn-save-premium w-100 mt-2"
      :disabled="loadingVerify || !emailVerifyToken">
      <span v-if="loadingVerify" class="spinner-border spinner-border-sm me-2"></span>
      ផ្ទៀងផ្ទាត់អ៊ីមែលថ្មី
    </button>

    <!-- Message Toast -->
    <BaseToast v-model="showToast" :message="toastMessage" :theme="toastTheme" :icon="toastIcon" :duration="3000" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseToast from "@/components/base/BaseToast.vue";

const newEmail = ref("");
const password = ref("");
const showPassword = ref(false);
const emailRequested = ref(false);
const emailVerifyToken = ref("");

const loadingRequest = ref(false);
const loadingVerify = ref(false);

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

// Request Email Change
const requestEmailChange = async () => {
  loadingRequest.value = true;
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
          password: password.value,
        }),
      },
    );
    if (!res.ok) throw new Error();
    emailRequested.value = true;
    showBaseToast("Token ផ្ទៀងផ្ទាត់ត្រូវបានផ្ញើទៅអ៊ីមែលថ្មី! 📩", "success");
  } catch (err) {
    showBaseToast("មានបញ្ហាក្នុងការស្នើសុំ", "error");
  } finally {
    loadingRequest.value = false;
  }
};

// Verify Email Change
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
    showBaseToast("អ៊ីមែលបានផ្ទៀងផ្ទាត់រួចរាល់! 🎉", "success");

    // Reset
    newEmail.value = "";
    password.value = "";
    emailVerifyToken.value = "";
    emailRequested.value = false;
  } catch (err) {
    showBaseToast("Token មិនត្រឹមត្រូវ", "error");
  } finally {
    loadingVerify.value = false;
  }
};
</script>

<style scoped>
/* Reuse styles from ChangePasswordCard.vue */

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

/* Buttons */
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

/* Popup */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-card {
  background: white;
  padding: 30px 40px;
  border-radius: 20px;
  min-width: 300px;
  text-align: center;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  animation: popup-zoom 0.3s ease-out;
}

.popup-card.success {
  border-top: 6px solid #00d084;
}

.popup-card.error {
  border-top: 6px solid #f44336;
}

.popup-card button {
  margin-top: 15px;
  padding: 8px 20px;
  border: none;
  background: #7c3aed;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
}

.popup-card button:hover {
  background: #3b1e54;
}

@keyframes popup-zoom {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

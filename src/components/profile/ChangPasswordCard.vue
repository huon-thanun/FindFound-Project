<template>
  <div class="main-details-card h-100 shadow-sm">
    <!-- Header -->
    <div class="card-header-clean mb-4">
      <div class="accent-dot"></div>
      <h5 class="fw-bold mb-0 text-dark-indigo khmer-font-title">
        ប្តូរលេខសម្ងាត់
      </h5>
    </div>

    <!-- Current Password -->
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
          <i :class="showCurrentPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
        </button>
      </div>
    </div>

    <!-- New Password -->
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
        <button @click="showNewPassword = !showNewPassword" class="btn-eye">
          <i :class="showNewPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
        </button>
      </div>
    </div>

    <!-- Password Strength Meter -->
    <div class="d-flex gap-1 mb-4">
      <div
        v-for="i in 4"
        :key="i"
        class="pwd-meter"
        :class="{ active: newPassword.length > i * 2 }"
      ></div>
    </div>

    <!-- Update Button -->
    <button
      @click="updatePassword"
      class="btn-save-premium w-100"
      :disabled="loading || !currentPassword || !newPassword"
    >
      <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
      ធ្វើបច្ចុប្បន្នភាព
    </button>

    <!-- Popup Modal -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-card" :class="popupType">
        <p>{{ popupMessage }}</p>
        <button @click="showPopup = false">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentPassword = ref("");
const newPassword = ref("");
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const loading = ref(false);

// Popup
const showPopup = ref(false);
const popupMessage = ref("");
const popupType = ref("success"); // success or error

const showPopupModal = (message, type = "success") => {
  popupMessage.value = message;
  popupType.value = type;
  showPopup.value = true;
};

// Update Password Function
const updatePassword = async () => {
  loading.value = true;
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

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "បរាជ័យក្នុងការប្តូរលេខសម្ងាត់");
    }

    showPopupModal("លេខសម្ងាត់បានប្តូរដោយជោគជ័យ! 🎉", "success");

    // Reset fields
    currentPassword.value = "";
    newPassword.value = "";
    showCurrentPassword.value = false;
    showNewPassword.value = false;

    // Optional: force logout after password change
    localStorage.removeItem("token");
    setTimeout(() => (window.location.href = "/login"), 1000);
  } catch (err) {
    showPopupModal(err.message || "បរាជ័យក្នុងការប្តូរលេខសម្ងាត់", "error");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Card */
.main-details-card {
  background: white;
  border-radius: 32px;
  padding: 40px;
  border: 1px solid rgba(124, 58, 237, 0.05);
}

/* Header */
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

/* Inputs */
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

/* Password meter */
.pwd-meter {
  height: 4px;
  flex: 1;
  background: #eee;
  border-radius: 10px;
}
.pwd-meter.active {
  background: #7c3aed;
}

/* Button */
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

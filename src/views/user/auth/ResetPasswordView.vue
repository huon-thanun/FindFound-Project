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
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      <!-- TITLE -->
      <h2>កំណត់ពាក្យសម្ងាត់ឡើងវិញ</h2>
      <p class="subtitle">សូមបង្កើតពាក្យសម្ងាត់ថ្មីសម្រាប់គណនីរបស់អ្នក</p>

      <!-- FORM -->
      <form @submit.prevent="handleReset">
        <!-- New Password -->
        <label>ពាក្យសម្ងាត់ថ្មី</label>
        <input
          type="password"
          v-model="password"
          placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មី"
          @input="clearError('password')"
        />
        <p v-if="errors.password" class="error">{{ errors.password }}</p>

        <!-- Confirm Password -->
        <label>បញ្ជាក់ពាក្យសម្ងាត់</label>
        <input
          type="password"
          v-model="confirm"
          placeholder="បញ្ជាក់ពាក្យសម្ងាត់ម្តងទៀត"
          @input="clearError('confirm')"
        />
        <p v-if="errors.confirm" class="error">{{ errors.confirm }}</p>

        <!-- General API Error -->
        <p v-if="errors.general" class="error">{{ errors.general }}</p>

        <button type="submit" :disabled="loading">
          {{ loading ? "កំពុងដំណើរការ..." : "កំណត់ពាក្យសម្ងាត់ឡើងវិញ" }}
        </button>

        <!-- Success message -->
        <p v-if="success" class="success">{{ success }}</p>

        <router-link to="/login" class="back-link">
          ← ត្រឡប់ទៅចូលគណនី
        </router-link>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const password = ref("");
const confirm = ref("");
const success = ref("");
const loading = ref(false);

// Error object for inline validation
const errors = reactive({
  password: "",
  confirm: "",
  general: "",
});

const token = ref("");

onMounted(() => {
  token.value = route.query.token;

  if (!token.value) {
    errors.general = "Reset token not found. Please request a new reset link.";
  }
});

// Clear individual field error on input
const clearError = (field) => {
  errors[field] = "";
  errors.general = "";
};

const handleReset = async () => {
  if (!token.value) return;

  // Clear previous messages
  success.value = "";
  Object.keys(errors).forEach((key) => (errors[key] = ""));

  let hasError = false;

  // Client-side validation
  if (!password.value) {
    errors.password = "សូមបញ្ចូលពាក្យសម្ងាត់ថ្មី";
    hasError = true;
  }

  if (!confirm.value) {
    errors.confirm = "សូមបញ្ជាក់ពាក្យសម្ងាត់ម្តងទៀត";
    hasError = true;
  }

  if (password.value && confirm.value && password.value !== confirm.value) {
    errors.confirm = "ពាក្យសម្ងាត់មិនដូចគ្នា";
    hasError = true;
  }

  if (hasError) return;

  loading.value = true;

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`,
      {
        token: token.value,
        newPassword: password.value,
      },
    );

    if (res.data?.result === true) {
      success.value = "កំណត់ពាក្យសម្ងាត់ថ្មីបានជោគជ័យ 🎉";

      password.value = "";
      confirm.value = "";

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      errors.general = res.data?.message || "Reset failed";
    }
  } catch (err) {
    const message = err.response?.data?.message || "";

    if (message.toLowerCase().includes("token")) {
      errors.general =
        "តំណភ្ជាប់កំណត់ពាក្យសម្ងាត់បានផុតកំណត់ ឬ មិនត្រឹមត្រូវ។ សូមស្នើសុំម្តងទៀត។";
    } else {
      errors.general = "មានបញ្ហាកើតឡើង។ សូមព្យាយាមម្តងទៀត។";
    }
  } finally {
    loading.value = false;
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

.auth-page {
  min-height: 100vh;
  background: #eaddf3;
  display: grid;
  place-items: center;
  padding: 1rem;
}

.card {
  width: 100%;
  max-width: 380px;
  background: #ffffff;
  padding: 2.5rem 2.25rem;
  border-radius: 16px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08);
  text-align: center;
}

/* ICON */
.icon-wrapper {
  width: 56px;
  height: 56px;
  background: #ede7f6;
  color: #6d28d9;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0 auto 1.25rem;
}

/* TEXT */
h2 {
  font-size: 1.55rem;
  font-weight: 700;
  color: #0f0e10;
  margin-bottom: 0.4rem;
}

.subtitle {
  font-size: 0.9rem;
  color: #7c3aed;
  margin-bottom: 1.6rem;
  line-height: 1.6;
}

/* FORM */
form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  text-align: left;
}

label {
  font-size: 0.82rem;
  font-weight: 600;
  color: #0f1014;
}

input {
  padding: 0.7rem 0.8rem;
  border-radius: 9px;
  border: 1px solid #d1d5db;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;
}

input:focus {
  border-color: #9b7ebd;
  box-shadow: 0 0 0 3px rgba(155, 126, 189, 0.25);
}

/* BUTTON */
button {
  margin-top: 0.8rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, #8c31e8, #742adb);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(76, 29, 149, 0.3);
}

button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* FEEDBACK */
.success {
  margin-top: 0.75rem;
  color: #16a34a;
  font-size: 0.9rem;
  text-align: center;
}

.error {
  margin-top: 0.75rem;
  color: #dc2626;
  font-size: 0.9rem;
  text-align: center;
}

/* BACK LINK */
.back-link {
  margin-top: 1rem;
  display: inline-block;
  font-size: 0.85rem;
  color: #7c3aed;
  text-decoration: none;
  text-align: center;
}
</style>

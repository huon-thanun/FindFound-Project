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
      <h2>ភ្លេចពាក្យសម្ងាត់របស់អ្នក?</h2>

      <p class="subtitle">
        សូមបញ្ចូលអ៊ីមែលរបស់អ្នក ហើយយើងនឹងផ្ញើតំណកំណត់ឡើងវិញទៅអ្នក
      </p>

      <form @submit.prevent="submit">
        <!-- EMAIL -->
        <label>អ៊ីមែល</label>
        <div class="input-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 4h16v16H4z" />
            <path d="M22 6l-10 7L2 6" />
          </svg>

          <input
            type="email"
            placeholder="អ៊ីមែលរបស់អ្នក@gmail.com"
            v-model="email"
            @input="error = ''"
          />
        </div>

        <!-- INLINE ERROR MESSAGE -->
        <p v-if="error && submitted" class="error">{{ error }}</p>

        <!-- BUTTON -->
        <button type="submit" :disabled="loading">
          {{ loading ? "កំពុងផ្ញើ..." : "ផ្ញើតំណ" }}
        </button>

        <!-- MESSAGES -->
        <p v-if="message" class="success">{{ message }}</p>
        
      </form>

      <!-- BACK -->
      <router-link to="/login" class="back-link">
        ← ត្រឡប់ទៅទំព័រចូលគណនី
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/api/api";

const email = ref("");
const message = ref("");
const error = ref("");
const loading = ref(false);

// Track whether user has tried to submit
const submitted = ref(false);

const submit = async () => {
  submitted.value = true;
  message.value = "";
  error.value = "";

  // Client-side validation
  if (!email.value) {
    error.value = "សូមបញ្ចូលអ៊ីមែលរបស់អ្នក"; // show under input
    return;
  }

  loading.value = true;

  try {
    await api.post("/auth/forget-password", { email: email.value });

    message.value =
      "សូមពិនិត្យអ៊ីមែលរបស់អ្នក ដើម្បីទទួលបានតំណកំណត់ពាក្យសម្ងាត់ឡើងវិញ។";

    email.value = "";
    submitted.value = false;
  } catch (err) {
    error.value =
      err.response?.data?.message || "មិនអាចផ្ញើអ៊ីមែលកំណត់ពាក្យសម្ងាត់បាន";
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
  background: #efe5f7;
  display: grid;
  place-items: center;
  padding: 1rem;
}

.card {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  padding: 2.8rem 2.4rem;
  border-radius: 18px;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.08);
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
  margin: 0 auto 1.2rem;
}

/* TITLE */
h2 {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: #1f1b24;
}

.subtitle {
  font-size: 0.95rem;
  color: #742adb;
  margin-bottom: 1.8rem;
  line-height: 1.6;
}

/* FORM */
form {
  text-align: left;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #4b4453;
  margin-bottom: 6px;
  display: block;
}

.input-wrapper {
  position: relative;
  margin-bottom: 1.4rem;
}

.input-wrapper svg {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  border-radius: 10px;
  border: 1.4px solid #e5e7eb;
  font-size: 0.95rem;
  background: #fafafa;
  transition: all 0.2s ease;
}

input:focus {
  outline: none;
  background: #fff;
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.18);
}

/* BUTTON */
button {
  width: 100%;
  margin-top: 0.6rem;
  padding: 0.85rem;
  background: linear-gradient(135deg, #8c31e8, #742adb);
  color: #ffffff;
  border: none;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 10px 24px rgba(109, 40, 217, 0.25);
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* MESSAGES */
.success {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #16a34a;
  text-align: center;
}

.error {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #dc2626;
  text-align: center;
}

/* BACK LINK */
.back-link {
  display: block;
  margin-top: 1.8rem;
  font-size: 0.85rem;
  color: #7c3aed;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>

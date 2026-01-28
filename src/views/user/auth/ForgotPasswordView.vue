<template>
  <div class="auth-page">
    <div class="card">
      <h2>ភ្លេចពាក្យសម្ងាត់របស់អ្នក?</h2>
      <p class="subtitle">
        បញ្ចូលអ៊ីមែលរបស់អ្នក ហើយយើងនឹងផ្ញើតំណកំណត់ឡើងវិញទៅអ្នក។
      </p>

      <form @submit.prevent="submit">
        <label>អាសយដ្ឋានអ៊ីមែល</label>
        <input
          type="email"
          placeholder="you@example.com"
          v-model="email"
          required
        />

        <button type="submit" :disabled="loading">
          {{ loading ? "Sending..." : "ផ្ញើតំណកំណត់ឡើងវិញ" }}
        </button>

        <p v-if="message" class="success">{{ message }}</p>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
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

const submit = async () => {
  error.value = "";
  message.value = "";
  loading.value = true;

  try {
    await api.post("/auth/forget-password", {
    email: email.value,
  });

    message.value = "Check your email for the reset link.";
    email.value = "";
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to send reset email";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
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
  padding: 2.5rem;
  border-radius: 14px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

/* Typography */
h2 {
  margin-bottom: 0.5rem;
  color: #0f0e10;
  font-size: 1.75rem;
  font-weight: 700;
}

.subtitle {
  margin-bottom: 1.5rem;
  color: #6b7280;
  font-size: 0.95rem;
}

/* Form */
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  font-size: 0.85rem;
  color: #6b7280;
}

input {
  padding: 0.7rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
  outline: none;
  transition:
    border 0.2s,
    box-shadow 0.2s;
}

input:focus {
  border-color: #9b7ebd;
  box-shadow: 0 0 0 3px rgba(155, 126, 189, 0.25);
}

/* Button */
button {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #5a3e73;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background 0.2s;
}

button:hover {
  background: #9b7ebd;
  transform: translateY(-1px);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Messages */
.success {
  margin-top: 0.75rem;
  color: #16a34a;
  font-size: 0.9rem;
}

.error {
  margin-top: 0.75rem;
  color: #dc2626;
  font-size: 0.9rem;
}
</style>

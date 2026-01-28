<template>
  <div class="auth-page">
    <div class="card">
      <h2>កំណត់ពាក្យសម្ងាត់ឡើងវិញ</h2>
      <p class="subtitle">
        បង្កើតពាក្យសម្ងាត់រឹងមាំថ្មីសម្រាប់គណនីរបស់អ្នក។
      </p>

      <form @submit.prevent="handleReset">
        <label>ពាក្យសម្ងាត់ថ្មី</label>
        <input
          type="password"
          v-model="password"
          placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មី"
          required
        />

        <label>បញ្ជាក់ពាក្យសម្ងាត់</label>
        <input
          type="password"
          v-model="confirm"
          placeholder="បញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
          required
        />

        <button type="submit" :disabled="loading">
          {{ loading ? 'Processing...' : 'កំណត់ពាក្យសម្ងាត់ឡើងវិញ' }}
        </button>

        <p v-if="success" class="success">{{ success }}</p>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const password = ref('')
const confirm = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

const token = ref('')

onMounted(() => {
  token.value = route.query.token

  if (!token.value) {
    error.value = 'Reset token not found. Please request a new reset link.'
  }
})

const handleReset = async () => {
  if (!token.value) return

  error.value = ''
  success.value = ''
  loading.value = true

  if (password.value !== confirm.value) {
    error.value = 'ពាក្យសម្ងាត់មិនដូចគ្នា'
    loading.value = false
    return
  }

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL }/auth/reset-password`,
      {
        token: token.value,
        newPassword: password.value
      }
    )

    if (res.data?.result === true) {
      success.value = res.data.message || 'Password reset successful'

      password.value = ''
      confirm.value = ''

      // Redirect to login after success
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      error.value = res.data?.message || 'Reset failed'
    }
  } catch (err) {
    error.value =
      err.response?.data?.details ||
      err.response?.data?.message ||
      'Reset token expired or invalid'
  } finally {
    loading.value = false
  }
}
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
  max-width: 400px;
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.08);
}

/* Headings */
h2 {
  margin-bottom: 0.5rem;
  color: #0b0a0c;
  font-size: 1.8rem;
  font-weight: 700;
}

.subtitle {
  margin-bottom: 1.75rem;
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
  padding: 0.75rem 0.85rem;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
  outline: none;
  transition:
    border 0.2s ease,
    box-shadow 0.2s ease;
}

input:focus {
  border-color: #9b7ebd;
  box-shadow: 0 0 0 3px rgba(155, 126, 189, 0.25);
}

/* Button */
button {
  margin-top: 0.75rem;
  padding: 0.8rem;
  background: #5c3d76;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.15s ease;
}

button:hover {
  background: #9b7ebd;
  transform: translateY(-1px);
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

<template>
  <div
    class="vh-100 d-flex align-items-center justify-content-center bg-light khmer-font"
  >
    <div
      class="card shadow-lg border-0 rounded-4 p-5 text-center"
      style="max-width: 420px; width: 100%"
    >
      <!-- Loading -->
      <div v-if="loading">
        <div class="spinner-border text-purple mb-3"></div>
        <h5 class="fw-bold">កំពុងផ្ទៀងផ្ទាត់អ៊ីមែល...</h5>
        <p class="text-muted small">សូមរង់ចាំបន្តិច</p>
      </div>

      <!-- Success -->
      <div v-if="success">
        <div class="fs-1 text-success mb-3">✔</div>
        <h4 class="fw-bold text-success mb-2">អ៊ីមែលបានផ្ទៀងផ្ទាត់!</h4>
        <p class="text-muted">
          អ៊ីមែលរបស់អ្នកត្រូវបានប្តូរដោយជោគជ័យ។ សូមចូលប្រើប្រាស់ម្តងទៀត។
        </p>
        <p class="small text-muted">កំពុងបញ្ជូនទៅទំព័រចូល...</p>
      </div>

      <!-- Error -->
      <div v-if="error">
        <div class="fs-1 text-danger mb-3">✖</div>
        <h4 class="fw-bold text-danger mb-2">ការផ្ទៀងផ្ទាត់បរាជ័យ</h4>
        <p class="text-muted">{{ error }}</p>

        <RouterLink :to="{ name: 'login' }" class="btn btn-purple mt-3 w-100">
          ត្រឡប់ទៅចូលប្រើប្រាស់
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const success = ref(false);
const error = ref("");

onMounted(async () => {
  const token = route.query.token;

  if (!token) {
    error.value = "Token មិនមាននៅក្នុងតំណភ្ជាប់";
    loading.value = false;
    return;
  }

  try {
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/verify-change-email",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      },
    );

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Invalid or expired token");

    success.value = true;

    // Save role info from API
    const role = json.role; // <-- make sure backend returns "role" field

    // Force logout after email change
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect based on role
    setTimeout(() => {
      if (role === "admin") {
        router.push({ name: "admin.profile.security" });
      } else if (role === "user") {
        router.push({ name: "user.profile.security" });
      } else {
        router.push({ name: "home" }); // fallback
      }
    }, 2000);
  } catch (err) {
    error.value = err.message || "Token មិនត្រឹមត្រូវ ឬផុតកំណត់";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.khmer-font {
  font-family: "Kantumruy Pro", sans-serif;
}
.text-purple {
  color: #3b1e54;
}
.btn-purple {
  background: #3b1e54;
  color: white;
  border-radius: 12px;
  padding: 10px;
}
.btn-purple:hover {
  background: #2a153d;
}
</style>

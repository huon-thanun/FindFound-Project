<template>
  <div class="vh-100 d-flex align-items-center justify-content-center bg-light khmer-font">
    <div class="card shadow-lg border-0 rounded-4 p-5 text-center" style="max-width: 420px; width: 100%">
      <!-- Loading -->
      <div v-if="loading" class="d-flex flex-column align-items-center justify-content-center"
        style="min-height: 300px;">
        <div class="skeleton-circle mb-4" style="width: 80px; height: 80px;"></div>
        <div class="skeleton-line mb-3" style="width: 60%; height: 20px;"></div>
        <div class="skeleton-line" style="width: 50%; height: 16px;"></div>
      </div>

      <!-- Success -->
      <div v-else-if="success">
        <div class="fs-1 text-success mb-3">✔</div>
        <h4 class="fw-bold text-success mb-2">អ៊ីមែលបានផ្ទៀងផ្ទាត់!</h4>
        <p class="text-muted">
          អ៊ីមែលរបស់អ្នកត្រូវបានប្តូរដោយជោគជ័យ។ សូមចូលប្រើប្រាស់ម្តងទៀត។
        </p>
        <p class="small text-muted">កំពុងបញ្ជូនទៅទំព័រចូល...</p>
      </div>

      <!-- Error -->
      <div v-else>
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

    if (!res.ok) {
      throw new Error(json.message || "Token មិនត្រឹមត្រូវ ឬផុតកំណត់");
    }

    // success
    success.value = true;

    // force logout (email changed => token invalid)
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // redirect to login
    setTimeout(() => {
      router.push({ name: "login" });
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

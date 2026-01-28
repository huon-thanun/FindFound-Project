<template>
  <div
    class="min-vh-100 d-flex align-items-center justify-content-center signup-bg"
  >
    <div
      class="card border-0 shadow-lg rounded-4 overflow-hidden"
      style="max-width: 1000px; width: 100%"
    >
      <div class="row g-0">
        <!-- Left Image Panel -->
        <div class="col-md-6 bg-white p-4 p-md-5 position-relative">
          <h3 class="fw-semibold text-center mb-4">ចុះឈ្មោះ</h3>

          <form @submit.prevent="register">
            <!-- First Name -->
            <div class="mb-3">
              <input
                v-model="form.first_name"
                class="form-control"
                :class="{ 'is-invalid': errors.first_name }"
                placeholder="នាមខ្លួន"
              />
              <div v-if="errors.first_name" class="invalid-feedback">
                {{ errors.first_name }}
              </div>
            </div>

            <!-- Last Name -->
            <div class="mb-3">
              <input
                v-model="form.last_name"
                class="form-control"
                :class="{ 'is-invalid': errors.last_name }"
                placeholder="នាមត្រកូល"
              />
              <div v-if="errors.last_name" class="invalid-feedback">
                {{ errors.last_name }}
              </div>
            </div>

            <!-- Email -->
            <div class="mb-3">
              <input
                v-model="form.email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                placeholder="អ៊ីមែល"
              />
              <div v-if="errors.email" class="invalid-feedback">
                {{ errors.email }}
              </div>
            </div>

            <!-- Password -->
            <div class="mb-3 position-relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                class="form-control pe-5"
                :class="{ 'is-invalid': errors.password }"
                placeholder="ពាក្យសម្ងាត់"
              />
              <i
                :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                class="position-absolute top-50 end-0 translate-middle-y me-3"
                style="cursor: pointer"
                @click="showPassword = !showPassword"
              ></i>
              <div v-if="errors.password" class="invalid-feedback d-block">
                {{ errors.password }}
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="mb-3 position-relative">
              <input
                :type="showConfirm ? 'text' : 'password'"
                v-model="form.password_confirmation"
                class="form-control pe-5"
                :class="{ 'is-invalid': errors.password_confirmation }"
                placeholder="បញ្ជាក់ពាក្យសម្ងាត់"
              />
              <i
                :class="showConfirm ? 'bi bi-eye-slash' : 'bi bi-eye'"
                class="position-absolute top-50 end-0 translate-middle-y me-3"
                style="cursor: pointer"
                @click="showConfirm = !showConfirm"
              ></i>
              <div
                v-if="errors.password_confirmation"
                class="invalid-feedback d-block"
              >
                {{ errors.password_confirmation }}
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="btn btn-primary w-100 rounded-pill"
              :disabled="loading"
            >
              {{ loading ? "កំពុងបង្កើត..." : "ចូលរួមជាមួយយើង →" }}
            </button>
          </form>

          <!-- Floating Login Link -->
          <div class="text-center mt-4">
            <p class="mb-0">
              មានគណនីរួចហើយ?
              <router-link
                to="/login"
                class="btn btn-outline-primary btn-sm rounded-pill"
              >
                ចូលគណនី
              </router-link>
            </p>
          </div>
        </div>

        <!-- Right Form Panel -->
        <div class="col-md-6 d-none d-md-flex image-panel text-white">
          <div>
            <div class="logo">
              <img :src="logo" alt="Lost & Found logo" />
            </div>
            <h2 class="fw-semibold mb-2">បង្កើតគណនី<br />របស់អ្នក</h2>
            <p class="opacity-75">ចែករំលែកស្នាដៃ និងទទួលបានគម្រោងថ្មីៗ</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { registerUser } from "@/api/auth";
import logo from "@/assets/images/logo/logo.png";


const router = useRouter();

const form = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const showPassword = ref(false);
const showConfirm = ref(false);
const loading = ref(false);
const errors = ref({});

// Frontend validation
const validate = () => {
  errors.value = {};

  if (!form.first_name) errors.value.first_name = "សូមបញ្ចូលឈ្មោះ";
  if (!form.last_name) errors.value.last_name = "សូមបញ្ចូលនាមត្រកូល";
  if (!form.email) errors.value.email = "សូមបញ្ចូលអ៊ីមែល";
  if (!form.password) errors.value.password = "សូមបញ្ចូលពាក្យសម្ងាត់";
  if (!form.password_confirmation)
    errors.value.password_confirmation = "សូមបញ្ជាក់ពាក្យសម្ងាត់";

  if (
    form.password &&
    form.password_confirmation &&
    form.password !== form.password_confirmation
  ) {
    errors.value.password_confirmation = "ពាក្យសម្ងាត់មិនដូចគ្នា";
  }

  return Object.keys(errors.value).length === 0;
};

async function register() {
  if (!validate()) return;

  loading.value = true;

  try {
    console.log("Sending data to API:", form);

    const res = await registerUser({
      fullname: form.first_name + " " + form.last_name,
      email: form.email,
      password: form.password,
      confirmPassword: form.password_confirmation,
      role: form.role,
    });

    console.log("API response:", res.data);
    alert("Register success 🎉");
    router.push("/otp");
  } catch (err) {
    console.log("API error:", err.response);

    if (err.response?.status === 422) {
      errors.value = err.response.data.errors;
    } else {
      alert(err.response?.data?.message || "Register failed");
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap"); */

.signup-bg {
  min-height: 100vh;
  width: 100%;

  background:
    radial-gradient(
      circle at 15% 20%,
      rgba(149, 137, 174, 0.9) 0%,
      transparent 42%
    ),
    radial-gradient(
      circle at 85% 80%,
      rgba(140, 115, 180, 0.85) 0%,
      transparent 45%
    );
}
.logo img {
  width: 230px;
  height: auto; /* keeps aspect ratio */
  object-fit: contain;
  margin: 25px;
}

.image-panel {
  background-image: url("@/assets/images/background.jpg");
  /* linear-gradient(rgba(11, 19, 43, 0.65), rgba(11, 19, 43, 0.65)),
    url("https://images.unsplash.com/photo-1541701494587-cb58502866ab"); */
  background-size: cover;
  background-position: center;
}

.form-control {
  border-radius: 999px;
  padding: 0.65rem 1.1rem;
  font-size: 0.9rem;
  border: 1px solid #d1d5db;
}

.form-control:focus {
  border-color: #3a506b;
  box-shadow: 0 0 0 0.15rem rgba(58, 80, 107, 0.25);
}

.btn-primary {
  background-color: #0b132b;
  border-color: #0b132b;
}

.btn-primary:hover {
  background-color: #1c2541;
  border-color: #1c2541;
}
</style>

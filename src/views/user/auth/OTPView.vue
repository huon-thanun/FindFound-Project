<template>
  <div
    class="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light"
  >
    <div class="card shadow-lg border-0 w-100" style="max-width: 900px">
      <div class="row g-0">
        <!-- LEFT SECTION -->
        <div class="col-md-6 d-none d-md-flex text-white left-panel">
          <div class="p-5 d-flex flex-column justify-content-end">
            <h3 class="fw-bold">Securing Your Journey</h3>
            <p class="small opacity-75">
              Our advanced verification system ensures that your information
              stays protected every step of the process.
            </p>

            <div class="security-box mt-3">
              🔒 Enterprise Security<br />
              <small>256-bit encrypted verification</small>
            </div>
          </div>
        </div>

        <!-- RIGHT SECTION -->
        <div class="col-md-6 bg-white">
          <div class="p-5">
            <h5 class="fw-bold mb-2">Request Verification Code</h5>
            <p class="text-muted small mb-4">
              Enter your registered email address to receive a secure 6-digit
              one-time password.
            </p>

            <form @submit.prevent="sendOTP">
              <div class="mb-3">
                <label class="form-label small">Email Address</label>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  placeholder="e.g. james.smith@example.com"
                  required
                />
              </div>

              <button class="btn btn-primary w-100" :disabled="loading">
                {{ loading ? "Sending..." : "Send OTP →" }}
              </button>
            </form>

            <div class="d-flex justify-content-between mt-3 small">
              <a href="#" class="text-decoration-none">← Back to Login</a>
              <a href="#" class="text-decoration-none">Having trouble?</a>
            </div>

            <p class="text-muted small mt-4">
              © 2026 Secure Auth. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";

export default {
  name: "EmailVerification",
  data() {
    return {
      email: "",
      loading: false,
    };
  },
  methods: {
    async sendOTP() {
      if (!this.email) {
        alert("Please enter your email");
        return;
      }

      this.loading = true;

      try {
        const res = await api.post("/otp/send", {
          email: this.email,
        });

        console.log("OTP response:", res.data);

        alert("OTP has been sent to your email 📩");

        // save email for verify OTP page
        localStorage.setItem("otp_email", this.email);

        // redirect to verify page
       this.$router.push({ name: "verify-otp" });
      } catch (err) {
        console.error(err);

        alert(
          err.response?.data?.message ||
          "Failed to send OTP. Please try again."
        );
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>


<style scoped>
.left-panel {
  background:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee") center /
      cover no-repeat;
}

.security-box {
  background: rgba(255, 255, 255, 0.15);
  padding: 12px;
  border-radius: 10px;
  font-size: 0.85rem;
}
</style>

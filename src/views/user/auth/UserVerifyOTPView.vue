<template>
  <div class="verify-wrapper d-flex align-items-center justify-content-center">
    <div class="card shadow-lg border-0 verify-card">
      <div class="row g-0 h-100">
        <!-- Left Image Section -->
        <div class="col-md-6 d-none d-md-block left-panel">
          <div class="overlay">
            <div class="brand">
              <h5 class="mb-1">Foundit</h5>
              <p class="small text-light mb-0">
                The world's most trusted lost and found network.
              </p>
            </div>
          </div>
        </div>

        <!-- Right Form Section -->
        <div class="col-md-6 right-panel p-4 p-md-5">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold mb-0">Verify Email</h4>
          </div>

          <p class="text-muted small mb-3">
            We have sent a 6-digit verification code to
            <strong>{{ email }}</strong>
          </p>

          <!-- OTP Inputs -->
          <div class="d-flex gap-2 mb-4">
            <input
              v-for="(digit, index) in otpDigits"
              :key="index"
              type="text"
              maxlength="1"
              class="form-control text-center otp-input"
              v-model="otpDigits[index]"
              :ref="`otp${index}`"
              @input="focusNext(index, $event)"
            />
          </div>

          <button
            class="btn btn-primary w-100 mb-3"
            @click="verifyOTP"
            :disabled="loading"
          >
            {{ loading ? "Verifying..." : "Verify & Activate Account →" }}
          </button>

          <div class="text-center small">
            Didn't receive the code?
            <a href="#" @click.prevent="resendOTP" class="text-decoration-none">
              Resend OTP
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VerifyEmail",
  data() {
    return {
      otpDigits: ["", "", "", "", "", ""],
      email: localStorage.getItem("otp_email") || "",
      loading: false,
    };
  },
  methods: {
    focusNext(index, event) {
      const input = event.target;
      if (input.value.length === 1 && index < 5) {
        // move to next input
        this.$refs[`otp${index + 1}`][0].focus();
      }
    },

    async verifyOTP() {
    const otp = this.otpDigits.join("").replace(/\s/g, "");
    console.log("Verifying OTP:", otp, "for email:", this.email);
    if (otp.length !== 6) {
      alert("Please enter all 6 digits of the OTP correctly");
      return;
    }


      try {
        this.loading = true;

        const res = await axios.post(
          "http://ant-g2-landf.tt.linkpc.net/api/v1/otp/verify",
          {
            email: this.email,
            code:otp,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Verify response:", res.data);

        alert("✅ Account verified successfully!");
        this.$router.push("/login");
      } catch (err) {
        console.error("OTP verify error:", err.response?.data);
        alert(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Invalid OTP or expired"
        );
      } finally {
        this.loading = false;
      }
    },

    async resendOTP() {
      try {
        this.loading = true;

        const res = await axios.post(
          "http://ant-g2-landf.tt.linkpc.net/api/v1/otp/send",
          { email: this.email },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("Resend OTP response:", res.data);
        alert("OTP resent to your email 📩");
      } catch (err) {
        console.error("Resend OTP error:", err.response?.data);
        alert(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Failed to resend OTP"
        );
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.verify-wrapper {
  min-height: 100vh;
  background-color: #e9e3e1;
}

.verify-card {
  max-width: 900px;
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
}

.left-panel {
  background: url("https://images.unsplash.com/photo-1505761671935-60b3a7427bad")
    center/cover no-repeat;
  position: relative;
}

.left-panel .overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.6));
}

.left-panel .brand {
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: #fff;
}

.right-panel {
  background-color: #ffffff;
}

.otp-input {
  width: 48px;
  height: 52px;
  font-size: 1.25rem;
  border-radius: 8px;
}

.btn-primary {
  background-color: #5b5df0;
  border: none;
}

.btn-primary:hover {
  background-color: #4a4ce0;
}
</style>

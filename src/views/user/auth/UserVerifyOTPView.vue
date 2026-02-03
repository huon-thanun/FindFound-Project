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
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <polyline points="3 7 12 13 21 7" />
        </svg>
      </div>

      <h2>ផ្ទៀងផ្ទាត់គណនីរបស់អ្នក</h2>
      <p class="subtitle">
        យើងបានផ្ញើលេខកូដ ៦ ខ្ទង់ទៅកាន់<br />
        <strong>{{ email }}</strong>
      </p>

      <!-- OTP -->
      <div class="otp-group">
        <input
          v-for="(digit, index) in otpDigits"
          :key="index"
          maxlength="1"
          class="otp-input"
          v-model="otpDigits[index]"
          :ref="`otp${index}`"
          @input="focusNext(index, $event)"
          @paste="handlePaste"
        />
      </div>

      <button
        class="btn"
        :disabled="loading"
        @click="verifyOTP"
      >
        {{ loading ? "កំពុងផ្ទៀងផ្ទាត់..." : "ផ្ទៀងផ្ទាត់ →" }}
      </button>

      <p class="resend">
        មិនទទួលបានលេខកូដ?
        <a href="#" @click.prevent="resendOTP">ផ្ញើម្តងទៀត</a>
      </p>
    </div>
  </div>
</template>


<script>
import api from "@/api/api";


export default {
  name: "VerifyEmail",

  data() {
    return {
      
      otpDigits: ["", "", "", "", "", ""],
      email: "",
      loading: false,
    };
  },

  mounted() {
    const savedEmail = localStorage.getItem("otp_email");

    if (!savedEmail) {
      alert("Session expired. Please register again.");
      this.$router.replace("/register");
      return;
    }

    this.email = savedEmail;
  },

  methods: {
    focusNext(index, event) {
      const value = event.target.value.replace(/\D/g, "");
      this.otpDigits[index] = value;

      if (value && index < 5) {
        this.$refs[`otp${index + 1}`][0].focus();
      }
    },

    handlePaste(event) {
      event.preventDefault();
      const pasted = event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);

      pasted.split("").forEach((char, index) => {
        this.otpDigits[index] = char;
      });

      if (pasted.length === 6) {
        this.$refs.otp5[0].focus();
      }
    },

    async verifyOTP() {
      const otp = this.otpDigits.join("");

      if (otp.length !== 6) {
        alert("Please enter all 6 digits");
        return;
      }

      try {
        this.loading = true;

        const res = await api.post("/otp/verify", {
          email: this.email.trim().toLowerCase(),
          code: otp,
        });

        console.log("Verify response:", res.data);

        alert("✅ Account verified successfully!");

        localStorage.removeItem("otp_email");
        this.$router.replace("/login");
      } catch (err) {
        alert(err.response?.data?.message || "Invalid or expired OTP");
      } finally {
        this.loading = false;
      }
    },

    async resendOTP() {
      try {
        this.loading = true;

        await api.post("/otp/send", {
          email: this.email.trim().toLowerCase(),
        });

        alert("📩 OTP resent to " + this.email);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to resend OTP");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: "Hanuman", serif;
}
.brand {
  margin-bottom: 0.6rem;
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
  padding:30px; 
  border-radius: 18px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08);
  text-align: center;
}

/* BRAND */
.brand {
  display: flex;
  justify-content: center;
  margin-bottom: 0.1rem;
  line-height: 0; 
  color: #4c1d95;
}



/* ICON */
.icon-wrapper {
  width: 58px;
  height: 58px;
  border-radius: 16px;
  background: #ede9fe;
  color: #6d28d9;
  display: grid;
  place-items: center;
  margin: 0 auto 1.3rem;
}

/* TEXT */
h2 {
  font-size: 1.45rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: #0f0e10;
}

.subtitle {
  font-size: 0.88rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.6rem;
}

/* OTP */
.otp-group {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 1.6rem;
}

.otp-input {
  width: 42px;
  height: 46px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 1.1rem;
  text-align: center;
  outline: none;
  transition: all 0.2s ease;
}

.otp-input:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.25);
}

/* BUTTON */
.btn {
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  color: #ffffff !important; 
  cursor: pointer;
  border: none;

  background: linear-gradient(135deg, #8c31e8, #742adb);
  border-radius: 14px;
  padding: 15px 16px;

  box-shadow:
    0 10px 24px rgba(116, 38, 195, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);

  transition:
    background 0.25s ease,
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

/* HOVER */
.btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #9a4ef0, #8a3cf0);
  transform: translateY(-1px);
  color: #ffffff !important; 

  box-shadow:
    0 16px 36px rgba(116, 38, 195, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.28);
}

/* ACTIVE (CLICK) */
.btn:active:not(:disabled) {
  background: linear-gradient(135deg, #7b25cf, #6721c1);
  transform: translateY(1px);
  color: #ffffff !important;

  box-shadow:
    0 8px 18px rgba(142, 76, 208, 0.3),
    inset 0 2px 6px rgba(0, 0, 0, 0.18);
}

/* FOCUS (keyboard / click) */
.btn:focus,
.btn:focus-visible {
  color: #ffffff !important;
  outline: none;
}

/* DISABLED */
.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  box-shadow: none;
}

/* RESEND */
.resend {
  margin-top: 1.2rem;
  font-size: 0.85rem;
  color: #6b7280;
}

.resend a {
  color: #7c3aed;
  font-weight: 600;
  text-decoration: none;
}
</style>


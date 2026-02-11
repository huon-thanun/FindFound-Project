<template>
  <div class="main-contact">
    <!-- Hero Banner -->
    <section class="hero-section">
      <div class="hero-bg"></div>

      <!-- Very subtle floating shapes -->
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>

      <div class="container position-relative">
        <div class="row align-items-center g-5">
          <!-- Text Column -->
          <div class="col-lg-6 hero-text-col" data-aos="fade-right">
            <div class="badge-modern mb-4">
              <i class="bi bi-chat-dots-fill me-2"></i>
              ទំនាក់ទំនង
            </div>
            <h1 class="hero-title">
              ទាក់ទងមក <span class="gradient-text">ពួកយើង</span>
              <br class="d-none d-md-block" />
              យើងរីករាយជួយអ្នកគ្រប់ពេល
            </h1>
            <p class="hero-subtitle">
              ផ្ញើសារមកយើងឥឡូវនេះ យើងនឹងឆ្លើយតបក្នុងរយៈពេលខ្លីបំផុត
              និងវិជ្ជាជីវៈ។ សេវាកម្ម 24/7 សុវត្ថិភាពខ្ពស់។
            </p>
          </div>

          <!-- Illustration Column -->
          <div
            class="col-lg-6 hero-illustration"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <img
              src="../../../assets/images/contact/hero-banner.png"
              alt="Contact Us Illustration"
              class="hero-img"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Main Contact Content -->
    <section class="contact-content">
      <div class="container">
        <div class="row g-5 justify-content-center">
          <!-- Info Sidebar -->
          <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div class="info-card glass-card">
              <h3 class="card-title">ព័ត៌មានទំនាក់ទំនង</h3>

              <div class="info-item">
                <div class="icon-circle">
                  <i class="bi bi-geo-alt-fill"></i>
                </div>
                <div>
                  <div class="info-label">អាសយដ្ឋាន</div>
                  <p>#ផ្ទះលេខ ៨៦បេ ផ្លូវ ៣១៣, ភ្នំពេញ</p>
                </div>
              </div>

              <div class="info-item">
                <div class="icon-circle">
                  <i class="bi bi-telephone-fill"></i>
                </div>
                <div>
                  <div class="info-label">ទូរស័ព្ទ</div>
                  <p><a href="tel:+85512345678">+855 12 345 678</a></p>
                </div>
              </div>

              <div class="info-item">
                <div class="icon-circle">
                  <i class="bi bi-envelope-fill"></i>
                </div>
                <div>
                  <div class="info-label">អ៊ីមែល</div>
                  <p>
                    <a href="mailto:support@example.com">support@example.com</a>
                  </p>
                </div>
              </div>

              <div class="social-links mt-5">
                <h5 class="social-title">តាមដានពួកយើង</h5>
                <div class="d-flex gap-3">
                  <a href="#" class="social-icon facebook"
                    ><i class="bi bi-facebook"></i
                  ></a>
                  <a href="#" class="social-icon telegram"
                    ><i class="bi bi-telegram"></i
                  ></a>
                  <a href="#" class="social-icon instagram"
                    ><i class="bi bi-instagram"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="col-lg-8" data-aos="fade-up" data-aos-delay="200">
            <div class="form-card glass-card">
              <h3 class="card-title mb-4">ផ្ញើសារមកយើង</h3>
              <form @submit.prevent="handleSubmit">
                <div class="row g-4">
                  <div class="col-md-6">
                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        v-model="formData.lastName"
                        placeholder="នាមត្រកូល"
                        required
                      />
                      <label for="lastName">នាមត្រកូល</label>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        id="firstName"
                        v-model="formData.firstName"
                        placeholder="ឈ្មោះ"
                        required
                      />
                      <label for="firstName">ឈ្មោះ</label>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="form-floating">
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="formData.email"
                        placeholder="name@example.com"
                        required
                      />
                      <label for="email">អ៊ីមែល</label>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="form-floating">
                      <textarea
                        class="form-control"
                        id="message"
                        v-model="formData.message"
                        placeholder="សាររបស់អ្នក..."
                        style="height: 150px"
                        maxlength="500"
                        required
                      ></textarea>
                      <label for="message">សាររបស់អ្នក...</label>
                    </div>
                    <div class="char-counter mt-2 text-end">
                      {{ formData.message.length }} / 500
                    </div>
                  </div>

                  <div class="col-12 text-end">
                    <button
                      type="submit"
                      class="btn btn-submit"
                      :disabled="isSubmitting"
                    >
                      <span v-if="!isSubmitting">
                        ផ្ញើសារ <i class="bi bi-arrow-right-short ms-2"></i>
                      </span>
                      <span v-else>
                        <span
                          class="spinner-border spinner-border-sm me-2"
                        ></span>
                        កំពុងផ្ញើ...
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Location Map Section -->
    <section class="location-section py-5">
      <div class="container">
        <h2 class="section-title text-center mb-4" data-aos="fade-up">
          ទីតាំងរបស់យើងនៅភ្នំពេញ
        </h2>
        <p class="text-center mb-5" data-aos="fade-up" data-aos-delay="100">
          #ផ្ទះលេខ ៨៦បេ ផ្លូវ ៣១៣ — មកជួបយើងបានយ៉ាងងាយស្រួលនៅកណ្តាលទីក្រុង!
        </p>

        <div
          class="map-wrapper glass-card overflow-hidden shadow-lg"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <iframe
            class="w-100"
            style="height: 500px; border: 0"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.783!2d104.891!3d11.573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519a5c5d0001%3A0x0!2zU3RyZWV0IDMxMywgUGhub20gUGVuaCwgQ2FtYm9kaWE!5e0!3m2!1sen!2skh!4v1730000000000"
          ></iframe>
        </div>

        <div class="text-center mt-5">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Street+313%2C+Phnom+Penh%2C+Cambodia"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline-primary btn-lg px-5 py-3"
          >
            បើកនៅក្នុង Google Maps <i class="bi bi-box-arrow-up-right ms-2"></i>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  message: "",
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1800));
  alert("អរគុណ! សាររបស់អ្នកត្រូវបានផ្ញើជោគជ័យ។ យើងនឹងឆ្លើយតបឆាប់ៗនេះ។");
  Object.assign(formData, {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  isSubmitting.value = false;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap");

.main-contact {
  font-family: "Kantumruy Pro", sans-serif;
  background: #fcfaff;
  padding-bottom: 120px;
}

/* ── Hero ── (shorter height) ── */
.hero-section {
  position: relative;
  background: linear-gradient(
    135deg,
    #f5f0ff 0%,
    #efe8ff 35%,
    #e6d9ff 65%,
    #d9ccff 100%
  );
  color: #111111;
  padding: 140px 0 220px; /* Reduced height */
  overflow: hidden;
  border-radius: 0 0 80px 80px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 40% 60%,
    rgba(165, 180, 252, 0.06) 0%,
    transparent 70%
  );
  opacity: 0.92;
}

.floating-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.shape {
  position: absolute;
  background: rgba(139, 92, 246, 0.025);
  backdrop-filter: blur(30px);
  border-radius: 50%;
  animation: float-slow 50s infinite ease-in-out;
  pointer-events: none;
}

.shape-1 {
  width: 380px;
  height: 380px;
  top: -20%;
  left: -25%;
  animation-delay: 0s;
}
.shape-2 {
  width: 500px;
  height: 500px;
  bottom: -30%;
  right: -30%;
  animation-delay: 20s;
  border-radius: 60% 40% 55% 45%;
}
.shape-3 {
  width: 320px;
  height: 320px;
  top: 60%;
  left: -10%;
  animation-delay: 35s;
}

@keyframes float-slow {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(40px, -60px) rotate(4deg);
  }
  50% {
    transform: translate(-50px, 70px) rotate(-4deg);
  }
  75% {
    transform: translate(60px, 50px) rotate(3deg);
  }
}

/* Text on top */
.hero-text-col,
.hero-title,
.hero-subtitle,
.badge-modern {
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 3.8rem; /* Slightly smaller for better proportion */
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.4rem;
  color: #111111;
}

.gradient-text {
  background: linear-gradient(to right, #8b5cf6, #a78bfa, #c4b5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: #222222;
  max-width: 560px;
  line-height: 1.7;
}

.badge-modern {
  background: rgba(139, 92, 246, 0.12);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(139, 92, 246, 0.22);
  padding: 12px 28px;
  border-radius: 60px;
  font-size: 1.05rem;
  color: #111111;
}

/* Hero image (large but fits shorter height) */
.hero-illustration .hero-img {
  width: 130%; /* Still big, but not overflowing */
  max-width: none;
  height: auto;
  margin-left: -15%;
  filter: drop-shadow(0 35px 80px rgba(0, 0, 0, 0.18)) brightness(1.04);
  border-radius: 40px;
  transition: all 0.7s ease;
}

.hero-illustration:hover .hero-img {
  transform: scale(1.08) translateY(-20px);
}

/* ── Contact Content ── */
.contact-content {
  margin-top: -140px; /* Adjusted to match shorter hero */
  position: relative;
  z-index: 10;
}

.glass-card {
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 32px;
  padding: 45px;
  box-shadow:
    0 25px 70px rgba(0, 0, 0, 0.09),
    inset 0 0 20px rgba(139, 92, 246, 0.03);
  transition: all 0.4s ease;
}

.glass-card:hover {
  transform: translateY(-10px);
  box-shadow:
    0 40px 100px rgba(0, 0, 0, 0.14),
    inset 0 0 30px rgba(139, 92, 246, 0.05);
}

.card-title {
  font-weight: 700;
  color: #111111;
  margin-bottom: 2rem;
  font-size: 1.6rem;
}

.info-item {
  display: flex;
  gap: 20px;
  margin-bottom: 1.8rem;
}

.icon-circle {
  width: 56px;
  height: 56px;
  background: #f3e8ff;
  color: #8b5cf6;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.info-label {
  font-size: 0.85rem;
  color: #444444;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.info-item p,
.info-item a {
  color: #111111;
  font-weight: 500;
  margin: 0;
}

.social-links .social-title {
  color: #111111;
  margin-bottom: 1.2rem;
}

.social-icon {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: #f3e8ff;
  color: #8b5cf6;
  font-size: 1.4rem;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: #8b5cf6;
  color: white;
  transform: translateY(-5px) scale(1.1);
}

/* Form */
.form-control {
  color: #111111;
  border-radius: 16px;
  padding: 16px 20px;
}

.form-control:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 0.3rem rgba(139, 92, 246, 0.18);
}

.form-floating > label {
  color: #444444;
  padding: 16px 20px;
}

.btn-submit {
  background: linear-gradient(90deg, #8b5cf6, #a78bfa);
  border: none;
  color: white;
  padding: 16px 48px;
  border-radius: 20px;
  font-weight: 600;
  box-shadow: 0 14px 40px rgba(139, 92, 246, 0.4);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-submit:hover {
  background: linear-gradient(90deg, #7c3aed, #c4b5fd);
  transform: translateY(-6px) scale(1.05);
  box-shadow: 0 24px 60px rgba(139, 92, 246, 0.55);
}

.char-counter {
  font-size: 0.9rem;
  color: #555555;
}

/* Location Section */
.location-section {
  background: linear-gradient(to bottom, #f9f7ff, #fcfaff);
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: #111111;
}

.map-wrapper {
  border-radius: 32px;
  overflow: hidden;
  background: white;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.1);
}

.btn-outline-primary {
  border-color: #8b5cf6;
  color: #111111;
  font-weight: 600;
  padding: 14px 40px;
  border-radius: 20px;
}

.btn-outline-primary:hover {
  background: #8b5cf6;
  color: white;
}

/* Responsive */
@media (max-width: 991px) {
  .hero-section {
    padding: 100px 0 160px; /* Shorter on mobile too */
    text-align: center;
  }
  .hero-title {
    font-size: 3rem;
  }
  .contact-content {
    margin-top: -100px;
  }
  .glass-card {
    padding: 35px 25px;
  }
  .map-wrapper iframe {
    height: 400px;
  }
}
</style>

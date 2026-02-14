<template>
  <div class="main-contact">
    <!-- Hero Banner -->
    <section class="hero-section">
      <div class="hero-bg"></div>

      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>

      <div class="container position-relative">
        <div class="row align-items-center g-5 py-5 py-lg-6">
          <!-- Text Column -->
          <div class="col-lg-6 hero-text-col" data-aos="fade-right">
            <div class="badge-modern mb-4">
              <i class="bi bi-chat-dots-fill me-2"></i>
              ទំនាក់ទំនង
            </div>
            <h1 class="hero-title">
              ទាក់ទងមក <span class="gradient-text">ពួកយើង</span>
              <br class="d-none d-md-block" />
              យើងរីករាយជួយអ្នកគ្រប់ពេលវេលា
            </h1>
            <p class="hero-subtitle">
              ផ្ញើសារមកយើងឥឡូវនេះ — យើងនឹងឆ្លើយតបឆាប់បំផុត និងវិជ្ជាជីវៈបំផុត។
              សេវាកម្ម 24/7 • សុវត្ថិភាពខ្ពស់ • ឆ្លើយតបក្នុងរយៈពេលខ្លី
            </p>
          </div>

          <!-- Illustration Column -->
          <div
            class="col-lg-6 hero-illustration"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <img
              src="../../../assets/images/contact/hero-banner_removebg.png"
              alt="Contact Us Illustration"
              class="hero-img img-fluid"
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
          <div class="col-lg-4 order-lg-1" data-aos="fade-up">
            <div class="info-card glass-card h-100">
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
          <div
            class="col-lg-8 order-lg-2"
            data-aos="fade-up"
            data-aos-delay="150"
          >
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
                        placeholder="អ៊ីមែលរបស់អ្នក"
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
                        style="height: 160px"
                        maxlength="500"
                        required
                      ></textarea>
                      <label for="message">សាររបស់អ្នក</label>
                    </div>
                    <div class="char-counter mt-2 text-end small">
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
                        ផ្ញើសារ <i class="bi bi-send-fill ms-2"></i>
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
    <section class="location-section py-5 py-lg-6">
      <div class="container">
        <h2 class="section-title text-center mb-4" data-aos="fade-up">
          ទីតាំងរបស់យើងនៅភ្នំពេញ
        </h2>
        <p
          class="text-center lead mb-5"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          #ផ្ទះលេខ ៨៦បេ ផ្លូវ ៣១៣ — ស្ថិតនៅកណ្តាលទីក្រុង ងាយស្រួលមកជួប!
        </p>

        <div
          class="map-wrapper glass-card overflow-hidden shadow-lg"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <iframe
            class="w-100"
            style="height: 520px; border: 0"
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
  // Simulate API call
  await new Promise((r) => setTimeout(r, 1600));
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
@import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700;800&display=swap");

.main-contact {
  font-family: "Kantumruy Pro", system-ui, sans-serif;
  background: #fdfaff;
  color: #0f0f0f;
}

/* ── Hero ── */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #f8f2ff 0%, #f0e8ff 50%, #e8deff 100%);
  overflow: hidden;
  border-radius: 0 0 60px 60px;
  /* padding: 100px 0 180px; */
  margin: 0 0 120px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 30% 70%,
    rgba(168, 85, 247, 0.08) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.floating-shapes .shape {
  position: absolute;
  background: rgba(139, 92, 246, 0.04);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(139, 92, 246, 0.08);
  border-radius: 50%;
  animation: float-slow 80s infinite ease-in-out;
}

.shape-1 {
  width: 420px;
  height: 420px;
  top: -15%;
  left: -20%;
  animation-delay: 0s;
}
.shape-2 {
  width: 560px;
  height: 560px;
  bottom: -25%;
  right: -25%;
  animation-delay: 25s;
  border-radius: 48% 52% 55% 45%;
}
.shape-3 {
  width: 360px;
  height: 360px;
  top: 55%;
  left: -12%;
  animation-delay: 45s;
}

@keyframes float-slow {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(60px, -80px) rotate(5deg);
  }
  50% {
    transform: translate(-70px, 90px) rotate(-6deg);
  }
  75% {
    transform: translate(80px, 60px) rotate(4deg);
  }
}

.hero-title {
  font-size: clamp(2.6rem, 6vw, 4.2rem);
  font-weight: 800;
  line-height: 1.08;
  margin-bottom: 1.5rem;
}

.gradient-text {
  background: linear-gradient(90deg, #7c3aed, #a78bfa, #c4b5fd);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: clamp(1.15rem, 2.5vw, 1.35rem);
  color: #222;
  max-width: 580px;
  line-height: 1.7;
  opacity: 0.95;
}

.badge-modern {
  display: inline-flex;
  align-items: center;
  background: rgba(139, 92, 246, 0.14);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(139, 92, 246, 0.24);
  padding: 0.75rem 1.8rem;
  border-radius: 50rem;
  font-weight: 600;
  color: #111;
  font-size: 1.1rem;
}

.hero-img {
  max-width: 110%;
  margin-left: -10%;
  filter: drop-shadow(0 30px 70px rgba(0, 0, 0, 0.16)) brightness(1.03);
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hero-illustration:hover .hero-img {
  transform: scale(1.06) translateY(-15px);
}

/* ── Cards ── */
.glass-card {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 28px;
  padding: 2.5rem;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.08),
    inset 0 0 24px rgba(139, 92, 246, 0.04);
  transition: all 0.4s ease;
}

.glass-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 35px 90px rgba(0, 0, 0, 0.12),
    inset 0 0 32px rgba(139, 92, 246, 0.06);
}

.card-title {
  font-weight: 700;
  color: #111;
  font-size: 1.65rem;
  margin-bottom: 1.8rem;
}

.info-item {
  display: flex;
  gap: 1.25rem;
  margin-bottom: 1.6rem;
  align-items: center;
}

.icon-circle {
  flex-shrink: 0;
  width: 54px;
  height: 54px;
  background: rgba(139, 92, 246, 0.12);
  color: #7c3aed;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
}

.info-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.3rem;
}

.info-item p,
.info-item a {
  color: #111;
  font-weight: 500;
  margin: 0;
  line-height: 1.5;
}

.social-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: rgba(139, 92, 246, 0.1);
  color: #7c3aed;
  font-size: 1.35rem;
  display: grid;
  place-items: center;
  transition: all 0.35s ease;
}

.social-icon:hover {
  background: #7c3aed;
  color: white;
  transform: translateY(-4px) scale(1.12);
}

/* Form */
.form-control {
  border-radius: 14px;
  padding: 1.1rem 1.3rem;
  border: 1px solid #d0c4e8;
  background: rgba(255, 255, 255, 0.7);
  color: #111;
}

.form-control:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 0.35rem rgba(139, 92, 246, 0.16);
  background: white;
}

.form-floating > label {
  color: #555;
  padding: 1.1rem 1.3rem;
}

.btn-submit {
  background: linear-gradient(90deg, #7c3aed, #a78bfa);
  border: none;
  color: white;
  padding: 0.9rem 2.8rem;
  border-radius: 16px;
  font-weight: 600;
  font-size: 1.05rem;
  box-shadow: 0 12px 36px rgba(124, 58, 237, 0.35);
  transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-submit:hover:not(:disabled) {
  background: linear-gradient(90deg, #6d28d9, #c4b5fd);
  transform: translateY(-5px) scale(1.04);
  box-shadow: 0 20px 50px rgba(124, 58, 237, 0.5);
}

.char-counter {
  color: #666;
  font-size: 0.9rem;
}

/* Map */
.map-wrapper {
  border-radius: 28px;
  overflow: hidden;
  background: white;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.09);
}

.section-title {
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 800;
  color: #111;
}

/* Responsive */
@media (max-width: 991px) {
  .hero-section {
    padding: 80px 0 220px;
    border-radius: 0 0 40px 40px;
    text-align: center;
  }
  .hero-img {
    margin: 0 auto;
    max-width: 90%;
  }
  .contact-content {
    margin-top: -140px;
  }
  .glass-card {
    padding: 2rem 1.5rem;
  }
  .map-wrapper iframe {
    height: 420px;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2.4rem;
  }
  .btn-submit {
    width: 100%;
  }
}
</style>

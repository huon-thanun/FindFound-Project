<template>
  <div class="main-contact">
    <div class="container-fluid mx-0 p-0">
      <div class="contact-header">
        <div class="container">
          <div class="content-wrapper">
            <div class="hero-text">
              <span class="label">
                <i class="bi bi-person-fill"></i> ទំនាក់ទំនង
              </span>
              <h1 class="header-title">ទាក់ទងមកពួកយើង</h1>
              <p>ផ្ញើរសារមកកាន់ទីនេះយើងនឹងឆ្លើយតបយ៉ាងឆាប់រហ័សបំផុត</p>

              <div class="features mt-4">
                <div class="feature">
                  <div class="checkmark"><i class="bi bi-check-lg"></i></div>
                  <span>ឆ្លើយតបរហ័ស 24/7</span>
                </div>
                <div class="feature">
                  <div class="checkmark"><i class="bi bi-check-lg"></i></div>
                  <span>ជំនួយដោយអ្នកជំនាញ</span>
                </div>
              </div>
            </div>

            <div class="hero-image-wrapper">
              <img
                src="@/assets/images/background/image-Photoroom (2).png"
                alt="Contact Us"
                class="hero-image"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="contact-content mt-lg-5 mt-4">
        <div class="row g-4">
          <div class="col-lg-6">
            <div class="contact-card contact-form" data-aos="fade-right">
              <h3 class="section-title">
                <i class="bi bi-envelope-paper-fill"></i> ផ្ញើសារមកយើង
              </h3>

              <form @submit.prevent="handleSubmit">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">នាមត្រកូល *</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.lastName"
                      placeholder="បញ្ចូលនាមត្រកូល"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">ឈ្មោះ *</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formData.firstName"
                      placeholder="បញ្ចូលឈ្មោះ"
                      required
                    />
                  </div>
                  <div class="col-12">
                    <label class="form-label">អ៊ីមែល *</label>
                    <input
                      type="email"
                      class="form-control"
                      v-model="formData.email"
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>
                  <div class="col-12">
                    <label class="form-label">សារ *</label>
                    <textarea
                      class="form-control"
                      rows="4"
                      v-model="formData.message"
                      placeholder="សរសេរសាររបស់អ្នក..."
                      required
                    ></textarea>
                    <div class="char-count text-end small opacity-50">
                      {{ formData.message.length }} / 500
                    </div>
                  </div>
                  <div class="col-12 mt-3">
                    <button
                      type="submit"
                      class="btn btn-purple w-100"
                      :disabled="isSubmitting"
                    >
                      <i
                        class="bi"
                        :class="
                          isSubmitting ? 'bi-arrow-repeat spin' : 'bi-send-fill'
                        "
                      ></i>
                      {{ isSubmitting ? "កំពុងផ្ញើ..." : "ផ្ញើសារ" }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="contact-card contact-info" data-aos="fade-left">
              <h3 class="section-title">
                <i class="bi bi-info-circle-fill"></i> ព័ត៌មានទំនាក់ទំនង
              </h3>

              <div class="info-list">
                <div class="info-item">
                  <div class="contact-icon">
                    <i class="bi bi-geo-alt-fill"></i>
                  </div>
                  <div>
                    <h5>អាស័យដ្ឋាន</h5>
                    <p>#ផ្ទះលេខ ៨៦បេ ផ្លូវ ៣១៣, ភ្នំពេញ</p>
                  </div>
                </div>
                <div class="info-item">
                  <div class="contact-icon">
                    <i class="bi bi-telephone-fill"></i>
                  </div>
                  <div>
                    <h5>លេខទូរស័ព្ទ</h5>
                    <p><a href="tel:+85512345678">+855 12 345 678</a></p>
                  </div>
                </div>
                <div class="info-item">
                  <div class="contact-icon">
                    <i class="bi bi-envelope-at-fill"></i>
                  </div>
                  <div>
                    <h5>អ៊ីមែល</h5>
                    <p>
                      <a href="mailto:info@example.com">info@example.com</a>
                    </p>
                  </div>
                </div>
              </div>

              <div class="social-links mt-4">
                <a href="#" class="social-link"
                  ><i class="bi bi-linkedin"></i
                ></a>
                <a href="#" class="social-link"
                  ><i class="bi bi-facebook"></i
                ></a>
                <a href="#" class="social-link"><i class="bi bi-tiktok"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- 1. HERO & BACKGROUND --- */
.contact-header {
  position: relative;
  /* ADD YOUR IMAGE URL BELOW */
  background-image:
    linear-gradient(
      135deg,
      rgba(241, 237, 255, 0.95) 30%,
      rgba(241, 237, 255, 0.7) 100%
    ),
    url("https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80");
  background-size: cover;
  background-position: center;
  padding: 100px 20px;
  border-radius: 0 0 50px 50px;
  overflow: hidden;
}

.content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
}

.hero-text {
  flex: 1;
}

.label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  color: #7c3aed;
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 700;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.header-title {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #1e1b4b;
}

/* --- 2. ICON SIZES (THE FIX) --- */
.contact-icon {
  width: 44px;
  height: 44px;
  min-width: 44px;
  background: #f1edff;
  color: #7c3aed;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem; /* Locked Size */
  margin-right: 15px;
}

.checkmark {
  width: 22px;
  height: 22px;
  background: #7c3aed;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem; /* Locked Size */
}

.social-link {
  width: 40px;
  height: 40px;
  background: white;
  color: #7c3aed;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.2rem;
  transition: 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-decoration: none;
}

.social-link:hover {
  background: #7c3aed;
  color: white;
  transform: translateY(-3px);
}

/* --- 3. LAYOUT & CARDS --- */
.contact-card {
  background: white;
  padding: 40px;
  border-radius: 24px;
  height: 100%;
  box-shadow: 0 15px 35px rgba(30, 27, 75, 0.05);
  border: 1px solid rgba(124, 58, 237, 0.1);
}

.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1e1b4b;
}

.section-title i {
  color: #7c3aed;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #fcfaff;
  border-radius: 16px;
  margin-bottom: 15px;
  transition: 0.3s;
}

.info-item:hover {
  transform: translateX(8px);
  background: #f1edff;
}

.btn-purple {
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.form-control {
  background: #f8f7ff;
  border: 2px solid transparent;
  padding: 12px;
  border-radius: 10px;
}

.form-control:focus {
  border-color: #7c3aed;
  box-shadow: none;
  background: white;
}

.hero-image {
  max-width: 420px;
  filter: drop-shadow(0 20px 40px rgba(124, 58, 237, 0.2));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@media (max-width: 991px) {
  .content-wrapper {
    flex-direction: column;
    text-align: center;
  }
  .features {
    align-items: center;
  }
}
</style>

<script setup>
import { ref, reactive } from "vue";

const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  message: "",
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  await new Promise((r) => setTimeout(r, 1500)); // Simulate API
  alert("សារត្រូវបានផ្ញើ!");
  isSubmitting.value = false;
  formData.message = "";
};
</script>

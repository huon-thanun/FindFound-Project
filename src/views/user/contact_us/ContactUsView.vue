<template>
  <div class="main-contact">
    <div class="container-fluid mx-0 p-0">
      <div class="contact-header">
        <div class="container">
            <div class="content-wrapper">
                <div class="hero-text text-center">
                    <span class="label"><i class="bi-person"></i> ទំនាក់ទំនង</span>
                    <h1 class="header-title">ទាក់ទងមកពួកយើង</h1>
                    <p>ផ្ញើរសារមកកាន់ទីនេះយើងនឹងឆ្លើយតបយ៉ាងឆាប់រហ័សបំផុត</p>
                    
                    <div class="features mt-4">
                        <div class="feature">
                            <div class="checkmark">✓</div>
                            <span>ឆ្លើយតបរហ័ស 24/7</span>
                        </div>
                        <div class="feature">
                            <div class="checkmark">✓</div>
                            <span>ជំនួយដោយអ្នកជំនាញ</span>
                        </div>
                    </div>
                </div>
                
                <div class="hero-image-wrapper">
                    <img src="@/assets/images/background/image-Photoroom (2).png" alt="Contact Us" class="hero-image">
                </div>
            </div>
        </div>
    </div>
      
      <div class="contact-content mt-lg-5 mt-4">
        <div class="row g-4">
          <!-- Contact Form -->
          <div class="col-lg-6">
            <div class="contact-form" data-aos="zoom-in-right" data-aos-duration="1000">
              <h3 class="mb-4">
                <i class="bi-envelope"></i> ផ្ញើសារមកយើង
              </h3>
              
              <form @submit.prevent="handleSubmit" ref="contactForm">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="lastName" class="form-label">នាមត្រកូល *</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      v-model="formData.lastName"
                      placeholder="បញ្ចូលនាមត្រកូល"
                      required
                      :disabled="isSubmitting"
                    />
                  </div>
                  
                  <div class="col-md-6">
                    <label for="firstName" class="form-label">ឈ្មោះ *</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      v-model="formData.firstName"
                      placeholder="បញ្ចូលឈ្មោះ"
                      required
                      :disabled="isSubmitting"
                    />
                  </div>
                  
                  <div class="col-12">
                    <label for="email" class="form-label">អ៊ីមែល *</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="formData.email"
                      placeholder="findfound@gmail.com"
                      required
                      :disabled="isSubmitting"
                    />
                  </div>
                  
                  <div class="col-12">
                    <label for="phone" class="form-label">លេខទូរស័ព្ទ</label>
                    <input
                      type="tel"
                      class="form-control"
                      id="phone"
                      v-model="formData.phone"
                      placeholder="+855 12 345 678"
                      :disabled="isSubmitting"
                    />
                  </div>
                  
                  <div class="col-12">
                    <label for="message" class="form-label">សារ *</label>
                    <textarea
                      class="form-control"
                      id="message"
                      rows="5"
                      v-model="formData.message"
                      placeholder="សរសេរសាររបស់អ្នកនៅទីនេះ..."
                      required
                      :disabled="isSubmitting"
                    ></textarea>
                    <div class="char-count">{{ formData.message.length }} / 500</div>
                  </div>
                  
                  <div class="col-12 mt-3">
                    <button
                      type="submit"
                      class="btn p-0 btn-purple btn-lg w-100"
                      :disabled="isSubmitting"
                    >
                      <span v-if="!isSubmitting">
                        <i class="fas fa-paper-plane me-2"></i>ផ្ញើសារ
                      </span>
                      <span v-else>
                        <i class="fas fa-spinner fa-spin me-2"></i>កំពុងផ្ញើ...
                      </span>
                    </button>
                  </div>
                  
                  <!-- Alert Messages -->
                  <div class="col-12">
                    <transition name="fade">
                      <div
                        v-if="alertMessage"
                        :class="['alert', alertType === 'success' ? 'alert-success' : 'alert-danger', 'text-center']"
                        role="alert"
                      >
                        <i :class="alertType === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
                        {{ alertMessage }}
                      </div>
                    </transition>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="col-lg-6">
            <div class="contact-info" data-aos="zoom-in-left" data-aos-duration="1000">
              <h3 class="mb-4">
                <i class="fas fa-info-circle me-2"></i>ព័ត៌មានទំនាក់ទំនង
              </h3>

              <div class="contact-info-item">
                <div class="contact-icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="title-info-item">
                  <h5>អាស័យដ្ឋាន</h5>
                  <p>
                    #ផ្ទះលេខ ៨៦បេ ផ្លូវ ៣១៣, រាជធានីភ្នំពេញ, កម្ពុជា
                  </p>
                </div>
              </div>

              <div class="contact-info-item">
                <div class="contact-icon">
                  <i class="fas fa-phone"></i>
                </div>
                <div class="title-info-item">
                  <h5>លេខទូរស័ព្ទ</h5>
                  <p><a href="tel:+85510584267">+855 12 345 678</a></p>
                </div>
              </div>

              <div class="contact-info-item">
                <div class="contact-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="title-info-item">
                  <h5>អ៊ីមែល</h5>
                  <p><a href="mailto:G13_eExam@gmail.com">findfound@gmail.com</a></p>
                </div>
              </div>

              <div class="social-links gap-4">
                <a href="#" class="social-link" aria-label="LinkedIn">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#" class="social-link" aria-label="Facebook">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-link" aria-label="Twitter">
                  <i class="fab fa-tiktok"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Section -->
        <div class="row mt-5">
          <div class="col-12" data-aos="zoom-in" data-aos-duration="1000">
            <div class="map-container">
              <h3 class="mb-4">
                <i class="fas fa-map-marked-alt me-2"></i>ស្វែងរកពួកយើងនៅទីនេះ
              </h3>
              <div class="map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.320764821367!2d104.8902602!3d11.5722131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109519e706d9cdf%3A0xb0bf13884e6cd05f!2sANT%20Technology%20Training%20Center!5e0!3m2!1sen!2skh!4v1693635000000!5m2!1sen!2skh"
                  width="100%"
                  height="400"
                  style="border: 0; border-radius: 15px"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="ANT Technology Training Center Location"
                >
                </iframe>
                <div class="map-overlay">
                  <div class="map-info">
                    <h5>
                      <i class="fas fa-map-marker-alt me-2"></i>ទីតាំងរបស់យើង
                    </h5>
                    <p>
                      #ផ្ទះលេខ ៨៦បេ ផ្លូវ ៣១៣, រាជធានីភ្នំពេញ, កម្ពុជា
                    </p>
                    <a href="https://www.google.com/maps/place/ANT+Technology+Training+Center/@11.5725147,104.8873555,17z/data=!4m6!3m5!1s0x3109519e706d9cdf:0xb0bf13884e6cd05f!8m2!3d11.5722131!4d104.8902602!16s%2Fg%2F1hdz7k133?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="btn-directions">
                      <i class="fas fa-directions me-2"></i>ទទួលបានទិសដៅ
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// Reactive state
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const alertMessage = ref('');
const alertType = ref('success');
const contactForm = ref(null);

// Validate form
const validateForm = () => {
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alertType.value = 'error';
    alertMessage.value = 'សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ';
    return false;
  }
  
  // Message length validation
  if (formData.message.length > 500) {
    alertType.value = 'error';
    alertMessage.value = 'សារមិនអាចលើសពី 500 តួអក្សរ';
    return false;
  }
  
  return true;
};

// Submit form to API
const submitForm = async () => {
  // Replace this with your actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Form submitted:', formData);
      resolve();
    }, 1500);
  });
  
  // Example API call:
  // const response = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(formData)
  // });
  // return response.json();
};

// Reset form
const resetForm = () => {
  formData.firstName = '';
  formData.lastName = '';
  formData.email = '';
  formData.phone = '';
  formData.subject = '';
  formData.message = '';
  
  // Reset form validation state
  if (contactForm.value) {
    contactForm.value.classList.remove('was-validated');
  }
};

// Handle form submission
const handleSubmit = async () => {
  if (isSubmitting.value) return;
  
  // Validate form
  if (!validateForm()) {
    return;
  }
  
  isSubmitting.value = true;
  alertMessage.value = '';
  
  try {
    // Simulate API call (replace with actual API endpoint)
    await submitForm();
    
    alertType.value = 'success';
    alertMessage.value = '✅ សារត្រូវបានផ្ញើដោយជោគជ័យ! យើងនឹងឆ្លើយតបក្នុងរយៈពេល 24 ម៉ោង។';
    
    // Reset form
    resetForm();
    
  } catch (error) {
    alertType.value = 'error';
    alertMessage.value = '❌ មានបញ្ហាក្នុងការផ្ញើសារ។ សូមព្យាយាមម្តងទៀត។';
    console.error('Form submission error:', error);
  } finally {
    isSubmitting.value = false;
    
    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      alertMessage.value = '';
    }, 5000);
  }
};
</script>

<style scoped>
/* Main Container */
.main-contact {
  background: rgb(244,247,255);
  min-height: 100vh;
  padding-bottom: 50px;
}
.contact-header {
            background: linear-gradient(135deg, var(--primary-color, #6366f1), #8b5cf6);
            padding: 0px 20px;
            overflow: hidden;
            border-radius: 0 0 30px 30px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .content-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 60px;
        }

        .hero-text {
            flex: 1;
            color: white;
        }

        .label {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 20px;
            border-radius: 50px;
            font-size: 14px;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        h1 {
            font-size: 48px;
            margin-bottom: 20px;
            font-weight: 700;
        }

        p {
            font-size: 18px;
            line-height: 1.6;
            opacity: 0.95;
            margin-bottom: 30px;
        }

        .features {
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 15px;
        }

        .feature {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .checkmark {
            width: 32px;
            height: 32px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .hero-image-wrapper {
            flex: 1;
            text-align: center;
        }

        .hero-image {
            max-width: 450px;
            width: 100%;
            height: auto;
            filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2));
        }

        @media (max-width: 768px) {
            .content-wrapper {
                flex-direction: column;
                text-align: center;
            }

            h1 {
                font-size: 36px;
            }

            .hero-image {
                max-width: 300px;
            }

            .features {
                align-items: center;
            }
        }
@keyframes float {
  0%, 100% {
    transform: translateX(0) translateY(0) rotate(0deg);
  }
  33% {
    transform: translateX(10px) translateY(-10px) rotate(1deg);
  }
  66% {
    transform: translateX(-5px) translateY(5px) rotate(-1deg);
  }
}
.contact-header h1 {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.contact-header p {
  font-size: 1.2rem;
  opacity: 0.95;
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0 auto;
}

/* Content Section */
.contact-content {
  padding: 0 60px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Contact Form */
.contact-form {
  background: var(--white--secondary, #fff);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  height: 100%;
}

.contact-form h3 {
  color: var(--primary--white, #333);
  font-weight: 600;
  font-size: 1.5rem;
}

.form-label {
  font-weight: 600;
  color: var(--black--white, #333);
  margin-bottom: 8px;
  font-size: 1rem;
}

.form-control {
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 12px 15px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: var(--white--grey, #f8f9fa);
}

.form-control::placeholder {
  color: var(--grey--white, #adb5bd);
}

.form-control:focus {
  border-color: var(--primary-color, #5a189a);
  box-shadow: 0 0 0 0.2rem rgba(90, 24, 154, 0.25);
  background: #fff;
  outline: none;
}

.form-control:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
  opacity: 0.7;
}

.char-count {
  text-align: right;
  font-size: 0.85rem;
  color: #6c757d;
  margin-top: 5px;
}

/* Submit Button */
.btn-purple {
  background: linear-gradient(135deg, var(--primary-color, #6366f1), #8b5cf6);
  border: none;
  color: var(--surface-color) !important;
  padding: 15px 30px !important;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.btn-purple:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(90, 24, 154, 0.4);
}

.btn-purple:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-purple::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-purple:hover::before {
  width: 300px;
  height: 300px;
}

/* Alert Messages */
.alert {
  border-radius: 10px;
  padding: 15px 20px;
  font-weight: 500;
  border: none;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.alert-success {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  color: #155724;
}

.alert-danger {
  background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
  color: #721c24;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Contact Info */
.contact-info {
  background: var(--white--grey, #fff);
  padding: 40px;
  border-radius: 20px;
  height: 100%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.contact-info h3 {
  color: var(--primary--white, #333);
  font-weight: 600;
  font-size: 1.5rem;
}

.contact-info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}

.contact-info-item:hover {
  transform: translateX(8px);
  box-shadow: 0 5px 20px rgba(90, 24, 154, 0.15);
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--primary-color, #6366f1), #8b5cf6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-white, #fff);
  font-size: 1.2rem;
  margin-right: 20px;
  flex-shrink: 0;
  box-shadow: 0 5px 15px rgba(90, 24, 154, 0.3);
}

.title-info-item h5 {
  color: var(--black--white, #333);
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.title-info-item p {
  color: #666;
  margin: 0;
  line-height: 1.6;
}

.title-info-item a {
  color: var(--primary-color, #5a189a);
  text-decoration: none;
  transition: color 0.3s ease;
}

.title-info-item a:hover {
  color: var(--primary1-color, #7b2cbf);
  text-decoration: underline;
}

/* Social Links */
.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 2px solid #e9ecef;
}

.social-link {
  width: 50px;
  height: 50px;
  background: #fff;
  border: 2px solid var(--primary-color, #5a189a);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color, #5a189a);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.social-link:hover {
  background: linear-gradient(135deg, var(--primary-color, #6366f1), #8b5cf6);
  color: #fff !important;
  transform: translateY(-5px) rotate(5deg);
  box-shadow: 0 10px 20px rgba(90, 24, 154, 0.3);
}

/* Map Container */
.map-container {
  background: var(--color-white, #fff);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.map-container h3 {
  color: var(--primary--white, #333);
  font-weight: 600;
  font-size: 1.5rem;
}

.map-wrapper {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
}

.map-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
}

.map-wrapper iframe {
  width: 100%;
  height: 450px;
  border: none;
  filter: grayscale(20%);
  transition: filter 0.3s ease;
}

.map-wrapper:hover iframe {
  filter: grayscale(0%);
}

.map-overlay {
  position: absolute;
  top: 5px;
  left: 5px;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  border-left: 5px solid var(--primary-color, #5a189a);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  max-width: 350px;
  animation: slideInLeft 0.8s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.map-overlay h5 {
  color: var(--primary-color, #5a189a);
  font-weight: 600;
  margin-bottom: 12px;
  font-size: 1.1rem;
}

.map-overlay p {
  color: #666;
  margin: 0 0 15px 0;
  font-size: 0.95rem;
  line-height: 1.6;
}

.btn-directions {
  display: inline-block;
  background: linear-gradient(135deg, var(--primary-color, #6366f1), #8b5cf6);
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(90, 24, 154, 0.3);
}

.btn-directions:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(90, 24, 154, 0.4);
  color: #fff;
}

/* Responsive Design */
@media (max-width: 992px) {
  .contact-content {
    padding: 0 30px;
  }
  
  .contact-header h1 {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .contact-content {
    padding: 0 20px;
  }

  .contact-form,
  .contact-info,
  .map-container {
    padding: 30px 20px;
  }

  .contact-header {
    padding: 60px 20px;
  }

  .contact-header h1 {
    font-size: 2rem;
  }

  .contact-header p {
    font-size: 1rem;
  }

  .contact-info-item {
    flex-direction: column;
    text-align: center;
  }

  .contact-icon {
    margin-right: 0;
    margin-bottom: 15px;
  }

  .map-wrapper iframe {
    height: 300px;
  }

  .social-links {
    gap: 10px;
  }

  .social-link {
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .contact-header h1 {
    font-size: 1.75rem;
  }

  .btn-purple {
    font-size: 1rem;
    padding: 12px 20px !important;
  }
}
</style>
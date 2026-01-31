<template>
  <section class="about-section py-5">
    <div class="container my-5">
      <div class="text-center mb-5" data-aos="fade-up">
        <span
          class="badge bg-soft-primary text-primary px-3 py-2 rounded-pill mb-3"
          >About Our Platform</span
        >
        <h2 class="fw-bold display-5 mb-3">
          Your Digital Security, <span class="text-gradient">Our Priority</span>
        </h2>
        <p class="text-muted mx-auto" style="max-width: 700px">
          We bridge the gap between complex security and user-friendly
          interfaces. Our platform ensures that your personal data stays yours,
          protected by the latest in authentication technology.
        </p>
      </div>

      <div class="row align-items-center g-5 mb-5">
        <div class="col-lg-6" data-aos="fade-right">
          <div class="image-wrapper shadow-lg rounded-4 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000"
              class="img-fluid"
              alt="Security"
            />
          </div>
        </div>
        <div class="col-lg-6" data-aos="fade-left">
          <div class="ps-lg-4">
            <div class="icon-box bg-primary text-white mb-4">
              <i class="fas fa-key fa-lg"></i>
            </div>
            <h3 class="fw-bold mb-3">Advanced 2FA Protection</h3>
            <p class="text-muted mb-4">
              Every login attempt is verified through a unique, time-sensitive
              One-Time Password (OTP). Even if someone has your password, they
              can't access your account without your secondary device.
            </p>
            <ul class="list-unstyled custom-list">
              <li>
                <i class="fas fa-check-circle text-success me-2"></i> Real-time
                OTP generation
              </li>
              <li>
                <i class="fas fa-check-circle text-success me-2"></i> 5-minute
                expiry for maximum safety
              </li>
              <li>
                <i class="fas fa-check-circle text-success me-2"></i>
                Database-level encryption
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row align-items-center g-5 flex-lg-row-reverse">
        <div class="col-lg-6" data-aos="fade-left">
          <div class="image-wrapper shadow-lg rounded-4 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"
              class="img-fluid"
              alt="Coding"
            />
          </div>
        </div>
        <div class="col-lg-6" data-aos="fade-right">
          <div class="pe-lg-4">
            <div class="icon-box bg-purple text-white mb-4">
              <i class="fas fa-rocket fa-lg"></i>
            </div>
            <h3 class="fw-bold mb-3">Built with Modern Tech</h3>
            <p class="text-muted mb-4">
              Our application leverages the power of <strong>Vue 3</strong> for
              a blazing fast frontend and <strong>PostgreSQL</strong> for a
              robust, secure backend database.
            </p>
            <div class="d-flex gap-3 flex-wrap">
              <span class="tech-tag">Vue.js</span>
              <span class="tech-tag">PostgreSQL</span>
              <span class="tech-tag">Java JDBC</span>
              <span class="tech-tag">Bootstrap 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");

.about-section {
  background-color: #ffffff;
}

/* Gradient Text & Tags */
.text-gradient {
  background: linear-gradient(135deg, #3b1e54 0%, #5c3976 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bg-soft-primary {
  background-color: rgba(59, 30, 84, 0.1);
}
.bg-purple {
  background: #5c3976;
}

/* Icon Box */
.icon-box {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Image Hover Effect */
.image-wrapper img {
  transition: transform 0.5s ease;
}
.image-wrapper:hover img {
  transform: scale(1.05);
}

/* Custom Tech Tags */
.tech-tag {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #495057;
}

.custom-list li {
  margin-bottom: 12px;
  font-weight: 500;
  color: #495057;
}
</style>

<template>
  <section class="cta-section py-5">
    <div class="container">
      <div
        class="cta-gradient-card shadow-lg position-relative overflow-hidden"
      >
        <div class="khmer-pattern"></div>

        <div class="row align-items-center position-relative z-1">
          <div
            class="col-lg-8 p-4 p-md-5 text-center text-lg-start"
            data-aos="fade-right"
          >
            <span
              class="badge bg-gold-soft text-gold mb-3 px-3 py-2 rounded-pill khmer-font"
            >
              ចូលរួមជាមួយសហគមន៍យើង
            </span>
            <h2 class="display-5 fw-bold text-white khmer-font-title mb-3">
              តើអ្នកបានរកឃើញរបស់អ្វីមួយមែនទេ?
            </h2>
            <p class="text-white-50 khmer-font fs-5 mb-4">
              រាល់សកម្មភាពតូចមួយរបស់អ្នក
              គឺជាកម្លាំងចិត្តដ៏ធំធេងសម្រាប់ម្ចាស់ដែលបានបាត់បង់របស់។
              មករួមគ្នាបង្កើតស្នាមញញឹមដល់បងប្អូនខ្មែរយើង!
            </p>
            <div
              class="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap"
            >
              <button
                class="btn btn-premium-gold px-5 py-3 rounded-pill khmer-font"
              >
                <i class="bi bi-plus-circle-fill me-2"></i> បង្ហោះរបស់រើសបាន
              </button>
              <button
                class="btn btn-outline-light-custom px-5 py-3 rounded-pill khmer-font"
              >
                ស្វែងរករបស់បាត់
              </button>
            </div>
          </div>

          <div
            class="col-lg-4 d-none d-lg-block text-center"
            data-aos="zoom-in"
          >
            <div class="floating-icon-wrapper">
              <div class="icon-circle shadow-lg">
                <i class="bi bi-megaphone-fill"></i>
              </div>
              <div class="dot dot-1"></div>
              <div class="dot dot-2"></div>
              <div class="dot dot-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Koh+Santepheap:wght@700&family=Noto+Sans+Khmer:wght@400;500;600&display=swap");

.cta-section {
  background-color: #ffffff;
  padding-bottom: 80px !important;
}

.cta-gradient-card {
  background: linear-gradient(135deg, #3b1e54 0%, #1e1b4b 100%);
  border-radius: 40px;
  min-height: 400px;
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.khmer-font {
  font-family: "Noto Sans Khmer", sans-serif;
}
.khmer-font-title {
  font-family: "Koh Santepheap", cursive;
  line-height: 1.3;
}

/* Gold Elements */
.text-gold {
  color: #d4af37;
}
.bg-gold-soft {
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.3);
}

/* Buttons */
.btn-premium-gold {
  background: #d4af37;
  color: #1e1b4b;
  font-weight: 700;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);
}

.btn-premium-gold:hover {
  background: #f1c40f;
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(212, 175, 55, 0.4);
}

.btn-outline-light-custom {
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: 600;
  transition: 0.3s;
}

.btn-outline-light-custom:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #fff;
  transform: translateY(-5px);
}

/* Floating Icon Animation */
.floating-icon-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.icon-circle {
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: #d4af37;
  border: 1px solid rgba(212, 175, 55, 0.3);
  animation: float 4s ease-in-out infinite;
}

.khmer-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    circle at 2px 2px,
    rgba(212, 175, 55, 0.05) 1px,
    transparent 0
  );
  background-size: 40px 40px;
  opacity: 0.5;
}

/* Dots Animation */
.dot {
  position: absolute;
  background: #d4af37;
  border-radius: 50%;
  opacity: 0.5;
}
.dot-1 {
  width: 15px;
  height: 15px;
  top: 20%;
  right: 10%;
  animation: pulse 2s infinite;
}
.dot-2 {
  width: 10px;
  height: 10px;
  bottom: 20%;
  left: 10%;
  animation: pulse 3s infinite;
}
.dot-3 {
  width: 20px;
  height: 20px;
  top: 50%;
  left: -10%;
  animation: pulse 4s infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}
</style>

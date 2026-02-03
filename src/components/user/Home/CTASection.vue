<template>
  <section class="cta-section py-5">
    <div class="container">
      <div class="cta-main-card shadow-lg position-relative overflow-hidden">
        <div class="glass-mesh"></div>
        <div class="glow-orb orb-1"></div>
        <div class="glow-orb orb-2"></div>

        <div class="row align-items-center position-relative z-2">
          <div
            class="col-lg-7 p-4 p-md-5 text-center text-lg-start"
            data-aos="fade-right"
          >
            <div class="cta-badge mb-3 khmer-font">
              <i class="bi bi-shield-check me-2"></i> សហគមន៍ជឿទុកចិត្ត
            </div>

            <h2 class="display-5 fw-bold text-white khmer-font-title mb-3">
              តើអ្នកបានរកឃើញរបស់អ្វីមួយមែនទេ?
            </h2>

            <p class="cta-subtitle khmer-font fs-5 mb-4">
              រាល់សកម្មភាពតូចមួយរបស់អ្នក
              គឺជាកម្លាំងចិត្តដ៏ធំធេងសម្រាប់ម្ចាស់ដែលបានបាត់បង់របស់។
              ចូលរួមបង្កើតសង្គមដែលមានការចែករំលែកជាមួយយើង!
            </p>

            <div
              class="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap"
            >
              <button class="btn-cta-primary px-5 py-3 rounded-pill khmer-font">
                <i class="bi bi-plus-circle-fill me-2"></i> បង្ហោះរបស់រើសបាន
              </button>
              <button class="btn-cta-outline px-5 py-3 rounded-pill khmer-font">
                ស្វែងរករបស់បាត់
              </button>
            </div>
          </div>

          <div class="col-lg-5 d-none d-lg-block text-center position-relative">
            <div class="visual-wrapper">
              <div class="main-glass-icon">
                <i class="bi bi-megaphone"></i>
              </div>
              <div class="mini-card card-1 animate-float">
                <div class="icon-box bg-primary">
                  <i class="bi bi-wallet2"></i>
                </div>
                <div class="text-start">
                  <div class="tiny-text">Found Wallet</div>
                  <div class="tiny-status">Just Now</div>
                </div>
              </div>
              <div class="mini-card card-2 animate-float-delayed">
                <div class="icon-box bg-info">
                  <i class="bi bi-key-fill"></i>
                </div>
                <div class="text-start">
                  <div class="tiny-text">Keys Found</div>
                  <div class="tiny-status">2m ago</div>
                </div>
              </div>
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
  padding: 60px 0 100px !important;
}

.cta-main-card {
  background: #1e1b4b; /* Deep Indigo Base */
  border-radius: 45px;
  min-height: 420px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.khmer-font {
  font-family: "Noto Sans Khmer", sans-serif;
}
.khmer-font-title {
  font-family: "Koh Santepheap", cursive;
  line-height: 1.3;
}

/* New Colors: Indigo, Violet, and White */
.cta-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(124, 58, 237, 0.2);
  color: #a78bfa;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(167, 139, 250, 0.3);
}

.cta-subtitle {
  color: #cbd5e1; /* Soft Grey-Blue */
  max-width: 600px;
}

/* Buttons (No Yellow) */
.btn-cta-primary {
  background: #7c3aed; /* Electric Violet */
  color: #ffffff;
  font-weight: 700;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(124, 58, 237, 0.3);
}

.btn-cta-primary:hover {
  background: #8b5cf6;
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(124, 58, 237, 0.4);
}

.btn-cta-outline {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: 600;
  transition: 0.3s;
  backdrop-filter: blur(5px);
}

.btn-cta-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #fff;
  transform: translateY(-5px);
}

/* Background Effects */
.glass-mesh {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(255, 255, 255, 0.05) 1px,
    transparent 0
  );
  background-size: 30px 30px;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  z-index: 1;
}
.orb-1 {
  width: 300px;
  height: 300px;
  background: #4f46e5;
  top: -100px;
  right: -50px;
}
.orb-2 {
  width: 250px;
  height: 250px;
  background: #7c3aed;
  bottom: -50px;
  left: 10%;
}

/* Visual Side Elements */
.visual-wrapper {
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-glass-icon {
  width: 140px;
  height: 140px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4.5rem;
  color: #fff;
  transform: rotate(-10deg);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
}

.mini-card {
  position: absolute;
  background: white;
  padding: 10px 15px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 5;
}
.card-1 {
  top: 15%;
  right: 10%;
}
.card-2 {
  bottom: 20%;
  left: 10%;
}

.icon-box {
  width: 35px;
  height: 35px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.tiny-text {
  font-size: 0.8rem;
  font-weight: 700;
  color: #1e1b4b;
}
.tiny-status {
  font-size: 0.65rem;
  color: #64748b;
}

/* Animations */
.animate-float {
  animation: float 5s ease-in-out infinite;
}
.animate-float-delayed {
  animation: float 5s ease-in-out infinite 2.5s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@media (max-width: 991px) {
  .cta-main-card {
    border-radius: 30px;
    text-align: center;
  }
  .cta-subtitle {
    margin-inline: auto;
  }
}
</style>

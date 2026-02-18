<template>
  <section class="hero-section">
    <div class="hero-bg"></div>

    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <div class="container position-relative">
      <div class="row align-items-center pt-4 py-0 g-5">
        <!-- Text Column -->
        <div class="col-lg-6 py-5 px-5 m-0 hero-text-col" data-aos="fade-right">
          <div class="badge-modern mb-4">
            <i class="bi bi-people-fill me-2"></i>
            ទីកន្លែងដែលអាចទុកចិត្តបាន
          </div>
          <h1 class="gradient-text pt-2 fw-bold mb-3">
            បាត់របស់របរមែនទេ?<br />
            <span class="text-highlight">ពួកយើងជួយអ្នកបាន</span>
          </h1>
          <p class="hero-subtitle">
            បណ្ដាញសង្គមឈានមុខគេនៅកម្ពុជា សម្រាប់ស្វែងរករបស់បាត់។
            ចូលរួមក្នុងសហគមន៍ជួយគ្នាដើម្បីនាំរបស់មានតម្លៃត្រឡប់ទៅម្ចាស់ដើមវិញដោយសុវត្ថិភាព។
          </p>
          <div class="action-buttons d-flex flex-wrap gap-3">
            <router-link
              to="/reports/own/create"
              class="btn-main-action text-decoration-none"
            >
              <i class="bi bi-plus-lg"></i>
              <span>ប្រកាសរបស់របរ</span>
            </router-link>

            <router-link
              to="/reports/user"
              class="btn-secondary-action text-decoration-none"
            >
              <i class="bi bi-eye"></i>
              <span>មើលរបស់របរ</span>
            </router-link>
          </div>
        </div>

        <!-- Illustration Column -->
        <div
          class="col-lg-6 hero-illustration d-flex justify-content-center m-0 p-0"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <img
            src="../../../assets/images/home/hero/hero-banner.png"
            alt="Contact Us Illustration"
            class="hero-img m-0 img-fluid"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* @import url("https://fonts.googleapis.com/css2?family=Koh+Santepheap:wght@700&family=Noto+Sans+Khmer:wght@400;500;700&display=swap"); */
@import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700;800&display=swap");

.hero-section {
  position: relative;
  background: linear-gradient(
    135deg,
    #f5f0ff 0%,
    #efe8ff 35%,
    #e6d9ff 65%,
    #d9ccff 100%
  );
  overflow: hidden;
  font-family: "Noto Sans Khmer", sans-serif;
}

.hero-title {
  font-family: "Koh Santepheap", sans-serif;
  font-size: clamp(2.8rem, 7.5vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  color: #1e1b4b;
  margin-bottom: 1.25rem;
}

.highlight {
  background: linear-gradient(90deg, #7c3aed, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.7;
  color: #4b5563;
  max-width: 480px;
  margin-bottom: 2.5rem;
}

.action-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

/* New button styles matching your image */
.btn {
  padding: 14px 32px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

/* Action Buttons */
.btn-main-action {
  background: var(--secondary-color);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2);
  padding: 16px 32px;
  border: 2px solid transparent;
  border-radius: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: 0.3s;
}
.btn-main-action:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(59, 30, 84, 0.25);
}
.btn-secondary-action {
  background: white;
  color: var(--secondary-color);
  padding: 16px 32px;
  border: 2px solid transparent;
  border-radius: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: 0.3s;
}
.btn-secondary-action:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(59, 30, 84, 0.25);
  background: #f8fafc;
  border-color: var(--secondary-color);
}

/* Image Side Layout */
.image-experience {
  position: relative;
  padding: 20px;
}
.main-image-wrapper {
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  /* box-shadow: 0 10px 60px rgba(0, 0, 0, 0.15); */
  transform: perspective(1000px) rotateY(-5deg);
}
.hero-img {
  width: 100%;
  object-fit: cover;
}

.btn-outline-pill:hover {
  background: rgba(168, 85, 247, 0.08);
  border-color: #7c3aed;
  color: #7c3aed;
  transform: translateY(-2px);
}

/* Illustration */
.illustration-wrapper {
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(124, 58, 237, 0.1);
  /* background: white; */
  transition: transform 0.4s ease;
}

.illustration-wrapper:hover {
  transform: translateY(-6px);
}

.illustration-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

/* Responsive */
@media (max-width: 991px) {
  .hero-title {
    font-size: clamp(2.4rem, 8vw, 4rem);
  }

  .hero-subtitle {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .action-group {
    justify-content: center;
  }

  .illustration-wrapper {
    margin: 3rem auto 1rem;
    max-width: 480px;
  }
}

@media (max-width: 576px) {
  .action-group {
    flex-direction: column;
    gap: 1rem;
  }

  .btn {
    width: 100%;
  }
}


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
  margin: 0 0 20px;
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
  font-size: clamp(2.6rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 1.5rem;
}

.gradient-text {
  background: linear-gradient(90deg, #7c3aed, #a78bfa, #c4b5fd);
  -webkit-background-clip: text;
  font-size: clamp(2.6rem, 6vw, 4rem);
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
  max-width: 100%;
  margin-left: -10%;
  filter: drop-shadow(0 30px 70px rgba(0, 0, 0, 0.16)) brightness(1.03);
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>

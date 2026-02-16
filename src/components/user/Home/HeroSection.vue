<template>
  <section id="hero" class="hero-section">
    <div class="blob-bg">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <div class="container hero-container">
      <div class="row align-items-center gy-5">
        <div class="col-lg-6 hero-content text-start">
          <h1 class="gradient-text fw-bold mb-3">
            បាត់របស់របរមែនទេ?<br />
            <span class="text-highlight">ពួកយើងជួយអ្នកបាន</span>
          </h1>

          <p class="hero-description mb-4">
            បណ្ដាញសង្គមឈានមុខគេនៅកម្ពុជា សម្រាប់ស្វែងរករបស់បាត់។
            ចូលរួមក្នុងសហគមន៍ជួយគ្នា
            ដើម្បីនាំរបស់មានតម្លៃត្រឡប់ទៅម្ចាស់ដើមវិញដោយសុវត្ថិភាព។
          </p>

          <div class="action-buttons d-flex flex-wrap gap-3">
            <router-link
              to="/reports/own/create"
              class="btn-main-action text-decoration-none"
            >
              <i class="bi bi-plus-lg"></i>
              <span>ប្រកាសបាត់របស់</span>
            </router-link>

            <router-link
              to="/reports/user"
              class="btn-secondary-action text-decoration-none"
            >
              <i class="bi bi-eye"></i>
              <span>មើលរបស់រើសបាន</span>
            </router-link>
          </div>
        </div>

        <div class="col-lg-6 hero-media">
          <div class="image-experience">
            <div class="main-image-wrapper">
              <img
                src="../../../assets/images/home/hero/hero-img.png"
                alt="Lost and Found"
                class="hero-img"
              />
              <div class="image-overlay-gradient"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: "៨៥០+", label: "រកឃើញវិញ", icon: "bi bi-heart-fill text-danger" },
  { value: "៥K+", label: "សមាជិក", icon: "bi bi-people-fill text-primary" },
  {
    value: "១០០%",
    label: "ឥតគិតថ្លៃ",
    icon: "bi bi-patch-check-fill text-success",
  },
];

const features = [
  {
    title: "បង្ហោះព័ត៌មាន",
    desc: "ផ្ដល់ព័ត៌មាន និងរូបភាពរបស់ដែលបាត់ ឬរើសបានចូលក្នុងប្រព័ន្ធ។",
    icon: "bi bi-megaphone",
    isFeatured: false,
  },
  {
    title: "ប្រព័ន្ធផ្គូផ្គង AI",
    desc: "ស្វែងរក និងផ្គូផ្គងរបស់ដែលស្រដៀងគ្នាឱ្យអ្នកភ្លាមៗតាមបច្ចេកវិទ្យា AI។",
    icon: "bi bi-lightning-charge-fill",
    isFeatured: true,
  },
  {
    title: "ទទួលរបស់វិញ",
    desc: "ធ្វើការផ្ទៀងផ្ទាត់ដោយសុវត្ថិភាពជាមួយម្ចាស់ និងទទួលយករបស់វិញ។",
    icon: "bi bi-hand-index-thumb",
    isFeatured: false,
  },
];
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Koh+Santepheap:wght@400;700&family=Noto+Sans+Khmer:wght@300;400;500;600;700&display=swap");

.hero-section {
  position: relative;
  padding: 40px 0 0px;
  background-color: #fcfdff;
  font-family: "Noto Sans Khmer", sans-serif;
  overflow: hidden;
}

/* Background Decorations */
.blob {
  position: absolute;
  filter: blur(100px);
  opacity: 0.25;
  z-index: 0;
  border-radius: 50%;
}
.blob-1 {
  width: 500px;
  height: 500px;
  background: #9955d5a6;
  top: -10%;
  right: -5%;
}
.blob-2 {
  width: 400px;
  height: 400px;
  background: #7c3aed;
  bottom: 5%;
  left: -5%;
}
.blob-3 {
  width: 300px;
  height: 300px;
  background: #60a5fa;
  top: 20%;
  left: 30%;
  opacity: 0.15;
}

/* Text & Typography */
.badge-new {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: white;
  border: 1px solid #e2e8f0;
  color: #3b1e54;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}
.pulse-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.gradient-text {
  font-family: "Koh Santepheap", sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  color: #1e1b4b;
  line-height: 1.1;
}
.text-highlight {
  background: linear-gradient(135deg, #3b1e54 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-description {
  font-size: 1.15rem;
  color: #64748b;
  max-width: 550px;
  line-height: 1.7;
}

/* Search Box Refined */
.search-wrapper {
  max-width: 500px;
}
.search-glass-input {
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid #f1f5f9;
  border-radius: 20px;
  padding: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
}
.search-glass-input:focus-within {
  border-color: #7c3aed;
  box-shadow: 0 15px 35px rgba(124, 58, 237, 0.1);
}
.search-glass-input input {
  border: none;
  flex: 1;
  padding: 10px 15px;
  outline: none;
  font-size: 1rem;
}
.btn-search {
  background: #3b1e54;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 15px;
  font-weight: 600;
  transition: 0.3s;
}
.btn-search:hover {
  background: #512a73;
}

/* Stats Cards */
.stats-grid {
  display: flex;
  gap: 20px;
}
.stat-glass-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  padding: 15px 20px;
  border-radius: 20px;
  border: 1px solid white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03);
}
.stat-icon-mini {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
.stat-number {
  display: block;
  font-size: 1.25rem;
  font-weight: 800;
  color: #1e1b4b;
  line-height: 1;
}
.stat-label {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

/* Action Buttons */
.btn-main-action {
  background: #3b1e54;
  color: white;
  padding: 16px 32px;
  border: none;
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
  color: #3b1e54;
  padding: 16px 32px;
  border: 2px solid #f1f5f9;
  border-radius: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: 0.3s;
}
.btn-secondary-action:hover {
  background: #f8fafc;
  border-color: #3b1e54;
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
  height: 500px;
  object-fit: cover;
}

/* Floating Cards */
.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 15px 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  z-index: 10;
}
.info-card-top {
  top: 10%;
  right: -20px;
  border-top: 4px solid #10b981;
}
.info-card-bottom {
  bottom: 15%;
  left: -30px;
}

.icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.avatar-stack {
  display: flex;
  align-items: center;
}
.avatar-stack img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid white;
  margin-right: -10px;
}
.avatar-more {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #3b1e54;
  color: white;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

/* Feature Section Refined */
.features-container {
  margin-top: -40px;
  position: relative;
  z-index: 20;
}
.feature-modern-card {
  background: white;
  padding: 40px 30px;
  border-radius: 30px;
  height: 100%;
  position: relative;
  border: 1px solid #f1f5f9;
  transition: 0.4s;
}
.feature-modern-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}
.feature-modern-card.is-active {
  background: #3b1e54;
  color: white;
}
.feature-icon {
  width: 60px;
  height: 60px;
  background: #f8fafc;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #7c3aed;
  margin-bottom: 25px;
}
.is-active .feature-icon {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}
.feature-step {
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  opacity: 0.5;
}

/* Animations */
@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}
.animate-float-delayed {
  animation: float 4s ease-in-out infinite 2s;
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

/* Responsive Fixes */
@media (max-width: 991px) {
  .hero-section {
    text-align: center;
    padding: 60px 0;
  }
  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .gradient-text {
    font-size: 2.8rem;
  }
  .main-image-wrapper {
    transform: none;
    margin-top: 40px;
  }
  .info-card-bottom {
    left: 10px;
  }
  .info-card-top {
    right: 10px;
  }
  .stats-grid {
    flex-wrap: wrap;
    justify-content: center;
  }
  .action-buttons {
    justify-content: center;
  }
}
</style>

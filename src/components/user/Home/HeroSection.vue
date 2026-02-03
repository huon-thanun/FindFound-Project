<template>
  <section id="hero" class="hero-section">
    <div class="blob-bg">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>

    <div class="container hero-container">
      <div class="row align-items-center gy-5">
        <div class="col-lg-6 hero-content">
          <div class="badge-new animate__animated animate__fadeInDown">
            ✨ ជួយគ្នារករបស់ដែលបាត់មកវិញ
          </div>
          <h1 class="gradient-text fw-bold mb-3">
            បាត់របស់របរមែនទេ?<br />ពួកយើងជួយអ្នកបាន
          </h1>
          <p class="hero-description mb-4">
            ស្វែងរក ឬប្រកាសរបស់របរដែលអ្នកបានបាត់ ឬរើសបាន។
            ចូលរួមក្នុងសហគមន៍ជួយគ្នា ដើម្បីនាំរបស់មានតម្លៃត្រឡប់ទៅម្ចាស់ដើមវិញ។
          </p>

          <div class="search-box-container mb-4">
            <div class="search-glass-input">
              <i class="bi bi-search ms-3 text-muted"></i>
              <input type="text" placeholder="ស្វែងរករបស់ដែលបាត់..." />
              <button class="btn-search">ស្វែងរក</button>
            </div>
          </div>

          <div class="stats-grid mb-4">
            <div
              class="stat-glass-card"
              v-for="(stat, index) in stats"
              :key="index"
            >
              <span class="stat-number">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>

          <div class="action-buttons d-flex flex-wrap gap-3">
            <button class="btn-main-action">
              <i class="bi bi-plus-circle"></i>
              <span>ប្រកាសបាត់របស់</span>
            </button>
            <button class="btn-video-action">
              <div class="play-icon"><i class="bi bi-megaphone-fill"></i></div>
              <span>របស់ទើបនឹងរើសបាន</span>
            </button>
          </div>
        </div>

        <div class="col-lg-6 hero-media text-center">
          <div class="floating-image-wrapper">
            <div class="main-image-card">
              <img
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800"
                alt="Lost and Found"
                class="hero-img"
              />
            </div>
            <div class="floating-badge badge-top">
              <i class="bi bi-shield-check-fill text-success fs-4"></i>
              <div class="text-start">
                <div class="fw-bold small">Verified System</div>
                <div class="text-muted extra-small">សុវត្ថិភាពទិន្នន័យ</div>
              </div>
            </div>
            <div class="floating-badge badge-bottom">
              <i class="bi bi-heart-fill text-danger me-2"></i>
              <span class="small fw-bold">ជួយមនុស្សបាន ២០០+ នាក់</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container features-section mt-5">
      <div class="row g-4">
        <div class="col-md-4" v-for="(feature, index) in features" :key="index">
          <div
            :class="['feature-glass-card', { featured: feature.isFeatured }]"
          >
            <div :class="['icon-box', feature.isFeatured ? 'white' : 'purple']">
              <i :class="feature.icon"></i>
            </div>
            <h5 class="fw-bold">{{ feature.title }}</h5>
            <p class="small mb-0">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: "៨៥០+", label: "រកឃើញវិញ" },
  { value: "៥K+", label: "សមាជិក" },
  { value: "១០០%", label: "ឥតគិតថ្លៃ" },
];

const features = [
  {
    title: "១. បង្ហោះព័ត៌មាន",
    desc: "ផ្ដល់ព័ត៌មាន និងរូបភាពរបស់ដែលបាត់ចូលក្នុងប្រព័ន្ធ។",
    icon: "bi bi-pencil-square",
    isFeatured: false,
  },
  {
    title: "២. ប្រព័ន្ធផ្គូផ្គង AI",
    desc: "ស្វែងរក និងផ្គូផ្គងរបស់ដែលស្រដៀងគ្នាឱ្យអ្នកភ្លាមៗ។",
    icon: "bi bi-cpu-fill",
    isFeatured: true,
  },
  {
    title: "៣. ទទួលរបស់វិញ",
    desc: "ធ្វើការផ្ទៀងផ្ទាត់ដោយសុវត្ថិភាព និងទទួលយករបស់វិញ។",
    icon: "bi bi-hand-thumbs-up-fill",
    isFeatured: false,
  },
];
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Koh+Santepheap:wght@400;700&family=Noto+Sans+Khmer:wght@300;400;500;600;700&display=swap");

.hero-section {
  position: relative;
  padding: 60px 0 120px;
  background-color: #f8fafc;
  font-family: "Noto Sans Khmer", sans-serif;
  overflow: hidden;
}

/* Background Blobs */
.blob {
  position: absolute;
  filter: blur(80px);
  opacity: 0.3;
  border-radius: 50%;
  z-index: 0;
}
.blob-1 {
  width: 400px;
  height: 400px;
  background: #c084fc;
  top: -100px;
  right: -50px;
}
.blob-2 {
  width: 300px;
  height: 300px;
  background: #818cf8;
  bottom: 10%;
  left: -50px;
}

/* Hero Content */
.hero-container {
  position: relative;
  z-index: 2;
}
.badge-new {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(59, 30, 84, 0.1);
  color: #3b1e54;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 20px;
}
.gradient-text {
  font-family: "Koh Santepheap", sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  background: linear-gradient(135deg, #3b1e54 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}
.hero-description {
  font-size: 1.1rem;
  color: #475569;
  max-width: 520px;
}

/* Search Box */
.search-glass-input {
  display: flex;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 6px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}
.search-glass-input input {
  border: none;
  width: 100%;
  padding: 10px;
  outline: none;
  font-size: 0.95rem;
}
.btn-search {
  background: #3b1e54;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 14px;
  font-weight: 600;
  transition: 0.3s;
}

/* Stats */
.stats-grid {
  display: flex;
  gap: 15px;
}
.stat-glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid #fff;
  padding: 12px;
  border-radius: 18px;
  flex: 1;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}
.stat-number {
  display: block;
  font-size: 1.3rem;
  font-weight: 700;
  color: #3b1e54;
}
.stat-label {
  font-size: 0.75rem;
  color: #64748b;
}

/* Buttons */
.btn-main-action {
  background: #3b1e54;
  color: white;
  padding: 14px 28px;
  border: none;
  border-radius: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 20px rgba(59, 30, 84, 0.2);
  transition: 0.3s;
}
.btn-main-action:hover {
  transform: translateY(-3px);
  background: #2a153d;
}

.btn-video-action {
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  background: none;
  font-weight: 600;
  color: #1e1b4b;
}
.play-icon {
  width: 45px;
  height: 45px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #7c3aed;
}

/* Media Side */
.floating-image-wrapper {
  position: relative;
  padding: 20px;
}
.main-image-card {
  border-radius: 40px;
  overflow: hidden;
  transform: rotate(-2deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
.hero-img {
  width: 100%;
  height: 420px;
  object-fit: cover;
}

.floating-badge {
  position: absolute;
  background: white;
  padding: 10px 18px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
.badge-top {
  top: 20px;
  right: -10px;
  border-left: 4px solid #10b981;
}
.badge-bottom {
  bottom: 40px;
  left: -10px;
}
.extra-small {
  font-size: 0.7rem;
}

/* Features */
.features-section {
  margin-top: -60px;
  position: relative;
  z-index: 5;
}
.feature-glass-card {
  background: white;
  padding: 30px;
  border-radius: 24px;
  height: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: 0.3s;
}
.feature-glass-card.featured {
  background: #3b1e54;
  color: white;
  transform: translateY(-10px);
}
.icon-box {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 20px;
}
.icon-box.purple {
  background: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
}
.icon-box.white {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* Responsive */
@media (max-width: 991px) {
  .hero-section {
    text-align: center;
    padding-bottom: 50px;
  }
  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .action-buttons {
    justify-content: center;
  }
  .features-section {
    margin-top: 40px;
  }
  .feature-glass-card.featured {
    transform: none;
  }
  .hero-img {
    height: 320px;
  }
}

@media (max-width: 576px) {
  .stats-grid {
    flex-direction: column;
    width: 100%;
  }
}
</style>

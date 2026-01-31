<template>
  <section id="hero" class="hero section">
    <div class="blob-bg">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>

    <div class="hero-wrapper">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 hero-content">
            <div class="badge-new">✨ កម្មវិធីសិក្សាថ្មីសម្រាប់ឆ្នាំ ២០២៦</div>
            <h1 class="gradient-text">
              ចូលរួមជំរុញភាពឯកទេស<br />តាមរយៈការអប់រំ
            </h1>
            <p class="hero-description">
              បណ្ដុះបណ្ដាលជំនាញឌីជីថល និងវិជ្ជាជីវៈជាមួយអ្នកជំនាញពិតប្រាកដ។
              យើងផ្តល់ជូននូវបរិយាកាសសិក្សាទំនើប ដើម្បីជោគជ័យរបស់អ្នក។
            </p>

            <div class="stats-grid">
              <div class="stat-glass-card">
                <span class="stat-number">96%</span>
                <span class="stat-label">អត្រាការងារ</span>
              </div>
              <div class="stat-glass-card">
                <span class="stat-number">12:1</span>
                <span class="stat-label">សិស្ស-គ្រូ</span>
              </div>
              <div class="stat-glass-card">
                <span class="stat-number">50+</span>
                <span class="stat-label">វគ្គសិក្សា</span>
              </div>
            </div>

            <div class="action-buttons">
              <a href="#" class="btn-main-action">
                <span>ចាប់ផ្តើមឥឡូវនេះ</span>
                <i class="bi bi-arrow-right-short"></i>
              </a>
              <a href="#" class="btn-video-action">
                <div class="play-icon"><i class="bi bi-play-fill"></i></div>
                <span>ស្វែងយល់បន្ថែម</span>
              </a>
            </div>
          </div>

          <div class="col-lg-6 hero-media-container">
            <div class="floating-image-wrapper">
              <div class="main-image-card">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                  alt="Students"
                  class="hero-img"
                />
              </div>
              <div class="floating-badge badge-top">
                <i class="bi bi-award-fill"></i>
                <div>
                  <strong>Accredited</strong>
                  <span>International Standard</span>
                </div>
              </div>
              <div class="floating-badge badge-bottom">
                <div class="avatars">
                  <img src="https://i.pravatar.cc/40?u=1" alt="u" />
                  <img src="https://i.pravatar.cc/40?u=2" alt="u" />
                  <span>+2k Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container features-section">
      <div class="row gy-4">
        <div class="col-lg-4">
          <div class="feature-glass-card">
            <div class="icon-box purple"><i class="bi bi-lightbulb"></i></div>
            <h3>ប្រព័ន្ធសិក្សាឆ្លាតវៃ</h3>
            <p>សិក្សាតាមបែបទំនើប ងាយយល់ និងអនុវត្តផ្ទាល់ជាមួយគម្រោងពិតៗ។</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="feature-glass-card featured">
            <div class="icon-box white"><i class="bi bi-cpu"></i></div>
            <h3>បច្ចេកវិទ្យាចុងក្រោយ</h3>
            <p>បន្ទប់ពិសោធន៍បំពាក់ដោយឧបករណ៍ទំនើបៗ និងកម្មវិធីកម្រិតពិភពលោក។</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="feature-glass-card">
            <div class="icon-box purple">
              <i class="bi bi-shield-check"></i>
            </div>
            <h3>សញ្ញាបត្រទទួលស្គាល់</h3>
            <p>
              ទទួលបានវិញ្ញាបនបត្រដែលផ្តល់តម្លៃខ្ពស់ក្នុងទីផ្សារការងារជាតិ
              និងអន្តរជាតិ។
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Koh+Santepheap:wght@400;700&family=Noto+Sans+Khmer:wght@300;400;500;600;700&display=swap");

:root {
  --primary: #7c3aed;
  --primary-light: #a78bfa;
  --dark: #1e1b4b;
  --text-soft: #475569;
  --glass: rgba(255, 255, 255, 0.7);
}

.app-container {
  font-family: "Noto Sans Khmer", sans-serif;
  background-color: #f8fafc;
  overflow-x: hidden;
}

/* Background Blobs */
.blob-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  top: 0;
}

.blob {
  position: absolute;
  filter: blur(80px);
  opacity: 0.4;
  border-radius: 50%;
  z-index: -1;
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
  bottom: 20%;
  left: -50px;
}

/* Hero Typography */
.badge-new {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(124, 58, 237, 0.1);
  color: var(--primary);
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.gradient-text {
  font-family: "Koh Santepheap", sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1e1b4b 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}

.hero-description {
  font-size: 1.15rem;
  color: var(--text-soft);
  max-width: 500px;
  margin: 25px 0;
}

/* Stats Glass Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 40px;
}

.stat-glass-card {
  background: var(--glass);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 15px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03);
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-soft);
}

/* Buttons */
.btn-main-action {
  background: var(--primary);
  color: white;
  padding: 16px 35px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  transition: 0.3s;
  box-shadow: 0 10px 25px rgba(124, 58, 237, 0.3);
}

.btn-main-action:hover {
  transform: translateY(-3px);
  background: #6d28d9;
}

.btn-video-action {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-left: 20px;
  color: var(--dark);
  font-weight: 600;
}

.play-icon {
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  color: var(--primary);
}

/* Hero Media Section */
.hero-media-container {
  position: relative;
}

.floating-image-wrapper {
  position: relative;
  padding: 20px;
  animation: float 6s ease-in-out infinite;
}

.main-image-card {
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
  transform: rotate(-2deg);
}

.hero-img {
  width: 100%;
  height: 480px;
  object-fit: cover;
}

.floating-badge {
  position: absolute;
  background: white;
  padding: 12px 20px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.badge-top {
  top: 40px;
  right: -20px;
  border-left: 4px solid #f59e0b;
}

.badge-bottom {
  bottom: 40px;
  left: -20px;
}

.avatars {
  display: flex;
  align-items: center;
}

.avatars img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
  margin-right: -10px;
}

/* Features Section */
.features-section {
  margin-top: -50px;
  position: relative;
  z-index: 10;
}

.feature-glass-card {
  background: white;
  padding: 40px;
  border-radius: 30px;
  height: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: 0.4s;
}

.feature-glass-card.featured {
  background: var(--primary);
  color: white;
  transform: translateY(-20px);
}

.icon-box {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 25px;
}

.icon-box.purple {
  background: rgba(124, 58, 237, 0.1);
  color: var(--primary);
}
.icon-box.white {
  background: rgba(255, 255, 255, 0.2);
  color: white;
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

/* Responsive */
@media (max-width: 991px) {
  .gradient-text {
    font-size: 2.5rem;
  }
  .features-section {
    margin-top: 50px;
  }
  .feature-glass-card.featured {
    transform: none;
  }
  .btn-video-action {
    margin-top: 20px;
    display: flex;
  }
}
</style>

<template>
  <section class="how-it-works py-5">
    <div class="bg-pattern"></div>
    <div class="bg-blob-1"></div>
    <div class="bg-blob-2"></div>

    <div class="container py-5 position-relative">
      <div class="text-center mb-5" data-aos="fade-up">
        <div class="badge-mini mb-3">ដំណើរការយ៉ាងងាយស្រួល</div>
        <h3 class="khmer-font-title fw-bold display-6 mb-3">
          របៀបប្រើប្រាស់ងាយៗ
        </h3>
        <p class="text-muted khmer-font mx-auto" style="max-width: 600px">
          ត្រឹមតែ ៣ ជំហានងាយៗ លោកអ្នកនឹងអាចស្វែងរករបស់ដែលបាត់បង់មកវិញ
          ឬជួយអ្នកដទៃឱ្យរកឃើញរបស់ពួកគេ។
        </p>
      </div>

      <div class="row g-4 position-relative z-1">
        <div class="step-connector d-none d-lg-block"></div>

        <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div class="modern-step-card text-center">
            <div class="step-icon-wrapper mb-4">
              <div class="step-number shadow-lg">១</div>
              <div class="step-bg-icon shadow-sm">
                <i class="bi bi-megaphone"></i>
              </div>
            </div>
            <h5 class="khmer-font-title fw-bold mb-3">បង្ហោះព័ត៌មាន</h5>
            <p class="khmer-font text-muted px-lg-3">
              ថតរូប និងបញ្ជាក់ទីតាំង
              រួមជាមួយព័ត៌មានលម្អិតនៃសម្ភារៈដែលអ្នកបានបាត់ ឬរើសបាន។
            </p>
          </div>
        </div>

        <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div class="modern-step-card text-center featured-step">
            <div class="step-icon-wrapper mb-4">
              <div class="step-number shadow-lg">២</div>
              <div class="step-bg-icon shadow-sm">
                <i class="bi bi-search"></i>
              </div>
            </div>
            <h5 class="khmer-font-title fw-bold mb-3">ស្វែងរក ឬរង់ចាំ</h5>
            <p class="khmer-font text-muted px-lg-3">
              ប្រព័ន្ធវៃឆ្លាតរបស់យើងនឹងផ្គូផ្គងទិន្នន័យ
              និងជូនដំណឹងដល់អ្នកភ្លាមៗនៅពេលមានតម្រុយ។
            </p>
          </div>
        </div>

        <div class="col-md-4" data-aos="fade-up" data-aos-delay="300">
          <div class="modern-step-card text-center">
            <div class="step-icon-wrapper mb-4">
              <div class="step-number shadow-lg">៣</div>
              <div class="step-bg-icon shadow-sm">
                <i class="bi bi-hand-thumbs-up"></i>
              </div>
            </div>
            <h5 class="khmer-font-title fw-bold mb-3">ទទួលរបស់វិញ</h5>
            <p class="khmer-font text-muted px-lg-3">
              ទំនាក់ទំនងគ្នាដោយសុវត្ថិភាពតាមរយៈប្រព័ន្ធ Chat ដើម្បីផ្ទៀងផ្ទាត់
              និងប្រគល់របស់វិញ។
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Koh+Santepheap:wght@700&family=Noto+Sans+Khmer:wght@400;500;600&display=swap");

.how-it-works {
  font-family: "Noto Sans Khmer", sans-serif;
  position: relative;
  background-color: #f8faff; /* Light background base */
  overflow: hidden;
}

/* --- BACKGROUND DECORATION --- */
.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(#3a115e 0.5px, transparent 0.5px);
  background-size: 30px 30px;
  opacity: 0.05;
}

.bg-blob-1 {
  position: absolute;
  top: -10%;
  right: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(59, 30, 84, 0.08) 0%,
    transparent 70%
  );
  border-radius: 50%;
}

.bg-blob-2 {
  position: absolute;
  bottom: -10%;
  left: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(124, 58, 237, 0.08) 0%,
    transparent 70%
  );
  border-radius: 50%;
}

/* --- CARDS & UI --- */
.badge-mini {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(59, 30, 84, 0.1);
  color: #3b1e54;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.modern-step-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  padding: 40px 25px;
  border-radius: 30px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 2;
}

.modern-step-card:hover {
  transform: translateY(-15px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 25px 50px rgba(59, 30, 84, 0.1);
  border-color: #3b1e54;
}

.featured-step {
  border: 1px solid rgba(59, 30, 84, 0.2);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(248, 244, 255, 1) 100%
  );
}

.step-icon-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.step-number {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 38px;
  height: 38px;
  background: #3b1e54;
  color: #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  z-index: 3;
}

.step-bg-icon {
  width: 90px;
  height: 90px;
  background: #ffffff;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  color: #3b1e54;
  transition: 0.4s;
}

.modern-step-card:hover .step-bg-icon {
  background: #3b1e54;
  color: white;
  transform: scale(1.1) rotate(5deg);
}

.step-connector {
  position: absolute;
  top: 100px;
  left: 15%;
  right: 15%;
  height: 2px;
  border-top: 2px dashed rgba(59, 30, 84, 0.2);
  z-index: 0;
}

.khmer-font-title {
  font-family: "Koh Santepheap", cursive;
  color: #1a1a1a;
}

.khmer-font {
  font-family: "Noto Sans Khmer", sans-serif;
  color: #64748b;
}

@media (max-width: 991px) {
  .modern-step-card {
    margin-bottom: 20px;
  }
}
</style>

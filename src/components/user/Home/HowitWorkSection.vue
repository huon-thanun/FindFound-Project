<template>
  <section class="how-it-works py-5 bg-white">
    <div class="container py-5">
      <div class="text-center mb-5" data-aos="fade-up">
        <h3 class="khmer-font-title fw-bold display-6 mb-3">
          របៀបប្រើប្រាស់ងាយៗ
        </h3>
        <p class="text-muted khmer-font mx-auto" style="max-width: 600px">
          ត្រឹមតែ ៣ ជំហានងាយៗ លោកអ្នកនឹងអាចស្វែងរករបស់ដែលបាត់បង់មកវិញ
          ឬជួយអ្នកដទៃឱ្យរកឃើញរបស់ពួកគេ។
        </p>
      </div>

      <div class="row g-4 position-relative">
        <div class="step-connector d-none d-lg-block"></div>

        <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div class="step-card text-center">
            <div class="step-icon-wrapper mb-4">
              <div class="step-number">១</div>
              <div class="step-bg-icon"><i class="bi bi-megaphone"></i></div>
            </div>
            <h5 class="khmer-font-title fw-bold mb-3">បង្ហោះព័ត៌មាន</h5>
            <p class="khmer-font text-muted px-lg-3">
              ថតរូប និងបញ្ជាក់ទីតាំង
              រួមជាមួយព័ត៌មានលម្អិតនៃសម្ភារៈដែលអ្នកបានបាត់ ឬរើសបាន។
            </p>
          </div>
        </div>

        <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div class="step-card text-center">
            <div class="step-icon-wrapper mb-4">
              <div class="step-number">២</div>
              <div class="step-bg-icon"><i class="bi bi-search"></i></div>
            </div>
            <h5 class="khmer-font-title fw-bold mb-3">ស្វែងរក ឬរង់ចាំ</h5>
            <p class="khmer-font text-muted px-lg-3">
              ប្រព័ន្ធវៃឆ្លាតរបស់យើងនឹងផ្គូផ្គងទិន្នន័យ
              និងជូនដំណឹងដល់អ្នកភ្លាមៗនៅពេលមានតម្រុយ។
            </p>
          </div>
        </div>

        <div class="col-md-4" data-aos="fade-up" data-aos-delay="300">
          <div class="step-card text-center">
            <div class="step-icon-wrapper mb-4">
              <div class="step-number">៣</div>
              <div class="step-bg-icon">
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
}

.khmer-font-title {
  font-family: "Koh Santepheap", cursive;
}

.khmer-font {
  font-family: "Noto Sans Khmer", sans-serif;
  font-size: 0.95rem;
  line-height: 1.7;
}

/* Step Icon & Number Styles */
.step-icon-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-number {
  width: 45px;
  height: 45px;
  background: #3b1e54;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  z-index: 2;
  box-shadow: 0 4px 10px rgba(59, 30, 84, 0.3);
  border: 4px solid #fff;
}

.step-bg-icon {
  position: absolute;
  width: 80px;
  height: 80px;
  background: #f8f4ff;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #3b1e54;
  opacity: 0.5;
  transform: rotate(-10deg);
  transition: 0.3s ease;
}

.step-card:hover .step-bg-icon {
  transform: rotate(0deg) scale(1.1);
  background: #3b1e54;
  color: #ffffff;
  opacity: 1;
}

/* Connector Line */
.step-connector {
  position: absolute;
  top: 50px;
  left: 15%;
  right: 15%;
  height: 2px;
  border-top: 2px dashed #e2e8f0;
  z-index: 0;
}

/* Step Card Hover */
.step-card {
  padding: 20px;
  transition: 0.3s;
}

.step-card:hover h5 {
  color: #3b1e54;
}

@media (max-width: 991px) {
  .step-icon-wrapper {
    margin-bottom: 20px;
  }
}
</style>

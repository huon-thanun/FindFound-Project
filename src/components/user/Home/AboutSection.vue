<template>
  <section class="about-section py-5">
    <div class="container my-5">
      <div class="text-center mb-5" data-aos="fade-up">
        <span
          class="badge bg-soft-primary text-primary px-3 py-2 rounded-pill mb-3 khmer-font"
        >
          អំពីបេសកកម្មរបស់យើង
        </span>
        <h2 class="fw-bold display-5 mb-3 khmer-font-title">
          ជួយអ្នកឱ្យរកឃើញ <span class="text-gradient">អ្វីដែលបានបាត់បង់</span>
        </h2>
        <p class="text-muted mx-auto khmer-font" style="max-width: 700px">
          យើងបង្កើតវេទិកានេះឡើង ដើម្បីជាស្ពានចម្លងរវាងអ្នកដែលបានបាត់បង់សម្ភារៈ
          និងអ្នកដែលបានរើសបាន។
          គោលបំណងធំរបស់យើងគឺការកសាងសហគមន៍មួយដែលពោរពេញដោយភាពស្មោះត្រង់
          និងការជួយគ្នាទៅវិញទៅមក។
        </p>
      </div>

      <div class="row align-items-center g-5 mb-5">
        <div class="col-lg-6" data-aos="fade-right">
          <div class="image-wrapper shadow-lg rounded-4 overflow-hidden">
            <img
              src="https://i.pinimg.com/1200x/c0/76/f5/c076f5e99914587b7b33d4c81dd463cb.jpg"
              class="img-fluid"
              alt="Community Helping"
            />
          </div>
        </div>
        <div class="col-lg-6" data-aos="fade-left">
          <div class="ps-lg-4">
            <div class="icon-box bg-primary text-white mb-4">
              <i class="fas fa-hands-helping fa-lg"></i>
            </div>
            <h3 class="fw-bold mb-3 khmer-font-title">ស្ពាននៃភាពស្មោះត្រង់</h3>
            <p class="text-muted mb-4 khmer-font">
              រាល់ការបង្ហោះរបស់លោកអ្នក
              នឹងត្រូវបានផ្សព្វផ្សាយទៅកាន់សហគមន៍របស់យើងភ្លាមៗ។
              យើងជួយសម្រួលដល់ការផ្ទៀងផ្ទាត់ព័ត៌មាន
              ដើម្បីប្រាកដថាសម្ភារៈត្រូវបានប្រគល់ទៅកាន់ម្ចាស់ពិតប្រាកដវិញ។
            </p>
            <ul class="list-unstyled custom-list khmer-font">
              <li>
                <i class="fas fa-check-circle text-success me-2"></i>
                ការបង្ហោះព័ត៌មានបាត់ ឬរើសបានដោយឥតគិតថ្លៃ
              </li>
              <li>
                <i class="fas fa-check-circle text-success me-2"></i>
                ប្រព័ន្ធទំនាក់ទំនងរវាងម្ចាស់ និងអ្នករើសបានដោយសុវត្ថិភាព
              </li>
              <li>
                <i class="fas fa-check-circle text-success me-2"></i>
                ការការពារឯកជនភាព និងព័ត៌មានផ្ទាល់ខ្លួន
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row align-items-center g-5 flex-lg-row-reverse">
        <div class="col-lg-6" data-aos="fade-left">
          <div class="image-wrapper shadow-lg rounded-4 overflow-hidden">
            <img
              src="https://i.pinimg.com/1200x/09/bc/c1/09bcc1e78bdcbead19d7a409bede246d.jpg"
              class="img-fluid"
              alt="Technology Tracking"
            />
          </div>
        </div>
        <div class="col-lg-6" data-aos="fade-right">
          <div class="pe-lg-4">
            <div class="icon-box bg-purple text-white mb-4">
              <i class="fas fa-search-location fa-lg"></i>
            </div>
            <h3 class="fw-bold mb-3 khmer-font-title">
              បច្ចេកវិទ្យាជួយដល់ការស្វែងរក
            </h3>
            <p class="text-muted mb-4 khmer-font">
              ជាមួយប្រព័ន្ធ Search និង Filter ដ៏ឆ្លាតវៃ
              លោកអ្នកអាចស្វែងរកសម្ភារៈតាមប្រភេទ ទីតាំង
              និងពេលវេលាបានយ៉ាងងាយស្រួល។ យើងប្រើប្រាស់បច្ចេកវិទ្យាទំនើបបំផុត
              ដើម្បីឱ្យវេទិកានេះដើរបានលឿន និងមានប្រសិទ្ធភាព។
            </p>
            <div class="d-flex gap-3 flex-wrap">
              <span class="tech-tag">ស្វែងរករហ័ស</span>
              <span class="tech-tag">សុវត្ថិភាពខ្ពស់</span>
              <span class="tech-tag">ងាយស្រួលប្រើ</span>
              <span class="tech-tag">សហគមន៍ពិត</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");
@import url("https://fonts.googleapis.com/css2?family=Koh+Santepheap:wght@700&family=Noto+Sans+Khmer:wght@400;500;600&display=swap");

.about-section {
  background-color: #ffffff;
}

.khmer-font {
  font-family: "Noto Sans Khmer", sans-serif;
  line-height: 1.8;
}

.khmer-font-title {
  font-family: "Koh Santepheap", cursive;
  line-height: 1.4;
}

.text-gradient {
  background: linear-gradient(135deg, #3b1e54 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bg-soft-primary {
  background-color: rgba(59, 30, 84, 0.1);
}

.bg-purple {
  background: #3b1e54;
}

.icon-box {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-primary {
  background-color: #3b1e54 !important;
}

.image-wrapper img {
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.image-wrapper:hover img {
  transform: scale(1.08);
}

.tech-tag {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: "Noto Sans Khmer", sans-serif;
  color: #3b1e54;
}

.custom-list li {
  margin-bottom: 12px;
  font-weight: 500;
  color: #495057;
}
</style>

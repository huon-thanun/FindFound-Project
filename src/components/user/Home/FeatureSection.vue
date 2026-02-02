<template>
  <section class="features-section py-5">
    <div class="container py-4">
      <div class="row g-4 text-center mb-5">
        <div
          class="col-md-4"
          v-for="stat in stats"
          :key="stat.label"
          data-aos="zoom-in"
        >
          <div class="stat-card">
            <div class="stat-content">
              <h2 class="stat-value">{{ stat.value }}</h2>
              <p class="stat-label">{{ stat.label }}</p>
            </div>
            <div class="stat-line"></div>
          </div>
        </div>
      </div>

      <div class="text-center mb-5">
        <h3 class="khmer-font-title fw-bold">ហេតុអ្វីជ្រើសរើសវេទិការបស់យើង?</h3>
        <div class="divider mx-auto"></div>
      </div>

      <div class="row g-4">
        <div
          class="col-lg-4"
          v-for="feature in features"
          :key="feature.title"
          data-aos="fade-up"
        >
          <div class="feature-card h-100">
            <div class="feature-icon-wrapper" :class="feature.bgClass">
              <i :class="feature.icon"></i>
            </div>
            <h5 class="feature-title khmer-font-title">{{ feature.title }}</h5>
            <p class="feature-desc khmer-font">{{ feature.desc }}</p>
            <div class="card-arrow">
              <i class="bi bi-arrow-right-short"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: "5K+", label: "របស់ដែលបានរកឃើញ" },
  { value: "12K+", label: "សមាជិកជួយគ្នា" },
  { value: "25+", label: "ខេត្ត-ក្រុងទូទាំងប្រទេស" },
];

const features = [
  {
    title: "ការផ្ទៀងផ្ទាត់ច្បាស់លាស់",
    desc: "យើងធានាថាព័ត៌មានដែលបានបង្ហោះត្រូវបានត្រួតពិនិត្យ ដើម្បីជៀសវាងការបោកប្រាស់ផ្សេងៗ។",
    icon: "bi bi-patch-check-fill",
    bgClass: "icon-purple",
  },
  {
    title: "ស្វែងរករហ័សទាន់ចិត្ត",
    desc: "ប្រើប្រាស់បច្ចេកវិទ្យា Filter វៃឆ្លាត ជួយឱ្យអ្នករកឃើញរបស់ដែលបាត់តាមប្រភេទ និងទីតាំង។",
    icon: "bi bi-search-heart-fill",
    bgClass: "icon-gold",
  },
  {
    title: "សហគមន៍ជួយគ្នា",
    desc: "មិនត្រឹមតែជាគេហទំព័រ ប៉ុន្តែជាសហគមន៍ដែលបងប្អូនខ្មែរជួយគ្នាដោយទឹកចិត្តសប្បុរស។",
    icon: "bi bi-people-fill",
    bgClass: "icon-blue",
  },
];
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Koh+Santepheap:wght@700&family=Kantumruy+Pro:wght@300;400;600&display=swap");

.features-section {
  background: linear-gradient(to bottom, #ffffff, #f8fafc);
  overflow: hidden;
}

.khmer-font {
  font-family: "Kantumruy Pro", sans-serif;
}
.khmer-font-title {
  font-family: "Koh Santepheap", sans-serif;
}

/* Stat Card Styles */
.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  transition: 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(59, 30, 84, 0.1);
}

.stat-value {
  font-family: "Koh Santepheap", sans-serif;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #3b1e54 0%, #d4af37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 5px;
}

.stat-label {
  color: #64748b;
  font-weight: 500;
  font-family: "Kantumruy Pro", sans-serif;
}

.stat-line {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 4px;
  background: #d4af37;
  border-radius: 10px 10px 0 0;
  transition: 0.3s;
}

.stat-card:hover .stat-line {
  width: 100%;
}

/* Feature Card Styles */
.feature-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 30px;
  border: 1px solid #f1f5f9;
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.feature-card:hover {
  transform: translateY(-12px);
  background: #3b1e54;
  border-color: #3b1e54;
}

.feature-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  transition: 0.4s;
}

.feature-card:hover .feature-icon-wrapper {
  background: white !important;
  color: #3b1e54 !important;
  transform: rotateY(360deg);
}

.icon-purple {
  background: #f3e8ff;
  color: #7c3aed;
}
.icon-gold {
  background: #fffbeb;
  color: #d4af37;
}
.icon-blue {
  background: #e0f2fe;
  color: #0284c7;
}

.feature-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  transition: 0.3s;
}

.feature-desc {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.7;
  transition: 0.3s;
}

.feature-card:hover .feature-title,
.feature-card:hover .feature-desc {
  color: white;
}

/* Decoration */
.divider {
  width: 60px;
  height: 4px;
  background: #d4af37;
  border-radius: 2px;
  margin-top: 15px;
}

.card-arrow {
  position: absolute;
  bottom: 20px;
  right: 25px;
  font-size: 1.5rem;
  color: #d4af37;
  opacity: 0;
  transition: 0.3s;
}

.feature-card:hover .card-arrow {
  opacity: 1;
  right: 20px;
}

@media (max-width: 768px) {
  .stat-value {
    font-size: 2rem;
  }
}
</style>

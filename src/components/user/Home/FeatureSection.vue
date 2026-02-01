<template>
  <section class="features-section py-5 bg-white">
    <div class="container">
      <div class="row g-4 text-center mb-5">
        <div class="col-md-4" v-for="stat in stats" :key="stat.label">
          <div class="stat-card p-4 rounded-4 shadow-sm">
            <h2 class="fw-bold text-primary mb-1">{{ stat.value }}</h2>
            <p class="text-muted mb-0">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <div class="row g-4 pt-4">
        <div class="col-lg-4" v-for="feature in features" :key="feature.title">
          <div class="feature-box p-4 rounded-4 h-100 border transition-hover">
            <div class="icon-circle mb-3" :class="feature.bgClass">
              <i :class="feature.icon"></i>
            </div>
            <h5 class="fw-bold mb-3">{{ feature.title }}</h5>
            <p class="text-muted small">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: "10K+", label: "អ្នកប្រើប្រាស់សកម្ម" },
  { value: "500+", label: "អត្ថបទប្រចាំថ្ងៃ" },
  { value: "100%", label: "សុវត្ថិភាពទិន្នន័យ" },
];

const features = [
  {
    title: "សុវត្ថិភាពខ្ពស់",
    desc: "ប្រើប្រាស់ប្រព័ន្ធ OTP និងការផ្ទៀងផ្ទាត់ពីរជាន់ ដើម្បីការពារគណនីរបស់អ្នក។",
    icon: "bi bi-shield-lock",
    bgClass: "bg-soft-purple",
  },
  {
    title: "ដំណើរការរហ័ស",
    desc: "គេហទំព័រត្រូវបានរចនាឡើងជាមួយ Vue 3 ដែលផ្តល់នូវបទពិសោធន៍រលូនបំផុត។",
    icon: "bi bi-lightning-charge",
    bgClass: "bg-soft-blue",
  },
  {
    title: "គាំទ្រ ២៤/៧",
    desc: "ក្រុមការងារបច្ចេកទេសរបស់យើង រង់ចាំជួយអ្នករៀងរាល់ម៉ោង។",
    icon: "bi bi-headset",
    bgClass: "bg-soft-green",
  },
];
</script>

<style scoped>
.stat-card {
  background: #fbfaff;
  border-bottom: 4px solid #3b1e54;
}

.icon-circle {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.bg-soft-purple {
  background: #f3e8ff;
  color: #7c3aed;
}
.bg-soft-blue {
  background: #e0f2fe;
  color: #0284c7;
}
.bg-soft-green {
  background: #dcfce7;
  color: #16a34a;
}

.transition-hover {
  transition: all 0.3s ease;
}

.transition-hover:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border-color: #3b1e54 !important;
}

h5,
p,
h2 {
  font-family: "Kantumruy Pro", sans-serif;
}
</style>

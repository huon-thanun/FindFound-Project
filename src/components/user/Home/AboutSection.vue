<template>
  <section class="about-premium py-5">
    <div class="glow-bg">
      <div class="glow glow-1"></div>
    </div>

    <div class="container py-5">
      <div class="text-center mb-5 pb-lg-4">
        <span class="text-overline mb-2">សហគមន៍ជួយគ្នា</span>
        <h2 class="display-5 fw-bold khmer-title text-purple-dark">
          អំពី <span class="text-highlight">បេសកកម្ម</span> របស់យើង
        </h2>
        <p class="khmer-body text-muted mx-auto mt-3" style="max-width: 650px">
          យើងជឿជាក់លើភាពស្មោះត្រង់។
          វេទិកានេះត្រូវបានបង្កើតឡើងដើម្បីនាំយកអ្វីៗដែលបានបាត់បង់
          ត្រឡប់ទៅកាន់ម្ចាស់ដើមវិញប្រកបដោយសុវត្ថិភាព។
        </p>
      </div>

      <div class="row align-items-center g-5 mb-5">
        <div class="col-lg-6">
          <div class="image-premium-wrapper">
            <img
              src="https://i.pinimg.com/1200x/c0/76/f5/c076f5e99914587b7b33d4c81dd463cb.jpg"
              class="img-main"
              alt="Community"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="ps-lg-5">
            <h3 class="khmer-title h2 mb-4 fw-bold">ស្ពាននៃភាពស្មោះត្រង់</h3>
            <p class="khmer-body text-secondary mb-4">
              រាល់ការបង្ហោះព័ត៌មានត្រូវបានគ្រប់គ្រងដោយប្រព័ន្ធវៃឆ្លាត
              ដើម្បីធានាថាព័ត៌មានពិតត្រូវបានទៅដល់ដៃសហគមន៍បានលឿនបំផុត។
              យើងជួយសម្រួលការផ្ទៀងផ្ទាត់ឱ្យមានតម្លាភាព។
            </p>

            <div class="feature-list">
              <div class="f-item">
                <div class="f-icon"><i class="bi bi-patch-check"></i></div>
                <span class="khmer-body-bold"
                  >សុវត្ថិភាព និងទំនុកចិត្តខ្ពស់</span
                >
              </div>
              <div class="f-item">
                <div class="f-icon"><i class="bi bi-lightning-charge"></i></div>
                <span class="khmer-body-bold">ការផ្សព្វផ្សាយរហ័សទាន់ចិត្ត</span>
              </div>
            </div>

            <button class="btn-premium-purple mt-4">
              <span>អានបន្ត</span>
              <i class="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="row g-4 mt-5">
        <div class="col-md-4" v-for="(val, i) in values" :key="i">
          <div class="card-clean-purple">
            <div class="card-icon-wrapper mb-4">
              <i :class="val.icon"></i>
            </div>
            <h5 class="khmer-title-small mb-3">{{ val.title }}</h5>
            <p class="khmer-body-sm text-muted mb-0">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const values = [
  {
    title: "គោលការណ៍ស្នូល",
    desc: "សុចរិតភាពគឺជាបេះដូងនៃសេវាកម្មរបស់យើង។",
    icon: "bi bi-award",
  },
  {
    title: "បច្ចេកវិទ្យា",
    desc: "ស្វែងរកបានរហ័សតាមរយៈប្រព័ន្ធតម្រងឆ្លាតវៃ។",
    icon: "bi bi-cpu",
  },
  {
    title: "សហគមន៍",
    desc: "ការចូលរួមពីអ្នក គឺជាកម្លាំងចិត្តរបស់យើង។",
    icon: "bi bi-people",
  },
];
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Koh+Santepheap:wght@400;700&family=Noto+Sans+Khmer:wght@200;300;400;600&display=swap");

.about-premium {
  background-color: #f9f8ff; /* Clean light purple tint */
  position: relative;
  overflow: hidden;
}

/* --- TYPOGRAPHY SYSTEM --- */
.khmer-title {
  font-family: "Koh Santepheap", cursive;
  line-height: 1.4;
  letter-spacing: -0.02em;
}

.khmer-title-small {
  font-family: "Koh Santepheap", cursive;
  font-weight: 700;
  color: #3b1e54;
}

.khmer-body {
  font-family: "Noto Sans Khmer", sans-serif;
  font-weight: 300; /* Ultra light for clean look */
  font-size: 1.05rem;
  line-height: 1.9;
}

.khmer-body-bold {
  font-family: "Noto Sans Khmer", sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: #3b1e54;
}

.khmer-body-sm {
  font-family: "Noto Sans Khmer", sans-serif;
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 1.7;
}

.text-overline {
  font-family: "Noto Sans Khmer", sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #7c3aed;
  display: block;
}

/* --- VISUAL ELEMENTS --- */
.text-purple-dark {
  color: #2a1b3d;
}
.text-highlight {
  color: #7c3aed;
  font-weight: 700;
}

.image-premium-wrapper {
  background: white;
  padding: 12px;
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(124, 58, 237, 0.08);
}

.img-main {
  width: 100%;
  border-radius: 20px;
  object-fit: cover;
}

.card-clean-purple {
  background: white;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid rgba(124, 58, 237, 0.05);
  transition: all 0.4s ease;
  height: 100%;
}

.card-clean-purple:hover {
  background: #7c3aed;
  transform: translateY(-10px);
}

.card-clean-purple:hover .khmer-title-small,
.card-clean-purple:hover .khmer-body-sm {
  color: white !important;
}

.card-icon-wrapper {
  width: 50px;
  height: 50px;
  background: #f3f0ff;
  color: #7c3aed;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 1.5rem;
}

.btn-premium-purple {
  background: #3b1e54;
  color: white;
  border: none;
  padding: 14px 35px;
  border-radius: 12px;
  font-family: "Noto Sans Khmer", sans-serif;
  font-weight: 500;
  transition: 0.3s;
}

.btn-premium-purple:hover {
  background: #7c3aed;
  transform: scale(1.05);
}

.f-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.f-icon {
  color: #7c3aed;
  font-size: 1.2rem;
}

/* Background Glow */
.glow-1 {
  position: absolute;
  top: -10%;
  right: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(124, 58, 237, 0.1) 0%,
    transparent 70%
  );
  z-index: 0;
}
</style>

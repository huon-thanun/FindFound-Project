<template>
  <section class="about-premium py-5">
    <div class="glow-bg">
      <div class="glow glow-1"></div>
    </div>

    <div class="container py-5">
      <div class="text-center mb-5 pb-lg-4">
        <span class="badge-mini text-overline mb-2">ចូលរួមក្នុងសហគមន៍យើង</span>
        <h2 class="display-5 fw-bold khmer-title text-purple-dark">
          <span class="text-highlight">គោលបំណង</span> អំពីសហគមន៍របស់យើង
        </h2>
        <p class="khmer-body text-muted mx-auto mt-3" style="max-width: 650px">
          យើងផ្តល់ជូនលើសពីសេវាកម្មស្វែងរក។ វេទិកានេះគឺជាទីកន្លែងដែល ទំនុកចិត្ត
          និងសមានចិត្តត្រូវបានផ្សារភ្ជាប់ ដើម្បីនាំយករបស់ដែលបាត់បង់
          ត្រឡប់ទៅកាន់ម្ចាស់ដើមវិញដោយស្នាមញញឹម។
        </p>
      </div>

      <div class="row align-items-center g-5 mb-5">
        <div class="col-lg-6">
          <div class="image-premium-wrapper">
            <img
              src="../../../assets/images/home/home1.png"
              class="img-main object-fit-cover" height="400px"
              alt="Community Connection"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="ps-lg-5">
            <h3 class="khmer-title h2 mb-4 fw-bold">បណ្តាញនៃទំនុកចិត្ត</h3>
            <p class="khmer-body text-secondary mb-4">
              រាល់ការផ្ទៀងផ្ទាត់ព័ត៌មានត្រូវបានរៀបចំឡើងយ៉ាងហ្មត់ចត់បំផុត។
              យើងប្រើប្រាស់បច្ចេកវិទ្យាដើម្បីធ្វើជាជំនួយការដ៏ឆ្លាតវៃ
              ក្នុងការតភ្ជាប់ រវាងអ្នករើសបាន និងអ្នកបាត់បង់
              ឱ្យជួបគ្នាដោយភាពជឿជាក់ និងតម្លាភាព។
            </p>

            <div class="feature-list">
              <div class="f-item mb-3">
                <div class="f-icon"><i class="bi bi-patch-check"></i> ប្រព័ន្ធផ្ទៀងផ្ទាត់ច្បាស់លាស់</div>
              </div>
              <div class="f-item">
                <div class="f-icon"><i class="bi bi-lightning-charge"></i> ជូនដំណឹងរហ័សបំផុត</div>
              </div>
            </div>

            <router-link
              to="/about"
              class="btn-premium-purple mt-4 text-decoration-none d-inline-flex align-items-center"
            >
              <span>ស្វែងយល់បន្ថែម</span>
              <i class="bi bi-arrow-right ms-2"></i>
            </router-link>
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
@import url("https://fonts.googleapis.com/css2?family=Koh+Santepheap:wght@400;700&family=Noto+Sans+Khmer:wght@300;400;600&display=swap");

.about-premium {
  background-color: #ffffff; /* Clean white background */
  position: relative;
  padding: 80px 0;
}

/* --- TYPOGRAPHY --- */
.khmer-title {
  font-family: "Koh Santepheap", cursive;
  line-height: 1.3;
}

.khmer-body {
  font-family: "Noto Sans Khmer", sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #5f6368;
}

.text-highlight {
  color: #6366f1; /* Modern Indigo */
  position: relative;
  z-index: 1;
}

/* --- IMAGE WRAPPER --- */
.image-premium-wrapper {
  position: relative;
  border-radius: 40px;
}

.img-main {
  width: 100%;
  border-radius: 30px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  transition: transform 0.5s ease;
}

.image-premium-wrapper:hover .img-main {
  transform: scale(1.02);
}

/* --- CARDS --- */
.card-clean-purple {
  background: #ffffff;
  padding: 35px;
  border-radius: 24px;
  border: 1px solid #f0f0f0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}

.card-clean-purple:hover {
  border-color: var(--primary-color);
  background: var(--primary-color);
  box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.2);
  transform: translateY(-8px);
}

/* Change text color to white on hover */
.card-clean-purple:hover .khmer-title-small,
.card-clean-purple:hover .khmer-body-sm,
.card-clean-purple:hover .card-icon-wrapper {
  color: #ffffff !important;
}

.card-icon-wrapper {
  width: 56px;
  height: 56px;
  background: #f5f3ff;
  color: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.card-clean-purple:hover .card-icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
}

/* --- BUTTON --- */
.btn-premium-purple {
  background: var(--primary-color); /* Deep Navy */
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 16px;
  font-family: "Noto Sans Khmer", sans-serif;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: 0.3s all;
}

.btn-premium-purple:hover {
  background: var(--primary-color);
  opacity: 0.8;
  box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
  transform: translateX(5px);
}

/* --- DECORATIVE GLOW --- */
.glow-1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.05) 0%,
    transparent 70%
  );
  pointer-events: none;
}
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
</style>

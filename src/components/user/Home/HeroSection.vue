<template>
  <section id="hero" class="hero-section">
    <div class="container hero-container">
      <div class="row align-items-center gy-5">
        <!-- Left: Text content -->
        <div class="col-lg-6 hero-content">
          <h1 class="hero-title">
            បាត់របស់មែនទេ?<br />
            <span class="highlight">យើងជួយអ្នករកវិញ</span>
          </h1>

          <p class="hero-subtitle">
            ស្វែងរករបស់បាត់ ឬរើសបាន លឿន សុវត្ថិភាព និងឥតគិតថ្លៃ
            ជាមួយសហគមន៍ខ្មែរធំបំផុត។
          </p>

          <div class="action-group mt-4 mt-lg-5">
            <router-link to="/reports/own/create" class="btn btn-primary-pill">
              <span>+ ប្រកាសបាត់របស់</span>
            </router-link>

            <router-link to="/reports/user" class="btn btn-outline-pill">
              <span>មើលរបស់រើសបាន</span>
            </router-link>
          </div>
        </div>

        <!-- Right: Illustration -->
        <div class="col-lg-6 hero-illustration-col">
          <div class="illustration-wrapper">
            <img
              src="../../../assets/images/home/hero/hero-banner.png"
              alt="FindFound Community Illustration"
              class="illustration-img"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Koh+Santepheap:wght@700&family=Noto+Sans+Khmer:wght@400;500;700&display=swap");

.hero-section {
  position: relative;
  padding: 150px 0 150px;
  background: linear-gradient(
    135deg,
    #f5f0ff 0%,
    #efe8ff 35%,
    #e6d9ff 65%,
    #d9ccff 100%
  );
  overflow: hidden;
  font-family: "Noto Sans Khmer", sans-serif;
}

.hero-title {
  font-family: "Koh Santepheap", sans-serif;
  font-size: clamp(2.8rem, 7.5vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  color: #1e1b4b;
  margin-bottom: 1.25rem;
}

.highlight {
  background: linear-gradient(90deg, #7c3aed, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.7;
  color: #4b5563;
  max-width: 480px;
  margin-bottom: 2.5rem;
}

.action-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

/* New button styles matching your image */
.btn {
  padding: 14px 32px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.btn-primary-pill {
  background: #7c3aed;
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2);
}

.btn-primary-pill:hover {
  background: #6d28d9;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.3);
}

.btn-outline-pill {
  background: transparent;
  border: 2px solid #a855f7;
  color: #a855f7;
}

.btn-outline-pill:hover {
  background: rgba(168, 85, 247, 0.08);
  border-color: #7c3aed;
  color: #7c3aed;
  transform: translateY(-2px);
}

/* Illustration */
.illustration-wrapper {
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(124, 58, 237, 0.1);
  background: white;
  transition: transform 0.4s ease;
}

.illustration-wrapper:hover {
  transform: translateY(-6px);
}

.illustration-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

/* Responsive */
@media (max-width: 991px) {
  .hero-section {
    padding: 80px 0 100px;
    text-align: center;
  }

  .hero-title {
    font-size: clamp(2.4rem, 8vw, 4rem);
  }

  .hero-subtitle {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .action-group {
    justify-content: center;
  }

  .illustration-wrapper {
    margin: 3rem auto 1rem;
    max-width: 480px;
  }
}

@media (max-width: 576px) {
  .action-group {
    flex-direction: column;
    gap: 1rem;
  }

  .btn {
    width: 100%;
  }
}
</style>

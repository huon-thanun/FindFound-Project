<template>
  <div :class="{ 'mobile-nav-active': mobileNavActive }">
    <!-- Main Hero Section -->
    <main class="main">
      <section id="hero" class="hero section">
        <div class="hero-wrapper">
          <div class="container">
            <div class="row align-items-center">
              <!-- Hero Content -->
              <div
                class="col-lg-6 hero-content"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <h1>Inspiring Excellence Through Education</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas eget lacus id tortor facilisis tincidunt. Donec
                  gravida risus at sollicitudin luctus.
                </p>
                <div class="stats-row">
                  <div class="stat-item">
                    <span class="stat-number">96%</span>
                    <span class="stat-label">Employment Rate</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-number">12:1</span>
                    <span class="stat-label">Student-Teacher Ratio</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-number">50+</span>
                    <span class="stat-label">Programs</span>
                  </div>
                </div>
                <div class="action-buttons">
                  <a href="#" class="btn-primary">Start Your Journey</a>
                  <a href="#" class="btn-secondary">Virtual Tour</a>
                </div>
              </div>

              <!-- Hero Media -->
              <div
                class="col-lg-6 hero-media"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <!-- <img
                  src="assets/img/education/showcase-6.webp"
                  alt="Education"
                  class="img-fluid main-image"
                /> -->
                <div class="image-overlay">
                  <div class="badge-accredited">
                    <i class="bi bi-patch-check-fill"></i>
                    <span>Accredited Excellence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature Cards -->
        <div
          class="feature-cards-wrapper"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div class="container">
            <div class="row gy-4">
              <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="bi bi-book-fill"></i>
                  </div>
                  <div class="feature-content">
                    <h3>Innovative Curriculum</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Maecenas eget lacus id tortor facilisis.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                <div class="feature-card active">
                  <div class="feature-icon">
                    <i class="bi bi-laptop-fill"></i>
                  </div>
                  <div class="feature-content">
                    <h3>Modern Facilities</h3>
                    <p>
                      Donec gravida risus at sollicitudin luctus. Nullam feugiat
                      odio vitae justo pharetra.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4" data-aos="fade-up" data-aos-delay="300">
                <div class="feature-card">
                  <div class="feature-icon">
                    <i class="bi bi-people-fill"></i>
                  </div>
                  <div class="feature-content">
                    <h3>Expert Faculty</h3>
                    <p>
                      Vestibulum ante ipsum primis in faucibus orci luctus et
                      ultrices posuere cubilia curae.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Upcoming Event -->
        <div class="upcoming-event" data-aos="fade-up" data-aos-delay="400">
          <div class="container">
            <div class="event-content">
              <div class="event-date">
                <span class="day">15</span>
                <span class="month">NOV</span>
              </div>
              <div class="event-info">
                <h3>Spring Semester Open House</h3>
                <p>
                  Join us to explore campus facilities, meet our faculty, and
                  learn about scholarship opportunities.
                </p>
              </div>
              <div class="event-action">
                <a href="#" class="btn-event">RSVP Now</a>
                <span class="countdown">Starts in 3 weeks</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const mobileNavActive = ref(false);

function toggleMobileNav() {
  mobileNavActive.value = !mobileNavActive.value;
}
</script>

<style>
/* Paste your entire CSS here (the one you shared) */

/* ===============================
   GLOBAL
================================ */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #f8fafc;
  color: #1e293b;
  font-family: "Inter", "Segoe UI", sans-serif;
}

h1,
h2,
h3 {
  font-family: "Poppins", sans-serif;
}

a {
  text-decoration: none;
}

/* ===============================
   HERO SECTION
================================ */
.hero {
  position: relative;
  background: linear-gradient(120deg, #0f172a, #1e3a8a);
  color: white;
  overflow: hidden;
  padding-bottom: 140px;
}

.hero-wrapper {
  padding: 120px 0 60px;
}

/* ===============================
   HERO CONTENT
================================ */
.hero-content h1 {
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.2;
}

.hero-content p {
  margin: 20px 0 30px;
  font-size: 1.1rem;
  color: #cbd5f5;
}

/* ===============================
   STATS
================================ */
.stats-row {
  display: flex;
  gap: 30px;
  margin-bottom: 35px;
}

.stat-item {
  background: rgba(255, 255, 255, 0.08);
  padding: 15px 25px;
  border-radius: 16px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.stat-number {
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  color: #38bdf8;
}

.stat-label {
  font-size: 0.85rem;
  color: #cbd5f5;
}

/* ===============================
   BUTTONS
================================ */
.action-buttons {
  display: flex;
  gap: 15px;
}

.btn-primary {
  background: linear-gradient(135deg, #38bdf8, #2563eb);
  padding: 14px 30px;
  border-radius: 999px;
  color: white;
  font-weight: 600;
  transition: 0.3s;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(56, 189, 248, 0.5);
}

.btn-secondary {
  padding: 14px 30px;
  border-radius: 999px;
  border: 2px solid #38bdf8;
  color: #38bdf8;
  font-weight: 600;
}

.btn-secondary:hover {
  background: #38bdf8;
  color: #0f172a;
}

/* ===============================
   HERO IMAGE
================================ */
.hero-media {
  position: relative;
}

.hero-media::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f")
    center/cover;
  border-radius: 30px;
  filter: brightness(0.85);
}

.image-overlay {
  position: relative;
  height: 420px;
  border-radius: 30px;
  overflow: hidden;
}

/* ===============================
   BADGE
================================ */
.badge-accredited {
  position: absolute;
  bottom: 25px;
  right: 25px;
  background: white;
  color: #2563eb;
  padding: 10px 20px;
  border-radius: 999px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

/* ===============================
   FEATURE CARDS
================================ */
.feature-cards-wrapper {
  margin-top: 100px;
}

.feature-card {
  background: white;
  border-radius: 24px;
  padding: 35px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  transition: 0.3s;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-8px);
}

.feature-card.active {
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  color: white;
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: rgba(37, 99, 235, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-size: 28px;
  color: #2563eb;
  margin-bottom: 20px;
}

.feature-card.active .feature-icon {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* ===============================
   UPCOMING EVENT
================================ */
.upcoming-event {
  margin-top: 80px;
}

.event-content {
  background: white;
  border-radius: 24px;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 30px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.event-date {
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  color: white;
  width: 90px;
  height: 90px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
}

.event-date .day {
  font-size: 2rem;
}

.event-action {
  margin-left: auto;
  text-align: right;
}

.btn-event {
  display: inline-block;
  background: #2563eb;
  color: white;
  padding: 12px 25px;
  border-radius: 999px;
  margin-bottom: 8px;
}

.countdown {
  display: block;
  font-size: 0.85rem;
  color: #64748b;
}

/* Paste all the rest of your CSS from above */
</style>

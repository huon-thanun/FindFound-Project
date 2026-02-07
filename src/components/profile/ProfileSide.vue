<template>
  <aside class="profile-side-premium">
    <!-- About Me -->
    <div class="side-card mb-4" data-aos="fade-left">
      <div class="card-accent-top"></div>

      <div class="p-4">
        <h6 class="khmer-font-title fw-bold text-dark-indigo mb-2">
          <i class="bi bi-person-badge me-2 text-purple-accent"></i>អំពីខ្ញុំ
        </h6>

        <p class="khmer-body text-muted small-line-height mb-3">
          {{ user?.bio || "មិនទាន់មានការពិពណ៌នាអំពីខ្លួនឯងនៅឡើយទេ។" }}
        </p>

        <div class="trust-badge">
          <i class="bi bi-shield-check"></i>
          គណនីបានបញ្ជាក់អត្តសញ្ញាណ
        </div>

        <hr class="soft-divider" />

        <!-- Stats -->
        <div class="d-flex justify-content-between text-center mt-3">
          <div class="stat-mini">
            <span>{{ user?.lost_count || 0 }}</span>
            <small>បាត់របស់</small>
          </div>

          <div class="v-line"></div>

          <div class="stat-mini">
            <span>{{ user?.found_count || 0 }}</span>
            <small>រើសបាន</small>
          </div>

          <div class="v-line"></div>

          <div class="stat-mini">
            <span>{{ user?.trust || "100%" }}</span>
            <small>ជឿទុកចិត្ត</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Skills -->
    <div class="side-card" data-aos="fade-left" data-aos-delay="100">
      <div class="p-4">
        <h6 class="khmer-font-title fw-bold text-dark-indigo mb-3">
          <i class="bi bi-stars me-2 text-purple-accent"></i>ជំនាញ &
          ចំណាប់អារម្មណ៍
        </h6>

        <div v-if="skills?.length" class="skills-flex">
          <span v-for="skill in skills" :key="skill" class="skill-tag">
            {{ skill }}
          </span>
        </div>

        <p v-else class="text-muted small">មិនទាន់មានជំនាញ…</p>
      </div>
    </div>

    <!-- Social -->
    <div
      class="side-card mt-4 p-4 text-center border-dashed"
      data-aos="fade-left"
      data-aos-delay="200"
    >
      <p class="khmer-body text-muted small mb-3">ភ្ជាប់ទំនាក់ទំនង</p>

      <div class="social-grid">
        <a href="#" class="social-icon-btn facebook"
          ><i class="bi bi-facebook"></i
        ></a>
        <a href="#" class="social-icon-btn telegram"
          ><i class="bi bi-telegram"></i
        ></a>
        <a href="#" class="social-icon-btn linkedin"
          ><i class="bi bi-linkedin"></i
        ></a>
      </div>
    </div>
  </aside>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Koh+Santepheap:wght@700&family=Kantumruy+Pro:wght@400;600&display=swap");

.text-dark-indigo {
  color: #1e1b4b;
}
.text-purple-accent {
  color: #7c3aed;
}

.side-card {
  background: white;
  border-radius: 24px;
  border: 1px solid #f1f1f5;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
}

.side-card:hover {
  transform: translateY(-5px);
}

.card-accent-top {
  height: 4px;
  background: linear-gradient(90deg, #7c3aed, #3b1e54);
  width: 100%;
}

.khmer-font-title {
  font-family: "Koh Santepheap", sans-serif;
}
.khmer-body {
  font-family: "Kantumruy Pro", sans-serif;
  font-size: 0.9rem;
}

.small-line-height {
  line-height: 1.6;
}

.soft-divider {
  border: 0;
  border-top: 1px solid #f1f1f5;
  margin: 20px 0;
}

/* Stat Section */
.stat-mini span {
  font-size: 1.1rem;
}
.stat-mini small {
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 600;
}
.v-line {
  width: 1px;
  background: #f1f1f5;
  height: 30px;
  align-self: center;
}

/* Skills Tags */
.skills-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: #f1edff;
  color: #7c3aed;
  padding: 5px 14px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: 0.3s;
}

.skill-tag:hover {
  background: #7c3aed;
  color: white;
}

/* Social Buttons */
.social-icon-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8faff;
  color: #3b1e54;
  border-radius: 12px;
  text-decoration: none;
  transition: 0.3s;
  border: 1px solid #f1f1f5;
}

.social-icon-btn:hover {
  background: #3b1e54;
  color: white;
  transform: rotate(8deg);
}

.border-dashed {
  border: 2px dashed #f1f1f5;
  background: transparent;
  box-shadow: none;
}
.trust-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #ecfdf5;
  color: #059669;
  font-size: 0.75rem;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.trust-badge i {
  font-size: 0.9rem;
}

/* Make stats nicer */
.stat-mini span {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e1b4b;
}

/* Social grid */
.social-grid {
  display: flex;
  justify-content: center;
  gap: 14px;
}

.social-icon-btn {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Brand hover colors */
.social-icon-btn.facebook:hover {
  background: #1877f2;
}
.social-icon-btn.telegram:hover {
  background: #229ed9;
}
.social-icon-btn.linkedin:hover {
  background: #0a66c2;
}
</style>

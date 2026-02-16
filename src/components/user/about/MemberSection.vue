<template>
  <div class="about-page">
    <!-- TEAM / MEMBERS - Updated modern cards -->
    <section class="member py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold">សមាជិក</h2>
          <div class="title-underline"></div>
        </div>

        <div class="row g-4 justify-content-center">
          <div v-for="(m, i) in team" :key="i" class="col-6 col-md-4">
            <div
              class="member-card modern"
              :class="{ leader: m.isLeader }"
              data-aos="fade-up"
              :data-aos-delay="i * 80"
            >
              <div class="photo-wrapper">
                <img
                  :src="m.avatar"
                  class="member-photo"
                  alt=""
                  loading="lazy"
                />
                <div class="social-overlay">
                  <div class="social-icons">
                    <a href="#"><i class="bi bi-github"></i></a>
                    <a href="#"><i class="bi bi-telegram"></i></a>
                  </div>
                </div>
              </div>

              <div class="member-info">
                <h6 class="member-name">{{ m.name }}</h6>
                <p class="member-role">{{ m.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import sambathImg from "@/assets/images/members/sambath.JPG";
import leakhenaImg from "@/assets/images/members/leakhena.JPG";
import visalImg from "@/assets/images/members/visal.JPG";
import lorchhorImg from "@/assets/images/members/lochhor.JPG";
import menghourImg from "@/assets/images/members/menghour.JPG";
import thanunImg from "@/assets/images/members/thanun.JPG";

const team = [
  {
    name: "ហេង ល័ងឈ័រ",
    role: "ប្រធានក្រុម",
    avatar: lorchhorImg,
    isLeader: true,
  },
  {
    name: "អុី វិសាល",
    role: "សមាជិក",
    avatar: visalImg,
  },
  {
    name: "ហួន ថានុន",
    role: "សមាជិក",
    avatar: thanunImg,
  },
  {
    name: "អាន ម៉េងហួ",
    role: "សមាជិក",
    avatar: menghourImg,
  },
  {
    name: "អន សម្បត្តិ",
    role: "សមាជិក",
    avatar: sambathImg,
  },
  {
    name: "ប៊ូ លក្ខិណា",
    role: "សមាជិក",
    avatar: leakhenaImg,
  },
];
</script>

<style scoped>
.member-card.modern {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(99, 102, 241, 0.08);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.05);
}

.member-card.modern:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 50px rgba(139, 92, 246, 0.18); /* purple shadow on hover */
  border-color: #a78bfa; /* purple border */
}

.member-card.modern.leader {
  border-color: #a78bfa;
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.15);
}

.member-card.modern.leader:hover {
  box-shadow: 0 24px 60px rgba(139, 92, 246, 0.28);
  transform: translateY(-14px);
}

.photo-wrapper {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #f8f9fa;
}

.member-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 0.5s ease,
    filter 0.5s ease;
}

.member-card:hover .member-photo {
  transform: scale(1.1);
  filter: brightness(1.05);
}

.social-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 60%,
    rgba(30, 30, 46, 0.85)
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 0;
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
  transform: translateY(25px);
}

.member-card:hover .social-overlay {
  opacity: 1;
  transform: translateY(0);
}

.social-icons {
  margin-bottom: 18px;
  display: flex;
  gap: 28px;
}

.social-icons a {
  color: white;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.social-icons a:hover {
  transform: scale(1.4) rotate(10deg);
  color: #a78bfa; /* purple on icon hover */
}

.member-info {
  padding: 20px 16px 24px;
  text-align: center;
}

.member-name {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 6px;
  color: #111827;
  transition: color 0.35s ease;
}

.member-card:hover .member-name {
  color: #7c3aed; /* main purple on name hover */
}

.member-role {
  font-size: 0.92rem;
  color: #6d28d9; /* purple role text */
  font-weight: 500;
}

/* Spacing adjustment for 3-column layout */
@media (min-width: 768px) {
  .member-card.modern {
    margin-bottom: 2rem;
  }
}
</style>

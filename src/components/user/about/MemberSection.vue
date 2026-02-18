<!-- src/components/user/about/MemberSection.vue -->
<template>
  <section class="team-section py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="fw-bold section-title">សមាជិកក្រុម</h2>
        <div class="title-underline mx-auto"></div>
        <p class="text-muted mt-3">
          ក្រុមការងារដែលខិតខំបង្កើត FindFound ដើម្បីជួយសហគមន៍ខ្មែរ
        </p>
      </div>

      <div class="row g-4 justify-content-center">
        <div
          v-for="(member, index) in team"
          :key="index"
          class="col-6 col-md-6 col-lg-4"
        >
          <div
            class="member-card"
            :class="{ 'leader-card': member.isLeader }"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="photo-wrapper">
              <img
                :src="member.avatar"
                :alt="member.name"
                class="member-photo"
                loading="lazy"
              />
              <div class="social-overlay">
                <div class="social-icons">
                  <a href="#" aria-label="GitHub">
                    <i class="bi bi-github"></i>
                  </a>
                  <a href="#" aria-label="Telegram">
                    <i class="bi bi-telegram"></i>
                  </a>
                </div>
              </div>
            </div>

            <div class="member-info">
              <h5 class="member-name">{{ member.name }}</h5>
              <p class="member-role">{{ member.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import sambathImg from "@/assets/images/members/sambath.JPG";
import leakhenaImg from "@/assets/images/members/leakhena.PNG";
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
.team-section {
  background: linear-gradient(135deg, #f9f7ff 0%, #f0eaff 100%);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e1b4b;
}

.title-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #7c3aed, #a855f7);
  margin: 12px auto 0;
  border-radius: 2px;
}

.member-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(168, 85, 247, 0.1);
  transition: all 0.28s ease-out;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  will-change: transform, box-shadow;
}

.member-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(124, 58, 237, 0.15);
  border-color: rgba(168, 85, 247, 0.3);
}

.leader-card {
  border-color: #a855f7;
  box-shadow: 0 10px 32px rgba(168, 85, 247, 0.12);
}

.leader-card:hover {
  box-shadow: 0 24px 60px rgba(168, 85, 247, 0.22);
  transform: translateY(-12px);
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
  transition: transform 0.35s ease-out;
}

.member-card:hover .member-photo {
  transform: scale(1.08);
}

.social-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 60%,
    rgba(30, 30, 46, 0.8)
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 0;
  transition:
    opacity 0.3s ease-out,
    transform 0.3s ease-out;
  transform: translateY(20px);
}

.member-card:hover .social-overlay {
  opacity: 1;
  transform: translateY(0);
}

.social-icons {
  margin-bottom: 16px;
  display: flex;
  gap: 24px;
}

.social-icons a {
  color: white;
  font-size: 1.5rem;
  transition:
    transform 0.25s ease,
    color 0.25s ease;
}

.social-icons a:hover {
  transform: scale(1.3);
  color: #a78bfa;
}

.member-info {
  padding: 20px 16px 24px;
  text-align: center;
}

.member-name {
  font-size: 1.18rem;
  font-weight: 700;
  margin-bottom: 6px;
  color: #111827;
  transition: color 0.25s ease;
}

.member-card:hover .member-name {
  color: #7c3aed;
}

.member-role {
  font-size: 0.95rem;
  color: #6d28d9;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 992px) {
  .member-card {
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 2rem;
  }
}
</style>

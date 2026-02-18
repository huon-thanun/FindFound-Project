<template>
  <div class="member-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header text-center mb-5" data-aos="fade-up">
        <div class="section-badge">
          <span class="badge-dot"></span>
          ក្រុមការងាររបស់យើង
        </div>
        <h2 class="section-title mt-3">
          ស្គាល់ <span class="gradient-text">ក្រុម</span>ជំនាញ
        </h2>
        <p class="section-subtitle">
          ក្រុមអ្នកបង្កើតដ៏មានចិត្តស្រស់ ដែលបានធ្វើការជាមួយគ្នា ដើម្បីបង្កើត
          FindFound
        </p>
      </div>

      <!-- Member Cards Grid -->
      <div class="members-grid">
        <div
          v-for="(member, i) in members"
          :key="i"
          class="member-card-wrapper"
          data-aos="fade-up"
          :data-aos-delay="i * 80"
        >
          <div
            class="member-card"
            :class="
              member.isMe
                ? 'card-accent-me'
                : i === members.length - 1
                  ? 'card-accent-1'
                  : `card-accent-${(i % 4) + 1}`
            "
          >
            <!-- Glow background blob -->
            <div class="card-glow"></div>

            <!-- Top strip -->
            <div class="card-strip"></div>

            <!-- Avatar -->
            <div class="avatar-ring">
              <div class="avatar-inner">
                <img :src="member.avatar" :alt="member.name" />
              </div>
              <div class="avatar-status"></div>
            </div>

            <!-- Info -->
            <div class="card-body-content">
              <h5 class="member-name">{{ member.name }}</h5>
              <span class="member-role-badge">{{ member.role }}</span>
              <p class="member-bio">{{ member.bio }}</p>

              <!-- Skills chips -->
              <div class="skill-chips">
                <span
                  v-for="(skill, si) in member.skills"
                  :key="si"
                  class="skill-chip"
                  >{{ skill }}</span
                >
              </div>
            </div>

            <!-- Social links -->
            <div class="card-footer-social">
              <!-- GitHub -->
              <a
                v-if="member.github"
                :href="member.github"
                target="_blank"
                class="social-btn github"
                title="GitHub"
              >
                <i class="bi bi-github"></i>
              </a>

              <!-- Telegram -->
              <a
                v-if="member.telegram"
                :href="member.telegram"
                target="_blank"
                class="social-btn telegram"
                title="Telegram"
              >
                <i class="bi bi-telegram"></i>
              </a>

              <!-- Instagram -->
              <a
                v-if="member.instagram"
                :href="member.instagram"
                target="_blank"
                class="social-btn instagram"
                title="Instagram"
              >
                <i class="bi bi-instagram"></i>
              </a>

              <!-- Email -->
              <a
                v-if="member.email"
                :href="`mailto:${member.email}`"
                class="social-btn email"
                title="Email"
              >
                <i class="bi bi-envelope-fill"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import sambathImg from "@/assets/images/members/sambath.JPG";
import leakhenaImg from "@/assets/images/members/leakhena.PNG";
import visalImg from "@/assets/images/members/visal.JPG";
import lorchhorImg from "@/assets/images/members/lochhor.JPG";
import menghourImg from "@/assets/images/members/menghour.JPG";
import thanunImg from "@/assets/images/members/thanun.JPG";

const members = [
  {
    name: "ហេង ល័ងឈ័រ",
    role: "ប្រធានក្រុម • UI/UX Planner",
    avatar: lorchhorImg,
    bio: "ដឹកនាំគម្រោង និងរៀបចំការរចនា UI/UX ដើម្បីធានាថា FindFound មានបទពិសោធន៍ប្រើប្រាស់ល្អ និងទាន់សម័យ។",
    skills: ["Figma", "UI/UX Strategy", "Project Planning"],
    github: "https://github.com/username",
    telegram: "https://t.me/username",
    instagram: "https://instagram.com/username",
  },
  {
    name: "អន សម្បត្តិ",
    role: "Frontend Developer",
    avatar: sambathImg,
    bio: "អភិវឌ្ឍន៍ផ្នែក frontend និងរចនាបទពិសោធន៍ UI/UX ដើម្បីធ្វើឲ្យប្រព័ន្ធមានភាពងាយស្រួលប្រើប្រាស់។",
    skills: ["JavaScript", "Vue", "UI/UX"],
    github: "https://github.com/username",
    telegram: "https://t.me/username",
    instagram: "https://instagram.com/username",
  },
  {
    name: "អុី វិសាល",
    role: "Frontend Developer",
    avatar: visalImg,
    bio: "សហការអភិវឌ្ឍន៍មុខងារ frontend និងបង្កើត UI/UX ដែលមានភាពទាក់ទាញ និងទាន់សម័យ។",
    skills: ["JavaScript", "Vue", "UI/UX"],
    github: "https://github.com/username",
    telegram: "https://t.me/username",
    instagram: "https://instagram.com/username",
  },
  {
    name: "ហួន ថានុន",
    role: "Frontend Developer",
    avatar: thanunImg,
    bio: "ចូលរួមសរសេរកូដ និងរៀបចំការរចនា UI ដើម្បីធានាបទពិសោធន៍ប្រើប្រាស់ល្អ។",
    skills: ["JavaScript", "Vue", "UI/UX"],
    github: "https://github.com/username",
    telegram: "https://t.me/username",
    instagram: "https://instagram.com/username",
  },
  {
    name: "ប៊ូ លក្ខិណា",
    role: "Frontend Developer",
    avatar: leakhenaImg,
    bio: "អភិវឌ្ឍន៍ frontend និងរចនាបទពិសោធន៍ UI/UX ដើម្បីធ្វើឲ្យ FindFound មានភាពស្រស់ស្អាត និងប្រើប្រាស់ងាយស្រួល។",
    skills: ["JavaScript", "Vue", "UI/UX"],
    isMe: true,
    github: "https://github.com/Leakhena-bou",
    telegram: "https://t.me/@Bou_leakhena",
    instagram: "https://instagram.com/leakhenna__",
  },
  {
    name: "អាន ម៉េងហួ",
    role: "Frontend Developer",
    avatar: menghourImg,
    bio: "សហការអភិវឌ្ឍន៍ frontend និងចូលរួមរៀបចំ UI/UX ដើម្បីធ្វើឲ្យប្រព័ន្ធមានប្រសិទ្ធភាពខ្ពស់។",
    skills: ["JavaScript", "Vue", "UI/UX"],
    github: "https://github.com/username",
    telegram: "https://t.me/username",
    instagram: "https://instagram.com/username",
  },
];
</script>

<style scoped>
/* ── Section wrapper ── */
.member-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #f8f2ff 0%, #f0e8ff 50%, #e8deff 100%);
  position: relative;
  overflow: hidden;
}

.member-section::before {
  content: "";
  position: absolute;
  top: -200px;
  right: -200px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

/* ── Section header ── */
.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(124, 58, 237, 0.25);
  padding: 0.5rem 1.4rem;
  border-radius: 50rem;
  font-weight: 600;
  color: #6d28d9;
  font-size: 0.95rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #7c3aed;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.6;
  }
}

.section-title {
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 800;
  color: #1f2937;
}

.gradient-text {
  background: linear-gradient(90deg, #7c3aed, #a78bfa, #c4b5fd);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.section-subtitle {
 color: #4b5563;
  font-size: 1.05rem;
  max-width: 540px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ── Grid ── */
.members-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Card wrapper (for 3D tilt feel) ── */
.member-card-wrapper {
  perspective: 1000px;
}

/* ── Card ── */
.member-card {
  position: relative;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow:
    0 4px 24px rgba(99, 102, 241, 0.08),
    0 1px 4px rgba(0, 0, 0, 0.04);
  padding: 0 0 24px;
  overflow: hidden;
  transition:
    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.35s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.member-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow:
    0 20px 50px rgba(99, 102, 241, 0.18),
    0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Glow blob */
.card-glow {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
  filter: blur(50px);
}

.member-card:hover .card-glow {
  opacity: 1;
}

/* Accent colors per card */
.card-accent-1 .card-strip {
  background: linear-gradient(90deg, #7c3aed, #a78bfa);
}
.card-accent-1 .card-glow {
  background: rgba(124, 58, 237, 0.3);
}
.card-accent-1 .member-role-badge {
  background: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
  border-color: rgba(124, 58, 237, 0.2);
}
.card-accent-1 .avatar-ring {
  border-color: #7c3aed;
  box-shadow: 0 0 0 6px rgba(124, 58, 237, 0.1);
}

.card-accent-2 .card-strip {
  background: linear-gradient(90deg, #ec4899, #f472b6);
}

.card-accent-2 .card-glow {
  background: rgba(236, 72, 153, 0.3);
}

.card-accent-2 .member-role-badge {
  background: rgba(236, 72, 153, 0.1);
  color: #ec4899;
  border-color: rgba(236, 72, 153, 0.2);
}

.card-accent-2 .avatar-ring {
  border-color: #ec4899;
  box-shadow: 0 0 0 6px rgba(236, 72, 153, 0.1);
}

.card-accent-3 .card-strip {
  background: linear-gradient(90deg, #7c3aed, #a78bfa);
}
.card-accent-3 .card-glow {
  background: rgba(124, 58, 237, 0.3);
}
.card-accent-3 .member-role-badge {
  background: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
  border-color: rgba(124, 58, 237, 0.2);
}
.card-accent-3 .avatar-ring {
  border-color: #7c3aed;
  box-shadow: 0 0 0 6px rgba(124, 58, 237, 0.1);
}

.card-accent-4 .card-strip {
  background: linear-gradient(90deg, #7c3aed, #a78bfa);
}
.card-accent-4 .card-glow {
  background: rgba(124, 58, 237, 0.3);
}
.card-accent-4 .member-role-badge {
  background: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
  border-color: rgba(124, 58, 237, 0.2);
}
.card-accent-4 .avatar-ring {
  border-color: #7c3aed;
  box-shadow: 0 0 0 6px rgba(124, 58, 237, 0.1);
}

.card-accent-me .card-strip {
  background: linear-gradient(90deg, #ec4899, #f472b6);
}

.card-accent-me .card-glow {
  background: rgba(236, 72, 153, 0.3);
}

.card-accent-me .member-role-badge {
  background: rgba(236, 72, 153, 0.1);
  color: #ec4899;
  border-color: rgba(236, 72, 153, 0.2);
}

.card-accent-me .avatar-ring {
  border-color: #ec4899;
  box-shadow: 0 0 0 6px rgba(236, 72, 153, 0.1);
}
.card-accent-4 .card-strip {
  background: linear-gradient(90deg, #7c3aed, #a78bfa);
}
.card-accent-4 .card-glow {
  background: rgba(124, 58, 237, 0.3);
}
.card-accent-4 .member-role-badge {
  background: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
  border-color: rgba(124, 58, 237, 0.2);
}
.card-accent-4 .avatar-ring {
  border-color: #7c3aed;
  box-shadow: 0 0 0 6px rgba(124, 58, 237, 0.1);
}

/* Top strip */
.card-strip {
  width: 100%;
  height: 6px;
  border-radius: 24px 24px 0 0;
}

/* ── Avatar ── */
.avatar-ring {
  position: relative;
  width: 96px;
  height: 96px;
  border-radius: 50%;
 border-width: 2px;
  margin-top: 24px;
  margin-bottom: 16px;
  transition: box-shadow 0.3s ease;
  flex-shrink: 0;
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f4f6;
}

.avatar-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.member-card:hover {
  box-shadow:
    0 20px 50px rgba(99,102,241,0.18),
    0 0 0 1px rgba(124,58,237,0.15);
}

.member-card:hover .avatar-inner img {
  transform: scale(1.08);
}

.avatar-status {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #10b981;
  border: 2.5px solid #fff;
  animation: status-pulse 2.5s infinite;
}

@keyframes status-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5);
  }
  50% {
    box-shadow: 0 0 0 5px rgba(16, 185, 129, 0);
  }
}

/* ── Body ── */
.card-body-content {
  padding: 0 20px;
  flex: 1;
  width: 100%;
}

.member-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 6px;
}

.member-role-badge {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 3px 12px;
  border-radius: 50rem;
  border: 1px solid;
  letter-spacing: 0.03em;
  margin-bottom: 12px;
}

.member-bio {
  font-size: 0.88rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 14px;
}

/* ── Skill chips ── */
.skill-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-bottom: 4px;
}

.skill-chip {
  font-size: 0.72rem;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.07);
  color: #4f46e5;
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 50rem;
  padding: 3px 10px;
  transition: background 0.2s;
}

.skill-chip:hover {
  transform: translateY(-2px);
}


/* ── Social footer ── */
.card-footer-social {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 18px;
  padding-top: 16px;
  width: calc(100% - 40px);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

/* Base button */
.social-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background: white;
  border: 1px solid rgba(0,0,0,0.08);
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

}

/* Brand colors (always visible) */
.social-btn.github {
  color: #24292e;
}

.social-btn.telegram {
  color: #229ED9;
}

.social-btn.instagram {
  color: #E1306C;
}

.social-btn.email {
  color: #7c3aed;
}

/* Hover effect = only zoom */
.social-btn:hover {
  transform: scale(1.18);
  box-shadow: 0 8px 18px rgba(0,0,0,0.15);
}



/* ── Responsive ── */
@media (max-width: 640px) {
  .members-grid {
    grid-template-columns: 1fr;
    max-width: 340px;
  }
}
</style>

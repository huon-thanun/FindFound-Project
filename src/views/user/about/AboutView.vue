<script setup>
// import Member from "@/components/about/member.vue";
import MemberSection from "@/components/about/MemberSection.vue";
import { ref, onMounted, onUnmounted } from "vue";

const leader = {
  name: "ហេង ល័ងឈ័រ",
  role: "ប្រធានក្រុម",
  desc: "ទទួលខុសត្រូវលើស្ថាបត្យកម្មប្រព័ន្ធ ការសម្របសម្រួលក្រុម និងការប្រគល់ផលិតផលចុងក្រោយ។",
  avatar: "https://i.pravatar.cc/300?img=12",
};

const members = [
  {
    name: "អុី វិសាល",
    role: "សមាជិក",
    avatar: "https://i.pravatar.cc/300?img=32",
  },
  {
    name: "ហួន ថានុន",
    role: "សមាជិក",
    avatar: "https://i.pravatar.cc/300?img=45",
  },
  {
    name: "អាន ម៉េងហួ",
    role: "សមាជិក",
    avatar: "https://i.pravatar.cc/300?img=56",
  },
  {
    name: "អន សម្បត្តិ",
    role: "សមាជិក",
    avatar: "https://i.pravatar.cc/300?img=67",
  },
  {
    name: "ប៊ូ លក្ខិណា",
    role: "សមាជិក",
    avatar: "https://i.pravatar.cc/300?img=68",
  },
];

const features = [
  {
    icon: "bi-geo",
    title: "គោលដៅ",
    desc: "បង្កើតវេទិកាដែលងាយស្រួលប្រើប្រាស់សម្រាប់ការស្វែងរកវត្ថុបាត់បង់។",
  },
  {
    icon: "bi-lock",
    title: "សុវត្ថិភាព",
    desc: "ការពារទិន្នន័យរបស់អ្នកប្រើប្រាស់ជាមួយប្រព័ន្ធសុវត្ថិភាពខ្ពស់។",
  },
  {
    icon: "bi-lightning-charge",
    title: "លឿន",
    desc: "ប្រព័ន្ធឆ្លើយតបរហ័ស និងអាចប្រើបានគ្រប់ពេលវេលា។",
  },
  {
    icon: "bi-person-raised-hand",
    title: "សហគមន៍",
    desc: "បង្កើតសហគមន៍ដែលជួយគ្នាទៅវិញទៅមក។",
  },
];

const stats = ref([
  { number: "0", target: 500, label: "អ្នកប្រើប្រាស់", suffix: "+" },
  { number: "0", target: 300, label: "វត្ថុបានរកឃើញ", suffix: "+" },
  { number: "0", target: 95, label: "អត្រាជោគជ័យ", suffix: "%" },
  { number: "0", target: 24, label: "សេវាកម្ម", suffix: "/7" },
]);

const activeTestimonial = ref(0);

const nextTestimonial = () => {
  activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.length;
};

const prevTestimonial = () => {
  activeTestimonial.value =
    (activeTestimonial.value - 1 + testimonials.length) % testimonials.length;
};

// Auto scroll
let intervalId;
onMounted(() => {
  intervalId = setInterval(() => {
    nextTestimonial();
  }, 3000); // change every 5 seconds
});

onUnmounted(() => {
  clearInterval(intervalId);
});

// Testimonials
const testimonials = [
  {
    name: "សុខ ចាន់ថា",
    role: "អ្នកប្រើប្រាស់",
    avatar: "https://i.pravatar.cc/150?img=1",
    text: "FindFound ជួយខ្ញុំរកកាបូបដែលបាត់បង់មកវិញបានយ៉ាងរហ័ស។ សេវាកម្មល្អណាស់!",
  },
  {
    name: "ពេជ្រ សុភា",
    role: "អ្នកប្រើប្រាស់",
    avatar: "https://i.pravatar.cc/150?img=5",
    text: "ប្រព័ន្ធងាយស្រួលប្រើប្រាស់ និងមានប្រសិទ្ធភាព។ សូមអរគុណក្រុមការងារ!",
  },
  {
    name: "វិចិត្រា មករា",
    role: "អ្នកប្រើប្រាស់",
    avatar: "https://i.pravatar.cc/150?img=9",
    text: "គេហទំព័រដ៏ល្អមួយសម្រាប់ការស្វែងរកវត្ថុបាត់បង់។ ខ្ញុំពេញចិត្តណាស់!",
  },
  {
    name: "លី សុវណ្ណ",
    role: "អ្នកប្រើប្រាស់",
    avatar: "https://i.pravatar.cc/150?img=12",
    text: "ខ្ញុំអាចប្រកាសវត្ថុបាត់បង់បានយ៉ាងងាយស្រួល ហើយទទួលបានការឆ្លើយតបលឿន។",
  },
  {
    name: "ចាន់ ដារ៉ា",
    role: "អ្នកប្រើប្រាស់",
    avatar: "https://i.pravatar.cc/150?img=15",
    text: "FindFound ជួយភ្ជាប់អ្នកបាត់វត្ថុ និងអ្នកឃើញវត្ថុបានល្អណាស់។",
  },
  {
    name: "មុំ ស្រីនាង",
    role: "អ្នកប្រើប្រាស់",
    avatar: "https://i.pravatar.cc/150?img=20",
    text: "UI ស្អាត ប្រើងាយ និងមានប្រយោជន៍ខ្លាំងសម្រាប់សង្គម។",
  },
  {
    name: "ហេង វិសាល",
    role: "អ្នកប្រើប្រាស់",
    avatar: "https://i.pravatar.cc/150?img=25",
    text: "សេវាកម្មនេះជួយសន្សំពេលវេលា និងកាត់បន្ថយការព្រួយបារម្ភបានច្រើន។",
  },
];

// Core values
const values = [
  {
    icon: "bi-lightbulb",
    title: "ភាពច្នៃប្រឌិត",
    desc: "យើងតែងតែស្វែងរកដំណោះស្រាយថ្មីៗ និងច្នៃប្រឌិត",
  },
  {
    icon: "bi-mortarboard",
    title: "ការរៀនសូត្រ",
    desc: "យើងជឿជាក់លើការរៀនសូត្រ និងការអភិវឌ្ឍន៍ជាបន្ត",
  },
  {
    icon: "bi-star",
    title: "គុណភាព",
    desc: "យើងប្តេជ្ញាផ្តល់សេវាកម្មដែលមានគុណភាពខ្ពស់",
  },
  {
    icon: "bi-heart",
    title: "ការយកចិត្តទុកដាក់",
    desc: "យើងយកចិត្តទុកដាក់ចំពោះអ្នកប្រើប្រាស់គ្រប់រូប",
  },
];

// Technologies used
const technologies = [
  {
    name: "Javascript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Vue.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  {
    name: "Bootstrap",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "Github",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
];

// Animated counter
const animateCounter = () => {
  stats.value.forEach((stat, index) => {
    let current = 0;
    const increment = stat.target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.target) {
        stat.number = stat.target;
        clearInterval(timer);
      } else {
        stat.number = Math.floor(current);
      }
    }, 30);
  });
};

onMounted(() => {
  animateCounter();
});
</script>

<template>
  <div class="about-page">
    <!-- Hero Banner -->
    <section class="hero-section">
      <div class="hero-bg"></div>

      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>

      <div class="container position-relative">
        <div class="row align-items-center pt-5 g-5 py-lg-6">
          <!-- Text Column -->
          <div
            class="col-lg-7 py-5 px-5 m-0 hero-text-col"
            data-aos="fade-right"
          >
            <div class="badge-modern mb-4">
              <i class="bi bi-people-fill me-2"></i>
              អំពីពួកយើង
            </div>
            <h1 class="hero-title">
              ស្វែងយល់អំពី <span class="gradient-text">ពួកយើង</span>
              <br class="d-none d-md-block" />
              និងបេសកកម្មរបស់យើង
            </h1>
            <p class="hero-subtitle">
              យើងជាក្រុមអ្នកអភិវឌ្ឍន៍វ័យក្មេងដែលចង់ប្រើបច្ចេកវិទ្យាដើម្បីជួយសហគមន៍
              និងធ្វើឱ្យការស្វែងរកវត្ថុបាត់បង់កាន់តែងាយស្រួល។
            </p>
          </div>

          <!-- Illustration Column -->
          <div
            class="col-lg-5 hero-illustration d-flex justify-content-center m-0 p-0"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <img
              src="../../../assets/images/about/hero-banner.png"
              alt="Contact Us Illustration"
              class="hero-img m-0 img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- MISSION -->
    <section class="section col-8 mx-auto">
      <div class="container">
        <div class="glass-card text-center mission-card" data-aos="fade-up">
          <div class="mission-icon"><i class="bi-compass"></i></div>
          <h2 class="section-title">បេសកកម្មរបស់យើង</h2>
          <p class="section-text">
            FindFound
            ជួយបុគ្គលម្នាក់ៗឱ្យរកវត្ថុបាត់បង់របស់ពួកគេមកវិញបានយ៉ាងមានប្រសិទ្ធភាព
            តាមរយៈប្រព័ន្ធកណ្តាល ឌីជីថល និងងាយស្រួលប្រើប្រាស់។
            យើងជឿជាក់ថាបច្ចេកវិទ្យាអាចបង្កើតសហគមន៍ដ៏រឹងមាំ
            ដែលមនុស្សជួយគ្នាទៅវិញទៅមក។
          </p>
        </div>
      </div>
    </section>

    <!-- CORE VALUES -->
    <section class="section bg-light">
      <div class="container">
        <h2 class="section-title text-center mb-5" data-aos="fade-up">
          គុណតម្លៃរបស់យើង
        </h2>
        <div class="row g-4">
          <div
            v-for="(value, i) in values"
            :key="i"
            class="col-12 col-sm-6 col-lg-3"
          >
            <div
              class="value-card glass-card"
              data-aos="fade-up"
              :data-aos-delay="i * 100"
            >
              <div class="value-icon"><i :class="value.icon"></i></div>
              <h4 class="value-title">{{ value.title }}</h4>
              <p class="value-desc">{{ value.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="section">
      <div class="container">
        <h2 class="section-title text-center mb-5" data-aos="fade-up">
          លក្ខណៈពិសេស
        </h2>
        <div class="row g-4">
          <div
            v-for="(feature, i) in features"
            :key="i"
            class="col-12 col-sm-6 col-lg-3"
          >
            <div
              class="feature-card glass-card"
              data-aos="flip-left"
              :data-aos-delay="i * 100"
            >
              <div class="feature-icon"><i :class="feature.icon"></i></div>
              <h4 class="feature-title">{{ feature.title }}</h4>
              <p class="feature-desc">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MEMBERS -->
    <section class="section">
      <MemberSection></MemberSection>
    </section>

    <!-- TESTIMONIALS -->
    <section class="section">
      <div class="container">
        <h2 class="section-title text-center mb-5" data-aos="fade-up">
          មតិពីអ្នកប្រើប្រាស់
        </h2>
        <div class="testimonial-container" data-aos="fade-up">
          <button
            @click="prevTestimonial"
            class="testimonial-nav testimonial-prev"
          >
            ‹
          </button>
          <div class="testimonial-card glass-card">
            <div class="testimonial-avatar">
              <img :src="testimonials[activeTestimonial].avatar" alt="avatar" />
            </div>
            <p class="testimonial-text">
              "{{ testimonials[activeTestimonial].text }}"
            </p>
            <h5 class="testimonial-name">
              {{ testimonials[activeTestimonial].name }}
            </h5>
            <p class="testimonial-role">
              {{ testimonials[activeTestimonial].role }}
            </p>
          </div>
          <button
            @click="nextTestimonial"
            class="testimonial-nav testimonial-next"
          >
            ›
          </button>
        </div>
        <div class="testimonial-dots">
          <span
            v-for="(t, i) in testimonials"
            :key="i"
            class="dot"
            :class="{ active: i === activeTestimonial }"
            @click="activeTestimonial = i"
          ></span>
        </div>
      </div>
    </section>

    <!-- TECHNOLOGIES -->
    <section class="section bg-light">
      <div class="container">
        <h2 class="section-title text-center mb-5" data-aos="fade-up">
          បច្ចេកវិទ្យាដែលយើងប្រើ
        </h2>
        <div class="tech-grid" data-aos="zoom-in">
          <div
            v-for="(tech, i) in technologies"
            :key="i"
            class="tech-item"
            :data-aos-delay="i * 50"
          >
            <img :src="tech.icon" :alt="tech.name" class="tech-icon" />
            <p class="tech-name">{{ tech.name }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- THANK YOU -->
    <section class="section">
      <div class="container">
        <div
          class="glass-card p-4 p-lg-5 text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h3 class="fw-bold mb-4">
            <span class="thank-icon">🙏</span>
            សេចក្ដីថ្លែងអំណរគុណ
          </h3>
          <p class="thank-content mb-5">
            ពួកយើង​ សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅដល់
            <span class="fw-bold highlight"
              >ក្រសួងប្រៃសណីយ៍ និងទូរគមនាគមន៍ មូលនិធិ ស.អ</span
            >
            និង
            <span class="fw-bold highlight"
              >ថ្នាក់បណ្ដុះបណ្ដាលបច្ចេកវិទ្យា ANT</span
            >
            ដែលបានផ្តល់អាហារូបករណ៍ និងឱកាសដ៏មានតម្លៃសម្រាប់ការសិក្សាផ្នែក Web
            Development ដល់ពួកយើង។ អរគុណចំពោះការគាំទ្រ
            និងការយកចិត្តទុកដាក់របស់ស្ថាប័នទាំងអស់ ដែលមិនត្រឹមតែផ្ដល់ចំណេះដឹង
            និងជំនាញបច្ចេកទេសសម្រាប់ក្រុមយើងទេ ប៉ុន្តែថែមទាំងជួយបង្កើនទំនុកចិត្ត
            និងសមត្ថភាពក្នុងការបង្កើតគេហទំព័រ
            ដើម្បីរួមចំណែកក្នុងការលើកវិស័យបច្ចេកវិទ្យា និងឌីជីថលនៅកម្ពុជាទៀតផង។
            យើងសូមសន្យាថា នឹងប្រើប្រាស់ចំណេះដឹង និងជំនាញដែលទទួលបាន
            ដើម្បីបន្តការបង្កើត និងអភិវឌ្ឍកម្មវិធី ឲ្យមានប្រយោជន៍ចំពោះសង្គម
            និងសហគមន៍ក្នុងស្រុក។
          </p>
          <div class="row g-4" data-aos="zoom-in-up" data-aos-duration="1000">
            <div
              class="col-12 col-md-4 d-flex align-items-center justify-content-center"
            >
              <div class="sponsor-box">
                <div class="sponsor-placeholder">
                  <img
                    class="object-fit-cover"
                    src="@/assets/images/logo/CBRD Fund.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div
              class="col-12 col-md-4 d-flex align-items-center justify-content-center"
            >
              <div class="sponsor-box">
                <div class="sponsor-placeholder">
                  <img
                    class="object-fit-cover"
                    src="@/assets/images/logo/MPTC.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div
              class="col-12 col-md-4 d-flex align-items-center justify-content-center"
            >
              <div class="sponsor-box">
                <div class="sponsor-placeholder">
                  <img
                    class="object-fit-cover"
                    src="@/assets/images/logo/ANT.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== PAGE ===== */
.about-page {
  background: linear-gradient(135deg, #f4f7ff, #eef1ff);
  min-height: 100vh;
}
/* ===== MODERN CONTACT US HERO ===== */

/* ── Hero ── (shorter height) ── */
@import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700;800&display=swap");

.main-contact {
  font-family: "Kantumruy Pro", system-ui, sans-serif;
  background: #fdfaff;
  color: #0f0f0f;
}

/* ── Hero ── */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #f8f2ff 0%, #f0e8ff 50%, #e8deff 100%);
  overflow: hidden;
  border-radius: 0 0 60px 60px;
  /* padding: 100px 0 180px; */
  margin: 0 0 20px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 30% 70%,
    rgba(168, 85, 247, 0.08) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.floating-shapes .shape {
  position: absolute;
  background: rgba(139, 92, 246, 0.04);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(139, 92, 246, 0.08);
  border-radius: 50%;
  animation: float-slow 80s infinite ease-in-out;
}

.shape-1 {
  width: 420px;
  height: 420px;
  top: -15%;
  left: -20%;
  animation-delay: 0s;
}

.shape-2 {
  width: 560px;
  height: 560px;
  bottom: -25%;
  right: -25%;
  animation-delay: 25s;
  border-radius: 48% 52% 55% 45%;
}

.shape-3 {
  width: 360px;
  height: 360px;
  top: 55%;
  left: -12%;
  animation-delay: 45s;
}

@keyframes float-slow {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  25% {
    transform: translate(60px, -80px) rotate(5deg);
  }

  50% {
    transform: translate(-70px, 90px) rotate(-6deg);
  }

  75% {
    transform: translate(80px, 60px) rotate(4deg);
  }
}

.hero-title {
  font-size: clamp(2.6rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 1.5rem;
}

.gradient-text {
  background: linear-gradient(90deg, #7c3aed, #a78bfa, #c4b5fd);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: clamp(1.15rem, 2.5vw, 1.35rem);
  color: #222;
  max-width: 580px;
  line-height: 1.7;
  opacity: 0.95;
}

.badge-modern {
  display: inline-flex;
  align-items: center;
  background: rgba(139, 92, 246, 0.14);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(139, 92, 246, 0.24);
  padding: 0.75rem 1.8rem;
  border-radius: 50rem;
  font-weight: 600;
  color: #111;
  font-size: 1.1rem;
}

.hero-img {
  max-width: 100%;
  margin-left: -10%;
  filter: drop-shadow(0 30px 70px rgba(0, 0, 0, 0.16)) brightness(1.03);
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hero-illustration:hover .hero-img {
  transform: scale(1.06) translateY(-15px);
}

/* ===== STATS ===== */
.stats-row {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 60px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  padding: 25px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  min-width: 140px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-item:hover {
  transform: translateY(-8px) scale(1.05);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 8px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.stat-label {
  font-size: 0.95rem;
  opacity: 0.95;
}

/* ===== SECTIONS ===== */
.section {
  padding: 80px 20px;
}

.bg-light {
  background: #f9fafb;
}

.bg-gradient {
  background: linear-gradient(135deg, var(--primary-color, #6366f1), #8b5cf6);
}

.section-title {
  font-weight: 700;
  font-size: 2.2rem;
  color: #1f2937;
}

.section-text {
  max-width: 800px;
  margin: 20px auto 0;
  color: #555;
  line-height: 1.8;
  font-size: 1.1rem;
}

/* ===== GLASS CARD ===== */
.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
}

/* ===== MISSION ===== */
.mission-card {
  padding: 50px 40px;
}

.mission-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  color: #6366f1;
}

/* ===== VALUES ===== */
.value-card {
  text-align: center;
  height: 100%;
  padding: 40px 30px;
}

.value-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  color: rgb(15, 185, 129);
}

.value-title {
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 15px;
  font-size: 1.4rem;
}

.value-desc {
  color: #6b7280;
  line-height: 1.7;
}

/* ===== FEATURES ===== */
.feature-card {
  text-align: center;
  height: 100%;
  padding: 35px 25px;
}

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: 20px;
  color: rgb(99, 102, 241);
}

.feature-title {
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.feature-desc {
  color: #6b7280;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* ===== LEADER ===== */
.leader-card {
  display: flex;
  gap: 35px;
  align-items: center;
  max-width: 900px;
  margin: auto;
  padding: 40px;
}

.leader-avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 6px solid var(--primary-color, #6366f1);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.3);
}

.leader-info h3 {
  font-size: 1.8rem;
  margin-bottom: 8px;
}
/* ===== MEMBERS ===== */
.member-card {
  text-align: center;
  height: 100%;
  padding: 35px 25px;
}

.member-card img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--primary-color, #6366f1);
  transition: all 0.3s ease;
}

.member-card:hover img {
  transform: scale(1.1);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
}

.role {
  font-size: 0.9rem;
  color: var(--primary-color, #6366f1);
  font-weight: 600;
  display: inline-block;
  background: rgba(99, 102, 241, 0.1);
  padding: 5px 15px;
  border-radius: 20px;
  margin-top: 8px;
}

/* ===== ACHIEVEMENTS ===== */
.achievement-card {
  text-align: center;
  padding: 35px 25px;
  height: 100%;
}

.achievement-icon {
  font-size: 3.5rem;
  margin-bottom: 15px;
}

.achievement-title {
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.achievement-desc {
  color: #6b7280;
  margin: 0;
  font-size: 0.9rem;
}

/* ===== TESTIMONIALS ===== */
.testimonial-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 20px;
}

.testimonial-card {
  text-align: center;
  padding: 50px 40px;
  flex: 1;
}

.testimonial-avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--primary-color, #6366f1);
}

.testimonial-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stars {
  font-size: 1.3rem;
  margin-bottom: 20px;
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 25px;
}

.testimonial-name {
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 5px;
}

.testimonial-role {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
}

.testimonial-nav {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-color, #6366f1);
  color: white;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.testimonial-nav:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
}

.testimonial-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #d1d5db;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: var(--primary-color, #6366f1);
  transform: scale(1.3);
}

/* ===== TECHNOLOGIES ===== */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.tech-item {
  text-align: center;
  padding: 25px;
  background: white;
  border-radius: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.tech-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.tech-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.1));
}

.tech-name {
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  font-size: 0.95rem;
}

/* ===== THANK YOU ===== */
.thank-icon {
  font-size: 3.5rem;
  display: block;
  margin-bottom: 10px;
}

.thank-content {
  line-height: 2;
  color: #374151;
  font-size: 1.05rem;
  max-width: 900px;
  margin: 0 auto 40px;
}

.highlight {
  color: var(--primary-color, #6366f1);
  background: linear-gradient(
    120deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(99, 102, 241, 0.2) 100%
  );
  padding: 2px 3px;
  border-radius: 4px;
}

.sponsor-box img {
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  width: 100%;
  max-width: 400px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sponsor-box img:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.12);
}

.sponsor-placeholder {
  color: #9ca3af;
  font-weight: 600;
  text-align: center;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 992px) {
  .timeline::before {
    left: 30px;
  }

  .timeline-item {
    width: 100%;
    padding-left: 80px;
    padding-right: 20px;
  }

  .timeline-item-right {
    left: 0;
  }

  .timeline-icon {
    left: 5px !important;
    right: auto !important;
  }
}

@media (max-width: 768px) {
  .leader-card {
    flex-direction: column;
    text-align: center;
    padding: 30px;
  }

  .stats-row {
    gap: 15px;
  }

  .stat-item {
    min-width: 110px;
    padding: 20px 15px;
  }

  .stat-number {
    font-size: 2.2rem;
  }

  .hero {
    padding: 100px 20px 60px;
  }

  .section {
    padding: 60px 20px;
  }

  .testimonial-nav {
    display: none;
  }

  .tech-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }

  .mission-card {
    padding: 35px 25px;
  }

  .value-icon,
  .feature-icon {
    font-size: 2.8rem;
  }

  .sponsor-box {
    max-width: 100%;
    height: 150px;
  }
}
</style>

<script setup>
const leader = {
  name: "Team Leader",
  role: "Project Lead",
  desc: "Responsible for system architecture, team coordination, and final delivery.",
  avatar: "https://i.pravatar.cc/300?img=12",
};

const members = [
  {
    name: "Member One",
    role: "Frontend Developer",
    avatar: "https://i.pravatar.cc/300?img=32",
  },
  {
    name: "Member Two",
    role: "Backend Developer",
    avatar: "https://i.pravatar.cc/300?img=45",
  },
  {
    name: "Member Three",
    role: "UI/UX Designer",
    avatar: "https://i.pravatar.cc/300?img=56",
  },
  {
    name: "Member Four",
    role: "Database Engineer",
    avatar: "https://i.pravatar.cc/300?img=67",
  },
  {
    name: "Member Five",
    role: "QA & Documentation",
    avatar: "https://i.pravatar.cc/300?img=68",
  },
];
</script>

<template>
  <div class="about-page">

    <!-- HERO -->
    <section class="hero">
      <div class="container text-center">
        <h1 class="hero-title">About <span>FindFound</span></h1>
        <p class="hero-subtitle">
          A smart Lost & Found platform that reconnects people with what they’ve lost.
        </p>
      </div>
    </section>

    <!-- MISSION -->
    <section class="section">
      <div class="container">
        <div class="glass-card text-center">
          <h2 class="section-title">Our Mission</h2>
          <p class="section-text">
            FindFound helps individuals recover lost items efficiently by using
            a centralized, digital, and user-friendly system.
          </p>
        </div>
      </div>
    </section>

    <!-- MEMBERS -->
    <section class="section section-about">
      <div class="container">
        <h2 class="section-title text-white text-center mb-5">Our Team</h2>

        <div class="leader-card glass-card mb-4">
          <img :src="leader.avatar" class="leader-avatar" />
          <div>
            <h3>{{ leader.name }}</h3>
            <span class="role">{{ leader.role }}</span>
            <p class="mt-3">{{ leader.desc }}</p>
          </div>
        </div>

        <div class="row justify-content-center g-4">
          <div v-for="(m, i) in members" :key="i" class="col-12 col-sm-6 col-lg-4">
            <div class="member-card glass-card">
              <img :src="m.avatar" />
              <h5 class="mt-3">{{ m.name }}</h5>
              <span class="role">{{ m.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- our thank-->
    <section class="py-5">
      <div class="container">
        <div class="card-surface p-4 p-lg-5 text-center" data-aos="fade-up" data-aos-duration="1000">
          <h3 class="fw-bold mb-3">សេចក្ដីថ្លែងអំណរគុណ</h3>
          <p class="thank-content mb-5">
            ពួកយើង​ សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅដល់
            <span class="fw-bold">ក្រសួងប្រៃសណីយ៍ និងទូរគមនាគមន៍ មូលនិធិ ស.អ</span>
            និង
            <span class="fw-bold">ថ្នាក់បណ្ដុះបណ្ដាលបច្ចេកវិទ្យា ANT</span>
            <br />
            ដែលបានផ្តល់អាហារូបករណ៍ និងឱកាសដ៏មានតម្លៃសម្រាប់ការសិក្សាផ្នែក Web
            Development ដល់ពួកយើង។<br />
            អរគុណចំពោះការគាំទ្រ និងការយកចិត្តទុកដាក់របស់ស្ថាប័នទាំងអស់
            ដែលមិនត្រឹមតែផ្ដល់ចំណេះដឹង និងជំនាញបច្ចេកទេសសម្រាប់ក្រុមយើងទេ
            <br />
            ប៉ុន្តែថែមទាំងជួយបង្កើនទំនុកចិត្ត និងសមត្ថភាពក្នុងការបង្កើតគេហទំព័រ ដើម្បីរួមចំណែកក្នុងការលើកវិស័យបច្ចេកវិទ្យា
            និងឌីជីថលនៅកម្ពុជាទៀតផង។<br />
            យើងសូមសន្យាថា នឹងប្រើប្រាស់ចំណេះដឹង និងជំនាញដែលទទួលបាន
            ដើម្បីបន្តការបង្កើត និងអភិវឌ្ឍកម្មវិធី ឲ្យមានប្រយោជន៍ចំពោះសង្គម
            និងសហគមន៍ក្នុងស្រុក។
          </p>
          <div class="row" data-aos="zoom-in-up" data-aos-duration="1000">
            <div class="col-12 col-md-4 align-content-center">
              <img class="img-fluid w-100 object-fit-contain" src="" alt="ក្រសួងប្រៃសណីយ៍" />
            </div>
            <div class="col-12 col-md-4 align-content-center">
              <img class="img-fluid w-75 object-fit-contain" src="" alt="CBRD Fund"
                style="transform: scale(0.7)" />
            </div>
            <div class="col-12 col-md-4 align-content-center">
              <img class="img-fluid w-50 object-fit-contain" src="" alt="ANT Technology"
                style="transform: scale(0.7)" />
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

/* ===== HERO ===== */
.hero {
  padding: 120px 20px;
  background: linear-gradient(var(--primary-color), #c0acee);
  color: white;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
}

.hero-title span {
  color: #fde68a;
}

.hero-subtitle {
  max-width: 700px;
  margin: 20px auto 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

/* ===== SECTIONS ===== */
.section {
  padding: 80px 20px;
}

.section-title {
  font-weight: 700;
  font-size: 2rem;
}

.section-text {
  max-width: 800px;
  margin: auto;
  color: #555;
  line-height: 1.7;
}

.section-about {
  background: linear-gradient(360deg, var(--primary-color), #c0acee);
}

/* ===== GLASS CARD ===== */
.glass-card {
  /* background: rgba(255, 255, 255, 0.75); */
  background: var(--tertiary-color);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
}

/* ===== LEADER ===== */
.leader-card {
  display: flex;
  gap: 30px;
  align-items: center;
  max-width: 900px;
  margin: auto;
}

.leader-avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #6366f1;
}

/* ===== MEMBERS ===== */
.member-card {
  text-align: center;
}

.member-card img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #6366f1;
}

.role {
  font-size: 0.9rem;
  color: #6366f1;
  font-weight: 600;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .leader-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>

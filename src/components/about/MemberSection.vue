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
          <div v-for="(m, i) in team" :key="i" class="col-6 col-md-4 col-lg-3">
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
import { ref, onMounted } from "vue";

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

const animateCounter = () => {
  stats.value.forEach((stat) => {
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

const activeTestimonial = ref(0);
const nextTestimonial = () => {
  activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.length;
};
const prevTestimonial = () => {
  activeTestimonial.value =
    (activeTestimonial.value - 1 + testimonials.length) % testimonials.length;
};
</script>

<style scoped>
.member-card.modern {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(99, 102, 241, 0.1);
  transition: all 0.35s ease;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.06);
}

.member-card.modern:hover {
  transform: translateY(-10px);
  box-shadow: 0 18px 48px rgba(99, 102, 241, 0.16);
  border-color: rgba(99, 102, 241, 0.28);
}

.member-card.modern.leader {
  border-color: rgba(139, 92, 246, 0.35);
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.12);
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
    transform 0.45s ease,
    filter 0.45s ease;
}

.member-card:hover .member-photo {
  transform: scale(1.08);
  filter: brightness(1.04);
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
    opacity 0.4s ease,
    transform 0.4s ease;
  transform: translateY(20px);
}

.member-card:hover .social-overlay {
  opacity: 1;
  transform: translateY(0);
}

.social-icons {
  margin-bottom: 16px;
  display: flex;
  gap: 20px;
}

.social-icons a {
  color: white;
  font-size: 1.35rem;
  transition: all 0.25s ease;
}

.social-icons a:hover {
  transform: scale(1.3);
  color: #a78bfa;
}

.member-info {
  padding: 18px 14px 22px;
  text-align: center;
}

.member-name {
  font-size: 1.12rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: #111827;
  transition: color 0.3s;
}

.member-card:hover .member-name {
  color: #6366f1;
}

.member-role {
  font-size: 0.9rem;
  color: #6366f1;
  font-weight: 500;
}
</style>

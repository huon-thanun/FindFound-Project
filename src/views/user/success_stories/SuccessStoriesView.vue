<template>
  <div class="success-stories-page">
    <section
      class="header-banner text-center text-white d-flex align-items-center"
    >
      <div class="container">
        <h1 class="fw-bold khmer-font mb-3">រឿងរ៉ាវជោគជ័យ</h1>
        <p class="lead khmer-font">
          ក្តីសប្បាយរីករាយ និងការចែករំលែក
          តាមរយៈការរកឃើញរបស់របរដែលបានបាត់បង់ត្រឡប់ទៅវិញ។
        </p>
      </div>
    </section>

    <div class="container py-5">
      <div class="row g-4">
        <div v-for="story in stories" :key="story.id" class="col-md-6 col-lg-4">
          <div
            class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden story-card"
          >
            <div class="image-container">
              <img
                :src="story.image"
                class="card-img-top object-fit-cover"
                height="250"
                :alt="story.title"
              />
              <div class="status-tag khmer-font shadow-sm">បានប្រគល់រួច</div>
            </div>
            <div class="card-body p-4 text-center">
              <div class="avatar-group mb-3">
                <img
                  :src="story.ownerAvatar"
                  class="avatar shadow-sm"
                  alt="Owner"
                />
                <i class="bi bi-arrow-left-right mx-2 text-primary fw-bold"></i>
                <img
                  :src="story.finderAvatar"
                  class="avatar shadow-sm"
                  alt="Finder"
                />
              </div>
              <h5 class="fw-bold mb-2 khmer-font text-purple">
                {{ story.title }}
              </h5>
              <p class="text-muted small mb-3">
                <i class="bi bi-calendar-check me-1"></i> {{ story.date }}
              </p>
              <p class="card-text khmer-font text-secondary small italic">
                "{{ story.message }}"
              </p>
            </div>
            <div class="card-footer bg-white border-0 pb-4 text-center">
              <span class="text-muted small khmer-font"
                >អរគុណដល់៖ <strong>{{ story.finderName }}</strong></span
              >
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-5 p-5 bg-purple-light rounded-4 text-center shadow-sm border border-purple"
      >
        <h4 class="fw-bold khmer-font text-purple mb-3">
          តើអ្នកទើបតែរកឃើញរបស់បាត់មែនទេ?
        </h4>
        <p class="khmer-font text-secondary">
          ចូលរួមចំណែកបង្កើតស្នាមញញឹម តាមរយៈការរាយការណ៍របស់ដែលអ្នករើសបាន។
        </p>
        <router-link
          to="/report-found"
          class="btn btn-purple khmer-font px-4 py-2 mt-2"
        >
          រាយការណ៍របស់ដែលរើសបាន
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const stories = ref([
  {
    id: 1,
    title: "រកឃើញកាបូបលុយវិញ",
    date: "១៥ មករា ២០២៤",
    message:
      "ខ្ញុំពិតជាអរគុណខ្លាំងណាស់ដែលបានបងប្រុសរើសបាន ហើយយកមកប្រគល់ជូនវិញ។ ក្នុងនោះមានឯកសារសំខាន់ៗច្រើនណាស់។",
    finderName: "សុខ ចាន់ត្រា",
    image:
      "https://images.unsplash.com/photo-1627225924765-552d44cfbc72?auto=format&fit=crop&q=80&w=600",
    ownerAvatar: "https://i.pravatar.cc/150?u=1",
    finderAvatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: 2,
    title: "បានទទួល iPhone 14 មកវិញ",
    date: "០២ កុម្ភៈ ២០២៤",
    message:
      "មិននឹកស្មានថាអាចរកឃើញវិញសោះ! អរគុណដល់វេទិកានេះដែលជួយផ្សព្វផ្សាយ និងអរគុណដល់ប្អូនស្រីដែលបានរើសវាទុកឱ្យ។",
    finderName: "លីដា វ៉ាន់",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600",
    ownerAvatar: "https://i.pravatar.cc/150?u=3",
    finderAvatar: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: 3,
    title: "ឯកសារប្លង់ដីបានដល់ដៃម្ចាស់",
    date: "២០ កុម្ភៈ ២០២៤",
    message:
      "ប្លង់ដីសំខាន់បំផុតសម្រាប់គ្រួសារខ្ញុំ ពេលបាត់គឺភ័យខ្លាំងណាស់។ សូមអរគុណបងប្រុសដែលចិត្តធម៌រើសបានហើយទាក់ទងមកវិញ។",
    finderName: "រតនា សម្បត្តិ",
    image:
      "https://images.unsplash.com/photo-1583521214690-73421a1829a9?auto=format&fit=crop&q=80&w=600",
    ownerAvatar: "https://i.pravatar.cc/150?u=5",
    finderAvatar: "https://i.pravatar.cc/150?u=6",
  },
]);
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;700&display=swap");

.khmer-font {
  font-family: "Kantumruy Pro", sans-serif;
}
.text-purple {
  color: #3b1e54;
}
.bg-purple-light {
  background-color: #f4effa;
}
.border-purple {
  border-color: #d1c4e9 !important;
}

.header-banner {
  height: 300px;
  background:
    linear-gradient(rgba(59, 30, 84, 0.8), rgba(59, 30, 84, 0.8)),
    url("https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&q=80&w=1200");
  background-size: cover;
  background-position: center;
}

.story-card {
  transition: transform 0.3s ease;
}

.story-card:hover {
  transform: translateY(-10px);
}

.image-container {
  position: relative;
}

.status-tag {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #28a745;
  color: white;
  padding: 5px 15px;
  border-radius: 50px;
  font-size: 12px;
}

.avatar-group {
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid white;
  object-fit: cover;
}

.btn-purple {
  background-color: #3b1e54;
  color: white;
  border-radius: 10px;
  transition: 0.3s;
}

.btn-purple:hover {
  background-color: #2a153d;
  color: white;
  transform: scale(1.05);
}

.italic {
  font-style: italic;
}
</style>

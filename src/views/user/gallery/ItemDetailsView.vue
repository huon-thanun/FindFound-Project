<template>
  <section class="item-details py-5 bg-light">
    <div class="container py-4">
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb khmer-font small">
          <li class="breadcrumb-item">
            <router-link to="/">ទំព័រដើម</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/gallery">ស្វែងរក</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            ព័ត៌មានលម្អិត
          </li>
        </ol>
      </nav>

      <div class="row g-4">
        <div class="col-lg-7">
          <div
            class="card border-0 shadow-sm rounded-4 overflow-hidden bg-white"
          >
            <div class="main-image-holder text-center bg-dark p-2">
              <img
                :src="item.image"
                class="img-fluid rounded-3"
                alt="Item Image"
              />
            </div>
            <div class="p-4">
              <h5 class="khmer-font-title fw-bold mb-3">ការពិពណ៌នាបន្ថែម</h5>
              <p class="khmer-font text-muted">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span
                :class="[
                  'badge rounded-pill px-3 py-2 khmer-font',
                  item.type === 'lost'
                    ? 'bg-danger-soft text-danger'
                    : 'bg-success-soft text-success',
                ]"
              >
                {{ item.type === "lost" ? "របស់បាត់បង់" : "របស់រើសបាន" }}
              </span>
              <span class="text-muted small khmer-font"
                ><i class="bi bi-clock"></i> {{ item.time }}</span
              >
            </div>

            <h3 class="khmer-font-title fw-bold mb-2">{{ item.title }}</h3>
            <p class="khmer-font text-danger fw-bold mb-4">
              <i class="bi bi-geo-alt-fill"></i> {{ item.location }}
            </p>

            <div class="detail-grid border-top pt-4">
              <div class="d-flex justify-content-between mb-3">
                <span class="khmer-font text-muted">ប្រភេទ:</span>
                <span class="khmer-font fw-bold">{{ item.category }}</span>
              </div>
              <div class="d-flex justify-content-between mb-3">
                <span class="khmer-font text-muted">កាលបរិច្ឆេទ:</span>
                <span class="khmer-font fw-bold">{{ item.date }}</span>
              </div>
            </div>

            <div class="action-buttons mt-4 d-grid gap-2">
              <button class="btn btn-purple py-3 fw-bold khmer-font">
                <i class="bi bi-chat-left-dots-fill me-2"></i>
                ផ្ញើសារទៅកាន់អ្នកបង្ហោះ
              </button>
              <button class="btn btn-outline-dark py-3 fw-bold khmer-font">
                <i class="bi bi-telephone-fill me-2"></i> បង្ហាញលេខទូរស័ព្ទ
              </button>
            </div>
          </div>

          <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h6 class="khmer-font-title fw-bold mb-3">ព័ត៌មានអ្នកបង្ហោះ</h6>
            <div class="d-flex align-items-center">
              <div class="avatar-circle me-3">
                <i class="bi bi-person-fill"></i>
              </div>
              <div>
                <h6 class="mb-0 khmer-font fw-bold">{{ item.postedBy }}</h6>
                <p class="mb-0 text-muted small khmer-font">
                  សមាជិកតាំងពី៖ ២០២៤
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

// ក្នុង Project ពិត អ្នកនឹងប្រើ UseRoute ដើម្បីទាញយក ID ពី URL
const item = ref({
  title: "iPhone 13 Pro ពណ៌ខៀវ",
  type: "lost",
  category: "អេឡិចត្រូនិច",
  location: "ផ្សារទំនើប អុីអន ៣ (មានជ័យ)",
  date: "២៥ មករា ២០២៦",
  time: "២ ម៉ោងមុន",
  postedBy: "សាន សុខា",
  image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
  description:
    "ខ្ញុំបានបាត់ទូរស័ព្ទ iPhone 13 Pro មួយគ្រឿង ពណ៌ខៀវ កាលពីល្ងាចម្សិលមិញ។ ប្រសិនបើបងប្អូនណាបានរើស ឬបានឃើញ សូមមេត្តាទំនាក់ទំនងមកខ្ញុំផង ខ្ញុំមានជូនជាសគុណខ្លះៗ។ សូមអរគុណ!",
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Koh+Santepheap:wght@700&family=Noto+Sans+Khmer:wght@400;500;600&display=swap");

.khmer-font {
  font-family: "Noto Sans Khmer", sans-serif;
}
.khmer-font-title {
  font-family: "Koh Santepheap", cursive;
}

.main-image-holder {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-danger-soft {
  background-color: #fee2e2;
}
.bg-success-soft {
  background-color: #dcfce7;
}

.btn-purple {
  background-color: #3b1e54;
  color: white;
  border-radius: 12px;
  transition: 0.3s;
}
.btn-purple:hover {
  background-color: #d4af37;
  color: #1e1b4b;
}

.btn-outline-dark {
  border-radius: 12px;
  border: 1.5px solid #1e1b4b;
}

.avatar-circle {
  width: 50px;
  height: 50px;
  background: #f3efff;
  color: #3b1e54;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.breadcrumb-item a {
  text-decoration: none;
  color: #3b1e54;
}
</style>

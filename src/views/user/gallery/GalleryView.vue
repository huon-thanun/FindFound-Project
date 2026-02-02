<template>
  <section class="gallery-page py-5 bg-light">
    <div class="container py-4">
      <div class="row align-items-center mb-5">
        <div class="col-lg-6 text-center text-lg-start">
          <h2 class="khmer-font-title fw-bold mb-2">
            បញ្ជីសម្ភារៈបាត់បង់ និងរើសបាន
          </h2>
          <p class="khmer-font text-muted">
            ស្វែងរករបស់របរដែលអ្នកបានបាត់បង់ ឬជួយរកម្ចាស់ឱ្យរបស់ដែលអ្នកបានរើស។
          </p>
        </div>
        <div class="col-lg-6">
          <div
            class="search-bar-wrapper shadow-sm rounded-pill bg-white d-flex align-items-center px-4 py-2 border"
          >
            <i class="bi bi-search text-muted me-2"></i>
            <input
              type="text"
              v-model="searchQuery"
              class="form-control border-0 bg-transparent khmer-font"
              placeholder="ស្វែងរកតាមឈ្មោះសម្ភារៈ..."
            />
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-3">
          <div class="filter-sidebar p-4 rounded-4 shadow-sm bg-white border">
            <h6 class="khmer-font-title fw-bold mb-4 border-bottom pb-2">
              ចម្រាញ់ទិន្នន័យ
            </h6>

            <div class="filter-group mb-4">
              <label class="khmer-font fw-bold small mb-3 d-block"
                >ប្រភេទសម្ភារៈ</label
              >
              <div class="form-check mb-2" v-for="cat in categories" :key="cat">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="cat"
                  :value="cat"
                  v-model="selectedCats"
                />
                <label class="form-check-label khmer-font small" :for="cat">{{
                  cat
                }}</label>
              </div>
            </div>

            <div class="filter-group mb-4">
              <label class="khmer-font fw-bold small mb-3 d-block"
                >ស្ថានភាព</label
              >
              <select
                class="form-select khmer-font small"
                v-model="statusFilter"
              >
                <option value="all">ទាំងអស់</option>
                <option value="lost">បាត់បង់</option>
                <option value="found">រើសបាន</option>
              </select>
            </div>

            <div class="filter-group">
              <label class="khmer-font fw-bold small mb-3 d-block"
                >ទីតាំង (រាជធានី-ខេត្ត)</label
              >
              <select
                class="form-select khmer-font small"
                v-model="locationFilter"
              >
                <option value="all">គ្រប់ទីតាំង</option>
                <option value="phnompenh">ភ្នំពេញ</option>
                <option value="siemreap">សៀមរាប</option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-lg-9">
          <div class="row g-4">
            <div
              class="col-md-6 col-xl-4"
              v-for="(item, index) in filteredItems"
              :key="index"
            >
              <div
                class="item-gallery-card shadow-sm rounded-4 overflow-hidden bg-white border h-100"
              >
                <div class="card-img-box position-relative">
                  <img :src="item.image" :alt="item.title" class="w-100" />
                  <span :class="['status-tag khmer-font', item.type]">
                    {{ item.type === "lost" ? "បាត់បង់" : "រើសបាន" }}
                  </span>
                </div>
                <div class="p-3">
                  <div class="d-flex justify-content-between mb-2">
                    <span class="text-primary small fw-bold khmer-font">{{
                      item.category
                    }}</span>
                    <span class="text-muted small"
                      ><i class="bi bi-clock"></i> {{ item.time }}</span
                    >
                  </div>
                  <h6 class="khmer-font-title fw-bold mb-2">
                    {{ item.title }}
                  </h6>
                  <p class="khmer-font text-muted small mb-3">
                    <i class="bi bi-geo-alt-fill text-danger"></i>
                    {{ item.location }}
                  </p>
                  <button class="btn btn-purple-outline w-100 khmer-font py-2">
                    មើលលម្អិត
                  </button>
                </div>
              </div>
            </div>

            <div v-if="filteredItems.length === 0" class="text-center py-5">
              <i class="bi bi-inbox display-1 text-muted"></i>
              <p class="khmer-font text-muted mt-3">
                មិនមានទិន្នន័យដែលអ្នកស្វែងរកឡើយ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const searchQuery = ref("");
const statusFilter = ref("all");
const locationFilter = ref("all");
const selectedCats = ref([]);
const categories = ["អេឡិចត្រូនិច", "កាបូប", "សោរ", "ឯកសារ", "ផ្សេងៗ"];

const items = ref([
  {
    title: "iPhone 13 Pro",
    category: "អេឡិចត្រូនិច",
    location: "ភ្នំពេញ",
    type: "lost",
    time: "១ ម៉ោងមុន",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
  },
  {
    title: "កាបូបលុយខ្មៅ",
    category: "កាបូប",
    location: "សៀមរាប",
    type: "found",
    time: "៣ ម៉ោងមុន",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
  },
  {
    title: "សោរឡាន Honda",
    category: "សោរ",
    location: "ភ្នំពេញ",
    type: "found",
    time: "៥ ម៉ោងមុន",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400",
  },
]);

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      statusFilter.value === "all" || item.type === statusFilter.value;
    const matchesCat =
      selectedCats.value.length === 0 ||
      selectedCats.value.includes(item.category);
    return matchesSearch && matchesStatus && matchesCat;
  });
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

.search-bar-wrapper input:focus {
  box-shadow: none;
}

.item-gallery-card {
  transition: 0.3s ease;
}
.item-gallery-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.card-img-box {
  height: 180px;
  overflow: hidden;
}
.card-img-box img {
  object-fit: cover;
  height: 100%;
  transition: 0.5s;
}
.item-gallery-card:hover img {
  transform: scale(1.1);
}

.status-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  color: white;
  font-weight: 600;
}
.status-tag.lost {
  background: #ef4444;
}
.status-tag.found {
  background: #10b981;
}

.btn-purple-outline {
  border: 1px solid #3b1e54;
  color: #3b1e54;
  border-radius: 10px;
  transition: 0.3s;
}
.btn-purple-outline:hover {
  background: #3b1e54;
  color: white;
}

.form-check-input:checked {
  background-color: #3b1e54;
  border-color: #3b1e54;
}
</style>

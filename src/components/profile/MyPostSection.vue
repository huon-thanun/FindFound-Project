<template>
  <div class="my-posts-component mt-4">
    <div class="d-flex align-items-center gap-3 mb-4">
      <div class="purple-line"></div>
      <h4 class="fw-bold mb-0 text-dark-indigo khmer-font-title">
        ការបង្ហោះរបស់ខ្ញុំ
      </h4>
    </div>

    <div class="row g-3">
      <div v-for="post in mockPosts" :key="post.id" class="col-md-6">
        <div class="post-card-mini shadow-sm">
          <div class="d-flex gap-3">
            <div class="post-img-container">
              <img
                :src="post.image || defaultImage"
                class="post-thumbnail"
                @error="handleImageError"
              />
            </div>

            <div class="flex-grow-1">
              <h6 class="mb-1 fw-bold text-dark-indigo">{{ post.name }}</h6>
              <p class="text-muted small mb-2">
                <i class="bi bi-geo-alt me-1"></i>{{ post.location }}
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <span :class="post.statusClass">{{ post.statusText }}</span>
                <button class="btn-manage-sm">គ្រប់គ្រង</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Default image if post has no photo
const defaultImage = "https://cdn-icons-png.flaticon.com/512/4076/4076432.png";

const handleImageError = (e) => {
  e.target.src = defaultImage;
};

// Mock data to see real results
const mockPosts = ref([
  {
    id: 1,
    name: "កាបូបលុយខ្មៅ",
    location: "ភ្នំពេញ, កម្ពុជា",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop",
    statusText: "កំពុងស្វែងរក",
    statusClass: "badge bg-warning-soft text-warning",
  },
  {
    id: 2,
    name: "សោរឡាន Prius",
    location: "សៀមរាប",
    image:
      "https://images.unsplash.com/photo-1549194388-f61be84a6e9e?w=200&h=200&fit=crop",
    statusText: "រកឃើញវិញហើយ",
    statusClass: "badge bg-success-soft text-success",
  },
]);
</script>

<style scoped>
.post-card-mini {
  background: #ffffff;
  border-radius: 20px;
  padding: 15px;
  border: 1px solid #f1efff;
  transition: 0.3s;
}

.post-card-mini:hover {
  transform: translateY(-5px);
  border-color: #7c3aed;
}

.post-img-container {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.post-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  background: #f8f9fa;
}

.bg-success-soft {
  background: #e6f9f1;
  font-size: 0.75rem;
  padding: 5px 10px;
  border-radius: 8px;
}
.bg-warning-soft {
  background: #fff8eb;
  font-size: 0.75rem;
  padding: 5px 10px;
  border-radius: 8px;
}

.btn-manage-sm {
  border: none;
  background: #f1edff;
  color: #7c3aed;
  font-size: 0.8rem;
  padding: 6px 14px;
  border-radius: 10px;
  font-weight: 600;
  transition: 0.3s;
}

.btn-manage-sm:hover {
  background: #7c3aed;
  color: white;
}

.purple-line {
  width: 5px;
  height: 25px;
  background: #3b1e54;
  border-radius: 10px;
}
</style>

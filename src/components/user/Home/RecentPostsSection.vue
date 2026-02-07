<template>
  <section id="item-feed" class="item-feed-section">
    <div class="container">
      <div class="feed-header">
        <div class="title-area">
          <h2 class="khmer-font">ការបង្ហោះថ្មីៗ</h2>
          <div class="update-status">
            <div class="active-dot"></div>
            <span>បច្ចុប្បន្នភាពចុងក្រោយ</span>
          </div>
        </div>

        <div class="filter-controls">
          <div class="status-filters">
            <button
              v-for="tab in ['ទាំងអស់', 'បាត់បង់', 'រើសបាន']"
              :key="tab"
              :class="['filter-btn', { active: currentTab === tab }]"
              @click="currentTab = tab"
            >
              {{ tab }}
            </button>
          </div>
        </div>
      </div>

      <div class="items-grid">
        <div class="post-card" v-for="(item, index) in items" :key="index">
          <div class="image-box">
            <img :src="item.image" :alt="item.title" />
            <span class="category-tag">{{ item.category }}</span>
            <div :class="['status-indicator', item.statusType]">
              {{ item.statusText }}
            </div>
          </div>
          <div class="content-box">
            <div class="meta-top">
              <span class="time-stamp"
                ><i class="bi bi-clock"></i> {{ item.time }}</span
              >
            </div>
            <h3>{{ item.title }}</h3>
            <p class="location-text">
              <i class="bi bi-geo-alt-fill text-danger"></i> {{ item.location }}
            </p>
            <div class="card-action">
              <button class="btn-details">មើលលម្អិត</button>
              <button class="btn-chat" title="ផ្ញើសារ">
                <i class="bi bi-chat-left-text-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");
const currentTab = ref("ទាំងអស់");

// ទិន្នន័យគំរូដែលមានរូបភាពខុសៗគ្នា
const items = [
  {
    title: "កាបូបលុយស្បែកពណ៌ត្នោត",
    category: "កាបូប",
    location: "ផ្សារទំនើប អុីអន ៣",
    time: "១០ នាទីមុន",
    statusText: "រើសបាន",
    statusType: "found",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=400",
  },
  {
    title: "iPhone 15 Pro Max ពណ៌ខ្មៅ",
    category: "ទូរស័ព្ទ",
    location: "សួនច្បារវត្តភ្នំ",
    time: "៤៥ នាទីមុន",
    statusText: "បាត់បង់",
    statusType: "lost",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400",
  },
  {
    title: "សោរឡាន Toyota",
    category: "សោរ",
    location: "ស្តាតអូឡាំពិក",
    time: "២ ម៉ោងមុន",
    statusText: "រើសបាន",
    statusType: "found",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=400",
  },
  {
    title: "កុំព្យូទ័រ MacBook Air M2",
    category: "អេឡិចត្រូនិច",
    location: "ក្បែរសកលវិទ្យាល័យភូមិន្ទភ្នំពេញ",
    time: "៥ ម៉ោងមុន",
    statusText: "បាត់បង់",
    statusType: "lost",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400",
  },
];
</script>

<style scoped>
/* រក្សាស្ទីលមូលដ្ឋាន និងកែសម្រួលចំណុចខ្វះខាត */
.item-feed-section {
  padding: 60px 0;
  background-color: #f8fafc;
}

.feed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 25px;
}

.khmer-font {
  font-family: "Koh Santepheap", sans-serif;
  font-weight: 700;
  color: #1e1b4b;
}

.update-status {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 5px;
}

.active-dot {
  width: 10px;
  height: 10px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
  animation: pulse 2s infinite;
}

/* Search & Filters */
.search-input-wrapper {
  background: white;
  padding: 12px 18px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  transition: 0.3s;
}

.search-input-wrapper:focus-within {
  border-color: #7c3aed;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.08);
}

.status-filters {
  display: flex;
  background: #f1f5f9;
  padding: 6px;
  border-radius: 14px;
}

.filter-btn {
  border: none;
  padding: 8px 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  color: #64748b;
  background: transparent;
}

.filter-btn.active {
  background: white;
  color: #7c3aed;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Card Improvements */
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.post-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
}

.image-box {
  height: 220px;
  position: relative;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-tag {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255, 255, 255, 0.95);
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #3b1e54;
}

.status-indicator {
  position: absolute;
  bottom: 15px;
  right: 15px;
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
}

.status-indicator.found {
  background: #10b981;
}
.status-indicator.lost {
  background: #ef4444;
}

.content-box {
  padding: 20px;
}

.meta-top {
  margin-bottom: 10px;
}

.time-stamp {
  font-size: 0.8rem;
  color: #94a3b8;
}

.content-box h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: #1e1b4b;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.location-text {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-action {
  display: flex;
  gap: 12px;
}

.btn-details {
  flex: 1;
  background: #3b1e54;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 14px;
  font-weight: 600;
  transition: 0.3s;
}

.btn-details:hover {
  background: #5c3976;
}

.btn-chat {
  width: 48px;
  background: #f1f5f9;
  border: none;
  border-radius: 14px;
  color: #3b1e54;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.btn-chat:hover {
  background: #e2e8f0;
  color: #7c3aed;
}

.btn-load-more {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: white;
  border: 2px solid #e2e8f0;
  padding: 12px 30px;
  border-radius: 16px;
  color: #64748b;
  font-weight: 700;
  transition: 0.3s;
  cursor: pointer;
}

.btn-load-more:hover {
  border-color: #3b1e54;
  color: #3b1e54;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .feed-header {
    justify-content: center;
    text-align: center;
  }
  .filter-controls {
    width: 100%;
    justify-content: center;
  }
  .search-input-wrapper {
    width: 100%;
  }
}
</style>

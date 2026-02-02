<template>
  <section class="main-feed container">
    <div class="feed-controls">
      <div class="section-title">
        <h2>ការបង្ហោះថ្មីៗ (Recent Posts)</h2>
        <p>ស្វែងរកតាមប្រភេទសម្ភារៈដែលអ្នកបានបាត់បង់</p>
      </div>

      <div class="filter-group">
        <div class="search-box">
          <i class="bi bi-search"></i>
          <input
            type="text"
            placeholder="ស្វែងរកសម្ភារៈ..."
            v-model="searchQuery"
          />
        </div>
        <div class="tabs">
          <button class="tab-btn active">ទាំងអស់</button>
          <button class="tab-btn">សម្ភារៈបាត់</button>
          <button class="tab-btn">រើសបាន</button>
        </div>
      </div>
    </div>

    <div class="item-grid">
      <div v-for="item in items" :key="item.id" class="item-card-glass">
        <div class="card-header">
          <img :src="item.image" alt="item" class="item-img" />
          <span :class="['status-tag', item.status]">{{
            item.status === "lost" ? "បាត់" : "រើសបាន"
          }}</span>
        </div>

        <div class="card-body">
          <div class="item-cat">{{ item.category }}</div>
          <h3>{{ item.title }}</h3>

          <div class="item-meta">
            <span><i class="bi bi-geo-alt"></i> {{ item.location }}</span>
            <span><i class="bi bi-calendar3"></i> {{ item.date }}</span>
          </div>

          <p class="item-desc">{{ item.description }}</p>

          <div class="card-footer">
            <button class="btn-details">មើលលម្អិត</button>
            <button class="btn-contact-icon">
              <i class="bi bi-chat-left-text"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="item-feed" class="item-feed-section">
    <div class="container">
      <div class="feed-header">
        <div class="title-area">
          <h2 class="khmer-font">ការបង្ហោះថ្មីៗ</h2>
          <div class="active-dot"></div>
          <span>បច្ចុប្បន្នភាពចុងក្រោយ</span>
        </div>

        <div class="filter-controls">
          <div class="search-input-wrapper">
            <i class="bi bi-search"></i>
            <input type="text" placeholder="ស្វែងរកសម្ភារៈ..." />
          </div>
          <div class="status-filters">
            <button class="filter-btn active">ទាំងអស់</button>
            <button class="filter-btn lost">បាត់បង់</button>
            <button class="filter-btn found">រើសបាន</button>
          </div>
        </div>
      </div>

      <div class="items-grid">
        <div class="post-card" v-for="i in 4" :key="i">
          <div class="image-box">
            <img
              src="https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=400"
              alt="Wallet"
            />
            <span class="category-tag">ឯកសារ</span>
            <div class="status-indicator found">រើសបាន</div>
          </div>
          <div class="content-box">
            <span class="time-stamp">១៥ នាទីមុន</span>
            <h3>កាបូបលុយខ្មៅ (Wallet)</h3>
            <p class="location-text">
              <i class="bi bi-geo-alt-fill"></i> ក្បែរផ្សារទំនើប អុីអន ៣
            </p>
            <div class="card-action">
              <button class="btn-details">មើលព័ត៌មាន</button>
              <button class="btn-chat"><i class="bi bi-chat-dots"></i></button>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination-area">
        <button class="btn-load-more">បង្ហាញបន្ថែម...</button>
      </div>
    </div>
  </section>
</template>
<style scoped>
.main-feed {
  padding: 60px 0;
}

.feed-controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.section-title h2 {
  font-family: "Koh Santepheap", sans-serif;
  color: #1e1b4b;
  font-size: 1.8rem;
  margin-bottom: 5px;
}

.filter-group {
  display: flex;
  gap: 15px;
  align-items: center;
}

.search-box {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 10px 15px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.search-box input {
  border: none;
  outline: none;
  font-size: 0.9rem;
}

.tab-btn {
  border: none;
  background: #f1f5f9;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.tab-btn.active {
  background: #7c3aed;
  color: white;
}

/* Item Card Styles */
.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.item-card-glass {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.item-card-glass:hover {
  transform: translateY(-10px);
}

.card-header {
  position: relative;
  height: 200px;
}

.item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-tag {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
}

.status-tag.lost {
  background: #ef4444;
}
.status-tag.found {
  background: #10b981;
}

.card-body {
  padding: 20px;
}

.item-cat {
  font-size: 0.7rem;
  color: #7c3aed;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 8px;
}

.item-meta {
  display: flex;
  gap: 15px;
  font-size: 0.8rem;
  color: #64748b;
  margin: 10px 0;
}

.item-desc {
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.5;
  margin-bottom: 20px;
}

.card-footer {
  display: flex;
  gap: 10px;
}

.btn-details {
  flex: 1;
  background: #1e1b4b;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
}

.btn-contact-icon {
  width: 45px;
  background: #f1f5f9;
  border: none;
  border-radius: 12px;
  color: #7c3aed;
  cursor: pointer;
}
/* ITEM FEED SECTION CONTAINER */
.item-feed-section {
  padding: 80px 0;
  background-color: #f8fafc; /* Light blue-grey to make cards pop */
  min-height: 600px;
}

/* A. FEED HEADER & FILTERS */
.feed-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.title-area h2 {
  font-family: "Koh Santepheap", sans-serif;
  font-size: 2rem;
  color: #1e1b4b;
  margin-bottom: 8px;
}

.title-area span {
  color: #64748b;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.active-dot {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.filter-controls {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.search-input-wrapper {
  background: white;
  padding: 12px 20px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.search-input-wrapper input {
  border: none;
  outline: none;
  font-size: 0.9rem;
  width: 200px;
}

.status-filters {
  display: flex;
  background: #edf2f7;
  padding: 5px;
  border-radius: 12px;
  gap: 5px;
}

.filter-btn {
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  color: #64748b;
}

.filter-btn.active {
  background: white;
  color: #7c3aed;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* B. THE ITEM GRID & CARDS */
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.post-card {
  background: white;
  border-radius: 25px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
}

.post-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px rgba(124, 58, 237, 0.1);
}

.image-box {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
}

.post-card:hover .image-box img {
  transform: scale(1.1);
}

.category-tag {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #7c3aed;
}

.status-indicator {
  position: absolute;
  bottom: 15px;
  right: 15px;
  padding: 6px 15px;
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

.time-stamp {
  font-size: 0.75rem;
  color: #94a3b8;
  display: block;
  margin-bottom: 8px;
}

.content-box h3 {
  font-size: 1.15rem;
  margin-bottom: 10px;
  color: #1e1b4b;
}

.location-text {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.card-action {
  display: flex;
  gap: 10px;
}

.btn-details {
  flex: 1;
  background: #7c3aed;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.btn-details:hover {
  background: #6d28d9;
}

.btn-chat {
  width: 45px;
  background: #f1f5f9;
  border: none;
  border-radius: 12px;
  color: #7c3aed;
  cursor: pointer;
  transition: 0.3s;
}

.btn-chat:hover {
  background: #e2e8f0;
}

/* C. LOAD MORE */
.pagination-area {
  text-align: center;
  margin-top: 50px;
}

.btn-load-more {
  background: transparent;
  border: 2px solid #e2e8f0;
  padding: 12px 30px;
  border-radius: 15px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: 0.3s;
}

.btn-load-more:hover {
  border-color: #7c3aed;
  color: #7c3aed;
}

/* ANIMATIONS */
@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.5;
  }
}
</style>

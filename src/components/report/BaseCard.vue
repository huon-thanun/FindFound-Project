<template>
  <div class="card post-card">
    <div class="image-box">
      <slot name="image"></slot>
      <!-- <img :src="image" :alt="title" /> -->
      <span class="category-tag tag-box-shadow-in">{{ category.name }}</span>
      <div
        class="report-type tag-box-shadow-out"
        :class="{ found: reportType.id == 2, lost: reportType.id == 1 }"
      >
        {{ reportType.name }}
      </div>
    </div>
    <div class="content-box">
      <div class="meta-top">
        <span class="event-date">
          <i class="bi bi-calendar2-minus"></i>
          {{ formatDate(eventDate) }}
        </span>
      </div>
      <h3>{{ title }}</h3>
      <p class="location-text">
        <i class="bi bi-geo-alt-fill text-danger"></i> {{ location }}
      </p>
      <div class="card-action">
        <button
          class="btn-details tag-box-shadow-out"
          @click="handleActionButton"
        >
          <i class="bi bi-arrow-right"></i>
          {{ btnTitle }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { formatDate } from "@/utils/formatDate";
const props = defineProps({
  category: {
    type: Object,
    default: { id: 0, name: "Unknown" },
  },
  reportType: {
    type: Object,
    default: "-",
    default: { id: 0, name: "Null" },
  },
  eventDate: {
    type: String,
    default: "_/_/_",
  },
  title: {
    type: String,
    default: "No Title",
    required: true,
  },
  location: {
    type: String,
    default: "No Location",
  },
  btnTitle: {
    type: String,
    default: "Button",
  },
});
const emits = defineEmits(["onClick"]);
const handleActionButton = () => {
  emits("onClick");
};
</script>
<style scoped>
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
  border: 1px solid #a9c2db;
  transition: all 0.3s ease;
}

.post-card:hover {
  transform: translateY(-4px);
  /* box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06); */
  box-shadow:
    rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.tag-box-shadow-in {
  box-shadow:
    rgb(204, 219, 232) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
}
.tag-box-shadow-out {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.post-card .image-box {
  position: relative;
  transition: 0.2s linear;
}
.post-card:hover .image-box {
  transform: scale(1.02);
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

.report-type {
  position: absolute;
  bottom: 15px;
  right: 15px;
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
}

.found {
  background: #10b981;
}
.lost {
  background: #ef4444;
}

.content-box {
  padding: 20px;
}

.meta-top {
  margin-bottom: 10px;
}

.event-date {
  font-size: 0.8rem;
  color: #94a3b8;
}

.content-box h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: #1e1b4b;
  display: -webkit-box;
  line-clamp: 1;
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
  background: var(--primary-color);
  color: var(--textOnPrimary);
  border: none;
  padding: 12px;
  border-radius: 14px;
  font-weight: 600;
  transition: 0.3s;
}

.btn-details:hover {
  background: #5c3976;
  transform: translate(-5px, -3px);
  box-shadow:
    rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
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

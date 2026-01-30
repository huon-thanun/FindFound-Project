<template>
  <div style="padding-inline: 70px">
    <h2>របាយការណ៍លម្អិត</h2>
    <router-link :to="{ name: 'report.user' }" class="btn btn-secondary">
      ត្រឡប់ក្រោយ
    </router-link>
    <div class="row px-sm-3 py-5">
      <div class="col-12 col-xl-8">
        <BaseReportCard>
          <template #image>
            <!-- <img
            class="w-100"
            style="max-height: 200px; object-fit: cover"
            :src="
              report.reportImages && report.reportImages.length > 0
                ? report.reportImages[0].name
                : defaultImage
            "
            :alt="report.title || 'Report Image'"
          /> -->
            <img
              :src="defaultImage"
              class="w-100"
              alt=""
              style="min-height: 300px"
            />
          </template>
        </BaseReportCard>
      </div>
      <div class="col-12 col-xl-4">
        <BaseReportCard>
          <h3>Lost Black Wallet</h3>
        </BaseReportCard>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseReportCard from "@/components/base/BaseReportCard.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const id = ref(route.params.id);
const defaultImage =
  "https://tse2.mm.bing.net/th/id/OIP.b8bpZyFwupiioDofQPXo_gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3";
</script>
<!-- <template>
  <div class="container py-4">
   
    <div class="card shadow-lg border-0 overflow-hidden" :class="statusClass">
      
      <div class="position-absolute top-0 end-0 m-3">
        <span class="badge rounded-pill fs-6 p-2" :class="statusBadgeClass">
          <i class="bi bi-circle-fill me-1"></i>
          {{ wallet.status.toUpperCase() }}
        </span>
      </div>

      
      <div class="card-header bg-gradient-primary text-white py-4">
        <div class="d-flex align-items-center">
          <div class="header-icon">
            <i class="bi bi-wallet2 fs-1"></i>
          </div>
          <div class="ms-3">
            <h1 class="card-title mb-1 fw-bold">{{ wallet.title }}</h1>
            <p class="card-subtitle mb-0 opacity-75">
              <i class="bi bi-info-circle me-1"></i>
              {{ wallet.description }}
            </p>
          </div>
        </div>
      </div>

      
      <div class="card-body p-4">
        
        <div class="row g-4">
          <div class="col-md-6">
            <div class="detail-card p-3 h-100">
              <div class="d-flex align-items-center mb-2">
                <i class="bi bi-calendar-date text-primary fs-4 me-3"></i>
                <h6 class="mb-0 fw-bold text-uppercase text-muted">
                  Date Lost
                </h6>
              </div>
              <p class="fs-5 fw-semibold mb-0">{{ formattedDate }}</p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="detail-card p-3 h-100">
              <div class="d-flex align-items-center mb-2">
                <i class="bi bi-geo-alt text-danger fs-4 me-3"></i>
                <h6 class="mb-0 fw-bold text-uppercase text-muted">Location</h6>
              </div>
              <p class="fs-5 fw-semibold mb-0">{{ wallet.location }}</p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="detail-card p-3 h-100">
              <div class="d-flex align-items-center mb-2">
                <i class="bi bi-palette text-success fs-4 me-3"></i>
                <h6 class="mb-0 fw-bold text-uppercase text-muted">
                  Appearance
                </h6>
              </div>
              <p class="fs-5 fw-semibold mb-0">{{ wallet.color }}</p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="detail-card p-3 h-100">
              <div class="d-flex align-items-center mb-2">
                <i class="bi bi-credit-card text-warning fs-4 me-3"></i>
                <h6 class="mb-0 fw-bold text-uppercase text-muted">Contact</h6>
              </div>
              <button
                class="btn btn-outline-primary btn-sm"
                @click="toggleContact"
              >
                {{ showContact ? "Hide Contact" : "Show Contact" }}
              </button>
              <p v-if="showContact" class="mt-2 fw-semibold">
                {{ wallet.contact }}
              </p>
            </div>
          </div>
        </div>

        
        <div class="mt-4">
          <h5 class="fw-bold mb-3">
            <i class="bi bi-box-seam me-2"></i>
            Contents Inside
          </h5>
          <div class="d-flex flex-wrap gap-2">
            <span
              v-for="item in wallet.contents"
              :key="item"
              class="badge bg-light text-dark border p-3 d-flex align-items-center"
            >
              <i :class="getItemIcon(item)"></i>
              <span class="ms-2">{{ item }}</span>
            </span>
          </div>
        </div>

        
        <div class="mt-5 pt-4 border-top">
          <h6 class="fw-bold text-muted mb-3">What would you like to do?</h6>
          <div class="d-flex flex-wrap gap-3">
            <button class="btn btn-success px-4" @click="markAsFound">
              <i class="bi bi-check-circle me-2"></i>
              I Found This Wallet
            </button>
            <button class="btn btn-outline-primary px-4" @click="shareAlert">
              <i class="bi bi-share me-2"></i>
              Share Alert
            </button>
            <button
              class="btn btn-outline-secondary px-4"
              @click="printDetails"
            >
              <i class="bi bi-printer me-2"></i>
              Print Details
            </button>
          </div>
        </div>
      </div>

      
      <div class="card-footer bg-light py-3">
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">
            <i class="bi bi-exclamation-triangle text-warning me-1"></i>
            If found, please handle with care. Important documents inside.
          </small>
          <small class="text-muted">
            ID: #{{ wallet.id }} • Posted: {{ timeAgo }}
          </small>
        </div>
      </div>
    </div>

    
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        ref="toast"
        class="toast align-items-center border-0"
        :class="toastClass"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center">
            <i :class="toastIcon" class="fs-5 me-2"></i>
            {{ toastMessage }}
          </div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template> -->

<!-- <script>
import { ref, computed, onMounted } from "vue";
import { Toast } from "bootstrap";

export default {
  setup() {
    // Wallet Data
    const wallet = ref({
      id: "LW202625",
      title: "Lost Black Wallet",
      status: "active",
      description:
        "Lost my black leather wallet near the university library. Contains ID cards and some cash.",
      date: "1/25/2026",
      location: "University Library, Phnom Penh",
      color: "Black Leather Wallet",
      contents: [
        "ID Cards",
        "Cash $50",
        "Credit Cards",
        "University ID",
        "Driver License",
        "Photos",
      ],
      contact: "Contact: +855-XX-XXX-XXX or email: lost.wallet@example.com",
      posted: "2026-01-25T14:30:00",
    });

    // UI State
    const showContact = ref(false);
    const toastMessage = ref("");
    const toastType = ref("success");
    const toast = ref(null);
    let toastInstance = null;

    // Computed Properties
    const formattedDate = computed(() => {
      const date = new Date(wallet.value.date);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    });

    const timeAgo = computed(() => {
      const posted = new Date(wallet.value.posted);
      const now = new Date();
      const diff = Math.floor((now - posted) / (1000 * 60 * 60 * 24));

      if (diff === 0) return "Today";
      if (diff === 1) return "Yesterday";
      if (diff < 7) return `${diff} days ago`;
      if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
      return `${Math.floor(diff / 30)} months ago`;
    });

    const statusClass = computed(() => {
      return wallet.value.status === "active"
        ? "border-primary"
        : "border-success";
    });

    const statusBadgeClass = computed(() => {
      return wallet.value.status === "active"
        ? "bg-danger bg-opacity-10 text-danger"
        : "bg-success bg-opacity-10 text-success";
    });

    const toastClass = computed(() => {
      return `bg-${toastType.value} text-white`;
    });

    const toastIcon = computed(() => {
      switch (toastType.value) {
        case "success":
          return "bi bi-check-circle-fill";
        case "info":
          return "bi bi-info-circle-fill";
        case "warning":
          return "bi bi-exclamation-triangle-fill";
        default:
          return "bi bi-info-circle-fill";
      }
    });

    // Methods
    const getItemIcon = (item) => {
      const icons = {
        "ID Cards": "bi bi-person-badge",
        Cash: "bi bi-cash",
        "Credit Cards": "bi bi-credit-card",
        "University ID": "bi bi-building",
        "Driver License": "bi bi-car-front",
        Photos: "bi bi-image",
      };
      return icons[item] || "bi bi-question-circle";
    };

    const toggleContact = () => {
      showContact.value = !showContact.value;
      showToast(
        showContact.value ? "Contact information revealed" : "Contact hidden",
        "info",
      );
    };

    const markAsFound = () => {
      wallet.value.status = "found";
      showToast(
        "Thank you! Wallet marked as found. Owner will be notified.",
        "success",
      );
    };

    const shareAlert = () => {
      const shareData = {
        title: "Lost Wallet Alert",
        text: `Help find this wallet: ${wallet.value.title}. Lost on ${wallet.value.date} at ${wallet.value.location}`,
        url: window.location.href,
      };

      if (navigator.share) {
        navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(shareData.text);
        showToast("Alert copied to clipboard!", "info");
      }
    };

    const printDetails = () => {
      window.print();
    };

    const showToast = (message, type = "info") => {
      toastMessage.value = message;
      toastType.value = type;

      if (toastInstance) {
        toastInstance.show();
      }
    };

    // Lifecycle
    onMounted(() => {
      // Initialize Bootstrap Toast
      if (toast.value) {
        toastInstance = new Toast(toast.value, {
          autohide: true,
          delay: 3000,
        });
      }

      // Add custom styles
      const style = document.createElement("style");
      style.textContent = `
        .bg-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .detail-card {
          background: #f8f9fa;
          border-radius: 10px;
          border-left: 4px solid #667eea;
          transition: transform 0.2s;
        }
        
        .detail-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .header-icon {
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .badge.bg-light:hover {
          background: #e9ecef !important;
        }
        
        @media print {
          .btn, .toast-container {
            display: none !important;
          }
          
          .card {
            border: 1px solid #000 !important;
            box-shadow: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    });

    return {
      wallet,
      showContact,
      toastMessage,
      toastType,
      toast,
      formattedDate,
      timeAgo,
      statusClass,
      statusBadgeClass,
      toastClass,
      toastIcon,
      getItemIcon,
      toggleContact,
      markAsFound,
      shareAlert,
      printDetails,
      showToast,
    };
  },
};
</script> -->

<!-- <style scoped>
/* Additional custom styles */
.card {
  border-width: 2px !important;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.badge {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.btn {
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.toast {
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Animation for status badge */
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}

.badge.bg-danger {
  animation: pulse 2s infinite;
}
</style> -->

<template>
  <teleport to="body">
    <div v-if="modelValue" class="modal-wrapper">
      <!-- backdrop blocks clicks -->
      <div class="my-backdrop"></div>

      <!-- modal content -->
      ,
      <div class="row">
        <div class="my-modal col-12 col-md-7 col-xl-6">
          <div
            class="modal-header p-3 d-flex justify-content-between align-items-center"
          >
            <h2 class="m-0">{{ data.title }}</h2>
            <button class="btn-close" @click="close"></button>
          </div>
          <div class="modal-body px-5 py-3">
            <div class="row">
              <div class="col-12 col-md-6 col-xl-6 px-3">
                <div class="d-flex gap-2 mb-3">
                  <span
                    class="status"
                    :class="data.reportType.name.toLowerCase()"
                  >
                    {{ data.reportType.name }}
                  </span>
                  <span class="status" :class="data.status.toLowerCase()">
                    {{ data.status }}
                  </span>
                </div>
                <span class="fs-5 fw-bold">Description</span>
                <p class="card-text text-muted py-3">{{ data.description }}</p>
                <ul class="row p-0" style="list-style-type: none">
                  <li
                    class="col-12 col-lg-12 col-xl-6 d-flex gap-2 mb-2"
                    v-for="(item, index) in detail"
                    :key="index"
                  >
                    <span class="icon"><i :class="item.icon"></i></span>
                    <span class="d-flex flex-column">
                      <span class="title">{{ item.title }}</span>

                      <span class="value">
                        {{ item.value }}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
              <div class="col-12 col-md-6 col-xl-6">
                <div class="row">
                  <div
                    class="col-12 d-flex justify-content-center position-relative"
                  >
                    <img
                      v-if="hasImages"
                      :src="currentImage"
                      alt="Report image"
                      class="ms-auto w-100"
                    />

                    <img
                      v-else
                      src="https://tse2.mm.bing.net/th/id/OIP.b8bpZyFwupiioDofQPXo_gAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
                      alt="Default image"
                      class="ms-auto w-100"
                      style="max-height: 500px"
                    />
                    <button
                      class="btn"
                      style="position: absolute; left: 0; top: 50%"
                      @click="prevImage"
                      :isDisabled="!canPrev"
                    >
                      <i class="bi bi-chevron-left"></i>
                    </button>
                    <button
                      class="btn"
                      style="position: absolute; right: 0; top: 50%"
                      @click="nextImage"
                      :isDisabled="!canNext"
                    >
                      <i class="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal-footer p-3 padding justify-content-start align-items-center gap-2"
          >
            <img class="avatar" :src="data.reporter.avatar" alt="" />

            <div class="d-flex flex-column">
              <span>{{ data.reporter.fullname }}</span>
              <span class="text-muted" style="font-size: 14px">
                <span>Report ID: #{{ data.id }}.</span>
                <span>Created At {{ formatDate(data.createdAt) }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { watch, onUnmounted, ref } from "vue";
import { formatDate } from "@/utils/formatDate";
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const detail = ref([]);

watch(
  () => props.data,
  (data) => {
    if (!data) return;
    detail.value = [
      {
        icon: "bi bi-tag",
        title: "Category",
        value: data.category?.name || "-",
      },
      {
        icon: "bi bi-person",
        title: "Reporter",
        value: data.reporter?.fullname || "-",
      },
      {
        icon: "bi bi-geo-alt-fill",
        title: "Location",
        value: data.locationText,
      },
      {
        icon: "bi bi-envelope",
        title: "Email",
        value: data.reporter?.email,
      },
      {
        icon: "bi bi-calendar",
        title: "Event Date",
        value: formatDate(data.eventDate),
      },
      {
        icon: "bi bi-telephone-fill",
        title: "Phone",
        value: data.reporter?.phoneNumber || "-",
      },
      {
        icon: "bi bi-telegram",
        title: "Telegram Link",
        value: data.reporter?.telegramLink || "-",
      },
    ];
  },
  { immediate: true },
);

const emit = defineEmits(["update:modelValue"]);

const close = () => emit("update:modelValue", false);

// lock scroll
watch(
  () => props.modelValue,
  (open) => {
    document.body.style.overflow = open ? "hidden" : "";
  },
  { immediate: true },
);

onUnmounted(() => {
  document.body.style.overflow = "";
});

// report img showing

const currentImageIndex = ref(0);
watch(
  () => props.data,
  () => {
    currentImageIndex.value = 0;
  },
);

const hasImages = computed(() => props.data?.reportImages?.length > 0);

const imageCount = computed(() => props.data?.reportImages?.length || 0);

const currentImage = computed(() =>
  hasImages.value
    ? props.data.reportImages[currentImageIndex.value].name
    : null,
);

const canPrev = computed(
  () => imageCount.value > 1 && currentImageIndex.value > 0,
);

const canNext = computed(
  () => imageCount.value > 1 && currentImageIndex.value < imageCount.value - 1,
);
const prevImage = () => {
  if (canPrev.value) currentImageIndex.value--;
};

const nextImage = () => {
  if (canNext.value) currentImageIndex.value++;
};
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.my-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  pointer-events: auto; /* blocks clicks */
}

.my-modal {
  position: fixed;
  z-index: 1001;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  /* max-width: 900px; */
}
.my-modal .modal-footer {
  border-top: 1px solid #000;
}
.my-modal .modal-header {
  border-bottom: 1px solid #000;
}
.status {
  background: rgba(211, 211, 211, 0.4);
  color: rgba(0, 0, 0, 0.4);
  padding: 6px 15px;
  border-radius: 50px;
  font-size: 14px;
}
.lost {
  background: rgb(255, 0, 0);
  color: rgb(255, 255, 255);
}
.found {
  background: rgb(0, 211, 0);
  color: rgb(255, 255, 255);
}
.active {
  background: rgba(0, 0, 255, 0.2);
  color: rgba(0, 0, 255, 0.8);
}
.resolved {
  background: rgba(92, 92, 92, 0.5);
  color: rgba(255, 255, 255, 0.8);
}
.icon {
  font-size: 22px;
  color: rgb(126, 126, 126);
}
.title {
  font-size: 14px;
  color: rgb(126, 126, 126);
}
.value {
  font-size: 16px;
  color: black;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>

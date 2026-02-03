<template>
  <div class="container py-4">
    <div
      class="card border-0 shadow-lg mx-auto overflow-hidden p-3"
      style="border-radius: 20px; max-width: 700px"
    >
      <!-- Header -->
      <div class="p-4 border-bottom bg-light px-5">
        <div class="mb-4">
          <BaseButton class="col-6 w-auto" variant="dark" @click="goBack">
            ត្រឡប់ក្រោយ
          </BaseButton>
        </div>
        <h2 class="fw-bold text-dark mb-3 text-center font-khmer">
          {{ isEdit ? "កែប្រែការរាយការណ៍" : "បង្កើតការរាយការណ៍ថ្មី" }}
        </h2>
        <!-- Report Type Buttons -->
        <div
          class="bg-white p-1 rounded-pill shadow-sm d-flex"
          style="border: 1px solid #eee"
        >
          <button
            type="button"
            class="btn rounded-pill w-100 fw-bold transition-all font-khmer"
            :class="
              reportTypeId === 1 ? 'btn-danger shadow' : 'btn-light text-muted'
            "
            @click="selectReportType(1)"
          >
            បាត់របស់
          </button>
          <button
            type="button"
            class="btn rounded-pill w-100 fw-bold transition-all font-khmer"
            :class="
              reportTypeId === 2 ? 'btn-success shadow' : 'btn-light text-muted'
            "
            @click="selectReportType(2)"
          >
            រើសបានរបស់
          </button>
        </div>
      </div>

      <!-- Form Body -->
      <div class="card-body p-4 p-md-5">
        <form @submit.prevent="handleSubmit">
          <div class="mb-4" v-if="isEdit">
            <label class="fw-bold mb-2 d-block">Status</label>

            <div class="d-flex gap-2">
              <button
                type="button"
                :class="[
                  'btn rounded-pill px-4 py-2',
                  data.status === 'ACTIVE'
                    ? 'btn-primary text-white shadow-sm'
                    : 'btn-outline-secondary',
                ]"
                @click="data.status = 'ACTIVE'"
              >
                Active
              </button>

              <button
                type="button"
                :class="[
                  'btn rounded-pill px-4 py-2',
                  data.status === 'RESOLVED'
                    ? 'btn-success text-white shadow-sm'
                    : 'btn-outline-secondary',
                ]"
                @click="data.status = 'RESOLVED'"
              >
                Resolved
              </button>
            </div>
          </div>
          <!-- Title -->
          <div class="mb-4">
            <div class="form-floating mb-3">
              <input
                v-model="data.title"
                type="text"
                class="form-control border-0 bg-light rounded-4 shadow-none"
                id="title"
                placeholder="ចំណងជើង"
                required
              />

              <label for="title">
                {{
                  reportTypeId === 1
                    ? "តើអ្នកបានបាត់អ្វី?"
                    : "តើអ្នកបានរើសបានអ្វី?"
                }}
              </label>
              <small class="text-danger">{{ errors.title }}</small>
            </div>

            <!-- Category & Date -->
            <div class="row g-3 mb-4">
              <div class="col-md-6">
                <div class="form-floating">
                  <select
                    v-model="data.categoryId"
                    class="form-select border-0 bg-light rounded-4 shadow-none"
                  >
                    <option
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                  <label>ប្រភេទរបស់</label>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-floating">
                  <input
                    v-model="data.eventDate"
                    type="date"
                    class="form-control border-0 bg-light rounded-4 shadow-none"
                  />
                  <label>កាលបរិច្ឆេទ</label>
                  <small class="text-danger">{{ errors.eventDate }}</small>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="form-floating mb-3">
              <textarea
                v-model="data.description"
                class="form-control border-0 bg-light rounded-4 shadow-none"
                id="description"
                placeholder="ព័ត៌មានលម្អិត"
                style="min-height: 300px"
                required
              />
              <label for="description">{{
                reportTypeId == 1
                  ? "ព័ត៌មានលម្អិតសម្អិតវត្ថុដែលបានបាត់"
                  : "ព័ត៌មានលម្អិតសម្អិតវត្ថុដែលបានរើសបាន"
              }}</label>
              <small class="text-danger">{{ errors.description }}</small>
            </div>
          </div>

          <!-- Image Upload -->
          <div class="mb-4">
            <label
              class="form-label small text-uppercase fw-bold text-secondary font-khmer"
            >
              រូបភាព
            </label>
            <div
              class="upload-container border-2 border-dashed rounded-4 p-4 text-center bg-light"
            >
              <input
                type="file"
                id="fileInput"
                class="d-none"
                multiple
                @change="handleFileUpload"
                accept="image/*"
              />
              <label for="fileInput" class="cursor-pointer">
                <i class="bi bi-camera-fill h1 text-primary"></i>
                <p class="mb-0 text-muted font-khmer font-sm">
                  ចុចដើម្បីបន្ថែមរូបភាព
                </p>
              </label>

              <div
                v-if="previewUrls.length"
                class="d-flex flex-wrap gap-2 mt-3 justify-content-start"
              >
                <div
                  v-for="(url, index) in previewUrls"
                  :key="index"
                  class="position-relative"
                >
                  <img
                    :src="url"
                    class="rounded-3 shadow-sm"
                    style="width: 70px; height: 70px; object-fit: cover"
                  />
                  <span
                    @click="removeImage(index)"
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cursor-pointer d-flex justify-content-center align-items-center"
                    style="width: 25px; height: 25px; font-size: 18px"
                  >
                    <i class="bi bi-x"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Location & Phone -->
          <div
            class="mb-4 p-3 rounded-4 bg-light border border-white shadow-sm"
          >
            <div class="input-group mb-2">
              <span class="input-group-text bg-white border-0">
                <i class="bi bi-geo-alt text-primary"> </i>
              </span>
              <input
                v-model="data.locationText"
                type="text"
                class="form-control border-0 font-khmer shadow-none"
                placeholder="សូមបញ្ចូលទីតាំង"
              />
              <br />
            </div>
            <small class="text-danger">{{ errors.locationText }}</small>
            <div class="row g-2">
              <div class="col">
                <input
                  v-model="data.latitude"
                  type="text"
                  class="form-control form-control-sm border-0 bg-white"
                  placeholder="latitude"
                />
                <small class="text-danger">{{ errors.latitude }}</small>
              </div>
              <div class="col">
                <input
                  v-model="data.longitude"
                  type="text"
                  class="form-control form-control-sm border-0 bg-white"
                  placeholder="longitude"
                />
                <small class="text-danger">{{ errors.longitude }}</small>
              </div>
            </div>
          </div>

          <div class="mb-5">
            <div class="row g-3">
              <div class="col-md-6">
                <input
                  v-model="data.phoneNumber"
                  type="tel"
                  class="form-control bg-light border-0 py-3 rounded-4 shadow-none"
                  placeholder="លេខទូរស័ព្ទ"
                />
                <small class="text-danger">{{ errors.phoneNumber }}</small>
              </div>
              <div class="col-md-6">
                <input
                  v-model="data.telegramLink"
                  type="text"
                  class="form-control bg-light border-0 py-3 rounded-4 shadow-none"
                  placeholder="តេឡេក្រាម"
                />
                <small class="text-danger">{{ errors.telegramLink }}</small>
              </div>
            </div>
          </div>

          <BaseButton
            variant="primary"
            type="submit"
            class="w-100 py-3 rounded-pill fw-bold shadow-lg"
            :isLoading="isLoading"
          >
            {{ isEdit ? "រក្សាទុកការកែប្រែ" : "បង្កើតការរាយការណ៍" }}
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import dayjs from "dayjs";
import router from "@/router";

const props = defineProps({
  initialData: {
    type: Object,
  },
  isEdit: { type: Boolean, default: false },
  categories: { type: Array, default: () => [] },
  isResetForm: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
onMounted(() => {
  console.log(props.initialData);
});
const previewUrls = ref([]);

function selectReportType(type) {
  reportTypeId.value = type;
  data.reportTypeId = type;
}

function handleFileUpload(event) {
  const files = Array.from(event.target.files);

  // push files into data.reportImages (File objects)
  data.reportImages.push(...files);

  // generate preview URLs separately
  files.forEach((file) => previewUrls.value.push(URL.createObjectURL(file)));
  console.log(data.reportImages);
}

function removeImage(index) {
  // remove both file and preview URL
  data.reportImages.splice(index, 1);
  previewUrls.value.splice(index, 1);
}

const emit = defineEmits(["onSubmit"]);

const reportTypeId = ref(props.initialData?.reportTypeId || 1);

const data = reactive({
  title: props.initialData?.title || "",
  description: props.initialData?.description || "",
  eventDate: props.initialData?.eventDate || "",
  locationText: props.initialData?.locationText || "",
  latitude: props.initialData?.latitude || "",
  longitude: props.initialData?.longitude || "",
  categoryId: props.initialData?.categoryId || 1,
  reportTypeId: reportTypeId.value,
  reportImages: [],
  phoneNumber: props.initialData?.phoneNumber || "",
  telegramLink: props.initialData?.telegramLink || "",
  status: props.initialData?.status || "ACTIVE",
});

// update form whenever initialData changes
watch(
  () => props.initialData,
  (newVal) => {
    if (newVal) {
      Object.assign(data, {
        title: newVal.title || "",
        description: newVal.description || "",
        // eventDate: newVal.eventDate || "",
        eventDate: newVal.eventDate
          ? dayjs(newVal.eventDate).format("YYYY-MM-DD")
          : "",
        locationText: newVal.locationText || "",
        latitude: newVal.latitude || "",
        longitude: newVal.longitude || "",
        categoryId: newVal.categoryId || 1,
        reportTypeId: newVal.reportTypeId || 1,
        reportImages: newVal.reportImages || [],
        phoneNumber: newVal.phoneNumber || "",
        telegramLink: newVal.telegramLink || "",
        status: newVal.status || "ACTIVE",
      });
      reportTypeId.value = data.reportTypeId;
    }
  },
  { immediate: true, deep: true },
);
//clear data
function resetForm(value) {
  if (value) {
    data.title = "";
    data.description = "";
    data.eventDate = "";
    data.locationText = "";
    data.latitude = "";
    data.longitude = "";
    data.categoryId = 1;
    data.reportTypeId = 1;
    data.reportImages = []; // clear File objects
    data.phoneNumber = "";
    data.telegramLink = "";
    reportTypeId.value = 1;
    previewUrls.value = []; // clear previews
  }
}

// function handleSubmit() {
//   emit("onSubmit", { ...data, eventDate: dayjs(data.eventDate).toISOString() });
//   resetForm(true);
// }
const goBack = () => {
  router.back();
};

const errors = reactive({
  title: "",
  description: "",
  eventDate: "",
  phoneNumber: "",
  locationText: "",
  latitude: "",
  longitude: "",
  telegramLink: "",
});

function validateForm() {
  let valid = true;

  // reset errors
  Object.keys(errors).forEach((key) => (errors[key] = ""));

  if (!data.title || data.title.length < 3) {
    errors.title = "Title must be at least 3 characters";
    valid = false;
  }

  if (!data.description || data.description.length < 10) {
    errors.description = "Description is too short";
    valid = false;
  }

  if (!data.eventDate) {
    errors.eventDate = "Please select a date";
    valid = false;
  }

  if (!data.locationText) {
    errors.locationText = "Location is required";
    valid = false;
  }

  if (data.latitude && isNaN(Number(data.latitude))) {
    errors.latitude = "Latitude must be a number";
    valid = false;
  }

  if (data.longitude && isNaN(Number(data.longitude))) {
    errors.longitude = "Longitude must be a number";
    valid = false;
  }

  if (data.telegramLink && !data.telegramLink.startsWith("http")) {
    errors.telegramLink = "Telegram link must start with http";
    valid = false;
  }

  if (data.phoneNumber && !/^[0-9]{8,15}$/.test(data.phoneNumber)) {
    errors.phoneNumber = "Invalid phone number";
    valid = false;
  }

  return valid;
}

function handleSubmit() {
  if (!validateForm()) return;

  emit("onSubmit", {
    ...data,
    eventDate: dayjs(data.eventDate).toISOString(),
  });

  resetForm(true);
}
</script>

<style scoped>
.transition-all {
  transition: all 0.3s ease;
}
.cursor-pointer {
  cursor: pointer;
}
.border-dashed {
  border-style: dashed !important;
  border-color: #dee2e6 !important;
}
.font-sm {
  font-size: 0.85rem;
}

.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
}
</style>

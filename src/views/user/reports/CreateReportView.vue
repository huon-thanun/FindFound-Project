<template>
  <div class="container p-5">
    <div class="row justify-content-center align-items-center">
      <div class="col-9">
        <div class="my-4">
          <BaseButton
            variant="dark"
            class="w-auto rounded-pill fw-bold shadow-lg"
            @click="goBack"
          >
            ត្រឡប់ក្រោយ
          </BaseButton>
        </div>
        <div class="card">
          <div class="card-header py-5">
            <h3 class="fw-bold text-center">ការបង្កើតរបាយការណ៍</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit" class="p-5">
              <div class="row">
                <!-- Report reportTypeId  -->
                <div class="col-12">
                  <div class="mb-4">
                    <div class="btn-group-report-type">
                      <button
                        type="button"
                        @click="data.reportTypeId = '1'"
                        :class="[
                          'btn btn-report-type no-border-right-radius',
                          data.reportTypeId === '1'
                            ? 'btn-danger'
                            : 'btn-no-border text-danger ',
                        ]"
                      >
                        Lost
                      </button>

                      <button
                        type="button"
                        @click="data.reportTypeId = '2'"
                        :class="[
                          'btn btn-report-type no-border-left-radius',
                          data.reportTypeId === '2'
                            ? 'btn-success'
                            : 'btn-no-border text-success',
                        ]"
                      >
                        Found
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Title  -->
                <div class="col-12">
                  <div class="mb-4">
                    <label for="input-title" class="form-label">
                      ចំណងជើង
                      <span class="text-danger"> * </span>
                    </label>
                    <input
                      v-model="data.title"
                      type="text"
                      id="input-title"
                      :class="[
                        'form-control form-control-custom',
                        errorInput.title.error ? 'border-danger' : '',
                      ]"
                      placeholder="Enter Title"
                    />
                    <span
                      v-if="errorInput.title.error"
                      class="validation-msg text-danger"
                    >
                      {{ errorInput.title.msg }}
                    </span>
                  </div>
                </div>

                <!-- Category  -->
                <div class="col-12 col-xl-6">
                  <div class="mb-4">
                    <label for="select-category" class="form-label">
                      Category
                      <span class="text-danger"> * </span>
                    </label>
                    <select
                      v-model="data.category"
                      class="form-select form-select-custom"
                      id="select-category"
                      :class="[
                        'form-control form-control-custom',
                        errorInput.category.error ? 'border-danger' : '',
                      ]"
                    >
                      <option value="">Select Category</option>
                      <option
                        v-for="category in categoryStore.categories"
                        :key="category.id"
                        :value="category.id"
                      >
                        {{ category.name }}
                      </option>
                    </select>
                    <span
                      v-if="errorInput.category.error"
                      class="validation-msg text-danger"
                    >
                      {{ errorInput.category.msg }}
                    </span>
                  </div>
                </div>

                <!-- Event Date  -->
                <div class="col-12 col-xl-6">
                  <div class="mb-4">
                    <label for="input-date" class="form-label">
                      Event Date
                      <span class="text-danger"> * </span>
                    </label>
                    <input
                      v-model="data.eventDate"
                      type="date"
                      id="input-date"
                      :class="[
                        'form-control form-control-custom',
                        errorInput.eventDate.error ? 'border-danger' : '',
                      ]"
                      placeholder="Enter Event Date"
                    />
                    <span
                      v-if="errorInput.eventDate.error"
                      class="validation-msg text-danger"
                    >
                      {{ errorInput.eventDate.msg }}
                    </span>
                  </div>
                </div>

                <!-- Description  -->
                <div class="col-12">
                  <div class="mb-4">
                    <label for="input-desc" class="form-label">
                      Description
                      <span class="text-danger"> * </span>
                    </label>
                    <textarea
                      v-model="data.description"
                      id="input-desc"
                      :class="[
                        'form-control form-control-custom',
                        errorInput.description.error ? 'border-danger' : '',
                      ]"
                      style="min-height: 150px"
                      placeholder="Write Something"
                    ></textarea>
                    <span
                      v-if="errorInput.description.error"
                      class="validation-msg text-danger"
                    >
                      {{ errorInput.description.msg }}
                    </span>
                  </div>
                </div>

                <!-- Upload Image -->
                <div class="col-12">
                  <div class="mb-4">
                    <label for="input-images" class="form-label">
                      Upload Images
                      <!-- <span class="text-danger"> * </span> -->
                    </label>
                    <input
                      ref="fileInput"
                      type="file"
                      id="input-images"
                      class="form-control form-control-custom d-none"
                      multiple
                      @change="handleFileUpload"
                    />
                    <div
                      class="upload-img p-5 d-flex justify-content-center align-items-center mb-4"
                    >
                      <div class="box d-flex flex-column align-items-center">
                        <i class="bi bi-upload" style="font-size: 50px"></i>
                        <BaseButton variant="primary" @click="handleUploadImg">
                          Browse
                        </BaseButton>
                        <span class="fs-5 py-2"
                          >ចុចប៊ូតុងដើម្បីបញ្ចូលរូបភាព</span
                        >
                      </div>
                    </div>
                    <!-- Preview Images -->
                    <div class="preview-grid" v-if="previewUrls.length">
                      <div
                        v-for="(url, index) in previewUrls"
                        :key="index"
                        class="preview-wrapper"
                      >
                        <img :src="url" class="preview" />
                        <span class="remove-btn" @click="removeImage(index)"
                          >×</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Latitude & Longitude  -->
                <div class="col-12">
                  <div class="row">
                    <!-- Location  -->
                    <div class="col-6">
                      <div class="mb-4">
                        <label for="input-location" class="form-label">
                          Location
                          <span class="text-danger"> * </span>
                        </label>
                        <input
                          v-model="data.location"
                          type="text"
                          id="input-location"
                          :class="[
                            'form-control form-control-custom',
                            errorInput.location.error ? 'border-danger' : '',
                          ]"
                          placeholder="Enter Location"
                        />
                        <span
                          v-if="errorInput.location.error"
                          class="validation-msg text-danger"
                        >
                          {{ errorInput.location.msg }}
                        </span>
                      </div>
                    </div>

                    <!-- Latitude  -->
                    <div class="col-3">
                      <div class="mb-4">
                        <label for="input-latitude" class="form-label">
                          Latitude
                          <span class="text-danger"> * </span>
                        </label>
                        <input
                          v-model="data.latitude"
                          type="text"
                          id="input-latitude"
                          :class="[
                            'form-control form-control-custom',
                            errorInput.latitude.error ? 'border-danger' : '',
                          ]"
                          placeholder="Enter Latitude"
                        />
                        <span
                          v-if="errorInput.latitude.error"
                          class="validation-msg text-danger"
                        >
                          {{ errorInput.latitude.msg }}
                        </span>
                      </div>
                    </div>

                    <!-- Longitude  -->
                    <div class="col-3">
                      <div class="mb-4">
                        <label for="input-longitude" class="form-label">
                          Longitude
                          <span class="text-danger"> * </span>
                        </label>
                        <input
                          v-model="data.longitude"
                          type="text"
                          id="input-longitude"
                          :class="[
                            'form-control form-control-custom',
                            errorInput.longitude.error ? 'border-danger' : '',
                          ]"
                          placeholder="Enter Longitude"
                        />
                        <span
                          v-if="errorInput.longitude.error"
                          class="validation-msg text-danger"
                        >
                          {{ errorInput.longitude.msg }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Phone Number  -->
                <div class="col-12 col-xl-6">
                  <div class="mb-4">
                    <label for="input-phone" class="form-label">
                      Phone Number
                      <span class="text-danger"> * </span>
                    </label>
                    <input
                      v-model="data.phone"
                      type="text"
                      id="input-phone"
                      :class="[
                        'form-control form-control-custom',
                        errorInput.phone.error ? 'border-danger' : '',
                      ]"
                      placeholder="Enter Phone Number"
                    />
                    <span
                      v-if="errorInput.phone.error"
                      class="validation-msg text-danger"
                    >
                      {{ errorInput.phone.msg }}
                    </span>
                  </div>
                </div>

                <!-- Telegram Link  -->
                <div class="col-12 col-xl-6">
                  <div class="mb-4">
                    <label for="input-telegram" class="form-label">
                      Telegram Link
                      <span class="text-danger"> * </span>
                    </label>
                    <input
                      v-model="data.telegramLink"
                      type="text"
                      id="input-telegram"
                      :class="[
                        'form-control form-control-custom',
                        errorInput.telegramLink.error ? 'border-danger' : '',
                      ]"
                      placeholder="Enter Telegram Link"
                    />
                    <span
                      v-if="errorInput.telegramLink.error"
                      class="validation-msg text-danger"
                    >
                      {{ errorInput.telegramLink.msg }}
                    </span>
                  </div>
                </div>
                <!-- Submit Button  -->
                <div class="col-12">
                  <div class="my-4">
                    <BaseButton
                      variant="primary"
                      type="submit"
                      class="w-100 rounded-pill fw-bold shadow-lg"
                      :isLoading="isLoading"
                    >
                      Submit
                    </BaseButton>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Message Model  -->
    <BaseModal :icon="msgIcon" :theme="'success'" :isClose="showMessageModal">
      <template #body>
        <p class="fs-3">{{ message }}</p>
      </template>

      <template #btnActive>
        <BaseButton
          icon="box"
          class="col-6"
          variant="success"
          @click="btnCloseMessage"
        >
          យល់ព្រម
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { useReportStore } from "@/stores/reportStore";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const data = reactive({
  reportTypeId: "1",
  title: "",
  eventDate: "",
  category: "",
  description: "",
  images: [],
  location: "",
  latitude: "",
  longitude: "",
  phone: "",
  telegramLink: "",
});

const errorInput = reactive({
  title: { error: false, msg: "" },
  category: { error: false, msg: "" },
  eventDate: { error: false, msg: "" },
  description: { error: false, msg: "" },
  location: { error: false, msg: "" },
  latitude: { error: false, msg: "" },
  longitude: { error: false, msg: "" },
  phone: { error: false, msg: "" },
  telegramLink: { error: false, msg: "" },
});

const categoryStore = useCategoryStore();
const reportStore = useReportStore();

const router = useRouter();

onMounted(async () => {
  await categoryStore.fetchCategories();
  console.log(categoryStore.categories);
});

const clearData = () => {
  data.reportTypeId = "1";
  data.title = "";
  data.eventDate = "";
  data.category = "";
  data.description = "";
  data.images = [];
  data.location = "";
  data.latitude = "";
  data.longitude = "";
  data.phone = "";
  data.telegramLink = "";
};

// Regex patterns
const regex = {
  number: /^-?\d+(\.\d+)?$/,

  url: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}([\/\w .-]*)*\/?$/,
};

// Validation function
function validateForm() {
  let isValid = true;

  // Reset all errors
  Object.keys(errorInput).forEach((key) => {
    errorInput[key].error = false;
    errorInput[key].msg = "";
  });

  // Title: required, length > 5
  if (!data.title || data.title.length < 6) {
    errorInput.title.error = true;
    errorInput.title.msg = "Title is required and must be >5 characters";
    isValid = false;
  }

  // Event Date: required
  if (!data.eventDate) {
    errorInput.eventDate.error = true;
    errorInput.eventDate.msg = "Event date is required";
    isValid = false;
  }

  // Category: required
  if (!data.category) {
    errorInput.category.error = true;
    errorInput.category.msg = "Category is required";
    isValid = false;
  }

  // Description: required, length > 10
  if (!data.description || data.description.length < 11) {
    errorInput.description.error = true;
    errorInput.description.msg =
      "Description is required and must be >10 characters";
    isValid = false;
  }

  // Location: required
  if (!data.location) {
    errorInput.location.error = true;
    errorInput.location.msg = "Location is required";
    isValid = false;
  }

  // Latitude: required, number
  if (!data.latitude || !regex.number.test(data.latitude)) {
    errorInput.latitude.error = true;
    errorInput.latitude.msg = "Latitude is required and must be a number";
    isValid = false;
  }

  // Longitude: required, number
  if (!data.longitude || !regex.number.test(data.longitude)) {
    errorInput.longitude.error = true;
    errorInput.longitude.msg = "Longitude is required and must be a number";
    isValid = false;
  }

  // Phone: required, number, 8-15 digits
  if (!data.phone || !/^[0-9]{8,15}$/.test(data.phone)) {
    errorInput.phone.error = true;
    errorInput.phone.msg = "Phone number is required and must be 8-15 digits";
    isValid = false;
  }

  // Telegram Link: required, valid link
  if (!data.telegramLink || !regex.url.test(data.telegramLink)) {
    errorInput.telegramLink.error = true;
    errorInput.telegramLink.msg =
      "Telegram link is required and must be a valid URL";
    isValid = false;
  }

  return isValid;
}
const previewUrls = ref([]);
function handleFileUpload(event) {
  const files = Array.from(event.target.files); // convert FileList to array
  // Add new files to existing images
  data.images.push(...files);
  console.log(data.images);

  // Generate preview URLs
  previewUrls.value.push(...files.map((file) => URL.createObjectURL(file)));
}

function removeImage(index) {
  // Remove the image and URL at the index
  data.images.splice(index, 1);
  previewUrls.value.splice(index, 1);
}

const fnHandleCreateReport = async (formData) => {
  await reportStore.creatOwnReport(formData);
};

const showMessageModal = ref(false);
const msgIcon = ref("");
const isLoading = ref(false);
const message = ref("");
const handleSubmit = () => {
  if (validateForm()) {
    console.log("Form is valid. Submit data:", data);
    //Create formData
    const formData = new FormData();

    // Append normal fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("eventDate", data.eventDate);
    formData.append("locationText", data.location);
    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    formData.append("categoryId", data.category);
    formData.append("reportTypeId", data.reportTypeId);
    formData.append("phoneNumber", data.phone);
    formData.append("telegramLink", data.telegramLink);

    // Append images (multiple)
    if (data.images && data.images.length > 0) {
      data.images.forEach((file, index) => {
        formData.append("reportImages", file); // name images[] to send array
      });
    }
    isLoading.value = true;
    // Call API or do next action
    try {
      fnHandleCreateReport(formData);
      console.log(reportStore.msgCreateOwnReport);
      console.log(reportStore.msgCreateOwnReport.message);
      if (reportStore.msgCreateOwnReport?.result) {
        msgIcon.value = "check-lg";
        message.value = reportStore.msgCreateOwnReport.message;
        console.log(message.value);
      }
    } catch (error) {
      // Handle API/network errors
      console.error(error);
      msgIcon.value = "x-lg";

      // If your API sends response in error.response.data, you can do:
      if (error?.response?.data?.message) {
        message.value = error.response.data.message;
      } else {
        message.value = "Failed to create report. Please try again.";
      }
    } finally {
      isLoading.value = false;
      showMessageModal.value = true;
    }
  } else {
    console.log("Validation errors:", errorInput);
    return;
  }
};
const btnCloseMessage = () => {
  showMessageModal.value = false;
  clearData();
  router.push({ name: "own-reports" });
};
const goBack = () => {
  router.back();
};
const fileInput = ref(null);

const handleUploadImg = () => {
  fileInput.value.click();
};
</script>
<style scoped>
.btn-group-report-type {
  width: 100%;
  background-color: #eee;
  border-radius: 22px;
  padding: 10px;
}
.btn-report-type {
  font-weight: bold;
  width: 50%;
  font-size: 18px;
  border-radius: 15px;
}
.btn-report-type:hover {
  outline: 1px solid black;
}
.btn-no-border {
  border: none;
  background-color: #fff;
}
.form-control-custom,
.form-select-custom {
  font-size: 16px;
  padding: 10px;
  background-color: #eee;
}
.form-control-custom:focus,
.form-select-custom:focus {
  box-shadow: none;
  border-color: var(--primary-color);
}
.no-border-left-radius {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.no-border-right-radius {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.validation-msg {
  display: inline-block;
  font-size: 14px;
  margin-top: 6px;
  padding-left: 3px;
}
/* --------------- */
.preview-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.preview-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.remove-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  background: red;
  color: white;
  width: 20px;
  height: 20px;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
}
/* ------------------- */
.upload-img {
  border: 2px dashed black;
  border-radius: 10px;
  height: 250px;
}
</style>

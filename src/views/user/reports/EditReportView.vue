<template>
  <div>
    <div class="header-page w-100 p-5 text-center text-light">
      <h2>កែសម្រួលការរាយការណ៍របស់វត្ថុ</h2>
      <p>កែសម្រួលទម្រង់ព័ត៌មាននៃការរាយការណ៍</p>
      <div class="icon icon-left">
        <i class="bi bi-search"></i>
      </div>
      <div class="icon icon-right">
        <i class="bi bi-question-lg"></i>
      </div>
      <div class="icon" style="left: 25%; top: 30%">
        <i class="bi bi-box-seam"></i>
      </div>
      <div class="icon" style="right: 25%; top: 60%">
        <i class="bi bi-circle"></i>
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-md-12 col-lg-11 col-xl-10 col-xxl-10">
          <div class="my-4">
            <BaseButton
              variant="dark"
              class="w-auto rounded-pill fw-bold shadow-lg"
              @click="goBack"
            >
              ត្រឡប់ក្រោយ
            </BaseButton>
          </div>
          <div class="card mb-5">
            <div
              class="card-header py-5 d-flex flex-column align-items-center"
              style="
                border-bottom: none;
                background-color: #fff;
                border-radius: 18px;
              "
            >
              <span class="icons mb-3">
                <i class="bi bi-box-seam"></i>
              </span>
              <h3>ប្រាប់ពួកយើងអំពីរបស់របររបស់អ្នក</h3>
              <p>
                តើអ្នកបានបាត់ឬរកឃើញអ្វី?
                បំពេញទម្រង់ដើម្បីជួយពួកយើងកំណត់អត្តសញ្ញាណរបស់វា។
              </p>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleSubmit" class="p-5">
                <div class="row">
                  <!-- ReportType & Status  -->
                  <div class="col-12">
                    <div class="row">
                      <!-- Report reportTypeId  -->
                      <div class="col-md-12 col-xxl-6">
                        <div class="mb-4">
                          <label class="form-label">
                            ប្រភេទនៃការរបាយការណ៍
                          </label>
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
                      <!-- Status  -->
                      <div class="col-md-12 col-xxl-6">
                        <div class="mb-4">
                          <label class="form-label"> Status </label>
                          <div class="btn-group-status ms-auto">
                            <button
                              type="button"
                              @click="data.status = 'ACTIVE'"
                              :class="[
                                'btn btn-status no-border-right-radius',
                                data.status === 'ACTIVE'
                                  ? 'btn-primary'
                                  : 'btn-no-border text-primary ',
                              ]"
                            >
                              Active
                            </button>

                            <button
                              type="button"
                              @click="data.status = 'RESOLVED'"
                              :class="[
                                'btn btn-status no-border-left-radius',
                                data.status === 'RESOLVED'
                                  ? 'btn-secondary'
                                  : 'btn-no-border text-secondary',
                              ]"
                            >
                              Resolved
                            </button>
                          </div>
                        </div>
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
                        ប្រភេទ
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
                        <option value="">ជ្រើសរើសប្រភេទ</option>
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
                        កាលបរិច្ឆេទនៃព្រឹត្តិការណ៍(ខែ/ថ្ងៃ/ឆ្នាំ)
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
                        ព័ត៌មានលម្អិត
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
                        placeholder="សរសេរព័ត៌មានលម្អិត"
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
                        បញ្ចូលរូបភាព
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
                          <BaseButton
                            variant="primary"
                            @click="handleUploadImg"
                          >
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
                      <span
                        v-if="errorInput.images.error"
                        class="validation-msg text-danger"
                      >
                        {{ errorInput.images.msg }}
                      </span>
                    </div>
                  </div>

                  <!--  Location Latitude & Longitude  -->
                  <div class="col-12">
                    <div class="row">
                      <!-- Location  -->
                      <div class="col-6">
                        <div class="mb-4">
                          <label for="input-location" class="form-label">
                            ទីតាំង
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
                            placeholder="ទីតាំង​ព្រឹត្តិការណ៍"
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
                          </label>
                          <input
                            v-model="data.latitude"
                            type="text"
                            id="input-latitude"
                            :class="[
                              'form-control form-control-custom',
                              errorInput.latitude.error ? 'border-danger' : '',
                            ]"
                            placeholder="បញ្ចូល Latitude"
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
                          </label>
                          <input
                            v-model="data.longitude"
                            type="text"
                            id="input-longitude"
                            :class="[
                              'form-control form-control-custom',
                              errorInput.longitude.error ? 'border-danger' : '',
                            ]"
                            placeholder="បញ្ចូល Longitude"
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
                        លេខទូរសព្ទ
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
                        placeholder="បញ្ចូលលេខទូរសព្ទ"
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
                        placeholder="បញ្ចូលតំណភ្ជាប់Telegram"
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
                        រក្សាទុកការកែប្រែ
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
      <BaseModal
        :icon="msgIcon"
        :theme="themeColor"
        :isClose="showMessageModal"
      >
        <template #body>
          <p class="fs-3">{{ message }}</p>
        </template>

        <template #btnActive>
          <BaseButton
            icon="box"
            class="col-6"
            :variant="themeColor"
            @click="btnCloseMessage"
          >
            យល់ព្រម
          </BaseButton>
        </template>
      </BaseModal>
    </div>
  </div>
</template>
<script setup>
import { useCategoryStore } from "@/stores/categoryStore";
import { useReportStore } from "@/stores/reportStore";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

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
  status: "",
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
  images: { error: false, msg: "" },
});

const categoryStore = useCategoryStore();
const reportStore = useReportStore();

const router = useRouter();
const route = useRoute();
const reportId = ref(route.params.id);

onMounted(async () => {
  await Promise.all([
    categoryStore.fetchCategories(),
    reportStore.getReportById(reportId.value),
  ]);
  console.log(categoryStore.categories);
  console.log(reportStore.report);
  console.log(reportStore.report.reportType.id);

  const report = reportStore.report;

  data.title = report.title;
  data.description = report.description;
  data.category = report.category.id;
  //   data.eventDate = report.eventDate;
  data.eventDate = report.eventDate ? report.eventDate.split("T")[0] : "";
  data.location = report.locationText;
  data.latitude = report.latitude;
  data.longitude = report.longitude;
  data.reportTypeId = String(reportStore.report.reportType.id);
  data.phone = report.contactInformation.phoneNumber;
  data.telegramLink = report.contactInformation.telegramLink;
  data.status = report.status;
  previewUrls.value = report.reportImages.map((img) => img.name);
  data.images = [];
});

const clearData = () => {
  data.reportTypeId = "";
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
  data.status = "";
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
    errorInput.title.msg = "ចំណងជើងត្រូវបានទាមទារ និងត្រូវមានតួអក្សរច្រើនជាង 5";
    isValid = false;
  }

  // Event Date: required
  if (!data.eventDate) {
    errorInput.eventDate.error = true;
    errorInput.eventDate.msg = "កាលបរិច្ឆេទនៃព្រឹត្តិការណ៍ត្រូវបានទាមទារ";
    isValid = false;
  }

  // Category: required
  if (!data.category) {
    errorInput.category.error = true;
    errorInput.category.msg = "ប្រភេទត្រូវបានទាមទារ";
    isValid = false;
  }

  // Description: required, length > 10
  if (!data.description || data.description.length < 11) {
    errorInput.description.error = true;
    errorInput.description.msg =
      "ព័ត៌មានលម្អិតត្រូវបានទាមទារ និងត្រូវមានអក្សរច្រើនជាង10";
    isValid = false;
  }

  // Location: required
  if (!data.location) {
    errorInput.location.error = true;
    errorInput.location.msg = "ទីតាំងត្រូវបានទាមទារ";
    isValid = false;
  }

  // Latitude: number
  if (!regex.number.test(data.latitude)) {
    errorInput.latitude.error = true;
    errorInput.latitude.msg = "Latitude ត្រូវតែជលេខ";
    isValid = false;
  }

  // Longitude: number
  if (!regex.number.test(data.longitude)) {
    errorInput.longitude.error = true;
    errorInput.longitude.msg = "Longitude ត្រូវតែជលេខ";
    isValid = false;
  }

  // Phone: required, number, 8-15 digits
  if (!data.phone || !/^[0-9]{8,15}$/.test(data.phone)) {
    errorInput.phone.error = true;
    errorInput.phone.msg =
      "លេខទូរសព្ទត្រូវបានទាមទារ និងមានចំនួនចាប់ពី8-15សខ្ទង់";
    isValid = false;
  }

  // Telegram Link: required, valid link
  if (!data.telegramLink || !regex.url.test(data.telegramLink)) {
    errorInput.telegramLink.error = true;
    errorInput.telegramLink.msg =
      "តំណភ្ជាប់ Telegram ត្រូវបានទាមទារ និងត្រូវតែជា URL ត្រឹមត្រូវ";
    isValid = false;
  }

  // Upload Images: Max=3
  if (data.images.length > 3) {
    errorInput.images.error = true;
    errorInput.images.msg = "រូបភាពច្រើនជាង3";
    isValid = false;
  }

  return isValid;
}
const previewUrls = ref([]);
// function handleFileUpload(event) {
//   const files = Array.from(event.target.files); // convert FileList to array
//   // Add new files to existing images
//   data.images.push(...files);
//   console.log(data.images);

//   // Generate preview URLs
//   previewUrls.value.push(...files.map((file) => URL.createObjectURL(file)));
// }
function handleFileUpload(event) {
  const files = Array.from(event.target.files);

  const total = data.images.length + files.length;

  // block if over 3
  if (total > 3) {
    errorInput.images.error = true;
    errorInput.images.msg = "អាចបញ្ចូលរូបភាពបានតែ 3 ប៉ុណ្ណោះ";

    // reset input so user can reselect
    event.target.value = "";
    return;
  }

  // clear error
  errorInput.images.error = false;
  errorInput.images.msg = "";

  data.images.push(...files);
  previewUrls.value.push(...files.map((f) => URL.createObjectURL(f)));
}

function removeImage(index) {
  // Remove the image and URL at the index
  data.images.splice(index, 1);
  previewUrls.value.splice(index, 1);
}

const fnHandleEditReport = async (formData) => {
  await reportStore.editOwnReport(reportId.value, formData);
};

const showMessageModal = ref(false);
const msgIcon = ref("");
const isLoading = ref(false);
const message = ref("");
const themeColor = ref("danger");
const handleSubmit = async () => {
  if (validateForm()) {
    console.log("Form is valid. Submit data:", data);
    //Create formData
    const formData = new FormData();

    // Append normal fields as strings
    formData.append("title", String(data.title));
    formData.append("description", String(data.description));
    formData.append("eventDate", String(data.eventDate));
    // const timestamp = new Date(data.eventDate).getTime(); // number
    // formData.append("eventDate", String(timestamp)); // numeric string

    formData.append("locationText", String(data.location));
    formData.append("latitude", String(data.latitude)); // <-- use String
    formData.append("longitude", String(data.longitude)); // <-- use String
    formData.append("categoryId", String(data.category)); // <-- use String
    formData.append("reportTypeId", String(data.reportTypeId)); // <-- use String
    formData.append("phoneNumber", String(data.phone));
    formData.append("telegramLink", String(data.telegramLink));
    formData.append("status", String(data.status));

    // Append images
    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => {
        formData.append("reportImages", file); // remove []
      });
    }

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    isLoading.value = true;
    // Call API or do next action
    try {
      await fnHandleEditReport(formData);
      console.log(reportStore.msgEditOwnReport);
      console.log(reportStore.msgEditOwnReport.message);
      if (reportStore.msgEditOwnReport?.result) {
        msgIcon.value = "check-lg";
        themeColor.value = "success";
        message.value = reportStore.msgEditOwnReport.message;
      }
    } catch (error) {
      // Handle API/network errors
      console.error(error);
      msgIcon.value = "x-lg";
      themeColor.value = "danger";

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
.header-page {
  background-color: var(--primary-color);
  position: relative;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}
.header-page .icon {
  position: absolute;
  color: rgba(214, 214, 214, 0.588) !important;
  top: 50%;
  font-size: 30px;

  transform: translateY(-50%) scale(1);
}
.icon-left {
  animation: pulse 6s infinite;
  left: 20%;
}
.icon-right {
  animation: pulse 5s infinite;
  right: 20%;
}
.icons {
  font-size: 40px;
  width: 100px;
  height: 100px;
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-group-report-type,
.btn-group-status {
  width: 100%;
  background-color: #eee;
  border-radius: 22px;
  padding: 5px;
}
.btn-report-type,
.btn-status {
  font-weight: bold;
  width: 50%;
  font-size: 18px;
  border-radius: 15px;
}
.btn-report-type:hover,
.btn-status:hover {
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

@keyframes pulse {
  0%,
  100% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-20%) scale(1.05);
  }
}
</style>

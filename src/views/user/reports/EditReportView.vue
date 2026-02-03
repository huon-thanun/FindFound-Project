<template>
  <div class="container py-4">
    <BaseLostFoundForm
      :is-edit="true"
      :categories="categoryStore.categories"
      :initialData="data"
      :is-loading="reportStore.isLoadingEditOwnReport"
      @on-submit="handleSubmitEdit"
    ></BaseLostFoundForm>

    <!--Confirm Message Modal -->
    <BaseModal :icon="'pencil-square'" :theme="'primary'" :isClose="showModal">
      <template #body>
        <p>តើអ្នកចង់រក្សាទុកការផ្លាស់ប្ដូរនេះដែរឬទេ?</p>
      </template>
      <template #btnClose>
        <BaseButton
          variant="cancel"
          icon="x-circle"
          class="col-6"
          @click="showModal = false"
        >
          បោះបង់
        </BaseButton>
      </template>
      <template #btnActive>
        <BaseButton
          icon="box"
          class="col-6"
          variant="primary"
          :isLoading="reportStore.isLoadingEditOwnReport"
          @click="btnHandleConfirmEdit"
        >
          រក្សាទុក
        </BaseButton>
      </template>
    </BaseModal>

    <!-- Message Model  -->
    <BaseModal :icon="msgIcon" :theme="'primary'" :isClose="showMessageModal">
      <template #body>
        <p>{{ message }}</p>
      </template>

      <template #btnActive>
        <BaseButton
          icon="box"
          class="col-6"
          variant="primary"
          @click="resultMessage"
        >
          យល់ព្រម
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<!-- <script setup>
import { useReportStore } from "@/stores/reportStore";
import { onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";

import BaseLostFoundForm from "@/components/base/BaseLostFoundForm.vue";
import { useCategoryStore } from "@/stores/categoryStore";

const route = useRoute(); // get current route

const reportId = ref(route.params.id); // get id from route params
const reportStore = useReportStore();
const categoryStore = useCategoryStore();

let data = reactive({});

onMounted(async () => {
  try {
    await Promise.all([
      categoryStore.fetchCategories(),

      reportStore.getReportById(reportId.value),
    ]);
    // console.log(reportStore.report);
    data = {
      title: reportStore.report.id,
      description: reportStore.report.description,
      eventDate: reportStore.report.eventDate,
      locationText: reportStore.report.locationText,
      latitude: reportStore.report.latitude,
      longitude: reportStore.report.longitude,
      categoryId: reportStore.report.category?.id,
      reportTypeId: reportStore.report.reportType?.id,
      reportImages: reportStore.report.reportImages,
      phoneNumber: reportStore.report.reporter?.phoneNumber,
      telegramLink: reportStore.report.reporter?.telegramLink,
    };
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});
</script> -->
<script setup>
import { useReportStore } from "@/stores/reportStore";
import { onMounted, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import BaseLostFoundForm from "@/components/base/BaseLostFoundForm.vue";
import { useCategoryStore } from "@/stores/categoryStore";

const route = useRoute();
const reportId = ref(route.params.id);

const reportStore = useReportStore();
const categoryStore = useCategoryStore();

// Make a fully reactive object with default values
const data = reactive({
  title: "",
  description: "",
  eventDate: "",
  locationText: "",
  latitude: "",
  longitude: "",
  categoryId: 1,
  reportTypeId: 1,
  reportImages: [],
  phoneNumber: "",
  telegramLink: "",
});

onMounted(async () => {
  try {
    await Promise.all([
      categoryStore.fetchCategories(),
      reportStore.getReportById(reportId.value),
    ]);

    // Update reactive object without reassigning
    Object.assign(data, {
      title: reportStore.report.title,
      description: reportStore.report.description,

      eventDate: reportStore.report.eventDate,
      locationText: reportStore.report.locationText,
      latitude: reportStore.report.latitude,
      longitude: reportStore.report.longitude,
      categoryId: reportStore.report.category?.id || 1,
      reportTypeId: reportStore.report.reportType?.id || 1,
      reportImages: reportStore.report.reportImages || [],
      phoneNumber: reportStore.report.contactInformation.phoneNumber,
      telegramLink: reportStore.report.contactInformation.telegramLink,
      status: reportStore.report.status || "",
    });

    console.log("Loaded report data:", data);
    console.log(reportStore.report);
  } catch (error) {
    console.error(error);
  }
});
const showModal = ref(false);
const showMessageModal = ref(false);
const msgIcon = ref("");
const message = ref("");
let items = reactive({});
const handleSubmitEdit = (payload) => {
  Object.assign(items, payload);
  showModal.value = true;
  console.log(items);
};
const btnHandleConfirmEdit = () => {
  try {
    const formData = new FormData();
    formData.append("title", items.title);
    formData.append("description", items.description);
    formData.append("eventDate", items.eventDate);
    formData.append("locationText", items.locationText);
    formData.append("latitude", items.latitude);
    formData.append("longitude", items.longitude);
    formData.append("categoryId", items.categoryId);
    formData.append("reportTypeId", items.reportTypeId);
    formData.append("phoneNumber", items.phoneNumber);
    formData.append("telegramLink", items.telegramLink);
    reportStore.editOwnReport(reportId.value, formData);
    msgIcon.value = "check-lg";
    message.value = "Report Created Successfully";
    console.log(reportStore.msgEditOwnReport);
  } catch (error) {
    msgIcon.value = "x-lg";
    message.value = "Failed to Create Report";
    console.error(error);
  } finally {
    showModal.value = false;
    showMessageModal.value = true;
  }
};
const router = useRouter();
const resultMessage = () => {
  showMessageModal.value = false;
  if (reportStore.msgEditOwnReport.result) {
    router.back();
  }
};
</script>

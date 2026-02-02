<template>
  <div class="container py-4">
    <BaseLostFoundForm
      :categories="categoryStore.categories"
      :is-reset-form="isResetForm"
      :is-loading="reportStore.isLoadingCreateOwnReport"
      @on-submit="handleSubmit"
    ></BaseLostFoundForm>
    <button @click="logData">cliick</button>
    <!-- Message Model  -->
    <BaseModal :icon="msgIcon" :theme="'primary'" :isClose="showMessageModal">
      <template #body>
        <p>{{ message }}</p>
      </template>

      <template #btnActive>
        <BaseButton class="col-6" variant="primary" @click="msgResult">
          យល់ព្រម
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { useReportStore } from "@/stores/reportStore";

import BaseLostFoundForm from "@/components/base/BaseLostFoundForm.vue";
import { useRouter } from "vue-router";

const categoryStore = useCategoryStore();
const reportStore = useReportStore();

const previews = ref([]);

// Fetch categories & report types
onMounted(async () => {
  try {
    await Promise.all([
      categoryStore.fetchCategories(),
      reportStore.getAllReportType(),
    ]);
  } catch (error) {
    console.error(error);
  }
});
const showMessageModal = ref(false);
const msgIcon = ref("");
const isResetForm = ref(false);
const message = ref("");

const handleSubmit = async (data) => {
  console.log(data);
  try {
    const formData = new FormData();

    // Append fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("eventDate", data.eventDate);
    formData.append("locationText", data.locationText);
    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    formData.append("categoryId", data.categoryId);
    formData.append("reportTypeId", data.reportTypeId);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("telegramLink", data.telegramLink);
    formData.append("reportImages", data.reportImages);

    await reportStore.creatOwnReport(formData);

    console.log("Report created:", reportStore.msgCreateOwnReport);
    msgIcon.value = "check-lg";
    message.value = "Created Successfully";
  } catch (error) {
    msgIcon.value = "x-lg";
    message.value = "failed";
    console.error(error.response?.data || error);
  } finally {
    showMessageModal.value = true;
    isResetForm.value = true;
  }
};
const router = useRouter();
const msgResult = () => {
  showMessageModal.value = false;
  if (reportStore.msgCreateOwnReport.result) {
    router.back();
  }
};
</script>

<style scoped>
.preview-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.preview {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}
</style>

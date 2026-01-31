import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/api/api";

export const useReportStore = defineStore("report", () => {
  const allReportType = ref([]);
  const allReports = ref([]);
  const isLoadingGetAllReport = ref(false);

  const getAllReportType = async () => {
    isLoadingGetAllReport.value = true;
    try {
      const res = await api.get("/report-types");
      allReportType.value = res.data.data;
    } catch (err) {
      console.error(err);
    } finally {
      isLoadingGetAllReport.value = false;
    }
  };
  const isEmpty = ref(true);
  const meta = ref(null);
  const getAllReports = async (params = {}) => {
    isLoadingGetAllReport.value = true;

    try {
      // remove empty params
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
          ([_, v]) => v !== "" && v !== null && v !== undefined,
        ),
      );

      const res = await api.get("/reports", {
        params: cleanParams,
      });

      allReports.value = res.data.data.items;
      meta.value = res.data.data.meta;
      if (allReports.value.length !== 0) {
        isEmpty.value = false;
      }
    } catch (err) {
      console.error("GET REPORTS ERROR:", err);
      isEmpty.value = false;
    } finally {
      isLoadingGetAllReport.value = false;
    }
  };
  const report = ref([]);
  const isLoadingGetAReport = ref(false);
  const getReportById = async (id) => {
    isLoadingGetAReport.value = true;
    try {
      const res = await api.get(`/reports/${id}`);
      report.value = res.data.data;
    } catch (error) {
      console.error(error);
    } finally {
      isLoadingGetAReport.value = false;
    }
  };
  const ownReports = ref([]);
  const isLoadingGetOwnReports = ref(false);
  const getOwnReports = async () => {
    try {
      isLoadingGetOwnReports.value = true;
      const res = await api.get("/reports/own");
      ownReports.value = res.data.data.items;
    } catch (error) {
      console.error(error);
    } finally {
      isLoadingGetOwnReports.value = false;
    }
  };
  const isLoadingDeleteOwnArticle = ref(false);
  const deleteMessage = ref([]);
  const deleteOwnReport = async (id) => {
    try {
      isLoadingDeleteOwnArticle.value = true;
      const res = await api.delete(`/reports/${id}`);
      deleteMessage.value = res.data;
    } catch (error) {
      console.error(error);
    } finally {
      isLoadingDeleteOwnArticle.value = false;
    }
  };
  return {
    isLoadingGetAllReport,
    isLoadingGetAReport,
    isLoadingGetOwnReports,
    isLoadingDeleteOwnArticle,
    allReportType,
    allReports,
    report,
    ownReports,
    deleteMessage,
    getAllReportType,
    getAllReports,
    getReportById,
    getOwnReports,
    deleteOwnReport,
    meta,
  };
});

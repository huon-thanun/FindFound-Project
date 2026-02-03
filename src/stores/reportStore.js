import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/api/api";
import reportApi from "@/api/reportApi";

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
  const ownReportMeta = ref(null);
  const isLoadingGetOwnReports = ref(false);
  const getOwnReports = async (params = {}) => {
    isLoadingGetOwnReports.value = true;
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
          ([_, v]) => v !== "" && v !== null && v !== undefined,
        ),
      );
      const res = await api.get("/reports/own", {
        params: cleanParams,
      });
      ownReports.value = res.data.data.items;
      ownReportMeta.value = res.data.data.meta;
      if (ownReports.value.length !== 0) {
        isEmpty.value = false;
      }
    } catch (error) {
      console.error("GET REPORTS ERROR:", error);
      isEmpty.value = false;
    } finally {
      isLoadingGetOwnReports.value = false;
    }
  };
  const isLoadingDeleteOwnReport = ref(false);
  const deleteMessage = ref([]);
  const deleteOwnReport = async (id) => {
    isLoadingDeleteOwnReport.value = true;
    try {
      const res = await api.delete(`/reports/${id}`);
      deleteMessage.value = res.data;
    } catch (error) {
      console.error(error);
    } finally {
      isLoadingDeleteOwnReport.value = false;
    }
  };

  // --------------------------------------------------------------
  const isLoadingCreateOwnReport = ref(false);
  const msgCreateOwnReport = ref([]);
  const creatOwnReport = async (formData) => {
    isLoadingCreateOwnReport.value = true;
    try {
      const res = await reportApi.post("/reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);

      msgCreateOwnReport.value = res.data;
    } catch (error) {
      throw error;
    } finally {
      isLoadingCreateOwnReport.value = false;
    }
  };
  const isLoadingEditOwnReport = ref(false);
  const msgEditOwnReport = ref([]);
  const editOwnReport = async (id, formData) => {
    isLoadingEditOwnReport.value = true;

    try {
      const res = await reportApi.put(`/reports/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      msgEditOwnReport.value = res.data;
    } catch (error) {
      console.error("Edit report error:", error.response?.data || error);
      throw error;
    } finally {
      isLoadingEditOwnReport.value = false;
    }
  };
  const matchReports = ref([]);
  const getMatchReportByid = async (id) => {
    try {
      const res = await api.get(`/matches/reports/${id}`);
      matchReports.value = res.data.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    isLoadingGetAllReport,
    isLoadingGetAReport,
    isLoadingGetOwnReports,
    isLoadingDeleteOwnReport,
    isLoadingCreateOwnReport,
    isLoadingEditOwnReport,
    allReportType,
    allReports,
    report,
    ownReports,
    deleteMessage,
    msgCreateOwnReport,
    msgEditOwnReport,
    matchReports,
    getAllReportType,
    getAllReports,
    getReportById,
    getOwnReports,
    deleteOwnReport,
    creatOwnReport,
    editOwnReport,
    getMatchReportByid,
    meta,
    ownReportMeta,
  };
});

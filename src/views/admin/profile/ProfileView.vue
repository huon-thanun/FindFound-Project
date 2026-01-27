<template>
  <div class="profile-layout">
    <!-- Sidebar (same as edit profile) -->
    <aside class="sidebar">...</aside>

    <div class="content">
      <!-- Topbar (same as edit profile) -->
      <div class="topbar">...</div>

      <!-- Avatar Box -->
      <div class="avatar-box">
        <img
          :src="form.avatar || '/default-avatar.png'"
          class="profile-avatar"
        />
      </div>

      <!-- Profile Card -->
      <div class="card profile-card">
        <h5>ព័ត៌មានគណនី</h5>

        <div class="row">
          <div class="col">
            <label>ឈ្មោះពេញ</label>
            <input :value="form.fullname" class="form-input" readonly />
          </div>
          <div class="col">
            <label>អ៊ីមែល</label>
            <input :value="form.email" class="form-input" readonly />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label>លេខទូរស័ព្ទ</label>
            <input :value="form.phoneNumber" class="form-input" readonly />
          </div>
          <div class="col">
            <label>Telegram</label>
            <input :value="form.telegramLink" class="form-input" readonly />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label>ស្ថានភាព</label>
            <input :value="form.status" class="form-input" readonly />
          </div>
          <div class="col">
            <label>តួនាទី</label>
            <input :value="form.role" class="form-input" readonly />
          </div>
        </div>

        <div class="row full">
          <label>ថ្ងៃចុះឈ្មោះ</label>
          <input :value="form.registeredAt" class="form-input" readonly />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";

const form = reactive({
  fullname: "",
  email: "",
  phoneNumber: "",
  telegramLink: "",
  avatar: "",
  status: "",
  role: "",
  registeredAt: "",
});

const token = localStorage.getItem("token");
const apiUrl = "http://ant-g2-landf.tt.linkpc.net/api/v1/auth/profile";

onMounted(async () => {
  try {
    const res = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!res.ok || !json.result) throw new Error(json.message);
    const d = json.data;
    form.fullname = d.fullname;
    form.email = d.email;
    form.avatar = d.avatar;
    form.phoneNumber = d.phoneNumber || "";
    form.telegramLink = d.telegramLink || "";
    form.status = d.status;
    form.role = d.role?.name;
    form.registeredAt = new Date(d.registeredAt).toLocaleString();
  } catch (err) {
    alert("❌ មិនអាចទាញយកទិន្នន័យបាន");
  }
});
</script>

<style scoped>
/* You can reuse the same CSS from EditProfile.vue */
</style>

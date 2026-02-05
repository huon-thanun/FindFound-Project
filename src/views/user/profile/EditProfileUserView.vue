<template>
  <ProfileLayout>
    <!-- Header -->
    <template #header>
      <ProfileHeader :user="user" />
    </template>

    <!-- Sidebar -->
    <template #left>
      <ProfileSide :user="user" :skills="skills" />
    </template>

    <div v-if="user" class="mt-5 position-relative">
      <ProfileTabs />

      <!-- Edit Profile Card -->
      <div class="card border border-purple shadow-sm rounded-4 p-4 p-md-5">
        <h5 class="fw-bold mb-4 text-purple">កែប្រែព័ត៌មានផ្ទាល់ខ្លួន</h5>

        <div class="row g-4">
          <!-- Avatar -->
          <div class="col-lg-4 text-center">
            <div
              class="avatar-upload-container position-relative d-inline-block mb-3"
            >
              <img
                :src="
                  form.avatar ||
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${form.fullname}`
                "
                class="main-profile-img shadow-sm border border-white"
                alt="Avatar"
              />
              <label for="avatarInput" class="avatar-edit-badge">
                <i class="bi bi-camera-fill"></i>
              </label>
              <input
                type="file"
                id="avatarInput"
                class="d-none"
                @change="onAvatarChange"
                accept="image/*"
              />
            </div>

            <div>
              <button class="btn btn-avatar-delete mt-2" @click="deleteAvatar">
                <i class="bi bi-trash-fill me-1"></i> លុបរូបភាព
              </button>
            </div>

            <p class="text-muted small mt-2">
              ចុចកាមេរ៉ា ដើម្បីផ្លាស់រូបប្រើប្រាស់
            </p>
          </div>

          <!-- Form -->
          <div class="col-lg-8">
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label small fw-bold">ឈ្មោះពេញ</label>
                <input
                  v-model="form.fullname"
                  type="text"
                  class="form-control custom-input"
                  placeholder="បញ្ចូលឈ្មោះពេញ"
                />
              </div>

              <div class="col-12">
                <label class="form-label small fw-bold">អ៊ីមែល</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-control custom-input"
                  placeholder="បញ្ចូលអ៊ីមែល"
                  disabled
                />
              </div>

              <div class="col-12">
                <label class="form-label small fw-bold">លេខទូរស័ព្ទ</label>
                <input
                  v-model="form.phoneNumber"
                  type="text"
                  class="form-control custom-input"
                  placeholder="បញ្ចូលលេខទូរស័ព្ទ"
                />
              </div>

              <div class="col-12">
                <label class="form-label small fw-bold"
                  >តំណភ្ជាប់ Telegram</label
                >
                <input
                  v-model="form.telegramLink"
                  type="text"
                  class="form-control custom-input"
                  placeholder="បញ្ចូល URL Telegram"
                />
              </div>

              <div class="col-12 mt-3">
                <button
                  @click="updateProfile"
                  class="btn btn-save-profile w-100 py-3 fw-bold"
                  :disabled="loading"
                >
                  <span
                    v-if="loading"
                    class="spinner-border spinner-border-sm me-2"
                  ></span>
                  រក្សាទុកការផ្លាស់ប្តូរ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <div class="spinner-border text-purple mb-3"></div>
      <p class="text-muted khmer-font">កំពុងផ្ទុកព័ត៌មាន...</p>
    </div>

    <!-- Success Popup -->
    <div v-if="showPopup" class="popup-backdrop">
      <div class="popup-card">
        <div class="popup-icon">
          <i class="bi bi-check-circle-fill"></i>
        </div>
        <h5>ជោគជ័យ!</h5>
        <p>ព័ត៌មានរបស់អ្នកត្រូវបានរក្សាទុករួចរាល់ 🎉</p>
      </div>
    </div>
  </ProfileLayout>
</template>

<script setup>
// import ProfileTabsAdmin from "@/components/profile/ProfileTabsAdmin.vue";
import ProfileTabs from "@/components/profile/ProfileTabs.vue";
import ProfileHeader from "@/components/profile/ProfileHeader.vue";
import ProfileSide from "@/components/profile/ProfileSide.vue";
import { ref, onMounted } from "vue";

const user = ref(null);
const skills = ["HTML", "CSS", "Vue", "MySQL", "JavaScript"];
const form = ref({
  fullname: "",
  email: "",
  phoneNumber: "",
  telegramLink: "",
  avatar: "",
});
const loading = ref(false);
const showPopup = ref(false);

/* Load profile */
onMounted(async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const json = await res.json();
    if (json.result) {
      user.value = json.data;
      Object.assign(form.value, json.data);
    }
  } catch (err) {
    console.error("Load profile error", err);
  }
});

/* Upload avatar */
const onAvatarChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  form.value.avatar = URL.createObjectURL(file);

  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile/avatar",
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      },
    );

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Upload failed");

    user.value.avatar = json.data.avatar;
    alert("Avatar uploaded successfully!");
  } catch (err) {
    console.error(err);
    alert(err.message || "Failed to upload avatar");
  }
};

/* Delete avatar */
const deleteAvatar = async () => {
  if (!confirm("តើអ្នកចង់លុបរូបប្រើប្រាស់មែនទេ?")) return;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile/avatar",
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Delete failed");

    form.value.avatar = "";
    user.value.avatar = "";

    alert("Avatar deleted successfully!");
  } catch (err) {
    console.error(err);
    alert(err.message || "Failed to delete avatar");
  }
};

/* Update profile */
const updateProfile = async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem("token");
    const payload = {
      fullname: form.value.fullname,
      phoneNumber: form.value.phoneNumber,
      telegramLink: form.value.telegramLink,
    };

    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Update failed");

    user.value = { ...user.value, ...payload };
    showPopup.value = true;
    setTimeout(() => (showPopup.value = false), 2500);
  } catch (err) {
    console.error(err);
    alert(err.message || "Network error");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;700&display=swap");

* {
  font-family: "Kantumruy Pro", sans-serif;
}

/* Colors */
.text-purple,
.btn-purple {
  color: #463258;
}

/* Save button with gradient */
.btn-save-profile {
  background: linear-gradient(135deg, #6a1b9a, #8e24aa);
  color: #fff;
  font-weight: 700;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.btn-save-profile:hover:not(:disabled) {
  background: linear-gradient(135deg, #8e24aa, #9c27b0);
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}

/* Delete avatar button */
.btn-avatar-delete {
  background: #f8d7da;
  color: #721c24;
  font-weight: 600;
  border-radius: 50px;
  padding: 8px 20px;
  border: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}
.btn-avatar-delete:hover {
  background: #f5c6cb;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Avatar */
.main-profile-img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #fff;
}
.avatar-upload-container {
  position: relative;
  display: inline-block;
  transition: 0.3s;
}
.avatar-upload-container:hover {
  transform: scale(1.04);
}
.avatar-edit-badge {
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: #3b1e54;
  color: white;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 3px solid #fff;
  box-shadow: 0 6px 18px rgba(59, 30, 84, 0.3);
}

/* Popup */
.popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.popup-card {
  background: white;
  padding: 30px 40px;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 15px 40px rgba(59, 30, 84, 0.4);
  animation: popupScale 0.4s ease;
}
.popup-icon {
  font-size: 60px;
  color: #3b1e54;
  margin-bottom: 15px;
}
.popup-card h5 {
  color: #3b1e54;
  font-weight: 800;
}
.popup-card p {
  color: #6c757d;
  font-size: 15px;
}

@keyframes popupScale {
  from {
    transform: scale(0.6);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

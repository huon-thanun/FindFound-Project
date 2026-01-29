<template>
  <div class="profile-layout">
    <!-- Sidebar -->

    <!-- Main Content -->
    <div class="content">
      <!-- Topbar -->

      <!-- Avatar Box -->
      <div class="avatar-box">
        <div class="avatar-wrapper">
          <img :src="previewAvatar || form.avatar" class="profile-avatar" />
          <input
            type="file"
            accept="image/*"
            @change="onAvatarSelected"
            class="avatar-input"
          />
        </div>
        <div class="avatar-buttons">
          <button class="btn btn-delete" @click="deleteAvatar">🗑 លុប</button>
          <button class="btn btn-cancel" @click="cancelAvatar">
            ❌ យល់ព្រម
          </button>
          <button
            v-if="previewAvatar"
            class="btn btn-upload"
            @click="uploadAvatar"
          >
            ☁️ ផ្ទុកឡើង
          </button>
        </div>
      </div>

      <!-- Profile Card -->
      <div class="card profile-card">
        <h5>ព័ត៌មានគណនី</h5>

        <!-- Fullname & Email -->
        <div class="row">
          <div class="col">
            <label>ឈ្មោះពេញ</label>
            <input v-model="form.fullname" class="form-input" />
          </div>
          <div class="col">
            <label>អ៊ីមែល</label>
            <input v-model="form.email" class="form-input" readonly />
          </div>
        </div>

        <!-- Phone & Telegram -->
        <div class="row">
          <div class="col">
            <label>លេខទូរស័ព្ទ</label>
            <input v-model="form.phoneNumber" class="form-input" />
          </div>
          <div class="col">
            <label>Telegram</label>
            <input v-model="form.telegramLink" class="form-input" />
          </div>
        </div>

        <!-- Status & Role -->
        <div class="row">
          <div class="col">
            <label>ស្ថានភាព</label>
            <input v-model="form.status" class="form-input" readonly />
          </div>
          <div class="col">
            <label>តួនាទី</label>
            <input v-model="form.role" class="form-input" readonly />
          </div>
        </div>

        <!-- Registered Date -->
        <div class="row full">
          <label>ថ្ងៃចុះឈ្មោះ</label>
          <input v-model="form.registeredAt" class="form-input" readonly />
        </div>

        <!-- Email Change -->
        <div class="row full">
          <label>អ៊ីមែលថ្មី</label>
          <input
            v-model="newEmail"
            class="form-input"
            placeholder="Enter new email"
          />
        </div>

        <!-- Password Change -->
        <div class="row full">
          <label>ពាក្យសម្ងាត់បច្ចុប្បន្ន</label>
          <div class="input-group">
            <input
              :type="showCurrentPassword ? 'text' : 'password'"
              v-model="currentPassword"
              class="form-input"
            />
            <span @click="toggleCurrentPassword" class="toggle-eye">
              <i
                :class="showCurrentPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
              ></i>
            </span>
          </div>
        </div>

        <div class="row full">
          <label>ពាក្យសម្ងាត់ថ្មី</label>
          <div class="input-group">
            <input
              :type="showNewPassword ? 'text' : 'password'"
              v-model="newPassword"
              class="form-input"
            />
            <span @click="toggleNewPassword" class="toggle-eye">
              <i :class="showNewPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </span>
          </div>
        </div>

        <button class="btn btn-save" @click="changePassword">
          🔑 ប្តូរពាក្យសម្ងាត់
        </button>

        <!-- Email Verification -->
        <div v-if="showVerifyInput" class="row full verify-section">
          <label>Token Verification</label>
          <input
            v-model="emailVerifyToken"
            class="form-input"
            placeholder="Paste your verification token here"
          />
          <button class="btn btn-save" @click="verifyNewEmail">
            ✅ Verify New Email
          </button>
        </div>

        <button class="btn btn-save" @click="updateProfile">
          💾 រក្សាទុកការកែប្រែ
        </button>
      </div>

      <!-- Logout Modal -->
      <div v-if="showLogoutModal" class="modal-overlay">
        <div class="modal-box">
          <h5>ចាកចេញពីគណនី?</h5>
          <p>តើអ្នកពិតជាចង់ចាកចេញពីគណនីនេះមែនទេ?</p>
          <div class="modal-actions">
            <button class="btn btn-cancel" @click="showLogoutModal = false">
              ❌ បោះបង់
            </button>
            <button class="btn btn-delete" @click="confirmLogout">
              🚪 ចាកចេញ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";

// Profile form
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

//
const showLogoutModal = ref(false);

// Avatar
const previewAvatar = ref(null);
let selectedFile = null;

// Email change
const newEmail = ref("");
const currentPassword = ref("");
const newPassword = ref("");
const showVerifyInput = ref(false);
const emailVerifyToken = ref("");

// Password visibility
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const toggleCurrentPassword = () =>
  (showCurrentPassword.value = !showCurrentPassword.value);
const toggleNewPassword = () =>
  (showNewPassword.value = !showNewPassword.value);

// API & token
const token = localStorage.getItem("token");
const apiUrl = "http://ant-g2-landf.tt.linkpc.net/api/v1/auth/profile";
const avatarApi =
  "http://ant-g2-landf.tt.linkpc.net/api/v1/auth/profile/avatar";

// Fetch profile
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

// Update profile
const updateProfile = async () => {
  try {
    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullname: form.fullname,
        phoneNumber: form.phoneNumber,
        telegramLink: form.telegramLink,
      }),
    });
    const json = await res.json();
    if (!res.ok || !json.result) throw new Error(json.message);
    alert("✅ បានរក្សាទុកដោយជោគជ័យ!");
  } catch (err) {
    alert("❌ កែប្រែមិនបានជោគជ័យ");
  }
};

// Avatar functions
const onAvatarSelected = (e) => {
  const file = e.target.files[0];
  if (!file || !file.type.startsWith("image/"))
    return alert("❌ សូមជ្រើសរើសរូបភាពត្រឹមត្រូវ!");
  selectedFile = file;
  previewAvatar.value = URL.createObjectURL(file);
};
const uploadAvatar = async () => {
  if (!selectedFile) return;
  const formData = new FormData();
  formData.append("avatar", selectedFile);
  try {
    const res = await fetch(avatarApi, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const json = await res.json();
    if (!res.ok || !json.result) throw new Error(json.message);
    form.avatar = json.data.avatar;
    previewAvatar.value = null;
    selectedFile = null;
    alert("✅ រូបភាពត្រូវបានផ្ទុកឡើងជោគជ័យ!");
  } catch (err) {
    alert("❌ មិនអាចផ្ទុកឡើងរូបភាពបានទេ");
  }
};
const deleteAvatar = async () => {
  if (!confirm("តើអ្នកពិតជាចង់លុបរូបភាពមែនទេ?")) return;
  try {
    const res = await fetch(avatarApi, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!res.ok || !json.result) throw new Error(json.message);
    form.avatar = "";
    previewAvatar.value = null;
    selectedFile = null;
    alert("✅ រូបភាពត្រូវបានលុបជោគជ័យ!");
  } catch (err) {
    alert("❌ មិនអាចលុបរូបភាពបានទេ");
  }
};
const cancelAvatar = () => {
  previewAvatar.value = null;
  selectedFile = null;
};

// Email change
const requestChangeEmail = async () => {
  if (!newEmail.value) return alert("❌ សូមបញ្ចូលអ៊ីមែលថ្មី!");
  if (!currentPassword.value) return alert("❌ សូមបញ្ចូលពាក្យសម្ងាត់របស់អ្នក!");
  try {
    const res = await fetch(
      "http://ant-g2-landf.tt.linkpc.net/api/v1/auth/change-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newEmail: newEmail.value,
          password: currentPassword.value,
        }),
      },
    );
    const json = await res.json();
    if (!res.ok || !json.result)
      throw new Error(json.message || "Invalid Input");
    alert("✅ Verification token has been sent to your new email!");
    showVerifyInput.value = true;
  } catch (err) {
    alert("❌ Failed to request email change: " + err.message);
  }
};

const verifyNewEmail = async () => {
  if (!emailVerifyToken.value) return alert("❌ Missing verification token");
  try {
    const res = await fetch(
      "http://ant-g2-landf.tt.linkpc.net/api/v1/auth/verify-change-email",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: emailVerifyToken.value }),
      },
    );
    const json = await res.json();
    if (!res.ok || !json.result) throw new Error(json.message);
    alert("✅ Email changed successfully!");
    form.email = newEmail.value;
    newEmail.value = "";
    currentPassword.value = "";
    emailVerifyToken.value = "";
    showVerifyInput.value = false;
  } catch (err) {
    alert("❌ Verification failed: " + err.message);
  }
};

// Change password
const changePassword = async () => {
  if (!currentPassword.value || !newPassword.value)
    return alert("❌ Please fill both password fields!");
  try {
    const res = await fetch(
      "http://ant-g2-landf.tt.linkpc.net/api/v1/auth/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
        }),
      },
    );
    const json = await res.json();
    if (!res.ok || !json.result) throw new Error(json.message);
    alert("✅ Password changed successfully!");
    currentPassword.value = "";
    newPassword.value = "";
  } catch (err) {
    alert("❌ Failed to change password: " + err.message);
  }
};
const logout = async () => {
  try {
    await fetch("http://ant-g2-landf.tt.linkpc.net/api/v1/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    // Even if API fails, still logout locally
    console.warn("Logout API failed, force logout");
  }

  // Clear token
  localStorage.removeItem("token");

  // Redirect to login page
  window.location.replace("/login");
};
const confirmLogout = async () => {
  try {
    await fetch("http://ant-g2-landf.tt.linkpc.net/api/v1/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.warn("Logout API failed, force logout");
  }

  localStorage.removeItem("token");
  window.location.replace("/login");
};
</script>

<style scoped>
/* Keep all your previous CSS exactly as before */
/* You can reuse all your existing styles for sidebar, topbar, form, avatar, buttons */
</style>
<style scoped>
/* Fonts */
@import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700&display=swap");
.profile-layout {
  display: flex;
  min-height: 100vh;
  font-family: "Kantumruy Pro", sans-serif;
  background: #f7f8fb;
}

/* Sidebar */
.sidebar {
  width: 230px;
  background: #3b1e54;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 30px 15px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}
.sidebar .logo {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 40px;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  padding: 12px 15px;
  border-radius: 10px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s;
}
.sidebar li.active,
.sidebar li:hover {
  background: rgba(255, 255, 255, 0.15);
  font-weight: 600;
}
.logout {
  margin-top: auto;
  color: #ffb3b3;
}
.logout:hover {
  background: #dc3545;
  color: #fff;
}

/* Topbar */
.content {
  flex: 1;
  padding: 25px;
}
.topbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}
.search-input {
  width: 320px;
  padding: 10px 15px;
  border-radius: 25px;
  border: 1px solid #ddd;
}
.search-input:focus {
  outline: none;
  border-color: #3b1e54;
  box-shadow: 0 0 6px rgba(59, 30, 84, 0.2);
}
.topbar-icons {
  display: flex;
  align-items: center;
  gap: 15px;
}
.avatar-topbar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid #3b1e54;
}

/* Avatar Box */
.avatar-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}
.avatar-wrapper {
  position: relative;
}
.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #3b1e54;
  transition: all 0.3s;
}
.avatar-input {
  margin-top: 10px;
}
.avatar-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.btn {
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: 0.3s;
}
.btn-delete {
  background: #dc3545;
  color: #fff;
}
.btn-delete:hover {
  background: #b02a37;
}
.btn-cancel {
  background: #6c757d;
  color: #fff;
}
.btn-cancel:hover {
  background: #5a6268;
}
.btn-upload {
  background: #0d6efd;
  color: #fff;
}
.btn-upload:hover {
  background: #084298;
}
.btn-save {
  width: 100%;
  background: linear-gradient(135deg, #3b1e54, #6a3b8f);
  color: #fff;
  margin-top: 15px;
}
.btn-save:hover {
  background: linear-gradient(135deg, #6a3b8f, #3b1e54);
}

/* Profile Card */
.card {
  background: #fff;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
}
.row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.row.full {
  flex-direction: column;
}
.col {
  flex: 1;
}
.form-input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 12px;
  border: 1px solid #ddd;
}
.form-input:focus {
  border-color: #3b1e54;
  outline: none;
  box-shadow: 0 0 6px rgba(59, 30, 84, 0.15);
}
.input-group {
  display: flex;
  align-items: center;
}
.toggle-eye {
  margin-left: -35px;
  cursor: pointer;
  color: #3b1e54;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-box {
  background: #fff;
  padding: 25px 30px;
  border-radius: 15px;
  width: 350px;
  text-align: center;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  animation: pop 0.3s ease;
}
.modal-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}
@keyframes pop {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

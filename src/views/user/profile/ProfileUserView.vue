<template>
  <div class="profile-layout bg-light py-5">
    <div class="container mt-4">
      <div class="row g-4">
        <div class="col-lg-4 col-xl-3">
          <div
            class="card profile-sidebar border-0 shadow-sm rounded-4 overflow-hidden mb-4"
          >
            <div class="profile-header-bg"></div>
            <div class="card-body pt-0 text-center">
              <div class="avatar-wrapper">
                <img
                  :src="previewAvatar || form.avatar || '/default-avatar.png'"
                  class="profile-avatar shadow"
                />
                <label for="avatarInput" class="avatar-edit-btn shadow-sm">
                  <i class="bi bi-camera-fill"></i>
                </label>
                <input
                  type="file"
                  id="avatarInput"
                  hidden
                  @change="onAvatarSelected"
                />
              </div>

              <h5 class="fw-bold mt-3 mb-1">
                {{ form.fullname || "ឈ្មោះអ្នកប្រើប្រាស់" }}
              </h5>
              <p class="text-muted small mb-2">{{ form.role || "សមាជិក" }}</p>
              <span class="badge status-badge mb-3">
                <i class="bi bi-patch-check-fill me-1"></i>
                {{ form.status || "សកម្ម" }}
              </span>

              <div class="d-flex gap-2 px-3 pb-3" v-if="previewAvatar">
                <button
                  class="btn btn-primary btn-sm w-100 rounded-pill"
                  @click="uploadAvatar"
                >
                  <i class="bi bi-cloud-arrow-up me-1"></i> រក្សាទុក
                </button>
                <button
                  class="btn btn-light btn-sm w-100 rounded-pill border"
                  @click="previewAvatar = null"
                >
                  បោះបង់
                </button>
              </div>
            </div>

            <div class="list-group list-group-flush border-top border-light">
              <button
                @click="activeTab = 'overview'"
                :class="[
                  'list-group-item list-group-item-action border-0 py-3',
                  { active: activeTab === 'overview' },
                ]"
              >
                <i class="bi bi-grid-1x2-fill me-3"></i>ព័ត៌មានទូទៅ
              </button>
              <button
                @click="activeTab = 'edit'"
                :class="[
                  'list-group-item list-group-item-action border-0 py-3',
                  { active: activeTab === 'edit' },
                ]"
              >
                <i class="bi bi-person-gear me-3"></i>កែប្រែព័ត៌មាន
              </button>
              <button
                @click="activeTab = 'security'"
                :class="[
                  'list-group-item list-group-item-action border-0 py-3',
                  { active: activeTab === 'security' },
                ]"
              >
                <i class="bi bi-shield-lock-fill me-3"></i>សុវត្ថិភាព
              </button>
            </div>
          </div>

          <div class="card border-0 shadow-sm rounded-4 p-4">
            <h6 class="fw-bold mb-3">
              <i class="bi bi-lightbulb me-2 text-primary"></i>ជំនាញ
            </h6>
            <div class="d-flex flex-wrap gap-2">
              <span
                v-for="skill in ['HTML', 'CSS', 'JS', 'Vue', 'MySQL']"
                :key="skill"
                class="skill-tag"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <div class="col-lg-8 col-xl-9">
          <transition name="fade" mode="out-in">
            <div
              v-if="activeTab === 'overview'"
              key="overview"
              class="card border-0 shadow-sm p-4 rounded-4 h-100"
            >
              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <h5 class="fw-bold mb-0">ព័ត៌មានផ្ទាល់ខ្លួន</h5>
                <button
                  class="btn btn-light btn-sm rounded-circle shadow-sm"
                  @click="activeTab = 'edit'"
                >
                  <i class="bi bi-pencil text-muted"></i>
                </button>
              </div>
              <div class="row g-4">
                <div class="col-md-6 info-group">
                  <label class="small text-muted text-uppercase fw-bold"
                    >ឈ្មោះពេញ</label
                  >
                  <p class="mb-0 fs-6 fw-medium text-dark">
                    {{ form.fullname }}
                  </p>
                </div>
                <div class="col-md-6 info-group">
                  <label class="small text-muted text-uppercase fw-bold"
                    >អាសយដ្ឋានអ៊ីមែល</label
                  >
                  <p class="mb-0 fs-6 fw-medium text-dark">{{ form.email }}</p>
                </div>
                <div class="col-md-6 info-group">
                  <label class="small text-muted text-uppercase fw-bold"
                    >លេខទូរស័ព្ទ</label
                  >
                  <p class="mb-0 fs-6 fw-medium text-dark">
                    {{ form.phoneNumber || "មិនទាន់មាន" }}
                  </p>
                </div>
                <div class="col-md-6 info-group">
                  <label class="small text-muted text-uppercase fw-bold"
                    >តេឡេក្រាម (Telegram)</label
                  >
                  <p class="mb-0 fs-6 fw-medium text-dark">
                    <i
                      class="bi bi-send me-1 text-info"
                      v-if="form.telegramLink"
                    ></i>
                    {{ form.telegramLink || "មិនទាន់មាន" }}
                  </p>
                </div>
              </div>
            </div>

            <div
              v-else-if="activeTab === 'edit'"
              key="edit"
              class="card border-0 shadow-sm p-4 rounded-4 h-100"
            >
              <h5 class="fw-bold mb-4">ការកំណត់ព័ត៌មានផ្ទាល់ខ្លួន</h5>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-bold">ឈ្មោះពេញ</label>
                  <input
                    v-model="form.fullname"
                    class="form-control custom-input"
                    placeholder="បញ្ចូលឈ្មោះពេញរបស់អ្នក"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">លេខទូរស័ព្ទ</label>
                  <input
                    v-model="form.phoneNumber"
                    class="form-control custom-input"
                    placeholder="+855..."
                  />
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label small fw-bold"
                    >ឈ្មោះអ្នកប្រើក្នុងតេឡេក្រាម</label
                  >
                  <div class="input-group">
                    <span class="input-group-text border-0 bg-light text-muted"
                      >@</span
                    >
                    <input
                      v-model="form.telegramLink"
                      class="form-control custom-input"
                      placeholder="username"
                    />
                  </div>
                </div>
                <div class="col-12 mt-auto">
                  <button
                    class="btn btn-primary btn-lg w-100 rounded-3 shadow-sm py-3"
                    @click="updateProfile"
                  >
                    <i class="bi bi-check2-circle me-2"></i>
                    រក្សាទុកការផ្លាស់ប្តូរ
                  </button>
                </div>
              </div>
            </div>

            <div
              v-else-if="activeTab === 'security'"
              key="security"
              class="h-100"
            >
              <div class="row g-4 h-100">
                <div class="col-md-6">
                  <div class="card border-0 shadow-sm p-4 rounded-4 h-100">
                    <h6 class="fw-bold mb-3 text-dark">
                      <i class="bi bi-lock me-2"></i>ប្តូរពាក្យសម្ងាត់
                    </h6>
                    <div class="mb-3">
                      <input
                        type="password"
                        v-model="currentPassword"
                        class="form-control custom-input"
                        placeholder="ពាក្យសម្ងាត់បច្ចុប្បន្ន"
                      />
                    </div>
                    <div class="mb-4">
                      <input
                        type="password"
                        v-model="newPassword"
                        class="form-control custom-input"
                        placeholder="ពាក្យសម្ងាត់ថ្មី"
                      />
                    </div>
                    <button
                      class="btn btn-dark w-100 mt-auto rounded-3 py-2"
                      @click="changePassword"
                    >
                      រក្សាទុកពាក្យសម្ងាត់
                    </button>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card border-0 shadow-sm p-4 rounded-4 h-100">
                    <h6 class="fw-bold mb-3 text-dark">
                      <i class="bi bi-envelope-at me-2"></i
                      >ប្តូរអ៊ីមែលភ្ជាប់គណនី
                    </h6>
                    <div class="mb-3">
                      <input
                        v-model="newEmail"
                        class="form-control custom-input"
                        placeholder="បញ្ចូលអ៊ីមែលថ្មី"
                      />
                    </div>
                    <button
                      class="btn btn-outline-primary w-100 mt-auto rounded-3 py-2 border-2"
                      @click="requestChangeEmail"
                    >
                      ស្នើសុំប្តូរអ៊ីមែល
                    </button>

                    <div
                      v-if="showVerifyInput"
                      class="mt-3 p-3 bg-light rounded-3 border"
                    >
                      <input
                        v-model="emailVerifyToken"
                        class="form-control form-control-sm mb-2"
                        placeholder="បញ្ចូលលេខកូដពីអ៊ីមែល"
                      />
                      <button
                        class="btn btn-success btn-sm w-100 rounded-2"
                        @click="verifyNewEmail"
                      >
                        បញ្ជាក់ការផ្លាស់ប្តូរ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <transition name="modal-fade">
      <div
        v-if="showSuccessModal"
        class="custom-modal-backdrop"
        @click.self="showSuccessModal = false"
      >
        <div
          class="custom-modal-content card border-0 shadow-lg text-center p-4"
        >
          <div class="success-icon mb-3">
            <i class="bi bi-check-circle-fill fa-3x text-success"></i>
          </div>
          <h4 class="fw-bold">ជោគជ័យ!</h4>
          <p class="text-muted">{{ successMessage }}</p>
          <button
            class="btn btn-primary w-100 rounded-pill py-2"
            @click="showSuccessModal = false"
          >
            បិទ
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

/* ------------------ STATE ------------------ */
const activeTab = ref("overview");
const token = localStorage.getItem("token");

const apiUrl = "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile";
const avatarApi =
  "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/profile/avatar";

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

const previewAvatar = ref(null);
let selectedFile = null;

const currentPassword = ref("");
const newPassword = ref("");

const newEmail = ref("");
const showVerifyInput = ref(false);
const emailVerifyToken = ref("");

const showSuccessModal = ref(false);
const successMessage = ref("");

/* ------------------ LOAD PROFILE ------------------ */
onMounted(async () => {
  if (!token) {
    console.error("❌ No token found — user not logged in");
    return;
  }

  try {
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    console.log("PROFILE API:", json); // 👈 you can see real response

    if (!json.result || !json.data) {
      console.error("❌ API returned no data:", json);
      return;
    }

    const d = json.data;

    form.fullname = d.fullname || "";
    form.email = d.email || "";
    form.avatar = d.avatar || "";
    form.phoneNumber = d.phoneNumber || "";
    form.telegramLink = d.telegramLink || "";
    form.status = d.status || "";
    form.role = d.role?.name || "";
    form.registeredAt = d.registeredAt
      ? new Date(d.registeredAt).toLocaleString()
      : "";
  } catch (err) {
    console.error("❌ Failed to load profile:", err);
  }
});

/* ------------------ UPDATE PROFILE ------------------ */
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

    if (json.result) {
      successMessage.value = "Profile updated successfully!";
      showSuccessModal.value = true;
    } else {
      console.error("Update failed:", json);
    }
  } catch (err) {
    console.error("Update error:", err);
  }
};

/* ------------------ AVATAR ------------------ */
const onAvatarSelected = (e) => {
  selectedFile = e.target.files[0];
  if (selectedFile) {
    previewAvatar.value = URL.createObjectURL(selectedFile);
  }
};

const uploadAvatar = async () => {
  try {
    const fd = new FormData();
    fd.append("avatar", selectedFile);

    const res = await fetch(avatarApi, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fd,
    });

    const json = await res.json();

    if (json.result) {
      form.avatar = json.data.avatar;
      previewAvatar.value = null;
      selectedFile = null;
    } else {
      console.error("Avatar upload failed:", json);
    }
  } catch (err) {
    console.error("Avatar error:", err);
  }
};

/* ------------------ PASSWORD ------------------ */
const changePassword = async () => {
  try {
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/change-password",
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

    if (json.result) {
      successMessage.value = "Password changed successfully!";
      showSuccessModal.value = true;
      currentPassword.value = "";
      newPassword.value = "";
    } else {
      console.error("Password change failed:", json);
    }
  } catch (err) {
    console.error("Password error:", err);
  }
};

/* ------------------ CHANGE EMAIL ------------------ */
const requestChangeEmail = async () => {
  try {
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/api/v1/auth/change-email",
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

    if (json.result) {
      successMessage.value = "Verification code sent to your new email!";
      showSuccessModal.value = true;
      showVerifyInput.value = true;
    } else {
      console.error("Email request failed:", json);
    }
  } catch (err) {
    console.error("Email request error:", err);
  }
};

const verifyNewEmail = async () => {
  try {
    const res = await fetch(
      "https://ant-g2-landf.ti.linkpc.net/api/v1/auth/verify-change-email",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: emailVerifyToken.value,
        }),
      },
    );

    const json = await res.json();

    if (json.result) {
      form.email = newEmail.value;
      successMessage.value = "Email changed successfully!";
      showSuccessModal.value = true;
      newEmail.value = "";
      emailVerifyToken.value = "";
      showVerifyInput.value = false;
    } else {
      console.error("Verify email failed:", json);
    }
  } catch (err) {
    console.error("Verify email error:", err);
  }
};
</script>

<style scoped>
/* នាំចូល Kantumruy Pro ដែលមានជម្រើសកម្រាស់អក្សរច្រើន និងច្បាស់ល្អ */
@import url("https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,100..700;1,100..700&display=swap");
/* នាំចូល Bootstrap Icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

* {
  font-family: "Kantumruy Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.profile-layout {
  background-color: #f8f9fa; /* ពណ៌ប្រផេះស្រាល បែបទំនើប */
  min-height: 100vh;
  /* បង្កើនចន្លោះបន្ទាត់ឱ្យអក្សរខ្មែរមើលទៅដកដង្ហើមរួច */
  line-height: 1.6;
}

/* Sidebar Decorations */
.profile-sidebar {
  background: #ffffff;
  border: none;
  transition: transform 0.3s ease;
}

.profile-header-bg {
  height: 100px;
  background: linear-gradient(135deg, #3b1e54 0%, #5c3976 100%);
}

.avatar-wrapper {
  position: relative;
  margin-top: -60px;
  display: inline-block;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 5px solid white;
  object-fit: cover;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.avatar-edit-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: #3b1e54;
  color: white;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid white;
  transition: all 0.2s ease;
}

.avatar-edit-btn:hover {
  background: #5c3976;
  transform: scale(1.1);
}

/* Status Badge */
.status-badge {
  background-color: #e8f5e9;
  color: #2e7d32;
  border-radius: 50px;
  padding: 6px 16px;
  font-size: 0.85rem;
  font-weight: 600;
}

/* Custom Menu Styling */
.list-group-item {
  cursor: pointer;
  color: #6c757d;
  font-weight: 500;
  padding: 14px 20px;
  border: none !important;
  transition: all 0.3s ease;
}

.list-group-item i {
  font-size: 1.1rem;
}

.list-group-item.active {
  background-color: #f4f0f7 !important;
  color: #3b1e54;
  border-right: 4px solid #3b1e54 !important;
  font-weight: 700;
}

.list-group-item:hover:not(.active) {
  background-color: #fcfaff;
  padding-left: 28px;
  color: #3b1e54;
}

/* Skill Tags */
.skill-tag {
  background: #f1f3f5;
  color: #495057;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid #e9ecef;
}

/* Form Controls */
.custom-input {
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 12px 16px;
  transition: all 0.3s ease;
  background: #ffffff;
  font-size: 0.95rem;
}

.custom-input:focus {
  border-color: #3b1e54;
  box-shadow: 0 0 0 4px rgba(59, 30, 84, 0.1);
  background: #fff;
}

/* Labels */
label.small {
  font-weight: 700;
  color: #495057;
  margin-bottom: 8px;
  letter-spacing: 0.3px;
}

/* Buttons */
.btn-primary {
  background: #3b1e54;
  border: none;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #2a153d;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(59, 30, 84, 0.3);
}

/* Modern Modal */
.custom-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px); /* បន្ថែម Effect ព្រិលៗពីក្រោយ */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.custom-modal-content {
  border-radius: 24px;
  padding: 40px !important;
  max-width: 420px;
  animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* សម្រាប់ព័ត៌មានបង្ហាញ (Overview Text) */
.info-group p {
  color: #212529;
  font-weight: 500;
  font-size: 1.05rem;
}
</style>

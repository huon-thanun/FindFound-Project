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
                <label for="avatarInput" class="avatar-edit-btn">
                  <i class="fas fa-camera"></i>
                </label>
                <input
                  type="file"
                  id="avatarInput"
                  hidden
                  @change="onAvatarSelected"
                />
              </div>

              <h5 class="fw-bold mt-3 mb-1">{{ form.fullname }}</h5>
              <p class="text-muted small mb-2">{{ form.role }}</p>
              <span class="badge status-badge mb-3">{{ form.status }}</span>

              <div class="d-flex gap-2 px-3 pb-3" v-if="previewAvatar">
                <button
                  class="btn btn-primary btn-sm w-100 rounded-pill"
                  @click="uploadAvatar"
                >
                  Save Photo
                </button>
                <button
                  class="btn btn-light btn-sm w-100 rounded-pill"
                  @click="previewAvatar = null"
                >
                  Cancel
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
                <i class="fas fa-user-circle me-3"></i>Overview
              </button>
              <button
                @click="activeTab = 'edit'"
                :class="[
                  'list-group-item list-group-item-action border-0 py-3',
                  { active: activeTab === 'edit' },
                ]"
              >
                <i class="fas fa-user-edit me-3"></i>Edit Profile
              </button>
              <button
                @click="activeTab = 'security'"
                :class="[
                  'list-group-item list-group-item-action border-0 py-3',
                  { active: activeTab === 'security' },
                ]"
              >
                <i class="fas fa-shield-alt me-3"></i>Security
              </button>
            </div>
          </div>

          <div class="card border-0 shadow-sm rounded-4 p-4">
            <h6 class="fw-bold mb-3">
              <i class="fas fa-brain me-2 text-primary"></i>Skills
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
                <h5 class="fw-bold mb-0">General Information</h5>
                <button
                  class="btn btn-light btn-sm rounded-circle"
                  @click="activeTab = 'edit'"
                >
                  <i class="fas fa-pen text-muted"></i>
                </button>
              </div>
              <div class="row g-4">
                <div class="col-md-6 info-group">
                  <label class="small text-muted text-uppercase fw-bold"
                    >Full Name</label
                  >
                  <p class="mb-0 fs-6">{{ form.fullname }}</p>
                </div>
                <div class="col-md-6 info-group">
                  <label class="small text-muted text-uppercase fw-bold"
                    >Email Address</label
                  >
                  <p class="mb-0 fs-6">{{ form.email }}</p>
                </div>
                <div class="col-md-6 info-group">
                  <label class="small text-muted text-uppercase fw-bold"
                    >Phone Number</label
                  >
                  <p class="mb-0 fs-6">{{ form.phoneNumber || "—" }}</p>
                </div>
                <div class="col-md-6 info-group">
                  <label class="small text-muted text-uppercase fw-bold"
                    >Telegram</label
                  >
                  <p class="mb-0 fs-6">{{ form.telegramLink || "—" }}</p>
                </div>
              </div>
            </div>

            <div
              v-else-if="activeTab === 'edit'"
              key="edit"
              class="card border-0 shadow-sm p-4 rounded-4 h-100"
            >
              <h5 class="fw-bold mb-4">Personal Settings</h5>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Full Name</label>
                  <input
                    v-model="form.fullname"
                    class="form-control custom-input"
                    placeholder="John Doe"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Phone</label>
                  <input
                    v-model="form.phoneNumber"
                    class="form-control custom-input"
                    placeholder="+855..."
                  />
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label small fw-bold"
                    >Telegram Username</label
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
                    class="btn btn-primary btn-lg w-100 rounded-3 shadow-sm"
                    @click="updateProfile"
                  >
                    Save Profile Changes
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
                    <h6 class="fw-bold mb-3">Update Password</h6>
                    <div class="mb-3">
                      <input
                        type="password"
                        v-model="currentPassword"
                        class="form-control custom-input"
                        placeholder="Current Password"
                      />
                    </div>
                    <div class="mb-4">
                      <input
                        type="password"
                        v-model="newPassword"
                        class="form-control custom-input"
                        placeholder="New Password"
                      />
                    </div>
                    <button
                      class="btn btn-dark w-100 mt-auto rounded-3 py-2"
                      @click="changePassword"
                    >
                      Save Password
                    </button>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card border-0 shadow-sm p-4 rounded-4 h-100">
                    <h6 class="fw-bold mb-3">Linked Email</h6>
                    <div class="mb-3">
                      <input
                        v-model="newEmail"
                        class="form-control custom-input"
                        placeholder="Enter new email address"
                      />
                    </div>
                    <button
                      class="btn btn-outline-primary w-100 mt-auto rounded-3 py-2"
                      @click="requestChangeEmail"
                    >
                      Request Change
                    </button>

                    <div
                      v-if="showVerifyInput"
                      class="mt-3 p-3 bg-light rounded-3"
                    >
                      <input
                        v-model="emailVerifyToken"
                        class="form-control form-control-sm mb-2"
                        placeholder="Code from email"
                      />
                      <button
                        class="btn btn-success btn-sm w-100"
                        @click="verifyNewEmail"
                      >
                        Confirm Verification
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
            <i class="fas fa-check-circle fa-3x text-success"></i>
          </div>
          <h4 class="fw-bold">Awesome!</h4>
          <p class="text-muted">{{ successMessage }}</p>
          <button
            class="btn btn-primary w-100 rounded-pill py-2"
            @click="showSuccessModal = false"
          >
            Got it!
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";

const activeTab = ref("overview");
const token = localStorage.getItem("token");

const apiUrl = "http://ant-g2-landf.tt.linkpc.net/api/v1/auth/profile";
const avatarApi =
  "http://ant-g2-landf.tt.linkpc.net/api/v1/auth/profile/avatar";

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

onMounted(async () => {
  const res = await fetch(apiUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  const d = json.data;

  form.fullname = d.fullname;
  form.email = d.email;
  form.avatar = d.avatar;
  form.phoneNumber = d.phoneNumber ?? null;
  form.telegramLink = d.telegramLink ?? null;
  form.status = d.status;
  form.role = d.role?.name;
  form.registeredAt = new Date(d.registeredAt).toLocaleString();
});

const updateProfile = async () => {
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
  }
};

const onAvatarSelected = (e) => {
  selectedFile = e.target.files[0];
  previewAvatar.value = URL.createObjectURL(selectedFile);
};

const uploadAvatar = async () => {
  const fd = new FormData();
  fd.append("avatar", selectedFile);

  const res = await fetch(avatarApi, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  });
  const json = await res.json();
  form.avatar = json.data.avatar;
  previewAvatar.value = null;
};

const deleteAvatar = async () => {
  await fetch(avatarApi, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  form.avatar = "";
};

const changePassword = async () => {
  await fetch("http://ant-g2-landf.tt.linkpc.net/api/v1/auth/change-password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    }),
  });
  successMessage.value = "Password changed successfully!";
  showSuccessModal.value = true;
  currentPassword.value = "";
  newPassword.value = "";
};

const requestChangeEmail = async () => {
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
  if (json.result) {
    successMessage.value = "Verification token sent!";
    showSuccessModal.value = true;
    showVerifyInput.value = true;
  }
};

const verifyNewEmail = async () => {
  const res = await fetch(
    "http://ant-g2-landf.tt.linkpc.net/api/v1/auth/verify-change-email",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: emailVerifyToken.value }),
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
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kantumruy:wght@400;500;700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");

* {
  font-family: "Kantumruy", sans-serif;
}

.profile-layout {
  background-color: #f0f2f5;
  min-height: 100vh;
}

/* Sidebar Decorations */
.profile-sidebar {
  position: relative;
}
.profile-header-bg {
  height: 80px;
  background: linear-gradient(135deg, #3b1e54 0%, #5c3976 100%);
}
.avatar-wrapper {
  position: relative;
  margin-top: -65px;
  display: inline-block;
}
.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 5px solid white;
  object-fit: cover;
}
.avatar-edit-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: #3b1e54;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid white;
}

/* Status Badge */
.status-badge {
  background-color: rgba(40, 167, 69, 0.1);
  color: #28a745;
  border-radius: 20px;
  padding: 6px 15px;
}

/* Custom Menu Styling */
.list-group-item {
  cursor: pointer;
  color: #6c757d;
  font-weight: 500;
  transition: 0.2s;
}
.list-group-item.active {
  background-color: #f8f9fa;
  color: #3b1e54;
  border-right: 4px solid #3b1e54 !important;
  font-weight: 700;
}
.list-group-item:hover:not(.active) {
  background-color: #fdfdfd;
  padding-left: 2rem;
}

/* Skill Tags */
.skill-tag {
  background: #e9ecef;
  color: #495057;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Form Controls */
.custom-input {
  border: 1.5px solid #e9ecef;
  border-radius: 10px;
  padding: 12px 15px;
  transition: all 0.2s;
  background: #fafafa;
}
.custom-input:focus {
  border-color: #3b1e54;
  box-shadow: none;
  background: #fff;
}

/* Buttons */
.btn-primary {
  background: #3b1e54;
  border: none;
}
.btn-primary:hover {
  background: #2a153d;
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modern Modal */
.custom-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.custom-modal-content {
  width: 90%;
  max-width: 400px;
  transform: scale(1);
  animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
</style>

<template>
  <div class="container-fluid bg-light min-vh-100 py-5">
    <div class="container">
      <div class="row g-4">
        <!-- LEFT PROFILE CARD -->
        <div class="col-lg-3">
          <div class="card border-0 shadow rounded-4 text-center p-4">
            <img
              :src="previewAvatar || form.avatar || '/default-avatar.png'"
              class="rounded-circle border mb-3"
              style="width: 130px; height: 130px; object-fit: cover"
            />
            <h5 class="mb-0">{{ form.fullname }}</h5>
            <small class="text-muted">{{ form.role }}</small>
            <div class="badge bg-success mt-2">{{ form.status }}</div>

            <hr />

            <input
              type="file"
              class="form-control form-control-sm mb-2"
              @change="onAvatarSelected"
            />

            <div class="d-flex gap-2">
              <button
                v-if="previewAvatar"
                class="btn btn-primary btn-sm w-100"
                @click="uploadAvatar"
              >
                Upload
              </button>
              <button
                class="btn btn-outline-danger btn-sm w-100"
                @click="deleteAvatar"
              >
                Remove
              </button>
            </div>

            <!-- Static Skills -->
            <div class="mt-4 text-start">
              <h6 class="mb-2">Skills</h6>
              <ul class="list-group list-group-flush">
                <li class="list-group-item py-1">HTML</li>
                <li class="list-group-item py-1">CSS</li>
                <li class="list-group-item py-1">JavaScript</li>
                <li class="list-group-item py-1">Vue.js</li>
                <li class="list-group-item py-1">MySQL</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- RIGHT CONTENT -->
        <div class="col-lg-9">
          <!-- TABS -->
          <ul class="nav nav-tabs mb-4">
            <li class="nav-item">
              <button
                class="nav-link"
                :class="{ active: activeTab === 'overview' }"
                @click="activeTab = 'overview'"
              >
                Overview
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                :class="{ active: activeTab === 'edit' }"
                @click="activeTab = 'edit'"
              >
                Edit Profile
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                :class="{ active: activeTab === 'security' }"
                @click="activeTab = 'security'"
              >
                Security
              </button>
            </li>
          </ul>

          <!-- OVERVIEW -->
          <div
            v-if="activeTab === 'overview'"
            class="card border-0 shadow p-4 rounded-4"
          >
            <h5 class="mb-4">Profile Overview</h5>
            <div class="row">
              <div class="col-md-6"><b>Name:</b> {{ form.fullname }}</div>
              <div class="col-md-6"><b>Email:</b> {{ form.email }}</div>
              <div class="col-md-6 mt-3">
                <b>Phone:</b> {{ form.phoneNumber ?? "Not provided" }}
              </div>
              <div class="col-md-6 mt-3">
                <b>Telegram:</b> {{ form.telegramLink ?? "Not provided" }}
              </div>
              <div class="col-md-6 mt-3"><b>Role:</b> {{ form.role }}</div>
              <div class="col-md-6 mt-3"><b>Status:</b> {{ form.status }}</div>
            </div>
          </div>

          <!-- EDIT PROFILE -->
          <div
            v-if="activeTab === 'edit'"
            class="card border-0 shadow p-4 rounded-4"
          >
            <h5 class="mb-4">Edit Profile</h5>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Full Name</label>
                <input
                  v-model="form.fullname"
                  class="form-control form-control-lg"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Phone</label>
                <input
                  v-model="form.phoneNumber"
                  class="form-control form-control-lg"
                />
              </div>
              <div class="col-md-12 mb-4">
                <label class="form-label">Telegram</label>
                <input
                  v-model="form.telegramLink"
                  class="form-control form-control-lg"
                />
              </div>
            </div>
            <button class="btn btn-primary btn-lg w-100" @click="updateProfile">
              Save Changes
            </button>
          </div>

          <!-- SECURITY -->
          <div v-if="activeTab === 'security'" class="row g-4">
            <div class="col-md-6">
              <div class="card border-0 shadow p-4 rounded-4 h-100">
                <h5 class="mb-3">Change Password</h5>
                <input
                  type="password"
                  v-model="currentPassword"
                  class="form-control form-control-lg mb-3"
                  placeholder="Current Password"
                />
                <input
                  type="password"
                  v-model="newPassword"
                  class="form-control form-control-lg mb-4"
                  placeholder="New Password"
                />
                <button
                  class="btn btn-warning btn-lg w-100"
                  @click="changePassword"
                >
                  Update Password
                </button>
              </div>
            </div>

            <div class="col-md-6">
              <div class="card border-0 shadow p-4 rounded-4 h-100">
                <h5 class="mb-3">Change Email</h5>
                <input
                  v-model="newEmail"
                  class="form-control form-control-lg mb-3"
                  placeholder="New Email"
                />
                <input
                  type="password"
                  v-model="currentPassword"
                  class="form-control form-control-lg mb-4"
                  placeholder="Confirm Password"
                />
                <button
                  class="btn btn-primary btn-lg w-100"
                  @click="requestChangeEmail"
                >
                  Send Verification
                </button>

                <div v-if="showVerifyInput" class="mt-3">
                  <input
                    v-model="emailVerifyToken"
                    class="form-control form-control-lg mb-2"
                    placeholder="Verification Code"
                  />
                  <button class="btn btn-success w-100" @click="verifyNewEmail">
                    Verify Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SUCCESS MODAL -->
      <div v-if="showSuccessModal" class="modal-backdrop">
        <div class="modal-content">
          <h5>Success!</h5>
          <p>{{ successMessage }}</p>
          <button
            class="btn btn-primary w-100"
            @click="showSuccessModal = false"
          >
            Close
          </button>
        </div>
      </div>
    </div>
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

* {
  font-family: "Kantumruy", sans-serif;
}

.container-fluid {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 60px 0;
}

/* Cards */
.card {
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

/* Buttons */
button {
  font-family: "Kantumruy", sans-serif;
  border-radius: 8px;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #3b1e54;
  border-color: #3b1e54;
  color: #fff;
}

.btn-primary:hover {
  background-color: #5c3976;
  border-color: #5c3976;
  color: #fff;
}

.btn-warning {
  background-color: #f0ad4e;
  border-color: #f0ad4e;
  color: #fff;
}

.btn-warning:hover {
  background-color: #ec9c3b;
  border-color: #ec9c3b;
  color: #fff;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  color: #fff;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #218838;
  color: #fff;
}

.btn-outline-danger {
  border-color: #dc3545;
  color: #dc3545;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: #fff;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  width: 350px;
  text-align: center;
}

.modal-content h5 {
  margin-bottom: 15px;
}
</style>

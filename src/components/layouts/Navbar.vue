<template>
    <!-- Top Navbar -->
    <SidebarAdmin class="sidebar" :class="{ 'closed': isOpen }"></SidebarAdmin>
    <nav class="navbar-top ms-auto col-12">
        <div class="d-flex justify-content-between align-items-center h-100">
            <!-- Search Box -->
            <div class="d-flex gap-3">
                <base-button @click="toggleSidebar" class="d-lg-none" variant="primary"><i
                        :class="isOpen ? 'bi bi-list' : 'bi bi-x-lg'"></i>
                </base-button>
                <div class="search-box d-none d-lg-block">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
            <div class="logo-section">
                <div class="d-flex d-lg-none align-items-center gap-3">
                    <img src="../../assets/images/logo/logo.png" class="object-fit-cover" height="79px" width="170px" alt="">
                </div>
            </div>
            <!-- User Section -->
            <div class="navbar-user">
                <!-- User Profile -->
                <div class="user-profile">
                    <div class="user-profile-avatar">👤</div>
                    <span class="user-profile-name">Admin User</span>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';
import SidebarAdmin from './Sidebar.vue';
const isOpen = ref('true');
const toggleSidebar = () => {
    isOpen.value = !isOpen.value
}
</script>

<style scoped>
body {
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
}

.sidebar {
    width: 300px;
    display: block !important;
    position: fixed;
    top: 0;
}

.sidebar.closed {
    transform: translateX(-300px);
}

.navbar-top {
    background-color: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    padding: 16px 24px;
    height: 80px;
    width: 79%;
    flex: 0 0 auto;
    position: sticky;
    top: 0;
    z-index: 100;
}

.search-box {
    position: relative;
    max-width: 400px;
    width: 100%;
}

.search-box input {
    width: 400px;
    padding: 10px 16px 10px 40px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background-color: #f9fafb;
    font-size: 14px;
    transition: all 0.2s;
}

.search-box input:focus {
    outline: none;
    border-color: var(--primary-color);
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(--primary-color-shadow);
}

.search-box svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    color: #6b7280;
}

.navbar-user {
    display: flex;
    align-items: center;
    gap: 20px;
}

.user-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    text-decoration: none;
}

.user-profile:hover {
    background-color: #f9fafb;
}

.user-profile-avatar {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background-color: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
}

.user-profile-name {
    font-size: 14px;
    font-weight: 500;
    color: #111827;
    margin: 0;
}

@media (min-width: 992px) {
    .sidebar {
        display: none !important;
    }
}

@media (max-width: 992px) {
    .navbar-top {
        width: 100% !important;
    }
}
</style>
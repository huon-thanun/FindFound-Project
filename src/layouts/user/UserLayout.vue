<template>
    <div>
        <NavbarUser class="navbar"></NavbarUser>
        <router-view></router-view>
        <Footer />
    </div>
</template>
<script setup>
import NavbarUser from '@/components/layouts/NavbarUser.vue';
import Footer from '@/components/layouts/Footer.vue';
</script>
<style>
    .navbar{
        margin-bottom: 60px;
    }
</style>
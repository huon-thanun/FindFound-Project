<template>
    <NavbarUser />
    <router-view></router-view>
    <Footer />
</template>
<script setup>
import NavbarUser from '@/components/layouts/NavbarUser.vue';
import Footer from '@/components/layouts/Footer.vue';
</script>
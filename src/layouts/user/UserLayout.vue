<template>
    <div>
        <NavbarUser />
        <router-view></router-view>
        <Footer />
    </div>
</template>
<script setup>
import NavbarUser from '@/components/layouts/NavbarUser.vue';
import Footer from '@/components/layouts/Footer.vue';
</script>
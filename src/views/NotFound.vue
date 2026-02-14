<template>
    <div class="notfound-container">
        <div class="card">
            <div class="card-body">
                <h1>4<i class="bi bi-emoji-frown"></i>4</h1>
        <p class="fs-3">មិនមានទំព័រដែលអ្នកកំពុងស្វែងរក</p>
        <div>
            <BaseButton variant="primary" @click="goHome">ទំព័រដើម</BaseButton>
            <!-- <BaseButton variant="outline_primary" class="btn btn-outline" @click="goLogin">ចូលគណនី</BaseButton> -->
        </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function goHome() {
    router.push({ name: "home" });
}

function goLogin() {
    router.push({ name: "login" });
}
</script>

<style scoped>
.notfound-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 1rem;
    text-align: center;
}

.card-body{
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 50px;
}

h1 {
    font-size: 4rem;
    margin: 0;
}

/* 
.btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin: 0 0.5rem;
}

.btn-outline {
  background: transparent;
  color: #2563eb;
  border: 1px solid #2563eb;
} */
</style>

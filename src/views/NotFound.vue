<template>
    <div class="notfound-container">
        <div class="error-content">
            <!-- Animated 404 -->
            <div class="error-code">
                <span class="digit">4</span>
                <span class="icon-wrapper">
                    <i class="bi bi-emoji-laughing"></i>
                </span>
                <span class="digit">4</span>
            </div>

            <!-- Decorative elements -->
            <div class="floating-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
            </div>

            <!-- Message Card -->
            <div class="message-card">
                <h2 class="message-title">ទំព័រមិនត្រូវបានរកឃើញ</h2>
                <p class="message-text">
                    សូមអភ័យទោស! ទំព័រដែលអ្នកកំពុងស្វែងរកមិនមានទេ។
                    <br />
                    វាប្រហែលជាត្រូវបានផ្លាស់ទី ឬលុបចោល។
                </p>

                <!-- Action buttons -->
                <div class="button-group">
                    <BaseButton variant="primary" @click="goHome" icon="house-door">
                        ត្រឡប់ទៅទំព័រដើម
                    </BaseButton>
                    <BaseButton variant="outline_primary" @click="goBack" icon="arrow-left">
                        ត្រឡប់ក្រោយ
                    </BaseButton>
                </div>
            </div>

            <!-- Helpful links -->
            <!-- <div class="helpful-links">
                <p class="links-title">តំណភ្ជាប់ដែលមានប្រយោជន៍:</p>
                <div class="links-grid">
                    <a href="#" @click.prevent="router.push({ name: 'home' })" class="link-item">
                        <i class="bi bi-house"></i>
                        <span>ទំព័រដើម</span>
                    </a>
                    <a href="#" @click.prevent="router.push({ name: 'reports' })" class="link-item">
                        <i class="bi bi-file-text"></i>
                        <span>របាយការណ៍</span>
                    </a>
                    <a href="#" @click.prevent="router.push({ name: 'contact' })" class="link-item">
                        <i class="bi bi-envelope"></i>
                        <span>ទំនាក់ទំនង</span>
                    </a>
                </div>
            </div> -->
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

function goBack() {
    router.back();
}
</script>

<style scoped>
.notfound-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
    padding: 2rem;
    position: relative;
    overflow: hidden;
}

.error-content {
    max-width: 600px;
    width: 100%;
    text-align: center;
    position: relative;
    z-index: 10;
}

/* Animated 404 */
.error-code {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    animation: float 3s ease-in-out infinite;
}

.digit {
    font-size: 8rem;
    font-weight: 900;
    background: linear-gradient(135deg, var(--primary-color), #7c3aed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    text-shadow: 0 10px 30px rgba(124, 58, 237, 0.3);
}

.icon-wrapper {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 50%;
    box-shadow: 0 10px 40px rgba(124, 58, 237, 0.2);
    animation: bounce 2s ease-in-out infinite;
}

.icon-wrapper i {
    font-size: 4rem;
    color: var(--primary-color);
}

/* Floating shapes */
.floating-shapes {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 1;
}

.shape {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(168, 85, 247, 0.1));
    animation: float-shape 20s ease-in-out infinite;
}

.shape-1 {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
}

.shape-2 {
    width: 150px;
    height: 150px;
    bottom: 15%;
    right: 15%;
    animation-delay: -7s;
}

.shape-3 {
    width: 100px;
    height: 100px;
    top: 60%;
    left: 80%;
    animation-delay: -14s;
}

/* Message Card */
.message-card {
    background: white;
    padding: 3rem 2.5rem;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(124, 58, 237, 0.15);
    border: 1px solid rgba(124, 58, 237, 0.1);
    margin-bottom: 2rem;
    animation: slideUp 0.6s ease-out;
}

.message-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-family: "Hanuman", serif;
}

.message-text {
    font-size: 1.1rem;
    color: #64748b;
    line-height: 1.8;
    margin-bottom: 2rem;
    font-family: "Hanuman", serif;
}

/* Button group */
.button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

/* Helpful links */
.helpful-links {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 16px;
    border: 1px solid rgba(124, 58, 237, 0.1);
}

.links-title {
    font-size: 0.9rem;
    color: #64748b;
    margin-bottom: 1rem;
    font-weight: 600;
}

.links-grid {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.link-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: white;
    border-radius: 12px;
    text-decoration: none;
    color: var(--primary-color);
    font-weight: 600;
    transition: all 0.3s ease;
    border: 1px solid rgba(124, 58, 237, 0.2);
    font-size: 0.95rem;
}

.link-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(124, 58, 237, 0.2);
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.link-item i {
    font-size: 1.1rem;
}

/* Animations */
@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
}

@keyframes bounce {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

@keyframes float-shape {
    0%, 100% {
        transform: translate(0, 0) rotate(0deg);
    }
    33% {
        transform: translate(30px, -30px) rotate(120deg);
    }
    66% {
        transform: translate(-20px, 20px) rotate(240deg);
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .digit {
        font-size: 5rem;
    }

    .icon-wrapper {
        width: 80px;
        height: 80px;
    }

    .icon-wrapper i {
        font-size: 2.5rem;
    }

    .message-card {
        padding: 2rem 1.5rem;
    }

    .message-title {
        font-size: 1.5rem;
    }

    .message-text {
        font-size: 1rem;
    }

    .button-group {
        flex-direction: column;
    }

    .links-grid {
        flex-direction: column;
    }

    .link-item {
        justify-content: center;
    }

    .shape {
        display: none;
    }
}

@media (max-width: 480px) {
    .digit {
        font-size: 4rem;
    }

    .icon-wrapper {
        width: 60px;
        height: 60px;
    }

    .icon-wrapper i {
        font-size: 2rem;
    }

    .error-code {
        gap: 0.5rem;
    }
}
</style>
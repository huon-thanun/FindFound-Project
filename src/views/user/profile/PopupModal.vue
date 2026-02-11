<template>
  <Teleport to="body">
    <Transition name="popup-fade">
      <div v-if="show" class="popup-overlay" @click.self="close">
        <div class="popup-card" :class="type">
          <p>{{ message }}</p>
          <button @click="close">OK</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  const props = defineProps({
    message: { type: String, default: "" },
    type: { type: String, default: "success" }, // success | error
    show: { type: Boolean, default: false },
  });

  const emit = defineEmits(["close"]);

  const close = () => {
    emit("close");
  };
</script>

<style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  .popup-card {
    background: white;
    padding: 30px 40px;
    border-radius: 20px;
    min-width: 300px;
    text-align: center;
    font-weight: 600;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    animation: popup-zoom 0.3s ease-out;
  }
  .popup-card.success {
    border-top: 6px solid #00d084;
  }
  .popup-card.error {
    border-top: 6px solid #f44336;
  }
  .popup-card button {
    margin-top: 15px;
    padding: 8px 20px;
    border: none;
    background: #7c3aed;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 700;
  }
  .popup-card button:hover {
    background: #3b1e54;
  }

  @keyframes popup-zoom {
    0% {
      transform: scale(0.7);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .popup-fade-enter-active,
  .popup-fade-leave-active {
    transition: opacity 0.2s;
  }
  .popup-fade-enter-from,
  .popup-fade-leave-to {
    opacity: 0;
  }
</style>

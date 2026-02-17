<template>
  <Transition name="loader">
    <div v-if="visible" class="gkt-loader">
      <div class="loader-content">
        <div class="loader-logo mb-4">
          <img src="/images/grandkru_icon.png" alt="Grand Kru Technologies" class="img-fluid" />
        </div>
        <div class="loader-spinner">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <p class="loader-text mt-3">Loading...</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";

interface Props {
  visible?: boolean;
  refreshCount?: number;
  smoothTransitionEnabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  visible: true,
  refreshCount: 0,
  smoothTransitionEnabled: true,
});

const emit = defineEmits<{
  rendered: [];
  ready: [];
  leaving: [];
  completed: [];
}>();

onMounted(() => {
  emit("rendered");
  setTimeout(() => {
    emit("ready");
  }, 500);
  setTimeout(() => {
    emit("leaving");
  }, 1500);
  setTimeout(() => {
    emit("completed");
  }, 2000);
});

watch(
  () => props.refreshCount,
  () => {
    if (props.visible) {
      emit("rendered");
      setTimeout(() => emit("ready"), 300);
      setTimeout(() => emit("leaving"), 800);
      setTimeout(() => emit("completed"), 1200);
    }
  }
);
</script>

<style lang="scss" scoped>
@use "@/scss/theming" as *;

.gkt-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: $dark;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader-content {
  text-align: center;
}

.loader-logo img {
  max-width: 120px;
  animation: pulse 2s infinite;
}

.loader-text {
  color: $light-5;
  font-size: 0.9rem;
}

.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.5s ease;
}

.loader-enter-from,
.loader-leave-to {
  opacity: 0;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}
</style>

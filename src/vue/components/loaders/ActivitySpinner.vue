<template>
  <Transition name="spinner">
    <div v-if="visible" class="gkt-activity-spinner">
      <div class="spinner-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p v-if="message" class="spinner-message mt-3">{{ message }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  visible?: boolean;
  message?: string;
}

withDefaults(defineProps<Props>(), {
  visible: false,
  message: "",
});
</script>

<style lang="scss" scoped>
@use "@/scss/theming" as *;

.gkt-activity-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($dark, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
}

.spinner-content {
  text-align: center;
}

.spinner-message {
  color: $white;
  font-size: 1rem;
}

.spinner-enter-active,
.spinner-leave-active {
  transition: opacity 0.3s ease;
}

.spinner-enter-from,
.spinner-leave-to {
  opacity: 0;
}
</style>

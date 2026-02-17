<template>
  <div class="gkt-feature-item text-center p-4 h-100">
    <div class="feature-icon mb-3">
      <i :class="faIcon" />
    </div>
    <h5 class="feature-title mb-2">{{ title }}</h5>
    <p class="feature-description text-3 mb-0">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
  faIcon?: string;
}

withDefaults(defineProps<Props>(), {
  title: "",
  description: "",
  faIcon: "fa-solid fa-star",
});
</script>

<style lang="scss" scoped>
div.gkt-feature-item {
  background-color: $white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
}

.feature-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, $primary, darken($primary, 10%));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  i {
    font-size: 1.5rem;
    color: $white;
  }
}

.feature-title {
  color: $dark;
  font-weight: bold;
}

.feature-description {
  color: $light-6;
}
</style>

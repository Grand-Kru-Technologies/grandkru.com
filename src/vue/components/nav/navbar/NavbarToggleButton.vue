<template>
  <button class="gkt-navbar-toggle" :class="collapsed ? 'closed' : 'open'" type="button">
    <i :class="icon" class="ms-1 me-1" />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  collapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: true,
});

const icon = computed(() => {
  return props.collapsed ? "fas fa-bars" : "fas fa-minimize";
});
</script>

<style lang="scss" scoped>
button.gkt-navbar-toggle {
  $button-size: 40px;

  position: absolute;
  top: calc($navbar-height / 2 - $button-size / 2);
  right: 25px;

  width: $button-size;
  height: $button-size;
  background-color: $nav-background-color;

  font-size: 0.75rem;
  font-family: $headings-font-family;
  font-weight: bold;

  border: 2px solid lighten($nav-background-color, 5%);
  border-radius: 10px;
  color: $light-4;

  display: flex;
  align-items: center;
  justify-content: center;

  outline: none !important;
  box-shadow: none !important;

  @include media-breakpoint-up(lg) {
    display: none;
  }

  @media (max-height: 400px) {
    top: calc($navbar-height / 2 - $button-size / 2 - 5px);
  }
}

button.gkt-navbar-toggle.open {
  background-color: lighten($nav-background-color, 5%);
  border-color: lighten($nav-background-color, 10%);
  color: $white;
}
</style>

<template>
  <div class="gkt-promo-background" :class="{ 'gkt-promo-background-faded': faded }">
    <img src="/images/backgrounds/promo-bg.jpg" alt="Promo Background" class="img-fluid" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  faded?: boolean;
}

withDefaults(defineProps<Props>(), {
  faded: false,
});
</script>

<style lang="scss" scoped>
div.gkt-promo-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

div.gkt-promo-background-faded {
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba($primary, 0.9), rgba($dark, 0.85));
  }
}
</style>

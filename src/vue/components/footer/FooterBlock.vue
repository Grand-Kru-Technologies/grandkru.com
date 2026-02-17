<template>
  <div class="gkt-footer-block" :class="className">
    <div class="container-xxl">
      <div v-if="row" class="row gkt-footer-row">
        <slot />
      </div>
      <slot v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  darken?: boolean;
  row?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  darken: false,
  row: false,
});

const className = computed(() => {
  return props.darken ? "gkt-footer-block-darken" : "";
});
</script>

<style lang="scss" scoped>
div.gkt-footer-block {
  min-height: 40px;
  background-color: $footer-bg-color;
  padding: 1rem 0;
  text-align: center;
  &-darken {
    background-color: $footer-bg-highlight-color;
  }
}

div.gkt-footer-row {
  padding: 1rem 0;
}
</style>

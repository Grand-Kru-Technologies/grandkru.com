<template>
  <div class="gkt-navbar-brand" :class="{ 'gkt-navbar-brand-expand': expand }">
    <img :src="logo" alt="Grand Kru Technologies Logo" class="img img-fluid gkt-navbar-brand-img" />
    <span v-html="parsedLabel" class="gkt-navbar-brand-text" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUtils } from "@/composables/utils";

const utils = useUtils();

interface Props {
  logo?: string;
  label?: string;
  expand?: boolean;
}

const props = defineProps<Props>();

const parsedLabel = computed(() => {
  return utils.parseCustomText(props.label || "");
});
</script>

<style lang="scss" scoped>
div.gkt-navbar-brand {
  // Base declarations first
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  font-family: $headings-font-family;
  font-weight: bold;
  color: $text-normal-contrast;
  margin-top: 5px;
  transition: font-size 0.3s ease-in-out;
  padding: 5px 0 5px;

  // Responsive styles
  @include generate-dynamic-styles-with-hash(
    (
      xxxl: (
        font-size: 1.4rem
      ),
      lg: (
        font-size: 1.25rem
      )
    )
  );

  @include media-breakpoint-down(lg) {
    padding-top: 8px;
    transition: none;
  }

  @media (max-height: 400px) {
    font-size: 1.2rem;
  }

  // Nested selector
  img.gkt-navbar-brand-img {
    height: 3rem;
    width: 3rem;
  }
}

img.gkt-navbar-brand-img {
  // Base declarations first
  position: relative;
  top: -0.1rem;
  margin-right: 0.5rem;
  transition:
    height 0.3s ease-in-out,
    width 0.3s ease-in-out;

  // Responsive styles
  @include generate-dynamic-styles-with-hash(
    (
      xxxl: (
        height: 3.4rem,
        width: 3.4rem
      ),
      lg: (
        height: 3rem,
        width: 3rem
      )
    )
  );

  @include media-breakpoint-down(lg) {
    transition: none;
  }

  @media (max-height: 400px) {
    height: 2.5rem !important;
    width: 2.5rem !important;
  }
}

div.gkt-navbar-brand-expand {
  font-size: 1.5rem;
  img.gkt-navbar-brand-img {
    width: 3.4rem;
    height: 3.4rem;
  }

  @include media-breakpoint-down(xl) {
    font-size: 1.45rem;
    img.gkt-navbar-brand-img {
      width: 3.2rem;
      height: 3.2rem;
    }
  }
}
</style>

<template>
  <section class="gkt-section" :id="id" :class="classList">
    <BackgroundPromo v-if="variant === 'promo'" :faded="true" />
    <div class="container-xxl">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BackgroundPromo from "./BackgroundPromo.vue";

interface Props {
  id?: string;
  variant?: "default" | "primary" | "dark" | "promo";
  name?: string;
  faIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const classList = computed(() => {
  return props.variant ? `gkt-section-${props.variant}` : "";
});
</script>

<style lang="scss">
section.gkt-section {
  // Base declarations first (before any nested rules/mixins)
  background-color: $background-color;
  position: relative;

  // Mixin that generates @media queries
  @include generate-dynamic-styles-with-hash(
    (
      xxxl: (
        padding: 4rem 0em 5rem
      ),
      xxl: (
        padding: 3rem 0rem 3.5rem
      ),
      lg: (
        padding: 2.5rem 0rem 3.5rem
      ),
      md: (
        padding: 2.25rem 0rem 3.25rem
      ),
      sm: (
        padding: 2rem 0rem 3rem
      )
    )
  );

  .gkt-promo-background {
    display: block;
    margin-top: -4rem;
  }
}

section.gkt-section-primary {
  background-color: lighten($primary, 42%);
}

section.gkt-section-dark {
  background-color: lighten($dark, 10%);
  color: $text-normal-contrast;

  h5.gkt-section-header-subtitle {
    color: $light-5;
  }
}

section.gkt-section-promo {
  background-color: transparent;
}
</style>

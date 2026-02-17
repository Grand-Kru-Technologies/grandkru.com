<template>
  <div class="gkt-section-header">
    <h1 class="gkt-section-header-title" v-html="parsedTitle" />
    <h5 class="gkt-section-header-subtitle pt-1" v-html="parsedSubtitle" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUtils } from "@/composables/utils";

const utils = useUtils();

interface Props {
  title?: string;
  subtitle?: string;
  contrast?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  subtitle: "",
  contrast: false,
});

const parsedTitle = computed(() => utils.parseCustomText(props.title, props.contrast));
const parsedSubtitle = computed(() => utils.parseCustomText(props.subtitle));
</script>

<style lang="scss" scoped>
div.gkt-section-header {
  // Base declaration first
  text-align: center;

  // Responsive styles
  @include generate-dynamic-styles-with-hash(
    (
      xxxl: (
        margin-bottom: 4rem
      ),
      xxl: (
        margin-bottom: 3rem
      ),
      lg: (
        margin-bottom: 3rem
      ),
      md: (
        margin-bottom: 2.75rem
      ),
      sm: (
        margin-bottom: 2.5rem
      )
    )
  );
}

h1 {
  text-transform: uppercase;
  color: inherit;
}

h5 {
  font-family: $font-family-base;
  color: $text-muted;
}
</style>

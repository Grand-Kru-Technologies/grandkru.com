<template>
  <article class="gkt-features-article">
    <div class="row">
      <div v-for="(feature, index) in features" :key="index" class="col-12 col-md-6 col-lg-4 mb-4">
        <ItemFeature :title="feature.title" :description="feature.description" :fa-icon="feature.faIcon" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import ItemFeature from "./items/ItemFeature.vue";

interface Feature {
  title: string;
  description: string;
  faIcon?: string;
}

interface Props {
  features?: Feature[];
}

withDefaults(defineProps<Props>(), {
  features: () => [],
});
</script>

<style lang="scss" scoped></style>

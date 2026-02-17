<template>
  <article class="gkt-info-block-article">
    <div class="row align-items-center" :class="{ 'flex-row-reverse': reverse }">
      <div class="col-12 col-lg-6 mb-4 mb-lg-0">
        <div v-if="image" class="info-block-image">
          <img :src="image" :alt="imageAlt" class="img-fluid rounded-3" />
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="info-block-content" :class="{ 'ps-lg-5': !reverse, 'pe-lg-5': reverse }">
          <h3 v-if="title" v-html="parsedTitle" class="mb-3" />
          <div v-for="(paragraph, index) in description" :key="index">
            <p v-html="utils.parseCustomText(paragraph)" class="text-3 mb-3" />
          </div>
          <slot />
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUtils } from "@/composables/utils";

const utils = useUtils();

interface Props {
  title?: string;
  description?: string[];
  image?: string;
  imageAlt?: string;
  reverse?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  description: () => [],
  image: "",
  imageAlt: "",
  reverse: false,
});

const parsedTitle = computed(() => utils.parseCustomText(props.title));
</script>

<style lang="scss" scoped>
article.gkt-info-block-article {
  margin-bottom: 3rem;
}

.info-block-image img {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.info-block-content {
  h3 {
    color: $dark;
  }

  p {
    color: $light-7;
  }
}
</style>

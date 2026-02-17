<template>
  <article class="gkt-paragraph-article">
    <div v-if="title" class="article-heading">
      <h4 class="mb-2">
        <i v-if="faIcon" :class="faIcon" class="me-2" />
        <span v-html="parsedTitle" />
      </h4>
    </div>

    <div class="article-content">
      <p v-for="(paragraph, index) in description" :key="index" v-html="utils.parseCustomText(paragraph)" class="text-3" />
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUtils } from "@/composables/utils";

const utils = useUtils();

interface Props {
  title?: string;
  faIcon?: string;
  description?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  faIcon: "",
  description: () => [],
});

const parsedTitle = computed(() => utils.parseCustomText(props.title));
</script>

<style lang="scss" scoped>
article.gkt-paragraph-article {
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
}

div.article-heading {
  color: $dark;
}

p {
  color: $light-7;
  text-align: justify;
  margin-bottom: 1rem;
}
</style>

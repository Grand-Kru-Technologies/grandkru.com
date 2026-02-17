<template>
  <router-link v-if="isRouterLink" :to="url">
    <slot />
  </router-link>

  <button v-else-if="isHashLink" class="btn-link-wrapper" @click="onHashLinkClicked">
    <slot />
  </button>

  <a v-else-if="isExternalLink" class="btn-link-wrapper" :href="url" target="_blank">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLayout } from "@/composables/layout";

interface Props {
  url: string;
}

const props = defineProps<Props>();
const layout = useLayout();

const isRouterLink = computed(() => String(props.url).charAt(0) === "/");
const isHashLink = computed(() => String(props.url).charAt(0) === "#");
const isExternalLink = computed(() => String(props.url).includes("http"));

const onHashLinkClicked = (): void => {
  if (props.url === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.location.hash = "";
    return;
  }

  window.location.hash = props.url;
  const sectionDiv = document.querySelector(props.url);
  if (sectionDiv) {
    layout.scrollIntoView(sectionDiv as HTMLElement);
  }
};
</script>

<style lang="scss" scoped>
button.btn-link-wrapper {
  padding: 0;
  margin: 0;
  background: transparent;
  border: 0;
  outline: none;
  box-shadow: none;
}
</style>

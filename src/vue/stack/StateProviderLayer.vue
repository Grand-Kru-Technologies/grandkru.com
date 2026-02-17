<template>
  <slot />
</template>

<script setup lang="ts">
import { provide, ref, type Ref } from "vue";
import { useSettings } from "@/composables/settings";
import type SectionInfo from "@/models/SectionInfo";
import { LoaderAnimationStatus, type LoaderAnimationStatusType } from "@/types/loader";

const settings = useSettings();

// Global state CONSTANTS
const loaderEnabled = settings.getLoaderEnabled();

// Global state FLAGS
const currentPageSections: Ref<SectionInfo[]> = ref([]);
const loaderActive = ref(true);
const loaderPageRefreshCount = ref(0);
const loaderSmoothTransitionEnabled = ref(true);
const loaderAnimationStatus: Ref<LoaderAnimationStatusType | null> = ref(null);
const projectModalTarget = ref(null);
const spinnerActive = ref(false);
const spinnerMessage = ref("");

const setSpinnerEnabled = (enabled: boolean, message = ""): void => {
  spinnerActive.value = enabled;
  spinnerMessage.value = message;
};

// Provide all state to child components
provide("loaderEnabled", loaderEnabled);
provide("LoaderAnimationStatus", LoaderAnimationStatus);

provide("currentPageSections", currentPageSections);
provide("loaderActive", loaderActive);
provide("loaderPageRefreshCount", loaderPageRefreshCount);
provide("loaderSmoothTransitionEnabled", loaderSmoothTransitionEnabled);
provide("loaderAnimationStatus", loaderAnimationStatus);
provide("projectModalTarget", projectModalTarget);
provide("spinnerActive", spinnerActive);
provide("spinnerMessage", spinnerMessage);

provide("setSpinnerEnabled", setSpinnerEnabled);
</script>

<style lang="scss" scoped></style>

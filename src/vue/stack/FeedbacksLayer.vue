<template>
  <ActivitySpinner
    :visible="Boolean(spinnerActive)"
    :message="String(spinnerMessage)"
  />

  <Loader
    v-if="loaderEnabled"
    :visible="Boolean(loaderActive)"
    :refresh-count="Number(loaderPageRefreshCount)"
    :smooth-transition-enabled="Boolean(loaderSmoothTransitionEnabled)"
    @rendered="onLoaderRendered"
    @ready="onLoaderReady"
    @leaving="onLoaderWillLeave"
    @completed="onLoaderCompleted"
  />

  <slot v-if="isReady" />
</template>

<script setup lang="ts">
import { inject, ref, watch, type Ref } from "vue";
import ActivitySpinner from "@/vue/components/loaders/ActivitySpinner.vue";
import Loader from "@/vue/components/loaders/Loader.vue";
import type { LoaderAnimationStatusType } from "@/types/loader";

const loaderEnabled = inject<boolean>("loaderEnabled");
const LoaderAnimationStatus = inject<
  Record<string, LoaderAnimationStatusType>
>("LoaderAnimationStatus")!;
const loaderActive = inject<Ref<boolean>>("loaderActive")!;
const loaderPageRefreshCount = inject<Ref<number>>("loaderPageRefreshCount")!;
const loaderSmoothTransitionEnabled = inject<Ref<boolean>>(
  "loaderSmoothTransitionEnabled"
)!;
const loaderAnimationStatus = inject<Ref<LoaderAnimationStatusType | null>>(
  "loaderAnimationStatus"
)!;
const spinnerActive = inject<Ref<boolean>>("spinnerActive")!;
const spinnerMessage = inject<Ref<string>>("spinnerMessage")!;

const isReady = ref(!loaderEnabled);

watch(
  () => loaderEnabled,
  () => {
    if (loaderEnabled) {
      loaderAnimationStatus.value = LoaderAnimationStatus.INITIALIZED;
    }
  }
);

const onLoaderRendered = (): void => {
  loaderAnimationStatus.value = LoaderAnimationStatus.RENDERED;
};

const onLoaderReady = (): void => {
  isReady.value = true;
  loaderAnimationStatus.value = LoaderAnimationStatus.TRACKING_PROGRESS;
};

const onLoaderWillLeave = (): void => {
  loaderAnimationStatus.value = LoaderAnimationStatus.LEAVING;
};

const onLoaderCompleted = (): void => {
  loaderActive.value = false;
};
</script>

<style lang="scss" scoped></style>

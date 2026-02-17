<template>
  <!-- Main Content -->
  <slot v-if="shouldSlot" />

  <!-- Project Modal (for portfolio) -->
  <ProjectModal
    v-if="projectModalTarget"
    :project="projectModalTarget"
    @close="onProjectModalClosed"
  />
</template>

<script setup lang="ts">
import { computed, inject, watch, type Ref } from "vue";
import { useRouter } from "vue-router";
import { useLayout } from "@/composables/layout";
import { useScheduler } from "@/composables/scheduler";
import ProjectModal from "@/vue/components/projects/ProjectModal.vue";
import type { LoaderAnimationStatusType } from "@/types/loader";

const router = useRouter();
const layout = useLayout();
const scheduler = useScheduler();

const loaderEnabled = inject<boolean>("loaderEnabled");
const loaderActive = inject<Ref<boolean>>("loaderActive")!;
const loaderPageRefreshCount = inject<Ref<number>>("loaderPageRefreshCount")!;
const loaderSmoothTransitionEnabled = inject<Ref<boolean>>(
  "loaderSmoothTransitionEnabled"
)!;
const projectModalTarget = inject<Ref<unknown>>("projectModalTarget")!;
const LoaderAnimationStatus = inject<
  Record<string, LoaderAnimationStatusType>
>("LoaderAnimationStatus")!;
const loaderAnimationStatus = inject<Ref<LoaderAnimationStatusType | null>>(
  "loaderAnimationStatus"
)!;

const shouldSlot = computed(() => {
  return (
    !loaderEnabled ||
    loaderAnimationStatus.value === LoaderAnimationStatus.TRACKING_PROGRESS ||
    loaderAnimationStatus.value === LoaderAnimationStatus.LEAVING
  );
});

let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

watch(
  () => loaderAnimationStatus.value,
  () => {
    if (loaderAnimationStatus.value === LoaderAnimationStatus.LEAVING) {
      const hash = window.location.hash;
      const element = hash ? document.querySelector(hash) : null;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
        scrollTimeout = null;
      }

      if (!element || !loaderEnabled) {
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }

      scrollElementIntoView(element as HTMLElement);
    }
  }
);

const scrollElementIntoView = (element: HTMLElement): void => {
  const canScroll = layout.isBodyScrollEnabled();

  if (!canScroll) {
    scrollTimeout = setTimeout(() => {
      scrollElementIntoView(element);
    }, 100);
    return;
  }

  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
    scrollTimeout = null;
  }

  element.scrollIntoView({ behavior: "smooth" });
};

router.beforeEach((to, from, next) => {
  if (from.name === to.name || !loaderEnabled) {
    next();
    return;
  }

  const shouldIgnorePreloader =
    to.matched && to.matched.length
      ? !(to.matched[0].props as Record<string, Record<string, boolean>>)
          .default?.["shouldAlwaysPreload"]
      : false;

  if (shouldIgnorePreloader) {
    next();
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }

  loaderActive.value = true;
  const isDifferentRoute = from && to && from.path !== to.path;
  const isDifferentRouteName = from && to && from.name !== to.name;

  loaderPageRefreshCount.value = isDifferentRouteName
    ? loaderPageRefreshCount.value + 1
    : loaderPageRefreshCount.value;

  loaderSmoothTransitionEnabled.value = isDifferentRoute;

  setTimeout(() => {
    next();
  }, 850);
});

router.afterEach((to, from) => {
  const isDifferentRoute = from && to && from.path !== to.path;
  if (!isDifferentRoute) return;

  window.scrollTo({ top: 0, behavior: "smooth" });
});

const onProjectModalClosed = (): void => {
  projectModalTarget.value = null;
};
</script>

<style lang="scss" scoped></style>

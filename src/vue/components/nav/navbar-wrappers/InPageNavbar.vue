<template>
  <Navbar
    :brand-logo="logo"
    :brand-label="label"
    brand-url="#"
    :link-list="linkList"
    :expandable="true"
  />
</template>

<script setup lang="ts">
import Navbar from "@/vue/components/nav/navbar/Navbar.vue";
import { computed, inject, onMounted, onUnmounted, ref, watch, type Ref } from "vue";
import { useRoute } from "vue-router";
import { useLayout } from "@/composables/layout";
import type SectionInfo from "@/models/SectionInfo";
import type { LoaderAnimationStatusType } from "@/types/loader";

const route = useRoute();
const layout = useLayout();

const currentPageSections = inject<Ref<SectionInfo[]>>("currentPageSections");
const LoaderAnimationStatus = inject<Record<string, LoaderAnimationStatusType>>("LoaderAnimationStatus")!;
const loaderAnimationStatus = inject<Ref<LoaderAnimationStatusType | null>>("loaderAnimationStatus")!;

const currentSection = ref<SectionInfo | null>(null);

interface Props {
  logo?: string;
  label?: string;
}

defineProps<Props>();

const linkList = computed(() => {
  const sections = currentPageSections?.value;
  if (!sections || !sections.length) return [];

  return sections
    .map((section) => ({
      path: section.hash,
      label: section.name || "",
      faIcon: section.faIcon,
      isActive: currentSection.value?.id === section.id,
    }))
    .filter((section) => section.label && section.path);
});

onMounted(() => {
  window.addEventListener("scroll", onWindowEvent);
  window.addEventListener("resize", onWindowEvent);
  initSpyScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", onWindowEvent);
  window.removeEventListener("resize", onWindowEvent);
});

watch(
  () => loaderAnimationStatus.value,
  () => {
    if (loaderAnimationStatus.value === LoaderAnimationStatus.LEAVING) {
      onWindowEvent();
    }
  }
);

const initSpyScroll = (): void => {
  setTimeout(() => {
    onWindowEvent();
    scrollHashSectionIntoView();
  }, 400);
};

const scrollHashSectionIntoView = (): void => {
  const hash = route.hash;
  if (!hash) return;

  const sectionDiv = document.querySelector(hash);
  if (sectionDiv) {
    layout.scrollIntoView(sectionDiv as HTMLElement);
  }
};

const onWindowEvent = (): void => {
  let lowestOffset: number | null = null;

  if (window.scrollY < window.innerHeight / 4) {
    currentSection.value = null;
    return;
  }

  const sections = currentPageSections?.value || [];
  for (const section of sections) {
    const sectionDiv = document.querySelector(section.hash);
    if (!sectionDiv) continue;

    const offset = Math.abs(sectionDiv.getBoundingClientRect().y);
    if (lowestOffset === null || offset < lowestOffset) {
      lowestOffset = offset;
      currentSection.value = section;
    }
  }
};
</script>

<style lang="scss" scoped></style>

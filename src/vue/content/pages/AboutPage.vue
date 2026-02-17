<template>
  <PageWrapper id="about-page" :sections="sections" />
</template>

<script setup lang="ts">
import PageWrapper from "@/vue/components/layout/PageWrapper.vue";
import { SectionInfo } from "@/models";
import AboutSection from "@/vue/content/sections/AboutSection.vue";

const sections = [
  new SectionInfo("about", AboutSection, "About Us", "fa-solid fa-info-circle"),
];
</script>

<style lang="scss" scoped></style>

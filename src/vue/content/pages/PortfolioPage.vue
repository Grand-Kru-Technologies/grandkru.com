<template>
  <PageWrapper id="portfolio-page" :sections="sections" />
</template>

<script setup lang="ts">
import PageWrapper from "@/vue/components/layout/PageWrapper.vue";
import { SectionInfo } from "@/models";
import PortfolioSection from "@/vue/content/sections/PortfolioSection.vue";

const sections = [
  new SectionInfo("portfolio", PortfolioSection, "Our Portfolio", "fa-solid fa-folder-open"),
];
</script>

<style lang="scss" scoped></style>

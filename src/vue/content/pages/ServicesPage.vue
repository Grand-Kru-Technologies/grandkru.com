<template>
  <PageWrapper id="services-page" :sections="sections" />
</template>

<script setup lang="ts">
import PageWrapper from "@/vue/components/layout/PageWrapper.vue";
import { SectionInfo } from "@/models";
import ServicesSection from "@/vue/content/sections/ServicesSection.vue";

const sections = [
  new SectionInfo("services", ServicesSection, "Our Services", "fa-solid fa-briefcase"),
];
</script>

<style lang="scss" scoped></style>

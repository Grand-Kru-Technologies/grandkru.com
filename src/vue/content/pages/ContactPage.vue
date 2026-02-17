<template>
  <PageWrapper id="contact-page" :sections="sections" />
</template>

<script setup lang="ts">
import PageWrapper from "@/vue/components/layout/PageWrapper.vue";
import { SectionInfo } from "@/models";
import ContactSection from "@/vue/content/sections/ContactSection.vue";

const sections = [
  new SectionInfo("contact", ContactSection, "Contact Us", "fa-solid fa-envelope"),
];
</script>

<style lang="scss" scoped></style>

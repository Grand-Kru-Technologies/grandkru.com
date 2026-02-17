<template>
  <PageWrapper id="home-page" :sections="sections" :no-padding="true" />
</template>

<script setup lang="ts">
import PageWrapper from "@/vue/components/layout/PageWrapper.vue";
import { SectionInfo } from "@/models";
import HeroSection from "@/vue/content/sections/HeroSection.vue";
import AboutSection from "@/vue/content/sections/AboutSection.vue";
import ServicesSection from "@/vue/content/sections/ServicesSection.vue";
import PortfolioSection from "@/vue/content/sections/PortfolioSection.vue";
import ContactSection from "@/vue/content/sections/ContactSection.vue";

const sections = [
  new SectionInfo("hero", HeroSection, "Home", "fa-solid fa-home"),
  new SectionInfo("about", AboutSection, "About", "fa-solid fa-info-circle"),
  new SectionInfo("services", ServicesSection, "Services", "fa-solid fa-briefcase"),
  new SectionInfo("portfolio", PortfolioSection, "Portfolio", "fa-solid fa-folder-open"),
  new SectionInfo("contact", ContactSection, "Contact", "fa-solid fa-envelope"),
];
</script>

<style lang="scss" scoped></style>

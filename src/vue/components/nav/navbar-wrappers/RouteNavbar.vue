<template>
  <Navbar
    :brand-logo="logo"
    :brand-label="label"
    brand-url="/"
    :link-list="linkList"
    :expandable="false"
  />
</template>

<script setup lang="ts">
import Navbar from "@/vue/components/nav/navbar/Navbar.vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

interface Props {
  logo?: string;
  label?: string;
}

defineProps<Props>();

const linkList = computed(() => {
  return router
    .getRoutes()
    .map((r) => ({
      path: r.path,
      label: (r?.props?.default as Record<string, string>)?.label || String(r.name || ""),
      faIcon: (r?.props?.default as Record<string, string>)?.faIcon || "fa-solid fa-circle",
      isActive: route.path === r.path,
    }))
    .filter((r) => r.label);
});
</script>

<style lang="scss" scoped></style>

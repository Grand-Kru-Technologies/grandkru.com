<template>
  <div class="navigation">
    <InPageNavbar v-if="shouldDisplayInPageNavBar" :logo="logo" :label="label" />
    <RouteNavbar v-else :logo="logo" :label="label" />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import RouteNavbar from "./navbar-wrappers/RouteNavbar.vue";
import InPageNavbar from "./navbar-wrappers/InPageNavbar.vue";

const route = useRoute();
const router = useRouter();

interface Props {
  logo?: string;
  label?: string;
}

defineProps<Props>();

const shouldDisplayInPageNavBar = computed(() => {
  const routeInfo = router.getRoutes().find((r) => r.name === route.name);
  if (!routeInfo || !routeInfo.props || !routeInfo.props.default) return true;

  return (routeInfo.props.default as Record<string, boolean>)["inPageNavbar"];
});
</script>

<style lang="scss" scoped></style>

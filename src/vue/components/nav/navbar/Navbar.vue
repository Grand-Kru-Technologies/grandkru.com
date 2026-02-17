<template>
  <nav class="gkt-navbar" :class="shouldExpand ? 'gkt-navbar-expanded' : 'gkt-navbar-compressed'">
    <div class="gkt-navbar-container container-xxl">
      <Link :url="brandUrl">
        <NavbarBrand :logo="brandLogo" :label="brandLabel" :expand="shouldExpand" />
      </Link>
      <NavbarLinks :items="linkList" :collapsed="isCollapsed" @link-clicked="onLinkClicked" />
      <NavbarToggleButton :collapsed="isCollapsed" @click="onToggleClicked" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import Link from "@/vue/components/generic/Link.vue";
import NavbarBrand from "./NavbarBrand.vue";
import NavbarLinks from "./NavbarLinks.vue";
import NavbarToggleButton from "./NavbarToggleButton.vue";
import { useRoute } from "vue-router";
import { useUtils } from "@/composables/utils";

const route = useRoute();
const utils = useUtils();

interface NavLink {
  path: string;
  label: string;
  faIcon?: string;
  isActive?: boolean;
}

interface Props {
  brandLogo?: string;
  brandLabel?: string;
  brandUrl?: string;
  linkList?: NavLink[];
  expandable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  brandUrl: "/",
  linkList: () => [],
  expandable: false,
});

const isCollapsed = ref(true);
const shouldExpand = ref(false);

onMounted(() => {
  window.addEventListener("scroll", onWindowEvent);
  window.addEventListener("resize", onWindowEvent);
  onWindowEvent();
});

onUnmounted(() => {
  window.removeEventListener("scroll", onWindowEvent);
  window.removeEventListener("resize", onWindowEvent);
});

watch(() => route.path, () => {
  isCollapsed.value = true;
});

const onWindowEvent = (): void => {
  shouldExpand.value =
    props.expandable &&
    window.scrollY === 0 &&
    window.innerWidth >= utils.BOOTSTRAP_BREAKPOINTS.lg;
};

const onToggleClicked = (): void => {
  isCollapsed.value = !isCollapsed.value;
};

const onLinkClicked = (): void => {
  isCollapsed.value = true;
};
</script>

<style lang="scss" scoped>
nav.gkt-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: $navbar-height;
  z-index: 10;
  background-color: $nav-background-color;
  transition: 0.3s ease-in-out padding;

  @include media-breakpoint-down(lg) {
    transition: none;
  }

  @media (max-height: 400px) {
    min-height: calc($navbar-height - 20px);
  }
}

nav.gkt-navbar-expanded {
  @include media-breakpoint-up(lg) {
    background-color: rgba(black, 0.01);
    padding: 15px 0;
  }
  @include media-breakpoint-up(xl) {
    padding: 15px;
  }
}

div.gkt-navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: $navbar-height;
  height: 100%;

  @include media-breakpoint-down(lg) {
    flex-direction: column;
    align-items: start;
  }

  @media (max-height: 400px) {
    min-height: calc($navbar-height - 20px);
  }
}
</style>

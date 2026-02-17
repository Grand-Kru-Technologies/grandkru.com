<template>
  <div class="gkt-navbar-links-wrapper">
    <ul class="gkt-navbar-links" :class="{ collapsed: collapsed }">
      <li v-for="(link, index) in parsedLinks" :key="index">
        <Link :url="link.path">
          <button class="gkt-nav-link" @click="onLinkClicked" :class="link.buttonClass">
            <i v-if="link.faIcon" :class="link.faIcon" class="gkt-nav-link-icon" />
            <span>{{ link.label }}</span>
          </button>
        </Link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import Link from "@/vue/components/generic/Link.vue";

interface NavItem {
  path: string;
  label: string;
  faIcon?: string;
  isActive?: boolean;
}

interface Props {
  items?: NavItem[];
  collapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  collapsed: true,
});

const emit = defineEmits<{
  linkClicked: [];
}>();

const transitionLinks = ref<number[]>([]);

const parsedLinks = computed(() => {
  return props.items.map((item, index) => ({
    path: item.path,
    label: item.label,
    faIcon: item.faIcon,
    buttonClass: {
      active: item.isActive,
      hidden: transitionLinks.value.indexOf(index) === -1,
    },
  }));
});

onMounted(() => {
  executeTransition(props.collapsed);
});

watch(
  () => props.collapsed,
  (newVal) => {
    executeTransition(newVal);
  }
);

const executeTransition = (collapsed: boolean): void => {
  transitionLinks.value = [];
  if (collapsed) return;

  parsedLinks.value.forEach((_, i) => {
    setTimeout(() => {
      transitionLinks.value.push(i);
    }, 50 * i);
  });
};

const onLinkClicked = (): void => {
  emit("linkClicked");
};
</script>

<style lang="scss" scoped>
ul.gkt-navbar-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;

  @include media-breakpoint-down(lg) {
    flex-direction: column;
    margin: 2px 0 15px;
  }
}

ul.gkt-navbar-links.collapsed {
  @include media-breakpoint-down(lg) {
    display: none;
  }
}

button.gkt-nav-link {
  background-color: transparent;
  border: 0;
  padding: 0 0 0 1.2rem;

  font-family: $font-family-base;
  color: $light-3;
  text-transform: uppercase;

  @include media-breakpoint-down(xl) {
    padding: 0 0 0 0.9rem;
  }

  @include media-breakpoint-down(lg) {
    padding: 0 !important;
    min-width: 160px;
    text-align: left;
    margin-left: 12px;
    margin-bottom: 8px;
    font-size: 0.85rem;

    transition:
      0.2s ease-in margin-left,
      0.2s ease-in opacity;
  }

  @media (max-height: 400px) {
    margin-bottom: 4px;
  }
}

i.gkt-nav-link-icon {
  display: none;

  min-width: 1.4rem;
  margin-right: 10px;
  color: $light-6;
  transition: color 0.4s;

  @include media-breakpoint-down(lg) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

button.gkt-nav-link.hidden {
  @include media-breakpoint-down(lg) {
    opacity: 0;
    margin-left: 80px;
  }
}

button.gkt-nav-link:hover,
button.gkt-nav-link.active {
  color: lighten($primary, 5%);
  i.gkt-nav-link-icon {
    color: lighten($primary, 25%);
  }
}
</style>

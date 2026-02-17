<template>
  <div class="gkt-footer-col col-12 col-lg-4">
    <h5 class="gkt-footer-col-title">
      <i v-if="faIcon" :class="faIcon" />
      <span>{{ title }}</span>
    </h5>

    <div v-if="description.length > 0" class="gkt-footer-col-item">
      <div class="gkt-footer-col-description">
        <p v-for="(item, index) in description" :key="index" class="text-2 m-0" v-html="item" />
      </div>
    </div>

    <div v-if="links.length > 0 && displayLinksAsButtons" class="gkt-footer-col-item mt-3">
      <SocialLinks :items="links" variant="dark" size="3" />
    </div>

    <div v-if="links.length > 0 && !displayLinksAsButtons" class="gkt-footer-col-item mt-2 mt-lg-1">
      <InlineLinkList :items="links" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SocialLinks from "@/vue/components/widgets/SocialLinks.vue";
import InlineLinkList from "@/vue/components/widgets/InlineLinkList.vue";

interface FooterLink {
  label: string;
  href: string;
  faIcon?: string | null;
}

interface Props {
  title?: string;
  faIcon?: string;
  description?: string[];
  links?: FooterLink[];
  displayLinksAsButtons?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: "",
  faIcon: "",
  description: () => [],
  links: () => [],
  displayLinksAsButtons: false,
});
</script>

<style lang="scss" scoped>
p,
span {
  color: $light-5;
}

div.gkt-footer-col {
  @include media-breakpoint-down(lg) {
    padding-top: 1.5rem;
    padding-bottom: 2rem;

    &:first-child {
      padding-top: 0;
    }

    &:not(:first-child) {
      border-top: 1px solid lighten($dark, 3%);
    }

    &:last-child {
      padding-bottom: 0;
    }
  }
}

h5.gkt-footer-col-title {
  i,
  span {
    color: $light-1;
    text-transform: uppercase;
  }
}

div.gkt-footer-col-item {
  // Base declarations first
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 380px;

  // Responsive styles
  @include generate-dynamic-styles-with-hash(
    (
      xxxl: (
        padding-top: 0.5rem
      ),
      lg: (
        padding-top: 0.3rem
      )
    )
  );
}

div.gkt-footer-col-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
</style>

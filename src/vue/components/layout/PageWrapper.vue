<template>
  <div class="gkt-page-wrapper" :class="{ 'gkt-page-wrapper-no-padding': noPadding }" :id="id">
    <component
      v-for="sectionInfo in sections"
      :key="sectionInfo.id"
      :is="sectionInfo.component"
      :id="sectionInfo.id"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, onBeforeMount, type Ref } from "vue";
import type SectionInfo from "@/models/SectionInfo";

const currentPageSections = inject<Ref<SectionInfo[]>>("currentPageSections");

interface Props {
  id?: string;
  noPadding?: boolean;
  sections: SectionInfo[];
}

const props = withDefaults(defineProps<Props>(), {
  noPadding: false,
});

onBeforeMount(() => {
  if (currentPageSections) {
    currentPageSections.value = props.sections;
  }
});
</script>

<style lang="scss" scoped>
div.gkt-page-wrapper {
  @include generate-dynamic-styles-with-hash(
    (
      xxxl: (
        padding-top: 2rem
      ),
      xxl: (
        padding-top: 2.75rem
      ),
      lg: (
        padding-top: 3.5rem
      )
    )
  );
}

div.gkt-page-wrapper-no-padding {
  padding-top: 0 !important;
}
</style>

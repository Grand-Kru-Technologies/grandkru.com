<template>
  <p class="gkt-footer-copyright text-1" v-html="formattedCopyright" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStrings } from "@/composables/strings";

const strings = useStrings();

interface Props {
  holder?: string;
  url?: string;
  license?: string;
}

const props = withDefaults(defineProps<Props>(), {
  holder: "",
  url: "",
  license: "",
});

const formattedCopyright = computed(() => {
  return strings.getCopyrightMessage(
    new Date().getFullYear().toString(),
    props.holder,
    props.url,
    props.license
  );
});
</script>

<style lang="scss" scoped>
p {
  color: $light-5;
  padding: 0;
  margin: 0;
}
</style>

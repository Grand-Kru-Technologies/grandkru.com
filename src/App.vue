<template>
  <PasswordProtection>
    <!-- Handles the global state -->
    <StateProviderLayer>
      <!-- Handles the UI feedbacks such as loaders and activity spinners -->
      <FeedbacksLayer>
        <!-- Handles routes/modals -->
        <ContentLayer>
          <!-- App Content -->
          <Master />
        </ContentLayer>
      </FeedbacksLayer>
    </StateProviderLayer>
  </PasswordProtection>
</template>

<script setup lang="ts">
import PasswordProtection from "./components/PasswordProtection.vue";
import StateProviderLayer from "@/vue/stack/StateProviderLayer.vue";
import FeedbacksLayer from "@/vue/stack/FeedbacksLayer.vue";
import ContentLayer from "@/vue/stack/ContentLayer.vue";
import Master from "@/vue/content/Master.vue";
</script>

<style lang="scss"></style>

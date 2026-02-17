<template>
  <PageSection :id="id" variant="default">
    <PageSectionHeader title="Get In *Touch*" subtitle="We would love to hear from you" />
    <PageSectionContent>
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <ContactForm />
        </div>
      </div>
    </PageSectionContent>
  </PageSection>
</template>

<script setup lang="ts">
import PageSection from "@/vue/components/layout/PageSection.vue";
import PageSectionHeader from "@/vue/components/layout/PageSectionHeader.vue";
import PageSectionContent from "@/vue/components/layout/PageSectionContent.vue";
import ContactForm from "@/vue/components/forms/ContactForm.vue";

interface Props {
  id?: string;
}

withDefaults(defineProps<Props>(), {
  id: "contact",
});
</script>

<style lang="scss" scoped></style>

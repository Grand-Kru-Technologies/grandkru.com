<template>
  <Navigation logo="/images/grandkru_icon.png" label="*Grand Kru* Technologies" />
  <router-view />
  <Footer>
    <FooterBlock :darken="false" :row="true">
      <FooterColumn
        title="About"
        fa-icon="pi pi-lightbulb me-2"
        :description="[
          'Grand Kru Technologies delivers innovative technology solutions that drive business growth and digital transformation.',
        ]"
        :links="[
          { label: 'Privacy Policy', href: '/privacy-policy', faIcon: null },
          { label: 'Terms of Service', href: '/terms', faIcon: null },
        ]"
        :display-links-as-buttons="false"
      />

      <FooterColumn
        title="Connect With Us"
        fa-icon=""
        :description="[]"
        :links="[
          { label: 'LinkedIn', href: 'https://linkedin.com/company/grandkru', faIcon: 'fa-brands fa-linkedin' },
          { label: 'Twitter', href: 'https://x.com/grandkru', faIcon: 'fa-brands fa-x-twitter' },
          { label: 'GitHub', href: 'https://github.com/grandkru', faIcon: 'fa-brands fa-github' },
        ]"
        :display-links-as-buttons="true"
      />

      <FooterColumn
        title="Contact Info"
        fa-icon="pi pi-envelope me-2 pe-1"
        :description="['Remote-First Technology Company', 'Serving Clients Globally']"
        :links="[
          { label: 'contact@grandkru.com', href: 'mailto:contact@grandkru.com', faIcon: 'fa-regular fa-envelope' },
        ]"
        :display-links-as-buttons="false"
      />
    </FooterBlock>

    <FooterBlock :darken="true" :row="false">
      <FooterCopyright
        holder="Grand Kru Technologies"
        url="https://grandkru.com"
        license="All Rights Reserved"
      />
    </FooterBlock>
  </Footer>
</template>

<script setup lang="ts">
import Navigation from "@/vue/components/nav/Navigation.vue";
import Footer from "@/vue/components/footer/Footer.vue";
import FooterBlock from "@/vue/components/footer/FooterBlock.vue";
import FooterCopyright from "@/vue/components/footer/FooterCopyright.vue";
import FooterColumn from "@/vue/components/footer/FooterColumn.vue";
</script>

<style lang="scss" scoped></style>

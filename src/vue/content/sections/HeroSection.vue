<template>
  <PageSection :id="id" variant="promo" promo-image="/images/backgrounds/promo-bg.jpg">
    <div class="hero-content text-center">
      <div class="hero-badge mb-4">
        <span class="badge-text">
          <i class="fas fa-rocket me-2"></i>
          Innovative Technology Solutions
        </span>
      </div>
      <h1 class="display-1 text-white mb-4" v-html="utils.parseCustomText(title, true)" />
      <p class="lead text-light-4 mb-5 mx-auto hero-subtitle">{{ subtitle }}</p>
      <div class="hero-actions mb-5">
        <router-link v-if="primaryAction" :to="primaryAction.href" class="btn btn-primary btn-lg me-3 mb-3">
          <i v-if="primaryAction.icon" :class="primaryAction.icon" class="me-2" />
          {{ primaryAction.label }}
        </router-link>
        <router-link v-if="secondaryAction" :to="secondaryAction.href" class="btn btn-outline-light btn-lg mb-3">
          <i v-if="secondaryAction.icon" :class="secondaryAction.icon" class="me-2" />
          {{ secondaryAction.label }}
        </router-link>
      </div>
      
      <!-- Stats Row -->
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-number">50+</div>
          <div class="stat-label">Projects Delivered</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">15+</div>
          <div class="stat-label">Happy Clients</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">5+</div>
          <div class="stat-label">Years Experience</div>
        </div>
      </div>
    </div>
  </PageSection>
</template>

<script setup lang="ts">
import PageSection from "@/vue/components/layout/PageSection.vue";
import { useUtils } from "@/composables/utils";

const utils = useUtils();

interface ActionButton {
  label: string;
  href: string;
  icon?: string;
}

interface Props {
  id?: string;
  title?: string;
  subtitle?: string;
  primaryAction?: ActionButton;
  secondaryAction?: ActionButton;
}

withDefaults(defineProps<Props>(), {
  id: "hero",
  title: "Building the *Future* of Digital Innovation",
  subtitle: "We partner with businesses to create powerful web applications, intelligent automation, and scalable cloud solutions that drive growth and transform operations.",
  primaryAction: () => ({ label: "Start Your Project", href: "#contact", icon: "fas fa-arrow-right" }),
  secondaryAction: () => ({ label: "View Our Work", href: "#portfolio", icon: "fas fa-folder-open" }),
});
</script>

<style lang="scss" scoped>
.hero-content {
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
}

.hero-badge {
  .badge-text {
    display: inline-block;
    background: rgba($primary, 0.2);
    border: 1px solid rgba($primary, 0.4);
    color: lighten($primary, 30%);
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
}

.hero-subtitle {
  max-width: 750px;
  font-size: 1.25rem;
  line-height: 1.8;
}

.btn-primary {
  background: linear-gradient(135deg, $primary, darken($primary, 10%));
  border: none;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba($primary, 0.4);
  }
}

.btn-outline-light {
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  border-width: 2px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 3rem;
  background: rgba(white, 0.05);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(white, 0.1);
  
  @include media-breakpoint-down(md) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 2rem;
  }
}

.stat-item {
  text-align: center;
  
  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: $white;
    font-family: $headings-font-family;
    line-height: 1;
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: $light-5;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
  }
}

.stat-divider {
  width: 1px;
  height: 50px;
  background: rgba(white, 0.2);
  
  @include media-breakpoint-down(md) {
    width: 80px;
    height: 1px;
  }
}
</style>

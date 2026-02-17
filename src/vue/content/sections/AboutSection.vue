<template>
  <PageSection :id="id" variant="default">
    <PageSectionHeader 
      title="About *Us*" 
      subtitle="Passionate technologists building solutions that matter" 
    />
    <PageSectionContent>
      <ArticleInfoBlock
        title="Who *We* Are"
        :description="aboutDescription"
        image="/images/about/team.jpg"
      />
      
      <!-- Values Section -->
      <div class="values-section mt-5 pt-4">
        <div class="row g-4">
          <div class="col-md-4" v-for="value in values" :key="value.title">
            <div class="value-card">
              <div class="value-icon">
                <i :class="value.icon"></i>
              </div>
              <h4 class="value-title">{{ value.title }}</h4>
              <p class="value-description">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </PageSectionContent>
  </PageSection>
</template>

<script setup lang="ts">
import PageSection from "@/vue/components/layout/PageSection.vue";
import PageSectionHeader from "@/vue/components/layout/PageSectionHeader.vue";
import PageSectionContent from "@/vue/components/layout/PageSectionContent.vue";
import ArticleInfoBlock from "@/vue/components/articles/ArticleInfoBlock.vue";

interface Props {
  id?: string;
}

withDefaults(defineProps<Props>(), {
  id: "about",
});

const aboutDescription = [
  "Grand Kru Technologies is a forward-thinking software development company dedicated to helping businesses thrive in the digital age. Founded with a vision to bridge the gap between complex technology and practical business needs, we have grown into a trusted partner for organizations seeking innovative digital solutions.",
  "We specialize in custom web development, AI-powered automation, and scalable cloud infrastructure. Our approach combines deep technical expertise with a genuine understanding of business challenges, ensuring every solution we deliver creates real, measurable value.",
  "What sets us apart is our commitment to long-term partnerships. We do not just build software - we become an extension of your team, invested in your success and dedicated to your growth."
];

const values = [
  {
    icon: "fas fa-lightbulb",
    title: "Innovation First",
    description: "We stay at the cutting edge of technology, bringing fresh ideas and modern solutions to every project we undertake."
  },
  {
    icon: "fas fa-handshake",
    title: "Partnership Approach",
    description: "We believe in building lasting relationships, working alongside our clients as true partners in their success."
  },
  {
    icon: "fas fa-check-double",
    title: "Quality Driven",
    description: "Excellence is non-negotiable. Every line of code we write is crafted with care, tested thoroughly, and built to last."
  }
];
</script>

<style lang="scss" scoped>
.values-section {
  border-top: 1px solid $light-3;
}

.value-card {
  text-align: center;
  padding: 2rem 1.5rem;
  border-radius: 1rem;
  background: $light-1;
  height: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba($dark, 0.1);
  }
}

.value-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, $primary, darken($primary, 10%));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
  
  i {
    font-size: 1.75rem;
    color: white;
  }
}

.value-title {
  color: $dark;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.value-description {
  color: $text-muted;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0;
}
</style>

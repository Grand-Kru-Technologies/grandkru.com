<template>
  <PageSection :id="id" variant="default">
    <PageSectionHeader title="Our *Portfolio*" subtitle="Some of our recent work" />
    <PageSectionContent>
      <div class="row">
        <div v-for="(project, index) in projects" :key="index" class="col-12 col-md-6 col-lg-4 mb-4">
          <div class="portfolio-item" @click="openProject(project)">
            <div class="portfolio-image">
              <img :src="project.image" :alt="project.title" class="img-fluid" />
              <div class="portfolio-overlay">
                <i class="fas fa-search-plus" />
              </div>
            </div>
            <div class="portfolio-info p-3">
              <h5 class="mb-1">{{ project.title }}</h5>
              <p class="text-muted text-2 mb-0">{{ project.category }}</p>
            </div>
          </div>
        </div>
      </div>
    </PageSectionContent>
  </PageSection>
</template>

<script setup lang="ts">
import { inject, type Ref } from "vue";
import PageSection from "@/vue/components/layout/PageSection.vue";
import PageSectionHeader from "@/vue/components/layout/PageSectionHeader.vue";
import PageSectionContent from "@/vue/components/layout/PageSectionContent.vue";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags?: string[];
  link?: string;
}

interface Props {
  id?: string;
}

withDefaults(defineProps<Props>(), {
  id: "portfolio",
});

const projectModalTarget = inject<Ref<Project | null>>("projectModalTarget");

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A modern e-commerce solution with advanced features.",
    image: "/images/portfolio/project-1.jpg",
    tags: ["Vue.js", "Node.js", "PostgreSQL"],
  },
  {
    title: "Financial Dashboard",
    category: "Financial QA",
    description: "Real-time financial analytics dashboard.",
    image: "/images/portfolio/project-2.jpg",
    tags: ["React", "Python", "AWS"],
  },
  {
    title: "AI Chatbot",
    category: "AI Automation",
    description: "Intelligent customer service automation.",
    image: "/images/portfolio/project-3.jpg",
    tags: ["OpenAI", "Python", "Docker"],
  },
];

const openProject = (project: Project): void => {
  if (projectModalTarget) {
    projectModalTarget.value = project;
  }
};
</script>

<style lang="scss" scoped>
.portfolio-item {
  background: $white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);

    .portfolio-overlay {
      opacity: 1;
    }
  }
}

.portfolio-image {
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
}

.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($primary, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  i {
    font-size: 2rem;
    color: $white;
  }
}

.portfolio-info {
  h5 {
    color: $dark;
  }
}
</style>

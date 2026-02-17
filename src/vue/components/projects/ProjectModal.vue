<template>
  <Transition name="modal">
    <div v-if="project" class="gkt-project-modal" @click.self="handleClose">
      <div class="modal-content">
        <button class="modal-close" @click="handleClose">
          <i class="fas fa-times" />
        </button>
        <div class="modal-body">
          <div v-if="project.image" class="modal-image mb-4">
            <img :src="project.image" :alt="project.title" class="img-fluid rounded" />
          </div>
          <h3 class="modal-title mb-3">{{ project.title }}</h3>
          <p v-if="project.description" class="modal-description">
            {{ project.description }}
          </p>
          <div v-if="project.tags && project.tags.length" class="modal-tags mt-3">
            <span v-for="(tag, index) in project.tags" :key="index" class="badge bg-primary me-2 mb-2">
              {{ tag }}
            </span>
          </div>
          <div v-if="project.link" class="modal-actions mt-4">
            <a :href="project.link" target="_blank" class="btn btn-primary">
              <i class="fas fa-external-link-alt me-2" />
              View Project
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Project {
  title?: string;
  description?: string;
  image?: string;
  tags?: string[];
  link?: string;
}

interface Props {
  project?: Project | null;
}

withDefaults(defineProps<Props>(), {
  project: null,
});

const emit = defineEmits<{
  close: [];
}>();

const handleClose = (): void => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.gkt-project-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($dark, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9997;
  padding: 2rem;
}

.modal-content {
  background-color: $white;
  border-radius: 1rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: $light-6;
  cursor: pointer;
  z-index: 1;

  &:hover {
    color: $dark;
  }
}

.modal-body {
  padding: 2rem;
}

.modal-image img {
  width: 100%;
  object-fit: cover;
}

.modal-title {
  color: $dark;
}

.modal-description {
  color: $light-7;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">
        Knowledge Base Items ({{ items.length }})
      </h3>
    </div>

    <div v-if="loading" class="p-6 text-center">
      <div class="inline-flex items-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading knowledge base items...
      </div>
    </div>

    <div v-else-if="items.length === 0" class="p-6 text-center text-gray-500">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No knowledge base items</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by adding your first knowledge base item.</p>
    </div>

    <div v-else class="divide-y divide-gray-200">
      <div
        v-for="item in items"
        :key="item.id"
        class="p-6 hover:bg-gray-50 transition-colors"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1 min-w-0">
            <!-- Type Badge -->
            <div class="flex items-center mb-2">
              <span
                :class="getTypeBadgeClass(item.type)"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {{ getTypeLabel(item.type) }}
              </span>
            </div>

            <!-- Title -->
            <h4 class="text-lg font-medium text-gray-900 mb-2">
              {{ item.title }}
            </h4>

            <!-- Content Preview -->
            <p class="text-sm text-gray-600 mb-3 line-clamp-3">
              {{ getContentPreview(item.content) }}
            </p>

            <!-- Metadata -->
            <div class="flex items-center text-xs text-gray-500 space-x-4">
              <span>Created: {{ formatDate(item.createdAt) }}</span>
              <span>Updated: {{ formatDate(item.updatedAt) }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="ml-4 flex-shrink-0 flex space-x-2">
            <button
              @click="handleEdit(item)"
              class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>

            <button
              @click="handleDelete(item)"
              class="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

interface KnowledgeBaseItem {
  id: string
  type: 'qa' | 'document' | 'context'
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface Props {
  items: KnowledgeBaseItem[]
  loading: boolean
}

interface Emits {
  (e: 'edit', item: KnowledgeBaseItem): void
  (e: 'delete', item: KnowledgeBaseItem): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'qa':
      return 'Q&A'
    case 'document':
      return 'Document'
    case 'context':
      return 'Context'
    default:
      return type
  }
}

const getTypeBadgeClass = (type: string) => {
  switch (type) {
    case 'qa':
      return 'bg-blue-100 text-blue-800'
    case 'document':
      return 'bg-green-100 text-green-800'
    case 'context':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getContentPreview = (content: string) => {
  return content.length > 150 ? content.substring(0, 150) + '...' : content
}

const formatDate = (date: Date) => {
  if (!date) return 'Unknown'
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const handleEdit = (item: KnowledgeBaseItem) => {
  emit('edit', item)
}

const handleDelete = async (item: KnowledgeBaseItem) => {
  if (confirm(`Are you sure you want to delete "${item.title}"? This action cannot be undone.`)) {
    try {
      await deleteDoc(doc(db, 'chatbot_knowledge', item.id))
      emit('delete', item)
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Failed to delete item. Please try again.')
    }
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

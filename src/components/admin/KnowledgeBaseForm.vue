<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-4">
      {{ isEditing ? 'Edit Knowledge Base Item' : 'Add New Knowledge Base Item' }}
    </h3>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Type Selection -->
      <div>
        <label for="type" class="block text-sm font-medium text-gray-700 mb-2">
          Type
        </label>
        <select
          id="type"
          v-model="formData.type"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="qa">Q&A Pair</option>
          <option value="document">Knowledge Document</option>
          <option value="context">Context Snippet</option>
        </select>
      </div>

      <!-- Title -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
          {{ getTitleLabel() }}
        </label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :placeholder="getTitlePlaceholder()"
          required
        />
      </div>

      <!-- Content -->
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
          {{ getContentLabel() }}
        </label>
        <textarea
          id="content"
          v-model="formData.content"
          rows="6"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :placeholder="getContentPlaceholder()"
          required
        ></textarea>
        <p class="mt-1 text-sm text-gray-500">
          {{ getContentHelpText() }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          @click="handleCancel"
          class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Saving...' : (isEditing ? 'Update' : 'Add') }}
        </button>
      </div>
    </form>

    <!-- Error Message -->
    <div v-if="error" class="mt-4 rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">
            Error
          </h3>
          <div class="mt-2 text-sm text-red-700">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../../config/firebase'

interface KnowledgeBaseItem {
  id?: string
  type: 'qa' | 'document' | 'context'
  title: string
  content: string
  createdAt?: Date
  updatedAt?: Date
}

interface Props {
  item?: KnowledgeBaseItem
  isEditing?: boolean
}

interface Emits {
  (e: 'saved'): void
  (e: 'cancelled'): void
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false
})

const emit = defineEmits<Emits>()

const loading = ref(false)
const error = ref('')

const formData = reactive({
  type: 'qa' as 'qa' | 'document' | 'context',
  title: '',
  content: ''
})

// Initialize form data when editing
watch(() => props.item, (newItem) => {
  if (newItem && props.isEditing) {
    formData.type = newItem.type
    formData.title = newItem.title
    formData.content = newItem.content
  } else {
    resetForm()
  }
}, { immediate: true })

const resetForm = () => {
  formData.type = 'qa'
  formData.title = ''
  formData.content = ''
  error.value = ''
}

const getTitleLabel = () => {
  switch (formData.type) {
    case 'qa':
      return 'Question'
    case 'document':
      return 'Document Title'
    case 'context':
      return 'Context Title'
    default:
      return 'Title'
  }
}

const getTitlePlaceholder = () => {
  switch (formData.type) {
    case 'qa':
      return 'e.g., What services does Grand Kru Technologies offer?'
    case 'document':
      return 'e.g., Company Overview'
    case 'context':
      return 'e.g., Technology Stack'
    default:
      return 'Enter title...'
  }
}

const getContentLabel = () => {
  switch (formData.type) {
    case 'qa':
      return 'Answer'
    case 'document':
      return 'Document Content'
    case 'context':
      return 'Context Information'
    default:
      return 'Content'
  }
}

const getContentPlaceholder = () => {
  switch (formData.type) {
    case 'qa':
      return 'Provide a detailed answer to the question...'
    case 'document':
      return 'Write the document content here. You can use markdown formatting...'
    case 'context':
      return 'Provide context information that will help the chatbot understand this topic...'
    default:
      return 'Enter content...'
  }
}

const getContentHelpText = () => {
  switch (formData.type) {
    case 'qa':
      return 'Provide a clear, helpful answer that the chatbot can use to respond to this question.'
    case 'document':
      return 'Use markdown formatting for better readability. This content will be used as context for the chatbot.'
    case 'context':
      return 'Provide additional context that helps the chatbot understand topics related to this snippet.'
    default:
      return ''
  }
}

const handleSubmit = async () => {
  if (!formData.title.trim() || !formData.content.trim()) {
    error.value = 'Please fill in all required fields'
    return
  }

  try {
    loading.value = true
    error.value = ''

    const knowledgeRef = collection(db, 'chatbot_knowledge')
    const data = {
      type: formData.type,
      title: formData.title.trim(),
      content: formData.content.trim(),
      updatedAt: serverTimestamp()
    }

    if (props.isEditing && props.item?.id) {
      // Update existing item
      await updateDoc(doc(db, 'chatbot_knowledge', props.item.id), data)
    } else {
      // Add new item
      await addDoc(knowledgeRef, {
        ...data,
        createdAt: serverTimestamp()
      })
    }

    resetForm()
    emit('saved')
  } catch (err: any) {
    error.value = err.message || 'Failed to save knowledge base item'
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  resetForm()
  emit('cancelled')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Knowledge Base Manager</h2>
        <p class="mt-1 text-sm text-gray-600">
          Manage the chatbot's knowledge base with Q&A pairs, documents, and context snippets.
        </p>
      </div>
      <button
        v-if="!showForm"
        @click="showAddForm"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add New Item
      </button>
    </div>

    <!-- Form Section -->
    <div v-if="showForm">
      <KnowledgeBaseForm
        :item="editingItem"
        :is-editing="!!editingItem"
        @saved="handleFormSaved"
        @cancelled="handleFormCancelled"
      />
    </div>

    <!-- List Section -->
    <div v-else>
      <KnowledgeBaseList
        :items="knowledgeBaseItems"
        :loading="loading"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <!-- Stats Section -->
    <div v-if="!showForm" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Q&A Pairs
                </dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ getItemCount('qa') }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Documents
                </dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ getItemCount('document') }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">
                  Context Snippets
                </dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ getItemCount('context') }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore'
import { db } from '../../config/firebase'
import KnowledgeBaseForm from './KnowledgeBaseForm.vue'
import KnowledgeBaseList from './KnowledgeBaseList.vue'

interface KnowledgeBaseItem {
  id: string
  type: 'qa' | 'document' | 'context'
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

const knowledgeBaseItems = ref<KnowledgeBaseItem[]>([])
const loading = ref(true)
const showForm = ref(false)
const editingItem = ref<KnowledgeBaseItem | null>(null)

// Load knowledge base items
const loadKnowledgeBase = async () => {
  try {
    loading.value = true
    const knowledgeRef = collection(db, 'chatbot_knowledge')
    const q = query(knowledgeRef, orderBy('updatedAt', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      knowledgeBaseItems.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as KnowledgeBaseItem[]
      loading.value = false
    })

    // Store unsubscribe function for cleanup if needed
    return unsubscribe
  } catch (error) {
    console.error('Error loading knowledge base:', error)
    loading.value = false
  }
}

// Get count of items by type
const getItemCount = (type: string) => {
  return knowledgeBaseItems.value.filter(item => item.type === type).length
}

// Show add form
const showAddForm = () => {
  editingItem.value = null
  showForm.value = true
}

// Handle form saved
const handleFormSaved = () => {
  showForm.value = false
  editingItem.value = null
}

// Handle form cancelled
const handleFormCancelled = () => {
  showForm.value = false
  editingItem.value = null
}

// Handle edit
const handleEdit = (item: KnowledgeBaseItem) => {
  editingItem.value = item
  showForm.value = true
}

// Handle delete
const handleDelete = (item: KnowledgeBaseItem) => {
  // The delete logic is handled in the KnowledgeBaseList component
  // This is just for any additional cleanup if needed
}

onMounted(() => {
  loadKnowledgeBase()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-500">
              Welcome, {{ user?.email }}
            </div>
            <button
              @click="handleLogout"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <!-- Navigation Tabs -->
        <div class="border-b border-gray-200 mb-6">
          <nav class="-mb-px flex space-x-8">
            <button
              @click="activeTab = 'knowledge'"
              :class="[
                activeTab === 'knowledge'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Knowledge Base
            </button>
            <button
              @click="activeTab = 'chatbot'"
              :class="[
                activeTab === 'chatbot'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Chatbot Settings
            </button>
            <button
              @click="activeTab = 'analytics'"
              :class="[
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Analytics
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div v-if="activeTab === 'knowledge'">
          <KnowledgeBaseManager />
        </div>

        <div v-else-if="activeTab === 'chatbot'" class="bg-white shadow rounded-lg p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Chatbot Settings</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Chatbot Status
              </label>
              <div class="flex items-center">
                <div class="flex items-center h-5">
                  <input
                    id="chatbot-enabled"
                    type="checkbox"
                    checked
                    class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="chatbot-enabled" class="font-medium text-gray-700">
                    Enable chatbot
                  </label>
                  <p class="text-gray-500">Allow visitors to interact with the chatbot</p>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Welcome Message
              </label>
              <textarea
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the welcome message for the chatbot..."
              >Hello! I'm here to help you learn more about Grand Kru Technologies. How can I assist you today?</textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                API Status
              </label>
              <div class="flex items-center space-x-2">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span class="ml-2 text-sm text-gray-600">Perplexity API Connected</span>
                </div>
                <button
                  @click="testAPI"
                  class="text-sm text-blue-600 hover:text-blue-800"
                >
                  Test Connection
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="activeTab === 'analytics'" class="bg-white shadow rounded-lg p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Analytics</h3>
          <div class="text-center py-8 text-gray-500">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Analytics Coming Soon</h3>
            <p class="mt-1 text-sm text-gray-500">
              Chat usage analytics and insights will be available here.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { perplexityService } from '../services/perplexityService'
import KnowledgeBaseManager from '../components/admin/KnowledgeBaseManager.vue'

const router = useRouter()
const authStore = useAuthStore()

const activeTab = ref('knowledge')

const user = computed(() => authStore.user)

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/admin/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

const testAPI = async () => {
  try {
    const isConnected = await perplexityService.testConnection()
    if (isConnected) {
      alert('API connection successful!')
    } else {
      alert('API connection failed. Please check your configuration.')
    }
  } catch (error) {
    alert('API test failed. Please check your configuration.')
  }
}
</script>

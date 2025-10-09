<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Chat with Grand Kru Assistant</h1>
            <p class="mt-1 text-sm text-gray-600">
              Ask me anything about Grand Kru Technologies and our services
            </p>
          </div>
          <button
            @click="clearChat"
            class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear Chat
          </button>
        </div>
      </div>
    </div>

    <!-- Chat Container -->
    <div class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white rounded-lg shadow-lg border border-gray-200 h-96 flex flex-col">
          <!-- Messages Area -->
          <div class="flex-1 overflow-y-auto p-6 space-y-4" ref="messagesContainer">
            <!-- Welcome Message -->
            <div v-if="messages.length === 0" class="text-center py-8">
              <div class="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Welcome to Grand Kru Assistant!</h3>
              <p class="text-gray-600 mb-6">I'm here to help you learn more about our technology consulting services.</p>

              <!-- Quick Start Questions -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <button
                  v-for="question in quickQuestions"
                  :key="question"
                  @click="sendQuickQuestion(question)"
                  class="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                >
                  <p class="text-sm text-gray-700">{{ question }}</p>
                </button>
              </div>
            </div>

            <!-- Chat Messages -->
            <div
              v-for="message in messages"
              :key="message.id"
              class="flex"
              :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
            >
              <div class="max-w-3xl">
                <div
                  class="px-4 py-3 rounded-lg"
                  :class="message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'"
                >
                  <div v-if="message.role === 'assistant'" class="flex items-start space-x-2">
                    <div class="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm whitespace-pre-wrap">{{ message.content }}</p>
                      <div v-if="message.isLoading" class="flex items-center mt-2">
                        <div class="flex space-x-1">
                          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <p class="text-sm">{{ message.content }}</p>
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-1 px-1">
                  {{ formatTime(message.timestamp) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="border-t border-gray-200 p-4">
            <form @submit.prevent="sendMessage" class="flex space-x-3">
              <input
                v-model="inputMessage"
                type="text"
                placeholder="Ask me anything about Grand Kru Technologies..."
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :disabled="isLoading"
              />
              <button
                type="submit"
                :disabled="!inputMessage.trim() || isLoading"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <svg v-if="!isLoading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { useChatStore } from '../stores/chatStore'
import { ChatService } from '../services/chatService'

const chatStore = useChatStore()

const inputMessage = ref('')
const messagesContainer = ref<HTMLElement>()

const messages = computed(() => chatStore.messages)
const isLoading = computed(() => chatStore.isLoading)

const quickQuestions = [
  'What services does Grand Kru Technologies offer?',
  'How can you help with digital transformation?',
  'What technologies do you specialize in?',
  'How do I get started with your services?'
]

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  const message = inputMessage.value.trim()
  inputMessage.value = ''

  try {
    await ChatService.sendMessage(message)
  } catch (error) {
    console.error('Error sending message:', error)
  }
}

const sendQuickQuestion = async (question: string) => {
  inputMessage.value = question
  await sendMessage()
}

const clearChat = () => {
  ChatService.clearConversation()
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Auto-scroll to bottom when new messages arrive
watch(messages, async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}, { deep: true })
</script>

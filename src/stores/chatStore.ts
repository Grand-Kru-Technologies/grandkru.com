import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  isLoading?: boolean
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isOpen = ref(false)

  const hasMessages = computed(() => messages.value.length > 0)
  const lastMessage = computed(() => messages.value[messages.value.length - 1])

  // Add a new message
  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    }
    messages.value.push(newMessage)
  }

  // Add user message
  const addUserMessage = (content: string) => {
    addMessage({ content, role: 'user' })
  }

  // Add assistant message
  const addAssistantMessage = (content: string, isLoading = false) => {
    addMessage({ content, role: 'assistant', isLoading })
  }

  // Update the last message (for streaming responses)
  const updateLastMessage = (content: string, isLoading = false) => {
    if (messages.value.length > 0) {
      const lastMsg = messages.value[messages.value.length - 1]
      lastMsg.content = content
      lastMsg.isLoading = isLoading
    }
  }

  // Clear all messages
  const clearMessages = () => {
    messages.value = []
  }

  // Set loading state
  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  // Set error
  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  // Toggle chat window
  const toggleChat = () => {
    isOpen.value = !isOpen.value
  }

  // Open chat
  const openChat = () => {
    isOpen.value = true
  }

  // Close chat
  const closeChat = () => {
    isOpen.value = false
  }

  return {
    messages,
    isLoading,
    error,
    isOpen,
    hasMessages,
    lastMessage,
    addUserMessage,
    addAssistantMessage,
    updateLastMessage,
    clearMessages,
    setLoading,
    setError,
    toggleChat,
    openChat,
    closeChat
  }
})

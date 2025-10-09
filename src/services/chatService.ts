import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { perplexityService, type ChatContext } from './perplexityService'
import { ContentIndexService } from './contentIndexService'
import { useChatStore } from '../stores/chatStore'

export interface KnowledgeBaseItem {
  id: string
  type: 'qa' | 'document' | 'context'
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export class ChatService {
  private static readonly KNOWLEDGE_BASE_COLLECTION = 'chatbot_knowledge'

  // Get knowledge base items from Firebase
  static async getKnowledgeBase(): Promise<KnowledgeBaseItem[]> {
    try {
      const knowledgeRef = collection(db, this.KNOWLEDGE_BASE_COLLECTION)
      const q = query(knowledgeRef, orderBy('updatedAt', 'desc'), limit(50))
      const querySnapshot = await getDocs(q)

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as KnowledgeBaseItem[]
    } catch (error) {
      console.error('Error fetching knowledge base:', error)
      return []
    }
  }

  // Convert knowledge base to context string
  static knowledgeBaseToContext(knowledgeBase: KnowledgeBaseItem[]): string {
    if (knowledgeBase.length === 0) {
      return 'No knowledge base items available.'
    }

    return knowledgeBase.map(item => {
      switch (item.type) {
        case 'qa':
          return `Q: ${item.title}\nA: ${item.content}`
        case 'document':
          return `Document: ${item.title}\n${item.content}`
        case 'context':
          return `Context: ${item.title}\n${item.content}`
        default:
          return `${item.title}: ${item.content}`
      }
    }).join('\n\n---\n\n')
  }

  // Send message to chatbot
  static async sendMessage(userMessage: string): Promise<string> {
    const chatStore = useChatStore()

    try {
      // Add user message to chat
      chatStore.addUserMessage(userMessage)
      chatStore.setLoading(true)
      chatStore.setError(null)

      // Add loading assistant message
      chatStore.addAssistantMessage('Thinking...', true)

      // Get knowledge base and site content
      const [knowledgeBase] = await Promise.all([
        this.getKnowledgeBase()
      ])

      const siteContent = ContentIndexService.getContentAsContext()
      const knowledgeBaseContext = this.knowledgeBaseToContext(knowledgeBase)

      // Prepare context for Perplexity
      const context: ChatContext = {
        knowledgeBase: knowledgeBaseContext,
        siteContent,
        userQuery: userMessage
      }

      // Query Perplexity API
      const response = await perplexityService.queryPerplexity(context)

      // Update the loading message with the actual response
      chatStore.updateLastMessage(response, false)
      chatStore.setLoading(false)

      return response
    } catch (error: any) {
      console.error('Chat service error:', error)

      // Update loading message with error
      chatStore.updateLastMessage(
        'Sorry, I encountered an error while processing your request. Please try again.',
        false
      )
      chatStore.setError(error.message)
      chatStore.setLoading(false)

      throw error
    }
  }

  // Test chatbot functionality
  static async testChatbot(): Promise<boolean> {
    try {
      const testMessage = 'Hello, can you tell me about Grand Kru Technologies?'
      await this.sendMessage(testMessage)
      return true
    } catch (error) {
      console.error('Chatbot test failed:', error)
      return false
    }
  }

  // Get conversation history (for future use)
  static getConversationHistory() {
    const chatStore = useChatStore()
    return chatStore.messages
  }

  // Clear conversation
  static clearConversation() {
    const chatStore = useChatStore()
    chatStore.clearMessages()
  }
}

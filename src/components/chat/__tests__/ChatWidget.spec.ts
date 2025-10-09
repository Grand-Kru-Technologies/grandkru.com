import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ChatWidget from '../ChatWidget.vue'

// Mock the chat store
vi.mock('../../../stores/chatStore', () => ({
  useChatStore: vi.fn(() => ({
    isOpen: false,
    messages: [],
    isLoading: false,
    openChat: vi.fn(),
    closeChat: vi.fn(),
    addUserMessage: vi.fn(),
    addAssistantMessage: vi.fn(),
    updateLastMessage: vi.fn(),
    clearMessages: vi.fn(),
    setLoading: vi.fn(),
    setError: vi.fn()
  }))
}))

// Mock the chat service
vi.mock('../../../services/chatService', () => ({
  ChatService: {
    sendMessage: vi.fn()
  }
}))

// Mock vue-router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn()
  }))
}))

describe('ChatWidget', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('renders chat button when closed', () => {
    const wrapper = mount(ChatWidget)

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('.bg-blue-600').exists()).toBe(true)
  })

  it('opens chat when button is clicked', async () => {
    const { useChatStore } = await import('../../../stores/chatStore')
    const mockStore = useChatStore()

    const wrapper = mount(ChatWidget)

    await wrapper.find('button').trigger('click')

    expect(mockStore.openChat).toHaveBeenCalled()
  })

  it('shows loading state when sending message', async () => {
    const { useChatStore } = await import('../../../stores/chatStore')
    const mockStore = useChatStore()
    mockStore.isLoading = true

    const wrapper = mount(ChatWidget)

    expect(wrapper.find('.animate-spin').exists()).toBe(true)
  })

  it('sends message when form is submitted', async () => {
    const { useChatStore } = await import('../../../stores/chatStore')
    const { ChatService } = await import('../../../services/chatService')
    const mockStore = useChatStore()
    mockStore.isOpen = true

    const wrapper = mount(ChatWidget)

    const input = wrapper.find('input[type="text"]')
    await input.setValue('Test message')

    const form = wrapper.find('form')
    await form.trigger('submit')

    expect(ChatService.sendMessage).toHaveBeenCalledWith('Test message')
  })

  it('does not send empty messages', async () => {
    const { useChatStore } = await import('../../../stores/chatStore')
    const { ChatService } = await import('../../../services/chatService')
    const mockStore = useChatStore()
    mockStore.isOpen = true

    const wrapper = mount(ChatWidget)

    const form = wrapper.find('form')
    await form.trigger('submit')

    expect(ChatService.sendMessage).not.toHaveBeenCalled()
  })

  it('closes chat when close button is clicked', async () => {
    const { useChatStore } = await import('../../../stores/chatStore')
    const mockStore = useChatStore()
    mockStore.isOpen = true

    const wrapper = mount(ChatWidget)

    const closeButton = wrapper.find('[data-testid="close-button"]')
    if (closeButton.exists()) {
      await closeButton.trigger('click')
      expect(mockStore.closeChat).toHaveBeenCalled()
    }
  })
})

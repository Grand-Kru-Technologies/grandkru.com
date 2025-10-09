import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_PERPLEXITY_API_KEY: 'test-api-key'
  }
}))

// Mock fetch
global.fetch = vi.fn()

describe('PerplexityService', () => {
  let service: any

  beforeEach(() => {
    // Set environment variable for this test
    vi.stubEnv('VITE_PERPLEXITY_API_KEY', 'test-api-key')
    vi.clearAllMocks()
  })

  describe('constructor', () => {
    it('should initialize with API key from environment', async () => {
      const { PerplexityService } = await import('../perplexityService')
      service = new PerplexityService()
      expect(service).toBeDefined()
    })

    it('should throw error if API key is missing', async () => {
      vi.stubEnv('VITE_PERPLEXITY_API_KEY', '')
      const { PerplexityService } = await import('../perplexityService')
      expect(() => new PerplexityService()).toThrow('Perplexity API key not found')
    })
  })

  describe('queryPerplexity', () => {
    it('should make API request with correct parameters', async () => {
      const { PerplexityService } = await import('../perplexityService')
      service = new PerplexityService()

      const mockResponse = {
        choices: [{ message: { content: 'Test response' } }]
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      } as Response)

      const context = {
        knowledgeBase: 'Test knowledge',
        siteContent: 'Test site content',
        userQuery: 'Test query'
      }

      const result = await service.queryPerplexity(context)

      expect(fetch).toHaveBeenCalledWith(
        'https://api.perplexity.ai/chat/completions',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Authorization': 'Bearer test-api-key',
            'Content-Type': 'application/json'
          },
          body: expect.stringContaining('llama-3.1-sonar-small-128k-online')
        })
      )

      expect(result).toBe('Test response')
    })

    it('should handle API errors', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        json: () => Promise.resolve({ error: { message: 'Invalid API key' } })
      } as Response)

      const context = {
        knowledgeBase: 'Test knowledge',
        siteContent: 'Test site content',
        userQuery: 'Test query'
      }

      await expect(service.queryPerplexity(context)).rejects.toThrow('Perplexity API error')
    })

    it('should handle empty response', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ choices: [] })
      } as Response)

      const context = {
        knowledgeBase: 'Test knowledge',
        siteContent: 'Test site content',
        userQuery: 'Test query'
      }

      await expect(service.queryPerplexity(context)).rejects.toThrow('No response from Perplexity API')
    })
  })

  describe('testConnection', () => {
    it('should return true for successful connection', async () => {
      const mockResponse = {
        choices: [{ message: { content: 'Test response' } }]
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      } as Response)

      const result = await service.testConnection()
      expect(result).toBe(true)
    })

    it('should return false for failed connection', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      const result = await service.testConnection()
      expect(result).toBe(false)
    })
  })
})

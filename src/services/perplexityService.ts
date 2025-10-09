export interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
  usage?: {
    total_tokens: number
  }
}

export interface ChatContext {
  knowledgeBase: string
  siteContent: string
  userQuery: string
}

export class PerplexityService {
  private apiKey: string
  private baseUrl = 'https://api.perplexity.ai/chat/completions'

  constructor() {
    this.apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY
    if (!this.apiKey) {
      throw new Error('Perplexity API key not found in environment variables')
    }
  }

  async queryPerplexity(context: ChatContext): Promise<string> {
    try {
      const systemPrompt = this.buildSystemPrompt(context)

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: context.userQuery
            }
          ],
          max_tokens: 1000,
          temperature: 0.7,
          top_p: 0.9
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`Perplexity API error: ${response.status} - ${errorData.error?.message || response.statusText}`)
      }

      const data: PerplexityResponse = await response.json()

      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from Perplexity API')
      }

      return data.choices[0].message.content
    } catch (error) {
      console.error('Perplexity API error:', error)
      throw error
    }
  }

  private buildSystemPrompt(context: ChatContext): string {
    return `You are a helpful AI assistant for Grand Kru Technologies, a technology consulting company.

Company Information:
- Grand Kru Technologies provides technology consulting services
- We help businesses with digital transformation, software development, and technology strategy
- Our website: grandkru.com

Knowledge Base Context:
${context.knowledgeBase}

Site Content Context:
${context.siteContent}

Instructions:
1. Answer questions about Grand Kru Technologies and our services
2. Be helpful, professional, and informative
3. If you don't know something specific about the company, say so and offer to help with general technology questions
4. Keep responses concise but comprehensive
5. Always maintain a professional tone that reflects our company values

If the user asks about something not related to Grand Kru Technologies or general technology topics, politely redirect them to ask about our services or technology-related questions.`
  }

  // Test the API connection
  async testConnection(): Promise<boolean> {
    try {
      await this.queryPerplexity({
        knowledgeBase: 'Test knowledge base',
        siteContent: 'Test site content',
        userQuery: 'Hello, this is a test message.'
      })
      return true
    } catch (error) {
      console.error('Perplexity API test failed:', error)
      return false
    }
  }
}

// Export singleton instance
export const perplexityService = new PerplexityService()

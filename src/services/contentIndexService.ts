export interface SiteContent {
  title: string
  content: string
  url: string
  type: 'page' | 'component'
}

export class ContentIndexService {
  private static content: SiteContent[] = []

  // Extract content from Vue components and pages
  static extractSiteContent(): SiteContent[] {
    const content: SiteContent[] = []

    // Home page content
    content.push({
      title: 'Home - Grand Kru Technologies',
      content: `Grand Kru Technologies is a technology consulting company that helps businesses with digital transformation, software development, and technology strategy. We provide comprehensive technology solutions to help your business grow and succeed in the digital age.`,
      url: '/',
      type: 'page'
    })

    // About page content
    content.push({
      title: 'About Us - Grand Kru Technologies',
      content: `About Grand Kru Technologies: We are a team of experienced technology professionals dedicated to helping businesses leverage technology for growth and success. Our expertise spans across various domains including web development, mobile applications, cloud solutions, and digital transformation.`,
      url: '/about',
      type: 'page'
    })

    // Services content
    content.push({
      title: 'Services - Grand Kru Technologies',
      content: `Our Services: We offer a wide range of technology consulting services including:
      - Web Application Development
      - Mobile App Development
      - Cloud Migration and Management
      - Digital Transformation Consulting
      - Technology Strategy and Planning
      - System Integration
      - DevOps and Infrastructure
      - Data Analytics and Business Intelligence`,
      url: '/services',
      type: 'page'
    })

    // Contact content
    content.push({
      title: 'Contact - Grand Kru Technologies',
      content: `Contact Grand Kru Technologies: Get in touch with us for your technology consulting needs. We're here to help you with your digital transformation journey and technology challenges.`,
      url: '/contact',
      type: 'page'
    })

    // Portfolio content
    content.push({
      title: 'Portfolio - Grand Kru Technologies',
      content: `Our Portfolio: We have successfully delivered technology solutions for various clients across different industries. Our portfolio showcases our expertise in web development, mobile applications, and digital transformation projects.`,
      url: '/portfolio',
      type: 'page'
    })

    this.content = content
    return content
  }

  // Get all indexed content
  static getIndexedContent(): SiteContent[] {
    if (this.content.length === 0) {
      return this.extractSiteContent()
    }
    return this.content
  }

  // Search content by query
  static searchContent(query: string): SiteContent[] {
    const content = this.getIndexedContent()
    const lowercaseQuery = query.toLowerCase()

    return content.filter(item =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.content.toLowerCase().includes(lowercaseQuery)
    )
  }

  // Get content as context string for AI
  static getContentAsContext(): string {
    const content = this.getIndexedContent()
    return content.map(item =>
      `${item.title}:\n${item.content}\nURL: ${item.url}\n`
    ).join('\n---\n\n')
  }

  // Refresh content index
  static refreshIndex(): SiteContent[] {
    this.content = []
    return this.extractSiteContent()
  }
}

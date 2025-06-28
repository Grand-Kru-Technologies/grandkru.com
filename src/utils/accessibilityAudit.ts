/**
 * Static Accessibility Audit Utility
 * Provides automated checks for common accessibility issues
 */

export interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info'
  message: string
  element?: string
  suggestion?: string
}

export interface AccessibilityReport {
  issues: AccessibilityIssue[]
  summary: {
    errors: number
    warnings: number
    info: number
    total: number
  }
  passed: boolean
}

export class AccessibilityAuditor {
  private issues: AccessibilityIssue[] = []

  /**
   * Check for missing alt attributes on images
   */
  checkImageAltText(html: string): void {
    const imgRegex = /<img[^>]*>/gi
    const matches = html.match(imgRegex) || []

    matches.forEach((img, index) => {
      if (!img.includes('alt=')) {
        this.issues.push({
          type: 'error',
          message: `Image missing alt attribute`,
          element: `img[${index}]`,
          suggestion: 'Add alt="descriptive text" to all images'
        })
      } else if (img.includes('alt=""') || img.includes("alt=''")) {
        this.issues.push({
          type: 'warning',
          message: `Image has empty alt attribute`,
          element: `img[${index}]`,
          suggestion: 'Provide meaningful alt text or use alt="" for decorative images'
        })
      }
    })
  }

  /**
   * Check for proper heading hierarchy
   */
  checkHeadingHierarchy(html: string): void {
    const headingRegex = /<(h[1-6])[^>]*>.*?<\/\1>/gi
    const matches = html.match(headingRegex) || []
    const headings: { level: number; text: string; index: number }[] = []

    matches.forEach((heading, index) => {
      const levelMatch = heading.match(/<(h[1-6])/i)
      if (levelMatch) {
        const level = parseInt(levelMatch[1].charAt(1))
        const textMatch = heading.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i)
        const text = textMatch ? textMatch[1].trim() : ''
        headings.push({ level, text, index })
      }
    })

    // Check for skipped heading levels
    for (let i = 1; i < headings.length; i++) {
      const current = headings[i]
      const previous = headings[i - 1]
      if (current.level > previous.level + 1) {
        this.issues.push({
          type: 'warning',
          message: `Heading level skipped: h${previous.level} → h${current.level}`,
          element: `h${current.level}: "${current.text}"`,
          suggestion: `Consider using h${previous.level + 1} instead of h${current.level}`
        })
      }
    }
  }

  /**
   * Check for form accessibility
   */
  checkFormAccessibility(html: string): void {
    // Check for inputs without labels
    const inputRegex = /<input[^>]*>/gi
    const inputs = html.match(inputRegex) || []

    inputs.forEach((input, index) => {
      const idMatch = input.match(/id=["']([^"']+)["']/i)
      if (idMatch) {
        const id = idMatch[1]
        const labelRegex = new RegExp(`<label[^>]*for=["']${id}["'][^>]*>`, 'i')
        if (!labelRegex.test(html)) {
          this.issues.push({
            type: 'error',
            message: `Input with id="${id}" missing associated label`,
            element: `input[${index}]`,
            suggestion: 'Add a label element with for="id" or wrap input in label'
          })
        }
      }
    })
  }

  /**
   * Check for semantic HTML usage
   */
  checkSemanticHTML(html: string): void {
    // Check for div usage where semantic elements would be better
    const divRegex = /<div[^>]*>/gi
    const divs = html.match(divRegex) || []

    if (divs.length > 20) {
      this.issues.push({
        type: 'info',
        message: `High number of div elements (${divs.length})`,
        element: 'Multiple divs',
        suggestion: 'Consider using semantic elements like <main>, <section>, <article>, <nav>, <header>, <footer>'
      })
    }

    // Check for button vs div for interactive elements
    const clickableDivRegex = /<div[^>]*onclick[^>]*>/gi
    const clickableDivs = html.match(clickableDivRegex) || []

    clickableDivs.forEach((div, index) => {
      this.issues.push({
        type: 'warning',
        message: 'Div with onclick handler should be a button',
        element: `div[${index}]`,
        suggestion: 'Use <button> or <a> for interactive elements instead of div with onclick'
      })
    })
  }

  /**
   * Check for color contrast issues (basic check)
   */
  checkColorContrast(html: string): void {
    // Check for inline color styles that might have contrast issues
    const colorRegex = /color:\s*#[0-9a-fA-F]{3,6}/gi
    const bgColorRegex = /background-color:\s*#[0-9a-fA-F]{3,6}/gi

    const colors = html.match(colorRegex) || []
    const bgColors = html.match(bgColorRegex) || []

    if (colors.length > 0 || bgColors.length > 0) {
      this.issues.push({
        type: 'info',
        message: 'Inline color styles detected',
        element: 'Multiple elements',
        suggestion: 'Use CSS classes instead of inline styles for better maintainability and accessibility'
      })
    }
  }

  /**
   * Run all accessibility checks
   */
  audit(html: string): AccessibilityReport {
    this.issues = []

    this.checkImageAltText(html)
    this.checkHeadingHierarchy(html)
    this.checkFormAccessibility(html)
    this.checkSemanticHTML(html)
    this.checkColorContrast(html)

    const errors = this.issues.filter(issue => issue.type === 'error').length
    const warnings = this.issues.filter(issue => issue.type === 'warning').length
    const info = this.issues.filter(issue => issue.type === 'info').length

    return {
      issues: this.issues,
      summary: {
        errors,
        warnings,
        info,
        total: this.issues.length
      },
      passed: errors === 0
    }
  }

  /**
   * Generate a formatted report
   */
  generateReport(report: AccessibilityReport): string {
    let output = '=== Accessibility Audit Report ===\n\n'

    if (report.issues.length === 0) {
      output += '✅ No accessibility issues found!\n'
      return output
    }

    output += `Summary: ${report.summary.errors} errors, ${report.summary.warnings} warnings, ${report.summary.info} info\n\n`

    const groupedIssues = {
      error: report.issues.filter(issue => issue.type === 'error'),
      warning: report.issues.filter(issue => issue.type === 'warning'),
      info: report.issues.filter(issue => issue.type === 'info')
    }

    Object.entries(groupedIssues).forEach(([type, issues]) => {
      if (issues.length > 0) {
        output += `\n${type.toUpperCase()}S (${issues.length}):\n`
        issues.forEach((issue, index) => {
          output += `${index + 1}. ${issue.message}\n`
          if (issue.element) output += `   Element: ${issue.element}\n`
          if (issue.suggestion) output += `   Suggestion: ${issue.suggestion}\n`
          output += '\n'
        })
      }
    })

    return output
  }
}

/**
 * Convenience function to run accessibility audit
 */
export function runAccessibilityAudit(html: string): AccessibilityReport {
  const auditor = new AccessibilityAuditor()
  return auditor.audit(html)
}

/**
 * Convenience function to generate formatted report
 */
export function generateAccessibilityReport(html: string): string {
  const auditor = new AccessibilityAuditor()
  const report = auditor.audit(html)
  return auditor.generateReport(report)
}

// Browser console helper
if (typeof window !== 'undefined') {
  (window as any).runAccessibilityAudit = runAccessibilityAudit
  (window as any).generateAccessibilityReport = generateAccessibilityReport

  console.log('🔍 Accessibility audit functions available:')
  console.log('- runAccessibilityAudit(html) - Run the audit')
  console.log('- generateAccessibilityReport(html) - Generate a report')
}
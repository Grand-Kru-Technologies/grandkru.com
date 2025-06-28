#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { generateAccessibilityReport } from '../src/utils/accessibilityAudit'

/**
 * Accessibility Audit Script
 * Runs static accessibility checks on the built application
 */

function runAccessibilityAudit() {
  try {
    console.log('🔍 Running accessibility audit...')

    // Read the built index.html file
    const indexPath = join(process.cwd(), 'dist', 'index.html')
    const html = readFileSync(indexPath, 'utf-8')

    // Run the audit
    const report = generateAccessibilityReport(html)

    // Output the report
    console.log(report)

    // Save report to file
    const reportPath = join(process.cwd(), 'accessibility-report.txt')
    writeFileSync(reportPath, report)
    console.log(`\n📄 Report saved to: ${reportPath}`)

    // Exit with appropriate code
    if (report.passed) {
      console.log('\n✅ Accessibility audit passed!')
      process.exit(0)
    } else {
      console.log('\n❌ Accessibility audit failed!')
      process.exit(1)
    }

  } catch (error) {
    console.error('❌ Error running accessibility audit:', error)
    process.exit(1)
  }
}

// Run the audit if this script is executed directly
if (require.main === module) {
  runAccessibilityAudit()
}

export { runAccessibilityAudit }
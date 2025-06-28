import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Cursor Rules', () => {
  it('contains PR guidelines with 750 character limit', () => {
    const cursorRulesPath = path.join(process.cwd(), '.cursorrules')
    const cursorRulesContent = fs.readFileSync(cursorRulesPath, 'utf-8')

    // Check for PR guidelines section
    expect(cursorRulesContent).toContain('## Pull Request Guidelines')
    expect(cursorRulesContent).toContain('750 characters')
    expect(cursorRulesContent).toContain('@gktreviewer')
    expect(cursorRulesContent).toContain('fixes #')
  })

  it('has proper formatting for PR guidelines', () => {
    const cursorRulesPath = path.join(process.cwd(), '.cursorrules')
    const cursorRulesContent = fs.readFileSync(cursorRulesPath, 'utf-8')

    // Check that the section is properly formatted
    const lines = cursorRulesContent.split('\n')
    const prGuidelinesIndex = lines.findIndex(line => line.includes('## Pull Request Guidelines'))

    expect(prGuidelinesIndex).toBeGreaterThan(-1)

    // Check that there are guidelines after the header
    const guidelinesAfterHeader = lines.slice(prGuidelinesIndex + 1)
    const hasGuidelines = guidelinesAfterHeader.some(line => line.trim().startsWith('-'))
    expect(hasGuidelines).toBe(true)
  })
})
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Favicon Configuration', () => {
  it('has correct favicon path in index.html', () => {
    const indexPath = path.join(process.cwd(), 'index.html')
    const indexContent = fs.readFileSync(indexPath, 'utf-8')

    // Check for favicon link with correct path
    expect(indexContent).toContain('href="/images/grandkru_icon.png"')
    expect(indexContent).toContain('rel="icon"')
  })

  it('includes comprehensive favicon formats', () => {
    const indexPath = path.join(process.cwd(), 'index.html')
    const indexContent = fs.readFileSync(indexPath, 'utf-8')

    // Check for different favicon formats
    expect(indexContent).toContain('sizes="32x32"')
    expect(indexContent).toContain('sizes="16x16"')
    expect(indexContent).toContain('apple-touch-icon')
  })

  it('favicon file exists in public directory', () => {
    const faviconPath = path.join(process.cwd(), 'public', 'images', 'grandkru_icon.png')
    expect(fs.existsSync(faviconPath)).toBe(true)
  })

  it('has proper HTML structure for favicon', () => {
    const indexPath = path.join(process.cwd(), 'index.html')
    const indexContent = fs.readFileSync(indexPath, 'utf-8')

    // Check that favicon links are in the head section
    const headIndex = indexContent.indexOf('<head>')
    const bodyIndex = indexContent.indexOf('<body>')
    const faviconIndex = indexContent.indexOf('grandkru_icon.png')

    expect(headIndex).toBeLessThan(faviconIndex)
    expect(faviconIndex).toBeLessThan(bodyIndex)
  })
})
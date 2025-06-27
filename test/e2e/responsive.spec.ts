import { test, expect } from '@playwright/test';

test.describe('Responsive Design and Mobile Functionality', () => {
  test('should display correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    // Check navigation is visible and horizontal
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Check main content is properly laid out
    await expect(page.locator('main')).toBeVisible();

    // Check for desktop-specific elements (adjust based on your design)
    const desktopElements = page.locator('.desktop-only, .lg\\:block, .xl\\:block');
    if (await desktopElements.count() > 0) {
      await expect(desktopElements.first()).toBeVisible();
    }
  });

  test('should display correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Check navigation is still visible
    await expect(page.locator('nav')).toBeVisible();

    // Check main content adapts to tablet size
    await expect(page.locator('main')).toBeVisible();

    // Test navigation on tablet
    await page.click('a[href="/about"]');
    await page.waitForURL('**/about');
    await expect(page.locator('h1')).toContainText('About Us');
  });

  test('should display correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check navigation is visible (may be hamburger menu on mobile)
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Check main content is properly sized for mobile
    await expect(page.locator('main')).toBeVisible();

    // Test touch interactions
    await page.touchscreen.tap(200, 100); // Tap in general area

    // Test navigation on mobile
    await page.click('a[href="/services"]');
    await page.waitForURL('**/services');
    await expect(page.locator('h1')).toContainText('Our Services');
  });

  test('should handle mobile navigation menu (if hamburger menu exists)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Look for hamburger menu button
    const hamburgerButton = page.locator('button[aria-label*="menu"], .hamburger, .menu-toggle, [data-testid="menu-button"]');

    if (await hamburgerButton.count() > 0) {
      // Test hamburger menu functionality
      await hamburgerButton.click();

      // Check menu items are visible
      const menuItems = page.locator('nav a, .mobile-menu a');
      await expect(menuItems.first()).toBeVisible();

      // Test navigation through mobile menu
      await menuItems.first().click();
      await page.waitForURL('**/about');
    }
  });

  test('should maintain functionality across different screen sizes', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 1024, height: 768, name: 'Tablet Landscape' },
      { width: 768, height: 1024, name: 'Tablet Portrait' },
      { width: 375, height: 667, name: 'Mobile' },
      { width: 320, height: 568, name: 'Small Mobile' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      // Basic functionality should work on all screen sizes
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();

      // Test navigation works
      await page.click('a[href="/contact"]');
      await page.waitForURL('**/contact');
      await expect(page.locator('h1')).toContainText('Contact Us');

      // Go back to test next viewport
      await page.goto('/');
    }
  });

  test('should handle form interactions on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/contact');

    // Test form filling on mobile
    await page.fill('input[name="name"]', 'Mobile Test User');
    await page.fill('input[name="email"]', 'mobile@example.com');
    await page.fill('input[name="subject"]', 'Mobile Test');
    await page.fill('textarea[name="message"]', 'Testing form on mobile device.');

    // Verify form data
    await expect(page.locator('input[name="name"]')).toHaveValue('Mobile Test User');
    await expect(page.locator('input[name="email"]')).toHaveValue('mobile@example.com');

    // Test form submission (mocked)
    await page.route('**/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Message sent successfully' })
      });
    });

    await page.click('button[type="submit"]');
    await expect(page.locator('.bg-green-100, .success')).toBeVisible();
  });

  test('should handle touch gestures and scrolling', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Test scrolling functionality
    await page.evaluate(() => window.scrollTo(0, 500));

    // Test touch scrolling
    await page.touchscreen.swipe(200, 400, 200, 100); // Swipe up

    // Verify page is scrollable
    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBeGreaterThan(0);
  });

  test('should maintain accessibility on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check for proper heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    await expect(headings.first()).toBeVisible();

    // Check for proper focus management
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // Should navigate to the focused link
    await page.waitForURL('**/about');
  });
});
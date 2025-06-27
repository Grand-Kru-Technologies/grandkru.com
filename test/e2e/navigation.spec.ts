import { test, expect } from '@playwright/test';

test.describe('Navigation and Page Loading', () => {
  test('should load homepage with correct title and content', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Grand Kru Technologies/);

    // Check main heading
    await expect(page.locator('h1')).toContainText('Grand Kru Technologies');

    // Check navigation is present
    await expect(page.locator('nav')).toBeVisible();

    // Check for main content sections
    await expect(page.locator('main')).toBeVisible();
  });

  test('should navigate to About page', async ({ page }) => {
    await page.goto('/');

    // Click About link
    await page.click('a[href="/about"]');

    // Wait for navigation
    await page.waitForURL('**/about');

    // Check page content
    await expect(page.locator('h1')).toContainText('About Us');
    await expect(page).toHaveURL(/.*about/);
  });

  test('should navigate to Services page', async ({ page }) => {
    await page.goto('/');

    // Click Services link
    await page.click('a[href="/services"]');

    // Wait for navigation
    await page.waitForURL('**/services');

    // Check page content
    await expect(page.locator('h1')).toContainText('Our Services');
    await expect(page).toHaveURL(/.*services/);
  });

  test('should navigate to Portfolio page', async ({ page }) => {
    await page.goto('/');

    // Click Portfolio link
    await page.click('a[href="/portfolio"]');

    // Wait for navigation
    await page.waitForURL('**/portfolio');

    // Check page content
    await expect(page.locator('h1')).toContainText('Our Portfolio');
    await expect(page).toHaveURL(/.*portfolio/);
  });

  test('should navigate to Contact page', async ({ page }) => {
    await page.goto('/');

    // Click Contact link
    await page.click('a[href="/contact"]');

    // Wait for navigation
    await page.waitForURL('**/contact');

    // Check page content
    await expect(page.locator('h1')).toContainText('Contact Us');
    await expect(page).toHaveURL(/.*contact/);
  });

  test('should handle direct URL navigation', async ({ page }) => {
    // Test direct navigation to each page
    const pages = [
      { path: '/', title: 'Grand Kru Technologies' },
      { path: '/about', title: 'About Us' },
      { path: '/services', title: 'Our Services' },
      { path: '/portfolio', title: 'Our Portfolio' },
      { path: '/contact', title: 'Contact Us' }
    ];

    for (const pageInfo of pages) {
      await page.goto(pageInfo.path);
      await expect(page.locator('h1')).toContainText(pageInfo.title);
      await expect(page).toHaveURL(new RegExp(pageInfo.path.replace('/', '\\/')));
    }
  });

  test('should maintain navigation state across pages', async ({ page }) => {
    await page.goto('/');

    // Check navigation is visible on homepage
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Navigate to different pages and verify nav stays visible
    const pages = ['/about', '/services', '/portfolio', '/contact'];

    for (const path of pages) {
      await page.goto(path);
      await expect(nav).toBeVisible();
    }
  });
});
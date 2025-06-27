import { test, expect } from '@playwright/test';

test.describe('Contact Form Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form with all required fields', async ({ page }) => {
    // Check form is present
    await expect(page.locator('form')).toBeVisible();

    // Check all form fields are present
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="subject"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();

    // Check submit button
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should validate required fields on empty submission', async ({ page }) => {
    // Submit empty form
    await page.click('button[type="submit"]');

    // Check for validation messages (adjust selectors based on your form validation)
    const errorMessages = page.locator('.text-red-500, .error, [role="alert"]');
    await expect(errorMessages).toHaveCount(4); // All fields are required
  });

  test('should validate email format', async ({ page }) => {
    // Fill form with invalid email
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message');

    // Submit form
    await page.click('button[type="submit"]');

    // Check for email validation error
    const emailError = page.locator('input[name="email"]').locator('..').locator('.text-red-500, .error');
    await expect(emailError).toBeVisible();
  });

  test('should accept valid form data', async ({ page }) => {
    // Fill form with valid data
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'This is a test message for the contact form.');

    // Check that form is filled correctly
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
    await expect(page.locator('input[name="subject"]')).toHaveValue('Test Subject');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('This is a test message for the contact form.');
  });

  test('should handle form submission (mocked)', async ({ page }) => {
    // Mock the form submission to avoid actual email sending
    await page.route('**/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Message sent successfully' })
      });
    });

    // Fill form with valid data
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'This is a test message for the contact form.');

    // Submit form
    await page.click('button[type="submit"]');

    // Check for success message (adjust selector based on your success message implementation)
    await expect(page.locator('.bg-green-100, .success, [role="alert"]')).toBeVisible();
  });

  test('should handle form submission errors', async ({ page }) => {
    // Mock the form submission to simulate an error
    await page.route('**/api/contact', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, message: 'Failed to send message' })
      });
    });

    // Fill form with valid data
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'This is a test message for the contact form.');

    // Submit form
    await page.click('button[type="submit"]');

    // Check for error message (adjust selector based on your error message implementation)
    await expect(page.locator('.bg-red-100, .error, [role="alert"]')).toBeVisible();
  });

  test('should disable submit button during submission', async ({ page }) => {
    // Mock a slow response
    await page.route('**/api/contact', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Message sent successfully' })
      });
    });

    // Fill form with valid data
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'This is a test message for the contact form.');

    // Submit form
    await page.click('button[type="submit"]');

    // Check button is disabled during submission
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();

    // Wait for submission to complete
    await expect(page.locator('.bg-green-100, .success')).toBeVisible();

    // Check button is enabled again
    await expect(submitButton).toBeEnabled();
  });

  test('should clear form after successful submission', async ({ page }) => {
    // Mock successful submission
    await page.route('**/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Message sent successfully' })
      });
    });

    // Fill form with valid data
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'This is a test message for the contact form.');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for success message
    await expect(page.locator('.bg-green-100, .success')).toBeVisible();

    // Check form is cleared
    await expect(page.locator('input[name="name"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
    await expect(page.locator('input[name="subject"]')).toHaveValue('');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('');
  });
});
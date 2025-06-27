# Testing Guide

This project uses a comprehensive testing strategy with both unit tests (Vitest) and end-to-end browser tests (Playwright).

## Test Structure

```
test/
├── e2e/                    # End-to-end browser tests (Playwright)
│   ├── navigation.spec.ts  # Navigation and page loading tests
│   ├── contact-form.spec.ts # Contact form functionality tests
│   └── responsive.spec.ts  # Responsive design and mobile tests
└── README.md              # This file
```

## Running Tests

### Unit Tests (Vitest)
```bash
# Run all unit tests
npm run test:unit

# Run tests in watch mode
npm run test:unit -- --watch

# Run tests with coverage
npm run test:unit -- --coverage
```

### End-to-End Tests (Playwright)
```bash
# Run all e2e tests (headless)
npm run test:e2e

# Run e2e tests with UI
npm run test:e2e:ui

# Run e2e tests in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npm run test:e2e tests/e2e/navigation.spec.ts

# Run tests on specific browser
npm run test:e2e -- --project=chromium
```

### All Tests
```bash
# Run both unit and e2e tests
npm run test:all
```

## Test Types

### Unit Tests
- **Location**: `src/**/__tests__/*.test.ts`
- **Framework**: Vitest
- **Purpose**: Test individual components and functions
- **Speed**: Fast execution

### End-to-End Tests
- **Location**: `test/e2e/*.spec.ts`
- **Framework**: Playwright
- **Purpose**: Test full user workflows in real browsers
- **Coverage**: Navigation, forms, responsive design, accessibility

## Browser Support

E2E tests run on:
- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: Chrome (Pixel 5), Safari (iPhone 12)
- **Viewports**: Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)

## Writing Tests

### Unit Tests
```typescript
import { mount } from '@vue/test-utils'
import MyComponent from '../MyComponent.vue'

describe('MyComponent', () => {
  it('should render correctly', () => {
    const wrapper = mount(MyComponent)
    expect(wrapper.find('h1').text()).toBe('Expected Title')
  })
})
```

### E2E Tests
```typescript
import { test, expect } from '@playwright/test'

test('should navigate to about page', async ({ page }) => {
  await page.goto('/')
  await page.click('a[href="/about"]')
  await expect(page.locator('h1')).toContainText('About Us')
})
```

## CI/CD Integration

Tests are automatically run in CI/CD pipelines:
- **Unit tests**: Run on every commit
- **E2E tests**: Run on pull requests and main branch
- **Coverage reports**: Generated and tracked

## Debugging Tests

### Unit Tests
```bash
# Debug with console output
npm run test:unit -- --reporter=verbose

# Debug specific test
npm run test:unit -- --run tests/MyComponent.test.ts
```

### E2E Tests
```bash
# Debug with UI
npm run test:e2e:ui

# Debug with headed mode
npm run test:e2e:headed

# Debug with trace
npm run test:e2e -- --trace=on
```

## Best Practices

1. **Test Structure**: Keep tests organized by feature/component
2. **Descriptive Names**: Use clear, descriptive test names
3. **Isolation**: Each test should be independent
4. **Mocking**: Mock external dependencies appropriately
5. **Accessibility**: Include accessibility testing in e2e tests
6. **Responsive**: Test across different screen sizes
7. **Performance**: Keep tests fast and efficient

## Troubleshooting

### Common Issues

**E2E Tests Failing:**
- Ensure dev server is running (`npm run dev`)
- Check browser compatibility
- Verify selectors are correct

**Unit Tests Failing:**
- Check component imports
- Verify mock implementations
- Ensure test environment is set up correctly

**Performance Issues:**
- Use test parallelization
- Optimize test data
- Reduce unnecessary setup/teardown
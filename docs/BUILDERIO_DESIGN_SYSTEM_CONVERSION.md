# Builder.io Design System Conversion Plan (Dark Mode Only)

## Overview
This document outlines the steps to convert the Grand Kru Technologies website to use Builder.io's design system in **dark mode only**. The design features a dark background with white content cards and blue accent highlights.

## Design System Characteristics

### Color Palette
- **Background**: Dark (#0a0a0a, #111111, #1a1a1a)
- **Cards**: White (#ffffff) with subtle hover states
- **Text**: White (#ffffff) on dark backgrounds, dark (#0a0a0a) on white cards
- **Accents**: Blue (#3b82f6) for primary actions
- **Borders**: Subtle dark borders (#2a2a2a)

### Typography
- **Font**: Inter (with system font fallbacks)
- **Headings**: Bold, large sizes (48px for H1, 36px for H2)
- **Body**: 16px regular weight
- **Line Height**: 1.5 for body, 1.2 for headings

### Spacing
- **Grid**: 8-point system
- **Card Padding**: 16px
- **Section Spacing**: 32px
- **Header Height**: 64px

### Components
- **Cards**: White background with dark text, rounded corners (12px)
- **Buttons**: Blue primary, transparent secondary with borders
- **Forms**: Dark inputs with blue focus states

## Conversion Phases

### Phase 1: Setup and Configuration

#### 1.1 Update Tailwind Configuration
- [ ] Replace color system with Builder.io dark mode colors
- [ ] Update font family to Inter with system fallbacks
- [ ] Configure spacing scale (8-point grid)
- [ ] Update border radius values
- [ ] Configure shadows for dark mode
- [ ] Remove light mode color variants (dark mode only)

#### 1.2 Remove Dark Mode Toggle
- [ ] Remove `DarkModeToggle` component from Navigation
- [ ] Remove dark mode composable usage (or simplify to always dark)
- [ ] Remove dark mode related scripts from `index.html`
- [ ] Update `useDarkMode.ts` to always return dark mode (or remove entirely)

#### 1.3 Update Base Styles
- [ ] Update `main.css` with Builder.io base styles
- [ ] Set default background to dark (#0a0a0a)
- [ ] Set default text color to white
- [ ] Configure Inter font family
- [ ] Update heading styles to match Builder.io typography

### Phase 2: Color System Migration

#### 2.1 Background Colors
- [ ] Update `App.vue`: `bg-[#0a0a0a]` (primary dark background)
- [ ] Update section backgrounds:
  - Main sections: `bg-[#0a0a0a]` or `bg-[#111111]`
  - Alternating sections: `bg-[#1a1a1a]`
- [ ] Remove all `dark:` variants (dark mode only)

#### 2.2 Card Components
- [ ] Update all card backgrounds to white (`bg-white`)
- [ ] Update card text to dark (`text-[#0a0a0a]`)
- [ ] Add card hover states (`hover:bg-[#f8f9fa]`)
- [ ] Update card borders to `border-[#e5e5e5]`
- [ ] Apply card shadow: `shadow-[0_2px_8px_rgba(0,0,0,0.3)]`
- [ ] Set card border radius to `rounded-xl` (12px)

#### 2.3 Text Colors
- [ ] Replace all text colors:
  - Primary text: `text-white`
  - Secondary text: `text-[#e5e5e5]`
  - Tertiary text: `text-[#b3b3b3]`
  - Text on cards: `text-[#0a0a0a]`
- [ ] Remove all `dark:` text color variants

#### 2.4 Accent Colors
- [ ] Update primary accent to blue: `text-[#3b82f6]` or `bg-[#3b82f6]`
- [ ] Update link colors to blue: `text-[#3b82f6]` with `hover:text-[#2563eb]`
- [ ] Update focus states to blue: `focus:ring-[#3b82f6]`

### Phase 3: Typography Updates

#### 3.1 Font Family
- [ ] Add Inter font import to `index.html` or `main.css`
- [ ] Update `tailwind.config.js` fontFamily to Inter
- [ ] Verify font loading and fallbacks

#### 3.2 Heading Styles
- [ ] Update H1: 48px, bold (700), line-height 1.2
- [ ] Update H2: 36px, bold (700), line-height 1.2
- [ ] Update H3: 30px, semibold (600), line-height 1.3
- [ ] Update H4: 24px, semibold (600), line-height 1.4
- [ ] Update H5: 20px, semibold (600), line-height 1.4
- [ ] Update H6: 18px, semibold (600), line-height 1.5

#### 3.3 Body Text
- [ ] Ensure body text is 16px, regular (400), line-height 1.5
- [ ] Update paragraph spacing

### Phase 4: Component Updates

#### 4.1 Navigation Component
- [ ] Update background: `bg-[#111111]` or `bg-[#0a0a0a]`
- [ ] Update text: `text-white`
- [ ] Update links: `text-white` with `hover:text-[#3b82f6]`
- [ ] Update border: `border-[#2a2a2a]`
- [ ] Set height to 64px
- [ ] Remove dark mode toggle

#### 4.2 Button Components
- [ ] Primary buttons:
  - Background: `bg-[#3b82f6]`
  - Text: `text-white`
  - Hover: `hover:bg-[#2563eb]`
  - Active: `active:bg-[#1d4ed8]`
  - Border radius: `rounded-lg` (8px)
  - Padding: `py-3 px-6` (12px 24px)
- [ ] Secondary buttons:
  - Background: `bg-transparent`
  - Text: `text-white`
  - Border: `border border-[#2a2a2a]`
  - Hover: `hover:bg-[#1a1a1a]`
- [ ] Ghost buttons:
  - Background: `bg-transparent`
  - Text: `text-[#e5e5e5]`
  - Hover: `hover:bg-[#1a1a1a]`

#### 4.3 Card Components
- [ ] Update all card backgrounds to white
- [ ] Update card text to dark
- [ ] Add hover effects
- [ ] Update borders and shadows
- [ ] Apply consistent padding (16px)

#### 4.4 Form Components
- [ ] Input backgrounds: `bg-[#111111]` with `focus:bg-[#1a1a1a]`
- [ ] Input text: `text-white`
- [ ] Input borders: `border-[#2a2a2a]` with `focus:border-[#3b82f6]`
- [ ] Placeholder text: `placeholder:text-[#b3b3b3]`
- [ ] Labels: `text-[#e5e5e5]`

### Phase 5: Page Updates

#### 5.1 HomeView
- [ ] Update hero section: dark background, white text
- [ ] Update service cards: white cards with dark text
- [ ] Update about section: dark background
- [ ] Update project cards: white cards
- [ ] Update testimonial cards: white cards
- [ ] Update CTA sections: dark background

#### 5.2 AboutView
- [ ] Update all sections to dark backgrounds
- [ ] Update content cards to white
- [ ] Ensure proper text contrast

#### 5.3 ServicesView
- [ ] Update service cards to white
- [ ] Update modal backgrounds
- [ ] Update detail sections

#### 5.4 ContactView
- [ ] Update form styling
- [ ] Update contact cards
- [ ] Update success/error messages

#### 5.5 PortfolioView
- [ ] Update portfolio cards to white
- [ ] Update modal styling
- [ ] Update detail views

#### 5.6 Footer
- [ ] Update background: `bg-[#111111]`
- [ ] Update text: `text-white`
- [ ] Update links: `text-[#e5e5e5]` with `hover:text-[#3b82f6]`
- [ ] Update borders: `border-[#2a2a2a]`

### Phase 6: Spacing and Layout

#### 6.1 Spacing Updates
- [ ] Update section padding to 32px (py-8)
- [ ] Update card padding to 16px (p-4)
- [ ] Update container padding to 24px
- [ ] Ensure 8-point grid consistency

#### 6.2 Layout Adjustments
- [ ] Update container max-width to 1280px
- [ ] Verify responsive breakpoints
- [ ] Update header height to 64px

### Phase 7: Shadows and Effects

#### 7.1 Shadow Updates
- [ ] Update card shadows: `shadow-[0_2px_8px_rgba(0,0,0,0.3)]`
- [ ] Update button shadows for depth
- [ ] Update modal shadows

#### 7.2 Transitions
- [ ] Update transition durations to 200ms
- [ ] Ensure smooth hover effects
- [ ] Add focus transitions

### Phase 8: Final Polish

#### 8.1 Remove Light Mode Code
- [ ] Remove all `dark:` class variants
- [ ] Remove dark mode toggle component
- [ ] Clean up unused dark mode utilities
- [ ] Remove dark mode from Tailwind config

#### 8.2 Testing
- [ ] Verify all text is readable
- [ ] Check card contrast
- [ ] Test button states
- [ ] Verify form inputs
- [ ] Test responsive layouts
- [ ] Check accessibility (contrast ratios)

#### 8.3 Documentation
- [ ] Update component documentation
- [ ] Document color usage
- [ ] Document spacing system

## Color Mapping Reference

### Backgrounds
- Primary: `bg-[#0a0a0a]` → `bg-builder-dark-primary`
- Secondary: `bg-[#111111]` → `bg-builder-dark-secondary`
- Tertiary: `bg-[#1a1a1a]` → `bg-builder-dark-tertiary`
- Card: `bg-white` → `bg-builder-card`

### Text
- Primary: `text-white` → `text-builder-foreground-primary`
- Secondary: `text-[#e5e5e5]` → `text-builder-foreground-secondary`
- Tertiary: `text-[#b3b3b3]` → `text-builder-foreground-tertiary`
- On Card: `text-[#0a0a0a]` → `text-builder-on-card`

### Accents
- Primary: `text-[#3b82f6]` or `bg-[#3b82f6]` → `text-builder-accent-primary` / `bg-builder-accent-primary`
- Hover: `hover:text-[#2563eb]` or `hover:bg-[#2563eb]` → `hover:text-builder-accent-hover` / `hover:bg-builder-accent-hover`

### Borders
- Default: `border-[#2a2a2a]` → `border-builder-border-default`
- Card: `border-[#e5e5e5]` → `border-builder-border-card`
- Focus: `border-[#3b82f6]` → `border-builder-border-focus`

## Implementation Notes

1. **Dark Mode Only**: All components should be styled for dark mode. No light mode variants needed.

2. **Card Pattern**: The signature Builder.io pattern is white cards on dark backgrounds. Use this consistently.

3. **Blue Accents**: Use blue (#3b82f6) for primary actions, links, and focus states.

4. **Typography**: Inter font with clear hierarchy. Large, bold headings.

5. **Spacing**: Follow 8-point grid system strictly.

6. **Transitions**: Smooth 200ms transitions for all interactive elements.

7. **Shadows**: Subtle shadows for depth, especially on white cards.

## Files to Modify

1. `tailwind.config.js` - Color system, fonts, spacing
2. `src/assets/main.css` - Base styles, typography
3. `src/App.vue` - Root background
4. `src/components/Navigation.vue` - Header styling
5. `src/components/Footer.vue` - Footer styling
6. `src/components/DarkModeToggle.vue` - Remove or hide
7. `src/views/HomeView.vue` - All sections
8. `src/views/AboutView.vue` - All sections
9. `src/views/ServicesView.vue` - Service cards and modals
10. `src/views/ContactView.vue` - Forms and contact info
11. `src/views/PortfolioView.vue` - Portfolio cards
12. `src/composables/useDarkMode.ts` - Simplify or remove
13. `index.html` - Remove dark mode script, add Inter font

## Expected Outcome

After conversion, the site will have:
- Dark background (#0a0a0a) throughout
- White content cards with dark text
- Blue accent highlights (#3b82f6)
- Inter font family
- Consistent 8-point spacing
- Smooth transitions and hover effects
- No light mode toggle or variants
- Modern, clean Builder.io aesthetic

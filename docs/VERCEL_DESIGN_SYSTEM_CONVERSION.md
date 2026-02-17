# Vercel Design System Conversion Plan

## Overview
This document outlines the steps needed to convert the Grand Kru Technologies website from the Blockbooster design system to the Vercel design system, creating a more modern, minimal, and sophisticated aesthetic.

## Design System Comparison

### Key Differences

**Blockbooster (Current):**
- Colorful palette with blues, purples, greens, oranges
- Primary blue: `#3858e9`
- Background: White (`#ffffff`)
- Text: Dark charcoal (`#1e1e1e`)
- Buttons: Blue with rounded corners (2px radius)
- Typography: Inter font, larger headings
- Shadows: More pronounced, colorful

**Vercel (Target):**
- Minimal monochrome palette (black, white, grays)
- **Light Mode:**
  - Primary: Black (`#171717`)
  - Background: Off-white (`#fafafa`)
  - Text: Near-black (`#171717`)
  - Buttons: Black with pill shape (100px radius)
- **Dark Mode:**
  - Primary: Light gray (`#ededed`)
  - Background: Pure black (`#000000`)
  - Text: Light gray (`#ededed`)
  - Buttons: White/light gray with pill shape (100px radius)
- Typography: Geist font (fallback to Arial), tighter letter spacing
- Shadows: Subtle, minimal
- **Full dark mode support** with system preference detection

## Conversion Steps

### Phase 1: Design System Setup

#### 1.1 Update Design System JSON
- [x] Create `vercel-design-system.json` with extracted tokens
- [ ] Review and validate all design tokens

#### 1.2 Update Tailwind Configuration
- [ ] Replace Blockbooster colors with Vercel colors in `tailwind.config.js`
- [ ] Add dark mode colors (black background, light gray text)
- [ ] Configure dark mode: `darkMode: 'class'` (already set)
- [ ] Update typography settings (Geist font, sizes, weights, letter spacing)
- [ ] Update spacing scale to match Vercel's system
- [ ] Update border radius values (especially for buttons: 100px)
- [ ] Update shadow definitions (more subtle)
- [ ] Update breakpoints if needed

#### 1.3 Font Integration
- [ ] Add Geist font family (and use Arial fallback)
- [ ] Update `main.css` with Geist font imports
- [ ] Verify font loading and fallbacks

### Phase 2: Color System Migration

#### 2.1 Background Colors
- [ ] Update `App.vue` background: `bg-[#fafafa] dark:bg-black`
- [ ] Update all section backgrounds:
  - Light mode: White sections `bg-white`, alternating `bg-[#fafafa]`
  - Dark mode: Black sections `dark:bg-black`, alternating `dark:bg-[#0a0a0a]`
- [ ] Remove colorful background gradients

#### 2.2 Text Colors
- [ ] Replace `text-charcoal-1` with `text-[#171717]` (Vercel foreground)
- [ ] Replace `text-charcoal-4` with `text-[#666666]` (Vercel accents-5)
- [ ] Update heading colors to use Vercel foreground
- [ ] Update link colors to use Vercel foreground (no blue)

#### 2.3 Button Colors
- [ ] Primary buttons:
  - Light mode: Black background (`#171717`), white text
  - Dark mode: Light gray background (`#ededed`), black text (`#0a0a0a`)
- [ ] Secondary buttons:
  - Light mode: Transparent background, gray text (`#666666`)
  - Dark mode: Transparent background, light gray text (`#a1a1a1`)
- [ ] Update hover states:
  - Light mode: Black buttons → `#000000`
  - Dark mode: Light buttons → `#ffffff`
- [ ] Update all button instances across components with dark mode variants
- [ ] Add hover and click highlights and microinteractions to buttons 

#### 2.4 Border Colors
- [ ] Replace colorful borders with subtle grays:
  - Light mode: `#eaeaea` or `#ebebeb`
  - Dark mode: `#1f1f1f` or `#878787`
- [ ] Update card borders: `border-[#ebebeb] dark:border-[#1f1f1f]`
- [ ] Update form input borders: `border-[#eaeaea] dark:border-[#1f1f1f]`

### Phase 3: Typography Updates

#### 3.1 Font Family
- [ ] Replace Inter with Geist (or Arial fallback) in all components
- [ ] Update `tailwind.config.js` fontFamily settings
- [ ] Update `main.css` base font definitions

#### 3.2 Heading Styles
- [ ] Update H1: Smaller size (~39px), tighter letter spacing (-2.038px), semibold (600)
- [ ] Update H2-H6: Adjust sizes and letter spacing to match Vercel
- [ ] Remove large heading sizes (70px, 120px CTA sizes)

#### 3.3 Body Text
- [ ] Update base font size to 16px (already correct)
- [ ] Update line heights to match Vercel (1.5 for body)
- [ ] Adjust paragraph spacing

### Phase 4: Component Updates

#### 4.1 Navigation Component
- [ ] Update background: Keep white or use `#fafafa`
- [ ] Update text colors to Vercel foreground
- [ ] Update "Get Started" button: Black pill button
- [ ] Remove blue link colors
- [ ] Update hover states

#### 4.2 Footer Component
- [ ] Update background to `#fafafa` or white
- [ ] Update text colors to Vercel palette
- [ ] Update CTA button: Black pill button
- [ ] Update link colors (no blue)
- [ ] Update social media icon colors

#### 4.3 Button Components
- [ ] Update `.glass-button` class: Black background, white text, 100px border radius
- [ ] Update `.glass-button-outline` class: Transparent, gray text
- [ ] Update hover states
- [ ] Remove blue button styles

#### 4.4 Card Components
- [ ] Update card backgrounds: White
- [ ] Update card borders: Subtle gray (`#ebebeb`, 0.8px)
- [ ] Update card shadows: Minimal (`rgba(0, 0, 0, 0.04) 0px 2px 2px 0px`)
- [ ] Update hover states

#### 4.5 Form Components
- [ ] Update input backgrounds: White
- [ ] Update input borders: `#eaeaea`
- [ ] Update input border radius: 8px
- [ ] Update focus states: Black border
- [ ] Update placeholder colors: `#999999`

### Phase 5: Page-Level Updates

#### 5.1 HomeView
- [ ] Update hero section: Off-white background, black text
- [ ] Update hero heading: Smaller, tighter letter spacing
- [ ] Update CTA buttons: Black pill buttons
- [ ] Update service cards: White cards with subtle borders
- [ ] Update all section backgrounds (alternate white/off-white)
- [ ] Remove colorful accents and gradients
- [ ] Update testimonials section styling
- [ ] Update FAQ section styling

#### 5.2 AboutView
- [ ] Update all backgrounds to Vercel palette
- [ ] Update text colors
- [ ] Update CTA button
- [ ] Remove colorful elements

#### 5.3 ServicesView
- [ ] Update service cards: White with subtle borders
- [ ] Update modal styling: White background, black text
- [ ] Update icon colors: Remove colorful backgrounds, use subtle grays
- [ ] Update hover states

#### 5.4 ContactView
- [ ] Update form styling: White background, subtle borders
- [ ] Update input fields: Vercel form styles
- [ ] Update contact info cards: White with subtle borders
- [ ] Update success/error messages: Use Vercel semantic colors

#### 5.5 PortfolioView
- [ ] Update portfolio cards: White with subtle borders
- [ ] Update modal: White background, black text
- [ ] Update carousel styling

### Phase 6: Styling Refinements

#### 6.1 Shadows
- [ ] Replace bold shadows with subtle Vercel shadows
- [ ] Update card shadows: `rgba(0, 0, 0, 0.04) 0px 2px 2px 0px`
- [ ] Remove colorful shadow effects

#### 6.2 Borders
- [ ] Update border radius: Buttons to 100px (pill shape)
- [ ] Update card border radius: Keep minimal (0px or 4px)
- [ ] Update border colors: Use Vercel gray scale
- [ ] Update border widths: 0.8px for subtle borders

#### 6.3 Spacing
- [ ] Review and adjust spacing to match Vercel's minimal approach
- [ ] Increase white space where appropriate
- [ ] Update section padding

#### 6.4 Transitions
- [ ] Update transition timings: Faster (150ms default)
- [ ] Ensure smooth hover effects

### Phase 7: Dark Mode Implementation

#### 7.1 Dark Mode Setup
- [ ] Re-enable dark mode in `useDarkMode` composable:
  - Default to system preference (`prefers-color-scheme: dark`)
  - Store user preference in localStorage
  - Apply `dark` class to `<html>` element
- [ ] Add dark mode toggle back to Navigation component:
  - Use Vercel-style toggle (sun/moon icons)
  - Position appropriately in navigation
  - Ensure accessibility (ARIA labels)

#### 7.2 Dark Mode Color Application
- [ ] Update `App.vue`: `bg-[#fafafa] dark:bg-black`
- [ ] Update all text colors with dark variants:
  - Headings: `text-[#171717] dark:text-[#ededed]`
  - Body: `text-[#171717] dark:text-[#ededed]`
  - Secondary: `text-[#666666] dark:text-[#a1a1a1]`
- [ ] Update all backgrounds with dark variants:
  - Cards: `bg-white dark:bg-black`
  - Sections: `bg-[#fafafa] dark:bg-black` or `bg-white dark:bg-[#0a0a0a]`
- [ ] Update borders: `border-[#eaeaea] dark:border-[#1f1f1f]`
- [ ] Update buttons with dark mode styles:
  - Primary: `bg-[#171717] dark:bg-[#ededed] text-white dark:text-[#0a0a0a]`
  - Secondary: `text-[#666666] dark:text-[#a1a1a1]`

#### 7.3 Dark Mode Component Updates
- [ ] Navigation: Dark background, light text
- [ ] Footer: Dark background, light text
- [ ] Forms: Dark inputs with light borders
- [ ] Modals: Dark background, light text
- [ ] Cards: Dark background with subtle borders

### Phase 8: CSS Updates

#### 8.1 main.css
- [ ] Update base styles for Vercel palette (light and dark)
- [ ] Update component classes (glass-button, form-input, etc.) with dark variants
- [ ] Remove Blockbooster-specific styles
- [ ] Add Vercel-specific utility classes
- [ ] Update link styles (no blue, use foreground color with dark variants)
- [ ] Add smooth transitions for theme switching

### Phase 9: Testing & Refinement

#### 9.1 Visual Testing
- [ ] Review all pages for consistency
- [ ] Check button styles across all pages
- [ ] Verify form styling
- [ ] Check card components
- [ ] Verify typography hierarchy

#### 8.2 Responsive Testing
- [ ] Test on mobile devices
- [ ] Test on tablets
- [ ] Test on desktop
- [ ] Verify spacing and layout at all breakpoints

#### 8.3 Accessibility
- [ ] Verify color contrast ratios
- [ ] Test keyboard navigation
- [ ] Verify focus states
- [ ] Check screen reader compatibility

#### 8.4 Performance
- [ ] Verify font loading performance
- [ ] Check CSS bundle size
- [ ] Optimize any heavy styles

## Implementation Notes

### Color Mapping

#### Light Mode
| Blockbooster | Vercel Light | Usage |
|-------------|--------------|-------|
| `#3858e9` (primary blue) | `#171717` (black) | Primary buttons, links |
| `#1e1e1e` (charcoal-1) | `#171717` (foreground) | Primary text |
| `#656a71` (charcoal-4) | `#666666` (accents-5) | Secondary text |
| `#ffffff` (white) | `#ffffff` (white) | Backgrounds, button text |
| `#f6f6f6` (gray-light-2) | `#fafafa` (accents-1) | Alternating backgrounds |
| `#979aa1` (charcoal-5) | `#999999` (accents-3) | Placeholders, disabled |

#### Dark Mode
| Blockbooster | Vercel Dark | Usage |
|-------------|-------------|-------|
| `#3858e9` (primary blue) | `#ededed` (light gray) | Primary buttons, links |
| `#1e1e1e` (charcoal-1) | `#ededed` (foreground) | Primary text |
| `#656a71` (charcoal-4) | `#a1a1a1` (accents) | Secondary text |
| `#ffffff` (white) | `#000000` (black) | Backgrounds |
| `#f6f6f6` (gray-light-2) | `#0a0a0a` (very dark) | Alternating backgrounds |
| `#979aa1` (charcoal-5) | `#878787` (medium gray) | Placeholders, borders |

### Typography Mapping

| Blockbooster | Vercel | Notes |
|-------------|--------|-------|
| Inter | Geist (Arial fallback) | Font family |
| 70px H1 | 38.925px H1 | Much smaller |
| 50px H2 | 32px H2 | Smaller |
| 400 weight | 500-600 weight | Slightly bolder |
| Normal letter spacing | Tight (-2px for H1) | Tighter spacing |

### Button Mapping

#### Light Mode
| Blockbooster | Vercel Light |
|-------------|--------------|
| Blue background (`#3858e9`) | Black background (`#171717`) |
| 2px border radius | 100px border radius (pill) |
| White text | White text |
| Blue hover (`#213fd4`) | Black hover (`#000000`) |

#### Dark Mode
| Blockbooster | Vercel Dark |
|-------------|-------------|
| Blue background (`#3858e9`) | Light gray background (`#ededed`) |
| 2px border radius | 100px border radius (pill) |
| White text | Black text (`#0a0a0a`) |
| Blue hover (`#213fd4`) | White hover (`#ffffff`) |

## Files to Modify

1. `tailwind.config.js` - Design tokens
2. `src/assets/main.css` - Base styles and component classes
3. `src/App.vue` - Main background
4. `src/components/Navigation.vue` - Header styling
5. `src/components/Footer.vue` - Footer styling
6. `src/views/HomeView.vue` - Home page
7. `src/views/AboutView.vue` - About page
8. `src/views/ServicesView.vue` - Services page
9. `src/views/ContactView.vue` - Contact page
10. `src/views/PortfolioView.vue` - Portfolio page

## Expected Outcome

After conversion, the website will have:
- **Minimal aesthetic**: Clean, sophisticated, monochrome design
- **Modern typography**: Geist font with tight letter spacing
- **Pill-shaped buttons**: Rounded buttons (black in light mode, white in dark mode)
- **Subtle shadows**: Minimal, professional shadows
- **Increased white space**: More breathing room
- **Full dark mode support**: Seamless light/dark mode switching
- **Professional appearance**: Enterprise-grade design similar to Vercel

## Review Checklist

Before executing, review:
- [ ] Design system JSON is complete and accurate
- [ ] Conversion plan covers all components
- [ ] Color mappings are correct
- [ ] Typography changes are appropriate
- [ ] Button styles match Vercel aesthetic
- [ ] All pages are accounted for

## Post-Conversion Tasks

After conversion:
- [ ] Update any documentation referencing Blockbooster
- [ ] Update README with new design system info
- [ ] Test all interactive elements
- [ ] Verify all forms work correctly
- [ ] Check all links and navigation
- [ ] Performance audit
- [ ] Accessibility audit

# Orangemetrics Website Architecture

**Quick Start Guide for New Developers**

This document helps you quickly understand and work with the Orangemetrics codebase. Everything is organized by priority - focus on the high-priority sections first.

## Current Project Structure

```
orangemetrics.xyz/
├── index.html              # Single-page application (ALL content here)
├── ARCHITECTURE.md         # This documentation
├── README.md              # Basic project info
├── assets/                # Visual assets only
│   ├── favicon.png        # Browser tab icon
│   ├── logo.png          # Header/footer logo
│   ├── sprite.svg        # Icon system
│   ├── hero-background.svg    # Hero section animation
│   ├── self-service.svg      # Bitcoin Data Platform visual
│   ├── open-source.svg       # Open Source Projects visual
│   ├── secure-reporting.svg  # Enterprise Solutions visual
│   └── daas.svg             # Data as a Service visual
├── css/
│   └── styles.css        # ALL styles (modular CSS-in-one-file)
└── scripts/
    ├── animations.js     # GSAP animations + ScrollTrigger
    └── main.js          # Form handling + Navigation
```

## Architecture Overview

**Type**: Single Page Application (SPA)  
**Backend**: Google Forms (no server needed)  
**Animations**: GSAP with ScrollTrigger  
**Styling**: CSS with custom properties (CSS variables)  
**Icons**: SVG sprite system  
**Responsive Design**: Mobile-first with comprehensive breakpoints

## 🔥 High Priority - Learn These First

### 1. Content Structure (index.html)
Everything lives in one HTML file with these main sections:
```html
<header>           <!-- Fixed navigation -->
<main>
  <section class="hero">              <!-- Landing area -->
  <section id="products">             <!-- 5 product sections -->
  <section id="testimonials">         <!-- Customer quotes -->
  <section id="contact">              <!-- Contact form -->
</main>
<footer>           <!-- Links and social -->
```

**Key Pattern**: Each product section follows this structure:
```html
<div class="product-section product-section-N">
  <div class="product-content">
    <div class="product-description">  <!-- Text content -->
    <div class="product-animation">    <!-- SVG illustration -->
  </div>
</div>
```

### 2. Mobile-First Responsive Design (styles.css)
**Critical Mobile Pattern** - Content stacks vertically on mobile:

**Desktop Layout (768px+):**
```css
.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* Side by side */
  gap: 4rem;
}
```

**Mobile Layout (<768px):**
```css
.product-content {
  display: block !important;        /* Vertical stacking */
  grid-template-columns: none !important;
  gap: 2rem;
}
```

**Mobile Content Order:**
1. Product description (top)
2. CTA button (middle, full-width)
3. SVG illustration (bottom, properly sized)

### 3. Forms System (main.js)
**Google Forms Integration** - No backend server needed!

```javascript
// Form field mappings (these are Google Forms field IDs)
name: "entry.748670802"
email: "entry.1791779232" 
company: "entry.2066384570"
message: "entry.778966652"
```

**How it works**:
1. User fills form → Submits to Google Forms URL
2. Hidden iframe prevents page refresh
3. JavaScript shows success message
4. Form source tracking for analytics

**Mobile Form Optimization:**
```css
.form-group input,
.form-group textarea {
  font-size: 16px; /* Prevents iOS zoom */
  padding: 0.8rem;
  width: 100%;
}
```

### 4. CSS Architecture (styles.css)
**CSS Variables System** (change colors globally):
```css
:root {
  --orange-primary: #FF7040;    /* Main brand color */
  --orange-accent: #FF8F66;     /* Buttons, links */
  --neutral-800: #292524;       /* Primary text */
  --text-secondary: #57534E;    /* Secondary text */
}
```

**Key CSS Organization:**
1. `:root` variables → Global colors/spacing
2. Global styles → Typography, resets
3. Component styles → Header, Hero, Products, Forms, Footer
4. **Responsive styles** → Mobile breakpoints (768px, 480px, 1024px)

## ⚡ Medium Priority - For Enhancements

### 5. Responsive Breakpoint Strategy

**Mobile-First Approach:**
```css
/* Base styles: Mobile first (default) */
.container { padding: 0 1rem; }

/* Tablet: 769px - 1024px */
@media (min-width: 769px) and (max-width: 1024px) {
  .container { padding: 0 1.5rem; }
}

/* Desktop: 1025px+ */
@media (min-width: 1025px) {
  .container { padding: 0 2rem; }
}
```

**Critical Mobile Breakpoints:**
- **768px**: Main mobile/desktop breakpoint
- **480px**: Small mobile devices
- **769px-1024px**: Tablet optimization

### 6. SVG Animation System (animations.js)
**Mobile-Optimized Animations:**
```javascript
// Performance-optimized for mobile
ScrollTrigger.batch(".product-section", {
  batchMax: 3,  // Max 3 animations at once
  onEnter: (elements) => { /* animate in */ }
});
```

**Mobile SVG Sizing:**
```css
.section-animation {
  width: 100%;
  max-width: 320px;
  min-height: 200px;
  margin: 0 auto;
}
```

### 7. Touch-Friendly Navigation
**Desktop vs Mobile Navigation:**

**Desktop**: Fixed header with hover dropdowns
**Mobile**: Hamburger menu with touch-friendly overlay

```css
@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    flex-direction: column;
    background: var(--background-surface);
  }
  
  .nav-links.active {
    display: flex;
  }
}
```

## 🛠️ Most Common Development Tasks

### Adding New Product Section
1. **HTML**: Copy existing `.product-section` pattern in index.html
2. **SVG**: Add new illustration file to `/assets/`
3. **CSS**: No new styles needed (responsive classes work automatically)
4. **Navigation**: Add link to header dropdown if needed

### Mobile Optimization Checklist
When adding new components, ensure:
- [ ] Content stacks vertically on mobile (<768px)
- [ ] Touch targets are minimum 44px
- [ ] Forms use `font-size: 16px` to prevent iOS zoom
- [ ] CTA buttons are full-width on mobile
- [ ] SVGs have proper min-height and max-width
- [ ] Text remains readable at mobile sizes

### Modifying Contact Forms
1. **Google Forms**: Create/modify form at forms.google.com
2. **Field Mappings**: Update entry IDs in main.js
3. **HTML**: Add/remove form fields in index.html
4. **Mobile Styling**: Existing responsive classes apply automatically

### Responsive Design Changes
**To modify breakpoints:**
```css
/* Update these media queries */
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 480px) { /* Small mobile */ }
@media (min-width: 769px) and (max-width: 1024px) { /* Tablet */ }
```

**To test responsive design:**
1. Use browser DevTools responsive mode
2. Test actual devices when possible
3. Check touch interactions on mobile
4. Verify form submissions work on all devices

## 🐛 Mobile-Specific Debugging

### SVG Not Displaying Properly on Mobile
1. Check `.section-animation` has `min-height: 200px`
2. Verify `max-width: 320px` for proper centering
3. Ensure parent `.product-animation` uses `display: block` on mobile

### Forms Not Working on Mobile
1. Verify `font-size: 16px` to prevent iOS zoom
2. Check `box-sizing: border-box` for proper width
3. Test form submission on actual mobile devices
4. Verify touch targets are large enough (44px minimum)

### Content Not Stacking Vertically
1. Check for `display: block !important` on mobile
2. Verify `grid-template-columns: none !important`
3. Ensure proper media query syntax `@media (max-width: 768px)`

### Touch Navigation Issues
1. Test hamburger menu toggle functionality
2. Verify dropdown menus work on touch devices
3. Check that outside-click dismissal works
4. Test smooth scrolling on mobile browsers

## 📱 Mobile Performance Considerations

### Optimizations Already Implemented
- **Animation batching**: Max 3 simultaneous animations
- **Touch-friendly sizing**: 44px minimum touch targets
- **iOS compatibility**: 16px font size prevents zoom
- **Efficient layouts**: `display: block` instead of complex grids on mobile
- **Proper image sizing**: SVGs scale appropriately

### Mobile Testing Workflow
1. **Browser DevTools**: Initial responsive testing
2. **Real devices**: iPhone, Android, iPad testing
3. **Touch interactions**: Verify all buttons and forms work
4. **Performance**: Check animation smoothness on older devices
5. **Form submission**: Test on multiple mobile browsers

## 📁 File Reference

### Files You'll Edit Often
- `index.html` → Content changes, new sections
- `css/styles.css` → Styling, colors, **responsive design**
- `scripts/main.js` → Form behavior, navigation

### Mobile-Critical CSS Sections
- **Lines 1-50**: CSS variables (colors, spacing)
- **Lines 800-1000**: Mobile responsive styles (`@media` queries)
- **Lines 400-600**: Form styling with mobile optimizations
- **Lines 300-400**: Product section responsive layout

### Files You'll Rarely Edit
- `scripts/animations.js` → Only for animation changes
- `assets/*.svg` → Replace when updating visuals
- `assets/logo.png` & `assets/favicon.png` → Branding updates

### External Dependencies
- **GSAP**: Animation library (loaded from CloudFlare CDN)
- **Google Forms**: Backend for form submissions
- **No other dependencies** → Simple, fast, reliable

## 🚀 Deployment Ready
- Static files only → Deploy anywhere (GitHub Pages, Netlify, etc.)
- No build process needed → Just upload files
- **Mobile-optimized** → Touch-friendly, responsive design
- Progressive enhancement → Works without JavaScript
- Accessible → WCAG compliant, keyboard + touch navigation
- Fast loading → Optimized assets, efficient responsive CSS

## 📊 Responsive Design Summary

**Desktop (1025px+)**: Side-by-side layout, hover interactions
**Tablet (769-1024px)**: Slightly reduced spacing, optimized for touch
**Mobile (≤768px)**: Vertical stacking, full-width buttons, touch-optimized
**Small Mobile (≤480px)**: Compressed spacing, smaller text sizes

---

**Need help?** Check the actual code - it's well-commented and follows consistent mobile-first patterns throughout. When in doubt, test on real devices!
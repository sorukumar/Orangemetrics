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

### 2. Forms System (main.js)
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

**To modify forms**:
- Add field in HTML → Update field mapping in main.js
- Change validation → Edit FormManager.handleFormSubmit()
- Style changes → Update `.contact-form` CSS

### 3. CSS Architecture (styles.css)
**CSS Variables System** (change colors globally):
```css
:root {
  --orange-primary: #FF7040;    /* Main brand color */
  --orange-accent: #FF8F66;     /* Buttons, links */
  --neutral-800: #292524;       /* Primary text */
  --text-secondary: #57534E;    /* Secondary text */
}
```

**Key CSS Sections** (in order):
1. `:root` variables → Global colors/spacing
2. Global styles → Typography, resets
3. Header/Navigation → Fixed header, dropdowns
4. Hero section → Landing area
5. Product sections → Main content areas
6. Forms → Contact forms styling
7. Footer → Bottom content
8. Responsive → Mobile breakpoints

## ⚡ Medium Priority - For Enhancements

### 4. Animation System (animations.js)
**GSAP + ScrollTrigger** for smooth animations:
```javascript
// Performance-optimized animation batching
ScrollTrigger.batch(".product-section", {
  batchMax: 3,  // Max 3 animations at once
  onEnter: (elements) => { /* animate in */ }
});
```

**Animation Types**:
- Scroll-triggered section reveals
- Hero background SVG animation
- Header size/shadow changes on scroll
- Form loading states

### 5. Navigation System
**Desktop**: Fixed header with dropdown menus  
**Mobile**: Hamburger menu with overlay  
**Scroll behavior**: Header shrinks, container width adjusts  

```javascript
// Auto-shrinking header logic
if (window.pageYOffset > 50) {
  header.classList.add('header-scrolled');
}
```

## 🛠️ Most Common Development Tasks

### Adding New Product Section
1. **HTML**: Copy existing `.product-section` pattern in index.html
2. **SVG**: Add new illustration file to `/assets/`
3. **CSS**: No new styles needed (uses existing classes)
4. **Navigation**: Add link to header dropdown if needed

### Modifying Contact Forms
1. **Google Forms**: Create/modify form at forms.google.com
2. **Field Mappings**: Update entry IDs in main.js
3. **HTML**: Add/remove form fields in index.html
4. **Styling**: Existing `.form-group` styles work automatically

### Changing Colors/Branding
1. **CSS Variables**: Update `:root` section in styles.css
2. **Logo**: Replace `assets/logo.png`
3. **Favicon**: Replace `assets/favicon.png`
4. **SVG Colors**: Update `--svg-*` variables in CSS

### Performance Optimization
- **Images**: Use SVG when possible (scalable, small)
- **Animations**: Max 3 simultaneous (already optimized)
- **Forms**: Hidden iframe prevents page refresh
- **Loading**: GSAP loaded from fast CDN

## 🐛 Quick Debugging

### Forms Not Working
1. Check Google Forms URL in form `action` attribute
2. Verify field `name` attributes match entry IDs
3. Look for JavaScript errors in browser console

### Animations Not Working  
1. Check if GSAP loaded (Network tab in DevTools)
2. Verify ScrollTrigger plugin loaded
3. Test on different screen sizes

### Mobile Issues
1. Test responsive breakpoints (768px is main breakpoint)
2. Check hamburger menu JavaScript
3. Verify touch interactions work

### SVG Not Displaying
1. Check file path in `<object>` tag
2. Verify SVG file exists in `/assets/`
3. Check browser console for loading errors

## 📁 File Reference

### Files You'll Edit Often
- `index.html` → Content changes, new sections
- `css/styles.css` → Styling, colors, responsive design
- `scripts/main.js` → Form behavior, navigation

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
- Progressive enhancement → Works without JavaScript
- Accessible → WCAG compliant, keyboard navigation
- Fast loading → Optimized assets, CDN resources

---

**Need help?** Check the actual code - it's well-commented and follows consistent patterns throughout.
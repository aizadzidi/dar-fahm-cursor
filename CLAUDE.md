# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, responsive landing page for **Darul Fahmi - Mastering Arabic**, an online Arabic language learning platform. The site is built as a static website using vanilla HTML, CSS, and JavaScript without any build system or package management.

## Development Commands

Since this is a static website, there are no build commands, package managers, or test scripts. Development is straightforward:

- **Development**: Simply open `index.html` in any modern web browser
- **Live Server**: Use VS Code Live Server extension or any local server for development
- **No Build Process**: Direct file editing and browser refresh workflow

## Architecture & Structure

### Core Files
- `index.html` (842 lines) - Single-page application with semantic HTML5 structure
- `styles.css` (3,434 lines) - Comprehensive CSS with custom variables and responsive design
- `script.js` (1,004 lines) - Vanilla JavaScript for interactivity and animations
- `images/` - Directory containing logos, staff photos, course materials, and gallery images

### Technical Stack
- **Frontend**: Vanilla HTML5, CSS3, ES6 JavaScript
- **Typography**: Google Fonts (Montserrat + Amiri for Arabic text)
- **Icons**: Font Awesome 6.0.0
- **Responsive**: Mobile-first design with CSS Grid and Flexbox
- **No Framework**: Pure web technologies, no external dependencies

### CSS Architecture
- **CSS Variables**: Extensive use of custom properties for theming (`--primary-color`, `--secondary-color`, etc.)
- **Color Scheme**: Deep blue (#1a5276) primary, gold (#d4ac0d) secondary, green (#117a65) accent
- **Layout System**: CSS Grid for main layouts, Flexbox for components
- **Responsive Design**: Mobile-first with breakpoints for tablet and desktop
- **Animation**: CSS transitions and transforms, Intersection Observer API for scroll animations

### JavaScript Features
- **Mobile Navigation**: Hamburger menu with smooth open/close animations
- **Scroll Effects**: Header transparency, progress indicators, parallax effects
- **Smooth Scrolling**: Navigation links with custom easing
- **Intersection Observer**: Element animations on scroll into view
- **Event Management**: Comprehensive event handling for mobile and desktop
- **Accessibility**: Keyboard navigation, ARIA labels, escape key handling

### Content Sections
1. Navigation with mobile hamburger menu
2. Hero section with call-to-action buttons
3. Student feedback/testimonials
4. FAQ section with expandable questions
5. About section with company information
6. Founder biography (Amirul Fahmi)
7. Company history timeline
8. Philosophy section with inspirational quotes
9. Arabic learning programs (Durus al-Lughah syllabus)
10. Course author information (Dr. V. Abdul Rahim)
11. Teaching staff profiles with photos
12. Contact section with registration form link
13. Footer with branding

### Image Management
- **Required Staff Photos**: `maisarah.jpg`, `fahmi.jpg`, `ammar.jpg`, `dr-abdur-rahim.jpg`
- **Fallback System**: Professional icons display when images fail to load
- **Course Materials**: Visual syllabus showing book covers and learning materials
- **Gallery**: Student photos and learning environment images
- **Logo**: `logo-1.png` with text fallback system

## Styling Conventions

### CSS Organization
- Global variables at top of `styles.css`
- Mobile-first responsive approach
- Component-based styling (each section has its own styles)
- Consistent use of CSS custom properties
- Semantic class naming (`.hero`, `.feedback`, `.staff-grid`, etc.)

### Responsive Breakpoints
- Mobile: default (up to 768px)
- Tablet: 768px and up
- Desktop: 1024px and up
- Large screens: 1200px and up

### Animation Patterns
- Hover effects on buttons and cards
- Scroll-triggered animations using Intersection Observer
- Smooth transitions (0.3s ease)
- Staggered animations for list items

## Key Features

### Accessibility
- ARIA labels and semantic HTML
- Keyboard navigation support
- High contrast color scheme
- Mobile-friendly touch targets
- Screen reader compatibility

### Performance
- Optimized images with lazy loading
- Minimal external dependencies (only Google Fonts and Font Awesome)
- Efficient CSS with minimal redundancy
- Progressive enhancement approach

### Multilingual Support
- Primary language: Bahasa Malaysia
- Arabic text integration with proper fonts
- RTL text handling for Arabic content

## Contact Integration
- **Phone**: 011-5775 7675
- **Registration**: Google Form link (https://forms.gle/Kp9pwavAQYV7cKNJ8)
- **Platform**: Online classes via Google Meet

## Development Notes

When making changes:
- Test across mobile, tablet, and desktop viewports
- Ensure Arabic text renders correctly with Amiri font
- Verify image fallbacks work when photos are missing
- Test mobile navigation thoroughly
- Check scroll animations don't interfere with accessibility
- Maintain color scheme consistency using CSS variables
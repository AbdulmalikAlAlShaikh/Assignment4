# Technical Documentation – Assignment 4

## Architecture Overview

This portfolio website is a single-page application built with vanilla HTML, CSS, and JavaScript. It follows a modular function architecture where each feature is encapsulated in its own initialization function, all wired together in a single `DOMContentLoaded` event listener.

```
index.html          ← Structure & Semantic Markup
css/styles.css      ← Design System, Layout, Components, Responsive, Animations
js/script.js        ← All Interactive Logic, API Calls, State Management, Canvas, Modals
```

## Design System

### CSS Custom Properties

The entire visual system is driven by CSS custom properties defined in `:root`, with a `[data-theme="light"]` override for the light theme. This enables instant theme switching without redundant CSS rules.

**Key Tokens:**
| Token | Purpose |
|---|---|
| `--color-bg` / `--color-bg-secondary` | Page background colors |
| `--color-surface` / `--color-surface-hover` | Card/surface backgrounds |
| `--color-text` / `--color-text-secondary` | Primary and muted text |
| `--color-border` | Borders and dividers |
| `--gradient-primary` | Purple-to-blue gradient (brand identity) |
| `--gradient-secondary` | Pink-to-amber gradient (accent) |
| `--transition-fast/base/slow` | Consistent animation timing |

### Typography
- **Fonts**: Inter (body text) + JetBrains Mono (terminal), with system font fallbacks
- **Scale**: 7 sizes from `--font-size-sm` (0.875rem) to `--font-size-5xl` (3rem)
- **Rendering**: Anti-aliased with `-webkit-font-smoothing` and `text-rendering: optimizeLegibility`
- **Responsive**: Font sizes adjust at 968px, 768px, and 480px breakpoints

## Feature Implementation Details

### 1. API Integration

#### GitHub Repositories (`fetchGitHubRepos()`)
- **Endpoint**: `GET https://api.github.com/users/{username}/repos?sort=updated&per_page=6`
- **States**: Loading (spinner) → Success (card grid) → Error (retry button)
- **Card Data**: Name, description, language (with color dot), stars, forks, last updated date
- **Security**: HTML escaping via `escapeHtml()` to prevent XSS from repo data
- **Language Colors**: Static `LANG_COLORS` map for 15+ programming languages

#### Quote API (`fetchQuote()`)
- **Endpoint**: `GET https://dummyjson.com/quotes/random`
- **States**: Loading → Success → Error
- **Features**: "New Quote" button for re-fetching

### 2. Complex Logic

#### Multi-Condition Project Filtering (`initProjectFilter()`)
The filter system combines four independent criteria:

```
Step 1: Check TAG filter (all / design / dev / uiux)
Step 2: Check LEVEL filter (all / beginner / intermediate / advanced)
Step 3: Check SEARCH term (title, description, tags)
Step 4: Cards matching ALL three conditions are visible
Step 5: Sort visible cards by selected order (newest/oldest/a-z/z-a)
Step 6: Re-order DOM elements to match sort
Step 7: Show/hide empty state based on result count
```

Each project card has `data-tags`, `data-date`, and `data-level` attributes used by the filter logic.

#### Visit Timer (`initVisitTimer()`)
- Records `Date.now()` on page load
- Uses `requestAnimationFrame` for smooth, efficient updates
- Displays elapsed time in "Xm Ys" or "Ys" format

#### Form Validation (`validateForm()`)
Multi-step validation chain:
1. Empty field check
2. Minimum length check (name ≥ 2, message ≥ 10)
3. Format check (name: letters/spaces/Arabic only, email: regex)
4. Real-time blur validation for instant feedback

### 3. State Management

| Feature | Storage | Key | Scope |
|---|---|---|---|
| Theme | `localStorage` | `theme` | Persistent across visits |
| Visitor Name | `localStorage` | `visitorName` | Persistent across visits |
| Login State | `sessionStorage` | `isLoggedIn` | Current tab only |
| Collapsible Sections | CSS classes | N/A | Current page view only |

#### Visitor Name Flow
```
Page Load → Check localStorage("visitorName")
  → null: Show welcome modal
    → Submit: Save name, update greeting, show toast
    → Skip: Save empty string, hide modal
  → exists: Use name in greeting ("Good morning, Ahmed!")
```

#### Login Simulation Flow
```
Click Login Button → Toggle sessionStorage("isLoggedIn")
  → true: Add .logged-in class, show member content, update text to "Log Out"
  → false: Remove .logged-in class, hide member content, update text to "Log In"
```

### 4. Performance Optimizations

| Optimization | Implementation |
|---|---|
| Lazy loading images | `loading="lazy"` attribute on all `<img>` tags |
| Debounced search | `debounce()` utility wraps search input handler (250ms delay) |
| Efficient timer | `requestAnimationFrame` instead of `setInterval` |
| Preconnect hints | `<link rel="preconnect">` for fonts.googleapis.com, api.github.com, dummyjson.com |
| Font display swap | `&display=swap` parameter in Google Fonts URL |
| CSS transitions | `will-change`-free approach using `transform` and `opacity` for GPU acceleration |
| Minimal reflows | Sort operation appends cards in order rather than rebuilding the DOM |
| Canvas visibility | Particle animation pauses when tab is hidden via `document.visibilitychange` |
| Passive listeners | Scroll event listeners use `{ passive: true }` to avoid blocking |

---

## Assignment 4 Innovation Features (Technical Deep Dive)

### 5. Interactive Particle Background (`initParticleBackground()`)

**Architecture:**
```
Canvas setup → Create particles[] → Animation loop (requestAnimationFrame)
  ├── Clear canvas
  ├── Update particle positions (velocity + bounce)
  ├── Apply mouse interaction (subtle repulsion)
  ├── Draw particles (filled circles)
  ├── Draw connections (lines between nearby particles)
  └── Loop
```

**Configuration:**
| Parameter | Value | Rationale |
|---|---|---|
| `PARTICLE_COUNT` | 45 | Balance between visual density and mobile performance |
| `CONNECTION_DISTANCE` | 150px | Close enough for visible network without clutter |
| `PARTICLE_SIZE` | 2–3.5px | Subtle but visible dots |
| Mouse influence | 200px radius, 0.002 factor | Gentle repulsion, not jarring |

**Theme Awareness:** Reads `data-theme` attribute each frame to switch particle and line colors:
- Dark theme: purple (`168, 85, 247`)
- Light theme: gray-blue (`100, 100, 120`)

**Performance:** 
- Animation pauses via `document.visibilitychange` when tab is hidden
- Canvas resizes on window resize with debounced particle recreation
- Uses `requestAnimationFrame` for synchronized 60fps rendering

### 6. Animated Skill Progress Bars (`initSkillBars()`)

**Data Flow:**
```html
<div class="skill-bar-fill" data-width="85"></div>
```
```
IntersectionObserver (threshold: 0.3) → Card enters viewport
  → For each .skill-bar-fill in card:
    → setTimeout with stagger (index × 150ms)
    → Set width to data-width value
    → CSS transition handles the animation (1.2s cubic-bezier)
```

**CSS Animation Stack:**
1. `width` transition: 1.2s cubic-bezier for the fill
2. `::after` pseudo-element: Infinite shimmer sweep animation
3. Staggered delays per bar within each card
4. Staggered delays per card within the grid

### 7. Image Lightbox (`initLightbox()`)

**Modal Pattern:**
```
User clicks .lightbox-trigger → Read data-src and data-caption
  → Set lightbox <img> src and caption text
  → Show overlay (display: flex)
  → Lock body scroll (overflow: hidden)
  → Listen for close events:
    ├── Close button click
    ├── Overlay click (outside image)
    └── Escape key press
  → Clean up: hide overlay, restore scroll, clear img src
```

**Accessibility:**
- `role="dialog"` and `aria-label` on overlay
- `aria-label` on close button
- Keyboard support (Escape to close)
- `cursor: zoom-in` hint on triggers
- Image overlay with magnifier icon on hover

### 8. Terminal Easter Egg (`initTerminal()`)

**Command Processing:**
```
Ctrl+K → Open terminal modal → Focus input
  → User types command → Enter key
    → Echo command to output
    → Look up in commands{} object
      → Found: Execute handler, display result
      → Not found: Show error with help suggestion
```

**Command Handlers:**
| Command | Behavior |
|---|---|
| `help` | Show formatted list of all commands |
| `about` | Display personal summary |
| `skills` | Show ASCII progress bars |
| `projects` | Close terminal, navigate to #projects |
| `contact` | Close terminal, navigate to #contact |
| `theme` | Call `toggleTheme()`, show confirmation |
| `clear` | Clear terminal output |
| `exit` | Close terminal modal |
| `hello` | Personalized greeting using localStorage name |
| `joke` | Random developer joke from predefined array |

**Security:** All user input is HTML-escaped via `escapeHtml()` before display.

### 9. Scroll Progress Bar (`initScrollProgress()`)

```
Scroll event (passive) → Calculate: scrollY / (documentHeight - windowHeight)
  → Set progress bar width as percentage
  → Capped at 100%
```

### 10. Back to Top Button (`initBackToTop()`)

```
Scroll event (passive) → scrollY > 500px?
  → Yes: Add .visible class (opacity 1, translateY 0)
  → No: Remove .visible class (opacity 0, hidden)
Click → window.scrollTo({ top: 0, behavior: "smooth" })
```

### 11. Button Ripple Effects (`initRippleEffects()`)

```
Click on .btn-ripple → Calculate click position relative to button
  → Create <span class="ripple"> at click coordinates
  → Size = max(button width, height)
  → CSS animation: scale(0) → scale(4) with opacity fade
  → Remove span on animationend
```

### 12. Staggered Scroll Animations (`initStaggeredAnimations()`)

```
IntersectionObserver watches grid containers
  → Grid enters viewport → Find all .stagger-in children
  → For each child, setTimeout(index × 120ms)
    → Add .visible class
    → CSS transition: opacity 0→1, translateY 24px→0
```

## Responsive Design Strategy

| Breakpoint | Changes |
|---|---|
| ≤ 968px | Hero grid → single column, projects/GitHub/skills grids → single column |
| ≤ 768px | Navigation becomes mobile slide-out menu, filter bar stacks vertically, login text hidden (icon only), back-to-top repositioned |
| ≤ 480px | Font sizes reduced, container padding reduced, card padding reduced, terminal window width increased |

## Accessibility

- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<article>`)
- `aria-label` attributes on icon-only buttons and modal overlays
- `role="dialog"` on lightbox overlay
- Keyboard navigation support (Enter, Escape, Ctrl+K)
- Color contrast compliant in both themes
- Focus styles on interactive elements
- `alt` text on all images
- `aria-hidden="true"` on decorative elements (canvas, scroll progress)

## Error Handling Strategy

Every async operation follows the same pattern:
1. Show loading indicator
2. Attempt fetch with `async/await`
3. Validate response status (`response.ok`)
4. Parse and render data on success
5. Catch errors and show user-friendly error state
6. Display toast notification for feedback

## File Sizes (Assignment 4)

| File | Size (approx.) |
|---|---|
| `index.html` | ~22 KB |
| `css/styles.css` | ~30 KB |
| `js/script.js` | ~30 KB |
| Total (excluding images) | ~82 KB |

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- No polyfills required — uses standard ES6+ and modern CSS features

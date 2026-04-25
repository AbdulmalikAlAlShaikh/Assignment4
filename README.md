# Personal Portfolio Website – Assignment 4

A polished, production-ready personal portfolio web application showcasing full-stack web development skills. Built with HTML, CSS, and JavaScript, this final version brings together everything from Assignments 1–3 with innovative features, professional-grade design, and comprehensive documentation.

![Portfolio Preview](assets/images/profile.png)

## 🌐 Live Deployment

**Live Site**: https://abdulmalikalalshaikh.github.io/Assignment4/

## 🌟 Features

### Core Features (Assignments 1 & 2)

- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with localStorage persistence
- **Form Validation**: Real-time contact form validation with error messages
- **Smooth Scrolling**: Navigation links smoothly scroll to sections
- **Mobile Menu**: Responsive hamburger navigation
- **Daily Inspiration Quotes**: Random quotes from a public API
- **Typing Animation**: Hero subtitle types out with a blinking cursor effect
- **Toast Notifications**: Animated slide-in notifications for important events

### Advanced Features (Assignment 3)

#### 🔗 API Integration

- **GitHub Repositories**: Fetches and displays your latest public GitHub repos with language, stars, forks, and links — all live from the GitHub API
- **Quote API**: Random inspirational quotes with loading and error states

#### 🧠 Complex Logic

- **Project Filter + Sort Combo**: Filter by category (All, Design, Dev, UI/UX), sort by date or name (Newest, Oldest, A–Z, Z–A), and search by keyword — all combined together
- **Experience Level Selector**: Show Beginner, Intermediate, or Advanced projects based on user selection
- **Multi-Step Form Validation**: Name (letters-only + min length), email (regex pattern), and message (min length) — all checked before submission
- **Visit Timer**: Real-time counter in the footer showing how long the visitor has been on the site

#### 💾 State Management

- **Visitor Name Persistence**: Welcome modal on first visit stores the visitor's name in `localStorage` and personalizes the greeting
- **Login/Logout Simulation**: Toggle login state (stored in `sessionStorage`), which reveals member-only content
- **Collapsible Sections**: About and Contact sections can be collapsed/expanded with toggle buttons
- **Theme Persistence**: Dark/light mode saved in `localStorage` and restored on page load

### ✨ New Innovation Features (Assignment 4)

#### 🎨 Interactive Particle Background
A canvas-based animated particle system in the hero section. Particles drift and connect with lines when near each other, creating a network effect. The animation responds subtly to mouse movement and pauses when the tab is hidden for performance.

#### 📊 Animated Skill Progress Bars
Skills are displayed as animated progress bars with proficiency percentages. Each bar fills with a gradient and shimmer effect when scrolled into view, with staggered delays for a wave-like entrance.

#### 🖼️ Project Image Lightbox
Click any project image to open a full-screen lightbox preview with caption. Supports closing via Escape key, close button, or clicking the overlay. Includes a zoom-in cursor hint on hover.

#### 💻 Terminal Easter Egg (Ctrl+K)
A hidden terminal interface activated by pressing `Ctrl+K`. Features a macOS-style terminal window with 8 commands:
- `help` — See available commands
- `about` — Learn about me
- `skills` — View skill bars in ASCII
- `projects` — Navigate to projects section
- `contact` — Navigate to contact section
- `theme` — Toggle dark/light mode
- `hello` — Personalized greeting
- `joke` — Hear a developer joke

#### 📜 Scroll Progress Indicator
A thin gradient bar at the top of the page that fills as the user scrolls down, showing reading progress.

#### ⬆️ Back to Top Button
A floating button that appears after scrolling past the hero section. Smooth-scrolls back to the top with hover animations.

#### 🌊 Visual Polish
- Staggered fade-in animations for project and skill cards
- Floating animation on hero profile image
- Button ripple effects (Material Design style)
- Nav link underline hover animations
- Gradient hover borders on cards
- Improved typography with font smoothing

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required!

### Running Locally

1. **Clone this repository**

   ```bash
   git clone https://github.com/yourusername/id-name-assignment4.git
   cd id-name-assignment4
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local development server:

     ```bash
     # Using Python 3
     python3 -m http.server 8000

     # Using Node.js
     npx http-server
     ```

   - Then navigate to `http://localhost:8000`

3. **Explore the features**
   - Try the **theme toggle** in the navigation bar
   - Watch the **particle background** in the hero section
   - Watch the **typing animation** and **floating profile image**
   - First-time visitors see a **welcome modal** to enter their name
   - Click **Log In** to simulate login and reveal member-only content
   - Scroll to see **animated skill progress bars** fill on view
   - Check the **scroll progress bar** at the very top
   - Click any project image for the **lightbox preview**
   - Press **Ctrl+K** to open the **terminal easter egg**
   - Use **filter buttons**, **experience level selector**, **sort dropdown**, and **search bar** to explore projects
   - **Collapse/expand** the About and Contact sections
   - Use the **back-to-top button** after scrolling down
   - Check the **visit timer** in the footer
   - Test **form validation** by submitting the contact form

## 📁 Project Structure

```
assignment-4/
├── README.md               # This file
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles, themes, and animations
├── js/
│   └── script.js           # Interactive functionality & API calls
├── assets/
│   └── images/             # Profile and project images
├── docs/
│   ├── ai-usage-report.md          # AI tools documentation
│   └── technical-documentation.md  # Technical details
├── presentation/
│   ├── slides.pdf          # Presentation slides
│   └── demo-video.mp4      # Video demonstration
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🎨 Technologies Used

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Custom properties, Grid, Flexbox, animations, glassmorphism, gradient effects
- **JavaScript (ES6+)**: Canvas API, Async/await, Fetch API, IntersectionObserver, DOM manipulation, localStorage, sessionStorage
- **Google Fonts**: Inter + JetBrains Mono font families
- **GitHub REST API**: Live repository data
- **DummyJSON API**: Random inspirational quotes

## ✨ Innovation Highlights

| Feature | Technology | What Makes It Creative |
|---|---|---|
| Particle Background | Canvas API | Mouse-interactive network animation |
| Terminal Easter Egg | DOM + Keyboard events | Hidden CLI with navigation & jokes |
| Animated Skill Bars | IntersectionObserver | Staggered fill with shimmer effect |
| Image Lightbox | Modal + Keyboard | Full-screen preview with gesture support |
| Scroll Progress | Scroll events | Visual reading progress feedback |
| Button Ripples | CSS + JS | Material Design tactile feedback |

## 🤖 AI Integration

This project was developed with assistance from AI tools. Key uses included:

- **Code Generation**: Gemini/Antigravity for advanced feature implementation
- **Architecture Design**: AI-assisted planning of particle systems, terminal logic, and lightbox patterns
- **Debugging**: AI helped identify and fix canvas rendering, keyboard event conflicts, and CSS transition issues
- **Documentation**: AI assistance for comprehensive documentation
- **Innovation Ideas**: AI suggested creative features like the terminal easter egg and particle background

For detailed information, see [docs/ai-usage-report.md](docs/ai-usage-report.md).

## 🔧 Browser Compatibility

Tested and working on:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Breakpoints

| Breakpoint    | Target         |
| ------------- | -------------- |
| < 480px       | Mobile phones  |
| 481px – 768px | Tablets        |
| 769px – 968px | Small desktops |
| > 968px       | Large desktops |

## ⚡ Performance Optimizations

- Lazy loading images (`loading="lazy"`)
- Debounced search input (250ms)
- `requestAnimationFrame` for visit timer & particle animation
- Particle animation pauses when tab is hidden
- Preconnect hints for external APIs and fonts
- Font display swap to prevent invisible text
- CSS `will-change`-free GPU acceleration via transform/opacity
- Passive scroll event listeners

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on all icon-only buttons and modals
- Keyboard navigation (Escape closes modals/lightbox, Enter submits)
- Color contrast compliant in both themes
- Focus styles on interactive elements
- Alt text on all images

## 📚 Documentation

- **[AI Usage Report](docs/ai-usage-report.md)**: Detailed documentation of AI tool usage
- **[Technical Documentation](docs/technical-documentation.md)**: Architecture and implementation details


## 🎬 Presentation

**Video Presentation**: https://kfupmedusa-my.sharepoint.com/:v:/g/personal/s202262200_kfupm_edu_sa/IQAwcjzAdi_CQJzep99nOE4RAW3QlEvDCJ1_YHMCLPp1B_k?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=b8LsPK

## 👨‍💻 Author

**Abdulmalik Al AlShaikh**  
Software Engineering Student at KFUPM

## 📄 License

This project is open source and available for educational purposes.

---

**Note**: This is an educational project created for SWE363 – Web Engineering, demonstrating comprehensive web development with HTML, CSS, and JavaScript.

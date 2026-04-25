// ===================================
// THEME TOGGLE (State Management)
// ===================================

/**
 * Initialize theme from localStorage or system preference
 */
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const theme = savedTheme || (systemPrefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", theme);
}

/**
 * Toggle between dark and light themes and persist in localStorage
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  showToast(`Switched to ${newTheme} mode`, "info");
}

// ===================================
// TOAST NOTIFICATION SYSTEM
// ===================================

/**
 * Show an animated toast notification
 * @param {string} message - The message to display
 * @param {"success"|"error"|"info"} type - The type of toast
 * @param {number} duration - Auto-dismiss time in ms (default 4000)
 */
function showToast(message, type = "info", duration = 4000) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  // Auto-dismiss
  setTimeout(() => {
    toast.classList.add("removing");
    toast.addEventListener("animationend", () => toast.remove());
  }, duration);
}

// ===================================
// TIME-BASED GREETING
// ===================================

/**
 * Display greeting message based on current time.
 * If the visitor has stored their name, include it.
 */
function displayGreeting() {
  const greetingElement = document.getElementById("greeting");
  if (!greetingElement) return;

  const hour = new Date().getHours();
  const visitorName = localStorage.getItem("visitorName");
  let greeting;

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon";
  } else if (hour >= 17 && hour < 22) {
    greeting = "Good evening";
  } else {
    greeting = "Hello there";
  }

  // Personalize with visitor name if available
  if (visitorName) {
    greeting += `, ${visitorName}`;
  }

  const emojis = { morning: "☀️", afternoon: "👋", evening: "🌙", night: "✨" };
  const emojiKey =
    hour >= 5 && hour < 12
      ? "morning"
      : hour >= 12 && hour < 17
        ? "afternoon"
        : hour >= 17 && hour < 22
          ? "evening"
          : "night";

  greetingElement.textContent = `${greeting}! ${emojis[emojiKey]}`;
}

// ===================================
// TYPING EFFECT
// ===================================

/**
 * Animate text with a typing effect on the hero subtitle
 */
function initTypingEffect() {
  const element = document.getElementById("typing-subtitle");
  if (!element) return;

  const text = "Software Engineering Student";
  let index = 0;

  // Create a cursor span
  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  element.appendChild(cursor);

  function typeChar() {
    if (index < text.length) {
      // Insert the next character before the cursor
      element.insertBefore(
        document.createTextNode(text.charAt(index)),
        cursor,
      );
      index++;
      setTimeout(typeChar, 70 + Math.random() * 50);
    }
    // Cursor stays blinking after typing finishes
  }

  // Small delay before starting
  setTimeout(typeChar, 600);
}

// ===================================
// SMOOTH SCROLLING
// ===================================

/**
 * Enable smooth scrolling for navigation links
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Only apply to anchor links
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          // Close mobile menu if open
          const navMenu = document.getElementById("nav-menu");
          const navToggle = document.getElementById("nav-toggle");
          if (navMenu && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            navToggle.classList.remove("active");
          }

          // Scroll to target with offset for fixed header
          const headerHeight = document.getElementById("header").offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

// ===================================
// MOBILE MENU TOGGLE
// ===================================

/**
 * Toggle mobile navigation menu
 */
function initMobileMenu() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }
}

// ===================================
// FORM VALIDATION (Complex Logic)
// ===================================

/**
 * Validate email format using regex
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Display error message for a form field
 */
function showError(fieldId, message) {
  const errorElement = document.getElementById(`${fieldId}-error`);
  const inputElement = document.getElementById(fieldId);

  if (errorElement && inputElement) {
    errorElement.textContent = message;
    inputElement.style.borderColor = "#ef4444";
  }
}

/**
 * Clear error message for a form field
 */
function clearError(fieldId) {
  const errorElement = document.getElementById(`${fieldId}-error`);
  const inputElement = document.getElementById(fieldId);

  if (errorElement && inputElement) {
    errorElement.textContent = "";
    inputElement.style.borderColor = "";
  }
}

/**
 * Validate contact form with multi-step validation rules
 * Checks: non-empty, min length, email format
 */
function validateForm(formData) {
  let isValid = true;

  // Clear all previous errors
  clearError("name");
  clearError("email");
  clearError("message");

  // Validate name – must not be empty, at least 2 characters, letters only
  const name = formData.get("name").trim();
  if (name === "") {
    showError("name", "Name is required");
    isValid = false;
  } else if (name.length < 2) {
    showError("name", "Name must be at least 2 characters");
    isValid = false;
  } else if (!/^[a-zA-Z\s\u0600-\u06FF]+$/.test(name)) {
    showError("name", "Name should contain only letters");
    isValid = false;
  }

  // Validate email – must not be empty, must match pattern
  const email = formData.get("email").trim();
  if (email === "") {
    showError("email", "Email is required");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError("email", "Please enter a valid email address");
    isValid = false;
  }

  // Validate message – must not be empty, at least 10 characters
  const message = formData.get("message").trim();
  if (message === "") {
    showError("message", "Message is required");
    isValid = false;
  } else if (message.length < 10) {
    showError("message", "Message must be at least 10 characters");
    isValid = false;
  }

  return isValid;
}

/**
 * Handle form submission with toast notifications
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const statusElement = document.getElementById("form-status");

  if (form && statusElement) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      if (validateForm(formData)) {
        // Simulate form submission
        statusElement.textContent = "Message sent successfully! ✓";
        statusElement.className = "form-status success";

        // Show success toast
        showToast("Message sent successfully! ✉️", "success");

        // Reset form
        form.reset();

        // Clear success message after 5 seconds
        setTimeout(() => {
          statusElement.textContent = "";
          statusElement.className = "form-status";
        }, 5000);
      } else {
        statusElement.textContent = "Please fix the errors above";
        statusElement.className = "form-status error";

        // Show error toast
        showToast("Please fix the form errors and try again.", "error");

        // Clear error message after 5 seconds
        setTimeout(() => {
          statusElement.textContent = "";
          statusElement.className = "form-status";
        }, 5000);
      }
    });

    // Real-time validation on blur
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (nameInput) {
      nameInput.addEventListener("blur", function () {
        const value = this.value.trim();
        if (value && value.length < 2) {
          showError("name", "Name must be at least 2 characters");
        } else {
          clearError("name");
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener("blur", function () {
        const value = this.value.trim();
        if (value && !isValidEmail(value)) {
          showError("email", "Please enter a valid email address");
        } else {
          clearError("email");
        }
      });
    }

    if (messageInput) {
      messageInput.addEventListener("blur", function () {
        const value = this.value.trim();
        if (value && value.length < 10) {
          showError("message", "Message must be at least 10 characters");
        } else {
          clearError("message");
        }
      });
    }
  }
}

// ===================================
// QUOTE FETCHING (API Integration)
// ===================================

/**
 * Fetch a random quote from dummyjson.com and display it
 * Handles loading, success, and error states
 */
async function fetchQuote() {
  const loadingEl = document.getElementById("quote-loading");
  const contentEl = document.getElementById("quote-content");
  const errorEl = document.getElementById("quote-error");
  const textEl = document.getElementById("quote-text");
  const authorEl = document.getElementById("quote-author");

  if (!loadingEl || !contentEl || !errorEl) return;

  // Show loading state
  loadingEl.style.display = "flex";
  contentEl.style.display = "none";
  errorEl.style.display = "none";

  try {
    const response = await fetch("https://dummyjson.com/quotes/random");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    // Show content
    textEl.textContent = data.quote;
    authorEl.textContent = `— ${data.author}`;
    loadingEl.style.display = "none";
    contentEl.style.display = "block";
  } catch (error) {
    // Show error state
    loadingEl.style.display = "none";
    errorEl.style.display = "block";
    showToast("Failed to load quote. Check your connection.", "error");
  }
}

/**
 * Initialize quote section — fetch on load and add button listener
 */
function initQuoteFetch() {
  fetchQuote();

  const newQuoteBtn = document.getElementById("new-quote-btn");
  if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", fetchQuote);
  }
}

// ===================================
// GITHUB API INTEGRATION
// ===================================

// Language color mapping for GitHub repo cards
const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  C: "#555555",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
};

/**
 * Fetch public GitHub repositories for a given user
 * @param {string} username - GitHub username
 */
async function fetchGitHubRepos(username) {
  const loadingEl = document.getElementById("github-loading");
  const errorEl = document.getElementById("github-error");
  const gridEl = document.getElementById("github-grid");
  const actionsEl = document.getElementById("github-actions");

  if (!loadingEl || !gridEl) return;

  // Show loading
  loadingEl.style.display = "flex";
  errorEl.style.display = "none";
  gridEl.style.display = "none";
  actionsEl.style.display = "none";

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    // Clear existing cards
    gridEl.innerHTML = "";

    if (repos.length === 0) {
      gridEl.innerHTML =
        '<p style="text-align:center;color:var(--color-text-secondary);grid-column:1/-1;">No public repositories found.</p>';
    } else {
      repos.forEach((repo) => {
        const card = createRepoCard(repo);
        gridEl.appendChild(card);
      });
    }

    // Show grid
    loadingEl.style.display = "none";
    gridEl.style.display = "grid";
    actionsEl.style.display = "block";
  } catch (error) {
    loadingEl.style.display = "none";
    errorEl.style.display = "block";
    showToast("Failed to load GitHub repositories.", "error");
  }
}

/**
 * Create a DOM element for a GitHub repo card
 * @param {Object} repo - GitHub API repo object
 * @returns {HTMLElement}
 */
function createRepoCard(repo) {
  const card = document.createElement("div");
  card.className = "github-card";

  const langColor = LANG_COLORS[repo.language] || "#888";
  const description = repo.description || "No description provided.";
  const updatedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  card.innerHTML = `
    <div class="github-card-header">
      <div class="github-card-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <div>
        <p class="github-card-name">${escapeHtml(repo.name)}</p>
      </div>
    </div>
    <p class="github-card-desc">${escapeHtml(description)}</p>
    <div class="github-card-meta">
      ${
        repo.language
          ? `<span class="github-meta-item">
               <span class="github-lang-dot" style="background:${langColor}"></span>
               ${escapeHtml(repo.language)}
             </span>`
          : ""
      }
      <span class="github-meta-item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        ${repo.stargazers_count}
      </span>
      <span class="github-meta-item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
        ${repo.forks_count}
      </span>
      <span class="github-meta-item">Updated ${updatedDate}</span>
    </div>
    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="github-card-link">
      View on GitHub →
    </a>
  `;

  return card;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Initialize GitHub repos section
 */
function initGitHubRepos() {
  // Change this to your actual GitHub username
  const GITHUB_USERNAME = "AbdulmalikAlAlShaikh";

  fetchGitHubRepos(GITHUB_USERNAME);

  const retryBtn = document.getElementById("github-retry-btn");
  if (retryBtn) {
    retryBtn.addEventListener("click", () =>
      fetchGitHubRepos(GITHUB_USERNAME),
    );
  }

  const refreshBtn = document.getElementById("github-refresh-btn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () =>
      fetchGitHubRepos(GITHUB_USERNAME),
    );
  }
}

// ===================================
// PROJECT FILTER, SEARCH & SORT
// (Complex Logic)
// ===================================

/**
 * Debounce utility – delays function execution until
 * after a specified wait time since the last invocation
 */
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Initialize project filtering by tag, experience level,
 * search input, and sort order.
 * Combines multiple conditions for complex filtering logic.
 */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const experienceButtons = document.querySelectorAll(".experience-btn");
  const searchInput = document.getElementById("project-search");
  const sortSelect = document.getElementById("project-sort");
  const projectsGrid = document.getElementById("projects-grid");
  const projectCards = document.querySelectorAll(".project-card");
  const emptyState = document.getElementById("projects-empty");

  if (!filterButtons.length || !projectCards.length) return;

  let activeFilter = "all";
  let activeLevel = "all";

  /**
   * Apply combined filter (tag + level + search) then sort.
   * This is the core "complex logic" — multiple conditions
   * and multi-step processing.
   */
  function applyFilter() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const sortOrder = sortSelect ? sortSelect.value : "newest";

    // Step 1: Filter cards based on tag, level, and search
    const visibleCards = [];

    projectCards.forEach((card) => {
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();
      const level = (card.getAttribute("data-level") || "").toLowerCase();
      const title = card.querySelector(".project-title")
        ? card.querySelector(".project-title").textContent.toLowerCase()
        : "";
      const description = card.querySelector(".project-description")
        ? card.querySelector(".project-description").textContent.toLowerCase()
        : "";

      const matchesTag = activeFilter === "all" || tags.includes(activeFilter);
      const matchesLevel = activeLevel === "all" || level === activeLevel;
      const matchesSearch =
        searchTerm === "" ||
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        tags.includes(searchTerm);

      if (matchesTag && matchesLevel && matchesSearch) {
        card.classList.remove("hidden");
        visibleCards.push(card);
      } else {
        card.classList.add("hidden");
      }
    });

    // Step 2: Sort visible cards
    visibleCards.sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return (
            new Date(b.getAttribute("data-date")) -
            new Date(a.getAttribute("data-date"))
          );
        case "oldest":
          return (
            new Date(a.getAttribute("data-date")) -
            new Date(b.getAttribute("data-date"))
          );
        case "az":
          return a
            .querySelector(".project-title")
            .textContent.localeCompare(
              b.querySelector(".project-title").textContent,
            );
        case "za":
          return b
            .querySelector(".project-title")
            .textContent.localeCompare(
              a.querySelector(".project-title").textContent,
            );
        default:
          return 0;
      }
    });

    // Step 3: Re-order DOM to match sort
    visibleCards.forEach((card) => {
      projectsGrid.appendChild(card);
    });

    // Step 4: Toggle empty state
    if (emptyState) {
      emptyState.style.display = visibleCards.length === 0 ? "block" : "none";
    }
  }

  // Filter button click handlers
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      activeFilter = this.getAttribute("data-filter");
      applyFilter();
    });
  });

  // Experience level button click handlers
  experienceButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      experienceButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      activeLevel = this.getAttribute("data-level");
      applyFilter();

      // Show contextual message
      if (activeLevel !== "all") {
        showToast(
          `Showing ${activeLevel} projects`,
          "info",
          2000,
        );
      }
    });
  });

  // Live search input handler (debounced for performance)
  if (searchInput) {
    searchInput.addEventListener("input", debounce(applyFilter, 250));
  }

  // Sort change handler
  if (sortSelect) {
    sortSelect.addEventListener("change", applyFilter);
  }

  // Initial sort on page load
  applyFilter();
}

// ===================================
// VISIT TIMER (Complex Logic)
// ===================================

/**
 * Initialize a visit timer that counts how long
 * the visitor has been on the site.
 * Uses requestAnimationFrame for efficient updates.
 */
function initVisitTimer() {
  const timerText = document.getElementById("visit-timer-text");
  if (!timerText) return;

  const startTime = Date.now();

  function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    if (minutes > 0) {
      timerText.textContent = `You've been here for ${minutes}m ${seconds}s`;
    } else {
      timerText.textContent = `You've been here for ${seconds}s`;
    }

    requestAnimationFrame(updateTimer);
  }

  requestAnimationFrame(updateTimer);
}

// ===================================
// VISITOR NAME (State Management)
// ===================================

/**
 * Show a welcome modal for first-time visitors.
 * Stores their name in localStorage and personalizes the greeting.
 */
function initVisitorName() {
  const modal = document.getElementById("visitor-modal");
  const nameInput = document.getElementById("visitor-name-input");
  const submitBtn = document.getElementById("visitor-name-submit");
  const skipBtn = document.getElementById("visitor-name-skip");

  if (!modal) return;

  const savedName = localStorage.getItem("visitorName");

  // Show modal only for first-time visitors
  if (!savedName) {
    modal.style.display = "flex";
  }

  // Submit name
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      const name = nameInput.value.trim();
      if (name.length > 0) {
        localStorage.setItem("visitorName", name);
        modal.style.display = "none";
        displayGreeting(); // Update greeting with name
        showToast(`Welcome, ${name}! 🎉`, "success");
      } else {
        nameInput.style.borderColor = "#ef4444";
        nameInput.setAttribute("placeholder", "Please enter a name...");
      }
    });
  }

  // Handle Enter key
  if (nameInput) {
    nameInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        submitBtn.click();
      }
    });
  }

  // Skip
  if (skipBtn) {
    skipBtn.addEventListener("click", function () {
      localStorage.setItem("visitorName", ""); // Store empty = skipped
      modal.style.display = "none";
    });
  }
}

// ===================================
// LOGIN SIMULATION (State Management)
// ===================================

/**
 * Simulate login/logout functionality.
 * Stores state in sessionStorage (cleared on tab close).
 * When logged in, shows member-only content.
 */
function initLoginSimulation() {
  const loginBtn = document.getElementById("login-btn");
  const loginText = document.getElementById("login-text");
  const memberContent = document.getElementById("member-content");

  if (!loginBtn || !loginText) return;

  // Check existing login state
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  updateLoginUI(isLoggedIn);

  loginBtn.addEventListener("click", function () {
    const currentState = sessionStorage.getItem("isLoggedIn") === "true";
    const newState = !currentState;

    sessionStorage.setItem("isLoggedIn", newState.toString());
    updateLoginUI(newState);

    if (newState) {
      showToast("Logged in successfully! 🔓", "success");
    } else {
      showToast("Logged out. See you next time! 👋", "info");
    }
  });

  function updateLoginUI(loggedIn) {
    if (loggedIn) {
      loginBtn.classList.add("logged-in");
      loginText.textContent = "Log Out";
    } else {
      loginBtn.classList.remove("logged-in");
      loginText.textContent = "Log In";
    }

    // Toggle member-only content visibility
    if (memberContent) {
      memberContent.style.display = loggedIn ? "block" : "none";
    }
  }
}

// ===================================
// COLLAPSIBLE SECTIONS (State Management)
// ===================================

/**
 * Initialize toggle buttons for collapsible sections.
 * Allows users to expand/collapse About and Contact sections.
 */
function initSectionToggles() {
  const toggleBtns = document.querySelectorAll(".toggle-section-btn");

  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const target = document.getElementById(targetId);

      if (!target) return;

      const isExpanded = target.classList.contains("expanded");

      if (isExpanded) {
        // Collapse
        target.classList.remove("expanded");
        target.classList.add("collapsed");
        this.classList.add("collapsed");
      } else {
        // Expand
        target.classList.remove("collapsed");
        target.classList.add("expanded");
        this.classList.remove("collapsed");
      }
    });
  });
}

// ===================================
// SCROLL ANIMATIONS (Staggered)
// ===================================

/**
 * Add staggered fade-in animation to elements on scroll
 * using IntersectionObserver with delay offsets
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  const elementsToAnimate = document.querySelectorAll(
    ".about-card, .skill-progress-card, .project-card, .contact-form, .quote-card, .github-card",
  );

  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  // Staggered animation for card groups
  initStaggeredAnimations();
}

/**
 * Apply stagger delays to grouped elements for wave-like entrance
 */
function initStaggeredAnimations() {
  const staggerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const parent = entry.target;
          const children = parent.querySelectorAll(".stagger-in");
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add("visible");
            }, index * 120);
          });
          staggerObserver.unobserve(parent);
        }
      });
    },
    { threshold: 0.15 },
  );

  // Add stagger-in class to skill cards and project cards
  document.querySelectorAll(".skills-progress-grid, .projects-grid").forEach((grid) => {
    grid.querySelectorAll(".skill-progress-card, .project-card").forEach((card) => {
      card.classList.add("stagger-in");
    });
    staggerObserver.observe(grid);
  });
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================

/**
 * Add shadow to header on scroll
 */
function initHeaderScroll() {
  const header = document.getElementById("header");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
      } else {
        header.style.boxShadow = "none";
      }
    });
  }
}

// ===================================
// SCROLL PROGRESS BAR (Innovation)
// ===================================

/**
 * Update a thin gradient bar at the top of the page
 * that fills as the user scrolls down.
 */
function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");
  if (!progressBar) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

// ===================================
// BACK TO TOP BUTTON (Innovation)
// ===================================

/**
 * Show/hide a floating "back to top" button
 * that smooth-scrolls the page to the top.
 */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  // Show button after scrolling past hero section
  function toggleVisibility() {
    if (window.scrollY > 500) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", toggleVisibility, { passive: true });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===================================
// PARTICLE BACKGROUND (Innovation)
// ===================================

/**
 * Canvas-based particle animation in the hero section.
 * Particles drift gently and connect with lines when
 * close to each other, creating a network effect.
 * Responds subtly to mouse position.
 */
function initParticleBackground() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let animationId;
  let mouse = { x: null, y: null };
  let particles = [];

  const PARTICLE_COUNT = 45;
  const CONNECTION_DISTANCE = 150;
  const PARTICLE_SIZE = 2;

  function resize() {
    const hero = canvas.closest(".hero");
    if (!hero) return;
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: PARTICLE_SIZE + Math.random() * 1.5,
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const theme = document.documentElement.getAttribute("data-theme");
    const particleColor = theme === "light" ? "100, 100, 120" : "168, 85, 247";
    const lineColor = theme === "light" ? "100, 100, 120" : "168, 85, 247";

    // Update and draw particles
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off walls
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Subtle mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.x -= dx * 0.002;
          p.y -= dy * 0.002;
        }
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particleColor}, 0.6)`;
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DISTANCE) {
          const opacity = 1 - dist / CONNECTION_DISTANCE;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${lineColor}, ${opacity * 0.2})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  // Track mouse within hero section
  const hero = canvas.closest(".hero");
  if (hero) {
    hero.addEventListener("mousemove", function (e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    hero.addEventListener("mouseleave", function () {
      mouse.x = null;
      mouse.y = null;
    });
  }

  // Handle resize
  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });

  // Pause when not visible for performance
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });

  resize();
  createParticles();
  animate();
}

// ===================================
// ANIMATED SKILL BARS (Innovation)
// ===================================

/**
 * Animate skill progress bars when they scroll into view.
 * Each bar fills to its data-width percentage with a smooth
 * CSS transition triggered by IntersectionObserver.
 */
function initSkillBars() {
  const skillCards = document.querySelectorAll(".skill-progress-card[data-animate]");
  if (!skillCards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll(".skill-bar-fill");
          bars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute("data-width");
            // Stagger each bar slightly
            setTimeout(() => {
              bar.style.width = `${targetWidth}%`;
              bar.classList.add("animated");
            }, index * 150);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  skillCards.forEach((card) => observer.observe(card));
}

// ===================================
// LIGHTBOX GALLERY (Innovation)
// ===================================

/**
 * Open a full-screen lightbox when clicking on project images.
 * Supports Escape key and click-outside to close.
 */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  if (!lightbox || !lightboxImg) return;

  // Open lightbox on trigger click
  document.querySelectorAll(".lightbox-trigger").forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const src = this.getAttribute("data-src");
      const caption = this.getAttribute("data-caption") || "";

      if (src) {
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightbox.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
    lightboxImg.src = "";
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", function (e) {
      e.stopPropagation();
      closeLightbox();
    });
  }

  // Close on overlay click (but not on image click)
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
      closeLightbox();
    }
  });
}

// ===================================
// TERMINAL EASTER EGG (Innovation)
// ===================================

/**
 * A hidden terminal interface toggled by Ctrl+K.
 * Supports commands: help, about, skills, projects, contact,
 * theme, clear, exit. Fun and interactive way to explore the site.
 */
function initTerminal() {
  const modal = document.getElementById("terminal-modal");
  const input = document.getElementById("terminal-input");
  const output = document.getElementById("terminal-output");
  const closeBtn = document.getElementById("terminal-close");

  if (!modal || !input || !output) return;

  // Terminal command definitions
  const commands = {
    help: () =>
      `<span class="terminal-highlight">Available commands:</span>
       <br>&nbsp;&nbsp;<span class="terminal-success">about</span>    — Learn about me
       <br>&nbsp;&nbsp;<span class="terminal-success">skills</span>   — View my skills
       <br>&nbsp;&nbsp;<span class="terminal-success">projects</span> — See my projects
       <br>&nbsp;&nbsp;<span class="terminal-success">contact</span>  — Get in touch
       <br>&nbsp;&nbsp;<span class="terminal-success">theme</span>    — Toggle dark/light
       <br>&nbsp;&nbsp;<span class="terminal-success">clear</span>    — Clear terminal
       <br>&nbsp;&nbsp;<span class="terminal-success">exit</span>     — Close terminal
       <br>&nbsp;&nbsp;<span class="terminal-success">hello</span>    — Say hi 👋
       <br>&nbsp;&nbsp;<span class="terminal-success">joke</span>     — Hear a dev joke`,

    about: () =>
      `<span class="terminal-highlight">Abdulmalik Al AlShaikh</span>
       <br>🎓 Software Engineering Student at KFUPM
       <br>💡 Passionate about systems design, data science & AI
       <br>🌐 Building reliable solutions & leading teams`,

    skills: () =>
      `<span class="terminal-highlight">Technical Skills:</span>
       <br>  💻 Python ███████████░ 85%
       <br>  ☕ Java ██████████░░ 80%
       <br>  🌐 HTML/CSS █████████████ 90%
       <br>  ⚡ JavaScript ██████████░░ 80%
       <br>  🐙 Git/GitHub ███████████░ 85%`,

    projects: () => {
      // Navigate to projects section
      const projectSection = document.getElementById("projects");
      if (projectSection) {
        closeTerminal();
        setTimeout(() => {
          projectSection.scrollIntoView({ behavior: "smooth" });
        }, 300);
        return `<span class="terminal-success">Navigating to projects section...</span>`;
      }
      return `<span class="terminal-success">Check the Projects section on the page!</span>`;
    },

    contact: () => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        closeTerminal();
        setTimeout(() => {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }, 300);
        return `<span class="terminal-success">Navigating to contact section...</span>`;
      }
      return `<span class="terminal-success">📧 Scroll down to the Contact section!</span>`;
    },

    theme: () => {
      toggleTheme();
      const current = document.documentElement.getAttribute("data-theme");
      return `<span class="terminal-success">Theme switched to ${current} mode! 🎨</span>`;
    },

    clear: () => {
      output.innerHTML = "";
      return null;
    },

    exit: () => {
      closeTerminal();
      return null;
    },

    hello: () => {
      const visitorName = localStorage.getItem("visitorName");
      return visitorName
        ? `<span class="terminal-success">Hello, ${escapeHtml(visitorName)}! 👋 Nice to see you again!</span>`
        : `<span class="terminal-success">Hello there! 👋 Welcome to my portfolio!</span>`;
    },

    joke: () => {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
        "There are only 10 types of people: those who understand binary and those who don't.",
        "A SQL query walks into a bar, sees two tables and asks: 'Can I JOIN you?'",
        "!false — it's funny because it's true.",
        "Why did the developer go broke? Because he used up all his cache. 💸",
        "What's a programmer's favorite hangout place? Foo Bar.",
      ];
      return `<span class="terminal-success">${jokes[Math.floor(Math.random() * jokes.length)]}</span>`;
    },
  };

  function processCommand(cmd) {
    const trimmed = cmd.trim().toLowerCase();

    // Echo the command
    addLine(`<span class="terminal-prompt">→</span> <span class="terminal-muted">${escapeHtml(cmd)}</span>`);

    if (trimmed === "") return;

    if (commands[trimmed]) {
      const result = commands[trimmed]();
      if (result) {
        addLine(result);
      }
    } else {
      addLine(`<span class="terminal-error">Command not found: ${escapeHtml(trimmed)}</span>. Type <span class="terminal-highlight">help</span> for available commands.`);
    }
  }

  function addLine(html) {
    const line = document.createElement("p");
    line.className = "terminal-line";
    line.innerHTML = html;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function openTerminal() {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    setTimeout(() => input.focus(), 100);
  }

  function closeTerminal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  // Ctrl+K shortcut
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      if (modal.style.display === "flex") {
        closeTerminal();
      } else {
        openTerminal();
      }
    }
  });

  // Handle command input
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      processCommand(input.value);
      input.value = "";
    }
  });

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener("click", closeTerminal);
  }

  // Close on overlay click
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeTerminal();
    }
  });

  // Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeTerminal();
    }
  });
}

// ===================================
// BUTTON RIPPLE EFFECT (Polish)
// ===================================

/**
 * Add a material-style ripple effect to buttons
 * with the .btn-ripple class.
 */
function initRippleEffects() {
  document.querySelectorAll(".btn-ripple").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.className = "ripple";

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";

      this.appendChild(ripple);

      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
}

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme (State Management)
  initTheme();

  // Display time-based greeting
  displayGreeting();

  // Initialize typing effect
  initTypingEffect();

  // Initialize smooth scrolling
  initSmoothScroll();

  // Initialize mobile menu
  initMobileMenu();

  // Initialize contact form (Complex Logic)
  initContactForm();

  // Initialize quote fetcher (API Integration)
  initQuoteFetch();

  // Initialize GitHub repos (API Integration)
  initGitHubRepos();

  // Initialize project filter, search & sort (Complex Logic)
  initProjectFilter();

  // Initialize visit timer (Complex Logic)
  initVisitTimer();

  // Initialize visitor name modal (State Management)
  initVisitorName();

  // Initialize login simulation (State Management)
  initLoginSimulation();

  // Initialize collapsible sections (State Management)
  initSectionToggles();

  // Initialize scroll animations (with stagger)
  initScrollAnimations();

  // Initialize header scroll effect
  initHeaderScroll();

  // Theme toggle button
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // === Assignment 4 Innovation Features ===

  // Particle background in hero section
  initParticleBackground();

  // Scroll progress indicator
  initScrollProgress();

  // Back to top button
  initBackToTop();

  // Animated skill progress bars
  initSkillBars();

  // Lightbox gallery for project images
  initLightbox();

  // Terminal easter egg (Ctrl+K)
  initTerminal();

  // Button ripple effects
  initRippleEffects();
});

// ===================================
// UTILITY: Update greeting periodically
// ===================================

/**
 * Update greeting every minute in case time period changes
 */
setInterval(displayGreeting, 60000);

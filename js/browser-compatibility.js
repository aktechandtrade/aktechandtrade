/**
 * AK Tech & Trade - Browser Compatibility
 * Handles browser-specific features and provides fallbacks
 */

document.addEventListener("DOMContentLoaded", function () {
  // Check for browser support of various features and add fallbacks if needed
  checkBrowserCompatibility();
});

/**
 * Checks browser compatibility and applies fixes/fallbacks if needed
 */
function checkBrowserCompatibility() {
  // Add 'js' class to the body to identify JS is enabled
  document.body.classList.add("js-enabled");

  // Check for CSS variables support (IE11 doesn't support them)
  if (
    !window.CSS ||
    !window.CSS.supports ||
    !window.CSS.supports("--fake-var", 0)
  ) {
    document.body.classList.add("no-css-vars");
    loadFallbackStyles();
  }

  // Check for IntersectionObserver support (used for lazy loading and scroll animations)
  if (!("IntersectionObserver" in window)) {
    // Fallback to a simpler reveal-on-scroll mechanism
    document.body.classList.add("no-intersection-observer");

    // Simple scroll handler as fallback for animations
    window.addEventListener("scroll", simpleScrollHandler);
    // Run once on load
    simpleScrollHandler();
  }

  // Check for CSS grid support
  if (
    !window.CSS ||
    !window.CSS.supports ||
    !window.CSS.supports("display", "grid")
  ) {
    document.body.classList.add("no-css-grid");
    applyFlexboxFallback();
  }
}

/**
 * Loads fallback styles for browsers without CSS variables support
 */
function loadFallbackStyles() {
  console.log("CSS Variables not supported - loading fallback styles");

  // Apply the primary color directly to elements that would use the CSS variable
  const primaryColor = "#2563eb";
  const primaryDark = "#1d4ed8";
  const secondaryColor = "#334155";

  // Apply colors directly to elements that would use CSS variables
  const buttons = document.querySelectorAll(".btn-primary");
  buttons.forEach((btn) => {
    btn.style.backgroundColor = primaryColor;
  });

  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.color = primaryColor;
    });
    link.addEventListener("mouseleave", function () {
      this.style.color = secondaryColor;
    });
  });
}

/**
 * Simple scroll handler for browsers without IntersectionObserver
 */
function simpleScrollHandler() {
  const animatedElements = document.querySelectorAll(".reveal");

  animatedElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight * 0.8) {
      el.classList.add("scrolled");
    }
  });
}

/**
 * Apply flexbox fallback for browsers without CSS Grid support
 */
function applyFlexboxFallback() {
  console.log("CSS Grid not supported - applying flexbox fallback");

  // Replace grid with flexbox for main grid layouts
  const gridContainers = [
    ".services-grid",
    ".trade-grid",
    ".about-content",
    ".contact-wrapper",
  ];

  gridContainers.forEach((selector) => {
    const containers = document.querySelectorAll(selector);
    containers.forEach((container) => {
      container.style.display = "flex";
      container.style.flexWrap = "wrap";

      // Adjust child elements
      const children = container.children;
      for (let i = 0; i < children.length; i++) {
        children[i].style.flex = "1 1 300px";
        children[i].style.margin = "15px";
      }
    });
  });
}

/**
 * Fallback for smooth scrolling in browsers that don't support it
 */
function smoothScrollFallback(targetPosition) {
  // For browsers that don't support smooth scrolling
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 500; // ms
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const percentage = Math.min(progress / duration, 1);

    // Easing function: easeInOutCubic
    const easing =
      percentage < 0.5
        ? 4 * percentage * percentage * percentage
        : 1 - Math.pow(-2 * percentage + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * easing);

    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

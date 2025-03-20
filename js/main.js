/**
 * AK Tech & Trade - Main JavaScript File
 * Handles all interactive elements for the website
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initMobileNavigation();
  initSmoothScrolling();
  initTestimonialSlider();
  initContactForm();
  initScrollAnimation();
  initStickyHeader();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNavigation() {
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      // Toggle hamburger/close icon
      const icon = this.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    // Close menu when a link is clicked
    const links = document.querySelectorAll(".nav-links a");
    links.forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove("active");
          const icon = mobileMenuBtn.querySelector("i");
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      });
    });
  }
}

/**
 * Smooth Scrolling for Navigation Links
 */
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate the offset based on header height
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Set active navigation link based on scroll position
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const headerHeight = document.querySelector("header").offsetHeight;

      if (window.pageYOffset >= sectionTop - headerHeight - 100) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });
}

/**
 * Testimonial Slider Functionality
 */
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");

  if (testimonials.length && dots.length) {
    let currentIndex = 0;

    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
      if (index !== 0) {
        testimonial.style.display = "none";
      }
    });

    // Add click event to dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        showTestimonial(index);
      });
    });

    function showTestimonial(index) {
      // Hide all testimonials
      testimonials.forEach((testimonial) => {
        testimonial.style.display = "none";
      });

      // Remove active class from all dots
      dots.forEach((dot) => {
        dot.classList.remove("active");
      });

      // Show the selected testimonial and activate the corresponding dot
      testimonials[index].style.display = "block";
      dots[index].classList.add("active");
      currentIndex = index;
    }

    // Auto-play testimonials
    setInterval(function () {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }, 6000);
  }
}

/**
 * Contact Form Handling
 */
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Basic form validation
      if (!name || !email || !message) {
        alert("Please fill in all required fields");
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      // Normally you would send the form data to a server here
      // For demonstration, we'll just show a success message
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }
}

/**
 * Reveal Elements on Scroll
 */
function initScrollAnimation() {
  const animatedElements = document.querySelectorAll(
    ".service-card, .trade-card, .about-stats, .about-image, .contact-form"
  );

  const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    const elementHeight = el.offsetHeight;

    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) *
        (percentageScroll / 100)
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add("scrolled");
  };

  const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
  };

  const handleScrollAnimation = () => {
    animatedElements.forEach((el) => {
      if (elementInView(el, 80)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  // Add initial classes for CSS transitions
  animatedElements.forEach((el) => {
    el.classList.add("reveal");
  });

  window.addEventListener("scroll", () => {
    handleScrollAnimation();
  });

  // Run once on page load to check for elements already in view
  handleScrollAnimation();
}

/**
 * Sticky Header on Scroll
 */
function initStickyHeader() {
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
}

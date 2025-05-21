// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // Check for preferred color scheme
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  if (prefersDarkScheme.matches) {
    document.body.setAttribute('data-theme', 'dark');
  }

  // Theme toggle functionality
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  themeToggleBtn.addEventListener('click', function() {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    if (savedTheme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }

  // Back to top button functionality
  const backToTopBtn = document.querySelector('.back-to-top');

  // Show back-to-top button when scrolling down
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  // Form submission
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('form-success');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send this data to a server
      // For now, just show an inline success message
      formSuccess.textContent = `Thank you, ${name}! Your message has been received. I'll get back to you soon at ${email}.`;
      formSuccess.classList.add('visible');
      
      // Reset the form
      contactForm.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        formSuccess.classList.remove('visible');
      }, 5000);
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for navbar height
          behavior: 'smooth'
        });
      }
    });
  });

  // Add animation class to elements when they enter the viewport
  const animateOnScroll = function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('active');
      }
    });
  };

  // Call once on load
  animateOnScroll();
  
  // Listen for scroll events
  window.addEventListener('scroll', animateOnScroll);
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add animation to skills
const skills = document.querySelectorAll('.skills li');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

skills.forEach(skill => {
    observer.observe(skill);
});

// Add animation to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    observer.observe(card);
}); 
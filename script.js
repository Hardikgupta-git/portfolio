/**
 * HARDIK GUPTA - PORTFOLIO INTERACTIVE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- THEME TOGGLE (DARK / LIGHT) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem('hg_theme');
  if (savedTheme === 'light') {
    htmlElement.classList.remove('dark');
  } else if (savedTheme === 'dark') {
    htmlElement.classList.add('dark');
  } else {
    // Start on the clean, light portfolio theme.
    htmlElement.classList.remove('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = htmlElement.classList.toggle('dark');
      localStorage.setItem('hg_theme', isDark ? 'dark' : 'light');
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  }

  // --- MOBILE MENU TOGGLE ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOpenIcon = document.querySelector('.menu-open-icon');
  const menuCloseIcon = document.querySelector('.menu-close-icon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isActive = mobileMenu.classList.toggle('active');
      if (menuOpenIcon && menuCloseIcon) {
        menuOpenIcon.classList.toggle('hidden', isActive);
        menuCloseIcon.classList.toggle('hidden', !isActive);
      }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-menu-actions a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        if (menuOpenIcon && menuCloseIcon) {
          menuOpenIcon.classList.remove('hidden');
          menuCloseIcon.classList.add('hidden');
        }
      });
    });
  }

  // --- SKILLS FILTER ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillBoxes = document.querySelectorAll('.skill-category-box');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      skillBoxes.forEach(box => {
        const cat = box.getAttribute('data-cat');
        if (filterValue === 'all' || cat === filterValue) {
          box.style.display = 'block';
          box.style.opacity = '0';
          box.style.transform = 'translateY(8px)';
          setTimeout(() => {
            box.style.transition = 'all 0.3s ease';
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
          }, 20);
        } else {
          box.style.display = 'none';
        }
      });
    });
  });

  // --- TOAST NOTIFICATION HELPER ---
  const toast = document.getElementById('toast-notify');
  const toastText = document.getElementById('toast-text');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.remove('hidden');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }

  // --- COPY EMAIL BUTTON ---
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'hardikgupta724877@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!');
      }).catch(() => {
        showToast('hardikgupta724877@gmail.com');
      });
    });
  }

  // --- COPY CODE TERMINAL SNIPPET ---
  const copyTerminalBtn = document.getElementById('terminal-copy-btn');
  if (copyTerminalBtn) {
    copyTerminalBtn.addEventListener('click', () => {
      const codeSnippet = `from dataclasses import dataclass
from typing import List

@dataclass
class AIEngineer:
    name: str = "Hardik Gupta"
    university: str = "Lovely Professional University"
    degree: str = "B.Tech CSE (CGPA: 7.90)"
    specializations: List[str] = [
        "Vision-Language Computer-Use Agents",
        "Local Offline RAG & ChromaDB",
        "Neural Networks from Scratch (NumPy)",
        "Open-Source Data Engineering"
    ]`;
      navigator.clipboard.writeText(codeSnippet).then(() => {
        showToast('Code snippet copied!');
      });
    });
  }

  // --- CONTACT FORM SUBMISSION (LAUNCH MAIL CLIENT) ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name')?.value || '';
      const email = document.getElementById('sender-email')?.value || '';
      const subject = document.getElementById('message-subject')?.value || 'Portfolio Contact';
      const message = document.getElementById('message-body')?.value || '';

      const fullSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`);
      const fullBody = encodeURIComponent(`Hi Hardik,\n\n${message}\n\n---\nFrom: ${name} (${email})`);

      const mailtoLink = `mailto:hardikgupta724877@gmail.com?subject=${fullSubject}&body=${fullBody}`;

      showToast('Opening your email client...');
      window.location.href = mailtoLink;
    });
  }

  // --- ACTIVE SCROLL SPY & NAVBAR BLUR ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar shadow elevation on scroll
    if (navbar) {
      if (scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    }

    // Scroll Spy active section link
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});

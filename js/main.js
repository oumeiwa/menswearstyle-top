/* ============================================
   menswearstyle.top — Main Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile Nav Toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('open');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      toggle.innerHTML = navList.classList.contains('open') ? '✕' : '☰';
    });

    // Close nav on link click (mobile)
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '☰';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-inner') && navList.classList.contains('open')) {
        navList.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '☰';
      }
    });
  }

  /* ---- Category Filter (Reviews Page) ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const reviewCards = document.querySelectorAll('.review-card');

  if (filterBtns.length && reviewCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        reviewCards.forEach(card => {
          const categories = card.dataset.categories || '';
          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = '';
            // Add a small fade-in effect
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---- Newsletter Form ---- */
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const email = input.value.trim();

      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // Simple success feedback
        const originalBtn = newsletterForm.querySelector('button');
        const originalText = originalBtn.textContent;
        originalBtn.textContent = '✓ Subscribed!';
        originalBtn.style.background = '#4caf50';
        originalBtn.style.color = '#fff';
        input.value = '';
        setTimeout(() => {
          originalBtn.textContent = originalText;
          originalBtn.style.background = '';
          originalBtn.style.color = '';
        }, 2500);
      } else {
        input.style.borderColor = '#e53935';
        input.focus();
        setTimeout(() => { input.style.borderColor = ''; }, 2000);
      }
    });
  }

  /* ---- Contact Form ---- */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.submit-btn');
      const originalText = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#4caf50';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  /* ---- Rating stars helper (for dynamic use) ---- */
  window.renderStars = function(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  };

  /* ---- Lazy load animation for review cards ---- */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.review-card').forEach((card, i) => {
    if (i >= 3) { // Only cards after the first row
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
    }
  });
});

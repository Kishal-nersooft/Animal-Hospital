/**
 * Best Care Animal Hospital — Interactive Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initHeroParallax();
  initHeroCounters();
  initContactForm();
  initCommunityCounters();
  initPricingToggle();
  initTestimonialSlider();
  initFAQ();
  initNewsletter();
});

/* ---- Floating Particles ---- */
function initParticles() {
  const container = document.querySelector('.particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${12 + Math.random() * 10}s`;
    particle.style.width = `${4 + Math.random() * 4}px`;
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

/* ---- Sticky Navbar ---- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Scroll Reveal (Intersection Observer) ---- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, parseInt(delay, 10));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ---- Hero Parallax on Mouse Move ---- */
function initHeroParallax() {
  const hero = document.getElementById('hero');
  const parallaxWrap = document.getElementById('heroParallax');
  if (!hero || !parallaxWrap) return;

  const floatCards = parallaxWrap.querySelectorAll('.float-card');

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    parallaxWrap.style.transform = `translate(${x * 12}px, ${y * 12}px)`;

    floatCards.forEach((card, i) => {
      const factor = (i + 1) * 6;
      card.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    parallaxWrap.style.transform = '';
    floatCards.forEach((card) => {
      card.style.transform = '';
    });
  });
}

/* ---- Animated Counters ---- */
function animateCounter(element, target, duration = 2000) {
  const startTime = performance.now();

  const format = (value) => {
    if (target >= 10000) return `${Math.round(value / 1000)}k`;
    return String(Math.floor(value));
  };

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    element.textContent = format(current);
    if (progress < 1) requestAnimationFrame(update);
    else element.textContent = format(target);
  };

  requestAnimationFrame(update);
}

function initHeroCounters() {
  const stats = document.querySelectorAll('.hero-stat .stat-num');
  if (!stats.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.count, 10);
          animateCounter(entry.target, target, 1800);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((stat) => observer.observe(stat));
}

function initCommunityCounters() {
  const counters = document.querySelectorAll('.community-stat .counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target, 10);
          const el = entry.target;
          const duration = 2000;
          const startTime = performance.now();

          const format = (value) => {
            const v = Math.floor(value);
            if (target >= 2000 && target < 3000) return String(v);
            if (target >= 10000) return `${Math.round(value / 1000)}k`;
            return String(v);
          };

          const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = format(target * eased);
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = format(target);
          };

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* ---- Contact Form ---- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value;
    alert(`Thank you, ${name}! We have received your message and will get back to you as soon as possible.`);
    form.reset();
  });
}

/* ---- Pricing Toggle (Dogs / Cats) ---- */
function initPricingToggle() {
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const cards = document.querySelectorAll('.pricing-card[data-pet]');
  if (!toggleBtns.length || !cards.length) return;

  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pet = btn.dataset.pet;
      toggleBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card) => {
        const isMatch = card.dataset.pet === pet;
        card.classList.toggle('hidden', !isMatch);
        if (isMatch) {
          card.classList.remove('visible');
          requestAnimationFrame(() => card.classList.add('visible'));
        }
      });
    });
  });
}

/* ---- Testimonial Slider ---- */
function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const dotsContainer = document.getElementById('testimonialDots');
  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  let current = 0;
  let autoplayInterval;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `testimonial-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.testimonial-dot');

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  function startAutoplay() {
    autoplayInterval = setInterval(next, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  track.parentElement.addEventListener('mouseenter', stopAutoplay);
  track.parentElement.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

/* ---- FAQ Accordion ---- */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach((other) => {
        other.classList.remove('active');
        other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---- Newsletter ---- */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    alert(`Thanks for subscribing with ${input.value}!`);
    input.value = '';
  });
}

// ─── SCROLL REVEAL ───
const revealElements = document.querySelectorAll(
  '.concept-card, .sec-card, .usecase-item, .st-row, .two-col, .tip-box, .storage-table'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children of grids
      const delay = entry.target.dataset.idx
        ? parseInt(entry.target.dataset.idx) * 80
        : 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// ─── ACTIVE NAV HIGHLIGHT ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--orange)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ─── STORAGE CLASS ROW HOVER TOOLTIP ───
const storageRows = document.querySelectorAll('.st-row');
storageRows.forEach(row => {
  row.addEventListener('mouseenter', () => {
    const sc = row.querySelector('.sc-name');
    if (sc) sc.style.transform = 'scale(1.05)';
  });
  row.addEventListener('mouseleave', () => {
    const sc = row.querySelector('.sc-name');
    if (sc) sc.style.transform = '';
  });
});

// ─── CONCEPT CARD COUNTER ANIMATION ───
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step = Math.ceil(target / 30);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 40);
}

// ─── SMOOTH BADGE ENTRANCE ───
const badges = document.querySelectorAll('.badge');
badges.forEach((badge, i) => {
  badge.style.transitionDelay = `${i * 80}ms`;
});

// ─── HERO PARALLAX ───
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const scrollY = window.scrollY;
  hero.style.transform = `translateY(${scrollY * 0.25}px)`;
  hero.style.opacity = Math.max(0, 1 - scrollY / 500);
});

// ─── NAV SHADOW ON SCROLL ───
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// ─── USE CASE ITEM STAGGER ───
const ucItems = document.querySelectorAll('.usecase-item');
const ucObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    ucItems.forEach((item, i) => {
      setTimeout(() => item.classList.add('visible'), i * 100);
    });
    ucObserver.disconnect();
  }
}, { threshold: 0.1 });

if (ucItems.length) ucObserver.observe(ucItems[0]);

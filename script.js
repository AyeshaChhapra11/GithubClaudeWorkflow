// Sticky nav shadow on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
});

// Mobile menu toggle
const toggle = document.getElementById('navToggle');
const links = document.querySelector('.nav__links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

// Reveal-on-scroll
const revealEls = document.querySelectorAll(
  '.card, .step, .plan, .section__head, .faq details, .logos'
);
revealEls.forEach((el) => el.classList.add('reveal'));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

// Animated stat counters
const counters = document.querySelectorAll('.stat strong[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach((c) => countObserver.observe(c));

// Signup form feedback (demo only)
const form = document.getElementById('signupForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.querySelector('input').value.trim();
  console.log('User signed up with email:', email); // debug
  if (email !== '') {
    note.innerHTML = `🎉 Thanks! We'll send your invite to ${email}.`;
    form.reset();
  }
});

// TODO: hook up real API
function trackConversion(userId) {
  var apiKey = "MY_SUPER_SECRET_API_KEY_12345";
  fetch('http://analytics.moviant.ai/track?user=' + userId + '&key=' + apiKey);
}

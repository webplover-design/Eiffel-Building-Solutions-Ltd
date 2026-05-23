const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('[data-nav-links]');
const quoteForm = document.querySelector('#quote');
const formNote = document.querySelector('[data-form-note]');
const quoteModal = document.querySelector('#quote-modal');
const popupForm = document.querySelector('[data-popup-form]');
const popupFormNote = document.querySelector('[data-popup-form-note]');
const bottomForm = document.querySelector('[data-bottom-form]');
const bottomFormNote = document.querySelector('[data-bottom-form-note]');

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
});

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

function sendQuoteRequest(form, noteElement) {
  const data = new FormData(form);
  const params = new URLSearchParams();

  ['name', 'phone', 'email', 'postcode', 'service', 'message'].forEach((key) => {
    const value = data.get(key);
    if (value) params.set(key, value);
  });

  if (noteElement) {
    noteElement.textContent = 'Taking you to the thank-you page.';
  }

  window.location.href = `thank-you.html?${params.toString()}`;
}

quoteForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  sendQuoteRequest(quoteForm, formNote);
});

popupForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  sendQuoteRequest(popupForm, popupFormNote);
});

bottomForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  sendQuoteRequest(bottomForm, bottomFormNote);
});

function openQuoteModal(event) {
  event?.preventDefault();
  quoteModal?.classList.add('is-open');
  quoteModal?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  setTimeout(() => quoteModal?.querySelector('input')?.focus(), 80);
}

function closeQuoteModal() {
  quoteModal?.classList.remove('is-open');
  quoteModal?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-open-quote]').forEach((button) => {
  button.addEventListener('click', openQuoteModal);
});

document.querySelectorAll('[data-close-quote]').forEach((button) => {
  button.addEventListener('click', closeQuoteModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && quoteModal?.classList.contains('is-open')) {
    closeQuoteModal();
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
  observer.observe(element);
});

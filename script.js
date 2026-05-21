const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('[data-nav-links]');
const quoteForm = document.querySelector('#quote');
const formNote = document.querySelector('[data-form-note]');
const quoteModal = document.querySelector('#quote-modal');
const popupForm = document.querySelector('[data-popup-form]');
const popupFormNote = document.querySelector('[data-popup-form-note]');

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
  const subject = encodeURIComponent('Free insulation quote request');
  const body = encodeURIComponent(
    `Name: ${data.get('name') || ''}\n` +
    `Phone: ${data.get('phone') || ''}\n` +
    `Email: ${data.get('email') || ''}\n` +
    `Postcode: ${data.get('postcode') || ''}\n` +
    `Service: ${data.get('service') || ''}\n\n` +
    `Message:\n${data.get('message') || ''}`
  );

  if (noteElement) {
    noteElement.textContent = 'Opening your email app so you can send the quote request.';
  }
  window.location.href = `mailto:eiffelbuildingsolutions@gmail.com?subject=${subject}&body=${body}`;
}

quoteForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  sendQuoteRequest(quoteForm, formNote);
});

popupForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  sendQuoteRequest(popupForm, popupFormNote);
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

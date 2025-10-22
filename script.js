const navToggle = document.querySelector('.nav-toggle');
const primaryMenu = document.querySelector('#primary-menu');
const bookingForm = document.querySelector('.booking-form');
const bookingConfirmation = document.querySelector('.booking-form .confirmation');
const newsletterForm = document.querySelector('.footer-newsletter');
const newsletterConfirmation = document.querySelector('.newsletter-confirmation');
const yearEl = document.querySelector('#year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && primaryMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    primaryMenu.classList.toggle('open');
  });

  primaryMenu.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => {
      primaryMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );
}

if (bookingForm && bookingConfirmation) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const pickup = formData.get('pickup');
    const vehicle = bookingForm.querySelector('#vehicle');
    const vehicleLabel = vehicle.options[vehicle.selectedIndex]?.text || 'vehicle';

    bookingConfirmation.textContent = `Thanks! We'll confirm ${vehicleLabel.toLowerCase()} availability for ${pickup} shortly.`;
    bookingForm.reset();

    setTimeout(() => {
      bookingConfirmation.textContent = '';
    }, 6000);
  });
}

if (newsletterForm && newsletterConfirmation) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    newsletterConfirmation.textContent = `Welcome aboard! Updates will arrive at ${emailInput.value}.`;
    newsletterForm.reset();

    setTimeout(() => {
      newsletterConfirmation.textContent = '';
    }, 6000);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll('section, .card, .stat').forEach((element) => {
  element.classList.add('reveal');
  observer.observe(element);
});

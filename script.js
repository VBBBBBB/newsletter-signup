/* ===========================
   Newsletter Sign-up — script.js
   =========================== */

const form         = document.getElementById('signup-form');
const emailInput   = document.getElementById('email');
const emailError   = document.getElementById('email-error');
const signupCard   = document.getElementById('signup-card');
const successCard  = document.getElementById('success-card');
const confirmedEmail = document.getElementById('confirmed-email');
const dismissBtn   = document.getElementById('dismiss-btn');

/* --- Helpers --- */
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function showError(message) {
  emailInput.classList.add('is-invalid');
  emailError.textContent = message;
  emailInput.setAttribute('aria-invalid', 'true');
}

function clearError() {
  emailInput.classList.remove('is-invalid');
  emailError.textContent = '';
  emailInput.removeAttribute('aria-invalid');
}

/* --- Form submission --- */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = emailInput.value.trim();

  if (!value) {
    showError('Email is required');
    emailInput.focus();
    return;
  }

  if (!isValidEmail(value)) {
    showError('Valid email required');
    emailInput.focus();
    return;
  }

  clearError();

  // Show success screen
  confirmedEmail.textContent = value;
  signupCard.classList.add('hidden');
  successCard.classList.remove('hidden');
  successCard.setAttribute('tabindex', '-1');
  successCard.focus();
});

/* --- Live validation on blur --- */
emailInput.addEventListener('blur', () => {
  const value = emailInput.value.trim();
  if (value && !isValidEmail(value)) {
    showError('Valid email required');
  } else {
    clearError();
  }
});

/* --- Clear error while typing --- */
emailInput.addEventListener('input', () => {
  if (emailInput.classList.contains('is-invalid') && isValidEmail(emailInput.value.trim())) {
    clearError();
  }
});

/* --- Dismiss button --- */
dismissBtn.addEventListener('click', () => {
  successCard.classList.add('hidden');
  signupCard.classList.remove('hidden');
  emailInput.value = '';
  clearError();
  emailInput.focus();
});

window.UrbanThreads = window.UrbanThreads || {};

const validation = {
  email(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
  },
  password(value) {
    return String(value || '').trim().length >= 8;
  },
  required(value) {
    return String(value || '').trim().length > 0;
  },
  phone(value) {
    return /^(0|\+84)[0-9]{9,10}$/.test(String(value || '').replace(/\s+/g, ''));
  },
  minLength(value, min) {
    return String(value || '').trim().length >= min;
  },
  setError(input, message) {
    if (!input) return;
    input.classList.add('input-error');
    const errorNode = input.parentElement?.querySelector('.error-text');
    if (errorNode) errorNode.textContent = message || '';
  },
  clearError(input) {
    if (!input) return;
    input.classList.remove('input-error');
    const errorNode = input.parentElement?.querySelector('.error-text');
    if (errorNode) errorNode.textContent = '';
  }
};

window.UrbanThreads.validation = validation;

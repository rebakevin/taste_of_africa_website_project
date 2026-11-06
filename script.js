'use strict';

// ---- Constants ----
const THEME_KEY = 'theme';
const FAVORITES_KEY = 'favorites';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';
const DARK_CLASS = 'dark';
const ACTIVE_CLASS = 'active';
const HIDDEN_CLASS = 'hidden';
const FAVORITED_CLASS = 'favorited';
const FILTER_ALL = 'all';
const DEFAULT_SERVINGS = 4;
const MIN_SERVINGS = 1;
const MAX_SERVINGS = 12;
const MIN_MESSAGE_LENGTH = 20;

// ---- Storage helpers ----
function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Could not save', key);
  }
}

// ---- Theme ----
function showTheme(toggle, isDark) {
  document.body.classList.toggle(DARK_CLASS, isDark);
  toggle.setAttribute('aria-pressed', String(isDark));
}

function initTheme() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  showTheme(toggle, readStorage(THEME_KEY) === THEME_DARK);

  toggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains(DARK_CLASS);
    showTheme(toggle, isDark);
    writeStorage(THEME_KEY, isDark ? THEME_DARK : THEME_LIGHT);
  });
}

// ---- Recipe filter ----
function isCardVisible(cardRegion, filter) {
  return filter === FILTER_ALL || cardRegion === filter;
}

function initRecipeFilter() {
  const buttons = document.querySelectorAll('[data-filter]');
  if (buttons.length === 0) return;

  const cards = document.querySelectorAll('[data-region]');

  function showFilter(filter) {
    buttons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle(ACTIVE_CLASS, isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    cards.forEach((card) => {
      card.classList.toggle(HIDDEN_CLASS, !isCardVisible(card.dataset.region, filter));
    });
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      showFilter(button.dataset.filter);
    });
  });
}

// ---- Favorites ----
function readFavorites() {
  const saved = readStorage(FAVORITES_KEY);
  if (saved === null) return [];

  try {
    const ids = JSON.parse(saved);
    if (Array.isArray(ids) && ids.every((id) => typeof id === 'string')) {
      return ids;
    }
  } catch (error) {
    return [];
  }
  return [];
}

function initFavorites() {
  const buttons = document.querySelectorAll('.favorite-button');
  if (buttons.length === 0) return;

  let favorites = readFavorites();

  function showButton(button, isFavorite) {
    button.classList.toggle(FAVORITED_CLASS, isFavorite);
    button.setAttribute('aria-pressed', String(isFavorite));
  }

  buttons.forEach((button) => {
    const id = button.closest('[data-id]').dataset.id;
    showButton(button, favorites.includes(id));

    button.addEventListener('click', () => {
      const isFavorite = !favorites.includes(id);
      if (isFavorite) {
        favorites.push(id);
      } else {
        favorites = favorites.filter((savedId) => savedId !== id);
      }
      showButton(button, isFavorite);
      writeStorage(FAVORITES_KEY, JSON.stringify(favorites));
    });
  });
}

// ---- Ingredient scaling ----
function scaleAmount(base, servings) {
  const scaled = (base * servings) / DEFAULT_SERVINGS;
  return Number(scaled.toFixed(2));
}

function initIngredientScaling() {
  const control = document.querySelector('.servings-control');
  if (!control) return;

  const count = control.querySelector('.servings-count');
  const minusButton = control.querySelector('[data-servings-step="-1"]');
  const plusButton = control.querySelector('[data-servings-step="1"]');
  const amounts = document.querySelectorAll('.amount');
  let servings = DEFAULT_SERVINGS;

  function showServings() {
    count.textContent = servings;
    minusButton.disabled = servings === MIN_SERVINGS;
    plusButton.disabled = servings === MAX_SERVINGS;
    amounts.forEach((amount) => {
      amount.textContent = scaleAmount(Number(amount.dataset.base), servings);
    });
  }

  minusButton.addEventListener('click', () => {
    if (servings > MIN_SERVINGS) {
      servings = servings - 1;
      showServings();
    }
  });

  plusButton.addEventListener('click', () => {
    if (servings < MAX_SERVINGS) {
      servings = servings + 1;
      showServings();
    }
  });

  showServings();
}

// ---- Contact form ----
function isMessageLongEnough(message) {
  return message.trim().length > MIN_MESSAGE_LENGTH;
}

function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const nameInput = form.querySelector('[name="name"]');
  const messageInput = form.querySelector('[name="message"]');
  const error = form.querySelector('.form-error');
  const success = document.querySelector('.contact-success');
  const successText = success.querySelector('.contact-success-text');

  form.addEventListener('submit', (event) => {
    // Nothing is sent anywhere, so stay on the page and show the result here.
    event.preventDefault();

    if (!isMessageLongEnough(messageInput.value)) {
      error.textContent = `Message must be more than ${MIN_MESSAGE_LENGTH} characters.`;
      messageInput.setAttribute('aria-invalid', 'true');
      messageInput.focus();
      return;
    }

    error.textContent = '';
    messageInput.removeAttribute('aria-invalid');
    successText.textContent = `Thank you, ${nameInput.value.trim()}! We've received your message.`;
    form.classList.add(HIDDEN_CLASS);
    success.classList.remove(HIDDEN_CLASS);
  });
}

// ---- Entry point ----
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRecipeFilter();
  initFavorites();
  initIngredientScaling();
  initContactForm();
});

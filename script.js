'use strict';

// ---- Constants ----
const THEME_KEY = 'theme';
const FAVORITES_KEY = 'favorites';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';
const DARK_CLASS = 'dark';
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
function initRecipeFilter() {
  const buttons = document.querySelectorAll('[data-filter]');
  if (buttons.length === 0) return;
}

// ---- Favorites ----
function initFavorites() {
  const buttons = document.querySelectorAll('.favorite-button');
  if (buttons.length === 0) return;
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
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
}

// ---- Entry point ----
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRecipeFilter();
  initFavorites();
  initIngredientScaling();
  initContactForm();
});

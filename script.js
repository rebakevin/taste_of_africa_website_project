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
// Private mode or blocked storage must not break the page, so both fall back quietly.
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
    return true;
  } catch (error) {
    return false;
  }
}

// ---- Theme ----
function applyTheme(toggle, isDark) {
  document.body.classList.toggle(DARK_CLASS, isDark);
  toggle.setAttribute('aria-pressed', String(isDark));
}

function initTheme() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  applyTheme(toggle, readStorage(THEME_KEY) === THEME_DARK);

  toggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains(DARK_CLASS);
    applyTheme(toggle, isDark);
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
function initIngredientScaling() {
  const control = document.querySelector('.servings-control');
  if (!control) return;
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

/**
 * PALETTE-ENGINE.JS
 * Manages color themes, synchronized starlight hues, and dedication presets.
 */

(function (global) {
  'use strict';

  const THEMES = {
    'midnight-lavender': {
      name: 'Midnight Lavender',
      starTint: 'rgba(216, 180, 254, ',
      tagText: 'For Someone Special',
      dedication: 'Crafted with CSS geometry, procedural petals & luminous light'
    },
    'velvet-rose': {
      name: 'Velvet Rose',
      starTint: 'rgba(253, 164, 175, ',
      tagText: 'With All My Heart',
      dedication: 'A timeless crimson bouquet blooming under evening starlight'
    },
    'golden-sunset': {
      name: 'Golden Sunset',
      starTint: 'rgba(253, 224, 71, ',
      tagText: 'Warmest Wishes',
      dedication: 'Radiant amber blossoms woven with golden hour warmth'
    },
    'celestial-blue': {
      name: 'Celestial Blue',
      starTint: 'rgba(147, 197, 253, ',
      tagText: 'Dream Beyond Stars',
      dedication: 'Sapphire and moonlit petals drifting through a quiet night sky'
    },
    'emerald-mist': {
      name: 'Emerald Mist',
      starTint: 'rgba(110, 231, 183, ',
      tagText: 'Peace & Serenity',
      dedication: 'Enchanted forest blooms glowing softly in jade twilight'
    }
  };

  class PaletteEngine {
    constructor() {
      this.currentTheme = 'midnight-lavender';
      this.listeners = [];
    }

    setTheme(themeKey) {
      if (!THEMES[themeKey]) return;
      this.currentTheme = themeKey;

      // Update body class
      document.body.className = `theme-${themeKey}`;

      // Update tag & subtitle text if not manually edited
      const tagEl = document.getElementById('tag-text');
      const noteEl = document.getElementById('dedication-note');
      if (tagEl) tagEl.textContent = THEMES[themeKey].tagText;
      if (noteEl) noteEl.textContent = THEMES[themeKey].dedication;

      this.listeners.forEach((cb) => cb(themeKey, THEMES[themeKey]));
    }

    getThemeConfig() {
      return THEMES[this.currentTheme];
    }

    onChange(callback) {
      this.listeners.push(callback);
    }
  }

  global.PaletteEngine = new PaletteEngine();
})(window);

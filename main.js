/**
 * MAIN.JS
 * Bootstraps the bouquet animation, studio controls, and user interactions.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const builder = window.BouquetBuilder;
    const palette = window.PaletteEngine;
    const particles = window.ParticleSystem;
    const audio = window.AmbientAudioSynth;

    // Initial render
    builder.buildAll();

    // Sync star tint with active theme
    palette.onChange((_, cfg) => {
      particles.setStarTint(cfg.starTint);
    });

    // Studio Dock Toggle
    const dockToggle = document.getElementById('dock-toggle');
    const dockPanel = document.getElementById('dock-panel');
    dockToggle.addEventListener('click', () => {
      dockPanel.classList.toggle('collapsed');
    });

    // Theme Swatches
    const swatches = document.querySelectorAll('.swatch');
    swatches.forEach((btn) => {
      btn.addEventListener('click', () => {
        swatches.forEach((s) => s.classList.remove('active'));
        btn.classList.add('active');
        palette.setTheme(btn.dataset.theme);
        audio.playChime();
      });
    });

    // Bloom Openness Slider
    const sliderBloom = document.getElementById('slider-bloom');
    const valBloom = document.getElementById('val-bloom');
    sliderBloom.addEventListener('input', (e) => {
      const pct = Number(e.target.value);
      valBloom.textContent = `${pct}%`;
      document.documentElement.style.setProperty('--bloom-scale', (pct / 100).toFixed(2));
    });

    // Gentle Breeze Slider
    const sliderBreeze = document.getElementById('slider-breeze');
    const valBreeze = document.getElementById('val-breeze');
    sliderBreeze.addEventListener('input', (e) => {
      const pct = Number(e.target.value);
      valBreeze.textContent = `${pct}%`;
      const angle = (pct / 100) * 5.2;
      const speed = pct === 0 ? 999 : Math.max(2.2, 8.5 - (pct / 100) * 5.5);
      document.documentElement.style.setProperty('--breeze-angle', `${angle.toFixed(2)}deg`);
      document.documentElement.style.setProperty('--breeze-speed', `${speed.toFixed(1)}s`);
    });

    // Firefly Density Slider
    const sliderSparkles = document.getElementById('slider-sparkles');
    const valSparkles = document.getElementById('val-sparkles');
    sliderSparkles.addEventListener('input', (e) => {
      const pct = Number(e.target.value);
      valSparkles.textContent = `${pct}%`;
      const count = Math.round((pct / 100) * 55);
      particles.spawnFireflies(count);
    });

    // Replay Animation Button
    const btnReplay = document.getElementById('btn-replay');
    btnReplay.addEventListener('click', () => {
      const rig = document.getElementById('bouquet-rig');
      rig.style.animation = 'none';
      void rig.offsetWidth; // trigger reflow
      rig.style.animation = '';
      builder.buildAll();
      audio.playChime(659.25);
    });

    // Burst Petals Button
    const btnScatter = document.getElementById('btn-scatter-petals');
    btnScatter.addEventListener('click', () => {
      particles.burstPetals(window.innerWidth / 2, window.innerHeight * 0.4, 24);
      audio.playChime(783.99);
    });

    // Add Rose Button
    const btnAddBloom = document.getElementById('btn-add-bloom');
    btnAddBloom.addEventListener('click', () => {
      builder.addRandomFlower();
      audio.playChime();
    });

    // Ambient Chime Loop Toggle
    const btnMusic = document.getElementById('btn-toggle-music');
    btnMusic.addEventListener('click', () => {
      const active = audio.toggleAmbientLoop();
      btnMusic.classList.toggle('active', active);
      btnMusic.textContent = active ? '♪ Chime Active' : '♪ Ambient Chime';
    });
  });
})();

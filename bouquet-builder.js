/**
 * BOUQUET-BUILDER.JS
 * Procedurally arranges lush roses, tulips, lilies, eucalyptus leaves,
 * and glowing baby's breath clusters inside the bouquet rig.
 */

(function (global) {
  'use strict';

  const INITIAL_BLOOMS = [
    // Back Row
    { x: 145, y: 120, scale: 0.92, variant: 'rose', z: 5, delay: 0.15 },
    { x: 210, y: 105, scale: 1.05, variant: 'rose', z: 6, delay: 0.25 },
    { x: 275, y: 122, scale: 0.92, variant: 'rose', z: 5, delay: 0.35 },

    // Upper-Mid Row
    { x: 112, y: 168, scale: 0.88, variant: 'tulip', z: 7, delay: 0.40 },
    { x: 175, y: 158, scale: 1.12, variant: 'rose', z: 9, delay: 0.45 },
    { x: 245, y: 158, scale: 1.12, variant: 'rose', z: 9, delay: 0.50 },
    { x: 308, y: 170, scale: 0.88, variant: 'tulip', z: 7, delay: 0.55 },

    // Center Focal Cluster
    { x: 138, y: 218, scale: 1.02, variant: 'lily', z: 10, delay: 0.60 },
    { x: 210, y: 205, scale: 1.24, variant: 'rose', z: 12, delay: 0.65 },
    { x: 282, y: 218, scale: 1.02, variant: 'lily', z: 10, delay: 0.70 },

    // Lower Front Row
    { x: 166, y: 264, scale: 0.96, variant: 'rose', z: 11, delay: 0.78 },
    { x: 254, y: 264, scale: 0.96, variant: 'rose', z: 11, delay: 0.84 },
    { x: 210, y: 292, scale: 0.90, variant: 'tulip', z: 12, delay: 0.90 }
  ];

  const FOLIAGE_POSITIONS = [
    { x: 110, y: 110, rot: -42 },
    { x: 310, y: 110, rot: 42 },
    { x: 88, y: 175, rot: -58 },
    { x: 332, y: 175, rot: 58 },
    { x: 105, y: 245, rot: -48 },
    { x: 315, y: 245, rot: 48 },
    { x: 165, y: 82, rot: -18 },
    { x: 255, y: 82, rot: 18 }
  ];

  const GYPSO_POSITIONS = [
    { x: 130, y: 135 },
    { x: 290, y: 135 },
    { x: 105, y: 205 },
    { x: 315, y: 205 },
    { x: 185, y: 130 },
    { x: 235, y: 130 },
    { x: 150, y: 250 },
    { x: 270, y: 250 }
  ];

  class BouquetBuilder {
    constructor() {
      this.flowersCluster = document.getElementById('flowers-cluster');
      this.foliageLayer = document.getElementById('foliage-layer');
    }

    buildAll() {
      this.buildFoliage();
      this.buildFlowers();
    }

    buildFoliage() {
      this.foliageLayer.innerHTML = '';

      // Botanical Leaves
      FOLIAGE_POSITIONS.forEach((pos, idx) => {
        const leaf = document.createElement('div');
        leaf.className = 'botanical-leaf';
        leaf.style.left = `${pos.x}px`;
        leaf.style.top = `${pos.y}px`;
        leaf.style.setProperty('--rot', `${pos.rot}deg`);
        leaf.style.animationDelay = `${0.1 + idx * 0.06}s`;
        this.foliageLayer.appendChild(leaf);
      });

      // Glowing Baby's Breath Clusters
      GYPSO_POSITIONS.forEach((pos, idx) => {
        const sprig = document.createElement('div');
        sprig.className = 'babys-breath-sprig';
        sprig.style.left = `${pos.x}px`;
        sprig.style.top = `${pos.y}px`;
        sprig.style.animationDelay = `${0.3 + idx * 0.07}s`;

        for (let i = 0; i < 6; i++) {
          const dot = document.createElement('span');
          dot.className = 'gypso-dot';
          dot.style.left = `${10 + Math.cos(i * 1.1) * 20}px`;
          dot.style.top = `${10 + Math.sin(i * 1.1) * 20}px`;
          sprig.appendChild(dot);
        }

        this.foliageLayer.appendChild(sprig);
      });
    }

    buildFlowers() {
      this.flowersCluster.innerHTML = '';
      INITIAL_BLOOMS.forEach((cfg) => {
        const flowerEl = this.createFlowerElement(cfg);
        this.flowersCluster.appendChild(flowerEl);
      });
    }

    createFlowerElement({ x, y, scale = 1, variant = 'rose', z = 8, delay = 0.2 }) {
      const flower = document.createElement('div');
      flower.className = `flower-head flower-${variant}`;
      flower.style.left = `${x}px`;
      flower.style.top = `${y}px`;
      flower.style.zIndex = z;
      flower.style.setProperty('--flower-scale', scale);
      flower.style.setProperty('--delay', `${delay}s`);

      const outerCount = variant === 'lily' ? 6 : 8;
      const midCount = variant === 'tulip' ? 5 : 7;
      const innerCount = 5;

      // Outer Petals
      for (let i = 0; i < outerCount; i++) {
        const p = document.createElement('div');
        p.className = 'petal petal-outer';
        p.style.setProperty('--angle', `${(360 / outerCount) * i}deg`);
        flower.appendChild(p);
      }

      // Middle Petals
      for (let i = 0; i < midCount; i++) {
        const p = document.createElement('div');
        p.className = 'petal petal-mid';
        p.style.setProperty('--angle', `${(360 / midCount) * i + 22}deg`);
        flower.appendChild(p);
      }

      // Inner Petals
      for (let i = 0; i < innerCount; i++) {
        const p = document.createElement('div');
        p.className = 'petal petal-inner';
        p.style.setProperty('--angle', `${(360 / innerCount) * i + 12}deg`);
        flower.appendChild(p);
      }

      // Glowing Core
      const core = document.createElement('div');
      core.className = 'flower-center';
      flower.appendChild(core);

      // Interactive Click: Chime + Petal Burst
      flower.addEventListener('click', (e) => {
        e.stopPropagation();
        if (global.AmbientAudioSynth) {
          global.AmbientAudioSynth.playChime();
        }
        if (global.ParticleSystem) {
          global.ParticleSystem.burstPetals(e.clientX, e.clientY, 10);
        }
      });

      return flower;
    }

    addRandomFlower() {
      const x = 125 + Math.random() * 170;
      const y = 115 + Math.random() * 165;
      const variants = ['rose', 'tulip', 'lily'];
      const variant = variants[Math.floor(Math.random() * variants.length)];
      const flowerEl = this.createFlowerElement({
        x,
        y,
        scale: 0.85 + Math.random() * 0.35,
        variant,
        z: Math.floor(6 + Math.random() * 7),
        delay: 0
      });
      this.flowersCluster.appendChild(flowerEl);
    }
  }

  global.BouquetBuilder = new BouquetBuilder();
})(window);

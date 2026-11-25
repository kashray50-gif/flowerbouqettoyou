/**
 * PARTICLE-SYSTEM.JS
 * Renders the deep-space twinkling starfield on <canvas> and DOM fireflies/petals.
 */

(function (global) {
  'use strict';

  class ParticleSystem {
    constructor() {
      this.canvas = document.getElementById('ambient-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.layer = document.getElementById('particle-layer');
      this.stars = [];
      this.fireflyCount = 26;
      this.starTint = 'rgba(216, 180, 254, ';

      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.initStars(140);
      this.spawnFireflies(this.fireflyCount);
      this.animateCanvas();
    }

    resize() {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    }

    initStars(count) {
      this.stars = [];
      for (let i = 0; i < count; i++) {
        this.stars.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          radius: Math.random() * 1.8 + 0.4,
          alpha: Math.random(),
          delta: (Math.random() * 0.015 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
          tinted: Math.random() > 0.45
        });
      }
    }

    setStarTint(tint) {
      this.starTint = tint;
    }

    animateCanvas() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (const s of this.stars) {
        s.alpha += s.delta;
        if (s.alpha <= 0.1 || s.alpha >= 1) {
          s.delta *= -1;
        }
        const clamped = Math.max(0.05, Math.min(1, s.alpha));
        this.ctx.beginPath();
        this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = s.tinted
          ? `${this.starTint}${clamped.toFixed(2)})`
          : `rgba(255, 255, 255, ${clamped.toFixed(2)})`;
        this.ctx.fill();
      }

      requestAnimationFrame(() => this.animateCanvas());
    }

    spawnFireflies(count) {
      this.layer.innerHTML = '';
      for (let i = 0; i < count; i++) {
        const fly = document.createElement('div');
        fly.className = 'firefly';
        const size = Math.random() * 5 + 3;
        fly.style.width = `${size}px`;
        fly.style.height = `${size}px`;
        fly.style.left = `${Math.random() * 100}%`;
        fly.style.top = `${20 + Math.random() * 75}%`;
        fly.style.setProperty('--dur', `${6 + Math.random() * 7}s`);
        fly.style.setProperty('--delay', `${Math.random() * 6}s`);
        fly.style.setProperty('--dx1', `${(Math.random() - 0.5) * 90}px`);
        fly.style.setProperty('--dy1', `${-40 - Math.random() * 80}px`);
        fly.style.setProperty('--dx2', `${(Math.random() - 0.5) * 140}px`);
        fly.style.setProperty('--dy2', `${-100 - Math.random() * 120}px`);
        this.layer.appendChild(fly);
      }
    }

    burstPetals(originX = window.innerWidth / 2, originY = window.innerHeight * 0.42, count = 18) {
      for (let i = 0; i < count; i++) {
        const petal = document.createElement('div');
        petal.className = 'falling-petal';
        const offsetX = (Math.random() - 0.5) * 220;
        const offsetY = (Math.random() - 0.5) * 140;
        petal.style.left = `${originX + offsetX}px`;
        petal.style.top = `${originY + offsetY}px`;
        petal.style.setProperty('--fall-dur', `${3.2 + Math.random() * 2.5}s`);
        petal.style.setProperty('--sway-x', `${(Math.random() - 0.5) * 180}px`);
        petal.style.setProperty('--end-x', `${(Math.random() - 0.5) * 240}px`);
        this.layer.appendChild(petal);

        setTimeout(() => {
          if (petal.parentNode) petal.parentNode.removeChild(petal);
        }, 6000);
      }
    }
  }

  global.ParticleSystem = new ParticleSystem();
})(window);

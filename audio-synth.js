/**
 * AUDIO-SYNTH.JS
 * Pure Web Audio API harmonic chime & ambient pad synthesizer (zero external MP3s).
 */

(function (global) {
  'use strict';

  class AmbientAudioSynth {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.timerId = null;
      // Pentatonic frequencies in Hz (C4, D4, E4, G4, A4, C5, D5, E5, G5)
      this.scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];
    }

    initContext() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playChime(freqOverride = null) {
      this.initContext();
      const now = this.ctx.currentTime;
      const freq = freqOverride || this.scale[Math.floor(Math.random() * this.scale.length)];

      const osc = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(freq * 2, now);

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.03, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      osc.connect(gain);
      subOsc.connect(subGain);
      subGain.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + 2.9);
      subOsc.stop(now + 2.9);
    }

    toggleAmbientLoop() {
      this.initContext();
      this.isPlaying = !this.isPlaying;

      if (this.isPlaying) {
        this.playChime(523.25);
        this.timerId = setInterval(() => {
          if (Math.random() > 0.25) {
            this.playChime();
          }
        }, 1600);
      } else {
        clearInterval(this.timerId);
        this.timerId = null;
      }

      return this.isPlaying;
    }
  }

  global.AmbientAudioSynth = new AmbientAudioSynth();
})(window);

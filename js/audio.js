/**
 * GTA VI Live Countdown - Synthwave Ambient Audio Engine
 * 100% Royalty-Free & Safe for 24/7 YouTube Live Streaming.
 * Uses Web Audio API to procedurally generate lush retro synth chords & ambient harmonics.
 */

class SynthAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.filterNode = null;
    this.timerId = null;

    // UI elements
    this.btnToggle = document.getElementById('btnAudioToggle');
    this.audioIcon = document.getElementById('audioIcon');
    this.audioLabel = document.getElementById('audioLabel');

    // Chords (Vice City Synthwave progression: F#m - D - A - E / nostalgic retro frequencies)
    this.chordProgressions = [
      [185.00, 220.00, 277.18, 370.00], // F#m (F#3, A3, C#4, F#4)
      [146.83, 220.00, 293.66, 369.99], // Dmaj (D3, A3, D4, F#4)
      [220.00, 277.18, 329.63, 440.00], // Amaj (A3, C#4, E4, A4)
      [164.81, 246.94, 329.63, 392.00]  // Emaj (E3, B3, E4, G4)
    ];
    this.currentChordIdx = 0;

    this.initEvents();
  }

  initEvents() {
    if (this.btnToggle) {
      this.btnToggle.addEventListener('click', () => this.toggle());
    }

    // Keyboard shortcut 'M' to mute/unmute
    window.addEventListener('keydown', (e) => {
      if (e.key === 'm' || e.key === 'M') {
        if (!['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) {
          this.toggle();
        }
      }
    });
  }

  initAudioContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master Gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.18, this.ctx.currentTime);

      // Lowpass filter for warm analog synth tone
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(800, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(2, this.ctx.currentTime);

      this.gainNode.connect(this.filterNode);
      this.filterNode.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    this.initAudioContext();
    this.isPlaying = true;
    this.updateUI(true);

    this.playChordStep();
    this.timerId = setInterval(() => this.playChordStep(), 4000);
  }

  stop() {
    this.isPlaying = false;
    this.updateUI(false);
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
    }
  }

  playChordStep() {
    if (!this.isPlaying || !this.ctx) return;

    const chord = this.chordProgressions[this.currentChordIdx];
    this.currentChordIdx = (this.currentChordIdx + 1) % this.chordProgressions.length;

    const now = this.ctx.currentTime;
    const duration = 4.2;

    // Filter sweep for retro vaporwave motion
    this.filterNode.frequency.cancelScheduledValues(now);
    this.filterNode.frequency.setValueAtTime(600, now);
    this.filterNode.frequency.exponentialRampToValueAtTime(1200, now + 1.8);
    this.filterNode.frequency.exponentialRampToValueAtTime(550, now + duration);

    // Play each note in the chord
    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Warm analog sawtooth and triangle mixture
      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      // Slight detune for chorus lushness
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime((idx - 1.5) * 6, now);

      // ADSR Envelope
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.08 / chord.length, now + 1.0);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    });
  }

  updateUI(active) {
    if (active) {
      this.btnToggle.classList.add('active', 'audio-playing');
      this.audioIcon.className = 'fa-solid fa-volume-high';
      this.audioLabel.textContent = 'Synth Playing';
    } else {
      this.btnToggle.classList.remove('active', 'audio-playing');
      this.audioIcon.className = 'fa-solid fa-volume-xmark';
      this.audioLabel.textContent = 'Synth Radio';
    }
  }
}

// Global audio instance
let synthAudio = null;
window.addEventListener('DOMContentLoaded', () => {
  synthAudio = new SynthAudioEngine();
});

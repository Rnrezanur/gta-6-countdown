/**
 * GTA VI Live Countdown - Background Visuals Engine
 * Features:
 *  - Vice City Sunset (Flagship: Animated sun with blinds, swaying palm trees, ocean waves reflection, city skyline, ambient particles)
 *  - Synthwave 3D Perspective Grid
 *  - Starry Vice Night Sky
 *  - Custom Video / Media Support
 */

class BackgroundEngine {
  constructor() {
    this.canvas = document.getElementById('bg-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.videoContainer = document.getElementById('video-bg-container');
    this.videoElement = document.getElementById('bg-video');

    this.currentTheme = 'sunset'; // 'sunset' | 'grid' | 'night' | 'chroma' | 'custom-video'
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.animId = null;
    this.time = 0;

    // Ambient floating particles
    this.particles = [];
    this.particleCount = 50;

    // Stars for night theme
    this.stars = [];
    this.shootingStars = [];

    // City skyline generation cache
    this.skylineBuildings = [];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initParticles();
    this.initSkyline();
    this.initStars();
    this.startAnimation();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.initSkyline(); // Recalculate skyline on resize
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.5) * 0.4 + 0.15,
        speedY: -Math.random() * 0.6 - 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.4 ? 'rgba(255, 0, 127, ' : 'rgba(255, 170, 0, '
      });
    }
  }

  initSkyline() {
    this.skylineBuildings = [];
    const count = Math.ceil(this.width / 32) + 2;
    let currentX = 0;

    for (let i = 0; i < count; i++) {
      const bWidth = Math.floor(Math.random() * 35) + 25;
      const bHeight = Math.floor(Math.random() * 140) + 70;
      const hasAntenna = Math.random() > 0.5;
      const antennaHeight = Math.floor(Math.random() * 40) + 15;
      const lightBlinkRate = Math.random() * 2 + 1;

      this.skylineBuildings.push({
        x: currentX,
        width: bWidth,
        height: bHeight,
        hasAntenna: hasAntenna,
        antennaHeight: antennaHeight,
        lightBlinkRate: lightBlinkRate,
        windowRows: Math.floor(bHeight / 16),
        windowCols: Math.floor(bWidth / 10),
        windowPattern: Array.from({ length: 20 }, () => Math.random() > 0.55)
      });

      currentX += bWidth - 4; // Slight overlap
    }
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < 180; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * (this.height * 0.65),
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01
      });
    }
  }

  setTheme(themeName, customVideoUrl = null) {
    this.currentTheme = themeName;
    document.body.className = `theme-${themeName}`;

    if (themeName === 'custom-video') {
      this.videoContainer.classList.remove('hidden');
      this.canvas.classList.add('hidden');
      if (customVideoUrl) {
        this.videoElement.src = customVideoUrl;
        this.videoElement.play().catch(e => console.log('Video play error:', e));
      }
    } else {
      this.videoContainer.classList.add('hidden');
      this.canvas.classList.remove('hidden');
      this.videoElement.pause();
    }
  }

  startAnimation() {
    const loop = (timestamp) => {
      this.time = timestamp * 0.001; // In seconds
      this.render();
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  render() {
    if (this.currentTheme === 'chroma' || this.currentTheme === 'custom-video') {
      return; // Handled by CSS or video element
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.currentTheme === 'sunset') {
      this.renderSunsetScene();
    } else if (this.currentTheme === 'grid') {
      this.renderSynthwaveGrid();
    } else if (this.currentTheme === 'night') {
      this.renderNightScene();
    }

    // Always render subtle ambient floating embers for depth
    this.renderParticles();
  }

  // =========================================================================
  // 1. VICE CITY SUNSET SCENE (FLAGSHIP)
  // =========================================================================
  renderSunsetScene() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const horizonY = h * 0.72;

    // A. Sky Gradient (Vice City Dusk)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGrad.addColorStop(0, '#0a0118');    // Deep cosmic violet
    skyGrad.addColorStop(0.25, '#28003f'); // Purple night
    skyGrad.addColorStop(0.55, '#820054'); // Hot magenta
    skyGrad.addColorStop(0.82, '#e03e48'); // Sunset crimson
    skyGrad.addColorStop(1, '#ff9a44');    // Bright horizon amber
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, horizonY);

    // B. Clouds passing across the sky
    this.renderClouds(horizonY);

    // C. Giant Synthwave Retro Sun
    this.renderRetroSun(w * 0.5, horizonY - 40, Math.min(w, h) * 0.22);

    // D. Distant Skyline Silhouettes with Windows & Antenna Beacons
    this.renderSkyline(horizonY);

    // E. Ocean & Horizon Water with animated reflections
    this.renderOcean(horizonY);

    // F. Swaying Vice City Palm Trees framing the sides
    this.renderPalmTree(w * 0.09, horizonY + 30, Math.min(w, h) * 0.45, -0.15);
    this.renderPalmTree(w * 0.03, horizonY + 50, Math.min(w, h) * 0.42, 0.08);
    this.renderPalmTree(w * 0.91, horizonY + 40, Math.min(w, h) * 0.48, 0.18);
    this.renderPalmTree(w * 0.96, horizonY + 60, Math.min(w, h) * 0.40, -0.12);
  }

  // Giant Retro Sun with Horizontal Sunset Blind Bars
  renderRetroSun(cx, cy, radius) {
    const ctx = this.ctx;
    ctx.save();

    // Outer glow
    const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.5);
    glowGrad.addColorStop(0, 'rgba(255, 230, 100, 0.9)');
    glowGrad.addColorStop(0.4, 'rgba(255, 0, 127, 0.5)');
    glowGrad.addColorStop(1, 'rgba(255, 0, 127, 0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Clip to Sun circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    // Sun gradient (yellow top to hot magenta bottom)
    const sunGrad = ctx.createLinearGradient(cx, cy - radius, cx, cy + radius);
    sunGrad.addColorStop(0, '#fff478');
    sunGrad.addColorStop(0.45, '#ff4b58');
    sunGrad.addColorStop(1, '#a6006c');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // Horizontal blind cuts (gradually thicker towards bottom)
    const cuts = 9;
    const startY = cy - radius * 0.05;
    const endY = cy + radius;
    ctx.fillStyle = '#0f001f'; // Matches sky / silhouette

    for (let i = 0; i < cuts; i++) {
      const frac = i / cuts;
      const y = startY + (endY - startY) * frac;
      const barHeight = 2.5 + frac * 9.5;
      ctx.fillRect(cx - radius, y, radius * 2, barHeight);
    }

    ctx.restore();
  }

  // Clouds drifting slowly
  renderClouds(horizonY) {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = 'rgba(200, 40, 120, 0.16)';
    const speed = this.time * 8;

    for (let i = 0; i < 4; i++) {
      const cloudX = ((i * 450 + speed) % (this.width + 600)) - 300;
      const cloudY = horizonY * (0.2 + i * 0.18);
      ctx.beginPath();
      ctx.arc(cloudX, cloudY, 80, 0, Math.PI * 2);
      ctx.arc(cloudX + 70, cloudY - 20, 100, 0, Math.PI * 2);
      ctx.arc(cloudX + 160, cloudY + 10, 75, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Vice City Skyline Silhouette
  renderSkyline(horizonY) {
    const ctx = this.ctx;
    ctx.save();

    for (const b of this.skylineBuildings) {
      const bTop = horizonY - b.height;

      // Building Body Silhouette
      ctx.fillStyle = '#0c0119';
      ctx.fillRect(b.x, bTop, b.width, b.height);

      // Edge outline
      ctx.strokeStyle = 'rgba(255, 0, 127, 0.25)';
      ctx.lineWidth = 1;
      ctx.strokeRect(b.x, bTop, b.width, b.height);

      // Windows
      ctx.fillStyle = 'rgba(255, 235, 140, 0.45)';
      for (let r = 1; r < b.windowRows - 1; r++) {
        for (let c = 1; c < b.windowCols; c++) {
          const idx = (r * 3 + c) % b.windowPattern.length;
          if (b.windowPattern[idx]) {
            const winX = b.x + c * 8;
            const winY = bTop + r * 14;
            ctx.fillRect(winX, winY, 4, 6);
          }
        }
      }

      // Rooftop Antenna with blinking aircraft warning red beacon
      if (b.hasAntenna) {
        const antennaX = b.x + b.width / 2;
        ctx.strokeStyle = '#0c0119';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(antennaX, bTop);
        ctx.lineTo(antennaX, bTop - b.antennaHeight);
        ctx.stroke();

        // Pulsing Red Light
        const blink = Math.sin(this.time * b.lightBlinkRate * 3) > 0.2;
        if (blink) {
          ctx.fillStyle = '#ff2233';
          ctx.shadowColor = '#ff0033';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(antennaX, bTop - b.antennaHeight, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // Reset shadow
        }
      }
    }

    ctx.restore();
  }

  // Ocean with ripples and sun reflection
  renderOcean(horizonY) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Ocean base gradient (deep dark magenta/blue)
    const oceanGrad = ctx.createLinearGradient(0, horizonY, 0, h);
    oceanGrad.addColorStop(0, '#0a0016');
    oceanGrad.addColorStop(0.3, '#1c002f');
    oceanGrad.addColorStop(1, '#05000c');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, horizonY, w, h - horizonY);

    // Glowing Horizon Line
    ctx.strokeStyle = 'rgba(255, 170, 0, 0.7)';
    ctx.shadowColor = '#ff5500';
    ctx.shadowBlur = 15;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(w, horizonY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Animated water reflection waves
    const waveCount = 28;
    const sunCenterX = w * 0.5;

    for (let i = 0; i < waveCount; i++) {
      const frac = (i + 1) / waveCount;
      const y = horizonY + Math.pow(frac, 1.8) * (h - horizonY);
      const waveWidth = 80 + frac * w * 0.45;
      const waveOffset = Math.sin(this.time * 2 + i * 0.5) * (15 + frac * 25);

      const waveGrad = ctx.createLinearGradient(sunCenterX - waveWidth / 2, y, sunCenterX + waveWidth / 2, y);
      waveGrad.addColorStop(0, 'rgba(255, 0, 127, 0)');
      waveGrad.addColorStop(0.3, 'rgba(255, 0, 127, ' + (0.4 * (1 - frac * 0.5)) + ')');
      waveGrad.addColorStop(0.5, 'rgba(255, 235, 120, ' + (0.75 * (1 - frac * 0.4)) + ')');
      waveGrad.addColorStop(0.7, 'rgba(255, 0, 127, ' + (0.4 * (1 - frac * 0.5)) + ')');
      waveGrad.addColorStop(1, 'rgba(255, 0, 127, 0)');

      ctx.fillStyle = waveGrad;
      ctx.fillRect(sunCenterX - waveWidth / 2 + waveOffset, y, waveWidth, 2 + frac * 3.5);
    }
  }

  // Realistic Procedural Swaying Palm Tree
  renderPalmTree(baseX, baseY, trunkHeight, leanAngle) {
    const ctx = this.ctx;
    ctx.save();

    // Wind sway calculation
    const sway = Math.sin(this.time * 1.5 + baseX * 0.05) * 0.05;
    const totalLean = leanAngle + sway;

    ctx.translate(baseX, baseY);
    ctx.rotate(totalLean);

    // Palm Trunk (Curved and segmented)
    ctx.strokeStyle = '#090014';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(0, 0);
    // Trunk curve
    const ctrlX = -25 * Math.sign(leanAngle || 1);
    const topX = -40 * Math.sign(leanAngle || 1);
    const topY = -trunkHeight;
    ctx.quadraticCurveTo(ctrlX, -trunkHeight * 0.5, topX, topY);
    ctx.stroke();

    // Trunk highlight line (subtle neon rim light)
    ctx.strokeStyle = 'rgba(255, 0, 127, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Fronds (Leaves) at the crown
    ctx.translate(topX, topY);

    const fronds = [
      { angle: -2.3, len: 120, droop: 1.1 },
      { angle: -1.8, len: 150, droop: 0.9 },
      { angle: -1.2, len: 130, droop: 0.8 },
      { angle: -0.6, len: 140, droop: 0.9 },
      { angle: 0.1, len: 120, droop: 1.2 },
      { angle: 0.8, len: 140, droop: 1.0 },
      { angle: 1.4, len: 160, droop: 0.8 },
      { angle: 2.1, len: 130, droop: 1.1 }
    ];

    ctx.fillStyle = '#080012';

    for (const frond of fronds) {
      ctx.save();
      const frondSway = Math.sin(this.time * 2 + frond.angle) * 0.08;
      ctx.rotate(frond.angle + frondSway);

      // Frond shape
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(frond.len * 0.5, -15 * frond.droop, frond.len, 35 * frond.droop);
      ctx.quadraticCurveTo(frond.len * 0.5, 10, 0, 0);
      ctx.fill();

      // Leaf feathers
      for (let f = 15; f < frond.len - 10; f += 8) {
        ctx.strokeStyle = '#080012';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(f, 0);
        ctx.lineTo(f + 5, 18 * frond.droop);
        ctx.stroke();
      }

      ctx.restore();
    }

    ctx.restore();
  }

  // =========================================================================
  // 2. SYNTHWAVE 3D PERSPECTIVE GRID
  // =========================================================================
  renderSynthwaveGrid() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const horizonY = h * 0.65;

    // Deep purple sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGrad.addColorStop(0, '#04000d');
    skyGrad.addColorStop(0.6, '#26003b');
    skyGrad.addColorStop(1, '#ff007f');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, horizonY);

    // Glowing retro sun
    this.renderRetroSun(w * 0.5, horizonY - 30, Math.min(w, h) * 0.2);

    // Grid Floor Base
    ctx.fillStyle = '#070014';
    ctx.fillRect(0, horizonY, w, h - horizonY);

    // Grid Lines (Horizontal moving forward with speed)
    const speed = (this.time * 60) % 45;
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 8;

    for (let i = 0; i < 20; i++) {
      const dist = (i * 45 + speed);
      const frac = dist / (20 * 45);
      const y = horizonY + Math.pow(frac, 2.2) * (h - horizonY);

      if (y >= horizonY && y <= h) {
        ctx.globalAlpha = Math.min(1, frac * 1.5);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    // Grid Lines (Perspective Vertical Vanishing to Center)
    const vLines = 26;
    const vanishingPointX = w * 0.5;

    for (let i = -vLines; i <= vLines; i++) {
      const bottomX = vanishingPointX + i * (w / 14);
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(vanishingPointX, horizonY);
      ctx.lineTo(bottomX, h);
      ctx.stroke();
    }

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // =========================================================================
  // 3. STARRY NIGHT SCENE
  // =========================================================================
  renderNightScene() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const horizonY = h * 0.72;

    // Midnight dark blue/purple sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGrad.addColorStop(0, '#020008');
    skyGrad.addColorStop(0.7, '#0b0424');
    skyGrad.addColorStop(1, '#1b0847');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, horizonY);

    // Twinkling Stars
    for (const star of this.stars) {
      const twinkle = Math.sin(this.time * 3 + star.twinkleSpeed * 100) * 0.3 + 0.7;
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * twinkle})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glowing Neon Moon
    ctx.fillStyle = '#fffcde';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.arc(w * 0.8, h * 0.22, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Skyline
    this.renderSkyline(horizonY);

    // Ocean
    this.renderOcean(horizonY);

    // Palms
    this.renderPalmTree(w * 0.08, horizonY + 30, Math.min(w, h) * 0.44, -0.12);
    this.renderPalmTree(w * 0.92, horizonY + 40, Math.min(w, h) * 0.46, 0.15);
  }

  // Ambient floating particles (embers / dust motes)
  renderParticles() {
    const ctx = this.ctx;

    for (const p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around
      if (p.y < 0) p.y = this.height;
      if (p.x > this.width) p.x = 0;
      if (p.x < 0) p.x = this.width;

      ctx.fillStyle = `${p.color}${p.alpha})`;
      ctx.shadowColor = p.color + '0.8)';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }
}

// Global background instance
let bgEngine = null;
window.addEventListener('DOMContentLoaded', () => {
  bgEngine = new BackgroundEngine();
});

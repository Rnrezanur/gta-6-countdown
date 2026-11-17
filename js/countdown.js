/**
 * GTA VI Live Countdown - Countdown Engine
 * Includes 28 rolling regional midnight launches based on PlayStation & Xbox account region.
 */

class CountdownEngine {
  constructor() {
    // DOM Elements
    this.daysEl = document.getElementById('valDays');
    this.hoursEl = document.getElementById('valHours');
    this.minutesEl = document.getElementById('valMinutes');
    this.secondsEl = document.getElementById('valSeconds');
    this.msEl = document.getElementById('valMs');
    this.targetDateDisplay = document.getElementById('targetDateDisplay');
    this.localTimeDisplay = document.getElementById('localTimeDisplay');
    this.progressFill = document.getElementById('progressFill');
    this.progressPercent = document.getElementById('progressPercent');
    this.statDaysSinceTrailer = document.getElementById('statDaysSinceTrailer');
    this.activeRegionBtnText = document.getElementById('activeRegionBtnText');
    this.selectRegionPreset = document.getElementById('selectRegionPreset');
    this.timezonesListGrid = document.getElementById('timezonesListGrid');
    this.inputTzSearch = document.getElementById('inputTzSearch');
    this.homeRegionsTrack = document.getElementById('homeRegionsTrack');

    // Featured regions to show directly on the home page track
    this.featuredHomeIds = ['nz', 'au', 'jp-kr', 'my-sg', 'in', 'ae', 'de-at-ch', 'uk-ie', 'ar-cl-br', 'us-ca', 'mx-gt-sv'];

    // Milestones
    this.TRAILER_1_DATE = new Date('2023-12-05T09:00:00-05:00').getTime();

    // 28 Launch Timezones worldwide
    this.regions = [
      { id: "nz", label: "New Zealand", endDate: "Wed, 18 Nov 2026 06:00:00 -0500", flag: "🇳🇿" },
      { id: "au", label: "Australia", endDate: "Wed, 18 Nov 2026 08:00:00 -0500", flag: "🇦🇺" },
      { id: "jp-kr", label: "Japan | South Korea", endDate: "Wed, 18 Nov 2026 10:00:00 -0500", flag: "🇯🇵 🇰🇷" },
      { id: "hk-tw", label: "Hong Kong | Taiwan", endDate: "Wed, 18 Nov 2026 11:00:00 -0500", flag: "🇭🇰 🇹🇼" },
      { id: "my-sg", label: "Malaysia | Singapore", endDate: "Wed, 18 Nov 2026 11:00:00 -0500", flag: "🇲🇾 🇸🇬" },
      { id: "id-th", label: "Indonesia | Thailand", endDate: "Wed, 18 Nov 2026 12:00:00 -0500", flag: "🇮🇩 🇹🇭" },
      { id: "in", label: "India", endDate: "Wed, 18 Nov 2026 13:30:00 -0500", flag: "🇮🇳" },
      { id: "ae", label: "United Arab Emirates", endDate: "Wed, 18 Nov 2026 15:00:00 -0500", flag: "🇦🇪" },
      { id: "sa-tr", label: "Saudi Arabia | Turkey", endDate: "Wed, 18 Nov 2026 16:00:00 -0500", flag: "🇸🇦 🇹🇷" },
      { id: "bg-cy-fi", label: "Bulgaria | Cyprus | Finland", endDate: "Wed, 18 Nov 2026 17:00:00 -0500", flag: "🇧🇬 🇨🇾 🇫🇮" },
      { id: "gr-ro", label: "Greece | Romania", endDate: "Wed, 18 Nov 2026 17:00:00 -0500", flag: "🇬🇷 🇷🇴" },
      { id: "za", label: "South Africa", endDate: "Wed, 18 Nov 2026 17:00:00 -0500", flag: "🇿🇦" },
      { id: "ua", label: "Ukraine", endDate: "Wed, 18 Nov 2026 17:00:00 -0500", flag: "🇺🇦" },
      { id: "de-at-ch", label: "Austria | Germany | Switzerland", endDate: "Wed, 18 Nov 2026 18:00:00 -0500", flag: "🇦🇹 🇩🇪 🇨🇭" },
      { id: "be-nl-lu", label: "Belgium | Netherlands | Luxembourg", endDate: "Wed, 18 Nov 2026 18:00:00 -0500", flag: "🇧🇪 🇳🇱 🇱🇺" },
      { id: "dk-no-se", label: "Denmark | Norway | Sweden", endDate: "Wed, 18 Nov 2026 18:00:00 -0500", flag: "🇩🇰 🇳🇴 🇸🇪" },
      { id: "pl-sk-cz", label: "Poland | Slovakia | Czech Republic", endDate: "Wed, 18 Nov 2026 18:00:00 -0500", flag: "🇵🇱 🇸🇰 🇨🇿" },
      { id: "fr-es-it", label: "France | Spain | Italy | Malta", endDate: "Wed, 18 Nov 2026 18:00:00 -0500", flag: "🇫🇷 🇪🇸 🇮🇹 🇲🇹" },
      { id: "hr-si-hu", label: "Croatia | Slovenia | Hungary", endDate: "Wed, 18 Nov 2026 18:00:00 -0500", flag: "🇭🇷 🇸🇮 🇭🇺" },
      { id: "is-pt", label: "Iceland | Portugal", endDate: "Wed, 18 Nov 2026 19:00:00 -0500", flag: "🇮🇸 🇵🇹" },
      { id: "uk-ie", label: "Ireland | United Kingdom", endDate: "Wed, 18 Nov 2026 19:00:00 -0500", flag: "🇮🇪 🇬🇧" },
      { id: "ar-cl-br", label: "Argentina | Chile | Brazil", endDate: "Wed, 18 Nov 2026 22:00:00 -0500", flag: "🇦🇷 🇨🇱 🇧🇷" },
      { id: "py-uy", label: "Paraguay | Uruguay", endDate: "Wed, 18 Nov 2026 22:00:00 -0500", flag: "🇵🇾 🇺🇾" },
      { id: "bo", label: "Bolivia", endDate: "Wed, 18 Nov 2026 23:00:00 -0500", flag: "🇧🇴" },
      { id: "us-ca", label: "United States | Canada", endDate: "Thu, 19 Nov 2026 00:00:00 -0500", flag: "🇺🇸 🇨🇦" },
      { id: "co-ec-pa-pe", label: "Colombia | Ecuador | Panama | Peru", endDate: "Thu, 19 Nov 2026 00:00:00 -0500", flag: "🇨🇴 🇪🇨 🇵🇦 🇵🇪" },
      { id: "mx-gt-sv", label: "Mexico | Guatemala | El Salvador", endDate: "Thu, 19 Nov 2026 01:00:00 -0500", flag: "🇲🇽 🇬🇹 🇸🇻" },
      { id: "cr-hn-ni", label: "Costa Rica | Honduras | Nicaragua", endDate: "Thu, 19 Nov 2026 01:00:00 -0500", flag: "🇨🇷 🇭🇳 🇳🇮" }
    ];

    // Compute timestamps for all regions
    this.regions.forEach(r => {
      r.timestamp = new Date(r.endDate).getTime();
    });

    // Default to United States | Canada
    this.currentRegionId = localStorage.getItem('gta6_active_region') || 'us-ca';
    this.customTimestamp = localStorage.getItem('gta6_custom_target') ? parseInt(localStorage.getItem('gta6_custom_target'), 10) : null;

    this.targetTimestamp = this.resolveTargetTimestamp();
    this.showMilliseconds = true;
    this.animFrameId = null;

    this.init();
  }

  init() {
    this.populateRegionSelect();
    this.renderHomeRegionsTrack();
    this.renderTimezonesGrid();
    this.bindSearch();
    this.calculateStats();
    this.updateTargetDisplay();
    this.tick();
  }

  populateRegionSelect() {
    if (!this.selectRegionPreset) return;
    this.selectRegionPreset.innerHTML = '';

    this.regions.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.id;
      opt.textContent = `${r.flag} ${r.label} (Launch: ${r.endDate.replace(' -0500', ' EST')})`;
      if (r.id === this.currentRegionId) opt.selected = true;
      this.selectRegionPreset.appendChild(opt);
    });

    const customOpt = document.createElement('option');
    customOpt.value = 'custom';
    customOpt.textContent = '⚙️ Custom Date & Time...';
    if (this.currentRegionId === 'custom') customOpt.selected = true;
    this.selectRegionPreset.appendChild(customOpt);

    this.selectRegionPreset.addEventListener('change', (e) => {
      if (e.target.value === 'custom') {
        const row = document.getElementById('customDateRow');
        if (row) row.classList.remove('hidden');
      } else {
        const row = document.getElementById('customDateRow');
        if (row) row.classList.add('hidden');
        this.selectRegion(e.target.value);
      }
    });
  }

  renderTimezonesGrid() {
    if (!this.timezonesListGrid) return;
    this.timezonesListGrid.innerHTML = '';

    const now = Date.now();

    this.regions.forEach(r => {
      const card = document.createElement('div');
      card.className = `tz-card ${r.id === this.currentRegionId ? 'active-tz' : ''}`;
      card.dataset.id = r.id;
      card.dataset.label = r.label.toLowerCase();

      const diff = r.timestamp - now;
      let timeStr = 'Released!';
      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        timeStr = `${d}d ${h}h ${m}m ${s}s`;
      }

      card.innerHTML = `
        <div class="tz-card-header">
          <span class="tz-card-flag">${r.flag}</span>
          <h4 class="tz-card-title">${r.label}</h4>
        </div>
        <div class="tz-card-time" id="tz-time-${r.id}">${timeStr}</div>
        <div class="tz-card-footer">
          <span>Midnight Local Release</span>
          <button class="btn-select-tz">${r.id === this.currentRegionId ? 'Active Region' : 'Select Region'}</button>
        </div>
      `;

      card.addEventListener('click', () => {
        this.selectRegion(r.id);
        const modal = document.getElementById('timezonesModal');
        if (modal) modal.classList.add('hidden');
      });

      this.timezonesListGrid.appendChild(card);
    });
  }

  renderHomeRegionsTrack() {
    if (!this.homeRegionsTrack) return;
    this.homeRegionsTrack.innerHTML = '';

    const now = Date.now();
    const featuredList = this.regions.filter(r => this.featuredHomeIds.includes(r.id));

    featuredList.forEach(r => {
      const card = document.createElement('div');
      card.className = `home-country-card ${r.id === this.currentRegionId ? 'active-card' : ''}`;
      card.id = `home-card-${r.id}`;

      const diff = r.timestamp - now;
      let timeStr = 'Released!';
      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        timeStr = d > 0 ? `${d}d ${h}h ${m}m ${s}s` : `${h}h ${m}m ${s}s`;
      }

      // Short label
      const shortName = r.label.split('|')[0].trim();
      const badgeHtml = r.id === 'nz' ? '<span class="home-country-badge" style="background:#00f0ff; color:#000;">1ST UNLOCK</span>' : (r.id === this.currentRegionId ? '<span class="home-country-badge">ACTIVE</span>' : '');

      card.innerHTML = `
        <span class="home-country-flag">${r.flag}</span>
        <div class="home-country-meta">
          <div class="home-country-name-row">
            <span class="home-country-name">${shortName}</span>
            ${badgeHtml}
          </div>
          <span class="home-country-timer" id="home-card-time-${r.id}">${timeStr}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        this.selectRegion(r.id);
      });

      this.homeRegionsTrack.appendChild(card);
    });

    // Also link "View All 28 Regions" button
    const btnViewAll = document.getElementById('btnViewAllTimezones');
    if (btnViewAll) {
      btnViewAll.addEventListener('click', () => {
        const modal = document.getElementById('timezonesModal');
        if (modal) modal.classList.remove('hidden');
      });
    }
  }

  updateHomeRegionsTrack(now) {
    this.featuredHomeIds.forEach(id => {
      const r = this.regions.find(item => item.id === id);
      const timerEl = document.getElementById(`home-card-time-${id}`);
      if (r && timerEl) {
        const diff = r.timestamp - now;
        if (diff <= 0) {
          timerEl.textContent = '🚀 LAUNCHED!';
          timerEl.style.color = '#00f0ff';
        } else {
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          timerEl.textContent = d > 0 ? `${d}d ${h}h ${m}m ${s}s` : `${h}h ${m}m ${s}s`;
        }
      }
    });
  }

  bindSearch() {
    if (!this.inputTzSearch) return;
    this.inputTzSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const cards = this.timezonesListGrid.querySelectorAll('.tz-card');
      cards.forEach(c => {
        const match = c.dataset.label.includes(q);
        c.style.display = match ? 'flex' : 'none';
      });
    });
  }

  resolveTargetTimestamp() {
    // Check URL parameters first for OBS source customization (?region=nz or ?target=...)
    const urlParams = new URLSearchParams(window.location.search);
    const urlRegion = urlParams.get('region');
    if (urlRegion) {
      const match = this.regions.find(r => r.id === urlRegion.toLowerCase());
      if (match) {
        this.currentRegionId = match.id;
        return match.timestamp;
      }
    }

    const urlTarget = urlParams.get('target');
    if (urlTarget) {
      const parsed = new Date(urlTarget).getTime();
      if (!isNaN(parsed)) return parsed;
    }

    if (this.currentRegionId === 'custom' && this.customTimestamp) {
      return this.customTimestamp;
    }

    const reg = this.regions.find(r => r.id === this.currentRegionId);
    if (reg) return reg.timestamp;

    // Default to US & Canada
    return new Date("Thu, 19 Nov 2026 00:00:00 -0500").getTime();
  }

  selectRegion(regionId) {
    this.currentRegionId = regionId;
    localStorage.setItem('gta6_active_region', regionId);

    const reg = this.regions.find(r => r.id === regionId);
    if (reg) {
      this.targetTimestamp = reg.timestamp;
      if (this.selectRegionPreset) this.selectRegionPreset.value = regionId;
    }

    this.updateTargetDisplay();
    this.renderHomeRegionsTrack();
    this.renderTimezonesGrid();
  }

  setCustomDate(dateString) {
    const parsed = new Date(dateString).getTime();
    if (!isNaN(parsed)) {
      this.currentRegionId = 'custom';
      this.customTimestamp = parsed;
      this.targetTimestamp = parsed;
      localStorage.setItem('gta6_active_region', 'custom');
      localStorage.setItem('gta6_custom_target', parsed.toString());
      this.updateTargetDisplay();
    }
  }

  updateTargetDisplay() {
    if (!this.targetDateDisplay) return;

    if (this.currentRegionId === 'custom' && this.customTimestamp) {
      const d = new Date(this.customTimestamp);
      this.targetDateDisplay.textContent = `Custom: ${d.toLocaleString()}`;
      if (this.activeRegionBtnText) this.activeRegionBtnText.textContent = 'Custom Region';
    } else {
      const reg = this.regions.find(r => r.id === this.currentRegionId);
      if (reg) {
        this.targetDateDisplay.textContent = `${reg.label} • Release: Nov 19, 2026 Midnight`;
        if (this.activeRegionBtnText) this.activeRegionBtnText.textContent = `${reg.flag} ${reg.label.split('|')[0].trim()}`;
      }
    }
  }

  calculateStats() {
    const now = Date.now();
    const diffTrailer = Math.max(0, now - this.TRAILER_1_DATE);
    const daysSince = Math.floor(diffTrailer / (1000 * 60 * 60 * 24));
    if (this.statDaysSinceTrailer) {
      this.statDaysSinceTrailer.textContent = daysSince.toLocaleString();
    }
  }

  tick() {
    const now = Date.now();
    let distance = this.targetTimestamp - now;

    if (distance <= 0) {
      distance = 0;
      this.daysEl.textContent = '000';
      this.hoursEl.textContent = '00';
      this.minutesEl.textContent = '00';
      this.secondsEl.textContent = '00';
      if (this.msEl) this.msEl.textContent = '000';

      const tagline = document.getElementById('taglineText');
      if (tagline) tagline.textContent = '🎉 GRAND THEFT AUTO VI IS NOW LIVE IN THIS REGION! 🎉';
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const milliseconds = Math.floor(distance % 1000);

      this.daysEl.textContent = days.toString().padStart(3, '0');
      this.hoursEl.textContent = hours.toString().padStart(2, '0');
      this.minutesEl.textContent = minutes.toString().padStart(2, '0');
      this.secondsEl.textContent = seconds.toString().padStart(2, '0');

      if (this.msEl && this.showMilliseconds) {
        this.msEl.textContent = milliseconds.toString().padStart(3, '0');
      }

      const tagline = document.getElementById('taglineText');
      if (tagline) tagline.textContent = 'OFFICIAL LAUNCH COUNTDOWN • STATE OF LEONIDA';
    }

    // Milestone Progress Bar (Trailer 1 to Nov 19, 2026)
    const totalSpan = this.targetTimestamp - this.TRAILER_1_DATE;
    const elapsedSpan = now - this.TRAILER_1_DATE;
    let pct = (elapsedSpan / totalSpan) * 100;
    pct = Math.min(100, Math.max(0, pct));

    if (this.progressFill) this.progressFill.style.width = `${pct.toFixed(2)}%`;
    if (this.progressPercent) this.progressPercent.textContent = `${pct.toFixed(1)}% Journey Completed`;

    // Local Time Clock
    if (this.localTimeDisplay) {
      const nowObj = new Date();
      this.localTimeDisplay.textContent = nowObj.toLocaleTimeString() + ' LOCAL TIME';
    }

    // Update home page country timers every ~500ms
    if (Math.floor(now / 500) % 2 === 0) {
      this.updateHomeRegionsTrack(now);
    }

    // Update modal cards countdowns once every ~30 frames
    if (Math.floor(now / 500) % 2 === 0 && document.getElementById('timezonesModal') && !document.getElementById('timezonesModal').classList.contains('hidden')) {
      this.updateModalCards(now);
    }

    this.animFrameId = requestAnimationFrame(() => this.tick());
  }

  updateModalCards(now) {
    this.regions.forEach(r => {
      const el = document.getElementById(`tz-time-${r.id}`);
      if (el) {
        const diff = r.timestamp - now;
        if (diff <= 0) {
          el.textContent = '🚀 LAUNCHED!';
          el.style.color = '#00f0ff';
        } else {
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const s = Math.floor((diff % (1000 * 60)) / 1000);
          el.textContent = `${d}d ${h}h ${m}m ${s}s`;
        }
      }
    });
  }

  toggleMilliseconds(visible) {
    this.showMilliseconds = visible;
    const msSeg = document.getElementById('msSegment');
    const msSep = document.querySelector('.ms-separator');
    if (msSeg) msSeg.style.display = visible ? 'flex' : 'none';
    if (msSep) msSep.style.display = visible ? 'block' : 'none';
  }
}

// Global countdown instance
let countdownEngine = null;
window.addEventListener('DOMContentLoaded', () => {
  countdownEngine = new CountdownEngine();
});

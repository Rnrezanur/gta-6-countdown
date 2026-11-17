/**
 * GTA VI Live Countdown - Streamer & OBS Integration Suite
 * Manages clean mode, fullscreen, URL parameters for OBS, idle auto-hide, hotkeys, and settings modal.
 */

class StreamerTools {
  constructor() {
    this.isCleanMode = false;
    this.idleTimer = null;
    this.themes = ['sunset', 'grid', 'night', 'chroma'];
    this.currentThemeIndex = 0;

    // DOM References
    this.btnCleanMode = document.getElementById('btnCleanMode');
    this.btnExitClean = document.getElementById('btnExitClean');
    this.btnFullscreen = document.getElementById('btnFullscreen');
    this.btnQuickTheme = document.getElementById('btnQuickTheme');
    this.themeNameDisplay = document.getElementById('themeNameDisplay');
    this.btnSettings = document.getElementById('btnSettings');
    this.settingsModal = document.getElementById('settingsModal');
    this.btnCloseModal = document.getElementById('btnCloseModal');

    // Launch Timezones Modal
    this.btnTimezones = document.getElementById('btnTimezones');
    this.btnCloseTimezones = document.getElementById('btnCloseTimezones');
    this.timezonesModal = document.getElementById('timezonesModal');

    // Settings elements
    this.selectRegionPreset = document.getElementById('selectRegionPreset');
    this.customDateRow = document.getElementById('customDateRow');
    this.inputCustomDate = document.getElementById('inputCustomDate');
    this.themeOptionBtns = document.querySelectorAll('.btn-theme-opt');
    this.customVideoInputRow = document.getElementById('customVideoInputRow');
    this.inputCustomVideo = document.getElementById('inputCustomVideo');
    this.btnApplyVideo = document.getElementById('btnApplyVideo');

    // Toggles
    this.toggleMilliseconds = document.getElementById('toggleMilliseconds');
    this.toggleProgress = document.getElementById('toggleProgress');
    this.toggleHomeRegions = document.getElementById('toggleHomeRegions');
    this.toggleStats = document.getElementById('toggleStats');
    this.toggleScanlines = document.getElementById('toggleScanlines');
    this.toggleTicker = document.getElementById('toggleTicker');
    this.toggleSubGoal = document.getElementById('toggleSubGoal');

    // Ticker & Goal
    this.inputTickerText = document.getElementById('inputTickerText');
    this.btnSaveTicker = document.getElementById('btnSaveTicker');
    this.tickerText = document.getElementById('tickerText');
    this.subGoalWidget = document.getElementById('subGoalWidget');
    this.subGoalText = document.getElementById('subGoalText');
    this.subGoalFill = document.getElementById('subGoalFill');
    this.inputGoalTitle = document.getElementById('inputGoalTitle');
    this.inputGoalCurrent = document.getElementById('inputGoalCurrent');
    this.inputGoalTarget = document.getElementById('inputGoalTarget');

    // OBS URL Copy
    this.obsUrlCopy = document.getElementById('obsUrlCopy');
    this.btnCopyObsUrl = document.getElementById('btnCopyObsUrl');

    this.init();
  }

  init() {
    this.bindEvents();
    this.bindHotkeys();
    this.initIdleCursorHider();
    this.parseUrlParameters();
    this.loadSavedPreferences();
    this.updateObsUrlDisplay();
  }

  bindEvents() {
    // Clean Mode Toggle
    if (this.btnCleanMode) {
      this.btnCleanMode.addEventListener('click', () => this.toggleCleanMode());
    }
    if (this.btnExitClean) {
      this.btnExitClean.addEventListener('click', () => this.toggleCleanMode(false));
    }

    // Fullscreen Toggle
    if (this.btnFullscreen) {
      this.btnFullscreen.addEventListener('click', () => this.toggleFullscreen());
    }

    // Quick Theme Switcher Button
    if (this.btnQuickTheme) {
      this.btnQuickTheme.addEventListener('click', () => this.cycleNextTheme());
    }

    // Settings Modal
    if (this.btnSettings) {
      this.btnSettings.addEventListener('click', () => this.openSettings());
    }
    if (this.btnCloseModal) {
      this.btnCloseModal.addEventListener('click', () => this.closeSettings());
    }
    if (this.settingsModal) {
      this.settingsModal.addEventListener('click', (e) => {
        if (e.target === this.settingsModal) this.closeSettings();
      });
    }

    // Launch Timezones Modal
    if (this.btnTimezones) {
      this.btnTimezones.addEventListener('click', () => this.openTimezones());
    }
    if (this.btnCloseTimezones) {
      this.btnCloseTimezones.addEventListener('click', () => this.closeTimezones());
    }
    if (this.timezonesModal) {
      this.timezonesModal.addEventListener('click', (e) => {
        if (e.target === this.timezonesModal) this.closeTimezones();
      });
    }

    if (this.inputCustomDate) {
      this.inputCustomDate.addEventListener('change', (e) => {
        if (window.countdownEngine && e.target.value) {
          window.countdownEngine.setCustomDate(e.target.value);
        }
      });
    }

    // Background selection buttons
    this.themeOptionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.themeOptionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const theme = btn.dataset.theme;

        if (theme === 'custom-video') {
          this.customVideoInputRow.classList.remove('hidden');
        } else {
          this.customVideoInputRow.classList.add('hidden');
        }

        this.applyTheme(theme);
      });
    });

    if (this.btnApplyVideo && this.inputCustomVideo) {
      this.btnApplyVideo.addEventListener('click', () => {
        const url = this.inputCustomVideo.value.trim();
        if (url && window.bgEngine) {
          window.bgEngine.setTheme('custom-video', url);
        }
      });
    }

    // Toggles
    if (this.toggleMilliseconds) {
      this.toggleMilliseconds.addEventListener('change', (e) => {
        if (window.countdownEngine) window.countdownEngine.toggleMilliseconds(e.target.checked);
      });
    }

    if (this.toggleProgress) {
      this.toggleProgress.addEventListener('change', (e) => {
        const el = document.getElementById('milestoneContainer');
        if (el) el.style.display = e.target.checked ? 'block' : 'none';
      });
    }

    if (this.toggleHomeRegions) {
      this.toggleHomeRegions.addEventListener('change', (e) => {
        const el = document.getElementById('homeRegionsSection');
        if (el) el.style.display = e.target.checked ? 'flex' : 'none';
      });
    }

    if (this.toggleStats) {
      this.toggleStats.addEventListener('change', (e) => {
        const el = document.getElementById('statsRow');
        if (el) el.style.display = e.target.checked ? 'flex' : 'none';
      });
    }

    if (this.toggleScanlines) {
      this.toggleScanlines.addEventListener('change', (e) => {
        const el = document.getElementById('scanlinesOverlay');
        if (el) el.style.opacity = e.target.checked ? '0.45' : '0';
      });
    }

    if (this.toggleTicker) {
      this.toggleTicker.addEventListener('change', (e) => {
        const el = document.getElementById('bottom-bar');
        if (el) el.style.display = e.target.checked ? 'flex' : 'none';
      });
    }

    if (this.toggleSubGoal) {
      this.toggleSubGoal.addEventListener('change', (e) => {
        if (this.subGoalWidget) {
          this.subGoalWidget.classList.toggle('hidden', !e.target.checked);
        }
      });
    }

    // Ticker Update
    if (this.btnSaveTicker && this.inputTickerText && this.tickerText) {
      this.btnSaveTicker.addEventListener('click', () => {
        const txt = this.inputTickerText.value.trim();
        if (txt) {
          this.tickerText.textContent = txt;
          localStorage.setItem('gta6_custom_ticker', txt);
        }
      });
    }

    // Goal calculation update
    const updateGoal = () => {
      const cur = parseInt(this.inputGoalCurrent.value, 10) || 0;
      const tar = parseInt(this.inputGoalTarget.value, 10) || 1;
      const title = this.inputGoalTitle.value || 'STREAM GOAL';
      const pct = Math.min(100, Math.max(0, (cur / tar) * 100));

      if (this.subGoalText) this.subGoalText.textContent = `${cur.toLocaleString()} / ${tar.toLocaleString()} Subs`;
      if (this.subGoalFill) this.subGoalFill.style.width = `${pct}%`;
    };

    if (this.inputGoalCurrent) this.inputGoalCurrent.addEventListener('input', updateGoal);
    if (this.inputGoalTarget) this.inputGoalTarget.addEventListener('input', updateGoal);
    if (this.inputGoalTitle) this.inputGoalTitle.addEventListener('input', updateGoal);

    // Copy OBS URL Button
    if (this.btnCopyObsUrl) {
      this.btnCopyObsUrl.addEventListener('click', () => {
        const url = this.obsUrlCopy.textContent;
        navigator.clipboard.writeText(url).then(() => {
          this.btnCopyObsUrl.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
          setTimeout(() => {
            this.btnCopyObsUrl.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
          }, 2000);
        });
      });
    }
  }

  bindHotkeys() {
    window.addEventListener('keydown', (e) => {
      // Don't trigger shortcuts if user is typing in inputs
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

      switch (e.key.toLowerCase()) {
        case 'h':
          this.toggleCleanMode();
          break;
        case 'f':
          this.toggleFullscreen();
          break;
        case 'b':
          this.cycleNextTheme();
          break;
        case 's':
          this.toggleSettings();
          break;
        case 't':
          this.toggleTimezones();
          break;
        case 'escape':
          this.closeSettings();
          this.closeTimezones();
          if (this.isCleanMode) this.toggleCleanMode(false);
          break;
      }
    });
  }

  initIdleCursorHider() {
    const resetTimer = () => {
      document.body.style.cursor = 'default';
      clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => {
        // Only hide cursor if in clean mode or fullscreen
        if (this.isCleanMode || document.fullscreenElement) {
          document.body.style.cursor = 'none';
        }
      }, 3500);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('mousedown', resetTimer);
    window.addEventListener('keydown', resetTimer);
  }

  toggleCleanMode(forceState = null) {
    this.isCleanMode = forceState !== null ? forceState : !this.isCleanMode;
    document.body.classList.toggle('clean-stream-mode', this.isCleanMode);

    if (this.btnCleanMode) {
      this.btnCleanMode.classList.toggle('active', this.isCleanMode);
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
      const icon = document.getElementById('fullscreenIcon');
      if (icon) icon.className = 'fa-solid fa-compress';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      const icon = document.getElementById('fullscreenIcon');
      if (icon) icon.className = 'fa-solid fa-expand';
    }
  }

  cycleNextTheme() {
    this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
    const nextTheme = this.themes[this.currentThemeIndex];
    this.applyTheme(nextTheme);

    // Update settings modal active state
    this.themeOptionBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === nextTheme);
    });
  }

  applyTheme(theme) {
    if (window.bgEngine) {
      window.bgEngine.setTheme(theme);
    }
    if (this.themeNameDisplay) {
      const names = {
        sunset: 'Sunset',
        grid: '3D Grid',
        night: 'Starry',
        chroma: 'Chroma OBS',
        'custom-video': 'Custom'
      };
      this.themeNameDisplay.textContent = names[theme] || theme;
    }
    this.updateObsUrlDisplay();
  }

  openSettings() {
    if (this.settingsModal) this.settingsModal.classList.remove('hidden');
  }

  closeSettings() {
    if (this.settingsModal) this.settingsModal.classList.add('hidden');
  }

  toggleSettings() {
    if (this.settingsModal) {
      if (this.settingsModal.classList.contains('hidden')) {
        this.openSettings();
      } else {
        this.closeSettings();
      }
    }
  }

  openTimezones() {
    if (this.timezonesModal) {
      this.timezonesModal.classList.remove('hidden');
      if (window.countdownEngine) window.countdownEngine.renderTimezonesGrid();
    }
  }

  closeTimezones() {
    if (this.timezonesModal) this.timezonesModal.classList.add('hidden');
  }

  toggleTimezones() {
    if (this.timezonesModal) {
      if (this.timezonesModal.classList.contains('hidden')) {
        this.openTimezones();
      } else {
        this.closeTimezones();
      }
    }
  }

  parseUrlParameters() {
    const params = new URLSearchParams(window.location.search);

    // Clean mode (?clean=1 or ?clean=true)
    if (params.get('clean') === '1' || params.get('clean') === 'true') {
      this.toggleCleanMode(true);
    }

    // Theme (?theme=sunset|grid|night|chroma)
    const themeParam = params.get('theme');
    if (themeParam && ['sunset', 'grid', 'night', 'chroma'].includes(themeParam)) {
      this.applyTheme(themeParam);
    }

    // Ticker (?ticker=0 to hide)
    if (params.get('ticker') === '0' || params.get('ticker') === 'false') {
      const el = document.getElementById('bottom-bar');
      if (el) el.style.display = 'none';
      if (this.toggleTicker) this.toggleTicker.checked = false;
    }

    // Milliseconds (?ms=0 to disable)
    if (params.get('ms') === '0' || params.get('ms') === 'false') {
      if (window.countdownEngine) window.countdownEngine.toggleMilliseconds(false);
      if (this.toggleMilliseconds) this.toggleMilliseconds.checked = false;
    }

    // Sub Goal (?subgoal=1)
    if (params.get('subgoal') === '1' || params.get('subgoal') === 'true') {
      if (this.subGoalWidget) this.subGoalWidget.classList.remove('hidden');
      if (this.toggleSubGoal) this.toggleSubGoal.checked = true;
    }
  }

  loadSavedPreferences() {
    const savedTicker = localStorage.getItem('gta6_custom_ticker');
    if (savedTicker && this.tickerText && this.inputTickerText) {
      this.tickerText.textContent = savedTicker;
      this.inputTickerText.value = savedTicker;
    }
  }

  updateObsUrlDisplay() {
    if (!this.obsUrlCopy) return;
    const base = window.location.origin + window.location.pathname;
    const currentTheme = window.bgEngine ? window.bgEngine.currentTheme : 'sunset';
    this.obsUrlCopy.textContent = `${base}?clean=1&theme=${currentTheme}`;
  }
}

// Global streamer tools instance
let streamerTools = null;
window.addEventListener('DOMContentLoaded', () => {
  streamerTools = new StreamerTools();
});

# 🌴 GTA VI Live Countdown - Vice City YouTube Stream Edition

[![Live Website](https://img.shields.io/badge/Live_Website-rnrezanur.github.io%2Fgta--6--countdown-ff007f?style=for-the-badge&logo=google-chrome&logoColor=white)](https://rnrezanur.github.io/gta-6-countdown/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Rnrezanur%2Fgta--6--countdown-00f0ff?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Rnrezanur/gta-6-countdown)

> **Live Website URL**: **[https://rnrezanur.github.io/gta-6-countdown/](https://rnrezanur.github.io/gta-6-countdown/)**

An ultra high-production, cinematic **Grand Theft Auto VI Countdown Website** specifically engineered for **YouTube Live Streams, OBS Studio, and fans worldwide**.

Featuring a mesmerizing 60-FPS animated procedural Vice City sunset background, 28 regional midnight launches, home page live country countdown cards, synthwave ambient radio, live millisecond counter, stream ticker, and one-click OBS clean mode.

---

## 🌟 Key Features

### 🎬 1. Cinematic Animated Backgrounds (Stream-Ready)
- **Vice City Sunset (Default)**: Dynamic Vice City twilight gradient, huge synthwave sun with horizontal blind cuts, silhouetted skyscraper skyline with blinking aviation beacons and lit windows, animated ocean reflection waves, and swaying palm trees responding to the ocean breeze.
- **Neon Grid 3D**: Infinite retro synthwave highway with perspective 3D vanishing grid.
- **Starry Vice**: Deep midnight starry sky with glowing moon and coastal reflections.
- **OBS Chroma Key Mode**: Pure `#00FF00` green screen mode for effortless OBS color keying over trailers or gameplay.
- **Custom Video / Media**: Load any direct MP4 or WebM video wallpaper loop.
- **Ambient Floating Dust Particles**: Subtle golden and magenta embers drifting across the screen for cinematic depth.

### ⏱️ 2. High-Precision Countdown & Stats
- **Days, Hours, Minutes, Seconds & Milliseconds**: Live ticking milliseconds create constant motion and energy on YouTube live streams so viewers know the stream is active.
- **Milestone Progress Tracker**: Calculates percentage completed from Trailer 1 (Dec 5, 2023) to launch.
- **Quick Date Presets**: Fall 2026, Holiday 2026, Late 2026, Spring 2027, or set any custom date & time in the settings.
- **Local Time Clock**: Keeps viewers synchronized across worldwide timezones.

### 🎥 3. Streamer & OBS Studio Integration
- **Clean Mode (`H`)**: Hides all navigation buttons, settings gears, and toolbars with one click or keypress, leaving only the pristine countdown and backdrop for your broadcast.
- **Auto-Hide Cursor**: Moving your mouse resets the cursor; after 3.5 seconds of inactivity, the cursor fades away so it never appears on stream.
- **Live News Ticker**: Customizable bottom marquee ticker. Display your YouTube channel name, sponsor messages, subscriber goals, or GTA 6 news!
- **Royalty-Free Synthwave Radio (`M`)**: Built-in generative Web Audio synthesizer playing warm retro synth chords. **100% royalty-free and copyright-strike-proof** for 24/7 YouTube live streams.
- **Subscriber Goal Widget**: Toggleable on-screen progress bar for "Road to 100k Subs".

---

## 🚀 How to Run & Stream in OBS Studio

### Option A: Open Locally in Your Browser
Simply double-click `index.html` in your file explorer to open it in Chrome, Edge, Brave, or Firefox.

Or run a quick local web server:
```powershell
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

---

### Option B: Add to OBS Studio (YouTube Live Stream)

1. Open **OBS Studio**.
2. Under **Sources**, click the **`+` (Add)** button and choose **Browser**.
3. Name it `GTA 6 Countdown` and click **OK**.
4. Configure the Browser Source settings:
   - **URL**: `http://localhost:8000/?clean=1&theme=sunset`
     *(Or check "Local file" and browse to `index.html`)*
   - **Width**: `1920`
   - **Height**: `1080`
   - **Custom CSS**: (leave default or blank)
   - Check **"Shutdown source when not visible"**
5. Click **OK**. Your stream will now have the clean, animated GTA 6 countdown!

#### 🛠️ Useful OBS URL Parameters:
| Parameter | Description | Example |
| :--- | :--- | :--- |
| `?clean=1` | Removes all UI buttons automatically | `?clean=1` |
| `?theme=` | Sets background: `sunset`, `grid`, `night`, `chroma` | `?theme=sunset` |
| `?ticker=0` | Hides the bottom news ticker | `?ticker=0` |
| `?ms=0` | Disables milliseconds | `?ms=0` |
| `?subgoal=1` | Shows subscriber goal bar | `?subgoal=1` |
| `?target=` | Overrides target date | `?target=2026-09-18T00:00:00` |

---

## ⌨️ Streamer Hotkeys

| Key | Action |
| :---: | :--- |
| **`H`** | Toggle Clean Stream Mode (hides/shows all HUD buttons) |
| **`F`** | Toggle Fullscreen Mode |
| **`M`** | Toggle Royalty-Free Synthwave Ambient Radio |
| **`B`** | Cycle through Background Themes |
| **`S`** | Open Settings Modal |
| **`Esc`** | Close Settings Modal / Exit Clean Mode |

---

## 🌐 How to Host Online (So Viewers Can Visit)

You can host this website completely free in under 60 seconds using:
- **GitHub Pages**: Push this folder to a GitHub repository, go to `Settings > Pages`, and select `main` branch.
- **Vercel / Netlify**: Drag and drop the `GTA 6 count down` folder onto [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com) for a free live `.app` URL to paste in your YouTube stream description!

---

*Grand Theft Auto, GTA VI, and Vice City are trademarks of Rockstar Games & Take-Two Interactive. This countdown project is a fan-made creation designed for the streaming community.*

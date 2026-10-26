# Polyend Tracker Community Edition - Theme & Font Editor

[![Deploy to GitHub Pages](https://github.com/polyend/tracker-theme-editor/actions/workflows/deploy.yml/badge.svg)](https://polyend.github.io/tracker-theme-editor/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Welcome to the official web-based visual **Theme Editor** and **Font Editor** for the **[Polyend Tracker Community Edition (CE)](https://github.com/polyend/tracker-ce)** firmware.

Design, preview, and export custom `.json` color themes and convert standard `.ttf`/`.otf` fonts into hardware-ready `.ptfont` packages directly in your browser.

- **Live Web App:** **[https://polyend.github.io/tracker-theme-editor/](https://polyend.github.io/tracker-theme-editor/)**
- **Polyend Tracker CE Firmware Repository:** **[https://github.com/polyend/tracker-ce](https://github.com/polyend/tracker-ce)**
- **Firmware Custom Themes & Fonts Documentation:** **[`docs/custom_themes_and_fonts.md`](https://github.com/polyend/tracker-ce/blob/main/docs/custom_themes_and_fonts.md)**

---

> **⚠️ Disclaimer: Provided "AS IS" Without Official Support**
>
> The Polyend Tracker Community Edition firmware and this companion Theme & Font Editor are provided **"AS IS"**, without warranty of any kind, express or implied.
>
> **Polyend has no obligation to provide technical support, maintenance, updates, or bug fixes for this open-source project or custom user-created themes and fonts.** Use of custom firmware, themes, and fonts is entirely at your own risk.
>
> - **Community Discussions & Peer Help:** Visit **[Polyend Backstage](https://backstage.polyend.com/)** or join the unofficial Polyend Tracker Discord **[The Tracker Overflow](https://discord.com/invite/uEPTnwckJV)** to share themes, fonts, and collaborate with other community members and developers.
> - **Out-of-Warranty Hardware Repairs:** If you need paid out-of-warranty hardware servicing for your Polyend Tracker, please see **[How to contact the Polyend Customer Support](https://backstage.polyend.com/t/how-to-contact-the-polyend-customer-support/15510)**.

---

## Features

- **Real-Time 800×480 FT812 LCD Preview**: Accurately simulates the Polyend Tracker hardware display in real time as you adjust colors and typography.
- **Multi-Screen & Overlay Simulation**: Switch seamlessly between **Pattern**, **Song**, **Sample Loader**, **Sample Editor** (Waveform), **Notes Grid**, and **Config** screens, plus toggle **Record Mode**, **Instruments Popup**, **Playback Playhead**, and **Mini Menu** overlays.
- **Click-to-Inspect Color Picker**: Click directly on any UI element on the simulated Tracker screen (notes, instruments, FX columns, playhead, top bar, buttons, waveform, slice markers) to automatically expand and highlight its corresponding color key in the sidebar, or click any key in the sidebar to flash its location on screen.
- **Built-in Theme Presets**: Start from 14 curated presets including *Original*, *Monochrome*, *Amiga*, *Terminal Green (CRT Phosphor)*, *Bernstein Amber (Warm CRT)*, *Cyberpunk (Neon)*, *Solarized Dark*, *Darcula*, *Monokai*, *Retro NES*, *Retro Sega*, *High Contrast*, *Synthwave*, and *Crimson*.
- **1-Click JSON Import, Export & Copy**: Import existing `.json` theme files from your computer, copy the theme JSON to your clipboard, or click **Export Theme** to download a ready-to-use `.json` file for your SD card's `/Themes/` directory.
- **Browser-Based Font Editor (`.ttf`/`.otf` to `.ptfont`)**: Upload any TrueType (`.ttf`) or OpenType (`.otf`) font (with optional separate Bold font file) directly in your browser to preview all 5 hardware FT812 font sizes, test live on the simulated Tracker screen, and compile binary `.ptfont` packages with a single click.

---

## Local Development

If you want to run the Theme & Font Editor locally or contribute improvements:

### Prerequisites
- **Node.js** 18+ (Node 20 LTS recommended)
- **npm** 9+

### Commands

```bash
# Clone the repository
git clone https://github.com/polyend/tracker-theme-editor.git
cd tracker-theme-editor

# Install dependencies
npm install

# Start the local development server with hot-reload
npm run dev

# Type-check and build the production bundle into dist/
npm run build

# Preview the production build locally
npm run preview
```

---

## Installing Custom Themes & Fonts on Hardware

### Installing Themes (`/Themes/`)
1. Export your `.json` theme file from the **Theme Editor** (or pick a built-in preset from [`public/presets/`](public/presets/)).
2. Place your `.json` file in the `/Themes/` folder at the root of your Tracker's SD card:
   ```text
   SD Card
   └── Themes/
       ├── Amiga.json
       ├── BernsteinAmber.json
       ├── Cyberpunk.json
       ├── SolarizedDark.json
       ├── TerminalGreen.json
       └── MyCustomTheme.json
   ```
   *(If the `/Themes/` folder does not exist yet, the Tracker creates it automatically when you open the Config menu).*
3. On your Polyend Tracker, open **Config** (`Shift + Master` or via Menu), scroll to **Display theme**, and turn the jog wheel to select your theme.

### Installing Fonts (`/Fonts/`)
1. Open the **Font Editor** in the top navigation bar of the web app, load your `.ttf` or `.otf` font, and click **Convert & Download** to generate a `.ptfont` file.
2. Place your `.ptfont` file in the `/Fonts/` folder at the root of your Tracker's SD card:
   ```text
   SD Card
   └── Fonts/
       ├── Topaz.ptfont
       └── LowGothic.ptfont
   ```
3. In the **Config** menu, navigate to **Display font** and turn the jog wheel to cycle through `Original`, `New`, and your custom `.ptfont` packages.

---

## Technical Specifications & Reference

### File Naming & Capacity Limits
- **Extensions**: Theme files must end in `.json` (case-insensitive). Font packages must end in `.ptfont`.
- **Display Name**: The Tracker strips the file extension when displaying names in Config (`Cyberpunk.json` appears as `Cyberpunk`), up to **31 characters**.
- **Capacity**: Up to **29 custom themes** from `/Themes/` (32 total including `Original`, `Monochrome`, and `Anniversary`) and up to **30 custom fonts** from `/Fonts/` (32 total including `Original` and `New`).
- **Color Format**: Standard 6-digit hex strings prefixed with `#` (`#RRGGBB`, e.g., `"#FFAA25"`). Any omitted color key automatically inherits from the `"base"` theme (`"Original"`, `"Monochrome"`, or `"Anniversary"`).
- **FT812 Font Sizes**: `.ptfont` packages bundle 4-bit-per-pixel (`L4`) anti-aliased glyph bitmaps and metric tables across 5 hardware font slots: **Size 14 Regular**, **Size 17 Regular**, **Size 14 Bold**, **Size 17 Bold**, and **Size 12 Regular**.

### Theme JSON Key Reference

| Section | Keys | Description |
| :--- | :--- | :--- |
| **Root** | `name`, `base`, `background` | Theme name, fallback base theme, main screen background color. |
| **`topBar`** | `text`, `background`, `frame`, `text2` | Header / title bar colors. |
| **`songTimer`** | `text`, `background`, `frame`, `text2` | Song timer widget. |
| **`labels`** | `active`, `inactive`, `activeButton`, `inactiveButton`, `highlightedButton`, `redButton`, `performActiveTrack`, `performMutedTrack`, `defaultText` | Screen buttons, text labels, and performance indicators. |
| **`patternTracker`** | `trackName`, `background`, `note`, `instrument`, `fx1`, `fx2`, `inactiveNote`, `inactiveInstrument`, `inactiveFx1`, `inactiveFx2`, `selection`, `gridDivider`, `inactiveTrack`, `playhead`, `selectionText`, `verticalDivider`, `stepNumber`, `greenMode`, `activeTrack`, `trackEnd` | Main pattern sequencing grid. |
| **`songPlayer`** | `text`, `activeBlock`, `scrollbar`, `background`, `inactiveText`, `editMode`, `scrollbarBackground`, `playhead`, `emptyTrack`, `playheadActive` | Song arranger screen. |
| **`lists`** | `active`, `inactive`, `projectActive`, `sampleLoader`, `sampleLoaderInactive` | Scrollable lists (samples, projects, files). |
| **`bars`** | `active`, `inactive`, `sampleLoaderNormal`, `sampleLoaderFull` | Progress bars and memory/level meters. |
| **`popups`** | `stepTitle`, `stepBackground`, `stepDescription`, `note`, `noteKeyboard`, `dialog`, `progressPopup`, `keyboard`, `miniMenu` | Dialogs, keyboards, and overlays. |
| **`miniMenu`** | `text`, `boxBackground`, `selectedBox`, `background`, `frame`, `inactiveDot`, `activeDot` | Tracker Mini hardware Menu button overlay (4×3 modules grid). |
| **`waveform`** | `audio`, `background`, `progress`, `sliceMarker`, `activeSlice`, `slicePlayhead`, `granular`, `points` | Sample playback, sample editor, and granular screens. |
| **`accents`** | `white`, `red`, `orange`, `yellow`, `green`, `cyan`, `grey` | Primary accent palette colors. |

For complete firmware implementation details and memory footprint information, see the **[Custom Themes & Fonts Guide](https://github.com/polyend/tracker-ce/blob/main/docs/custom_themes_and_fonts.md)** in the `tracker-ce` repository.

---

## Polyend Tracker Open-Source Ecosystem

This repository is part of a growing open-source ecosystem around the Polyend Tracker family:

* **[`polyend/tracker-ce`](https://github.com/polyend/tracker-ce)**: Official **Polyend Tracker Community Edition** firmware, C++20 Open Synth SDK, and `.ptfx` Sample Editor plugin SDK for Original Tracker, Tracker+, and Tracker Mini.
* **[`polyend/tracker-theme-editor`](https://github.com/polyend/tracker-theme-editor)** ([Live Web App](https://polyend.github.io/tracker-theme-editor/)): Browser-based visual **Theme Editor** (`/Themes/*.json`) and **Font Editor** (TTF/OTF to `/Fonts/*.ptfont`) with a real-time 800×480 FT812 hardware screen simulator.
* **[`polyend/tracker-lib`](https://github.com/polyend/tracker-lib)**: Open-source library and tools for reading, writing, and inspecting Polyend Tracker project (`.mt`), pattern (`.mtp`), and instrument (`.pti`) files.
* **[Polyend Backstage Forum](https://backstage.polyend.com/)**: Community forum for sharing custom themes, fonts, `.ptfx` plugins, synth engines, and discussing workflows.
* **[The Tracker Overflow (Discord)](https://discord.com/invite/uEPTnwckJV)**: Unofficial Polyend Tracker Discord community where users and developers can connect, share creations, and collaborate.

---

## Contributing & License

Contributions, bug fixes, and new theme presets are welcome! Please read **[CONTRIBUTING.md](CONTRIBUTING.md)** before submitting a Pull Request.

Released under the **[MIT License](LICENSE)** — Copyright (c) Polyend.

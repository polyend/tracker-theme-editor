# Contributing to Polyend Tracker Theme & Font Editor

Thank you for your interest in contributing to the **Polyend Tracker Community Edition (CE) Theme & Font Editor**! Whether you are adding new preset themes, improving the 800×480 LCD screen simulator, or enhancing the `.ptfont` converter, community contributions are very welcome.

---

## Ways to Contribute

1. **Share Custom Themes**: Submit new built-in theme presets (`public/presets/`).
2. **UI & Simulator Enhancements**: Improve the visual accuracy of the simulated Tracker screens (Pattern, Song, Sample Loader, Sample Editor, Notes Grid, Config) or add usability improvements to the color picker and inspector.
3. **Font Editor Improvements**: Enhance TTF/OTF glyph rasterization, kerning/metric handling, or preview tools in the Font Editor.
4. **Bug Fixes & Documentation**: Fix UI bugs, improve accessibility, or clarify documentation.

---

## Development Setup

### Prerequisites
- **Node.js** 18+ (Node 20 LTS recommended)
- **npm** 9+

### Running Locally

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/polyend/tracker-theme-editor.git
   cd tracker-theme-editor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local Vite development server:
   ```bash
   npm run dev
   ```

4. Before submitting a Pull Request, verify that TypeScript type-checking and the production build succeed cleanly:
   ```bash
   npm run build
   ```

---

## Adding a New Built-in Theme Preset

If you would like to contribute a new theme preset to the editor:

1. Create your theme JSON file (using 6-digit `#RRGGBB` hex colors) in `public/presets/YourTheme.json`.
2. Register the preset in `public/presets/index.json`.
3. Test your theme across all simulated screens (**Pattern**, **Song**, **Sample Loader**, **Sample Editor**, **Notes Grid**, and **Config**) as well as overlays (**Record mode**, **Instruments popup**, **Playback playhead**, and **Mini Menu**) to ensure good contrast and readability.

---

## Pull Request Guidelines

- Keep Pull Requests focused on a single feature, fix, or theme addition.
- Ensure `npm run build` completes with zero TypeScript or Vite errors.
- Include screenshots of the Tracker preview screen when adding new themes or changing UI components.
- By submitting a contribution, you agree that your work will be licensed under the repository's [MIT License](LICENSE).

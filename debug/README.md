# Sandbox Environment for Debugging & Testing

This directory contains tools for debugging and testing the psychologist landing page locally.

## Overview

The sandbox provides:

- **Local development server** with live reload (via BrowserSync)
- **Performance monitoring** (Core Web Vitals: LCP, FID, CLS)
- **Accessibility testing** (axe‑core audit)
- **UX testing tools** (network throttling simulation, JavaScript toggle, color‑blindness simulation, mobile viewport)
- **Debugging dashboard** – a floating panel that shows metrics, logs, and controls.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the local server with live reload

```bash
npm start
```

This will start BrowserSync on `http://localhost:3000` (or the next available port) and open the landing page in your default browser. Any changes to HTML, CSS, or JS will trigger an automatic reload.

### 3. Enable the debug panel

Append `?debug=1` to the URL (e.g., `http://localhost:3000/?debug=1`). The debug panel will appear as a draggable window at the bottom‑right corner.

## Debug Panel Features

### Performance Tab
- Real‑time display of **LCP**, **FID**, and **CLS** using the [web‑vitals](https://github.com/GoogleChrome/web-vitals) library.
- Each metric is color‑coded (green = good, yellow = needs improvement, red = poor).
- Buttons to manually capture or reset metrics.

### Accessibility Tab
- Run an **axe‑core** accessibility audit with a single click.
- Shows violations and incomplete checks with descriptions and affected HTML elements.

### UX Tools Tab
- **Simulate slow network** – UI toggle (does not actually throttle; use BrowserSync’s built‑in throttle or DevTools for real throttling).
- **Disable JavaScript** – UI toggle (simulation only; reloads the page without JS if needed).
- **Emulate color blindness** – Apply CSS filters for protanopia, deuteranopia, or tritanopia.
- **Simulate mobile viewport** – Change the viewport meta tag to 375px width (refresh to reset).
- **Clear local storage & cache** – Clears `localStorage` and `sessionStorage`.

### Logs Tab
- Centralized log of all debug‑panel actions.
- Clear logs button.

## Using BrowserSync’s Built‑in Tools

While the server is running, you can also use BrowserSync’s own UI (accessible at `http://localhost:3001`) for:
- Network throttling (Fast 3G, Slow 3G, etc.)
- Remote debugging (sync clicks, scrolls across multiple devices)
- Viewing the page on different screen sizes.

## Notes & Limitations

- The debug panel loads **only when `?debug=1`** is present in the URL, ensuring it never appears in production.
- The performance metrics are captured automatically; they reflect the actual user experience as measured by the browser.
- Accessibility audits require an internet connection to load axe‑core from a CDN (unpkg). For offline use, you can host axe‑core locally.
- UX tools that modify the page (color‑blindness filters, viewport changes) are temporary and will be lost on refresh.
- The sandbox is intended for **local development only**. Do not deploy the debug scripts to a live site.

## Adding Custom Tests

You can extend the debug panel by editing `debug/debug‑panel.js`. The script is modular and you can add new tabs or functionality.

## Troubleshooting

- **Debug panel not appearing**: Check that the URL contains `?debug=1` and that the console does not show any script errors.
- **Performance metrics stuck at “—”**: Ensure the page has fully loaded; web‑vitals may take a few seconds to report.
- **axe‑core fails to load**: Verify your internet connection; you can also download axe‑core and serve it locally.

## Credits

- [BrowserSync](https://browsersync.io/)
- [web‑vitals](https://github.com/GoogleChrome/web-vitals)
- [axe‑core](https://github.com/dequelabs/axe-core)

## License

Part of the psychologist landing page project. See the main project for licensing information.
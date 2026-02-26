# Psychologist Landing Page – Psico‑Tuc

A professional, accessible, and performant landing page for a clinical psychologist (Lic. Florencia Daiana Lazo) based in San Miguel de Tucumán, Argentina.

## Overview

This project is a static website built with semantic HTML5, modern CSS, and vanilla JavaScript. It follows best practices for performance, accessibility (WCAG 2.1 AA), SEO, and user experience. The site is fully responsive, works offline via a service worker, and includes structured data for search engines.

## Project Structure

```
.
├── index.html              # Main landing page
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── robots.txt              # Robots directives
├── sitemap.xml             # Sitemap for search engines
├── sw.js                   # Service worker (offline caching)
├── css/
│   ├── critical.css        # Inlined critical CSS
│   └── main.css            # Full stylesheet (loaded asynchronously)
├── js/
│   └── main.js             # All interactive functionality
├── images/                 # Optimized images (WebP + JPEG fallbacks)
│   ├── hero-{size}.{ext}   # Hero images
│   ├── about-{size}.{ext}  # About section images
│   └── map-{size}.{ext}    # Location map images
├── debug/                  # Sandbox environment for testing
│   ├── debug‑panel.js      # Debug panel script
│   ├── README.md           # Sandbox documentation
│   └── test‑server.js      # Quick server test
├── plans/                  # Project planning documents
│   └── specification‑plan.md
└── .kilocode/              # Project‑specific rules (accessibility, style, etc.)
```

## Technologies

- **HTML5** – Semantic markup, ARIA attributes, microdata.
- **CSS3** – Custom properties (variables), flexbox, grid, mobile‑first media queries.
- **JavaScript** – ES6 modules, service worker, intersection observer, modal dialogs.
- **Tooling** – BrowserSync (local development), npm scripts.
- **Performance** – Critical CSS inlining, image optimization (WebP), lazy loading, font swapping.
- **Accessibility** – axe‑core audits, keyboard navigation, screen‑reader support.
- **SEO** – JSON‑LD structured data, meta tags, Open Graph, Twitter Cards.

## Development Setup

### Prerequisites

- Node.js (≥ 18) and npm (≥ 10)

### Installation

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

### Local Development Server

Start the live‑reload server:

```bash
npm start
```

This launches [BrowserSync](https://browsersync.io/) on `http://localhost:3000` (or the next available port). The server watches HTML, CSS, and JS files and automatically refreshes the browser on changes.

### Sandbox Environment

For debugging and testing UX/performance, the project includes a sandbox panel that can be activated by appending `?debug=1` to the URL (e.g., `http://localhost:3000/?debug=1`).

The sandbox provides:

- **Performance monitoring** – Real‑time Core Web Vitals (LCP, FID, CLS) via [web‑vitals](https://github.com/GoogleChrome/web-vitals).
- **Accessibility testing** – One‑click audit with [axe‑core](https://github.com/dequelabs/axe-core).
- **UX tools** – Network throttling simulation, JavaScript toggle, color‑blindness filters, mobile viewport emulation.
- **Debugging dashboard** – A draggable panel with logs and controls.

See [`debug/README.md`](debug/README.md) for full details.

## Build & Deployment

The site is static and requires no build step. To deploy:

1. Upload the entire directory (excluding `node_modules` and `.git`) to a web server.
2. Ensure the server serves `index.html` as the default document.
3. Verify that the `sw.js` is served with the correct MIME type (`application/javascript`).
4. Submit the sitemap to Google Search Console.

### Performance Optimization Checklist

- [ ] All images are converted to WebP with JPEG fallbacks.
- [ ] Critical CSS is inlined in `<style>` blocks.
- [ ] Non‑critical CSS is loaded asynchronously (`media="print"`).
- [ ] JavaScript is deferred (`defer` attribute).
- [ ] Fonts are subsetted and use `font‑display: swap`.
- [ ] Service worker caches essential assets for offline use.

### Accessibility Checklist

- [ ] Semantic HTML elements used throughout.
- [ ] All images have descriptive `alt` attributes.
- [ ] Interactive elements are keyboard‑focusable.
- [ ] Color contrast meets WCAG 2.1 AA (≥ 4.5:1).
- [ ] ARIA labels are applied where needed.
- [ ] Page can be navigated with a screen reader (tested with NVDA/VoiceOver).

### SEO Checklist

- [ ] Unique `<title>` and `<meta name="description">` on each page.
- [ ] JSON‑LD structured data for `Psychologist` and `LocalBusiness`.
- [ ] Open Graph and Twitter Card tags present.
- [ ] `robots.txt` and `sitemap.xml` correctly configured.
- [ ] Canonical URL set.

## Technical Details

### Critical CSS

The `css/critical.css` file contains styles required for above‑the‑fold content. It is inlined in the `<head>` of `index.html` to eliminate render‑blocking requests.

### Service Worker

`sw.js` implements a cache‑first strategy for core assets (HTML, CSS, JS, images) and a network‑first strategy for the privacy and terms pages. It enables offline browsing and faster repeat visits.

### Image Optimization

All images are provided in two resolutions (600px and 1200px) and two formats (WebP and JPEG). The `<picture>` element with `srcset` ensures the appropriate image is loaded based on viewport size and browser support.

### Structured Data

The `index.html` includes a JSON‑LD script with `@graph` containing `Psychologist`, `LocalBusiness`, and `WebSite` schemas. This helps search engines understand the content and may trigger rich results.

## Contributing

When modifying the site, adhere to the rules defined in `.kilocode/rules/`:

- **Accessibility** – Follow WCAG 2.1 AA.
- **Code Style** – Use consistent formatting, semantic HTML, and modern CSS/JS.
- **Content** – Maintain a professional, empathetic tone.
- **Performance** – Keep page weight low and loading fast.
- **SEO** – Ensure all meta tags and structured data are valid.

## License

Proprietary – All rights reserved.
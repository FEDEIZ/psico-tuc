---
name: performance-optimization
description: Techniques for fast loading: image optimization, lazy loading, minification, etc.
---

# Performance Optimization

A fast‑loading website improves user experience, reduces bounce rates, and positively impacts SEO. For a psychologist's landing page, performance is especially important because visitors may be in distress; slow pages can increase anxiety.

## Critical Metrics
- **Largest Contentful Paint (LCP)**: Should be ≤ 2.5 seconds.
- **First Input Delay (FID)**: Should be ≤ 100 milliseconds.
- **Cumulative Layout Shift (CLS)**: Should be ≤ 0.1.

## Image Optimization
- **Format**: Use modern formats (WebP, AVIF) with fallbacks for older browsers.
- **Compression**: Compress images without visible quality loss (tools: Squoosh, ImageOptim).
- **Responsive Images**: Use `srcset` and `sizes` to serve appropriately sized images for each viewport.
- **Lazy Loading**: Add `loading="lazy"` to images below the fold.
- **Aspect Ratio**: Specify `width` and `height` attributes to prevent layout shifts.

## CSS & JavaScript
- **Minify**: Remove whitespace, comments, and shorten variable names (use tools like Terser, CSSNano).
- **Concatenate**: Combine multiple files into one to reduce HTTP requests (but consider HTTP/2).
- **Critical CSS**: Inline the CSS needed for above‑the‑fold content; load the rest asynchronously.
- **Defer/Async**: Use `defer` for scripts that don't need to block rendering; `async` for independent scripts.
- **Tree Shaking**: Remove unused JavaScript (if using a bundler like Webpack, Rollup).

## Fonts
- **Subset fonts** to include only the characters you actually use.
- **Use `font‑display: swap`** to avoid invisible text while fonts load.
- **Preload** critical fonts with `<link rel="preload">`.

## Caching
- Leverage browser caching by setting appropriate `Cache‑Control` headers.
- Use a service worker for offline capability and faster repeat visits (Progressive Web App).

## Server & Hosting
- Use a **Content Delivery Network (CDN)** to serve assets from geographically close servers.
- Enable **compression** (gzip, Brotli) on the server.
- **Reduce server response time** (Time‑to‑First‑Byte < 600 ms).

## Monitoring & Testing
- Run **Lighthouse** in Chrome DevTools to get performance scores and suggestions.
- Use **WebPageTest** for deeper analysis across different locations and devices.
- Monitor real‑user performance with **Google Analytics (GA4)** or **CrUX**.

## Practical Checklist

### Before Launch
- [ ] Optimize all images (WebP + fallback).
- [ ] Minify and concatenate CSS/JS.
- [ ] Inline critical CSS.
- [ ] Defer non‑critical JavaScript.
- [ ] Set caching headers.
- [ ] Enable compression on the server.
- [ ] Test with Lighthouse and fix issues.

### Ongoing
- [ ] Regularly audit performance (quarterly).
- [ ] Monitor Core Web Vitals in Google Search Console.
- [ ] Remove unused CSS/JS as the site evolves.

## Example: Responsive Image with WebP Fallback
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description" loading="lazy" width="800" height="600">
</picture>
```

## Example: Critical CSS Inlining
```html
<head>
  <style>
    /* Critical styles (above‑the‑fold) */
    body { font‑family: sans‑serif; }
    .hero { … }
  </style>
  <link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
</head>
```

## Resources
- [Google's Web Performance Guidelines](https://web.dev/fast/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Images.guide](https://images.guide/)
- [HTTP Archive's Performance State of the Web](https://httparchive.org/reports/state-of-the-web)
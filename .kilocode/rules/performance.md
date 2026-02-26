# Performance Rules

Fast loading is critical for user experience and SEO. Follow these guidelines to ensure optimal performance.

## Images
- Use modern image formats (WebP, AVIF) with fallbacks for older browsers.
- Compress images to reduce file size without visible quality loss (tools: Squoosh, ImageOptim).
- Specify `width` and `height` attributes to prevent layout shifts.
- Implement lazy loading for images below the fold (`loading="lazy"`).
- Serve responsive images with `srcset` and `sizes` attributes.

## CSS & JavaScript
- Minify CSS and JavaScript files before deployment.
- Concatenate multiple CSS/JS files into one where appropriate (but consider HTTP/2 multiplexing).
- Defer non‑critical JavaScript using the `defer` attribute.
- Load CSS asynchronously where possible (e.g., `media="print"` with `onload`).
- Remove unused CSS and JavaScript (tree‑shaking).

## Fonts
- Subset fonts to include only used characters.
- Use `font‑display: swap` to avoid invisible text while fonts load.
- Preload critical fonts with `<link rel="preload">`.

## Caching
- Set appropriate `Cache‑Control` headers for static assets (e.g., 1 year for immutable resources).
- Use a service worker for offline capability and faster repeat visits (optional but recommended).

## Server & Hosting
- Use a Content Delivery Network (CDN) to serve assets from geographically close servers.
- Enable compression (gzip, Brotli) on the server.
- Minimize server response time (Time‑to‑First‑Byte < 600 ms).
- Use HTTP/2 or HTTP/3 if supported.

## Monitoring & Targets
- **Largest Contentful Paint (LCP)**: ≤ 2.5 seconds.
- **First Input Delay (FID)**: ≤ 100 milliseconds.
- **Cumulative Layout Shift (CLS)**: ≤ 0.1.
- **Total page weight**: Aim for < 1 MB (including all resources).

## Performance Testing
- Run Lighthouse (in Chrome DevTools) on both mobile and desktop.
- Use WebPageTest for deeper analysis across different locations and devices.
- Monitor Core Web Vitals in Google Search Console.

## Performance Checklist
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
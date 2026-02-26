---
name: responsive-web-design
description: Creating mobile-first responsive layouts using CSS Grid, Flexbox, and media queries.
---

# Responsive Web Design

When building a psychologist landing page, ensure the design works flawlessly across all device sizes (mobile, tablet, desktop). Follow these guidelines:

## Core Principles
- **Mobile‑First**: Start styling for small screens, then enhance for larger screens with `min‑width` media queries.
- **Fluid Layouts**: Use relative units (`%`, `vw`, `vh`, `rem`) instead of fixed pixels (`px`) for widths and heights.
- **Flexible Images**: Ensure images scale with their container (`max‑width: 100%`).

## CSS Techniques
### Flexbox
- Use Flexbox for one‑dimensional layouts (rows or columns).
- Ideal for navigation bars, card grids, and vertical centering.

### CSS Grid
- Use Grid for two‑dimensional layouts (rows and columns).
- Ideal for overall page structure, side‑by‑side sections, and complex card layouts.

### Media Queries
- Breakpoints should be based on content, not specific devices. Common breakpoints:
  ```css
  /* Small phones (default) */
  /* Base styles without media query */

  /* Tablets */
  @media (min‑width: 768px) { … }

  /* Desktops */
  @media (min‑width: 1024px) { … }

  /* Large desktops */
  @media (min‑width: 1280px) { … }
  ```

## Typography
- Use `rem` for font sizes (respect user's browser settings).
- Line height should be at least 1.5 for readability.
- Limit line length to 70–80 characters for comfortable reading.

## Touch‑Friendly UI
- Buttons and interactive elements should have a minimum touch target of 44×44 px.
- Provide ample spacing between touch targets to avoid accidental taps.

## Testing
- Test on real devices whenever possible.
- Use browser DevTools device emulation (but be aware of limitations).
- Validate with [Google's Mobile‑Friendly Test](https://search.google.com/test/mobile-friendly).

## Performance Considerations
- Avoid hiding large images on mobile with `display: none`; instead, serve appropriately sized images with `srcset` and `sizes`.
- Minimize CSS and JavaScript that is only needed for certain breakpoints (consider conditional loading).

## Example Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    /* Base (mobile) styles */
    .container { padding: 1rem; }
    .grid { display: grid; gap: 1rem; }

    /* Tablet */
    @media (min‑width: 768px) {
      .grid { grid‑template‑columns: repeat(2, 1fr); }
    }

    /* Desktop */
    @media (min‑width: 1024px) {
      .grid { grid‑template‑columns: repeat(3, 1fr); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="grid">…</div>
  </div>
</body>
</html>
```

## Resources
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [CSS‑Tricks Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS‑Tricks Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
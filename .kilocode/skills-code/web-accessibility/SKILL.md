---
name: web-accessibility
description: Ensuring WCAG compliance, ARIA attributes, keyboard navigation, and screen reader support.
---

# Web Accessibility (a11y)

A psychologist's website must be accessible to all visitors, including those with disabilities. Follow the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA.

## Semantic HTML
- Use the correct HTML5 element for each piece of content (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Heading hierarchy must be logical (`h1` → `h2` → `h3`); never skip levels.
- Lists (`<ul>`, `<ol>`, `<dl>`) should be used for list‑like content.
- Buttons should be `<button>` (not `<div>` with click events), links should be `<a>`.

## ARIA (Accessible Rich Internet Applications)
- Use ARIA only when native HTML cannot convey the meaning.
- Common patterns:
  - `aria‑label` or `aria‑labelledby` for unlabeled controls.
  - `aria‑describedby` for additional descriptions.
  - `aria‑hidden="true"` to hide decorative elements from screen readers.
  - `role` attributes where necessary (e.g., `role="navigation"` on a `<nav>` is redundant).
- **Do not override semantic elements with ARIA roles** (e.g., `<div role="button">` when `<button>` would work).

## Keyboard Navigation
- All interactive elements must be reachable and operable using the `Tab` key.
- Focus order should follow the visual reading order.
- Provide visible focus indicators (do not remove `outline` without a custom replacement).
- Skip‑to‑content links should be the first focusable element on the page.

## Color & Contrast
- Text must have a contrast ratio of at least 4.5:1 (normal text) or 3:1 (large text) against its background.
- Do not rely solely on color to convey information (e.g., “required fields are red”).
- Test with color‑blindness simulators (like Chrome DevTools).

## Images & Multimedia
- Every informative image must have an `alt` attribute that describes its content or function.
- Decorative images should have `alt=""` (empty) or be implemented as CSS backgrounds.
- Provide captions or transcripts for audio/video content.

## Forms
- Every form field must have a `<label>` associated via `for`/`id` or wrapped around the control.
- Group related fields with `<fieldset>` and `<legend>`.
- Clearly indicate required fields and validation errors with text, not just color.

## Testing
- Use automated tools (e.g., axe DevTools, Lighthouse) but also perform manual testing.
- Navigate the site using only a keyboard.
- Test with a screen reader (NVDA on Windows, VoiceOver on macOS/iOS).
- Validate with [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/).

## WCAG Quick Checklist
- **Perceivable**: Provide text alternatives, captions, adaptable content, distinguishable content.
- **Operable**: Keyboard accessible, enough time, no seizures, navigable.
- **Understandable**: Readable, predictable, input assistance.
- **Robust**: Compatible with current and future user tools.

## Example: Accessible Button
```html
<button aria‑label="Close dialog" onclick="closeDialog()">
  <svg aria‑hidden="true" focusable="false">…</svg>
  <span class="visually‑hidden">Close</span>
</button>
```

## Resources
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [a11y‑project.com](https://www.a11yproject.com/)
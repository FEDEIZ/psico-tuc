# Accessibility Rules

The website must be accessible to people with disabilities, following WCAG 2.1 Level AA.

## Semantic HTML
- Use HTML5 semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) appropriately.
- Ensure a logical heading hierarchy (`h1` → `h2` → `h3`); never skip heading levels.
- Use lists (`<ul>`, `<ol>`, `<dl>`) for list content.
- Buttons must be `<button>` elements; links must be `<a>` elements. Do not use `<div>` or `<span>` for interactive controls.

## ARIA
- Use ARIA only when native HTML semantics cannot convey the required meaning.
- Common ARIA attributes:
  - `aria‑label` or `aria‑labelledby` for unlabeled controls.
  - `aria‑describedby` for additional descriptions.
  - `aria‑hidden="true"` to hide purely decorative elements from screen readers.
- Do not override semantic elements with redundant ARIA roles (e.g., `<nav role="navigation">` is unnecessary).

## Keyboard Navigation
- All interactive elements must be reachable and operable using the `Tab` key.
- Focus order must follow the visual reading order.
- Provide visible focus indicators (do not remove `outline` without providing a custom focus style).
- Include a "skip‑to‑content" link as the first focusable element on the page.

## Color & Contrast
- Text must have a contrast ratio of at least 4.5:1 (normal text) or 3:1 (large text) against its background.
- Do not rely solely on color to convey information (e.g., required fields indicated only by red color).
- Test color combinations with color‑blindness simulators (Chrome DevTools).

## Images & Multimedia
- All informative images must have descriptive `alt` attributes.
- Decorative images must have empty `alt` (`alt=""`) or be implemented as CSS backgrounds.
- Provide captions for videos and transcripts for audio content.

## Forms
- Every form field must have a `<label>` associated via `for`/`id` or wrapped around the control.
- Group related fields with `<fieldset>` and `<legend>`.
- Clearly indicate required fields and validation errors with text, not only color.

## Testing
- Run automated accessibility tests (axe DevTools, Lighthouse) but do not rely solely on them.
- Perform manual keyboard navigation (Tab, Shift+Tab, Enter, Space, Esc).
- Test with a screen reader (NVDA on Windows, VoiceOver on macOS/iOS).
- Validate with the [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/).

## Prohibited
- No hidden text (e.g., `font‑size: 0`, `color: transparent`) that is intended for screen readers only—use proper techniques like `.visually‑hidden` CSS class.
- No auto‑playing audio/video with sound longer than 3 seconds without a pause/stop control.

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
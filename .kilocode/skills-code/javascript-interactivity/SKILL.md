---
name: javascript-interactivity
description: Implementing smooth scrolling, form validation, modals, and other interactive features.
---

# JavaScript Interactivity

A psychologist's landing page should feel smooth and responsive, with JavaScript enhancing the user experience without compromising accessibility or performance.

## Core Principles
- **Progressive Enhancement**: Ensure core content and functionality work without JavaScript; then add interactive improvements.
- **Unobtrusive JavaScript**: Separate behavior from structure (use event listeners, not inline `onclick`).
- **Performance**: Minimize JavaScript file size, defer non‑critical scripts, and avoid blocking rendering.

## Common Features for a Psychology Website

### Smooth Scrolling
- When internal anchor links are clicked (e.g., `#about`), scroll smoothly to the target.
- Use `scrollIntoView({behavior: 'smooth'})` or a lightweight library (like `smooth‑scroll`).
- Provide a fallback for browsers that don't support smooth scrolling.

### Form Validation & Submission
- Validate contact‑form inputs (email format, required fields) before submission.
- Display clear, accessible error messages near each field.
- Prevent double‑submission (disable the submit button while processing).
- Submit via `fetch` or `XMLHttpRequest` and show a success/error message without a page reload (if using AJAX).
- **Important**: Ensure the form still works when JavaScript is disabled (fallback to traditional `action`/`method`).

### Modal / Lightbox
- Use a modal for displaying additional information (e.g., detailed service descriptions, privacy policy).
- The modal must be keyboard‑accessible (trap focus, close with `Esc`).
- Provide a visible close button and a way to close by clicking the overlay.
- Set `aria‑hidden` on the main content when the modal is open.

### Accordion (FAQ Section)
- Use `<details>`/`<summary>` for native accordion behavior (requires no JavaScript).
- If custom styling is needed, ensure the accordion is accessible (ARIA attributes, keyboard navigation).

### Sticky Navigation
- Make the navigation bar stick to the top after scrolling past a certain point.
- Update the active nav‑link based on the current scroll position (highlight current section).
- Ensure the sticky nav does not obscure content (add top padding to the `body`).

### Lazy Loading Images
- Use the native `loading="lazy"` attribute for images below the fold.
- For older browsers, consider a lightweight lazy‑load library (like `lozad.js`).

### Back‑to‑Top Button
- Appears after scrolling down a certain distance.
- Smoothly scrolls to the top when clicked.

## Implementation Examples

### Smooth Scrolling
```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
```

### Contact Form Validation & AJAX
```javascript
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Simple validation
    const email = form.querySelector('[name="email"]');
    if (!email.value.includes('@')) {
      showError(email, 'Please enter a valid email address.');
      return;
    }
    // Disable button
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        form.innerHTML = '<p class="success">Thank you! We’ll be in touch soon.</p>';
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      alert('Sorry, something went wrong. Please try again later.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}
```

### Accessible Modal
```html
<div class="modal" id="myModal" aria-hidden="true" role="dialog" aria-labelledby="modalTitle">
  <div class="modal-content">
    <button class="modal-close" aria-label="Close">×</button>
    <h2 id="modalTitle">Modal Title</h2>
    <p>…</p>
  </div>
  <div class="modal-overlay"></div>
</div>
```

## Testing
- Test all interactions with keyboard‑only navigation.
- Verify that functionality works when JavaScript is disabled (essential features like form submission still work).
- Check performance impact (use Lighthouse).

## Resources
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Web.dev Progressive Enhancement](https://web.dev/progressive-web-apps/)
- [Inclusive Components](https://inclusive-components.design/)
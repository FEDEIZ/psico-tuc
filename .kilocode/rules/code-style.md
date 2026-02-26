# Code Style Rules

Consistent, readable code is essential for maintainability and collaboration.

## HTML
- Use HTML5 doctype: `<!DOCTYPE html>`.
- Always specify the language attribute: `<html lang="en">` (or appropriate language).
- Use semantic elements (see accessibility rules).
- Indent with 2 spaces (no tabs).
- Use double quotes for attribute values.
- Close all tags (including self‑closing tags like `<img>`).
- Use kebab‑case for `id` and `class` names (e.g., `contact‑form`, `hero‑section`).
- Avoid inline styles; use external CSS files.

## CSS
- Use a mobile‑first approach (base styles for mobile, then `min‑width` media queries).
- Organize CSS with comments for major sections (e.g., `/* Header */`).
- Use lowercase hex colors (`#007bff`, not `#007BFF`).
- Use `rem` units for font sizes and spacing where possible.
- Avoid using `!important` unless absolutely necessary.
- Follow BEM naming convention for CSS classes (optional but recommended for large projects).
- Use CSS custom properties (variables) for colors, fonts, and breakpoints.

## JavaScript
- Use modern ES6+ syntax (`const`, `let`, arrow functions, template literals).
- Use strict mode: `'use strict';`.
- Avoid global variables; encapsulate code in modules or IIFEs.
- Use meaningful variable and function names (camelCase).
- Comment complex logic; keep functions small and single‑purpose.
- Use `===` and `!==` over `==` and `!=`.
- Handle errors with `try…catch` where appropriate.
- Ensure JavaScript is unobtrusive (no inline `onclick` handlers).

## File Structure
- Place all HTML files in the project root or a `pages/` directory.
- CSS files go in `css/` or `styles/`.
- JavaScript files go in `js/` or `scripts/`.
- Images go in `images/` or `assets/images/`.
- Use descriptive file names (e.g., `contact‑form‑validation.js` not `script.js`).

## Naming Conventions
- **Files**: kebab‑case (`main‑styles.css`, `smooth‑scroll.js`).
- **HTML IDs/classes**: kebab‑case (`primary‑nav`, `call‑to‑action`).
- **JavaScript variables/functions**: camelCase (`validateEmail`, `userData`).
- **Constants**: uppercase with underscores (`API_ENDPOINT`, `MAX_RETRIES`).

## Comments
- Write comments that explain **why**, not what (the code should be self‑explanatory).
- Use JSDoc for public functions if building a library.
- Mark TODO items with `// TODO: …` and FIXME with `// FIXME: …`.

## Example HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF‑8">
  <meta name="viewport" content="width=device‑width, initial‑scale=1">
  <title>…</title>
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <header class="site‑header">…</header>
  <main class="main‑content">…</main>
  <footer class="site‑footer">…</footer>
  <script src="js/main.js" defer></script>
</body>
</html>
```

## Example CSS
```css
/* Variables */
:root {
  --primary‑color: #007bff;
  --font‑family: 'Open Sans', sans‑serif;
}

/* Base styles */
body {
  font‑family: var(--font‑family);
  line‑height: 1.6;
}

/* Header */
.site‑header {
  padding: 1rem;
}

/* Media queries */
@media (min‑width: 768px) {
  .site‑header {
    padding: 2rem;
  }
}
```

## Example JavaScript
```javascript
'use strict';

const contactForm = document.getElementById('contact‑form');

/**
 * Validates the email field.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
function isValidEmail(email) {
  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return re.test(email);
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = contactForm.querySelector('[name="email"]').value;
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    // Submit form…
  });
}
```

## Linting & Formatting
- Use ESLint for JavaScript and Stylelint for CSS (if possible).
- Configure your editor to auto‑format on save.
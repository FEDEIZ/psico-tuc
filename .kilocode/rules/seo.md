# SEO Rules

All pages must follow these SEO guidelines to ensure maximum visibility in search engines and LLM web scraping.

## Meta Tags
- Every page must have a unique `<title>` tag with the format: `[Page Title] | [Psychologist Name] | [Location/Specialty]`.
- A `<meta name="description">` must be present, containing a compelling summary of the page (150‑160 characters) with relevant keywords.
- Include `<meta name="keywords">` (optional but recommended) with a comma‑separated list of relevant terms (e.g., "psychologist, therapy, mental health, anxiety, depression, [city]").
- Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Open Graph tags for social sharing (og:title, og:description, og:image, og:url, og:type).
- Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image).

## Structured Data
- Implement JSON‑LD structured data for `LocalBusiness` and `Psychologist` as per the schema‑markup skill.
- Validate the structured data with Google's Rich Results Test; there must be zero errors.
- If the site includes a FAQ section, wrap it in `FAQPage` schema.

## Technical SEO
- Create a `robots.txt` file at the root that allows search engine crawlers (unless there are sensitive areas).
- Create a `sitemap.xml` listing all important pages (even if single‑page) and submit it to Google Search Console.
- Use canonical tags to avoid duplicate content issues.
- Ensure URLs are clean, readable, and include relevant keywords (e.g., `/services/anxiety-therapy`).

## On‑Page SEO
- Use a single `<h1>` per page that matches the page's primary topic.
- Heading hierarchy (`h2`‑`h6`) must be logical and not skip levels.
- Include target keywords naturally in headings and body text (avoid keyword stuffing).
- All images must have descriptive `alt` attributes that convey the image's content or function.
- Internal linking: link to other relevant sections of the site using descriptive anchor text.
- External linking: link to authoritative mental‑health resources (e.g., NIMH, APA) where appropriate.

## Mobile‑Friendliness
- The site must pass Google's Mobile‑Friendly Test.
- Ensure touch targets are at least 44×44 px and there is sufficient spacing between interactive elements.

## Performance
- Page load speed impacts SEO; follow the performance rules.

## Monitoring
- After launch, submit the sitemap to Google Search Console and Bing Webmaster Tools.
- Monitor for crawl errors and fix them promptly.

## Prohibited
- No hidden text (text that matches background color, zero font‑size, etc.).
- No cloaking or deceptive redirects.
- Do not block search engines from crawling CSS or JavaScript files unless absolutely necessary.

## Example
```html
<head>
  <title>Anxiety Therapy | Dr. Jane Smith | Licensed Psychologist in Chicago</title>
  <meta name="description" content="Dr. Jane Smith provides evidence‑based anxiety therapy for adults and adolescents in Chicago. Book a free consultation today.">
  <meta name="keywords" content="anxiety therapist, psychologist Chicago, mental health services, CBT therapy">
  <meta property="og:title" content="Anxiety Therapy | Dr. Jane Smith">
  <meta property="og:description" content="Evidence‑based anxiety therapy in Chicago.">
  <meta property="og:image" content="https://example.com/images/og‑image.jpg">
  <meta property="og:url" content="https://example.com/">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <!-- ... -->
</head>
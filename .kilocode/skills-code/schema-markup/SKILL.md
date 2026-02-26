---
name: schema-markup
description: Implementing JSON-LD structured data for LocalBusiness and Psychologist.
---

# Schema Markup (Structured Data)

Adding structured data to a psychologist's website helps search engines understand the content, leading to rich snippets (knowledge panels, review stars, etc.) and improved visibility.

## Recommended Schemas

### 1. LocalBusiness + Psychologist
- **LocalBusiness** provides basic business information (name, address, phone, etc.).
- **Psychologist** is a more specific type of **MedicalBusiness** that can be nested.

### 2. MedicalBusiness
- Use for healthcare‑specific details: `medicalSpecialty`, `healthcareReportingData`.

### 3. ProfessionalService
- Lists the services offered.

### 4. Person (for the psychologist)
- Include the psychologist's credentials, education, awards.

### 5. Review / AggregateRating
- If you have patient testimonials with star ratings, include `AggregateRating`.

## JSON‑LD Example

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Psychologist",
      "@id": "https://example.com/#psychologist",
      "name": "Dr. Jane Smith",
      "description": "Licensed clinical psychologist specializing in anxiety and trauma therapy.",
      "image": "https://example.com/images/dr‑smith.jpg",
      "url": "https://example.com/",
      "telephone": "+1‑234‑567‑8900",
      "email": "dr.smith@example.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main St",
        "addressLocality": "City",
        "addressRegion": "State",
        "postalCode": "12345",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 40.7128,
        "longitude": -74.0060
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "09:00",
          "closes": "17:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Friday"],
          "opens": "09:00",
          "closes": "14:00"
        }
      ],
      "priceRange": "$$",
      "medicalSpecialty": ["ClinicalPsychology", "Psychotherapy"],
      "knowsAbout": ["Cognitive Behavioral Therapy", "Mindfulness", "Trauma‑Focused Therapy"],
      "sameAs": [
        "https://www.psychologytoday.com/profile/…",
        "https://www.linkedin.com/in/…",
        "https://twitter.com/…"
      ]
    },
    {
      "@type": "ProfessionalService",
      "name": "Therapy Services",
      "description": "Individual, couples, and group therapy for anxiety, depression, trauma, and stress.",
      "provider": {
        "@id": "https://example.com/#psychologist"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Therapy Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Individual Therapy",
            "description": "One‑on‑one sessions tailored to your needs."
          },
          {
            "@type": "Offer",
            "name": "Couples Therapy",
            "description": "Improve communication and resolve conflicts."
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "url": "https://example.com/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://example.com/search?q={search_term_string}",
        "query‑input": "required name=search_term_string"
      }
    }
  ]
}
</script>
```

## Placement
- Insert the JSON‑LD block in the `<head>` of the HTML document (recommended) or just before the closing `</body>`.

## Testing
- Validate with [Google's Rich Results Test](https://search.google.com/test/rich-results).
- Check for errors and warnings; fix any missing required properties.

## Required vs Recommended Properties
For `LocalBusiness`/`Psychologist`, the following are strongly recommended:
- `name`
- `address` (with sub‑properties)
- `telephone`
- `url`
- `openingHoursSpecification`
- `priceRange`
- `medicalSpecialty`

## Additional Schemas
- **FAQPage**: If you have a FAQ section, wrap it in `FAQPage` schema to potentially get FAQ rich snippets.
- **BreadcrumbList**: Helps search engines understand site structure (useful for multi‑page sites).
- **Organization** (for the practice as a whole).

## Resources
- [Schema.org Psychologist](https://schema.org/Psychologist)
- [Google's Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [JSON‑LD Playground](https://json-ld.org/playground/)
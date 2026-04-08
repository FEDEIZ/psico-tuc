# psico-tuc — Contexto del Proyecto para Agentes

## Qué es este proyecto

Sitio web estático de landing page para **Lic. Florencia Daiana Lazo**, psicóloga psicoanalítica en San Miguel de Tucumán, Argentina. El objetivo del sitio es atraer nuevos consultantes y facilitar el contacto inicial.

- **URL de producción:** https://psico-tuc.com/
- **Repositorio:** github.com/fedeiz/psico-tuc

## Stack tecnológico

- HTML5 semántico (sin frameworks)
- CSS3 con custom properties, flexbox y grid — enfoque mobile-first
- JavaScript ES6 vanilla (`js/main.js`), sin dependencias de runtime
- Service Worker (`sw.js`) para cache y offline
- Formulario via Formspree (`https://formspree.io/f/mnjbyrzz`)
- Google Fonts (Open Sans)
- Google Maps embed en sección de contacto

## Estructura de archivos clave

```
index.html          # Página principal (única página de contenido)
css/critical.css    # CSS crítico (above-the-fold), referenciado desde <head>
css/main.css        # Estilos completos, cargado async (media="print")
js/main.js          # Toda la interactividad (defer)
sw.js               # Service worker
images/             # WebP + JPEG fallback, dos tamaños (600/1200)
debug/              # Herramientas de debug (no van a producción)
plans/              # Documentación de diseño y especificaciones
.kilocode/rules/    # Reglas por dominio: accessibility, seo, performance, content, code-style
```

## Datos del profesional (no modificar sin instrucción explícita)

| Campo | Valor |
|-------|-------|
| Nombre | Florencia Daiana Lazo |
| Matrícula | M.P. 4079 |
| Teléfono | +54 9 381 355-8184 |
| Email | psic.florencia4079@gmail.com |
| Dirección | Barrio Sur, San Miguel de Tucumán, Tucumán, Argentina |
| Instagram | @psico.tuc |
| Colegio | Colegio de Psicólogos de Tucumán |
| Especialidad | Psicoanálisis — adolescentes, jóvenes y adultos |

## Reglas de desarrollo

Ver `.kilocode/rules/` para reglas detalladas. Resumen:

- **Accesibilidad:** WCAG 2.1 AA. HTML semántico, jerarquía de headings correcta, ARIA solo cuando necesario, contraste ≥4.5:1, navegación por teclado, skip-link.
- **Performance:** LCP ≤2.5s, CLS ≤0.1. CSS crítico inline, JS con `defer`, imágenes con `srcset`+`sizes`+WebP, `loading="lazy"` en imágenes no críticas.
- **SEO:** Meta title y description únicos, JSON-LD schema (`Psychologist`, `FAQPage`), canonical, Open Graph, Twitter Card.
- **Código:** HTML5 con `lang="es-AR"`, indentación 2 espacios, comillas dobles. CSS con variables `--color-*` y `--space-*`. JS ES6+, `'use strict'`, sin variables globales.
- **Contenido:** Tono profesional y empático. No prometer curas. Incluir disclaimer legal. Idioma español Argentina.

## Paleta de colores

```css
--color-brown-light: #D7CCC8
--color-brown-medium: #A1887F
--color-brown-dark: #8D6E63
--color-accent-green: #81C784
--color-accent-blue: #4FC3F7
```

## Secciones del sitio (en orden)

1. `#inicio` — Hero: título, subtítulo, CTA "Reserva una consulta", imagen del consultorio
2. `#sobre-mi` — About: foto + texto biográfico
3. `#servicios` — Cards: Adolescentes, Jóvenes, Adultos
4. `#modalidad` — Cards: Presencial / Remota (videollamada)
5. `#formacion` — Grid de cards con formación académica y experiencia
6. `#contacto` — Info de contacto + formulario Formspree + mapa Google
7. `#faq` — Acordeón nativo `<details>` con 4 preguntas frecuentes
8. Footer — Datos de contacto, enlaces legales, copyright

**Nota:** El nav apunta a `#formacion` pero el ID en el HTML actual es `#por-que-elegirme` — ver plan de mejoras.

## Funcionalidades JavaScript (js/main.js)

- Toggle menú móvil (hamburger)
- Validación de formulario de contacto + envío a Formspree
- Scroll suave para anclas internas
- Modal accesible para servicios (con focus trap y cierre con Esc)
- Acordeón FAQ con `aria-expanded`
- Navegación sticky con enlace activo según scroll (IntersectionObserver-like)
- Botón flotante de WhatsApp (inyectado por JS)
- Botón "volver arriba" (inyectado por JS, visible desde 300px scroll)

## Testing y calidad

- Lighthouse target: ≥90 en Performance, Accessibility, SEO, Best Practices
- Herramienta de debug en `?debug=1`: vitals en tiempo real + audit axe-core
- Scripts npm: `npm start` (BrowserSync en puerto 3000)

## Issues conocidos / plan de mejoras

Ver `.claude/improvements-plan.md` para el plan detallado con prioridades.

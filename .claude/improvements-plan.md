# Plan de Mejoras — psico-tuc

Documento de referencia para el agente. Cada ítem tiene prioridad, área afectada y descripción precisa del problema y la solución esperada.

---

## Prioridad Alta

### 1. Corregir ID de sección "Formación" (nav roto)

**Archivo:** `index.html`
**Problema:** El nav contiene `<a href="#formacion">Formación</a>` pero la sección tiene `id="por-que-elegirme"`. El enlace no navega a ningún lado.
**Solución:** Cambiar `id="por-que-elegirme"` → `id="formacion"` en la sección. También actualizar la clase CSS de `.why-choose` si se refactoriza el selector.
**Impacto:** UX, accesibilidad (navegación por teclado y lectores de pantalla).

---

### 2. Eliminar script de debug de producción

**Archivo:** `index.html`, línea 30
**Problema:** `<script src="debug/quick-check.js" defer></script>` está cargado en el `<head>` de producción. Además, `debug/quick-check.js` no existe en el repositorio (404).
**Solución:** Eliminar esa línea del `<head>`. El panel de debug ya se carga condicionalmente con `?debug=1` más abajo en el body.
**Impacto:** Performance (request 404), errores en consola.

---

### 3. Corregir género en alt de imagen "Sobre Mí"

**Archivo:** `index.html`, línea 190
**Problema:** `alt="Foto de Florencia Lazo, psicólogo"` — género incorrecto.
**Solución:** Cambiar a `alt="Foto de Florencia Lazo, psicóloga"`.
**Impacto:** Accesibilidad, SEO.

---

### 4. Añadir `id` único a las secciones de servicio para el modal

**Archivo:** `index.html` + `js/main.js`
**Problema:** Los service-cards tienen botones de modal pero no hay trigger `[data-modal-open]` en ninguna card — el modal existe en el DOM pero nunca se abre.
**Solución:** Añadir atributo `data-modal-open` + `data-title` + `data-description` a cada `.service-card`, y conectar en `main.js` un listener que llame a `openModal(title, description)`.
**Impacto:** UX (funcionalidad prometida en la spec pero inactiva).

---

## Prioridad Media

### 5. Añadir sección "Cómo funciona" (falta en el HTML)

**Archivo:** `index.html`
**Problema:** La spec (`plans/specification-plan.md` sección 2.1) incluye una sección "Cómo funciona" con 4 pasos, pero no está implementada. El CSS ya tiene estilos `.how-it-works`, `.steps`, `.step`.
**Solución:** Insertar la sección entre `#modalidad` y `#formacion`:
```html
<section id="como-funciona" class="how-it-works">
  <!-- 4 pasos: Contacto → Entrevistas preliminares → Plan personalizado → Seguimiento -->
</section>
```
También agregar el enlace en el nav y el footer.
**Impacto:** Contenido, conversión (clarifica el proceso para nuevos consultantes).

---

### 6. Reemplazar favicon emoji por SVG real

**Archivo:** `index.html`, línea 34
**Problema:** El favicon usa un emoji (`🧠`) embebido como data URI SVG. No funciona correctamente en todos los navegadores (especialmente iOS Safari y algunos Android).
**Solución:** Crear un `favicon.svg` simple con las iniciales "FL" o un símbolo minimalista en la paleta de colores del proyecto. Agregar también `apple-touch-icon`.
**Impacto:** Branding, compatibilidad cross-browser.

---

### 7. Agregar `<meta name="author">` y completar schema

**Archivo:** `index.html`
**Problema:** El JSON-LD del `Psychologist` tiene `"image": "https://psico-tuc.com/images/foto-perfil.jpg"` pero esa imagen no existe en el repositorio (solo existen `about-400/800`). También falta `"opens"/"closes"` en `openingHoursSpecification`.
**Solución:**
- Cambiar la imagen del schema a `about-800.jpg` o crear/agregar `foto-perfil.jpg`.
- Agregar `"opens": "09:00", "closes": "18:00"` al schema.
**Impacto:** SEO, Rich Results en Google.

---

### 8. Mejorar descripción de las service-cards

**Archivo:** `index.html` — sección `#servicios`
**Problema:** Las cards tienen texto genérico. La spec pide mencionar especialidades concretas (ansiedad, depresión, orientación vocacional, etc.).
**Solución:** Ampliar las descripciones de cada card con problemáticas específicas sin prometer curas.
**Impacto:** SEO (keywords), conversión (relevancia para el visitante).

---

### 9. Añadir `preload` para imagen hero

**Archivo:** `index.html`, `<head>`
**Problema:** La imagen hero (`hero-1200.webp` o `hero-600.webp`) es LCP pero no tiene preload, lo que puede afectar el score de Performance.
**Solución:** Agregar `<link rel="preload" as="image" href="images/hero-600.webp" imagesrcset="images/hero-1200.webp 1200w, images/hero-600.webp 600w" imagesizes="(max-width: 768px) 100vw, 1200px">` en el `<head>`.
**Impacto:** Performance (LCP).

---

## Prioridad Baja

### 10. Consistencia en credenciales: "Psic." vs "Lic."

**Archivos:** `index.html` (múltiples líneas)
**Problema:** La meta description usa "Psic. Florencia Lazo" pero el og:description usa "Lic. Florencia Lazo". El hero usa "Psic. Florencia Lazo". Definir cuál es la forma correcta y unificar.
**Decisión pendiente:** Confirmar con el cliente si prefiere "Psic." o "Lic." (ambas son válidas en Argentina).
**Impacto:** Consistencia de marca, SEO.

---

### 11. Mover estilos inline del WhatsApp float y back-to-top a CSS

**Archivo:** `js/main.js` (líneas 327–372) + `css/main.css`
**Problema:** Los botones flotantes de WhatsApp y "volver arriba" tienen todos sus estilos definidos con `element.style.*` en JS. Esto hace el CSS difícil de mantener y no permite override simple.
**Solución:** Mover los estilos a clases CSS (`.whatsapp-float`, `.back-to-top` ya existen en `main.css` pero vacías) y en JS solo añadir/quitar clases.
**Impacto:** Mantenibilidad, separación de responsabilidades.

---

### 12. Agregar `<link rel="sitemap">` y verificar sitemap.xml

**Archivo:** `index.html` `<head>`, `sitemap.xml`
**Problema:** El `sitemap.xml` existe pero no hay referencia en el `<head>`. Además verificar que la fecha `<lastmod>` esté actualizada.
**Solución:** Agregar `<link rel="sitemap" type="application/xml" href="/sitemap.xml">`.
**Impacto:** SEO (indexación).

---

### 13. Añadir `lang` a los bloques de código o contenido en otros idiomas

**Archivo:** `index.html`
**Problema:** El schema JSON-LD incluye campos en inglés (como `"dayOfWeek": ["Monday", ...]`). No es un problema real, pero para accesibilidad estricta los textos en idioma diferente al del documento deberían marcarse.
**Impacto:** Accesibilidad nivel AAA (baja prioridad).

---

## Notas para el agente

- Antes de cualquier cambio de contenido (textos, precios, credenciales), consultar con el usuario.
- Los cambios de código (HTML/CSS/JS) que no alteren contenido visible pueden ejecutarse directamente.
- Siempre verificar con Lighthouse o el panel `?debug=1` después de cambios de performance.
- No usar frameworks ni librerías externas — el proyecto es vanilla por diseño.
- Las imágenes nuevas deben proveerse en WebP + JPEG, dos tamaños (600px y 1200px de ancho).

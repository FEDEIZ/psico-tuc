# Plan de Mejoras del Contexto Claude — psico-tuc

Ítems pendientes para completar la configuración del agente en este repositorio.

---

## Contexto y memoria

### 1. Completar CLAUDE.md con decisiones de diseño tomadas

**Qué agregar:**
- Historial de decisiones relevantes (por qué vanilla JS sin framework, por qué Formspree, por qué BrowserSync).
- Restricciones explícitas: qué NO hacer (no agregar bundlers, no agregar frameworks CSS, no cambiar datos de la profesional sin confirmar).
- Flujo de trabajo preferido del usuario para PRs y commits.

---

### 2. Agregar archivo de issues conocidos del sitio

**Archivo a crear:** `.claude/known-issues.md`
**Contenido:** Lista de bugs y mejoras pendientes del sitio (separados del contexto del agente), para que el agente los conozca sin confundirlos con instrucciones de comportamiento.

---

## Herramientas MCP recomendadas

### 3. MCP Browser Tools

**Para qué:** Auditorías de accesibilidad, performance (Lighthouse), y revisión visual directamente desde el agente sin salir del flujo de trabajo.
**Instalación:** `npx @agentdeskai/browser-tools-mcp@latest`
**Configurar en:** `.claude/settings.json` bajo `mcpServers`.
**Uso en este proyecto:** Verificar Lighthouse scores tras cambios en `index.html`, `css/main.css` o `js/main.js`. Correr audits de axe-core sin necesidad del panel `?debug=1`.

---

### 4. MCP Playwright (o Puppeteer)

**Para qué:** Tests end-to-end automatizados — verificar que el formulario de contacto envía correctamente, que el menú móvil funciona, que el modal se abre/cierra.
**Alternativa ligera:** `@playwright/mcp` (oficial de Microsoft).
**Configurar en:** `.claude/settings.json` bajo `mcpServers`.
**Uso en este proyecto:** Smoke tests post-merge para las interacciones JS principales.

---

### 5. MCP GitHub

**Para qué:** Que el agente pueda leer issues, comentar en PRs, y crear branches directamente desde el contexto de una conversación.
**Paquete:** `@modelcontextprotocol/server-github`
**Requiere:** Token `GITHUB_TOKEN` en el entorno.
**Configurar en:** `.claude/settings.json` bajo `mcpServers`.

---

## Configuración de Claude Code

### 6. Crear `.claude/settings.json`

**Archivo a crear:** `.claude/settings.json`
**Contenido inicial sugerido:**
```json
{
  "mcpServers": {
    "browser-tools": {
      "command": "npx",
      "args": ["@agentdeskai/browser-tools-mcp@latest"]
    },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

---

### 7. Definir hooks de automatización

**Hooks útiles para este proyecto:**
- **Post-edit hook:** Tras editar `index.html`, `css/*.css` o `js/*.js` → ejecutar `npm run lint` si se agrega un linter.
- **Pre-commit hook:** Validar que no queden `console.log` de debug ni referencias a `debug/quick-check.js` en producción.

**Configurar en:** `.claude/settings.json` bajo `hooks`.

---

## Notas para el agente

- Antes de tocar datos del profesional (nombre, matrícula, contacto, honorarios), siempre confirmar con el usuario.
- No agregar dependencias de runtime — el proyecto es vanilla por diseño. Solo devDependencies están permitidas.
- Después de cualquier cambio en HTML/CSS/JS, verificar con BrowserSync (`npm start`) y el panel `?debug=1`.
- Las imágenes nuevas deben entregarse en WebP + JPEG, dos tamaños (600px y 1200px de ancho).

# DESIGN.md — Atypico Studio (Flagship Urban Apparel E-Commerce)

> **Propósito del documento:** Especificación oficial del sistema de diseño, arquitectura visual, tokens CSS en `:root`, contratos de contraste WCAG 2.1 AA y principios UX/UI del e-commerce insignia de **Atypico Studio** (*Heavyweight Streetwear & Urban Apparel*).

---

## 1. Identidad Visual y Tono de Marca: *Editorial Streetwear Brutalism*

Atypico Studio no diseña tiendas genéricas ni plantillas prefabricadas. Cada pantalla proyecta la capacidad técnica y estética del estudio mediante estética editorial brutalista de alto contraste, tipografía geométrica precisa y fricción cero en el circuito de compra:

* **Atmósfera cromática:** Lienzo mineral cálido (`#F7F6F2`) en contraste con negro tinta sólido (`#0D0D0D`) y acento terracota calibrado (`#BF381D` sobre superficies claras para cumplimiento WCAG AA `5.49:1` con texto blanco, y `#E35336` sobre superficies oscuras `#0D0D0D` con `5.15:1` y bordes gráficos).
* **Jerarquía tipográfica:** Titulares geométricos con tracking ajustado (`--font-display`), cuerpo editorial altamente legible (`--font-sans`) y precios, códigos de SKU, inventarios y desgloses financieros en fuente monoespaciada tabular (`--font-mono`, `font-variant-numeric: tabular-nums`).
* **Regla estricta de estilos:** **Cero `@mantine/core` ni frameworks visuales externos.** El 100% de la interfaz visual (anuncio superior, header sticky, tarjetas lookbook, carrusel, tabla de medidas, drawer de bolsa, modal de confirmación, radio-cards de envío y comprobante) se gobierna con **CSS puro mediante Custom Properties en `:root`** en [`src/index.css`](src/index.css). Únicamente se utiliza `@mantine/form` + `zod/v4` como motor lógico sin estilos para el estado y validación del checkout.
* **Tono de voz:** Directo, técnico y curado (ej. *Heavyweight 280–440 GSM*, *Lote controlado*, *Despacho 24–48h*), libre de placeholders o mensajes internos de desarrollo.

---

## 2. Principios de UX/UI Aplicados

| Principio UX/UI | Aplicación concreta en Atypico Studio |
| :--- | :--- |
| **Prevención de errores (Norman)** | El stock vive desacoplado en `PRODUCT_STOCK_DICTIONARY`. Las tallas agotadas (`0`) se deshabilitan con claridad visual y el selector de cantidad bloquea incrementos por encima del inventario restante para esa talla (descontando unidades ya agregadas en bolsa). |
| **Confirmación explícita ante acciones destructivas** | Eliminar una prenda o reducir su cantidad de `1` a `0` abre un diálogo modal accesible (`role="dialog"`, soporte `Escape`). *Conservar* mantiene la prenda intacta; *Eliminar prenda* la retira y recalcula el subtotal al instante. |
| **Visibilidad del estado del sistema** | Feedback inmediato mediante avisos flotantes no intrusivos, badge tabular reactivo en cabecera, vista rápida en drawer lateral, skeletons de carga en catálogo/detalle y banner de confirmación con sugerencias *"Completa el look"* tras añadir al carrito. |
| **Validación temprana en tiempo real** | En `/checkout`, `@mantine/form` + `zod/v4` validan en tiempo real (`validateInputOnChange: true`) nombre completo (mín. 3), celular (10 dígitos exactos) y dirección (mín. 5), mostrando alertas claras sin esperar al envío del formulario. |
| **Claridad de conversión y acción dual** | En `/producto/:id`, *"Añadir a la bolsa"* y *"Comprar ahora →"* conviven con amplio tamaño táctil junto al selector de tallas, guía de medidas plegable y galería carrusel. |
| **Persistencia visual del comprobante** | Al confirmar un pedido `#ATY-XXXX`, la bolsa activa se vacía automáticamente, pero el resumen completo (prendas, tallas, cantidades, datos de entrega, desglose financiero y datos bancarios) permanece visible en pantalla con **copia directa al portapapeles** y enlace a WhatsApp. |

---

## 3. Tokens CSS en `:root` (`src/index.css`) — Auditados WCAG 2.1 AA

Todos los colores, sombras, bordes y espaciados deben consumirse exclusivamente a través de estas variables definidas en `:root`. Está prohibido escribir colores `#hex`, `rgb()` o `rgba()` hardcodeados fuera de `:root`:

```css
:root {
  /* Superficies y fondos */
  --bg-canvas: #F7F6F2;
  --bg-surface: #FFFFFF;
  --bg-surface-muted: #EFECE6;
  --bg-ink: #0D0D0D;
  --bg-ink-soft: #1A1A19;
  --bg-header-glass: rgba(247, 246, 242, 0.94);
  --bg-backdrop: rgba(13, 13, 13, 0.62);
  --bg-shimmer: #E5E1D8;

  /* Texto (todos >= 5.7:1 sobre canvas/surface o >= 11:1 sobre ink) */
  --text-primary: #111111;
  --text-secondary: #55534E;
  --text-muted: #636058;
  --text-inverse: #FFFFFF;
  --text-inverse-muted: #C8C4BC;

  /* Acento de marca Atypico */
  --accent-primary: #E35336;
  --accent-cta: #BF381D;
  --accent-cta-hover: #9E2C15;
  --accent-soft: #FBECE8;

  /* Estados semánticos */
  --status-success: #166E46;
  --status-success-bg: #E9F7EF;
  --status-error: #B91C1C;
  --status-error-bg: #FEF2F2;
  --status-warning: #92400E;
  --status-warning-bg: #FEF3C7;

  /* Bordes y elevación */
  --border-subtle: #DDD9CF;
  --border-strong: #0D0D0D;
  --border-inverse: rgba(255, 255, 255, 0.16);
  --shadow-sm: 0 2px 8px rgba(13, 13, 13, 0.05);
  --shadow-md: 0 12px 32px rgba(13, 13, 13, 0.10);
  --shadow-modal: 0 24px 48px rgba(13, 13, 13, 0.22);
  --shadow-brutal: 4px 4px 0px #0D0D0D;

  /* Tipografía */
  --font-sans: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
  --font-display: "Space Grotesk", "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Cascadia Code", Consolas, monospace;

  /* Espaciado, radios y transición */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 14px;
  --radius-pill: 999px;
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2.5rem;
  --space-2xl: 4rem;
  --transition-fast: 160ms cubic-bezier(0.2, 0.8, 0.2, 1);
  --container-max: 1240px;
}
```

### Pares de Contraste Verificados (WCAG 2.1 AA)
* `--text-primary` (`#111111`) sobre `--bg-canvas` (`#F7F6F2`): **17.4:1** (AAA)
* `--text-secondary` (`#55534E`) sobre `--bg-canvas` (`#F7F6F2`): **7.1:1** (AAA)
* `--text-muted` (`#636058`) sobre `--bg-canvas` (`#F7F6F2`): **5.7:1** (AA+) / sobre `--bg-surface` (`#FFFFFF`): **6.2:1** (AA+)
* `--text-inverse` (`#FFFFFF`) sobre `--accent-cta` (`#BF381D`): **5.49:1** (AA+)
* `--accent-cta` (`#BF381D`) sobre `--bg-canvas` (`#F7F6F2`): **5.08:1** (AA+) / sobre `--accent-soft` (`#FBECE8`): **4.75:1** (AA)
* `--accent-primary` (`#E35336`) sobre `--bg-ink` (`#0D0D0D`): **5.15:1** (AA+)
* `--text-inverse-muted` (`#C8C4BC`) sobre `--bg-ink` (`#0D0D0D`): **11.4:1** (AAA)

---

## 4. Arquitectura de E-Commerce y Contratos Técnicos

1. **Catálogo e Inventario Desacoplado (`src/data/mock-catalog.ts`):**
   * `PRODUCTS_LIST` contiene fichas editoriales, precios, gramajes, láminas lookbook en SVG, medidas S/M/L/XL y relaciones *Completa el look*.
   * `PRODUCT_STOCK_DICTIONARY` mapea `productId -> { S, M, L, XL }` con consultas puras mediante `getStockByVariant(productId, size)`.
2. **Capa Remota & Caché (`src/hooks/use-products.ts`):**
   * TanStack Query (`useProductsCatalog`, `useProductDetail`) gestiona caché, skeletons y errores sin `useEffect`.
3. **Estado Global de Compra (`src/stores/use-cart-store.ts`):**
   * Zustand administra exclusivamente la bolsa (`items`), apertura del drawer, avisos flotantes y el último comprobante (`lastConfirmedOrder`).
4. **Enrutamiento y Flujo Comercial (`src/App.tsx`):**
   * `/` — Hero flagship editorial, pilares de Atypico Studio, catálogo filtrable (búsqueda, categoría, talla disponible, ordenación) en grid de 3 columnas y bloque de capacidades del estudio (`#estudio`).
   * `/producto/:id` — Galería carrusel, ficha técnica, tallas con stock en vivo, guía de medidas plegable, cantidad controlada y módulo *Completa el look*.
   * `/carrito` — Stepper `01. Bolsa`, edición de cantidades, confirmación modal al eliminar y resumen financiero.
   * `/checkout` — Stepper `02. Datos y Envío`, validación en tiempo real (`@mantine/form` + `zod/v4`), radio-cards de cobertura (`Estándar $3.50` / `Nacional $5.00`) y liquidación transparente.
   * `/confirmacion/:orderId` — Stepper `03. Confirmación`, comprobante inmutable tras vaciar la bolsa, copia al portapapeles y envío por WhatsApp.

---

## 5. Gobernanza UX/UI con AHK (`ux-auditor`)

Cada cambio de UI, CSS o tokens de diseño debe pasar por el agente **`ux-auditor`** (actor MCP `custom:ux-auditor`) usando los skills del repositorio:
* **`ahk-ux-audit`**: Ejecuta la auditoría de 8 dimensiones (contraste WCAG, tokens `:root`, espaciado, bordes, tipografía, estados interactivos, responsive y coherencia de marca).
* **`ahk-design-system`**: Protege la paridad entre este documento y [`src/index.css`](src/index.css).

---

## 6. Comandos de Desarrollo y Build

Desde `proyecto-bootcamp/`:

```bash
pnpm dev      # Servidor local en http://localhost:5173/
pnpm build    # Verificación TypeScript (tsc -b) + bundle de producción en dist/
ahk health    # Validación integral de agentes + build del proyecto
```

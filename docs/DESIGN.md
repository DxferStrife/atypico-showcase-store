# DESIGN.md — Atypico Studio (Flagship Urban Apparel E-Commerce)

> **Documento espejo de arquitectura visual** sincronizado con [`DESIGN.md`](../DESIGN.md) y gobernado por los skills AHK `ahk-design-system` y `ahk-ux-audit`.

---

## 1. Identidad: *Editorial Streetwear Brutalism*

* **Superficies:** Lienzo mineral `--bg-canvas: #F7F6F2`, tarjetas `--bg-surface: #FFFFFF`, bloque de marca `--bg-ink: #0D0D0D`.
* **Acentos calibrados WCAG AA:** `--accent-cta: #BF381D` (botones con texto blanco `5.49:1` y etiquetas sobre fondo claro `5.08:1`) y `--accent-primary: #E35336` (cifras destacadas sobre tinta oscura `5.15:1`, bordes y anillos de foco).
* **CSS Puro en `:root`:** Cero `@mantine/core` en interfaz visual; `@mantine/form` + `zod/v4` actúan únicamente en lógica y validación reactiva del checkout.
* **Tipografía:** `Space Grotesk` (`--font-display`), `Inter` (`--font-sans`) y `JetBrains Mono` (`--font-mono` con `tabular-nums`).

---

## 2. Principios UX/UI Obligatorios

1. **Prevención de errores:** Tallas con `0` unidades deshabilitadas y control de cantidad acotado por `PRODUCT_STOCK_DICTIONARY[productId][size]`.
2. **Confirmación ante eliminación:** Modal accesible (`role="dialog"`, tecla `Escape`) al pulsar eliminar o bajar de `1` a `0`.
3. **Validación en tiempo real:** `@mantine/form` + `zod/v4` (`validateInputOnChange: true`) sobre nombre, celular (10 dígitos) y dirección.
4. **Transparencia financiera y comprobante persistente:** Subtotal, envío (`$3.50` / `$5.00`) y total tabulares; comprobante `#ATY-XXXX` visible incluso después de vaciar la bolsa activa, con copia al portapapeles.

---

## 3. Contrato de Tokens `:root` (`src/index.css`)

Ver tabla completa de pares WCAG 2.1 AA en [`.cursor/skills/ahk-design-system/resources/tokens-contract.md`](../.cursor/skills/ahk-design-system/resources/tokens-contract.md) y la especificación raíz en [`DESIGN.md`](../DESIGN.md). Está prohibido usar colores `#hex`/`rgb`/`rgba` fuera de `:root`.

---

## 4. Gobernanza del Sistema de Diseño

Todo cambio en vistas o CSS debe aprobar la auditoría de 8 dimensiones del agente **`ux-auditor`** (actor MCP `custom:ux-auditor`, skill `ahk-ux-audit`) antes de la aprobación final del `reviewer`.

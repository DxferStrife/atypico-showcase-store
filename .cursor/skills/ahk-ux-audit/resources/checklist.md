# Checklist de Auditoría UX/UI — Atypico Studio

Evalúa cada dimensión y registra evidencia concreta (`token`, `selector`, `archivo:línea` y ratio calculado).

## 1. Contraste WCAG 2.1 (AA / AAA)
- [ ] Texto normal (`< 18px` normal / `< 14px` bold): ratio **`>= 4.5:1`** en todos los pares superficie/texto.
- [ ] Texto grande (`>= 18px` bold / `>= 24px` normal), badges de estado, iconos y bordes interactivos: ratio **`>= 3.0:1`**.
- [ ] Botones primarios (`--accent-cta` + `--text-inverse`): ratio **`>= 4.5:1`**.
- [ ] Texto muted (`--text-muted`) sobre `--bg-canvas` y `--bg-surface`: ratio **`>= 4.5:1`**.
- [ ] Texto sobre superficie oscura (`--bg-ink` / `--bg-ink-soft`): usar `--text-inverse` o `--text-inverse-muted` con ratio **`>= 7.0:1`**.

## 2. Disciplina de Tokens `:root` y Reglas de Stack
- [ ] Cero imports o componentes de `@mantine/core`. (`@mantine/form` + `zod` solo lógica).
- [ ] Cero valores `#hex`, `rgb(...)` o `rgba(...)` fuera del bloque `:root` en `src/index.css`.
- [ ] Todas las clases `.aty-*` usadas en `.tsx` están definidas en `src/index.css` y sin reglas CSS huérfanas.

## 3. Espaciado y Ritmo Visual
- [ ] Uso consistente de la escala `--space-xs` (`0.25rem`) a `--space-2xl` (`4rem`).
- [ ] Secciones respiradas (`gap` de página, separación entre hero, pilares, catálogo, estudio y footer).
- [ ] Cero columnas vacías o huecos en grids (ej. grid de stats acorde al número real de cajas; catálogo 6 piezas en 3×2 / 2×3).
- [ ] Cajas de resumen (`.aty-summary-total`, `.aty-summary-line`) alineadas en extremos (`justify-content: space-between`).

## 4. Bordes, Radios y Elevación
- [ ] Contraste claro entre contenedores en reposo (`--border-subtle`) y foco/acción/jerarquía brutalista (`--border-strong`).
- [ ] Radios coherentes (`--radius-sm` a `--radius-pill`) y sombras (`--shadow-sm`, `--shadow-md`, `--shadow-modal`, `--shadow-brutal`).

## 5. Jerarquía Tipográfica
- [ ] Títulos en `--font-display`, cuerpo en `--font-sans`, precios/SKUs/contadores en `--font-mono` con `font-variant-numeric: tabular-nums`.
- [ ] Orden lógico de encabezados (`<h1>` único por página seguido de `<h2>`/`<h3>` sin saltos).

## 6. Estados Interactivos y Accesibilidad
- [ ] `:focus-visible` visible de alto contraste en botones, enlaces, chips, inputs y radio cards.
- [ ] Estados `:hover`, `:active`, `:disabled` claramente diferenciados.
- [ ] Modales y drawers con `role="dialog"`, `aria-modal="true"`, etiqueta asociada (`aria-labelledby` / `aria-label`) y cierre con `Escape` + backdrop.
- [ ] Listas (`ul`) y listas de definición (`dl`/`dt`/`dd`) limpias sin viñetas ni márgenes por defecto desalineados.
- [ ] Regla `@media (prefers-reduced-motion: reduce)` presente para animaciones y transiciones.

## 7. Grids y Diseño Responsivo
- [ ] Desktop (`>= 1200px`): layout balanceado, sin líneas de texto interminables (`max-width` / `ch`) ni tarjetas estiradas.
- [ ] Tablet (`<= 920px`): columnas de 2 a 1 o grids de 3 a 2 sin cortes.
- [ ] Mobile (`<= 640px`): botones accesibles (`>= 40px` alto táctil), cero scroll horizontal involuntario.

## 8. Calidad Editorial y Marca Atypico Studio
- [ ] Cero textos de curso/bootcamp (`MODO DEMOSTRACIÓN BOOTCAMP`, `LearningBanner`, `PASO X`, `RN-0X`, `ZUSTAND STORE`, `Demo Showcase`, `diccionario de stock`, `profesor`).
- [ ] Tono editorial premium, claro y orientado a conversión comercial desde el catálogo hasta el comprobante final.

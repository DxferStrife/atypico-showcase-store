# DESIGN.md — Atypico Showcase Store (Sistema de Diseño UX/UI y Guía de Práctica React)

> **Propósito del documento:** Definir el sistema visual, los principios de UX/UI, los tokens CSS en `:root` y el mapa de implementación paso a paso para construir el **Mínimo Entregable (MVP)** de **Atypico Showcase Store**, unificando los **4 Casos de Uso aprobados (`CU-01` a `CU-04`)** con los **4 requisitos de demostración del profesor**.

---

## 1. Identidad Visual: *Editorial Streetwear Brutalism*

Atypico Studio no diseña tiendas genéricas. La interfaz combina estética editorial de moda urbana de alto contraste con claridad comercial extrema para convertir clics en pedidos:

* **Atmósfera:** Fondo cálido mineral (`#F7F6F2`) en contraste con negro tinta sólido (`#0D0D0D`) y acento terracota urbano (`#E35336`) reservado exclusivamente para llamadas a la acción clave, badges de carrito y estados de atención.
* **Jerarquía tipográfica:** Títulos geométricos con tracking ajustado (`--font-display`), cuerpo altamente legible (`--font-sans`) y precios/códigos tabulares monoespaciados (`--font-mono`, `font-variant-numeric: tabular-nums`) para que los cálculos de subtotal, envío y total sean escaneables al instante.
* **Regla estricta de estilos:** **No se utiliza `@mantine/core` para el diseño visual.** Toda la interfaz (tarjetas, carrusel, drawer lateral, modal de confirmación, inputs y botones) está construida con **CSS modular organizado mediante Custom Properties en `:root`**. Únicamente se utiliza `@mantine/form` junto con `zod` como motor invisible de estado y validación en tiempo real del formulario de checkout.

---

## 2. Principios de UX/UI Aplicados

| Principio UX/UI | Aplicación concreta en Atypico Showcase Store |
| :--- | :--- |
| **Prevención de errores (Norman)** | El stock vive en un **diccionario clave-valor** separado (`PRODUCT_STOCK_DICTIONARY`). Las tallas con `0` unidades se deshabilitan visualmente y el selector de cantidad bloquea el incremento por encima del stock disponible para esa talla (descontando incluso lo ya agregado en bolsa). |
| **Confirmación preventiva (`RN-08`)** | Eliminar una prenda o reducir su cantidad de `1` a `0` nunca la borra silenciosamente: abre un **Diálogo Modal de Confirmación** (`DeleteConfirmModal`). Si el usuario cancela, la prenda permanece intacta; si confirma, desaparece y el subtotal se recalcula. |
| **Visibilidad del estado del sistema** | Feedback inmediato al agregar prendas (toast visual + actualización reactiva del badge en cabecera + apertura opcional del drawer), skeleton cards durante la consulta de **TanStack Query** y tarjeta emergente con **prendas que combinan** tras añadir al carrito. |
| **Validación reactiva temprana** | En `/checkout`, **Mantine Form + Zod** valida en tiempo real (`validateInputOnChange: true`) nombre (mín. 3), celular (10 dígitos) y dirección (mín. 5), marcando errores en rojo al instante sin esperar al clic de confirmación. |
| **Ley de Fitts y acción dual** | En `/producto/:id`, el botón **"Añadir a la bolsa"** y **"Comprar ahora"** conviven con amplio tamaño táctil junto al selector de tallas y carrusel protagonista. |
| **Persistencia visual post-confirmación** | Al confirmar la orden `#ATY-XXXX`, la bolsa se vacía (`RN-12`), pero el resumen completo (prendas, tallas, cantidades, datos de entrega y total) permanece visible en pantalla con **botón para copiar al portapapeles** y enlace opcional a WhatsApp. |

---

## 3. Tokens CSS en `:root` (`src/index.css`)

Todos los estilos consumen variables semánticas definidas en `:root` dentro de `src/index.css`.

* **Superficies:** `--bg-canvas: #F7F6F2`, `--bg-surface: #FFFFFF`, `--bg-surface-muted: #EFECE6`, `--bg-ink: #0D0D0D`.
* **Texto:** `--text-primary: #111111`, `--text-secondary: #5A5853`, `--text-muted: #8A867E`, `--text-inverse: #FFFFFF`.
* **Marca:** `--accent-primary: #E35336`, `--accent-primary-hover: #C94227`, `--accent-soft: rgba(227, 83, 54, 0.12)`.
* **Semántica:** `--status-success: #18794E`, `--status-error: #C81E1E`, `--status-warning: #B45309`.

---

## 4. Arquitectura de Datos Moqueados (Lista + Diccionario de Stock)

Por requerimiento explícito del profesor, los datos viven desacoplados en `src/data/mock-catalog.ts`:

1. **`PRODUCTS_LIST`** *(Lista / Array)*: Contiene ficha descriptiva, categoría, precio, galería de fotos para el carrusel, medidas por talla e IDs de prendas que combinan (`complementaryIds`).
2. **`PRODUCT_STOCK_DICTIONARY`** *(Diccionario clave-valor)*: Mapea `productId -> { S, M, L, XL }` indicando exactamente cuántas unidades hay por talla.

---

## 5. Ruta de Implementación y Práctica: Los 6 Pasos (`// 🧭 PASO 1..6`)

Toda la maquetación visual (JSX y CSS con `:root`), los `type` y los datos moqueados (`src/data/mock-catalog.ts`) ya están listos. Tú programas la lógica paso a paso guiado por comentarios **`// TODO (PASO X)`**:

1. **PASO 1 (`src/App.tsx` y `src/components/layout/RootLayout.tsx`)**: **React Router** (`<Route>`, `<Outlet />`).
2. **PASO 2 (`src/hooks/use-products.ts`)**: **TanStack Query** (`useQuery`, `queryKey`, `queryFn`).
3. **PASO 3 (`src/stores/use-cart-store.ts`)**: **Zustand** (`addItem`, `updateQuantity`, `removeItem`, `clearCart`, `confirmOrder`).
4. **PASO 4 (`CatalogPage.tsx`, `ProductDetailPage.tsx`, `CartPage.tsx`, `RootLayout.tsx`)**: **React básico** (`useState`, filtros, stock restante, modal preventivo `RN-08`).
5. **PASO 5 (`src/schemas/checkout-schema.ts` y `src/pages/CheckoutPage.tsx`)**: **Zod v4 + `@mantine/form`** en tiempo real y cálculo Subtotal + Envío + Total.
6. **PASO 6 (`src/pages/ConfirmationPage.tsx`)**: Resumen persistente tras vaciar la bolsa y copiar al portapapeles.

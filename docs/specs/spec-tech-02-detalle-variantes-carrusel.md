---
slug: "spec-tech-02-detalle-variantes-carrusel"
title: "SPEC-TECH-02: Vista de producto, selección de variantes y navegación de detalle"
description: "Diseño técnico de la ficha de detalle, carrusel de prendas, selector de variantes talla/color y consulta individual."
spec_kind: spec-tech
status: approved
created_at: "2026-11-11T02:22:57.487Z"
last_updated: "2026-11-11T02:22:57.487Z"
source_spec: spec-02-detalle-prenda-y-seleccion-variantes
---
## Source and current evidence
- **Especificación funcional origen:** `spec-02-detalle-prenda-y-seleccion-variantes` (aprobada).
- **Casos de uso upstream:** `cu-02-detalle-prenda-y-variantes`.
- **Reglas del negocio cubiertas:** RN-04 (consistencia de variantes talla/color), RN-05 (bloqueo preventivo de compra sin talla), RN-06 (transición y enlace directo de compra ahora).
- **Evidencia base:** Aplicación React 19 + TypeScript + Vite.

## Boundaries, contracts, and design
- **Enrutamiento:** Montado en ruta parametrizada `/producto/:id` mediante React Router 8.3.1 (`ProductDetailPage`).
- **Piezas y componentes:**
  - `ProductDetailPage`: Obtiene el parámetro `id` mediante `useParams()` y consume la consulta de detalle.
  - `ProductGallery` / `ImageCarousel`: Carrusel de imágenes de la prenda urbana con navegación de miniaturas.
  - `VariantSelector`: Selección interactiva de talla (S, M, L, XL) y color con validación de stock disponible.
  - `ActionButtonsGroup`:
    - Botón primario: "Comprar ahora" $\to$ añade la prenda y navega de inmediato a `/checkout`.
    - Botón secundario: "Añadir a la bolsa" $\to$ añade la prenda a Zustand, dispara la tarjeta flotante de productos complementarios y actualiza el contador.
- **Consulta remota con TanStack Query:**
  - Identidad de consulta: `queryKey: ['product', productId]`.
  - Función de consulta: `fetchProductById(productId): Promise<ProductDetail>`.
  - Estados: `isPending` (esqueleto de ficha), `isError` (pantalla de prenda no encontrada con botón para volver al catálogo).

## Dependencies, rollout, risks, and validation
- **Dependencias:** `react-router@8.3.1`, `@tanstack/react-query@5.102.8`, `zustand@5.0.15`, `@mantine/core@9.4.1`.
- **Validación prevista:** Test unitario en Vitest para la lógica de validación de combinaciones de variantes y test de navegación al hacer clic en "Comprar ahora".

## Decisions and open questions
- **Decisión confirmada:** Inclusión de carrusel de fotos, botón dual ("Comprar ahora" / "Añadir a la bolsa") y sugerencias complementarias.
- **Preguntas abiertas:** Ninguna.
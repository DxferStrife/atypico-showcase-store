---
slug: "spec-tech-01-catalogo-y-filtros-query"
title: "SPEC-TECH-01: Arquitectura y consulta remota de catálogo con TanStack Query"
description: "Diseño técnico de consulta remota de prendas, query keys, estados asíncronos y filtrado reactivo en memoria."
spec_kind: spec-tech
status: approved
created_at: "2026-11-11T02:22:57.476Z"
last_updated: "2026-11-11T02:22:57.478Z"
source_spec: spec-01-exploracion-y-filtrado-catalogo
---
## Source and current evidence
- **Especificación funcional origen:** `spec-01-exploracion-y-filtrado-catalogo` (aprobada).
- **Casos de uso upstream:** `cu-01-explorar-catalogo-y-filtrar`.
- **Reglas del negocio cubiertas:** RN-01 (categorías iniciales cerradas), RN-02 (prevención visual de tallas sin stock), RN-03 (persistencia y recalculación de filtros en memoria).
- **Evidencia base:** Espacio de trabajo en `proyecto-bootcamp` con React 19 + TypeScript + Vite.

## Boundaries, contracts, and design
- **Enrutamiento:** Montado en ruta raíz `/` mediante React Router 8.3.1 (`CatalogPage`).
- **Piezas y componentes:**
  - `CatalogPage`: Orquesta la vista del catálogo y los selectores.
  - `CategoryBar`: Botones de categoría ("Camisetas Oversize", "Pantalones Cargo", "Accesorios").
  - `SizeSelector`: Botones de talla (S, M, L, XL) que se deshabilitan si la talla no tiene stock en la categoría activa (RN-02).
  - `ProductGrid`: Cuadrícula responsiva que renderiza tarjetas de prendas.
  - `ProductCard`: Ficha resumida con imagen, nombre, precio y enlace a `/producto/:id`.
- **Consulta remota con TanStack Query (5.102.8):**
  - Identidad de consulta: `queryKey: ['products']`.
  - Función de consulta: `fetchProductsCatalog(): Promise<Product[]>`.
  - Estados administrados:
    - `isPending`: Despliega un `SkeletonGrid` de Mantine Core simulando 6 tarjetas.
    - `isError`: Despliega alerta de error con botón "Reintentar conexión".
    - `isSuccess`: Renderiza las prendas filtradas.
    - `isEmpty`: Mensaje guiado cuando el catálogo no arroja resultados.
- **Principio de frontera:** El catálogo vive en TanStack Query; no se clona ni se duplica en Zustand. Los filtros activos se gestionan en estado local React mediante funciones puras, sin `useEffect`.

## Dependencies, rollout, risks, and validation
- **Dependencias:** `react-router@8.3.1`, `@tanstack/react-query@5.102.8`, `@mantine/core@9.4.1`.
- **Riesgos y mitigaciones:**
  - Parpadeo de carga: mitigado con `staleTime: 1000 * 60 * 5` (5 minutos) en TanStack Query.
- **Validación prevista:** Test unitario en Vitest para la función pura de filtrado de prendas y verificación visual en navegador de estados de carga y error.

## Decisions and open questions
- **Decisión confirmada:** Catálogo administrado en TanStack Query sin mutaciones remotas artificiales por ser tienda showcase de venta directa.
- **Preguntas abiertas:** Ninguna.
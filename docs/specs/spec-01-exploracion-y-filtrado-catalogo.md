---
slug: "spec-01-exploracion-y-filtrado-catalogo"
title: "SPEC-01: Exploración y filtrado de catálogo de prendas"
description: "Especificación funcional de exploración, categorización cerrada y filtrado de prendas de moda urbana con retroalimentación preventiva de existencias."
spec_kind: spec
status: approved
created_at: "2026-11-09T04:09:15.882Z"
last_updated: "2026-11-09T04:13:44.396Z"
source_use_cases:
  - cu-01-explorar-catalogo-y-filtrar
---
## Upstream use cases and scope
- **Casos de uso origen:**
  - `cu-01-explorar-catalogo-y-filtrar`
- **Alcance funcional:**
  - Proceso `PR-01: Filtrado y navegación de prendas urbanas`.
  - Cubre la presentación del catálogo de moda urbana, navegación por categorías cerradas (Camisetas Oversize, Pantalones Cargo, Accesorios), filtrado por talla disponible y visualización inmediata de precios y disponibilidad.

## Rules, exclusions, and acceptance criteria
### Reglas de negocio aplicables
- **RN-01 (Categorías iniciales):** Las únicas categorías comerciales válidas en el catálogo son "Camisetas Oversize", "Pantalones Cargo" y "Accesorios".
- **RN-02 (Prevención de combinaciones vacías):** Las tallas que no posean unidades en inventario para la categoría seleccionada se muestran visualmente deshabilitadas, impidiendo ejecutar consultas con resultado de 0 prendas.
- **RN-03 (Persistencia de filtros en memoria):** Si el comprador cambia entre categorías, el selector de talla se recalcula automáticamente evaluando las existencias de la nueva categoría activa.

### Exclusiones del alcance
- No se incluye paginación con recarga de servidor; el catálogo se filtra reactivamente en memoria del cliente.
- No se incluye buscador de texto libre por palabras clave en esta versión (se prioriza filtrado directo por taxonomía de producto).

### Criterios de aceptación
- **CA-01:** La carga inicial de la tienda muestra todos los productos activos de las 3 categorías con su precio base.
- **CA-02:** Al pulsar una categoría, la grilla se actualiza en menos de 100ms mostrando solo sus prendas correspondientes.
- **CA-03:** Las opciones de talla sin stock en la categoría activa se presentan con estilo atenuado y cursor no permitido.
- **CA-04:** Al pulsar "Ver todos" o deseleccionar la categoría activa, se restituye la colección completa.

## Decisions and open questions
- **Decisión confirmada:** Se adopta 1 especificación por caso de uso (4 especificaciones en total para el proyecto).
- **Decisión confirmada:** Deshabilitación preventiva de opciones sin existencias en lugar de permitir filtrar y mostrar mensaje de error.
- **Pregunta abierta:** Ninguna para esta especificación.

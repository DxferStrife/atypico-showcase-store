---
slug: "cu-01-explorar-catalogo-y-filtrar"
title: "CU-01: Explorar catálogo y filtrar prendas por categoría y talla"
description: "Permite al comprador visualizar el catálogo de moda urbana y filtrar por categorías (Camisetas Oversize, Pantalones Cargo, Accesorios) y tallas con disponibilidad visual en tiempo real."
spec_kind: use-case
status: approved
created_at: "2026-10-27T03:47:28.996Z"
last_updated: "2026-10-27T03:52:21.630Z"
---
## Actor, goal, and trigger
- **Actor principal:** Comprador de moda urbana.
- **Objetivo:** Encontrar prendas de streetwear de acuerdo con su estilo y talla deseada sin perder tiempo en consultas manuales.
- **Situación que lo inicia (Trigger):** El usuario ingresa a la tienda online o hace clic en la sección "Catálogo" / "Colección".

## Preconditions and main flow
### Condiciones previas
- El catálogo cuenta con productos cargados en las categorías activas: Camisetas Oversize, Pantalones Cargo y Accesorios.
- Cada prenda dispone de información de precio, variantes (tallas S, M, L, XL / colores) e inventario.

### Recorrido principal (Paso a paso)
1. **Acción del usuario:** El comprador accede a la vista principal del catálogo.
   **Respuesta del producto:** Se despliega la cuadrícula con todas las prendas disponibles, mostrando imagen destacada, nombre, categoría, precio y selector rápido de categorías.
2. **Acción del usuario:** El comprador pulsa sobre una categoría específica (ej. "Camisetas Oversize").
   **Respuesta del producto:** El catálogo se actualiza instantáneamente mostrando únicamente las prendas de dicha categoría.
3. **Acción del usuario:** El comprador selecciona un filtro de talla (ej. "L").
   **Respuesta del producto:** La vista filtra las prendas que disponen de stock en talla L. Los botones de tallas sin existencias para esa categoría se deshabilitan visualmente para evitar combinaciones vacías.
4. **Acción del usuario:** El comprador visualiza los resultados filtrados y selecciona una prenda para ver su detalle.

## Alternatives, failures, and rules
### Flujos alternativos y errores
- **A1. Deselección de filtro:** Si el usuario pulsa nuevamente sobre la categoría activa o presiona "Ver todos", el producto restaura la vista general con el catálogo completo.
- **A2. Filtro restrictivo / Agotado:** Si una combinación no tiene stock disponible, los selectores de tallas o variantes aparecen en estado inactivo/deshabilitado con indicador visual tenue, impidiendo que el usuario ejecute un filtrado sin resultados.
- **A3. Reajuste de filtros:** Si el usuario cambia de categoría mientras tenía una talla seleccionada, el producto recalcula la disponibilidad de tallas para la nueva categoría.

### Reglas de negocio
- **RN-01 (Categorías iniciales):** Las categorías reconocidas en esta versión son estrictamente "Camisetas Oversize", "Pantalones Cargo" y "Accesorios".
- **RN-02 (Prevención de vacíos):** No se permite seleccionar filtros de combinaciones con 0 existencias.

## Observable outcome and acceptance criteria
### Resultado observable
- Cuadrícula de productos filtrada en tiempo real según la categoría y talla seleccionadas, con precios en dólares y feedback visual inmediato de disponibilidad.

### Criterios de aceptación
- [ ] Al cargar la página, se muestran productos de todas las categorías disponibles.
- [ ] Al seleccionar "Camisetas Oversize", "Pantalones Cargo" o "Accesorios", solo se listan prendas pertenecientes a la categoría elegida.
- [ ] Las tallas sin inventario para la categoría seleccionada se muestran visualmente deshabilitadas.
- [ ] El cambio de filtro responde inmediatamente sin recargar la página web.

## Decisions and open questions
- **Decisión confirmada:** Se implementa deshabilitación preventiva de opciones sin stock (Opción B) en lugar de permitir filtrar y mostrar pantalla vacía.
- **Pregunta abierta:** ¿Se ordenará el catálogo por defecto por "Novedades" o por "Precio"? (Se resolverá en el refinamiento del componente).

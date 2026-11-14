---
slug: "cu-02-detalle-prenda-y-variantes"
title: "CU-02: Consultar detalle de prenda y seleccionar variantes"
description: "Permite al comprador examinar la ficha técnica de una prenda urbana, elegir su combinación de talla y color, y añadirla al carrito con feedback visual no invasivo."
spec_kind: use-case
status: approved
created_at: "2026-10-27T03:54:46.979Z"
last_updated: "2026-10-27T03:55:54.746Z"
---
## Actor, goal, and trigger
- **Actor principal:** Comprador de moda urbana.
- **Objetivo:** Conocer en profundidad las características de una prenda (material, corte, medidas), elegir la talla y color exactos, y añadirla a su bolsa de compras.
- **Situación que lo inicia (Trigger):** El usuario hace clic sobre la tarjeta de un producto en el catálogo o en un enlace directo.

## Preconditions and main flow
### Condiciones previas
- La prenda seleccionada existe en el catálogo y cuenta con al menos una variante activa (talla/color).
- El sistema muestra precio base, descripción de corte (ej. oversize boxy fit, gramaje de tela), galería de fotos y estado de stock por variante.

### Recorrido principal (Paso a paso)
1. **Acción del usuario:** El comprador hace clic en una prenda desde la cuadrícula del catálogo.
   **Respuesta del producto:** Se presenta la vista de detalle de la prenda con galería de imágenes, título, categoría, precio, descripción de materiales, guía de corte y selectores de talla y color. La primera talla disponible viene preseleccionada por defecto.
2. **Acción del usuario:** El comprador selecciona una talla (ej. "M") y un color disponible.
   **Respuesta del producto:** La interfaz actualiza la disponibilidad de la variante seleccionada y el botón de acción refleja "Añadir a la bolsa".
3. **Acción del usuario:** El comprador pulsa el botón "Añadir a la bolsa".
   **Respuesta del producto:** Se agrega el artículo al carrito. Se incrementa inmediatamente el contador numérico en el ícono del carrito en la cabecera y se muestra una notificación flotante (toast) confirmando la acción (ej. "Camiseta Oversize Negra - Talla M añadida"). El comprador permanece en la vista de detalle.

## Alternatives, failures, and rules
### Flujos alternativos y errores
- **A1. Variante sin stock:** Si el comprador hace clic sobre una talla que no tiene existencias, el botón principal cambia a estado inactivo con el texto "Agotado en esta talla", impidiendo la adición al carrito.
- **A2. Regresar al catálogo:** El comprador pulsa el botón o enlace "← Volver a la colección" y regresa a la vista de catálogo conservando su posición o filtros previos.
- **A3. Adición múltiple:** Si el usuario pulsa varias veces "Añadir a la bolsa" para la misma variante, el producto suma la cantidad en el carrito y emite un toast actualizado.

### Reglas de negocio
- **RN-01 (Obligatoriedad de variante):** No se puede añadir una prenda a la bolsa sin que exista una talla seleccionada.
- **RN-02 (Feedback no invasivo):** La confirmación de adición se realiza mediante notificación toast y badge numérico en la barra de navegación (Opción B), sin forzar la apertura de modales o paneles laterales.

## Observable outcome and acceptance criteria
### Resultado observable
- Prenda incorporada a la bolsa de compras en la variante elegida, con actualización inmediata del contador superior y notificación toast visible durante 3 segundos.

### Criterios de aceptación
- [ ] La vista de detalle muestra precio, descripción y opciones de talla y color de la prenda.
- [ ] Si una talla está agotada, el botón de compra se deshabilita y muestra "Agotado".
- [ ] Al pulsar "Añadir a la bolsa", el contador de la cabecera aumenta en 1.
- [ ] Aparece una notificación toast temporal con el nombre y talla de la prenda agregada.

## Decisions and open questions
- **Decisión confirmada:** Se adopta la notificación tipo Toast (Opción B) para mantener una experiencia limpia y no invasiva.
- **Pregunta abierta:** ¿Se limitará la cantidad máxima por compra a 5 unidades por prenda? (Se definirá en la gestión del carrito).

---
slug: "spec-02-detalle-prenda-y-seleccion-variantes"
title: "SPEC-02: Detalle de prenda y selección de variantes"
description: "Especificación funcional de la ficha de producto, elección de combinación talla/color, validación de stock y retroalimentación no invasiva de adición a la bolsa."
spec_kind: spec
status: approved
created_at: "2026-11-09T04:09:45.130Z"
last_updated: "2026-11-09T04:13:44.405Z"
source_use_cases:
  - cu-02-detalle-prenda-y-variantes
---
## Upstream use cases and scope
- **Casos de uso origen:**
  - `cu-02-detalle-prenda-y-variantes`
- **Alcance funcional:**
  - Proceso `PR-02: Inspección de ficha técnica y adición de variantes`.
  - Cubre la presentación de la galería de fotos, descripción de corte urbano (boxy fit, gramaje textil), selección de combinación obligatoria de talla y color, validación de existencias por variante y adición a la bolsa con notificación toast.

## Rules, exclusions, and acceptance criteria
### Reglas de negocio aplicables
- **RN-04 (Selección obligatoria de variante):** No se permite pulsar ni ejecutar "Añadir a la bolsa" sin que exista una talla seleccionada explícitamente o por defecto válido.
- **RN-05 (Notificación de adición no invasiva):** La confirmación de adición se realiza mediante notificación Toast flotante con duración de 3 segundos y el incremento inmediato del contador numérico en la cabecera (+1), sin desplegar modales disruptivos.
- **RN-06 (Bloqueo por variante agotada):** Si la talla o color seleccionado tiene stock 0, el botón principal cambia su estado a inactivo mostrando el texto "Agotado en esta talla".

### Exclusiones del alcance
- No se incluye zoom interactivo con lupa de alta resolución en las imágenes en esta fase.
- No se incluye sistema de reserva temporal con temporizador de cuenta regresiva.

### Criterios de aceptación
- **CA-05:** Al ingresar a la ficha, la primera talla disponible en stock se encuentra preseleccionada.
- **CA-06:** El botón "Añadir a la bolsa" se bloquea si la variante elegida no cuenta con unidades disponibles.
- **CA-07:** Al añadir una prenda disponible, el contador del carrito se actualiza y aparece un toast con el nombre de la prenda y talla.
- **CA-08:** El enlace "← Volver a la colección" regresa al catálogo manteniendo los filtros seleccionados previamente.

## Decisions and open questions
- **Decisión confirmada:** Feedback visual no intrusivo mediante Toast y badge numérico en barra superior (Decisión B confirmada en Fase 1).
- **Pregunta abierta:** Ninguna para esta especificación.

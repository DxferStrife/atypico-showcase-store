---
slug: "spec-03-gestion-y-auditoria-carrito-compras"
title: "SPEC-03: Gestión y auditoría de la bolsa de compras"
description: "Especificación funcional de la bolsa de compras, controles de cantidad con confirmación previa al eliminar, límites de inventario y liquidación de subtotal."
spec_kind: spec
status: approved
created_at: "2026-11-09T04:10:19.632Z"
last_updated: "2026-11-09T04:13:44.411Z"
source_use_cases:
  - cu-03-gestionar-carrito-de-compras
---
## Upstream use cases and scope
- **Casos de uso origen:**
  - `cu-03-gestionar-carrito-de-compras`
- **Alcance funcional:**
  - Proceso `PR-03: Gestión y auditoría de la bolsa de compras`.
  - Cubre la revisión detallada de artículos añadidos (miniatura, prenda, talla, color, precio unitario, subtotal de fila), controles de incremento y decremento de unidades, diálogo de confirmación para eliminar prendas, liquidación exclusiva de subtotal de prendas y bloqueo de paso a checkout si la bolsa está vacía.

## Rules, exclusions, and acceptance criteria
### Reglas de negocio aplicables
- **RN-07 (Envío diferido al checkout):** En la vista del carrito no se calcula ni se añade valor de flete; la pantalla liquida única y exclusivamente la sumatoria de precios de las prendas seleccionadas.
- **RN-08 (Reducción a cero con confirmación previa):** Si el comprador presiona el control de decremento "(-)" sobre una prenda cuya cantidad es exactamente 1 unidad, el sistema no la elimina de inmediato: despliega un diálogo modal de confirmación ("¿Deseas eliminar esta prenda de tu bolsa?"). Solo tras la confirmación afirmativa del usuario se remueve el ítem. Si el usuario cancela, la cantidad se mantiene en 1.
- **RN-09 (Tope de existencias en carrito):** El control de incremento "(+)" se bloquea y deshabilita cuando la cantidad en la bolsa alcanza el stock máximo registrado para esa variante específica, emitiendo el mensaje "Stock máximo alcanzado".
- **RN-10 (Bloqueo de avance en estado vacío):** Si la bolsa no contiene productos (0 unidades), el botón "Continuar al checkout" permanece inhabilitado y la pantalla presenta el estado vacío con enlace a la colección.

### Exclusiones del alcance
- No se incluye aplicación de cupones de descuento promocionales en esta fase.
- No se incluye guardado de lista de deseos ("Wishlist").

### Criterios de aceptación
- **CA-09:** Al pulsar (+) o (-), el subtotal de la fila y el subtotal acumulado se recalculan inmediatamente sin recarga.
- **CA-10:** Al pulsar (-) con cantidad en 1, se abre un diálogo de confirmación previa; si se cancela, la prenda no se elimina.
- **CA-11:** Si se confirma la eliminación (o se pulsa el botón directo "Eliminar"), el ítem desaparece y el contador en cabecera se actualiza.
- **CA-12:** Al alcanzar las unidades máximas de inventario, el botón (+) se deshabilita impidiendo superar el stock real.
- **CA-13:** Con 0 artículos, el botón "Continuar al checkout" no permite navegar y se muestra "Tu bolsa está vacía".

## Decisions and open questions
- **Decisión confirmada:** Se implementa confirmación previa dialogada al decrementar de 1 a 0 (confirmado por el estudiante en Fase 2).
- **Decisión confirmada:** Cálculo de envío diferido al checkout (Decisión C de Fase 1).
- **Pregunta abierta:** Ninguna para esta especificación.

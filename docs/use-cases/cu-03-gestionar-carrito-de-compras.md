---
slug: "cu-03-gestionar-carrito-de-compras"
title: "CU-03: Gestionar el carrito de compras"
description: "Permite al comprador revisar las prendas agregadas, modificar cantidades, eliminar artículos y visualizar el subtotal consolidado antes de pasar al checkout."
spec_kind: use-case
status: approved
created_at: "2026-10-27T03:58:20.098Z"
last_updated: "2026-10-27T03:59:19.055Z"
---
## Actor, goal, and trigger
- **Actor principal:** Comprador de moda urbana.
- **Objetivo:** Auditar los productos seleccionados, modificar unidades, descartar prendas y confirmar el subtotal antes de proceder a la compra.
- **Situación que lo inicia (Trigger):** El usuario hace clic en el ícono de la bolsa/carrito ubicado en la barra de navegación superior.

## Preconditions and main flow
### Condiciones previas
- La aplicación mantiene en memoria o almacenamiento local el estado de la bolsa con los artículos añadidos previamente (o una lista vacía si es su primera interacción).

### Recorrido principal (Paso a paso)
1. **Acción del usuario:** El comprador pulsa el ícono del carrito en la barra de navegación.
   **Respuesta del producto:** Se abre la vista o página del carrito de compras mostrando el listado de prendas agregadas con: miniatura, nombre, talla, color, precio unitario, controles de cantidad (- / +), botón de eliminar y el resumen de compra con el subtotal acumulado.
2. **Acción del usuario:** El comprador modifica la cantidad de una prenda pulsando el botón "+" (aumentar) o "-" (reducir).
   **Respuesta del producto:** Se actualiza la cantidad de la fila en tiempo real, se recalcula el subtotal del ítem y el subtotal general de la orden.
3. **Acción del usuario:** El comprador verifica que el monto es correcto y observa la nota informativa: "El costo de envío se calculará en el siguiente paso según tu ciudad".
4. **Acción del usuario:** El comprador hace clic en el botón principal "Continuar al checkout".
   **Respuesta del producto:** El sistema redirige al comprador a la pantalla de checkout (CU-04) conservando la lista y montos vigentes.

## Alternatives, failures, and rules
### Flujos alternativos y errores
- **A1. Carrito vacío:** Si el usuario accede al carrito sin haber añadido productos (o tras eliminar todos), la pantalla muestra un mensaje "Tu bolsa está vacía" junto con un botón "Explorar colección" que lo dirige al catálogo principal. El botón de checkout permanece inhabilitado.
- **A2. Eliminar ítem directamente:** El comprador pulsa el ícono de papelera o botón "Eliminar" en una fila. El producto remueve la prenda de la bolsa, descuenta el contador de la cabecera y actualiza el subtotal de inmediato.
- **A3. Reducción a cero:** Si el comprador pulsa "-" cuando la cantidad es 1, el producto solicita confirmación o remueve la prenda de la bolsa.
- **A4. Límite de stock por prenda:** Si el usuario intenta aumentar la cantidad por encima del stock disponible para esa variante, el botón "+" se deshabilita y se muestra un aviso sutil de "Stock máximo alcanzado".

### Reglas de negocio
- **RN-01 (Cálculo de envío diferido):** En la vista de carrito no se suma ningún valor de flete ni envío; se presenta exclusivamente la suma de precios de las prendas (Opción C).
- **RN-02 (Persistencia durante la sesión):** Los artículos añadidos se mantienen mientras el usuario navega entre pantallas de la aplicación.

## Observable outcome and acceptance criteria
### Resultado observable
- Pantalla de carrito con lista discriminada por prenda y talla, controles operativos de incremento/decremento/eliminación y subtotal monetario matemáticamente exacto.

### Criterios de aceptación
- [ ] Al hacer clic en el carrito se listan todos los productos agregados con su talla y precio.
- [ ] Modificar cantidades con (+) y (-) recalcula instantáneamente el subtotal sin recargar la página.
- [ ] Eliminar un producto lo quita de la lista y actualiza el contador de la barra superior.
- [ ] Si la bolsa queda en 0 artículos, se muestra el estado vacío y se bloquea el paso al checkout.
- [ ] El desglose indica claramente que el envío se calcula en el paso posterior.

## Decisions and open questions
- **Decisión confirmada:** Se adopta el cálculo diferido de envío (Opción C): el carrito solo liquida el subtotal de prendas y traslada el flete al formulario de checkout.
- **Pregunta abierta:** Ninguna para este caso de uso.

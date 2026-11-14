---
slug: "cu-04-checkout-y-confirmacion-pedido"
title: "CU-04: Completar checkout y confirmación de pedido"
description: "Permite al comprador ingresar sus datos de entrega, calcular el costo de envío según la ciudad, generar el número de orden y recibir los datos de transferencia bancaria con enlace directo a WhatsApp para enviar el comprobante."
spec_kind: use-case
status: approved
created_at: "2026-10-27T04:01:36.062Z"
last_updated: "2026-10-27T04:02:56.039Z"
---
## Actor, goal, and trigger
- **Actor principal:** Comprador de moda urbana.
- **Objetivo:** Formalizar la orden de compra con sus datos de envío, conocer el monto total definitivo con flete, recibir los datos de cuenta bancaria y abrir WhatsApp con el mensaje pre-armado para enviar su comprobante de transferencia.
- **Situación que lo inicia (Trigger):** El usuario hace clic en "Continuar al checkout" desde la vista del carrito de compras.

## Preconditions and main flow
### Condiciones previas
- El carrito contiene al menos un producto (subtotal > 0).
- La tienda tiene definidos los datos de cuenta bancaria para transferencias y el número telefónico oficial de WhatsApp de Atypico / la tienda.

### Recorrido principal (Paso a paso)
1. **Acción del usuario:** El comprador accede al formulario de checkout desde el carrito.
   **Respuesta del producto:** Se despliega el formulario solicitando datos obligatorios: Nombre completo, Teléfono/WhatsApp, Ciudad/Provincia (desplegable) y Dirección exacta con referencias. A la derecha se muestra el resumen del pedido con la lista de prendas y el subtotal.
2. **Acción del usuario:** El comprador completa sus datos y selecciona su ciudad (ej. "Guayaquil" o "Quito" como local, u "Otra provincia" como nacional).
   **Respuesta del producto:** El sistema calcula el costo de envío en tiempo real ($3.50 local / $5.00 nacional) y actualiza el "Total a transferir" (Subtotal + Envío).
3. **Acción del usuario:** El comprador revisa el resumen final y hace clic en "Confirmar pedido y pagar por transferencia".
   **Respuesta del producto:** El sistema genera un código de orden único (ej. "#ATY-8421"), guarda el pedido y vacía el carrito de compras.
4. **Acción del usuario:** El comprador visualiza la pantalla de confirmación de pedido.
   **Respuesta del producto:** Se presenta la vista de confirmación con:
   - Número de orden destacado y total liquidado.
   - Resumen de prendas y dirección de entrega.
   - Datos bancarios completos (Banco, Tipo de cuenta, Número, Titular y Cédula/RUC).
   - Botón principal de llamada a la acción: "Enviar comprobante por WhatsApp".
5. **Acción del usuario:** El comprador pulsa el botón "Enviar comprobante por WhatsApp".
   **Respuesta del producto:** Se abre la aplicación de WhatsApp (vía enlace "https://wa.me/...") con un mensaje estructurado pre-cargado: "¡Hola! Acabo de hacer el pedido #ATY-8421 por un total de $XX.XX. Adjunto mi comprobante de transferencia bancaria para procesar el envío a [Nombre]."

## Alternatives, failures, and rules
### Flujos alternativos y errores
- **A1. Campos obligatorios incompletos:** Si el comprador intenta confirmar la orden sin completar nombre, teléfono, ciudad o dirección, los campos requeridos se resaltan en rojo con mensajes descriptivos y el formulario no se procesa.
- **A2. Carrito vacío al intentar entrar a checkout:** Si un usuario intenta acceder a la ruta de checkout sin productos en la bolsa, el sistema lo redirige de inmediato al catálogo con el aviso "Tu bolsa está vacía".
- **A3. Modificar pedido antes de confirmar:** El comprador puede hacer clic en "← Volver a la bolsa" para cambiar cantidades o prendas sin perder los datos ya rellenados en el formulario de envío.

### Reglas de negocio
- **RN-01 (Tarifas de envío diferenciadas - Opción A):** La selección de ciudad local asigna un flete de $3.50; cualquier otra ciudad o provincia asigna una tarifa de envío nacional de $5.00.
- **RN-02 (Generación de identificador):** Cada orden exitosa genera un identificador alfanumérico irrepetible con prefijo de la tienda (ej. "#ATY-XXXX").
- **RN-03 (Vaciado de bolsa):** Una vez confirmada la orden, la bolsa de compras se reinicia a 0 artículos para prevenir compras duplicadas accidentales.
- **RN-04 (Exclusión de pasarela):** No se solicitan datos de tarjetas de crédito o débito en la aplicación.

## Observable outcome and acceptance criteria
### Resultado observable
- Pantalla de confirmación de pedido con número de orden único, desglose completo de costos (subtotal + flete por ciudad), datos bancarios legibles y botón de enlace a WhatsApp con mensaje automático listo para enviar.

### Criterios de aceptación
- [ ] El selector de ciudad actualiza el total en pantalla sumando $3.50 (local) o $5.00 (nacional) de forma reactiva.
- [ ] No se puede enviar el formulario con campos obligatorios vacíos.
- [ ] Al confirmar con datos válidos, se genera un código de orden y la bolsa de compras queda en 0.
- [ ] La pantalla final muestra los datos de la cuenta bancaria para la transferencia.
- [ ] El enlace de WhatsApp contiene el número de orden y monto exacto en el texto pre-formateado.

## Decisions and open questions
- **Decisión confirmada:** Se implementa envío condicional según ubicación ($3.50 local / $5.00 nacional) y confirmación por WhatsApp con transferencia bancaria (Decisión 3 y Opción A).
- **Pregunta abierta:** Ninguna para este caso de uso.

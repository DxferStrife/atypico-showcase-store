---
slug: "spec-04-checkout-liquidacion-y-cierre-whatsapp"
title: "SPEC-04: Checkout, liquidación de flete y cierre por WhatsApp"
description: "Especificación funcional de captura de datos de envío, cálculo dinámico de flete, generación de orden #ATY-XXXX y derivación estructurada a WhatsApp con transferencia bancaria."
spec_kind: spec
status: approved
created_at: "2026-11-09T04:10:53.334Z"
last_updated: "2026-11-09T04:13:44.416Z"
source_use_cases:
  - cu-04-checkout-y-confirmacion-pedido
---
## Upstream use cases and scope
- **Casos de uso origen:**
  - `cu-04-checkout-y-confirmacion-pedido`
- **Alcance funcional:**
  - Proceso `PR-04: Liquidación de envío, formalización de orden y derivación a WhatsApp`.
  - Cubre la captura de datos de contacto y entrega (Nombre, WhatsApp, Ciudad, Dirección), cálculo reactivo de flete según ciudad local ($3.50) o nacional ($5.00), generación de número de orden (#ATY-XXXX), vaciado de bolsa, presentación de datos de cuenta bancaria y generación de enlace a WhatsApp con mensaje estructurado.

## Rules, exclusions, and acceptance criteria
### Reglas de negocio aplicables
- **RN-11 (Flete diferenciado por ubicación):** La selección de ciudad local (ej. Guayaquil/Quito) liquida una tasa de flete de $3.50; cualquier otra ciudad o provincia del país liquida la tarifa nacional estándar de $5.00.
- **RN-12 (Validación estricta de obligatoriedad):** Ningún pedido puede formalizarse si alguno de los campos de contacto o entrega (Nombre, Teléfono/WhatsApp, Ciudad, Dirección) se encuentra vacío o con formato inválido.
- **RN-13 (Estructura de identificador único de orden):** Cada orden exitosa genera un código alfanumérico en formato "#ATY-" seguido de 4 caracteres numéricos no repetibles en la sesión.
- **RN-14 (Vaciado transaccional de bolsa):** Una vez emitido el código de orden, el estado de la bolsa se reinicia a 0 prendas para prevenir órdenes duplicadas accidentales.
- **RN-15 (Composición de mensaje a WhatsApp):** El botón de cierre invoca el protocolo wa.me de WhatsApp con la URL codificada conteniendo el saludo, el número de orden generado, el total liquidado en dólares y el recordatorio de adjuntar el comprobante de transferencia bancaria.
- **RN-16 (Exclusión de cobro con tarjeta):** El sistema no captura ni procesa números de tarjetas de crédito o débito; el método de pago está limitado estrictamente a transferencia bancaria.

### Exclusiones del alcance
- No se incluye integración de webhooks bancarios de confirmación automática de depósito.
- No se incluye cálculo de impuestos de aduana o envíos internacionales.

### Criterios de aceptación
- **CA-14:** El cambio del selector de ciudad recalcula inmediatamente el monto total sumando $3.50 o $5.00.
- **CA-15:** Si el usuario intenta confirmar con campos en blanco, se visualizan mensajes de error bajo cada campo y no se emite orden.
- **CA-16:** Al confirmar exitosamente, se muestra la vista con el código #ATY-XXXX, los datos bancarios y el botón de WhatsApp.
- **CA-17:** Al pulsar "Enviar comprobante por WhatsApp", se abre la URL con el número de orden y monto exactos incluidos en el texto.
- **CA-18:** La bolsa de compras se vacía inmediatamente tras la confirmación de la orden.

## Decisions and open questions
- **Decisión confirmada:** Cálculo de envío por ciudad ($3.50 local / $5.00 nacional) confirmado en Fase 1.
- **Decisión confirmada:** Cierre y pago mediante transferencia bancaria y WhatsApp (Decisión 3).
- **Pregunta abierta:** Ninguna para esta especificación.

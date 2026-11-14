---
slug: "spec-tech-04-checkout-zod-mantine-form-whatsapp"
title: "SPEC-TECH-04: Formulario reactivo con Zod, Mantine Form y cierre estructurado WhatsApp"
description: "Diseño técnico del formulario de entrega con validación en tiempo real Zod/Mantine Form, liquidación de flete y formato wa.me."
spec_kind: spec-tech
status: approved
created_at: "2026-11-11T02:22:57.498Z"
last_updated: "2026-11-11T02:22:57.498Z"
source_spec: spec-04-checkout-liquidacion-y-cierre-whatsapp
---
## Source and current evidence
- **Especificación funcional origen:** `spec-04-checkout-liquidacion-y-cierre-whatsapp` (aprobada).
- **Casos de uso upstream:** `cu-04-checkout-y-confirmacion-pedido`.
- **Reglas del negocio cubiertas:** RN-10 (tarifa de flete reactiva según ciudad), RN-11 (generación determinista de orden #ATY-XXXX), RN-12 (vaciado preventivo de bolsa tras confirmación).
- **Evidencia base:** Aplicación React 19 + TypeScript + Vite.

## Boundaries, contracts, and design
- **Enrutamiento:** Montado en ruta `/checkout` (`CheckoutPage`) y ruta de éxito `/confirmacion/:orderId` (`OrderConfirmationPage`).
- **Validación con Zod 4.4.3 (`zod/v4`):**
  - Definición de schema:
    - `fullName`: string, min 3 caracteres.
    - `phone`: string con regex `^09\\d{8}$` o 10 dígitos numéricos.
    - `city`: enum `['LOCAL', 'NACIONAL']`.
    - `address`: string, min 5 caracteres.
    - `notes`: string opcional, max 150 caracteres.
- **Gestión de formulario con Mantine Form (9.4.1):**
  - Hook `useForm` configurado con `validateInputOnChange: true` para validación inmediata en tiempo real.
  - Conexión del schema mediante el resolver nativo de Mantine: `schemaResolver(checkoutSchema)`.
  - Resaltado de inputs en rojo y renderizado de texto descriptivo bajo campos inválidos.
- **Liquidación reactiva y generación de orden:**
  - El selector de ciudad actualiza el total en pantalla sumando $3.50 (local) o $5.00 (nacional) de forma reactiva sin recargar.
  - Al completar la validación exitosa:
    - Se genera el código `#ATY-XXXX`.
    - Se invoca `clearCart()` de Zustand (RN-12).
    - Se navega a `/confirmacion/:orderId`.
- **Canal de cierre estructurado a WhatsApp:**
  - Construcción del enlace `https://wa.me/5939XXXXXXXX?text=...` codificado mediante `encodeURIComponent`, con número de orden, prendas, total liquidado e instrucciones para adjuntar el comprobante de transferencia bancaria.

## Dependencies, rollout, risks, and validation
- **Dependencias:** `zod@4.4.3`, `@mantine/form@9.4.1`, `@mantine/core@9.4.1`, `react-router@8.3.1`, `zustand@5.0.15`.
- **Validación prevista:** Pruebas unitarias de Zod con casos válidos e inválidos en Vitest, verificación del cálculo reactivo de flete y prueba del formato del enlace de WhatsApp.

## Decisions and open questions
- **Decisión confirmada:** Validación reactiva en tiempo real mientras el usuario completa los datos; exclusión de pasarelas con tarjeta bancaria.
- **Preguntas abiertas:** Ninguna.
---
slug: "spec-tech-03-bolsa-zustand-y-modal-confirmacion"
title: "SPEC-TECH-03: Gestión de bolsa con Zustand y confirmación con Mantine Modal"
description: "Diseño técnico del store de cliente useCartStore y ciclo de vida de confirmación preventiva con Mantine Modal (RN-08)."
spec_kind: spec-tech
status: approved
created_at: "2026-11-11T02:22:57.493Z"
last_updated: "2026-11-11T02:22:57.493Z"
source_spec: spec-03-gestion-y-auditoria-carrito-compras
---
## Source and current evidence
- **Especificación funcional origen:** `spec-03-gestion-y-auditoria-carrito-compras` (aprobada).
- **Casos de uso upstream:** `cu-03-gestionar-carrito-de-compras`.
- **Reglas del negocio cubiertas:** RN-07 (límite operativo de 10 unidades por ítem), RN-08 (confirmación obligatoria previa al reducir a 0), RN-09 (liquidación de subtotal sin flete anticipado).
- **Evidencia base:** Aplicación React 19 + TypeScript + Vite.

## Boundaries, contracts, and design
- **Enrutamiento:** Vista completa en ruta declarativa `/carrito` (`CartPage`) y previsualización en `CartDrawer` desde la cabecera.
- **Store del cliente con Zustand (5.0.15):**
  - Nombre del hook: `useCartStore`.
  - Estado: `items: CartItem[]`.
  - Acciones:
    - `addItem(item: CartItem): void`
    - `updateQuantity(itemId: string, quantity: number): void` (clamp entre 1 y 10)
    - `removeItem(itemId: string): void`
    - `clearCart(): void`
  - Consumidores identificados: `Header` (badge), `CartDrawer`, `CartPage`, `ProductDetailPage`, `CheckoutPage`, `OrderConfirmationPage`.
  - Datos excluidos: Catálogo de productos (en Query), datos de envío (en Mantine Form) y estado de modales (en Mantine).
- **Interacción obligatoria con Mantine Modal (9.4.1):**
  - Propósito: Confirmar la eliminación de una prenda ante reducción a 0 o clic en basura (RN-08).
  - Disparador: Evento `onClick` de `(-)` cuando `quantity === 1` o botón "Eliminar prenda".
  - Control de apertura: Hook local `useDisclosure(false)` de Mantine.
  - Contenido: Miniatura, nombre de prenda, talla y mensaje de advertencia "¿Eliminar prenda de tu bolsa?".
  - Cancelación: Cierra el modal sin modificar el store; la prenda se conserva con cantidad 1.
  - Confirmación: Ejecuta `removeItem(item.id)`, cierra el modal y recalcula reactivamente el subtotal.

## Dependencies, rollout, risks, and validation
- **Dependencias:** `zustand@5.0.15`, `@mantine/core@9.4.1`, `react-router@8.3.1`.
- **Validación prevista:** Pruebas puras en Vitest de las acciones del store (`addItem`, `updateQuantity`, `removeItem`, `clearCart`) y verificación de apertura y cierre del Modal de Mantine.

## Decisions and open questions
- **Decisión confirmada:** Estado en memoria de sesión para la entrega del bootcamp; persistencia multi-dispositivo con tokens registrada como mejora futura con backend.
- **Preguntas abiertas:** Ninguna.
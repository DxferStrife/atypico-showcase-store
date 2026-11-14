# Registro de Proceso y Decisiones — Fase 1 y Fase 2

## 1. Verificación Inicial del Entorno (Preflight AHK 3.0.0)

| Comprobación | Comando / Herramienta | Resultado | Límite / Alcance |
| :--- | :--- | :--- | :--- |
| **CLI AHK** | `ahk --version` | `3.0.0` (Exitoso) | Valida versión global instalada en el sistema. |
| **Plantilla Base** | `pnpm create vite@9.2.0 ...` | React 19.2.8 + Vite 8.2.2 + TS 6.0.3 | Plantilla base limpia; no incluye código de producto. |
| **Diagnóstico Harness** | `ahk doctor` | `agent files: [✓]`, `skills: [✓]` | Valida archivos de agente y skills presentes. |
| **Salud del Espacio** | `ahk health` (vía `health.bat` -> `pnpm build`) | `Health check passed` (161ms) | Comprueba que la plantilla compila sin errores. |
| **Conexión MCP Real** | `specs.list` vía `ahk serve` (stdio JSON-RPC) | `items: 8`, `isError: false` | Valida que el servidor MCP responde lecturas reales de casos y specs. |

---

## 2. Decisiones de Negocio y Casos de Uso (Fase 1)

### Decisión 1: Producto a construir — Tienda E-commerce Insignia de Atypico
* **Fecha:** 2026-10-26
* **Definición confirmada por el estudiante:** El producto para el bootcamp es la **tienda e-commerce insignia (Showcase Store)** creada por Atypico Studio para demostrar en la práctica el valor de su propuesta: una experiencia de compra rápida, con catálogo optimizado, carrito y checkout sin fricciones.
* **Actor principal:** Comprador / Cliente de la tienda en línea.
* **Problema que resuelve:** Permite al negocio vender de manera automatizada las 24 horas, eliminando la fricción y lentitud de tomar pedidos manualmente por WhatsApp o redes sociales.
* **Exclusiones confirmadas:** Se excluye la gestión de inventario interna y pasarelas de pago bancarias reales (se simula el flujo de compra para validar la lógica funcional).

### Decisión 2: Dominio de la tienda — Moda Urbana (Streetwear)
* **Fecha:** 2026-10-26
* **Definición:** Tienda de ropa urbana ficticia (hoodies, camisetas oversize, gorras, pantalones cargo).
* **Motivo:** Permite ilustrar con claridad variantes de productos (tallas S/M/L/XL y colores), inventario visual y filtros directos, alineado al tono no genérico de Atypico.

### Decisión 3: Modalidad de pago y cierre de orden (WhatsApp + Transferencia)
* **Fecha:** 2026-10-26
* **Pregunta / Propuesta:** ¿Cómo debe completarse el pago en el checkout?
* **Decisión del estudiante:** No se integrará una pasarela bancaria con tarjeta de crédito en esta fase. El pedido recopila los datos de envío, genera un número de orden con el monto final, muestra los datos para transferencia bancaria y genera un enlace directo a WhatsApp con el mensaje pre-armado para enviar el comprobante de pago.
* **Justificación técnica y pedagógica:** Es una exclusión de alcance totalmente justificada que refleja el modelo de venta real de muchas marcas independientes de moda urbana, permitiendo validar la lógica de checkout en React sin depender de infraestructura bancaria compleja.
* **Casos de uso afectados:** CU-04.

---

## 3. Decisiones de Procesos y Reglas de Negocio (Fase 2)

### Decisión 4: Agrupación de especificaciones funcionales
* **Fecha:** 2026-11-08
* **Pregunta planteada:** ¿Agrupar en 2 especificaciones temáticas o estructurar 1 especificación funcional por cada caso de uso?
* **Elección confirmada por el estudiante:** **4 especificaciones funcionales individuales**, manteniendo una correspondencia 1:1 con los casos de uso aprobados para máxima claridad en la trazabilidad.
* **Documentos creados y aprobados:**
  - `spec-01-exploracion-y-filtrado-catalogo` (Vinculada a `CU-01`)
  - `spec-02-detalle-prenda-y-seleccion-variantes` (Vinculada a `CU-02`)
  - `spec-03-gestion-y-auditoria-carrito-compras` (Vinculada a `CU-03`)
  - `spec-04-checkout-liquidacion-y-cierre-whatsapp` (Vinculada a `CU-04`)

### Decisión 5: Regla de reducción a cero en carrito (`RN-08`)
* **Fecha:** 2026-11-08
* **Pregunta planteada:** ¿Qué debe suceder si el usuario pulsa `(-)` sobre una prenda cuya cantidad es 1? ¿Se remueve automáticamente o se solicita confirmación previa?
* **Elección confirmada por el estudiante:** **Confirmación previa dialogada.** Se despliega un diálogo de confirmación antes de remover el producto para evitar eliminaciones accidentales de prendas deseadas.

---

## 4. Catálogo de Fuentes Aprobadas en AHK

### Casos de Uso (Fase 1)
| ID | Título | Estado | Archivo gestionado |
| :--- | :--- | :--- | :--- |
| **CU-01** | Explorar catálogo y filtrar prendas por categoría y talla | `approved` | `docs/use-cases/cu-01-explorar-catalogo-y-filtrar.md` |
| **CU-02** | Consultar detalle de prenda y seleccionar variantes | `approved` | `docs/use-cases/cu-02-detalle-prenda-y-variantes.md` |
| **CU-03** | Gestionar el carrito de compras | `approved` | `docs/use-cases/cu-03-gestionar-carrito-de-compras.md` |
| **CU-04** | Completar checkout y confirmación de pedido | `approved` | `docs/use-cases/cu-04-checkout-y-confirmacion-pedido.md` |

### Especificaciones Funcionales (Fase 2)
| ID | Título | Estado | Archivo gestionado |
| :--- | :--- | :--- | :--- |
| **SPEC-01** | Exploración y filtrado de catálogo de prendas | `approved` | `docs/specs/spec-01-exploracion-y-filtrado-catalogo.md` |
| **SPEC-02** | Detalle de prenda y selección de variantes | `approved` | `docs/specs/spec-02-detalle-prenda-y-seleccion-variantes.md` |
| **SPEC-03** | Gestión y auditoría de la bolsa de compras | `approved` | `docs/specs/spec-03-gestion-y-auditoria-carrito-compras.md` |
| **SPEC-04** | Checkout, liquidación de flete y cierre por WhatsApp | `approved` | `docs/specs/spec-04-checkout-liquidacion-y-cierre-whatsapp.md` |

---

## 5. Compilación del Entregable Final Acumulativo (Fase 2)
* **Fecha de generación:** 2026-11-08
* **Documento acumulativo Markdown:** `docs/entregas/fase-02.md` (20 secciones obligatorias completas, alineadas con la rúbrica del bootcamp).
* **Documento intermedio HTML:** `docs/entregas/fase-02.html` (57.9 KB).
* **Documento entregable PDF:** `docs/entregas/atypico-showcase-fase-02.pdf` (684 KB).
* **Estado de verificación:** Verificado con éxito mediante Edge headless y perfil aislado; archivo listo para entrega y defensa.

---

## 6. Verificación Inicial y Preflight (Fase 3 · AHK 3.0.0)

| Comprobación | Comando / Herramienta | Resultado | Límite / Alcance |
| :--- | :--- | :--- | :--- |
| **CLI AHK** | `ahk --version` | `3.0.0` (Exitoso) | Confirma versión de CLI oficial activa. |
| **Plantilla y Salud** | `ahk health` (vía `pnpm build`) | `Health check passed` (364ms) | Compilación limpia de Vite 8.2.2 + TS en React 19. |
| **Skill ahk-spec-tech** | Lectura de workflow y template | `.cursor/skills/ahk-spec-tech` [✓] | Plantilla y estructura de spec-tech verificadas. |
| **Conexión MCP Real** | `specs.list` vía `ahk serve` | `items: 12`, `isError: false` | 4 use-cases, 4 specs funcionales y 4 spec-tech aprobadas. |
| **Validación de Especificaciones** | `specs.validate` vía MCP | `valid: true, errors: []` | Integridad y enlaces `sourceSpec` 100% conformes. |

---

## 7. Decisiones Técnicas Confirmadas (Fase 3)

### Decisión Técnica 1: Navegación y Rutas con React Router 8.3.1
* **Fecha:** 2026-11-10
* **Pregunta / Alternativa:** ¿Rutas planas directas con páginas dedicadas o carrito puramente modal sin URL propia?
* **Decisión del estudiante:** Se adopta la **Opción A enriquecida**. Se establecen rutas declarativas dedicadas (`/`, `/producto/:id`, `/carrito`, `/checkout`, `/confirmacion/:orderId`, `*`) complementadas con un `CartDrawer` de previsualización rápida en la cabecera que contiene un acceso directo a `/carrito` para auditar la compra completa.
* **Justificación:** Garantiza navegabilidad nativa, posibilidad de recargar y compartir enlaces directos al producto y a la bolsa sin romper el estado de la aplicación.

### Decisión Técnica 2: Gestión de Datos Remotos con TanStack Query 5.102.8
* **Fecha:** 2026-11-10
* **Pregunta / Alternativa:** ¿Consulta remota del catálogo y cómo tratar mutaciones remotas?
* **Decisión del estudiante:** Se adopta la **Opción A**. TanStack Query administra el catálogo remoto de prendas mediante `queryKey: ['products']` y el detalle individual mediante `queryKey: ['product', id]`, controlando estados `isPending` (esqueletos de carga), `isError` (mensaje y reintento), `isSuccess` (renderizado) e `isEmpty` (catálogo sin resultados). Se declara explícitamente que la tienda **no realiza mutaciones remotas** a un backend transaccional porque el cierre se realiza fuera de banda por WhatsApp y transferencia bancaria, evitando inventar endpoints artificiales conforme a la Sección 5 y 27 de la consigna.

### Decisión Técnica 3: Responsabilidad de Estado Global con Zustand 5.0.15
* **Fecha:** 2026-11-10
* **Pregunta / Alternativa:** ¿Manejo del estado de la bolsa de compras y almacenamiento?
* **Decisión del estudiante:** Se adopta la **Opción A** para la entrega actual. Se diseña el store de cliente `useCartStore` administrando estrictamente la bolsa de compras (`items: CartItem[]`) y sus acciones (`addItem`, `updateQuantity`, `removeItem`, `clearCart`), conservando el estado en memoria de JavaScript durante la sesión. Se documenta formalmente en mejoras futuras que la sincronización multi-dispositivo y persistencia con tokens se integrará cuando el estudio implemente su backend transaccional propio.

### Decisión Técnica 4: Formulario Reactivo con Zod 4.4.3 y Mantine Form 9.4.1
* **Fecha:** 2026-11-10
* **Pregunta / Alternativa:** ¿Validación de checkout al hacer submit o validación en tiempo real?
* **Decisión del estudiante:** Validación reactiva en **tiempo real** (`validateInputOnChange: true` / `validateInputOnBlur: true`). Conforme el comprador completa o modifica los campos (`fullName`, `phone` de 10 dígitos, `city` con regla `RN-10`, `address`), el schema de Zod evalúa en tiempo real y resalta errores en rojo con mensajes orientativos para no obligar al usuario a esperar hasta el submit final.

### Decisión Técnica 5: Integración y Ciclo de Vida de Mantine Modal 9.4.1
* **Fecha:** 2026-11-10
* **Pregunta / Alternativa:** ¿Comportamiento ante reducción a cero en la bolsa (`RN-08`)?
* **Decisión del estudiante:** Integración de un **Mantine Modal de confirmación previa**. Cuando el usuario presiona `(-)` con cantidad 1 o pulsa el botón de eliminar, se abre un diálogo modal con los datos de la prenda y advertencia. Si cancela o presiona `Esc`, la prenda se conserva en cantidad 1; si confirma, se ejecuta `removeItem` en Zustand y se recalcula reactivamente el subtotal. El estado del modal se administra localmente mediante el hook `useDisclosure` de Mantine.

---

## 8. Catálogo Completo de Especificaciones Aprobadas en AHK

### Especificaciones Técnicas (Fase 3)
| ID | Título | Estado | Documento origen | Archivo gestionado |
| :--- | :--- | :--- | :--- | :--- |
| **SPEC-TECH-01** | Arquitectura y consulta remota de catálogo con TanStack Query | `approved` | `spec-01` | `docs/specs/spec-tech-01-catalogo-y-filtros-query.md` |
| **SPEC-TECH-02** | Vista de producto, selección de variantes y navegación de detalle | `approved` | `spec-02` | `docs/specs/spec-tech-02-detalle-variantes-carrusel.md` |
| **SPEC-TECH-03** | Gestión de bolsa con Zustand y confirmación con Mantine Modal | `approved` | `spec-03` | `docs/specs/spec-tech-03-bolsa-zustand-y-modal-confirmacion.md` |
| **SPEC-TECH-04** | Formulario reactivo con Zod, Mantine Form y cierre estructurado WhatsApp | `approved` | `spec-04` | `docs/specs/spec-tech-04-checkout-zod-mantine-form-whatsapp.md` |

---

## 9. Compilación del Entregable Final Acumulativo (Fase 3)
* **Fecha de generación:** 2026-11-10
* **Documento acumulativo Markdown:** `docs/entregas/fase-03.md` (30 secciones obligatorias completas, 76.5 KB, integrando las 3 fases sin contradicciones).
* **Documento intermedio HTML:** `docs/entregas/fase-03.html` (94 KB).
* **Documento entregable PDF:** `docs/entregas/atypico-showcase-fase-03.pdf` (1.14 MB).
* **Estado de verificación:** Verificado con éxito mediante Edge headless y perfil aislado; archivo listo para entrega y defensa.

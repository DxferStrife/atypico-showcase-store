# Proyecto · Fase 2: Procesos y Reglas del Negocio
**Atypico Studio — Showcase E-commerce de Moda Urbana**

---

## 1. Identificación del proyecto
* **Nombre del producto:** Atypico Showcase Store (Tienda E-commerce Insignia de Moda Urbana).
* **Estudio creador:** Atypico Studio.
* **Autor / Estudiante:** Fernando.
* **Cohorte:** Bootcamp de Desarrollo Frontend & React.
* **Entrega:** Fase 2 · Procesos y reglas del negocio (Documento acumulativo).
* **Fecha:** 8 de noviembre de 2026.
* **Versión del documento:** 2.0.0.

---

## 2. Problema y contexto
En el ecosistema de marcas independientes de moda urbana (*streetwear*), la gran mayoría de marcas emergentes inician comercializando a través de redes sociales (Instagram, TikTok) o canales de mensajería (WhatsApp).

### La dificultad persistente
1. **Lentitud y fricción en la atención:** Los clientes deben preguntar por disponibilidad de prendas, tallas y colores mediante mensajes directos, esperando horas para recibir respuesta manual.
2. **Caída de ventas y abandono:** La falta de un catálogo interactivo con stock en tiempo real y la solicitud manual de transferencias bancarias provoca que muchos compradores desistan del proceso de compra.
3. **Plantillas web genéricas y lentas:** Cuando los negocios intentan digitalizarse con plantillas predeterminadas de agencias tradicionales, obtienen sitios web pesados, impersonales y difíciles de navegar que no reflejan la identidad de la marca.

### Oportunidad de Atypico Studio
Atypico Studio desarrolla este e-commerce de demostración como vitrina técnica e insignia para evidenciar cómo una arquitectura web moderna, no genérica y optimizada para conversión puede automatizar la captación de pedidos, transparentar inventarios y conectar la orden directamente con WhatsApp para un cierre ágil de la venta.

---

## 3. Usuarios y objetivos
* **Actor principal:** Comprador de moda urbana.
  * **Perfil:** Persona interesada en prendas streetwear (camisetas oversize, pantalones cargo, accesorios) que busca una experiencia visual rápida, clara y sin fricciones técnicas.
  * **Objetivo:** Explorar la colección disponible, filtrar prendas según su talla y estilo, revisar detalles de materiales y medidas, y confirmar un pedido con cálculo exacto de envío e instrucciones claras de pago.
* **Actor secundario (Receptor externo):** Asesor de ventas / Administrador de la tienda.
  * **Interacción:** No accede a un panel de administración en la aplicación web en esta fase; recibe el pedido estructurado y el comprobante de transferencia bancaria directamente a través de WhatsApp para coordinar el despacho.

---

## 4. Descripción general de la solución
La solución consiste en una aplicación web e-commerce de alto rendimiento construida a medida para Atypico Studio, que representa una tienda de moda urbana con las siguientes capacidades funcionales:

### Recorrido de principio a fin
1. **Descubrimiento y catálogo:** El comprador ingresa a la tienda y visualiza la colección destacada. Puede filtrar inmediatamente por categorías clave (*Camisetas Oversize*, *Pantalones Cargo*, *Accesorios*) y por talla (S, M, L, XL), con retroalimentación visual de stock en tiempo real.
2. **Selección y detalle:** Al seleccionar una prenda, consulta la ficha técnica (composición textil, corte boxy fit, tabla de medidas y fotos) y selecciona su combinación de talla y color. Al presionar "Añadir a la bolsa", la prenda se suma al carrito de compras con una notificación flotante (toast) y actualización instantánea del contador superior.
3. **Revisión de bolsa:** En la vista del carrito, el comprador revisa los ítems agregados, modifica cantidades con controles (+/-) o elimina prendas. Si intenta reducir de 1 a 0 unidades, el sistema despliega una confirmación dialogada preventiva. El subtotal se liquida de inmediato sin flete.
4. **Checkout y cierre por WhatsApp:** El comprador completa sus datos de entrega. Al seleccionar su ciudad, el sistema calcula de forma reactiva el costo de envío ($3.50 local / $5.00 nacional) y liquida el total. Al confirmar la orden, se genera un identificador único (ej. `#ATY-8421`), se presentan los datos bancarios y se habilita un botón que abre WhatsApp con el mensaje pre-estructurado para enviar el comprobante de transferencia y procesar el despacho.

---

## 5. Alcance inicial y exclusiones

### Capacidades comprometidas en la versión inicial
* Catálogo dinámico con filtrado reactivo por categorías y tallas en memoria.
* Bloqueo visual e interactivo de opciones sin stock para evitar búsquedas sin resultados.
* Ficha de detalle de producto con selección de variantes de talla y color.
* Carrito de compras con controles de incremento, decremento y confirmación previa de eliminación, cálculo reactivo de subtotales y estado vacío guiado.
* Formulario de checkout con validación de campos obligatorios y liquidación de flete según ciudad local o nacional.
* Generador de código de orden único `#ATY-XXXX` y formateo automático de mensaje de WhatsApp con resumen del pedido y datos bancarios.

### Exclusiones explícitas y su justificación
1. **Pasarelas de pago bancarias automatizadas (Stripe / Tarjetas de crédito):**  
   * *Justificación:* Se excluyen para evitar dependencias de backends transaccionales complejos en esta fase formativa y porque refleja el modelo real de venta directa por transferencia y WhatsApp de marcas independientes de moda urbana.
2. **Panel de administración y autenticación de usuarios:**  
   * *Justificación:* La consigna solicita explícitamente no inventar logins ni roles administrativos que no formen parte del valor central para el comprador. El negocio gestiona la orden recibida mediante el comprobante enviado a su canal de atención.
3. **Gestión de inventario multi-bodega:**  
   * *Justificación:* El stock se maneja a nivel de catálogo de frontend para validar la reactividad y las reglas de negocio de la interfaz.

---

## 6. Secciones o pantallas previstas

| Pantalla / Sección | Propósito | Información que muestra | Acciones que permite | Casos de uso relacionados |
| :--- | :--- | :--- | :--- | :--- |
| **1. Catálogo / Colección** | Presentar todas las prendas de la marca y permitir su filtrado ágil. | Cuadrícula de productos, imagen destacada, categoría, precio, selector de categorías y botones de tallas con disponibilidad. | Filtrar por categoría, filtrar por talla, limpiar filtros y seleccionar una prenda para ver su detalle. | CU-01 / SPEC-01 |
| **2. Ficha de Detalle** | Brindar la información técnica completa de una prenda seleccionada. | Galería de fotos, nombre, precio, descripción de materiales y corte streetwear, selector de talla y color, estado de stock. | Elegir talla y color, pulsar "Añadir a la bolsa" y volver a la colección. | CU-02 / SPEC-02 |
| **3. Carrito de Compras** | Auditar y ajustar los artículos antes de formalizar la compra. | Lista de prendas añadidas (talla, color, precio unitario, subtotal), controles (+/-), botón de eliminar, subtotal acumulado y aviso de flete diferido. | Aumentar/disminuir unidades, confirmar eliminación en diálogo, vaciar bolsa y pulsar "Continuar al checkout". | CU-03 / SPEC-03 |
| **4. Checkout y Entrega** | Recopilar información de envío y calcular el costo de transporte. | Formulario de datos (Nombre, Teléfono, Ciudad, Dirección), resumen de orden y cálculo reactivo del total según ciudad. | Ingresar datos de contacto, seleccionar ciudad local o nacional, ver cálculo de envío y confirmar pedido. | CU-04 / SPEC-04 |
| **5. Confirmación de Orden** | Entregar el comprobante formal del pedido y habilitar el canal de pago. | Código de orden (`#ATY-XXXX`), total a transferir, resumen de prendas, datos de cuenta bancaria y botón de WhatsApp. | Copiar datos bancarios y presionar "Enviar comprobante por WhatsApp". | CU-04 / SPEC-04 |

---

## 7. Casos de uso de la versión inicial

### Catálogo de casos de uso aprobados en AHK 3.0.0

| Identificador AHK | Nombre | Actor | Objetivo | Archivo fuente gestionado |
| :--- | :--- | :--- | :--- | :--- |
| `cu-01-explorar-catalogo-y-filtrar` | Explorar catálogo y filtrar prendas por categoría y talla | Comprador | Encontrar prendas disponibles por estilo y talla | [`docs/use-cases/cu-01-explorar-catalogo-y-filtrar.md`](../use-cases/cu-01-explorar-catalogo-y-filtrar.md) |
| `cu-02-detalle-prenda-y-variantes` | Consultar detalle de prenda y seleccionar variantes | Comprador | Conocer ficha técnica y elegir talla/color | [`docs/use-cases/cu-02-detalle-prenda-y-variantes.md`](../use-cases/cu-02-detalle-prenda-y-variantes.md) |
| `cu-03-gestionar-carrito-de-compras` | Gestionar el carrito de compras | Comprador | Ajustar prendas y revisar subtotal consolidado | [`docs/use-cases/cu-03-gestionar-carrito-de-compras.md`](../use-cases/cu-03-gestionar-carrito-de-compras.md) |
| `cu-04-checkout-y-confirmacion-pedido` | Completar checkout y confirmación de pedido | Comprador | Formalizar orden y enviar comprobante a WhatsApp | [`docs/use-cases/cu-04-checkout-y-confirmacion-pedido.md`](../use-cases/cu-04-checkout-y-confirmacion-pedido.md) |

---

### Fichas consolidadas de casos de uso

#### Ficha CU-01: Explorar catálogo y filtrar prendas por categoría y talla
1. **Identificador y nombre:** `cu-01-explorar-catalogo-y-filtrar` — Explorar catálogo y filtrar prendas por categoría y talla.
2. **Actor principal y objetivo:** Comprador de moda urbana. Busca visualizar prendas disponibles filtradas por categoría y talla sin demoras.
3. **Situación que lo inicia y condiciones previas:** El usuario ingresa a la tienda online. El catálogo contiene prendas cargadas en las categorías Camisetas Oversize, Pantalones Cargo y Accesorios.
4. **Pasos del recorrido principal:**
   * El comprador accede al catálogo; el producto despliega la cuadrícula con las prendas disponibles.
   * El comprador pulsa sobre una categoría específica (*"Camisetas Oversize"*); el producto actualiza la vista mostrando únicamente prendas de esa categoría.
   * El comprador selecciona un filtro de talla (*"L"*); el producto filtra las prendas con stock en L y deshabilita los botones de tallas agotadas (Regla `RN-02`).
   * El comprador selecciona una prenda para ver su detalle.
5. **Alternativas, errores y restricciones:**
   * *A1 (Deselección):* Al pulsar nuevamente sobre la categoría activa o en "Ver todos", el producto restaura la vista completa (`RN-03`).
   * *A2 (Prevención de vacíos):* Las tallas sin inventario aparecen en estado deshabilitado para evitar pantallas sin resultados (`RN-02`).
   * *RN-01:* Solo se reconocen las categorías pactadas: Camisetas Oversize, Pantalones Cargo y Accesorios.
6. **Resultado observable:** Cuadrícula de productos filtrada en tiempo real según categoría y talla con precios y disponibilidad visible.
7. **Criterios de aceptación:** `CA-01`, `CA-02`, `CA-03`, `CA-04`.

#### Ficha CU-02: Consultar detalle de prenda y seleccionar variantes
1. **Identificador y nombre:** `cu-02-detalle-prenda-y-variantes` — Consultar detalle de prenda y seleccionar variantes.
2. **Actor principal y objetivo:** Comprador de moda urbana. Conocer en detalle la prenda (materiales, corte, fotos), elegir talla/color y añadirla a la bolsa.
3. **Situación que lo inicia y condiciones previas:** El comprador hace clic sobre una tarjeta de producto en el catálogo. La prenda existe y cuenta con al menos una variante activa.
4. **Pasos del recorrido principal:**
   * El comprador hace clic en una prenda; el producto presenta la ficha técnica con fotos, categoría, precio, descripción de materiales y selectores de talla y color.
   * El comprador selecciona talla (ej. "M") y color disponible; el producto actualiza la disponibilidad de la variante.
   * El comprador pulsa "Añadir a la bolsa"; el producto suma el artículo al carrito, incrementa el contador numérico en la barra superior (+1) y muestra una notificación flotante (toast) de confirmación temporal permaneciendo en la vista (`RN-05`).
5. **Alternativas, errores y restricciones:**
   * *A1 (Talla agotada):* Si la talla elegida no tiene existencias, el botón principal cambia a "Agotado en esta talla" y se bloquea (`RN-06`).
   * *A2 (Retorno):* El comprador puede pulsar "← Volver a la colección" conservando sus filtros anteriores.
   * *RN-04:* Selección obligatoria de talla antes de permitir adición a bolsa.
6. **Resultado observable:** Prenda incorporada a la bolsa con actualización inmediata del contador de la barra superior y toast visible por 3 segundos.
7. **Criterios de aceptación:** `CA-05`, `CA-06`, `CA-07`, `CA-08`.

#### Ficha CU-03: Gestionar el carrito de compras
1. **Identificador y nombre:** `cu-03-gestionar-carrito-de-compras` — Gestionar el carrito de compras.
2. **Actor principal y objetivo:** Comprador de moda urbana. Revisar artículos en la bolsa, modificar cantidades, eliminar prendas y verificar el subtotal antes de pagar.
3. **Situación que lo inicia y condiciones previas:** El comprador pulsa el ícono de la bolsa en la barra superior.
4. **Pasos del recorrido principal:**
   * El comprador abre el carrito; el producto lista las prendas agregadas con miniatura, nombre, talla, precio unitario, controles de cantidad (+/-) y subtotal acumulado.
   * El comprador modifica cantidades con (+) o (-); el producto actualiza la cantidad de la fila y recalcula el subtotal general en tiempo real.
   * El comprador verifica el subtotal y observa el aviso de que el envío se calcula en el siguiente paso (`RN-07`).
   * El comprador pulsa "Continuar al checkout"; el producto redirige al formulario de checkout conservando los montos.
5. **Alternativas, errores y restricciones:**
   * *A1 (Bolsa vacía):* Si no hay artículos, muestra "Tu bolsa está vacía" con botón para volver al catálogo y bloquea el botón de checkout (`RN-10`).
   * *A2 (Reducción a cero dialogada):* Si el usuario pulsa (-) con cantidad en 1, se despliega confirmación modal previa (`RN-08`).
   * *A3 (Límite de stock):* Si se alcanza el stock máximo de una variante, el botón (+) se deshabilita con aviso de límite alcanzado (`RN-09`).
6. **Resultado observable:** Carrito con lista detallada por prenda y talla, controles operativos de modificación y subtotal exacto.
7. **Criterios de aceptación:** `CA-09`, `CA-10`, `CA-11`, `CA-12`, `CA-13`.

#### Ficha CU-04: Completar checkout y confirmación de pedido
1. **Identificador y nombre:** `cu-04-checkout-y-confirmacion-pedido` — Completar checkout y confirmación de pedido.
2. **Actor principal y objetivo:** Comprador de moda urbana. Formalizar datos de envío, conocer el flete según ciudad, generar código de orden y enviar comprobante a WhatsApp.
3. **Situación que lo inicia y condiciones previas:** El comprador pulsa "Continuar al checkout" con al menos un artículo en la bolsa. La tienda tiene definidos sus datos bancarios y número de WhatsApp.
4. **Pasos del recorrido principal:**
   * El comprador accede al formulario de checkout; el producto despliega campos para Nombre, Teléfono/WhatsApp, Ciudad y Dirección.
   * El comprador completa sus datos y selecciona su ciudad; el producto calcula el flete en tiempo real ($3.50 local / $5.00 nacional) y liquida el total definitivo (`RN-11`).
   * El comprador pulsa "Confirmar pedido y pagar por transferencia"; el producto valida campos (`RN-12`), genera un código de orden único `#ATY-XXXX` (`RN-13`), registra la orden y vacía el carrito (`RN-14`).
   * El producto presenta la pantalla de confirmación con código de orden, total liquidado, datos bancarios para transferencia y botón "Enviar comprobante por WhatsApp".
   * El comprador pulsa el botón; el producto abre WhatsApp con un mensaje pre-cargado conteniendo el número de orden, monto y solicitud de despacho (`RN-15`).
5. **Alternativas, errores y restricciones:**
   * *A1 (Campos incompletos):* Si faltan campos requeridos, se resaltan en rojo con avisos y no se procesa la orden (`RN-12`).
   * *A2 (Acceso indebido):* Si se accede al checkout sin artículos en la bolsa, se redirige de inmediato al catálogo.
   * *RN-16:* No se solicitan datos de tarjetas bancarias en la web.
6. **Resultado observable:** Pantalla de pedido confirmado con código único, datos bancarios claros y enlace a WhatsApp con mensaje automático estructurado.
7. **Criterios de aceptación:** `CA-14`, `CA-15`, `CA-16`, `CA-17`, `CA-18`.

---

## 8. Decisiones y preguntas pendientes

### Decisiones confirmadas (Fase 1 y Fase 2)
* **Enfoque del producto:** Tienda e-commerce insignia de demostración de Atypico Studio para mostrar capacidad técnica y de conversión.
* **Dominio comercial:** Moda Urbana / Streetwear con categorías Camisetas Oversize, Pantalones Cargo y Accesorios.
* **Modelo de cierre y cobro:** Exclusión de pasarelas de tarjeta automatizadas; adopción de transferencia bancaria y confirmación vía WhatsApp.
* **Filtros preventivos:** Deshabilitación visual de tallas sin stock para evitar vistas vacías (`RN-02`).
* **Feedback de carrito:** Notificación Toast y badge numérico en barra superior al añadir productos (`RN-05`).
* **Logística:** Envío liquidado en checkout según ciudad: $3.50 local / $5.00 nacional (`RN-11`).
* **Estructura de especificaciones:** Adopción de 4 especificaciones funcionales 1:1 con los casos de uso aprobados (`SPEC-01` a `SPEC-04`).
* **Eliminación controlada en carrito:** Confirmación dialogada al reducir de 1 a 0 para prevenir eliminaciones accidentales (`RN-08`).

### Preguntas abiertas / Supuestos por validar en Fase 3
* **Persistencia local:** ¿Se utilizará `localStorage` para conservar el carrito si el usuario cierra la pestaña o recarga la página, o se mantendrá exclusivamente en estado en memoria de React? (Se definirá en el diseño técnico con `ahk-spec-tech`).
* **Estructura del mock data:** ¿Se agruparán las variantes en un array plano dentro de cada producto o como sub-objetos anidados? (Se definirá en la arquitectura de tipos de la Fase 3).

---

## 9. Decisiones propias y uso de IA
*(Redacción personal del estudiante según el registro de trabajo)*

> "Mi proyecto es la tienda E-commerce de moda urbana para que sea una referencia de lo que puede realizar Atypico Studio, el e-commerce que voy a crear es una demostración de lo que puede hacer Atypico Studio. Excluí las pasarelas de pago por ser muy complejas actualmente.
>
> Elegí moda urbana en lugar de otras propuestas generadas por la IA y modifiqué los casos de uso en el cálculo del envío y la forma de pago, enfocándome en cómo convertir clics en potenciales ventas.
>
> Para la Fase 2, definí que el sistema se estructurara en 4 especificaciones funcionales directas. Además, precisé una regla clave de usabilidad: cuando un comprador tiene una sola prenda en su carrito y presiona el botón (-) para restar, el sistema no la borra bruscamente, sino que le pide una confirmación previa para no perder su selección por error. Un ejemplo válido es cuando un comprador tiene 1 Hoodie en su bolsa, presiona (-), se abre la ventana de confirmación, acepta y el ítem se remueve; si cancela, el Hoodie permanece en su bolsa.
>
> La IA me ayudó a estructurar las ideas claras que tenía en documentos formales que los agentes y el harness de AHK pueden entender y validar en poco tiempo."

---

## 10. Fuentes y comprobaciones de esta fase

### Archivos fuente y especificaciones de AHK 3.0.0
* `docs/use-cases/cu-01-explorar-catalogo-y-filtrar.md` (`approved`)
* `docs/use-cases/cu-02-detalle-prenda-y-variantes.md` (`approved`)
* `docs/use-cases/cu-03-gestionar-carrito-de-compras.md` (`approved`)
* `docs/use-cases/cu-04-checkout-y-confirmacion-pedido.md` (`approved`)
* `docs/specs/spec-01-exploracion-y-filtrado-catalogo.md` (`approved`)
* `docs/specs/spec-02-detalle-prenda-y-seleccion-variantes.md` (`approved`)
* `docs/specs/spec-03-gestion-y-auditoria-carrito-compras.md` (`approved`)
* `docs/specs/spec-04-checkout-liquidacion-y-cierre-whatsapp.md` (`approved`)
* `docs/proceso.md` (Registro cronológico de decisiones reales)
* `agent-harness-kit.config.json` (Configuración local del harness)

### Registro de comprobaciones técnicas ejecutadas

| Comprobación ejecutada | Comando / Protocolo | Resultado obtenido | Límite y alcance de la prueba |
| :--- | :--- | :--- | :--- |
| **Versión de CLI AHK** | `ahk --version` | `3.0.0` | Confirma la instalación del CLI global oficial en el sistema. |
| **Plantilla base React** | `pnpm create vite@9.2.0 ...` | React 19.2.8 + Vite 8.2.2 + TS 6.0.3 | Confirma la creación del espacio de trabajo limpio sin código de producto. |
| **Diagnóstico del Harness** | `ahk doctor` | `agent files: [✓]`, `skills: [✓]` | Valida que las plantillas de agentes y skills están presentes y al día. |
| **Comprobación de salud** | `ahk health` (vía `health.bat` -> `pnpm build`) | `Health check passed` (161ms) | Comprueba que la compilación de la base es limpia; no prueba funcionalidades futuras. |
| **Lectura real a MCP** | `specs.list` vía `ahk serve` (stdio JSON-RPC) | `items: 8`, `isError: false` | Valida la conectividad real con el servidor MCP y los 4 casos y 4 specs aprobados. |
| **Lectura final y coherencia** | Inspección de títulos y referencias | 20 apartados completos y alineados | Verifica que todas las secciones coinciden con las decisiones del estudiante. |

---

## 11. Procesos detallados

### PR-01: Filtrado y navegación de prendas urbanas
* **Identificador documental:** `PR-01`
* **Casos relacionados:** `CU-01` (`SPEC-01`).
* **Actor:** Comprador de moda urbana.
* **Inicio (Trigger):** El usuario ingresa a la tienda online o pulsa la sección "Colección".
* **Condiciones previas:** El catálogo contiene productos precargados con precio, variantes e inventario.
* **Datos de entrada:** Categoría pulsada (opcional), talla seleccionada (opcional).
* **Pasos usuario / producto:**
  1. El usuario visualiza la cuadrícula de productos completa.
  2. El usuario hace clic en una píldora de categoría (ej. "Pantalones Cargo"). El sistema filtra reactivamente los artículos mostrados.
  3. El usuario pulsa un botón de talla (ej. "M"). El sistema filtra las prendas con disponibilidad en talla M y desactiva las tallas sin stock.
* **Decisiones:** Si se pulsa la categoría activa nuevamente, se limpia el filtro.
* **Reglas aplicables:** `RN-01`, `RN-02`, `RN-03`.
* **Resultado:** Lista de productos filtrada en tiempo real.

### PR-02: Inspección de ficha técnica y adición de variantes
* **Identificador documental:** `PR-02`
* **Casos relacionados:** `CU-02` (`SPEC-02`).
* **Actor:** Comprador de moda urbana.
* **Inicio (Trigger):** Clic sobre una tarjeta de prenda en el catálogo.
* **Condiciones previas:** Prenda activa con al menos una variante registrada.
* **Datos de entrada:** Talla elegida, color elegido, clic en "Añadir a la bolsa".
* **Pasos usuario / producto:**
  1. El producto despliega la ficha con galería, precio, composición textil y corte. Preselecciona la primera talla con stock.
  2. El usuario elige su combinación de talla y color.
  3. El usuario pulsa "Añadir a la bolsa". El producto suma la unidad a la bolsa, actualiza el badge en la cabecera (+1) y muestra una notificación Toast temporal (3 segundos).
* **Decisiones:** Si la variante no tiene existencias, el botón se bloquea mostrando "Agotado".
* **Reglas aplicables:** `RN-04`, `RN-05`, `RN-06`.
* **Resultado:** Prenda añadida a la bolsa sin salir de la ficha.

### PR-03: Gestión y auditoría de la bolsa de compras
* **Identificador documental:** `PR-03`
* **Casos relacionados:** `CU-03` (`SPEC-03`).
* **Actor:** Comprador de moda urbana.
* **Inicio (Trigger):** Clic en el ícono de la bolsa en la cabecera.
* **Condiciones previas:** Existencia de estado de bolsa en la sesión.
* **Datos de entrada:** Clic en (+), (-), eliminar o "Continuar al checkout".
* **Pasos usuario / producto:**
  1. El producto lista las prendas añadidas con su precio unitario, subtotal y controles.
  2. Al presionar (+), el producto incrementa la unidad si no supera el stock máximo.
  3. Al presionar (-) sobre cantidad 1, el producto abre una confirmación dialogada. Si el usuario confirma, la prenda se elimina; si cancela, permanece en 1.
  4. El producto recalcula el subtotal acumulado de prendas al instante.
* **Decisiones:** Si la bolsa queda en 0 prendas, se bloquea el botón de checkout.
* **Reglas aplicables:** `RN-07`, `RN-08`, `RN-09`, `RN-10`.
* **Resultado:** Bolsa auditada con subtotal exacto lista para pagar.

### PR-04: Liquidación de flete, formalización de orden y derivación a WhatsApp
* **Identificador documental:** `PR-04`
* **Casos relacionados:** `CU-04` (`SPEC-04`).
* **Actor:** Comprador de moda urbana.
* **Inicio (Trigger):** Clic en "Continuar al checkout" desde el carrito con artículos.
* **Condiciones previas:** Subtotal de bolsa > $0. Datos bancarios configurados.
* **Datos de entrada:** Nombre completo, Teléfono/WhatsApp, Ciudad/Provincia, Dirección exacta.
* **Pasos usuario / producto:**
  1. El usuario completa los campos del formulario de entrega.
  2. Al seleccionar la ciudad en el desplegable, el producto suma reactivamente $3.50 (local) o $5.00 (nacional) liquidando el Total a transferir.
  3. El usuario pulsa "Confirmar pedido y pagar por transferencia". El producto valida campos, genera `#ATY-XXXX`, vacía la bolsa y presenta la pantalla final.
  4. El usuario pulsa "Enviar comprobante por WhatsApp". El producto abre la app con el texto pre-formateado.
* **Decisiones:** Si faltan campos requeridos, se detiene el envío y se marcan los errores.
* **Reglas aplicables:** `RN-11`, `RN-12`, `RN-13`, `RN-14`, `RN-15`, `RN-16`.
* **Resultado:** Orden registrada, bolsa vacía y mensaje en WhatsApp listo para enviar.

---

## 12. Reglas del negocio

| Identificador | Condición del producto | Comportamiento exigido | Motivo de negocio | Procesos afectados |
| :--- | :--- | :--- | :--- | :--- |
| **RN-01** | Categorización de prendas | El catálogo solo admite las categorías "Camisetas Oversize", "Pantalones Cargo" y "Accesorios". | Mantener una curaduría comercial especializada en streetwear. | PR-01 |
| **RN-02** | Inventario por talla | Si una talla tiene 0 existencias para la categoría activa, su selector se muestra deshabilitado. | Evitar que el usuario filtre combinaciones que arrojen una grilla vacía. | PR-01 |
| **RN-03** | Cambio de categoría activa | Al cambiar de categoría, el filtro de talla se reevalúa según el stock de la nueva selección. | Prevenir inconsistencias de inventario entre distintas prendas. | PR-01 |
| **RN-04** | Adición a bolsa | No se puede pulsar "Añadir a la bolsa" sin una talla seleccionada explícitamente o por defecto. | Garantizar que el pedido especifique las medidas exactas requeridas. | PR-02 |
| **RN-05** | Notificación de compra | La adición de prenda genera un toast temporal (3s) y suma +1 al badge en cabecera. | Ofrecer feedback inmediato sin interrumpir la navegación del cliente. | PR-02 |
| **RN-06** | Stock de variante en ficha | Si la variante elegida tiene stock 0, el botón principal cambia a "Agotado en esta talla" y se bloquea. | Prevenir sobreventas de prendas sin existencias en bodega. | PR-02 |
| **RN-07** | Envío diferido en bolsa | En el carrito solo se totaliza la suma de precios de prendas; no se calcula flete. | Mantener transparencia sin inventar un costo de envío antes de saber la ciudad. | PR-03 |
| **RN-08** | Decremento a cero | Si la cantidad es 1 y se presiona (-), se abre un diálogo modal de confirmación antes de borrar. | Evitar que un clic accidental elimine una prenda que el usuario deseaba comprar. | PR-03 |
| **RN-09** | Límite de existencias | El botón (+) se deshabilita cuando la cantidad en bolsa iguala las existencias de esa variante. | No permitir añadir al carrito más unidades de las que realmente existen. | PR-03 |
| **RN-10** | Bloqueo en bolsa vacía | Si la bolsa tiene 0 artículos, el botón "Continuar al checkout" se desactiva permanentemente. | Prevenir el inicio de compras de valor $0 sin prendas asociadas. | PR-03 |
| **RN-11** | Tarifas de flete | La ciudad local asigna flete de $3.50; cualquier otra ciudad o provincia asigna $5.00. | Reflejar los costos logísticos reales de mensajería urbana vs courier nacional. | PR-04 |
| **RN-12** | Validación de formulario | Todos los campos de entrega son obligatorios; si alguno falta, se bloquea la confirmación. | Asegurar que el comercio tenga toda la información necesaria para el despacho. | PR-04 |
| **RN-13** | Identificador de orden | Toda orden confirmada genera un código con formato `#ATY-` + 4 dígitos no repetidos. | Brindar un código de rastreo formal tanto para el cliente como para la tienda. | PR-04 |
| **RN-14** | Vaciado transaccional | Al confirmarse la orden, la bolsa de compras se reinicia inmediatamente a 0 prendas. | Evitar que el usuario vuelva a confirmar la misma compra por error. | PR-04 |
| **RN-15** | Integración WhatsApp | El botón final genera un enlace `wa.me` con el mensaje pre-cargado con orden y monto. | Automatizar la comunicación y eliminar la necesidad de que el cliente redacte el texto. | PR-04 |
| **RN-16** | Exclusión de tarjeta | No se solicitan ni capturan datos de tarjetas de crédito o débito en la aplicación web. | Limitar el alcance a transferencias directas según el modelo de negocio pactado. | PR-04 |

---

## 13. Datos necesarios y su significado

| Dato | Origen | Significado | Obligatoriedad | Valores permitidos | Visibilidad y mutabilidad |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ID de Producto** | Catálogo | Identificador interno de la prenda. | Obligatorio | String alfanumérico (ej. `prod-01`). | Solo lectura por el sistema. |
| **Nombre de Prenda** | Catálogo | Nombre comercial de la prenda. | Obligatorio | Texto (ej. "Camiseta Oversize Acid Wash"). | Visible; no editable. |
| **Categoría** | Catálogo | Clasificación temática del producto. | Obligatorio | "Camisetas Oversize", "Pantalones Cargo", "Accesorios". | Visible; filtro editable por usuario. |
| **Precio Unitario** | Catálogo | Valor de venta en dólares de la prenda. | Obligatorio | Decimal positivo (ej. $38.00). | Visible; no editable. |
| **Talla seleccionada** | Usuario | Dimensión de confección elegida. | Obligatorio | "S", "M", "L", "XL" o "Única" (accesorios). | Seleccionable por el comprador. |
| **Color seleccionado** | Usuario | Variante cromática elegida. | Obligatorio | Texto (ej. "Negro Faded", "Verde Militar"). | Seleccionable por el comprador. |
| **Cantidad en Bolsa** | Usuario | Número de unidades de la prenda. | Obligatorio | Entero entre 1 y el stock máximo. | Editable con botones (+/-). |
| **Subtotal de Prenda** | Calculado | `Precio Unitario × Cantidad`. | Obligatorio | Decimal positivo con 2 decimales. | Visible en bolsa; recalculado. |
| **Subtotal de Bolsa** | Calculado | Sumatoria de subtotales de prendas. | Obligatorio | Decimal positivo con 2 decimales. | Visible en bolsa y checkout. |
| **Nombre Completo** | Usuario | Nombre de quien recibe la entrega. | Obligatorio | Texto (3 a 60 caracteres). | Editable en checkout. |
| **Teléfono / WhatsApp** | Usuario | Número de contacto para coordinación. | Obligatorio | Dígitos numéricos (7 a 15 dígitos). | Editable en checkout. |
| **Ciudad / Provincia** | Usuario | Destino geográfico del paquete. | Obligatorio | Opciones del menú desplegable. | Seleccionable en checkout. |
| **Dirección y Referencia** | Usuario | Calle principal, secundaria y número. | Obligatorio | Texto (5 a 120 caracteres). | Editable en checkout. |
| **Costo de Envío** | Calculado | Tarifa de flete según la ciudad. | Obligatorio | $3.50 (local) o $5.00 (nacional). | Calculado automáticamente. |
| **Total a Transferir** | Calculado | `Subtotal de Bolsa + Costo de Envío`. | Obligatorio | Decimal positivo en dólares. | Calculado automáticamente. |
| **Código de Orden** | Generado | Identificador único del pedido. | Obligatorio | Formato `#ATY-` + 4 dígitos (ej. `#ATY-8421`). | Generado al confirmar; inmutable. |

---

## 14. Validaciones, permisos y restricciones

### Permisos por actor
* **Comprador:** Tiene permitido navegar libremente por catálogo, fichas, carrito y checkout; no requiere autenticación ni cuenta de usuario.
* **Asesor externo:** No tiene acceso a un panel de control dentro de la app web; solo interactúa cuando el cliente le escribe por WhatsApp.

### Validaciones del sistema
1. **Validación de Variante en Detalle:** Si el usuario no tiene una talla seleccionada, el botón "Añadir a la bolsa" se mantiene deshabilitado.
2. **Validación de Disponibilidad:** Al presionar (+), si la cantidad iguala el stock registrado, el sistema bloquea el incremento y muestra *"Stock máximo alcanzado"*.
3. **Validación de Carrito Vacío:** No se puede ingresar a `/checkout` si la cantidad total de prendas es 0. El sistema redirige al catálogo.
4. **Validación de Checkout:**
   * **Nombre:** Debe contener al menos 3 caracteres alfabéticos.
   * **Teléfono:** Debe ser un número válido de 7 a 15 dígitos.
   * **Ciudad:** Debe haberse seleccionado una opción válida de la lista desplegable.
   * **Dirección:** No puede estar vacía ni contener solo espacios en blanco.
   * *Respuesta ante error:* Los campos con fallas se resaltan en rojo con mensajes descriptivos bajo el input y el botón de confirmación se bloquea.

---

## 15. Estados y cambios permitidos

### Ciclo de estados de la Bolsa de Compras (Carrito)

```
[VACÍA] ──(Añadir prenda)──> [CON_ARTÍCULOS] ──(Confirmar orden)──> [VACÍA]
   ▲                               │
   └──────(Eliminar prendas)───────┘
```

* **Estado inicial:** `VACÍA` (0 prendas, contador en 0).
* **Cambio permitido:** Al añadir cualquier prenda, transiciona a `CON_ARTÍCULOS`. Se habilitan los controles de cantidad y el botón "Continuar al checkout".
* **Retorno a vacía:** Al eliminar todos los artículos (con confirmación dialogada) o tras pulsar "Confirmar pedido" en el checkout, transiciona nuevamente a `VACÍA`.

### Ciclo de estados de la Orden de Compra

```
[FORMULARIO_BORRADOR] ──(Validación exitosa)──> [ORDEN_CONFIRMADA]
```

* **Estado `FORMULARIO_BORRADOR`:** Datos ingresados por el comprador en la pantalla de checkout; el flete se liquida en tiempo real pero aún no existe código `#ATY-XXXX`.
* **Estado `ORDEN_CONFIRMADA`:** El usuario pulsa confirmar, los datos son válidos, se genera el identificador `#ATY-XXXX` y se presentan los datos bancarios y el enlace a WhatsApp.

---

## 16. Cálculos y ejemplos

### Fórmulas del negocio

1. **Subtotal de fila:**  
   $$\text{Subtotal Fila} = \text{Precio Unitario} \times \text{Cantidad}$$
   * *Unidad:* Dólares estadounidenses (USD). Redondeo a 2 decimales.
2. **Subtotal general de la bolsa:**  
   $$\text{Subtotal Bolsa} = \sum_{i=1}^{n} \text{Subtotal Fila}_i$$
3. **Costo de envío (Flete):**  
   $$\text{Flete} = \begin{cases} \$3.50 & \text{si Ciudad} \in \{\text{"Guayaquil"}, \text{"Quito"}\} \\ \$5.00 & \text{si Ciudad} = \text{"Otra provincia"} \end{cases}$$
4. **Total definitivo a transferir:**  
   $$\text{Total Orden} = \text{Subtotal Bolsa} + \text{Flete}$$

### Ejemplos numéricos concretos

* **Ejemplo 1 (Compra estándar con envío local):**
  * 1 Camiseta Oversize Acid Wash ($38.00) + 1 Pantalón Cargo Negro ($55.00).
  * Subtotal de prendas: $38.00 + $55.00 = **$93.00**.
  * Destino seleccionado: *Guayaquil (Local)* $\rightarrow$ Envío = **$3.50**.
  * **Total a transferir:** $93.00 + $3.50 = **$96.50**.
* **Ejemplo 2 (Compra única con envío nacional):**
  * 1 Gorra Streetwear ($25.00).
  * Subtotal de prendas: **$25.00**.
  * Destino seleccionado: *Cuenca (Nacional)* $\rightarrow$ Envío = **$5.00**.
  * **Total a transferir:** $25.00 + $5.00 = **$30.00**.
* **Ejemplo límite / Inválido:**
  * Subtotal = $0.00 $\rightarrow$ El sistema bloquea el checkout impidiendo calcular fletes sobre órdenes vacías.

---

## 17. Alternativas, errores y recuperación

| Situación / Error | Lo que observa el usuario | Lo que cambia o permanece igual | Acción de recuperación para el usuario |
| :--- | :--- | :--- | :--- |
| **Intento de decrementar de 1 a 0 en bolsa** | Diálogo modal: *"¿Deseas eliminar esta prenda de tu bolsa?"* con botones *Cancelar* y *Eliminar*. | La cantidad permanece en 1 hasta que el usuario decida. | Si pulsa Cancelar, el diálogo se cierra y la prenda sigue en 1. Si pulsa Eliminar, la prenda se remueve. |
| **Intento de superar stock máximo en bolsa** | El botón (+) cambia a estilo inactivo y se visualiza la advertencia *"Stock máximo alcanzado"*. | La cantidad permanece en el límite disponible sin sumar más unidades. | El usuario puede continuar con esa cantidad máxima o reducirla con (-). |
| **Envío de formulario con campos incompletos** | Los campos vacíos se marcan con borde rojo y textos explicativos (ej. *"Ingresa tu dirección"*). | El pedido no se procesa; no se genera código ni se cobra flete. | El comprador completa los campos marcados y vuelve a pulsar el botón de confirmación. |
| **Bolsa vacía al intentar ingresar a checkout** | La pantalla redirige al catálogo con una notificación *"Tu bolsa está vacía"*. | El checkout no se inicializa. | El comprador pulsa *"Explorar colección"* y añade al menos una prenda para poder comprar. |
| **Arrepentimiento de compra antes de confirmar** | El comprador pulsa el enlace *"← Volver a la bolsa"*. | Los datos ya ingresados en el formulario de envío se preservan en memoria. | El comprador ajusta prendas o cantidades y regresa al checkout sin tener que reescribir sus datos. |

---

## 18. Criterios de aceptación y ejemplos comprobables

* **`CA-01` (Catálogo inicial):** Dado el acceso al catálogo, cuando se carga la página principal, entonces se muestran prendas de las 3 categorías con su imagen, precio y disponibilidad.
* **`CA-02` (Filtro de categoría):** Dada la vista de catálogo, cuando el comprador pulsa "Pantalones Cargo", entonces la cuadrícula se actualiza en <100ms mostrando exclusivamente pantalones cargo.
* **`CA-03` (Filtro preventivo de talla):** Dada una categoría activa, cuando una talla tiene 0 unidades en inventario, entonces el botón de esa talla aparece visualmente deshabilitado con cursor bloqueado.
* **`CA-04` (Limpieza de filtros):** Dado un catálogo con filtros aplicados, cuando el usuario pulsa "Ver todos", entonces se restablece la colección completa sin filtros activos.
* **`CA-05` (Preselección de variante):** Dada la apertura de una ficha de prenda, cuando la vista carga, entonces la primera talla con stock disponible aparece preseleccionada automáticamente.
* **`CA-06` (Bloqueo de botón ante stock cero):** Dada una prenda con una talla agotada, cuando el usuario hace clic sobre esa talla, entonces el botón de compra se deshabilita y muestra "Agotado en esta talla".
* **`CA-07` (Feedback de adición):** Dada una prenda disponible, cuando el usuario pulsa "Añadir a la bolsa", entonces el contador en cabecera suma +1 y aparece una notificación Toast visible por 3 segundos confirmando el producto y talla añadida.
* **`CA-08` (Retorno a colección):** Dada la ficha de detalle, cuando el usuario pulsa "← Volver a la colección", entonces regresa al catálogo manteniendo la posición y filtros previos.
* **`CA-09` (Cálculo de subtotal en carrito):** Dadas 2 prendas en el carrito, cuando el usuario pulsa (+) en una de ellas, entonces el subtotal de la fila y el subtotal general se recalculan inmediatamente.
* **`CA-10` (Confirmación al decrementar de 1 a 0):** Dada una prenda con cantidad 1 en el carrito, cuando el usuario pulsa (-), entonces se despliega un diálogo de confirmación previa antes de remover el producto.
* **`CA-11` (Cancelación de diálogo):** Dado el diálogo de confirmación abierto, cuando el usuario pulsa "Cancelar", entonces la prenda no se elimina y la cantidad permanece en 1.
* **`CA-12` (Tope de existencias):** Dada una prenda con stock máximo de 3 unidades, cuando el carrito alcanza 3 unidades, entonces el botón (+) se inhabilita emitiendo "Stock máximo alcanzado".
* **`CA-13` (Bloqueo de bolsa vacía):** Dada una bolsa con 0 prendas, cuando se visualiza la pantalla, entonces el botón "Continuar al checkout" permanece inactivo y se muestra el mensaje "Tu bolsa está vacía".
* **`CA-14` (Cálculo reactivo de flete):** Dado el formulario de checkout, cuando el comprador selecciona "Guayaquil", entonces el flete suma $3.50; si selecciona "Otra provincia", suma $5.00 de manera instantánea.
* **`CA-15` (Validación de obligatoriedad):** Dado el checkout con campos en blanco, cuando el comprador pulsa "Confirmar pedido", entonces no se procesa la orden y los campos incompletos se señalan con mensajes de error en rojo.
* **`CA-16` (Generación de orden única):** Dado un formulario válido, cuando el comprador confirma, entonces el sistema genera un código alfanumérico en formato `#ATY-XXXX` y vacía la bolsa de compras.
* **`CA-17` (Presentación de datos bancarios):** Dada la orden confirmada, cuando se muestra la pantalla final, entonces se visualizan el número de cuenta bancaria, titular, RUC/Cédula y banco para la transferencia.
* **`CA-18` (Enlace estructurado a WhatsApp):** Dada la pantalla final, cuando el comprador pulsa "Enviar comprobante por WhatsApp", entonces se abre la app con el texto pre-cargado conteniendo el número de orden (`#ATY-XXXX`) y el monto exacto liquidado.

---

## 19. Relación entre casos, procesos, reglas y criterios (Matriz de trazabilidad)

| Caso de Uso (AHK) | Proceso Detallado | Reglas de Negocio Aplicables | Datos y Estados Clave | Criterios de Aceptación | Especificación AHK Fuente |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `cu-01-explorar-catalogo-y-filtrar` | `PR-01: Filtrado y navegación de prendas` | `RN-01`, `RN-02`, `RN-03` | Categoría, Talla, Stock disponible | `CA-01`, `CA-02`, `CA-03`, `CA-04` | `spec-01-exploracion-y-filtrado-catalogo` |
| `cu-02-detalle-prenda-y-variantes` | `PR-02: Inspección técnica y variantes` | `RN-04`, `RN-05`, `RN-06` | ID Producto, Talla, Color, Stock, Toast | `CA-05`, `CA-06`, `CA-07`, `CA-08` | `spec-02-detalle-prenda-y-seleccion-variantes` |
| `cu-03-gestionar-carrito-de-compras` | `PR-03: Auditoría de la bolsa de compras` | `RN-07`, `RN-08`, `RN-09`, `RN-10` | Cantidad, Subtotal fila, Subtotal bolsa, Estado `CON_ARTÍCULOS` / `VACÍA` | `CA-09`, `CA-10`, `CA-11`, `CA-12`, `CA-13` | `spec-03-gestion-y-auditoria-carrito-compras` |
| `cu-04-checkout-y-confirmacion-pedido` | `PR-04: Liquidación, orden y WhatsApp` | `RN-11`, `RN-12`, `RN-13`, `RN-14`, `RN-15`, `RN-16` | Nombre, Teléfono, Ciudad, Dirección, Flete ($3.50/$5.00), Total, `#ATY-XXXX` | `CA-14`, `CA-15`, `CA-16`, `CA-17`, `CA-18` | `spec-04-checkout-liquidacion-y-cierre-whatsapp` |

---

## 20. Cambios respecto de la primera entrega

| Aspecto | Versión Fase 1 (Anterior) | Versión Fase 2 (Actual) | Motivo del cambio | Fuentes AHK afectadas |
| :--- | :--- | :--- | :--- | :--- |
| **Estructuración formal** | Solo existían los 4 casos de uso en `docs/use-cases/`. | Se materializan **4 especificaciones funcionales** en `docs/specs/` vinculadas por `sourceUseCases`. | Cumplir el requisito metodológico de AHK 3.0.0 y la trazabilidad funcional de la consigna. | `spec-01`, `spec-02`, `spec-03`, `spec-04`. |
| **Regla de decremento en bolsa** | Se contemplaba que reducir de 1 a 0 borraba directamente el producto. | Se define formalmente la regla **`RN-08`**: **Confirmación dialogada obligatoria** antes de remover la prenda. | Prevenir la pérdida accidental de artículos seleccionados por el comprador (decisión explícita del estudiante). | `cu-03`, `spec-03`, `PR-03`. |
| **Tarifación logística** | Se mencionó el envío por ciudad de forma general. | Se formalizan las tarifas exactas en **`RN-11`**: **$3.50 local y $5.00 nacional** con cálculo aritmético explícito. | Precisar los valores numéricos para habilitar la implementación en React y la validación en pruebas. | `cu-04`, `spec-04`, `PR-04`. |
| **Validaciones de formulario** | Validación genérica de campos no vacíos. | Especificación rigurosa de longitudes mínimas, formato numérico para teléfono y feedback visual de error (`RN-12`). | Eliminar ambigüedades en la experiencia de usuario previo al diseño técnico. | `spec-04`, `PR-04`. |
| **Trazabilidad de requisitos** | Sin matriz de trazabilidad. | Inclusión de la **Matriz de Trazabilidad Integral** (Sección 19) relacionando casos, procesos, reglas y criterios. | Requisito obligatorio de la consigna para garantizar auditoría completa del producto. | Todo el sistema documental. |


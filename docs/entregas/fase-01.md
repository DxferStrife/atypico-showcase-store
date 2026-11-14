# Proyecto · Fase 1: Definición Funcional y Casos de Uso
**Atypico Studio — Showcase E-commerce de Moda Urbana**

---

## 1. Identificación del proyecto
* **Nombre del producto:** Atypico Showcase Store (Tienda E-commerce Insignia de Moda Urbana).
* **Estudio creador:** Atypico Studio.
* **Autor / Estudiante:** Fernando.
* **Cohorte:** Bootcamp de Desarrollo Frontend & React.
* **Entrega:** Fase 1 · Definición funcional y casos de uso.
* **Fecha:** 26 de octubre de 2026.
* **Versión del documento:** 1.0.0.

---

## 2. Problema y contexto
En el mercado actual de marcas independientes de moda urbana (streetwear), la gran mayoría de tiendas emergentes inician comercializando a través de redes sociales (Instagram, TikTok) o canales de mensajería (WhatsApp).

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
3. **Revisión de bolsa:** En la vista del carrito, el comprador revisa los ítems agregados, modifica cantidades o elimina prendas, observando el subtotal exacto en tiempo real.
4. **Checkout y cierre por WhatsApp:** El comprador completa sus datos de entrega. Al seleccionar su ciudad, el sistema calcula de forma reactiva el costo de envío ($3.50 local / $5.00 nacional) y liquida el total. Al confirmar la orden, se genera un identificador único (ej. `#ATY-8421`), se presentan los datos bancarios y se habilita un botón que abre WhatsApp con el mensaje pre-estructurado para enviar el comprobante de transferencia y procesar el despacho.

---

## 5. Alcance inicial y exclusiones

### Capacidades comprometidas en la versión inicial
* Catálogo dinámico con filtrado reactivo por categorías y tallas.
* Bloqueo visual e interactivo de opciones sin stock para evitar búsquedas sin resultados.
* Ficha de detalle de producto con selección de variantes de talla y color.
* Carrito de compras con controles de incremento, decremento y eliminación de prendas, cálculo reactivo de subtotales y estado vacío guiado.
* Formulario de checkout con validación de campos obligatorios y liquidación de flete según ciudad local o nacional.
* Generador de código de orden único y formateo automático de mensaje de WhatsApp con resumen del pedido y datos bancarios.

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
| **1. Catálogo / Colección** | Presentar todas las prendas de la marca y permitir su filtrado ágil. | Cuadrícula de productos, imagen destacada, categoría, precio, selector de categorías y botones de tallas con disponibilidad. | Filtrar por categoría, filtrar por talla, limpiar filtros y seleccionar una prenda para ver su detalle. | CU-01 |
| **2. Ficha de Detalle** | Brindar la información técnica completa de una prenda seleccionada. | Galería de fotos, nombre, precio, descripción de materiales y corte streetwear, selector de talla y color, estado de stock. | Elegir talla y color, pulsar "Añadir a la bolsa" y volver a la colección. | CU-02 |
| **3. Carrito de Compras** | Auditar y ajustar los artículos antes de formalizar la compra. | Lista de prendas añadidas (talla, color, precio unitario, subtotal), controles (+/-), botón de eliminar, subtotal acumulado y aviso de flete diferido. | Aumentar/disminuir unidades, eliminar artículos, vaciar bolsa y pulsar "Continuar al checkout". | CU-03 |
| **4. Checkout y Entrega** | Recopilar información de envío y calcular el costo de transporte. | Formulario de datos (Nombre, Teléfono, Ciudad, Dirección), resumen de orden y cálculo reactivo del total según ciudad. | Ingresar datos de contacto, seleccionar ciudad local o nacional, ver cálculo de envío y confirmar pedido. | CU-04 |
| **5. Confirmación de Orden** | Entregar el comprobante formal del pedido y habilitar el canal de pago. | Código de orden (`#ATY-XXXX`), total a transferir, resumen de prendas, datos de cuenta bancaria y botón de WhatsApp. | Copiar datos bancarios y presionar "Enviar comprobante por WhatsApp". | CU-04 |

---

## 7. Casos de uso de la versión inicial

### Catálogo de casos de uso (AHK 3.0.0)

| Identificador AHK | Nombre | Actor | Objetivo | Archivo fuente gestionado |
| :--- | :--- | :--- | :--- | :--- |
| `cu-01-explorar-catalogo-y-filtrar` | Explorar catálogo y filtrar prendas por categoría y talla | Comprador | Encontrar prendas disponibles por estilo y talla | [`docs/use-cases/cu-01-explorar-catalogo-y-filtrar.md`](../use-cases/cu-01-explorar-catalogo-y-filtrar.md) |
| `cu-02-detalle-prenda-y-variantes` | Consultar detalle de prenda y seleccionar variantes | Comprador | Conocer ficha técnica y elegir talla/color | [`docs/use-cases/cu-02-detalle-prenda-y-variantes.md`](../use-cases/cu-02-detalle-prenda-y-variantes.md) |
| `cu-03-gestionar-carrito-de-compras` | Gestionar el carrito de compras | Comprador | Ajustar prendas y revisar subtotal consolidado | [`docs/use-cases/cu-03-gestionar-carrito-de-compras.md`](../use-cases/cu-03-gestionar-carrito-de-compras.md) |
| `cu-04-checkout-y-confirmacion-pedido` | Completar checkout y confirmación de pedido | Comprador | Formalizar orden y enviar comprobante a WhatsApp | [`docs/use-cases/cu-04-checkout-y-confirmacion-pedido.md`](../use-cases/cu-04-checkout-y-confirmacion-pedido.md) |

---

### Fichas detalladas de casos de uso

#### Ficha CU-01: Explorar catálogo y filtrar prendas por categoría y talla
1. **Identificador y nombre:** `cu-01-explorar-catalogo-y-filtrar` — Explorar catálogo y filtrar prendas por categoría y talla.
2. **Actor principal y objetivo:** Comprador de moda urbana. Busca visualizar prendas disponibles filtradas por categoría y talla sin demoras.
3. **Situación que lo inicia y condiciones previas:** El usuario ingresa a la tienda online. El catálogo contiene prendas cargadas en las categorías Camisetas Oversize, Pantalones Cargo y Accesorios.
4. **Pasos del recorrido principal:**
   * El comprador accede a la vista principal del catálogo; el producto despliega la cuadrícula con todas las prendas disponibles.
   * El comprador pulsa sobre una categoría específica (*"Camisetas Oversize"*); el producto actualiza la vista mostrando únicamente prendas de esa categoría.
   * El comprador selecciona un filtro de talla (*"L"*); el producto filtra las prendas con stock en L y deshabilita los botones de tallas agotadas.
   * El comprador selecciona una prenda para ver su detalle.
5. **Alternativas, errores y restricciones:**
   * *A1 (Deselección):* Al pulsar nuevamente sobre la categoría activa o en "Ver todos", el producto restaura la vista completa.
   * *A2 (Prevención de vacíos):* Las tallas sin inventario aparecen en estado deshabilitado para evitar pantallas sin resultados.
   * *RN-01:* Solo se reconocen las categorías pactadas: Camisetas Oversize, Pantalones Cargo y Accesorios.
6. **Resultado observable:** Cuadrícula de productos filtrada en tiempo real según categoría y talla con precios y disponibilidad visible.
7. **Criterios de aceptación:**
   * Al cargar la pantalla se muestran productos de todas las categorías.
   * Al seleccionar una categoría solo se listan sus prendas asociadas.
   * Tallas sin stock se muestran visualmente deshabilitadas.
   * Los filtros responden sin recargar el navegador.

---

#### Ficha CU-02: Consultar detalle de prenda y seleccionar variantes
1. **Identificador y nombre:** `cu-02-detalle-prenda-y-variantes` — Consultar detalle de prenda y seleccionar variantes.
2. **Actor principal y objetivo:** Comprador de moda urbana. Conocer en detalle la prenda (materiales, corte, fotos), elegir talla/color y añadirla a la bolsa.
3. **Situación que lo inicia y condiciones previas:** El comprador hace clic sobre una tarjeta de producto en el catálogo. La prenda existe y cuenta con al menos una variante activa.
4. **Pasos del recorrido principal:**
   * El comprador hace clic en una prenda; el producto presenta la ficha técnica con fotos, categoría, precio, descripción de materiales y selectores de talla y color.
   * El comprador selecciona talla (ej. "M") y color disponible; el producto actualiza la disponibilidad de la variante.
   * El comprador pulsa "Añadir a la bolsa"; el producto suma el artículo al carrito, incrementa el contador numérico en la barra superior (+1) y muestra una notificación flotante (toast) de confirmación temporal permaneciendo en la vista.
5. **Alternativas, errores y restricciones:**
   * *A1 (Talla agotada):* Si la talla elegida no tiene existencias, el botón principal cambia a "Agotado en esta talla" y se bloquea.
   * *A2 (Retorno):* El comprador puede pulsar "← Volver a la colección" conservando sus filtros anteriores.
   * *RN-02:* La confirmación de adición se realiza mediante notificación Toast no invasiva sin forzar modales.
6. **Resultado observable:** Prenda incorporada a la bolsa con actualización inmediata del contador de la barra superior y toast visible por 3 segundos.
7. **Criterios de aceptación:**
   * Muestra precio, descripción de tela/corte y selectores de variantes.
   * Si la talla está agotada, el botón de compra se deshabilita.
   * Pulsar "Añadir a la bolsa" incrementa el contador de la cabecera en 1.
   * Notificación toast confirma la prenda y talla agregada.

---

#### Ficha CU-03: Gestionar el carrito de compras
1. **Identificador y nombre:** `cu-03-gestionar-carrito-de-compras` — Gestionar el carrito de compras.
2. **Actor principal y objetivo:** Comprador de moda urbana. Revisar artículos en la bolsa, modificar cantidades, eliminar prendas y verificar el subtotal antes de pagar.
3. **Situación que lo inicia y condiciones previas:** El comprador pulsa el ícono de la bolsa en la barra superior.
4. **Pasos del recorrido principal:**
   * El comprador abre el carrito; el producto lista las prendas agregadas con miniatura, nombre, talla, precio unitario, controles de cantidad (+/-) y subtotal acumulado.
   * El comprador modifica cantidades con (+) o (-); el producto actualiza la cantidad de la fila y recalcula el subtotal general en tiempo real.
   * El comprador verifica el subtotal y observa el aviso de que el envío se calcula en el siguiente paso.
   * El comprador pulsa "Continuar al checkout"; el producto redirige al formulario de checkout conservando los montos.
5. **Alternativas, errores y restricciones:**
   * *A1 (Bolsa vacía):* Si no hay artículos, muestra "Tu bolsa está vacía" con botón para volver al catálogo y bloquea el botón de checkout.
   * *A2 (Eliminar producto):* Pulsar el ícono de basura quita la prenda de la bolsa y recalcula el subtotal.
   * *A4 (Límite de stock):* Si se alcanza el stock máximo de una variante, el botón (+) se deshabilita con aviso de límite alcanzado.
   * *RN-01:* En el carrito no se liquida flete; únicamente el subtotal de prendas.
6. **Resultado observable:** Carrito con lista detallada por prenda y talla, controles operativos de modificación y subtotal exacto.
7. **Criterios de aceptación:**
   * Lista todos los productos agregados con sus respectivas variantes.
   * Controles (+) y (-) recalculan el subtotal al instante.
   * Eliminar un producto actualiza el contador de la cabecera.
   * Si la bolsa llega a 0 productos, se inhabilita el checkout.

---

#### Ficha CU-04: Completar checkout y confirmación de pedido
1. **Identificador y nombre:** `cu-04-checkout-y-confirmacion-pedido` — Completar checkout y confirmación de pedido.
2. **Actor principal y objetivo:** Comprador de moda urbana. Formalizar datos de envío, conocer el flete según ciudad, generar código de orden y enviar comprobante a WhatsApp.
3. **Situación que lo inicia y condiciones previas:** El comprador pulsa "Continuar al checkout" con al menos un artículo en la bolsa. La tienda tiene definidos sus datos bancarios y número de WhatsApp.
4. **Pasos del recorrido principal:**
   * El comprador accede al formulario de checkout; el producto despliega campos para Nombre, Teléfono/WhatsApp, Ciudad y Dirección.
   * El comprador completa sus datos y selecciona su ciudad; el producto calcula el flete en tiempo real ($3.50 local / $5.00 nacional) y liquida el total definitivo.
   * El comprador pulsa "Confirmar pedido y pagar por transferencia"; el producto genera un código de orden único (ej. `#ATY-8421`), registra la orden y vacía el carrito.
   * El producto presenta la pantalla de confirmación con código de orden, total liquidado, datos bancarios para transferencia y botón "Enviar comprobante por WhatsApp".
   * El comprador pulsa el botón; el producto abre WhatsApp con un mensaje pre-cargado conteniendo el número de orden, monto y solicitud de despacho.
5. **Alternativas, errores y restricciones:**
   * *A1 (Campos incompletos):* Si faltan campos requeridos, se resaltan en rojo con avisos y no se procesa la orden.
   * *A2 (Acceso indebido):* Si se accede al checkout sin artículos en la bolsa, se redirige de inmediato al catálogo.
   * *RN-01:* Tarifa de envío condicional según ubicación: $3.50 local / $5.00 nacional.
   * *RN-03:* La bolsa se reinicia a 0 artículos tras confirmar para prevenir compras duplicadas.
   * *RN-04:* No se solicitan datos de tarjetas bancarias en la web.
6. **Resultado observable:** Pantalla de pedido confirmado con código único, datos bancarios claros y enlace a WhatsApp con mensaje automático estructurado.
7. **Criterios de aceptación:**
   * Selección de ciudad actualiza el total sumando $3.50 o $5.00 de forma reactiva.
   * Bloqueo de confirmación ante campos obligatorios vacíos.
   * Al confirmar válidamente, se genera el código de orden y el carrito se vacía.
   * Enlace a WhatsApp pre-carga número de orden y monto exacto.

---

## 8. Decisiones y preguntas pendientes

### Decisiones confirmadas
* **Enfoque del producto:** Tienda e-commerce insignia de demostración de Atypico Studio para mostrar capacidad técnica y de conversión en el bootcamp.
* **Dominio comercial:** Moda Urbana / Streetwear con categorías Camisetas Oversize, Pantalones Cargo y Accesorios.
* **Modelo de cierre y cobro:** Exclusión de pasarelas de tarjeta automatizadas; adopción de transferencia bancaria y confirmación vía WhatsApp.
* **Filtros preventivos:** Deshabilitación visual de tallas sin stock para evitar vistas vacías.
* **Feedback de carrito:** Notificación Toast y badge numérico en barra superior al añadir productos.
* **Logística:** Envío liquidado en checkout según ciudad ($3.50 local / $5.00 nacional).

### Preguntas abiertas / Supuestos por validar en Fase 2
* **Reglas de agotado:** Si un producto se agota por completo en todas sus tallas, ¿debe desaparecer del catálogo o mostrarse con una etiqueta visual de "Sold Out"? (Se definirá en la especificación funcional de la Fase 2).
* **Persistencia:** ¿Se utilizará `localStorage` para conservar el carrito si el usuario cierra el navegador, o solo estado en memoria durante la sesión? (Se resolverá en la arquitectura técnica de la Fase 3).

---

## 9. Decisiones propias y uso de IA
*(Redactado por el estudiante según el registro real de trabajo con el agente)*

> "Mi proyecto es la tienda E-commerce de moda urbana para que sea una referencia de lo que puede realizar Atypico Studio, el e-commerce que voy a crear es una demostración de lo que puede hacer Atypico Studio. Excluí las pasarelas de pago por ser muy complejas actualmente.
>
> Elegí moda urbana en lugar de otras propuestas generadas por la IA y modifiqué los casos de uso en el cálculo del envío y la forma de pago, enfocándome en cómo convertir clics en potenciales ventas.
>
> El recorrido principal consiste en que el usuario entra, visualiza los productos más destacados, revisa las características, la información de las tallas y medidas, y luego agrega al carrito para seguir revisando sugerencias que combinen con la prenda para al final decidir realizar la compra.
>
> La IA me ayudó a estructurar las ideas claras que tenía en documentos formales que los agentes y el harness de AHK pueden entender y validar en poco tiempo."

---

## 10. Fuentes y comprobaciones de esta fase

### Archivos fuente y especificaciones de AHK 3.0.0
* `docs/use-cases/cu-01-explorar-catalogo-y-filtrar.md` (`approved`)
* `docs/use-cases/cu-02-detalle-prenda-y-variantes.md` (`approved`)
* `docs/use-cases/cu-03-gestionar-carrito-de-compras.md` (`approved`)
* `docs/use-cases/cu-04-checkout-y-confirmacion-pedido.md` (`approved`)
* `docs/proceso.md` (Registro cronológico de decisiones reales)
* `agent-harness-kit.config.json` (Configuración local del harness)

### Registro de comprobaciones técnicas ejecutadas

| Comprobación ejecutada | Comando / Protocolo | Resultado obtenido | Límite y alcance de la prueba |
| :--- | :--- | :--- | :--- |
| **Versión de CLI AHK** | `ahk --version` | `3.0.0` | Confirma la instalación del CLI global oficial en el sistema. |
| **Plantilla base React** | `pnpm create vite@9.2.0 ...` | React 19.2.8 + Vite 8.2.2 + TS 6.0.3 | Confirma la creación del espacio de trabajo limpio sin alterar componentes. |
| **Diagnóstico del Harness** | `ahk doctor` | `agent files: [✓]`, `skills: [✓]` | Valida que las plantillas de agentes y skills están presentes y al día. |
| **Comprobación de salud** | `ahk health` (vía `health.bat` -> `pnpm build`) | `Health check passed` (176ms) | Comprueba que la compilación de la base es limpia; no prueba funcionalidades futuras. |
| **Lectura real a MCP** | `specs.list` vía `ahk serve` (stdio JSON-RPC) | `items: 4`, `isError: false` | Valida la conectividad real con el servidor MCP y el reconocimiento de los 4 casos aprobados. |
| **Lectura final y coherencia** | Inspección de títulos y referencias | 10 apartados completos y alineados | Verifica que todas las secciones coinciden con las decisiones del estudiante. |

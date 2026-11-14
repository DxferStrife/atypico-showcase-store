# Proyecto · Fase 3: Diseño Técnico y Plan de Construcción
**Atypico Studio — Showcase E-commerce de Moda Urbana**

---

## 1. Identificación del proyecto
* **Nombre del producto:** Atypico Showcase Store (Tienda E-commerce Insignia de Moda Urbana).
* **Estudio creador:** Atypico Studio.
* **Autor / Estudiante:** Fernando.
* **Cohorte:** Bootcamp de Desarrollo Frontend & React.
* **Entrega:** Fase 3 · Diseño técnico y plan de construcción (Documento acumulativo completo).
* **Fecha:** 10 de noviembre de 2026.
* **Versión del documento:** 3.0.0.

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

---

## 8. Decisiones y preguntas pendientes

### Decisiones técnicas confirmadas en esta fase
* **Navegación declarativa (React Router 8.3.1):** Rutas directas dedicadas (`/`, `/producto/:id`, `/carrito`, `/checkout`, `/confirmacion/:orderId`, `*`) complementadas con un `CartDrawer` de vista previa rápida desde la cabecera.
* **Consulta remota sin mutación artificial (TanStack Query 5.102.8):** Catálogo consultado con `queryKey: ['products']` y prenda con `queryKey: ['product', id]`. Se declara con transparencia la ausencia de mutaciones `POST` remotas porque el cierre se realiza fuera de banda por WhatsApp y transferencia bancaria.
* **Estado global compartido de la bolsa (Zustand 5.0.15):** Store `useCartStore` que maneja exclusivamente las prendas añadidas y sus cantidades en memoria de sesión de la aplicación durante la visita.
* **Formulario reactivo en tiempo real (Zod 4.4.3 + Mantine Form 9.4.1):** Validación inmediata campo por campo (`validateInputOnChange: true`) para retroalimentación visual instantánea en rojo ante errores sin obligar a esperar al submit.
* **Ciclo de vida del diálogo de confirmación (Mantine Modal 9.4.1):** Modal de confirmación previa ante reducción a cero o eliminación de prendas (Regla `RN-08`), administrado con `useDisclosure` en el componente.

### Supuestos técnicos y preguntas abiertas
* **Sincronización multi-dispositivo y tokens:** En esta fase documental y en la entrega del frontend, la bolsa opera en memoria de sesión en el navegador cliente para cumplir estrictamente las directrices del bootcamp. Se deja registrado formalmente que la persistencia remota mediante tokens de sesión y cuentas de usuario se integrará en una fase posterior cuando Atypico Studio incorpore un backend transaccional dedicado.
* **Mocking de catálogo en desarrollo:** Durante la fase de construcción futura se utilizará un endpoint REST local o archivo estructurado servido vía HTTP con simulación de latencia de red para comprobar los estados de carga y error de TanStack Query sin requerir infraestructura externa.

---

## 9. Decisiones propias y uso de IA
*(Redactado a partir del registro real de interacción y decisiones confirmadas por el estudiante)*

> **Explicación del recorrido técnico por Fernando:**
> "El usuario clickea la prenda que quiere comprar, lo llevamos a otra página donde la prenda es la protagonista, él visualiza las imágenes que lo invitan a verlas en un carrusel, luego lee la descripción y siempre teniendo a la mano el botón de comprar el cual está presente. Al lado del botón de compras está añadir al carrito: es comprar ahora y añadir al carrito al lado.
> 
> Una vez añadido, al usuario le aparece una carta emergente que indica prendas que combinan con la que acaba de añadir al carro. Al revisar otra prenda y agregarla al carro, él se dirige al carrito; en cada agregación se notifica que se agregó.
> 
> En el carro a él le aparece visualmente la prenda y la talla, él puede añadir o restar las cantidades. Al añadir te pregunta si deseas añadirla con la misma talla o con otra y te da a escoger las tallas si es así. Luego él da a comprar y ahí pasamos a validar los datos de la factura y luego elegir el método de pago para poder completarlo (por el momento será por transferencia bancaria: el pedido se crea y se valida la transferencia vía WhatsApp).
> 
> En cuanto a la navegación, considero la Opción A con rutas dedicadas pero el carrito también debe verse como un drawer de vista previa que tenga un botón que diga comprar y ahí nos lleve a `/carrito` para completar el circuito.
> 
> En cuanto al estado, nos quedamos con la Opción A (en memoria de sesión para cumplir los límites de la consigna) pero agregando que en el futuro se implementará persistencia y tokens cuando tengamos backend propio.
> 
> Además, la validación del formulario de checkout tiene que ser en tiempo real: si voy avanzando y está mal el campo, se debe marcar en rojo e indicar qué falta para no tener que esperar a darle en confirmar y que toque regresar todo."
> 
> **Uso de la IA en esta fase:**
> La IA me ayudó a comparar las alternativas técnicas enseñadas en la cohorte, advertir los riesgos de violar las directrices de la rúbrica (como no inventar tokens ni mutaciones falsas), estructurar los esquemas de Zod, definir las máquinas de estado y formalizar las cuatro especificaciones técnicas en AHK 3.0.0 vinculadas con mis especificaciones funcionales previas.

---

## 10. Fuentes y comprobaciones de esta fase

### Documentos gestionados y aprobados en AHK 3.0.0
* **Casos de uso upstream (Fase 1):**
  * `cu-01-explorar-catalogo-y-filtrar` (`approved`)
  * `cu-02-detalle-prenda-y-variantes` (`approved`)
  * `cu-03-gestionar-carrito-de-compras` (`approved`)
  * `cu-04-checkout-y-confirmacion-pedido` (`approved`)
* **Especificaciones funcionales (Fase 2):**
  * `spec-01-exploracion-y-filtrado-catalogo` (`approved`)
  * `spec-02-detalle-prenda-y-seleccion-variantes` (`approved`)
  * `spec-03-gestion-y-auditoria-carrito-compras` (`approved`)
  * `spec-04-checkout-liquidacion-y-cierre-whatsapp` (`approved`)
* **Especificaciones técnicas (Fase 3):**
  * `spec-tech-01-catalogo-y-filtros-query` (`approved` · `sourceSpec: spec-01`)
  * `spec-tech-02-detalle-variantes-carrusel` (`approved` · `sourceSpec: spec-02`)
  * `spec-tech-03-bolsa-zustand-y-modal-confirmacion` (`approved` · `sourceSpec: spec-03`)
  * `spec-tech-04-checkout-zod-mantine-form-whatsapp` (`approved` · `sourceSpec: spec-04`)
* **Registro cronológico:** `docs/proceso.md`

### Fuentes oficiales consultadas y versiones del stack
| Librería / Herramienta | Versión fijada | Concepto técnico consultado | Enlace de referencia | Fecha de consulta |
| :--- | :--- | :--- | :--- | :--- |
| **React Router** | `8.3.1` | Rutas declarativas, `Routes`, `Route`, `useParams`, navegación SPA | [reactrouter.com](https://reactrouter.com) | 2026-11-10 |
| **TanStack Query** | `5.102.8` | `useQuery`, `queryKey`, `staleTime`, estados asíncronos sin efectos | [tanstack.com/query](https://tanstack.com/query) | 2026-11-10 |
| **Zustand** | `5.0.15` | Store inmutable de cliente, selectores atómicos, sin mutación directa | [github.com/pmndrs/zustand](https://github.com/pmndrs/zustand) | 2026-11-10 |
| **Zod** | `4.4.3` (`zod/v4`) | Schema validation, regex de teléfono, enums, tipado e inferencia segura | [zod.dev](https://zod.dev) | 2026-11-10 |
| **Mantine Form** | `9.4.1` | Hook `useForm`, `schemaResolver`, `validateInputOnChange` reactivo | [mantine.dev/form](https://mantine.dev/form) | 2026-11-10 |
| **Mantine Core** | `9.4.1` | Componente `Modal`, `useDisclosure`, accesibilidad y renderizado | [mantine.dev/core/modal](https://mantine.dev/core/modal) | 2026-11-10 |
| **Vitest** | `3.2.4` | Test runner unitario para schemas de Zod y reducers puros de Zustand | [vitest.dev](https://vitest.dev) | 2026-11-10 |

### Registro de comprobaciones técnicas ejecutadas
| Comprobación ejecutada | Comando / Protocolo | Resultado obtenido | Límite y alcance de la prueba |
| :--- | :--- | :--- | :--- |
| **Versión de CLI AHK** | `ahk --version` | `3.0.0` (Exitoso) | Valida instalación global oficial del harness. |
| **Diagnóstico del Harness** | `ahk doctor` | `agent files: [✓]`, `skills: [✓]` | Confirma integridad de agentes y skills. |
| **Comprobación de salud** | `ahk health` | `Health check passed` (364ms) | Confirma compilación limpia de la base Vite + TS; no prueba código de producto futuro. |
| **Lectura real de MCP** | `specs.list` vía stdio JSON-RPC | `items: 12`, `isError: false` | Valida conectividad y lectura en tiempo real de los 12 documentos aprobados. |
| **Validación de specs** | `specs.validate` vía MCP | `valid: true, errors: []` | Valida sintaxis, metadatos y vínculos `sourceSpec`. |

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

---

## 21. Stack y matriz de herramientas obligatorias

### Declaración de versiones y compatibilidad
El proyecto adopta rigurosamente las versiones fijadas por la cohorte para garantizar estabilidad y compatibilidad comprobada:
* **Base de aplicación:** React `19.2.8` y React DOM `19.2.8` sobre Vite `8.2.2` y TypeScript `6.0.3` (instalada en la base limpia).
* **Navegación:** React Router `8.3.1` (desde el paquete unificado `react-router`).
* **Datos remotos:** TanStack Query `5.102.8` (desde `@tanstack/react-query`).
* **Estado compartido de cliente:** Zustand `5.0.15`.
* **Validación de esquemas:** Zod `4.4.3` (utilizando imports oficiales desde `zod/v4`).
* **Formularios y UI:** Mantine Form `9.4.1` y Mantine Core `9.4.1` (compartiendo versión exacta y utilizando el `schemaResolver` integrado nativo).
* **Pruebas unitarias de lógica pura:** Vitest `3.2.4` (para schemas y reducers puros).

### Matriz de herramientas obligatorias
| Herramienta | Versión | Caso / Regla de origen | Responsabilidad concreta | Pantalla o módulo consumidor | Comprobación prevista |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **React Router** | `8.3.1` | CU-01, CU-02, CU-03, CU-04 | Navegación declarativa entre catálogo, detalle, bolsa, checkout y confirmación. | `AppRoutes`, `CatalogPage`, `ProductDetailPage`, `CartPage`, `CheckoutPage`, `OrderConfirmationPage` | Recorrido visual en navegador verificando cambio de URL y carga de parámetros directos (`/producto/:id`). |
| **TanStack Query** | `5.102.8` | CU-01, CU-02, RN-01, RN-02 | Consulta remota asíncrona del catálogo y ficha de producto; administración de estados de carga, error y caché. | `useProductsCatalog`, `useProductDetail`, `ProductGrid`, `ProductDetailPage` | Simulación de estados de red: visualización de Skeletons (`isPending`), banner de reintento (`isError`) y datos cargados. |
| **Zustand** | `5.0.15` | CU-02, CU-03, CU-04, RN-07, RN-08, RN-12 | Store global del cliente para la bolsa de compras (`useCartStore`); sincronización de ítems, cantidades y vaciado tras compra. | `HeaderBadge`, `CartDrawer`, `CartPage`, `ProductDetailPage`, `CheckoutPage` | Pruebas unitarias puras en Vitest de acciones `addItem`, `updateQuantity`, `removeItem` y `clearCart`. |
| **Zod** | `4.4.3` | CU-04, RN-10 | Definición del esquema estricto y validación de reglas de negocio para los datos de entrega y cálculo de flete. | `checkoutSchema` consumido en `CheckoutForm` | Pruebas unitarias puras con matrices de entradas válidas e inválidas en Vitest. |
| **Mantine Form** | `9.4.1` | CU-04, RN-10 | Gestión del ciclo de vida del formulario de checkout, valores reactivos, errores visuales y enlace con Zod vía `schemaResolver`. | `CheckoutPage`, `CheckoutForm` | Validación interactiva en tiempo real (`validateInputOnChange`) comprobando marcado en rojo instantáneo. |
| **Mantine Core & Modal** | `9.4.1` | CU-03, RN-08 | Componentes visuales y despliegue del modal de confirmación obligatoria para evitar eliminaciones accidentales de prendas. | `CartItemRow`, `CartPage`, `CartModal` | Verificación en navegador: clic en `(-)` con cantidad 1 despliega modal; cancelar conserva la prenda; confirmar la remueve. |

---

## 22. Arquitectura y responsabilidades

### Distribución de responsabilidades
La solución adopta una arquitectura modular basada en componentes y hooks de dominio, respetando estrictamente la separación de responsabilidades:
1. **Capa de Páginas (`pages/`):** Componentes de alto nivel que representan las pantallas del sistema, orquestando consultas y layouts.
2. **Capa de Componentes (`components/`):** Piezas de interfaz de usuario puramente presentacionales o reactivas a props.
3. **Capa de Servicios y Consultas (`services/` y `hooks/`):** Encapsulación de las funciones de acceso a datos y los hooks de TanStack Query.
4. **Capa de Estado Global (`stores/`):** Exclusivamente el store `useCartStore` de Zustand para la bolsa de compras.
5. **Capa de Validación y Esquemas (`schemas/`):** Esquemas de Zod y tipos inferidos para contratos de entrada.
6. **Capa de Tipos (`types/`):** Definiciones de interfaces TypeScript del modelo de dominio.

### Árbol de carpetas propuesto
```text
src/
├── app.tsx                         # Configuración de Router, QueryClientProvider y MantineProvider
├── main.tsx                        # Punto de entrada de la aplicación Vite
├── layouts/                        # Estructuras maestras de navegación
│   └── root-layout.tsx             # Cabecera con logo Atypico, badge de bolsa y pie de página
├── pages/                          # Vistas enrutadas
│   ├── catalog-page.tsx            # Vista de catálogo y filtrado (/)
│   ├── product-detail-page.tsx     # Vista de ficha técnica y variantes (/producto/:id)
│   ├── cart-page.tsx               # Vista dedicada de auditoría de bolsa (/carrito)
│   ├── checkout-page.tsx           # Vista de formulario y flete (/checkout)
│   ├── confirmation-page.tsx       # Vista de confirmación y cierre WhatsApp (/confirmacion/:orderId)
│   └── not-found-page.tsx          # Vista 404 (*)
├── components/                     # Piezas de interfaz modular
│   ├── catalog/
│   │   ├── category-bar.tsx        # Selector de categorías (RN-01)
│   │   ├── size-filter.tsx         # Selector de tallas con bloqueo de stock (RN-02)
│   │   ├── product-card.tsx        # Tarjeta de prenda con foto y precio
│   │   └── product-grid.tsx        # Cuadrícula responsiva con esqueletos de carga
│   ├── product/
│   │   ├── image-carousel.tsx      # Carrusel fotográfico de la prenda
│   │   ├── variant-selector.tsx    # Selectores de talla y color
│   │   └── complementary-card.tsx  # Carta flotante con sugerencias de combinación
│   ├── cart/
│   │   ├── cart-drawer.tsx         # Vista previa lateral rápida desde la cabecera
│   │   ├── cart-item-row.tsx       # Fila de prenda con controles (+/-)
│   │   ├── delete-confirm-modal.tsx# Modal obligatorio de Mantine para confirmación (RN-08)
│   │   └── cart-summary.tsx        # Liquidación de subtotal y botón hacia checkout
│   └── checkout/
│       ├── checkout-form.tsx       # Formulario Mantine Form con validación en tiempo real
│       └── order-summary-box.tsx   # Desglose de subtotal, flete reactivo y total final
├── services/                       # Conectores de datos remotos
│   ├── api-client.ts               # Cliente HTTP base
│   └── product-service.ts          # Funciones fetchProductsCatalog y fetchProductById
├── hooks/                          # Hooks de consulta y lógica
│   ├── use-products.ts             # useQuery para catálogo general
│   └── use-product-detail.ts       # useQuery para detalle por ID
├── stores/                         # Stores de estado del cliente
│   └── use-cart-store.ts           # Store global Zustand de la bolsa de compras
├── schemas/                        # Esquemas de validación Zod
│   └── checkout-schema.ts          # Esquema Zod de datos de entrega y flete
└── types/                          # Interfaces TypeScript puras
    ├── product.ts                  # Interfaces Product, Variant, Category, Size
    ├── cart.ts                     # Interfaces CartItem, CartState
    └── order.ts                    # Interfaces OrderData, CheckoutFormValues
```

---

## 23. Navegación con React Router

### Tabla de rutas declarativas (React Router 8.3.1)
| Ruta | Pantalla asociada | Propósito | Parámetros | Casos de uso |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `CatalogPage` | Catálogo principal de la colección urbana y filtrado reactivo. | Ninguno (filtros en estado local de UI). | CU-01 / SPEC-01 |
| `/producto/:id` | `ProductDetailPage` | Ficha de prenda con carrusel de fotos, descripción y selección de variantes. | `:id` (identificador de la prenda, ej. `boxy-tee-black`). | CU-02 / SPEC-02 |
| `/carrito` | `CartPage` | Vista completa de auditoría de la bolsa, edición de cantidades y subtotal. | Ninguno. | CU-03 / SPEC-03 |
| `/checkout` | `CheckoutPage` | Formulario de datos de despacho, selección de ciudad y flete reactivo. | Ninguno (lee ítems directamente de Zustand). | CU-04 / SPEC-04 |
| `/confirmacion/:orderId` | `ConfirmationPage` | Resumen final del pedido, datos bancarios y enlace estructurado a WhatsApp. | `:orderId` (código único de orden generado, ej. `ATY-8421`). | CU-04 / SPEC-04 |
| `*` | `NotFoundPage` | Pantalla 404 para URLs no existentes con botón de retorno al catálogo. | Ninguno. | Todos |

### Comportamiento de navegación y enlaces
1. **Navegación declarativa:** Se realiza exclusivamente mediante componentes `<Link>` y el hook `useNavigate()` de React Router, sin recargas completas de página.
2. **Acceso directo y recarga:**
   * Al acceder directamente o recargar `/producto/:id`, React Router extrae el parámetro `id` mediante `useParams()` y TanStack Query ejecuta la consulta remota `['product', id]`. Si el ID no existe en el catálogo, la página muestra un estado visual guiado de "Prenda no encontrada" con botón hacia `/`.
   * Al recargar `/checkout`, si la bolsa en Zustand contiene 0 artículos, el componente redirige declarativamente a `/` para impedir compras sin prendas.
   * Al recargar `/confirmacion/:orderId`, se extrae el código de orden del parámetro para mantener visible el comprobante del pedido.
3. **Drawer lateral complementario:** Desde la cabecera (`Header`), el icono de la bolsa abre un `CartDrawer` flotante para inspección rápida sin salir de la página actual, el cual incluye un botón "Ver carrito completo" que navega formalmente a `/carrito`.
4. **Restricción arquitectónica cumplida:** No se introducen `loaders` ni `actions` de frameworks full-stack; toda la navegación se mantiene en el modo declarativo de React.

---

## 24. Propiedad del estado y uso de Zustand

### Matriz de propiedad de estado
Para evitar redundancias o arquitecturas infladas, cada dato tiene un único responsable asignado:
| Dato relevante del producto | Quién lo administra | Justificación técnica |
| :--- | :--- | :--- |
| **Catálogo de prendas y stock** | **TanStack Query** | Es un dato remoto del servidor; vive en caché asíncrona y no debe clonarse a Zustand. |
| **Filtros de categoría y talla** | **Estado local React (`useState`)** | Solo afecta a la cuadrícula del catálogo; no requiere propagación global. |
| **Variante seleccionada (talla/color)** | **Estado local React (`useState`)** | Vive únicamente dentro de la ficha de detalle de la prenda. |
| **Prendas en la bolsa (`items: CartItem[]`)** | **Zustand (`useCartStore`)** | **Estado compartido del cliente:** Es requerido simultáneamente por la cabecera (badge), el drawer, la vista de carrito y el checkout. |
| **Campos y errores del checkout** | **Mantine Form** | Estado transitorio de entrada del usuario administrado mediante su hook nativo. |
| **Apertura de Modales y Drawers** | **Mantine Core (`useDisclosure`)** | Estado booleano de visibilidad puramente visual en el componente contenedor. |
| **Identificador de orden activa** | **Parámetro de URL (`useParams`)** | Permite enlazar y referenciar directamente el pedido confirmado. |

### Diseño del Store de Zustand (`useCartStore`)
* **Qué guarda:**
  ```typescript
  interface CartItem {
    id: string;          // Clave compuesta: `${productId}-${size}-${color}`
    productId: string;
    name: string;
    price: number;
    size: 'S' | 'M' | 'L' | 'XL';
    color: string;
    quantity: number;    // Entre 1 y 10 (Regla RN-07)
    imageUrl: string;
  }
  ```
* **Acciones que expone:**
  * `addItem(item: CartItem): void`: Si el ítem ya existe en la misma combinación de talla y color, incrementa su cantidad respetando el tope de 10 unidades. Si no existe, lo inserta al arreglo.
  * `updateQuantity(id: string, delta: number): void`: Modifica la cantidad verificando límites operativos.
  * `removeItem(id: string): void`: Elimina la prenda de la bolsa.
  * `clearCart(): void`: Vacía la bolsa (invocado al finalizar la confirmación de la orden).
* **Consumidores:**
  1. `Header`: Lee `items.reduce((acc, it) => acc + it.quantity, 0)` para el contador numérico.
  2. `CartDrawer` y `CartPage`: Leen `items` y disparan `updateQuantity` o `removeItem`.
  3. `ProductDetailPage`: Dispara `addItem`.
  4. `CheckoutPage`: Lee `items` para el resumen de compra y cálculo de flete.
  5. `OrderConfirmationPage`: Dispara `clearCart` (Regla RN-12).
* **Ciclo de vida y límites:**
  * El estado de la bolsa se mantiene en memoria de JavaScript durante la sesión de navegación, garantizando ligereza y cumplimiento de las directrices del bootcamp.
  * La persistencia en almacenamiento externo y sincronización con tokens se declara como mejora futura con backend.

---

## 25. Datos, servicios y límites de integración

### Fuentes remotas del producto
El e-commerce requiere como fuente de datos el catálogo de prendas streetwear.
* **Operaciones disponibles:**
  * `fetchProductsCatalog()`: `GET /api/products` (o carga de `public/data/products.json` vía HTTP) $\to$ Retorna `Product[]`.
  * `fetchProductById(id: string)`: `GET /api/products/:id` $\to$ Retorna `ProductDetail`.
* **Contrato de datos TypeScript:**
  ```typescript
  export interface Product {
    id: string;
    name: string;
    category: 'Camisetas Oversize' | 'Pantalones Cargo' | 'Accesorios';
    price: number;
    imageUrl: string;
    sizesAvailable: ('S' | 'M' | 'L' | 'XL')[];
    inStock: boolean;
  }

  export interface ProductDetail extends Product {
    description: string;
    composition: string;
    fit: 'Boxy Fit' | 'Relaxed Cargo' | 'Standard';
    gallery: string[];
    colorsAvailable: string[];
  }
  ```

### Fronteras de validación y límites
1. **Validación de respuestas:** Se valida en la frontera del servicio que el arreglo de productos contenga estructuras conformes a la interfaz `Product`. Si la respuesta contiene un arreglo vacío, se proyecta el estado `isEmpty` sin romper la cuadrícula.
2. **Seguridad y secretos:** La aplicación cliente **no maneja claves privadas, credenciales de administrador ni tokens secretos**. El catálogo es información 100% pública.
3. **Ausencia de backend transaccional docente:** No se inventan endpoints ficticios de creación de pedidos en servidor (`POST /api/orders`). La orden se genera en el cliente con identificador determinista `#ATY-XXXX` y la transacción se procesa fuera de banda mediante transferencia bancaria y WhatsApp, reflejando honestamente el alcance del proyecto.

---

## 26. Formularios, Zod y Mantine Modal

### Formulario de Checkout con Zod 4.4.3 y Mantine Form 9.4.1
Se elige el **Formulario de Checkout y Datos de Despacho** para la implementación de validaciones estrictas conectadas con las reglas de negocio.

#### 1. Schema de validación Zod (`zod/v4`)
```typescript
import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { message: 'Ingresa tu nombre y apellido completo (mínimo 3 caracteres).' }),
  phone: z
    .string()
    .trim()
    .regex(/^09\d{8}$/, {
      message: 'Ingresa un número celular válido de 10 dígitos (ej. 0991234567).'
    }),
  city: z.enum(['LOCAL', 'NACIONAL'], {
    errorMap: () => ({ message: 'Selecciona la ciudad de entrega para calcular el envío.' })
  }),
  address: z
    .string()
    .trim()
    .min(5, { message: 'Ingresa la dirección detallada de entrega con referencias (mínimo 5 caracteres).' }),
  notes: z
    .string()
    .trim()
    .max(150, { message: 'Las notas no pueden superar los 150 caracteres.' })
    .optional()
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
```
*(Nota técnica: El uso de `z.infer` provee exclusivamente tipado estático en tiempo de compilación; la validación en tiempo de ejecución es efectuada exclusivamente por `schemaResolver` durante la interacción del usuario).*

#### 2. Conexión con Mantine Form y validación en tiempo real
* Se inicializa el formulario con el hook `useForm` de Mantine:
  ```typescript
  const form = useForm<CheckoutFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      fullName: '',
      phone: '',
      city: 'LOCAL',
      address: '',
      notes: ''
    },
    validate: schemaResolver(checkoutSchema),
    validateInputOnChange: true, // Decisión de Fernando: validación en tiempo real
  });
  ```
* **Cadena de ejecución:**
  `Entrada de usuario` $\to$ `validateInputOnChange` $\to$ `schemaResolver(checkoutSchema)` $\to$ `Respuesta visible instantánea` (campo en rojo y texto explicativo bajo el input).

#### 3. Entradas válidas e inválidas comprobables
| Campo | Entrada inválida | Mensaje visible generado | Entrada válida |
| :--- | :--- | :--- | :--- |
| `fullName` | `"Fe"` | "Ingresa tu nombre y apellido completo (mínimo 3 caracteres)." | `"Fernando Mendoza"` |
| `phone` | `"099123"` / `"abc1234567"` | "Ingresa un número celular válido de 10 dígitos (ej. 0991234567)." | `"0998765432"` |
| `city` | `""` | "Selecciona la ciudad de entrega para calcular el envío." | `"LOCAL"` ($3.50) o `"NACIONAL"` ($5.00) |
| `address` | `"Casa"` | "Ingresa la dirección detallada de entrega con referencias (mínimo 5 caracteres)." | `"Av. Amazonas N24-102 y Colón"` |

### Integración y ciclo de vida de Mantine Modal (9.4.1)
El modal de Mantine se utiliza obligatoriamente para implementar la **Regla `RN-08` de confirmación previa al reducir a 0 o eliminar una prenda**.
* **Propósito:** Evitar la pérdida involuntaria de prendas al presionar accidentalmente el control decrementar `(-)` cuando la cantidad es 1 o el icono de basura.
* **Disparador:** Evento `onClick` del botón decrementar si `item.quantity === 1` o botón "Eliminar prenda" en `CartItemRow`.
* **Administración de estado:** Se gestiona mediante el hook `useDisclosure(false)` de Mantine Core en el componente local.
* **Contenido visual:**
  * Título: *"¿Eliminar prenda de tu bolsa?"*
  * Cuerpo: Miniatura del producto, nombre, talla, precio y texto de advertencia: *"¿Estás seguro de quitar esta prenda? Tendrás que volverla a agregar desde el catálogo si deseas comprarla."*
  * Acciones: Botón *"Conservar prenda"* (outline secundario) y botón *"Sí, eliminar"* (rojo destructivo).
* **Cancelación:** Al presionar *"Conservar prenda"*, tecla `Escape` o clic fuera del modal, se ejecuta `close()` sin alterar el store de Zustand. La prenda permanece con cantidad 1.
* **Confirmación (Éxito):** Al presionar *"Sí, eliminar"*, se ejecuta `removeItem(item.id)` en Zustand, se invoca `close()`, la fila se remueve y el subtotal de la bolsa se recalcula de inmediato.

---

## 27. Recorridos técnicos y sincronización con TanStack Query

### Recorrido técnico principal de compra
1. **Acción del usuario:** El comprador ingresa a `/`.
2. **Capa técnica de datos:** React Router monta `CatalogPage`. Se ejecuta el hook `useQuery` con `queryKey: ['products']`.
3. **Manejo de estados:**
   * Mientras se obtienen los datos (`isPending`), se renderizan esqueletos `SkeletonGrid` de Mantine.
   * Si ocurre un error de red (`isError`), se despliega una tarjeta de error con botón "Reintentar conexión".
   * Al completarse con éxito (`isSuccess`), las prendas se proyectan en `ProductGrid`.
4. **Filtrado en cliente:** El usuario hace clic en "Pantalones Cargo". El estado local del filtro se actualiza y la cuadrícula filtra las prendas en memoria de forma pura sin re-consultar el servidor ni utilizar `useEffect`.
5. **Navegación al detalle:** El usuario hace clic en una prenda $\to$ React Router transiciona a `/producto/cargo-pant-urban`.
6. **Consulta de detalle:** Se dispara `useQuery` con `queryKey: ['product', 'cargo-pant-urban']`, renderizando el carrusel de imágenes y las variantes.
7. **Adición a la bolsa:** El usuario elige talla "L" y pulsa "Añadir a la bolsa" $\to$ Se dispara `addItem` de Zustand. Se actualiza el badge en el `Header` y se despliega la tarjeta flotante con prendas complementarias sugeridas.
8. **Revisión de bolsa:** El comprador abre el `CartDrawer` y pulsa "Ver carrito completo" $\to$ Se transiciona a `/carrito`.
9. **Transición a checkout:** Pulsa "Continuar al checkout" $\to$ Navega a `/checkout`. Completa el formulario de datos de entrega validado en tiempo real con Mantine Form y Zod.
10. **Liquidación y confirmación:** Al elegir ciudad "LOCAL", el total suma $3.50 de flete de forma reactiva. Pulsa "Confirmar pedido" $\to$ Zod valida con éxito, se genera el identificador `#ATY-8421`, se invoca `clearCart()` de Zustand y se navega a `/confirmacion/ATY-8421`.
11. **Cierre en WhatsApp:** La pantalla muestra el resumen formal y el botón con enlace estructurado `https://wa.me/5939XXXXXXXX?text=...` que pre-carga el mensaje con la orden y monto para adjuntar el comprobante de pago.

### Justificación de ausencia de mutaciones remotas
Conforme a las directrices de la consigna (*"Si el alcance no modifica datos remotos, justifícalo sin inventar una mutación"*):
* La tienda showcase de Atypico Studio utiliza un modelo de cierre descentralizado y seguro mediante transferencia bancaria y WhatsApp, el cual no requiere una mutación HTTP `POST` en un servidor externo.
* Se evita inventar mutaciones o endpoints no existentes, respetando la transparencia arquitectónica del proyecto.

---

## 28. Estrategia de verificación y límites de evidencia

### Matriz de verificación técnica
| Criterio funcional a verificar | Comprobación prevista | Resultado esperado | Herramienta o entorno | Límite y alcance de la evidencia |
| :--- | :--- | :--- | :--- | :--- |
| **Esquema de validación Zod** | Ejecución de suite de tests unitarios con datos válidos e inválidos. | `checkoutSchema.safeParse()` retorna `success: true` con datos correctos y genera errores descriptivos con entradas erróneas. | Vitest 3.2.4 | Prueba pura de lógica en Node/Vitest; no prueba renderizado en navegador. |
| **Store de bolsa de compras** | Test unitario de acciones del store `useCartStore`. | `addItem` acumula cantidades hasta 10; `updateQuantity` limita entre 1 y 10; `removeItem` y `clearCart` vacían el estado. | Vitest 3.2.4 | Prueba puramente lógica en memoria; no verifica interfaz visual. |
| **Estados de TanStack Query** | Verificación visual manipulando la respuesta de `product-service`. | Se visualizan skeletons en `isPending`, alerta con reintento en `isError` y productos en `isSuccess`. | Navegador web (Vite dev server) | Verificación manual interactiva; sujeta a la simulación del servicio. |
| **Validación reactiva Mantine Form** | Escritura interactiva de campo `phone` con menos de 10 caracteres. | El input se resalta en rojo de inmediato y muestra el mensaje de error sin esperar al submit. | Navegador web | Comprobación de integración de UI. |
| **Modal de confirmación Mantine** | Clic en botón `(-)` sobre prenda con cantidad 1 en `/carrito`. | Se despliega el modal de Mantine; cancelar deja cantidad 1; confirmar elimina la prenda y actualiza el subtotal. | Navegador web | Comprobación de flujo interactivo del componente. |
| **Cálculo reactivo de flete** | Cambio interactivo del selector de ciudad entre LOCAL y NACIONAL. | El total de la orden se incrementa en exactamente $3.50 o $5.00 de forma instantánea. | Navegador web | Prueba de reactividad en el formulario de checkout. |

### Límites de evidencia
* Las pruebas unitarias en Vitest y las comprobaciones en navegador forman parte del **plan de verificación técnica** y se ejecutarán durante la fase de construcción.
* La evidencia técnica ejecutada en esta fase documental comprende: el preflight del harness AHK 3.0.0, `ahk health` (compilación exitosa en 364ms), la validación MCP de los 12 documentos de especificaciones y la generación del documento formal.

---

## 29. Plan de construcción, dependencias y riesgos

### Etapas secuenciales de construcción
1. **Etapa 1: Instalación de dependencias del stack:**
   * Instalación de dependencias aprobadas: `react-router@8.3.1`, `@tanstack/react-query@5.102.8`, `zustand@5.0.15`, `zod@4.4.3`, `@mantine/core@9.4.1`, `@mantine/form@9.4.1`, `@mantine/hooks@9.4.1` y `vitest@3.2.4`.
   * Criterio de cierre: `pnpm build` compila sin advertencias con las dependencias incorporadas.
2. **Etapa 2: Capa de tipos y servicios de datos (Query):**
   * Creación de interfaces en `types/product.ts`, catálogo en `public/data/products.json` y servicio `product-service.ts` con hooks de TanStack Query.
   * Criterio de cierre: Consulta de productos responde correctamente con manejo de estados asíncronos.
3. **Etapa 3: Vistas de catálogo y detalle (React Router):**
   * Configuración de rutas `/` y `/producto/:id`, cuadrícula `ProductGrid`, selectores de categoría y talla con deshabilitación por stock, carrusel de imágenes y botón dual de compra.
   * Criterio de cierre: Navegación fluida entre colección y prenda con filtros reactivos en memoria.
4. **Etapa 4: Store de Zustand y vista de carrito con Modal:**
   * Implementación de `useCartStore`, `CartDrawer` en cabecera, página `/carrito` y `DeleteConfirmModal` con Mantine Modal.
   * Criterio de cierre: Adición, modificación de cantidades y confirmación modal de eliminación operando de forma coherente.
5. **Etapa 5: Formulario de checkout y flete dinámico:**
   * Implementación de `checkoutSchema` en Zod y formulario en `CheckoutPage` con Mantine Form (`validateInputOnChange: true`) y cálculo de flete.
   * Criterio de cierre: Validación en tiempo real y suma reactiva del flete según ciudad local o nacional.
6. **Etapa 6: Cierre de pedido y canal de WhatsApp:**
   * Generación de identificador `#ATY-XXXX`, formateo de enlace `wa.me` con resumen de compra, pantalla de confirmación y vaciado de bolsa.
   * Criterio de cierre: Clic en WhatsApp abre la aplicación con el mensaje estructurado pre-cargado.
7. **Etapa 7: Pruebas unitarias y cierre:**
   * Ejecución de tests en Vitest para schemas de Zod y reducers de Zustand.

### Riesgos técnicos y mitigaciones
* **Riesgo 1: Incompatibilidad entre versiones de Mantine Form y Mantine Core.**  
  *Mitigación:* Se fijan estrictamente en la misma versión (`9.4.1`) y se utiliza el resolver nativo `schemaResolver` incluido en Mantine sin paquetes obsoletos de terceros.
* **Riesgo 2: Bloqueo de navegación al recargar páginas con parámetros directos.**  
  *Mitigación:* React Router maneja parámetros mediante `useParams` con fallback visual si la consulta de TanStack Query arroja error o prenda no encontrada.
* **Riesgo 3: Eliminación accidental de prendas en dispositivos móviles.**  
  *Mitigación:* Implementación estricta de la regla `RN-08` mediante el diálogo modal de Mantine.

---

## 30. Trazabilidad técnica y cambios respecto de la segunda entrega

### Matriz completa de trazabilidad técnica
| Caso de uso | Regla de negocio | Especificación funcional | Especificación técnica | Pieza técnica responsable | Herramienta obligatoria | Criterio y comprobación prevista |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CU-01** | RN-01, RN-02, RN-03 | `spec-01` | `spec-tech-01` | `CatalogPage`, `ProductGrid`, `SizeFilter` | React Router 8.3.1 + TanStack Query 5.102.8 | CA-01 a CA-04: Carga de colección con Skeletons, filtrado en memoria y deshabilitación visual de tallas sin stock. |
| **CU-02** | RN-04, RN-05, RN-06 | `spec-02` | `spec-tech-02` | `ProductDetailPage`, `ImageCarousel`, `VariantSelector` | React Router 8.3.1 + TanStack Query 5.102.8 | CA-05 a CA-08: Navegación a `/producto/:id`, carrusel de prendas, botón "Comprar ahora" hacia checkout y "Añadir a la bolsa" hacia Zustand. |
| **CU-03** | RN-07, RN-08, RN-09 | `spec-03` | `spec-tech-03` | `useCartStore`, `CartPage`, `DeleteConfirmModal` | Zustand 5.0.15 + Mantine Modal 9.4.1 | CA-09 a CA-12: Contador reactivo en cabecera, auditoría de prendas, confirmación modal obligatoria al reducir a 0 y subtotal neto sin flete. |
| **CU-04** | RN-10, RN-11, RN-12 | `spec-04` | `spec-tech-04` | `CheckoutPage`, `checkoutSchema`, `ConfirmationPage` | Zod 4.4.3 + Mantine Form 9.4.1 + React Router | CA-13 a CA-16: Validación de campos en tiempo real, flete reactivo ($3.50 local / $5.00 nacional), generación de orden `#ATY-XXXX` y enlace a WhatsApp. |

### Registro transparente de cambios respecto de la segunda entrega
1. **Adición de Drawer lateral de previsualización:** En la Fase 2 solo se contemplaba la página dedicada de carrito; en la Fase 3, por decisión de diseño del estudiante, se incorpora el `CartDrawer` en la cabecera para permitir una inspección rápida de la bolsa sin interrumpir la navegación, manteniendo el acceso hacia `/carrito`.
2. **Validación en tiempo real en formulario de checkout:** En la Fase 2 la validación se describía a nivel conceptual en el submit; en la Fase 3 se formaliza la validación reactiva campo a campo mediante `validateInputOnChange: true` en Mantine Form con Zod.
3. **Formalización de consulta remota sin mutación artificial:** Se establece con claridad y rigor académico que el catálogo se consume mediante TanStack Query y que no se simularán mutaciones remotas ficticias, dado que el cierre de venta se realiza por WhatsApp y transferencia bancaria.
4. **Conservación de decisiones de alcance:** Se mantiene la exclusión de pasarelas con tarjeta bancaria y logins de usuario, registrando la persistencia multi-dispositivo y sincronización con tokens como mejoras futuras con backend dedicado.

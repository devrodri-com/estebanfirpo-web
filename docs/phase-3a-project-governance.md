# Fase 3A — Gobernanza de proyectos prioritarios

## Propósito

Este documento define cómo registrar, revisar, publicar y volver a comprobar la información de los seis proyectos prioritarios. El objetivo no es certificar una inversión ni sustituir la documentación contractual: es impedir que un dato comercial se presente como vigente sin procedencia, fecha y responsable.

El modelo implementado se encuentra en:

- `src/data/project-governance/types.ts`: contratos tipados;
- `src/data/project-governance/priority-projects.ts`: registro inicial de los seis proyectos;
- `src/data/project-governance/public-priority-projects.ts`: transformación por lista blanca a un view model público;
- `src/components/projects/PriorityProjectPage.tsx`: proyección pública de la información gobernada.

Esta gobernanza se aplica sólo a:

1. The William Residences;
2. Frida Kahlo Wynwood Residences;
3. Twenty Six & 2nd (Wynwood);
4. Seven Park Residences;
5. Oasis Hallandale;
6. Midtown Park.

Los otros 30 proyectos conservan temporalmente su fuente de datos y ficha legacy. No se migran ni se reinterpretan en esta fase.

## 1. Estados editoriales exactos

El tipo `EditorialStatus` admite solamente estos valores:

| Estado técnico | Significado editorial | Uso público permitido |
|---|---|---|
| `reviewed` | El dato tiene una fuente adecuada e identificada, fecha de revisión, responsable editorial, alcance claro y plazo de vigencia. Las contradicciones materiales fueron resueltas. | Puede mostrarse con su fuente, fecha y vigencia. Sigue sujeto a los documentos contractuales y no constituye garantía. |
| `reconfirmation_required` | Existe un valor respaldado por una fuente identificada, pero su vigencia comercial, alcance o aplicación al caso concreto debe reconfirmarse. | Puede mostrarse sólo con la etiqueta de reconfirmación, la nota de límite y la fuente pública aplicable. No debe utilizarse como promesa ni como disponibilidad permanente. |
| `unverified` | No hay evidencia suficiente, el dato falta, las fuentes se contradicen o la fuente encontrada no sirve para ese tipo de dato. | No se publica el valor legacy. La ficha muestra “Pendiente de verificación” con una nota pública orientada a la próxima comprobación, sin detallar fallos internos. |
| `inactive` | Una fuente autorizada confirma que el proyecto, una oferta o una condición dejó de estar activa. No equivale a una inferencia por falta de noticias. | No se promociona ni se recomienda. Cualquier permanencia de la URL debe tratarse como información histórica y requiere una decisión editorial separada. |

### Estado general del proyecto

`overallStatus` resume el riesgo editorial del proyecto, no el promedio de sus campos.

- Es `reviewed` sólo cuando identidad, estado comercial y todos los datos sensibles que se publiquen cumplen los criterios de revisión.
- Es `reconfirmation_required` si el proyecto puede describirse con fuentes, pero uno o más datos necesarios para una decisión comercial requieren reconfirmación.
- Es `unverified` si ni siquiera hay respaldo suficiente para describir responsablemente el estado o alcance del proyecto.
- Es `inactive` sólo con confirmación autorizada de inactividad.

Un sitio web activo o un formulario de consultas activo no prueban inventario, precio ni disponibilidad de una unidad.

## 2. Registro obligatorio de cada dato sensible

Los campos sensibles actuales son:

- estado comercial;
- precio;
- entrega;
- política de renta;
- financiación;
- disponibilidad;
- plan de pagos;
- derechos de imágenes.

Cada uno se registra como `GovernedField<T>` y debe conservar:

| Propiedad | Requisito |
|---|---|
| `value` | Valor exacto y acotado, o `null` cuando no corresponde publicarlo. Nunca completar por inferencia. |
| `status` | Uno de los cuatro estados tipados. |
| `sourceIds` | Identificadores de las fuentes que respaldan el valor o documentan la contradicción. |
| `reviewedAt` | Fecha ISO `YYYY-MM-DD` de la revisión. No confundir con la fecha de emisión de la fuente. |
| `reviewedBy` | Responsable editorial que revisó el dato. Para `reviewed` debe ser una persona o rol final claramente asignado. |
| `validity` | Regla `valid_until` con fecha, o `reconfirm_before_use` cuando no puede asumirse vigencia. |
| `note` | Explicación breve ES/EN de alcance, límite, contradicción o documento faltante. |

Para `unverified` y `reconfirmation_required`, `reviewedBy` permanece `null` hasta que Rodrigo o Esteban asignen y aprueben un responsable real. Una actividad técnica o una fase del proyecto no sustituyen a esa persona o rol. La nota de este registro es interna; la proyección pública utiliza una nota distinta y acotada por tipo de campo.

### Reglas de vigencia

- `valid_until` se usa cuando existe un plazo de vigencia defendible y registra una fecha ISO concreta.
- `reconfirm_before_use` significa que el valor debe volver a comprobarse antes de cotizar, recomendar, pautar, compartir como disponibilidad o utilizar en una decisión.
- Un dato vencido no se prorroga automáticamente. Debe pasar a `reconfirmation_required` o `unverified` según la evidencia disponible.
- No se define un plazo universal para todos los campos. Precio e inventario suelen cambiar más rápido que identidad, equipo o ubicación; la vigencia debe justificarse por campo.

## 3. Registro de fuentes

`ProjectSource` separa la procedencia de la forma en que se publica el dato.

Una fuente debe registrar:

- identificador estable;
- título ES/EN;
- tipo de fuente;
- URL pública o ruta interna segura;
- fecha de emisión, si existe;
- fecha en que fue observada;
- indicación `public`;
- nota ES/EN sobre qué acredita y qué no acredita.

### Jerarquía de uso

1. Para precio, inventario y disponibilidad se requiere documentación vigente entregada por Esteban o por un canal autorizado: price sheet, inventory sheet o confirmación equivalente y fechada.
2. Los sitios oficiales del proyecto, developer o equipo de ventas pueden respaldar identidad, ubicación, equipo, tipologías y amenidades. Son secundarios para condiciones comerciales cambiantes.
3. Fact sheets y documentos oficiales pueden respaldar el contenido que expresamente contienen, dentro de su fecha y alcance.
4. El catálogo histórico sirve para descubrir datos y contradicciones, no para promover un campo a `reviewed`.
5. El inventario de assets confirma disponibilidad técnica, dimensiones y respuesta HTTP; no acredita derechos de uso.
6. Una fuente de terceros no oficial puede orientar la búsqueda, pero no cierra una validación comercial.

Una fuente marcada `public: true` debe tener una URL segura y apta para mostrarse. Las fuentes internas pueden conservar una ruta de repositorio, pero nunca deben exponer documentos privados completos, datos personales innecesarios ni ubicaciones locales del equipo en la interfaz pública.

### Proyección pública segura

`getPublicPriorityProjectGovernance(slug)` reutiliza el registro interno, pero construye un objeto nuevo por lista blanca. Sólo admite identidad, ubicación, developer/equipo, resumen, hechos atribuidos, encaje editorial, campos comerciales públicos, preguntas para el comprador, CTA contextual y fuentes oficiales públicas.

La proyección excluye por tipo y en tiempo de ejecución:

- `risks` y `openQuestions` internos;
- `imageRights`;
- `reviewedBy`;
- notas internas de los campos;
- fuentes `public: false`;
- `repositoryPath`, nombres de documentos privados, tipo interno, fecha de emisión e identificadores internos.

Cada fuente pública contiene solamente título, enlace, alcance y fecha observada. La fecha general del registro visible se calcula desde `observedAt`; no se duplica en el copy.

## 4. Criterios para promover o degradar un estado

### De `unverified` a `reconfirmation_required`

Requiere:

- un valor concreto;
- al menos una fuente identificada que realmente trate ese campo;
- fecha de observación;
- nota que explique por qué falta reconfirmar;
- paridad de significado ES/EN;
- ausencia de una contradicción material sin explicar.

Si dos fuentes vigentes se contradicen en precio, entrega, renta, financiación o plan, el campo permanece `unverified` hasta resolver la contradicción.

### De `reconfirmation_required` a `reviewed`

Requiere todos estos puntos:

1. fuente adecuada, identificada y accesible para auditoría;
2. fecha de emisión u observación suficiente para juzgar vigencia;
3. responsable editorial asignado;
4. valor, moneda, unidad, alcance y excepciones registrados;
5. contradicciones materiales resueltas;
6. versión ES/EN equivalente en significado;
7. aprobación editorial del Product Owner registrada en el flujo de cambio;
8. `valid_until` definido;
9. revisión de que el dato no genere una promesa, recomendación automática o garantía.

El campo `reviewedBy` representa al responsable final. Mientras el modelo siga en código, la aprobación editorial se conserva además en el historial del cambio; la futura herramienta operativa deberá registrarla como evento propio.

### Hacia `inactive`

Requiere una comunicación del developer, brokerage, equipo autorizado o documento equivalente que confirme la inactividad. La ausencia de inventario, un enlace caído o una fecha pasada no bastan por sí solos.

### Degradación obligatoria

Un campo `reviewed` vuelve a `reconfirmation_required` o `unverified` cuando vence, aparece una contradicción, cambia la fuente, se detecta un error, se modifica la regulación aplicable o se pierde la trazabilidad. No se conserva `reviewed` por conveniencia comercial.

## 5. Roles y responsabilidades

| Rol | Responsabilidad |
|---|---|
| Esteban o canal comercial autorizado | Aportar documentos vigentes, confirmar alcance comercial y aclarar qué puede compartirse públicamente. |
| Responsable del catálogo | Registrar fuentes, fechas, valores y contradicciones sin interpretar lo que el documento no dice. |
| Revisor editorial | Comprobar lenguaje prudente, paridad ES/EN, separación entre dato y observación, y ausencia de claims no respaldados. |
| Product Owner | Aprobar publicación, vigencia, tratamiento de contradicciones y cualquier cambio de `reviewed` o `inactive`. |
| Responsable técnico | Mantener el esquema y su proyección pública. No promueve estados por decisión propia. |

Una misma persona puede cubrir más de un rol, pero la responsabilidad debe quedar identificada. “Auditoría de Fase 3A” describe una actividad, no sustituye al responsable final requerido para `reviewed`.

## 6. Flujo operativo

1. **Ingreso:** registrar el archivo o enlace sin alterar la fuente original.
2. **Clasificación:** identificar proyecto, campo, fecha, emisor y si puede ser público.
3. **Comparación:** contrastar con el registro actual y anotar contradicciones.
4. **Estado:** asignar el estado por campo; ante duda, elegir el más conservador.
5. **Redacción:** preparar valor y nota ES/EN con el mismo alcance.
6. **Revisión editorial:** comprobar fuente, lenguaje, vigencia y responsable.
7. **Aprobación:** el Product Owner decide si se publica y hasta cuándo.
8. **Proyección:** la web muestra sólo la información autorizada; las notas internas no se envían al cliente.
9. **Seguimiento:** revisar disparadores de reconfirmación y degradar el estado cuando corresponda.

## 7. Reglas de publicación

- Nunca completar un dato faltante por inferencia, conversión no revisada o copia de otro proyecto.
- `unverified` no muestra el valor preexistente, aunque siga disponible en el módulo legacy.
- `reconfirmation_required` debe mostrar estado, fecha, nota y fuente pública cuando exista.
- `reviewed` debe mostrar fecha y vigencia; no significa disponibilidad garantizada.
- `inactive` se retira de promoción y destacados. La decisión de conservar, redirigir o archivar su URL queda fuera de este documento.
- Precio, inventario y disponibilidad nunca se presentan como permanentes.
- Una política de renta debe distinguir reglas del condominio, zoning, licencias y operación cuando sean aplicables; no resumirlas como “Airbnb permitido” sin respaldo suficiente.
- Financiación e incentivos deben indicar proveedor, elegibilidad, fecha y condiciones; de lo contrario quedan sin verificar.
- Los hechos reportados por una fuente se distinguen del marco editorial “Puede ser relevante si…”.
- Una observación editorial no se presenta como dato del developer.
- La existencia técnica de una imagen no equivale a permiso de uso.
- Sólo las fuentes con `public: true` forman parte del registro visible.
- Las contradicciones, archivos faltantes y decisiones pendientes se conservan en la gobernanza, pero se convierten en preguntas útiles para el comprador antes de llegar a la interfaz.

## 8. Estado inicial de los seis proyectos

Estado al 13 de julio de 2026:

| Proyecto | General | Comercial | Precio | Entrega | Renta | Financiación | Disponibilidad | Pagos | Derechos de imagen |
|---|---|---|---|---|---|---|---|---|---|
| The William Residences | `reconfirmation_required` | `reconfirmation_required` | `unverified` | `reconfirmation_required` | `unverified` | `unverified` | `unverified` | `unverified` | `unverified` |
| Frida Kahlo Wynwood Residences | `reconfirmation_required` | `reconfirmation_required` | `unverified` | `unverified` | `reconfirmation_required` | `unverified` | `unverified` | `unverified` | `unverified` |
| Twenty Six & 2nd (Wynwood) | `reconfirmation_required` | `reconfirmation_required` | `unverified` | `unverified` | `reconfirmation_required` | `unverified` | `unverified` | `unverified` | `unverified` |
| Seven Park Residences | `reconfirmation_required` | `reconfirmation_required` | `unverified` | `unverified` | `reconfirmation_required` | `unverified` | `unverified` | `unverified` | `unverified` |
| Oasis Hallandale | `reconfirmation_required` | `reconfirmation_required` | `unverified` | `unverified` | `unverified` | `unverified` | `unverified` | `unverified` | `unverified` |
| Midtown Park | `reconfirmation_required` | `reconfirmation_required` | `unverified` | `unverified` | `reconfirmation_required` | `unverified` | `unverified` | `unverified` | `unverified` |

No hay campos iniciales `reviewed` ni proyectos `inactive`. Las fuentes públicas permiten describir identidad, equipo y ciertos atributos, pero todavía no cumplen el umbral para publicar como vigentes precio, inventario, financiación o plan de pagos.

## 9. Disparadores de revalidación

Revisar el campo y su estado cuando ocurra cualquiera de estos eventos:

- llega un price sheet, inventory sheet, fact sheet o addendum nuevo;
- vence `valid_until`;
- una fecha estimada de contrato, obra, entrega o cierre ya transcurrió;
- el developer o equipo autorizado modifica el proyecto, condiciones o canal de ventas;
- aparece una contradicción entre fuentes;
- cambia una regla de renta, zoning, licencia o documento de condominio;
- se anuncia, modifica o retira una financiación o incentivo;
- un enlace deja de responder o el documento cambia sin versión clara;
- se recibe una reclamación o restricción sobre una imagen;
- Esteban solicita usar el dato en una recomendación, campaña, cotización o conversación concreta;
- se detecta una diferencia ES/EN que cambia el alcance.

## 10. Convivencia con los 30 proyectos legacy

- No se migran datos ni se editan fichas legacy en Fase 3A.
- Las URLs actuales permanecen accesibles.
- La ruta selecciona la ficha gobernada sólo cuando el slug existe en `PRIORITY_PROJECTS`.
- La experiencia legacy sigue siendo la referencia de regresión para los otros 30 proyectos.
- No debe copiarse el nuevo contenido gobernado a `ALL_PROJECTS`; eso duplicaría datos y podría exponer notas internas en la página cliente del catálogo.
- La existencia temporal de dos generaciones debe comunicarse como una migración controlada, no como una diferencia de calidad comercial entre proyectos.

## 11. Evolución operativa

El registro TypeScript demuestra el modelo y permite implementar las seis fichas sin nueva infraestructura. No es la herramienta operativa definitiva.

La siguiente solución deberá migrar el esquema a una fuente estructurada y editable —spreadsheet, CMS o base de datos— sin decidir todavía cuál. Como mínimo debe ofrecer:

- identificadores estables de proyecto, campo y fuente;
- validación del esquema;
- historial de cambios y aprobaciones;
- permisos por rol;
- ES/EN vinculados como una sola unidad editorial;
- alertas de vencimiento;
- adjuntos privados separados de la proyección pública;
- filtros por estado y responsable;
- publicación de una proyección pública mínima;
- capacidad de migrar gradualmente los otros 30 proyectos sin duplicarlos.

Hasta esa migración, cualquier cambio debe modificar un único registro gobernado y mantener el historial mediante commits y revisión editorial.

# Fase 3B — Plantilla canónica unificada de proyectos

**Estado:** propuesta de diseño y arquitectura para revisión.  
**Base pública de referencia:** ficha legacy vigente al cierre de Fase 2.  
**Ejemplo de trabajo:** The William Residences.  
**Alcance de este documento:** definición funcional, editorial y de rollout. No implementa componentes, no modifica contenido público y no autoriza un deployment.

## Addendum operativo aprobado para Fase 3B.1

La continuidad funcional de la ficha publicada es el criterio principal. La gobernanza no exige certeza absoluta, validación jurídica ni documentación contractual definitiva para conservar información comercial razonable. Un dato puede mostrarse como estimado o sujeto a cambio cuando exista una base documental o comercial confiable, aunque esa fuente no sea pública online.

Antes de degradar, ocultar o reemplazar un valor existente se deben revisar los materiales operativos más recientes disponibles para el proyecto —price sheets, inventarios, factsheets, brochures, buyer deposit schedules, presentaciones, planos y comunicaciones entregadas por Esteban— y priorizar los emitidos por el developer, equipo de ventas o canal autorizado con fecha, versión o contexto más claro.

Un valor sólo pasa a una consulta cuando existe una contradicción material no resuelta, es evidentemente obsoleto con riesgo real de engaño, se comprobó que es falso, no tiene ninguna base razonable o fue inventado/inferido incorrectamente. La incertidumbre normal del mercado se comunica mediante el disclaimer coordinado de la ficha y el footer; no mediante etiquetas de auditoría, fechas ni advertencias repetidas por campo.

Este addendum prevalece sobre cualquier formulación más restrictiva de la propuesta inicial. Ninguna función o contenido actualmente visible se retira durante el prototipo sin registrar la pérdida en la matriz y solicitar aprobación.

El inventario de migración de Fase 3B.1 se materializa en `docs/phase-3b-project-migration-matrix.tsv`. Se genera desde el `ALL_PROJECTS` efectivo mediante `npm run phase3b:matrix` y se verifica sin reescribir mediante `npm run phase3b:matrix:check`; así, los 36 slugs y las 16 funciones no dependen de una segunda lista mantenida a mano. La matriz es un artefacto de diagnóstico y deberá regenerarse cuando cambie el catálogo legacy.

## Resumen de la decisión

La ficha canónica debe evolucionar la ficha legacy, no sustituirla por una página de auditoría. Debe conservar su utilidad comercial, su estructura reconocible y sus canales de conversación, incorporando la gobernanza como una capa interna que decide cómo presentar cada dato.

La próxima implementación deberá cumplir cuatro reglas no negociables:

1. una sola plantilla pública para los 36 proyectos;
2. todas las URLs actuales y la paridad ES/EN se preservan;
3. un dato dudoso se califica o se reemplaza por una acción útil, pero no elimina la función de la ficha;
4. fuentes, contradicciones, responsables, rutas internas y notas de auditoría nunca se convierten en el contenido dominante ni llegan al cliente.

`PriorityProjectPage` no se reutilizará como estructura pública. Sí se conservarán y generalizarán el registro de fuentes, las contradicciones, los estados editoriales tipados, la vigencia y la proyección segura creados en Fase 3A.

Cuando se autorice la implementación, conviene abrir una rama limpia desde `main` y trasladar selectivamente la gobernanza interna necesaria. No debe integrarse en bloque la rama cerrada de Fase 3A porque contiene la bifurcación pública expresamente descartada.

## 1. Contrato funcional de la plantilla

La plantilla canónica debe responder las mismas preguntas que hoy intenta responder la ficha legacy, con mejor jerarquía y prudencia editorial.

| Función | Regla canónica | ¿Puede desaparecer? |
|---|---|---|
| Nombre, ubicación e imagen principal | Identifican el proyecto en el primer recorrido visual. | No. Requieren contenido o un fallback aprobado antes de publicar. |
| Precio e inventario | Muestran un valor vigente o invitan a consultar el valor vigente. | No. Si no hay valor publicable, se muestra la consulta prudente. |
| Entrega estimada | Muestra una estimación revisada o pide reconfirmarla. | No. Nunca se presenta como garantía. |
| Política de renta | Explica la regla comunicada cuando existe una base operativa razonable y la califica una sola vez; sólo pide confirmarla si falta una base o persiste una contradicción material. | No. No se inventa ni se presenta como garantía contractual. |
| Condición de amueblado/entrega | Indica qué se entrega o pide las especificaciones actuales. | No. Un booleano legacy no basta como evidencia. |
| Pisos, residencias y métricas | Resume sólo las métricas disponibles y publicables. | Se omite únicamente la métrica inexistente; no todo el resumen. |
| Galería | Permite explorar los assets autorizados del proyecto. | Sólo si no existe ninguna imagen utilizable además del hero. |
| Destacados y amenidades | Presenta atributos concretos, sin convertirlos en promesas. | Sólo los elementos realmente ausentes. |
| Tipologías | Explica el rango de unidades y da acceso a planos/disponibilidad. | No como función. Si falta el detalle, se ofrece solicitarlo. |
| Características de las unidades | Explica acabados, equipamiento e inclusiones respaldadas. | El listado puede omitirse si no existe; se conserva la solicitud de materiales. |
| Materiales y planos | Descarga una versión controlada o permite solicitarla. | No como acción. No se promete una descarga que no exista. |
| Preguntas frecuentes | Resuelve dudas específicas sin heurísticas ni respuestas inventadas. | Sólo una pregunta sin respuesta; la sección debe cubrir al menos las decisiones esenciales mediante respuestas prudentes o consulta. |
| Plan de pagos | Muestra un cronograma vigente o permite solicitarlo. | No como función. Nunca se renderiza una tarjeta vacía. |
| Ubicación y mapa | Usa dirección o coordenadas estructuradas; no adivina el pin. | La ubicación textual no. El embed se sustituye por una consulta si no hay georreferencia confiable. |
| WhatsApp, agenda, email y compartir | Ofrece conversación contextual y una acción de compartir diferenciada. | No. Todos los canales deben usar la configuración canónica del sitio. |
| Disclaimer prudente | Aclara estimaciones, cambios, reconfirmación y due diligence. | No. Debe coordinarse con el disclosure completo del footer. |

## 2. The William: original vs propuesta

La comparación separa tres cosas: el contenido que existe, el riesgo editorial detectado y el tratamiento público propuesto. “Conservar” no significa afirmar que un valor histórico siga vigente; significa no perder la pregunta, el dato interno ni la función que ese contenido cumplía.

| Área | Ficha original | Evidencia o límite actual | Propuesta Fase 3B |
|---|---|---|---|
| Identidad | **The William Residences**. | Nombre consistente con fuentes públicas revisadas. | Conservar nombre y URL sin cambios. |
| Ubicación | 2040 NE 163rd St, North Miami Beach, FL 33162. | La dirección del proyecto cuenta con respaldo público; la vigencia de la sales gallery requiere confirmación separada. | Mostrar dirección debajo del nombre. La sales gallery sólo aparece en FAQ si se reconfirma. |
| Imagen principal | Una portada existente en ImageKit. | Disponibilidad técnica confirmada; derechos de marketing todavía pendientes. | Mantener el hero publicado provisionalmente mientras no exista una restricción confirmada; registrar derechos internamente antes del rollout. |
| Precio | “Desde US$380.880”, basado en disponibilidad del 25/09/2025. | Las listas locales posteriores ya muestran otro mínimo; no hay inventario 2026. | **Consultar precio e inventario vigente.** El valor histórico permanece sólo en auditoría. |
| Entrega | 2029. | Una fuente pública respalda una entrega estimada 2029; sigue siendo una estimación. | **Entrega estimada 2029 · sujeta a confirmación.** |
| Renta | Mínimo de 90 días. | Los materiales oficiales revisados no fijan la renta; las referencias de 30 días son derivados internos de 2025 y dos correcciones explícitas del repositorio, posteriores, cambian la ficha y su FAQ a 90 días. Falta el reglamento primario. | **Alquiler mínimo de 90 días**, con una única nota de bloque: **Condiciones sujetas al reglamento del condominio y a reconfirmación.** |
| Amueblado | Sin amueblar. | El valor existe como booleano legacy, sin fuente contractual identificada. | **Consultar especificaciones y condición de entrega.** Cuando exista evidencia, mostrar la condición concreta. |
| Métricas | 26 pisos, 374 residencias y aproximadamente 3.760 m² de amenidades en dos niveles. | 374 residencias y la escala general tienen respaldo; las métricas deben tratarse como información del material del proyecto. | Conservar el bloque “Proyecto en cifras” y sus tres métricas, con una sola aclaración grupal si siguen sujetas a confirmación. |
| Galería | Cuatro imágenes adicionales. | Los assets responden técnicamente; falta cerrar derechos y alt editorial por imagen. | Conservar las cuatro imágenes y el lightbox. No sumar ni reemplazar assets por inferencia. |
| Destacados | Piscina y solárium; BBQ, bar y firepits; coworking, biblioteca y café; fitness, yoga y training outdoor; rooftop pickleball, valet y concierge; espacios pet-friendly y cargadores EV. | Los atributos deben cotejarse con el material canónico del proyecto; no prueban disponibilidad comercial. | Conservar los seis contenidos dentro de “Destacados y amenidades”, con una sola nota de alcance para el bloque. |
| Tipologías | Studios a tres dormitorios. | El rango general tiene respaldo; hay varias revisiones de planos sin una versión canónica definida. | Conservar el rango y ofrecer **Solicitar planos y disponibilidad por tipología**. |
| Características | Ventanales piso-techo y porcelanato; cocinas Italkraft/Bosch, cuarzo y grifería Hansgrohe; baños tipo spa y lavadora/secadora. | Deben cotejarse inclusiones y especificaciones contra material vigente. | Conservar los tres grupos, sin prometer marcas o inclusiones contractuales hasta reconfirmarlas; mantener **Solicitar materiales vigentes**. |
| Planos y materiales | Se solicitan por email; no existe una descarga pública real. | Hay archivos locales y revisiones diferentes, pero no una versión pública autorizada. | Mantener la función como solicitud. Sólo usar “Descargar” cuando exista archivo, versión, derechos y vigencia controlados. |
| FAQ: dirección | Dirección del proyecto y sales gallery. | La dirección del proyecto es defendible; la sales gallery puede cambiar. | Conservar la pregunta. Separar ambos datos y convertir la sales gallery en consulta si no está vigente. |
| FAQ: renta | “No se permiten” rentas cortas; mínimo 90 días. | La mejor base operativa disponible sigue siendo 90 días, aunque falta el reglamento primario. | Conservar la pregunta y responder que la información operativa disponible indica un mínimo de 90 días, sin repetir la nota prudente del bloque. |
| FAQ: precio | Studios desde aproximadamente US$380.880 con fecha 25/09/2025. | Precio e inventario vencidos. | Conservar la pregunta y responder **Consultar precio e inventario vigente con Esteban**. |
| Plan de pagos | 10% reserva, 10% contrato, 10% inicio, 10% top-off y 60% cierre. | El buyer deposit encontrado indica 5%/15%/10%/10%/60%; hay contradicción. | Mantener el bloque y mostrar **Solicitar plan de pagos vigente** hasta resolverla. El cronograma histórico queda interno. |
| Conversión | Agenda, WhatsApp, email y compartir después del hero, y el mismo grupo completo otra vez antes del plan. | Todas las acciones son útiles; la repetición completa alarga la ficha y confunde “consultar” con “compartir”. | Mantener el grupo completo después del hero y un cierre compacto al final. Diferenciar WhatsApp de consulta de la acción compartir. |
| Mapa | Embed de Google construido a partir de `city` o `name + city`. | `city` mezcla dirección y ciudad; ningún proyecto tiene coordenadas estructuradas. | Conservar el bloque, pero alimentarlo con dirección o coordenadas controladas. No mostrar un pin inferido. |
| Disclaimer | El plan tiene una nota específica y el footer contiene resumen más disclosure completo. | No existe un criterio de alcance único dentro de la ficha. | Agregar una nota breve contextual al final y conservar el disclosure completo del footer, sin sustituirlo ni duplicarlo de forma contradictoria. |

### Resultado público esperado para The William

El primer recorrido debe permitir entender lo siguiente sin ver estados técnicos, fuentes o tarjetas de auditoría:

- **The William Residences** — 2040 NE 163rd St, North Miami Beach;
- **Precio:** consultar precio e inventario vigente;
- **Entrega:** estimada 2029, sujeta a confirmación;
- **Renta:** alquiler mínimo de 90 días, sujeto al reglamento del condominio y a reconfirmación;
- **Condición de entrega:** consultar especificaciones y amueblado;
- **Proyecto en cifras:** 26 pisos, 374 residencias y aproximadamente 3.760 m² de amenidades, con una única nota de alcance si corresponde;
- cuatro imágenes de galería;
- seis destacados y amenidades;
- studios a tres dormitorios, con solicitud de planos y disponibilidad;
- tres grupos de características, con solicitud de materiales;
- plan de pagos disponible por solicitud hasta contar con versión vigente;
- FAQ sobre dirección, renta y precio con respuestas prudentes;
- ubicación, mapa confiable, WhatsApp, agenda, email y compartir;
- disclaimer breve de página y disclosure completo del footer.

## 3. Arquitectura canónica de contenido

La plantilla no necesita parecer más nueva; necesita ordenar mejor lo que ya hace. Se propone esta secuencia común:

1. **Breadcrumb.** Retorno al catálogo y contexto de navegación.
2. **Identidad y hero.** Nombre, ubicación, imagen principal y resumen breve, cuando exista.
3. **Resumen de decisión.** Precio/inventario, entrega, renta y condición de entrega; siempre visibles y nunca dentro de acordeones.
4. **Conversación principal.** WhatsApp contextual como acción primaria; agenda, email y compartir como acciones complementarias.
5. **Proyecto en cifras.** Pisos, residencias, superficie y otras métricas realmente disponibles.
6. **Galería.** Grilla en desktop, recorrido horizontal en mobile y lightbox accesible.
7. **Destacados y amenidades.** Información del proyecto agrupada sin duplicarla como “¿Por qué este proyecto?”.
8. **Tipologías y planos.** Rango de unidades, superficies cuando estén respaldadas, solicitud de planos y disponibilidad.
9. **Características y materiales.** Terminaciones, equipamiento, inclusiones y acceso a material vigente.
10. **Plan de pagos.** Pasos vigentes o solicitud del plan actual, nunca un contenedor vacío.
11. **Preguntas frecuentes.** Orden editorial explícito; no se reordenan ni intervienen respuestas mediante palabras clave.
12. **Ubicación y mapa.** Dirección estructurada, mapa confiable y contexto del área sin claims inventados.
13. **Cierre de asesoramiento.** WhatsApp y agenda visibles; email y compartir siguen disponibles sin repetir todo el hero.
14. **Disclaimer.** Nota breve contextual seguida por el footer y su disclosure completo.

Las fuentes públicas pueden respaldar el trabajo editorial, pero no forman un bloque dominante de la ficha. Si en el futuro se decide mostrar procedencia, debe ser un enlace secundario y acotado, nunca una sucesión de tarjetas por campo.

## 4. Wireframe desktop

Referencia funcional: 1440 × 900. No define estilo final ni introduce una identidad nueva.

```text
┌─────────────────────────────────────────────────────────────────────┐
│ Header existente                                                    │
├─────────────────────────────────────────────────────────────────────┤
│ Proyectos / The William                                             │
│                                                                     │
│ ┌──────────────────────────────┐  ┌───────────────────────────────┐ │
│ │ THE WILLIAM RESIDENCES       │  │                               │ │
│ │ Dirección                    │  │      IMAGEN PRINCIPAL         │ │
│ │ Resumen breve, si existe     │  │                               │ │
│ │                              │  │                               │ │
│ │ Precio / consulta vigente    │  └───────────────────────────────┘ │
│ │ Entrega estimada             │                                    │
│ │ Política de renta            │                                    │
│ │ Condición de entrega         │                                    │
│ │                              │                                    │
│ │ [WhatsApp] [Agenda]          │                                    │
│ │ [Email] [Compartir]          │                                    │
│ └──────────────────────────────┘                                    │
├─────────────────────────────────────────────────────────────────────┤
│ PROYECTO EN CIFRAS                                                   │
│ [Pisos]             [Residencias]         [Superficie/amenidades]   │
├─────────────────────────────────────────────────────────────────────┤
│ GALERÍA: grilla + abrir lightbox                                    │
├───────────────────────────────────┬─────────────────────────────────┤
│ DESTACADOS Y AMENIDADES           │ TIPOLOGÍAS Y PLANOS             │
│ Lista completa                    │ Rango de unidades               │
│                                   │ [Solicitar planos]              │
│                                   │ [Consultar disponibilidad]      │
├───────────────────────────────────┴─────────────────────────────────┤
│ CARACTERÍSTICAS DE LAS UNIDADES + [Solicitar materiales vigentes]  │
├─────────────────────────────────────────────────────────────────────┤
│ PLAN DE PAGOS: pasos vigentes o [Solicitar plan vigente]            │
├─────────────────────────────────────────────────────────────────────┤
│ PREGUNTAS FRECUENTES: details/summary                               │
├───────────────────────────────────┬─────────────────────────────────┤
│ UBICACIÓN Y CONTEXTO              │ MAPA CON DIRECCIÓN CONTROLADA   │
├───────────────────────────────────┴─────────────────────────────────┤
│ ¿Querés comparar este proyecto? [WhatsApp] [Agenda]                 │
│ Disclaimer breve                                                    │
├─────────────────────────────────────────────────────────────────────┤
│ Footer existente + disclosure completo                             │
└─────────────────────────────────────────────────────────────────────┘
```

### Prioridades desktop

- Nombre, ubicación, hero, cuatro datos de decisión y WhatsApp deben quedar dentro del primer recorrido visual.
- El grupo completo de acciones aparece una vez; el cierre repite sólo la conversión necesaria.
- Destacados y tipologías pueden compartir fila cuando la longitud lo permita, sin truncar contenido.
- No hay tarjetas de estado por dato ni una columna de auditoría.
- La identidad aprobada —navy, marfil, dorado discreto, tipografía y radios— se conserva y refina.

## 5. Wireframe mobile

Referencia funcional: 390 × 844.

```text
┌───────────────────────────────┐
│ Header existente             │
├───────────────────────────────┤
│ Proyectos / The William      │
│ THE WILLIAM RESIDENCES       │
│ Dirección                    │
│                               │
│ IMAGEN PRINCIPAL             │
│                               │
├───────────────────────────────┤
│ Precio / consulta vigente    │
│ Entrega estimada             │
│ Política de renta            │
│ Condición de entrega         │
├───────────────────────────────┤
│ [WhatsApp — ancho completo]  │
│ [Agenda]                     │
│ [Email]       [Compartir]    │
├───────────────────────────────┤
│ Proyecto en cifras · 2 × 2   │
├───────────────────────────────┤
│ Galería horizontal           │
├───────────────────────────────┤
│ Destacados y amenidades      │
├───────────────────────────────┤
│ Tipologías y planos          │
│ [Solicitar planos]           │
├───────────────────────────────┤
│ Características/materiales   │
├───────────────────────────────┤
│ Plan de pagos / solicitar    │
├───────────────────────────────┤
│ FAQ expandible               │
├───────────────────────────────┤
│ Ubicación + mapa             │
├───────────────────────────────┤
│ CTA final + disclaimer       │
├───────────────────────────────┤
│ Footer + disclosure          │
└───────────────────────────────┘
```

### Prioridades mobile

- Los cuatro datos de decisión no usan carrusel, acordeón ni truncamiento.
- WhatsApp debe estar disponible dentro de las primeras 1–1,5 pantallas.
- Cada objetivo táctil debe medir al menos 44 × 44 px y conservar foco visible.
- No se incorpora una barra sticky que tape contenido sin aprobación específica.
- La galería puede desplazarse horizontalmente; la página completa no.
- Los acordeones se reservan para FAQ o contenido largo, no para esconder información comercial esencial.
- La longitud depende del contenido real del proyecto, no de fechas, fuentes o avisos repetidos.

## 6. Estrategia de estados y presentación pública

La gobernanza mantiene internamente los estados `reviewed`, `reconfirmation_required`, `unverified` e `inactive`. La interfaz los traduce a tres tratamientos simples; no muestra los nombres técnicos.

| Tratamiento | Condición interna | Presentación pública |
|---|---|---|
| Revisado y vigente | Fuente adecuada, fecha, responsable, aprobación editorial, contradicciones resueltas y vigencia definida. | Se muestra el valor. Si la fecha aporta contexto, aparece una sola vez en el resumen comercial o disclaimer, no en cada dato. |
| Sujeto a reconfirmación | El dato tiene una referencia razonable pero está vencido, incompleto o necesita confirmación para el caso concreto. | Se muestra con una aclaración breve sólo cuando sigue siendo útil y no hay contradicción material. Los campos muy volátiles usan una consulta en lugar del valor histórico. |
| Sin dato publicable | El dato falta, las fuentes se contradicen o no existe evidencia suficiente. | El valor legacy no se publica como vigente. Los campos esenciales mantienen una consulta útil; los elementos opcionales realmente ausentes se omiten. |

### Matriz de tratamiento por campo

| Campo | Revisado y vigente | Sujeto a reconfirmación | Sin dato publicable |
|---|---|---|---|
| Precio/inventario | Valor, moneda, alcance y vigencia. | **Consultar precio e inventario vigente.** | La misma consulta; nunca “0” ni un precio antiguo. |
| Entrega | “Entrega estimada 2029”. | “Entrega estimada 2029 · sujeta a confirmación” sólo si existe una referencia única y razonable. | “Consultar entrega estimada”. |
| Renta | Regla concreta, alcance y excepciones. | Mantener la regla comunicada cuando tenga base operativa razonable y agregar una sola calificación por bloque; para The William: **Alquiler mínimo de 90 días**. | **Consultar política de renta aplicable** sólo ante ausencia real, falsedad, obsolescencia grave o contradicción no resuelta después de revisar materiales. |
| Amueblado/entrega | Condición e inclusiones concretas. | “Consultar especificaciones y condición de entrega”. | La misma consulta. |
| Pisos/residencias/métricas | Valores concretos. | Valores no contradictorios con una única nota grupal “Según materiales actuales; sujeto a confirmación”. | Omitir sólo la métrica ausente. |
| Galería | Mostrar assets autorizados. | Mantener sólo assets cuyo uso provisional esté aprobado; no inventar reemplazos. | Omitir galería si no hay imágenes utilizables; el hero requiere un fallback aprobado. |
| Destacados/amenidades | Mostrar contenido revisado. | Mantener atributos respaldados y calificarlos una vez por bloque. | Omitir sólo el elemento sin contenido. |
| Tipologías | Rango, superficies y planos controlados. | Rango general más “Solicitar planos vigentes”. | “Solicitar tipologías y planos vigentes”. |
| Materiales/planos | Descargar versión identificada y autorizada. | “Solicitar materiales vigentes”. | La misma solicitud. |
| Plan de pagos | Pasos y vigencia. | **Solicitar plan de pagos vigente.** | La misma solicitud. |
| FAQ | Respuesta concreta bajo las mismas reglas del campo. | Respuesta prudente más una acción contextual. | Mantener la pregunta sólo si puede responderse sin inventar; de lo contrario reemplazarla por una consulta esencial aprobada. |
| Ubicación/mapa | Dirección y coordenadas estructuradas. | Mostrar la ubicación confiable; no adivinar el pin. | Mantener el bloque de ubicación y ofrecer confirmación; no renderizar un mapa incorrecto. |

Reglas transversales:

- `unverified` no significa “borrar”: el valor legacy se conserva internamente para investigación, pero no se afirma como vigente;
- antes de degradar un valor se revisan los materiales operativos disponibles, incluido Dropbox cuando esté sincronizado; la falta de acceso se registra como pendiente y no convierte por sí sola el valor en consulta;
- no se exige certeza contractual absoluta para conservar información comercial razonablemente respaldada;
- una contradicción nunca se resuelve eligiendo silenciosamente una versión;
- no se usa “información validada” como promesa genérica;
- no se repiten fechas de revisión por tarjeta;
- las fuentes y notas privadas no llegan al HTML, payload de Server Components ni JavaScript cliente;
- `inactive` requiere una política editorial aparte para conservar, archivar o retirar promoción; no se deduce por falta de información.

## 7. Componentes legacy reutilizables

| Componente o patrón | Decisión | Refinamiento requerido |
|---|---|---|
| `GalleryLightbox` | Reutilizar. | Conservar localización ES/EN, Escape, flechas, focus trap, scroll lock y retorno de foco. Definir con claridad el acceso a galerías de más de 12 imágenes y alt editorial por asset. |
| `HighlightsBlock` | Reutilizar su lenguaje visual. | Recibir contenido ya proyectado; generar IDs únicos y evitar `aria-labelledby` si no existe título. |
| `FaqsBlock` | Reutilizar `<details>/<summary>`. | El orden, el estado inicial y los CTAs deben venir del contenido, no de coincidencias de palabras ES/EN. |
| `PaymentPlan` | Reutilizar la presentación de pasos. | Incorporar modos explícitos `steps` y `request-current-plan`; no renderizar un bloque vacío. |
| `ShareButtons` | Reutilizar con ajustes. | Diferenciar consulta por WhatsApp de compartir por WhatsApp y ofrecer fallback cuando Web Share no esté disponible. |
| `SpecsBlock` | Reutilizar parcialmente para tipologías/características. | Preferir iconos explícitos y semántica estructurada; no depender de regex sobre copy comercial. |
| Breadcrumb, hero y mapa lazy | Conservar como patrones. | Extraerlos a la plantilla común; usar metadata localizada, ubicación estructurada, altura estable, estado de carga/fallo y enlace externo permanente. |
| Grupo de CTAs | Conservar WhatsApp, agenda, email y compartir en el recorrido completo. | Centralizar email, teléfono, WhatsApp y agenda en la configuración del sitio; el cierre puede priorizar WhatsApp y agenda si email y compartir siguen accesibles arriba y en el footer. |
| Envolvente navy/dorado | Conservar y refinar. | Extraer una sección común para reducir repetición sin cambiar la identidad. |
| `PriorityProjectPage` | No reutilizar públicamente. | Su presentación de auditoría queda descartada. |
| Tipos, fuentes, contradicciones y vigencia de Fase 3A | Conservar internamente. | Generalizar nombres `Priority...`, cubrir los 36 proyectos y proyectar un view model inmobiliario completo por lista blanca. |

## 8. Problemas reales que Fase 3B corrige

La propuesta no busca “modernizar” por preferencia estética. Corrige problemas observables:

1. **Dos generaciones públicas.** La ruta actual de la rama de Fase 3A bifurca seis slugs hacia `PriorityProjectPage`; Fase 3B elimina toda condición pública por proyecto.
2. **Certeza indebida.** Precio, entrega, renta y amueblado se renderizan como valores planos aunque carezcan de vigencia.
3. **Pérdida de contenido.** La dirección descartada retiró funciones esenciales; la plantilla canónica recupera el contrato completo.
4. **Duplicación.** Los mismos microclaims aparecen como chips y como “¿Por qué este proyecto?”, y el grupo completo de CTAs aparece dos veces.
5. **FAQ frágil.** La ruta reordena y altera respuestas mediante palabras clave; una pregunta puede recibir un CTA no relacionado.
6. **Planes vacíos o vencidos.** `PaymentPlan` puede renderizar un contenedor vacío y no distingue pasos vigentes de una solicitud.
7. **Mapa inferido.** `city` mezcla ciudad, barrio y dirección; ningún proyecto tiene hoy coordenadas estructuradas.
8. **Paridad silenciosa.** Arrays ES/EN paralelos pueden eliminar un bloque cuando falta una traducción; la paridad debe ser un gate.
9. **Configuración duplicada.** Contacto y agenda están hardcodeados en la ficha en lugar de usar la configuración canónica del sitio.
10. **Confusión de acciones.** WhatsApp de consulta y WhatsApp de compartir no tienen suficiente diferenciación.
11. **Promesa de archivos.** “Solicitar PDF” es una acción por email, no una descarga; la etiqueta debe describir la acción real.
12. **Riesgo de exposición interna.** La gobernanza completa no debe serializarse ni enviarse al navegador.

## 9. Diagnóstico de cobertura de los 36 proyectos

La presencia técnica se midió sobre `ALL_PROJECTS` después de su combinación con el catálogo base. No equivale a revisión editorial, vigencia ni derechos de uso.

| Contenido legacy | Cobertura técnica | Excepción conocida |
|---|---:|---|
| Nombre, ubicación textual, precio, portada, galería, métricas/microclaims, destacados y tipologías | 36/36 | Todos los precios siguen sin gobernanza completa. |
| Entrega | 35/36 | Falta Ambar Orlando. |
| Renta ES/EN | 31/36 | Faltan Ave Maria, Faena, Flow House, One Park Tower y 2200 Brickell. |
| Condición de amueblado | 29/36 | Falta en siete proyectos. |
| Financiación | 14/36 | Campo especialmente incompleto y variable. |
| Características ES/EN | 35/36 | Falta Viceroy Brickell Residences. |
| Plan de pagos ES/EN | 35/36 | One Park Tower tiene el bloque vacío. |
| FAQ ES/EN | 35/36 | 26 & 2nd no tiene FAQ. |
| HOA | 0/36 | No debe mostrarse ni compararse hasta contar con fuente. |
| Coordenadas | 0/36 | Los mapas actuales dependen de texto no estructurado. |

Riesgos de migración adicionales:

- `upsertMany(BASE_ALL, INCOMING)` puede heredar silenciosamente valores de una capa base aunque el módulo individual no los declare;
- renta se distribuye entre varios campos y el catálogo general la clasifica mediante texto;
- 36 precios y 36 galerías presentes no significan precio vigente ni derechos aprobados;
- Mercedes-Benz Places está expresamente oculto y One Hollywood tiene un archivo no importado: la migración debe preservar la regla de visibilidad y no incorporarlos accidentalmente;
- el catálogo cliente no debe recibir objetos completos con gobernanza: la auditoría midió aproximadamente 152,6 KB de objetos completos frente a 36,1 KB para la vista resumida actual.

## 10. Arquitectura de datos futura

La transición no debe crear una segunda lista manual de 36 proyectos.

### Capas propuestas

1. **Fuente canónica de proyecto.** Identidad, slug, visibilidad, contenido ES/EN, medios, ubicación, tipologías y material disponible.
2. **Gobernanza interna por campo.** Estado, fuente, fecha, responsable, aprobación, vigencia, contradicciones y notas privadas.
3. **Adaptador de transición.** Lee el `Project` legacy y superpone gobernanza por slug/campo sin copiar nuevamente identidad, URLs o arrays.
4. **`CanonicalProjectViewModel` server-only.** Proyección por lista blanca con los 16 contratos funcionales y los tratamientos públicos definidos en este documento.
5. **Plantilla canónica única.** Renderiza el mismo árbol de componentes para los 36 slugs. No conoce fuentes privadas ni distingue proyectos prioritarios.
6. **Vista liviana de catálogo.** Se deriva de la misma fuente canónica, pero contiene sólo los campos necesarios para tarjetas y filtros.

El Markdown y el registro TypeScript siguen siendo una base de modelo, no la herramienta operativa definitiva. En una fase posterior, la fuente debe migrar a una herramienta estructurada editable —spreadsheet, CMS o base de datos— sin decidir todavía cuál. Esa herramienta deberá mantener historial, permisos, ES/EN vinculados, adjuntos privados, aprobaciones y alertas de vigencia.

### Fuente de slugs

`PUBLIC_PROJECT_SLUGS` debe seguir siendo un artefacto generado desde la fuente canónica. Nunca se mantiene a mano una segunda lista. La migración debe comprobar 36 IDs únicos, 36 slugs únicos y la exclusión de proyectos ocultos antes de construir.

## 11. Plan de migración de los 36 proyectos

No se implementa en esta etapa. El plan futuro es deliberadamente atómico:

1. **Aprobar el contrato.** Cerrar bloques, reglas de ausencia, copy prudente, disclaimer y decisiones pendientes de este documento.
2. **Crear una rama limpia desde `main`.** Reutilizar selectivamente la gobernanza interna de Fase 3A; no integrar `PriorityProjectPage` ni la bifurcación por seis slugs.
3. **Definir esquema y adaptador únicos.** Transformar los 36 objetos existentes sin duplicar slugs, identidad o contenido.
4. **Generar inventario automáticamente.** Producir para cada slug una matriz de presencia, estado, fuente y paridad ES/EN; preservar la visibilidad pública actual.
5. **Prototipar The William fuera de producción.** Usar el contenido completo de esta comparación y comprobar los tres estados de presentación.
6. **Probar casos límite.** Incluir al menos Ambar (sin entrega), One Park Tower (sin plan), 26 & 2nd (sin FAQ), Viceroy (sin características), un proyecto sin renta y uno con contradicciones.
7. **Migrar contenido y estados para 36.** Cada valor legacy se conserva internamente; su proyección pública queda revisada, sujeta a reconfirmación o sustituida por consulta.
8. **Construir 72 rutas en Preview.** Las 36 fichas ES y EN usan la misma plantilla; no existe allowlist de prioridad ni fallback público por slug.
9. **Pasar gates automáticos y editoriales.** Paridad, bloques, URLs, assets, datos privados, accesibilidad, performance, metadata, CTAs y visual regression.
10. **Cambiar todas las fichas en un solo commit/deployment.** No activar por proyecto, porcentaje o grupo.
11. **QA de producción.** Verificar las 72 rutas, Home, catálogo, enlaces, analytics existentes, sitemap vigente y ausencia de errores.
12. **Rollback total si falla un gate.** Revertir el deployment completo; nunca dejar algunos slugs en legacy y otros en la plantilla nueva.

### Gates de activación

- 36/36 slugs públicos únicos y 72/72 rutas ES/EN HTTP 200;
- un único componente público canónico;
- 16 funciones preservadas, calificadas o justificadamente ausentes por proyecto;
- cero valores sensibles no revisados presentados como vigentes;
- cero fuentes privadas, rutas locales, responsables o contradicciones en HTML, RSC o JavaScript;
- paridad estructural y de significado ES/EN;
- cero assets rotos y control interno de derechos por imagen;
- contacto, agenda, WhatsApp, email y compartir funcionales sin realizar acciones reales durante QA;
- teclado, foco, lightbox, contraste y targets táctiles aprobados;
- mapas basados en ubicación controlada;
- metadata, canonicals, hreflang y URLs preservados;
- comparación automatizada que demuestre qué ocurrió con cada bloque legacy;
- rollback del deployment probado antes del cambio.

## 12. Información que nunca debe desaparecer

La migración debe registrar explícitamente el destino de cada una de estas funciones para cada proyecto:

1. nombre, ubicación e imagen principal;
2. precio o consulta de precio e inventario vigente;
3. entrega estimada o consulta;
4. política de renta o consulta;
5. condición de amueblado/entrega o consulta;
6. pisos, residencias y métricas disponibles;
7. galería cuando existan assets utilizables;
8. destacados y amenidades existentes;
9. tipologías y acceso a planos;
10. características de las unidades y acceso a materiales;
11. materiales y planos como descarga controlada o solicitud;
12. preguntas frecuentes con respuestas prudentes;
13. plan de pagos vigente o solicitud;
14. ubicación y mapa confiable;
15. WhatsApp, agenda, email y compartir;
16. disclaimer prudente y disclosure completo del footer.

“Existe en legacy pero no está revisado” no es una justificación para borrar. Ese contenido se conserva internamente y se presenta con una calificación breve o una acción útil. Sólo se omite un elemento opcional cuando realmente no existe contenido y la ausencia queda registrada en la matriz de migración.

## 13. Decisiones pendientes antes de implementar

1. Aprobar el disclaimer breve específico de ficha y su relación con el disclosure completo del footer.
2. Definir plazos de vigencia por tipo de dato: precio, inventario, renta, entrega, financiación y pagos.
3. Obtener para los 36 proyectos las fuentes, fechas y responsables mínimos que permitan asignar estados.
4. Resolver derechos de hero y galería o aprobar fallbacks por proyecto.
5. Normalizar dirección y coordenadas antes de conservar mapas.
6. Definir la versión canónica y los derechos de distribución de planos, brochures y materiales.
7. Confirmar que email, WhatsApp, teléfono y agenda se consuman desde una única configuración.
8. Aprobar el tratamiento de proyectos declarados inactivos: conservar URL, archivar, `noindex`, redirigir o retirar promoción.
9. Definir cuándo una ficha vuelve a ser elegible para sitemap; el catálogo y el sitemap general siguen fuera de este alcance.
10. Elegir más adelante la herramienta operativa estructurada sin bloquear el modelo canónico.

## Apéndice — 36 slugs públicos que deben migrar juntos

La lista siguiente reproduce el manifiesto generado actual sólo como control documental; la implementación debe leer el artefacto generado, no copiar esta lista a código:

1. `2200-brickell`
2. `26-and-2nd`
3. `72-park`
4. `7200-collins`
5. `ambar-orlando`
6. `ave-maria`
7. `baccarat`
8. `cassia`
9. `cipriani`
10. `domus-brickell-center`
11. `domus-brickell-park`
12. `edge-house`
13. `ella-miami`
14. `elle-residences`
15. `faena`
16. `flow-house`
17. `frida-kahlo`
18. `gaia-residences`
19. `jean-georges-tropic`
20. `midtown-park`
21. `millenia-park`
22. `millux-place-brickell`
23. `nexo`
24. `nickelodeon-orlando`
25. `nomad`
26. `oasis-hallandale`
27. `okan-tower`
28. `one-park-tower`
29. `palma-miami-beach`
30. `parkside-brickell`
31. `seven-park`
32. `the-lauderdale`
33. `the-rider-wynwood`
34. `the-standard-brickell`
35. `the-william`
36. `viceroy-brickell-residences`

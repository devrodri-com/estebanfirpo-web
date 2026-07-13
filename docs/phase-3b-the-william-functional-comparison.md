# Fase 3B.1 — Comparación funcional de The William

**Estado:** baseline y contrato funcional para revisión del Product Owner.

**Alcance:** comparación documental entre la ficha publicada y el prototipo aislado propuesto.

**No autoriza:** sustituir las rutas públicas, migrar los otros 35 proyectos, publicar datos comerciales nuevos ni desplegar a producción.

## Resumen ejecutivo

La ficha publicada de The William es el baseline funcional y visual. El prototipo debe reorganizarla sin perder ninguna de sus funciones esenciales: identidad, información comercial, galería, amenidades, tipologías, características, solicitudes de materiales, FAQ, plan, mapa, contacto y disclosures.

Los cambios propuestos se limitan a cuatro tipos:

1. **preservar** contenido respaldado de forma razonable;
2. **calificar** datos estimados sin convertir cada campo en una advertencia;
3. **convertir en consulta útil** valores con una contradicción material no resuelta;
4. **consolidar duplicaciones** sin retirar la función ni el canal de conversión.

No se incorporan tarjetas de auditoría, estados técnicos visibles, fuentes dominantes, rutas privadas ni fechas de revisión repetidas. La gobernanza permanece interna.

## 1. Evidencia y límites

### 1.1 PDFs comparativos proporcionados

Los dos PDFs se mantienen fuera del repositorio. Se registran por nombre, metadata y hash para poder reconocerlos sin copiar binarios al proyecto.

| Evidencia | Alcance identificado | Metadata | SHA-256 |
|---|---|---|---|
| `The William Residences — 2040 NE 163rd St, North Miami Beach, FL 33162 _ Esteban Firpo.pdf` | Impresión de la ficha de producción ES. Conserva el baseline comercial y funcional. | 5 páginas; creado 13/07/2026 11:30:32 EDT; Chrome 149 / Skia PDF m149. Sus enlaces internos apuntan a `www.estebanfirpo.com`. | `741730ea19381b3ae58caec3423ad7ee51443797dc76c07a6024d798f4abe1d5` |
| `The William Residences — 2040 NE 163rd St, North Miami Beach, FL 33162 _ Esteban Firpo1.pdf` | Impresión del prototipo de Fase 3A descartado. Demuestra la pérdida de información comercial y el predominio de auditoría. | 7 páginas; creado 13/07/2026 11:30:44 EDT; Chrome 150 / Skia PDF m150. Sus enlaces internos apuntan a `localhost:3000`. | `6cc706c65c13719d40c65d0d2eff1cda34568c8b9dc5c915cafb3131a8949332` |

### 1.2 Capturas externas de referencia

Las capturas no se copian al repositorio. El handoff debe conservar, fuera de Git, estas referencias descriptivas:

- **TW-BL-ES-D:** producción ES, desktop 1440 × 900;
- **TW-BL-ES-M:** producción ES, mobile 390 × 844;
- **TW-BL-EN-D:** producción EN, desktop 1440 × 900;
- **TW-BL-EN-M:** producción EN, mobile 390 × 844;
- **TW-P3A-ES-D:** prototipo descartado de Fase 3A, desktop;
- **TW-P3A-ES-M:** prototipo descartado de Fase 3A, mobile;
- **TW-PREVIEW-ES-D/M:** futuro prototipo aislado de Fase 3B.1;
- **TW-PREVIEW-EN-D/M:** futuro prototipo aislado de Fase 3B.1.

Las capturas baseline deben registrar la página completa, no sólo el primer viewport: hero, dos filas de CTAs, galería, destacados, tipologías, características, FAQ, plan, mapa y footer.

### 1.3 Materiales locales consultados

Se reintentó localizar Dropbox en `~/Dropbox`, `~/Library/CloudStorage`, el contenedor iCloud de Dropbox y volúmenes montados. No existe una raíz sincronizada utilizable en este equipo: el único contenedor encontrado está vacío y no hay aplicación o proceso de Dropbox activo. La falta de acceso queda como pendiente operativo y no se usa para descartar ni degradar contenido por sí sola.

Se encontraron copias locales, fuera del repositorio, de los siguientes materiales. La procedencia operativa debe ser confirmada por Esteban antes de tratarlos como fuente canónica:

| Material local | Fecha o versión visible | Uso razonable en este prototipo | Límite |
|---|---|---|---|
| Factsheet en español sin marca | Creado 12/09/2025 | Identidad, dirección, 26 pisos, 374 residencias, aproximadamente 3.760 m², tipologías, amenidades y características. | No acredita inventario, precio, renta ni inclusión contractual actual. |
| Factsheet en inglés `R11` | Creado 11/09/2025 | Paridad EN y cifra de aproximadamente 40.459 ft² de amenidades. | Mismos límites que el factsheet ES. |
| Amenity floor plans | Creado 03/11/2025 | Programa de amenidades de los pisos 9 y 26. | Los planos y amenities pueden cambiar; derechos de reproducción pendientes. |
| Floor plans sin número de revisión | Creado 08/10/2025; 21 páginas | Rango de estudios a tres dormitorios. | Existen además `R2` y `R7`; la versión canónica no está confirmada. |
| Floor plans `R7` | Creado 24/09/2025; 28 páginas | Control de versiones y contradicciones. | No debe publicarse como descarga sin aprobación. |
| Floor plans `R2` | Creado 16/09/2025; 38 páginas | Control de versiones y contradicciones. | Revisión anterior. |
| Buyer deposit | Creado 26/09/2025 | Detectar que el plan legacy no coincide con este documento. | Sigue siendo histórico; requiere versión vigente. |
| Availability 25/09/2025 | Fechada 25/09/2025 | Explica el precio legacy de US$380.880. | No representa inventario actual. |
| Availability 28/10/2025 | Fechada 28/10/2025 | Segunda referencia histórica de US$380.880. | No representa inventario actual. |
| Availability 19/11/2025 | Fechada 19/11/2025 | Copia local más reciente; mínimo visible de US$395.149. | Tampoco representa inventario 2026. |
| Nota local `Datos The William.txt` | Modificada 16/11/2025 | Registrar la referencia histórica de renta de 30 días. | Nota interna dentro de una carpeta de trabajo; no identifica emisor ni fuente primaria. |
| Impresión de la ficha legacy y dos presentaciones derivadas | Creadas 08/10/2025 | Registrar las referencias históricas de renta de 30 días. | Son exportaciones o PDFs generados sin emisor primario identificado; no superan una corrección operativa posterior. |
| Historial Git de la ficha | Commits del 31/01 y 01/02/2026 | El commit `18d9f66` corrige expresamente 30 a 90 días y `db281f7` alinea también la FAQ y elimina el copy mensual contradictorio. | Es una decisión operativa trazable, no el reglamento del condominio. |

Los factsheets y planos incluyen reservas de copyright del developer y prohíben reproducción no autorizada. Por eso el prototipo conserva los assets ya publicados, pero no incorpora páginas de PDFs, logos, planos ni imágenes nuevas.

### 1.4 Decisión operativa sobre la renta

Los factsheets oficiales, el buyer deposit, los planos, el amenity plan y las availability sheets revisadas —incluida la copia `R11`, idéntica por hash al factsheet oficial vigente— no publican una política de renta. Las únicas referencias locales de 30 días son derivados internos de octubre/noviembre de 2025. La ficha y su FAQ fueron corregidas explícitamente a 90 días en enero/febrero de 2026, después de esos derivados.

Por jerarquía y fecha, la mejor información operativa disponible sigue siendo **90 días**. El tratamiento es `qualify`, no `request`: se muestra **Alquiler mínimo de 90 días** y una única nota para el bloque, **Condiciones sujetas al reglamento del condominio y a reconfirmación.** Queda pendiente contrastarlo con el reglamento/declaración o una confirmación escrita reciente del developer o equipo de ventas; hasta entonces no se clasifica como `reviewed`.

### 1.5 Diagnóstico visual de mapa, navbar e iconos

- El mapa vacío en la captura full-page era un problema de evidencia: el iframe cross-origin tenía `loading="lazy"` y quedaba fuera del viewport durante el stitching. La URL respondía HTTP 200 y resolvía la dirección correcta, pero el contenedor dependía de una altura porcentual dentro del grid y no tenía estado visible mientras cargaba.
- El prototipo usa ahora un componente de mapa reusable con dirección estructurada, altura explícita, placeholder de carga/fallo, título localizado y enlace permanente **Abrir en Google Maps / Open in Google Maps**. La query verificada es `2040 NE 163rd St, North Miami Beach, FL 33162`.
- La navbar en medio de la imagen era un artefacto de iniciar una captura full-page con scroll activo. En navegador mantiene `position: sticky`, `top: 0`, `z-index: 50` y 65 px de alto; no hay un ancestro con overflow vertical o transform que rompa el sticky. No se modifica.
- El icono `Ruler` aislado bajo la tercera métrica no tenía una función distinta y se retira. Los iconos restantes identifican secciones o acciones, usan tamaños de 20 px o 16 px según su rol y `stroke-width` 1,75 en ES/EN y desktop/mobile.

## 2. Baseline publicado completo

Las rutas públicas ES y EN respondían HTTP 200 al registrar este baseline. La estructura es la misma en ambos idiomas; cambian labels y contenidos localizados.

### 2.1 Shell global

| Elemento | Español | Inglés |
|---|---|---|
| Marca | `Esteban Firpo · Miami Real Estate` | Igual. |
| Navegación | `Proyectos`, `Cómo te ayudo`, `Preconstrucción`, `Miami`, `Sobre mí`, `EN`, `Hablar por WhatsApp` | `Projects`, `How I help`, `Pre-construction`, `Miami`, `About`, `ES`, `Talk on WhatsApp` |
| Footer: presentación | `Asesoría inmobiliaria personal para inversores internacionales que evalúan Miami y el sur de Florida.` | `Personal real estate advisory for international investors evaluating Miami and South Florida.` |
| Footer: identidad | `Esteban Firpo` y `Afiliado a Miami Life Realty` | `Esteban Firpo` y `Affiliated with Miami Life Realty` |
| Footer: explorar | Proyectos, Preconstrucción, Miami, Financiación, Sobre Esteban | Projects, Pre-construction, Miami, Financing, About Esteban |
| Footer: contacto | WhatsApp, `esteban@miamiliferealty.com`, `+1 754 267 3931`, agenda y formulario | Los mismos canales con labels en inglés. |

### 2.2 Encabezado y resumen del proyecto

| Elemento | Español | Inglés |
|---|---|---|
| Breadcrumb | `Proyectos / The William Residences` | `Projects / The William Residences` |
| Nombre | `The William Residences` | Igual. |
| Meta desktop | `Desde 380.880 US$ · Entrega 2029 · Política de renta Alquiler mínimo 90 días. · Sin amueblar` | `From $380,880 · Completion 2029 · Rental policy Minimum stay 90 days. · Unfurnished` |
| Meta mobile | `Desde 380.880 US$ · Entrega 2029` | `From $380,880 · Completion 2029` |
| Chips | `26 pisos · 374 residencias`; `Amenidades ≈3,760 m² en dos niveles`. En mobile se agregan renta y condición. | `26 stories · 374 residences`; `~40,459 sq.ft amenities across two floors`. En mobile se agregan renta y condición. |
| Hero | Asset actual del exterior del edificio. | El mismo asset. |

### 2.3 Acciones de contacto y compartir

La primera fila aparece después del hero y el grupo vuelve a repetirse antes del plan de pagos.

| Función | Español | Inglés | Destino funcional |
|---|---|---|---|
| Agenda | `Agendar Reunión` | `Schedule Meeting` | Agenda de Google configurada. |
| Consulta | `WhatsApp` | `WhatsApp` | Mensaje contextual sobre The William. |
| Email | `Email a Esteban` | `Email Esteban` | `esteban@miamiliferealty.com`. |
| Compartir por WhatsApp | `Compartir por WhatsApp` | `Share via WhatsApp` | Comparte nombre y URL localizada. |
| Compartir nativo | `Compartir` | `Share` | Se muestra cuando el navegador soporta Web Share. |

No se iniciaron mensajes, emails, shares ni reservas durante esta documentación.

### 2.4 Galería

- Un hero y cuatro imágenes adicionales ya publicadas.
- Desktop: grilla de miniaturas.
- Mobile: carrusel horizontal.
- Lightbox: abre cada imagen, permite anterior/siguiente y cierre.
- Los cinco assets responden técnicamente; los derechos editoriales todavía requieren confirmación.

### 2.5 Destacados y amenidades

| Español | Inglés |
|---|---|
| Piscina tipo resort y solárium | Resort-style pool and sun deck |
| BBQ exterior + bar con firepits | Outdoor BBQ station + bar with firepits |
| Coworking lounge, biblioteca y café | Coworking lounge, library and café |
| Gimnasio + yoga + zona outdoor training | Fitness + yoga + outdoor training zone |
| Pickleball en rooftop · valet y concierge 24/7 | Rooftop pickleball · 24/7 valet & concierge |
| Pet-friendly con estaciones y EV chargers | Pet-friendly with stations and EV chargers |

Los seis contenidos tienen correspondencia razonable en factsheet y amenity plans locales. No necesitan convertirse en seis advertencias; basta una nota prudente para el bloque.

### 2.6 Tipologías, planos, características y materiales

| Área | Español | Inglés |
|---|---|---|
| Tipologías | `Studios a 3 dormitorios · ver planos para m²` | `Studios to 3 bedrooms · see plans for m²/sq.ft` |
| Acción planos | `Solicitar planos (PDF)` | `Request floor plans (PDF)` |
| Acción disponibilidad | `Ver disponibilidad por tipología` | `Check availability by typology` |
| Característica 1 | `Ventanales piso-techo; porcelanato importado` | `Floor-to-ceiling windows; imported porcelain flooring` |
| Característica 2 | `Cocinas Italkraft + Bosch; cuarzo continuo; Hansgrohe negro` | `Italkraft kitchens + Bosch; seamless quartz; Hansgrohe black` |
| Característica 3 | `Baños estilo spa; lavadora/secadora en todas las unidades` | `Spa-style baths; washer/dryer in every residence` |
| Acción materiales | `Solicitar materiales (PDF)` | `Request materials (PDF)` |

Las solicitudes son enlaces de email; no son descargas públicas. Esa función debe preservarse hasta disponer de documentos autorizados y versionados.

### 2.7 Duplicación “Por qué”

`¿Por qué The William Residences? / Why The William Residences?` repite exactamente:

- 26 pisos / stories y 374 residencias / residences;
- aproximadamente 3.760 m² / 40.459 ft² de amenidades en dos niveles.

Es contenido útil, pero ya aparece como chips. Puede consolidarse en “Proyecto en cifras” sin perder ninguna métrica.

### 2.8 FAQ

| Estado inicial | Español | Inglés |
|---|---|---|
| Abierta | `¿Rentas de corta estancia?` — `No se permiten. Mínimo 90 días por contrato.` más enlace a disponibilidad. | `Short-term rentals?` — `Not allowed. 90-day minimum leases.` más enlace a disponibilidad. |
| Cerrada | `¿Dirección y sales gallery?` — proyecto en 2040 NE 163rd St y sales gallery en 16251 W Dixie Hwy. | `Address and sales gallery?` con la misma información. |
| Cerrada | `¿Desde qué precio?` — studios desde aproximadamente US$380.880 según disponibilidad del 25/09/2025. | `Starting price?` — studios from approximately US$380,880 per developer availability dated 09/25/2025. |

Las tres preguntas deben sobrevivir. Se actualizan sus respuestas, no se elimina la sección.

### 2.9 Plan de pagos

| Paso | Español | Inglés |
|---:|---|---|
| 1 | 10% reserva | 10% reservation |
| 2 | 10% contrato | 10% at contract |
| 3 | 10% inicio de obra | 10% groundbreaking |
| 4 | 10% top-off | 10% top-off |
| 5 | 60% cierre | 60% at closing |

La ficha agrega un disclaimer específico que indica que el plan puede cambiar y remite al contrato de compraventa. El buyer deposit local de septiembre de 2025 muestra 5%/15%/10%/10%/60%, por lo que la contradicción es material y no debe resolverse eligiendo silenciosamente una versión.

### 2.10 Ubicación y mapa

- Heading: `Ubicación / Location`.
- Query publicada: `2040 NE 163rd St, North Miami Beach, FL 33162`.
- Resultado observado: pin correspondiente a la dirección, aproximadamente `25.9257172, -80.1588094`.
- El objeto legacy usa un único campo que mezcla dirección y ciudad. El prototipo debe usar una dirección estructurada y conservar el fallback “estado sin mapa” si una futura verificación no coincide.

### 2.11 Disclaimers y footer

Aviso breve ES:

> La información del sitio es general y puede cambiar. Precios, disponibilidad y condiciones deben reconfirmarse antes de tomar una decisión.

Aviso breve EN:

> Website information is general and may change. Prices, availability, and conditions must be reconfirmed before making a decision.

Debajo se conserva el `<details>` `Información importante / Important information`. Sus textos ES y EN son fuentes diferenciadas y no deben forzarse a ser traducciones literales. El prototipo no los reemplaza por un resumen nuevo ni duplica su contenido por cada dato.

El footer termina con copyright 2026 y el crédito técnico ya publicado.

## 3. Contrato de los 26 requisitos del prototipo

| # | Requisito | Baseline actual | Propuesta | Resultado de paridad |
|---:|---|---|---|---|
| 1 | Breadcrumb | Presente. | Conservar ruta y label localizado. | Sin pérdida. |
| 2 | Nombre | Presente. | Conservar `The William Residences`. | Sin pérdida. |
| 3 | Dirección | Sólo se explicita dentro del mapa y FAQ. | Mostrar debajo del nombre y conservarla en ubicación/FAQ. | Mejora sin retirar contenido. |
| 4 | Imagen principal | Presente. | Conservar el asset actual y su tratamiento visual. | Sin pérdida. |
| 5 | Precio o consulta | Precio histórico visible. | `Consultar precio e inventario vigente`. | Se preserva la función; se retira sólo el valor contradictorio. |
| 6 | Entrega | `2029`. | `Entrega estimada 2029 · sujeta a confirmación`. | Se conserva el valor y se califica. |
| 7 | Renta | `Mínimo 90 días`. | `Alquiler mínimo de 90 días` más una única nota prudente para el bloque. | Se conserva el dato operativo y se califica sin repetir advertencias. |
| 8 | Condición de entrega | `Sin amueblar`. | `Consultar especificaciones y condición de entrega`. | Se preserva la función sin afirmar inclusiones contractuales. |
| 9 | WhatsApp | Presente dos veces. | Conservar contextual después del hero y en CTA final. | Sin pérdida. |
| 10 | Agenda | Presente dos veces. | Conservar después del hero y en CTA final. | Sin pérdida. |
| 11 | Email | Presente dos veces y en footer. | Conservar como acción complementaria y en footer. | Sin pérdida. |
| 12 | Compartir | WhatsApp share y Web Share condicional. | Conservar ambas capacidades, diferenciadas de consulta. | Sin pérdida. |
| 13 | Proyecto en cifras | Métricas como chips y bloque duplicado. | Unificar 26 pisos, 374 residencias y ≈3.760 m² en un bloque. | Sin pérdida; menos repetición. |
| 14 | Galería | Cuatro imágenes y lightbox. | Conservar assets, grilla/carrusel y lightbox. | Sin pérdida. |
| 15 | Destacados y amenidades | Seis contenidos. | Conservar los seis con una sola nota de alcance. | Sin pérdida. |
| 16 | Tipologías | Estudios a tres dormitorios. | Conservar y normalizar copy ES. | Sin pérdida. |
| 17 | Solicitud de planos | Email precompletado. | Conservar solicitud; no prometer descarga inexistente. | Sin pérdida. |
| 18 | Características | Tres grupos. | Conservar los tres con lenguaje prudente y nota de bloque. | Sin pérdida. |
| 19 | Solicitud de materiales | Email precompletado. | Conservar solicitud de materiales y especificaciones. | Sin pérdida. |
| 20 | Plan de pagos | Cronograma 10/10/10/10/60. | `Solicitar plan de pagos vigente`. | Función preservada; cifras conflictivas no se publican. |
| 21 | FAQ | Tres preguntas. | Conservar las tres y reemplazar respuestas vencidas por respuestas útiles. | Sin pérdida. |
| 22 | Ubicación | Presente como heading y mapa. | Mostrar dirección también antes del mapa. | Mejora sin retirar contenido. |
| 23 | Mapa | Embed operativo por query. | Query desde dirección estructurada; carga lazy con altura estable, estado visible y fallback externo permanente. | Sin pérdida cuando el resultado coincide; el bloque tampoco queda vacío si el iframe falla. |
| 24 | CTA final | Segunda fila completa antes del plan. | Cierre después del mapa con WhatsApp y agenda; email y compartir permanecen en el grupo superior y el footer. | Se conservan las cuatro capacidades en el recorrido, con menos repetición. |
| 25 | Disclaimer | Nota de plan y footer. | Una nota contextual breve más disclosures existentes. | Sin pérdida; sin repetición por campo. |
| 26 | Footer existente | Presente. | Reutilizarlo sin cambios de contenido o arquitectura. | Sin pérdida. |

## 4. Cobertura de las 16 funciones canónicas

| Función canónica | Requisitos relacionados | Tratamiento | ¿Puede omitirse en The William? |
|---|---|---|---|
| 1. Nombre | 2 | Preservar. | No. |
| 2. Ubicación | 3, 22 | Preservar y hacer visible antes del mapa. | No. |
| 3. Hero | 4 | Preservar asset publicado. | No. |
| 4. Precio/inventario | 5 | Solicitud vigente por conflicto temporal. | No como función. |
| 5. Entrega | 6 | Conservar 2029 como estimación sujeta a confirmación. | No. |
| 6. Renta | 7 | Preservar 90 días como mejor información operativa y calificar una sola vez por bloque. | No. |
| 7. Condición de entrega/amueblado | 8 | Consulta de especificaciones. | No como función. |
| 8. Métricas | 13 | Preservar tres métricas con una nota grupal. | No en este proyecto. |
| 9. Galería | 14 | Preservar cuatro assets y lightbox. | No en este proyecto. |
| 10. Destacados/amenidades | 15 | Preservar seis contenidos. | No en este proyecto. |
| 11. Tipologías/planos | 16, 17 | Preservar rango y solicitud. | No como función. |
| 12. Características/materiales | 18, 19 | Preservar tres grupos y solicitud. | No como función. |
| 13. FAQ | 21 | Preservar tres preguntas con respuestas actualizadas. | No. |
| 14. Plan de pagos | 20 | Solicitar versión vigente. | No como función. |
| 15. Mapa | 22, 23 | Preservar con dirección estructurada y resultado verificado. | Sólo el embed si falla la verificación; nunca la ubicación textual. |
| 16. Contacto y disclaimer | 9–12, 24–26 | Preservar canales, CTA final y disclosures. | No. |

## 5. Contenido actual → contenido propuesto → cambio → justificación

| Área | Contenido actual | Contenido propuesto | Cambio | Justificación |
|---|---|---|---|---|
| Nombre | The William Residences. | Igual. | Ninguno. | Identidad reconocible y consistente. |
| Dirección | Visible en FAQ y mapa. | `2040 NE 163rd St, North Miami Beach, FL 33162` debajo del nombre, FAQ y ubicación. | Más visible. | Reduce ambigüedad sin inventar contexto. |
| Hero | Exterior actual. | Mismo asset, composición y lenguaje visual. | Ninguno. | Continuidad; reemplazo sujeto a derechos, no a preferencia estética. |
| Precio | Desde US$380.880. | `Consultar precio e inventario vigente`. | Request. | Las listas locales posteriores muestran otro mínimo y ninguna representa 2026. |
| Entrega | 2029. | `Entrega estimada 2029 · sujeta a confirmación`. | Qualify. | Conserva información útil sin prometer fecha contractual. |
| Renta | Mínimo 90 días. | `Alquiler mínimo de 90 días` más una única nota prudente del bloque. | Qualify. | Las referencias de 30 días son derivados internos de 2025; dos correcciones operativas explícitas y posteriores establecen 90. Falta el reglamento primario. |
| Condición | Sin amueblar. | `Consultar especificaciones y condición de entrega`. | Request. | El material describe acabados, pero no resuelve todas las inclusiones contractuales. |
| Métricas | Dos chips más bloque “Por qué”. | Bloque único con 26 pisos, 374 residencias y ≈3.760 m². | Consolidar. | Mantiene todo y elimina duplicación. |
| Nota de métricas | No existe nota grupal. | `Cifras aproximadas según materiales actuales del proyecto; sujetas a cambios.` | Agregar una vez. | Evita convertir cada cifra en advertencia. |
| Galería | Cuatro imágenes y lightbox. | Igual, con controles y labels localizados. | Refinamiento accesible. | Preserva exploración visual. |
| Amenidades | Seis bullets. | Los mismos seis contenidos, con redacción ES/EN natural. | Refinar copy sin ampliar alcance. | Están respaldados razonablemente por factsheet y amenity plans. |
| Tipologías | `Studios a 3 dormitorios`. | `Estudios a tres dormitorios`. | Localización editorial. | Corrige mezcla de idioma sin cambiar el dato. |
| Planos | `Solicitar planos (PDF)` y disponibilidad. | `Solicitar planos disponibles` y `Consultar disponibilidad por tipología`. | Refinar expectativa. | No existe una descarga pública canónica. |
| Características | Tres grupos de acabados/equipamiento. | Conservar los tres; una nota grupal pide confirmar especificaciones de la unidad. | Qualify por bloque. | No se pierde detalle ni se prometen inclusiones contractuales. |
| Materiales | `Solicitar materiales (PDF)`. | `Solicitar materiales y especificaciones`. | Refinar expectativa. | Hay versiones locales distintas y derechos pendientes. |
| “Por qué” | Repite métricas. | Se integra en “Proyecto en cifras”. | Consolidar. | No desaparece ningún contenido. |
| FAQ renta | Afirma mínimo 90 días. | Indica que la mejor información operativa disponible es 90 días, sin repetir la nota del bloque. | Qualify. | Mantiene una respuesta útil y evita advertencias por campo. |
| FAQ dirección | Dirección + sales gallery concreta. | Dirección del proyecto; sales gallery a confirmar antes de visitar. | Qualify. | El punto de ventas puede cambiar. |
| FAQ precio | Repite US$380.880 y fecha 2025. | Explica que precio e inventario varían y permite solicitar el price sheet vigente. | Request. | Evita publicar una disponibilidad vencida. |
| CTAs superiores | Cinco acciones. | Mismas capacidades, con WhatsApp de consulta como primaria. | Jerarquizar. | Mejora conversión sin eliminar canales. |
| CTAs repetidos | Misma fila completa antes del plan. | CTA final contextual después del mapa. | Reubicar y consolidar. | Mantiene acciones y reduce repetición mecánica. |
| Plan | 10/10/10/10/60. | `Solicitar plan de pagos vigente`. | Request. | Buyer deposit local muestra 5/15/10/10/60. |
| Mapa | Query basada en un campo mixto. | Dirección estructurada con resultado verificado; si el embed falla, estado visible con enlace externo permanente. | Robustecer. | Evita pines inferidos o incorrectos y nunca deja un área vacía. |
| Disclaimer | Nota de plan + footer. | Nota breve de proyecto + footer existente. | Coordinar alcance. | Un único marco prudente, sin tarjetas por campo. |
| Footer | Footer real de Fase 2. | Igual. | Ninguno. | Continuidad de marca, contacto y disclosures. |

## 6. Copy propuesto ES/EN

### 6.1 Resumen comercial

| Función | Español | Inglés |
|---|---|---|
| Precio | `Consultar precio e inventario vigente` | `Inquire about current pricing and inventory` |
| Entrega | `Entrega estimada 2029 · sujeta a confirmación` | `Estimated completion 2029 · subject to confirmation` |
| Renta | `Alquiler mínimo de 90 días` | `Minimum rental term of 90 days` |
| Nota única del bloque | `Condiciones sujetas al reglamento del condominio y a reconfirmación.` | `Conditions are subject to condominium rules and reconfirmation.` |
| Condición | `Consultar especificaciones y condición de entrega` | `Ask about specifications and delivery condition` |

### 6.2 Proyecto en cifras

| Español | Inglés |
|---|---|
| `26 pisos` | `26 stories` |
| `374 residencias` | `374 residences` |
| `≈3.760 m² de amenidades en dos niveles` | `≈40,459 sq. ft. of amenities across two levels` |
| `Cifras aproximadas según materiales actuales del proyecto; sujetas a cambios.` | `Approximate figures based on current project materials; subject to change.` |

### 6.3 Tipologías y características

| Español | Inglés |
|---|---|
| `Estudios a tres dormitorios` | `Studios to three bedrooms` |
| `Solicitar planos disponibles` | `Request available floor plans` |
| `Consultar disponibilidad por tipología` | `Ask about availability by unit type` |
| `Ventanales de piso a techo y porcelanato importado` | `Floor-to-ceiling windows and imported porcelain flooring` |
| `Cocinas Italkraft, electrodomésticos Bosch, superficies de cuarzo y grifería Hansgrohe` | `Italkraft kitchens, Bosch appliances, quartz surfaces and Hansgrohe fixtures` |
| `Baños estilo spa y lavadora/secadora en las residencias` | `Spa-style bathrooms and washer/dryer in the residences` |
| `Características comunicadas en los materiales actuales del proyecto. Confirmar especificaciones e inclusiones de la unidad antes de decidir.` | `Features communicated in current project materials. Confirm unit specifications and inclusions before making a decision.` |
| `Solicitar materiales y especificaciones` | `Request materials and specifications` |

### 6.4 Plan

| Español | Inglés |
|---|---|
| `Solicitar plan de pagos vigente` | `Request the current payment plan` |
| `El plan aplicable depende de la unidad y de la documentación comercial vigente.` | `The applicable plan depends on the unit and current commercial documentation.` |

### 6.5 FAQ

| Pregunta | Respuesta ES | Answer EN |
|---|---|---|
| Dirección / Address | `El proyecto se ubica en 2040 NE 163rd St, North Miami Beach, FL 33162. Antes de una visita, confirmá con Esteban la ubicación y el horario de la sales gallery.` | `The project is located at 2040 NE 163rd St, North Miami Beach, FL 33162. Before visiting, confirm the sales gallery location and hours with Esteban.` |
| Renta / Rentals | `La mejor información operativa disponible indica un alquiler mínimo de 90 días.` | `The best available operational information indicates a minimum rental term of 90 days.` |
| Precio / Price | `El precio y el inventario cambian por unidad. Solicitá el price sheet vigente para comparar opciones disponibles.` | `Pricing and inventory vary by unit. Request the current price sheet to compare available options.` |

### 6.6 CTA final

**ES**

- Eyebrow: `Próximo paso`.
- Título: `Revisá The William Residences con Esteban.`
- Copy: `Consultá inventario, precio, plan de pagos y condiciones aplicables antes de comparar este proyecto con otras opciones.`
- Acciones: `Consultar por WhatsApp`, `Agendar una conversación`. Email y compartir permanecen en el grupo superior y el footer.

**EN**

- Eyebrow: `Next step`.
- Title: `Review The William Residences with Esteban.`
- Copy: `Ask about inventory, pricing, the payment plan and applicable conditions before comparing this project with other options.`
- Actions: `Ask on WhatsApp`, `Schedule a conversation`. Email and sharing remain in the upper action group and footer.

## 7. Diferencias justificadas respecto de producción

| Diferencia | Qué mejora | Qué no cambia |
|---|---|---|
| Dirección visible bajo el nombre | Claridad inmediata y mejor contexto del mapa. | Nombre, URL y dirección. |
| Cuatro campos comerciales separados | Lectura y comparación mobile. | Las cuatro funciones actuales. |
| Precio, condición y plan convertidos en consulta; renta de 90 días calificada una sola vez | Evita presentar valores obsoletos o conflictivos y conserva una regla operativa razonable. | Las cuatro funciones siguen visibles. |
| Entrega 2029 calificada como estimada | Veracidad sin pérdida informativa. | El año 2029. |
| Métricas consolidadas | Elimina duplicación entre chips y “Por qué”. | Las tres métricas. |
| Una nota por bloque | Reduce ruido de auditoría. | Prudencia y reconfirmación. |
| CTAs jerarquizados y cierre compacto después del mapa | Mejora secuencia de decisión. | WhatsApp, agenda, email y compartir siguen presentes en el recorrido. |
| FAQ reescrita | Respuestas útiles sin valores vencidos. | Las tres preguntas esenciales. |
| Dirección estructurada para el mapa | Reduce riesgo de pin incorrecto. | La ubicación y el mapa cuando el resultado es confiable. |
| Labels localizados en lightbox | Accesibilidad ES/EN. | Assets y comportamiento visual. |

No son diferencias autorizadas:

- reemplazar el hero por preferencia estética;
- sumar imágenes o documentos no aprobados;
- publicar planos locales como descargas;
- mostrar fuentes, contradicciones o estados editoriales;
- introducir una estética distinta de la Home y la ficha actual;
- modificar las rutas públicas durante esta fase.

## 8. Riesgos pendientes

1. **Derechos de imágenes.** Los materiales del developer contienen reservas de copyright; no hay autorización documentada para los renders publicados.
2. **Precio e inventario.** La última lista local es de noviembre de 2025 y ya contradice el precio publicado.
3. **Plan de pagos.** El documento local contradice la ficha legacy y también es histórico.
4. **Renta.** La mejor base operativa disponible es 90 días, pero falta el reglamento/declaración o una confirmación primaria reciente; no se considera `reviewed`.
5. **Condición de entrega.** El factsheet describe acabados, pero el disclaimer reserva inclusiones al contrato.
6. **Planos.** Existen R2, R7 y una copia posterior sin número de revisión; no hay versión canónica confirmada.
7. **Sales gallery.** La dirección histórica puede cambiar y debe reconfirmarse antes de recomendar una visita.
8. **Mapa.** El resultado observado es correcto, pero todavía no existe un modelo estructurado de dirección/coordenadas en el catálogo.
9. **Paridad editorial.** Algunas cadenas ES actuales mezclan términos ingleses; la futura plantilla debe revisar ES y EN como contenidos diferenciados.
10. **Rollout futuro.** Este documento sólo cubre el contrato de The William; no autoriza aplicarlo parcialmente a seis fichas ni migrar las 72 rutas.

## 9. Decisiones que requieren aprobación

Antes de convertir el prototipo en plantilla canónica se necesita decidir:

1. si se aprueba el orden final de los 26 requisitos y la consolidación de `¿Por qué?` dentro de “Proyecto en cifras”;
2. si el copy ES/EN propuesto para precio, condición y plan es el definitivo; la renta queda provisionalmente fijada en 90 días con nota única hasta recibir fuente primaria;
3. si la nota única de métricas y la nota única de características son suficientes;
4. si se mantiene provisionalmente el hero actual mientras se aclaran derechos;
5. si los cuatro assets de galería se mantienen en el mismo orden;
6. si la sales gallery continúa en FAQ como dato a confirmar o se omite hasta recibir actualización;
7. si el CTA final puede reemplazar la segunda fila duplicada sin perder ninguna acción;
8. si se aprueba usar el mapa con dirección estructurada verificada y fallback visible con enlace externo permanente;
9. qué documentos puede compartir Esteban por email y quién controla su versión;
10. quién confirma derechos de imágenes, planos y materiales antes del rollout de 36 proyectos.

## 10. Criterio de aceptación del prototipo aislado

El prototipo puede considerarse funcionalmente aprobado sólo si:

- muestra los 26 requisitos de este documento en ES y EN;
- conserva las 16 funciones canónicas;
- mantiene un hero y cuatro imágenes de galería con lightbox;
- conserva los seis destacados y los tres grupos de características;
- conserva las tres preguntas FAQ;
- conserva WhatsApp, agenda, email y compartir sin ejecutar acciones reales durante QA;
- muestra una ubicación textual y un mapa verificado o un estado honesto sin mapa;
- usa una única nota prudente por bloque, no estados técnicos por campo;
- reutiliza el header y el footer reales;
- no contiene fuentes internas, rutas privadas, contradicciones, auditoría o fechas repetidas;
- no reemplaza las rutas públicas de The William;
- no aparece en navegación, sitemap ni enlaces públicos y responde `notFound()` en producción.

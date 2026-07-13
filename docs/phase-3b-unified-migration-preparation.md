# Fase 3B.1.2 — Preparación técnica para la migración unificada

## Decisión de baseline

Los datos que hoy expone `ALL_PROJECTS` se consideran el baseline aprobado de la migración. La futura plantilla debe trasladarlos, no volver a auditarlos ni degradarlos por falta de una fuente nueva.

Esto incluye precio, entrega, renta, condición, métricas, galería, amenidades, tipologías, características, FAQ, plan, mapa y canales de contacto. Los disclaimers generales existentes siguen cubriendo cambios de precios, disponibilidad, planes, condiciones y estimaciones.

Una función sólo pasa a consulta cuando el valor está realmente ausente, existe una contradicción concreta no resuelta o ya tiene un tratamiento aprobado de consulta. La falta de un documento nuevo no es, por sí sola, una razón para cambiar el contenido público.

## Alcance realizado

- Se analizó la forma técnica del catálogo efectivo de 36 proyectos, sin reauditar su contenido comercial.
- Se ajustó la matriz de migración para usar preservación por defecto.
- Se comprobó la paridad estructural ES/EN y la variabilidad que debe soportar un único componente.
- Se verificaron técnicamente 311 referencias únicas de hero y galería: los archivos locales existen y las URLs remotas consultadas respondieron correctamente.
- No se modificó el prototipo aprobado, ninguna ruta pública ni ningún objeto de proyecto.
- No se consultó Dropbox.

## Resultado de la matriz

La matriz contiene 36 proyectos × 16 funciones = 576 registros funcionales.

| Decisión | Registros | Criterio |
|---|---:|---|
| `preserve` | 559 | El contenido actual pasa a la plantilla sin exigir una nueva validación. |
| `qualify` | 6 | Existe una razón concreta para conservar el valor con una única aclaración prudente. |
| `request` | 9 | El dato falta, existe una contradicción real o ya se aprobó una consulta. La función no desaparece. |
| `needs_content` | 2 | Falta contenido opcional comprobado; no se inventa ni se reemplaza con otro bloque. |
| `omit_optional` | 0 | Ningún contenido legacy existente se retira durante la migración. |

Los seis `qualify` son: entrega de 72 Park, Flow House, One Park Tower y The William; renta de The William; y métricas de The William.

Los `request` corresponden únicamente a:

- precio: Cassia y The William;
- entrega: Ambar;
- renta: Faena;
- condición de entrega: Midtown Park, Viceroy Brickell y The William;
- plan: One Park Tower y The William.

Los dos `needs_content` corresponden al FAQ ausente de Twenty Six & 2nd y a las características ausentes de Viceroy Brickell.

## Fuente única para la migración

La migración debe consumir exclusivamente el catálogo efectivo exportado por `src/data/projects/index.ts`.

Ese índice combina capas mediante `upsert`, excluye proyectos no públicos y contiene exactamente los 36 registros vigentes en la web. Leer archivos individuales o la capa base por separado podría reintroducir valores anteriores. `PUBLIC_PROJECT_SLUGS` debe seguir siendo el manifiesto liviano del middleware; el middleware no debe importar el catálogo completo.

## Arquitectura técnica propuesta

### Flujo de datos

1. `ALL_PROJECTS` permanece como fuente legacy aprobada y no se duplica.
2. Un adaptador `server-only` transforma `Project + locale` en un `CanonicalProjectViewModel` mediante lista blanca explícita.
3. El adaptador preserva todos los valores presentes y aplica fallbacks localizados sólo ante ausencias reales o ajustes expresamente aprobados.
4. Un único `CanonicalProjectPage` renderiza los 36 proyectos sin condiciones visuales por slug.
5. Sólo galería/lightbox, compartir y mapa funcionan como islas cliente. El resto permanece server-side.
6. Header, footer, navegación, middleware, sitemap y catálogo general quedan fuera de este cambio.

El view model público no debe incluir fuentes, contradicciones, estados editoriales, rutas privadas ni notas internas. Tampoco debe construirse con `{...project}`: cada propiedad pública debe listarse para evitar filtraciones y pérdidas silenciosas.

### Contrato para las 16 funciones

| Función | Entrada legacy | Salida canónica | Regla ante ausencia real |
|---|---|---|---|
| Nombre | `name` | Identidad y encabezado | Bloqueo de build: nunca puede faltar. |
| Ubicación | `city` | Texto visible y contexto geográfico | Bloqueo de build: nunca puede faltar. |
| Hero | `image` | Imagen principal y alt localizado | Bloqueo de build; no inventar asset. |
| Precio/inventario | `priceFromUsd` | Precio desde + CTA de inventario | Mantener la función con consulta. |
| Entrega | `delivery` | Entrega estimada | Mantener la función con consulta. |
| Renta | campos ES/EN o `rentalPolicy` | Política localizada | Mantener la función con consulta. |
| Condición | `furnished` + copy específico | Condición de entrega localizada | Mantener la función con consulta. |
| Métricas | `microClaimsEs/En` | Lista de hechos de 2 a 5 ítems | No reinterpretar; registrar carencia si ocurriera. |
| Galería | `images` | Galería de 4 a 8 imágenes actuales | Conservar hero y bloquear rollout si la galería se pierde. |
| Destacados/amenidades | `highlights/En` | Lista de 2 a 12 ítems | Registrar carencia; no sustituir con otro contenido. |
| Tipologías/planos | `unitMixEs/En` | Tipologías + solicitud de planos | Mantener solicitud si faltan ítems. |
| Características/materiales | `featuresEs/En` | Características + solicitud de materiales | Mantener solicitud; no reutilizar amenidades. |
| FAQ | `faqsEs/En` | Preguntas y respuestas exactas | No renderizar una carcasa vacía; no inventar respuestas. |
| Plan de pagos | `paymentPlanEs/En` | Unión `steps` o `request` | Mostrar solicitud; nunca una tarjeta vacía. |
| Mapa | query pública actual | Query + fallback externo | Preservar query; revisar sólo si QA detecta un pin incorrecto. |
| Contacto/disclaimer | `src/lib/site.ts` + copy localizado | WhatsApp, agenda, email, compartir y disclaimer | Bloqueo de build: no se elimina ningún canal. |

### Modelo y normalización

- Las métricas deben modelarse como textos opacos (`text` y, sólo cuando ya exista, `label`). No se deben dividir con regex porque los microclaims mezclan cifras y atributos comerciales.
- Los planes deben ser una unión tipada: `steps` cuando existen pasos y `request` cuando están realmente vacíos o tienen un ajuste aprobado.
- Los mapas deben preservar la heurística pública actual: coordenadas si existieran; `city` cuando contiene una dirección; en los demás casos, `name + city`. Todos mantienen un enlace externo de respaldo.
- Los arrays que hoy usan strings y los que usan objetos `{label, iconKey}` se normalizan en el adaptador, no en el componente visual.
- Las URLs y textos canónicos de WhatsApp, agenda y email salen de `src/lib/site.ts`; no se duplican por proyecto.
- Los ajustes puntuales se expresan como datos tipados. No pueden contener clases, componentes o instrucciones de layout, para impedir excepciones visuales por slug.

### Paridad ES/EN

Las colecciones presentes tienen paridad de cantidad entre ES y EN. Hay cuatro proyectos que hoy usan `rentalPolicy` compartido y pueden mostrar español en la ruta inglesa:

- 2200 Brickell: 90 días;
- Ave Maria: tradicional;
- Flow House: 30 días;
- One Park Tower: 30 días.

El adaptador debe localizar esos valores mediante un diccionario tipado y limitado, sin traducir prosa arbitraria ni cambiar su significado comercial. Las ausencias comprobadas son simétricas en ambos idiomas.

## Casos límite de layout

El componente único debe admitir estas variaciones sin bifurcar por slug:

| Bloque | Variación actual | Tratamiento técnico |
|---|---:|---|
| Métricas | 2–5 | Grid fluido; el texto se conserva completo. |
| Galería | 4–8 | Layout adaptable y lightbox con orden estable. |
| Destacados | 2–12 | Grid responsivo sin alturas forzadas. |
| Tipologías | 1–8 | Lista o chips con wrap; admite strings y objetos normalizados. |
| Características | 0–10 | Ausencia real no produce hueco; la solicitud de materiales permanece. |
| FAQ | 0–12 | `<details>` variable; sin heurísticas por palabras ni carcasa vacía. |
| Plan | 0–7 | Pasos variables o CTA de solicitud; nunca un panel vacío. |
| Títulos | hasta 56 caracteres observados | Escala y wrap fluidos, sin tamaño especial por proyecto. |
| Copy largo | hasta 112 caracteres en un ítem observado | Altura automática; sin truncado del contenido comercial. |

Otros casos técnicos:

- 7200 Collins, Domus Brickell Park y Baccarat usan objetos en tipologías o características; los otros proyectos usan principalmente strings.
- ELLA Miami y 72 Park tienen `furnished=true`, pero su copy más específico habla de paquetes opcionales. El adaptador debe preservar ambos contenidos y no convertir el booleano en la afirmación “muebles incluidos”.
- Las imágenes de galería no tienen alt editorial. Se puede usar un fallback localizado con nombre de proyecto e índice, sin consultar fuentes ni modificar los assets.
- Viceroy repite el hero en la galería. Para cumplir preservación, la primera migración mantiene el orden y los assets; cualquier deduplicación posterior requiere aprobación separada.
- Ningún proyecto tiene coordenadas. Doce ubicaciones contienen una dirección y veinticuatro usan la query pública `nombre + zona`; esto no impide la migración.

## Dudas reales detectadas

| Proyecto | Problema exacto | Contenido actual | Impacto | Dropbox | Recomendación |
|---|---|---|---|---|---|
| Cassia | Dos precios iniciales incompatibles. | Campo principal: US$773.000; FAQ ES/EN: aproximadamente US$823.000. | La plantilla mostraría dos cifras distintas en una misma ficha. | Sí, sólo si se desea resolver la cifra antes del rollout. | Revisar el price sheet o inventory sheet más reciente y unificar resumen y FAQ; alternativamente aprobar temporalmente la consulta de precio. |
| NoMad Wynwood | El campo principal y el FAQ estaban desincronizados. | Campo principal: 2026; FAQ ES/EN: Q4 2025. | La ficha mostraría dos plazos distintos si se copiaba sin normalización. | No. El historial Git resolvió la cronología. | Conservar 2026, introducido por el commit `9b2a39cadb1b3395c4f61e94b8f63cd340747a18` del 1 de febrero de 2026, y alinear sólo la respuesta FAQ. |
| Ambar | Entrega ausente. | No existe `delivery`. | El resumen necesita un fallback real, no un valor inventado. | No para migrar. | Mantener “Consultar entrega estimada”; revisar un factsheet sólo si se exige publicar una fecha. |
| Faena | Política de renta ausente. | No hay política de renta. Features y FAQ sí describen residencias terminadas y el alcance del amoblamiento. | La renta necesita fallback; la condición puede preservar el contenido actual. | No para migrar. | Consultar la política de renta y conservar una síntesis localizada de la condición ya publicada. |
| One Park Tower | Plan ES/EN vacío. | Arrays de plan sin pasos. | El componente legacy puede producir una sección vacía. | No para migrar. | Mostrar “Solicitar plan de pagos vigente”; revisar buyer deposit schedule sólo si se quieren publicar pasos. |
| Twenty Six & 2nd | FAQ ausente. | No existen arrays ES/EN. | Una sección obligatoria generaría una carcasa vacía. | No. | No inventar FAQ; mantener el resto de la ficha y registrar contenido pendiente. |
| Viceroy Brickell | Características ausentes. | No existen arrays ES/EN. | No hay contenido para la lista, aunque sí existen amenidades y tipologías. | No. | Mantener solicitud de materiales; no reutilizar amenidades como características. |

Aunque `furnished` esté ausente, Gaia, Jean-Georges Tropic, Nickelodeon y Oasis Hallandale ya describen la condición o el amoblamiento en features, microclaims o FAQ ES/EN. La migración preserva ese contenido mediante una síntesis localizada. Sólo Midtown Park y Viceroy requieren el fallback canónico; no necesitan una consulta documental para conservar el resto de sus fichas.

## Consultas puntuales de Dropbox propuestas

Dropbox no fue consultado en esta fase. Sólo se identifican dos comprobaciones que podrían resolver contradicciones internas:

1. **Cassia**
   - Duda: US$773.000 frente a aproximadamente US$823.000.
   - Archivos concretos: el price sheet y/o inventory sheet más reciente de Cassia, preferentemente posterior al material fechado 1 de abril de 2025 si existe.
   - Decisión dependiente: precio único que debe alimentar el resumen y el FAQ.
2. **NoMad Wynwood — resuelto sin Dropbox**
   - El commit `9b2a39cadb1b3395c4f61e94b8f63cd340747a18`, fechado el 1 de febrero de 2026 y titulado `fix delivery of Nomad`, cambió explícitamente Q4 2025 a 2026.
   - El PDF local disponible es una captura de la web anterior, no una fuente primaria, y refleja el valor viejo.
   - Decisión: conservar 2026 y alinear únicamente el FAQ ES/EN.

No se deben abrir carpetas adicionales ni revisar brochures completos. Cassia permanece temporalmente como consulta hasta recibir el documento puntual; NoMad ya no requiere Dropbox para la migración.

## Rollout atómico propuesto

1. Congelar esta matriz como contrato de preservación.
2. Implementar tipos, copy localizado, adaptador `server-only` y ajustes tipados sin tocar rutas públicas.
3. Generar 72 view models (36 × ES/EN) en pruebas y comprobar que cada ítem legacy presente llega al bloque correcto.
4. Probar extremos de cantidad y longitud, planes vacíos, fallbacks localizados, mapas y CTAs en un entorno aislado.
5. Confirmar que ningún estado, fuente, conflicto o ruta interna aparece en props serializadas, RSC o HTML.
6. Resolver o aprobar el fallback de Cassia y aceptar el copy canónico de las ausencias reales.
7. Cambiar una sola vez el render de `[locale]/proyectos/[slug]` para los 36 proyectos. No usar allowlists ni switches por slug.
8. Validar las 72 URLs en Preview y publicar en un solo deployment. El rollback debe revertir el deployment completo, no proyectos individuales.

## Gates antes de autorizar la migración atómica

- Aprobar esta matriz y el principio `preserve` por defecto.
- Elegir para Cassia entre consulta puntual de Dropbox o fallback temporal de consulta.
- Aprobar el copy ES/EN de los fallbacks para ausencias reales.
- Autorizar la implementación no pública del adaptador, view model, componente y pruebas.
- Exigir assertions de build: 36 IDs y slugs únicos, paridad con `PUBLIC_PROJECT_SLUGS`, 72 view models generables y cero pérdida de arrays presentes.
- Completar QA de Preview para escritorio, mobile, teclado, lightbox, mapas, CTAs, consola, assets y paridad ES/EN.
- Aprobar expresamente el único cambio atómico de las 72 rutas públicas.

Hasta cumplir esos gates no se modifica ninguna ruta pública, no se abre PR y no se realiza deployment.

# Fase 3A — Dirección de la ficha de proyecto

## Objetivo

La nueva ficha de los seis proyectos prioritarios evoluciona la experiencia existente para que el visitante pueda entender qué se sabe, qué debe reconfirmarse y qué conviene preguntar antes de conversar con Esteban.

No es un rediseño independiente ni una nueva identidad. Conserva la dirección aprobada en Fase 2 —navy, marfil, dorado discreto, tipografía sans, claridad editorial y contacto personal— y reemplaza sólo los patrones que publicaban información sensible sin trazabilidad.

La implementación está en `src/components/projects/PriorityProjectPage.tsx`. La ruta actual decide entre esa experiencia y la ficha legacy mediante el slug, sin cambiar las URLs.

## 1. Principio de continuidad aplicado

La ficha anterior resolvía necesidades reales:

- identificaba el proyecto con nombre, imagen y ubicación;
- permitía recorrer galería, características, plan y preguntas;
- ofrecía contacto por WhatsApp, email y agenda;
- mantenía una experiencia ES/EN y una estética coherente con el sitio;
- preservaba una ruta estable por proyecto.

El problema comprobado no era su intención, sino la forma en que datos de distinta confiabilidad aparecían al mismo nivel. Precio, entrega, renta, financiación, disponibilidad y planes se mostraban como valores planos sin fuente, fecha, responsable o vigencia. Además, las seis fichas contienen contradicciones o referencias vencidas documentadas en la auditoría.

Por eso se conserva la estructura reconocible de una ficha inmobiliaria, pero se reordena alrededor de trazabilidad, límites y conversación.

## 2. Clasificación de los elementos actuales

| Clasificación | Elementos | Decisión y evidencia |
|---|---|---|
| Conservar | URLs `/[locale]/proyectos/[slug]`, nombres existentes, breadcrumb, ES/EN, imagen principal, galería y contacto personal | Resuelven orientación, reconocimiento y continuidad. Cambiarlos no aportaría evidencia adicional y podría romper enlaces o la Home. |
| Conservar y refinar | Hero, ubicación, developer/equipo, galería, WhatsApp, agenda, foco visible y metadata genérica | Se mantienen con mejor jerarquía, contexto de revisión, CTA contextual y etiquetas accesibles localizadas. |
| Reinterpretar | Highlights, “¿Por qué este proyecto?”, FAQ, datos comerciales y disclaimers | Highlights pasan a hechos atribuidos; “por qué” pasa a “puede ser relevante si…”; FAQ pasa a riesgos y preguntas abiertas; los datos se presentan como registros gobernados. |
| Reemplazar con justificación | Línea plana de precio/entrega/renta, chips sin procedencia, bloques de plan sin vigencia, CTAs repetidos y mapa derivado de un campo `city` no estructurado | Las contradicciones de Frida, Seven Park, 26 & 2nd y los hitos vencidos de Oasis/Midtown prueban que el formato anterior podía inducir a una lectura de vigencia. Se reemplaza sólo en las seis fichas. |
| Retirar por problema comprobable | Claims automáticos de recomendación, valores legacy `unverified`, financiación o incentivos no documentados y planes históricos presentados como actuales | La fuente interna no acredita vigencia. La nueva ficha no lee esos campos legacy para la sección comercial. No se borran del catálogo durante esta fase. |

## 3. Arquitectura de información implementada

La secuencia responde a la forma en que una persona evalúa una opción: primero identidad y contexto; después hechos y encaje; luego condiciones, riesgos y fuentes; finalmente contacto.

### 1. Breadcrumb e identidad

Incluye:

- regreso a Proyectos;
- nombre comercial existente;
- estado editorial general con texto e icono;
- ubicación;
- resumen factual;
- portada existente;
- aviso visible sobre procedencia y derechos de la imagen.

**Razón:** orienta sin abrir con un precio o promesa. El estado no depende solamente del color.

### 2. Ubicación y developer/equipo

Un `dl` separa ambos datos del resumen.

**Razón:** son atributos de identidad relativamente estables y no deben mezclarse con condiciones comerciales cambiantes.

### 3. Panorama del proyecto y relevancia editorial

La columna factual presenta puntos comunicados por fuentes oficiales. La columna editorial usa “Puede ser relevante si…” y aclara que no es una recomendación definitiva.

**Razón:** distingue qué describe al proyecto de cómo puede compararse según el objetivo del visitante.

### 4. Información comercial y estado de revisión

La cuadrícula muestra, en este orden:

1. estado comercial;
2. precio;
3. entrega;
4. política de renta;
5. disponibilidad;
6. financiación;
7. plan de pagos.

Cada tarjeta puede mostrar valor o “Pendiente de verificación”, estado, nota, fecha, regla de vigencia y fuentes públicas aplicables.

**Razón:** permite comparar sin equiparar un dato revisado con uno faltante. `imageRights` pertenece al mismo modelo, pero se comunica junto a la portada y la galería en lugar de ocupar una tarjeta comercial.

### 5. Riesgos, límites y preguntas abiertas

Dos bloques paralelos registran contradicciones, limitaciones y documentos pendientes.

**Razón:** transforma la incertidumbre en una agenda concreta para la conversación, sin ocultarla ni dramatizarla.

### 6. Galería existente

Reutiliza los assets actuales y `GalleryLightbox`, con etiquetas ES/EN y aviso de derechos.

**Razón:** preserva reconocimiento y material visual sin presentarlo como autorizado o como prueba de una condición comercial.

### 7. Registro de fuentes públicas

Muestra título, enlace, alcance y fecha de observación de las fuentes marcadas `public: true`. Las fuentes internas no se renderizan.

**Razón:** hace visible la procedencia sin publicar documentos privados ni convertir la ficha en un repositorio documental.

### 8. Conversación con contexto

El cierre ofrece:

- WhatsApp con nombre del proyecto y pedido explícito de reconfirmar inventario, precio, entrega y condiciones de uso o renta;
- agenda canónica existente.

**Razón:** mantiene la conversación como conversión principal y evita múltiples CTAs redundantes. No inicia ningún mensaje o reserva por sí mismo.

## 4. Separación entre datos, síntesis y criterio editorial

| Capa | Contenido | Regla |
|---|---|---|
| Identidad heredada | Nombre, portada y galería provenientes del `Project` actual | Dependencia temporal para preservar URLs y assets. No hereda precio, entrega, renta ni plan en la ficha prioritaria. |
| Dato gobernado | Ubicación, developer/equipo y campos sensibles | Debe respetar estado, fuente, fecha, responsable y vigencia definidos en la gobernanza. |
| Hecho atribuido | `factualHighlights` | Describe sólo lo comunicado por fuentes identificadas; no confirma inventario ni condiciones actuales. |
| Síntesis editorial | `summary` | Resume fuentes sin agregar hechos, resultados o beneficios no contenidos en ellas. |
| Marco de comparación | `profileFit` | Indica para qué necesidad podría resultar relevante. Nunca equivale a recomendación automática. |
| Control editorial | `risks` y `openQuestions` | Explica contradicciones, límites y próximas verificaciones. No se atribuye al developer. |
| Procedencia | `sources` | Sólo las fuentes públicas se muestran; las internas permanecen fuera de la interfaz. |

La metadata mantiene una descripción genérica y factual. Para las seis fichas utiliza la ubicación gobernada, pero no agrega precio, entrega, rentabilidad, disponibilidad ni imagen del proyecto al contenido social.

## 5. Antes y después

| Antes: ficha compartida legacy | Después: ficha prioritaria | Mejora buscada |
|---|---|---|
| Precio, entrega y renta en una línea superior sin estado | Estado general y ubicación; condiciones en tarjetas gobernadas | Transparencia y menor riesgo de interpretar un dato como vigente. |
| Microclaims repetidos como chips y bloque “¿Por qué…?” | Hechos atribuidos y marco “Puede ser relevante si…” | Separa descripción de recomendación. |
| Plan de pagos tomado directamente del catálogo | “Pendiente de verificación” hasta contar con fuente vigente | Evita publicar cronogramas contradictorios o vencidos. |
| FAQ con respuestas y CTAs generados por heurísticas de palabras | Riesgos y preguntas pendientes redactados por proyecto | Paridad ES/EN y contexto más preciso. |
| Tres grupos de CTAs, email y share dentro de la ficha | Un cierre con WhatsApp contextual y agenda | Menos distracción y conversión alineada con la estrategia. |
| Mapa generado desde `city`, que mezcla barrio y dirección | Ubicación gobernada y visible, sin embed | Mayor precisión y una solicitud externa menos. |
| Galería sin contexto de derechos | Aviso junto a portada y galería | Transparencia sobre una limitación real. |
| Sin registro visible de procedencia | Fuentes públicas con fecha y alcance | Confianza verificable sin exponer material interno. |

## 6. Continuidad visual

Se preservan:

- navy `#0A2540` como color estructural;
- fondo marfil y superficies blancas;
- dorado discreto para acentos, no como decoración ostentosa;
- tipografía sans y escala editorial de Fase 2;
- bordes suaves, sombras contenidas y tarjetas de lectura clara;
- fotografía existente;
- contacto personal con Esteban;
- navegación, footer y selector de idioma globales.

Los cambios de composición responden a jerarquía y trazabilidad, no a una búsqueda genérica de modernidad. No se crea una identidad separada para las fichas.

## 7. Principios mobile-first

- Una sola columna como base; dos o tres columnas aparecen sólo cuando hay ancho suficiente.
- Hero 4:3 en mobile y 16:10 en pantallas amplias para reducir recortes extremos.
- Estado, ubicación y resumen aparecen antes de cualquier detalle secundario.
- Tarjetas comerciales legibles sin tabla horizontal.
- Riesgos y preguntas se apilan en mobile.
- CTAs con altura mínima de 48 px y disposición vertical cuando el espacio es limitado.
- Galería horizontal con `snap` en mobile y grilla progresiva en desktop.
- No se depende de hover para comprender o activar una función.

## 8. Accesibilidad

La implementación utiliza:

- un `article` dentro del `main` global, evitando agregar otro landmark principal;
- jerarquía de encabezados por sección;
- breadcrumb como `nav` y lista ordenada;
- pares de datos en `dl`, `dt` y `dd`;
- estados expresados con texto e icono, no sólo color;
- `aria-labelledby` en secciones relevantes;
- foco visible en enlaces y CTAs;
- enlaces externos con `noopener noreferrer`;
- etiquetas de galería localizadas ES/EN;
- texto alternativo de portada basado en nombre y ubicación.

### Comportamiento de teclado implementado

`GalleryLightbox` mueve el foco al control de cierre cuando abre, mantiene la tabulación dentro del diálogo, permite recorrer imágenes con las flechas, cierra con Escape, bloquea el scroll de fondo y devuelve el foco al disparador al cerrar. Los textos alternativos de galería siguen siendo genéricos mientras no exista una descripción editorial aprobada por asset; ese faltante de contenido no se resuelve por inferencia.

## 9. Performance

- `PriorityProjectPage` es un Server Component; la interactividad cliente queda acotada al lightbox.
- `next/image` optimiza portada y galería; la portada prioritaria define `sizes` y las miniaturas se cargan de forma diferida.
- El lightbox limita la grilla inicial a 12 imágenes; los seis proyectos actuales tienen menos.
- Eliminar el mapa embebido evita una solicitud de terceros en la nueva ficha.
- No se agregaron videos, librerías de carrusel ni assets nuevos.
- Las fuentes originales de 26 & 2nd y Oasis incluyen archivos especialmente pesados. La optimización de Next reduce la transferencia habitual, pero no resuelve procedencia, costo de transformación ni necesidad editorial; deben revisarse antes de una futura migración de medios.
- La gobernanza completa permanece en el servidor. No debe importarse en la página cliente del catálogo general.

## 10. Riesgo de derechos y procedencia de assets

El inventario de Fase 2 confirmó disponibilidad técnica, dimensiones y respuesta HTTP; no confirmó licencia, titularidad ni autorización de marketing. Los seis campos `imageRights` comienzan como `unverified`.

La decisión provisional es:

- conservar las imágenes existentes para continuidad y comparación;
- mostrar el límite junto a la portada y la galería;
- no descargar, generar ni inventar reemplazos;
- no usar las imágenes como evidencia de entrega, vista, mobiliario o disponibilidad;
- no convertirlas en OG específicas del proyecto;
- retirar o sustituir un asset sólo cuando se confirme una restricción o se reciba un reemplazo aprobado;
- registrar por imagen fuente, titular, permiso, alcance, vigencia, alt editorial y foco de recorte en la futura herramienta estructurada.

El aviso reduce ambigüedad editorial, pero no concede derechos. La aceptación de su uso provisional debe formar parte de la aprobación del Preview.

## 11. Límites de alcance

Esta dirección:

- se aplica solamente a los seis slugs registrados en `PRIORITY_PROJECTS`;
- no modifica Home, navegación, footer ni la página general de Proyectos;
- no reconstruye filtros, búsqueda o comparación;
- no altera datos ni componentes de los otros 30 proyectos;
- no cambia URLs ni estado de indexación;
- no selecciona nuevos proyectos destacados;
- no convierte fuentes públicas en garantía comercial;
- no incorpora CMS, base de datos ni infraestructura nueva.

Durante la transición existirán dos generaciones de ficha. La diferencia responde al alcance controlado de la gobernanza, no a que los seis proyectos sean recomendados o superiores. Baccarat Residences (`/es/proyectos/baccarat` y `/en/proyectos/baccarat`) es una ficha legacy representativa para controlar regresiones.

## 12. Criterios de aceptación de la dirección

La ficha prioritaria es coherente con esta dirección cuando:

- preserva nombre, URL, identidad visual y contacto;
- no presenta valores legacy `unverified`;
- cada dato comercial visible incluye estado y límite;
- los hechos se diferencian del criterio editorial;
- ES y EN conservan el mismo alcance;
- la galería comunica el riesgo de derechos;
- las fuentes internas no aparecen en el HTML público;
- WhatsApp incluye contexto del proyecto y pedido de reconfirmación;
- mobile no requiere scroll horizontal de página;
- teclado, foco, contraste y lightbox superan el QA final;
- una ficha legacy continúa funcionando sin cambios inesperados.

# Fase 3A — Auditoría de la página Proyectos

## Objetivo y alcance

Este documento registra cómo funciona actualmente la página general de Proyectos en español e inglés, qué datos utiliza y qué debe corregirse en una etapa posterior. La revisión cubre:

- inventario público y acceso a fichas;
- búsqueda, filtros, orden y parámetros de URL;
- vigencia y gobernanza de los datos mostrados;
- paridad ES/EN;
- estados vacíos;
- comportamiento mobile y accesibilidad por teclado;
- enlaces, imágenes, consola y carga de datos.

La auditoría se realizó sobre el baseline de Fase 3A del 13 de julio de 2026. No valida precios, entregas, disponibilidad, políticas de renta ni claims inmobiliarios. Que un dato exista en el código sólo confirma que el sitio lo publica; no demuestra que esté vigente o aprobado.

## Decisión inmediata de Fase 3A

**No se justifica modificar el código del catálogo general durante Fase 3A.**

Los seis proyectos prioritarios aparecen en la página, sus enlaces son correctos y sus rutas ES/EN responden. No existe un fallo funcional que impida acceder a sus fichas. Corregir ahora filtros, búsqueda, tarjetas o arquitectura de datos implicaría iniciar anticipadamente la reconstrucción del catálogo, expresamente fuera de alcance.

La decisión para esta fase es:

1. conservar la página general y sus URLs actuales;
2. implementar la nueva generación de ficha únicamente en los seis proyectos prioritarios;
3. documentar los riesgos del catálogo actual;
4. abordar búsqueda, filtros, tarjetas y gobernanza integral en una fase específica posterior.

## Resumen ejecutivo

- El inventario público contiene **36 de 36 slugs esperados**, sin duplicados ni extras.
- En la prueba baseline, **72 de 72 URLs de detalle** —36 proyectos por dos idiomas— respondieron HTTP 200.
- Las seis fichas prioritarias están accesibles desde el catálogo en ES/EN y cada tarjeta enlaza correctamente mediante imagen, título y CTA.
- Las 36 imágenes de portada cargaron sin roturas después de recorrer el catálogo completo.
- La búsqueda y los filtros funcionan sólo en memoria; no leen ni escriben parámetros de URL.
- Cuando no hay resultados, la página queda en blanco sin explicación, cantidad ni vía de recuperación.
- El filtro de renta infiere categorías desde textos libres y valores legacy. Produce clasificaciones incorrectas o más categóricas que la fuente.
- Precio, entrega y política de renta se muestran sin fuente, fecha, responsable, vigencia ni estado editorial.
- En inglés aparecen valores españoles por fallback, y las entregas mezclan formatos ES/EN.
- El drawer mobile no cumple el comportamiento esperado de un diálogo accesible: no gestiona foco, Escape, scroll de fondo ni retorno de foco.
- La página cliente importa los objetos completos de los 36 proyectos, aunque las tarjetas utilizan una fracción de sus campos.

## Inventario y acceso

### Proyectos prioritarios

| Nombre comercial existente | Slug preservado | ES | EN |
|---|---|---:|---:|
| The William Residences | `/proyectos/the-william` | 200 | 200 |
| Frida Kahlo Wynwood Residences | `/proyectos/frida-kahlo` | 200 | 200 |
| Twenty Six & 2nd (Wynwood) | `/proyectos/26-and-2nd` | 200 | 200 |
| Seven Park Residences | `/proyectos/seven-park` | 200 | 200 |
| Oasis Hallandale | `/proyectos/oasis-hallandale` | 200 | 200 |
| Midtown Park | `/proyectos/midtown-park` | 200 | 200 |

Cada tarjeta prioritaria expone tres accesos a la misma URL localizada: portada, nombre y “Ver más detalles” / “View details”. Son repetitivos para teclado, pero no están rotos ni resultan engañosos respecto de su destino.

### Inventario completo

- Manifiesto público: 36 slugs.
- Catálogo renderizado: 36 tarjetas.
- IDs duplicados: 0.
- Slugs duplicados: 0.
- Fichas probadas: 36 ES + 36 EN.
- Respuestas HTTP 200 en baseline: 72/72.
- Portadas cargadas después de scroll completo: 36/36.
- Portadas rotas: 0.
- Overflow horizontal de página: 0.

La prueba anterior confirma acceso técnico, no actividad comercial ni vigencia de cada proyecto.

## Comportamiento actual

### Búsqueda

La búsqueda:

- compara el texto ingresado únicamente contra nombre y ciudad;
- ignora mayúsculas y minúsculas;
- no normaliza acentos, espacios, guiones o puntuación;
- se aplica mientras el usuario escribe;
- no se conserva al recargar o cambiar de idioma.

Ejemplo comprobado: `Jean Georges` devuelve cero resultados porque el nombre contiene un guion no separable en `Jean‑Georges`. La búsqueda exacta o parcial con `Jean` sí lo encuentra.

### Filtro de renta

Las opciones actuales son:

- todas;
- sin restricciones;
- 30 días;
- 60 días;
- 90 días;
- 6 meses.

El catálogo no almacena una categoría editorial normalizada. La categoría se deriva con expresiones regulares aplicadas a textos ES/EN o se toma de un valor legacy si coincide exactamente.

Distribución resultante en el baseline:

| Categoría inferida | Cantidad |
|---|---:|
| Sin restricciones | 18 |
| 30 días | 10 |
| 60 días | 0 |
| 90 días | 2 |
| 6 meses | 2 |
| Sin categoría | 4 |

Problemas comprobados:

- **Domus Brickell Park** queda bajo “30 días” porque su valor legacy tiene prioridad, aunque el texto visible dice que permite alquiler diario.
- **Millux Place Brickell** queda bajo “6 meses” porque el algoritmo lee “1 noche–6 meses” como mínimo de seis meses, aunque el texto describe uso nocturno flexible.
- **Frida Kahlo** queda bajo “sin restricciones” a partir de “flexibilidad para alquileres a corto plazo”. Esa categoría expresa más certeza que la fuente textual.
- **Ave Maria, Faena, Nickelodeon y Ambar** no pertenecen a ninguna categoría; sólo pueden verse bajo “Todas”.
- La opción “60 días” siempre produce cero resultados y no existe un estado vacío que explique la situación.

### Precio

Los filtros mínimo y máximo:

- operan sobre `priceFromUsd`;
- esperan números expresados en miles: `500` equivale a USD 500.000;
- eliminan caracteres no numéricos;
- no comprueban que el mínimo sea menor o igual al máximo;
- excluyen proyectos sin precio cuando se aplica un límite.

Los 36 proyectos actuales tienen un precio numérico, pero ninguno lleva en la tarjeta fecha de revisión, fuente, vigencia o responsable. Por ello, ordenar por precio crea una apariencia de comparabilidad que el modelo editorial actual no puede sostener.

### Orden

Las opciones son:

- A→Z;
- Z→A;
- precio más bajo;
- precio más alto.

El orden alfabético utiliza comparación de texto sin una regla explícita por idioma. El orden de precio utiliza el mismo campo sensible sin distinguir registros revisados, antiguos o sujetos a reconfirmación.

### Estado en URL

Los filtros viven únicamente en estado local del navegador. La página no interpreta `q`, `rental`, `min`, `max` ni `sort` desde la URL.

Prueba ejecutada:

`/es/proyectos?q=the-william&rental=90-dias&min=300&max=500&sort=price-asc`

Resultado:

- los controles aparecieron vacíos;
- se mantuvo el orden inicial;
- se mostraron las 36 tarjetas.

Consecuencias para Producto:

- no se puede compartir una selección;
- la recarga borra los filtros;
- cambiar ES/EN borra los filtros;
- campañas o enlaces internos con query strings prometen un estado que la página no aplica;
- navegación atrás/adelante no representa de forma fiable el criterio usado.

## Gobernanza y vigencia de los datos

La tarjeta consume directamente los objetos completos de proyecto. El modelo legacy no obliga a registrar:

- fuente;
- fecha de revisión;
- responsable;
- vigencia;
- aprobación editorial;
- necesidad de reconfirmación.

En el baseline:

- 36/36 muestran precio;
- 35/36 muestran entrega; Ambar Orlando no tiene entrega;
- las políticas de renta pueden provenir de texto localizado, fallback legacy o inferencia;
- ninguna tarjeta diferencia “revisado”, “sujeto a reconfirmación” o “sin verificar”.

### Señales concretas que requieren revisión

Estas observaciones no prueban que el dato sea falso; prueban que no debe presentarse como vigente sin reconfirmación:

- **The William:** el precio visible proviene de una disponibilidad fechada 25/09/2025.
- **Frida Kahlo:** la entrega general figura como 2029, mientras el plan de pagos menciona cierre estimado Q3 2028.
- **Twenty Six & 2nd:** un comentario indica que el plan oficial está pendiente, pero el objeto contiene un plan preciso e incluso afirma financiación para extranjeros.
- **Seven Park:** el plan principal termina con 50% al cierre; la FAQ describe 60% y omite un hito intermedio.
- **Oasis:** el precio se apoya en referencias 2024–2025 y la entrega de tarjeta se resume como `2025-2027` sin explicar torres o etapas.
- **Midtown Park:** el plan incluye hitos estimados para noviembre de 2025 y junio de 2026, ya transcurridos a la fecha de esta auditoría.
- **Cassia:** el valor del objeto es USD 773.000, mientras un comentario próximo menciona aproximadamente USD 823.000 con fecha 04/01/2025.

Entregas visibles que ya transcurrieron o alcanzaron su límite temporal y requieren revisión inmediata:

- 72 Park: `2025`;
- Flow House: `Nov-Dec 2025`;
- One Park Tower: `2025`;
- Viceroy: `Q1 2026`;
- Nickelodeon: `Q2 2026`.

## Paridad y localización ES/EN

La interfaz traduce títulos, botones y moneda, pero varios valores de datos se comparten como texto libre o dependen de fallback.

### Español visible en la versión inglesa

- 2200 Brickell: `90 días`;
- Flow House: `30 días`;
- One Park Tower: `30 días`;
- Ave Maria: `Tradicional` y `8-12 meses`;
- The Lauderdale: `Dic 2029`;
- dirección de ELLE: `EE. UU.`.

### Formatos ingleses visibles en español

- `Nov-Dec 2025`;
- `Q1 2027`, `Q4 2027`, `Q2 2026`, `Q1 2028` y `Q1 2026`;
- nombres de amenities y destacados que mezclan español e inglés.

Además, `city` se utiliza indistintamente para barrio, ciudad o dirección postal completa. Esto perjudica la lectura comparativa y provoca truncamientos diferentes entre tarjetas.

Dirección recomendada: almacenar entrega, ubicación y renta como datos estructurados; formatear la presentación por idioma. No resolver la traducción agregando más fallbacks manuales.

## Estado vacío y recuperación

Al aplicar una búsqueda o combinación sin coincidencias:

- el grid desaparece;
- no aparece “sin resultados”;
- no se informa cuántos proyectos coinciden;
- no se explica qué filtro dejó el conjunto vacío;
- no se ofrece un botón próximo para restablecer;
- no existe anuncio para lectores de pantalla mediante `aria-live` o `role="status"`.

La pantalla sólo conserva el bloque de filtros. Para un visitante puede parecer que el catálogo falló o no terminó de cargar.

## Mobile y accesibilidad

### Evidencia mobile 390×844

- Altura total del catálogo: **17.627 px**.
- Equivalencia: **20,9 pantallas** de 844 px.
- Ancho efectivo de tarjeta: **326 px** por doble padding lateral.
- Títulos truncados: 1, el nombre largo de Nickelodeon.
- Líneas ubicación/política truncadas: 20.
- Chips desbordados dentro de tarjeta: Domus Brickell Park.
- Overflow horizontal de documento: ninguno.

La lista completa es usable, pero excesivamente larga para exploración mobile y oculta información de renta relevante mediante `line-clamp`.

### Drawer de filtros

Comportamiento comprobado al abrir el drawer:

- el foco permanece en el botón “Filtros”, fuera del diálogo;
- `Shift+Tab` permite salir hacia la navegación global;
- Escape no cierra el drawer;
- el contenido de fondo no queda inerte;
- la página de fondo puede desplazarse;
- cerrar con la X deja el foco en `<body>` y no lo devuelve al disparador;
- no existe cierre automático o adaptación al cambiar a desktop.

El botón “Aplicar” sólo cierra el panel. Los cambios ya se aplican en vivo detrás del overlay, por lo que comunica un modelo de interacción distinto del real.

### Controles de renta y orden

Los dos controles se presentan como listboxes, pero sus opciones:

- sólo seleccionan mediante evento de mouse;
- no participan individualmente en el orden de tabulación;
- no responden a ArrowDown/ArrowUp;
- no responden a Enter o Space para seleccionar;
- no gestionan opción activa mediante `aria-activedescendant`;
- no devuelven correctamente el foco al disparador al cerrar.

La solución futura debería usar un `<select>` nativo o un componente de selección accesible ya probado. No conviene continuar ampliando el listbox manual.

## Enlaces, assets y errores

Resultados de la verificación baseline:

- las seis tarjetas prioritarias enlazan a los slugs correctos en ambos idiomas;
- las 72 rutas de detalle públicas respondieron 200;
- las 36 portadas del catálogo cargaron;
- no hubo imágenes rotas;
- no hubo errores de página ni errores de consola de la aplicación;
- no hubo requests fallidos de assets del catálogo.

La consola de desarrollo sí emitió una advertencia de performance: la primera portada visible se convierte en candidata a LCP, pero todas las imágenes están configuradas como lazy. No bloquea el acceso y debe resolverse junto con la optimización futura del catálogo.

## Performance y arquitectura de datos

La página general es un componente cliente y recibe `ALL_PROJECTS`, que contiene galerías, FAQs, planes de pago, tipologías, features, microclaims y otros campos no utilizados por las tarjetas.

Medición sobre los 36 objetos del baseline, antes de compresión:

| Conjunto serializado | Tamaño aproximado |
|---|---:|
| Objetos completos | 152.591 bytes |
| Campos necesarios para tarjetas actuales | 36.110 bytes |
| Datos evitables | 116.481 bytes |

El objeto completo es **4,23 veces** mayor que una vista resumida. Esta cifra no equivale al peso final transferido por red, pero demuestra la diferencia estructural. Incorporar gobernanza, fuentes y textos adicionales a los mismos objetos aumentará el coste si la página continúa importándolos completos.

Dirección recomendada: derivar una vista liviana del catálogo desde la fuente canónica, sin mantener manualmente una segunda lista que pueda desincronizarse.

## Matriz de riesgos y prioridad

| Hallazgo | Impacto para visitante/negocio | Prioridad futura |
|---|---|---|
| Precio, entrega y renta sin vigencia | Decisiones basadas en información antigua o no comparable | Alta |
| Clasificación de renta inferida | Resultados engañosos y riesgo comercial/legal | Alta |
| Filtros sin URL | Enlaces y campañas no reproducen el resultado prometido | Alta |
| Estado vacío inexistente | Apariencia de error o catálogo sin cargar | Alta |
| Drawer y listboxes no accesibles | Usuarios de teclado no pueden operar filtros de forma fiable | Alta |
| Mezcla ES/EN | Reduce credibilidad y claridad | Media |
| Objeto completo en cliente | Más JavaScript y coste de hidratación al crecer el modelo | Media |
| Truncamientos mobile | Oculta política de renta y nombres largos | Media |
| Tres enlaces por tarjeta | Navegación de teclado repetitiva | Baja |
| Primera imagen lazy | Oportunidad de mejorar LCP | Baja |

## Recomendaciones por etapas

### Etapa 1 — Gobernanza antes de reconstruir

Objetivo: impedir que el futuro catálogo trate datos con distinta vigencia como equivalentes.

1. Definir una vista resumida derivada de la fuente canónica.
2. Exigir estado editorial para precio, entrega y renta.
3. Mostrar “sujeto a reconfirmación” o “consultar” cuando el campo no cumpla la política de publicación.
4. Registrar fuente, fecha, responsable y vigencia sin exponer documentos privados.
5. Definir categorías de renta explícitas, incluyendo “sin confirmar”; eliminar la inferencia por regex.

Criterio de salida: ningún filtro ni ordenamiento debe comparar como vigente un campo sin estado y fecha.

### Etapa 2 — Funcionalidad del catálogo

Objetivo: hacer que el resultado sea reproducible, comprensible y recuperable.

1. Sincronizar búsqueda, renta, precio y orden con parámetros URL documentados.
2. Leer el estado inicial desde la URL.
3. Añadir contador de resultados y anuncio accesible.
4. Diseñar estado vacío con resumen de filtros, restablecimiento y CTA a conversación.
5. Normalizar búsqueda para acentos, guiones y puntuación.
6. Mostrar sólo opciones de filtro respaldadas por datos, o incluir su cantidad y estado desconocido.

Criterio de salida: copiar, recargar o cambiar de idioma debe preservar una selección equivalente.

### Etapa 3 — Mobile, accesibilidad y performance

Objetivo: mejorar exploración sin cambiar la identidad visual aprobada.

1. Reemplazar los listboxes manuales por controles accesibles.
2. Implementar en el drawer foco inicial, focus trap, Escape, retorno de foco, scroll lock e inert del fondo.
3. Decidir entre aplicación en vivo o botón “Aplicar”; no mezclar ambos modelos.
4. Revisar qué información debe verse completa en cada tarjeta mobile.
5. Evaluar paginación, carga progresiva o agrupación editorial para reducir 20,9 pantallas.
6. Evitar el `<main>` anidado y el doble padding.
7. Cargar con prioridad la primera portada realmente visible y mantener lazy para el resto.
8. Reducir enlaces de teclado redundantes sin perder áreas clicables.

Criterio de salida: el catálogo debe poder buscarse y filtrarse completamente con teclado, sin perder foco ni desplazar el contenido de fondo.

## Evidencia técnica reproducible

Archivos que explican el comportamiento actual:

- `src/app/[locale]/proyectos/page.tsx`: estado local, filtrado, orden, drawer y tarjetas.
- `src/components/ProjectsFilters.tsx`: controles, opciones y eventos de interacción.
- `src/utils/rentalPolicyForFilter.ts`: derivación textual de política de renta.
- `src/data/projects/index.ts`: combinación del catálogo y exclusión temporal.
- `src/data/types.ts`: modelo legacy sin campos de gobernanza.
- `src/data/projects/public-slugs.generated.ts`: manifiesto de 36 slugs públicos.

Pruebas realizadas:

- ES/EN en 1440×900 y 390×844;
- búsqueda con y sin resultados;
- URL con parámetros no soportados;
- teclado en listboxes y drawer;
- Escape, foco, scroll de fondo y retorno de foco;
- conteo y carga de las 36 tarjetas;
- HTTP de 36 fichas por dos idiomas;
- carga completa de las 36 portadas;
- consola, errores de página y overflow horizontal.

## Conclusión

La página Proyectos cumple hoy su función básica de inventario y acceso: publica 36 tarjetas y permite entrar a las seis fichas prioritarias sin enlaces rotos. El problema principal no es de disponibilidad técnica, sino de **gobernanza, reproducibilidad y credibilidad**.

Fase 3A debe mantener el catálogo estable y concentrarse en las seis fichas prioritarias. La reconstrucción del catálogo sólo debe comenzar cuando exista una fuente resumida con estados editoriales y reglas claras para precio, entrega y renta. Hacerlo antes consolidaría filtros y comparaciones sobre datos que todavía no tienen vigencia demostrable.

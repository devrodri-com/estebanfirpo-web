# Fase 2 — Continuidad, dirección visual y prototipo de Home

## 1. Principio de continuidad

El prototipo evoluciona EstebanFirpo.com; no reemplaza su identidad por una plantilla nueva. La decisión base es conservar los códigos que ya hacen reconocible el sitio —navy, marfil, dorado discreto, presencia de Esteban, Miami, composición limpia y contacto directo— y cambiar sólo aquello que tiene un problema comprobable de respaldo, jerarquía, accesibilidad, consistencia o performance.

Ante una duda de marca, se mantiene la solución actual o se documenta una alternativa para revisión. Este prototipo no autoriza cambios definitivos de identidad, fotografía, claims, catálogo o material legal.

## 2. Concepto creativo recomendado

### Miami con criterio

Una dirección serena y personal donde el valor no proviene de ostentación, métricas grandes o promesas, sino de mostrar cómo Esteban ayuda a ordenar una decisión internacional.

La expresión visual combina:

- **Miami contemporáneo:** arquitectura, luz natural, agua y ciudad sin saturación de postal.
- **Criterio:** jerarquías claras, comparaciones breves y espacio suficiente para leer.
- **Cercanía:** Esteban aparece como persona de referencia, no como sello corporativo.
- **Premium sin ostentación:** materiales sobrios, contraste cuidado y dorado limitado a detalles.

## 3. Rasgos actuales que definen la identidad

- Azul navy `#0A2540` / `#0B1F3A` como color de autoridad y estructura.
- Marfil y blanco como base de lectura.
- Dorado `#D4AF37` como acento fino.
- Tipografía sans sobria, compacta y funcional.
- Nombre textual “Esteban Firpo · Miami Real Estate”.
- Retrato de Esteban como ancla humana.
- Imágenes de Miami, arquitectura y planificación.
- Radios moderados, contenedores amplios y paneles con poco ruido visual.
- Navegación bilingüe y acceso directo a contacto.

Estos rasgos se preservan. No se incorpora una nueva familia tipográfica ni una paleta ajena.

## 4. Clasificación de los elementos actuales

| Elemento | Clasificación | Intención actual | Problema o evidencia | Evolución propuesta |
|---|---|---|---|---|
| Navy, marfil y dorado | Conservar y refinar | Transmitir confianza y servicio premium | Dos navies y múltiples valores repetidos | Unificar tokens; mantener el dorado como acento, no como superficie dominante |
| Sans actual | Conservar | Lectura clara y contemporánea | La variable Geist estaba declarada sin una fuente cargada | Mantener un stack de sistema explícito; no introducir otra familia sin aprobación |
| Nombre textual de Esteban | Conservar | Dar una firma personal visible | Ninguno comprobable | Mantenerlo como marca primaria |
| Hero con Miami y Esteban | Reinterpretar | Ubicar mercado, categoría y persona | El claim domina a Esteban; la imagen pertenece al universo de Baccarat | Conservar composición y assets provisionalmente, pero centrar el mensaje en decisión y acompañamiento |
| Retrato de Esteban | Conservar y refinar | Humanizar y generar contacto | Se repite casi siempre con el mismo recorte circular | Mantener el retrato y ampliar su uso editorial, sin cambiar la imagen |
| Navegación navy y selector ES/EN | Conservar y refinar | Orientar y sostener identidad | Ocho enlaces compiten; mobile carecía de Escape, estado expandido y CTA | Simplificar jerarquía, mejorar teclado y añadir WhatsApp como acción principal |
| Trust row y ribbon | Reemplazar con justificación | Aportar confianza rápida | Mostraban REALTOR®, NAR, entregas, financiación e inventario no confirmados | Sustituir por nombre, afiliación, mercado, audiencia y contacto comprobados |
| Miami y Preconstrucción | Reinterpretar | Educar y derivar a contenidos profundos | Métricas y conclusiones no revisadas; longitud repetitiva | Un único bloque breve con beneficios posibles, riesgos, límites y enlaces |
| Banda de proyectos | Reemplazar con justificación | Llevar al catálogo | No mostraba proyectos y prometía selección semanal; filtros no se aplicaban | Cards de seis candidatos con nombre, ubicación general, imagen y reconfirmación |
| Storages en Home/nav/footer | Retirar por problema comprobable | Promover una segunda línea comercial | Diluye el foco aprobado y contiene claims sin revisión | Retirarlo sólo del prototipo; conservar ruta, página y datos intactos |
| Footer navy y contacto | Conservar y refinar | Cerrar con identidad y vías de contacto | Incluía credenciales no confirmadas y repetía toda la navegación | Mantener identidad/afiliación/contacto; retirar Storages y credenciales pendientes |
| CTA final independiente | Reinterpretar | Convertir al final de la página | Repetía otra banda navy y fragmentaba la conversión | Integrar FAQ y contacto en el octavo bloque |
| NAR, REALTOR®, métricas sin fecha y cita sin atribución | Retirar por problema comprobable | Probar autoridad y oportunidad | Falta evidencia documental o autoría | No usar hasta contar con documentación y aprobación |

## 5. Sistema visual propuesto

### Paleta

| Token | Valor | Uso |
|---|---|---|
| Navy principal | `#0A2540` | Navegación, CTA principal, texto de marca |
| Navy profundo | `#0B1F3A` | Footer y superficies oscuras puntuales |
| Dorado | `#D4AF37` | Línea, foco, numeración y acentos pequeños |
| Marfil | `#F6F5F0` | Fondo cálido y continuidad del hero |
| Papel | `#FBFAF7` | Fondo general |
| Tinta | `#0D1521` | Texto de lectura |

No se agrega un color de lujo alternativo. Los fondos oscuros quedan reservados al proceso y footer, donde ayudan a separar etapas.

### Tipografía y escala

- Stack sans de sistema actual; sin carga nueva.
- Titular Home: `41–70 px` según viewport, peso semibold y tracking moderadamente cerrado.
- H2: `30–48 px`.
- H3: `18–30 px` según función.
- Texto: `14–18 px`, línea `1.5–1.75`.
- Eyebrows: `11–12 px`, mayúsculas y tracking amplio.

### Espaciado y composición

- Base: múltiplos de `4 px`.
- Separación principal: `64 px` mobile y `96 px` desktop.
- Contenedor: máximo actual de aproximadamente `1152 px`.
- Grillas simples de dos o tres columnas; sin carruseles obligatorios.
- Ocho bloques reales; los subcomponentes no se convierten en nuevas secciones.

### Cards

- Fondo blanco o marfil, borde navy al 10%, radio `16 px`.
- Sombra amplia y muy suave, sin brillo dorado.
- Cards de proyecto en `4:3`, con foco de recorte definido cuando la portada no es horizontal.
- Nunca usar precio, entrega, renta o disponibilidad como badge hasta su revisión.

### Botones

- Primario: navy sólido con texto blanco; WhatsApp es la acción principal.
- Secundario: borde navy sobre fondo claro; agenda es la segunda acción.
- En fondo navy, el primario pasa a blanco con texto navy.
- Altura mínima `44–48 px`, foco visible y texto explícito.

### Fotografía

- Mantener retrato, hero responsive, imagen Miami y concepto de planos de Preconstrucción.
- Evitar renders sin contexto y galerías decorativas.
- Mostrar proyectos con una proporción común y recortes editoriales conscientes.
- La disponibilidad técnica de un archivo no prueba derechos de uso.

### Motion

- Sólo transiciones de color, sombra y desplazamiento de uno o dos píxeles.
- Sin parallax, autoplay, carruseles automáticos ni animaciones ornamentales.
- `prefers-reduced-motion` reduce todas las transiciones y desactiva scroll suave.

### Mobile

- Promesa y WhatsApp aparecen antes que información secundaria.
- Navegación con targets de 44 px, estado expandido, Escape y bloqueo del fondo.
- Cards en una columna; ningún contenido material depende de hover.
- Beneficios y riesgos permanecen visibles, no ocultos detrás de interacciones obligatorias.

## 6. Inventario de assets locales

### Identidad, social y contacto

| Activo | Dimensiones / peso | Uso actual | Calidad y utilidad | Acción futura |
|---|---:|---|---|---|
| `public/images/Esteban.jpg` | 1184×864 · 182.6 KiB | Home, Sobre mí, footer | Buena resolución; recorte flexible; Display P3 | Conservar; confirmar derechos y preparar derivados sRGB |
| `public/images/miamiliferealty_logo.png` | 350×87 · 40.9 KiB | Footer/Home de confianza | Correcto al tamaño actual; insuficiente para grandes ampliaciones | Conservar; solicitar original oficial/vector |
| `public/opengraph-image.jpg` | 1200×630 · 64.1 KiB | OG/Twitter global | Tamaño correcto y liviano; mismo contenido para todas las rutas | Conservar y refinar después de aprobar identidad social |
| `icon-512.png` | 512×512 · 344.8 KiB | Manifest | Monograma EF reconocible; peso alto | Conservar y optimizar más adelante |
| `icon-192.png` | 192×192 · 53.9 KiB | Manifest | Correcto | Conservar |
| `apple-touch-icon.png` | 180×180 · 48.0 KiB | Layout | Correcto | Conservar |
| `favicon.ico` | 48×48 · 14.7 KiB | Layout | Correcto | Conservar |
| `favicon-96x96.png` | 96×96 · 13.9 KiB | Sin referencia explícita | Coherente con el monograma | Revisar necesidad antes de retirar |
| `icons/whatsapp.svg` | 5.4 KiB | Fichas de proyecto | Nítido; contiene atribución de Streamline | Confirmar licencia comercial |

### Iconografía

- El prototipo de Home, navegación y footer utiliza Lucide con trazo simple y tamaños consistentes; se conserva como base provisional porque acompaña la sobriedad actual sin introducir una nueva firma de marca.
- La página Sobre mí usa Heroicons y filtros y fichas contienen SVG inline. Funcionan, pero forman un sistema fragmentado. No se refactorizan en esta fase para evitar ampliar el alcance.
- `icons/whatsapp.svg` sigue activo en las fichas y conserva atribución de Streamline en el archivo. Antes de unificar la iconografía debe confirmarse su licencia comercial y decidir si el símbolo oficial de WhatsApp requiere un tratamiento específico.
- Una futura normalización debe definir una sola familia base, tamaños, grosor, estados de foco y usos permitidos; no justifica por sí sola reemplazar iconos funcionales hoy.

### Hero institucional

| Activo | Dimensiones / peso | Evaluación |
|---|---:|---|
| `hero-fallback.jpg` | 1920×927 · 1.44 MiB | Buena composición desktop y espacio para copy. Misma escena que la portada de Baccarat; confirmar derechos y neutralidad |
| `hero-fallback-mobile.jpg` | 1080×1920 · 1.20 MiB | Art direction mobile real y valioso; mantener como patrón, sujeto a la misma confirmación |

Se conserva el par responsive durante el prototipo. Si no se confirman derechos o neutralidad institucional, debe reemplazarse por fotografía propia o neutral manteniendo esta composición y no por una razón puramente estética.

### Miami

| Activo | Dimensiones / peso | Uso / evaluación |
|---|---:|---|
| `miami-hero.jpg` | 1536×1024 · 983.3 KiB | Activo; tono cálido, baranda dorada y ciudad desenfocada coherentes. Conservar |
| `miami-hero1.jpg` | 1536×1024 · 440.3 KiB | Sin uso; no incorporar sólo por variedad |
| `miami-hero2.jpg` | 2560×1440 · 991.3 KiB | Sin uso |
| `miami-hero3.jpg` | 3840×2160 · 1.21 MiB | Sin uso; resolución excesiva para web actual |
| `miami-hero4.jpg` | 2068×1164 · 271.0 KiB | Sin uso |
| `miami-hero5.jpg` | 1280×720 · 329.3 KiB | Sin uso |
| `miami-hero6.jpg` | 1920×800 · 602.9 KiB | Sin uso; formato panorámico |
| `miami-hero7.jpg` | 4000×1250 · 986.7 KiB | Sin uso; resolución excesiva |
| `miami-hero8.jpg` | 2352×720 · 1.03 MiB | Sin uso |
| `miami-hero9.jpg` | 1536×1024 · 707.7 KiB | Sin uso |
| `miami-hero10.jpg` | 1536×1024 · 763.2 KiB | Sin uso |
| `miami-hero12.jpg` | 2040×660 · 685.5 KiB | Sin uso |
| `miami-hero13.jpg` | 1536×1024 · 1.32 MiB | Sin uso |

Las doce alternativas no usadas suman aproximadamente 9.2 MiB y mezclan estilos incompatibles. No se eliminan en esta fase; primero deben revisarse derechos y función.

### Preconstrucción

| Activo | Dimensiones / peso | Uso / evaluación |
|---|---:|---|
| `precon-hero.jpg` | 1536×1024 · 1.03 MiB | Activo; planos, regla y lápiz comunican planificación. Conservar y optimizar |
| `precon-hero1.jpg` | 1536×1024 · 979.2 KiB | Sin uso; variante del mismo concepto |
| `precon-hero2.jpg` | 1536×1024 · 893.0 KiB | Sin uso |
| `precon-hero3.jpg` | 1536×1024 · 933.0 KiB | Sin uso |
| `precon-heros.jpg` | 1536×1024 · 935.1 KiB | Sin uso; nombre inconsistente |

### Storages

| Activo | Dimensiones / peso | Uso / evaluación |
|---|---:|---|
| `images/storages/callaway-hero.jpg` | 1536×1024 · 393.0 KiB | Página Storages; calidad suficiente. Conservar sin promover |

### Portadas locales de proyectos

| Activo | Dimensiones | Estado |
|---|---:|---|
| `2200-brickell.webp` | 800×480 | Legacy; definición consolidada usa una portada remota |
| `26-and-2nd.webp` | 1351×760 | Portada activa y suficiente |
| `72-park.webp` | 1384×1418 | Legacy; riesgo de recorte vertical |
| `7200-collins.webp` | 1000×600 | Legacy |
| `baccarat.webp` | 1778×936 | Legacy |
| `cipriani.webp` | 1920×1080 | Portada activa |
| `domus-brickell-park.webp` | 1600×1600 | Portada activa; necesita foco de recorte |
| `ella.webp` | 1728×976 | Portada activa |
| `flow-house.webp` | 1000×600 | Portada activa |
| `nexo.webp` | 500×300 | Legacy; resolución limitada si volviera a usarse |
| `one-park-tower.webp` | 1024×768 | Legacy |

No se eliminan archivos legacy todavía: algunos siguen en la fuente base antes de ser sobrescritos por módulos consolidados.

### Restos del starter

`file.svg`, `globe.svg`, `next.svg`, `vercel.svg` y `window.svg` no tienen referencias ni función de marca. Son candidatos a retiro posterior, pero no se eliminan durante este prototipo.

## 7. Biblioteca remota de proyectos

El inventario técnico completo está en `docs/phase-2-project-asset-inventory.tsv`:

- 306 URLs únicas: 31 portadas remotas y 275 imágenes de galería. Otras cinco portadas activas son locales y se listan arriba.
- 306 respuestas HTTP 200 durante la auditoría del 12 de julio de 2026; cero fallos.
- 110.3 MiB de archivos de origen.
- 284 horizontales, 12 verticales y 10 cuadradas.
- Todas las respuestas inspeccionadas entregaron JPEG, aun cuando algunas URLs terminan en `.webp` o `.png`.
- Ninguna imagen se considera autorizada sólo porque responde correctamente.

El TSV registra fecha de auditoría, respuesta HTTP, rol, dimensiones, formato, peso, evaluación técnica de calidad, riesgo de recorte y acción futura para cada URL. Es una auditoría técnica, no una aprobación editorial o de derechos. La colección mezcla fachadas, interiores, parques, amenities, vistas aéreas y formatos distintos. La fase de gobernanza debe añadir fuente, derechos, responsable, aprobación, vigencia, tipo editorial de imagen y un foco de recorte aprobado.

## 8. Candidatos de Home y diferencias de nombre

| Candidato pedido | Nombre actual del catálogo | Slug | Ubicación general usada | Portada / recorte |
|---|---|---|---|---|
| The William | The William Residences | `/proyectos/the-william` | North Miami Beach | 1280×1574; vertical, foco superior definido |
| Frida Kahlo Wynwood Residences | Igual | `/proyectos/frida-kahlo` | Wynwood, Miami | 1200×800; horizontal |
| 26 & 2nd | Twenty Six & 2nd (Wynwood) | `/proyectos/26-and-2nd` | Wynwood, Miami | 1351×760; local |
| Seven Park Residences | Igual | `/proyectos/seven-park` | Hallandale Beach | 1600×955; horizontal |
| Oasis Hallandale | Igual | `/proyectos/oasis-hallandale` | Hallandale Beach | 2048×1079; horizontal |
| Midtown Park | Igual | `/proyectos/midtown-park` | Miami | 1024×1024; cuadrada |

Las cards no muestran precio, entrega, renta, financiación, actividad ni recomendación definitiva. La selección es prioritaria para revisión, no una certificación.

## 9. Disclosure: diferencia encontrada y propuesta editorial

El disclosure general aparece duplicado en archivos HTML de referencia, pero ES y EN no son equivalentes:

- ES menciona porcentajes de rentabilidad y contenido prospectivo sujeto a riesgos e incertidumbres.
- EN agrega ausencia de garantías y due diligence, falta de evaluación de factibilidad/idoneidad, responsabilidad independiente del comprador y limitación de responsabilidad.

No debe presentarse ninguna de las versiones actuales como traducción legal equivalente. La siguiente propuesta armoniza el sentido de ambos textos y requiere aprobación profesional antes de publicarse como disclosure completo.

### Borrador ES para revisión

> Este material tiene fines informativos. Cualquier referencia a rentabilidad, apreciación, renta u otros resultados es prospectiva, se basa en información y supuestos disponibles a la fecha y puede variar por riesgos e incertidumbres. Miami Life Realty no garantiza resultados ni afirma haber realizado due diligence sobre cada oportunidad. La información no constituye una evaluación de factibilidad, viabilidad o idoneidad para un comprador. Cada comprador debe realizar su propia due diligence, evaluar riesgos y consultar a sus asesores antes de decidir. No debe tomarse una decisión basándose exclusivamente en este material.

### Draft EN for review

> This material is for informational purposes. Any reference to returns, appreciation, rental income, or other outcomes is forward-looking, based on information and assumptions available as of the applicable date, and may vary due to risks and uncertainties. Miami Life Realty does not guarantee results or represent that it has performed due diligence on every opportunity. The information is not an assessment of feasibility, viability, or suitability for any buyer. Each buyer should conduct independent due diligence, assess the risks, and consult their advisers before deciding. No decision should be based solely on this material.

### Aclaración breve usada en el prototipo

- ES: “Información y disponibilidad sujetas a reconfirmación.”
- EN: “Information and availability subject to reconfirmation.”

## 10. Shot list para una futura sesión

1. Retrato vertical limpio, mirada a cámara, fondo neutro cálido.
2. Retrato horizontal con espacio negativo para copy.
3. Esteban en conversación real con una persona, sin poses de venta.
4. Esteban revisando planos o comparaciones en mesa.
5. Esteban caminando en un entorno urbano reconocible pero no turístico de Miami.
6. Detalles de trabajo: manos, documentos, videollamada y notas.
7. Imagen institucional propia de Miami/arquitectura para reemplazar el render específico del hero si fuera necesario.
8. Variantes vertical, horizontal y cuadrada de cada escena, con permisos de web, redes y anuncios documentados.

## 11. Cambios del prototipo y justificación

| Cambio | Mejora |
|---|---|
| Hero centrado en Esteban y la decisión | Estrategia y conversión: aclara quién, para quién, mercado, valor y próximo paso |
| WhatsApp primario, agenda secundaria | Conversión: refleja el canal aprobado y reduce competencia entre CTA |
| Confianza basada en hechos confirmados | Consistencia y riesgo editorial: elimina credenciales y métricas pendientes |
| Ocho bloques reales | Mobile y comprensión: evita una Home enciclopédica |
| Seis cards con aclaración neutral | Utilidad: hace tangible la selección sin certificar datos comerciales |
| Preconstrucción + Miami en un bloque | Jerarquía: ofrece contexto sin repetir cifras o promesas |
| Navegación mobile accesible | Accesibilidad: targets, estado, Escape y bloqueo de fondo |
| Un único candidato de imagen LCP por viewport | Performance: reduce competencia de descargas y layout shift |
| Reduced motion global | Accesibilidad y confort |
| Tokens semánticos sin nueva paleta | Consistencia: evoluciona el sistema sin cambiar identidad |

## 12. Decisiones que requieren aprobación

- Derechos y neutralidad institucional del hero actualmente asociado a Baccarat.
- Derechos del retrato y versiones finales aprobadas.
- Archivo oficial/vector de Miami Life Realty y reglas de uso.
- Licencia comercial del icono de WhatsApp.
- Revisión profesional del disclosure armonizado ES/EN.
- Confirmación de que los seis proyectos siguen siendo candidatos prioritarios antes de una fase pública.
- Criterios y responsables para gobernar portadas, galerías y recortes.
- Decisión futura sobre alternativas Miami/Precon no usadas y restos del starter.

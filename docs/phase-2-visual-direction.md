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

## 9. Disclosure: fuente proporcionada y publicación diferenciada

El Product Owner proporcionó el disclosure que aparece duplicado en `frida.html`, `the-standard-brickell.html` y `Viceroy.html`. Las fuentes ES y EN no son equivalentes:

- ES menciona porcentajes de rentabilidad y contenido prospectivo sujeto a riesgos e incertidumbres.
- EN agrega ausencia de garantías y due diligence, falta de evaluación de factibilidad/idoneidad, responsabilidad independiente del comprador y limitación de responsabilidad.

Cada versión se incorpora literalmente en su idioma dentro de la opción expandible del footer. No se presenta una como traducción legal de la otra y no se armonizan sus alcances sin una fuente aprobada que autorice ese cambio.

### Texto ES proporcionado

> Cierto material publicitario presenta porcentajes de rentabilidad obtenida en un periodo determinado de tiempo, expresadas en una base de tiempo mensual o anual. El material publicitario puede contener información prospectiva y que, por ende, está basada en expectativas y proyecciones actuales sobre eventos y tendencias futuras, con probabilidad de variación, y en todo momento se encuentra sujeta a riesgos, incertidumbres y otro tipo de factores.

### Provided EN text

> The information included with this communication and marketing material is intended solely for informational purposes. Miami Life Realty explicitly disclaims any representations or warranties, express or implied, as to the profitability of the real estate investment opportunity mentioned herein. Miami Life Realty has not performed any due diligence on the real estate investment opportunity and makes no representations about its feasibility, financial viability, or suitability for investment purposes. The decision to invest shall be made independently by each prospective buyer after appropriate due diligence and consideration for the profitability and commercial risks of the real estate investment. Prospective buyers are to perform their own independent valuations of risks and commercial viability in determining whether to undertake such investment opportunity. Miami Life Realty disclaims any responsibility for your reliance on the information provided herein.

### Aclaración breve usada en el prototipo

- ES: “Información comercial, condiciones y disponibilidad sujetas a reconfirmación.”
- EN: “Commercial information, terms, and availability subject to reconfirmation.”

El resumen visible del footer no sustituye el disclosure completo. Si las fuentes originales siguen sin ser equivalentes, ES y EN deben conservarse como textos diferenciados y no completarse por inferencia editorial.

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

## 12. Comparación del hero sin cambio de implementación

Las capturas A/B mantienen exactamente la misma composición, copy, overlay, CTAs y tarjeta de Esteban. La Opción B se aplicó únicamente en el DOM de una sesión de navegador para producir la evidencia; el código y el Preview conservan la Opción A.

| Criterio | Opción A — responsive actual | Opción B — `miami-hero13.jpg` |
|---|---|---|
| Activos | `hero-fallback.jpg` desktop y `hero-fallback-mobile.jpg` mobile | Un único activo existente para ambos viewports |
| Dimensiones | 1920×927 desktop; 1080×1920 mobile | 1536×1024 |
| Peso de origen | 1.44 MiB desktop; 1.20 MiB mobile | 1.32 MiB; entrega final sujeta al optimizador de Next.js |
| Legibilidad | Alta: la arquitectura deja áreas amplias y el overlay actual controla el contraste | Alta con el mismo overlay; en mobile la palma aporta más textura detrás del texto, pero conserva contraste suficiente |
| Recorte desktop | Relación 2.07:1, cercana al encuadre visible del hero; pérdida mínima | Relación 1.5:1; el encuadre aproximado 2:1 recorta cerca de 25% de la altura total, conservando palma, skyline y arquitectura |
| Recorte mobile | Variante vertical con art direction propia y pérdida mínima | Usa aproximadamente el 39% central del ancho; conserva palma y skyline y pierde casi toda la fachada lateral |
| Identidad | Muy alineada con el lenguaje arquitectónico premium existente | Mantiene Miami contemporáneo y la paleta natural, aunque introduce verde y un tono más lifestyle |
| Riesgo de confusión | Alto: la escena coincide con el universo visual y la portada de Baccarat | Bajo: no se identifica un desarrollo concreto; procedencia, derechos y ubicación exacta siguen pendientes |

La Opción A permanece implementada porque ofrece mejor art direction responsive y continuidad. La Opción B demuestra una alternativa más neutral, pero no debe aprobarse para uso definitivo hasta confirmar procedencia, derechos y desempeño del recorte mobile.

## 13. Decisiones que requieren aprobación

- Derechos y neutralidad institucional del hero actualmente asociado a Baccarat.
- Derechos del retrato y versiones finales aprobadas.
- Archivo oficial/vector de Miami Life Realty y reglas de uso.
- Licencia comercial del icono de WhatsApp.
- Confirmación profesional de los disclosures ES/EN proporcionados y de su diferencia de alcance.
- Confirmación de que los seis proyectos siguen siendo candidatos prioritarios antes de una fase pública.
- Criterios y responsables para gobernar portadas, galerías y recortes.
- Decisión futura sobre alternativas Miami/Precon no usadas y restos del starter.

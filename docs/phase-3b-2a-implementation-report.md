# Fase 3B.2A — Implementación unificada no pública

**Estado:** implementación y QA aprobados en Preview; sin cambios en rutas públicas, rama remota o producción.  
**Preview:** `https://estebanfirpo-bjw5ypnxg-softbms-projects.vercel.app`  
**Contrato:** 36 proyectos × 2 idiomas × 16 funciones.

## 1. Consultas puntuales

### Cassia

Dropbox no está disponible en el equipo: no existe `~/Dropbox` y `~/Library/CloudStorage` no contiene una sincronización utilizable. Tampoco se encontró localmente un price sheet, inventory sheet o availability sheet de Cassia.

El historial Git no resuelve la contradicción: el commit inicial `2416b3ddaddd8bd139d20cac94429ee7cf5ec946` introdujo al mismo tiempo `priceFromUsd: 773000` y el FAQ de aproximadamente US$823.000.

Tratamiento temporal implementado:

- ES: **Consultar precio e inventario vigente**;
- EN: **Inquire about current pricing and inventory**;
- se conserva la pregunta FAQ y se sustituye únicamente la respuesta contradictoria.

Para publicar una cifra única, Rodrigo debe proporcionar el último `Price Sheet`, `Inventory Sheet` o `Availability Sheet` de **Cassia – The Residences at Coral Gables**, emitido por el developer o el equipo de ventas, con fecha o versión y el precio inicial de la unidad disponible.

### NoMad Wynwood

El PDF local encontrado es una captura de la ficha web anterior creada el 28 de septiembre de 2025; no es un documento primario del developer y muestra Q4 2025.

El historial Git sí resuelve la cronología: el commit `9b2a39cadb1b3395c4f61e94b8f63cd340747a18`, del 1 de febrero de 2026 y titulado `fix delivery of Nomad`, cambió explícitamente la entrega de Q4 2025 a 2026. El FAQ había quedado desactualizado.

Tratamiento implementado:

- conservar **2026** en ES/EN;
- alinear únicamente la respuesta FAQ;
- no utilizar fallback de consulta;
- no requerir Dropbox para esta migración.

## 2. Arquitectura implementada

```text
ALL_PROJECTS efectivo
        │
        ▼
adaptLegacyProject (server-only)
        │  lista blanca pública ES/EN
        ▼
CanonicalProjectViewModel
        │
        ▼
CanonicalProjectPage (Server Component único)
        ├── GalleryLightbox (isla cliente)
        ├── ShareLink (isla cliente)
        └── LocationMap (isla cliente)
        │
        ▼
/{locale}/project-template-preview/{slug}
Preview: 200 · Production: 404
```

Principios aplicados:

- una sola plantilla y ningún tratamiento visual por slug;
- adapter y catálogo protegidos con `server-only`;
- proyección explícita por lista blanca, sin fuentes, contradicciones, rutas locales ni estados editoriales;
- CTAs derivados de `src/lib/site.ts`;
- rutas, slugs, arrays y orden del baseline preservados;
- fallbacks sólo ante carencia o contradicción registrada;
- header y footer reales, `noindex`, canonical público y exclusión de navegación/sitemap.

## 3. Resultado de la matriz

| Estado | Registros |
|---|---:|
| `preserve` | 559 |
| `qualify` | 6 |
| `request` | 9 |
| `needs_content` | 2 |
| `omit_optional` | 0 |

Los cinco fallbacks de condición que eran innecesarios se sustituyeron por síntesis del contenido ya publicado:

- Oasis Hallandale;
- Faena;
- Jean-Georges Tropic;
- Gaia Residences;
- Nickelodeon Orlando.

Sólo Midtown Park y Viceroy mantienen consulta de condición por carencia real, además del tratamiento ya aprobado para The William.

## 4. Casos límite: ficha actual → plantilla nueva

| Proyecto | Contenido preservado | Diferencia justificada |
|---|---|---|
| The William | Hero, galería 4/4, amenidades 6/6, tipologías, características, FAQ, ubicación y CTAs. | Precio, condición y plan pasan a consulta aprobada; entrega 2029, renta 90 días y tres métricas estructuradas. |
| Ambar | Todos los arrays, plan, FAQ, galería y CTAs. | Entrega ausente pasa a “Consultar entrega estimada”. |
| One Park Tower | Contenido y orden completos. | Plan vacío pasa a solicitud; entrega 2025 se conserva con una aclaración única. |
| Twenty Six & 2nd | Galería, amenidades, tipologías, características, plan, mapa y CTAs. | FAQ ausente muestra un estado útil, sin inventar respuestas. |
| Viceroy | Galería 8/8, incluido el hero repetido, amenidades, tipologías, FAQ y plan. | Características ausentes mantienen solicitud de materiales; condición ausente mantiene consulta. |
| Faena | Ocho imágenes, ocho amenidades, dos tipologías, cuatro características, ocho FAQ, siete pasos y cinco métricas. | Renta ausente mantiene consulta; condición existente se sintetiza sin degradarla. |
| Gaia | Galería 8/8, doce amenidades, nueve características, once FAQ y seis pasos. | Se preserva la disponibilidad de paquetes de mobiliario opcionales. |
| Cassia | Todos los bloques y arrays. | Precio y respuesta FAQ usan consulta hasta resolver 773k/823k. |
| NoMad | Todos los bloques y arrays. | Sólo se alinea el FAQ con la entrega 2026 corregida en Git. |

Los 36 mapas preservan la query pública actual, renderizan iframe y mantienen el enlace externo. El fallback visual nunca deja un contenedor vacío.

## 5. Validaciones

| Gate | Resultado |
|---|---|
| ESLint | Aprobado, 0 errores y 0 warnings. |
| TypeScript | Aprobado con `tsc --noEmit`. |
| Build normal | Aprobado; 98 páginas estáticas, incluidas las 72 variantes privadas. |
| Build con `VERCEL_ENV=production` | Aprobado. |
| Guard de producción | 72/72 rutas privadas devuelven 404; Home y fichas públicas de control devuelven 200. |
| `npm audit` | 0 vulnerabilidades. |
| Matriz | 36 × 16 = 576 registros; header, estados globales y estados por función congelados. |
| View models | 36 ES + 36 EN = 72; allowlist, serialización, paridad, CTAs, imágenes y preservación aprobadas. |
| Preview | Target `Preview`, estado `Ready`, 72/72 rutas autenticadas en 200. |
| Browser QA | Desktop 1440×900 y mobile 390×844; sin overflow, errores de consola, imágenes rotas ni fallos de recursos de la aplicación. |
| Accesibilidad | Lightbox, flechas, Escape, focus trap, retorno de foco entre breakpoints y FAQ por teclado aprobados. |
| Mapas | Iframe y enlace externo presentes; mapa de The William comprobado visualmente. |
| Producción | Deployment `dpl_7Yg4eGj5mib8p2kA1yPde8JdwVKu`, target Production, Ready, sin cambios. |

La protección de Vercel provoca un `fetch` abortado del toolbar en cada sesión de Preview. Se identificó por su URL efímera de un único segmento y no corresponde a código, assets ni requests de la aplicación.

## 6. Pendientes antes del rollout atómico

1. Aprobar editorial y visualmente la plantilla común observando los 36 proyectos en Preview.
2. Resolver Cassia si se quiere publicar una cifra, mediante el documento puntual indicado; el fallback actual es seguro para migrar.
3. Confirmar que los textos breves de condición derivados del baseline para Oasis, Faena, Jean-Georges, Gaia y Nickelodeon son la síntesis preferida.
4. Autorizar explícitamente el cambio atómico de las 72 rutas públicas y su plan de rollback. Esta fase no lo realiza.
5. Mantener como control de gobernanza pendiente los derechos de imágenes y materiales; no bloquea la verificación técnica de la plantilla, pero sí cualquier sustitución o nueva publicación documental.

No quedan bloqueantes técnicos conocidos dentro del prototipo aislado.

# Fase 0: notas técnicas

## Rate limiting del formulario de contacto

La API de contacto conserva un límite de mejor esfuerzo en memoria de proceso. Este control reduce ráfagas repetidas que llegan a una misma instancia, pero no constituye un límite global confiable en un entorno serverless:

- cada instancia mantiene un `Map` independiente;
- un cold start, redeploy o reciclado de la instancia elimina el historial;
- solicitudes distribuidas entre instancias o regiones no comparten contadores;
- por lo tanto, el umbral configurado no puede garantizarse de forma atómica para todo el deployment.

La Fase 0 no agrega Redis, Upstash, variables de entorno ni otra infraestructura. Un límite global requerirá aprobar posteriormente un almacén compartido con operaciones atómicas y una política explícita de retención y privacidad para la clave del cliente.

## 404 localizada

La aplicación usa layouts raíz bajo el segmento dinámico `[locale]`. Para que una URL inexistente responda con estado 404, contenido ES/EN y el atributo `lang` correcto desde el HTML inicial, se habilita `experimental.globalNotFound` de Next.js 15.5 y se implementa `src/app/global-not-found.tsx`. El middleware contrasta los slugs de fichas con el mismo `ALL_PROJECTS` que usa el catálogo y dirige los slugs inexistentes a esa respuesta 404, sin duplicar ni modificar datos inmobiliarios. La opción `globalNotFound` es experimental en la versión actual y debe reevaluarse al actualizar Next.js.

## Referencias a assets locales inexistentes

La revisión compara las rutas locales literales usadas por el código con el contenido de `public/`. No se agregaron reemplazos ni se modificó el diseño.

| Referencia | Origen | Estado e impacto actual |
| --- | --- | --- |
| `/videos/hero-sora.webm` | `src/app/[locale]/page.tsx` | No existe. Es una fuente del video del hero de Home en ES/EN. |
| `/videos/hero-sora.mp4` | `src/app/[locale]/page.tsx` | No existe. Es la segunda fuente del mismo video del hero. |
| `/images/projects/domus-brickell-center.webp` | `src/data/projects.ts` | No existe. La lista pública consolidada reemplaza actualmente esta entrada legacy por una URL remota, pero la referencia local permanece insegura si se consume el catálogo base. |
| `/images/projects/mercedes-benz-places.webp` | `src/data/projects.ts` | No existe. La lista consolidada tiene una URL remota y este proyecto está oculto actualmente; la referencia legacy permanece. |
| `/images/projects/edge-house.webp` | `src/data/projects.ts` | No existe. La lista pública consolidada reemplaza actualmente esta entrada legacy por una URL remota, pero la referencia local permanece. |
| `/images/projects/okan-tower.webp` | `src/data/projects.ts` | No existe. La lista pública consolidada reemplaza actualmente esta entrada legacy por una URL remota, pero la referencia local permanece. |
| `/images/storages/callaway-1.jpg` | `src/data/storages/callaway.ts` | No existe. El array de galería no se renderiza en la página actual; el thumbnail activo usa `callaway-hero.jpg`, que sí existe. |
| `/images/storages/callaway-2.jpg` | `src/data/storages/callaway.ts` | No existe; referencia de galería actualmente no renderizada. |
| `/images/storages/callaway-3.jpg` | `src/data/storages/callaway.ts` | No existe; referencia de galería actualmente no renderizada. |
| `/images/projects/placeholder.webp` | `src/utils/projectsImport.ts` | No existe. Es un fallback de importación para filas sin imagen y no forma parte del flujo público actual. |

El hero de Home sí conserva `public/images/hero-fallback.jpg` y la variante móvil `public/images/hero-fallback-mobile.jpg`; por eso los videos faltantes no justifican inventar un reemplazo en esta fase. Resolver las fuentes de video y las referencias legacy requiere recibir assets aprobados o una decisión editorial posterior.

## Dependencias y auditoría

Se mantuvieron las líneas major autorizadas y se actualizaron a parches/minors seguros:

- `next` y `eslint-config-next`: `15.5.20`;
- `react` y `react-dom`: `19.1.8`;
- `next-intl`: `4.13.2`;
- `resend`: `6.17.2`.

Además, `postcss` queda fijado como dependencia directa y override en `8.5.14`, dentro de su misma línea major, porque Next 15.5.20 declara `8.4.31`, versión alcanzada por el advisory de XSS de PostCSS. La dependencia directa garantiza también la resolución segura en instalaciones `--omit=dev`; el override evita una migración major de Next.

La auditoría inicial reportó 11 paquetes vulnerables: 4 de severidad alta y 7 moderada. Después de las actualizaciones y correcciones transitivas, `npm audit` reporta 0 vulnerabilidades conocidas.

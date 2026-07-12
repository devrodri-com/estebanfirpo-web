# Fase 0: notas técnicas

## Rate limiting del formulario de contacto

La API de contacto conserva un límite de mejor esfuerzo en memoria de proceso. Este control reduce ráfagas repetidas que llegan a una misma instancia, pero no constituye un límite global confiable en un entorno serverless:

- cada instancia mantiene un `Map` independiente;
- un cold start, redeploy o reciclado de la instancia elimina el historial;
- solicitudes distribuidas entre instancias o regiones no comparten contadores;
- por lo tanto, el umbral configurado no puede garantizarse de forma atómica para todo el deployment.

La Fase 0 no agrega Redis, Upstash, variables de entorno ni otra infraestructura. Un límite global requerirá aprobar posteriormente un almacén compartido con operaciones atómicas y una política explícita de retención y privacidad para la clave del cliente.

## 404 localizada

La aplicación usa layouts raíz bajo el segmento dinámico `[locale]`. Para que una URL inexistente responda con estado 404, contenido ES/EN y el atributo `lang` correcto desde el HTML inicial, se habilita `experimental.globalNotFound` de Next.js 15.5 y se implementa `src/app/global-not-found.tsx`. El middleware contrasta las fichas contra un manifiesto generado de slugs públicos y dirige los slugs inexistentes a esa respuesta 404, sin importar ni duplicar manualmente los objetos inmobiliarios. La opción `globalNotFound` es experimental en la versión actual y debe reevaluarse al actualizar Next.js.

## Sitemap y validación del catálogo

El sitemap incluye las rutas institucionales en español e inglés, incluidos `/es/proyectos` y `/en/proyectos`, pero omite temporalmente las fichas `/[locale]/proyectos/[slug]` hasta completar la validación editorial del catálogo. Las fichas permanecen accesibles y este cambio no modifica sus páginas, metadata, directivas de robots ni estado de indexación. Se reincorporarán al sitemap cuando sus datos, fechas, precios, condiciones y claims hayan sido validados.

El comando `npm run catalog:slugs`, ejecutado automáticamente antes de desarrollo y build, genera `src/data/projects/public-slugs.generated.ts` desde el mismo `ALL_PROJECTS` consolidado que consume la web. El middleware importa solamente ese manifiesto liviano; no carga textos, imágenes, precios, galerías ni planes de pago, y no existe una lista manual que pueda quedar desincronizada. Durante la futura gobernanza del catálogo, el generador deberá consumir la fuente editorial canónica aprobada.

En el build local de Next.js 15.5 con Turbopack, el tamaño reportado del middleware bajó de 92,7 kB a 50,8 kB. Sus archivos Edge pasaron de 326.195 a 167.839 bytes sin comprimir; el chunk principal bajó de 89.052 a 46.948 bytes comprimido con gzip. El sourcemap ya no incluye los módulos completos de proyectos: contiene únicamente el manifiesto generado.

## Referencias a assets locales inexistentes

La revisión compara las rutas locales literales usadas por el código con el contenido de `public/`. No se agregaron reemplazos ni se modificó el diseño.

| Referencia | Origen | Estado e impacto actual |
| --- | --- | --- |
| `/images/projects/domus-brickell-center.webp` | `src/data/projects.ts` | No existe. La lista pública consolidada reemplaza actualmente esta entrada legacy por una URL remota, pero la referencia local permanece insegura si se consume el catálogo base. |
| `/images/projects/mercedes-benz-places.webp` | `src/data/projects.ts` | No existe. La lista consolidada tiene una URL remota y este proyecto está oculto actualmente; la referencia legacy permanece. |
| `/images/projects/edge-house.webp` | `src/data/projects.ts` | No existe. La lista pública consolidada reemplaza actualmente esta entrada legacy por una URL remota, pero la referencia local permanece. |
| `/images/projects/okan-tower.webp` | `src/data/projects.ts` | No existe. La lista pública consolidada reemplaza actualmente esta entrada legacy por una URL remota, pero la referencia local permanece. |
| `/images/storages/callaway-1.jpg` | `src/data/storages/callaway.ts` | No existe. El array de galería no se renderiza en la página actual; el thumbnail activo usa `callaway-hero.jpg`, que sí existe. |
| `/images/storages/callaway-2.jpg` | `src/data/storages/callaway.ts` | No existe; referencia de galería actualmente no renderizada. |
| `/images/storages/callaway-3.jpg` | `src/data/storages/callaway.ts` | No existe; referencia de galería actualmente no renderizada. |
| `/images/projects/placeholder.webp` | `src/utils/projectsImport.ts` | No existe. Es un fallback de importación para filas sin imagen y no forma parte del flujo público actual. |

El hero de Home utiliza únicamente `public/images/hero-fallback.jpg` y la variante móvil `public/images/hero-fallback-mobile.jpg`. En la Fase 0.1 se retiró el elemento de video obsoleto que solicitaba dos fuentes inexistentes; no se generaron ni incorporaron videos. Resolver las referencias legacy restantes requiere recibir assets aprobados o una decisión editorial posterior.

## Dependencias y auditoría

Se mantuvieron las líneas major autorizadas y se actualizaron a parches/minors seguros:

- `next` y `eslint-config-next`: `15.5.20`;
- `react` y `react-dom`: `19.1.8`;
- `next-intl`: `4.13.2`;
- `resend`: `6.17.2`.

Además, `postcss` queda fijado como dependencia directa y override en `8.5.14`, dentro de su misma línea major, porque Next 15.5.20 declara `8.4.31`, versión alcanzada por el advisory de XSS de PostCSS. La dependencia directa garantiza también la resolución segura en instalaciones `--omit=dev`; el override evita una migración major de Next.

La auditoría inicial reportó 11 paquetes vulnerables: 4 de severidad alta y 7 moderada. Después de las actualizaciones y correcciones transitivas, `npm audit` reporta 0 vulnerabilidades conocidas.

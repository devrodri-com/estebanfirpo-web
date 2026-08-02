# Esteban Firpo — Miami Real Estate

## Descripción

Sitio inmobiliario bilingüe (español e inglés) orientado a compradores e inversores internacionales interesados en Miami. Presenta proyectos, contexto sobre Miami y preconstrucción, alternativas de financiación, el perfil de Esteban Firpo y un canal de contacto. La relación pública de Esteban con Miami Life Realty se refleja en el sitio.

## Stack

- Next.js 15 con App Router y React 19.
- TypeScript.
- Vitest para tests unitarios en Node y tests selectivos de componentes en jsdom.
- Tailwind CSS 4.
- `next-intl` para internacionalización ES/EN.
- Resend y Zod para el flujo server-side de contacto.
- Vercel para Preview y Production.

Las versiones exactas y sus restricciones están en [`package.json`](package.json) y [`package-lock.json`](package-lock.json).

## Requisitos

- Node.js 22.x, versión recomendada para reproducir el baseline actual de desarrollo local, GitHub Actions y builds de Vercel.
- npm compatible con el lockfile v3 versionado.

Node.js 22.x es el baseline vigente para desarrollo local. GitHub Actions utiliza Node.js 22 y Vercel utiliza Node.js 22.x, por lo que ambos entornos de validación y build quedan alineados.

## Instalación local

```bash
npm ci
npm run dev
```

El sitio queda disponible en `http://localhost:3000`. No se deben copiar secretos ni archivos `.env.local` entre entornos.

## Variables de entorno

La plantilla versionada está en [`.env.example`](.env.example). Los valores reales se configuran localmente o en Vercel y no pertenecen al repositorio.

| Variable | Exposición | Requisito | Propósito y comportamiento si falta |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | Server-only | Requerida para entregar mensajes | Autentica el envío de Contacto. El sitio puede compilar sin ella, pero un envío válido por `/api/contact` falla de forma controlada. |
| `NEXT_PUBLIC_SITE_URL` | Pública | Opcional | Define la URL base de metadata. Si falta o es inválida, el código usa el dominio público canónico configurado como fallback. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Pública | Opcional para el sitio | Identifica Google Analytics. Su ausencia no bloquea render ni build, pero no permite tracking útil. |
| `NEXT_PUBLIC_IMAGEKIT_BASE_URL` | Pública | Opcional en el contenido activo | Base del loader de ImageKit para rutas relativas. Las URLs absolutas y assets locales actuales no la requieren; una ruta relativa sí. |

Toda variable con prefijo `NEXT_PUBLIC_` queda expuesta al navegador y nunca debe contener secretos.

## Scripts

| Script | Propósito | ¿Modifica archivos? | Cuándo ejecutarlo |
| --- | --- | --- | --- |
| `npm run dev` | Inicia Next.js en desarrollo con Turbopack. | Puede actualizar el manifiesto de slugs mediante `predev`. | Desarrollo local. |
| `npm run build` | Genera el build de producción con Turbopack. | Genera `.next` e invoca `prebuild`, que puede actualizar el manifiesto tracked de slugs si quedó desfasado. | Antes de publicar cambios. |
| `npm run start` | Sirve un build ya generado. | No modifica archivos tracked. | Smoke local posterior al build. |
| `npm run lint` | Ejecuta ESLint. | No. | Validación rápida. |
| `npm run type-check` | Ejecuta TypeScript sin emitir archivos. | No. | Validación rápida y CI. |
| `npm run test` | Ejecuta una vez la suite de Vitest: tests unitarios en Node y tests selectivos de componentes en jsdom. | No. | Validación local y CI. |
| `npm run test:watch` | Ejecuta la misma suite de Vitest en modo watch. | No. | Desarrollo local de tests. |
| `npm run validate` | Agrupa lint, TypeScript, la suite de Vitest, catálogo y matriz/modelos. | No, si los artefactos versionados están sincronizados. | Gate local principal. |
| `npm run catalog:check` | Valida slugs, políticas de renta, filtros, orden y estado inicial del catálogo. | No. | Al cambiar catálogo o filtros. |
| `npm run phase3b:check` | Verifica la matriz y los 72 view models localizados. | No. | Al cambiar datos o fichas. |
| `npm run catalog:slugs` | Regenera `src/data/projects/public-slugs.generated.ts`. | Sí, condicionalmente. | Al modificar los proyectos públicos. |
| `npm run phase3b:matrix` | Regenera `docs/phase-3b-project-migration-matrix.tsv`. | Sí, condicionalmente. | Sólo al actualizar deliberadamente la matriz. |

Los dos últimos son generadores de archivos tracked: cualquier diff que produzcan debe revisarse y versionarse de forma intencional.

## Arquitectura

- `src/app/[locale]/` contiene el layout localizado y las rutas ES/EN. La aplicación es server-first: Server Components preparan contenido y datos, mientras que navegación, filtros, formularios y otras interacciones puntuales hidratan islas cliente.
- `src/data/projects/index.ts` consolida la fuente efectiva de proyectos. Adaptadores server-only producen view models acotados para las fichas y las tarjetas del catálogo.
- El índice de proyectos lee y sanea `searchParams` en servidor, calcula resultados iniciales y entrega el mismo estado a la isla cliente para filtros, historial e idioma.
- Las fichas usan una ruta dinámica única, slugs generados y una plantilla canónica localizada.
- El formulario de Contacto valida en cliente y envía JSON a `/api/contact`; el Route Handler vuelve a validar con Zod y entrega el mensaje mediante Resend.
- Metadata, canonical, alternates ES/EN, sitemap, robots e i18n se mantienen en utilidades y configuraciones compartidas.

## Rendering

La mayoría de las páginas se prerenderizan de forma estática. Los 36 proyectos generan 72 fichas localizadas estáticas. En cambio, `/es/proyectos` y `/en/proyectos` se renderizan por solicitud para que los query params formen parte del HTML inicial. Las interacciones específicas se hidratan como islas cliente sin convertir el resto de la página en una aplicación exclusivamente client-side.

## Rutas

| Ruta | Función |
| --- | --- |
| `/es`, `/en` | Home localizada. |
| `/[locale]/proyectos` | Catálogo con búsqueda, filtros, orden y query params. |
| `/[locale]/proyectos/[slug]` | Ficha localizada de proyecto. |
| `/[locale]/miami` | Información sobre inversión en Miami. |
| `/[locale]/precon` | Información sobre preconstrucción. |
| `/[locale]/financiacion` | Alternativas de financiación. |
| `/[locale]/sobre-mi` | Perfil de Esteban Firpo. |
| `/[locale]/contacto` | Formulario de contacto. |
| `/[locale]/gracias` | Confirmación posterior al contacto. |
| `/[locale]/storages` | Ruta disponible, actualmente no promovida en la navegación pública. |
| `/api/contact` | Endpoint `POST` server-side del formulario. |
| `/robots.txt` | Política para crawlers. |
| `/sitemap.xml` | Sitemap localizado. |

`[locale]` admite `es` y `en`.

## Calidad y validación

El baseline actual incluye:

- lint con ESLint;
- type-check con TypeScript;
- tests unitarios con Vitest y entorno Node para lógica pura de query, búsqueda y estado inicial del catálogo, además de helpers puntuales de URLs y metadata;
- tests selectivos de componentes con jsdom, React Testing Library y user-event para `ContactForm` y `CountrySelect`;
- validadores propios de catálogo;
- verificación de matriz y view models;
- build de producción;
- CI en GitHub Actions.

Los tests se ubican junto a cada módulo como archivos `*.test.ts` o `*.test.tsx`. La suite unitaria conserva Node como entorno predeterminado; sólo los dos archivos de componentes de Contacto declaran jsdom localmente. Los tests no realizan requests reales ni usan secretos. Los validadores propios del catálogo siguen siendo controles complementarios sobre datos y contratos integrados.

La cobertura de componentes es deliberadamente selectiva y no representa al sitio completo. Todavía no existen E2E, Playwright, browser real ni configuración de coverage. La integración del handler `/api/contact` y Resend sigue pendiente de una fase separada; responsive y foco en navegador real pertenecen a una futura validación E2E.

## CI

El workflow `CI` conserva el check visible `build` y se ejecuta en pull requests y en pushes a `main`. Instala con `npm ci`, corre lint, TypeScript, los tests unitarios y de componentes selectivos, validadores de catálogo y modelos, construye la aplicación y comprueba que el build no deje cambios tracked. Usa permisos de sólo lectura, concurrencia con cancelación de ejecuciones obsoletas y un timeout explícito.

GitHub Actions no despliega. La integración de Vercel gestiona los Preview de ramas o pull requests y Production desde `main`.

## Deploy

El proyecto se aloja en Vercel. Los valores de entorno se configuran fuera del repositorio para cada target. Un Preview debe validarse antes de promover cambios; Production se actualiza únicamente a través del flujo autorizado sobre `main`, no mediante comandos documentados aquí.

## Documentación adicional

El inventario de decisiones vigentes, históricas y superadas está en [`docs/README.md`](docs/README.md).

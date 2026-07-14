# Fase 4A — Catálogo, búsqueda y filtros

## Objetivo y continuidad

Esta fase mejora la exploración de los 36 proyectos sin reauditar ni modificar sus datos públicos. Se preservan la estética navy de las tarjetas, imágenes, nombres, ubicaciones, precios, entregas, políticas de renta visibles, destacados, enlaces y las 72 fichas canónicas ES/EN.

El cambio se limita a `/es/proyectos`, `/en/proyectos`, sus piezas técnicas y la conservación de la query al cambiar de idioma desde esas dos rutas. Home, fichas, footer, Storages, Contacto, sitemap, robots, analytics e infraestructura quedan fuera de alcance.

## Problemas reales encontrados

- La página completa era un componente cliente e importaba `ALL_PROJECTS`; el navegador recibía objetos con galerías, FAQ, planes y otros campos que la grilla no utiliza.
- La búsqueda sólo comparaba minúsculas de nombre y ciudad. No resolvía acentos, guiones Unicode, apóstrofes, puntuación ni espacios repetidos.
- La categoría de renta se infería en runtime mediante expresiones regulares. El orden de esas reglas clasificaba incorrectamente casos como Domus Brickell Park y Millux.
- Los filtros no vivían en la URL: recarga, enlaces compartidos, atrás/adelante y cambio ES/EN perdían el estado.
- Un rango mínimo mayor que el máximo producía resultados vacíos sin explicar el error.
- Los selectores personalizados y el drawer mobile no ofrecían el contrato de teclado, foco y diálogo requerido.
- Las tarjetas usaban altura fija, truncado agresivo y chips sin ajuste, con riesgo de recorte y overflow.
- La página añadía un segundo elemento `main` dentro del `main` global.

## Arquitectura implementada

`ALL_PROJECTS` continúa siendo la fuente aprobada. Una página Server Component llama a un adaptador marcado `server-only`, que proyecta una lista liviana. Sólo la búsqueda, los filtros, el orden, la URL, los chips de estado y el drawer forman una isla cliente.

`ProjectCatalogCardViewModel` contiene únicamente:

- `id`, `slug`, `name`, `location`, `searchLocation` e `image`;
- `priceFromUsd` y `pricePerSfApprox` cuando existen;
- `delivery` y la política de renta visible;
- categoría explícita de renta;
- hasta dos destacados;
- locale.

Los checks automáticos exigen exactamente 36 modelos por idioma, verifican las claves permitidas y evitan que el catálogo vuelva a serializar objetos completos de las fichas.

## Búsqueda

La búsqueda se limita a nombre y ubicación pública existente (`city` y `locationLabel`). El texto se normaliza con Unicode NFKD, elimina marcas diacríticas, unifica guiones, normaliza apóstrofes y puntuación, compacta espacios y compara sin distinguir mayúsculas.

Casos cubiertos automáticamente: `Jean Georges` → Jean‑Georges, `Frida Kahlo`, `Coral Gables` → Cassia, `Wynwood`, búsqueda con y sin acentos y cero resultados. No se indexan amenidades, FAQ ni el contenido completo de las fichas.

## Clasificación de renta

La categoría sirve sólo para navegación; nunca sustituye el texto de renta visible. Un registro tipado contra los slugs públicos impide faltantes, extras o inferencias mediante regex.

| Categoría | Proyectos | Tratamiento |
| --- | ---: | --- |
| Todas / All | 36 | Siempre disponible |
| Flexible / corta estancia | 22 | Disponible |
| Mínimo 30 días | 9 | Incluye Millenia Park, cuyo texto visible conserva 31 días |
| Mínimo 60 días | 0 | Oculta del selector |
| Mínimo 90 días | 2 | Disponible |
| Tradicional / largo plazo | 2 | Disponible |
| Sin categoría | 1 | Faena permanece en “Todas”; no tiene política visible |

Casos ambiguos documentados:

- Domus Brickell Park se agrupa como `flexible` porque su copy dedicado permite renta diaria; no se usa el valor legacy de 30 días para filtrar.
- Millux se agrupa como `flexible` por su rango visible de una noche a seis meses; no se interpreta “seis meses” como largo plazo.
- Ambar se agrupa como `flexible` sólo con finalidad navegacional a partir de “uso temporal”; no se publica un claim de ausencia de restricciones.
- Nickelodeon se agrupa como `flexible` por su uso vacacional; la categoría no promete libertad contractual ni ocupación permanente.
- Oasis se agrupa como `traditional` y conserva literalmente su mínimo de seis meses y un alquiler anual.

`npm run catalog:rentals:check` lista cada proyecto, copy ES/EN, categoría, conteos, categorías vacías y proyectos sin categoría. El informe es interno y no forma parte de la interfaz.

## Contrato de URL

Los parámetros administrados tienen este orden estable:

1. `q`: búsqueda normalizada; máximo 120 caracteres.
2. `rental`: `flexible`, `30-days`, `60-days`, `90-days` o `traditional`; `all` se omite.
3. `min`: precio mínimo entero en USD.
4. `max`: precio máximo entero en USD.
5. `sort`: `alpha-asc`, `alpha-desc`, `price-asc` o `price-desc`; el orden por defecto se omite.

Los valores vacíos, inválidos y categorías sin resultados se eliminan mediante `replace`; los parámetros desconocidos se conservan sin interpretarse. Búsqueda y precio usan debounce de 300 ms y `replace`. Renta, orden, chips y limpieza usan navegación recuperable. Recarga, Back/Forward, URL compartida y cambio ES/EN preservan el estado.

Ejemplo canónico:

`/es/proyectos?q=william&rental=90-days&min=300000&max=600000&sort=price-asc`

Los proyectos sin precio permanecen estables y al final de ambos órdenes por precio. El orden alfabético usa el locale y desempata por slug. Si `min > max`, ambos campos se marcan como inválidos, se explica el problema en un alerta accesible y el rango no se aplica.

## Resultados, tarjetas y mobile

La interfaz muestra conteo singular/plural, chips removibles, limpieza total y un estado vacío con explicación. Las tarjetas conservan su estructura y contenido, pero permiten títulos de dos líneas, textos y chips ajustables, alto flexible, CTA de al menos 44 px y foco visible.

En mobile, Radix Dialog proporciona modalidad, título asociado, foco inicial, focus trap, Escape, retorno de foco, cierre por backdrop y bloqueo/restauración de scroll. El drawer se cierra al alcanzar el breakpoint desktop. Los controles tienen al menos 44 × 44 px y el CTA informa el resultado vivo: `Ver X proyectos / View X projects`.

## Límites y decisiones pendientes

- Faena seguirá sin categoría hasta que exista una política de renta pública; no se infiere una.
- La categoría de 60 días seguirá oculta mientras su conteo sea cero.
- Las categorías de Ambar y Nickelodeon son agrupaciones de navegación prudentes, no nuevos claims comerciales.
- Cualquier cambio futuro de política visible exige actualizar la asignación explícita y aprobar el nuevo reporte; esta fase no revalida datos comerciales.
- No se introducen dependencias, CMS, analytics ni cambios sobre fichas individuales.

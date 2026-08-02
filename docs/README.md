# Índice de documentación

Este directorio conserva decisiones, auditorías, matrices y evidencia de distintas etapas del proyecto. El [`README.md` principal](../README.md) es la guía operativa vigente; los documentos de fase no deben asumirse actuales sin consultar su estado y la fuente recomendada.

## Estados

- `CURRENT`: todavía representa decisiones vigentes.
- `HISTORICAL`: documenta una fase pasada y sigue siendo útil como contexto.
- `SUPERSEDED`: no debe utilizarse para implementar el estado actual.
- `REVIEW_NEEDED`: no existe evidencia suficiente para clasificarlo sin una revisión adicional.

## Inventario

| Documento | Propósito | Estado | Fuente actual recomendada |
| --- | --- | --- | --- |
| [`phase-0-technical-notes.md`](phase-0-technical-notes.md) | Notas técnicas y remediaciones del baseline inicial. | `REVIEW_NEEDED` | Versiones en [`package.json`](../package.json); rutas y configuración en [`src/app/`](../src/app/) y archivos raíz. |
| [`phase-1-content-audit.md`](phase-1-content-audit.md) | Auditoría de contenido anterior al rediseño. | `HISTORICAL` | Contenido tipado en [`src/content/`](../src/content/) y rutas actuales en [`src/app/`](../src/app/). |
| [`phase-1-esteban-questionnaire.md`](phase-1-esteban-questionnaire.md) | Preguntas editoriales y comerciales pendientes de validación humana. | `REVIEW_NEEDED` | Respuestas aprobadas por Rodrigo/Esteban y contenido tipado actual; el cuestionario no es evidencia factual. |
| [`phase-1-home-blueprint.md`](phase-1-home-blueprint.md) | Blueprint propuesto para la Home. | `HISTORICAL` | [`src/app/[locale]/page.tsx`](../src/app/%5Blocale%5D/page.tsx) y [`src/components/home/`](../src/components/home/). |
| [`phase-1-information-architecture.md`](phase-1-information-architecture.md) | Propuesta inicial de navegación y arquitectura de información. | `HISTORICAL` | Rutas en [`src/app/`](../src/app/) y navegación implementada en [`src/components/NavBar.tsx`](../src/components/NavBar.tsx). |
| [`phase-1-positioning.md`](phase-1-positioning.md) | Hipótesis de posicionamiento y mensajes. | `REVIEW_NEEDED` | Contenido tipado vigente y decisiones comerciales aprobadas; las hipótesis requieren validación humana. |
| [`phase-1-project-validation-matrix.md`](phase-1-project-validation-matrix.md) | Matriz editorial inicial de validación de proyectos. | `REVIEW_NEEDED` | Catálogo efectivo en [`src/data/projects/index.ts`](../src/data/projects/index.ts) y validadores en [`scripts/`](../scripts/). |
| [`phase-2-project-asset-inventory.tsv`](phase-2-project-asset-inventory.tsv) | Snapshot de URLs de assets relevadas en la fase 2. | `HISTORICAL` | Referencias actuales en `src/` y `public/`; disponibilidad y derechos deben verificarse nuevamente. |
| [`phase-2-visual-direction.md`](phase-2-visual-direction.md) | Bitácora de dirección visual y decisiones del prototipo. | `HISTORICAL` | Implementación actual en [`src/app/`](../src/app/), [`src/components/`](../src/components/) y [`public/`](../public/). |
| [`phase-3b-2a-implementation-report.md`](phase-3b-2a-implementation-report.md) | Reporte de una plantilla privada de Preview anterior al rollout. | `SUPERSEDED` | Ruta pública [`src/app/[locale]/proyectos/[slug]/page.tsx`](../src/app/%5Blocale%5D/proyectos/%5Bslug%5D/page.tsx) y plantilla canónica actual. |
| [`phase-3b-project-migration-matrix.tsv`](phase-3b-project-migration-matrix.tsv) | Matriz generada de 36 proyectos por 16 funciones. | `CURRENT` | El propio artefacto, su generador y `npm run phase3b:check`. |
| [`phase-3b-the-william-functional-comparison.md`](phase-3b-the-william-functional-comparison.md) | Comparación funcional del prototipo The William. | `HISTORICAL` | Ficha canónica y view models implementados bajo [`src/features/projects/`](../src/features/projects/). |
| [`phase-3b-unified-migration-preparation.md`](phase-3b-unified-migration-preparation.md) | Plan previo de adaptación, QA y rollout unificado. | `SUPERSEDED` | Implementación server-only y checks actuales bajo [`src/features/projects/`](../src/features/projects/) y [`scripts/`](../scripts/). |
| [`phase-3b-unified-project-template.md`](phase-3b-unified-project-template.md) | Contrato de diseño que guio la plantilla unificada. | `HISTORICAL` | Plantilla y contratos actuales bajo [`src/features/projects/`](../src/features/projects/). |
| [`phase-4a-catalog-and-filters.md`](phase-4a-catalog-and-filters.md) | Fundación del catálogo, filtros y sincronización de URL. | `REVIEW_NEEDED` | Página server-side [`src/app/[locale]/proyectos/page.tsx`](../src/app/%5Blocale%5D/proyectos/page.tsx), [`src/features/catalog/`](../src/features/catalog/) y `npm run catalog:check`. |

## Resumen

- `CURRENT`: 1
- `HISTORICAL`: 7
- `SUPERSEDED`: 2
- `REVIEW_NEEDED`: 5

Los estados describen la vigencia documental, no autorizan editar datos inmobiliarios ni reemplazan una decisión humana pendiente.

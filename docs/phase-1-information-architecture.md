# Fase 1 — Arquitectura de información recomendada

## Propósito del documento

Definir una arquitectura futura que presente a Esteban como asesor de preconstrucción en Miami, facilite una decisión informada y mantenga el catálogo como herramienta de apoyo. No especifica diseño visual ni autoriza cambios de rutas, contenido público, metadata o indexación.

## 1. Principios de arquitectura

1. **Asesor primero, inventario después.** La navegación debe explicar quién ayuda, para qué y cómo antes de exponer decenas de fichas.
2. **Una tarea por página.** Cada ruta debe responder una intención principal y conducir a un siguiente paso coherente.
3. **Menos opciones en navegación primaria.** El menú actual tiene ocho destinos y presenta líneas de negocio y contenidos educativos al mismo nivel.
4. **Hechos antes que persuasión.** Precio, entrega, renta, financiación y estadísticas deben incluir fuente, fecha, responsable, estado editorial y necesidad de reconfirmación.
5. **Paridad ES/EN.** Ambas versiones deben mantener estructura, alcance y cautelas equivalentes.
6. **Continuidad de URLs.** Las rutas existentes deben preservarse siempre que sea razonable; cualquier cambio futuro requiere redirects y revisión SEO.
7. **Mobile prioritario.** Las decisiones y CTAs esenciales deben entenderse sin menús largos, tablas anchas ni contenido secundario previo.
8. **Conversión con contexto.** “Contactar” debe comunicar qué ocurrirá después, no ser un destino genérico.

## 2. Mapa futuro recomendado

```text
Inicio
├── Proyectos
│   └── Ficha de proyecto
├── Preconstrucción
├── Miami
├── Sobre Esteban
├── Contacto / conversación inicial
├── Financiación (secundaria)
└── Storages (acceso directo, sin promoción hasta validar)
```

No se recomienda crear nuevas URLs antes de cerrar el modelo de contenido y confirmar el proceso comercial.

## 3. Navegación principal

### Propuesta

| Orden | Elemento | Función | Ruta actual a conservar |
| --- | --- | --- | --- |
| 1 | Inicio | Explicar propuesta, proceso y confianza | `/{locale}` |
| 2 | Proyectos | Explorar y comparar información revisada, fechada y sujeta a reconfirmación | `/{locale}/proyectos` |
| 3 | Preconstrucción | Educar sobre modelo, proceso y riesgos | `/{locale}/precon` |
| 4 | Miami | Dar contexto de mercado con evidencia | `/{locale}/miami` |
| 5 | Sobre Esteban | Resolver confianza y alcance del asesoramiento | `/{locale}/sobre-mi` |
| CTA | Hablar con Esteban | Iniciar una conversación calificada | `/{locale}/contacto` o agenda confirmada |

### Decisiones de navegación

- Contacto funciona mejor como CTA persistente que como octavo enlace con el mismo peso.
- Financiación pasa a navegación secundaria porque apoya la decisión, pero no define el foco principal.
- Storages sale de navegación principal mientras su línea comercial y contenido no estén revisados, fechados y aprobados para publicación.
- El selector ES/EN se mantiene visible y preserva la ruta equivalente.
- El nombre de marca debe llevar siempre a Inicio.
- En mobile, el primer bloque del menú debe contener los cinco destinos principales y el CTA; lo secundario puede aparecer después de una separación clara.

Esta es una recomendación documental, no una instrucción de implementación en esta fase.

## 4. Navegación secundaria y footer

### Navegación secundaria recomendada

- Financiación.
- Contacto por email.
- WhatsApp, si número y atención están confirmados.
- Agenda, si URL, disponibilidad y modalidad están confirmadas.
- Cambio de idioma.
- Disclosures y páginas legales existentes o requeridas, una vez provistas por responsables autorizados.

### Footer recomendado

Agrupar por función en lugar de repetir todo el menú:

1. **Asesor:** nombre, rol, brokerage y licencia sólo cuando estén confirmados.
2. **Explorar:** Proyectos, Preconstrucción y Miami.
3. **Contacto:** formulario, email, WhatsApp y agenda confirmados.
4. **Información:** Financiación, disclosures, privacidad y términos cuando existan.

Storages no debería aparecer entre los enlaces promovidos del footer durante el período de validación. La URL puede seguir accesible directamente.

Debe revisarse cualquier crédito, dirección, logo o dato profesional del footer para asegurar autorización, vigencia y relevancia.

## 5. Función de cada página

### Inicio

**Función:** convertir una necesidad difusa (“quiero evaluar Miami”) en confianza suficiente para explorar opciones o conversar con Esteban.

Debe responder, en este orden:

1. Qué hace Esteban y para quién.
2. Qué problema reduce.
3. Cómo es el proceso de asesoramiento.
4. Por qué confiar en Esteban.
5. Qué opciones tienen información revisada, fechada y sujeta a reconfirmación.
6. Qué debe hacer el visitante después.

La Home no debe intentar resumir todas las líneas de negocio ni presentar cifras de mercado como prueba principal. La estructura detallada se define en `phase-1-home-blueprint.md`.

### Proyectos

**Función:** ser una herramienta de exploración y comparación, no una grilla indiferenciada.

Responsabilidades futuras:

- explicar el alcance del catálogo y la fecha de actualización;
- permitir filtrar sólo por campos normalizados, revisados y aprobados para publicación;
- distinguir “Validado”, “pendiente de reconfirmación” e “inactivo”, según la definición estricta y las reglas editoriales aprobadas;
- ayudar a comparar por objetivo, ubicación, entrega, uso y capital requerido;
- ofrecer entre 3 y 6 proyectos destacados sólo cuando sus registros cumplan el criterio de “Validado” y exista recomendación expresa de Esteban;
- indicar que disponibilidad y condiciones deben reconfirmarse antes de decidir;
- conducir a una consulta con contexto del proyecto o comparación.

No se deben elegir destacados usando únicamente los datos existentes. Mientras los registros del catálogo no cumplan el criterio de “Validado”, las fichas individuales deben permanecer fuera del sitemap según la decisión ya aprobada.

### Ficha de proyecto

**Función:** ayudar al visitante a determinar si vale la pena incluir el proyecto en una comparación o consulta, sin reemplazar documentos del developer ni asesoramiento especializado.

#### Estructura ideal

1. **Identidad y estado**
   - Nombre, ubicación y tipo.
   - Estado comercial y fecha de última revisión.
   - Fuente principal y responsable de revisión.

2. **Resumen para decidir**
   - Para qué perfil podría encajar.
   - Razones verificadas para considerarlo.
   - Riesgos, restricciones o incógnitas relevantes.
   - Nunca una recomendación automática basada sólo en datos actuales.

3. **Datos esenciales**
   - Precio o rango con fecha.
   - Entrega y estado de obra.
   - Disponibilidad.
   - Depósitos y plan de pagos.
   - Política de renta.
   - HOA y otros costos conocidos.
   - Financiación: disponibilidad y condiciones por confirmar.

4. **Producto y ubicación**
   - Tipologías, superficies, amenities y condición de amueblado.
   - Mapa, barrio, conectividad y contexto relevante.
   - Separar información del proyecto de inferencias de inversión.

5. **Developer y operación**
   - Identidad y antecedentes con fuentes.
   - Operador, hotel brand o property management si aplica.
   - Relación comercial o compensación que requiera disclosure.

6. **Escenarios y cautelas**
   - Uso posible y restricciones.
   - Supuestos de renta o salida claramente identificados, si se autorizan.
   - Riesgos de construcción, mercado, financiación y regulación.
   - Derivación a asesor legal, fiscal o financiero cuando corresponda.

7. **Material verificable**
   - Galería con derechos confirmados.
   - Brochure, floor plans y documentos con versión o fecha.
   - Preguntas frecuentes específicas, no textos genéricos replicados.

8. **Próximo paso**
   - Consultar por ese proyecto.
   - Pedir comparación con alternativas.
   - Agendar conversación.
   - Contexto del proyecto incluido en el contacto.

#### Reglas editoriales de ficha

- Ningún campo sensible se publica sin fuente, fecha y responsable.
- “Desde” no equivale a disponibilidad actual.
- Una ausencia de dato debe mostrarse como “por confirmar”, no completarse por inferencia.
- ES y EN deben provenir del mismo registro de origen; sólo podrá marcarse “Validado” si cumple todos los requisitos de ese estado.
- Las imágenes necesitan titular, permiso y alcance de uso.
- Metadata y sitemap se revisan sólo después de aprobar la ficha.

### Preconstrucción

**Rol recomendado:** guía permanente para explicar el modelo, el proceso y los riesgos a un comprador internacional.

Debe cubrir:

- qué es y para quién puede tener sentido;
- etapas desde reserva hasta cierre;
- compromisos de capital y documentos;
- actores involucrados y rol de Esteban;
- riesgos, cambios y preguntas que conviene hacer;
- financiación al cierre como posibilidad sujeta a evaluación;
- enlace a proyectos con información revisada, fechada y sujeta a reconfirmación, y a la conversación inicial.

No debe prometer apreciación, garantías, financiación o seguridad. Los esquemas como `20/10/10/60`, LTV y fechas sólo deben aparecer como ejemplo rotulado o dato con fuente y vigencia.

### Miami

**Rol recomendado:** dar contexto para evaluar el mercado, no convencer mediante una acumulación de cifras.

Debe organizarse alrededor de preguntas:

- ¿Por qué considerar Miami para este objetivo?
- ¿Qué barrios y dinámicas importan para preconstrucción?
- ¿Qué costos, riesgos y regulaciones debe entender un inversor internacional?
- ¿Qué fuentes permiten seguir el mercado?

Cada estadística necesita fuente específica, período, enlace o referencia y fecha de revisión. Claims fiscales, migratorios, de liquidez, demanda, precios y seguros requieren validación especializada. La página debe diferenciar Miami ciudad, Miami-Dade, South Florida y Florida.

### Financiación

**Rol recomendado:** reducir incertidumbre sobre el proceso y preparar preguntas para un lender, no ofrecer una promesa de crédito.

Debe explicar:

- cuándo suele evaluarse financiación en preconstrucción;
- documentación que puede solicitar un lender;
- diferencia entre ejemplo y oferta vigente;
- variables que afectan elegibilidad, tasa, plazo y down payment;
- quién presta, quién asesora y cuál es el rol de Esteban;
- CTA para evaluar el caso con el profesional apropiado.

Porcentajes, plazos, tasas, reservas y requisitos actuales deben tener fuente y fecha. Hace falta un disclaimer aprobado antes de presentar condiciones comerciales.

### Sobre Esteban

**Rol recomendado:** ser el principal activo de confianza del sitio.

Debe responder:

- quién es;
- qué credenciales y brokerage tiene;
- a qué clientes ayuda;
- cómo trabaja;
- qué etapas acompaña directamente;
- con qué especialistas coordina;
- qué límites tiene su servicio;
- cómo iniciar una conversación.

Ubicación recomendada: navegación principal y bloque de confianza en la Home. La historia personal debe apoyar el método y la empatía con el cliente; no sustituir credenciales ni evidencia. Biografía, ingeniería, empresa previa, años, idiomas, licencia y experiencia inmobiliaria deben confirmarse.

### Contacto

**Rol recomendado:** iniciar una conversación útil con mínima fricción y expectativas claras.

Estrategia futura:

- un CTA principal consistente, por ejemplo “Contarle mi objetivo a Esteban”;
- formulario breve que capture nombre, email, teléfono opcional o preferido, objetivo y horizonte;
- preservar contexto de página o proyecto sin pedir que el visitante lo repita;
- explicar quién recibe el mensaje, canal y tiempo estimado de respuesta una vez confirmado;
- ofrecer WhatsApp y agenda como alternativas, no como caminos contradictorios;
- solicitar consentimiento y disclosures de privacidad aprobados;
- no publicar promesas de respuesta que no se puedan cumplir.

El email canónico se mantiene como dato comprobado. WhatsApp, agenda, horarios y SLA deben confirmarse antes de estandarizarlos.

### Storages

**Estado actual:** línea secundaria con página propia, presencia en Home, navegación y footer; contiene cifras, rendimientos y condiciones sin revisión editorial completa. Fue excluida del sitemap por decisión previa, pero la página continúa accesible e indexable.

#### Opciones evaluadas

| Opción | Ventaja | Riesgo | Evaluación |
| --- | --- | --- | --- |
| Mantener en navegación principal | Conserva visibilidad | Diluye el foco en preconstrucción y promueve claims sin revisión, fecha y aprobación suficientes | No recomendada ahora |
| Landing secundaria | Permite una campaña o audiencia específica | Requiere validación comercial, contenido y fuente de leads | Posible después de validar |
| Archivar | Reduce exposición | Puede perder utilidad, enlaces y contexto antes de decidir el negocio | Prematura |
| Conservar sin promover | Preserva URL y contenido mientras se decide | Sigue accesible por enlace directo y buscadores según indexación actual | Recomendada en esta fase |

#### Recomendación

**Conservar Storages sin promover.** En una fase de implementación posterior y con aprobación específica:

- mantener `/{locale}/storages` operativa;
- retirar su enlace de navegación principal, Home y enlaces promovidos del footer;
- no incorporarla nuevamente al sitemap;
- no seleccionar oportunidades ni actualizar claims hasta revisar y aprobar la línea comercial con fuentes, fechas, responsables y vigencias;
- no cambiar indexación, redirecciones ni eliminar contenido sin una decisión SEO y comercial separada.

Para reincorporarla como landing secundaria se necesita confirmar: objetivo comercial, audiencia, responsable, oferta vigente, cifras y condiciones, fuentes, disclosures, derechos de imágenes y proceso de atención.

## 6. Recorridos prioritarios

### Recorrido A — Visitante que aún evalúa el modelo

```text
Inicio → Preconstrucción → Proyectos revisados y fechados → Consulta con contexto
```

### Recorrido B — Visitante que llega por un proyecto

```text
Ficha → Estado y datos esenciales → Comparación/alternativas → Consulta sobre el proyecto
```

### Recorrido C — Visitante que necesita confianza personal

```text
Inicio/Ficha → Sobre Esteban → Proceso y credenciales → Contacto o agenda
```

### Recorrido D — Visitante con duda financiera

```text
Preconstrucción/Ficha → Financiación → Preparación del caso → Consulta con profesional apropiado
```

Cada recorrido debe mantener el idioma, el contexto de origen y el proyecto de interés.

## 7. Modelo de contenido y gobernanza

### Campos transversales obligatorios

Para datos comerciales, estadísticas y claims:

- valor publicado;
- fuente;
- fecha de la fuente;
- fecha de última verificación;
- responsable de revisión;
- estado editorial;
- alcance geográfico o comercial;
- versión ES/EN;
- fecha de próxima revisión;
- disclaimer aplicable.

### Estados recomendados

- **Borrador:** no publicable.
- **Pendiente de fuente:** dato recibido sin evidencia suficiente.
- **En validación:** asignado a un responsable.
- **Validado:** registro con fuente identificada, fecha de revisión, responsable asignado, aprobación editorial y plazo de vigencia o próxima revisión documentados.
- **Reconfirmar:** vencido o sujeto a inventario/condición cambiante.
- **Inactivo:** no promover; conservar según política de archivo.

La matriz Markdown define el modelo inicial y, durante esta fase documental, sirve como registro de partida. No será la herramienta operativa definitiva: en una fase futura se migrará a una fuente estructurada editable —spreadsheet, CMS o base de datos, todavía por decidir— que será la fuente operativa para determinar qué fichas, filtros y destacados pueden publicarse. No debe mantenerse una lista editorial paralela sin sincronización.

Para comunicación pública, la formulación preferida es **“información revisada, fechada y sujeta a reconfirmación”**. El término **“Validado”** se reserva exclusivamente a registros que cumplan los cinco requisitos del estado anterior.

## 8. Estrategia ES/EN

- Definir una versión fuente por bloque y registrar aprobación de ambas versiones.
- Mantener los mismos hechos, fechas, disclaimers y CTAs.
- Evitar traducciones literales de términos legales, financieros o inmobiliarios sin revisión.
- No asumir que “inversor internacional” equivale sólo a audiencia hispanohablante.
- Conservar alternates entre rutas equivalentes.
- Si una página no fue revisada y aprobada en ambos idiomas, no promover una versión como completa y la otra como parcial.

## 9. Qué retirar de promoción, no del sitio

Cuando se autorice la implementación de arquitectura:

- Storages de navegación principal, Home y enlaces destacados del footer.
- Accesos rápidos basados en fechas o políticas de renta sin revisión, fuente y vigencia suficientes.
- Proyectos destacados elegidos sólo desde el catálogo actual.
- Cifras de mercado usadas como banda de confianza sin fuente visible.
- CTAs de agenda no confirmados o inconsistentes.

Esto no autoriza borrar páginas, cambiar indexación ni alterar contenido en la Fase 1.

## 10. Contenido estructural faltante

- Proceso de asesoramiento real y límites por etapa.
- Credenciales y disclosures verificables.
- Aplicación de la definición estricta de “Validado” y fecha de próxima revisión.
- Riesgos y supuestos en Preconstrucción, Miami y fichas.
- Criterios de comparación y recomendación.
- Expectativas después del contacto.
- Privacidad, representación y compensación aprobadas.
- Fuentes completas para datos de mercado y financiación.
- Estado y derechos de cada imagen.
- Política de archivo para proyectos inactivos.

## 11. Secuencia futura recomendada

1. Resolver cuestionario bloqueante con Esteban.
2. Aprobar posicionamiento y promesa.
3. Definir política editorial y responsables.
4. Completar matriz de validación del catálogo.
5. Aprobar navegación y recorridos.
6. Redactar contenidos ES/EN con fuentes y disclaimers.
7. Prototipar arquitectura en baja fidelidad.
8. Validar con usuarios o conversaciones reales.
9. Diseñar e implementar por etapas.

Ninguno de estos pasos autoriza cambios de producción hasta que exista una fase de implementación aprobada.

## 12. Criterios de aprobación de la arquitectura

- La navegación primaria expresa el foco en preconstrucción y asesoramiento.
- Un visitante puede entender el rol de Esteban sin abrir una ficha.
- Proyectos y fichas distinguen información revisada y fechada, registros que cumplen el criterio de “Validado” e información pendiente.
- Cada página tiene una función y un CTA principal claros.
- Storages queda preservada sin competir por atención.
- ES y EN mantienen paridad.
- Los recorridos críticos funcionan conceptualmente en mobile.
- No se necesita inventar datos para completar ninguna sección.

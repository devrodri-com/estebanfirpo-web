# Fase 1 — Auditoría estratégica del contenido actual

## Propósito y alcance

Este documento registra qué comunica hoy EstebanFirpo.com en español e inglés y qué tratamiento editorial requiere antes de un rediseño. La auditoría cubre Home, Proyectos, las 36 fichas públicas, Preconstrucción, Miami, Financiación, Sobre mí, Contacto, Storages, navegación, footer, metadata, página de agradecimiento y 404.

La revisión se realizó sobre el contenido del repositorio. Que una frase exista en el código **no demuestra que sea verdadera, vigente ni autorizada**. No se validaron externamente precios, proyectos, credenciales, estadísticas, condiciones financieras ni derechos de imágenes.

El foco comercial ya confirmado para la próxima etapa es **preconstrucción en Miami para inversores internacionales**, con Esteban presentado como asesor personal y estratégico. Esta definición sirve para evaluar relevancia; no valida ningún claim existente.

## Criterios de clasificación

1. **Conservar:** el propósito, la información o la función son útiles. Puede requerir edición menor.
2. **Reescribir:** el tema es pertinente, pero el mensaje, jerarquía, tono o precisión deben cambiar.
3. **Validar:** no debe reafirmarse ni destacarse hasta contar con fuente, fecha, responsable y aprobación.
4. **Retirar de navegación:** mantener la URL por ahora, pero dejar de promoverla en navegación principal o secundaria.
5. **Eliminar posteriormente:** retirar contenido redundante, engañoso, vencido o contrario al foco una vez autorizada su edición.
6. **Contenido faltante:** información necesaria que hoy no existe o no es suficiente.

Las categorías no son excluyentes. Por ejemplo, puede conservarse el propósito de una página y, a la vez, reescribir y validar todo su contenido.

## Resumen ejecutivo

- El sitio tiene una estructura bilingüe completa y un recorrido funcional desde contenido educativo hacia proyectos y contacto.
- La propuesta personal de Esteban aparece, pero el catálogo y numerosos argumentos cuantitativos dominan la experiencia. Esto hace que el sitio se perciba más como inventario que como proceso de asesoramiento.
- Los mayores riesgos editoriales están en Home, Preconstrucción, Miami, Financiación, Storages y las fichas: incluyen cifras, rendimientos, condiciones, disponibilidad implícita y credenciales sin evidencia documental asociada en el repositorio.
- El catálogo expone 36 slugs públicos. Sus fichas están fuera del sitemap, pero siguen accesibles e indexables. Cada ficha requiere validación individual antes de volver a promoverse orgánicamente.
- Storages compite con el foco confirmado: aparece en Home, navegación principal y footer. Se recomienda dejar de promoverlo, sin borrar la página ni alterar todavía su metadata o indexación.
- El contenido ES/EN suele tener paridad temática, pero se mantiene manualmente en varios archivos. Hay traducciones, fallbacks y microcopys inconsistentes que pueden transmitir mensajes distintos o mezclar idiomas.
- La metadata institucional implementada en Fase 0 es deliberadamente genérica y segura. Conviene conservarla hasta aprobar el nuevo posicionamiento y el contenido factual de cada ruta.

## Evidencia: qué sabemos y qué no

### Hechos comprobados en el producto o confirmados por el Product Owner

- Existen rutas equivalentes ES/EN para las páginas institucionales auditadas.
- El catálogo carga 36 proyectos públicos y excluye uno adicional del sitio mediante una regla interna pendiente de revisión legal.
- Las fichas públicas muestran, según cada objeto de datos, nombre, ciudad, precio inicial, entrega, política de renta, imágenes, destacados, plan de pagos, tipologías, características, preguntas frecuentes y mapa.
- El contacto público y canónico confirmado es `esteban@miamiliferealty.com`; el formulario está preparado para entregar allí.
- El sitio muestra el teléfono/WhatsApp `+1 754 267 3931` y un enlace de agenda de Google Calendar. Su vigencia comercial aún debe confirmarse con Esteban.
- El sitio muestra el nombre Miami Life Realty, un logo y una dirección de brokerage en el footer. Su uso y vigencia deben documentarse.
- El sitio tiene metadata genérica, canonical y alternates ES/EN. Gracias y 404 están marcadas para no indexar; Storages y las fichas mantienen su estado de indexación actual.
- La dirección estratégica confirmada es preconstrucción en Miami para inversores internacionales.

Estos hechos describen la implementación o decisiones ya confirmadas. No prueban por sí mismos licencias, experiencia, resultados, inventario, condiciones comerciales ni afiliaciones.

### Hipótesis razonables para validar con usuarios y negocio

- El visitante necesita orientación para reducir incertidumbre, no una lista más extensa de proyectos.
- La capacidad de explicar el proceso completo puede diferenciar más a Esteban que las cifras genéricas sobre Miami.
- Un catálogo más pequeño, actualizado y explicado tendría más credibilidad que 36 fichas sin fecha de validación visible.
- WhatsApp será un canal principal para el público internacional hispanohablante, con agenda o formulario como alternativa.
- Miami, Preconstrucción y Financiación pueden funcionar como contenidos de decisión si responden objeciones concretas y evitan promesas de rendimiento.

Estas hipótesis orientan investigación y arquitectura; no deben publicarse como hechos.

### Información que debe confirmar Esteban

- Licencia vigente, número de licencia, uso correcto de REALTOR®, afiliación a NAR, rol contractual y brokerage actual.
- Biografía, trayectoria, idiomas de atención y alcance real del acompañamiento.
- WhatsApp, agenda, horarios, tiempos de respuesta y proceso de calificación/asesoramiento.
- Relación con abogados, lenders, property managers y developers; qué coordina directamente y qué refiere a terceros.
- Evidencia y autorización para usar logo, dirección, fotografía, nombres comerciales e imágenes.
- Fuentes y vigencia de todo precio, entrega, inventario, política de renta, plan de pagos, financiación y claim de proyectos.
- Prioridad comercial y tratamiento futuro de Storages.

## Inventario y diagnóstico por página

### 1. Home — `/es` y `/en`

**Función actual:** presentar inversión en Miami, derivar al catálogo, agenda y WhatsApp, resumir Miami y Preconstrucción, promover proyectos y Storages.

**Conservar**

- La presencia personal de Esteban, su fotografía sujeta a aprobación y el acceso directo a proyectos y contacto.
- El foco temático en Miami, preconstrucción y público inversor internacional.
- El recorrido general problema/contexto → oportunidad → proyectos → conversación.
- Los CTAs hacia proyectos, agenda, email y WhatsApp, una vez confirmado qué canal debe ser primario.

**Reescribir**

- El hero debe explicar cómo ayuda Esteban y para quién, antes de prometer “alto rendimiento”, ROI o salida.
- “Catálogo revisado”, “inventario seleccionado” y “actualizado semanalmente” deben sustituirse por un proceso de selección verificable o eliminarse.
- Las secciones Miami y Preconstrucción deben resumir decisiones y riesgos, no acumular cifras promocionales.
- “Proyectos destacados” hoy no presenta proyectos: es una puerta al catálogo. Renombrar según su función hasta definir una selección validada.
- Unificar la voz personal: hoy alterna “asesoro”, “conversemos”, “hablar con un asesor” y “we’ll”.

**Validar**

- “Realtor® licenciado en Florida”, Miami Life Realty, NAR/REALTOR® y cualquier wordmark de confianza.
- “Preconstrucción de alto rendimiento”, “foco en ROI y salida”, financiación para extranjeros, entregas 2025–2028 e inventario semanal.
- Todas las métricas de Miami: migración, pasajeros, impuesto estatal, crecimiento demográfico, ocupación y liquidez.
- Todos los números de preconstrucción: depósitos 20–40%, apreciación 15–30%, 20/10/10/60 y financiación 70–75% LTV.
- Fotografía y autorización de uso.

**Retirar de navegación/promoción**

- Retirar de Home la promoción de Storages mientras se define si esa línea comercial continúa y se valida su contenido.

**Eliminar posteriormente**

- La cita inmobiliaria sin autor ni contexto.
- Los accesos rápidos con query strings de entrega, restricciones y estancia mínima: la página Proyectos actual no aplica esos parámetros al cargar, por lo que prometen filtros que no se ejecutan.
- Claims cuantitativos que no obtengan fuente, fecha y aprobación.

**Contenido faltante**

- Una propuesta de valor clara y verificable.
- Una explicación breve del proceso de asesoramiento.
- Señales de confianza documentadas: identidad profesional, brokerage, licencia y alcance del servicio.
- Criterios de selección de oportunidades, riesgos y “para quién/no para quién”.
- Evidencia validada: testimonios, casos o ejemplos reales sólo si existen y hay autorización.

### 2. Proyectos — `/[locale]/proyectos`

**Función actual:** catálogo de 36 proyectos con búsqueda y filtros por renta/precio, orden y acceso a fichas.

**Conservar**

- Una página única para explorar oportunidades.
- Búsqueda, orden, filtros y acceso a fichas como capacidades, no como promesa de inventario actualizado.
- Formato de moneda localizado y ruta equivalente en ambos idiomas.

**Reescribir**

- Agregar una introducción editorial: qué representa el catálogo, cómo se selecciona y por qué una conversación sigue siendo necesaria.
- Cambiar el énfasis de “cantidad de opciones” a “estado de validación y encaje con el inversor”.
- Las etiquetas “Desde”, “Entrega” y política de renta deben incorporar fecha o estado cuando el dato esté validado.

**Validar**

- Los 36 proyectos, uno por uno: activo/inactivo, precio, entrega, ubicación, política de renta, disponibilidad, financiación, imágenes y fuente.
- Todo destacado visible en las tarjetas y la correspondencia entre los datos ES/EN.
- Que filtros y ordenamientos no presenten como comparable información con distinta antigüedad.

**Retirar de navegación**

- No aplica: Proyectos debe permanecer en la navegación principal por su relevancia, pero no debe ser el único argumento comercial.

**Eliminar posteriormente**

- Proyectos inactivos, duplicados o sin fuente suficiente, sólo después de la revisión del catálogo y con plan de redirects cuando corresponda.
- Filtros que no puedan sostenerse con datos normalizados y vigentes.

**Contenido faltante**

- Fecha de última validación, estado editorial, fuente y disclaimer de cambio sin aviso.
- Estado “consultar disponibilidad” distinto de una disponibilidad confirmada.
- Criterios explicados para recomendaciones o destacados.
- Estado vacío útil y vía de asesoramiento cuando ningún resultado encaje.

### 3. Fichas individuales — 36 rutas `/[locale]/proyectos/[slug]`

**Función actual:** presentar el proyecto con datos comerciales, galería, atributos, FAQs, plan de pagos, mapa y CTAs.

**Conservar**

- La estructura base de información del proyecto y los CTAs para solicitar material o conversar.
- Metadata genérica por nombre y ciudad como solución provisional; evita claims específicos globales.
- Breadcrumb, alternativa ES/EN y 404 localizada para slugs inexistentes.

**Reescribir**

- Reordenar la ficha alrededor de la decisión del inversor: resumen factual, encaje, riesgos, números validados, proceso y siguiente paso.
- Separar datos del developer, interpretación de Esteban y disclaimers.
- Evitar repetir `microClaims` en chips y en “¿Por qué este proyecto?”.
- Sustituir “destacados” genéricos por factores de decisión comprobables.

**Validar**

- Nombre comercial, developer, estado, ciudad/dirección, coordenadas y mapa.
- Precio inicial, precio por pie cuadrado, HOA, mobiliario, entrega y plan de pagos.
- Política de renta, zonificación, restricciones, posibilidad de STR y respuestas de FAQ.
- Tipologías, terminaciones, amenities, financiación, inventario y disponibilidad.
- Derechos, vigencia y correspondencia de portada, galería, brochure y demás materiales.
- Cualquier “por qué”, ventaja, rendimiento, demanda, salida, marca o claim del edificio.
- El enlace de agenda configurado; sin variable de entorno, el fallback apunta a una ruta `/agendar` que no existe en el repositorio.

**Retirar de navegación/promoción**

- Las fichas ya están fuera del sitemap y no forman parte de la navegación global. Mantener esta exposición prudente hasta validar el catálogo.

**Eliminar posteriormente**

- Fichas no activas o no autorizadas.
- Campos sin fuente, desactualizados o duplicados.
- CTAs a PDFs que Esteban no pueda entregar de forma consistente.

**Contenido faltante**

- Fuente, fecha de actualización y responsable de validación por campo.
- Estado editorial visible internamente y regla clara de publicación.
- Disponibilidad confirmada, riesgos/limitaciones y disclaimer de cambios del developer.
- Opinión o recomendación de Esteban sólo cuando esté explícitamente aprobada.
- Información de developer y documentación oficial enlazada o archivada.

### 4. Preconstrucción — `/[locale]/precon`

**Función actual:** argumentar ventajas económicas, fiscales y financieras de comprar en preconstrucción.

**Conservar**

- Una página educativa que explique el modelo, etapas y preguntas que un inversor internacional debe resolver.
- La conexión con Proyectos y una conversación estratégica.
- La mención de riesgos, financiación y fiscalidad como temas, no como promesas.

**Reescribir**

- Convertir el discurso de rendimiento en una guía equilibrada: cómo funciona, capital requerido, tiempos, riesgos, due diligence y salida.
- Corregir el CTA “Calculá tu plan”, que abre una agenda y no una calculadora.
- Eliminar absolutos como “capturás plusvalía”, “mercado global y líquido” o “perfecto para extranjeros”.
- Explicar que financiación, fiscalidad y renta dependen del perfil, proyecto y asesoramiento profesional externo.

**Validar**

- Plan 20/10/10/60, plazos 24–36 meses, entregas 2025–2028 y financiación 70–75% LTV.
- “Alzas de dos dígitos”, apreciación pre-entrega, demanda, liquidez y producto premium.
- Deducción de intereses, depreciación, cost segregation e intercambio 1031.
- Ejemplo de USD 500.000, 30% de down, 10% de apreciación y ROI sobre equity de aproximadamente 33%.
- Afirmaciones sobre hipoteca fija a 30 años, refinanciación, cash-out y escudo fiscal.
- Flexibilidad Airbnb/30 días, tiempos de entrega y todas las fuentes mencionadas de forma genérica.

**Retirar de navegación**

- No aplica: conservar como contenido principal si se transforma en guía de decisión.

**Eliminar posteriormente**

- El ejemplo de ROI y cualquier recomendación fiscal/financiera que no tenga metodología, responsable cualificado y disclosure aprobado.
- Filtros por `tipo=precon`: actualmente la página Proyectos no interpreta ese parámetro.

**Contenido faltante**

- Riesgos de construcción, cambios de developer, rescisión/cesión, iliquidez, costos de cierre, seguros, impuestos y tipo de cambio.
- Proceso real de Esteban y límites de su rol frente a abogados, contadores y lenders.
- Glosario sencillo para el inversor internacional.

### 5. Miami — `/[locale]/miami`

**Función actual:** justificar Miami con estadísticas de migración, impuestos, demanda extranjera, transporte, precios y pipeline.

**Conservar**

- Una guía de contexto de mercado que ayude a decidir zonas, producto y horizonte.
- La sección de fuentes como práctica, siempre que se convierta en referencias verificables.
- El vínculo hacia proyectos y conversación.

**Reescribir**

- Reducir KPIs duplicados y explicar qué significan para una decisión inmobiliaria concreta.
- Reemplazar el enfoque “por qué invertir” unilateral por “cuándo Miami puede encajar y qué riesgos evaluar”.
- Convertir la navegación interna en secciones reales. Hoy existen anclas para empleo, impuestos, infraestructura y riesgos sin desarrollo equivalente.
- Evitar presentar “EE.UU. es único” y “liquidez inigualable” como conclusiones absolutas.

**Validar**

- Migración neta +372k, ingresos de entrantes +78%, 56M pasajeros, 8,2M cruceristas, 18% de compradores extranjeros y 0%/5,5%/~0,7% fiscales.
- Índice Case-Shiller ≈4,4×, “80+ años; 73/80 positivos” y resiliencia de largo plazo.
- Distribución por nacionalidad, pipeline de 20.600 condominios y 50% STR-friendly.
- Afirmaciones sobre precios normalizados, códigos, reforma de seguros, demanda, empleo, liquidez y conectividad.
- Edición, fecha y URL de cada fuente: hoy se citan organizaciones o reportes sin enlace ni metodología suficiente.

**Retirar de navegación**

- No aplica necesariamente. Puede quedar en navegación secundaria o como recurso desde Home; la arquitectura final debe evitar competir con Proyectos y el CTA principal.

**Eliminar posteriormente**

- Gráficos decorativos o cifras que no puedan reconstruirse desde una fuente identificada.
- Anclas vacías y estadísticas repetidas.

**Contenido faltante**

- Comparación útil de zonas, producto y perfiles de inversor.
- Riesgos de seguros, clima, expensas, regulación, ciclos de mercado y liquidez.
- Fecha de corte, metodología, enlaces y responsable editorial.

### 6. Financiación — `/[locale]/financiacion`

**Función actual:** resumir hipotecas para extranjeros, requisitos y proceso, con salida a WhatsApp.

**Conservar**

- Una explicación inicial de que puede existir financiación y qué documentación suele pedirse.
- El proceso por etapas y el CTA de consulta, si se aclara el rol de Esteban.

**Reescribir**

- Presentar la financiación como evaluación caso a caso, no como condición disponible.
- Definir si Esteban informa, coordina o refiere a un lender.
- Corregir los títulos del proceso: el código antepone “Complete”, “Visit” y “Sign” también al contenido en español y genera frases incoherentes.
- Cambiar “tasas competitivas” y “acceda” por lenguaje condicionado y verificable.

**Validar**

- 30% de down payment, plazos de 15–30 años, seis meses de reservas y documentos requeridos.
- Posibilidad de escriturar a nombre personal o corporativo.
- Disponibilidad para extranjeros, lender/proveedor, territorios atendidos y vigencia de términos.
- “Respuesta en horario local de Miami” como expectativa de servicio.

**Retirar de navegación**

- No es necesario retirarla, pero puede pasar a navegación secundaria si funciona como apoyo del proceso y no como producto independiente.

**Eliminar posteriormente**

- Condiciones específicas sin lender, fecha, rango o disclaimer.
- Verbos agregados de demostración que no fueron traducidos ni responden al proceso real.

**Contenido faltante**

- Disclaimer: no es oferta de crédito; aprobación, tasas y condiciones dependen del lender y del perfil.
- Costos, tiempos, moneda/ingresos, preaprobación y diferencias entre preconstrucción y reventa.
- Identidad y autorización de partners cuando corresponda.

### 7. Sobre mí — `/[locale]/sobre-mi`

**Función actual:** presentar biografía, credenciales, enfoque ROI y acompañamiento integral.

**Conservar**

- Una página personal con fotografía, historia, método y acceso directo a Esteban.
- El concepto de acompañamiento de principio a fin como posible diferenciador, sujeto a validación.
- La explicación de servicios en lenguaje comprensible.

**Reescribir**

- Priorizar por qué la experiencia de Esteban es relevante para el inversor, sin convertir la biografía en claims grandilocuentes.
- Separar historia personal, credenciales comprobables, alcance del servicio y método.
- Sustituir “desarrolladores confiables” y “curaduría” por criterios concretos y demostrables.

**Validar**

- Nacimiento en Paysandú, estudios de Ingeniería, liderazgo de Magenta por más de 15 años, relevancia de la empresa y continuidad actual.
- Residencia/base en Miami, español e inglés, licencia de Florida y uso de REALTOR®.
- Brokerage, rol, experiencia inmobiliaria, mercados y perfiles atendidos.
- Acompañamiento en due diligence, contratos, financiación y título; coordinación con abogados, lenders y property management.
- Foco en ROI, preservación de capital, planificación de salida y evaluación de developers.
- Fotografía actual y autorizada.

**Retirar de navegación**

- No retirar. Puede ubicarse como navegación secundaria o elemento de confianza persistente según la arquitectura final.

**Eliminar posteriormente**

- Cualquier credencial, trayectoria o alcance que Esteban no pueda documentar o no quiera hacer público.

**Contenido faltante**

- Número y estado de licencia, brokerage/rol exacto y disclosures obligatorios.
- Proceso propio, principios de trabajo y límites del asesoramiento.
- Evidencia autorizada: testimonios o casos sólo si existen.

### 8. Contacto — `/[locale]/contacto`

**Función actual:** captar nombre, email, teléfono y mensaje; ofrece WhatsApp como alternativa y redirige a Gracias.

**Conservar**

- Formulario breve, teléfono internacional, contacto por WhatsApp y confirmación posterior.
- Mensajes de error y éxito bilingües.
- El tono directo y el objetivo de coordinar una conversación.

**Reescribir**

- Explicar qué sucede después del envío: quién responde, para qué sirve la primera llamada y qué información conviene aportar.
- Unificar “I will contact you”, “we’ll schedule” y “te contactaré” con la voz de marca aprobada.
- Pedir sólo datos necesarios y explicar su uso.

**Validar**

- WhatsApp/teléfono, agenda, zonas horarias y tiempo de respuesta.
- Que el contacto inicial efectivamente conduce al proceso descrito.
- Destinatario y manejo operativo de leads, ya verificados técnicamente pero pendientes de definición comercial continua.

**Retirar de navegación**

- No aplica: debe permanecer accesible y convertirse en CTA claro.

**Eliminar posteriormente**

- Promesas de respuesta rápida o coordinación que no puedan cumplirse.
- Campos que no se utilicen en el proceso comercial.

**Contenido faltante**

- Aviso de privacidad/consentimiento y enlace a la política aprobada; no inventar texto legal.
- Expectativa de respuesta, huso horario y alternativa ante urgencias.
- Motivo de consulta o etapa del inversor, sólo si realmente ayuda a calificar y no agrega fricción innecesaria.

### 9. Storages — `/[locale]/storages`

**Función actual:** vender el modelo condo-storage y una oportunidad específica de Callaway con cifras comerciales.

**Conservar**

- La página y su URL, sin modificarla en esta fase.
- El contenido como registro de una línea comercial posible mientras se decide su futuro.

**Reescribir**

- Si la línea se valida, rehacerla como landing secundaria independiente, con contexto, riesgos, disclosures y evidencia.
- Evitar expresiones como “ingresos pasivos”, “renta fija”, “sin vacancia”, “salida fácil” o “reduce volatilidad” sin condiciones completas.

**Validar**

- Modelo de escritura individual, gestión, contrato de renta y subdivisión.
- Ocupación 92–96%, 51.000 instalaciones, USD 35B de facturación y demanda.
- Entrada desde USD 50.000, renta 7%/6%, pagos trimestrales, ausencia de gastos/vacancia y mecanismo de reventa.
- Callaway: unidades, superficie, ocupación, lote, año, mercado, demografía, ingresos y economía local.
- Disponibilidad actual, financiación, emisor/operador, contratos, riesgos, derechos de imagen y todos los materiales BAS.

**Retirar de navegación**

- Retirar Storages de la navegación principal, footer y promoción de Home mientras el foco sea preconstrucción y el contenido no esté validado.

**Eliminar posteriormente**

- La promoción transversal de Storages si se decide mantenerla sólo como landing secundaria.
- La ficha de Callaway o cualquier condición que ya no esté disponible.
- La página completa sólo si negocio decide archivar la línea y existe un plan de redirect; no hacerlo ahora.

**Contenido faltante**

- Decisión comercial explícita: activo, secundario o archivado.
- Riesgos, estructura legal, costos, impuestos, liquidez, contraparte y disclosures.
- Fuentes primarias, documentos contractuales, fecha de actualización y responsable.

### 10. Gracias — `/[locale]/gracias`

**Conservar**

- Confirmación bilingüe, no indexación y CTAs de continuidad.

**Reescribir / validar**

- “Te contactaremos a la brevedad” debe coincidir con el tiempo de respuesta real.
- La voz en inglés usa “we”; decidir si la marca habla como Esteban o como equipo.

**Contenido faltante**

- Próximo paso concreto y expectativa temporal confirmada.

### 11. Página 404 ES/EN

**Conservar**

- Mensaje localizado, no indexación y retorno a la Home.

**Reescribir**

- No es prioritario. En una fase futura puede ofrecer acceso a Proyectos o Contacto para rescatar la sesión.

## Navegación principal

**Estado actual:** ocho enlaces — Inicio/Home, Proyectos, Miami, Preconstrucción, Storages, Financiación, Sobre mí/About y Contacto— más selector de idioma.

**Conservar**

- Home, Proyectos, acceso a información educativa, contacto y selector ES/EN.

**Reescribir**

- Reducir la competencia entre ocho destinos y hacer evidente el camino principal: entender la propuesta, evaluar proyectos y conversar con Esteban.
- Evaluar un CTA visible de contacto/agenda en lugar de tratar Contacto como un enlace más.
- Revisar “Esteban Firpo · Miami Real Estate”: describe el sector, pero no el posicionamiento de asesoría en preconstrucción.

**Retirar de navegación**

- Storages de la navegación principal.
- Considerar Miami y Financiación como recursos secundarios si la futura navegación necesita simplificarse; no decidir sin la arquitectura aprobada.

**Validar**

- Prioridad del CTA y canal preferido de Esteban.
- Qué contenidos merecen navegación principal según objetivos comerciales y analítica.

**Contenido faltante**

- Etiqueta o agrupación de recursos/guías.
- Ruta clara para quien todavía no está listo para elegir un proyecto.

## Footer

**Conservar**

- Identidad, email, teléfono/WhatsApp, brokerage sujeto a validación y enlaces institucionales esenciales.

**Reescribir**

- La promesa “asesoría profesional en preventa y proyectos selectos” debe alinearse con el nuevo posicionamiento validado.
- Simplificar enlaces y convertir el footer en cierre de confianza y contacto.
- Revisar si la atribución tecnológica aporta valor al usuario final.

**Validar**

- “REALTOR® Associate”, Miami Life Realty, dirección, logo, teléfono, fotografía y derechos de uso.

**Retirar de navegación**

- El enlace a Storages mientras permanezca fuera del foco.

**Contenido faltante**

- Número de licencia/rol cuando corresponda, disclosures obligatorios y enlaces legales aprobados.
- Política de privacidad, especialmente porque existe un formulario de leads y medición analítica.

## Metadata y mensajes de buscadores/redes

**Conservar ahora**

- Títulos y descripciones institucionales genéricos implementados en Fase 0.
- Canonical, hreflang ES/EN, imagen social general y `noindex` de Gracias/404.
- Metadata genérica de ficha basada en nombre y ciudad mientras el catálogo no esté validado.

**Reescribir después de aprobar contenido**

- Home, Miami, Preconstrucción, Financiación y Sobre mí para reflejar intención de búsqueda y propuesta de valor sin claims no demostrados.
- Metadata de cada proyecto sólo después de validar el proyecto y definir una descripción específica factual.

**Validar**

- Nombre y ciudad usados en metadata de fichas.
- Estado de indexación deseado de Storages y cada proyecto en la gobernanza futura. No cambiarlo durante esta fase.

## Consistencia ES/EN

### Conservar

- Rutas paralelas, selector de idioma y metadata alterna.
- La intención general coincide entre idiomas en las páginas principales.

### Reescribir o corregir editorialmente

- Financiación antepone verbos en inglés (“Complete”, “Visit”, “Sign”) incluso a los pasos en español.
- Home y Gracias alternan voz personal y voz de equipo: “asesoro/I advise”, “conversemos”, “we’ll” y “we received”.
- “Storages” se usa como término de navegación en ambos idiomas sin explicar el modelo.
- La cita de Home tiene una traducción española forzada y no atribuye autor.
- Algunos textos alternativos y labels permanecen en español en la experiencia inglesa, por ejemplo imágenes del footer/Home y ciertos `aria-label`.
- Las fichas aceptan fallbacks que pueden mostrar `highlights` o políticas no traducidas cuando falta la variante inglesa.
- Español mezcla “amenities”, “developer”, “lenders”, “property management”, “cash buyers”, “down”, “equity” y “STR” sin glosario ni criterio uniforme.
- Financiación usa trato formal (“Acceda”) mientras el resto del sitio usa voseo (“Explorá”, “Agendá”, “Fijá”).

### Validar

- Idiomas que Esteban puede atender personalmente.
- Variante de español y tono inglés deseados.
- Si las versiones deben ser traducciones equivalentes o adaptaciones por perfil de mercado.

### Contenido faltante

- Glosario y guía editorial ES/EN.
- Flujo de revisión para impedir que una versión quede más actualizada que la otra.
- Regla para fechas, monedas, unidades, términos legales y siglas.

## Priorización de riesgos editoriales

### Prioridad 0 — no ampliar ni promover antes de validar

- Precios, disponibilidad, entregas, renta, financiación y planes de pago de los 36 proyectos.
- Rendimientos, ROI, apreciación, ocupación, “renta fija”, “sin vacancia”, liquidez y salida.
- Credenciales, licencia, REALTOR®/NAR, brokerage, experiencia e idiomas.
- Recomendaciones fiscales, financieras y legales.
- Storages y Callaway.

### Prioridad 1 — reescribir para la próxima experiencia

- Hero y propuesta de valor de Home.
- Proceso de asesoramiento y rol de Esteban.
- Introducción/criterios del catálogo.
- Preconstrucción como guía equilibrada.
- Sobre mí como evidencia de confianza.
- Contacto y expectativa de siguiente paso.

### Prioridad 2 — depuración y gobernanza

- Estadísticas de Miami y sus fuentes.
- Paridad ES/EN, glosario y tono.
- Navegación/footer simplificados.
- Metadata específica cuando el contenido haya sido aprobado.
- Retiro de duplicados, anclas vacías y CTAs/filtros que no corresponden con su destino.

## Decisión editorial recomendada por activo

| Activo | Decisión provisional | Condición para avanzar |
|---|---|---|
| Home | Reescribir | Posicionamiento y hechos de confianza aprobados |
| Proyectos | Conservar y reencuadrar | Catálogo con estado y fecha de validación |
| 36 fichas | Mantener accesibles, no promover | Validación individual y derechos de contenido |
| Preconstrucción | Reescribir como guía | Revisión de claims y disclosures |
| Miami | Simplificar y actualizar | Fuentes primarias y fecha de corte |
| Financiación | Reescribir como orientación | Rol, partner y condiciones confirmados |
| Sobre mí | Reescribir | Credenciales y biografía documentadas |
| Contacto | Conservar y aclarar | Canal, proceso, privacidad y SLA aprobados |
| Storages | Retirar de navegación/promoción | Decisión comercial y validación integral |
| Gracias/404 | Conservar | Ajustes menores de voz y próximos pasos |
| Navegación/footer | Simplificar en fase visual | Arquitectura de información aprobada |
| Metadata | Conservar genérica | Reescribir sólo con contenido validado |

## Criterio de cierre de la auditoría

Antes de redactar contenido público nuevo, cada afirmación debe tener una de estas evidencias:

1. confirmación escrita de Esteban para hechos personales y operativos;
2. documento oficial vigente para licencia, brokerage y afiliaciones;
3. fuente primaria, fecha y metodología para estadísticas;
4. documento del developer o partner, fecha y responsable para datos comerciales;
5. autorización de uso para fotografías, renders, logos, testimonios y casos.

Si no existe evidencia, el contenido debe presentarse como hipótesis interna, pregunta a resolver o eliminarse del futuro texto público. Esta auditoría no autoriza cambios en datos, diseño, navegación, metadata ni producción.

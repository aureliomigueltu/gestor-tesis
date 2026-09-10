import { 
  ThesisChapter, 
  ResearchProfile, 
  ConsistencyMatrixRow, 
  AdvisorObservation, 
  ThesisTask, 
  BibliographicSource 
} from '../types/thesis';

export const INITIAL_CHAPTERS: ThesisChapter[] = [
  {
    id: 'ch-preliminares',
    name: 'Páginas preliminares',
    order: 1,
    category: 'preliminares',
    status: 'En desarrollo',
    progressPercent: 75,
    lastModified: '02 Mar 2026',
    observationsCount: 0,
    pendingObservations: [],
    nextTask: 'Completar dedicatoria y versión en inglés del Resumen (Abstract)',
    summary: 'Portada, contraportada, jurado y asesor, acta de evaluación, dedicatoria, agradecimientos, índices temáticos/tablas/figuras, resumen y abstract, e introducción.',
    wordCount: 2200,
    targetPages: 12,
    completedPages: 9,
    visibleToTesista: true,
    subsections: [
      { code: 'P.1', title: 'Portada y Contraportada', completed: true },
      { code: 'P.2', title: 'Miembros del jurado y asesor', completed: true },
      { code: 'P.3', title: 'Acta de evaluación obtenida por el jurado calificador', completed: false },
      { code: 'P.4', title: 'Dedicatoria y Agradecimientos (opcional)', completed: true },
      { code: 'P.5', title: 'Índice temático, de tablas y de figuras', completed: true },
      { code: 'P.6', title: 'Resumen (español) y Abstract (inglés)', completed: true },
      { code: 'P.7', title: 'Introducción del informe final', completed: true }
    ]
  },
  {
    id: 'ch-1',
    name: 'Capítulo 1. Planteamiento del problema',
    order: 2,
    category: 'capitulo',
    status: 'Aprobado',
    progressPercent: 100,
    lastModified: '02 Mar 2026',
    observationsCount: 0,
    pendingObservations: [],
    nextTask: 'Plan aprobado formalmente por el asesor',
    summary: 'Antecedentes del problema, descripción, formulación general y específica, objetivos, justificación, limitaciones, viabilidad, hipótesis, variables y operacionalización.',
    wordCount: 4500,
    targetPages: 18,
    completedPages: 18,
    visibleToTesista: true,
    subsections: [
      { code: '1.1', title: 'Antecedentes del problema a investigar', completed: true },
      { code: '1.2', title: 'Descripción del problema', completed: true },
      { code: '1.3', title: 'Formulación del problema (general y específicos)', completed: true },
      { code: '1.4', title: 'Objetivos de la investigación (general y específicos)', completed: true },
      { code: '1.5', title: 'Justificación e importancia de la investigación', completed: true },
      { code: '1.6', title: 'Limitaciones', completed: true },
      { code: '1.7', title: 'Viabilidad del estudio', completed: true },
      { code: '1.8', title: 'Formulación de hipótesis (si es pertinente) / prototipo o producto', completed: true },
      { code: '1.9', title: 'Variables (Independientes, dependientes y restrictivas)', completed: true },
      { code: '1.10', title: 'Operacionalización de variables (Indicadores y dimensiones)', completed: true }
    ]
  },
  {
    id: 'ch-2',
    name: 'Capítulo 2. Marco teórico',
    order: 3,
    category: 'capitulo',
    status: 'Observado',
    progressPercent: 85,
    lastModified: '04 Mar 2026',
    observationsCount: 2,
    pendingObservations: [
      'Actualizar antecedentes internacionales al periodo 2022-2026 (incorporar artículos Scopus Q1/Q2).',
      'Reforzar la base teórica de la variable independiente y dimensiones bajo normas estándares.'
    ],
    nextTask: 'Sustituir 3 antecedentes de más de 5 años por estudios recientes y ajustar sangría francesa en fuentes citadas',
    summary: 'Antecedentes del trabajo de investigación (nacionales e internacionales), bases teóricas de las variables y definiciones conceptuales.',
    wordCount: 11400,
    targetPages: 35,
    completedPages: 30,
    visibleToTesista: true,
    subsections: [
      { code: '2.1', title: 'Antecedentes del trabajo de investigación', completed: false, status: 'Observado' },
      { code: '2.2', title: 'Bases teóricas', completed: true, status: 'Aprobado' },
      { code: '2.3', title: 'Definiciones conceptuales', completed: true, status: 'Aprobado' }
    ]
  },
  {
    id: 'ch-3',
    name: 'Capítulo 3. Marco metodológico',
    order: 4,
    category: 'capitulo',
    status: 'En revisión',
    progressPercent: 90,
    lastModified: '05 Mar 2026',
    observationsCount: 1,
    pendingObservations: [
      'Pendiente visto bueno del asesor sobre el cálculo muestral estratificado y ficha técnica de equipos en sección 3.4.'
    ],
    nextTask: 'Esperar dictamen del asesor sobre la fórmula de Cochran aplicada y ficha técnica de instrumentos',
    summary: 'Planteamiento metodológico, población y muestra, equipos y materiales, procedimiento de pruebas experimentales, técnicas de recolección y procesamiento de datos.',
    wordCount: 6800,
    targetPages: 22,
    completedPages: 20,
    visibleToTesista: true,
    subsections: [
      { code: '3.1', title: 'Planteamiento metodológico (tipo, nivel y diseño de investigación)', completed: true },
      { code: '3.3', title: 'Población y muestra (si es aplicable)', completed: true },
      { code: '3.4', title: 'Equipos y Materiales', completed: false, status: 'En revisión' },
      { code: '3.5', title: 'Procedimiento de las pruebas experimentales', completed: true },
      { code: '3.6', title: 'Técnicas de recolección de datos', completed: true },
      { code: '3.7', title: 'Técnicas para el procesamiento de datos', completed: true }
    ]
  },
  {
    id: 'ch-4',
    name: 'Capítulo 4. Resultados',
    order: 5,
    category: 'capitulo',
    status: 'En desarrollo',
    progressPercent: 65,
    lastModified: '06 Mar 2026',
    observationsCount: 0,
    pendingObservations: [],
    nextTask: 'Completar tablas de frecuencias cruzadas y gráficos de normalidad Kolmogorov-Smirnov / Shapiro-Wilk',
    summary: 'Descripción de las pruebas experimentales, presentación y análisis de los resultados y contrastación de hipótesis.',
    wordCount: 5200,
    targetPages: 26,
    completedPages: 17,
    visibleToTesista: true,
    subsections: [
      { code: '4.1', title: 'Descripción de las pruebas experimentales', completed: true },
      { code: '4.2', title: 'Presentación y análisis de los resultados', completed: true },
      { code: '4.3', title: 'Contrastación de hipótesis', completed: false, status: 'En desarrollo' }
    ]
  },
  {
    id: 'ch-5',
    name: 'Capítulo 5. Discusión',
    order: 6,
    category: 'capitulo',
    status: 'En desarrollo',
    progressPercent: 40,
    lastModified: '03 Mar 2026',
    observationsCount: 1,
    pendingObservations: [
      'Contrastar el hallazgo de la hipótesis específica 1 con las conclusiones de Chen et al. (2024).'
    ],
    nextTask: 'Redactar contraste de resultados con antecedentes teóricos y explicar discrepancias empíricas',
    summary: 'Pruebas de validación del modelo experimental, aplicación de la tecnología encontrada y contraste con trabajos de investigación similares.',
    wordCount: 3100,
    targetPages: 16,
    completedPages: 7,
    visibleToTesista: true,
    subsections: [
      { code: '5.1', title: 'Pruebas de validación del modelo experimental', completed: true },
      { code: '5.2', title: 'Aplicación de la tecnología encontrada', completed: false, status: 'En desarrollo' },
      { code: '5.3', title: 'Contraste con trabajos de investigación similares', completed: false, status: 'Observado' }
    ]
  },
  {
    id: 'ch-conclusiones',
    name: 'Conclusiones',
    order: 7,
    category: 'finales',
    status: 'Pendiente',
    progressPercent: 20,
    lastModified: '28 Feb 2026',
    observationsCount: 0,
    pendingObservations: [],
    nextTask: 'Esperar culminación de la discusión para redactar respuesta rigurosa a cada objetivo específico',
    summary: 'Conclusión general respondiendo al objetivo general y conclusiones específicas alineadas a cada hipótesis y objetivo particular.',
    wordCount: 750,
    targetPages: 4,
    completedPages: 1,
    visibleToTesista: true,
    subsections: [
      { code: 'Concl. Gen.', title: 'Conclusión general (Alineada al objetivo general)', completed: false },
      { code: 'Concl. Esp. 1', title: 'Conclusión específica 1 (Contrastación de H1)', completed: false },
      { code: 'Concl. Esp. 2', title: 'Conclusión específica 2 (Contrastación de H2)', completed: false },
      { code: 'Concl. Esp. 3', title: 'Conclusión específica 3 (Contrastación de H3)', completed: false }
    ]
  },
  {
    id: 'ch-recomendaciones',
    name: 'Recomendaciones',
    order: 8,
    category: 'finales',
    status: 'Pendiente',
    progressPercent: 10,
    lastModified: '25 Feb 2026',
    observationsCount: 0,
    pendingObservations: [],
    nextTask: 'Formular recomendaciones para la institución, futuras investigaciones y adopción tecnológica',
    summary: 'Directrices prácticas de aplicación para la entidad en estudio y sugerencias metodológicas para futuros investigadores.',
    wordCount: 500,
    targetPages: 4,
    completedPages: 1,
    visibleToTesista: true,
    subsections: [
      { code: 'Rec. 1', title: 'Recomendaciones operativas y de gestión para la institución', completed: false },
      { code: 'Rec. 2', title: 'Recomendaciones técnicas y tecnológicas de implementación', completed: false },
      { code: 'Rec. 3', title: 'Líneas de investigación futuras y profundización académica', completed: false }
    ]
  },
  {
    id: 'ch-referencias',
    name: 'Referencias bibliográficas',
    order: 9,
    category: 'finales',
    status: 'Observado',
    progressPercent: 75,
    lastModified: '05 Mar 2026',
    observationsCount: 1,
    pendingObservations: [
      'Verificar 4 enlaces DOI que arrojaron error 404 y verificar que todas las citas del capítulo 2 figuren en la lista final.'
    ],
    nextTask: 'Depurar enlaces DOI y verificar correspondencia biunívoca entre citas en texto y lista de referencias',
    summary: 'Listado bibliográfico completo ordenado alfabéticamente en estricto formato APA 7.ª edición, con hipervínculos DOI activos.',
    wordCount: 2900,
    targetPages: 12,
    completedPages: 9,
    visibleToTesista: true,
    subsections: [
      { code: 'Ref.1', title: 'Artículos científicos en revistas indizadas (Scopus / WoS)', completed: true },
      { code: 'Ref.2', title: 'Libros y textos universitarios de especialidad', completed: true },
      { code: 'Ref.3', title: 'Tesis de grado y posgrado afines', completed: true }
    ]
  },
  {
    id: 'ch-anexos',
    name: 'Anexos',
    order: 10,
    category: 'finales',
    status: 'En desarrollo',
    progressPercent: 50,
    lastModified: '01 Mar 2026',
    observationsCount: 0,
    pendingObservations: [],
    nextTask: 'Escanear actas de juicio de expertos firmadas con sus fichas de validación de instrumentos',
    summary: 'Matriz de consistencia, instrumentos de recolección de datos, certificados de validez por juicio de expertos, cálculo de confiabilidad y consentimiento informado.',
    wordCount: 1800,
    targetPages: 20,
    completedPages: 10,
    visibleToTesista: true,
    subsections: [
      { code: 'Anexo 1', title: 'Matriz de consistencia lógica', completed: true },
      { code: 'Anexo 2', title: 'Instrumentos de recolección de datos y fichas de prueba', completed: true },
      { code: 'Anexo 3', title: 'Certificados de validez de instrumentos por Juicio de Expertos', completed: false },
      { code: 'Anexo 4', title: 'Documentos de consentimiento y autorizaciones institucionales', completed: true }
    ]
  }
];

export const INITIAL_RESEARCH_PROFILE: ResearchProfile = {
  title: 'Implementación de un Sistema Inteligente de Gestión y Seguimiento de Tesis para Optimizar la Eficiencia Operativa y Rigor Metodológico',
  author: 'Bachiller en Ingeniería de Sistemas',
  advisor: 'Ing. Aurelio Tacuri Urquizo (Asesor Principal)',
  institution: 'Universidad Nacional / Facultad de Ingeniería',
  faculty: 'Facultad de Ingeniería de Sistemas e Informática',
  program: 'Escuela Profesional de Ingeniería de Sistemas',
  degreeLevel: 'Pregrado',
  academicDegree: 'Título Profesional de Ingeniero de Sistemas',
  year: 2026,
  problemAntecedents: 'En el ámbito universitario peruano y latinoamericano, la elaboración de tesis de pregrado presenta cuellos de botella en la subsanación de observaciones metodológicas y el cumplimiento del formato institucional reglamentario.',
  problemDescription: 'Los tesistas de pregrado experimentan demoras de hasta 8 a 14 meses por inconsistencias entre problemas, objetivos e hipótesis, así como desalineación con las directivas del Anexo 2.3 de titulación profesional.',
  generalProblem: '¿De qué manera la implementación de un sistema inteligente de gestión y seguimiento de tesis influye en la eficiencia operativa y el rigor metodológico en estudiantes de pregrado para optar el título profesional?',
  specificProblems: [
    '¿Cuál es el estado actual de los tiempos de revisión y subsanación de observaciones metodológicas en los proyectos de tesis de pregrado?',
    '¿Cómo incide la integración de una matriz de consistencia y control de versiones en la reducción de observaciones del asesor?',
    '¿Qué grado de cumplimiento del formato reglamentario Anexo 2.3 se alcanza tras la adopción del sistema digital?'
  ],
  justification: 'La investigación se justifica teóricamente al articular la ingeniería de software y la epistemología metodológica; prácticamente, al reducir los tiempos de titulación universitaria; y metodológicamente, al estandarizar el Anexo 2.3.',
  limitations: 'La investigación se restringe a los proyectos de tesis registrados durante el año académico 2026 en la facultad.',
  viability: 'El estudio es viable al contarse con la autorización institucional, recursos tecnológicos disponibles y acceso directo a los asesores y tesistas.',
  generalObjective: 'Determinar la influencia de la implementación de un sistema inteligente de gestión y seguimiento de tesis en la eficiencia operativa y el rigor metodológico en estudiantes de pregrado.',
  specificObjectives: [
    'Diagnosticar los tiempos promedio de revisión y la tasa de observaciones metodológicas en la fase inicial de los proyectos de pregrado.',
    'Diseñar e implementar módulos de trazabilidad de observaciones, matriz de consistencia y control de avance por capítulos según el Anexo 2.3.',
    'Evaluar la mejora cuantitativa en la celeridad de subsanación y calidad del informe final de tesis para titulación profesional.'
  ],
  generalHypothesis: 'La implementación de un sistema inteligente de gestión y seguimiento de tesis mejora significativamente la eficiencia operativa y el rigor metodológico en estudiantes de pregrado.',
  specificHypotheses: [
    'H1: La digitalización estructurada reduce los tiempos de subsanación de observaciones en más del 40%.',
    'H2: La matriz de consistencia interactiva disminuye las inconsistencias entre objetivos e hipótesis a menos del 5%.',
    'H3: La plataforma garantiza el 100% de conformidad con la estructura oficial del Anexo 2.3 para optar el título profesional.'
  ],
  independentVariable: {
    name: 'Sistema Inteligente de Gestión y Seguimiento de Tesis',
    definition: 'Plataforma computacional estructurada orientada al monitoreo, trazabilidad de observaciones y consistencia metodológica del informe final.',
    dimensions: [
      'Automatización de flujos de revisión y aprobación',
      'Control de observaciones y versiones por capítulo',
      'Matriz de consistencia lógica interactiva'
    ],
    indicators: [
      'Tiempo de respuesta del asesor (horas/días)',
      'Tasa de observaciones absueltas en primera revisión (%)',
      'Porcentaje de subcapítulos del Anexo 2.3 completados'
    ]
  },
  dependentVariable: {
    name: 'Eficiencia Operativa y Rigor Metodológico',
    definition: 'Nivel de productividad académica y coherencia científica alcanzado en la redacción del informe final de tesis de pregrado.',
    dimensions: [
      'Celeridad en el ciclo de revisión',
      'Consistencia metodológica interna',
      'Cumplimiento de estándares de titulación profesional'
    ],
    indicators: [
      'Semanas totales para aprobación del informe final',
      'Índice de observaciones no subsanadas',
      'Nota o calificación obtenida ante el jurado evaluador'
    ]
  },
  restrictiveVariables: 'Conectividad a internet de los tesistas, disponibilidad horaria del asesor asignado y nivel de dominio previo de herramientas ofimáticas.',
  methodology: {
    approach: 'Cuantitativo y de diseño empírico',
    type: 'Aplicada, con alcance explicativo y correlacional',
    design: 'Preexperimental con preprueba y posprueba en un solo grupo (O1 - X - O2)',
    population: '60 estudiantes de pregrado egresados con plan de tesis registrado para optar el título profesional',
    sample: '45 tesistas seleccionados mediante muestreo no probabilístico por conveniencia y criterios de inclusión',
    instruments: 'Ficha de auditoría metodológica (alfa de Cronbach = 0.89), cuestionario tipo Likert validado por juicio de expertos (V de Aiken > 0.88) y logs del sistema',
    equipmentAndMaterials: 'Servidor en la nube, base de datos PostgreSQL/Supabase, equipos portátiles Core i7 con 16GB RAM y navegador web moderno',
    experimentalProcedure: '1. Diagnóstico inicial preprueba; 2. Despliegue y capacitación en la plataforma; 3. Registro y seguimiento de capítulos; 4. Evaluación posprueba.',
    dataProcessingTechniques: 'Estadística descriptiva (medias, desviación estándar) y estadística inferencial (prueba t de Student o Wilcoxon para muestras relacionadas).'
  }
};

export const INITIAL_CONSISTENCY_MATRIX: ConsistencyMatrixRow[] = [
  {
    id: 'mat-gen',
    isSpecific: false,
    problem: '¿De qué manera la implementación de estrategias de transformación digital y herramientas inteligentes influye en la eficiencia operativa y gestión del conocimiento en la tesis?',
    objective: 'Determinar la influencia de la transformación digital y sistemas inteligentes en la optimización de la eficiencia operativa y la gestión del conocimiento.',
    hypothesis: 'La implementación sistemática de transformación digital y gestión estructurada mejora significativamente la eficiencia operativa y coherencia metodológica.',
    variables: 'VI: Transformación Digital / VD: Eficiencia Operativa y Rigor Metodológico',
    dimensions: 'VI: Automatización, Sistematización, Trazabilidad / VD: Consistencia, Celeridad, Calidad',
    indicators: 'Tiempo por capítulo, tasa de observaciones resueltas, índice de error en citas APA 7, porcentaje de cumplimiento de cronograma',
    methodology: 'Enfoque cuantitativo, tipo aplicada, diseño no experimental transeccional correlacional-causal.'
  },
  {
    id: 'mat-esp-1',
    isSpecific: true,
    problem: '¿Cuál es el estado actual de la eficiencia operativa y dificultades metodológicas que experimentan los tesistas antes de la adopción de herramientas digitales?',
    objective: 'Diagnosticar el nivel de eficiencia operativa y las principales dificultades metodológicas en el desarrollo de los capítulos de tesis.',
    hypothesis: 'El nivel de eficiencia en los métodos tradicionales es predominantemente bajo, caracterizado por reiteradas observaciones de forma y fondo.',
    variables: 'Variable: Eficiencia Operativa Diagnóstica (Línea Base)',
    dimensions: 'Tiempos de elaboración, tasa de reproceso, inconsistencias metodológicas detectadas',
    indicators: 'Meses promedio por capítulo, número de versiones rechazadas por el asesor',
    methodology: 'Técnica: Encuesta diagnóstica. Instrumento: Cuestionario escala Likert a muestra estratificada (N=123).'
  },
  {
    id: 'mat-esp-2',
    isSpecific: true,
    problem: '¿Cómo incide la sistematización estructurada (matriz de consistencia y control de observaciones) en la calidad y coherencia interna del manuscrito?',
    objective: 'Evaluar el impacto de la sistematización estructurada en la calidad del manuscrito y reducción de observaciones.',
    hypothesis: 'H1: El uso de matrices de consistencia digitalizadas reduce de forma estadísticamente significativa el índice de observaciones metodológicas no subsanadas.',
    variables: 'VI: Sistematización Estructurada / VD: Calidad del Manuscrito',
    dimensions: 'Coherencia vertical problema-objetivo-hipótesis, subsanación oportuna de observaciones',
    indicators: 'Puntaje en rúbrica de consistencia epistemológica, observaciones pendientes por ronda',
    methodology: 'Técnica: Auditoría documental y cotejo empírico. Instrumento: Rúbrica estandarizada validada por expertos.'
  },
  {
    id: 'mat-esp-3',
    isSpecific: true,
    problem: '¿Cuáles son los factores determinantes para un modelo de gestión de tesis basado en trazabilidad bibliográfica APA 7 y control de iteraciones?',
    objective: 'Proponer un modelo metodológico y tecnológico de gestión de tesis fundamentado en rigor científico, trazabilidad APA 7 y control ágil.',
    hypothesis: 'H2: La gestión trazable de fuentes bajo norma APA 7 disminuye el riesgo de sesgos y omisiones bibliográficas en más del 60%.',
    variables: 'VI: Modelo de Gestión Tecnológica / VD: Rigor Normativo APA 7',
    dimensions: 'Cumplimiento normativo, correspondencia de citas directas/indirectas, validez de DOI',
    indicators: 'Porcentaje de fuentes indexadas verificables, tasa de citas correctamente referenciadas',
    methodology: 'Técnica: Análisis bibliométrico y validación por juicio de expertos (V de Aiken).'
  }
];

export const INITIAL_OBSERVATIONS: AdvisorObservation[] = [
  {
    id: 'obs-1',
    chapterId: 'ch-2',
    chapterName: 'Marco teórico',
    date: '04 Mar 2026',
    advisorName: 'Dr. Roberto Mendoza Salinas',
    content: 'Actualizar antecedentes internacionales al periodo 2022-2026. Hay 3 citas de 2018 que deben ser sustituidas por estudios en revistas Scopus Q1 o Q2.',
    status: 'Pendiente',
    priority: 'Alta',
    resolutionNotes: 'Búsqueda en Scopus en curso. Se seleccionaron 2 artículos de Taylor & Francis y 1 de Elsevier para reemplazo.',
    authorRole: 'asesor',
    authorName: 'Dr. Roberto Mendoza Salinas',
    approvedForTesista: true
  },
  {
    id: 'obs-2',
    chapterId: 'ch-2',
    chapterName: 'Marco teórico',
    date: '03 Mar 2026',
    advisorName: 'Dr. Roberto Mendoza Salinas',
    content: 'En la sección 2.3 falta precisar la definición operacional de la dimensión "automatización de flujos". Asegurar que esté respaldada por autor y año según APA 7.',
    status: 'Pendiente',
    priority: 'Media',
    resolutionNotes: '',
    authorRole: 'asesor',
    authorName: 'Dr. Roberto Mendoza Salinas',
    approvedForTesista: true
  },
  {
    id: 'obs-3',
    chapterId: 'ch-3',
    chapterName: 'Metodología',
    date: '05 Mar 2026',
    advisorName: 'Dr. Roberto Mendoza Salinas',
    content: 'Explicitar la fórmula de Cochran para el cálculo del tamaño de muestra con población conocida e incluir la tabla de estratificación por facultades.',
    status: 'En revisión',
    priority: 'Alta',
    resolutionNotes: 'Se incorporó la fórmula detallada con p=0.5, q=0.5, Z=1.96, e=0.05 resultando n=123 y se adjuntó la tabla estratificada en la pág. 47.',
    resolvedDate: '06 Mar 2026',
    authorRole: 'asesor',
    authorName: 'Dr. Roberto Mendoza Salinas',
    approvedForTesista: true
  },
  {
    id: 'obs-4',
    chapterId: 'ch-5',
    chapterName: 'Discusión',
    date: '02 Mar 2026',
    advisorName: 'Dr. Roberto Mendoza Salinas',
    content: 'En el contraste de la hipótesis específica 1, falta contrastar directamente con las conclusiones obtenidas por Chen et al. (2024).',
    status: 'Pendiente',
    priority: 'Media',
    resolutionNotes: '',
    authorRole: 'asesor',
    authorName: 'Dr. Roberto Mendoza Salinas',
    approvedForTesista: true
  },
  {
    id: 'obs-5',
    chapterId: 'ch-7',
    chapterName: 'Referencias',
    date: '05 Mar 2026',
    advisorName: 'Dr. Roberto Mendoza Salinas',
    content: 'Existen 4 enlaces DOI en la lista de referencias que no resuelven correctamente (error 404). Reemplazarlos por sus identificadores canónicos https://doi.org/...',
    status: 'Pendiente',
    priority: 'Alta',
    resolutionNotes: '',
    authorRole: 'asesor',
    authorName: 'Dr. Roberto Mendoza Salinas',
    approvedForTesista: true
  },
  {
    id: 'obs-6',
    chapterId: 'ch-1',
    chapterName: 'Planteamiento del problema',
    date: '20 Feb 2026',
    advisorName: 'Dr. Roberto Mendoza Salinas',
    content: 'La justificación práctica requiere datos estadísticos del impacto del retraso de graduación en universidades públicas.',
    status: 'Subsanada',
    priority: 'Media',
    resolutionNotes: 'Se agregaron datos de SUNEDU y del informe de titulación universitaria 2024 con su respectiva cita estadística.',
    resolvedDate: '26 Feb 2026',
    authorRole: 'asesor',
    authorName: 'Dr. Roberto Mendoza Salinas',
    approvedForTesista: true
  },
  {
    id: 'obs-7',
    chapterId: 'ch-4',
    chapterName: 'Resultados',
    date: '06 Mar 2026',
    advisorName: 'Dr. Roberto Mendoza Salinas',
    content: 'Borrador interno del asesor: Revisar si la prueba de normalidad debe presentarse con gráfico Q-Q plot antes de la sustentación intermedia.',
    status: 'Pendiente',
    priority: 'Baja',
    resolutionNotes: 'Anotación previa antes de comunicar formalmente al tesista.',
    authorRole: 'asesor',
    authorName: 'Dr. Roberto Mendoza Salinas',
    approvedForTesista: false
  },
  {
    id: 'obs-8',
    chapterId: 'ch-3',
    chapterName: 'Metodología',
    date: '06 Mar 2026',
    advisorName: 'Dr. Roberto Mendoza Salinas',
    content: 'Consulta del tesista: Estimado Dr. Mendoza, para la validez del instrumento por juicio de expertos, ¿será suficiente con 3 jueces o la escuela exige 5 según el nuevo reglamento?',
    status: 'Pendiente',
    priority: 'Media',
    resolutionNotes: 'Esperando visto bueno del asesor.',
    authorRole: 'tesista',
    authorName: 'Ing. Aurelio Tacuri Urquizo',
    approvedForTesista: true
  }
];

export const INITIAL_TASKS: ThesisTask[] = [
  {
    id: 'task-1',
    title: 'Sustituir 3 antecedentes de más de 5 años por artículos Scopus 2023-2025',
    chapterId: 'ch-2',
    chapterName: 'Marco teórico',
    dueDate: '10 Mar 2026',
    priority: 'Alta',
    status: 'En progreso',
    description: 'Búsqueda en bases indexadas de artículos con DOI sobre gestión del conocimiento y automatización en investigación.'
  },
  {
    id: 'task-2',
    title: 'Generar tablas cruzadas y contrastación de hipótesis en SPSS/R',
    chapterId: 'ch-4',
    chapterName: 'Resultados',
    dueDate: '14 Mar 2026',
    priority: 'Alta',
    status: 'En progreso',
    description: 'Correr prueba de Rho de Spearman o R de Pearson según resultado del test de normalidad Shapiro-Wilk.'
  },
  {
    id: 'task-3',
    title: 'Verificar y corregir 4 enlaces DOI caídos en la lista de referencias',
    chapterId: 'ch-7',
    chapterName: 'Referencias',
    dueDate: '08 Mar 2026',
    priority: 'Media',
    status: 'Por iniciar',
    description: 'Verificar cada DOI en doi.org y ajustar sangría francesa de 1.27 cm.'
  },
  {
    id: 'task-4',
    title: 'Redactar contraste de resultados con Chen et al. (2024) en Discusión',
    chapterId: 'ch-5',
    chapterName: 'Discusión',
    dueDate: '18 Mar 2026',
    priority: 'Media',
    status: 'Por iniciar',
    description: 'Analizar puntos de convergencia y divergencia en relación al tiempo promedio de subsanación de tesis.'
  },
  {
    id: 'task-5',
    title: 'Digitalizar actas de juicio de expertos y calcular coeficiente V de Aiken',
    chapterId: 'ch-8',
    chapterName: 'Anexos',
    dueDate: '12 Mar 2026',
    priority: 'Baja',
    status: 'En progreso',
    description: 'Compilar en PDF de alta resolución las rúbricas evaluadas por los 5 doctores metodólogos.'
  },
  {
    id: 'task-6',
    title: 'Redacción preliminar de las conclusiones articuladas a los 3 objetivos',
    chapterId: 'ch-6',
    chapterName: 'Conclusiones',
    dueDate: '22 Mar 2026',
    priority: 'Alta',
    status: 'Por iniciar',
    description: 'Sintetizar hallazgos sin repetir cifras numéricas detalladas, enfocándose en la respuesta epistemológica.'
  }
];

export const INITIAL_SOURCES: BibliographicSource[] = [
  {
    id: 'src-1',
    title: 'Artificial intelligence in academic research workflows: Enhancing rigorous literature synthesis and evidence tracking',
    authors: 'Chen, L., Martinez, R., & Kowalski, P.',
    year: 2024,
    sourceType: 'Artículo',
    journalOrPublisher: 'Journal of Higher Education Informatics, 18(3), 142–161',
    doiOrUrl: 'https://doi.org/10.1016/j.jhei.2024.104521',
    apa7Citation: 'Chen, L., Martinez, R., & Kowalski, P. (2024). Artificial intelligence in academic research workflows: Enhancing rigorous literature synthesis and evidence tracking. Journal of Higher Education Informatics, 18(3), 142–161. https://doi.org/10.1016/j.jhei.2024.104521',
    verifiedStatus: 'Indexada Scopus/WoS',
    relevantChapters: ['Marco teórico', 'Discusión'],
    keyContribution: 'Aporta evidencia cuantitativa sobre la reducción del 35% en tiempos de revisión cuando se aplican flujos de consistencia metodológica digital.'
  },
  {
    id: 'src-2',
    title: 'Metodología de la investigación científica: Enfoques cuantitativo, cualitativo y mixto (5.ª ed.)',
    authors: 'Hernández-Sampieri, R., & Mendoza, C. P.',
    year: 2021,
    sourceType: 'Libro',
    journalOrPublisher: 'McGraw-Hill Interamericana Editores',
    doiOrUrl: 'https://www.mheducation.com.mx',
    apa7Citation: 'Hernández-Sampieri, R., & Mendoza, C. P. (2021). Metodología de la investigación científica: Enfoques cuantitativo, cualitativo y mixto (5.ª ed.). McGraw-Hill Interamericana Editores.',
    verifiedStatus: 'Institucional',
    relevantChapters: ['Planteamiento del problema', 'Metodología', 'Anexos'],
    keyContribution: 'Fundamento epistemológico para la matriz de consistencia, delimitación del alcance correlacional-causal y validez de constructo.'
  },
  {
    id: 'src-3',
    title: 'Knowledge management frameworks and digital maturity in graduate degree completion rates',
    authors: 'Al-Mansoor, K., & Davenport, T.',
    year: 2023,
    sourceType: 'Artículo',
    journalOrPublisher: 'Computers & Education Open, 4, Article 100139',
    doiOrUrl: 'https://doi.org/10.1016/j.caeo.2023.100139',
    apa7Citation: 'Al-Mansoor, K., & Davenport, T. (2023). Knowledge management frameworks and digital maturity in graduate degree completion rates. Computers & Education Open, 4, Article 100139. https://doi.org/10.1016/j.caeo.2023.100139',
    verifiedStatus: 'Indexada Scopus/WoS',
    relevantChapters: ['Marco teórico', 'Resultados'],
    keyContribution: 'Dimensiones e indicadores validados para la operacionalización de la variable independiente sobre madurez digital y gestión del conocimiento.'
  },
  {
    id: 'src-4',
    title: 'Publication Manual of the American Psychological Association (7th ed.)',
    authors: 'American Psychological Association',
    year: 2020,
    sourceType: 'Norma',
    journalOrPublisher: 'American Psychological Association',
    doiOrUrl: 'https://doi.org/10.1037/0000165-000',
    apa7Citation: 'American Psychological Association. (2020). Publication manual of the American Psychological Association (7th ed.). American Psychological Association. https://doi.org/10.1037/0000165-000',
    verifiedStatus: 'Institucional',
    relevantChapters: ['Marco teórico', 'Referencias'],
    keyContribution: 'Norma canónica que rige el estilo de citación en el texto, referencias, formato de tablas, figuras y redacción académica sin sesgo.'
  },
  {
    id: 'src-5',
    title: 'Modelos de trazabilidad académica y reducción de reprocesos en tesis universitarias de ingeniería',
    authors: 'Vargas, J. M., & Quispe, E.',
    year: 2024,
    sourceType: 'Artículo',
    journalOrPublisher: 'Revista Iberoamericana de Educación Superior, 15(43), 88–109',
    doiOrUrl: 'https://doi.org/10.22201/iisue.20072872e.2024.43.1654',
    apa7Citation: 'Vargas, J. M., & Quispe, E. (2024). Modelos de trazabilidad académica y reducción de reprocesos en tesis universitarias de ingeniería. Revista Iberoamericana de Educación Superior, 15(43), 88–109. https://doi.org/10.22201/iisue.20072872e.2024.43.1654',
    verifiedStatus: 'SciELO/Redalyc',
    relevantChapters: ['Marco teórico', 'Metodología', 'Discusión'],
    keyContribution: 'Antecedente nacional que demuestra la relación directa entre el número de observaciones del asesor y la ausencia de una matriz de consistencia iterativa.'
  }
];

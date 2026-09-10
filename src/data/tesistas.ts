import { 
  ThesisChapter, 
  ResearchProfile, 
  ConsistencyMatrixRow, 
  AdvisorObservation, 
  ThesisTask, 
  BibliographicSource 
} from '../types/thesis';
import { INITIAL_CHAPTERS } from './initialData';

export interface TesistaItem {
  id: string; // e.g. 'user-lester', 'user-jose'
  name: string; // 'Lester', 'Jose'
  username: string; // 'lester', 'jose'
  email: string;
  projectTitle: string;
  avatarInitials: string;
}

export interface TesistaProjectBundle {
  research: ResearchProfile;
  chapters: ThesisChapter[];
  consistencyRows: ConsistencyMatrixRow[];
  observations: AdvisorObservation[];
  tasks: ThesisTask[];
  sources: BibliographicSource[];
}

export const INITIAL_TESISTAS: TesistaItem[] = [
  {
    id: 'user-lester',
    name: 'Lester',
    username: 'lester',
    email: 'lester@tesis.edu',
    projectTitle: 'Optimización de Procesos y Gestión de Datos en Sistemas de Información',
    avatarInitials: 'LE'
  },
  {
    id: 'user-jose',
    name: 'Jose',
    username: 'jose',
    email: 'jose@tesis.edu',
    projectTitle: 'Implementación de Modelos de Calidad y Seguridad de Software en Entornos de Producción',
    avatarInitials: 'JO'
  }
];

// Helper: initial data for Lester
export const INITIAL_PROJECT_LESTER: TesistaProjectBundle = {
  research: {
    title: 'Optimización de Procesos y Gestión de Datos en Sistemas de Información',
    author: 'Lester',
    advisor: 'Ing. Aurelio Tacuri Urquizo (Asesor Principal)',
    institution: 'Universidad Nacional / Facultad de Ingeniería',
    faculty: 'Facultad de Ingeniería de Sistemas e Informática',
    program: 'Escuela Profesional de Ingeniería de Sistemas e Informática',
    degreeLevel: 'Pregrado',
    academicDegree: 'Título Profesional de Ingeniero de Sistemas e Informática',
    year: 2026,
    problemAntecedents: 'Las organizaciones experimentan pérdidas de tiempo de hasta 35% en consultas y consolidación de datos desestructurados.',
    problemDescription: 'La ausencia de estandarización en flujos de datos operativos incrementa la latencia y la tasa de reproceso en el sistema institucional.',
    generalProblem: '¿De qué manera la optimización de procesos y la gestión estructurada de datos impacta en la eficiencia operativa de los sistemas de información institucionales en pregrado?',
    specificProblems: [
      '¿Cuál es el nivel de redundancia e ineficiencia en los flujos de trabajo de datos actuales?',
      '¿Cómo influye la estandarización de procesos en el tiempo de respuesta del sistema?',
      '¿Qué arquitectura metodológica garantiza la consistencia en el procesamiento de información?'
    ],
    justification: 'Permite elevar el rendimiento de los sistemas de información institucionales y proporciona un marco aplicativo para la titulación profesional en ingeniería.',
    limitations: 'La evaluación se circunscribe a los módulos operativos centrales de la entidad seleccionada.',
    viability: 'Viabilidad técnica y económica garantizada con la infraestructura de servidores y datos disponible.',
    generalObjective: 'Determinar el impacto de la optimización de procesos y la gestión de datos en la eficiencia de los sistemas de información para optar el título profesional.',
    specificObjectives: [
      'Diagnosticar los cuellos de botella en la captura y procesamiento de datos.',
      'Diseñar e implementar un modelo de optimización de flujos de trabajo.',
      'Evaluar la mejora en los indicadores de rendimiento y confiabilidad de los datos.'
    ],
    generalHypothesis: 'La optimización de procesos y la gestión sistemática de datos incrementa significativamente la eficiencia operativa de los sistemas de información.',
    specificHypotheses: [
      'H1: La estandarización de flujos reduce los tiempos de procesamiento en más del 30%.',
      'H2: La validación estructurada de datos disminuye los errores de inconsistencia.',
      'H3: La trazabilidad digital mejora la toma de decisiones basada en datos.'
    ],
    independentVariable: {
      name: 'Optimización de Procesos y Gestión de Datos',
      definition: 'Conjunto de técnicas, reglas y herramientas aplicadas para refinar flujos de trabajo y asegurar calidad de datos.',
      dimensions: [
        'Estandarización de flujos y procesos',
        'Validación y consistencia de datos',
        'Trazabilidad y control de cambios'
      ],
      indicators: [
        'Tiempo de ciclo de procesamiento (segundos)',
        'Porcentaje de redundancia de datos (%)',
        'Tasa de automatización de tareas (%)'
      ]
    },
    dependentVariable: {
      name: 'Eficiencia Operativa en Sistemas de Información',
      definition: 'Capacidad de respuesta oportuna, fiabilidad de cómputo y reducción de costos operativos del sistema.',
      dimensions: [
        'Tiempo de respuesta y latencia',
        'Tasa de exactitud y confiabilidad',
        'Satisfacción y usabilidad del usuario final'
      ],
      indicators: [
        'Latencia promedio de transacciones (ms)',
        'Tasa de fallos y excepciones por cada 10,000 transacciones',
        'Índice de satisfacción SUS (System Usability Scale)'
      ]
    },
    restrictiveVariables: 'Horarios pico de carga de trabajo en la entidad y capacidad del ancho de banda de la red interna.',
    methodology: {
      approach: 'Cuantitativo y de diseño empírico',
      type: 'Aplicada, de nivel explicativo y correlacional',
      design: 'Preexperimental / Cuasiexperimental con preprueba y posprueba',
      population: '140 usuarios y analistas de sistemas en el entorno institucional',
      sample: '95 usuarios evaluados mediante muestreo probabilístico con margen de error del 5%',
      instruments: 'Cuestionario de satisfacción Likert y fichas técnicas de métricas de rendimiento del sistema',
      equipmentAndMaterials: 'Base de datos PostgreSQL, servidor Node.js/Linux y estaciones de trabajo de prueba',
      experimentalProcedure: '1. Línea base previa; 2. Aplicación del modelo de optimización; 3. Registro de telemetría; 4. Evaluación comparativa.',
      dataProcessingTechniques: 'Análisis estadístico inferencial con SPSS / Python (prueba paramétrica t-Student).'
    }
  },
  chapters: INITIAL_CHAPTERS,
  consistencyRows: [
    {
      id: 'mat-1',
      problem: '¿De qué manera la optimización de procesos y la gestión de datos impacta en la eficiencia operativa?',
      objective: 'Determinar el impacto de la optimización de procesos y la gestión de datos en la eficiencia.',
      hypothesis: 'La optimización de procesos y la gestión de datos incrementa significativamente la eficiencia operativa.',
      variables: 'V.I: Optimización de procesos\nV.D: Eficiencia operativa',
      dimensions: 'D1: Estandarización de flujos\nD2: Validación de datos',
      indicators: 'I1: Tiempos de ciclo\nI2: Tasa de error\nI3: Disponibilidad',
      methodology: 'Enfoque cuantitativo, diseño cuasiexperimental, muestra de 95 usuarios evaluados con preprueba y posprueba.',
      isSpecific: false
    }
  ],
  observations: [
    {
      id: 'obs-l1',
      chapterId: 'ch-2',
      chapterName: 'Marco teórico',
      date: '04 Mar 2026',
      advisorName: 'Ing. Aurelio Tacuri Urquizo',
      authorRole: 'asesor',
      authorName: 'Ing. Aurelio Tacuri Urquizo',
      approvedForTesista: true,
      priority: 'Alta',
      status: 'Pendiente',
      content: 'Estimado Lester, en el marco teórico se requiere actualizar los antecedentes internacionales al periodo 2022-2026. Asegúrate de citar al menos dos artículos de revistas Scopus.'
    },
    {
      id: 'obs-l2',
      chapterId: 'ch-3',
      chapterName: 'Metodología',
      date: '03 Mar 2026',
      advisorName: 'Ing. Aurelio Tacuri Urquizo',
      authorRole: 'asesor',
      authorName: 'Ing. Aurelio Tacuri Urquizo',
      approvedForTesista: true,
      priority: 'Media',
      status: 'En revisión',
      content: 'Revisa la ficha técnica del instrumento antes de aplicarlo. Recuerda que debe contar con el coeficiente V de Aiken superior a 0.80 por los jueces evaluadores.'
    },
    {
      id: 'obs-l3',
      chapterId: 'ch-4',
      chapterName: 'Resultados',
      date: '05 Mar 2026',
      advisorName: 'Ing. Aurelio Tacuri Urquizo',
      authorRole: 'tesista',
      authorName: 'Lester',
      approvedForTesista: true,
      priority: 'Media',
      status: 'Pendiente',
      content: 'Ingeniero Aurelio, ya tabulé los primeros 60 registros del pretest. ¿Le parece bien si realizamos una prueba de normalidad Shapiro-Wilk para definir si usamos prueba T de Student o Wilcoxon?'
    }
  ],
  tasks: [
    {
      id: 'task-l1',
      title: 'Actualizar 3 antecedentes bibliográficos Scopus 2023-2026',
      chapterId: 'ch-2',
      chapterName: 'Marco teórico',
      dueDate: '10 Mar 2026',
      priority: 'Alta',
      status: 'En progreso',
      description: 'Buscar en Scopus artículos sobre optimización de flujos de trabajo.'
    },
    {
      id: 'task-l2',
      title: 'Validar instrumentos con 3 doctores expertos en sistemas',
      chapterId: 'ch-3',
      chapterName: 'Metodología',
      dueDate: '15 Mar 2026',
      priority: 'Alta',
      status: 'En progreso',
      description: 'Entregar fichas de validación con rúbricas de pertinencia y claridad.'
    }
  ],
  sources: [
    {
      id: 'src-l1',
      title: 'Process Automation and Information Systems Optimization in Modern Enterprises',
      authors: 'Chen, L., & Miller, K.',
      year: 2024,
      sourceType: 'Artículo',
      journalOrPublisher: 'Journal of Systems and Software Engineering',
      doiOrUrl: 'https://doi.org/10.1016/j.jss.2024.111890',
      apa7Citation: 'Chen, L., & Miller, K. (2024). Process automation and information systems optimization. Journal of Systems and Software Engineering, 198, 111890.',
      verifiedStatus: 'Indexada Scopus/WoS',
      relevantChapters: ['Marco teórico', 'Discusión'],
      keyContribution: 'Marco analítico para la reducción de latencia en flujos de datos operativos.'
    }
  ]
};

// Helper: initial data for Jose
export const INITIAL_PROJECT_JOSE: TesistaProjectBundle = {
  research: {
    title: 'Implementación de Modelos de Calidad y Seguridad de Software en Entornos de Producción',
    author: 'Jose',
    advisor: 'Ing. Aurelio Tacuri Urquizo (Asesor Principal)',
    institution: 'Universidad Nacional / Facultad de Ingeniería',
    faculty: 'Facultad de Ingeniería de Sistemas e Informática',
    program: 'Escuela Profesional de Ingeniería de Software',
    degreeLevel: 'Pregrado',
    academicDegree: 'Título Profesional de Ingeniero de Software',
    year: 2026,
    problemAntecedents: 'En los despliegues de software sin análisis estático automatizado se evidencian vulnerabilidades críticas que comprometen la disponibilidad.',
    problemDescription: 'La deuda técnica acumulada y la falta de pruebas continuas provocan paradas imprevistas de servicios en el entorno productivo.',
    generalProblem: '¿Cómo influye la implementación de modelos de calidad y seguridad continua en la estabilidad operativa de software en entornos de producción en pregrado?',
    specificProblems: [
      '¿Cuáles son las vulnerabilidades y fallas más frecuentes en el despliegue de software institucional?',
      '¿De qué forma las prácticas de integración y análisis estático reducen la deuda técnica?',
      '¿Qué estándares internacionales de calidad (ISO 25010) son más adecuados para este contexto?'
    ],
    justification: 'Contribuye a la estabilidad de los servicios computacionales universitarios y valida metodologías de software para la obtención del título profesional.',
    limitations: 'El alcance abarca las aplicaciones web internas desarrolladas en la institución durante el periodo 2025-2026.',
    viability: 'Viabilidad asegurada por acceso al repositorio de código fuente y herramientas libres de inspección.',
    generalObjective: 'Evaluar el impacto de la implementación de modelos de calidad y seguridad en la estabilidad de software en producción para optar el título profesional.',
    specificObjectives: [
      'Identificar la tasa de incidentes críticos previos a la adopción de controles de calidad.',
      'Diseñar una guía de aseguramiento de calidad y pruebas automatizadas bajo norma ISO 25010.',
      'Verificar la reducción de fallos y el tiempo medio de recuperación en producción.'
    ],
    generalHypothesis: 'La adopción de un modelo estructurado de calidad y seguridad disminuye significativamente la tasa de defectos en entornos de producción.',
    specificHypotheses: [
      'H1: Las pruebas automatizadas reducen los errores críticos en despliegues.',
      'H2: La aplicación de la norma ISO 25010 mejora la confiabilidad del sistema.',
      'H3: La seguridad integrada previene incidentes de acceso no autorizado.'
    ],
    independentVariable: {
      name: 'Modelo de Calidad y Seguridad de Software',
      definition: 'Estrategia integral de buenas prácticas, revisiones estáticas de código y controles de seguridad.',
      dimensions: [
        'Aseguramiento de calidad y pruebas continuas',
        'Controles de seguridad y mitigación de vulnerabilidades',
        'Cumplimiento de estándares de codificación limpia'
      ],
      indicators: [
        'Cobertura de pruebas unitarias y de integración (%)',
        'Número de vulnerabilidades detectadas por análisis estático',
        'Frecuencia de despliegues exitosos sin rollback'
      ]
    },
    dependentVariable: {
      name: 'Estabilidad y Confiabilidad en Producción',
      definition: 'Grado en que el sistema opera sin interrupciones imprevistas y conserva la integridad de sus funciones.',
      dimensions: [
        'Disponibilidad y tiempo medio entre fallos (MTBF)',
        'Tiempo medio de recuperación (MTTR)',
        'Calidad percibida por el equipo de operaciones'
      ],
      indicators: [
        'Disponibilidad mensual del servicio (SLA %)',
        'Tiempo medio de recuperación ante fallos MTTR (minutos)',
        'Número de incidentes de severidad 1 reportados al mes'
      ]
    },
    restrictiveVariables: 'Restricciones de ventanas de mantenimiento para despliegues y políticas de seguridad del firewall institucional.',
    methodology: {
      approach: 'Cuantitativo de carácter experimental o aplicado',
      type: 'Aplicada y explicativa',
      design: 'Preexperimental con diseño longitudinal de series temporales',
      population: '80 aplicaciones y módulos de software desplegados',
      sample: '45 módulos críticos analizados mediante muestreo intencional',
      instruments: 'Ficha de auditoría de código estático (SonarQube) y registros de incidentes en producción',
      equipmentAndMaterials: 'Servidor de integración continua (CI/CD), contenedores Docker, SonarQube Server y escáner OWASP ZAP',
      experimentalProcedure: '1. Análisis estático de línea base; 2. Configuración de pipelines con Quality Gates; 3. Monitoreo continuo; 4. Evaluación de incidentes en producción.',
      dataProcessingTechniques: 'Análisis estadístico de series de tiempo y comparación de medias mediante prueba de Wilcoxon.'
    }
  },
  chapters: [
    {
      id: 'ch-preliminares',
      name: 'Páginas preliminares',
      order: 1,
      category: 'preliminares',
      status: 'En desarrollo',
      progressPercent: 60,
      lastModified: '01 Mar 2026',
      observationsCount: 0,
      pendingObservations: [],
      nextTask: 'Completar redacción de la Introducción y Resumen en inglés',
      summary: 'Portada, contraportada, jurado y asesor, acta de evaluación, dedicatoria, agradecimientos, índices temáticos/tablas/figuras, resumen y abstract, e introducción.',
      wordCount: 1900,
      targetPages: 12,
      completedPages: 7,
      visibleToTesista: true,
      subsections: [
        { code: 'P.1', title: 'Portada y Contraportada', completed: true },
        { code: 'P.2', title: 'Miembros del jurado y asesor', completed: true },
        { code: 'P.3', title: 'Acta de evaluación obtenida por el jurado calificador', completed: false },
        { code: 'P.4', title: 'Dedicatoria y Agradecimientos (opcional)', completed: true },
        { code: 'P.5', title: 'Índice temático, de tablas y de figuras', completed: true },
        { code: 'P.6', title: 'Resumen (español) y Abstract (inglés)', completed: false },
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
      lastModified: '01 Mar 2026',
      observationsCount: 0,
      pendingObservations: [],
      nextTask: 'Revisión final de coherencia de objetivos',
      summary: 'Descripción de la problemática en despliegues de software, formulación de preguntas y justificación.',
      wordCount: 3800,
      targetPages: 14,
      completedPages: 14,
      visibleToTesista: true,
      subsections: [
        { code: '1.1', title: 'Antecedentes del problema a investigar', completed: true },
        { code: '1.2', title: 'Descripción del problema', completed: true },
        { code: '1.3', title: 'Formulación del problema (general y específicos)', completed: true },
        { code: '1.4', title: 'Objetivos de la investigación (general y específicos)', completed: true },
        { code: '1.5', title: 'Justificación e importancia de la investigación', completed: true },
        { code: '1.6', title: 'Limitaciones', completed: true },
        { code: '1.7', title: 'Viabilidad del estudio', completed: true },
        { code: '1.8', title: 'Formulación de hipótesis / prototipo o producto', completed: true },
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
      progressPercent: 70,
      lastModified: '03 Mar 2026',
      observationsCount: 2,
      pendingObservations: [
        'Ing. Aurelio Tacuri Urquizo: Desarrollar con más detalle el modelo ISO/IEC 25010 y sus 8 características de calidad.',
        'Ing. Aurelio Tacuri Urquizo: Incluir antecedentes nacionales sobre aseguramiento de calidad en instituciones públicas.'
      ],
      nextTask: 'Sintetizar la norma ISO 25010 en una tabla comparativa con citas actualizadas',
      summary: 'Bases teóricas de ingeniería de software, modelos de calidad, antecedentes y seguridad informática.',
      wordCount: 8400,
      targetPages: 30,
      completedPages: 21,
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
      status: 'En desarrollo',
      progressPercent: 65,
      lastModified: '04 Mar 2026',
      observationsCount: 1,
      pendingObservations: [
        'Ing. Aurelio Tacuri Urquizo: Precisar la matriz de operacionalización para la variable dependiente de confiabilidad.'
      ],
      nextTask: 'Definir fórmulas matemáticas de cálculo de MTBF y MTTR en sección 3.7',
      summary: 'Diseño metodológico, delimitación de la muestra de software, instrumentos y procedimientos.',
      wordCount: 4600,
      targetPages: 18,
      completedPages: 12,
      visibleToTesista: true,
      subsections: [
        { code: '3.1', title: 'Planteamiento metodológico (tipo, nivel y diseño de investigación)', completed: true },
        { code: '3.3', title: 'Población y muestra (si es aplicable)', completed: true },
        { code: '3.4', title: 'Equipos y Materiales (SonarQube, Jenkins, Servidores)', completed: true },
        { code: '3.5', title: 'Procedimiento de las pruebas experimentales', completed: false, status: 'En desarrollo' },
        { code: '3.6', title: 'Técnicas de recolección de datos', completed: true },
        { code: '3.7', title: 'Técnicas para el procesamiento de datos', completed: false, status: 'En desarrollo' }
      ]
    },
    {
      id: 'ch-4',
      name: 'Capítulo 4. Resultados',
      order: 5,
      category: 'capitulo',
      status: 'En desarrollo',
      progressPercent: 35,
      lastModified: '27 Feb 2026',
      observationsCount: 0,
      pendingObservations: [],
      nextTask: 'Extraer métricas de SonarQube del periodo de prueba inicial',
      summary: 'Métricas de cobertura de código, defectos detectados y pruebas de estrés.',
      wordCount: 2800,
      targetPages: 22,
      completedPages: 8,
      visibleToTesista: true,
      subsections: [
        { code: '4.1', title: 'Descripción de las pruebas experimentales', completed: true },
        { code: '4.2', title: 'Presentación y análisis de los resultados', completed: false, status: 'En desarrollo' },
        { code: '4.3', title: 'Contrastación de hipótesis', completed: false, status: 'Pendiente' }
      ]
    },
    {
      id: 'ch-5',
      name: 'Capítulo 5. Discusión',
      order: 6,
      category: 'capitulo',
      status: 'Pendiente',
      progressPercent: 20,
      lastModified: '22 Feb 2026',
      observationsCount: 0,
      pendingObservations: [],
      nextTask: 'Elaborar estructura de discusión frente a antecedentes',
      summary: 'Contraste con la literatura especializada.',
      wordCount: 1100,
      targetPages: 12,
      completedPages: 2,
      visibleToTesista: true,
      subsections: [
        { code: '5.1', title: 'Pruebas de validación del modelo experimental', completed: false },
        { code: '5.2', title: 'Aplicación de la tecnología encontrada', completed: false },
        { code: '5.3', title: 'Contraste con trabajos de investigación similares', completed: false }
      ]
    },
    {
      id: 'ch-conclusiones',
      name: 'Conclusiones',
      order: 7,
      category: 'finales',
      status: 'Pendiente',
      progressPercent: 10,
      lastModified: '20 Feb 2026',
      observationsCount: 0,
      pendingObservations: [],
      nextTask: 'Pendiente de finalización de resultados',
      summary: 'Conclusiones proyectadas según objetivos.',
      wordCount: 300,
      targetPages: 4,
      completedPages: 1,
      visibleToTesista: true,
      subsections: [
        { code: 'Concl. Gen.', title: 'Conclusión general', completed: false },
        { code: 'Concl. Esp. 1', title: 'Conclusión específica 1', completed: false },
        { code: 'Concl. Esp. 2', title: 'Conclusión específica 2', completed: false }
      ]
    },
    {
      id: 'ch-recomendaciones',
      name: 'Recomendaciones',
      order: 8,
      category: 'finales',
      status: 'Pendiente',
      progressPercent: 0,
      lastModified: '20 Feb 2026',
      observationsCount: 0,
      pendingObservations: [],
      nextTask: 'Formular recomendaciones para el despliegue del software',
      summary: 'Recomendaciones técnicas y de infraestructura.',
      wordCount: 200,
      targetPages: 4,
      completedPages: 0,
      visibleToTesista: true,
      subsections: [
        { code: 'Rec. 1', title: 'Recomendaciones para la empresa evaluada', completed: false },
        { code: 'Rec. 2', title: 'Recomendaciones para futuras investigaciones de confiabilidad', completed: false }
      ]
    },
    {
      id: 'ch-referencias',
      name: 'Referencias bibliográficas',
      order: 9,
      category: 'finales',
      status: 'En desarrollo',
      progressPercent: 50,
      lastModified: '22 Feb 2026',
      observationsCount: 0,
      pendingObservations: [],
      nextTask: 'Completar referencias bajo norma IEEE',
      summary: 'Referencias bibliográficas bajo estándar IEEE.',
      wordCount: 1200,
      targetPages: 10,
      completedPages: 5,
      visibleToTesista: true,
      subsections: [
        { code: 'Ref.1', title: 'Artículos científicos IEEE / ACM', completed: true },
        { code: 'Ref.2', title: 'Normas y estándares ISO/IEC', completed: true },
        { code: 'Ref.3', title: 'Libros y manuales técnicos', completed: false }
      ]
    },
    {
      id: 'ch-anexos',
      name: 'Anexos',
      order: 10,
      category: 'finales',
      status: 'En desarrollo',
      progressPercent: 25,
      lastModified: '24 Feb 2026',
      observationsCount: 0,
      pendingObservations: [],
      nextTask: 'Adjuntar reportes estáticos de análisis de vulnerabilidades',
      summary: 'Matriz de consistencia e informes de pruebas de seguridad.',
      wordCount: 900,
      targetPages: 16,
      completedPages: 4,
      visibleToTesista: true,
      subsections: [
        { code: 'Anexo 1', title: 'Matriz de consistencia metodológica', completed: true },
        { code: 'Anexo 2', title: 'Fichas de evaluación técnica y scripts de prueba', completed: true },
        { code: 'Anexo 3', title: 'Reportes de análisis de vulnerabilidades SonarQube', completed: false }
      ]
    }
  ],
  consistencyRows: [
    {
      id: 'mat-j1',
      problem: '¿Cómo influye la implementación de modelos de calidad y seguridad en la estabilidad del software en producción?',
      objective: 'Evaluar el impacto de los modelos de calidad y seguridad en la estabilidad operativa.',
      hypothesis: 'La adopción de modelos de calidad y seguridad disminuye significativamente la tasa de defectos en producción.',
      variables: 'V.I: Modelos de calidad y seguridad\nV.D: Estabilidad y confiabilidad',
      dimensions: 'D1: Pruebas continuas\nD2: Mitigación de vulnerabilidades',
      indicators: 'I1: Tasa de defectos\nI2: MTBF\nI3: Deuda técnica en horas',
      methodology: 'Enfoque cuantitativo, diseño cuasiexperimental longitudinal, muestra de 45 módulos de software analizados.',
      isSpecific: false
    }
  ],
  observations: [
    {
      id: 'obs-j1',
      chapterId: 'ch-2',
      chapterName: 'Marco teórico',
      date: '03 Mar 2026',
      advisorName: 'Ing. Aurelio Tacuri Urquizo',
      authorRole: 'asesor',
      authorName: 'Ing. Aurelio Tacuri Urquizo',
      approvedForTesista: true,
      priority: 'Alta',
      status: 'Pendiente',
      content: 'Estimado Jose, en el marco teórico profundiza en la norma ISO/IEC 25010 y describe cómo se evalúan las subcaracterísticas de fiabilidad y mantenibilidad.'
    },
    {
      id: 'obs-j2',
      chapterId: 'ch-3',
      chapterName: 'Metodología',
      date: '04 Mar 2026',
      advisorName: 'Ing. Aurelio Tacuri Urquizo',
      authorRole: 'asesor',
      authorName: 'Ing. Aurelio Tacuri Urquizo',
      approvedForTesista: true,
      priority: 'Media',
      status: 'Pendiente',
      content: 'Jose, asegúrate de documentar claramente el procedimiento para medir la deuda técnica con SonarQube para que el método sea replicable.'
    },
    {
      id: 'obs-j3',
      chapterId: 'ch-3',
      chapterName: 'Metodología',
      date: '05 Mar 2026',
      advisorName: 'Ing. Aurelio Tacuri Urquizo',
      authorRole: 'tesista',
      authorName: 'Jose',
      approvedForTesista: true,
      priority: 'Media',
      status: 'Pendiente',
      content: 'Ingeniero Aurelio, buenas tardes. En los instrumentos, ¿puedo usar los reportes automáticos de SonarQube como instrumento primario de recolección para la variable de calidad?'
    }
  ],
  tasks: [
    {
      id: 'task-j1',
      title: 'Elaborar cuadro comparativo de métricas ISO 25010',
      chapterId: 'ch-2',
      chapterName: 'Marco teórico',
      dueDate: '12 Mar 2026',
      priority: 'Alta',
      status: 'En progreso',
      description: 'Detallar atributos de fiabilidad, rendimiento y seguridad.'
    },
    {
      id: 'task-j2',
      title: 'Configurar servidor de análisis estático para recolectar datos',
      chapterId: 'ch-3',
      chapterName: 'Metodología',
      dueDate: '18 Mar 2026',
      priority: 'Media',
      status: 'Por iniciar',
      description: 'Estandarizar reglas de análisis para la muestra de software.'
    }
  ],
  sources: [
    {
      id: 'src-j1',
      title: 'Continuous Quality Assurance in Cloud-Native Software Engineering',
      authors: 'Rodriguez, M., & Vance, P.',
      year: 2024,
      sourceType: 'Artículo',
      journalOrPublisher: 'IEEE Transactions on Software Engineering',
      doiOrUrl: 'https://doi.org/10.1109/TSE.2024.3351234',
      apa7Citation: 'Rodriguez, M., & Vance, P. (2024). Continuous quality assurance in cloud-native software. IEEE Transactions on Software Engineering, 50(4), 450-468.',
      verifiedStatus: 'Indexada Scopus/WoS',
      relevantChapters: ['Marco teórico', 'Metodología'],
      keyContribution: 'Metodología para la integración continua de pruebas y reducción de vulnerabilidades.'
    }
  ]
};

// Storage keys
const TESISTAS_KEY = 'thesis_tesistas_list';
const PROJECT_KEY_PREFIX = 'thesis_project_data_';

export function getStoredTesistas(): TesistaItem[] {
  if (typeof window === 'undefined') return INITIAL_TESISTAS;
  try {
    const saved = localStorage.getItem(TESISTAS_KEY);
    if (!saved) return INITIAL_TESISTAS;
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure default Lester and Jose are always included
      const merged = [...INITIAL_TESISTAS];
      parsed.forEach((p: TesistaItem) => {
        if (!merged.some(m => m.id === p.id)) {
          merged.push(p);
        }
      });
      return merged;
    }
    return INITIAL_TESISTAS;
  } catch (e) {
    return INITIAL_TESISTAS;
  }
}

export function saveStoredTesistas(tesistas: TesistaItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TESISTAS_KEY, JSON.stringify(tesistas));
}

export function getTesistaProjectData(tesistaId: string): TesistaProjectBundle {
  const fallback = tesistaId === 'user-jose' ? INITIAL_PROJECT_JOSE : INITIAL_PROJECT_LESTER;
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const saved = localStorage.getItem(`${PROJECT_KEY_PREFIX}${tesistaId}`);
    if (saved) {
      const parsed: TesistaProjectBundle = JSON.parse(saved);
      // Ensure research profile has Pregrado and Anexo 2.3 metadata
      if (parsed && parsed.research) {
        parsed.research = {
          ...fallback.research,
          ...parsed.research,
          degreeLevel: 'Pregrado',
          academicDegree: parsed.research.academicDegree || fallback.research.academicDegree || 'Título Profesional de Ingeniero de Sistemas e Informática',
          specificProblems: parsed.research.specificProblems || fallback.research.specificProblems,
          specificObjectives: parsed.research.specificObjectives || fallback.research.specificObjectives,
          specificHypotheses: parsed.research.specificHypotheses || fallback.research.specificHypotheses,
        };
      }
      // Ensure automatic upgrade to Anexo 2.3 structure
      if (parsed && Array.isArray(parsed.chapters)) {
        const hasAnexo23 = parsed.chapters.length >= 10 && parsed.chapters.some(c => c.category === 'preliminares');
        if (!hasAnexo23) {
          const newChapters = fallback.chapters.map(ch => {
            const existing = parsed.chapters.find(old => old.id === ch.id || (old.name && old.name.toLowerCase().includes(ch.name.toLowerCase().slice(0, 10))));
            if (existing) {
              return {
                ...ch,
                status: existing.status || ch.status,
                progressPercent: existing.progressPercent !== undefined ? existing.progressPercent : ch.progressPercent,
                completedPages: existing.completedPages !== undefined ? existing.completedPages : ch.completedPages,
                wordCount: existing.wordCount !== undefined ? existing.wordCount : ch.wordCount,
                pendingObservations: existing.pendingObservations || ch.pendingObservations,
                nextTask: existing.nextTask || ch.nextTask,
                lastModified: existing.lastModified || ch.lastModified,
                visibleToTesista: existing.visibleToTesista !== undefined ? existing.visibleToTesista : ch.visibleToTesista,
              };
            }
            return ch;
          });
          parsed.chapters = newChapters;
          saveTesistaProjectData(tesistaId, parsed);
        }
      }
      return parsed;
    }
  } catch (e) {
    console.error('Error loading project for tesista', tesistaId, e);
  }

  // Fallback defaults
  return fallback;
}

export function saveTesistaProjectData(tesistaId: string, bundle: TesistaProjectBundle): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${PROJECT_KEY_PREFIX}${tesistaId}`, JSON.stringify(bundle));
  } catch (e) {
    console.error('Error saving project for tesista', tesistaId, e);
  }
}

export function resetTesistaProjectData(tesistaId: string): TesistaProjectBundle {
  const initial = tesistaId === 'user-jose' ? INITIAL_PROJECT_JOSE : INITIAL_PROJECT_LESTER;
  saveTesistaProjectData(tesistaId, initial);
  return initial;
}

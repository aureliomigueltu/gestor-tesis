export type ThesisSectionStatus = 
  | 'Pendiente'
  | 'En desarrollo'
  | 'En revisión'
  | 'Observado'
  | 'Aprobado';

export type UserRole = 'asesor' | 'tesista';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  avatarInitials: string;
}

export interface UserAccount extends UserSession {
  username: string;
  password: string;
}

export interface ThesisSubsection {
  code: string; // e.g. "1.1", "1.2", "Preliminar"
  title: string; // e.g. "Antecedentes del problema a investigar"
  status?: ThesisSectionStatus;
  completed?: boolean;
  pages?: string;
}

export interface ThesisChapter {
  id: string;
  name: string; // e.g. "Capítulo 1. Planteamiento del problema"
  order: number;
  category?: 'preliminares' | 'capitulo' | 'finales';
  status: ThesisSectionStatus;
  progressPercent: number; // 0 to 100
  lastModified: string;
  observationsCount: number;
  pendingObservations: string[];
  nextTask: string;
  summary: string;
  subsections?: ThesisSubsection[];
  wordCount?: number;
  targetPages?: number;
  completedPages?: number;
  visibleToTesista?: boolean; // Controls what the advisor approves the student to see
}

export interface ResearchProfile {
  title: string;
  author: string;
  advisor: string;
  institution: string;
  faculty?: string;
  program: string;
  degreeLevel?: 'Pregrado' | 'Posgrado';
  academicDegree?: string;
  year: number;
  // Planteamiento del Problema (Anexo 2.3 Cap 1)
  problemAntecedents?: string;
  problemDescription?: string;
  generalProblem: string;
  specificProblems: string[];
  justification?: string;
  limitations?: string;
  viability?: string;
  // Objetivos (1.4)
  generalObjective: string;
  specificObjectives: string[];
  // Hipótesis (1.8)
  generalHypothesis: string;
  specificHypotheses: string[];
  // Variables y Operacionalización (1.9 y 1.10)
  independentVariable: {
    name: string;
    definition: string;
    dimensions: string[];
    indicators?: string[];
  };
  dependentVariable: {
    name: string;
    definition: string;
    dimensions: string[];
    indicators?: string[];
  };
  restrictiveVariables?: string;
  // Marco Metodológico (Capítulo 3)
  methodology: {
    approach: string;
    type: string;
    design: string;
    population: string;
    sample: string;
    instruments: string;
    equipmentAndMaterials?: string;
    experimentalProcedure?: string;
    dataProcessingTechniques?: string;
  };
}

export interface ConsistencyMatrixRow {
  id: string;
  problem: string;
  objective: string;
  hypothesis: string;
  variables: string;
  dimensions: string;
  indicators: string;
  methodology: string;
  isSpecific?: boolean;
}

export interface AdvisorObservation {
  id: string;
  chapterId: string;
  chapterName: string;
  date: string;
  content: string;
  advisorName: string;
  status: 'Pendiente' | 'En revisión' | 'Subsanada';
  priority: 'Alta' | 'Media' | 'Baja';
  resolutionNotes?: string;
  resolvedDate?: string;
  authorRole?: UserRole; // 'asesor' | 'tesista'
  authorName?: string;
  approvedForTesista?: boolean; // Can be toggled by the advisor to approve visibility
}

export interface ThesisTask {
  id: string;
  title: string;
  chapterId: string;
  chapterName: string;
  dueDate: string;
  priority: 'Alta' | 'Media' | 'Baja';
  status: 'Por iniciar' | 'En progreso' | 'Completada';
  description?: string;
}

export interface BibliographicSource {
  id: string;
  title: string;
  authors: string;
  year: number;
  sourceType: 'Artículo' | 'Libro' | 'Tesis' | 'Conferencia' | 'Norma';
  journalOrPublisher: string;
  doiOrUrl?: string;
  apa7Citation: string;
  verifiedStatus: 'Indexada Scopus/WoS' | 'SciELO/Redalyc' | 'Institucional' | 'Pendiente verificación';
  relevantChapters: string[];
  keyContribution: string;
}

export type ActiveTab = 
  | 'avance'
  | 'investigacion'
  | 'capitulos'
  | 'fuentes'
  | 'matriz'
  | 'observaciones'
  | 'tareas'
  | 'asistente';

import React from 'react';
import { 
  ThesisChapter, 
  AdvisorObservation, 
  ThesisTask, 
  ActiveTab,
  ThesisSectionStatus,
  UserSession
} from '../../types/thesis';
import { StatusBadge } from '../common/StatusBadge';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  PlayCircle, 
  HelpCircle, 
  Calendar, 
  ArrowUpRight, 
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckSquare,
  Lock,
  ShieldCheck,
  EyeOff
} from 'lucide-react';

interface OverviewSectionProps {
  chapters: ThesisChapter[];
  observations: AdvisorObservation[];
  tasks: ThesisTask[];
  currentUser: UserSession;
  onSelectChapter: (chapter: ThesisChapter) => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  chapters,
  observations,
  tasks,
  currentUser,
  onSelectChapter,
  onNavigateTab,
}) => {
  const isTesista = currentUser.role === 'tesista';

  // Filter items for student based on advisor approval
  const visibleChapters = isTesista 
    ? chapters.filter(c => c.visibleToTesista !== false) 
    : chapters;

  const visibleObservations = isTesista
    ? observations.filter(o => o.approvedForTesista !== false || o.authorRole === 'tesista')
    : observations;

  const hiddenChaptersCount = chapters.filter(c => c.visibleToTesista === false).length;

  // Counts based on visible chapters
  const approvedCount = visibleChapters.filter(c => c.status === 'Aprobado').length;
  const inDevCount = visibleChapters.filter(c => c.status === 'En desarrollo').length;
  const inReviewCount = visibleChapters.filter(c => c.status === 'En revisión').length;
  const observedCount = visibleChapters.filter(c => c.status === 'Observado').length;
  const pendingCount = visibleChapters.filter(c => c.status === 'Pendiente').length;

  const totalProgress = Math.round(
    visibleChapters.reduce((sum, ch) => sum + ch.progressPercent, 0) / (visibleChapters.length || 1)
  );

  const pendingObservations = visibleObservations.filter(o => o.status === 'Pendiente');
  const urgentTasks = tasks
    .filter(t => t.status !== 'Completada')
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Top Banner with Global Progress */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-slate-700/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
                <Sparkles size={13} />
                <span>Proyecto de Tesis de Pregrado • Para optar el Título Profesional</span>
              </div>
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${
                isTesista 
                  ? 'bg-blue-500/20 text-blue-200 border-blue-400/30' 
                  : 'bg-amber-500/20 text-amber-200 border-amber-400/30'
              }`}>
                {isTesista ? <Lock size={12} /> : <ShieldCheck size={12} />}
                <span>{isTesista ? 'Vista Tesista (Solo Datos de Avance)' : 'Vista Asesor (Edición Habilitada)'}</span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Estado General de la Tesis
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isTesista 
                ? 'Monitorea el avance de tus capítulos y las observaciones que tu asesor te ha aprobado para subsanar.'
                : 'Supervisión integral del avance del tesista, edición de porcentajes oficiales y control de aprobación de capítulos.'}
            </p>
          </div>

          {/* Big Progress Gauge */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/15 flex items-center gap-5 min-w-[240px]">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-400 transition-all duration-700"
                  strokeDasharray={`${totalProgress}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-xl font-extrabold text-white">{totalProgress}%</span>
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-300 font-medium">Avance Total</div>
              <div className="text-sm font-semibold text-white mt-0.5">
                {approvedCount} de {visibleChapters.length} capítulos listos
              </div>
              <div className="text-xs text-amber-300 mt-1 flex items-center gap-1">
                <span>{pendingObservations.length} observaciones pendientes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advisor Info Alert if chapters are hidden */}
      {!isTesista && hiddenChaptersCount > 0 && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-950">
          <div className="flex items-center gap-2">
            <EyeOff size={16} className="text-amber-700 shrink-0" />
            <span>
              Tienes <strong>{hiddenChaptersCount} capítulo(s) en borrador ocultos</strong> para el tesista. Puedes habilitar su visibilidad en la sección de Capítulos cuando los apruebes.
            </span>
          </div>
          <button
            onClick={() => onNavigateTab('capitulos')}
            className="px-3 py-1 bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold rounded-lg shrink-0 transition-colors"
          >
            Gestionar Visibilidad
          </button>
        </div>
      )}

      {/* Status Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
            <span>Aprobados</span>
            <CheckCircle2 size={16} />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{approvedCount}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Listos y validados</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-blue-700 text-xs font-semibold">
            <span>En desarrollo</span>
            <PlayCircle size={16} />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{inDevCount}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">En redacción activa</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-purple-700 text-xs font-semibold">
            <span>En revisión</span>
            <Clock size={16} />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{inReviewCount}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Entregados al asesor</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-rose-700 text-xs font-semibold">
            <span>Con observaciones</span>
            <AlertTriangle size={16} />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{observedCount}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Requieren correcciones</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-600 text-xs font-semibold">
            <span>Pendientes</span>
            <HelpCircle size={16} />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{pendingCount}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Por iniciar</p>
        </div>
      </div>

      {/* Main 2-Column Content: Chapters List (2/3) + Quick Attention (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Chapters Detail List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen size={18} className="text-slate-700" />
              <span>Avance por Capítulos del Manuscrito</span>
            </h3>
            <button
              onClick={() => onNavigateTab('capitulos')}
              className="text-xs font-semibold text-slate-700 hover:text-slate-950 flex items-center gap-1 hover:underline"
            >
              <span>Ver todos los capítulos</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {visibleChapters.map((chapter) => {
              return (
                <div
                  key={chapter.id}
                  id={`overview-chapter-${chapter.id}`}
                  onClick={() => onSelectChapter(chapter)}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                        {chapter.order}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {chapter.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <StatusBadge status={chapter.status} size="sm" />
                      <span className="text-xs font-bold text-slate-700 w-10 text-right">
                        {chapter.progressPercent}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all ${
                        chapter.status === 'Aprobado' 
                          ? 'bg-emerald-500' 
                          : chapter.status === 'Observado'
                          ? 'bg-rose-500'
                          : 'bg-blue-600'
                      }`}
                      style={{ width: `${chapter.progressPercent}%` }}
                    />
                  </div>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Última Modif.</span>
                      <span className="font-medium text-slate-700">{chapter.lastModified}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Observaciones</span>
                      {chapter.pendingObservations.length > 0 ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-rose-700">
                          <AlertTriangle size={12} />
                          {chapter.pendingObservations.length} pendientes
                        </span>
                      ) : (
                        <span className="text-slate-500">Sin pendientes</span>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Próxima Tarea</span>
                      <span className="font-medium text-slate-800 line-clamp-1" title={chapter.nextTask}>
                        {chapter.nextTask}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Observations Attention Box & Urgent Tasks */}
        <div className="space-y-6">
          {/* Critical Advisor Observations Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                  <AlertTriangle size={15} />
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  {isTesista ? 'Observaciones para Subsanar' : 'Observaciones Pendientes'}
                </h4>
              </div>
              <button
                onClick={() => onNavigateTab('observaciones')}
                className="text-xs font-semibold text-rose-700 hover:text-rose-900 hover:underline"
              >
                Ver todas ({visibleObservations.length})
              </button>
            </div>

            {pendingObservations.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                <CheckCircle2 size={24} className="mx-auto text-emerald-500 mb-2" />
                No hay observaciones pendientes en este momento.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingObservations.slice(0, 3).map((obs) => (
                  <div 
                    key={obs.id}
                    className="p-3 bg-rose-50/60 border border-rose-200 rounded-xl space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-rose-900">{obs.chapterName}</span>
                      <span className="text-[10px] text-rose-600 font-medium px-1.5 py-0.5 bg-rose-100 rounded">
                        {obs.priority}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 line-clamp-2">
                      {obs.content}
                    </p>
                    <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1">
                      <span>{obs.date}</span>
                      <span className="text-slate-600 font-medium">{obs.advisorName}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Next Tasks Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <CheckSquare size={15} />
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Próximas Tareas del Manuscrito
                </h4>
              </div>
              {!isTesista && (
                <button
                  onClick={() => onNavigateTab('tareas')}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                >
                  Gestionar plan ({tasks.length})
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {urgentTasks.length === 0 ? (
                <div className="text-center py-4 text-xs text-slate-400">
                  No hay tareas prioritarias pendientes.
                </div>
              ) : (
                urgentTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-800 text-[11px] px-1.5 py-0.5 bg-white border border-slate-200 rounded">
                        {task.chapterName}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                        <Calendar size={11} />
                        {task.dueDate}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-900 leading-snug">
                      {task.title}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Role-tailored box: Asesor gets Rules & Matrix; Tesista gets Advisor Direct Channel */}
          {!isTesista ? (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-200/70 text-amber-900 flex items-center justify-center shrink-0">
                  <Sparkles size={16} />
                </div>
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-amber-950">
                    Reglas APA 7 & Matriz Científica
                  </h5>
                  <p className="text-xs text-amber-800/90 leading-relaxed">
                    Consulta los criterios de rigor configurados en <span className="font-mono text-[11px]">prompt_tesis.md</span> y la matriz de consistencia.
                  </p>
                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => onNavigateTab('matriz')}
                      className="text-xs px-2.5 py-1 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
                    >
                      Ver Matriz
                    </button>
                    <button
                      onClick={() => onNavigateTab('asistente')}
                      className="text-xs px-2.5 py-1 bg-white text-amber-900 border border-amber-300 rounded-lg font-medium hover:bg-amber-50 transition-colors"
                    >
                      Abrir Asistente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-200 text-blue-900 flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-blue-950">
                    Supervisión: Ing. Aurelio Tacuri Urquizo
                  </h5>
                  <p className="text-xs text-blue-800/90 leading-relaxed">
                    Si tienes consultas sobre las observaciones o necesitas validación de avances, envíalas directamente en la sección de Observaciones.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => onNavigateTab('observaciones')}
                      className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Ir a Observaciones y Consultas</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  ThesisChapter, 
  ThesisSectionStatus, 
  UserSession 
} from '../../types/thesis';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Search, 
  Filter, 
  Edit3, 
  AlertTriangle, 
  Calendar, 
  CheckSquare, 
  FileText,
  Clock,
  ArrowUpDown,
  BookOpen,
  CheckCircle2,
  Plus,
  Eye,
  EyeOff,
  Lock,
  MessageSquarePlus,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Layers,
  Award
} from 'lucide-react';

interface ChaptersSectionProps {
  chapters: ThesisChapter[];
  currentUser: UserSession;
  onEditChapter: (chapter: ThesisChapter) => void;
  onAddObservationForChapter: (chapter: ThesisChapter) => void;
  onAddTaskForChapter: (chapter: ThesisChapter) => void;
  onToggleVisibility?: (chapterId: string) => void;
}

export const ChaptersSection: React.FC<ChaptersSectionProps> = ({
  chapters,
  currentUser,
  onEditChapter,
  onAddObservationForChapter,
  onAddTaskForChapter,
  onToggleVisibility,
}) => {
  const isTesista = currentUser.role === 'tesista';
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [expandedSubsections, setExpandedSubsections] = useState<Record<string, boolean>>({
    'ch-1': true, // Keep Chapter 1 open by default as example
  });

  const toggleSubsections = (chapterId: string) => {
    setExpandedSubsections(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  // If tesista, only show visible chapters
  const baseChapters = isTesista 
    ? chapters.filter(c => c.visibleToTesista !== false) 
    : chapters;

  const hiddenCountForAdvisor = chapters.filter(c => c.visibleToTesista === false).length;

  const filteredChapters = baseChapters.filter((chapter) => {
    const matchesSearch = 
      chapter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.nextTask.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'todos') return true;
    if (filterStatus === 'observados') return chapter.status === 'Observado' || chapter.pendingObservations.length > 0;
    return chapter.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const statuses: { id: string; label: string; count: number }[] = [
    { id: 'todos', label: 'Todos', count: baseChapters.length },
    { id: 'aprobado', label: 'Aprobados', count: baseChapters.filter(c => c.status === 'Aprobado').length },
    { id: 'en desarrollo', label: 'En desarrollo', count: baseChapters.filter(c => c.status === 'En desarrollo').length },
    { id: 'en revisión', label: 'En revisión', count: baseChapters.filter(c => c.status === 'En revisión').length },
    { id: 'observados', label: 'Con observaciones', count: baseChapters.filter(c => c.status === 'Observado' || c.pendingObservations.length > 0).length },
    { id: 'pendiente', label: 'Pendientes', count: baseChapters.filter(c => c.status === 'Pendiente').length },
  ];

  return (
    <div className="space-y-6">
      {/* Role Notice Banner */}
      {/* Official Guideline Banner */}
      <div className="p-3.5 bg-linear-to-r from-slate-900 via-slate-850 to-slate-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 shadow-xs border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/25">
            <Award size={19} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-white tracking-wide">Anexo 2.3 • Estructura del Informe Final de Tesis</span>
              <span className="text-[10px] font-semibold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                Para optar el Título Profesional
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Formato universitario con Páginas preliminares, Capítulos 1 al 5, Conclusiones/Recomendaciones, Referencias y Anexos.
            </p>
          </div>
        </div>
      </div>

      {isTesista ? (
        <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <Lock size={15} className="text-blue-700 shrink-0" />
            <div>
              <span className="font-bold">Vista de Avance del Tesista</span>
              <p className="text-[11px] text-blue-700">
                Visualizas los {baseChapters.length} capítulos aprobados por tu asesor. Para consultar sobre algún capítulo, utiliza el botón "+ Consulta".
              </p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-blue-200/80 text-blue-900 uppercase">
            Solo Lectura
          </span>
        </div>
      ) : (
        <div className="p-3.5 bg-slate-900 text-white rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={16} className="text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-amber-300">Modo Asesor: Control de Edición y Aprobación de Visibilidad</span>
              <p className="text-[11px] text-slate-300">
                Puedes editar el avance, redactar dictámenes y alternar qué capítulos apruebas que el tesista pueda ver ({hiddenCountForAdvisor} actualmente en borrador privado).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="chapters-search-input"
              type="text"
              placeholder="Buscar por capítulo, palabra clave o tarea pendiente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 text-xs">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  viewMode === 'cards' 
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tarjetas
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  viewMode === 'table' 
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tabla
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Filter size={13} /> Filtrar:
          </span>
          {statuses.map((st) => (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id)}
              className={`px-3 py-1.5 rounded-full border whitespace-nowrap transition-all font-medium ${
                filterStatus === st.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st.label} ({st.count})
            </button>
          ))}
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredChapters.map((chapter) => {
            const isObserved = chapter.status === 'Observado' || chapter.pendingObservations.length > 0;
            const isVisibleToTesista = chapter.visibleToTesista !== false;

            return (
              <div
                key={chapter.id}
                id={`chapter-detail-card-${chapter.id}`}
                className={`bg-white border rounded-2xl p-5 shadow-2xs flex flex-col justify-between transition-all hover:shadow-xs ${
                  isObserved 
                    ? 'border-rose-300 ring-1 ring-rose-200/60 bg-rose-50/10' 
                    : !isVisibleToTesista && !isTesista
                    ? 'border-amber-300 bg-amber-50/15'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Top Bar: Chapter index, Title, Visibility toggle for Advisor */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {chapter.order}
                      </span>
                      <div>
                        {chapter.category && (
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-1 inline-block ${
                            chapter.category === 'preliminares' 
                              ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                              : chapter.category === 'finales'
                              ? 'bg-teal-100 text-teal-800 border border-teal-200'
                              : 'bg-blue-50 text-blue-800 border border-blue-100'
                          }`}>
                            {chapter.category === 'preliminares' ? 'Páginas preliminares' : chapter.category === 'finales' ? 'Sección final' : 'Capítulo'}
                          </span>
                        )}
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-slate-900 leading-snug">
                            {chapter.name}
                          </h3>
                          {/* Visibility badge for advisor */}
                          {!isTesista && (
                            <button
                              type="button"
                              onClick={() => onToggleVisibility && onToggleVisibility(chapter.id)}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 transition-all ${
                                isVisibleToTesista
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                              }`}
                              title={isVisibleToTesista ? 'Aprobado: el tesista puede verlo. Clic para ocultar' : 'Oculto al tesista: Clic para aprobar visibilidad'}
                            >
                              {isVisibleToTesista ? <Eye size={10} /> : <EyeOff size={10} />}
                              <span>{isVisibleToTesista ? 'Visible Tesista' : 'Oculto Tesista'}</span>
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                          {chapter.summary}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <StatusBadge status={chapter.status} size="sm" />
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Avance Oficial</span>
                      <span className="font-bold text-slate-800">{chapter.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          chapter.status === 'Aprobado' 
                            ? 'bg-emerald-500' 
                            : chapter.status === 'Observado' 
                            ? 'bg-rose-500' 
                            : 'bg-blue-600'
                        }`}
                        style={{ width: `${chapter.progressPercent}%` }}
                      />
                    </div>
                    {chapter.targetPages && (
                      <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
                        <span>Páginas: {chapter.completedPages || 0} de {chapter.targetPages} estimadas</span>
                        {chapter.wordCount && <span>~{chapter.wordCount} palabras</span>}
                      </div>
                    )}
                  </div>

                  {/* Anexo 2.3 Subsections Accordion */}
                  {chapter.subsections && chapter.subsections.length > 0 && (
                    <div className="mb-4 rounded-xl border border-slate-200/90 overflow-hidden bg-slate-50/50">
                      <button
                        type="button"
                        onClick={() => toggleSubsections(chapter.id)}
                        className="w-full px-3 py-2 flex items-center justify-between text-left text-xs font-semibold text-slate-700 hover:bg-slate-100/80 transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <Layers size={13} className="text-blue-600" />
                          Subcapítulos oficiales ({chapter.subsections.filter(s => s.completed).length}/{chapter.subsections.length})
                        </span>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <span className="text-[10px] font-mono font-medium">
                            {Math.round((chapter.subsections.filter(s => s.completed).length / chapter.subsections.length) * 100)}%
                          </span>
                          {expandedSubsections[chapter.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </div>
                      </button>

                      {expandedSubsections[chapter.id] && (
                        <div className="p-2 pt-0 space-y-1 border-t border-slate-200/80 bg-white max-h-48 overflow-y-auto">
                          {chapter.subsections.map((sub, sIdx) => (
                            <div
                              key={sIdx}
                              className={`flex items-start justify-between gap-2 p-1.5 rounded-lg text-xs transition-colors ${
                                sub.completed ? 'bg-emerald-50/60 text-emerald-950' : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-start gap-2 min-w-0">
                                <span className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center shrink-0 text-[10px] ${
                                  sub.completed ? 'bg-emerald-500 text-white' : 'border border-slate-300 text-slate-400'
                                }`}>
                                  {sub.completed ? '✓' : ''}
                                </span>
                                <span className="font-mono font-bold text-[11px] text-slate-500 shrink-0">
                                  {sub.code}
                                </span>
                                <span className="truncate leading-tight text-[11px]">{sub.title}</span>
                              </div>
                              {sub.status && (
                                <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-full shrink-0 ${
                                  sub.status === 'Aprobado' ? 'bg-emerald-100 text-emerald-800' :
                                  sub.status === 'Observado' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {sub.status}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Pending Observations */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <AlertTriangle size={13} className={chapter.pendingObservations.length > 0 ? "text-rose-600" : "text-slate-400"} />
                        Observaciones pendientes ({chapter.pendingObservations.length})
                      </span>
                    </div>
                    {chapter.pendingObservations.length > 0 ? (
                      <ul className="space-y-1.5">
                        {chapter.pendingObservations.map((obs, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-rose-900 bg-rose-50 border border-rose-200/80 rounded-lg p-2.5 leading-relaxed flex items-start gap-2"
                          >
                            <span className="font-bold text-rose-600 shrink-0">•</span>
                            <span>{obs}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-xs text-slate-400 italic bg-slate-50 rounded-lg p-2 border border-slate-100">
                        No hay observaciones pendientes en este capítulo.
                      </div>
                    )}
                  </div>

                  {/* Next Task Box */}
                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl mb-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                      <CheckSquare size={11} className="text-blue-600" />
                      Próxima Tarea
                    </div>
                    <p className="text-xs font-medium text-slate-800 leading-snug">
                      {chapter.nextTask || 'Definir siguiente paso'}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-slate-500 flex items-center gap-1">
                    <Clock size={12} />
                    <span>Modif.: {chapter.lastModified}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Advisor vs Tesista actions */}
                    {isTesista ? (
                      <>
                        <button
                          onClick={() => onAddObservationForChapter(chapter)}
                          className="px-2.5 py-1 text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg font-medium inline-flex items-center gap-1 transition-colors"
                          title="Enviar consulta u observación sobre este capítulo"
                        >
                          <MessageSquarePlus size={12} />
                          <span>+ Consulta</span>
                        </button>
                        <button
                          onClick={() => onEditChapter(chapter)}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-medium inline-flex items-center gap-1 transition-colors border border-slate-300"
                        >
                          <BookOpen size={12} />
                          <span>Ver Ficha</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => onAddObservationForChapter(chapter)}
                          className="px-2.5 py-1 text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg font-medium transition-colors"
                          title="Agregar dictamen / observación del asesor"
                        >
                          + Obs
                        </button>
                        <button
                          onClick={() => onAddTaskForChapter(chapter)}
                          className="px-2.5 py-1 text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg font-medium transition-colors"
                          title="Crear tarea para este capítulo"
                        >
                          + Tarea
                        </button>
                        <button
                          onClick={() => onEditChapter(chapter)}
                          className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium inline-flex items-center gap-1 transition-colors"
                        >
                          <Edit3 size={12} />
                          <span>Editar</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 w-12 text-center">N°</th>
                  <th className="p-3.5">Sección / Capítulo</th>
                  <th className="p-3.5">Estado</th>
                  <th className="p-3.5 w-32">Avance</th>
                  {!isTesista && <th className="p-3.5">Visibilidad Tesista</th>}
                  <th className="p-3.5">Observaciones</th>
                  <th className="p-3.5">Próxima Tarea</th>
                  <th className="p-3.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredChapters.map((chapter) => {
                  const isVisible = chapter.visibleToTesista !== false;
                  return (
                    <tr 
                      key={chapter.id} 
                      className={`hover:bg-slate-50/80 transition-colors ${
                        chapter.status === 'Observado' ? 'bg-rose-50/20' : ''
                      }`}
                    >
                      <td className="p-3.5 font-bold text-center text-slate-400">
                        {chapter.order}
                      </td>
                      <td className="p-3.5">
                        {chapter.category && (
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mr-1.5 inline-block ${
                            chapter.category === 'preliminares' 
                              ? 'bg-purple-100 text-purple-800' 
                              : chapter.category === 'finales'
                              ? 'bg-teal-100 text-teal-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {chapter.category === 'preliminares' ? 'Preliminar' : chapter.category === 'finales' ? 'Final' : 'Capítulo'}
                          </span>
                        )}
                        <div className="font-bold text-slate-900 text-sm">
                          {chapter.name}
                        </div>
                        {chapter.subsections && chapter.subsections.length > 0 && (
                          <div className="text-[10px] text-blue-700 font-medium mt-0.5">
                            {chapter.subsections.filter(s => s.completed).length} de {chapter.subsections.length} subcapítulos completados
                          </div>
                        )}
                        <div className="text-[11px] text-slate-400 line-clamp-1 max-w-xs mt-0.5">
                          {chapter.summary}
                        </div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <StatusBadge status={chapter.status} size="sm" />
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                chapter.status === 'Aprobado' ? 'bg-emerald-500' : 'bg-blue-600'
                              }`}
                              style={{ width: `${chapter.progressPercent}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-800">{chapter.progressPercent}%</span>
                        </div>
                      </td>
                      {!isTesista && (
                        <td className="p-3.5 whitespace-nowrap">
                          <button
                            onClick={() => onToggleVisibility && onToggleVisibility(chapter.id)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 border ${
                              isVisible 
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}
                          >
                            {isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                            <span>{isVisible ? 'Aprobado' : 'Oculto'}</span>
                          </button>
                        </td>
                      )}
                      <td className="p-3.5">
                        {chapter.pendingObservations.length > 0 ? (
                          <div className="text-rose-800 font-medium">
                            <span className="inline-flex items-center gap-1 font-bold text-rose-700 mb-0.5">
                              <AlertTriangle size={12} />
                              {chapter.pendingObservations.length} pendientes
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400">Ninguna</span>
                        )}
                      </td>
                      <td className="p-3.5 max-w-xs">
                        <span className="font-medium text-slate-800 line-clamp-2">
                          {chapter.nextTask}
                        </span>
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => onEditChapter(chapter)}
                          className="px-2.5 py-1.5 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold"
                        >
                          {isTesista ? <BookOpen size={13} /> : <Edit3 size={13} />}
                          <span>{isTesista ? 'Ver' : 'Editar'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

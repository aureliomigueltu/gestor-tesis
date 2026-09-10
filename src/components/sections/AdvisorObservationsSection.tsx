import React, { useState } from 'react';
import { AdvisorObservation, ThesisChapter, UserSession } from '../../types/thesis';
import { 
  MessageSquareWarning, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Filter, 
  Search, 
  Edit3, 
  Check, 
  Trash2,
  Send,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
  MessageSquarePlus,
  Lock
} from 'lucide-react';

interface AdvisorObservationsSectionProps {
  observations: AdvisorObservation[];
  chapters: ThesisChapter[];
  currentUser: UserSession;
  onAddObservationClick: () => void;
  onUpdateObservation: (updated: AdvisorObservation) => void;
  onDeleteObservation: (id: string) => void;
  onToggleObservationApproval?: (obsId: string) => void;
}

export const AdvisorObservationsSection: React.FC<AdvisorObservationsSectionProps> = ({
  observations,
  chapters,
  currentUser,
  onAddObservationClick,
  onUpdateObservation,
  onDeleteObservation,
  onToggleObservationApproval,
}) => {
  const isTesista = currentUser.role === 'tesista';
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [selectedChapter, setSelectedChapter] = useState<string>('todos');
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolutionText, setResolutionText] = useState('');

  // Tesista only sees what advisor approved, OR their own queries
  const visibleObservations = isTesista
    ? observations.filter(o => o.approvedForTesista !== false || o.authorRole === 'tesista')
    : observations;

  const hiddenFromStudentCount = observations.filter(o => o.approvedForTesista === false && o.authorRole !== 'tesista').length;

  const filtered = visibleObservations.filter((obs) => {
    const matchesSearch = 
      obs.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obs.chapterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (obs.resolutionNotes && obs.resolutionNotes.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (obs.authorName && obs.authorName.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (filterStatus !== 'todos' && obs.status.toLowerCase() !== filterStatus.toLowerCase()) return false;
    if (selectedChapter !== 'todos' && obs.chapterId !== selectedChapter) return false;
    return true;
  });

  const pendingCount = visibleObservations.filter(o => o.status === 'Pendiente').length;
  const inReviewCount = visibleObservations.filter(o => o.status === 'En revisión').length;
  const resolvedCount = visibleObservations.filter(o => o.status === 'Subsanada').length;

  const handleStartResolving = (obs: AdvisorObservation) => {
    setResolvingId(obs.id);
    setResolutionText(obs.resolutionNotes || '');
  };

  const handleSaveResolution = (obs: AdvisorObservation, newStatus: 'Subsanada' | 'En revisión') => {
    onUpdateObservation({
      ...obs,
      status: newStatus,
      resolutionNotes: resolutionText,
      resolvedDate: newStatus === 'Subsanada' 
        ? new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) 
        : (obs.resolvedDate || new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }))
    });
    setResolvingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      {isTesista ? (
        <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-900">
          <div className="flex items-center gap-2.5">
            <Lock size={15} className="text-blue-700 shrink-0" />
            <div>
              <span className="font-bold">Bandeja de Dictámenes del Asesor y Consultas del Tesista</span>
              <p className="text-[11px] text-blue-700">
                Visualizas los dictámenes que tu asesor ha aprobado para tu revisión, y puedes colocar observaciones o consultas directas para su visto bueno.
              </p>
            </div>
          </div>
          <button
            onClick={onAddObservationClick}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold inline-flex items-center gap-1.5 shadow-xs shrink-0 self-start sm:self-auto transition-colors"
          >
            <MessageSquarePlus size={14} />
            <span>Colocar Consulta u Observación</span>
          </button>
        </div>
      ) : (
        <div className="p-3.5 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={16} className="text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-amber-300">Modo Asesor: Supervisión y Aprobación de Observaciones</span>
              <p className="text-[11px] text-slate-300">
                Controlas qué dictámenes ve el tesista ({hiddenFromStudentCount} actualmente en borrador privado). Además, puedes responder a las consultas formuladas por el tesista.
              </p>
            </div>
          </div>
          <button
            onClick={onAddObservationClick}
            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold inline-flex items-center gap-1.5 shadow-xs shrink-0 self-start sm:self-auto transition-colors"
          >
            <Plus size={14} />
            <span>Nuevo Dictamen Oficial</span>
          </button>
        </div>
      )}

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-rose-700">Pendientes de Subsanar</span>
            <div className="text-2xl font-bold text-rose-950 mt-1">{pendingCount}</div>
            <p className="text-[11px] text-rose-600 mt-0.5">Requieren ajuste en el texto</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-200/70 text-rose-800 flex items-center justify-center">
            <AlertTriangle size={20} />
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-700">En Revisión por Asesor</span>
            <div className="text-2xl font-bold text-amber-950 mt-1">{inReviewCount}</div>
            <p className="text-[11px] text-amber-600 mt-0.5">Esperando dictamen / visto bueno</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-200/70 text-amber-800 flex items-center justify-center">
            <Clock size={20} />
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-700">Subsanadas y Aprobadas</span>
            <div className="text-2xl font-bold text-emerald-950 mt-1">{resolvedCount}</div>
            <p className="text-[11px] text-emerald-600 mt-0.5">Levantadas satisfactoriamente</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-200/70 text-emerald-800 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* Control and Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar en observaciones, capítulos o respuestas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <button
            onClick={onAddObservationClick}
            className={`px-4 py-2 text-xs font-bold text-white rounded-xl inline-flex items-center gap-1.5 shadow-xs transition-colors shrink-0 ${
              isTesista ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-slate-800'
            }`}
          >
            <Plus size={15} />
            <span>{isTesista ? 'Colocar Consulta / Observación' : 'Registrar Observación'}</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Filter size={13} /> Estado:
          </span>
          {['todos', 'pendiente', 'en revisión', 'subsanada'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-full border capitalize font-medium transition-all ${
                filterStatus === st
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}

          <span className="text-slate-300 ml-2">|</span>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:ring-1 focus:ring-slate-900"
          >
            <option value="todos">Todos los capítulos</option>
            {chapters.map((ch) => (
              <option key={ch.id} value={ch.id}>{ch.order}. {ch.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Observations Cards */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-xs">
            No se encontraron observaciones ni consultas registradas con los filtros actuales.
          </div>
        ) : (
          filtered.map((obs) => {
            const isPending = obs.status === 'Pendiente';
            const isResolved = obs.status === 'Subsanada';
            const isResolving = resolvingId === obs.id;
            const isAuthorTesista = obs.authorRole === 'tesista';
            const isApprovedForTesista = obs.approvedForTesista !== false;

            return (
              <div
                key={obs.id}
                id={`obs-card-${obs.id}`}
                className={`bg-white border rounded-2xl p-5 shadow-2xs transition-all ${
                  isPending 
                    ? 'border-rose-200 ring-1 ring-rose-100 bg-rose-50/10' 
                    : isResolved 
                    ? 'border-emerald-200 bg-emerald-50/10' 
                    : 'border-amber-200 bg-amber-50/10'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                        {obs.chapterName}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                        obs.priority === 'Alta' 
                          ? 'bg-rose-100 text-rose-800 border-rose-300' 
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}>
                        Prioridad {obs.priority}
                      </span>
                      <span className="text-xs text-slate-400">
                        {obs.date}
                      </span>

                      {/* Origin tag */}
                      {isAuthorTesista ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 inline-flex items-center gap-1">
                          <User size={10} /> Consulta del Tesista
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                          Dictamen del Asesor
                        </span>
                      )}

                      {/* Approval toggle for Advisor */}
                      {!isTesista && (
                        <button
                          type="button"
                          onClick={() => onToggleObservationApproval && onToggleObservationApproval(obs.id)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 transition-colors ${
                            isApprovedForTesista
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                              : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                          }`}
                          title={isApprovedForTesista ? 'Aprobado: el tesista puede verlo. Clic para ocultar' : 'Oculto al tesista: Clic para aprobar visibilidad'}
                        >
                          {isApprovedForTesista ? <Eye size={10} /> : <EyeOff size={10} />}
                          <span>{isApprovedForTesista ? 'Aprobado para Tesista' : 'Oculto al Tesista'}</span>
                        </button>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 pt-1">
                      {isAuthorTesista 
                        ? `Consulta formulada por: ${obs.authorName || 'Tesista'}` 
                        : `Dictamen de: ${obs.advisorName}`}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 self-start shrink-0">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border inline-flex items-center gap-1 ${
                      isPending 
                        ? 'bg-rose-100 text-rose-800 border-rose-300' 
                        : isResolved 
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}>
                      {isPending && <AlertTriangle size={12} />}
                      {isResolved && <CheckCircle2 size={12} />}
                      {!isPending && !isResolved && <Clock size={12} />}
                      <span>{obs.status}</span>
                    </span>

                    {(!isTesista || isAuthorTesista) && (
                      <button
                        onClick={() => onDeleteObservation(obs.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                        title="Eliminar observación"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Observation text */}
                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-800 leading-relaxed font-medium">
                  "{obs.content}"
                </div>

                {/* Resolution / Subsanación / Descargo Area */}
                <div className="pt-3">
                  {isResolving ? (
                    <div className="p-3.5 bg-white border border-blue-200 rounded-xl space-y-3">
                      <label className="text-xs font-bold text-blue-900 block">
                        {isTesista ? 'Descargo o Detalle de Subsanación del Tesista:' : 'Respuesta o Aprobación del Asesor:'}
                      </label>
                      <textarea
                        value={resolutionText}
                        onChange={(e) => setResolutionText(e.target.value)}
                        placeholder={isTesista 
                          ? "Explica detalladamente los cambios realizados en el manuscrito, páginas modificadas y fuentes añadidas..."
                          : "Escribe la respuesta del asesor o la retroalimentación metodológica..."
                        }
                        className="w-full text-xs text-slate-800 border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-600"
                        rows={3}
                      />
                      <div className="flex items-center justify-end gap-2 text-xs">
                        <button
                          onClick={() => setResolvingId(null)}
                          className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleSaveResolution(obs, 'En revisión')}
                          className="px-3 py-1.5 font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg border border-amber-300"
                        >
                          Enviar a Revisión
                        </button>
                        <button
                          onClick={() => handleSaveResolution(obs, 'Subsanada')}
                          className="px-3.5 py-1.5 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
                        >
                          {isTesista ? 'Subsanar' : 'Aprobar como Subsanada'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      {obs.resolutionNotes ? (
                        <div className="flex-1 bg-emerald-50/70 border border-emerald-200/70 p-2.5 rounded-xl text-xs">
                          <strong className="text-emerald-900 block font-semibold mb-0.5">
                            Respuesta / Subsanación ({obs.resolvedDate || 'Registrada'}):
                          </strong>
                          <p className="text-slate-700">{obs.resolutionNotes}</p>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-xs">
                          Pendiente de redacción de descargo o respuesta metodológica
                        </span>
                      )}

                      <button
                        onClick={() => handleStartResolving(obs)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium inline-flex items-center gap-1 shrink-0 self-start sm:self-auto transition-colors"
                      >
                        <Edit3 size={13} />
                        <span>{obs.resolutionNotes ? 'Modificar Respuesta' : (isTesista ? 'Subsanar / Responder' : 'Responder Dictamen')}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

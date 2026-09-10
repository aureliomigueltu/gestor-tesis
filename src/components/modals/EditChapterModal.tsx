import React, { useState } from 'react';
import { ThesisChapter, ThesisSectionStatus, UserSession } from '../../types/thesis';
import { StatusBadge } from '../common/StatusBadge';
import { 
  X, 
  Trash2, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  Lock, 
  MessageSquarePlus, 
  CheckCircle2 
} from 'lucide-react';

interface EditChapterModalProps {
  chapter: ThesisChapter;
  currentUser: UserSession;
  onSave: (updated: ThesisChapter) => void;
  onClose: () => void;
  onOpenAddObservation?: () => void;
}

export const EditChapterModal: React.FC<EditChapterModalProps> = ({
  chapter,
  currentUser,
  onSave,
  onClose,
  onOpenAddObservation,
}) => {
  const isTesista = currentUser.role === 'tesista';
  const [formData, setFormData] = useState<ThesisChapter>({ 
    ...chapter,
    visibleToTesista: chapter.visibleToTesista !== undefined ? chapter.visibleToTesista : true 
  });
  const [newObservation, setNewObservation] = useState('');

  const statusOptions: ThesisSectionStatus[] = [
    'Pendiente',
    'En desarrollo',
    'En revisión',
    'Observado',
    'Aprobado'
  ];

  const handleAddObservation = () => {
    if (!newObservation.trim()) return;
    setFormData({
      ...formData,
      pendingObservations: [...formData.pendingObservations, newObservation.trim()],
      observationsCount: formData.pendingObservations.length + 1,
      status: formData.status === 'Aprobado' ? 'Observado' : formData.status
    });
    setNewObservation('');
  };

  const handleRemoveObservation = (index: number) => {
    const updatedObs = formData.pendingObservations.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      pendingObservations: updatedObs,
      observationsCount: updatedObs.length
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTesista) return;
    onSave({
      ...formData,
      lastModified: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl max-h-[92vh] overflow-y-auto space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Capítulo {formData.order}</span>
              {isTesista ? (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 flex items-center gap-1">
                  <Lock size={10} /> Solo Lectura (Tesista)
                </span>
              ) : (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                  Modo Edición Asesor
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight mt-0.5">
              {formData.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Read-only banner for Tesista */}
        {isTesista && (
          <div className="p-3 bg-blue-50/80 border border-blue-200/80 rounded-xl text-xs text-blue-900 flex items-center justify-between">
            <div>
              <span className="font-bold block">Visualización de Avance del Capítulo</span>
              <p className="text-[11px] text-blue-700">
                Los estados y porcentajes oficiales son administrados y aprobados por tu asesor. Puedes colocar observaciones o consultas.
              </p>
            </div>
            {onOpenAddObservation && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAddObservation();
                }}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shrink-0 inline-flex items-center gap-1 shadow-xs"
              >
                <MessageSquarePlus size={13} />
                <span>+ Consulta</span>
              </button>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Visibility Approval for Advisor */}
          {!isTesista && (
            <div className="p-3.5 bg-slate-900 text-white rounded-xl flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${formData.visibleToTesista ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                  {formData.visibleToTesista ? <Eye size={16} /> : <EyeOff size={16} />}
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span>Aprobar visibilidad para el Tesista:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${formData.visibleToTesista ? 'bg-emerald-400 text-slate-950' : 'bg-rose-400 text-slate-950'}`}>
                      {formData.visibleToTesista ? 'Aprobado y Visible' : 'Oculto al Tesista'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    {formData.visibleToTesista 
                      ? 'El tesista puede ver este capítulo y sus métricas de avance en su panel.'
                      : 'Este capítulo está bloqueado y oculto para el tesista hasta que decidas aprobarlo.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, visibleToTesista: !formData.visibleToTesista })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  formData.visibleToTesista 
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                {formData.visibleToTesista ? 'Visible ✓' : 'Habilitar'}
              </button>
            </div>
          )}

          {/* Status Selection */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center justify-between">
              <span>Estado Oficial de la Sección:</span>
              {isTesista && <StatusBadge status={formData.status} size="sm" />}
            </label>
            {!isTesista ? (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {statusOptions.map((st) => (
                  <button
                    type="button"
                    key={st}
                    onClick={() => setFormData({ ...formData, status: st })}
                    className={`p-2 rounded-xl border text-center font-medium transition-all ${
                      formData.status === st 
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs font-bold' 
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-slate-600 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-medium">
                Estado actual establecido por el asesor: <strong className="text-slate-900">{formData.status}</strong>
              </p>
            )}
          </div>

          {/* Progress Percent */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-700">Porcentaje de Avance Oficial:</label>
              <span className="font-extrabold text-sm text-slate-900">{formData.progressPercent}%</span>
            </div>
            {!isTesista ? (
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progressPercent}
                  onChange={(e) => setFormData({ ...formData, progressPercent: Number(e.target.value) })}
                  className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progressPercent}
                  onChange={(e) => setFormData({ ...formData, progressPercent: Math.min(100, Math.max(0, Number(e.target.value))) })}
                  className="w-16 p-1.5 border border-slate-300 rounded-lg text-center font-bold text-xs"
                />
              </div>
            ) : (
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${formData.status === 'Aprobado' ? 'bg-emerald-500' : 'bg-blue-600'}`}
                  style={{ width: `${formData.progressPercent}%` }}
                />
              </div>
            )}
          </div>

          {/* Next Task */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 block">Próxima Tarea / Entregable:</label>
            {!isTesista ? (
              <input
                type="text"
                value={formData.nextTask}
                onChange={(e) => setFormData({ ...formData, nextTask: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-slate-900"
                placeholder="Ej: Levantar observaciones metodológicas y contrastar con antecedentes..."
                required
              />
            ) : (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium">
                {formData.nextTask || 'Sin próxima tarea asignada'}
              </div>
            )}
          </div>

          {/* Pages */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Páginas Redactadas:</label>
              {!isTesista ? (
                <input
                  type="number"
                  min="0"
                  value={formData.completedPages || 0}
                  onChange={(e) => setFormData({ ...formData, completedPages: Number(e.target.value) })}
                  className="w-full p-2 border border-slate-300 rounded-xl text-xs"
                />
              ) : (
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800">
                  {formData.completedPages || 0} páginas
                </div>
              )}
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Meta de Páginas:</label>
              {!isTesista ? (
                <input
                  type="number"
                  min="1"
                  value={formData.targetPages || 10}
                  onChange={(e) => setFormData({ ...formData, targetPages: Number(e.target.value) })}
                  className="w-full p-2 border border-slate-300 rounded-xl text-xs"
                />
              ) : (
                <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800">
                  {formData.targetPages || 10} páginas estimadas
                </div>
              )}
            </div>
          </div>

          {/* Anexo 2.3 Subsections Checklist */}
          {formData.subsections && formData.subsections.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700 flex items-center gap-1.5 text-xs">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  Estructura Anexo 2.3: Subcapítulos ({formData.subsections.filter(s => s.completed).length} / {formData.subsections.length} completados)
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                  {Math.round((formData.subsections.filter(s => s.completed).length / formData.subsections.length) * 100)}%
                </span>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/80">
                {formData.subsections.map((sub, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded-lg text-xs transition-colors border ${
                      sub.completed 
                        ? 'bg-emerald-50/80 border-emerald-200/80 text-emerald-950' 
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <label className="flex items-center gap-2.5 cursor-pointer flex-1 select-none">
                      <input
                        type="checkbox"
                        disabled={isTesista}
                        checked={Boolean(sub.completed)}
                        onChange={(e) => {
                          const updatedSubs = [...(formData.subsections || [])];
                          updatedSubs[idx] = { ...updatedSubs[idx], completed: e.target.checked };
                          const completedCount = updatedSubs.filter(s => s.completed).length;
                          const newProgress = Math.round((completedCount / updatedSubs.length) * 100);
                          setFormData({
                            ...formData,
                            subsections: updatedSubs,
                            progressPercent: newProgress
                          });
                        }}
                        className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4 shrink-0 disabled:opacity-75"
                      />
                      <span className="font-bold font-mono text-[11px] text-slate-500 shrink-0">
                        {sub.code}
                      </span>
                      <span className="leading-snug">{sub.title}</span>
                    </label>
                    {sub.status && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ml-2 shrink-0 ${
                        sub.status === 'Aprobado'
                          ? 'bg-emerald-100 text-emerald-800'
                          : sub.status === 'Observado'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {sub.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pending Observations */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <AlertTriangle size={14} className="text-rose-600" />
                Observaciones Pendientes ({formData.pendingObservations.length})
              </label>
            </div>

            {formData.pendingObservations.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {formData.pendingObservations.map((obs, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-2 p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-950">
                    <span className="flex-1 leading-relaxed text-xs">{obs}</span>
                    {!isTesista && (
                      <button
                        type="button"
                        onClick={() => handleRemoveObservation(idx)}
                        className="text-rose-400 hover:text-rose-700 p-1"
                        title="Marcar como resuelta / quitar"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic text-xs">Sin observaciones registradas.</p>
            )}

            {!isTesista && (
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newObservation}
                  onChange={(e) => setNewObservation(e.target.value)}
                  placeholder="Añadir nueva observación directa a este capítulo..."
                  className="flex-1 p-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-slate-900"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddObservation();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddObservation}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs"
                >
                  + Añadir
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
            >
              {isTesista ? 'Cerrar' : 'Cancelar'}
            </button>
            {!isTesista && (
              <button
                type="submit"
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-xs transition-colors"
              >
                Guardar Cambios
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

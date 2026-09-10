import React, { useState } from 'react';
import { AdvisorObservation, ThesisChapter, UserSession } from '../../types/thesis';
import { X, AlertTriangle, MessageSquarePlus, Eye, ShieldCheck } from 'lucide-react';

interface AddObservationModalProps {
  chapters: ThesisChapter[];
  selectedChapterId?: string;
  currentUser: UserSession;
  onSave: (obs: AdvisorObservation) => void;
  onClose: () => void;
}

export const AddObservationModal: React.FC<AddObservationModalProps> = ({
  chapters,
  selectedChapterId,
  currentUser,
  onSave,
  onClose,
}) => {
  const isTesista = currentUser.role === 'tesista';
  const [chapterId, setChapterId] = useState(selectedChapterId || chapters[1]?.id || 'ch-2');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState(currentUser.name);
  const [priority, setPriority] = useState<'Alta' | 'Media' | 'Baja'>('Media');
  const [approvedForTesista, setApprovedForTesista] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const targetChapter = chapters.find(c => c.id === chapterId);
    const newObs: AdvisorObservation = {
      id: `obs-${Date.now()}`,
      chapterId,
      chapterName: targetChapter?.name || 'Capítulo',
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      advisorName: isTesista ? 'Ing. Aurelio Tacuri Urquizo' : authorName,
      authorRole: currentUser.role,
      authorName: currentUser.name,
      approvedForTesista: isTesista ? true : approvedForTesista,
      content: content.trim(),
      priority,
      status: 'Pendiente'
    };

    onSave(newObs);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isTesista ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'
            }`}>
              {isTesista ? <MessageSquarePlus size={16} /> : <AlertTriangle size={16} />}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isTesista ? 'Registrar Consulta / Observación del Tesista' : 'Registrar Observación del Asesor'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {isTesista 
                  ? 'Envía una observación o consulta metodológica al asesor'
                  : 'Dictamen oficial sobre el manuscrito de tesis'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Capítulo Afectado:</label>
            <select
              value={chapterId}
              onChange={(e) => setChapterId(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-xl text-xs bg-slate-50 focus:bg-white"
            >
              {chapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.order}. {ch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">
                {isTesista ? 'Nombre del Tesista:' : 'Nombre del Asesor:'}
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-xl text-xs bg-slate-50"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Nivel de Prioridad:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full p-2 border border-slate-300 rounded-xl text-xs"
              >
                <option value="Alta">Alta (Urgente / Bloqueante)</option>
                <option value="Media">Media (Ajuste metodológico)</option>
                <option value="Baja">Baja (Formato o estilo)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">
              {isTesista ? 'Detalle de la Consulta u Observación:' : 'Observación o Requerimiento del Asesor:'}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                isTesista 
                  ? "Describe la duda metodológica, consulta sobre la muestra o solicitud de revisión para tu asesor..."
                  : "Escribe la indicación metodológica, vacíos bibliográficos o ajustes requeridos..."
              }
              className="w-full p-3 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-slate-900"
              rows={4}
              required
            />
          </div>

          {/* Visibility Approval Toggle for Advisor */}
          {!isTesista && (
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye size={15} className="text-amber-800 shrink-0" />
                <div>
                  <span className="font-bold text-amber-950 block">Aprobar visibilidad para el Tesista</span>
                  <p className="text-[11px] text-amber-800">
                    {approvedForTesista ? 'El tesista podrá ver este dictamen en su panel.' : 'Oculto: Permanece como borrador interno del asesor.'}
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={approvedForTesista}
                onChange={(e) => setApprovedForTesista(e.target.checked)}
                className="w-4 h-4 accent-slate-900 cursor-pointer"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-5 py-2 text-white rounded-xl font-bold shadow-xs transition-colors ${
                isTesista 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              {isTesista ? 'Enviar al Asesor' : 'Guardar Observación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

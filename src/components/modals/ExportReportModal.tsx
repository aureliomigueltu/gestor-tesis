import React, { useState } from 'react';
import { ThesisChapter, AdvisorObservation, ThesisTask, ResearchProfile } from '../../types/thesis';
import { X, Copy, Check, Printer, Download, FileText } from 'lucide-react';

interface ExportReportModalProps {
  research: ResearchProfile;
  chapters: ThesisChapter[];
  observations: AdvisorObservation[];
  tasks: ThesisTask[];
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  research,
  chapters,
  observations,
  tasks,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const pendingObs = observations.filter(o => o.status === 'Pendiente');
  const avgProgress = Math.round(
    chapters.reduce((sum, ch) => sum + ch.progressPercent, 0) / (chapters.length || 1)
  );

  const generateReportText = () => {
    return `
================================================================================
INFORME DE AVANCE DE TESIS DE PREGRADO
(Estructura Oficial Anexo 2.3 - Para optar el Título Profesional)
================================================================================
Fecha de emisión: ${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
Nivel Académico: Pregrado (Título Profesional)
Proyecto: ${research.title}
Tesista: ${research.author}
Asesor: ${research.advisor}
Institución: ${research.institution}
Grado a Optar: ${research.academicDegree || 'Título Profesional de Ingeniero'}
Programa: ${research.program}
Avance General Consolidado: ${avgProgress}%

--------------------------------------------------------------------------------
1. ESTADO DE LA ESTRUCTURA DE LA TESIS (ANEXO 2.3)
--------------------------------------------------------------------------------
${chapters.map(c => `
[${c.order}] ${c.name.toUpperCase()}
- Categoría: ${c.category === 'preliminares' ? 'Páginas preliminares' : c.category === 'finales' ? 'Sección final' : 'Capítulo de contenido'}
- Estado: ${c.status}
- Avance: ${c.progressPercent}% (${c.completedPages || 0}/${c.targetPages || 0} páginas | ${c.wordCount ? c.wordCount.toLocaleString() : 0} palabras)
- Última Modificación: ${c.lastModified}
${c.subsections && c.subsections.length > 0 ? `- Subcapítulos completados (${c.subsections.filter(s => s.completed).length}/${c.subsections.length}):\n${c.subsections.map(s => `    [${s.completed ? 'X' : ' '}] ${s.code} ${s.title}${s.status ? ` (${s.status})` : ''}`).join('\n')}\n` : ''}- Observaciones Pendientes: ${c.pendingObservations.length > 0 ? c.pendingObservations.join('; ') : 'Ninguna'}
- Próxima Tarea: ${c.nextTask}
`).join('\n')}

--------------------------------------------------------------------------------
2. OBSERVACIONES DEL ASESOR PENDIENTES DE SUBSANACIÓN (${pendingObs.length})
--------------------------------------------------------------------------------
${pendingObs.length === 0 ? 'No existen observaciones pendientes de subsanar.' : pendingObs.map((o, i) => `
${i + 1}. [${o.chapterName}] Prioridad: ${o.priority} | Fecha: ${o.date}
   Dictamen: "${o.content}"
   Estado: ${o.status}
   Subsanación: ${o.resolutionNotes || 'Pendiente de descargo o ajuste en manuscrito'}
`).join('\n')}

--------------------------------------------------------------------------------
3. PRÓXIMOS ENTREGABLES Y TAREAS EN CURSO
--------------------------------------------------------------------------------
${tasks.filter(t => t.status !== 'Completada').map((t, i) => `
${i + 1}. [${t.chapterName}] ${t.title}
   Fecha límite: ${t.dueDate} | Prioridad: ${t.priority} | Estado: ${t.status}
`).join('\n')}

================================================================================
Generado con el Gestor de Tesis Académico
Norma de Citación: APA 7.ª Edición
================================================================================
    `.trim();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateReportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl space-y-4 max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center">
              <FileText size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Informe Ejecutivo de Avance de Tesis
              </h3>
              <p className="text-xs text-slate-500">Documento consolidado para presentación ante el asesor o jurado</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        {/* Report Preview */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
          {generateReportText()}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 shrink-0">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl inline-flex items-center gap-1.5 border border-slate-300"
          >
            <Printer size={14} />
            <span>Imprimir / PDF</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
            >
              Cerrar
            </button>
            <button
              onClick={handleCopy}
              className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs inline-flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? '¡Informe Copiado!' : 'Copiar Texto Completo'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

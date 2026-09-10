import React, { useState } from 'react';
import { ThesisTask, ThesisChapter } from '../../types/thesis';
import { X, CheckSquare } from 'lucide-react';

interface AddTaskModalProps {
  chapters: ThesisChapter[];
  selectedChapterId?: string;
  onSave: (task: ThesisTask) => void;
  onClose: () => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  chapters,
  selectedChapterId,
  onSave,
  onClose,
}) => {
  const [chapterId, setChapterId] = useState(selectedChapterId || chapters[0]?.id || 'ch-1');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('15 Mar 2026');
  const [priority, setPriority] = useState<'Alta' | 'Media' | 'Baja'>('Media');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const targetChapter = chapters.find(c => c.id === chapterId);
    const newTask: ThesisTask = {
      id: `task-${Date.now()}`,
      chapterId,
      chapterName: targetChapter?.name || 'Capítulo',
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
      status: 'Por iniciar'
    };

    onSave(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <CheckSquare size={16} />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Crear Nueva Tarea de Cronograma
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Capítulo Asociado:</label>
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

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Título de la Tarea:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Correr prueba de normalidad Shapiro-Wilk y tabular en APA 7"
              className="w-full p-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Fecha Límite:</label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Ej: 20 Mar 2026"
                className="w-full p-2 border border-slate-300 rounded-xl text-xs"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Prioridad:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full p-2 border border-slate-300 rounded-xl text-xs"
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">
              Descripción y Detalles (Opcional):
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Anotaciones metodológicas, enlaces a fuentes o criterios de entrega..."
              className="w-full p-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600"
              rows={3}
            />
          </div>

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
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xs transition-colors"
            >
              Crear Tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

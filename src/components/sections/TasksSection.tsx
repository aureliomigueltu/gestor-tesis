import React, { useState } from 'react';
import { ThesisTask, ThesisChapter } from '../../types/thesis';
import { 
  CheckSquare, 
  Calendar, 
  Plus, 
  Filter, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2,
  Check
} from 'lucide-react';

interface TasksSectionProps {
  tasks: ThesisTask[];
  chapters: ThesisChapter[];
  onAddTaskClick: () => void;
  onUpdateTask: (updated: ThesisTask) => void;
  onDeleteTask: (id: string) => void;
}

export const TasksSection: React.FC<TasksSectionProps> = ({
  tasks,
  chapters,
  onAddTaskClick,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [filterChapter, setFilterChapter] = useState<string>('todos');

  const filtered = tasks.filter((t) => {
    const matchesSearch = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.chapterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (filterStatus !== 'todos' && t.status.toLowerCase() !== filterStatus.toLowerCase()) return false;
    if (filterChapter !== 'todos' && t.chapterId !== filterChapter) return false;
    return true;
  });

  const completedCount = tasks.filter(t => t.status === 'Completada').length;
  const inProgressCount = tasks.filter(t => t.status === 'En progreso').length;
  const pendingCount = tasks.filter(t => t.status === 'Por iniciar').length;
  const progressPercent = Math.round((completedCount / (tasks.length || 1)) * 100);

  const toggleTaskStatus = (task: ThesisTask) => {
    const nextStatus = task.status === 'Completada' ? 'En progreso' : 'Completada';
    onUpdateTask({ ...task, status: nextStatus });
  };

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan Operativo de Tesis</span>
            <h3 className="text-lg font-bold text-slate-900">
              Cumplimiento de Tareas del Cronograma
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-slate-900">{progressPercent}%</span>
            <button
              onClick={onAddTaskClick}
              className="px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl inline-flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus size={15} />
              <span>Nueva Tarea</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 bg-slate-50 rounded-lg">
            <strong className="text-slate-900 text-sm block">{pendingCount}</strong>
            <span className="text-slate-500 text-[11px]">Por iniciar</span>
          </div>
          <div className="p-2 bg-blue-50/70 rounded-lg">
            <strong className="text-blue-900 text-sm block">{inProgressCount}</strong>
            <span className="text-blue-700 text-[11px]">En progreso</span>
          </div>
          <div className="p-2 bg-emerald-50/70 rounded-lg">
            <strong className="text-emerald-900 text-sm block">{completedCount}</strong>
            <span className="text-emerald-700 text-[11px]">Completadas</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar tareas por título o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <select
            value={filterChapter}
            onChange={(e) => setFilterChapter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:ring-2 focus:ring-slate-900"
          >
            <option value="todos">Todos los capítulos</option>
            {chapters.map((ch) => (
              <option key={ch.id} value={ch.id}>{ch.order}. {ch.name}</option>
            ))}
          </select>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Filter size={13} /> Estado:
          </span>
          {['todos', 'por iniciar', 'en progreso', 'completada'].map((st) => (
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
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filtered.map((task) => {
          const isDone = task.status === 'Completada';
          const isInProgress = task.status === 'En progreso';

          return (
            <div
              key={task.id}
              id={`task-item-${task.id}`}
              className={`bg-white border rounded-2xl p-4 shadow-2xs flex items-start justify-between gap-3 transition-all hover:shadow-xs ${
                isDone ? 'opacity-70 bg-slate-50/60 border-slate-200' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                <button
                  onClick={() => toggleTaskStatus(task)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isDone 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-slate-300 hover:border-slate-500 bg-white'
                  }`}
                  aria-label="Completar tarea"
                >
                  {isDone && <Check size={13} />}
                </button>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {task.chapterName}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                      task.priority === 'Alta' 
                        ? 'bg-rose-50 text-rose-700 border-rose-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar size={12} />
                      {task.dueDate}
                    </span>
                  </div>

                  <h4 className={`text-sm font-semibold text-slate-900 ${isDone ? 'line-through text-slate-500' : ''}`}>
                    {task.title}
                  </h4>

                  {task.description && (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {task.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Status and Delete Action */}
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={task.status}
                  onChange={(e) => onUpdateTask({ ...task, status: e.target.value as any })}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium"
                >
                  <option value="Por iniciar">Por iniciar</option>
                  <option value="En progreso">En progreso</option>
                  <option value="Completada">Completada</option>
                </select>

                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Eliminar tarea"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

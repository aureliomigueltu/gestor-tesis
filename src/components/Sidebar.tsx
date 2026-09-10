import React from 'react';
import { 
  TrendingUp, 
  BookMarked, 
  BookOpen, 
  Library, 
  Table2, 
  MessageSquareWarning, 
  CheckSquare, 
  Sparkles,
  GraduationCap,
  AlertCircle,
  CheckCircle2,
  X,
  ArrowLeftRight,
  ShieldCheck,
  UserCheck,
  LogOut,
  Users,
  Lock
} from 'lucide-react';
import { ActiveTab, ThesisChapter, AdvisorObservation, ThesisTask, UserSession } from '../types/thesis';
import { TesistaItem } from '../data/tesistas';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  chapters: ThesisChapter[];
  observations: AdvisorObservation[];
  tasks: ThesisTask[];
  currentUser: UserSession;
  tesistas?: TesistaItem[];
  selectedTesistaId?: string;
  onSelectTesista?: (id: string) => void;
  onOpenLogin: () => void;
  onLogout: () => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  chapters,
  observations,
  tasks,
  currentUser,
  tesistas = [],
  selectedTesistaId,
  onSelectTesista,
  onOpenLogin,
  onLogout,
  isOpen,
  onCloseMobile,
}) => {
  const isTesista = currentUser.role === 'tesista';

  // If tesista, calculate metrics based on approved items
  const visibleChapters = isTesista ? chapters.filter(c => c.visibleToTesista !== false) : chapters;
  const visibleObservations = isTesista 
    ? observations.filter(o => o.approvedForTesista !== false || o.authorRole === 'tesista')
    : observations;

  const pendingObsCount = visibleObservations.filter(o => o.status === 'Pendiente').length;
  const observedChaptersCount = visibleChapters.filter(c => c.status === 'Observado').length;
  const pendingTasksCount = tasks.filter(t => t.status !== 'Completada').length;
  
  const averageProgress = Math.round(
    visibleChapters.reduce((sum, ch) => sum + ch.progressPercent, 0) / (visibleChapters.length || 1)
  );

  const allNavItems: {
    id: ActiveTab;
    label: string;
    icon: React.ElementType;
    badge?: number;
    badgeColor?: string;
  }[] = [
    { id: 'avance', label: 'Avance', icon: TrendingUp },
    { id: 'investigacion', label: 'Mi investigación', icon: BookMarked },
    { 
      id: 'capitulos', 
      label: 'Capítulos', 
      icon: BookOpen,
      badge: observedChaptersCount > 0 ? observedChaptersCount : undefined,
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-200'
    },
    { id: 'fuentes', label: 'Fuentes', icon: Library },
    { id: 'matriz', label: 'Matriz de consistencia', icon: Table2 },
    { 
      id: 'observaciones', 
      label: isTesista ? 'Observaciones y Consultas' : 'Observaciones del asesor', 
      icon: MessageSquareWarning,
      badge: pendingObsCount > 0 ? pendingObsCount : undefined,
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-200'
    },
    { 
      id: 'tareas', 
      label: 'Tareas', 
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? pendingTasksCount : undefined,
      badgeColor: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    { 
      id: 'asistente', 
      label: 'Reglas y Asistente', 
      icon: Sparkles 
    },
  ];

  // Tesista sees 'avance', 'investigacion' and 'observaciones'
  const navItems = isTesista
    ? allNavItems.filter(item => item.id === 'avance' || item.id === 'investigacion' || item.id === 'observaciones')
    : allNavItems;

  const handleSelect = (tab: ActiveTab) => {
    setActiveTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          id="sidebar-backdrop"
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="main-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Brand */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-xs">
              <GraduationCap size={22} />
            </div>
            <div>
              <h1 className="font-semibold text-slate-900 text-base leading-tight tracking-tight">
                Gestor de Tesis
              </h1>
              <p className="text-xs text-slate-500 font-normal">
                {isTesista ? 'Portal del Tesista' : 'Panel del Asesor'}
              </p>
            </div>
          </div>
          <button
            id="sidebar-close-btn"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Multi-Tesista quick switch panel for Asesor */}
        {!isTesista && tesistas.length > 0 && onSelectTesista && (
          <div className="p-3 bg-slate-50/80 border-b border-slate-200/80">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <Users size={12} className="text-indigo-600" />
                <span>Tesistas Asignados ({tesistas.length})</span>
              </div>
            </div>
            <div className="space-y-1">
              {tesistas.map(t => {
                const isSelected = selectedTesistaId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onSelectTesista(t.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/60'
                    }`}
                  >
                    <span className="truncate">{t.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {isSelected ? 'Activo' : 'Ver'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {isTesista ? 'Secciones Disponibles' : 'Navegación del Proyecto'}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    size={18} 
                    className={isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-600'} 
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${
                    isActive ? 'bg-amber-400 text-slate-950 border-amber-300' : (item.badgeColor || 'bg-slate-100 text-slate-700')
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Info banner for tesista explaining restricted view */}
          {isTesista && (
            <div className="mt-4 p-3 bg-blue-50/60 border border-blue-200/70 rounded-xl text-xs text-blue-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-blue-950">
                <Lock size={13} className="text-blue-600 shrink-0" />
                <span>Vista del Tesista</span>
              </div>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                Visualiza el avance del proyecto y envía tus consultas u observaciones directamente al asesor Ing. Aurelio Tacuri Urquizo.
              </p>
            </div>
          )}
        </div>

        {/* Active User Card & Switcher at Bottom */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/70 space-y-3">
          {/* User badge */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shrink-0 ${
                isTesista ? 'bg-blue-600' : 'bg-slate-900'
              }`}>
                {currentUser.avatarInitials}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-900 truncate block leading-tight">
                  {currentUser.name}
                </span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded inline-block ${
                  isTesista ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-900'
                }`}>
                  {isTesista ? 'Rol: Tesista' : 'Rol: Asesor'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={onOpenLogin}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                title={isTesista ? "Gestionar mi perfil" : "Gestionar cuentas y roles"}
              >
                <ArrowLeftRight size={14} />
              </button>
              <button
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Cerrar sesión"
              >
                <LogOut size={14} />
              </button>
            </div>
          </div>

          {/* Quick Progress Indicator */}
          <div className="px-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[11px] text-slate-500 font-medium">Avance global</span>
              <span className="text-xs font-bold text-slate-900">{averageProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${averageProgress}%` }}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

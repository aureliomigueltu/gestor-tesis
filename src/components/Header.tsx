import React from 'react';
import { 
  Menu, 
  Plus, 
  Download, 
  Sparkles, 
  MessageSquarePlus, 
  User, 
  ShieldCheck, 
  Lock, 
  Eye, 
  Edit3,
  ArrowLeftRight,
  Database,
  LogOut,
  Users,
  ChevronDown
} from 'lucide-react';
import { ActiveTab, UserSession } from '../types/thesis';
import { TesistaItem } from '../data/tesistas';

interface HeaderProps {
  activeTab: ActiveTab;
  currentUser: UserSession;
  isCloudConnected: boolean;
  tesistas?: TesistaItem[];
  selectedTesistaId?: string;
  onSelectTesista?: (id: string) => void;
  onOpenAddTesista?: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
  onOpenMobileMenu: () => void;
  onOpenAddObservation: () => void;
  onOpenAddTask: () => void;
  onExportReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  currentUser,
  isCloudConnected,
  tesistas = [],
  selectedTesistaId,
  onSelectTesista,
  onOpenAddTesista,
  onOpenLogin,
  onLogout,
  onOpenMobileMenu,
  onOpenAddObservation,
  onOpenAddTask,
  onExportReport,
}) => {
  const isTesista = currentUser.role === 'tesista';
  const activeTesista = tesistas.find(t => t.id === selectedTesistaId) || tesistas[0];

  const getTabDetails = () => {
    switch (activeTab) {
      case 'avance':
        return {
          title: 'Resumen de Avance de Tesis',
          subtitle: isTesista 
            ? `Estado de tu manuscrito evaluado por el Ing. Aurelio Tacuri Urquizo`
            : `Visión general de cumplimiento del tesista ${activeTesista?.name || ''}`
        };
      case 'investigacion':
        return {
          title: 'Mi Investigación',
          subtitle: 'Ficha técnica, planteamiento del problema, objetivos, variables y metodología'
        };
      case 'capitulos':
        return {
          title: 'Capítulos de la Tesis',
          subtitle: 'Control pormenorizado de las 8 secciones, estados de avance, observaciones y tareas'
        };
      case 'fuentes':
        return {
          title: 'Fuentes Bibliográficas (APA 7)',
          subtitle: 'Repositorio de artículos científicos, libros y verificación de indexación Scopus/WoS'
        };
      case 'matriz':
        return {
          title: 'Matriz de Consistencia',
          subtitle: 'Articulación metodológica entre problemas, objetivos, hipótesis, variables e instrumentos'
        };
      case 'observaciones':
        return {
          title: 'Observaciones y Consultas',
          subtitle: isTesista
            ? 'Dictámenes recibidos del asesor Ing. Aurelio Tacuri Urquizo y tus consultas enviadas'
            : 'Bitácora de dictámenes, requerimientos metodológicos y consultas del tesista'
        };
      case 'tareas':
        return {
          title: 'Plan de Tareas y Cronograma',
          subtitle: 'Acciones prioritarias y entregables organizados por fecha límite'
        };
      case 'asistente':
        return {
          title: 'Sistema de Reglas & Asistente',
          subtitle: 'Normativa académica prompt_tesis.md y guía de trabajo CLAUDE.md'
        };
      default:
        return {
          title: 'Panel de Control de Tesis',
          subtitle: 'Gestión integral del manuscrito académico'
        };
    }
  };

  const details = getTabDetails();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-trigger"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-slate-400"
            aria-label="Abrir menú de navegación"
          >
            <Menu size={22} />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                {details.title}
              </h2>
              {/* Role Indicator Pill */}
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                isTesista 
                  ? 'bg-blue-50 text-blue-800 border-blue-200' 
                  : 'bg-amber-50 text-amber-900 border-amber-200'
              }`}>
                {isTesista ? `Tesista: ${currentUser.name}` : 'Asesor (Ing. Aurelio Tacuri Urquizo)'}
              </span>

              {/* Asesor Multi-Tesista Selector */}
              {!isTesista && tesistas.length > 0 && onSelectTesista && (
                <div className="flex items-center gap-1.5 ml-1 bg-slate-100/90 hover:bg-slate-200/80 px-2 py-1 rounded-lg border border-slate-200 transition-all">
                  <Users size={12} className="text-slate-500" />
                  <span className="text-[11px] font-bold text-slate-600">Tesista:</span>
                  <select
                    id="header-select-tesista"
                    value={selectedTesistaId || activeTesista?.id}
                    onChange={(e) => onSelectTesista(e.target.value)}
                    className="bg-transparent text-xs font-bold text-indigo-950 focus:outline-hidden cursor-pointer"
                  >
                    {tesistas.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  {onOpenAddTesista && (
                    <button
                      onClick={onOpenAddTesista}
                      title="Registrar nuevo tesista"
                      className="text-[10px] bg-slate-900 hover:bg-slate-800 text-white font-bold px-1.5 py-0.5 rounded-md ml-1"
                    >
                      + Nuevo
                    </button>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              {details.subtitle}
            </p>
          </div>
        </div>

        {/* Action Buttons & User Profile Switcher */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Action button adapted to role */}
          <button
            id="header-btn-add-observation"
            onClick={onOpenAddObservation}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
              isTesista
                ? 'text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-200'
                : 'text-rose-700 bg-rose-50 hover:bg-rose-100 border-rose-200'
            }`}
          >
            <MessageSquarePlus size={14} />
            <span>{isTesista ? '+ Enviar Consulta' : '+ Dictamen'}</span>
          </button>

          {/* Nueva Tarea: Solo Asesor */}
          {!isTesista && (
            <button
              id="header-btn-add-task"
              onClick={onOpenAddTask}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            >
              <Plus size={14} />
              <span>Nueva Tarea</span>
            </button>
          )}

          {/* Exportar Informe: Solo Asesor */}
          {!isTesista && (
            <button
              id="header-btn-export-report"
              onClick={onExportReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
            >
              <Download size={14} />
              <span>Informe</span>
            </button>
          )}

          {/* Indicador automático de sincronización en la nube (gestión a nivel de código/variables de entorno) */}
          {isCloudConnected && (
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg shadow-2xs"
              title="Base de datos Supabase conectada mediante variables de entorno"
            >
              <Database size={12} className="text-emerald-600" />
              <span className="hidden sm:inline">Nube Activa</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          )}

          {/* User Account Switch / Profile Details Button */}
          <button
            onClick={onOpenLogin}
            className="ml-1 pl-2 pr-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 flex items-center gap-2 text-left transition-all"
            title={isTesista ? "Mi perfil y contraseña" : "Cuenta y administración"}
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px] text-white ${
              isTesista ? 'bg-blue-600' : 'bg-slate-900'
            }`}>
              {currentUser.avatarInitials}
            </div>
            <div className="hidden md:block">
              <span className="text-[11px] font-bold text-slate-900 leading-none block">
                {currentUser.name.split(' ')[0]} {currentUser.name.split(' ')[1] || ''}
              </span>
              <span className="text-[9px] font-medium text-slate-500 uppercase tracking-tight">
                {isTesista ? 'Tesista' : 'Asesor (Admin)'}
              </span>
            </div>
            <ArrowLeftRight size={12} className="text-slate-400" />
          </button>

          {/* Quick Logout Button */}
          <button
            onClick={onLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </header>
  );
};

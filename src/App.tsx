import React, { useState, useEffect } from 'react';
import { 
  ActiveTab, 
  ThesisChapter, 
  ResearchProfile, 
  ConsistencyMatrixRow, 
  AdvisorObservation, 
  ThesisTask, 
  BibliographicSource,
  UserSession 
} from './types/thesis';
import { 
  INITIAL_CHAPTERS, 
  INITIAL_RESEARCH_PROFILE, 
  INITIAL_CONSISTENCY_MATRIX, 
  INITIAL_OBSERVATIONS, 
  INITIAL_TASKS, 
  INITIAL_SOURCES 
} from './data/initialData';
import { PRESET_USERS, addNewUserAccount } from './data/users';
import { 
  getStoredTesistas, 
  saveStoredTesistas, 
  getTesistaProjectData, 
  saveTesistaProjectData, 
  resetTesistaProjectData, 
  TesistaItem, 
  TesistaProjectBundle,
  INITIAL_PROJECT_LESTER
} from './data/tesistas';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewSection } from './components/sections/OverviewSection';
import { ChaptersSection } from './components/sections/ChaptersSection';
import { MyResearchSection } from './components/sections/MyResearchSection';
import { ConsistencyMatrixSection } from './components/sections/ConsistencyMatrixSection';
import { SourcesSection } from './components/sections/SourcesSection';
import { AdvisorObservationsSection } from './components/sections/AdvisorObservationsSection';
import { TasksSection } from './components/sections/TasksSection';
import { AssistantSection } from './components/sections/AssistantSection';
import { EditChapterModal } from './components/modals/EditChapterModal';
import { AddObservationModal } from './components/modals/AddObservationModal';
import { AddTaskModal } from './components/modals/AddTaskModal';
import { AddSourceModal } from './components/modals/AddSourceModal';
import { ExportReportModal } from './components/modals/ExportReportModal';
import { LoginModal } from './components/modals/LoginModal';
import { LoginScreen } from './components/auth/LoginScreen';
import { AddTesistaModal } from './components/modals/AddTesistaModal';
import { isSupabaseConfigured } from './lib/supabase';
import { 
  loadThesisFromSupabase, 
  saveThesisToSupabase, 
  subscribeToThesisRealtime,
  FullThesisPayload 
} from './services/thesisSupabaseService';
import { useRef } from 'react';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('avance');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Current User Session (Role: 'asesor' | 'tesista' | null)
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('thesis_current_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id && parsed.role) return parsed;
      } catch (e) {
        return null;
      }
    }
    return null; // Prompt login screen on first access or after logout
  });

  // Multi-tesista state
  const [tesistas, setTesistas] = useState<TesistaItem[]>(() => getStoredTesistas());
  const [selectedTesistaId, setSelectedTesistaId] = useState<string>(() => {
    const savedUser = localStorage.getItem('thesis_current_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        if (u && u.role === 'tesista') return u.id;
      } catch (e) {}
    }
    const savedId = localStorage.getItem('thesis_selected_tesista_id');
    return savedId || 'user-lester';
  });

  const [isAddTesistaOpen, setIsAddTesistaOpen] = useState(false);
  const isSwitchingTesistaRef = useRef(false);

  const handleLoginSuccess = (user: UserSession, remember: boolean) => {
    setCurrentUser(user);
    if (user.role === 'tesista') {
      setSelectedTesistaId(user.id);
      setActiveTab('avance');
    }
    if (remember) {
      localStorage.setItem('thesis_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('thesis_current_user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('thesis_current_user');
    setCurrentUser(null);
    setIsLoginModalOpen(false);
  };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Core Data States initialized for selected tesista
  const initialBundle = getTesistaProjectData(selectedTesistaId);
  const [chapters, setChapters] = useState<ThesisChapter[]>(initialBundle.chapters);
  const [research, setResearch] = useState<ResearchProfile>(initialBundle.research);
  const [consistencyRows, setConsistencyRows] = useState<ConsistencyMatrixRow[]>(initialBundle.consistencyRows);
  const [observations, setObservations] = useState<AdvisorObservation[]>(initialBundle.observations);
  const [tasks, setTasks] = useState<ThesisTask[]>(initialBundle.tasks);
  const [sources, setSources] = useState<BibliographicSource[]>(initialBundle.sources);

  // When selectedTesistaId changes, load their bundle
  useEffect(() => {
    if (!selectedTesistaId) return;
    isSwitchingTesistaRef.current = true;
    const bundle = getTesistaProjectData(selectedTesistaId);
    setChapters(bundle.chapters);
    setResearch(bundle.research);
    setConsistencyRows(bundle.consistencyRows);
    setObservations(bundle.observations);
    setTasks(bundle.tasks);
    setSources(bundle.sources);
    localStorage.setItem('thesis_selected_tesista_id', selectedTesistaId);
    setTimeout(() => {
      isSwitchingTesistaRef.current = false;
    }, 80);
  }, [selectedTesistaId]);

  // Automatically ensure tesistas cannot access restricted tabs
  useEffect(() => {
    if (currentUser?.role === 'tesista') {
      if (activeTab !== 'avance' && activeTab !== 'observaciones') {
        setActiveTab('avance');
      }
      if (selectedTesistaId !== currentUser.id) {
        setSelectedTesistaId(currentUser.id);
      }
    }
  }, [currentUser, activeTab, selectedTesistaId]);

  // Save current project state to the active tesista's bundle
  useEffect(() => {
    if (!selectedTesistaId || isSwitchingTesistaRef.current) return;
    saveTesistaProjectData(selectedTesistaId, {
      research,
      chapters,
      consistencyRows,
      observations,
      tasks,
      sources
    });
  }, [selectedTesistaId, research, chapters, consistencyRows, observations, tasks, sources]);

  // Handler for Asesor to switch between tesistas
  const handleSelectTesista = (tesistaId: string) => {
    if (selectedTesistaId === tesistaId) return;
    saveTesistaProjectData(selectedTesistaId, {
      research,
      chapters,
      consistencyRows,
      observations,
      tasks,
      sources
    });
    setSelectedTesistaId(tesistaId);
  };

  // Handler to register a new tesista
  const handleSaveTesista = (newTesista: TesistaItem, pass: string, projectTitle: string) => {
    const updated = [...tesistas, newTesista];
    setTesistas(updated);
    saveStoredTesistas(updated);

    addNewUserAccount({
      id: newTesista.id,
      username: newTesista.username,
      password: pass,
      name: newTesista.name,
      email: newTesista.email,
      role: 'tesista',
      title: 'Tesista / Estudiante',
      avatarInitials: newTesista.avatarInitials
    });

    const newBundle: TesistaProjectBundle = {
      research: {
        ...INITIAL_PROJECT_LESTER.research,
        title: projectTitle,
        author: newTesista.name,
        advisor: 'Ing. Aurelio Tacuri Urquizo (Asesor Principal)'
      },
      chapters: INITIAL_PROJECT_LESTER.chapters.map(c => ({
        ...c,
        observationsCount: 0,
        pendingObservations: []
      })),
      consistencyRows: [
        {
          id: `mat-${Date.now()}`,
          problem: `¿De qué manera la investigación de ${projectTitle} optimiza los indicadores clave?`,
          objective: `Determinar el efecto de ${projectTitle}.`,
          hypothesis: `La propuesta genera un impacto estadísticamente significativo.`,
          variables: `Variable Independiente: Metodología propuesta\nVariable Dependiente: Resultados de evaluación`,
          dimensions: 'Dimensión 1, Dimensión 2',
          indicators: 'Indicador de eficiencia',
          methodology: 'Enfoque cuantitativo, diseño cuasiexperimental.',
          isSpecific: false
        }
      ],
      observations: [
        {
          id: `obs-init-${Date.now()}`,
          chapterId: 'ch-1',
          chapterName: 'Planteamiento del problema',
          date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
          advisorName: 'Ing. Aurelio Tacuri Urquizo',
          authorRole: 'asesor',
          authorName: 'Ing. Aurelio Tacuri Urquizo',
          approvedForTesista: true,
          priority: 'Media',
          status: 'Pendiente',
          content: `Bienvenido ${newTesista.name}. Iniciaremos la formulación del problema y delimitación de objetivos bajo mi asesoría.`
        }
      ],
      tasks: [],
      sources: []
    };

    saveTesistaProjectData(newTesista.id, newBundle);
    setSelectedTesistaId(newTesista.id);
  };

  // Modals state
  const [editingChapter, setEditingChapter] = useState<ThesisChapter | null>(null);
  const [isAddObservationOpen, setIsAddObservationOpen] = useState(false);
  const [addObservationChapterId, setAddObservationChapterId] = useState<string | undefined>(undefined);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [addTaskChapterId, setAddTaskChapterId] = useState<string | undefined>(undefined);
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);
  const [isExportReportOpen, setIsExportReportOpen] = useState(false);

  // Cloud (Supabase) Sync State
  const [isCloudConnected, setIsCloudConnected] = useState<boolean>(() => isSupabaseConfigured());
  const [remoteSyncAlert, setRemoteSyncAlert] = useState<string | null>(null);
  const isRemoteUpdatingRef = useRef<boolean>(false);
  const isInitialRemoteLoadDoneRef = useRef<boolean>(false);

  // Function to load from remote Supabase for the active tesista
  const loadRemoteData = async (tesistaIdToLoad: string = selectedTesistaId) => {
    if (!isSupabaseConfigured()) {
      setIsCloudConnected(false);
      return;
    }
    setIsCloudConnected(true);
    try {
      const res = await loadThesisFromSupabase(tesistaIdToLoad);
      if (res.payload) {
        isRemoteUpdatingRef.current = true;
        setResearch(res.payload.research);
        setChapters(res.payload.chapters);
        setConsistencyRows(res.payload.consistencyRows);
        setObservations(res.payload.observations);
        setTasks(res.payload.tasks);
        setSources(res.payload.sources);
        setTimeout(() => {
          isRemoteUpdatingRef.current = false;
        }, 500);
      }
    } catch (err) {
      console.error('Error fetching remote thesis data:', err);
    } finally {
      isInitialRemoteLoadDoneRef.current = true;
    }
  };

  // Initial load and Realtime listener from Supabase per active tesista
  useEffect(() => {
    if (!selectedTesistaId) return;
    loadRemoteData(selectedTesistaId);

    if (!isSupabaseConfigured()) return;

    // Realtime channel listener for the active tesista's thesis
    const unsubscribe = subscribeToThesisRealtime((payload, updatedBy, updatedAt) => {
      isRemoteUpdatingRef.current = true;
      setResearch(payload.research);
      setChapters(payload.chapters);
      setConsistencyRows(payload.consistencyRows);
      setObservations(payload.observations);
      setTasks(payload.tasks);
      setSources(payload.sources);

      setRemoteSyncAlert(`Cambios sincronizados en vivo desde la nube (${updatedBy})`);
      setTimeout(() => {
        setRemoteSyncAlert(null);
      }, 4000);

      setTimeout(() => {
        isRemoteUpdatingRef.current = false;
      }, 500);
    }, selectedTesistaId);

    return () => {
      unsubscribe();
    };
  }, [isCloudConnected, selectedTesistaId]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('thesis_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('thesis_chapters', JSON.stringify(chapters));
  }, [chapters]);

  useEffect(() => {
    localStorage.setItem('thesis_research_profile', JSON.stringify(research));
  }, [research]);

  useEffect(() => {
    localStorage.setItem('thesis_consistency_matrix', JSON.stringify(consistencyRows));
  }, [consistencyRows]);

  useEffect(() => {
    localStorage.setItem('thesis_observations', JSON.stringify(observations));
  }, [observations]);

  useEffect(() => {
    localStorage.setItem('thesis_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('thesis_sources', JSON.stringify(sources));
  }, [sources]);

  // Auto-sync state changes to Supabase (Cloud Database)
  useEffect(() => {
    if (!currentUser) return;
    if (!isSupabaseConfigured()) return;
    if (isRemoteUpdatingRef.current) return;
    if (!isInitialRemoteLoadDoneRef.current) return;

    const timer = setTimeout(() => {
      saveThesisToSupabase({
        research,
        chapters,
        consistencyRows,
        observations,
        tasks,
        sources
      }, `${currentUser.name} (${currentUser.role === 'asesor' ? 'Asesor' : 'Tesista'})`, selectedTesistaId);
    }, 800);

    return () => clearTimeout(timer);
  }, [research, chapters, consistencyRows, observations, tasks, sources, currentUser?.name, currentUser?.role, selectedTesistaId]);

  // Handler to update a chapter
  const handleUpdateChapter = (updatedChapter: ThesisChapter) => {
    setChapters(prev => prev.map(ch => ch.id === updatedChapter.id ? updatedChapter : ch));
  };

  // Handler to toggle chapter visibility for tesista (Advisor-only feature)
  const handleToggleChapterVisibility = (chapterId: string) => {
    setChapters(prev => prev.map(ch => {
      if (ch.id === chapterId) {
        const currentVal = ch.visibleToTesista !== undefined ? ch.visibleToTesista : true;
        return {
          ...ch,
          visibleToTesista: !currentVal
        };
      }
      return ch;
    }));
  };

  // Handler to toggle observation approval for tesista (Advisor-only feature)
  const handleToggleObservationApproval = (obsId: string) => {
    setObservations(prev => prev.map(obs => {
      if (obs.id === obsId) {
        const currentVal = obs.approvedForTesista !== undefined ? obs.approvedForTesista : true;
        return {
          ...obs,
          approvedForTesista: !currentVal
        };
      }
      return obs;
    }));
  };

  // Handler to add a new observation (or student inquiry)
  const handleSaveObservation = (newObs: AdvisorObservation) => {
    setObservations(prev => [newObs, ...prev]);

    // Also link it into the chapter
    setChapters(prev => prev.map(ch => {
      if (ch.id === newObs.chapterId) {
        return {
          ...ch,
          status: ch.status === 'Aprobado' ? 'Observado' : (newObs.priority === 'Alta' ? 'Observado' : ch.status),
          observationsCount: ch.observationsCount + 1,
          pendingObservations: [...ch.pendingObservations, newObs.content],
          lastModified: newObs.date
        };
      }
      return ch;
    }));
  };

  // Handler to update an observation (e.g. mark subsanada)
  const handleUpdateObservation = (updatedObs: AdvisorObservation) => {
    setObservations(prev => prev.map(o => o.id === updatedObs.id ? updatedObs : o));

    // If marked subsanada, recompute pending observations for chapter
    if (updatedObs.status === 'Subsanada') {
      const remainingPendingForChapter = observations
        .filter(o => o.chapterId === updatedObs.chapterId && o.id !== updatedObs.id && o.status === 'Pendiente')
        .map(o => o.content);

      setChapters(prev => prev.map(ch => {
        if (ch.id === updatedObs.chapterId) {
          const newStatus = remainingPendingForChapter.length === 0 && ch.status === 'Observado' 
            ? 'En revisión' 
            : ch.status;
          return {
            ...ch,
            status: newStatus,
            pendingObservations: remainingPendingForChapter,
            observationsCount: remainingPendingForChapter.length,
            lastModified: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
          };
        }
        return ch;
      }));
    }
  };

  const handleDeleteObservation = (id: string) => {
    if (confirm('¿Eliminar esta observación?')) {
      setObservations(prev => prev.filter(o => o.id !== id));
    }
  };

  // Handler for tasks
  const handleSaveTask = (newTask: ThesisTask) => {
    setTasks(prev => [newTask, ...prev]);
    // Also update chapter nextTask
    setChapters(prev => prev.map(ch => {
      if (ch.id === newTask.chapterId) {
        return {
          ...ch,
          nextTask: newTask.title
        };
      }
      return ch;
    }));
  };

  const handleUpdateTask = (updatedTask: ThesisTask) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('¿Eliminar esta tarea del cronograma?')) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  // Handler for sources
  const handleSaveSource = (newSource: BibliographicSource) => {
    setSources(prev => [newSource, ...prev]);
  };

  const handleDeleteSource = (id: string) => {
    if (confirm('¿Eliminar esta fuente bibliográfica?')) {
      setSources(prev => prev.filter(s => s.id !== id));
    }
  };

  // Handler to update research profile and sync with consistency matrix & storage
  const handleUpdateResearchProfile = (updatedResearch: ResearchProfile) => {
    setResearch(updatedResearch);
    setConsistencyRows(prev => {
      if (prev.length === 0) return prev;
      return prev.map(row => {
        if (!row.isSpecific) {
          return {
            ...row,
            problem: updatedResearch.generalProblem || row.problem,
            objective: updatedResearch.generalObjective || row.objective,
            hypothesis: updatedResearch.generalHypothesis || row.hypothesis,
            variables: `VI: ${updatedResearch.independentVariable?.name || ''} / VD: ${updatedResearch.dependentVariable?.name || ''}`,
            dimensions: `VI: ${(updatedResearch.independentVariable?.dimensions || []).join(', ')} / VD: ${(updatedResearch.dependentVariable?.dimensions || []).join(', ')}`,
            indicators: `VI: ${(updatedResearch.independentVariable?.indicators || []).join(', ')} / VD: ${(updatedResearch.dependentVariable?.indicators || []).join(', ')}`,
            methodology: `${updatedResearch.methodology?.approach || ''} • ${updatedResearch.methodology?.type || ''} • ${updatedResearch.methodology?.design || ''}`
          };
        }
        return row;
      });
    });

    const currentBundle = getTesistaProjectData(selectedTesistaId);
    saveTesistaProjectData(selectedTesistaId, {
      ...currentBundle,
      research: updatedResearch
    });
  };

  // Reset demo data helper for active tesista
  const handleResetData = () => {
    const currentTesistaObj = tesistas.find(t => t.id === selectedTesistaId);
    if (confirm(`¿Restablecer los datos de prueba del tesista "${currentTesistaObj?.name || 'Tesista'}"?`)) {
      const resetBundle = resetTesistaProjectData(selectedTesistaId);
      setResearch(resetBundle.research);
      setChapters(resetBundle.chapters);
      setConsistencyRows(resetBundle.consistencyRows);
      setObservations(resetBundle.observations);
      setTasks(resetBundle.tasks);
      setSources(resetBundle.sources);
    }
  };

  // If not authenticated, require login with username and password
  if (!currentUser) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  const isTesista = currentUser.role === 'tesista';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        chapters={chapters}
        observations={observations}
        tasks={tasks}
        currentUser={currentUser}
        tesistas={tesistas}
        selectedTesistaId={selectedTesistaId}
        onSelectTesista={handleSelectTesista}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Header */}
        <Header
          activeTab={activeTab}
          currentUser={currentUser}
          isCloudConnected={isCloudConnected}
          tesistas={tesistas}
          selectedTesistaId={selectedTesistaId}
          onSelectTesista={handleSelectTesista}
          onOpenAddTesista={() => setIsAddTesistaOpen(true)}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onOpenAddObservation={() => {
            setAddObservationChapterId(undefined);
            setIsAddObservationOpen(true);
          }}
          onOpenAddTask={() => {
            setAddTaskChapterId(undefined);
            setIsAddTaskOpen(true);
          }}
          onExportReport={() => setIsExportReportOpen(true)}
        />

        {/* Remote Sync Live Alert Banner */}
        {remoteSyncAlert && (
          <div className="bg-emerald-600 text-white text-xs px-4 py-2 text-center font-medium flex items-center justify-center gap-2 shadow-xs transition-all animate-in fade-in slide-in-from-top-2">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>{remoteSyncAlert}</span>
          </div>
        )}

        {/* Dynamic Section View with strict RBAC */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'avance' && (
            <OverviewSection
              chapters={chapters}
              observations={observations}
              tasks={tasks}
              currentUser={currentUser}
              onSelectChapter={(ch) => {
                if (!isTesista) {
                  setEditingChapter(ch);
                } else {
                  setActiveTab('observaciones');
                }
              }}
              onNavigateTab={(tab) => {
                if (isTesista && tab !== 'avance' && tab !== 'observaciones' && tab !== 'investigacion') {
                  setActiveTab('avance');
                } else {
                  setActiveTab(tab);
                }
              }}
            />
          )}

          {activeTab === 'investigacion' && (
            <MyResearchSection
              research={research}
              currentUser={currentUser}
              onUpdateResearch={handleUpdateResearchProfile}
            />
          )}

          {activeTab === 'capitulos' && !isTesista && (
            <ChaptersSection
              chapters={chapters}
              currentUser={currentUser}
              onEditChapter={(ch) => setEditingChapter(ch)}
              onAddObservationForChapter={(ch) => {
                setAddObservationChapterId(ch.id);
                setIsAddObservationOpen(true);
              }}
              onAddTaskForChapter={(ch) => {
                setAddTaskChapterId(ch.id);
                setIsAddTaskOpen(true);
              }}
              onToggleVisibility={handleToggleChapterVisibility}
            />
          )}

          {activeTab === 'fuentes' && !isTesista && (
            <SourcesSection
              sources={sources}
              onAddSourceClick={() => setIsAddSourceOpen(true)}
              onDeleteSource={handleDeleteSource}
            />
          )}

          {activeTab === 'matriz' && !isTesista && (
            <ConsistencyMatrixSection
              rows={consistencyRows}
              currentUser={currentUser}
              onUpdateRows={setConsistencyRows}
            />
          )}

          {activeTab === 'observaciones' && (
            <AdvisorObservationsSection
              observations={observations}
              chapters={chapters}
              currentUser={currentUser}
              onAddObservationClick={() => {
                setAddObservationChapterId(undefined);
                setIsAddObservationOpen(true);
              }}
              onUpdateObservation={handleUpdateObservation}
              onDeleteObservation={handleDeleteObservation}
              onToggleObservationApproval={handleToggleObservationApproval}
            />
          )}

          {activeTab === 'tareas' && !isTesista && (
            <TasksSection
              tasks={tasks}
              chapters={chapters}
              onAddTaskClick={() => {
                setAddTaskChapterId(undefined);
                setIsAddTaskOpen(true);
              }}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          )}

          {activeTab === 'asistente' && !isTesista && (
            <AssistantSection
              chapters={chapters}
            />
          )}

          {/* Discreet Footer with role-based visibility */}
          <footer className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              Panel de Control de Tesis • {!isTesista ? (
                <span>Asesor Principal: <strong className="text-slate-700 font-semibold">Ing. Aurelio Tacuri Urquizo</strong> • Supervisando a: <strong className="text-indigo-600 font-semibold">{tesistas.find(t => t.id === selectedTesistaId)?.name || 'Tesista'}</strong></span>
              ) : (
                <span>Portal del Tesista: <strong className="text-slate-700 font-semibold">{currentUser.name}</strong> • Asesor Principal: <strong className="text-slate-700 font-semibold">Ing. Aurelio Tacuri Urquizo</strong></span>
              )}
            </div>

            {!isTesista ? (
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-slate-500 hover:text-slate-800 font-medium underline"
                >
                  Gestionar perfiles (Asesor / Tesistas)
                </button>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5 text-slate-500 font-medium">
                  <span>Supabase:</span>
                  <span className={isCloudConnected ? "text-emerald-700 font-semibold" : "text-slate-400"}>
                    {isCloudConnected ? "Conectado vía .env" : "Modo local"}
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isCloudConnected ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                </span>
                <span>•</span>
                <button
                  onClick={handleResetData}
                  className="text-slate-400 hover:text-slate-600 underline"
                >
                  Restablecer datos de prueba
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Mi Perfil y Contraseña
                </button>
              </div>
            )}
          </footer>
        </main>
      </div>

      {/* Modals */}
      {editingChapter && (
        <EditChapterModal
          chapter={editingChapter}
          currentUser={currentUser}
          onSave={handleUpdateChapter}
          onClose={() => setEditingChapter(null)}
          onOpenAddObservation={() => {
            setAddObservationChapterId(editingChapter.id);
            setIsAddObservationOpen(true);
          }}
        />
      )}

      {isAddObservationOpen && (
        <AddObservationModal
          chapters={chapters}
          selectedChapterId={addObservationChapterId}
          currentUser={currentUser}
          onSave={handleSaveObservation}
          onClose={() => setIsAddObservationOpen(false)}
        />
      )}

      {isAddTaskOpen && (
        <AddTaskModal
          chapters={chapters}
          selectedChapterId={addTaskChapterId}
          onSave={handleSaveTask}
          onClose={() => setIsAddTaskOpen(false)}
        />
      )}

      {isAddSourceOpen && (
        <AddSourceModal
          chapters={chapters}
          onSave={handleSaveSource}
          onClose={() => setIsAddSourceOpen(false)}
        />
      )}

      {isExportReportOpen && (
        <ExportReportModal
          research={research}
          chapters={chapters}
          observations={observations}
          tasks={tasks}
          onClose={() => setIsExportReportOpen(false)}
        />
      )}

      {/* User Login & Role Switcher Modal */}
      <LoginModal
        currentUser={currentUser}
        isOpen={isLoginModalOpen}
        onSelectUser={(user) => handleLoginSuccess(user, true)}
        onLogout={handleLogout}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Add New Tesista Modal (Advisor only) */}
      <AddTesistaModal
        isOpen={isAddTesistaOpen}
        onClose={() => setIsAddTesistaOpen(false)}
        onSaveTesista={handleSaveTesista}
      />
    </div>
  );
}

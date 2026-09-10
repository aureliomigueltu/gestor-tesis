import React, { useState, useEffect } from 'react';
import { ResearchProfile, UserSession } from '../../types/thesis';
import { 
  BookMarked, 
  User, 
  GraduationCap, 
  HelpCircle, 
  Target, 
  Compass, 
  Layers, 
  Microscope, 
  Edit3, 
  Check, 
  Copy, 
  Download, 
  Plus, 
  Trash2, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  Save, 
  X, 
  Building2, 
  Award, 
  Calendar, 
  FileText, 
  Info,
  Sliders,
  ChevronRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface MyResearchSectionProps {
  research: ResearchProfile;
  currentUser?: UserSession;
  onUpdateResearch: (updated: ResearchProfile) => void;
}

export const MyResearchSection: React.FC<MyResearchSectionProps> = ({
  research,
  currentUser,
  onUpdateResearch,
}) => {
  const isTesista = currentUser?.role === 'tesista';
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ResearchProfile>(research);
  const [copied, setCopied] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'todos' | 'problema' | 'objetivos' | 'hipotesis' | 'variables' | 'metodologia'>('todos');

  // Keep formData synced when research changes and user is not editing
  useEffect(() => {
    if (!isEditing) {
      setFormData(research);
    }
  }, [research, isEditing]);

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleSave = () => {
    onUpdateResearch(formData);
    setIsEditing(false);
    showNotification('¡Ficha de investigación de pregrado actualizada y sincronizada correctamente!');
  };

  const handleCancel = () => {
    setFormData(research);
    setIsEditing(false);
  };

  // Specific Problems management
  const addSpecificProblem = () => {
    const nextNum = (formData.specificProblems || []).length + 1;
    setFormData({
      ...formData,
      specificProblems: [...(formData.specificProblems || []), `¿De qué forma incide el factor específico ${nextNum} en los resultados de la investigación?`]
    });
  };

  const updateSpecificProblem = (index: number, value: string) => {
    const list = [...(formData.specificProblems || [])];
    list[index] = value;
    setFormData({ ...formData, specificProblems: list });
  };

  const removeSpecificProblem = (index: number) => {
    const list = (formData.specificProblems || []).filter((_, i) => i !== index);
    setFormData({ ...formData, specificProblems: list });
  };

  // Specific Objectives management
  const addSpecificObjective = () => {
    const nextNum = (formData.specificObjectives || []).length + 1;
    setFormData({
      ...formData,
      specificObjectives: [...(formData.specificObjectives || []), `Determinar el impacto del factor específico ${nextNum} mediante evaluación experimental.`]
    });
  };

  const updateSpecificObjective = (index: number, value: string) => {
    const list = [...(formData.specificObjectives || [])];
    list[index] = value;
    setFormData({ ...formData, specificObjectives: list });
  };

  const removeSpecificObjective = (index: number) => {
    const list = (formData.specificObjectives || []).filter((_, i) => i !== index);
    setFormData({ ...formData, specificObjectives: list });
  };

  // Specific Hypotheses management
  const addSpecificHypothesis = () => {
    const nextNum = (formData.specificHypotheses || []).length + 1;
    setFormData({
      ...formData,
      specificHypotheses: [...(formData.specificHypotheses || []), `H${nextNum}: Existe una mejora estadísticamente significativa en el indicador evaluado.`]
    });
  };

  const updateSpecificHypothesis = (index: number, value: string) => {
    const list = [...(formData.specificHypotheses || [])];
    list[index] = value;
    setFormData({ ...formData, specificHypotheses: list });
  };

  const removeSpecificHypothesis = (index: number) => {
    const list = (formData.specificHypotheses || []).filter((_, i) => i !== index);
    setFormData({ ...formData, specificHypotheses: list });
  };

  // Dimension helpers for Variables
  const addDimension = (vType: 'independent' | 'dependent') => {
    const target = vType === 'independent' ? formData.independentVariable : formData.dependentVariable;
    const nextNum = (target.dimensions || []).length + 1;
    const updatedDimensions = [...(target.dimensions || []), `Dimensión ${nextNum}`];

    if (vType === 'independent') {
      setFormData({
        ...formData,
        independentVariable: { ...formData.independentVariable, dimensions: updatedDimensions }
      });
    } else {
      setFormData({
        ...formData,
        dependentVariable: { ...formData.dependentVariable, dimensions: updatedDimensions }
      });
    }
  };

  const updateDimension = (vType: 'independent' | 'dependent', index: number, value: string) => {
    const target = vType === 'independent' ? formData.independentVariable : formData.dependentVariable;
    const updatedDimensions = [...(target.dimensions || [])];
    updatedDimensions[index] = value;

    if (vType === 'independent') {
      setFormData({
        ...formData,
        independentVariable: { ...formData.independentVariable, dimensions: updatedDimensions }
      });
    } else {
      setFormData({
        ...formData,
        dependentVariable: { ...formData.dependentVariable, dimensions: updatedDimensions }
      });
    }
  };

  const removeDimension = (vType: 'independent' | 'dependent', index: number) => {
    const target = vType === 'independent' ? formData.independentVariable : formData.dependentVariable;
    const updatedDimensions = (target.dimensions || []).filter((_, i) => i !== index);

    if (vType === 'independent') {
      setFormData({
        ...formData,
        independentVariable: { ...formData.independentVariable, dimensions: updatedDimensions }
      });
    } else {
      setFormData({
        ...formData,
        dependentVariable: { ...formData.dependentVariable, dimensions: updatedDimensions }
      });
    }
  };

  // Indicators helpers for Variables
  const addIndicator = (vType: 'independent' | 'dependent') => {
    const target = vType === 'independent' ? formData.independentVariable : formData.dependentVariable;
    const nextNum = (target.indicators || []).length + 1;
    const updatedIndicators = [...(target.indicators || []), `Indicador ${nextNum} (métrica cuantitativa)`];

    if (vType === 'independent') {
      setFormData({
        ...formData,
        independentVariable: { ...formData.independentVariable, indicators: updatedIndicators }
      });
    } else {
      setFormData({
        ...formData,
        dependentVariable: { ...formData.dependentVariable, indicators: updatedIndicators }
      });
    }
  };

  const updateIndicator = (vType: 'independent' | 'dependent', index: number, value: string) => {
    const target = vType === 'independent' ? formData.independentVariable : formData.dependentVariable;
    const updatedIndicators = [...(target.indicators || [])];
    updatedIndicators[index] = value;

    if (vType === 'independent') {
      setFormData({
        ...formData,
        independentVariable: { ...formData.independentVariable, indicators: updatedIndicators }
      });
    } else {
      setFormData({
        ...formData,
        dependentVariable: { ...formData.dependentVariable, indicators: updatedIndicators }
      });
    }
  };

  const removeIndicator = (vType: 'independent' | 'dependent', index: number) => {
    const target = vType === 'independent' ? formData.independentVariable : formData.dependentVariable;
    const updatedIndicators = (target.indicators || []).filter((_, i) => i !== index);

    if (vType === 'independent') {
      setFormData({
        ...formData,
        independentVariable: { ...formData.independentVariable, indicators: updatedIndicators }
      });
    } else {
      setFormData({
        ...formData,
        dependentVariable: { ...formData.dependentVariable, indicators: updatedIndicators }
      });
    }
  };

  const handleCopyProfile = () => {
    const text = `
================================================================================
FICHA TÉCNICA DE PROYECTO DE TESIS DE PREGRADO
(Directiva de Titulación Profesional - Anexo 2.3)
================================================================================
TÍTULO: ${research.title}
NIVEL ACADÉMICO: Pregrado • Para optar el ${research.academicDegree || 'Título Profesional de Ingeniero'}
AUTOR(A): ${research.author}
ASESOR(A): ${research.advisor}
INSTITUCIÓN: ${research.institution}
FACULTAD / PROGRAMA: ${research.faculty || 'Facultad de Ingeniería'} • ${research.program} (${research.year})

1. PLANTEAMIENTO DEL PROBLEMA
Problema General:
"${research.generalProblem}"

Problemas Específicos:
${(research.specificProblems || []).map((p, i) => `PE${i + 1}: ${p}`).join('\n')}

2. OBJETIVOS DE LA INVESTIGACIÓN
Objetivo General:
${research.generalObjective}

Objetivos Específicos:
${(research.specificObjectives || []).map((o, i) => `OE${i + 1}: ${o}`).join('\n')}

3. FORMULACIÓN DE HIPÓTESIS
Hipótesis General:
${research.generalHypothesis}

Hipótesis Específicas:
${(research.specificHypotheses || []).map((h, i) => `H${i + 1}: ${h}`).join('\n')}

4. OPERACIONALIZACIÓN DE VARIABLES
Variable Independiente (VI): ${research.independentVariable.name}
Definición: ${research.independentVariable.definition}
Dimensiones: ${(research.independentVariable.dimensions || []).join(', ')}
Indicadores: ${(research.independentVariable.indicators || []).join(', ') || 'No definidos'}

Variable Dependiente (VD): ${research.dependentVariable.name}
Definición: ${research.dependentVariable.definition}
Dimensiones: ${(research.dependentVariable.dimensions || []).join(', ')}
Indicadores: ${(research.dependentVariable.indicators || []).join(', ') || 'No definidos'}

Variables Restrictivas: ${research.restrictiveVariables || 'No declaradas'}

5. METODOLOGÍA (CAPÍTULO 3 - ANEXO 2.3)
- Enfoque: ${research.methodology.approach}
- Tipo y Nivel: ${research.methodology.type}
- Diseño: ${research.methodology.design}
- Población: ${research.methodology.population}
- Muestra: ${research.methodology.sample}
- Instrumentos: ${research.methodology.instruments}
- Equipos y Materiales: ${research.methodology.equipmentAndMaterials || 'Equipos de cómputo y software'}
- Procedimiento Experimental: ${research.methodology.experimentalProcedure || 'Pruebas pre/pos'}
- Técnicas de Procesamiento: ${research.methodology.dataProcessingTechniques || 'Estadística descriptiva e inferencial'}
================================================================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([
      `FICHA DE TESIS DE PREGRADO\n${research.title}\n\n` +
      `NIVEL: Pregrado (Para optar el ${research.academicDegree || 'Título Profesional'})\n` +
      `AUTOR: ${research.author}\nASESOR: ${research.advisor}\n` +
      `INSTITUCIÓN: ${research.institution}\nPROGRAMA: ${research.program} (${research.year})\n\n` +
      `PROBLEMA GENERAL:\n${research.generalProblem}\n\n` +
      `PROBLEMAS ESPECÍFICOS:\n${(research.specificProblems || []).join('\n')}\n\n` +
      `OBJETIVO GENERAL:\n${research.generalObjective}\n\n` +
      `OBJETIVOS ESPECÍFICOS:\n${(research.specificObjectives || []).join('\n')}\n\n` +
      `HIPÓTESIS GENERAL:\n${research.generalHypothesis}\n\n` +
      `HIPÓTESIS ESPECÍFICAS:\n${(research.specificHypotheses || []).join('\n')}\n\n` +
      `VARIABLE INDEPENDIENTE:\n${research.independentVariable.name}\n${research.independentVariable.definition}\n` +
      `Dimensiones: ${(research.independentVariable.dimensions || []).join(', ')}\n` +
      `Indicadores: ${(research.independentVariable.indicators || []).join(', ')}\n\n` +
      `VARIABLE DEPENDIENTE:\n${research.dependentVariable.name}\n${research.dependentVariable.definition}\n` +
      `Dimensiones: ${(research.dependentVariable.dimensions || []).join(', ')}\n` +
      `Indicadores: ${(research.dependentVariable.indicators || []).join(', ')}\n\n` +
      `METODOLOGÍA:\n${research.methodology.approach} | ${research.methodology.type} | ${research.methodology.design}\n` +
      `Población: ${research.methodology.population}\nMuestra: ${research.methodology.sample}\n` +
      `Instrumentos: ${research.methodology.instruments}\n`
    ], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `ficha_metodologica_pregrado_${research.author.toLowerCase().replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Success Floating Alert */}
      {successToast && (
        <div className="bg-emerald-600 text-white text-xs px-4 py-3 rounded-xl font-semibold flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-white shrink-0" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-emerald-100 hover:text-white ml-3">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Top Header & Project Identity Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2.5 max-w-4xl">
            {/* Badges: Pregrado and Official Guideline */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-bold border border-amber-500/20">
                <Sparkles size={13} className="text-amber-600" />
                <span>Tesis de Pregrado • Para optar el Título Profesional</span>
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                <BookMarked size={12} />
                <span>Estructura Oficial Anexo 2.3</span>
              </div>
              {isEditing && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold animate-pulse">
                  Modo Edición Activo
                </span>
              )}
            </div>

            {/* Editable Title */}
            {isEditing ? (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <Edit3 size={13} className="text-slate-500" />
                  <span>Título Oficial de la Tesis de Pregrado:</span>
                </label>
                <textarea
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full text-base sm:text-lg font-bold text-slate-900 border-2 border-amber-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-amber-50/20"
                  rows={2}
                  placeholder="Ingrese el título de la investigación..."
                />
              </div>
            ) : (
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                {research.title}
              </h1>
            )}

            {/* Editable Meta details: Author, Advisor, Institution, Degree, Year */}
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Tesista / Autor(a):</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Asesor(a) Principal:</label>
                  <input
                    type="text"
                    value={formData.advisor}
                    onChange={(e) => setFormData({ ...formData, advisor: e.target.value })}
                    className="w-full text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Universidad / Institución:</label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Facultad / Escuela:</label>
                  <input
                    type="text"
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Grado / Título Profesional:</label>
                  <input
                    type="text"
                    value={formData.academicDegree || 'Título Profesional de Ingeniero de Sistemas e Informática'}
                    onChange={(e) => setFormData({ ...formData, academicDegree: e.target.value })}
                    className="w-full text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Año de Ejecución:</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 2026 })}
                    className="w-full text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg p-2"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <User size={15} className="text-slate-400 shrink-0" />
                  <span><strong>Tesista:</strong> {research.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={15} className="text-slate-400 shrink-0" />
                  <span><strong>Asesor:</strong> {research.advisor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={15} className="text-amber-600 shrink-0" />
                  <span><strong>Grado:</strong> {research.academicDegree || 'Título Profesional de Ingeniero'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={15} className="text-slate-400 shrink-0" />
                  <span><strong>Institución:</strong> {research.institution}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass size={15} className="text-slate-400 shrink-0" />
                  <span><strong>Escuela:</strong> {research.program}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-slate-400 shrink-0" />
                  <span><strong>Año / Nivel:</strong> {research.year} • Pregrado</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons: Edit, Save, Cancel, Copy, Download */}
          <div className="flex flex-wrap items-center gap-2 self-start shrink-0">
            <button
              onClick={handleCopyProfile}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg inline-flex items-center gap-1.5 transition-colors shadow-2xs"
              title="Copiar resumen estructurado"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg inline-flex items-center gap-1.5 transition-colors shadow-2xs"
              title="Descargar ficha técnica"
            >
              <Download size={14} />
              <span>Descargar</span>
            </button>

            {isEditing ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm inline-flex items-center gap-1.5 transition-all"
                >
                  <Save size={14} />
                  <span>Guardar Cambios</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-1.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs inline-flex items-center gap-1.5 transition-all"
              >
                <Edit3 size={14} />
                <span>Editar Ficha Metodológica</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter / Quick Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Secciones:</span>
          {[
            { id: 'todos', label: 'Todo el Perfil' },
            { id: 'problema', label: '1. Planteamiento del Problema' },
            { id: 'objetivos', label: '2. Objetivos de Investigación' },
            { id: 'hipotesis', label: '3. Formulación de Hipótesis' },
            { id: 'variables', label: '4. Variables y Dimensiones' },
            { id: 'metodologia', label: '5. Marco Metodológico y Diseño' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* BLOCK 1: PLANTEAMIENTO DEL PROBLEMA */}
      {(activeFilter === 'todos' || activeFilter === 'problema') && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <HelpCircle size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">1. Planteamiento del Problema</h3>
                <p className="text-xs text-slate-500">Capítulo 1 del Anexo 2.3 • Formulación general, antecedentes y problemas derivados</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => { setIsEditing(true); setActiveFilter('problema'); }}
                className="text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1 rounded-lg transition-colors inline-flex items-center gap-1"
              >
                <Edit3 size={13} />
                <span>Editar Problemas</span>
              </button>
            )}
          </div>

          {/* Problema General */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>1.3 Formulación del Problema General:</span>
              </label>
              {isEditing && (
                <span className="text-[11px] text-slate-400 font-mono">
                  {formData.generalProblem?.length || 0} caracteres
                </span>
              )}
            </div>
            {isEditing ? (
              <textarea
                value={formData.generalProblem}
                onChange={(e) => setFormData({ ...formData, generalProblem: e.target.value })}
                className="w-full text-xs font-medium text-slate-900 border-2 border-rose-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-rose-50/20 leading-relaxed"
                rows={3}
                placeholder="¿De qué manera [Variable Independiente] influye en [Variable Dependiente] en [Población/Contexto]?"
              />
            ) : (
              <div className="p-4 bg-rose-50/40 rounded-xl border border-rose-100/80">
                <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed italic">
                  "{research.generalProblem}"
                </p>
              </div>
            )}
          </div>

          {/* Problemas Específicos */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>Problemas Específicos ({formData.specificProblems?.length || 0}):</span>
              </label>
              {isEditing && (
                <button
                  type="button"
                  onClick={addSpecificProblem}
                  className="px-2.5 py-1 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg inline-flex items-center gap-1 transition-colors"
                >
                  <Plus size={13} />
                  <span>Agregar Problema Específico</span>
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {(isEditing ? formData.specificProblems : research.specificProblems || []).map((prob, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-2.5 bg-slate-50/70 border border-slate-200/80 p-3 rounded-xl transition-all hover:bg-white"
                >
                  <span className="font-extrabold text-xs text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md shrink-0 mt-0.5">
                    PE{i + 1}
                  </span>
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-2">
                      <textarea
                        value={prob}
                        onChange={(e) => updateSpecificProblem(i, e.target.value)}
                        className="w-full text-xs text-slate-900 bg-white border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-rose-500"
                        rows={2}
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecificProblem(i)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg shrink-0 transition-colors"
                        title="Eliminar este problema específico"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-800 font-medium leading-relaxed flex-1">
                      {prob}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Chapter 1 fields: Descripción, Justificación, Limitaciones, Viabilidad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
            {/* Descripción / Antecedentes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 block">
                1.2 Descripción y Realidad Problemática:
              </label>
              {isEditing ? (
                <textarea
                  value={formData.problemDescription || ''}
                  onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                  className="w-full text-xs text-slate-800 border rounded-lg p-2.5"
                  rows={3}
                  placeholder="Describa los hechos empíricos y síntomas observados..."
                />
              ) : (
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                  {research.problemDescription || 'Diagnóstico preliminar de la problemática institucional para el informe de tesis.'}
                </p>
              )}
            </div>

            {/* Justificación e Importancia */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 block">
                1.5 Justificación e Importancia de la Investigación:
              </label>
              {isEditing ? (
                <textarea
                  value={formData.justification || ''}
                  onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                  className="w-full text-xs text-slate-800 border rounded-lg p-2.5"
                  rows={3}
                  placeholder="Justificación teórica, práctica y metodológica..."
                />
              ) : (
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                  {research.justification || 'Justificación para optar el Título Profesional según la normativa universitaria.'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* BLOCK 2: OBJETIVOS DE LA INVESTIGACIÓN */}
      {(activeFilter === 'todos' || activeFilter === 'objetivos') && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Target size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">2. Objetivos de la Investigación</h3>
                <p className="text-xs text-slate-500">Sección 1.4 del Anexo 2.3 • Metas cognoscitivas y operativas</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => { setIsEditing(true); setActiveFilter('objetivos'); }}
                className="text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors inline-flex items-center gap-1"
              >
                <Edit3 size={13} />
                <span>Editar Objetivos</span>
              </button>
            )}
          </div>

          {/* Objetivo General */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Objetivo General:</span>
            </label>
            {isEditing ? (
              <textarea
                value={formData.generalObjective}
                onChange={(e) => setFormData({ ...formData, generalObjective: e.target.value })}
                className="w-full text-xs font-medium text-slate-900 border-2 border-blue-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50/20 leading-relaxed"
                rows={3}
                placeholder="Verbo en infinitivo (Determinar, Demostrar, Evaluar...) + objeto de estudio + variables..."
              />
            ) : (
              <div className="p-4 bg-blue-50/40 rounded-xl border border-blue-100/80">
                <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                  {research.generalObjective}
                </p>
              </div>
            )}
          </div>

          {/* Objetivos Específicos */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>Objetivos Específicos ({formData.specificObjectives?.length || 0}):</span>
              </label>
              {isEditing && (
                <button
                  type="button"
                  onClick={addSpecificObjective}
                  className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg inline-flex items-center gap-1 transition-colors"
                >
                  <Plus size={13} />
                  <span>Agregar Objetivo Específico</span>
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {(isEditing ? formData.specificObjectives : research.specificObjectives || []).map((obj, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-2.5 bg-slate-50/70 border border-slate-200/80 p-3 rounded-xl transition-all hover:bg-white"
                >
                  <span className="font-extrabold text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md shrink-0 mt-0.5">
                    OE{i + 1}
                  </span>
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-2">
                      <textarea
                        value={obj}
                        onChange={(e) => updateSpecificObjective(i, e.target.value)}
                        className="w-full text-xs text-slate-900 bg-white border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        rows={2}
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecificObjective(i)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg shrink-0 transition-colors"
                        title="Eliminar este objetivo específico"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-800 font-medium leading-relaxed flex-1">
                      {obj}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BLOCK 3: FORMULACIÓN DE HIPÓTESIS */}
      {(activeFilter === 'todos' || activeFilter === 'hipotesis') && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">3. Formulación de Hipótesis</h3>
                <p className="text-xs text-slate-500">Sección 1.8 del Anexo 2.3 • Respuestas tentativas y proposiciones científicas</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => { setIsEditing(true); setActiveFilter('hipotesis'); }}
                className="text-xs font-semibold text-purple-700 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-lg transition-colors inline-flex items-center gap-1"
              >
                <Edit3 size={13} />
                <span>Editar Hipótesis</span>
              </button>
            )}
          </div>

          {/* Hipótesis General */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Hipótesis General (HG):</span>
            </label>
            {isEditing ? (
              <textarea
                value={formData.generalHypothesis}
                onChange={(e) => setFormData({ ...formData, generalHypothesis: e.target.value })}
                className="w-full text-xs font-medium text-slate-900 border-2 border-purple-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50/20 leading-relaxed"
                rows={3}
                placeholder="Proposición afirmativa comprobable empíricamente..."
              />
            ) : (
              <div className="p-4 bg-purple-50/40 rounded-xl border border-purple-100/80">
                <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                  {research.generalHypothesis}
                </p>
              </div>
            )}
          </div>

          {/* Hipótesis Específicas */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>Hipótesis Específicas ({formData.specificHypotheses?.length || 0}):</span>
              </label>
              {isEditing && (
                <button
                  type="button"
                  onClick={addSpecificHypothesis}
                  className="px-2.5 py-1 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg inline-flex items-center gap-1 transition-colors"
                >
                  <Plus size={13} />
                  <span>Agregar Hipótesis Específica</span>
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {(isEditing ? formData.specificHypotheses : research.specificHypotheses || []).map((hyp, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-2.5 bg-slate-50/70 border border-slate-200/80 p-3 rounded-xl transition-all hover:bg-white"
                >
                  <span className="font-extrabold text-xs text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md shrink-0 mt-0.5">
                    H{i + 1}
                  </span>
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-2">
                      <textarea
                        value={hyp}
                        onChange={(e) => updateSpecificHypothesis(i, e.target.value)}
                        className="w-full text-xs text-slate-900 bg-white border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        rows={2}
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecificHypothesis(i)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg shrink-0 transition-colors"
                        title="Eliminar esta hipótesis específica"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-800 font-medium leading-relaxed flex-1">
                      {hyp}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BLOCK 4: VARIABLES Y OPERACIONALIZACIÓN */}
      {(activeFilter === 'todos' || activeFilter === 'variables') && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Layers size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">4. Variables y Operacionalización</h3>
                <p className="text-xs text-slate-500">Sección 1.9 y 1.10 del Anexo 2.3 • Dimensiones, constructos e indicadores</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => { setIsEditing(true); setActiveFilter('variables'); }}
                className="text-xs font-semibold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-lg transition-colors inline-flex items-center gap-1"
              >
                <Edit3 size={13} />
                <span>Editar Variables</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Variable Independiente (VI) */}
            <div className="p-4 bg-amber-50/40 border border-amber-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Variable Independiente (VI)</span>
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                  Causa / Propuesta
                </span>
              </div>

              {isEditing ? (
                <div className="space-y-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Nombre de la VI:</label>
                    <input
                      type="text"
                      value={formData.independentVariable.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        independentVariable: { ...formData.independentVariable, name: e.target.value }
                      })}
                      className="w-full text-xs font-bold text-slate-900 bg-white border border-amber-300 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Definición Conceptual / Operacional:</label>
                    <textarea
                      value={formData.independentVariable.definition}
                      onChange={(e) => setFormData({
                        ...formData,
                        independentVariable: { ...formData.independentVariable, definition: e.target.value }
                      })}
                      className="w-full text-xs text-slate-800 bg-white border border-amber-300 rounded-lg p-2"
                      rows={2}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h4 className="text-sm font-bold text-slate-900">
                    {research.independentVariable.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {research.independentVariable.definition}
                  </p>
                </>
              )}

              {/* Dimensiones VI */}
              <div className="pt-2 border-t border-amber-200/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-950 uppercase">Dimensiones de la VI:</span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => addDimension('independent')}
                      className="text-[11px] font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1"
                    >
                      <Plus size={12} />
                      <span>Agregar Dimensión</span>
                    </button>
                  )}
                </div>

                <div className="space-y-1.5">
                  {(isEditing ? formData.independentVariable.dimensions : research.independentVariable.dimensions || []).map((dim, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5 w-full">
                          <input
                            type="text"
                            value={dim}
                            onChange={(e) => updateDimension('independent', idx, e.target.value)}
                            className="flex-1 text-xs bg-white border border-amber-300 rounded px-2 py-1"
                          />
                          <button
                            type="button"
                            onClick={() => removeDimension('independent', idx)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs px-2.5 py-1 bg-white border border-amber-200 rounded-lg text-slate-800 font-medium inline-block shadow-2xs">
                          {dim}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Indicadores VI */}
              <div className="pt-2 border-t border-amber-200/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-950 uppercase">Indicadores de la VI:</span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => addIndicator('independent')}
                      className="text-[11px] font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1"
                    >
                      <Plus size={12} />
                      <span>Agregar Indicador</span>
                    </button>
                  )}
                </div>

                <div className="space-y-1.5">
                  {(isEditing ? formData.independentVariable.indicators || [] : research.independentVariable.indicators || []).map((ind, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5 w-full">
                          <input
                            type="text"
                            value={ind}
                            onChange={(e) => updateIndicator('independent', idx, e.target.value)}
                            className="flex-1 text-xs bg-white border border-amber-300 rounded px-2 py-1"
                          />
                          <button
                            type="button"
                            onClick={() => removeIndicator('independent', idx)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-700 bg-white/80 border border-amber-200/70 px-2 py-0.5 rounded">
                          • {ind}
                        </span>
                      )}
                    </div>
                  ))}
                  {(!research.independentVariable.indicators || research.independentVariable.indicators.length === 0) && !isEditing && (
                    <span className="text-xs text-slate-400 italic">No se especificaron indicadores</span>
                  )}
                </div>
              </div>
            </div>

            {/* Variable Dependiente (VD) */}
            <div className="p-4 bg-emerald-50/40 border border-emerald-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Variable Dependiente (VD)</span>
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Efecto / Medición
                </span>
              </div>

              {isEditing ? (
                <div className="space-y-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Nombre de la VD:</label>
                    <input
                      type="text"
                      value={formData.dependentVariable.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        dependentVariable: { ...formData.dependentVariable, name: e.target.value }
                      })}
                      className="w-full text-xs font-bold text-slate-900 bg-white border border-emerald-300 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Definición Conceptual / Operacional:</label>
                    <textarea
                      value={formData.dependentVariable.definition}
                      onChange={(e) => setFormData({
                        ...formData,
                        dependentVariable: { ...formData.dependentVariable, definition: e.target.value }
                      })}
                      className="w-full text-xs text-slate-800 bg-white border border-emerald-300 rounded-lg p-2"
                      rows={2}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h4 className="text-sm font-bold text-slate-900">
                    {research.dependentVariable.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {research.dependentVariable.definition}
                  </p>
                </>
              )}

              {/* Dimensiones VD */}
              <div className="pt-2 border-t border-emerald-200/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-950 uppercase">Dimensiones de la VD:</span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => addDimension('dependent')}
                      className="text-[11px] font-bold text-emerald-800 hover:text-emerald-900 inline-flex items-center gap-1"
                    >
                      <Plus size={12} />
                      <span>Agregar Dimensión</span>
                    </button>
                  )}
                </div>

                <div className="space-y-1.5">
                  {(isEditing ? formData.dependentVariable.dimensions : research.dependentVariable.dimensions || []).map((dim, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5 w-full">
                          <input
                            type="text"
                            value={dim}
                            onChange={(e) => updateDimension('dependent', idx, e.target.value)}
                            className="flex-1 text-xs bg-white border border-emerald-300 rounded px-2 py-1"
                          />
                          <button
                            type="button"
                            onClick={() => removeDimension('dependent', idx)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs px-2.5 py-1 bg-white border border-emerald-200 rounded-lg text-slate-800 font-medium inline-block shadow-2xs">
                          {dim}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Indicadores VD */}
              <div className="pt-2 border-t border-emerald-200/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-950 uppercase">Indicadores de la VD:</span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => addIndicator('dependent')}
                      className="text-[11px] font-bold text-emerald-800 hover:text-emerald-900 inline-flex items-center gap-1"
                    >
                      <Plus size={12} />
                      <span>Agregar Indicador</span>
                    </button>
                  )}
                </div>

                <div className="space-y-1.5">
                  {(isEditing ? formData.dependentVariable.indicators || [] : research.dependentVariable.indicators || []).map((ind, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5 w-full">
                          <input
                            type="text"
                            value={ind}
                            onChange={(e) => updateIndicator('dependent', idx, e.target.value)}
                            className="flex-1 text-xs bg-white border border-emerald-300 rounded px-2 py-1"
                          />
                          <button
                            type="button"
                            onClick={() => removeIndicator('dependent', idx)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-700 bg-white/80 border border-emerald-200/70 px-2 py-0.5 rounded">
                          • {ind}
                        </span>
                      )}
                    </div>
                  ))}
                  {(!research.dependentVariable.indicators || research.dependentVariable.indicators.length === 0) && !isEditing && (
                    <span className="text-xs text-slate-400 italic">No se especificaron indicadores</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Variables Restrictivas / Intervinientes */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              1.9 Variables Restrictivas / Intervinientes y Factores de Control:
            </label>
            {isEditing ? (
              <textarea
                value={formData.restrictiveVariables || ''}
                onChange={(e) => setFormData({ ...formData, restrictiveVariables: e.target.value })}
                className="w-full text-xs text-slate-800 border rounded-lg p-2.5"
                rows={2}
                placeholder="Variables de control, condiciones del entorno, restricciones tecnológicas..."
              />
            ) : (
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                {research.restrictiveVariables || 'No se han declarado variables restrictivas o factores de perturbación significativos.'}
              </p>
            )}
          </div>
        </div>
      )}

      {/* BLOCK 5: MARCO METODOLÓGICO Y DISEÑO */}
      {(activeFilter === 'todos' || activeFilter === 'metodologia') && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Microscope size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">5. Marco Metodológico y Diseño de Investigación</h3>
                <p className="text-xs text-slate-500">Capítulo 3 del Anexo 2.3 • Enfoque, tipo, diseño, población, muestra, equipos e instrumentos</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => { setIsEditing(true); setActiveFilter('metodologia'); }}
                className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg transition-colors inline-flex items-center gap-1"
              >
                <Edit3 size={13} />
                <span>Editar Metodología</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Enfoque & Tipo */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 uppercase block">
                3.1 Enfoque y Tipo de Investigación:
              </label>
              {isEditing ? (
                <div className="space-y-1.5">
                  <input
                    type="text"
                    value={formData.methodology.approach}
                    onChange={(e) => setFormData({
                      ...formData,
                      methodology: { ...formData.methodology, approach: e.target.value }
                    })}
                    placeholder="Enfoque (e.g. Cuantitativo)"
                    className="w-full text-xs font-medium text-slate-900 bg-white border border-slate-300 rounded p-1.5"
                  />
                  <input
                    type="text"
                    value={formData.methodology.type}
                    onChange={(e) => setFormData({
                      ...formData,
                      methodology: { ...formData.methodology, type: e.target.value }
                    })}
                    placeholder="Tipo y Nivel (e.g. Aplicada, explicativa)"
                    className="w-full text-xs font-medium text-slate-900 bg-white border border-slate-300 rounded p-1.5"
                  />
                </div>
              ) : (
                <p className="text-xs text-slate-800 font-medium">
                  {research.methodology.approach} • {research.methodology.type}
                </p>
              )}
            </div>

            {/* Diseño de Investigación */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 uppercase block">
                3.1 Diseño de Investigación:
              </label>
              {isEditing ? (
                <textarea
                  value={formData.methodology.design}
                  onChange={(e) => setFormData({
                    ...formData,
                    methodology: { ...formData.methodology, design: e.target.value }
                  })}
                  className="w-full text-xs font-medium text-slate-900 bg-white border border-slate-300 rounded p-1.5"
                  rows={2}
                  placeholder="e.g. Preexperimental con preprueba y posprueba en un solo grupo"
                />
              ) : (
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  {research.methodology.design}
                </p>
              )}
            </div>

            {/* Población y Muestra */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 md:col-span-2">
              <label className="text-[11px] font-bold text-slate-700 uppercase block">
                3.3 Población, Muestra y Criterios de Selección:
              </label>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">Población de Estudio:</span>
                    <textarea
                      value={formData.methodology.population}
                      onChange={(e) => setFormData({
                        ...formData,
                        methodology: { ...formData.methodology, population: e.target.value }
                      })}
                      className="w-full text-xs bg-white border border-slate-300 rounded p-2"
                      rows={2}
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">Muestra y Muestreo:</span>
                    <textarea
                      value={formData.methodology.sample}
                      onChange={(e) => setFormData({
                        ...formData,
                        methodology: { ...formData.methodology, sample: e.target.value }
                      })}
                      className="w-full text-xs bg-white border border-slate-300 rounded p-2"
                      rows={2}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-800">
                  <div><strong>Población:</strong> {research.methodology.population}</div>
                  <div><strong>Muestra:</strong> {research.methodology.sample}</div>
                </div>
              )}
            </div>

            {/* 3.4 Equipos y Materiales */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 uppercase block">
                3.4 Equipos y Materiales:
              </label>
              {isEditing ? (
                <textarea
                  value={formData.methodology.equipmentAndMaterials || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    methodology: { ...formData.methodology, equipmentAndMaterials: e.target.value }
                  })}
                  className="w-full text-xs text-slate-900 bg-white border border-slate-300 rounded p-1.5"
                  rows={2}
                  placeholder="Equipos de cómputo, servidores, licencias de software, instrumentos de medición..."
                />
              ) : (
                <p className="text-xs text-slate-700">
                  {research.methodology.equipmentAndMaterials || 'Equipos de cómputo y plataformas tecnológicas institucionales.'}
                </p>
              )}
            </div>

            {/* 3.5 Procedimiento de las Pruebas Experimentales */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 uppercase block">
                3.5 Procedimiento Experimental / Pruebas:
              </label>
              {isEditing ? (
                <textarea
                  value={formData.methodology.experimentalProcedure || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    methodology: { ...formData.methodology, experimentalProcedure: e.target.value }
                  })}
                  className="w-full text-xs text-slate-900 bg-white border border-slate-300 rounded p-1.5"
                  rows={2}
                  placeholder="Etapas secuenciales de ejecución de la prueba o experimento..."
                />
              ) : (
                <p className="text-xs text-slate-700">
                  {research.methodology.experimentalProcedure || '1. Fase de línea base; 2. Aplicación del estímulo experimental; 3. Evaluación y posprueba.'}
                </p>
              )}
            </div>

            {/* 3.6 Técnicas e Instrumentos */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 uppercase block">
                3.6 Técnicas e Instrumentos de Recolección de Datos:
              </label>
              {isEditing ? (
                <textarea
                  value={formData.methodology.instruments}
                  onChange={(e) => setFormData({
                    ...formData,
                    methodology: { ...formData.methodology, instruments: e.target.value }
                  })}
                  className="w-full text-xs text-slate-900 bg-white border border-slate-300 rounded p-1.5"
                  rows={2}
                  placeholder="Cuestionarios, guías de observación, fichas de registro, validez por expertos y confiabilidad..."
                />
              ) : (
                <p className="text-xs text-slate-700">
                  {research.methodology.instruments}
                </p>
              )}
            </div>

            {/* 3.7 Técnicas de Procesamiento de Datos */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 uppercase block">
                3.7 Técnicas para el Procesamiento de la Información:
              </label>
              {isEditing ? (
                <textarea
                  value={formData.methodology.dataProcessingTechniques || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    methodology: { ...formData.methodology, dataProcessingTechniques: e.target.value }
                  })}
                  className="w-full text-xs text-slate-900 bg-white border border-slate-300 rounded p-1.5"
                  rows={2}
                  placeholder="Software estadístico (SPSS, R, Python), pruebas paramétricas o no paramétricas (t-Student, Wilcoxon)..."
                />
              ) : (
                <p className="text-xs text-slate-700">
                  {research.methodology.dataProcessingTechniques || 'Estadística descriptiva (distribución de frecuencias) y pruebas de hipótesis inferenciales.'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Bar when in Edit Mode */}
      {isEditing && (
        <div className="sticky bottom-4 z-40 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="font-semibold text-slate-200">
              Estás editando la ficha metodológica del proyecto de tesis.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              Descartar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm inline-flex items-center gap-1.5 transition-all"
            >
              <Save size={14} />
              <span>Guardar y Aplicar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

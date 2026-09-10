import React, { useState } from 'react';
import { BibliographicSource } from '../../types/thesis';
import { 
  Library, 
  Search, 
  Plus, 
  ExternalLink, 
  Copy, 
  Check, 
  Filter, 
  Trash2, 
  ShieldCheck, 
  AlertCircle,
  FileCheck2,
  BookOpen
} from 'lucide-react';

interface SourcesSectionProps {
  sources: BibliographicSource[];
  onAddSourceClick: () => void;
  onDeleteSource: (id: string) => void;
}

export const SourcesSection: React.FC<SourcesSectionProps> = ({
  sources,
  onAddSourceClick,
  onDeleteSource,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSources = sources.filter((s) => {
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.keyContribution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.journalOrPublisher.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterType === 'todos') return true;
    return s.sourceType.toLowerCase() === filterType.toLowerCase();
  });

  const handleCopyCitation = (id: string, citation: string) => {
    navigator.clipboard.writeText(citation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: BibliographicSource['verifiedStatus']) => {
    switch (status) {
      case 'Indexada Scopus/WoS':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            <ShieldCheck size={12} className="text-emerald-600" />
            Scopus / WoS Q1-Q2
          </span>
        );
      case 'SciELO/Redalyc':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            <FileCheck2 size={12} className="text-blue-600" />
            SciELO / Redalyc
          </span>
        );
      case 'Institucional':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
            <BookOpen size={12} className="text-slate-500" />
            Institucional / Libro
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            <AlertCircle size={12} className="text-amber-600" />
            Pendiente verificación
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por autor, título, revista científica o DOI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onAddSourceClick}
              className="px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl inline-flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus size={15} />
              <span>Registrar Fuente APA 7</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Filter size={13} /> Tipo de Fuente:
          </span>
          {['todos', 'artículo', 'libro', 'tesis', 'norma'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-full border capitalize font-medium transition-all ${
                filterType === type
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Sources List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredSources.map((source) => (
          <div
            key={source.id}
            id={`source-card-${source.id}`}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-shadow space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {getStatusBadge(source.verifiedStatus)}
                  <span className="text-xs font-medium text-slate-500 px-2 py-0.5 bg-slate-100 rounded">
                    {source.sourceType} • {source.year}
                  </span>
                  {source.relevantChapters.map((ch, i) => (
                    <span key={i} className="text-[11px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                      {ch}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug pt-1">
                  {source.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  {source.authors} ({source.year}) — <em>{source.journalOrPublisher}</em>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 self-start shrink-0">
                <button
                  onClick={() => handleCopyCitation(source.id, source.apa7Citation)}
                  className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg inline-flex items-center gap-1 transition-colors"
                  title="Copiar cita en formato APA 7"
                >
                  {copiedId === source.id ? (
                    <>
                      <Check size={13} className="text-emerald-600" />
                      <span className="text-emerald-700">Copiada</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copiar APA 7</span>
                    </>
                  )}
                </button>

                {source.doiOrUrl && (
                  <a
                    href={source.doiOrUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors"
                    title="Abrir DOI / Enlace original"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}

                <button
                  onClick={() => onDeleteSource(source.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Eliminar de mi lista"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* APA 7 Box */}
            <div className="p-3 bg-slate-50/80 border border-slate-200/80 rounded-xl">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Referencia Bibliográfica Oficial (APA 7.ª ed.)
              </div>
              <p className="text-xs text-slate-800 font-serif leading-relaxed select-all">
                {source.apa7Citation}
              </p>
            </div>

            {/* Contribution to Thesis */}
            {source.keyContribution && (
              <div className="text-xs text-slate-600 bg-amber-50/40 border border-amber-200/60 p-2.5 rounded-xl">
                <strong className="text-amber-950">Aporte clave al proyecto:</strong> {source.keyContribution}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

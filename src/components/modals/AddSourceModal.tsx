import React, { useState } from 'react';
import { BibliographicSource, ThesisChapter } from '../../types/thesis';
import { X, Library } from 'lucide-react';

interface AddSourceModalProps {
  chapters: ThesisChapter[];
  onSave: (source: BibliographicSource) => void;
  onClose: () => void;
}

export const AddSourceModal: React.FC<AddSourceModalProps> = ({
  chapters,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [year, setYear] = useState(2024);
  const [sourceType, setSourceType] = useState<BibliographicSource['sourceType']>('Artículo');
  const [journalOrPublisher, setJournalOrPublisher] = useState('');
  const [doiOrUrl, setDoiOrUrl] = useState('');
  const [verifiedStatus, setVerifiedStatus] = useState<BibliographicSource['verifiedStatus']>('Indexada Scopus/WoS');
  const [selectedChapters, setSelectedChapters] = useState<string[]>(['Marco teórico']);
  const [keyContribution, setKeyContribution] = useState('');

  const generateApa7 = () => {
    const auth = authors.trim() || 'Autor, A.';
    const yr = year || 2024;
    const tit = title.trim() || 'Título de la investigación';
    const pub = journalOrPublisher.trim() || 'Revista Académica';
    const doi = doiOrUrl.trim() ? ` ${doiOrUrl.trim()}` : '';

    if (sourceType === 'Artículo') {
      return `${auth} (${yr}). ${tit}. ${pub}.${doi}`;
    } else if (sourceType === 'Libro') {
      return `${auth} (${yr}). ${tit}. ${pub}.${doi}`;
    } else {
      return `${auth} (${yr}). ${tit}. ${pub}.${doi}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !authors.trim()) return;

    const newSource: BibliographicSource = {
      id: `src-${Date.now()}`,
      title: title.trim(),
      authors: authors.trim(),
      year: Number(year),
      sourceType,
      journalOrPublisher: journalOrPublisher.trim(),
      doiOrUrl: doiOrUrl.trim(),
      apa7Citation: generateApa7(),
      verifiedStatus,
      relevantChapters: selectedChapters,
      keyContribution: keyContribution.trim()
    };

    onSave(newSource);
    onClose();
  };

  const toggleChapter = (chName: string) => {
    if (selectedChapters.includes(chName)) {
      setSelectedChapters(selectedChapters.filter(c => c !== chName));
    } else {
      setSelectedChapters([...selectedChapters, chName]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl space-y-4 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Library size={16} />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Registrar Fuente Bibliográfica (APA 7)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Tipo de Fuente:</label>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value as any)}
                className="w-full p-2 border border-slate-300 rounded-xl text-xs"
              >
                <option value="Artículo">Artículo Científico</option>
                <option value="Libro">Libro / Monografía</option>
                <option value="Tesis">Tesis de Posgrado</option>
                <option value="Conferencia">Acta de Conferencia</option>
                <option value="Norma">Norma / Estándar</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Estado de Indexación:</label>
              <select
                value={verifiedStatus}
                onChange={(e) => setVerifiedStatus(e.target.value as any)}
                className="w-full p-2 border border-slate-300 rounded-xl text-xs"
              >
                <option value="Indexada Scopus/WoS">Scopus / Web of Science (Q1-Q2)</option>
                <option value="SciELO/Redalyc">SciELO / Redalyc / Latindex</option>
                <option value="Institucional">Repositorio Institucional / Libro</option>
                <option value="Pendiente verificación">Pendiente Verificación</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Título de la Publicación:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Knowledge management frameworks and digital maturity..."
              className="w-full p-2.5 border border-slate-300 rounded-xl text-xs"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1">
              <label className="font-bold text-slate-700">Autores (formato APA: Apellido, N.):</label>
              <input
                type="text"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                placeholder="Ej: Gómez, R., & Silva, M."
                className="w-full p-2 border border-slate-300 rounded-xl text-xs"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Año de Publicación:</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded-xl text-xs text-center font-bold"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Revista Científica / Editorial:</label>
            <input
              type="text"
              value={journalOrPublisher}
              onChange={(e) => setJournalOrPublisher(e.target.value)}
              placeholder="Ej: Revista Iberoamericana de Educación Superior, 15(43), 88–109"
              className="w-full p-2 border border-slate-300 rounded-xl text-xs"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Enlace DOI o URL Canónica:</label>
            <input
              type="text"
              value={doiOrUrl}
              onChange={(e) => setDoiOrUrl(e.target.value)}
              placeholder="Ej: https://doi.org/10.1016/j.caeo.2023.100139"
              className="w-full p-2 border border-slate-300 rounded-xl text-xs font-mono"
            />
          </div>

          {/* Chapters selection */}
          <div className="space-y-1.5 pt-1">
            <label className="font-bold text-slate-700 block">Capítulos donde se utiliza:</label>
            <div className="flex flex-wrap gap-1.5">
              {chapters.map((ch) => {
                const isSelected = selectedChapters.includes(ch.name);
                return (
                  <button
                    type="button"
                    key={ch.id}
                    onClick={() => toggleChapter(ch.name)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] border font-medium transition-all ${
                      isSelected 
                        ? 'bg-indigo-600 text-white border-indigo-600' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {ch.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Aporte Clave a la Tesis:</label>
            <textarea
              value={keyContribution}
              onChange={(e) => setKeyContribution(e.target.value)}
              placeholder="¿Qué aporta a la fundamentación teórica, operacionalización o discusión de resultados?"
              className="w-full p-2 border border-slate-300 rounded-xl text-xs"
              rows={2}
            />
          </div>

          {/* APA 7 Preview */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
              Vista previa APA 7 generada automáticamente:
            </div>
            <p className="font-serif text-[11px] italic leading-relaxed">
              {generateApa7()}
            </p>
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
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs transition-colors"
            >
              Guardar Fuente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ConsistencyMatrixRow, UserSession } from '../../types/thesis';
import { 
  Table2, 
  Download, 
  Copy, 
  Check, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Info,
  Sparkles,
  Lock
} from 'lucide-react';

interface ConsistencyMatrixSectionProps {
  rows: ConsistencyMatrixRow[];
  currentUser?: UserSession;
  onUpdateRows: (rows: ConsistencyMatrixRow[]) => void;
}

export const ConsistencyMatrixSection: React.FC<ConsistencyMatrixSectionProps> = ({
  rows,
  currentUser,
  onUpdateRows,
}) => {
  const isTesista = currentUser?.role === 'tesista';
  const [editingRow, setEditingRow] = useState<ConsistencyMatrixRow | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyTable = () => {
    const header = ['NIVEL', 'PROBLEMA', 'OBJETIVO', 'HIPÓTESIS', 'VARIABLES', 'DIMENSIONES', 'INDICADORES', 'METODOLOGÍA'].join('\t');
    const body = rows.map((r, i) => [
      r.isSpecific ? `Específico ${i}` : 'General',
      r.problem,
      r.objective,
      r.hypothesis,
      r.variables,
      r.dimensions,
      r.indicators,
      r.methodology
    ].join('\t')).join('\n');

    navigator.clipboard.writeText(`${header}\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Nivel,Problema,Objetivo,Hipotesis,Variables,Dimensiones,Indicadores,Metodologia"]
      .concat(rows.map((r, i) => 
        `"${r.isSpecific ? 'Específico ' + i : 'General'}","${r.problem.replace(/"/g, '""')}","${r.objective.replace(/"/g, '""')}","${r.hypothesis.replace(/"/g, '""')}","${r.variables.replace(/"/g, '""')}","${r.dimensions.replace(/"/g, '""')}","${r.indicators.replace(/"/g, '""')}","${r.methodology.replace(/"/g, '""')}"`
      )).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "matriz_de_consistencia_tesis.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveEdit = () => {
    if (!editingRow) return;
    onUpdateRows(rows.map(r => r.id === editingRow.id ? editingRow : r));
    setEditingRow(null);
  };

  const handleAddRow = () => {
    const newId = `mat-esp-${Date.now()}`;
    const newRow: ConsistencyMatrixRow = {
      id: newId,
      isSpecific: true,
      problem: '¿Nuevo problema específico de investigación?',
      objective: 'Determinar el nuevo objetivo específico correspondiente.',
      hypothesis: 'H' + rows.length + ': Hipótesis específica planteada.',
      variables: 'VI / VD específicas',
      dimensions: 'Dimensión específica',
      indicators: 'Indicadores verificables empíricamente',
      methodology: 'Técnica e instrumento aplicable a este objetivo'
    };
    onUpdateRows([...rows, newRow]);
    setEditingRow(newRow);
  };

  const handleDeleteRow = (id: string) => {
    if (confirm('¿Eliminar esta fila de la matriz de consistencia?')) {
      onUpdateRows(rows.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Info & Actions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-1">
            <Table2 size={13} />
            <span>Columna Vertebral Metodológica</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Matriz de Consistencia Científica
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Garantiza la correspondencia biunívoca entre la formulación del problema, los objetivos, las hipótesis comprobables y la operacionalización metodológica.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {!isTesista ? (
            <button
              onClick={handleAddRow}
              className="px-3 py-1.5 text-xs font-medium text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg inline-flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Plus size={14} />
              <span>Añadir Fila</span>
            </button>
          ) : (
            <span className="px-3 py-1.5 text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 rounded-lg inline-flex items-center gap-1">
              <Lock size={12} />
              <span>Validada por Asesor</span>
            </span>
          )}
          <button
            onClick={handleCopyTable}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg inline-flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? '¡Copiada!' : 'Copiar para Word'}</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg inline-flex items-center gap-1.5 transition-colors"
          >
            <Download size={14} />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5 w-24">Nivel</th>
                <th className="p-3.5 min-w-[220px]">Problemas</th>
                <th className="p-3.5 min-w-[220px]">Objetivos</th>
                <th className="p-3.5 min-w-[220px]">Hipótesis</th>
                <th className="p-3.5 min-w-[180px]">Variables & Dimens.</th>
                <th className="p-3.5 min-w-[160px]">Indicadores</th>
                <th className="p-3.5 min-w-[200px]">Metodología</th>
                <th className="p-3.5 w-16 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {rows.map((row, idx) => {
                const isGen = !row.isSpecific;
                return (
                  <tr 
                    key={row.id}
                    className={`align-top hover:bg-slate-50/90 transition-colors ${
                      isGen ? 'bg-amber-50/40 font-medium' : ''
                    }`}
                  >
                    <td className="p-3.5">
                      <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded ${
                        isGen ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isGen ? 'General' : `Específico ${idx}`}
                      </span>
                    </td>
                    <td className="p-3.5 leading-relaxed text-slate-800">
                      {row.problem}
                    </td>
                    <td className="p-3.5 leading-relaxed text-slate-800">
                      {row.objective}
                    </td>
                    <td className="p-3.5 leading-relaxed text-slate-800">
                      {row.hypothesis}
                    </td>
                    <td className="p-3.5 leading-relaxed">
                      <div className="font-semibold text-slate-900 mb-1">{row.variables}</div>
                      <div className="text-[11px] text-slate-500">{row.dimensions}</div>
                    </td>
                    <td className="p-3.5 leading-relaxed text-slate-700">
                      {row.indicators}
                    </td>
                    <td className="p-3.5 leading-relaxed text-slate-700">
                      {row.methodology}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      {!isTesista ? (
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setEditingRow(row)}
                            className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded"
                            title="Editar fila"
                          >
                            <Edit3 size={13} />
                          </button>
                          {row.isSpecific && (
                            <button
                              onClick={() => handleDeleteRow(row.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                              title="Eliminar fila"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400">Solo lectura</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row Edit Modal */}
      {editingRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                Editar Fila de la Matriz ({editingRow.isSpecific ? 'Específico' : 'General'})
              </h3>
              <button
                onClick={() => setEditingRow(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 md:col-span-2">
                <label className="font-bold text-slate-700">Problema:</label>
                <textarea
                  value={editingRow.problem}
                  onChange={(e) => setEditingRow({ ...editingRow, problem: e.target.value })}
                  className="w-full border rounded-lg p-2 text-xs"
                  rows={2}
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Objetivo:</label>
                <textarea
                  value={editingRow.objective}
                  onChange={(e) => setEditingRow({ ...editingRow, objective: e.target.value })}
                  className="w-full border rounded-lg p-2 text-xs"
                  rows={2}
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Hipótesis:</label>
                <textarea
                  value={editingRow.hypothesis}
                  onChange={(e) => setEditingRow({ ...editingRow, hypothesis: e.target.value })}
                  className="w-full border rounded-lg p-2 text-xs"
                  rows={2}
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Variables:</label>
                <input
                  type="text"
                  value={editingRow.variables}
                  onChange={(e) => setEditingRow({ ...editingRow, variables: e.target.value })}
                  className="w-full border rounded-lg p-2 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Dimensiones:</label>
                <input
                  type="text"
                  value={editingRow.dimensions}
                  onChange={(e) => setEditingRow({ ...editingRow, dimensions: e.target.value })}
                  className="w-full border rounded-lg p-2 text-xs"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="font-bold text-slate-700">Indicadores:</label>
                <textarea
                  value={editingRow.indicators}
                  onChange={(e) => setEditingRow({ ...editingRow, indicators: e.target.value })}
                  className="w-full border rounded-lg p-2 text-xs"
                  rows={2}
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="font-bold text-slate-700">Metodología / Instrumentos:</label>
                <textarea
                  value={editingRow.methodology}
                  onChange={(e) => setEditingRow({ ...editingRow, methodology: e.target.value })}
                  className="w-full border rounded-lg p-2 text-xs"
                  rows={2}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => setEditingRow(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs"
              >
                Guardar Fila
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

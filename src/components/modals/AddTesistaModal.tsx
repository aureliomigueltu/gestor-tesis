import React, { useState } from 'react';
import { X, UserPlus, Shield, GraduationCap, CheckCircle2, AlertCircle } from 'lucide-react';
import { TesistaItem } from '../../data/tesistas';
import { addNewUserAccount } from '../../data/users';

interface AddTesistaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTesista: (tesista: TesistaItem, password: string, projectTitle: string) => void;
}

export const AddTesistaModal: React.FC<AddTesistaModalProps> = ({
  isOpen,
  onClose,
  onSaveTesista,
}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = name.trim();
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();
    const cleanTitle = projectTitle.trim() || 'Proyecto de Tesis de Grado';

    if (!cleanName || !cleanUser || !cleanPass) {
      setError('Por favor completa el nombre, usuario y contraseña del tesista.');
      return;
    }

    if (cleanPass.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    const initials = cleanName
      .split(' ')
      .map(w => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'TE';

    const newTesista: TesistaItem = {
      id: `user-${cleanUser}-${Date.now()}`,
      name: cleanName,
      username: cleanUser,
      email: email.trim() || `${cleanUser}@tesis.edu`,
      projectTitle: cleanTitle,
      avatarInitials: initials
    };

    onSaveTesista(newTesista, cleanPass, cleanTitle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <UserPlus size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Registrar Nuevo Tesista</h3>
              <p className="text-[11px] text-slate-500">Asignar manuscrito a la asesoría del Ing. Aurelio Tacuri Urquizo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle size={15} className="text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nombre del Tesista <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Lester o Carlos Gómez"
              required
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Usuario de acceso <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ej. lester"
                required
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-600 font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Contraseña <span className="text-rose-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ej. clave123"
                required
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Título Preliminar de la Tesis
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Ej. Optimización de Procesos y Gestión de Datos..."
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Correo Electrónico (Opcional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tesista@tesis.edu"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-1">
              <Shield size={12} className="text-emerald-600" />
              <span>Privilegios del nuevo tesista:</span>
            </div>
            <p>
              El nuevo tesista podrá iniciar sesión con su usuario y contraseña, visualizando exclusivamente su avance, sus observaciones y enviando consultas al Ing. Aurelio Tacuri Urquizo.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-slate-600 hover:text-slate-800 font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition-colors"
            >
              Guardar y Asignar Tesista
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

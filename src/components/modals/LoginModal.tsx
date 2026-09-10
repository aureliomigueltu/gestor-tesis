import React, { useState } from 'react';
import { UserSession, UserRole } from '../../types/thesis';
import { 
  getStoredUserAccounts, 
  updateUserPassword, 
  verifyCredentials,
  INITIAL_USER_ACCOUNTS 
} from '../../data/users';
import { 
  ShieldCheck, 
  GraduationCap, 
  UserCheck, 
  Lock, 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  Edit3, 
  AlertCircle,
  LogOut,
  KeyRound,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface LoginModalProps {
  currentUser: UserSession;
  isOpen: boolean;
  onSelectUser: (user: UserSession) => void;
  onLogout: () => void;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  currentUser,
  isOpen,
  onSelectUser,
  onLogout,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'changePassword' | 'switchUser'>('profile');

  // Change Password state
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [passSuccessMessage, setPassSuccessMessage] = useState<string | null>(null);
  const [passErrorMessage, setPassErrorMessage] = useState<string | null>(null);

  // Switch user credentials state
  const [switchTargetId, setSwitchTargetId] = useState<string>(
    currentUser.role === 'asesor' ? 'user-lester' : 'user-asesor'
  );
  const [switchPassword, setSwitchPassword] = useState('');
  const [switchError, setSwitchError] = useState<string | null>(null);

  if (!isOpen) return null;

  const accounts = getStoredUserAccounts();
  const currentAccount = accounts.find(a => a.id === currentUser.id);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassSuccessMessage(null);
    setPassErrorMessage(null);

    if (!currentPassInput || !newPassInput) {
      setPassErrorMessage('Por favor completa todos los campos.');
      return;
    }

    if (newPassInput.length < 4) {
      setPassErrorMessage('La nueva contraseña debe tener al menos 4 caracteres.');
      return;
    }

    if (newPassInput !== confirmPassInput) {
      setPassErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    // Verify current password
    if (currentAccount && currentAccount.password !== currentPassInput.trim()) {
      setPassErrorMessage('La contraseña actual ingresada es incorrecta.');
      return;
    }

    const success = updateUserPassword(currentUser.id, newPassInput.trim());
    if (success) {
      setPassSuccessMessage('¡Contraseña actualizada exitosamente!');
      setCurrentPassInput('');
      setNewPassInput('');
      setConfirmPassInput('');
      setTimeout(() => {
        setPassSuccessMessage(null);
      }, 3500);
    } else {
      setPassErrorMessage('Error al actualizar la contraseña.');
    }
  };

  const handleSwitchUser = (e: React.FormEvent) => {
    e.preventDefault();
    setSwitchError(null);

    const targetAccount = accounts.find(a => a.id === switchTargetId);
    if (!targetAccount) return;

    if (!switchPassword.trim()) {
      setSwitchError('Por favor ingresa la contraseña para cambiar a este perfil.');
      return;
    }

    const res = verifyCredentials(targetAccount.username, switchPassword.trim());
    if (res.user) {
      onSelectUser(res.user);
      onClose();
    } else {
      setSwitchError('Contraseña incorrecta para ' + targetAccount.name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs font-bold text-white ${
              currentUser.role === 'asesor' ? 'bg-slate-900 text-amber-400' : 'bg-blue-600'
            }`}>
              {currentUser.avatarInitials}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {currentUser.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {currentUser.role === 'asesor' ? 'Asesor de Tesis (Modo Admin)' : 'Tesista / Estudiante'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher inside modal */}
        <div className="flex border-b border-slate-100 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Detalles de Cuenta
          </button>
          {currentUser.role === 'asesor' && (
            <button
              onClick={() => setActiveTab('switchUser')}
              className={`pb-2.5 px-3 border-b-2 transition-colors ${
                activeTab === 'switchUser'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Cambiar de Perfil
            </button>
          )}
          <button
            onClick={() => setActiveTab('changePassword')}
            className={`pb-2.5 px-3 border-b-2 transition-colors ${
              activeTab === 'changePassword'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Cambiar Contraseña
          </button>
        </div>

        {/* Tab 1: Profile & Current Role Info */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Nombre completo:</span>
                <span className="font-semibold text-slate-900">{currentUser.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Correo electrónico:</span>
                <span className="font-semibold text-slate-800">{currentUser.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Usuario de acceso:</span>
                <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 font-bold text-slate-900">
                  {currentAccount?.username || (currentUser.role === 'asesor' ? 'admin' : currentUser.name.toLowerCase())}
                </span>
              </div>
              {currentUser.role === 'tesista' && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Asesor de tesis:</span>
                  <span className="font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Ing. Aurelio Tacuri Urquizo
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Privilegios del sistema:</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                  currentUser.role === 'asesor' 
                    ? 'bg-amber-100 text-amber-900' 
                    : 'bg-blue-100 text-blue-900'
                }`}>
                  {currentUser.role === 'asesor' ? 'Control Total (Administrador)' : 'Lectura de Avance y Consultas'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs text-indigo-900 leading-relaxed">
              {currentUser.role === 'asesor' ? (
                <span>
                  <strong>Como Asesor:</strong> Administras el avance de tus tesistas (Lester, Jose y nuevos), emites dictámenes y observaciones, apruebas estados y configuras la base de datos Supabase.
                </span>
              ) : (
                <span>
                  <strong>Como Tesista:</strong> Accedes a consultar el estado y avance validado por tu asesor <strong>Ing. Aurelio Tacuri Urquizo</strong>, revisas observaciones pendientes y puedes enviarle consultas directas.
                </span>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={onLogout}
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold rounded-xl text-xs inline-flex items-center gap-2 transition-colors"
              >
                <LogOut size={15} />
                <span>Cerrar Sesión</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Continuar Trabajando
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Switch User With Password Protection (Only for Asesor) */}
        {activeTab === 'switchUser' && currentUser.role === 'asesor' && (
          <form onSubmit={handleSwitchUser} className="space-y-4">
            <p className="text-xs text-slate-600">
              Selecciona el perfil e ingresa su contraseña para verificar el cambio de sesión:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {accounts.map(acc => {
                const isSelected = switchTargetId === acc.id;
                const isAccAsesor = acc.role === 'asesor';
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => {
                      setSwitchTargetId(acc.id);
                      setSwitchPassword('');
                      setSwitchError(null);
                    }}
                    className={`p-2.5 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? isAccAsesor 
                          ? 'border-slate-900 bg-amber-50/50 ring-1 ring-slate-900' 
                          : 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900 truncate">{acc.name}</div>
                    <div className={`text-[10px] font-semibold uppercase mt-0.5 ${
                      isAccAsesor ? 'text-amber-800' : 'text-blue-800'
                    }`}>
                      {isAccAsesor ? 'Asesor (Admin)' : 'Tesista'}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">user: {acc.username}</div>
                  </button>
                );
              })}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Contraseña de {accounts.find(a => a.id === switchTargetId)?.name || 'Usuario'}
              </label>
              <input
                type="password"
                value={switchPassword}
                onChange={(e) => setSwitchPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            {switchError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-medium flex items-center gap-1.5">
                <AlertCircle size={14} className="text-rose-600 shrink-0" />
                <span>{switchError}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  const targetAcc = accounts.find(a => a.id === switchTargetId);
                  if (targetAcc) setSwitchPassword(targetAcc.password);
                }}
                className="text-xs text-indigo-600 hover:underline font-medium"
              >
                Autocompletar clave demo
              </button>

              <button
                type="submit"
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
              >
                <span>Cambiar de Sesión</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Change Password */}
        {activeTab === 'changePassword' && (
          <form onSubmit={handleChangePassword} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contraseña Actual
              </label>
              <input
                type="password"
                value={currentPassInput}
                onChange={(e) => setCurrentPassInput(e.target.value)}
                placeholder="Ingresa tu contraseña actual"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nueva Contraseña (mínimo 4 caracteres)
              </label>
              <input
                type="password"
                value={newPassInput}
                onChange={(e) => setNewPassInput(e.target.value)}
                placeholder="Nueva clave"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirmar Nueva Contraseña
              </label>
              <input
                type="password"
                value={confirmPassInput}
                onChange={(e) => setConfirmPassInput(e.target.value)}
                placeholder="Repite la nueva clave"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            {passErrorMessage && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-medium">
                {passErrorMessage}
              </div>
            )}

            {passSuccessMessage && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-1.5">
                <Check size={14} className="text-emerald-600 shrink-0" />
                <span>{passSuccessMessage}</span>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Guardar Nueva Contraseña
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

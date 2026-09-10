import React, { useState } from 'react';
import { 
  GraduationCap, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  ArrowRight,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { UserSession } from '../../types/thesis';
import { verifyCredentials, getStoredUserAccounts } from '../../data/users';

interface LoginScreenProps {
  onLoginSuccess: (user: UserSession, remember: boolean) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Por favor ingresa tanto tu usuario como tu contraseña.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = verifyCredentials(identifier, password);
      if (result.user) {
        onLoginSuccess(result.user, rememberMe);
      } else {
        setErrorMessage(result.error || 'Credenciales no válidas');
      }
      setIsLoading(false);
    }, 300);
  };

  const handleQuickFill = (type: 'admin' | 'lester' | 'jose') => {
    const accounts = getStoredUserAccounts();
    let target = null;
    if (type === 'admin') {
      target = accounts.find(a => a.role === 'asesor');
    } else if (type === 'lester') {
      target = accounts.find(a => a.username === 'lester' || a.name.toLowerCase().includes('lester'));
    } else if (type === 'jose') {
      target = accounts.find(a => a.username === 'jose' || a.name.toLowerCase().includes('jose'));
    }
    if (target) {
      setIdentifier(target.username);
      setPassword(target.password);
      setErrorMessage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex flex-col justify-center items-center p-4 sm:p-6 text-slate-100 antialiased selection:bg-amber-400 selection:text-slate-950">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand & Logo Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20 ring-4 ring-white/10">
            <GraduationCap size={36} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Sistema de Gestión de Tesis
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Control de Avance, Asesorías y Matriz de Consistencia
            </p>
          </div>
        </div>

        {/* Login Box */}
        <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock size={18} className="text-indigo-600" />
              <span>Iniciar Sesión</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ingresa tus credenciales autorizadas para acceder al proyecto
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in">
              <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Usuario o Correo Institucional
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Ej. admin o tesista"
                  autoComplete="username"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-sm text-indigo-600 border-slate-300 focus:ring-indigo-500"
                />
                <span>Recordar sesión</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-slate-900/10 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Ingresar al Sistema</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Credentials */}
          <div className="pt-2 border-t border-slate-100 space-y-2.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
              Accesos Rápidos Demo (1 Clic)
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className="p-2.5 bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200/80 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-900">👑 Asesor: Ing. Aurelio Tacuri Urquizo</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-amber-400 text-slate-950 font-bold">Llenar</span>
                </div>
                <div className="text-[10px] text-amber-700/90 mt-0.5 font-mono">
                  admin / admin123 <span className="text-amber-500 font-sans">(Control total y gestión de tesistas)</span>
                </div>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickFill('lester')}
                  className="p-2.5 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/80 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-blue-900">🎓 Tesista: Lester</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-blue-600 text-white font-bold">Llenar</span>
                  </div>
                  <div className="text-[10px] text-blue-700/90 mt-0.5 font-mono">
                    lester / lester123
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('jose')}
                  className="p-2.5 bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-200/80 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-indigo-900">🎓 Tesista: Jose</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-indigo-600 text-white font-bold">Llenar</span>
                  </div>
                  <div className="text-[10px] text-indigo-700/90 mt-0.5 font-mono">
                    jose / jose123
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Roles Details Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-slate-300 space-y-2 backdrop-blur-xs">
          <div className="font-bold text-white flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Niveles de Acceso por Rol</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400">
            <div>
              <span className="font-semibold text-amber-300">Modo Asesor (Admin):</span> Control de porcentajes, aprobación de visibilidad, creación de observaciones oficiales y enlace a Supabase.
            </div>
            <div>
              <span className="font-semibold text-blue-300">Modo Tesista:</span> Visualización del estado del proyecto desde el celular o laptop y registro de consultas al asesor.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

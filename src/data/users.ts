import { UserSession, UserAccount } from '../types/thesis';

export const INITIAL_USER_ACCOUNTS: UserAccount[] = [
  {
    id: 'user-asesor',
    username: 'admin',
    password: 'admin123',
    name: 'Ing. Aurelio Tacuri Urquizo',
    email: 'aurelio.tacuriurquizo@gmail.com',
    role: 'asesor',
    title: 'Director de Tesis / Asesor Principal (Modo Admin)',
    avatarInitials: 'AT'
  },
  {
    id: 'user-lester',
    username: 'lester',
    password: 'lester123',
    name: 'Lester',
    email: 'lester@tesis.edu',
    role: 'tesista',
    title: 'Tesista / Estudiante',
    avatarInitials: 'LE'
  },
  {
    id: 'user-jose',
    username: 'jose',
    password: 'jose123',
    name: 'Jose',
    email: 'jose@tesis.edu',
    role: 'tesista',
    title: 'Tesista / Estudiante',
    avatarInitials: 'JO'
  }
];

export const PRESET_USERS: UserSession[] = INITIAL_USER_ACCOUNTS.map(u => ({
  id: u.id,
  name: u.name,
  email: u.email,
  role: u.role,
  title: u.title,
  avatarInitials: u.avatarInitials
}));

export function getStoredUserAccounts(): UserAccount[] {
  if (typeof window === 'undefined') return INITIAL_USER_ACCOUNTS;
  try {
    const saved = localStorage.getItem('thesis_auth_accounts');
    if (!saved) return INITIAL_USER_ACCOUNTS;
    const parsed: UserAccount[] = JSON.parse(saved);
    // Ensure all default users exist even if storage had partial or old names
    const merged = INITIAL_USER_ACCOUNTS.map(def => {
      const match = parsed.find(p => p.id === def.id || p.username === def.username);
      return match ? { ...def, ...match, name: def.name, role: def.role } : def;
    });

    // Also include any dynamically added users
    parsed.forEach(p => {
      if (!merged.some(m => m.id === p.id)) {
        merged.push(p);
      }
    });

    return merged;
  } catch (e) {
    return INITIAL_USER_ACCOUNTS;
  }
}

export function saveStoredUserAccounts(accounts: UserAccount[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('thesis_auth_accounts', JSON.stringify(accounts));
}

export function verifyCredentials(identifier: string, pass: string): { user: UserSession | null; error?: string } {
  const accounts = getStoredUserAccounts();
  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = pass.trim();

  const found = accounts.find(
    acc => 
      acc.username.toLowerCase() === cleanId || 
      acc.email.toLowerCase() === cleanId ||
      (acc.id === 'user-asesor' && cleanId === 'aurelio')
  );

  if (!found) {
    return { user: null, error: 'El usuario o correo electrónico ingresado no existe.' };
  }

  if (found.password !== cleanPass) {
    return { user: null, error: 'Contraseña incorrecta. Inténtalo de nuevo.' };
  }

  return {
    user: {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
      title: found.title,
      avatarInitials: found.avatarInitials
    }
  };
}

export function updateUserPassword(userId: string, newPass: string): boolean {
  if (!newPass || newPass.length < 4) return false;
  const accounts = getStoredUserAccounts();
  const updated = accounts.map(acc => acc.id === userId ? { ...acc, password: newPass } : acc);
  saveStoredUserAccounts(updated);
  return true;
}

export function addNewUserAccount(account: UserAccount): void {
  const accounts = getStoredUserAccounts();
  if (!accounts.some(a => a.id === account.id || a.username === account.username)) {
    accounts.push(account);
    saveStoredUserAccounts(accounts);
  }
}



const ADMIN_KEY = "yunora-admin-2026";
const STORAGE_KEY = "yunora_admin_session";
const CREDENTIALS = { username: "YunoraAdmin", password: "Yunora@2026" };

export interface AdminSession {
  username: string;
  loginAt: string;
}

export function adminLogin(username: string, password: string): boolean {
  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    const session: AdminSession = { username, loginAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function adminLogout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getAdminSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAdminLoggedIn(): boolean {
  return getAdminSession() !== null;
}

export function getAdminHeaders(): Record<string, string> {
  return {
    "x-admin-key": ADMIN_KEY,
    "Content-Type": "application/json",
  };
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
export const API_BASE = `${BASE}/api`;

export async function adminFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...getAdminHeaders(),
      ...(options?.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

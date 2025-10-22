import React from "react";

type AuthCtx = {
  token: string | null;
  setToken: (t: string | null) => void;
  logout: () => void;
};
const Ctx = React.createContext<AuthCtx>(null as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(() => localStorage.getItem("token"));
  const logout = () => { localStorage.removeItem("token"); setToken(null); };
}

export function useAuth() { return React.useContext(Ctx); }
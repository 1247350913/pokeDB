import { ComponentType, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { RoutesComponent } from "./routes";

import "../styles/index.css";

export type LoginCreds = { username: string; password: string };

export interface AppProps {
  onLogin: (creds: LoginCreds) => void | Promise<void>;
  onSignUp: (data: { username: string; email: string; password: string }) => void | Promise<void>;
  isAuthenticating?: boolean;
  authError?: string | null;
  RouterComponent?: ComponentType<{ children: ReactNode }>;
}

export function App({
  onLogin,
  onSignUp,
  isAuthenticating,
  authError,
  RouterComponent = BrowserRouter,
}: AppProps) {
  return (
    <RouterComponent>
      <RoutesComponent
        onLogin={onLogin}
        onSignUp={onSignUp}
        isAuthenticating={!!isAuthenticating}
        authError={authError ?? null}
      />
    </RouterComponent>
  );
};

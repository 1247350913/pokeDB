import { Routes, Route } from "react-router-dom";
import { SignIn } from "../screens/SignIn/SignIn";
import { Profile}  from "../screens/Profile/Profile";
import { Pokedex } from "../screens/Pokedex/Pokedex";
import { Signup } from "../screens/Signup/Signup";

import type { LoginCreds } from "./App";

export interface RoutesComponentProps {
  onLogin: (creds: LoginCreds) => void | Promise<void>;
  onSignUp: (data: { username: string; email: string; password: string }) => void | Promise<void>;
  isAuthenticating: boolean;
  authError: string | null;
}

export function RoutesComponent({
  onLogin,
  onSignUp,
  isAuthenticating,
  authError,
}: RoutesComponentProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SignIn
            onSubmit={onLogin}
            isLoading={isAuthenticating}
            error={authError}
          />
        }
      />
      <Route 
        path="/signup" 
        element={
          <Signup 
          onSubmit={onSignUp}
          />
        } 
      />
      <Route 
        path="/pokedex" 
        element={<Pokedex />} 
      />
      <Route 
        path="/profile" 
        element={<Profile />} 
      />
    </Routes>
  );
}

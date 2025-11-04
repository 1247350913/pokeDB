import { createRoot } from "react-dom/client";
import { useState } from "react";
import { App } from "@packages/app-ui";
import { HashRouter } from "react-router-dom";

declare global {
  interface Window {
    electronAPI: {
      login: (email: string, password: string) => Promise<void>;
      signup: (data: { username: string; email: string; password: string }) => Promise<void>;
    };
  }
}

function Root() {
  const [isAuthing, setIsAuthing] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const onLogin = async ({ username, password }: { username: string; password: string }) => {
    setAuthError(null);
    setIsAuthing(true);
    try {
      // if your login is email-based, map username->email here or change the login form
      await window.electronAPI.login(username, password);
    } catch (e) {
      setAuthError("Login failed.");
    } finally {
      setIsAuthing(false);
    }
  };

  const onSignUp = async (data: { username: string; email: string; password: string }) => {
    setAuthError(null);
    setIsAuthing(true);
    try {
      await window.electronAPI.signup(data);
      // show “check your email” message or navigate
    } catch (e) {
      setAuthError("Signup failed.");
    } finally {
      setIsAuthing(false);
    }
  };

  return (
    <App
      onLogin={onLogin}
      onSignUp={onSignUp}
      isAuthenticating={isAuthing}
      authError={authError}
      RouterComponent={HashRouter}
    />
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
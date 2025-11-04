import { useState } from "react";
import { Link } from "react-router-dom";

import "./SignIn.css";
import { Button, Input } from "@packages/ui";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ASSETS } from "../../lib/assets";  

export interface SignInProps {
  onSubmit: (creds: { username: string; password: string }) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export function SignIn({ onSubmit, isLoading, error }: SignInProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="sign-in__page">
      <Header/>
      <div className="sign-in__container">
        <div className="sign-in__card">
          <img src={ASSETS.logo} alt="pokeDB logo"/>
          <h1 className="sign-in__title">Sign In</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit({ username, password });
            }}
            className="sign-in__form"
          >
            <div>
              <p>Username</p>
              <Input
                type="text"
                placeholder="Icon"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
              />
            </div>
            <div>
              <p>Password</p>
              <Input
                type="password"
                placeholder="Icon"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>
            {error && <div className="login-error">{error}</div>}
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Login"}
            </Button>
          </form>

          <div className="login-signup">
            <div>
              Forgot your Username or Password?
            </div>
            <div>
              Don’t have an account?{" "}
              <Link to="/signup" className="login-signup-link">
                Click here to sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@packages/ui";
import "./Signup.css";

interface SignupProps {
  onSubmit: (data: {
    username: string;
    email: string;
    password: string;
  }) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

// Simple email format check (client-side convenience only)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Small presentational helper for checklist lines */
function ChecklistItem({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className={`pw-check ${ok ? "ok" : "nope"}`}>
      <span className="pw-check-icon" aria-hidden="true">
        {ok ? "✓" : "✕"}
      </span>
      <span className="pw-check-text">{label}</span>
    </div>
  );
}

export function Signup({ onSubmit, isLoading, error }: SignupProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [useEmailAsUsername, setUseEmailAsUsername] = useState(false);
  const [systemGenerated, setSystemGenerated] = useState(false);
  const [pwActive, setPwActive] = useState(false);

  const usernameValid =
    useEmailAsUsername ||
    systemGenerated ||
    username.trim().length > 0;

  const pwChecks = useMemo(() => {
    const length = password.length >= 8;
    const upper = /[A-Z]/.test(password);
    const lower = /[a-z]/.test(password);
    const digit = /\d/.test(password);
    const special = /[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]/.test(password);

    return { length, upper, lower, digit, special };
  }, [password]);

  const allPwValid =
    pwChecks.length && pwChecks.upper && pwChecks.lower && pwChecks.digit && pwChecks.special;

  const emailValid = emailRegex.test(email);
  const canSubmit = emailValid && usernameValid && allPwValid && !isLoading;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailValid) {
      setLocalError("Please enter a valid email address.");
      return;
    }
    if (!allPwValid) {
      setLocalError(
        "Password must be at least 8 characters and include an uppercase, lowercase, number, and symbol."
      );
      return;
    }

    setLocalError(null);
    let finalUsername = username.trim();

    if (useEmailAsUsername) {
    finalUsername = email;
    } else if (systemGenerated) {
    finalUsername = `user_${Math.random().toString(36).slice(2, 8)}`;
    }

    if (!finalUsername) {
    setLocalError("Please provide a username or select an alternative option.");
    return;
    }

    onSubmit({ username: finalUsername, email, password });
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Account</h1>
        <p> * You may only have 1 account per email address</p>
        <p> * Each username must be unique</p>
        <form onSubmit={handleSubmit} className="signup-form" noValidate>
          {/* Email field */}
          <label className="signup-label">
            Email<span className="required-asterisk">*</span>
          </label>
          <Input
            className={emailValid ? "is-valid" : "is-invalid"}
            type="email"
            placeholder="Email"
            value={email}
            required
            aria-invalid={!emailValid && email.length > 0}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          {/* Username field */}
          <label className="signup-label">
            Username<span className="required-asterisk">*</span>
          </label>

          <Input
            className={usernameValid ? "is-valid" : "is-invalid"}
            type="text"
            placeholder="Username"
            value={username}
            required={!useEmailAsUsername && !systemGenerated}
            disabled={useEmailAsUsername || systemGenerated}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
          <div className="username-options">
            <label className="username-option">
              <input
                type="checkbox"
                checked={useEmailAsUsername}
                onChange={(e) => {
                    setUseEmailAsUsername(e.target.checked);
                    if (e.target.checked) {
                    setSystemGenerated(false);
                    setUsername(""); // clear manual username
                    }
                }}
              />
              Use email address
            </label>
          <label className="username-option">
            <input
              type="checkbox"
              checked={systemGenerated}
              onChange={(e) => {
                setSystemGenerated(e.target.checked);
                if (e.target.checked) {
                setUseEmailAsUsername(false);
                setUsername(""); // clear manual username
                }
              }}
            />
            System generated
          </label>
        </div>
          {/* Password field */}
          <label className="signup-label">
            Password<span className="required-asterisk">*</span>
          </label>
          <Input
            className={allPwValid ? "is-valid" : "is-invalid"}
            type="password"
            placeholder="Password"
            value={password}
            required
            aria-describedby="password-requirements"
            onFocus={() => setPwActive(true)}
            onBlur={() => setPwActive(false)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          {/* Live password checklist */}
          {(pwActive) && (
          <div id="password-requirements" className="pw-checklist" aria-live="polite">
            <ChecklistItem ok={pwChecks.length} label="At least 8 characters" />
            <ChecklistItem ok={pwChecks.upper} label="At least 1 uppercase letter" />
            <ChecklistItem ok={pwChecks.lower} label="At least 1 lowercase letter" />
            <ChecklistItem ok={pwChecks.digit} label="At least 1 number" />
            <ChecklistItem ok={pwChecks.special} label="At least 1 symbol" />
          </div>
          )}

          {(localError || error) && <div className="signup-error">{localError || error}</div>}

          <Button variant="primary" type="submit" disabled={!canSubmit}>
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <div className="signup-login">
          Already have an account?{" "}
          <Link to="/" className="signup-login-link">
            Click here to log in
          </Link>
        </div>
      </div>
    </div>
  );
}
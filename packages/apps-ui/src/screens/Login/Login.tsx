import React from "react";
import { Button, Card, Input } from "@packages/ui";

function Login() {
  const [mode, setMode] = React.useState<"login"|"register">("login");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [err, setErr] = React.useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (mode === "register") { setMode("login"); return; }
  }

  return (
    <div style={{ padding: 24, display: "grid", placeItems: "center" }}>
      <Card title={mode === "login" ? "Login" : "Create Account"}>
        <form onSubmit={submit} style={{ display: "grid", gap: 8, minWidth: 280 }}>
          <Input />
          <Input />
          {err && <div style={{ color: "crimson" }}>{err}</div>}
        </form>
        <div style={{ marginTop: 8 }}>
          {mode === "login" ? (
            <a href="#" onClick={(e)=> (e.preventDefault(), setMode("register"))}>Create an account</a>
          ) : (
            <a href="#" onClick={(e)=> (e.preventDefault(), setMode("login"))}>Already have an account?</a>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Login;
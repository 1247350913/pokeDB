import { useState } from "react";


function Login({ }) {
  const [usernameE, setUsernameE] = useState("");
  const [passwordE, setPasswordE] = useState("");

  const handleLoginAttempt = () => {
  }

  return (
    <div className="screen--wrap login--wrap">
      <h1>Media Viewer</h1>
      <div className="login-section">
          <input
            className="login__username-input"
            placeholder="username"
            onChange={e => { setUsernameE(e.target.value)}}
          />
          <input
            className="login__password-input"
            placeholder="password"
            onChange={e => { setPasswordE(e.target.value)}}
          />
        </div>
      <button className="btn btn--login btn--sm btn--oval" onClick={handleLoginAttempt}>Login</button>
    </div>
  );
}

export default Login;
import React, { Suspense } from "react";
import { BrowserRouter, Link, useRoutes, Navigate } from "react-router-dom";

const Login = React.lazy(() => import("./screens/Login/Login"));
const Pokedex = React.lazy(() => import("./screens/Pokedex/Pokedex"));
const Profile = React.lazy(() => import("./screens/Profile/Profile"));
const PartyViewer = React.lazy(() => import("./screens/PartyViewer/PartyViewer"));

function Routes() {
  const token = null;
  return useRoutes([
    { path: "/", element: token ? <Navigate to="/pokedex" /> : <Login /> },
    { path: "/pokedex", element: token ? <Pokedex /> : <Navigate to="/" /> },
    { path: "/party", element: token ? <PartyViewer /> : <Navigate to="/" /> },
    { path: "/profile", element: token ? <Profile /> : <Navigate to="/" /> }
  ]);
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 12, borderBottom: "1px solid #eee", display: "flex", gap: 12 }}>
          <>
            <Link to="/pokedex">Pokedex</Link>
            <Link to="/party">Party Viewer</Link>
            <Link to="/profile">Profile</Link>
            <a href="#">Logout</a>
          </>
      </div>
      <Suspense fallback={<div style={{ padding: 16 }}>Loading…</div>}>
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
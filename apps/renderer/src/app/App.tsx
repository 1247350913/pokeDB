import React, { Suspense } from "react";
import { BrowserRouter, useRoutes, Link } from "react-router-dom";
import { routes } from "./routes";

function AppRoutes() {
  return useRoutes(routes);
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #eee" }}>
        <Link to="/login">Login</Link>
        <Link to="/browse">Browse</Link>
      </div>
      <Suspense fallback={<div style={{ padding: 16 }}>Loading…</div>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
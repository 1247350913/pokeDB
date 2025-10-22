import React from "react";
const Login = React.lazy(() => import("@screens/Login/Login"));
const Browse = React.lazy(() => import("@screens/Browse/Browse"));

export const routes = [
  { path: "/login", element: <Login /> },
  { path: "/browse", element: <Browse /> },
];

import React from "react";
import { createRoot } from "react-dom/client";
import App from "@app/App";
import "@assets/styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);
import "./index.css";
import { createRoot } from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import React from "react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
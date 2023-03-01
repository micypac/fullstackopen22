import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import DiagnosesProvider from "./context/DiagnosesContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DiagnosesProvider>
    <App />
  </DiagnosesProvider>
);

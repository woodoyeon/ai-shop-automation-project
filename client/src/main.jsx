import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App"; // ← 경로 수정!
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

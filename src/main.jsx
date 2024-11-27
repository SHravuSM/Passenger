import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';  // or the correct path to your CSS file
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/AuthContext";
ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthContext>
            <App />
        </AuthContext>
    </BrowserRouter>
);

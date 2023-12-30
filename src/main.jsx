import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Services from "./pages/Services";
import NavContextProvider from "./context/navContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NavContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NavContextProvider>
  </React.StrictMode>
);

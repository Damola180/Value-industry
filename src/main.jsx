import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Services from "./pages/Services";
import NavContextProvider from "./context/navContext";
import ProductDetail from "./product/productDetails";
import Cart from "./product/pgCart";
import NotFound from "./pages/NotFound";
import Success from "./product/success";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NavContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path=":id" element={<ProductDetail />} />
            <Route path="pgcart" element={<Cart />} />
          </Route>
          <Route path="successhhd5&0Q!!" element={<Success />} />

          <Route path="services" element={<Services />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </NavContextProvider>
  </React.StrictMode>
);

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Trade from "./screens/Trade";

export default function DefaultApp() {
  // return useRoutes([
  //   { path: "/", element: <Home /> },
  //   { path: "/trades", element: <Trade /> },
  // ]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trades" element={<Trade />} />
    </Routes>
  );
}

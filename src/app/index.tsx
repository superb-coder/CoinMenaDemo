import React from "react";
import {
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./screens/Home";
import Trade from "./screens/Trade";
import { setLocation, setNavigate } from "./routes/history";

export default function DefaultApp() {
  // return useRoutes([
  //   { path: "/", element: <Home /> },
  //   { path: "/trades", element: <Trade /> },
  // ]);
  setNavigate(useNavigate());
  setLocation(useLocation());

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/trades" element={<Trade />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return <Outlet />;
}

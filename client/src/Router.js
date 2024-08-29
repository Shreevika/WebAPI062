import { Routes, Route } from "react-router-dom";

import LoginPage from "./Container/Auth/Login";
import RegisterPage from "./Container/Auth/Register";
import HomePage from "./Container/Home";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default Router;

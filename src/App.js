import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainAdmin from "../src/pages/admin/MainAdmin";
import MainUser from "./pages/user/MainUser";

const App = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Routes>
          <Route path="/*" element={<MainUser />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pages/*" element={<MainAdmin />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

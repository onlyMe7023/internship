import "./App.css";
import { Route, Routes } from "react-router-dom";
import FillForm from "./pages/FillForm";
import Department from "./pages/Department";
import React from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const userName = JSON.parse(localStorage.getItem("UserName"));
    const userEmail = JSON.parse(localStorage.getItem("UserEmail"));
    const userPhone = JSON.parse(localStorage.getItem("UserPhone"));
    console.log(window.location.pathname);
    if (!userPhone || !userEmail || !userName) {
      navigate("/");
    } else {
      navigate("/department");
    }
  }, []);
  return (
    <>
      <div className="bg-gradient-to-r from-slate-300 bg-cover bg-center bg-no-repeat to-white w-full  min-h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={<FillForm />} />
          <Route path="/department" element={<Department />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

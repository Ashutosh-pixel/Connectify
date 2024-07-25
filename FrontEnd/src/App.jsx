import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContextProvider";

function App() {
  const { authuser } = useContext(AuthContext);
  // console.log(authuser);
  return (
    <div className="p-4 h-screen flex items-center justify-center bg-gray-800 select-none">
      <Routes>
        <Route
          path="/"
          element={authuser ? <Home></Home> : <Navigate to="/login"></Navigate>}
        ></Route>
        <Route
          path="/login"
          element={authuser ? <Navigate to="/"></Navigate> : <Login></Login>}
        ></Route>
        <Route
          path="/signup"
          element={authuser ? <Navigate to="/"></Navigate> : <SignUp></SignUp>}
        ></Route>
        <Route path="*" element={<div>400 ERROR</div>}></Route>
      </Routes>
    </div>
  );
}

export default App;

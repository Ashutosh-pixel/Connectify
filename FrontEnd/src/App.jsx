import "./App.css";
import SignUp from "./pages/SignUp";
import Login  from "./pages/Login";
import Home from './pages/Home';
import {Routes,Route} from "react-router-dom"

function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='*' element={<div>400 ERROR</div>}></Route>
      </Routes>
    </div>
  );
}

export default App;

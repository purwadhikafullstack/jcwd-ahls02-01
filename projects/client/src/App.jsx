import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import LandingPage from "./Pages/Users/LandingPage";
import Register from "./Pages/Users/Register";
// import ForgotPassword from "./Pages/Users/ForgotPassword";
// import Verification from "./Pages/Users/Verification";
// import LandingPage from '../src/Pages/Users/LandingPage';
// import RegisterPage from '../src/Pages/Users/RegisterPage';
// import ForgotPasswordPage from '../src/Pages/Users/ForgotPage';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

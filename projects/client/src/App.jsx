import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { keepLogin } from './Redux/Actions/userActions';
import LandingPage from "./Pages/Users/LandingPage";
import Register from "./Pages/Users/Register";
import NotFoundPage from "./Pages/Users/404";
import Verification from "./Pages/Users/Verification";

function App() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => {
    return {
      token: state.userReducers.token,
      role: state.userReducers.role
    }
  })

  console.log("token app.jsx", token)
  useEffect(() => {
    dispatch(keepLogin());
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
        {
          token ?
          <>
            <Route path='/verification/:token' element={<Verification />} />
            <Route path='/' element={<LandingPage />} />
          </>
        :
        <>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<Register />} />
        </>
        }
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

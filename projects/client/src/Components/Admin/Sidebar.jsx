import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch } from 'react-redux';
// import { forgotPassword } from "../redux/action/usersAction";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Text, Image, IconButton, Flex, Divider } from '@chakra-ui/react';
import logo2 from "../../Assets/DevImage/LogoMedhikaPutih.png";
import logo from "../../Assets/DevImage/LogoMedhika.png";
import { logoutAction } from "../../Redux/Actions/userActions";



const Sidebar=(props)=>{
  const [active, setActive] =React.useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeSidebar=()=>{
    setActive(!active)

  }
  const btnLogout=()=>{
    dispatch(logoutAction())
    navigate("/")
  }
  const btninventory=()=>{
    navigate(`/admin/productpage`)
 
  }
  const btncategory=()=>{
    navigate(`/admin/category`)
  }

  return( <div>
    <nav class="sidebarAdmin">
      <div class="py-3 d-flex justify-content-center" style={{borderBottom:"1px solid #586BB1"}}>
      <Image src={logo2} width='140px'/>
      </div>
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Transaction</a></li>
        <li onClick={btninventory}><a href="">Inventory</a></li>
        <li onClick={btncategory}><a href="">Category</a></li>
        <li><a href="#">Sales Report</a></li>
        <li><a href="#">Product History</a></li>
        <li onClick={btnLogout}><a href="#">Logout</a>
        </li>
      </ul>
    </nav>
  </div>
  )
}

export default Sidebar;
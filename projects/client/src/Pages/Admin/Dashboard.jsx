import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch } from 'react-redux'
// import { forgotPassword } from "../redux/action/usersAction";
import { useNavigate, useParams } from "react-router-dom";
import { Text, useMediaQuery, Image, IconButton, Flex, Box } from '@chakra-ui/react';
import logo2 from "../../Assets/DevImage/LogoMedhikaPutih.png"
import Sidebar from "../../Components/Admin/Sidebar";



const Dashboard=(props)=>{
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  return( <>
      <div class="container-fluid" >
        <div class="row">
        {
          isLargerThan1280 ?
            <>
              <div class="col-md-3 col-sm-5">
              <Sidebar />
            </div>
            <div class="col-md-9 col-sm-8">
              <div class="row">
                <div class="mt-3">
                  <Text class="h1b">Dashboard Admin Medhika</Text>
                </div>
              </div>
            </div>
            </>
        :
          <>
            <div class="col-4">
            <Sidebar />
          </div>
          <div class="col-8">
            <div class="row">
              <div class="mt-3">
                <Text class="h1b">Dashboard Admin Medhika</Text>
              </div>
            </div>
          </div>
          </>
        }
          {/* <div class="col-md-3 col-sm-5">
            <Sidebar />
          </div>
          <div class="col-md-9 col-sm-8">
            <div class="row">
              <div class="mt-3">
                <Text class="h1b">Dashboard Admin Medhika</Text>
              </div>
            </div>
          </div> */}
        </div>
      </div>
  </>
  )
}

export default Dashboard;
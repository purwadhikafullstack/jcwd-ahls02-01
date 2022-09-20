import React from "react";
// import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Text, Button, Spinner } from '@chakra-ui/react';


const NotFoundPage=(props)=>{
  const navigate = useNavigate();
  return <div class="container text-center">
    <div class="row mt-5">
      <div class="col-4">

      </div>
      <div class="col-4">
        <Text class="h5b mt-5 mb-5">Loading</Text>
        <Spinner
          thickness='6px'
          speed='0.65s'
          emptyColor='gray.200'
          color='#DE1B51'
          size='xl'
        />
        {/* <Button class="btn-def_second mt-3" onClick={() => navigate("/")}
          >Back to Landing Page</Button> */}
      </div>
      <div class="col-4">

      </div>
    </div>
  </div>
}

export default NotFoundPage;
import React from "react";
// import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Text, Button } from '@chakra-ui/react';

const NotFoundPage=(props)=>{
  const navigate = useNavigate();
  return <div class="container text-center">
    <div class="row mt-5">
      <div class="col-4">

      </div>
      <div class="col-4">
        <Text class="h5b mt-5">404 Not Found</Text>
        <Button class="btn-def_second mt-3" onClick={() => navigate("/")}
          >Back to Landing Page</Button>
      </div>
      <div class="col-4">

      </div>
    </div>
  </div>
}

export default NotFoundPage;
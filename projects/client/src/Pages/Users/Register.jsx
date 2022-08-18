import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import VectorRegister from "../../Assets/DevImage/Register.png";
import logo from "../../Assets/DevImage/LogoMedhika.png";
import NavbarComponent from "../../Components/Users/Navbar";
import { Flex, Box, Heading, Input, Image, Text, Divider, Spacer, ButtonGroup, Button, Link, extendTheme, InputGroup, InputLeftElement,
  InputRightElement, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Popover,
  PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter } from '@chakra-ui/react';
// import { PhoneIcon } from '@chakra-ui/icons'
import { BsTelephone } from 'react-icons/bs';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginAction } from "../../Redux/Actions/userActions";

const Register=()=>{

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [name, setName]=React.useState("")
  const [nomorHandphone, setNomorHandphone]=React.useState()
  const [email, setEmail]=React.useState("")
  const [password, setPassword]=React.useState("")
  const [passwordLength, setPasswordLength]=React.useState(false)
  const [containsNumbers, setContainsNumbers]=React.useState(false)
  const [isUpperCase, setIsUpperCase]=React.useState(false)
  const [confPassword, setConfPassword]=React.useState("")
  const { isOpen, onToggle, onClose } = useDisclosure()
  const toast = useToast()

  // console.log("name", name)
  // console.log("Nomor Handphone", nomorHandphone)
  // console.log("email", email)
  // console.log("password", password)
  // console.log("konfirmasi password", confPassword)

  const [inForm, setInForm] = React.useState({
    email: '',
    password: '',
    confPassword: ''
  })

  const handleRegister =async()=>{
    try {
      checkStrongPassword();
      if (name=="" || nomorHandphone=="" || email=="" || password=="" || confPassword==""){
        alert("Fill in all form")
      } else{
        if (password!=confPassword){
          alert("Password not match")
        } else if(email.includes("@")){
          let res = await Axios.post(`${API_URL}/users/`, {
            name: name,
            email: email,
            password: password,
            role: "user",
            nomorHandphone: nomorHandphone,
            profilepict: "https://sman11tangerangselatan.sch.id/images/user-u.jpg",
            status:"unverified"
          })
          console.log("res.data registerUser", res.data)
          if (res.data.token) {
            console.log("res.data", res.data)
            console.log("res.data.token", res.data.token)
            localStorage.setItem("tokenIdUser", res.data.token)
            dispatch(loginAction(res.data))
            toast({
              title: 'Registrasi Berhasil.',
              description: 'Verifikasi akun anda dengan link yang ada di email !',
              status: 'success',
              duration: 9000,
              position: 'top',
              isClosable: true,
            })
            navigate("/")
          }
        } else {
          alert("Email Wrong")
        }
      }    
    } catch (err) {
      alert(err.response.data.message)
  }
  }

  const handleInput = (value, property) => {
    setInForm({ ...inForm, [property]: value})
    checkUpperCase();
    checkNumbers();
    if(inForm.password.length > 6){
      setPasswordLength(true);
    } else {
      setPasswordLength(false)
    }
  }

  const checkStrongPassword =()=>{
    console.log(isUpperCase, containsNumbers, passwordLength)
    if(passwordLength== false || isUpperCase==false ||
      containsNumbers==false ){
        alert("Weak password")
  }
}

const checkUpperCase=()=>{
  if (inForm.password.match(/^(?=.*[A-Z])/)){
    setIsUpperCase(true)
  } else {
    setIsUpperCase(false)
  }
}

const checkNumbers=()=>{
  if (inForm.password.match(/\d+/g)){
    setContainsNumbers(true)
  } else {
    setContainsNumbers(false)
  }
}

  return(
    <>
    <Box boxShadow='md'>
      <NavbarComponent/>
    </Box>
    <div className="container">
      <div class="text-center mt-4">
        <Text class="h4">Mari daftarkan akun Anda !</Text>
        <Text class="h4">agar memudahkan saat transaksi obat</Text>
      </div>
      <div class="row mt-5">
        <div class="col-6">      
          <Image src={VectorRegister} width='75%' style={{marginLeft:"40px"}}/>
        </div>
        <div class="col-6"> 
          <div class="rounded-4" style={{backgroundColor:"#F6F8FC"}}>
            <Box padding={"20px"}>
              <Box>
                <Text class="h6b">Nama</Text>
                <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder='Nama Lengkap' onChange={(e)=>setName(e.target.value)} />
              </Box>
              <Box marginTop={"20px"}>
                <Text class="h6b">Nomor Handphone</Text>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<BsTelephone color='gray.300' />}
                  />
                  <Input bgColor={"#FFFFFF"} boxShadow='md' type='tel' placeholder='Phone number' onChange={(e)=>setNomorHandphone(e.target.value)} />
                </InputGroup>
              </Box>
              <Box marginTop={"20px"}>
                <Text class="h6b">Email</Text>
                <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder='contoh@mail.com' onChange={(e)=>setEmail(e.target.value)} />
              </Box>
              <Box marginTop={"20px"}>
                <Text class="h6b">Password</Text>
                  <InputGroup size='md'>
                    <Input bgColor={"#FFFFFF"} boxShadow='md'
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder='Masukan Password' onChange={(e) =>  { handleInput(e.target.value, "password"); setPassword(e.target.value)}}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                <div>
                  <div class="h6 mt-3">Password yang kuat setidaknya harus :</div>
                  <span class={passwordLength ? 'h6r' : 'h6'}> 8 huruf</span>
                  <span class="h6"> terdiri dari </span>
                  <span class={isUpperCase ? 'h6r' : 'h6'}>Huruf Kapital</span>
                  <span class="h6"> dan </span>
                  <span class={containsNumbers ? 'h6r' : 'h6'}>Angka</span>
                </div>
              </Box>
              <Box marginTop={"20px"}>
                <Text class="h6b">Konfirmasi Password</Text>
                  <InputGroup size='md'>
                    <Input bgColor={"#FFFFFF"} boxShadow='md'
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder='Masukan Konfirmasi Password' onChange={(e)=>setConfPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
              </Box>
                <Button style={{marginTop:"25px"}} class="btn-def_second" onClick={handleRegister}>Daftar Akun</Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register;
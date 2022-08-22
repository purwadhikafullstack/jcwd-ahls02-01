import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper"
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
import { useToastHook } from "../../Components/CustomToast";

const Register=()=>{

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [name, setName]=React.useState("");
  const [phone, setPhone]=React.useState();
  const [email, setEmail]=React.useState("");
  const [password, setPassword]=React.useState("");
  const [passwordLength, setPasswordLength]=React.useState(false);
  const [containsNumbers, setContainsNumbers]=React.useState(false);
  const [isUpperCase, setIsUpperCase]=React.useState(false);
  const [confirmPassword, setConfirmPassword]=React.useState("");
  const { isOpen, onToggle, onClose } = useDisclosure();
  const toast = useToast();
  const [loadingStat, setLoadingStat]=React.useState(false);
  const [currentToast, newToast]=useToastHook();

  console.log("name", name)
  console.log("Nomor Handphone", phone)
  console.log("email", email)
  console.log("password", password)
  console.log("konfirmasi password", confirmPassword)

  const [inForm, setInForm] = React.useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleRegister =async()=>{
    try {
      // setDisable(!disable)
      setLoadingStat(true)
      checkStrongPassword();
      if (name=="" || phone=="" || email=="" || password=="" || confirmPassword==""){
        // alert("Fill in all form")
        newToast({
          title: 'Registrasi Tidak Berhasil.',
          description: 'Mohon isi semua data registrasi',
          status: 'error',
        })
        setLoadingStat(false)
      } else{
        if (password!=confirmPassword){
          newToast({
            title: 'Registrasi Tidak Berhasil.',
            description: 'Konfirmasi password tidak sesuai dengan password',
            status: 'error',
          })
          setLoadingStat(false)
        } else if(email.includes("@")){
          let res = await Axios.post(`${API_URL}/users/register`, {
            name: name,
            email: email,
            password: password,
            role: "user",
            phone: phone,
            profilePicture: "https://sman11tangerangselatan.sch.id/images/user-u.jpg",
            isVerified:"unverified"
          })
          console.log("res.data registerUser", res.data)
          if (res.data.token) {
            newToast({
              title: 'Registrasi Berhasil.',
              description: 'Verifikasi akun melalui link yang dikirim ke email anda',
              status: 'success',
            })
            console.log("res.data FE", res.data)
            console.log("res.data.token FE", res.data.token)
            localStorage.setItem("tokenIdUser", res.data.token)
            dispatch(loginAction(res.data))
            setLoadingStat(false)
            // alert(`registration success,
            // verified your account with link verification in email`)
            // console.log("token2 regis", token)
            // setDisable(!disable)
            navigate("/")
          }
        } else {
          // alert("Email Wrong")
          newToast({
            title: 'Registrasi Tidak Berhasil.',
            description: 'Format email salah, mohon memasukan sesuai format email',
            status: 'error',
          })
          setLoadingStat(false)
          // setOpenToast(!openToast)
          // setToastMsg(`Email Wrong!`)
          // setDisable(!disable)
        }
      }    
    } catch (err) {
      // setOpenToast(!openToast)
      // setToastMsg(`${error.response.data.message}`)
      newToast({
        title: 'Registrasi Tidak Berhasil.',
        description: err.response.data.message,
        status: 'error',
      })
      setLoadingStat(false)
      // alert(err.response.data.message)
      // console.log(disable)
      // setDisable(!disable)
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
    // console.log("cek password.length",inForm.password.length)
    // console.log(inForm.password)
  }

  const checkStrongPassword =()=>{
    console.log(isUpperCase, containsNumbers, passwordLength)
    if(passwordLength== false || isUpperCase==false ||
      containsNumbers==false ){
        toast({
          title: 'Password Lemah.',
          description: 'Disarankan untuk merubah Password yang kuat. Setidaknya memiliki 8 Huruf yang terdiri dari Huruf Kapital dan Angka',
          status: 'warning',
          duration: 9000,
          position: 'top',
          isClosable: true,
        })
        // alert("Weak password")
        // setOpenToast(!openToast)
        // setToastMsg(`Weak Password !
        // plaase create strong password.`)
  }
}

const checkUpperCase=()=>{
  // console.log("cek uppercase", isUpperCase)
  if (inForm.password.match(/^(?=.*[A-Z])/)){
    setIsUpperCase(true)
  } else {
    setIsUpperCase(false)
  }
}

const checkNumbers=()=>{
  // console.log("cek number", containsNumbers)
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
    <div class="container">
      {/* <Image src={logo} width='10%' style={{marginLeft:"10px", marginTop:"25px"}}/> */}
      <div class="text-center mt-4">
        <Text class="h4">Mari daftarkan akun Anda !</Text>
        <Text class="h4">agar memudahkan saat transaksi obat</Text>
        {/* <Divider borderWidth={"1px"} borderColor={"#333333"} style={{marginTop:"15px"}}/> */}
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
                    // BsTelephone
                    children={<BsTelephone color='gray.300' />}
                  />
                  <Input bgColor={"#FFFFFF"} boxShadow='md' type='tel' placeholder='Phone number' onChange={(e)=>setPhone(e.target.value)} />
                </InputGroup>
              </Box>
              <Box marginTop={"20px"}>
                <Text class="h6b">Email</Text>
                <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder='contoh@mail.com' onChange={(e)=>setEmail(e.target.value)} />
              </Box>
              <Box marginTop={"20px"}>
              {/* <Popover
                returnFocusOnClose={false}
                isOpen={isOpen}
                // onClose={onClose}
                placement='left'
                closeOnBlur={false}
              > */}
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
                {/* <PopoverTrigger>
                </PopoverTrigger>
                <PopoverContent boxShadow='md'>
                  <PopoverHeader bgColor={"#DE1B51"} fontWeight='bold' color={"#FFFFFF"}>Password Anda Lemah !</PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton color={"#FFFFFF"} onClick={onToggle} />
                  <PopoverBody fontWeight='semibold' color={"#DE1B51"}>
                    Dalam membuat password setidaknya miliki 1 Huruf Kapital, Kombinasi Huruf Dengan Angka & 8 Huruf
                  </PopoverBody>
                </PopoverContent> */}
                <div>
                  <div class="h6 mt-3">Password yang kuat setidaknya harus :</div>
                  <span class={passwordLength ? 'h6r' : 'h6'}> 8 huruf</span>
                  <span class="h6"> terdiri dari </span>
                  <span class={isUpperCase ? 'h6r' : 'h6'}>Huruf Kapital</span>
                  <span class="h6"> dan </span>
                  <span class={containsNumbers ? 'h6r' : 'h6'}>Angka</span>
                </div>
              {/* </Popover> */}
              </Box>
              <Box marginTop={"20px"}>
                <Text class="h6b">Konfirmasi Password</Text>
                  <InputGroup size='md'>
                    <Input bgColor={"#FFFFFF"} boxShadow='md'
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder='Masukan Konfirmasi Password' onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
              </Box>
                <Button isLoading={loadingStat} loadingText='Loading' style={{marginTop:"25px"}}
                class="btn-def_second" onClick={handleRegister}>Register</Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register;
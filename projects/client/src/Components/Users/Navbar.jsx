import React from "react";
import Axios from "axios";
import logo from "../../Assets/DevImage/LogoMedhika.png";
import { Flex, Box, Heading, Input, Image, Spacer, ButtonGroup, Button, Link, Menu, MenuButton,
  MenuGroup, MenuList, MenuDivider, MenuItem, Text} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDisclosure, useToast } from '@chakra-ui/react';
import { logoutAction } from "../../Redux/Actions/userActions";
import Modal from "../../Components/Users/ModalLogin";
import { API_URL } from "../../helper";
import { IoCart, IoCloseCircle } from 'react-icons/io5';
import { FaUser, FaUserSlash, FaUserCircle } from 'react-icons/fa';
import { loginAction } from "../../Redux/Actions/userActions";
import { useToastHook } from "../../Components/CustomToast";


const NavbarComponent = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast()
  const [show, setShow] = React.useState(false);
  const [currentToast, newToast]=useToastHook();
  const {isVerified, users, role, name, profilePicture, token}=useSelector((state) => {
    return {
        isVerified:state.userReducers.isVerified,
        role:state.userReducers.role,
        users:state.userReducers.users,
        name:state.userReducers.name,
        profilePicture:state.userReducers.profilePicture,
        token:state.userReducers.token
        }
    })

    const handleReVerified = async () =>{
      try {
          let token = localStorage.getItem("tokenIdUser");
          let res = await Axios.get(`${API_URL}/users/reverified`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          console.log("resdata reverify",res.data.token)
          if (res.data.token){
              localStorage.setItem("tokenIdUser", res.data.token)
              dispatch(loginAction(res.data))
              newToast({
                title: 'Resend Verifikasi Berhasil.',
                description:'Verifikasi akun anda dengan link yang ada di email',
                status: 'success',
              })
          }
      } catch (err) {
        newToast({
          title: 'Resend Verifikasi Tidak Berhasil.',
          description: err.response.data.message,
          status: 'error',
        })
      }
  }

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");
  };

  const btnCart = async()=>{
    try {
      if (isVerified == 'verified'){
        navigate("/cart")
      } else if (isVerified == 'unverified') {
        newToast({
          title: 'Akun Tidak Terverifikasi.',
          description: 'Mohon untuk verifikasi akun di email anda. agar memudahkan saat transaksi di Medhika',
          status: 'warning',
        })
      } else {
        newToast({
          title: 'Anda Belum Login',
          description: 'Anda harus login agar bisa transaksi di Medhika',
          status: 'warning',
        })
        setShow(!show)
      }
    } catch (err) {
      newToast({
        title: 'Error.',
        description: 'Coba refresh browser anda',
        status: 'error',
      })
    }
  }

    console.log("S T A T U S Navb", isVerified)
    console.log("profilePicture", profilePicture)
  return (
    <Box bg='white'>
      <div class="container">
        <Flex minWidth='max-content' alignItems='center' gap='5' mt={2} mb={2}>
          <Box p='2'>
            <Link href='/'>
              <Image src={logo} width='130px'/>
            </Link>
          </Box>
          <Spacer />
          {
            name?
            <Box>
              {
                role == 'user' ?
                <Box>
                  {
                    isVerified == 'unverified' ?
                      <div class="row">
                        <div class="col-6">
                          <IoCart onClick={btnCart} style={{ cursor:"pointer", fontSize: 30, color:"#DE1B51", marginRight:"5px" }}/>
                          <Modal style={{color: "#000000"}} onClose={() => setShow(!show)} show={show} />
                        </div>
                        <div class="col-6">
                        <Menu>
                          <MenuButton>
                          <Image
                            borderRadius='full'
                            boxSize='35px'
                            src={profilePicture}
                            alt='Foto Profile'
                          />
                          </MenuButton>
                          <MenuList>
                            <MenuGroup title='User Tidak Terverifikasi'>
                              <MenuItem onClick={handleReVerified}>Kirim Ulang Verifikasi</MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title='Pengaturan Akun'>
                              <MenuItem onClick={handleLogout}>Keluar</MenuItem>
                            </MenuGroup>
                          </MenuList>
                        </Menu>
                        </div>
                      </div>
                    :
                      <div class="row">
                        <div class="col-6">
                        <IoCart onClick={btnCart} style={{ cursor:"pointer", fontSize: 30, color:"#DE1B51", marginRight:"5px" }}/>
                        </div>
                        <div class="col-6">
                        <Menu>
                          <MenuButton>
                          <Image
                            borderRadius='full'
                            boxSize='35px'
                            src={profilePicture}
                            alt='Foto Profile'
                          />
                        </MenuButton>
                        <MenuList>
                          <MenuGroup title='Profile'>
                            <MenuItem onClick={()=> navigate("/editProfile")}>Edit Profile</MenuItem>
                            <MenuItem>Add Address</MenuItem>
                            <MenuItem onClick={()=> navigate("/changePassword")}>Change Password</MenuItem>
                          </MenuGroup>
                          <MenuDivider />
                          <MenuGroup title='Pengaturan Akun'>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                          </MenuGroup>
                        </MenuList>
                      </Menu>
                      </div>
                    </div>
                  }
                </Box>
              :
                <div class="row">
                  <div class="col-6">
                  <IoCart onClick={btnCart} style={{ cursor:"pointer" ,fontSize: 30, color:"#DE1B51", marginRight:"5px" }}/>
                  </div>
                  <div class="col-6">
                  <Menu>
                    <MenuButton>
                    <Image
                      borderRadius='full'
                      boxSize='35px'
                      src={profilePicture}
                      alt='Foto Profile'
                    />
                    </MenuButton>
                    <MenuList>
                      <MenuGroup title='Dashboard'>
                        <MenuItem onClick={()=> navigate("/admin/dashboard")}>Dashboard Admin</MenuItem>
                      </MenuGroup>
                      <MenuDivider />
                      <MenuGroup title='Pengaturan Akun'>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                  </div>
                </div>
              }
            </Box>
          :
            <ButtonGroup gap='2'>
                <Button class="btn-def" onClick={() => setShow(!show)}>Login</Button>
                  <Modal style={{color: "#000000"}} onClose={() => setShow(!show)} show={show} />
                <Button class="btn-def" onClick={()=> navigate("/register")}>Register</Button>
            </ButtonGroup>
          }
        </Flex>
      </div>
    </Box>
  )
}

export default NavbarComponent;
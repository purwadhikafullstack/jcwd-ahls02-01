import React from "react";
import Axios from "axios";
import logo from "../../Assets/DevImage/LogoMedhika.png"
import { Flex, Box, Heading, Input, Image, Spacer, ButtonGroup, Button, Link, Menu, MenuButton,
  MenuGroup, MenuList, MenuDivider, MenuItem, Text} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../Redux/Actions/userActions";
// import Modal from "../../Components/Users/ModalLogin"
import { IoCart, IoCloseCircle } from 'react-icons/io5'
import { FaUser, FaUserSlash, FaUserCircle } from 'react-icons/fa'


const NavbarComponent = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const {status, users, name, profilePicture, token}=useSelector((state) => {
    return {
        status:state.userReducers.status,
        users:state.userReducers.users,
        name:state.userReducers.name,
        profilePicture:state.userReducers.profile_picture,
        token:state.userReducers.token
        }
    })

    console.log("profile_picture", profilePicture)
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
              status == 'unverified' ?
                <div class="row">
                  <div class="col-6">
                  <IoCart style={{ fontSize: 30, color:"#DE1B51", marginRight:"5px" }}/>
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
                        <MenuItem>Kirim Ulang Verifikasi</MenuItem>
                      </MenuGroup>
                      <MenuDivider />
                      <MenuGroup title='Pengaturan Akun'>
                        <MenuItem onClick={()=>dispatch(logoutAction())}>Keluar</MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                  </div>
                </div>
              :
              <>
                <IoCart style={{ fontSize: 30, color:"#DE1B51", marginRight:"5px" }}/>
                <Menu>
                  <MenuButton>
                    <FaUserCircle style={{ fontSize: 27, color:"#DE1B51", marginRight:"5px" }}/>
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title='Profile'>
                      <MenuItem>Ubah Data Profile</MenuItem>
                      <MenuItem>Tambah Alamat Pengiriman </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title='Pengaturan Akun'>
                      <MenuItem>Keluar</MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </>
              }
            </Box>
            :
            <ButtonGroup gap='2'>
                <Button class="btn-def" onClick={() => setShow(!show)}>Masuk</Button>
                  {/* <Modal style={{color: "#000000"}} onClose={() => setShow(!show)} show={show} /> */}
                <Button class="btn-def" onClick={()=> navigate("/register")}>Daftar</Button>
            </ButtonGroup>
          }
        </Flex>
      </div>
    </Box>
  )
}

export default NavbarComponent;
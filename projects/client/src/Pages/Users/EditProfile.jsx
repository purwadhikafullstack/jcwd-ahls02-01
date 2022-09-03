import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useDisclosure, useToast, useEditableControls } from '@chakra-ui/react';
import { loginAction } from "../../Redux/Actions/userActions";
import { Text, Button, Input, Box, Image, InputGroup, Flex, IconButton, Editable, EditablePreview, EditableInput,
          ButtonGroup, Select, useMediaQuery} from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';
import { HiCheck } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";

const EditProfile=(props)=>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast()
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
  const [isLargerThan720] = useMediaQuery('(min-width: 720px)')
  const [loadingStat, setLoadingStat]=React.useState(false);
  const [currentToast, newToast]=useToastHook();
  const {isVerified, email, gender, birthDate, birthDateFE, idUser, name, profilePicture, token}=useSelector((state) => {
    return {
        isVerified:state.userReducers.isVerified,
        email:state.userReducers.email,
        gender:state.userReducers.gender,
        birthDate:state.userReducers.birthDate,
        birthDateFE:state.userReducers.birthDateFE,
        idUser:state.userReducers.idUser,
        name:state.userReducers.name,
        profilePicture:state.userReducers.profilePicture,
        token:state.userReducers.token
        }
    })

  const [nameEdit, setNameEdit]=React.useState("")
  const [emailEdit, setEmailEdit]=React.useState("")
  const [genderEdit, setGenderEdit]=React.useState("")
  const [birthDateEdit, setBirthDateEdit]=React.useState("")
  const inputFile = React.useRef(null);
  const [previewPost, setPreviewPost] = React.useState(false)
  const [editProfile, setEditProfile] = React.useState(false)
  const [file, setFile] = React.useState();
  const [imageProfile, setImageProfile] = React.useState([]);
  // const [emailProfile, setEmailProfile]=React.useState(email)

  // console.log("username", usernameProfile, "fullname",fullnameProfile, "bio", bioProfile)
  // console.log("fullname",fullnameProfile != "")
  // console.log("username",usernameProfile != "")
  // console.log("bio",bioProfile != "")
  // console.log("check imgPosting edit foto",imgPosting)
  
  const handleProfilePicture = async()=>{
    try {
      console.log("check idUser", idUser)
      // alert('check')
      let idUserLogin = idUser
      let formData = new FormData()
        let data = {
          idUserLogin
        }
      console.log('data edit foto', data)
      // menambahkan data kedalam formData yang harus pake JSON.stringify
      formData.append('data', JSON.stringify(data));
  
      // menambahkan images
      imageProfile.forEach(val=>formData.append('Profile', val));
      let token = localStorage.getItem("tokenIdUser");
      // console.log("resPosting edit foto", resPosting.data)
      // console.log("token edit foto", token)
      // alert('token')
      let res = await Axios.patch(`${API_URL}/users/profilePicture`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      // let a = formData
      // console.log("resPosting edit foto", res.data)
      // alert('edit foto profile ke BE')
      if (res.data.token) {
        // console.log("RES DATA TOKEN LOGIN", res.data.token)
        localStorage.setItem("tokenIdUser", res.data.token)
        dispatch(loginAction(res.data.token))
      }
      // dispatch(getPostings())
  } catch (error) {
    console.log(error)
  }
}

const handleEditProfile=async()=>{
  try {
    setLoadingStat(true)
    if(previewPost==true){
          console.log("JALUR true jalan")
          
          if(nameEdit != "" || emailEdit !="" || genderEdit !="" || birthDateEdit !=""){
            console.log("previewPost true 1")
            let token = localStorage.getItem("tokenIdUser");
            let res = await Axios.patch(`${API_URL}/users/edit`, {
              name: nameEdit,
              email: emailEdit,
              gender: genderEdit,
              birthDate: birthDateEdit
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            if (res.data.token) {
              {handleProfilePicture()}
              // console.log("RES DATA TOKEN LOGIN", res.data.token)
              localStorage.setItem("tokenIdUser", res.data.token)
              dispatch(loginAction(res.data))
              setEditProfile(!editProfile)
              newToast({
                title: 'Edit Profile Berhasil.',
                description: 'Data pada profile anda sudah terupdate.',
                status: 'success',
              })
              setLoadingStat(false)
            }
          } else {
            console.log("JALUR true 2")
            let token = localStorage.getItem("tokenIdUser");
            let res = await Axios.patch(`${API_URL}/users/edit`, {
              name: nameEdit,
              email: emailEdit,
              gender: genderEdit,
              birthDate: birthDateEdit
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            if (res.data.token) {
              {handleProfilePicture()}
              // console.log("RES DATA TOKEN LOGIN", res.data.token)
              localStorage.setItem("tokenIdUser", res.data.token)
              dispatch(loginAction(res.data))
              setEditProfile(!editProfile)
              newToast({
                title: 'Edit Profile Berhasil.',
                description: 'Data pada profile anda sudah terupdate.',
                status: 'success',
              })
              setLoadingStat(false)
            }
            // {handleProfilePicture()}
          }
        } else {
          console.log("JALUR false 1")
          if(nameEdit != "" || emailEdit !="" || genderEdit !="" || birthDateEdit !=""){
            let token = localStorage.getItem("tokenIdUser");
            let res = await Axios.patch(`${API_URL}/users/edit`, {
              name: nameEdit,
              email: emailEdit,
              gender: genderEdit,
              birthDate: birthDateEdit
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            if (res.data) {
              console.log("RES DATA EDIT PROFILE", res.data)
              localStorage.setItem("tokenIdUser", res.data.token)
              dispatch(loginAction(res.data))
              newToast({
                title: 'Edit Profile Berhasil.',
                description: 'Data pada profile anda sudah terupdate.',
                status: 'success',
              })
              setLoadingStat(false)
              setEditProfile(!editProfile)
            }
          } 
        }
      } catch (err) {
        newToast({
          title: 'Edit Profile Tidak Berhasil.',
          description: err.response.data.message,
          status: 'error',
        })
        setLoadingStat(false)
      }
    } 

  const onButtonClick = () => {
    inputFile.current.click();
    setPreviewPost(!previewPost);
  };

  const handleFileUpload = (e) => {  
    setImageProfile([e.target.files[0]]);
    setFile(URL.createObjectURL(e.target.files[0]))
  };
  
  const handleCancel = () => {
    setEditProfile(!editProfile);
    setEmailEdit("");
  };

  console.log("check users", gender, birthDate, birthDateFE, editProfile)
  console.log("edit value", nameEdit, emailEdit, genderEdit, birthDateEdit)

  return (
    <>
    <Box
      w='100%'
      h='100%'
      bgGradient='linear(#f6f8fc, #FFFFFF)'
    >
    <Box boxShadow='md'>
      <NavbarComponent/>
    </Box>
      <div class="container">
      {
        editProfile == false ?
        <>
        <div class="row mt-5">
          <div class="d-flex justify-content-center">
            <img src={profilePicture} alt="Profile Picture" style={{ width:"15%", borderRadius:"50%"}} />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <div class="rounded-4 mt-5" style={{backgroundColor:"#edf0f4", paddingTop:"20px", cursor:"pointer"}}>
              <Flex ms={"40px"}>
                <Text class="h6b text-uppercase">{name}</Text>
              </Flex>
              <Flex mt={"10px"} ms={"40px"}>
                <Text class="h6">{email}</Text>
              </Flex>
              <Flex mt={"10px"} ms={"40px"}>
                <Text class="h6">{gender}</Text>
              </Flex>
              <Flex mt={"10px"} ms={"40px"}>
                <Text class="h6">{birthDateFE}</Text>
              </Flex>
              <Box mt={"10px"} ms={"40px"} pb={"20px"}>
                <FaRegEdit shadow={"md"} color="#DE1B51" size={'20px'} onClick={() => setEditProfile(!editProfile)}/>
              </Box>
            </div>
          </div>
          <div class="col-md-4"></div>
        </div>
        </>
      :
        <>
        <div class="row mt-5">
          <div class="d-flex justify-content-center">
            <input
              style={{ display: "none" }}
              ref={inputFile}
              onChange={(e)=> handleFileUpload (e)}
              type="file"
            />
            {
              previewPost == false ?
              <img src={profilePicture} onDoubleClick={onButtonClick}
                alt="Profile Picture" style={{cursor:"pointer", width:"15%", borderRadius:"50%"}} />
            :
              <img src={file} onDoubleClick={onButtonClick}
                alt="Profile Picture" style={{cursor:"pointer", width:"15%", borderRadius:"50%"}} />
            }
          </div>
        </div>
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <div class="rounded-4 mt-5" style={{backgroundColor:"#edf0f4", paddingTop:"20px"}}>
              <Flex ms={"40px"} me={"40px"}>
                <Input bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} fontWeight="bold" textTransform={"uppercase"}
                  onChange={(e)=>setNameEdit(e.target.value)} defaultValue={name} />
              </Flex>
              <Flex mt={"10px"} ms={"40px"} me={"40px"} >
                <Input bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"}
                  onChange={(e)=>setEmailEdit(e.target.value)} defaultValue={email} />
              </Flex>
              <Flex mt={"10px"} ms={"40px"} me={"40px"} boxShadow='md'>
                <Select placeholder='Gender' defaultValue={gender} bgColor={"#FFFFFF"} fontSize={"l"} 
                  onChange={(e)=>setGenderEdit(e.target.value)}>
                  <option>Pria</option>
                  <option>Wanita</option>
                </Select>
              </Flex>
              <Flex mt={"10px"} ms={"40px"} me={"40px"}>
                <Input type={"date"} bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} placeholder="YYYY-MM-DD"
                  onChange={(e)=>setBirthDateEdit(e.target.value)} defaultValue={birthDateFE} />
              </Flex>
              <ButtonGroup mt={"10px"} ms={"40px"} pb={"10px"}>
                <Button isLoading={loadingStat} class="btn-def_second2" onClick={handleEditProfile}>Submit</Button>
                <Button class="btn-def" onClick={handleCancel}>Cancel</Button>
              </ButtonGroup>
            </div>
          </div>
          <div class="col-md-4"></div>
        </div>
        </>
          }
          <div class="row mt-5 text-center" style={{borderBlockWidth:"2px", borderBlockColor:"#333333"}}>
            <br />
            <br />
            <br />
            <Text class="h5 mt-3">Address</Text>
          </div>
      </div>
    </Box>
    </>
  )
}

export default EditProfile;
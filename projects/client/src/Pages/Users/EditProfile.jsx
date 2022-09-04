import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useDisclosure, useToast, useEditableControls } from '@chakra-ui/react';
import { loginAction } from "../../Redux/Actions/userActions";
import { Text, Button, Input, Box, Image, InputGroup, Flex, IconButton, Editable, EditablePreview, EditableInput,
          ButtonGroup, Select, useMediaQuery, FormControl, FormLabel, Textarea, Checkbox, Spacer, Divider} from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';
import { HiCheck } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";
import { getAddress, getAddressActions } from "../../Redux/Actions/addressActions";
import ModalAddress from "../../Components/Users/ModalAddress";
import { getProvinceRajaOngkir, getProvinceActions2 } from "../../Redux/Actions/getProvinceActions";
import { getCityRajaOngkir } from "../../Redux/Actions/getCityActions";

const EditProfile=(props)=>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');
  const [isLargerThan720] = useMediaQuery('(min-width: 720px)');
  const [loadingStat, setLoadingStat]=React.useState(false);
  const [currentToast, newToast]=useToastHook();
  const [show, setShow] = React.useState(false);
  const [utama, setUtama] = React.useState(false);
  const [dataID, setDataID] = React.useState(0);

  React.useEffect(()=>{
    dispatch(getAddress())
    dispatch(getProvinceRajaOngkir())
    getProvinceRajaOngkir2()
  }, [])

  const {address, phone, email, gender, birthDateFE, idUser, name, profilePicture, token, getProvince, getProvince2, getCity}=useSelector((state) => {
    return {
        address:state.addressReducers.address,
        phone:state.userReducers.phone,
        email:state.userReducers.email,
        gender:state.userReducers.gender,
        birthDateFE:state.userReducers.birthDateFE,
        idUser:state.userReducers.idUser,
        name:state.userReducers.name,
        profilePicture:state.userReducers.profilePicture,
        token:state.userReducers.token,
        getProvince:state.getProvinceReducers.getProvince,
        getProvince2:state.getProvinceReducers.getProvince2,
        getCity:state.getCityReducers.getCity
        }
    });

  const [addLabel, setAddLabel]=React.useState("");
  const [addAlamat, setAddAlamat]=React.useState("");
  const [addProvinsi, setAddProvinsi]=React.useState("");
  const [addProvinsiId, setAddProvinsiId]=React.useState(0);
  const [addKota, setAddKota]=React.useState("");
  const [addKodePos, setAddKodePos]=React.useState("");
  const [addPenerima, setAddPenerima]=React.useState("");
  const [addTelfon, setAddTelfon]=React.useState("");
  const [addUtama, setAddUtama]=React.useState(false);
  const [nameEdit, setNameEdit]=React.useState("");
  const [emailEdit, setEmailEdit]=React.useState("");
  const [genderEdit, setGenderEdit]=React.useState("");
  const [birthDateEdit, setBirthDateEdit]=React.useState("");
  const inputFile = React.useRef(null);
  const [previewPost, setPreviewPost] = React.useState(false);
  const [editProfile, setEditProfile] = React.useState(false);
  const [addAddress, setAddAddress] = React.useState(false)
  const [file, setFile] = React.useState();
  const [imageProfile, setImageProfile] = React.useState([]);

  // console.log("username", usernameProfile, "fullname",fullnameProfile, "bio", bioProfile)
  // console.log("fullname",fullnameProfile != "")
  // console.log("username",usernameProfile != "")
  // console.log("bio",bioProfile != "")
  // console.log("check imgPosting edit foto",imgPosting)
  
  const handleProfilePicture = async()=>{
    try {
      console.log("check idUser", idUser);
      // alert('check')
      let idUserLogin = idUser;
      let formData = new FormData();
        let data = {
          idUserLogin
        }
      console.log('data edit foto', data);
      // menambahkan data kedalam formData yang harus pake JSON.stringify
      formData.append('data', JSON.stringify(data));
  
      // menambahkan images
      imageProfile.forEach(val=>formData.append('Profile', val));
      let token = localStorage.getItem("tokenIdUser");

      let res = await Axios.patch(`${API_URL}/users/profilePicture`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.data.token) {
        localStorage.setItem("tokenIdUser", res.data.token);
        dispatch(loginAction(res.data));
        setLoadingStat(false);
      }
  } catch (error) {
    newToast({
      title: 'Edit Profile Tidak Berhasil.',
      description: 'Profile Picture Max Size 1MB',
      status: 'error',
    });
    setFile(profilePicture);
    setLoadingStat(false);
  }
}

const handleEditProfile=async()=>{
  try {
    setLoadingStat(true);
    if(previewPost==true){
          console.log("JALUR true jalan");
          if(nameEdit != "" || emailEdit !="" || genderEdit !="" || birthDateEdit !=""){
            console.log("previewPost true 1");
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
            });
            if (res.data) {
              {handleProfilePicture()};
              localStorage.setItem("tokenIdUser", res.data.token);
              dispatch(loginAction(res.data));
              setEditProfile(!editProfile);
              newToast({
                title: 'Edit Profile Berhasil.',
                description: 'Data pada profile anda sudah terupdate.',
                status: 'success',
              });
              setLoadingStat(false);
            }
          } else {
            console.log("JALUR true 2");
              {handleProfilePicture()};
              setEditProfile(!editProfile);
          }
        } else {
          console.log("JALUR false 1");
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
            });
            if (res.data) {
              console.log("RES DATA EDIT PROFILE", res.data);
              localStorage.setItem("tokenIdUser", res.data.token);
              dispatch(loginAction(res.data));
              newToast({
                title: 'Edit Profile Berhasil.',
                description: 'Data pada profile anda sudah terupdate.',
                status: 'success',
              });
              setLoadingStat(false);
              setEditProfile(!editProfile);
            }
          } 
        }
      } catch (err) {
        newToast({
          title: 'Edit Profile Tidak Berhasil.',
          description: err.response.data.message,
          status: 'error',
        });
        setLoadingStat(false);
      }
    }
    
    const handleAddAddress =async(props)=>{
      try {
        setLoadingStat(true)
        if (addLabel =="" || addAlamat=="" || getProvince2.namaProvinsi==undefined || addKota=="" || addPenerima=="" || addTelfon==""){
          newToast({
            title: 'Tambah Alamat Tidak Berhasil.',
            description: 'Mohon isi semua data yang bertanda bintang *',
            status: 'error',
          })
          setLoadingStat(false)
        } else if (addTelfon.length < 11){
          newToast({
            title: 'Tambah Alamat Tidak Berhasil.',
            description: 'Isi nomor telfon penerima dengan nomor telfon aktif',
            status: 'error',
          })
          setLoadingStat(false)
        } else {
            let token = localStorage.getItem("tokenIdUser");
            let res = await Axios.post(`${API_URL}/address/addAddress`, {
              label: addLabel,
              address: addAlamat,
              province: getProvince2.namaProvinsi[0],
              city: addKota,
              postalCode: addKodePos,
              receiverName: addPenerima,
              receiverPhone: addTelfon,
              isDefaultAddress: addUtama
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            // console.log("res.data registerUser", res.data)
            if (res.data) {
              newToast({
                title: 'Tambah Alamat Berhasil.',
                description: 'Anda bisa atur alamat utama anda',
                status: 'success',
              })
              // console.log("res.data FE ADDRESS", res.data)
              dispatch(getAddressActions(res.data))
              setAddAddress(!addAddress)
              setAddUtama(false)
              // console.log("setAddUtama===>", addUtama)
              setLoadingStat(false)
            }
        }    
      } catch (err) {
        newToast({
          title: 'Tambah Alamat Tidak Berhasil.',
          description: err.response.data.message,
          status: 'error',
        })
        setLoadingStat(false)
      }
    }

    const handleCity = async(e) => {
      try {
        console.log("====addProvinsiId func", addProvinsiId)
        if (addProvinsiId > 0){
          let a = addProvinsiId
          // let b = !getCityOn
          let city = getCityRajaOngkir(a)
          dispatch(city)
          if (getCity){
            setAddKota(e.target.value)
            {getProvinceRajaOngkir2()}
          }
          // setGetCityOn(!getCityOn)
        } else {
          alert("else")
        }
      } catch (error) {
        alert(error)
      }
    }

    const getProvinceRajaOngkir2 = async() => {
      try {
        console.log("PROVINCE_ID ACTIONS 2", addProvinsiId)
        if (addProvinsiId > 0) {
          console.log("PROVINCE2 JALANNN")
          let res = await Axios.get(`${API_URL}/rajaOngkir/getProvince2`, {
            headers: {
              provinceid: addProvinsiId
            }
          })
          if (res.data) {
            console.log("RES DATA GET PROVINCE RAJAONGKIR", res.data)
            dispatch(getProvinceActions2(res.data))
          }
        }
      } catch (error) {
        console.log(error)
      }
  }

  const onButtonClick = () => {
    inputFile.current.click();
    setPreviewPost(true);
  };

  const handleFileUpload = (e) => {  
    setImageProfile([e.target.files[0]]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  
  const handleCancel = () => {
    setEditProfile(!editProfile);
    setEmailEdit("");
    setFile(profilePicture);
  };

  const printPrimaryAddress=()=>{
    return address.map((value ,index) =>{
      // console.log("value map address", value)
      if (value.isDefaultAddress == "true"){
        console.log("value.isDefaultAddress utama", value.isDefaultAddress == "true")
        return <>
          <div type="button" class="rounded-4 mt-2 d-inline" style={{backgroundColor:"#DE1B51", height:"200px", width:"48%", paddingTop:"0px", color:"#FFFFFF", marginLeft:"10px" }}
            onClick={() => {(setShow(!show)); (setDataID(value.idAddress)); (setUtama(true))}}>
            <br/>
            <Flex ms={"30px"} >
              <Text class="h6b text-uppercase" style={{color:"#FFFFFF"}}>{value.label}</Text>
              <Spacer />
              <Text class="h6b me-4" style={{color:"#FFFFFF"}}>Utama</Text>
            </Flex>
            <Divider />
            <Flex mt={"10px"} ms={"30px"} me={"30px"} >
              <Text class="h6" style={{color:"#FFFFFF"}}>{value.receiverName}</Text>
              <Spacer />
              <Text class="h6" style={{color:"#FFFFFF"}}>{value.receiverPhone}</Text>
            </Flex>
            <Flex mt={"10px"} ms={"30px"} me={"30px"} pb={"10px"}>
              <Text class="h6" style={{color:"#FFFFFF"}}>{value.address}, {value.city}, {value.province} {value.postalCode}</Text>
            </Flex>
          </div>
        </>
      }
    })
  }

  const printAddress=()=>{
    return address.map((value ,index) =>{
      console.log("value map address", value)
      if (value.isDefaultAddress != "true"){
        // console.log("value.isDefaultAddress utama", value.isDefaultAddress == "true")
        return <>
          <div type="button" class="rounded-4 mt-2 d-inline" style={{backgroundColor:"#edf0f4", height:"200px", paddingTop:"0px", width:"48%", color:"#333333", marginLeft:"10px"}}
            onClick={() => {(setShow(!show)); (setDataID(value.idAddress))}}>
            <br/>
            <Flex ms={"30px"}>
              <Text as='u' class="h6b text-uppercase">{value.label}</Text>
            </Flex>
            <Flex mt={"5px"} ms={"30px"} me={"30px"} >
              <Text class="h6" style={{color:"#333333"}}>{value.receiverName}</Text>
              <Spacer />
              <Text class="h6" style={{color:"#333333"}}>{value.receiverPhone}</Text>
            </Flex>
            <Flex mt={"10px"} ms={"30px"} me={"30px"} pb={"10px"}>
              <Text class="h6">{value.address}, {value.city}, {value.province} {value.postalCode}</Text>
            </Flex>
          </div>
        </>
      }
    })
  }

  console.log("check users", gender, birthDateFE, editProfile)
  console.log("edit value", nameEdit, emailEdit, genderEdit, birthDateEdit)

  return (
    <>
    <Box
      w='100%'
      h='100%'
      bgGradient='linear(#f6f8fc, #FFFFFF)'
    >
    <ModalAddress onClose={() => setShow(!show)} show={show} data={dataID} utama={utama} />
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
                alt="Upload Profile Picture" style={{cursor:"pointer", width:"15%", borderRadius:"50%"}} />
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
          <div class="row">
            <div class="col-md-2">
            </div>
            <div class="col-md-8">
              <div class="mt-5 text-center" style={{borderBlockWidth:"1px", borderBlockColor:"#333333"}}>
                <Text class="h5 mt-3">Address</Text>
              </div>
              <div class="mt-3">
                <div class="row">
                    {
                      addAddress == true?
                      <>
                      {/* <div class="col-md-1"></div> */}
                      <div class="col-md-12">
                        <div class="row d-flex justify-content-center">
                          <div class="col-md-5">
                            <p class="text-muted fw-light mb-2">
                              Kolom dengan tanda * tidak boleh kosong
                            </p>
                            <FormControl isRequired>
                              <FormLabel>Label</FormLabel>
                                <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder="Rumah / Kantor / Dll..." onChange={(e)=>setAddLabel(e.target.value)}/>
                              <FormLabel mt={4}>Nama Penerima</FormLabel>
                                <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder='Nama Penerima Paket' onChange={(e)=>setAddPenerima(e.target.value)}/>
                              <FormLabel mt={4}>Nomor Telfon Penerima</FormLabel>
                                <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder='08XXXXXXXXX' onChange={(e)=>setAddTelfon(e.target.value)}/>
                              <FormLabel mt={4}>Alamat</FormLabel>
                                <Textarea bgColor={"#FFFFFF"} boxShadow='md' placeholder="Alamat Lengkap" onChange={(e)=>setAddAlamat(e.target.value)}/>
                            </FormControl>
                          </div>
                          <div class="col-md-1"></div>
                          <div class="col-md-5">
                          {/* <FormControl as="select" ref={provRef} onChange={(e)=>setProvId(e.current.value)}>
                            <option value="pilih provinsi">Pilih Provinsi Tujuan</option>
                            {getProvince.data.map((p) => (
                              <option key={p.province_id} value={p.province_id}>
                                {p.province}
                              </option>
                            ))}
                          </FormControl> */}
                            <FormControl isRequired>
                              <FormLabel mt={8}>Provinsi</FormLabel>
                                <Select bgColor={"#FFFFFF"} boxShadow='md' placeholder='Pilih Provinsi' onChange={(e)=>setAddProvinsiId(e.target.value)}>
                                  {getProvince.data.map((p) => (
                                    <option key={p.province} id={p.province} value={p.province_id} >
                                      {p.province}
                                    </option>
                                  ))}
                                </Select>
                                {/* <Select bgColor={"#FFFFFF"} boxShadow='md' placeholder='Pilih Provinsi' onChange={(e)=>setAddProvinsi(e.target.value)}>
                                  <option>DKI Jakarta</option>
                                  <option>Bandung</option>
                                </Select> */}
                              <FormLabel mt={4}>Kota</FormLabel>
                              {
                                addProvinsiId > 0 ?
                                <Select bgColor={"#FFFFFF"} boxShadow='md' placeholder='Pilih Kota'
                                  onClick={handleCity}>
                                  {
                                    getCity.data &&
                                    getCity.data.map((k) => (
                                      <option key={k.city_id} value={k.city_name}>
                                        {k.city_name}
                                      </option>
                                    ))
                                  }
                                </Select>
                                :
                                <Select isDisabled bgColor={"#FFFFFF"} boxShadow='md' placeholder='Pilih Kota' >
                                </Select>
                              }
                                {/* <Select bgColor={"#FFFFFF"} boxShadow='md' placeholder='Pilih Kota' onChange={(e)=>setAddKota(e.target.value)}>
                                  <option>Jakarta Timur</option>
                                  <option>Jakarta Selatan</option>
                                </Select> */}
                            </FormControl>
                            <FormLabel mt={4}>Kode Pos</FormLabel>
                              <Input bgColor={"#FFFFFF"} boxShadow='md' placeholder="..." onChange={(e)=>setAddKodePos(e.target.value)}/>
                            <Checkbox mt={5} checked={addUtama} onChange={(e)=> {setAddUtama(e.target.checked)}}>
                              Alamat Utama
                            </Checkbox>
                            <div class="d-flex justify-content-end">
                              <ButtonGroup mt={6}>
                                <Button isLoading={loadingStat} class="btn-def_second2" onClick={handleAddAddress}>Submit</Button>
                                <Button class="btn-def" onClick={() => setAddAddress(!addAddress)}>Cancel</Button>
                              </ButtonGroup>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div class="col-md-1"></div> */}
                      </>
                      :
                      <>
                      <div class="col-md-12">
                        <div type="button" class="rounded-4 d-inline text-center" style={{backgroundColor:"#edf0f4", height:"200px", paddingTop:"25px", width:"48%", color:"#333333", marginLeft:"10px"}}
                          onClick={() => setAddAddress(!addAddress)}>
                            <br />
                              <div class="d-flex justify-content-center">
                                <IoMdAdd color="#bfc1c4" size={'40px'} />
                              </div>
                              <Text as='b' color={'#bfc1c4'}>Tambah Alamat Baru</Text>
                        </div>
                        {printPrimaryAddress()}
                        {printAddress()}
                      </div>
                      </>
                    }
                    <br />
                    <br />
                    <br />
                </div>
              </div>
            </div>
            <div class="col-md-2">
            </div>
          </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    </Box>
    </>
  )
}

export default EditProfile;
import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { Text, useMediaQuery, Box, Button, Flex, Divider, TableContainer, Table, TableCaption, Thead, Tbody, Tfoot,
        Tr, Th, Td, Input, Menu, MenuButton, MenuList, MenuItem, Spacer, MenuDivider} from '@chakra-ui/react';




const SalesReportByUser=(props)=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [laporanUser, setLaporanUser] = React.useState();
  const [sortirTotalPembeli, setSortirTotalPembeli] = React.useState(false);
  const [sortirTanggalPembeli, setSortirTanggalPembeli] = React.useState(false);
  const [searchUser, setSearchUser] = React.useState("");
  const [searchByUser, setSearchByUser] = React.useState();
  const [searchOn, setSearchOn]=React.useState(false);


  React.useEffect(()=>{
    getLaporanUser()
  }, [])

  console.log("LAPORAN USER", laporanUser)

  const getLaporanUser = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getLaporanUser`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        console.log("RES DATA GET LAPORAN USER", res.data)
        setLaporanUser(res.data)
      }
    } catch (error) {
      console.log(error)
    }
}

const handleSearch =async()=>{
  try {
    if(searchUser){
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.post(`${API_URL}/salesReport/getSearchUser`, {
        inputUser: searchUser
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        console.log("res.data SEARCH PRODUCT", res.data)
        setSearchByUser(res.data)
        setSearchOn(true)
        }
      } else {

      }
    } catch (err) {
  }
}

  const printLaporanUser = () => {
    if(searchOn == false){
      return laporanUser.map((value, index)=>{
        if (index % 2 == 0){
          return (
            <Tr>
              <Td>{index+1}</Td>
              <Td>{value.name}</Td>
              <Td>{value.email}</Td>
              <Td>{value.phone}</Td>
              <Td isNumeric>{value.totalTransaksiUser.toLocaleString()}</Td>
          </Tr>
          )
        } else {
          return (
            <Tr style={{backgroundColor:"#ebeef3"}}>
              <Td>{index+1}</Td>
              <Td>{value.name}</Td>
              <Td>{value.email}</Td>
              <Td>{value.phone}</Td>
              <Td isNumeric>{value.totalTransaksiUser.toLocaleString()}</Td>
            </Tr>
          )
        }
      })
    } else {
      return searchByUser.map((value, index)=>{
        if (index % 2 == 0){
          return (
            <Tr>
              <Td>{index+1}</Td>
              <Td>{value.name}</Td>
              <Td>{value.email}</Td>
              <Td>{value.phone}</Td>
              <Td isNumeric>{value.totalTransaksiUser.toLocaleString()}</Td>
            </Tr>
          )
        } else {
          return (
            <Tr style={{backgroundColor:"#ebeef3"}}>
              <Td>{index+1}</Td>
              <Td>{value.name}</Td>
              <Td>{value.email}</Td>
              <Td>{value.phone}</Td>
              <Td isNumeric>{value.totalTransaksiUser.toLocaleString()}</Td>
            </Tr>
          )
        }
      })
    }
  }
  console.log("search PRODUKKKK", searchUser)

  return( <>
    <div class="row mb-4 mt-4" style={{marginLeft:"10px", marginRight:"10px"}}>
      <div class="col-md-4">
        <Input bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} placeholder="Cari Nama Pembeli"
          onChange={(e)=>setSearchUser(e.target.value)}/>
      </div>
      <div class="col-md-8">
      <Flex>
            <Box mt={"3px"}>
                <Button class="btn-def_second2" onClick={handleSearch}>Cari</Button>
            </Box>
            {
              searchOn == true &&
            <Box mt={"3px"} ms={"10px"}>
              <Button class="btn-def" onClick={()=> {(setSearchOn(false));(setSearchUser(""))}}>Batal Cari</Button>
            </Box>
            }
            <Spacer/>
            <Menu>
                {({ isOpen }) => (
            <>
                <MenuButton isActive={isOpen} as={Button} size={"sm"} mt={"3px"} me={"25px"} width={"100px"} boxShadow={"md"}>
                    {isOpen ? 'Close' : 'Sortir'}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => setSortirTotalPembeli(false)}>Total Terkecil</MenuItem>
                    <MenuItem onClick={() => setSortirTotalPembeli(true)}>Total Terbesar</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => setSortirTanggalPembeli(false)}>Tanggal Terdekat</MenuItem>
                    <MenuItem onClick={() => setSortirTanggalPembeli(true)}>Tanggal Terjauh</MenuItem>
                    <MenuDivider />
                    <MenuItem >Batalkan Sortir</MenuItem>
                </MenuList>
            </>
                )}
            </Menu>
        </Flex>
      </div>
    </div>
    <Box ms={"20px"} me={"20px"}>
      <TableContainer borderRadius={"10px"} boxShadow={"md"}>
        <Table variant='simple'>
          <Thead>
            <Tr style={{backgroundColor:"#DE1B51", color:"#FFFFFF", height:"55px"}}>
              <Th style={{color:"#FFFFFF"}}>No</Th>
              <Th style={{color:"#FFFFFF"}}>Nama</Th>
              <Th style={{color:"#FFFFFF"}}>Email</Th>
              <Th style={{color:"#FFFFFF"}}>Telfon</Th>
              <Th isNumeric style={{color:"#FFFFFF"}}>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              laporanUser == undefined ?
              <div>
              </div>
            :
              printLaporanUser()
            }
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  </>
  )
}

export default SalesReportByUser;
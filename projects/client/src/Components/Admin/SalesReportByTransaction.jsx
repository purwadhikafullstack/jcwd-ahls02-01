import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { Text, useMediaQuery, Box, Button, Flex, Divider, TableContainer, Table, TableCaption, Thead, Tbody, Tfoot,
        Tr, Th, Td, Image, Input, Menu, MenuButton, MenuList, MenuItem, Spacer, MenuDivider} from '@chakra-ui/react';
import { useToastHook } from "../../Components/CustomToast";



const SalesReportByTransaction=(props)=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [salesByInvoice, setSalesByInvoice] = React.useState();
  const [sortirTotalTransaksi, setSortirTotalTransaksi] = React.useState(false);
  const [sortirTanggalTransaksi, setSortirTanggalTransaksi] = React.useState(false);
  const [searchInvoice, setSearchInvoice] = React.useState("");
  const [searchByInvoice, setSearchByInvoice] = React.useState();
  const [searchOn, setSearchOn]=React.useState(false);
  const [loadingStat, setLoadingStat]=React.useState(false);
  const [currentToast, newToast]=useToastHook();

  React.useEffect(()=>{
    getSalesByInvoice()
  }, [])

  console.log("PROFIT HARI INIIII", salesByInvoice)

  const getSalesByInvoice = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getSalesByInvoice`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        console.log("RES DATA GET SALES BY INVOICE", res.data)
        setSalesByInvoice(res.data)
      }
    } catch (error) {
      console.log(error)
    }
}

  const printSalesByInvoice = () => {
    if(searchOn == false){
      return salesByInvoice.map((value, index)=>{
        if (index % 2 == 0){
          return (
            <Tr>
              <Td>{index+1}</Td>
              <Td>{value.dateFE}</Td>
              <Td>{value.invoiceNumber}</Td>
              <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
            </Tr>
          )
        } else {
          return (
            <Tr style={{backgroundColor:"#ebeef3"}}>
              <Td>{index+1}</Td>
              <Td>{value.dateFE}</Td>
              <Td>{value.invoiceNumber}</Td>
              <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
            </Tr>
          )
        }
      })
    } else {
      return searchByInvoice.map((value, index)=>{
        if (index % 2 == 0){
          return (
            <Tr>
              <Td>{index+1}</Td>
              <Td>{value.dateFE}</Td>
              <Td>{value.invoiceNumber}</Td>
              <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
            </Tr>
          )
        } else {
          return (
            <Tr style={{backgroundColor:"#ebeef3"}}>
              <Td>{index+1}</Td>
              <Td>{value.dateFE}</Td>
              <Td>{value.invoiceNumber}</Td>
              <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
            </Tr>
          )
        }
      })
    }
  }
    
  const handleSearch =async()=>{
    try {
      if(searchInvoice){
        let token = localStorage.getItem("tokenIdUser");
        let res = await Axios.post(`${API_URL}/salesReport/getSearchInvoice`, {
          inputInvoice: searchInvoice
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (res.data) {
          console.log("res.data SEARCH INVOICE", res.data)
          setSearchByInvoice(res.data)
          setSearchOn(true)
          }
        } else {

        }
      } catch (err) {
    }
  }
  console.log("search invoice", searchInvoice)
  return( <>
    <div class="row mb-4" style={{marginLeft:"10px", marginRight:"10px"}}>
      <Text class="h6">Filter Tanggal</Text>
      <div class="col-md-3">
        <Input type={"date"} bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} />
      </div>
      <div class="col-md-3">
        <Input type={"date"} bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} />
      </div>
      <div class="col-md-6">
        <Button class="btn-def_second2">Filter</Button>
      </div>
      <div class="col-md-4 mt-4">
        <Input bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} placeholder="Cari Nomer Invoice"
          onChange={(e)=>setSearchInvoice(e.target.value)}/>
      </div>
      <div class="col-md-8 mt-4">
      <Flex>
            <Box mt={"3px"}>
                <Button class="btn-def_second2" onClick={handleSearch}>Cari</Button>
            </Box>
            {
              searchOn == true &&
            <Box mt={"3px"} ms={"10px"}>
              <Button class="btn-def" onClick={()=> setSearchOn(false)}>Batal Cari</Button>
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
                    <MenuItem onClick={() => setSortirTotalTransaksi(false)}>Total Terkecil</MenuItem>
                    <MenuItem onClick={() => setSortirTotalTransaksi(true)}>Total Terbesar</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => setSortirTanggalTransaksi(false)}>Tanggal Terdekat</MenuItem>
                    <MenuItem onClick={() => setSortirTanggalTransaksi(true)}>Tanggal Terjauh</MenuItem>
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
      <TableContainer borderRadius={"10px"}>
        <Table variant='simple'>
          <Thead>
            <Tr style={{backgroundColor:"#DE1B51", color:"#FFFFFF", height:"55px"}}>
              <Th style={{color:"#FFFFFF"}}>No</Th>
              <Th style={{color:"#FFFFFF"}}>Tanggal</Th>
              <Th style={{color:"#FFFFFF"}}>Nomer Invoice</Th>
              <Th isNumeric style={{color:"#FFFFFF"}}>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              salesByInvoice == undefined ?
              <div>
              </div>
            :
              printSalesByInvoice()
            }
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  </>
  )
}

export default SalesReportByTransaction;
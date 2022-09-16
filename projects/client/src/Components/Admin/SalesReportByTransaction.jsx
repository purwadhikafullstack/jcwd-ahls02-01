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
  const [laporanInvoiceTotalASC, setLaporanInvoiceTotalASC] = React.useState();
  const [laporanInvoiceTotalDSC, setLaporanInvoiceTotalDSC] = React.useState();
  const [laporanInvoiceTanggalASC, setLaporanInvoiceTanggalASC] = React.useState();
  const [laporanInvoiceTanggalDSC, setLaporanInvoiceTanggalDSC] = React.useState();
  const [sortirTotalASC, setSortirTotalASC] = React.useState(false);
  const [sortirTotalDSC, setSortirTotalDSC] = React.useState(false);
  const [sortirTanggalASC, setSortirTanggalASC] = React.useState(false);
  const [sortirTanggalDSC, setSortirTanggalDSC] = React.useState(false);
  const [searchInvoice, setSearchInvoice] = React.useState("");
  const [filterTanggalAwal, setFilterTanggalAwal] = React.useState("");
  const [filterTanggalAkhir, setFilterTanggalAkhir] = React.useState("");
  const [searchByInvoice, setSearchByInvoice] = React.useState();
  const [filterByInvoice, setFilterByInvoice] = React.useState();
  const [searchOn, setSearchOn]=React.useState(false);
  const [filterOn, setFilterOn]=React.useState(false);
  const [loadingStat, setLoadingStat]=React.useState(false);
  const [currentToast, newToast]=useToastHook();

  React.useEffect(()=>{
    getSalesByInvoice()
  }, [])

  console.log("PROFIT HARI INIIII", salesByInvoice)
  console.log("CHECK KONDISI", sortirTotalASC, sortirTotalDSC, sortirTanggalASC, sortirTanggalDSC)

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

const handleSortTotalASC =async()=>{
  try {
    setSortirTotalDSC(false)
    setSortirTanggalASC(false)
    setSortirTanggalDSC(false)
    setSortirTotalASC(true)
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getSalesByInvoiceTotalASC`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        console.log("RES DATA GET LAPORAN Invoice TotalASC", res.data)
        setLaporanInvoiceTotalASC(res.data)
      }
    } catch (err) {
  }
}

const handleSortTotalDSC =async()=>{
  try {
    setSortirTotalASC(false)
    setSortirTanggalASC(false)
    setSortirTanggalDSC(false)
    setSortirTotalDSC(true)
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getSalesByInvoiceTotalDSC`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        console.log("RES DATA GET LAPORAN Invoice TotalDSC", res.data)
        setLaporanInvoiceTotalDSC(res.data)
      }
    } catch (err) {
  }
}
const handleSortTanggalASC =async()=>{
  try {
    console.log("sortir tanggal ASC JALAN")
    setSortirTotalASC(false)
    setSortirTotalDSC(false)
    setSortirTanggalDSC(false)
    setSortirTanggalASC(true)
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getSalesByInvoiceTanggalASC`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        console.log("RES DATA GET LAPORAN Invoice TanggalASC", res.data)
        setLaporanInvoiceTanggalASC(res.data)
      }
    } catch (err) {
  }
}

const handleSortTanggalDSC =async()=>{
  try {
    console.log("sortir tanggal DSC JALAN")
    setSortirTotalASC(false)
    setSortirTotalDSC(false)
    setSortirTanggalASC(false)
    setSortirTanggalDSC(true)
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getSalesByInvoiceTanggalDSC`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        console.log("RES DATA GET LAPORAN Invoice TanggalDSC", res.data)
        setLaporanInvoiceTanggalDSC(res.data)
      }
    } catch (err) {
  }
}

  const printSalesByInvoice = () => {
    if(searchOn == true){
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
    } else if (filterOn == true){
      return filterByInvoice.map((value, index)=>{
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
    } else if (sortirTotalASC == true){
      if(laporanInvoiceTotalASC == undefined){
        return (
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        )
      } else {
        return laporanInvoiceTotalASC.map((value, index)=>{
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
    } else if (sortirTotalDSC == true){
      if(laporanInvoiceTotalDSC == undefined){
        return (
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        )
      } else{
        return laporanInvoiceTotalDSC.map((value, index)=>{
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
    } else if (sortirTanggalASC == true){
      if(laporanInvoiceTanggalASC == undefined){
        return (
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        )
      } else {
        return laporanInvoiceTanggalASC.map((value, index)=>{
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
    } else if (sortirTanggalDSC == true){
      if(laporanInvoiceTanggalDSC == undefined){
        return (
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
          </Tr>
        )
      } else{
        return laporanInvoiceTanggalDSC.map((value, index)=>{
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
    } else {
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

  const handleFilter =async()=>{
    try {
      if(filterTanggalAwal && filterTanggalAkhir){
        let token = localStorage.getItem("tokenIdUser");
        let res = await Axios.post(`${API_URL}/salesReport/getFilterInvoice`, {
          tanggalAwal: filterTanggalAwal,
          tanggalAkhir: filterTanggalAkhir
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (res.data) {
          console.log("res.data FILTER INVOICE", res.data)
          setFilterByInvoice(res.data)
          setFilterOn(true)
          }
        } else {

        }
      } catch (err) {
    }
  }

  const handleCancel = () => {
    setSortirTotalASC(false)
    setSortirTotalDSC(false)
    setSortirTanggalASC(false)
    setSortirTanggalDSC(false)
  };

  console.log("Tanggal Awal", filterTanggalAwal, "Akhir", filterTanggalAkhir)
  return( <>
    <div class="row mb-4" style={{marginLeft:"10px", marginRight:"10px"}}>
      <Text class="h6">Filter Tanggal</Text>
      <div class="col-md-3">
        <Input type={"date"} bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} 
          onChange={(e)=>setFilterTanggalAwal(e.target.value)}/>
      </div>
      <div class="col-md-3">
        <Input type={"date"} bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} 
          onChange={(e)=>setFilterTanggalAkhir(e.target.value)}/>
      </div>
      <div class="col-md-6">
        <Flex>
          <Button class="btn-def_second2" onClick={handleFilter}>Filter</Button>
            {
              filterOn == true &&
              <Box mt={"3px"} ms={"10px"}>
                <Button class="btn-def" onClick={()=> setFilterOn(false)}>Batal Filter</Button>
              </Box>
            }
        </Flex>
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
                    <MenuItem onClick={handleSortTotalASC}>Total Terkecil</MenuItem>
                    <MenuItem onClick={handleSortTotalDSC}>Total Terbesar</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleSortTanggalDSC}>Tanggal Terjauh</MenuItem>
                    <MenuItem onClick={handleSortTanggalASC}>Tanggal Terdekat</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleCancel}>Batalkan Sortir</MenuItem>
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
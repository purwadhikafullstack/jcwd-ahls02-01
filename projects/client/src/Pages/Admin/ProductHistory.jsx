import Axios from "axios";
import React from "react";
import {Bar, Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { API_URL } from "../../helper";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { Text, useMediaQuery, Box, Button, Flex, Divider, TableContainer, Table, TableCaption, Thead, Tbody, Tfoot,
        Tr, Th, Td, Input, Spacer, Menu, MenuButton, MenuList, MenuItem, MenuDivider} from '@chakra-ui/react';
import logo2 from "../../Assets/DevImage/LogoMedhikaPutih.png";
import Sidebar from "../../Components/Admin/Sidebar";


const ProductHistory=(props)=>{
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [produkHistory, setProdukHistory] = React.useState();
  const [produkHistoryTanggalASC, setProdukHistoryTanggalASC] = React.useState();
  const [produkHistoryTanggalDSC, setProdukHistoryTanggalDSC] = React.useState();
  const [sortirTanggalASC, setSortirTanggalASC] = React.useState(false);
  const [sortirTanggalDSC, setSortirTanggalDSC] = React.useState(false);
  const [searchProduk, setSearchProduk] = React.useState("");
  const [filterTanggalAwal, setFilterTanggalAwal] = React.useState("");
  const [filterTanggalAkhir, setFilterTanggalAkhir] = React.useState("");
  const [searchByProduk, setSearchByProduk] = React.useState();
  const [filterByProduk, setFilterByProduk] = React.useState();
  const [searchOn, setSearchOn]=React.useState(false);
  const [filterOn, setFilterOn]=React.useState(false);

  React.useEffect(()=>{
    getProdukHistory()
  }, [])

  console.log("PRODUK HISTORY", produkHistory)

  const getProdukHistory = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/productHistory/getProdukHistory`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        console.log("RES DATA GET LAPORAN PRODUK", res.data)
        setProdukHistory(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSortTanggalASC =async()=>{
    try {
      // console.log("sortir tanggal ASC JALAN")
      setSortirTanggalDSC(false)
      setSortirTanggalASC(true)
        let token = localStorage.getItem("tokenIdUser");
        let res = await Axios.get(`${API_URL}/productHistory/getProdukHistoryTanggalASC`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (res.data) {
          console.log("RES DATA GET ProdukHistory TanggalASC", res.data)
          setProdukHistoryTanggalASC(res.data)
        }
      } catch (err) {
    }
  }
  
  const handleSortTanggalDSC =async()=>{
    try {
      // console.log("sortir tanggal DSC JALAN")
      setSortirTanggalASC(false)
      setSortirTanggalDSC(true)
        let token = localStorage.getItem("tokenIdUser");
        let res = await Axios.get(`${API_URL}/productHistory/getProdukHistoryTanggalDSC`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (res.data) {
          console.log("RES DATA GET ProdukHistory TanggalDSC", res.data)
          setProdukHistoryTanggalDSC(res.data)
        }
      } catch (err) {
    }
  }

const printProdukHistory = () => {
  if(searchOn == true){
    return searchByProduk.map((value, index)=>{
      if (index % 2 == 0){
        return (
          <Tr>
            <Td>{value.dateFE}</Td>
            <Td>{value.productName.slice(0,40)}</Td>
            <Td>{value.stockType}</Td>
            <Td>{value.stockQuantity}</Td>
            <Td>{value.mutationSource}</Td>
            <Td>{value.mutationType}</Td>
          </Tr>
        )
      } else {
        return (
          <Tr style={{backgroundColor:"#ebeef3"}}>
            <Td>{value.dateFE}</Td>
            <Td>{value.productName.slice(0,40)}</Td>
            <Td>{value.stockType}</Td>
            <Td>{value.stockQuantity}</Td>
            <Td>{value.mutationSource}</Td>
            <Td>{value.mutationType}</Td>
          </Tr>
        )
      }
    })
  } else if (filterOn == true){
    return filterByProduk.map((value, index)=>{
      if (index % 2 == 0){
        return (
          <Tr>
            <Td>{value.dateFE}</Td>
            <Td>{value.productName.slice(0,40)}</Td>
            <Td>{value.stockType}</Td>
            <Td>{value.stockQuantity}</Td>
            <Td>{value.mutationSource}</Td>
            <Td>{value.mutationType}</Td>
          </Tr>
        )
      } else {
        return (
          <Tr style={{backgroundColor:"#ebeef3"}}>
            <Td>{value.dateFE}</Td>
            <Td>{value.productName.slice(0,40)}</Td>
            <Td>{value.stockType}</Td>
            <Td>{value.stockQuantity}</Td>
            <Td>{value.mutationSource}</Td>
            <Td>{value.mutationType}</Td>
          </Tr>
        )
      }
    })
  } else if (sortirTanggalASC == true){
    if(produkHistoryTanggalASC == undefined){
      return (
        <Tr>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
      )
    } else {
      return produkHistoryTanggalASC.map((value, index)=>{
        if (index % 2 == 0){
          return (
            <Tr>
              <Td>{value.dateFE}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.stockType}</Td>
              <Td>{value.stockQuantity}</Td>
              <Td>{value.mutationSource}</Td>
              <Td>{value.mutationType}</Td>
            </Tr>
          )
        } else {
          return (
            <Tr style={{backgroundColor:"#ebeef3"}}>
              <Td>{value.dateFE}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.stockType}</Td>
              <Td>{value.stockQuantity}</Td>
              <Td>{value.mutationSource}</Td>
              <Td>{value.mutationType}</Td>
            </Tr>
          )
        }
      })
    }
  } else if (sortirTanggalDSC == true){
    if(produkHistoryTanggalDSC == undefined){
      return (
        <Tr>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
      )
    } else{
      return produkHistoryTanggalDSC.map((value, index)=>{
        if (index % 2 == 0){
          return (
            <Tr>
              <Td>{value.dateFE}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.stockType}</Td>
              <Td>{value.stockQuantity}</Td>
              <Td>{value.mutationSource}</Td>
              <Td>{value.mutationType}</Td>
            </Tr>
          )
        } else {
          return (
            <Tr style={{backgroundColor:"#ebeef3"}}>
              <Td>{value.dateFE}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.stockType}</Td>
              <Td>{value.stockQuantity}</Td>
              <Td>{value.mutationSource}</Td>
              <Td>{value.mutationType}</Td>
            </Tr>
          )
        }
      })
    }
  } else {
    return produkHistory.map((value, index)=>{
      if (index % 2 == 0){
        return (
          <Tr>
            <Td>{value.dateFE}</Td>
            <Td>{value.productName.slice(0,22)}</Td>
            <Td>{value.stockType}</Td>
            <Td>{value.stockQuantity}</Td>
            <Td>{value.mutationSource}</Td>
            <Td>{value.mutationType}</Td>
          </Tr>
        )
      } else {
        return (
          <Tr style={{backgroundColor:"#ebeef3"}}>
            <Td>{value.dateFE}</Td>
            <Td>{value.productName.slice(0,22)}</Td>
            <Td>{value.stockType}</Td>
            <Td>{value.stockQuantity}</Td>
            <Td>{value.mutationSource}</Td>
            <Td>{value.mutationType}</Td>
          </Tr>
        )
      }
    })
  }
}
  
const handleSearch =async()=>{
  try {
    if(searchProduk){
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.post(`${API_URL}/productHistory/getSearchProdukHistory`, {
        inputProduk: searchProduk
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        console.log("res.data SEARCH PRODUK", res.data)
        setSearchByProduk(res.data)
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
      let res = await Axios.post(`${API_URL}/productHistory/getFilterProdukHistory`, {
        tanggalAwal: filterTanggalAwal,
        tanggalAkhir: filterTanggalAkhir
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        console.log("res.data FILTER PRODUK", res.data)
        setFilterByProduk(res.data)
        setFilterOn(true)
        }
      } else {

      }
    } catch (err) {
  }
}

const handleCancel = () => {
  setSortirTanggalASC(false)
  setSortirTanggalDSC(false)
};

  return( <>
    <Box
        w='100%'
        h='100%'
        bgGradient='linear(to-br, #dadeec,  #FFFFFF)'
      >
      <div class="container-fluid" >
        <div class="row">
        {
          isLargerThan1280 ?
            <>
              <div class="col-md-3 col-sm-5">
              <Sidebar />
            </div>
            <div class="col-md-9 col-sm-8">
            <Box mt={"35px"} mb={"20px"}>
              <Text class="h5b">Laporan Produk</Text>
            </Box>
              <div class="row">
                <div class="mt-2 col-md-10">
                  <div class="rounded-4 shadow p-3" style={{backgroundColor:"#f6f8fc", height:"100%"}}>
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
                        <Input bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} placeholder="Cari Nama Produk"
                          onChange={(e)=>setSearchProduk(e.target.value)}/>
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
                              <Th style={{color:"#FFFFFF"}}>Tanggal</Th>
                              <Th style={{color:"#FFFFFF"}}>Produk</Th>
                              <Th style={{color:"#FFFFFF"}}>Unit</Th>
                              <Th style={{color:"#FFFFFF"}}>Stok</Th>
                              <Th style={{color:"#FFFFFF"}}>Tipe</Th>
                              <Th style={{color:"#FFFFFF"}}>Keterangan</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {
                              produkHistory == undefined ?
                              <div>
                              </div>
                            :
                              printProdukHistory()
                            }
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </div>
                </div>
                <div class="col-md-2"></div>
              </div>
            </div>
            </>
        :
          <>
            <div class="col-4">
            <Sidebar />
          </div>
          <div class="col-8">
            <div class="row">
              <div class="mt-3">
                <Text class="h1b">Dashboard Admin Medhika</Text>
              </div>
            </div>
          </div>
          </>
        }
        </div>
      </div>
    </Box>
  </>
  )
}

export default ProductHistory;
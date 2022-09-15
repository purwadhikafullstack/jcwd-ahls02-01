import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { Text, useMediaQuery, Box, Button, Flex, Divider, Menu, MenuButton, MenuList, MenuItem, Tr, Td, Th,
        Spacer, Image, Input, MenuDivider, TableContainer, Table, Thead, Tbody} from '@chakra-ui/react';




const SalesReportByProduct=(props)=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [laporanProduk, setLaporanProduk] = React.useState();
  const [sortirTotalASC, setSortirTotalASC] = React.useState(false);
  const [sortirTotalDSC, setSortirTotalDSC] = React.useState(false);
  const [sortirTanggalASC, setSortirTanggalASC] = React.useState(false);
  const [sortirTanggalDSC, setSortirTanggalDSC] = React.useState(false);
  const [searchProduct, setSearchProduct] = React.useState("");
  const [searchByProduct, setSearchByProduct] = React.useState();
  const [searchOn, setSearchOn]=React.useState(false);

  React.useEffect(()=>{
    getLaporanProduk()
  }, [])

  console.log("Search Product", searchByProduct)
  // console.log("LAPORAN Product", laporanProduk)

  const getLaporanProduk = async() => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.get(`${API_URL}/salesReport/getLaporanProduk`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        console.log("RES DATA GET LAPORAN PRODUK", res.data)
        setLaporanProduk(res.data)
      }
    } catch (error) {
      console.log(error)
    }
}

const handleSearch =async()=>{
  try {
    if(searchProduct){
      let token = localStorage.getItem("tokenIdUser");
      let res = await Axios.post(`${API_URL}/salesReport/getSearchProduct`, {
        inputProduct: searchProduct
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.data) {
        console.log("res.data SEARCH PRODUCT", res.data)
        setSearchByProduct(res.data)
        setSearchOn(true)
        }
      } else {

      }
    } catch (err) {
  }
}

  const printLaporanProduk = () => {
    if(searchOn == false){
      return laporanProduk.map((value, index)=>{
        if (index % 2 == 0){
          return (
            <Tr>
              <Td>{index+1}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.qty}</Td>
              <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
            </Tr>
          )
        } else {
          return (
            <Tr style={{backgroundColor:"#ebeef3"}}>
              <Td>{index+1}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.qty}</Td>
              <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
            </Tr>
          )
        }
      })
    } else {
      return searchByProduct.map((value, index)=>{
        if (index % 2 == 0){
          return (
            <Tr>
              <Td>{index+1}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.qty}</Td>
              <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
            </Tr>
          )
        } else {
          return (
            <Tr style={{backgroundColor:"#ebeef3"}}>
              <Td>{index+1}</Td>
              <Td>{value.productName.slice(0,40)}</Td>
              <Td>{value.qty}</Td>
              <Td isNumeric>{value.totalTransaksi.toLocaleString()}</Td>
            </Tr>
          )
        }
      })
    }
  }
  console.log("search PRODUKKKK", searchProduct)

  return( <>
    <div class="row mb-4 mt-4" style={{marginLeft:"10px", marginRight:"10px"}}>
      <div class="col-md-4">
        <Input bgColor={"#FFFFFF"} boxShadow='md' fontSize={"l"} placeholder="Cari Nama Produk"
          onChange={(e)=>setSearchProduct(e.target.value)}/>
      </div>
      <div class="col-md-8">
        <Flex>
            <Box mt={"3px"}>
                <Button class="btn-def_second2" onClick={handleSearch}>Cari</Button>
            </Box>
            {
              searchOn == true &&
            <Box mt={"3px"} ms={"10px"}>
              <Button class="btn-def" onClick={()=> {(setSearchOn(false));(setSearchProduct(""))}}>Batal Cari</Button>
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
                    <MenuItem onClick={() => setSortirTotalASC(true)}>Total Terkecil</MenuItem>
                    <MenuItem onClick={() => setSortirTotalDSC(true)}>Total Terbesar</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => setSortirTanggalASC(true)}>Tanggal Terdekat</MenuItem>
                    <MenuItem onClick={() => setSortirTanggalDSC(true)}>Tanggal Terjauh</MenuItem>
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
              <Th style={{color:"#FFFFFF"}}>Nama Produk</Th>
              <Th style={{color:"#FFFFFF"}}>Jumlah</Th>
              <Th isNumeric style={{color:"#FFFFFF"}}>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              laporanProduk == undefined ?
              <div>
              </div>
            :
              printLaporanProduk()
            }
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  </>
  )
}

export default SalesReportByProduct;
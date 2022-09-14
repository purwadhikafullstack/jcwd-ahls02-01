import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { Text, useMediaQuery, Box, Button, Flex, Divider, TableContainer, Table, TableCaption, Thead, Tbody, Tfoot,
        Tr, Th, Td, Image, Input, Tabs, TabList, Tab, TabPanels, TabPanel} from '@chakra-ui/react';




const SalesReportByTransaction=(props)=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [salesByInvoice, setSalesByInvoice] = React.useState();

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
    return salesByInvoice.map((value, index)=>{
      if (index % 2 == 0){
        return (
          <Tr>
            <Td>{index+1}</Td>
            <Td>{value.dateFE}</Td>
            <Td>Nomer Invoice: {value.invoiceNumber}</Td>
            {/* <Td>{value.name}</Td> */}
            <Td isNumeric>{value.totalTransaksi}</Td>
          </Tr>
        )
      } else {
        return (
          <Tr style={{backgroundColor:"#ebeef3"}}>
            <Td>{index+1}</Td>
            <Td>{value.dateFE}</Td>
            <Td>Nomer Invoice: {value.invoiceNumber}</Td>
            {/* <Td>{value.name}</Td> */}
            <Td isNumeric>{value.totalTransaksi}</Td>
          </Tr>
        )
      }
    })
  }
    

  return( <>
    <Box ms={"20px"} me={"20px"}>
      <TableContainer borderRadius={"10px"}>
        <Table variant='simple'>
          <Thead>
            <Tr style={{backgroundColor:"#DE1B51", color:"#FFFFFF", height:"55px"}}>
              <Th style={{color:"#FFFFFF"}}>No</Th>
              <Th style={{color:"#FFFFFF"}}>Tanggal</Th>
              <Th style={{color:"#FFFFFF"}}>Aktifitas</Th>
              {/* <Th style={{color:"#FFFFFF"}}>Pembeli</Th> */}
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
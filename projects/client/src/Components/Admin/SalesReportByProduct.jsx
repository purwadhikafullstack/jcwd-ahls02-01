import Axios from "axios";
import React from "react";
import { API_URL } from "../../helper";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { Text, useMediaQuery, Box, Button, Flex, Divider, TableContainer, Table, TableCaption, Thead, Tbody, Tfoot,
        Tr, Th, Td, Image, Input, Tabs, TabList, Tab, TabPanels, TabPanel} from '@chakra-ui/react';




const SalesReportByProduct=(props)=>{
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

  const printSalesByProduct = () => {
    if (salesByInvoice) {
        return salesByInvoice.map((value, index) => {
            return (
                <div className="card mb-2" >
                  <div className="card-body">
                        <Box
                            display='flex'
                            flexDirection={{ base: 'column', md: 'row' }}
                            alignItems={{ base: 'start', md: 'center' }}
                            justifyContent='space-between'
                            className="font-brand"
                            as='b'
                            pb={3}
                        >
                            <Box
                                display='flex'
                                flexDirection={{ base: 'column', md: 'row' }}
                                alignItems={{ base: 'start', md: 'center' }}
                                justifyContent='space-between'
                                gap={5}
                            >
                                <Text>
                                    {value.dateFE}
                                </Text>
                                <Text>
                                    {value.invoiceNumber}
                                </Text>
                            </Box>
                          </Box>
                        <>
                            {value.detail.map((valProduct, idxProduct) => {
                              // console.log("check foto produk", valProduct.productPicture)
                                return (
                                    <Box
                                        display='flex'
                                        alignItems='start'
                                        justifyContent='space-between'
                                        className="font-brand"
                                        pb={2}
                                        // key={valProduct.idTransactionDetail}
                                    >
                                        <Box
                                            display='flex'
                                            alignItems='start'
                                            justifyContent='start'
                                            gap={5}
                                        >
                                            <Image
                                                borderRadius='xl'
                                                boxSize='70px'
                                                src={valProduct.productPicture}
                                                alt={`IMG-${valProduct.productName}`}
                                                className="d-md-block d-none"
                                            />
                                            <Text>
                                                <span>
                                                    {valProduct.productName}
                                                </span>
                                                <br />
                                                <span>
                                                    {valProduct.purchaseQuantity} {valProduct.stockType} x Rp {valProduct.priceSale.toLocaleString()}
                                                </span>
                                            </Text>
                                        </Box>
                                        <Text
                                            className="me-1"
                                        >
                                            Rp {valProduct.subTotal.toLocaleString()}
                                        </Text>
                                    </Box>
                                )
                            })}
                        </>

                        <Box
                            display='flex'
                            alignItems='start'
                            justifyContent='space-between'
                            className="font-brand"
                            pb={3}
                            textColor='var(--colorSix)'
                        >
                            <Text
                                ps={90}
                                as={"b"}
                                >
                                Total
                            </Text>
                            <Text
                                as={"b"}
                                className="me-1"
                            >
                                Rp {value.totalTransaksi.toLocaleString()}
                            </Text>
                        </Box>
                    </div>
                </div>
            )
        })
    }
  }

  return( <>
    {printSalesByProduct()}
  </>
  )
}

export default SalesReportByProduct;
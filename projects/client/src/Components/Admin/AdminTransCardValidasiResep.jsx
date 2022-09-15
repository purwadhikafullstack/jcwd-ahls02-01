import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { useToastHook } from "../CustomToast";
import { API_URL, BE_URL } from "../../helper";
import {
    Box,
    Flex,
    Divider,
    VStack,
    Center,
    Stack,
    Image,
    Text,
    Button,
    ButtonGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from "@chakra-ui/react";

const AdminTransCardValidasiResepComponent = (props) => {
    const navigate = useNavigate();
    
    //! pending list product dr hasil konversi / validasi resep
    //! pending handling subtotal
    const printSemuaTransaksi = () => {
        if (props.dbValidasiResep.length > 0) {
            console.log(`isi props.dbValidasiResep`, props.dbValidasiResep)
            return props.dbValidasiResep.map((value, index) => {
                if (value.prescription != null && value.transactionStatus == "Menunggu Diproses Penjual") {
                    return (
                        <div
                            className="card mb-2" key={value.idTransaction}
                        >
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
                                            {value.addDate}
                                        </Text>
                                        <Text>
                                            {value.invoiceNumber}
                                        </Text>
                                    </Box>
                                    <Text
                                        textColor='var(--colorSix)'
                                    >
                                        {value.transactionStatus}
                                    </Text>
                                </Box>
                                <Button
                                    className="btn-def_second"
                                    mb={3}
                                    onClick={() => navigate("/admin/racikResep")}
                                >
                                    Validasi Resep
                                </Button>

                                {/* UPDATE V2.0 */}
                                <>
                                    <Box
                                        display='flex'
                                        alignItems='start'
                                        justifyContent='space-between'
                                        className="font-brand"
                                        pb={2}
                                        
                                    >
                                        {value.purchasedProducts.length > 0
                                            ?
                                            value.purchasedProducts.map((valProduct, idxProduct) => {
                                                return (
                                                    <>
                                                        <Box
                                                            display='flex'
                                                            alignItems='start'
                                                            justifyContent='start'
                                                            gap={5}
                                                            key={valProduct.idTransactionDetail}
                                                        >
                                                            <Image
                                                                borderRadius='xl'
                                                                boxSize='70px'
                                                                src={value.prescription.includes("http")
                                                                    ?
                                                                    value.prescription
                                                                    :
                                                                    `${BE_URL}${value.prescription}`}
                                                                alt='Gambar resep dokter'
                                                                className="d-md-block d-none imgResep"
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
                                                    </>
                                                )
                                            })
                                            :
                                            <>
                                                <Box
                                                    display='flex'
                                                    alignItems='start'
                                                    justifyContent='start'
                                                    gap={5}
                                                >
                                                    <Image
                                                        borderRadius='xl'
                                                        boxSize='70px'
                                                        src={value.prescription.includes("http")
                                                            ?
                                                            value.prescription
                                                            :
                                                            `${BE_URL}${value.prescription}`}
                                                        alt='Gambar resep dokter'
                                                        className="d-md-block d-none imgResep"
                                                    />
                                                </Box>
                                            </>
                                        }
                                    </Box>

                                </>

                                <Divider mt={4} />
                                <div className="row">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-10">
                                        <Box
                                            display='flex'
                                            flexDirection={{ base: 'column', md: 'row' }}
                                            alignItems={{ base: 'start', md: 'center' }}
                                            justifyContent='space-between'
                                            className="font-brand"
                                            pb={3}
                                        >
                                            <Box mt={5}>
                                                <Text className="h6">
                                                    Ongkir
                                                </Text>
                                            </Box>
                                            <Text
                                                as='b'
                                                textColor='var(--colorSix)'
                                            >
                                                Rp {value.freightCost.toLocaleString()}
                                            </Text>
                                        </Box>
                                        <Box
                                            display='flex'
                                            flexDirection={{ base: 'column', md: 'row' }}
                                            alignItems={{ base: 'start', md: 'center' }}
                                            justifyContent='space-between'
                                            className="font-brand"
                                            pb={3}
                                        >
                                            <Box>
                                                <Text className="h6">
                                                    Total
                                                </Text>
                                            </Box>
                                            <Text
                                                as='b'
                                                textColor='var(--colorSix)'
                                            >
                                                Rp 35.000
                                            </Text>
                                        </Box>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-2">
                                    <Button
                                        className="btn-def_second"
                                    // onClick={() => btnUploadBuktiBayar(value.idTransaction)}
                                    >
                                        Tagih Pembayaran
                                    </Button>
                                </div>
                            </div>
                        </div >
                    )
                }
            }
            )
        }
    }

    return (
        <>
            {printSemuaTransaksi()}
        </>
    )

}

export default AdminTransCardValidasiResepComponent;
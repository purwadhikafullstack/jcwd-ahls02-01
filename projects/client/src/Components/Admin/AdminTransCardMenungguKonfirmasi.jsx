import React, { useState, useEffect, useRef } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";
import { API_URL, BE_URL } from "../../helper";
import {
    Box,
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
    TabPanel,
    Popover,
    PopoverTrigger,
    PopoverArrow,
    PopoverHeader,
    PopoverContent,
    PopoverCloseButton,
    PopoverBody
} from "@chakra-ui/react";

const AdminTransCardMenungguKonfirmasiComponent = (props) => {

    //TODO axios get seluruh transaksi yang berstatus Menunggu Konfirmasi

    const printMenungguKonfirmasi = () => {
        if (props.dbMenungguKonfirmasi.length > 0) {
            return props.dbMenungguKonfirmasi.map((value, index) => {
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
                                    {value.transactionStatus} Pembayaran
                                </Text>
                            </Box>

                            <>
                                {value.purchasedProducts.map((valProduct, idxProduct) => {
                                    return (
                                        <Box
                                            display='flex'
                                            alignItems='start'
                                            justifyContent='space-between'
                                            className="font-brand"
                                            pb={2}
                                            key={valProduct.idTransactionDetail}
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
                                                    src={BE_URL + valProduct.productPicture}
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
                            >
                                <Text
                                    ps={90}
                                >
                                    Ongkir
                                </Text>
                                <Text
                                    className="me-1"
                                >
                                    Rp {value.freightCost.toLocaleString()}
                                </Text>
                            </Box>

                            <Box
                                display='flex'
                                alignItems='start'
                                justifyContent='space-between'
                                className="font-brand"
                                pb={3}
                                textColor='var(--colorSix)'
                            >
                                <Text
                                    as={'b'}
                                    ps={90}
                                >
                                    Total
                                </Text>
                                <Text
                                    className="me-1"
                                    as={'b'}
                                >
                                    Rp {value.totalPayment.toLocaleString()}
                                </Text>
                            </Box>

                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='end'
                                mt={2}
                                mb={3}
                            >

                                <Popover
                                    placement='left'
                                >
                                    <PopoverTrigger>
                                        <Button
                                            className="btn-def"
                                            width={180} ms={5}
                                        >
                                            Cek Bukti Bayar
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverBody>
                                            <Image
                                                borderRadius='xl'
                                                boxSize='500px'
                                                src={value.transferReceipt.includes("http")
                                                    ?
                                                    value.transferReceipt
                                                    :
                                                    BE_URL + value.transferReceipt}
                                                alt={`IMG-BUKTIBAYAR`}
                                                className="d-md-block d-none"
                                            />
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>

                                < Button
                                    className="btn-def"
                                    width={180} ms={5}
                                >
                                    Tolak Pembayaran
                                </Button >
                                <Button
                                    className="btn-def_second"
                                    width={180} ms={5}
                                >
                                    <Text class="h6b" style={{ color: "#FFFFFF" }}>
                                        Konfirmasi Pembayaran
                                    </Text>
                                </Button>
                            </Box >

                        </div >
                    </div >
                )
            })
        }
    }

    return (
        <>
            {printMenungguKonfirmasi()}
        </>
    )

}

export default AdminTransCardMenungguKonfirmasiComponent;
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import NavbarComponent from "./Navbar";
import { useToastHook } from "../CustomToast";
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
    TabPanel
} from "@chakra-ui/react";

const TransCardValidasiResepComponent = (props) => {

    //TODO axios get seluruh transaksi yang prescriptionnya ga null dan berstatus Menunggu Diproses Penjual

    //^ cek kiriman dbValidasiResep dari page parent / TransactionList
    console.log(`props.dbValidasiResep`, props.dbValidasiResep)

    const printSemuaTransaksi = () => {
        if (props.dbValidasiResep.length > 0) {
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
                                <Box
                                    display='flex'
                                    alignItems='start'
                                    justifyContent='start'
                                    className="font-brand"
                                    gap={10}
                                    pb={3}
                                >
                                    <Text>
                                        Resep
                                    </Text>
                                    <Image
                                        id={value.idTransaction}
                                        src={value.prescription.includes("http")
                                            ?
                                            value.prescription
                                            :
                                            `${BE_URL}${value.prescription}`}
                                        alt='Gambar resep dokter'
                                        borderRadius='sm'
                                        boxSize='80px'
                                        className="imgResep"
                                    />
                                </Box>
                                <Text
                                    fontSize={15}
                                    className='font-brand'
                                >
                                    <span
                                        className="me-1"
                                    >
                                        *) Penjual akan memvalidasi dan menyiapkan racikan berdasarkan resep yang Anda unggah. Selesai validasi, pesanan Anda akan berstatus
                                    </span>
                                    <span
                                        style={{ color: 'var(--colorSix)' }}
                                    >
                                        Menunggu Pembayaran
                                    </span>
                                </Text>
                            </div>
                        </div>
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

export default TransCardValidasiResepComponent;
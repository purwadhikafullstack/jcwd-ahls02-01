import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import NavbarComponent from "./Navbar";
import { useToastHook } from "../CustomToast";
import { API_URL, BE_URL } from "../../helper";
import { savedUserValidasiResepAction, getUserValidasiResepAction } from "../../Redux/Actions/transactionActions";
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


    //^ assign functions
    const dispatch = useDispatch();

    //^ state management
    const { transactionList, transactionLength } = useSelector((state) => {
        return {
            transactionList: state.transactionReducers.uservalidasiresep,
            transactionLength: state.transactionReducers.transaction.filter(val => val.transactionStatus == "Menunggu Diproses Penjual").length
        }
    })

    // const [transactionLength, setTransactionLength] = useState(0);
    const [paginate, setPaginate] = useState(0);

    //& component did mount
    useEffect(() => {
        getPaginatedTransaction();
        // handleDataLength();
        // getAllTransactions();
    }, [])

    //TODO axios get seluruh transaksi yang prescriptionnya ga null dan berstatus Menunggu Diproses Penjual
    // const handleDataLength = () => {
    //     if (props.dbValidasiResep.length > 0) {
    //         setTransactionLength(props.dbValidasiResep.length);
    //     }
    // }
    console.log(`transactionLength`, transactionLength);

    const getPaginatedTransaction = (page = 0) => {
        dispatch(getUserValidasiResepAction(page+1))
        setPaginate(page);
    }

    // const getAllTransactions = () => {
    //     return async () => {
    //         try {
    //             let token = localStorage.getItem("tokenIdUser");

    //             if (token) {
    //                 let res = await Axios.get(`${API_URL}/transaction/userGetAllTransaction`, {
    //                     headers: {
    //                         'Authorization': `Bearer ${token}`
    //                     }
    //                 })

    //                 //^ cek isi res.data
    //                 console.log(`getAllTransactions res.data`, res.data);

    //                 let userValidasiResepData = res.data.filter(val => val.transactionStatus == "Menunggu Diproses Penjual");

    //                 setTransactionLength(userValidasiResepData.length);

    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }

    const handlePaginate = (paginate) => {
        getPaginatedTransaction(paginate);
    }

    const printBtnPagination = () => {
        let btn = []
        console.log(`transactionLength di printBtnPagination`, transactionLength);
        console.log(`Math.ceil(transactionLength)/3 di printBtnPagination`, Math.ceil(transactionLength)/3);
        for (let i = 0; i < Math.ceil(transactionLength / 3); i++) {
            btn.push(<Button
                outline
                color="btn-def"
                onClick={() => handlePaginate(i)}
                // style={{onClick}}
            >
                {i + 1}
            </Button>)
        }
        return btn;
    }

    //^ cek kiriman dbValidasiResep dari page parent / TransactionList
    console.log(`props.dbValidasiResep`, props.dbValidasiResep)


    const printSemuaTransaksi = () => {
        if (transactionList.length > 0) {
            return transactionList.map((value, index) => {
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
            {/* {printBtnPagination()} */}
            <ButtonGroup>
                {/* <Button>
                    1
                </Button>
                <Button>
                    2
                </Button> */}
                {printBtnPagination()}
            </ButtonGroup>
        </>
    )

}

export default TransCardValidasiResepComponent;
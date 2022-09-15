import React, { useState, useEffect } from "react";
import Axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import NavbarComponent from "../../Components/Users/Navbar";
import { useToastHook } from "../../Components/CustomToast";
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

const AdminTransCardDikirimComponent = (props) => {

    //TODO axios get seluruh transaksi yang berstatus Dikirim
    //^ seluruh transaksi user yg login
    const [dbTransaksi] = useState([
        {
            idTransaction: 4,
            purchasedProducts: [
                {
                    idTransactionDetail: 4,
                    productName: 'Decolgen',
                    productPicture: 'https://d2qjkwm11akmwu.cloudfront.net/products/49b5c4d0-85c9-4dc0-b1e2-96574c106cd9_product_image_url.webp',
                    stockType: 'saset',
                    purchaseQuantity: 1,
                    priceSale: 2300,
                    subTotal: 2300,
                }
            ],
            totalSale: 2300,
            prescription: null,
            transactionStatus: 'Dikirim',
            transferReceipt: 'https://mahirtransaksi.com/wp-content/uploads/2020/09/2-1-179x300.jpg',
            invoiceNumber: 'INV/20220304/STN/00001',
            addDate: '2022-03-05 10:05:00',
            freightCost: 10000,
            totalPayment: 12300,
            receiverName: 'Margareth Devina',
            receiverAddress: 'Jl. Aster VI No. 7',
            receiverPhone: '081287907000',
            postalCode: '16134'
        }
    ]);

    const printDikirim = () => {
        if (dbTransaksi.length > 0) {
            return dbTransaksi.map((value, index) => {
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
                                    {value.transactionStatus} Ke Pembeli
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
                                    ps={90}
                                    as={"b"}
                                    >
                                    Total
                                </Text>
                                <Text
                                    className="me-1"
                                    as={"b"}
                                >
                                    Rp {value.totalPayment.toLocaleString()}
                                </Text>
                            </Box>
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <>
            {printDikirim()}
        </>
    )

}

export default AdminTransCardDikirimComponent;